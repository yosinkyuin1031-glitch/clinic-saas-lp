import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { createAdminClient } from "@/app/lib/supabase";
import crypto from "crypto";

function getStripe() {
  if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error("STRIPE_SECRET_KEY is not set");
  }
  return new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2026-02-25.clover",
  });
}

function getWebhookSecret() {
  if (!process.env.STRIPE_WEBHOOK_SECRET) {
    throw new Error("STRIPE_WEBHOOK_SECRET is not set");
  }
  return process.env.STRIPE_WEBHOOK_SECRET;
}

// ユニークなclinic_id生成（CLN-XXXXXXXX形式）
function generateClinicId(): string {
  const hex = crypto.randomBytes(4).toString("hex").toUpperCase();
  return `CLN-${hex}`;
}

// ランダムパスワード生成（12文字英数字記号）
function generatePassword(length = 12): string {
  const chars =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%";
  let password = "";
  const randomBytes = crypto.randomBytes(length);
  for (let i = 0; i < length; i++) {
    password += chars.charAt(randomBytes[i] % chars.length);
  }
  return password;
}

// 年会費（保守費）のデフォルト金額（環境変数で上書き可能）
function getMaintenanceFeeAmount(): number {
  return parseInt(process.env.MAINTENANCE_FEE_AMOUNT || "12000", 10);
}

// イベントログをSupabaseに記録
async function logWebhookEvent(
  supabase: ReturnType<typeof createAdminClient>,
  eventType: string,
  eventId: string,
  data: Record<string, unknown>,
  status: "success" | "error",
  errorMessage?: string
) {
  try {
    await supabase.from("webhook_logs").insert({
      event_type: eventType,
      event_id: eventId,
      data,
      status,
      error_message: errorMessage || null,
    });
  } catch (err) {
    // ログ記録の失敗は握り潰さずconsoleに出す
    console.error("Webhookログ記録失敗:", err);
  }
}

// 買い切り購入後に1年後から保守費サブスクを作成
async function createMaintenanceSubscriptionSchedule(
  stripe: Stripe,
  customerId: string,
  clinicName: string
) {
  const maintenanceFee = getMaintenanceFeeAmount();
  const oneYearLater = Math.floor(Date.now() / 1000) + 365 * 24 * 60 * 60;

  try {
    // まずProductとPriceを作成（SubscriptionScheduleではprice_data内にproduct_dataが使えないため）
    const product = await stripe.products.create({
      name: `${clinicName} - 年間保守費`,
      metadata: {
        type: "maintenance_fee",
        clinic_name: clinicName,
      },
    });

    const price = await stripe.prices.create({
      product: product.id,
      currency: "jpy",
      unit_amount: maintenanceFee,
      recurring: {
        interval: "year",
      },
    });

    const schedule = await stripe.subscriptionSchedules.create({
      customer: customerId,
      start_date: oneYearLater,
      end_behavior: "release",
      phases: [
        {
          items: [
            {
              price: price.id,
              quantity: 1,
            },
          ],
          duration: {
            interval: "year",
            interval_count: 1,
          },
        },
      ],
      metadata: {
        type: "maintenance_fee",
        clinic_name: clinicName,
        annual_amount: maintenanceFee.toString(),
      },
    });

    console.log(
      `保守費サブスクスケジュール作成: schedule=${schedule.id}, 開始=${new Date(oneYearLater * 1000).toISOString()}, 金額=${maintenanceFee}円/年`
    );

    return {
      scheduleId: schedule.id,
      startsAt: new Date(oneYearLater * 1000).toISOString(),
    };
  } catch (err) {
    console.error("保守費サブスクスケジュール作成エラー:", err);
    return null;
  }
}

import { APP_FLAG_MAP, APP_CONFIGS } from "@/app/lib/app-config";
import { sendLINENotify } from "@/app/lib/line-notify";

// Stripe Price ID → アプリID のマッピング（Payment Link対応用）
const PRICE_TO_APP: Record<string, string> = {};
for (const app of APP_CONFIGS) {
  if (app.stripe.monthly_price_id) PRICE_TO_APP[app.stripe.monthly_price_id] = app.id;
  if (app.stripe.onetime_price_id) PRICE_TO_APP[app.stripe.onetime_price_id] = app.id;
  if (app.stripe.extra_price_ids) {
    for (const extra of app.stripe.extra_price_ids) {
      PRICE_TO_APP[extra] = app.id;
    }
  }
}
// 旧Price IDの手動登録（app-config.tsの通常価格から切り替え後も継続契約用）
// カラダマップ モニター枠 月額3,980円（旧Lite用Price）
PRICE_TO_APP["price_1TGhYvCORfdwaD8CHnlOS7Bu"] = "kensa";

// Payment Link経由の場合、line_itemsから購入アプリを判別する
async function resolveAppsFromLineItems(
  stripe: Stripe,
  sessionId: string
): Promise<string[]> {
  try {
    const lineItems = await stripe.checkout.sessions.listLineItems(sessionId);
    const apps: string[] = [];
    for (const item of lineItems.data) {
      const priceId = item.price?.id;
      if (priceId && PRICE_TO_APP[priceId]) {
        apps.push(PRICE_TO_APP[priceId]);
      }
    }
    return apps;
  } catch (err) {
    console.error("line_items取得エラー:", err);
    return [];
  }
}

export async function POST(req: NextRequest) {
  let event: Stripe.Event;

  try {
    const rawBody = await req.text();
    const signature = req.headers.get("stripe-signature");

    if (!signature) {
      return NextResponse.json(
        { error: "署名がありません" },
        { status: 400 }
      );
    }

    const stripe = getStripe();
    const webhookSecret = getWebhookSecret();
    event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return NextResponse.json(
      { error: "Webhook署名の検証に失敗しました" },
      { status: 400 }
    );
  }

  const supabase = createAdminClient();
  const stripe = getStripe();

  try {
    switch (event.type) {
      // ========================================
      // 決済完了 → アカウント作成
      // ========================================
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;

        const stripeCustomerId = session.customer as string;
        const stripeSubscriptionId =
          (session.subscription as string) || null;

        // Payment Link経由かどうかを判定（metadataが空ならPayment Link）
        const isPaymentLink = !session.metadata?.clinicName;

        let email: string | null;
        let clinicName: string;
        let planName: string;
        let paymentType: string;
        let selectedAppsRaw: string;

        if (isPaymentLink) {
          // === Payment Link経由 ===
          email = session.customer_details?.email || session.customer_email;
          clinicName = session.customer_details?.name || "";
          // custom_fieldsがある場合はそちらを優先（治療院名フィールド）
          const customFields = (session as unknown as Record<string, unknown>).custom_fields as Array<{ key: string; text?: { value: string } }> | undefined;
          if (customFields && customFields.length > 0) {
            const clinicField = customFields.find(f => f.text?.value);
            if (clinicField?.text?.value) {
              clinicName = clinicField.text.value;
            }
          }
          // line_itemsから購入アプリを判別
          const resolvedApps = await resolveAppsFromLineItems(stripe, session.id);
          selectedAppsRaw = JSON.stringify(resolvedApps);
          paymentType = session.mode === "subscription" ? "monthly" : "onetime";
          // アプリ名をプラン名として使用
          const appLabels = resolvedApps.map(id => {
            const cfg = APP_CONFIGS.find(a => a.id === id);
            return cfg?.label || id;
          });
          planName = appLabels.join(" + ");

          console.log(`Payment Link経由の決済: email=${email}, clinicName=${clinicName}, apps=${resolvedApps.join(",")}`);
        } else {
          // === カスタムCheckout経由（既存フロー） ===
          email = session.customer_email;
          clinicName = session.metadata?.clinicName || "";
          planName = session.metadata?.planName || "";
          paymentType = session.metadata?.paymentType || "monthly";
          selectedAppsRaw = session.metadata?.selectedApps || "[]";
        }

        // 解約済みメールアドレスの再登録ブロック
        if (email) {
          const { data: cancelledCheck } = await supabase
            .from("clinic_accounts")
            .select("id")
            .eq("email", email)
            .eq("status", "cancelled")
            .maybeSingle();

          if (cancelledCheck) {
            console.log(`解約済みメールの再登録をブロック: ${email}`);
            await logWebhookEvent(supabase, event.type, event.id, { email }, "error", "解約済みメールの再登録ブロック");
            break;
          }
        }

        if (!email) {
          console.error("メールアドレスが見つかりません");
          await logWebhookEvent(
            supabase,
            event.type,
            event.id,
            { session_id: session.id },
            "error",
            "メールアドレスが見つかりません"
          );
          break;
        }

        // 管理画面で事前作成されたpending_paymentアカウントがあるか確認
        // まずstripe_customer_idで検索、なければemailでフォールバック
        let pendingAccount = null;
        const { data: pendingByStripe } = await supabase
          .from("clinic_accounts")
          .select("id, clinic_id, email, clinic_name, selected_apps")
          .eq("stripe_customer_id", stripeCustomerId)
          .eq("status", "pending_payment")
          .maybeSingle();

        if (pendingByStripe) {
          pendingAccount = pendingByStripe;
        } else if (email) {
          // emailでフォールバック検索（/add-clinicで作成した場合stripe_customer_idが未設定）
          const { data: pendingByEmail } = await supabase
            .from("clinic_accounts")
            .select("id, clinic_id, email, clinic_name, selected_apps")
            .eq("email", email)
            .eq("status", "pending_payment")
            .maybeSingle();
          pendingAccount = pendingByEmail;
        }

        if (pendingAccount) {
          // pending_payment → active に切り替え
          // selected_appsがない場合はPayment Linkから解決したアプリで埋める
          let finalSelectedApps: string[] = Array.isArray(pendingAccount.selected_apps)
            ? (pendingAccount.selected_apps as string[])
            : [];
          if (finalSelectedApps.length === 0) {
            try {
              finalSelectedApps = JSON.parse(selectedAppsRaw);
            } catch {
              finalSelectedApps = [];
            }
          }

          const planTypePending: "monthly" | "yearly" | "onetime" =
            paymentType === "yearly" ? "yearly" : paymentType === "onetime" ? "onetime" : "monthly";

          const updateData: Record<string, unknown> = {
            status: "active",
            stripe_customer_id: stripeCustomerId,
            stripe_subscription_id: stripeSubscriptionId,
            selected_apps: finalSelectedApps,
            plan_type: planTypePending,
          };
          await supabase
            .from("clinic_accounts")
            .update(updateData)
            .eq("id", pendingAccount.id);

          const finalClinicName = pendingAccount.clinic_name || clinicName || "";
          const finalEmail = pendingAccount.email || email!;
          const finalClinicId = pendingAccount.clinic_id;

          // === Auth ユーザー確保（idempotent） ===
          let pendingUserId: string | null = null;
          let pendingNewPassword: string | null = null;

          // 既存ユーザーをemailで検索（admin.listUsersは1ページ最大1000件、運用上充分）
          const { data: existingUserList } = await supabase.auth.admin.listUsers();
          const existingUser = existingUserList?.users?.find(u => u.email === finalEmail);

          if (existingUser) {
            pendingUserId = existingUser.id;
          } else {
            pendingNewPassword = generatePassword();
            const { data: authData, error: authError } = await supabase.auth.admin.createUser({
              email: finalEmail,
              password: pendingNewPassword,
              email_confirm: true,
              user_metadata: {
                clinic_id: finalClinicId,
                clinic_name: finalClinicName,
              },
            });
            if (authError) {
              console.error("pending_payment branch Auth作成エラー:", authError);
            } else if (authData?.user) {
              pendingUserId = authData.user.id;
            }
          }

          if (pendingUserId) {
            await supabase
              .from("clinic_accounts")
              .update({ user_id: pendingUserId })
              .eq("id", pendingAccount.id);
          }

          // === clinics 確保（idempotent） ===
          let pendingClinicRowId: string | null = null;
          const { data: existingClinics } = await supabase
            .from("clinics")
            .select("id")
            .like("notes", `%${finalClinicId}%`);

          if (existingClinics && existingClinics.length > 0) {
            pendingClinicRowId = existingClinics[0].id;
            await supabase
              .from("clinics")
              .update({ is_active: true })
              .eq("id", pendingClinicRowId);
          } else {
            const pendingAppFlags: Record<string, boolean> = {};
            for (const app of finalSelectedApps) {
              const flag = APP_FLAG_MAP[app];
              if (flag) pendingAppFlags[flag] = true;
            }
            const pendingClinicCode =
              finalClinicName
                .replace(/[^\w　-鿿]/g, "")
                .slice(0, 20)
                .toLowerCase() || `clinic-${Date.now()}`;

            const { data: newClinic, error: newClinicError } = await supabase
              .from("clinics")
              .insert({
                name: finalClinicName,
                code: pendingClinicCode,
                owner_name: "",
                phone: "",
                email: finalEmail,
                plan: finalSelectedApps.includes("kensa") ? "basic" : "active",
                is_active: true,
                theme_color: "#2563eb",
                max_staff: 5,
                max_exams_per_month: 9999,
                max_patients: 9999,
                max_checks_per_month: 9999,
                notes: `Stripe購入から自動作成 | ${finalClinicId}`,
                stripe_customer_id: stripeCustomerId || "",
                ...pendingAppFlags,
              })
              .select()
              .single();
            if (newClinicError) {
              console.error("pending_payment branch clinics作成エラー:", newClinicError);
            } else if (newClinic) {
              pendingClinicRowId = newClinic.id;
            }
          }

          // === clinic_members 確保（idempotent） ===
          if (pendingUserId && pendingClinicRowId) {
            const { data: existingMember } = await supabase
              .from("clinic_members")
              .select("id")
              .eq("clinic_id", pendingClinicRowId)
              .eq("user_id", pendingUserId)
              .maybeSingle();
            if (!existingMember) {
              const { error: memberInsertError } = await supabase
                .from("clinic_members")
                .insert({
                  clinic_id: pendingClinicRowId,
                  user_id: pendingUserId,
                  role: "owner",
                  display_name: finalClinicName,
                  is_active: true,
                });
              if (memberInsertError) {
                console.error("pending_payment branch clinic_members挿入エラー:", memberInsertError);
              }
            }
          }

          // === MEO自動セットアップ ===
          if (finalSelectedApps.includes("meo") && pendingUserId) {
            const pendingMeoClinicId = `clinic-${Date.now().toString(36)}`;
            await supabase
              .from("meo_user_settings")
              .upsert(
                {
                  user_id: pendingUserId,
                  anthropic_key: "",
                  active_clinic_id: pendingMeoClinicId,
                  serp_api_key: "",
                },
                { onConflict: "user_id" }
              );
            await supabase
              .from("meo_clinics")
              .upsert(
                {
                  id: pendingMeoClinicId,
                  user_id: pendingUserId,
                  name: finalClinicName,
                  area: "",
                  keywords: [],
                  category: "整体院",
                  owner_name: "",
                },
                { onConflict: "id,user_id" }
              );
          }

          // === ウェルカムメール送信（新規Auth作成時のみ。既存ユーザー再登録時は重複送信回避） ===
          if (pendingNewPassword && process.env.RESEND_API_KEY) {
            const { sendAppWelcomeEmail, sendAdminNotification } = await import("@/app/lib/email");
            for (const appId of finalSelectedApps) {
              sendAppWelcomeEmail({
                to: finalEmail,
                clinicName: finalClinicName,
                clinicId: finalClinicId,
                password: pendingNewPassword,
                appId,
                planType: planTypePending,
              }).catch(err => console.error(`${appId}ウェルカムメールエラー:`, err));
            }
            sendAdminNotification({
              clinicName: finalClinicName,
              email: finalEmail,
              planType: planTypePending,
              selectedApps: finalSelectedApps,
            }).catch(err => console.error("管理者通知メールエラー:", err));
          }

          // === LINE通知 ===
          const pendingAppLabels = finalSelectedApps.map(id => {
            const cfg = APP_CONFIGS.find(a => a.id === id);
            return cfg?.label || id;
          });
          const pendingLineMsg = [
            "【新規契約（事前登録分有効化）】",
            `院名: ${finalClinicName}`,
            `メール: ${finalEmail}`,
            `プラン: ${planName} (${planTypePending})`,
            `アプリ: ${pendingAppLabels.join(", ")}`,
            `院ID: ${finalClinicId}`,
          ].join("\n");
          sendLINENotify(pendingLineMsg).catch(err => console.error("LINE通知エラー:", err));

          console.log(
            `管理画面アカウント有効化＋プロビジョニング完了: clinic_id=${finalClinicId}, email=${finalEmail}, provisioned=${!!pendingNewPassword}`
          );
          await logWebhookEvent(
            supabase,
            event.type,
            event.id,
            {
              clinic_id: finalClinicId,
              email: finalEmail,
              provisioned: !!pendingNewPassword,
              selected_apps: finalSelectedApps,
            },
            "success",
            "pending_payment 有効化＋プロビジョニング"
          );
          break;
        }

        // 重複チェック（同じstripe_customer_idで既にactiveアカウントがあるか）
        const { data: existing } = await supabase
          .from("clinic_accounts")
          .select("id")
          .eq("stripe_customer_id", stripeCustomerId)
          .eq("status", "active")
          .maybeSingle();

        if (existing) {
          console.log(
            `既存アカウントあり（stripe_customer_id: ${stripeCustomerId}）。スキップ。`
          );
          await logWebhookEvent(
            supabase,
            event.type,
            event.id,
            { session_id: session.id, stripe_customer_id: stripeCustomerId },
            "success",
            "既存アカウント検出。スキップ。"
          );
          break;
        }

        // selected_appsをパース
        let selectedApps: string[];
        try {
          selectedApps = JSON.parse(selectedAppsRaw);
        } catch {
          selectedApps = [];
        }

        // plan_typeの決定（monthly / yearly / onetime）
        let planType: "monthly" | "yearly" | "onetime";
        if (paymentType === "monthly") {
          planType = "monthly";
        } else if (paymentType === "yearly") {
          planType = "yearly";
        } else {
          planType = "onetime";
        }

        // ユニークclinic_id生成（衝突回避リトライ付き）
        let clinicId = generateClinicId();
        let retries = 0;
        while (retries < 5) {
          const { data: dup } = await supabase
            .from("clinic_accounts")
            .select("id")
            .eq("clinic_id", clinicId)
            .maybeSingle();
          if (!dup) break;
          clinicId = generateClinicId();
          retries++;
        }

        // ランダムパスワード生成
        const password = generatePassword();

        // Supabase Auth でユーザー作成
        const { data: authData, error: authError } =
          await supabase.auth.admin.createUser({
            email,
            password,
            email_confirm: true,
            user_metadata: {
              clinic_id: clinicId,
              clinic_name: clinicName,
            },
          });

        if (authError) {
          console.error("ユーザー作成エラー:", authError);
          await logWebhookEvent(
            supabase,
            event.type,
            event.id,
            { email, clinic_name: clinicName },
            "error",
            `Auth作成エラー: ${authError.message}`
          );
          break;
        }

        // 買い切りの場合、保守費サブスクスケジュールを作成
        let maintenanceInfo: { scheduleId: string; startsAt: string } | null = null;
        if (planType === "onetime" && stripeCustomerId) {
          maintenanceInfo = await createMaintenanceSubscriptionSchedule(
            stripe,
            stripeCustomerId,
            clinicName
          );
        }

        // metadata構築
        const accountMetadata: Record<string, unknown> = {
          plan_name: planName,
          payment_type: paymentType,
          created_via: "stripe_checkout",
        };

        if (maintenanceInfo) {
          accountMetadata.maintenance_fee_starts = maintenanceInfo.startsAt.split("T")[0];
          accountMetadata.maintenance_schedule_id = maintenanceInfo.scheduleId;
          accountMetadata.maintenance_fee_amount = getMaintenanceFeeAmount();
        }

        // clinic_accounts テーブルに院情報を保存
        const { error: insertError } = await supabase
          .from("clinic_accounts")
          .insert({
            user_id: authData.user.id,
            clinic_id: clinicId,
            clinic_name: clinicName,
            email,
            plan_type: planType,
            selected_apps: selectedApps,
            stripe_customer_id: stripeCustomerId,
            stripe_subscription_id: stripeSubscriptionId,
            status: "active",
            metadata: accountMetadata,
          });

        if (insertError) {
          console.error("院情報保存エラー:", insertError);
          await logWebhookEvent(
            supabase,
            event.type,
            event.id,
            { email, clinic_name: clinicName },
            "error",
            `DB保存エラー: ${insertError.message}`
          );
          break;
        }

        // clinicsテーブルに挿入（アプリ側で使用）
        const appFlags: Record<string, boolean> = {};
        for (const app of selectedApps) {
          const flag = APP_FLAG_MAP[app];
          if (flag) appFlags[flag] = true;
        }

        const clinicCode = clinicName
          .replace(/[^\w\u3000-\u9fff]/g, "")
          .slice(0, 20)
          .toLowerCase() || `clinic-${Date.now()}`;

        const { data: clinic, error: clinicError } = await supabase
          .from("clinics")
          .insert({
            name: clinicName,
            code: clinicCode,
            owner_name: "",
            phone: "",
            email,
            plan: selectedApps.includes("kensa") ? "basic" : "active",
            is_active: true,
            theme_color: "#2563eb",
            max_staff: 5,
            max_exams_per_month: 9999,
            max_patients: 9999,
            max_checks_per_month: 9999,
            notes: `Stripe購入から自動作成 | ${clinicId}`,
            stripe_customer_id: stripeCustomerId || "",
            ...appFlags,
          })
          .select()
          .single();

        if (clinicError) console.error("clinics挿入エラー:", clinicError);

        // clinic_membersに挿入
        if (clinic && authData.user) {
          const { error: memberError } = await supabase
            .from("clinic_members")
            .insert({
              clinic_id: clinic.id,
              user_id: authData.user.id,
              role: "owner",
              display_name: clinicName,
              is_active: true,
            });
          if (memberError) console.error("clinic_members挿入エラー:", memberError);
        }

        // MEOアプリが含まれている場合、MEOテーブルを自動作成
        if (selectedApps.includes("meo") && authData.user) {
          const meoClinicId = `clinic-${Date.now().toString(36)}`;

          await supabase
            .from("meo_user_settings")
            .upsert({
              user_id: authData.user.id,
              anthropic_key: "",
              active_clinic_id: meoClinicId,
              serp_api_key: "",
            }, { onConflict: "user_id" });

          await supabase
            .from("meo_clinics")
            .upsert({
              id: meoClinicId,
              user_id: authData.user.id,
              name: clinicName,
              area: "",
              keywords: [],
              category: "整体院",
              owner_name: "",
            }, { onConflict: "id,user_id" });
        }

        // 成功ログ
        console.log("=== 新規アカウント発行 ===");
        console.log(`clinic_id: ${clinicId}`);
        console.log(`院名: ${clinicName}`);
        console.log(`プラン: ${planName} (${planType})`);
        console.log(`メール: ${email}`);
        console.log(`パスワード: ${password}`);
        console.log(`選択アプリ: ${selectedApps.join(", ")}`);
        console.log(`Stripe Customer: ${stripeCustomerId}`);
        console.log(`Stripe Subscription: ${stripeSubscriptionId || "なし"}`);
        if (maintenanceInfo) {
          console.log(`保守費開始: ${maintenanceInfo.startsAt}`);
          console.log(`保守費スケジュール: ${maintenanceInfo.scheduleId}`);
        }
        console.log("========================");

        await logWebhookEvent(
          supabase,
          event.type,
          event.id,
          {
            clinic_id: clinicId,
            email,
            clinic_name: clinicName,
            plan_type: planType,
            selected_apps: selectedApps,
            maintenance_info: maintenanceInfo,
          },
          "success"
        );

        // ウェルカムメール送信（メール失敗でもwebhook全体は成功扱い）
        if (process.env.RESEND_API_KEY) {
          const { sendAppWelcomeEmail, sendAdminNotification } = await import('@/app/lib/email')

          // アプリごとに専用ウェルカムメールを送信
          for (const appId of selectedApps) {
            sendAppWelcomeEmail({
              to: email,
              clinicName,
              clinicId,
              password,
              appId,
              planType,
            }).catch(err => console.error(`${appId}ウェルカムメールエラー:`, err))
          }

          sendAdminNotification({
            clinicName,
            email,
            planType,
            selectedApps,
          }).catch(err => console.error('管理者通知メールエラー:', err))
        }

        // LINE通知（新規契約）
        const appLabelsForLine = selectedApps.map(id => {
          const cfg = APP_CONFIGS.find(a => a.id === id);
          return cfg?.label || id;
        });
        const contractLineMsg = [
          "【新規契約】",
          `院名: ${clinicName}`,
          `メール: ${email}`,
          `プラン: ${planName} (${planType})`,
          `アプリ: ${appLabelsForLine.join(", ")}`,
          `院ID: ${clinicId}`,
        ].join("\n");
        sendLINENotify(contractLineMsg).catch(err => console.error("LINE通知エラー:", err));

        break;
      }

      // ========================================
      // サブスクリプション解約
      // ========================================
      case "customer.subscription.deleted": {
        const subscription = event.data.object as Stripe.Subscription;
        const subscriptionId = subscription.id;
        const customerId = subscription.customer as string;

        // stripe_subscription_id または stripe_customer_id で検索
        const { data: account } = await supabase
          .from("clinic_accounts")
          .select("id, clinic_id, clinic_name, email")
          .or(
            `stripe_subscription_id.eq.${subscriptionId},stripe_customer_id.eq.${customerId}`
          )
          .maybeSingle();

        if (!account) {
          console.error(
            `解約対象アカウントが見つかりません: subscription=${subscriptionId}, customer=${customerId}`
          );
          await logWebhookEvent(
            supabase,
            event.type,
            event.id,
            { subscription_id: subscriptionId, customer_id: customerId },
            "error",
            "対象アカウントが見つかりません"
          );
          break;
        }

        const { error: updateError } = await supabase
          .from("clinic_accounts")
          .update({
            status: "cancelled",
            cancelled_at: new Date().toISOString(),
          })
          .eq("id", account.id);

        if (updateError) {
          console.error("解約ステータス更新エラー:", updateError);
          await logWebhookEvent(
            supabase,
            event.type,
            event.id,
            { account_id: account.id },
            "error",
            `更新エラー: ${updateError.message}`
          );
        } else {
          // clinicsテーブルも無効化
          const { data: clinicRows } = await supabase
            .from("clinics")
            .select("id")
            .like("notes", `%${account.clinic_id}%`);
          if (clinicRows && clinicRows.length > 0) {
            await supabase
              .from("clinics")
              .update({ is_active: false })
              .eq("id", clinicRows[0].id);
          }

          console.log(
            `サブスクリプション解約完了: clinic_id=${account.clinic_id}, email=${account.email}`
          );
          await logWebhookEvent(
            supabase,
            event.type,
            event.id,
            {
              clinic_id: account.clinic_id,
              email: account.email,
              subscription_id: subscriptionId,
            },
            "success"
          );

          // LINE通知（解約）
          sendLINENotify(
            `【解約】\n院ID: ${account.clinic_id}\nメール: ${account.email}`
          ).catch(err => console.error("LINE通知エラー:", err));

          // 管理者への解約通知メール
          if (process.env.RESEND_API_KEY) {
            import('@/app/lib/email').then(({ sendAdminCancellationNotification }) => {
              sendAdminCancellationNotification({
                clinicName: account.clinic_name || account.clinic_id,
                email: account.email,
              }).catch(err => console.error('管理者解約通知メールエラー:', err))
            }).catch(err => console.error('管理者解約通知メールインポートエラー:', err))
          }
        }

        break;
      }

      // ========================================
      // サブスクリプション更新（プラン変更等）
      // ========================================
      case "customer.subscription.updated": {
        const subscription = event.data.object as Stripe.Subscription;
        const subscriptionId = subscription.id;
        const customerId = subscription.customer as string;
        const subscriptionStatus = subscription.status;

        // 対象アカウント検索
        const { data: account } = await supabase
          .from("clinic_accounts")
          .select("id, clinic_id, status")
          .or(
            `stripe_subscription_id.eq.${subscriptionId},stripe_customer_id.eq.${customerId}`
          )
          .maybeSingle();

        if (!account) {
          console.log(
            `subscription.updated: 対象アカウントなし subscription=${subscriptionId}`
          );
          break;
        }

        // Stripeのステータスをアプリ側ステータスにマッピング
        let newStatus: string = account.status;
        if (subscriptionStatus === "active") {
          newStatus = "active";
        } else if (subscriptionStatus === "past_due") {
          newStatus = "payment_failed";
        } else if (
          subscriptionStatus === "canceled" ||
          subscriptionStatus === "unpaid"
        ) {
          newStatus = "cancelled";
        }

        const updateData: Record<string, unknown> = {
          status: newStatus,
          metadata: {
            stripe_subscription_status: subscriptionStatus,
            last_updated_at: new Date().toISOString(),
          },
        };

        // キャンセルされた場合はcancelled_atを設定
        if (newStatus === "cancelled" && account.status !== "cancelled") {
          updateData.cancelled_at = new Date().toISOString();
        }

        // activeに復帰した場合はcancelled_atをクリア
        if (newStatus === "active" && account.status === "cancelled") {
          updateData.cancelled_at = null;
        }

        const { error: updateError } = await supabase
          .from("clinic_accounts")
          .update(updateData)
          .eq("id", account.id);

        if (updateError) {
          console.error("サブスクリプション更新エラー:", updateError);
          await logWebhookEvent(
            supabase,
            event.type,
            event.id,
            { account_id: account.id, subscription_id: subscriptionId },
            "error",
            `更新エラー: ${updateError.message}`
          );
        } else {
          console.log(
            `サブスクリプション更新: clinic_id=${account.clinic_id}, status=${newStatus}`
          );
          await logWebhookEvent(
            supabase,
            event.type,
            event.id,
            {
              clinic_id: account.clinic_id,
              old_status: account.status,
              new_status: newStatus,
              stripe_status: subscriptionStatus,
            },
            "success"
          );
        }

        break;
      }

      // ========================================
      // 決済失敗
      // ========================================
      case "invoice.payment_failed": {
        const invoiceObj = event.data.object as unknown as Record<string, unknown>;
        const customerId = invoiceObj.customer as string;
        const subscriptionId = (invoiceObj.subscription as string) || null;

        // 対象アカウント検索
        const { data: account } = await supabase
          .from("clinic_accounts")
          .select("id, clinic_id, email, clinic_name")
          .eq("stripe_customer_id", customerId)
          .maybeSingle();

        if (!account) {
          console.log(
            `payment_failed: 対象アカウントなし customer=${customerId}`
          );
          await logWebhookEvent(
            supabase,
            event.type,
            event.id,
            { customer_id: customerId, subscription_id: subscriptionId },
            "error",
            "対象アカウントが見つかりません"
          );
          break;
        }

        const { error: updateError } = await supabase
          .from("clinic_accounts")
          .update({
            status: "payment_failed",
            metadata: {
              last_payment_failed_at: new Date().toISOString(),
              invoice_id: invoiceObj.id as string,
              attempt_count: invoiceObj.attempt_count ?? null,
            },
          })
          .eq("id", account.id);

        if (updateError) {
          console.error("決済失敗ステータス更新エラー:", updateError);
          await logWebhookEvent(
            supabase,
            event.type,
            event.id,
            { account_id: account.id },
            "error",
            `更新エラー: ${updateError.message}`
          );
        } else {
          console.log(
            `決済失敗: clinic_id=${account.clinic_id}, email=${account.email}, invoice=${invoiceObj.id}`
          );
          await logWebhookEvent(
            supabase,
            event.type,
            event.id,
            {
              clinic_id: account.clinic_id,
              email: account.email,
              invoice_id: invoiceObj.id as string,
            },
            "success"
          );
        }

        // 決済失敗通知メール
        if (process.env.RESEND_API_KEY) {
          const { sendPaymentFailedEmail } = await import('@/app/lib/email')
          await sendPaymentFailedEmail({
            to: account.email,
            clinicName: account.clinic_name,
          })
        }

        // LINE通知（決済失敗）
        sendLINENotify(
          `【決済失敗】\n院名: ${account.clinic_name}\nメール: ${account.email}\n院ID: ${account.clinic_id}`
        ).catch(err => console.error("LINE通知エラー:", err));

        break;
      }

      default:
        console.log(`未処理のイベント: ${event.type}`);
    }
  } catch (error) {
    console.error("Webhook処理エラー:", error);
    await logWebhookEvent(
      supabase,
      event.type,
      event.id,
      {},
      "error",
      error instanceof Error ? error.message : "不明なエラー"
    );
    return NextResponse.json(
      { error: "Webhook処理に失敗しました" },
      { status: 500 }
    );
  }

  return NextResponse.json({ received: true });
}
