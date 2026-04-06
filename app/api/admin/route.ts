import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/app/lib/supabase";
import { STRIPE_PRODUCTS, APP_FLAG_MAP, APP_MONTHLY_PRICES } from "@/app/lib/app-config";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-12-18.acacia" as Stripe.LatestApiVersion,
});

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "clinic-admin-2026";

function isAuthenticated(req: NextRequest): boolean {
  const headerPassword = req.headers.get("x-admin-password");
  if (headerPassword === ADMIN_PASSWORD) return true;
  const url = new URL(req.url);
  const queryPassword = url.searchParams.get("password");
  if (queryPassword === ADMIN_PASSWORD) return true;
  return false;
}

// 一覧取得
export async function GET(req: NextRequest) {
  if (!isAuthenticated(req)) {
    return NextResponse.json({ error: "認証に失敗しました" }, { status: 401 });
  }

  try {
    const supabase = createAdminClient();
    const { data: accounts, error } = await supabase
      .from("clinic_accounts")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      return NextResponse.json({ error: "データの取得に失敗しました" }, { status: 500 });
    }

    // clinicsテーブルから代表者名・電話番号・モニター情報を取得して結合
    const { data: clinics } = await supabase
      .from("clinics")
      .select("notes, owner_name, phone, is_monitor, custom_price");

    const enriched = (accounts || []).map((account) => {
      const clinic = clinics?.find((c) => c.notes?.includes(account.clinic_id));
      return {
        ...account,
        owner_name: clinic?.owner_name || "",
        phone: clinic?.phone || "",
        is_monitor: clinic?.is_monitor || false,
        custom_price: clinic?.custom_price ?? null,
      };
    });

    return NextResponse.json({ accounts: enriched });
  } catch {
    return NextResponse.json({ error: "サーバーエラーが発生しました" }, { status: 500 });
  }
}

// アカウント作成 + Stripe決済リンク生成
export async function POST(req: NextRequest) {
  if (!isAuthenticated(req)) {
    return NextResponse.json({ error: "認証に失敗しました" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { clinic_name, email, plan_type, selected_apps, owner_name, phone, is_monitor, custom_price } = body;

    if (!clinic_name || !email || !selected_apps?.length) {
      return NextResponse.json({ error: "院名、メール、アプリを選択してください" }, { status: 400 });
    }

    const supabase = createAdminClient();

    // 再登録ブロック: 過去に解約済みのメールアドレスは登録不可
    const { data: cancelledAccount } = await supabase
      .from("clinic_accounts")
      .select("id, clinic_name, cancelled_at")
      .eq("email", email)
      .eq("status", "cancelled")
      .maybeSingle();

    if (cancelledAccount) {
      return NextResponse.json({
        error: `このメールアドレスは過去に解約済みのため再登録できません（${cancelledAccount.clinic_name} / 解約日: ${cancelledAccount.cancelled_at ? new Date(cancelledAccount.cancelled_at).toLocaleDateString("ja-JP") : "不明"}）`,
      }, { status: 400 });
    }

    // 既存アクティブアカウントチェック
    const { data: existingActive } = await supabase
      .from("clinic_accounts")
      .select("id")
      .eq("email", email)
      .in("status", ["active", "pending_payment"])
      .maybeSingle();

    if (existingActive) {
      return NextResponse.json({ error: "このメールアドレスは既に登録済みです" }, { status: 400 });
    }

    // 1. clinic_id生成
    const clinicId = `CLN-${Date.now().toString(36).toUpperCase()}${Math.random().toString(36).slice(2, 6).toUpperCase()}`;

    // 2. ランダムパスワード生成
    const tempPassword = Math.random().toString(36).slice(2, 10) + Math.random().toString(36).slice(2, 6).toUpperCase();

    // 3. Supabase Authにユーザー作成
    let authUserId: string | null = null;
    const { data: authUser, error: authError } = await supabase.auth.admin.createUser({
      email,
      password: tempPassword,
      email_confirm: true,
    });

    if (authError) {
      if (authError.message.includes("already")) {
        const { data: existingUsers } = await supabase.auth.admin.listUsers();
        const existing = existingUsers?.users?.find((u) => u.email === email);
        if (existing) authUserId = existing.id;
      } else {
        return NextResponse.json({ error: `Auth作成エラー: ${authError.message}` }, { status: 500 });
      }
    } else {
      authUserId = authUser?.user?.id || null;
    }

    // 4. Stripe Customer作成
    let stripeCustomerId: string | null = null;
    try {
      const customer = await stripe.customers.create({
        email,
        name: clinic_name,
        metadata: { clinic_id: clinicId, owner_name: owner_name || "" },
      });
      stripeCustomerId = customer.id;
    } catch (e) {
      console.error("Stripe Customer作成エラー:", e);
    }

    // 5. Stripe Checkout Session作成（決済リンク）
    let checkoutUrl: string | null = null;
    const stripeSubscriptionId: string | null = null;

    if (stripeCustomerId && plan_type === "monthly") {
      try {
        // 選択アプリのprice_idを集めてline_itemsを作成
        const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = [];
        for (const appId of selected_apps) {
          const product = STRIPE_PRODUCTS[appId as keyof typeof STRIPE_PRODUCTS];
          if (product?.monthly_price_id) {
            lineItems.push({ price: product.monthly_price_id, quantity: 1 });
          }
        }

        if (lineItems.length > 0) {
          // セット割引用クーポン（2個5%、3個10%、5個20%）
          let couponId: string | undefined;
          const appCount = selected_apps.length;
          if (appCount >= 5) {
            couponId = await getOrCreateCoupon(20);
          } else if (appCount >= 3) {
            couponId = await getOrCreateCoupon(10);
          } else if (appCount >= 2) {
            couponId = await getOrCreateCoupon(5);
          }

          const sessionParams: Stripe.Checkout.SessionCreateParams = {
            customer: stripeCustomerId,
            mode: "subscription",
            line_items: lineItems,
            success_url: `https://clinic-saas-lp.vercel.app/admin?payment=success&clinic=${clinicId}`,
            cancel_url: `https://clinic-saas-lp.vercel.app/admin?payment=cancelled`,
            metadata: {
              clinic_id: clinicId,
              selected_apps: selected_apps.join(","),
              plan_type: "monthly",
              created_by: "admin",
            },
          };

          if (couponId) {
            sessionParams.discounts = [{ coupon: couponId }];
          }

          const session = await stripe.checkout.sessions.create(sessionParams);
          checkoutUrl = session.url;
        }
      } catch (e) {
        console.error("Stripe Checkout作成エラー:", e);
      }
    } else if (stripeCustomerId && plan_type === "onetime") {
      try {
        const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = [];
        for (const appId of selected_apps) {
          const product = STRIPE_PRODUCTS[appId as keyof typeof STRIPE_PRODUCTS];
          if (product?.onetime_price_id) {
            lineItems.push({ price: product.onetime_price_id, quantity: 1 });
          } else if (product?.monthly_price_id) {
            // 買い切りがないアプリは月額で
            lineItems.push({ price: product.monthly_price_id, quantity: 1 });
          }
        }

        if (lineItems.length > 0) {
          const hasSubscription = lineItems.some((item) => {
            const app = selected_apps.find((a: string) => {
              const p = STRIPE_PRODUCTS[a as keyof typeof STRIPE_PRODUCTS];
              return p?.monthly_price_id === item.price || p?.onetime_price_id === item.price;
            });
            const product = app ? STRIPE_PRODUCTS[app as keyof typeof STRIPE_PRODUCTS] : null;
            return product?.onetime_price_id === null;
          });

          const session = await stripe.checkout.sessions.create({
            customer: stripeCustomerId,
            mode: hasSubscription ? "subscription" : "payment",
            line_items: lineItems,
            success_url: `https://clinic-saas-lp.vercel.app/admin?payment=success&clinic=${clinicId}`,
            cancel_url: `https://clinic-saas-lp.vercel.app/admin?payment=cancelled`,
            metadata: {
              clinic_id: clinicId,
              selected_apps: selected_apps.join(","),
              plan_type: "onetime",
              created_by: "admin",
            },
          });
          checkoutUrl = session.url;
        }
      } catch (e) {
        console.error("Stripe Checkout作成エラー:", e);
      }
    }

    // 6. clinic_accountsに挿入（ステータス: 決済待ち or アクティブ）
    const status = checkoutUrl ? "pending_payment" : "active";
    const { data: account, error: insertError } = await supabase
      .from("clinic_accounts")
      .insert({
        clinic_id: clinicId,
        clinic_name,
        email,
        plan_type: plan_type || "monthly",
        selected_apps,
        status,
        stripe_customer_id: stripeCustomerId,
        stripe_subscription_id: stripeSubscriptionId,
        metadata: {
          created_by: "admin",
          temp_password: tempPassword,
          auth_user_id: authUserId,
          checkout_url: checkoutUrl,
        },
      })
      .select()
      .single();

    if (insertError) {
      return NextResponse.json({ error: `アカウント作成エラー: ${insertError.message}` }, { status: 500 });
    }

    // 7. clinicsテーブルに挿入（is_active = false: 決済完了まで無効）
    const appFlags: Record<string, boolean> = {};
    for (const app of selected_apps) {
      const flag = APP_FLAG_MAP[app];
      if (flag) appFlags[flag] = true;
    }

    const clinicCode = clinic_name
      .replace(/[^\w\u3000-\u9fff]/g, "")
      .slice(0, 20)
      .toLowerCase() || `clinic-${Date.now()}`;

    const { data: clinic, error: clinicError } = await supabase
      .from("clinics")
      .insert({
        name: clinic_name,
        code: clinicCode,
        owner_name: owner_name || "",
        phone: phone || "",
        email,
        plan: selected_apps.includes("kensa") ? "basic" : "active",
        is_active: !checkoutUrl, // 決済リンクがある場合は無効
        theme_color: "#2563eb",
        max_staff: 5,
        max_exams_per_month: 9999,
        max_patients: 9999,
        max_checks_per_month: 9999,
        notes: `管理画面から作成 | ${clinicId}`,
        stripe_customer_id: stripeCustomerId || "",
        is_monitor: is_monitor || false,
        custom_price: custom_price || null,
        ...appFlags,
      })
      .select()
      .single();

    if (clinicError) console.error("clinics挿入エラー:", clinicError);

    // 8. clinic_membersに挿入
    let memberError = null;
    if (clinic && authUserId) {
      const { error: mError } = await supabase
        .from("clinic_members")
        .insert({
          clinic_id: clinic.id,
          user_id: authUserId,
          role: "owner",
          display_name: owner_name || clinic_name,
          is_active: true,
        });
      memberError = mError;
      if (mError) console.error("clinic_members挿入エラー:", mError);
    }

    // 9. MEOアプリが含まれている場合、MEOテーブルを自動作成
    if (selected_apps.includes("meo") && authUserId) {
      const meoClinicId = `clinic-${Date.now().toString(36)}`;

      // meo_user_settings作成
      const { error: meoSettingError } = await supabase
        .from("meo_user_settings")
        .upsert({
          user_id: authUserId,
          anthropic_key: "",
          active_clinic_id: meoClinicId,
          serp_api_key: "",
        }, { onConflict: "user_id" });
      if (meoSettingError) console.error("meo_user_settings挿入エラー:", meoSettingError);

      // meo_clinics作成
      const { error: meoClinicError } = await supabase
        .from("meo_clinics")
        .upsert({
          id: meoClinicId,
          user_id: authUserId,
          name: clinic_name,
          area: "",
          keywords: [],
          category: "整体院",
          owner_name: owner_name || "",
        }, { onConflict: "id,user_id" });
      if (meoClinicError) console.error("meo_clinics挿入エラー:", meoClinicError);
    }

    // 月額合計を計算
    const monthlyTotal = selected_apps.reduce((sum: number, appId: string) => sum + (APP_MONTHLY_PRICES[appId] || 0), 0);
    let discount = 0;
    if (selected_apps.length >= 5) discount = 0.2;
    else if (selected_apps.length >= 3) discount = 0.1;
    else if (selected_apps.length >= 2) discount = 0.05;
    const finalAmount = Math.floor(monthlyTotal * (1 - discount));

    return NextResponse.json({
      account,
      temp_password: tempPassword,
      auth_user_id: authUserId,
      checkout_url: checkoutUrl,
      monthly_amount: finalAmount,
      clinic_id_internal: clinic?.id || null,
      warnings: [
        clinicError ? `clinicsテーブル: ${clinicError.message}` : null,
        memberError ? `clinic_members: ${memberError.message}` : null,
      ].filter(Boolean),
    });
  } catch (e) {
    console.error("POST error:", e);
    return NextResponse.json({ error: "サーバーエラーが発生しました" }, { status: 500 });
  }
}

// セット割引クーポンの取得 or 作成
async function getOrCreateCoupon(percentOff: number): Promise<string> {
  const couponId = `set-discount-${percentOff}`;
  try {
    await stripe.coupons.retrieve(couponId);
    return couponId;
  } catch {
    const coupon = await stripe.coupons.create({
      id: couponId,
      percent_off: percentOff,
      duration: "forever",
      name: `セット割引 ${percentOff}%OFF`,
    });
    return coupon.id;
  }
}

// 最低契約期間（月）
const MIN_CONTRACT_MONTHS = 6;

// 早期解約金の計算
function calcEarlyCancellationFee(account: { created_at: string; selected_apps: string[]; plan_type: string }): { remainingMonths: number; fee: number } | null {
  if (account.plan_type !== "monthly") return null;

  const startDate = new Date(account.created_at);
  const now = new Date();
  const monthsElapsed = (now.getFullYear() - startDate.getFullYear()) * 12 + (now.getMonth() - startDate.getMonth());

  if (monthsElapsed >= MIN_CONTRACT_MONTHS) return null;

  const remainingMonths = MIN_CONTRACT_MONTHS - monthsElapsed;
  const apps = account.selected_apps || [];
  const subtotal = apps.reduce((sum: number, appId: string) => sum + (APP_MONTHLY_PRICES[appId] || 0), 0);
  const count = apps.length;
  let discount = 0;
  if (count >= 5) discount = 0.2;
  else if (count >= 3) discount = 0.1;
  else if (count >= 2) discount = 0.05;
  const monthly = Math.floor(subtotal * (1 - discount));
  const fee = monthly * remainingMonths;

  return { remainingMonths, fee };
}

// アカウント更新
export async function PATCH(req: NextRequest) {
  if (!isAuthenticated(req)) {
    return NextResponse.json({ error: "認証に失敗しました" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { id, force_cancel, ...updateData } = body;

    if (!id) {
      return NextResponse.json({ error: "IDが必要です" }, { status: 400 });
    }

    const supabase = createAdminClient();

    // 解約時の早期解約チェック
    if (updateData.status === "cancelled") {
      const { data: currentAccount } = await supabase
        .from("clinic_accounts")
        .select("created_at, selected_apps, plan_type, stripe_customer_id, status")
        .eq("id", id)
        .single();

      if (currentAccount && currentAccount.status === "active") {
        const earlyFee = calcEarlyCancellationFee(currentAccount);

        if (earlyFee && !force_cancel) {
          // 早期解約金の情報を返す（確認用）
          return NextResponse.json({
            early_cancellation: true,
            remaining_months: earlyFee.remainingMonths,
            fee: earlyFee.fee,
            message: `最低契約期間${MIN_CONTRACT_MONTHS}ヶ月未満です。早期解約金 ¥${earlyFee.fee.toLocaleString()}（残り${earlyFee.remainingMonths}ヶ月分）が発生します。`,
          });
        }

        // 早期解約金をStripeで請求（force_cancel=trueの場合）
        if (earlyFee && force_cancel && currentAccount.stripe_customer_id) {
          try {
            const invoice = await stripe.invoices.create({
              customer: currentAccount.stripe_customer_id,
              auto_advance: true,
              collection_method: "send_invoice",
              days_until_due: 14,
              description: `早期解約金（残り${earlyFee.remainingMonths}ヶ月分）`,
            });

            await stripe.invoiceItems.create({
              customer: currentAccount.stripe_customer_id,
              invoice: invoice.id,
              amount: earlyFee.fee,
              currency: "jpy",
              description: `早期解約金 - 最低契約期間${MIN_CONTRACT_MONTHS}ヶ月のうち残り${earlyFee.remainingMonths}ヶ月分`,
            });

            await stripe.invoices.sendInvoice(invoice.id);
            console.log(`早期解約金請求書送信: ¥${earlyFee.fee}, invoice=${invoice.id}`);
          } catch (e) {
            console.error("早期解約金請求エラー:", e);
          }
        }
      }
    }

    const allowed: Record<string, unknown> = {};
    if (updateData.clinic_name !== undefined) allowed.clinic_name = updateData.clinic_name;
    if (updateData.email !== undefined) allowed.email = updateData.email;
    if (updateData.status !== undefined) allowed.status = updateData.status;
    if (updateData.selected_apps !== undefined) allowed.selected_apps = updateData.selected_apps;
    if (updateData.plan_type !== undefined) allowed.plan_type = updateData.plan_type;
    if (updateData.status === "cancelled") allowed.cancelled_at = new Date().toISOString();

    const { data, error } = await supabase
      .from("clinic_accounts")
      .update(allowed)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: `更新エラー: ${error.message}` }, { status: 500 });
    }

    // clinicsテーブルも同期
    if (data && (updateData.status || updateData.selected_apps)) {
      const { data: clinicRows } = await supabase
        .from("clinics")
        .select("id")
        .like("notes", `%${data.clinic_id}%`);

      if (clinicRows && clinicRows.length > 0) {
        const clinicUpdate: Record<string, unknown> = {};

        if (updateData.status === "cancelled" || updateData.status === "suspended") {
          clinicUpdate.is_active = false;
        } else if (updateData.status === "active") {
          clinicUpdate.is_active = true;
        }

        if (updateData.selected_apps) {
          for (const [appId, flag] of Object.entries(APP_FLAG_MAP)) {
            clinicUpdate[flag] = updateData.selected_apps.includes(appId);
          }
        }

        if (Object.keys(clinicUpdate).length > 0) {
          await supabase
            .from("clinics")
            .update(clinicUpdate)
            .eq("id", clinicRows[0].id);
        }
      }
    }

    return NextResponse.json({ account: data });
  } catch {
    return NextResponse.json({ error: "サーバーエラーが発生しました" }, { status: 500 });
  }
}
