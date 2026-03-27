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

  try {
    switch (event.type) {
      // ========================================
      // 決済完了 → アカウント作成
      // ========================================
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;

        const email = session.customer_email;
        const clinicName = session.metadata?.clinicName || "";
        const planName = session.metadata?.planName || "";
        const paymentType = session.metadata?.paymentType || "monthly";
        const selectedAppsRaw = session.metadata?.selectedApps || "[]";
        const stripeCustomerId = session.customer as string;
        const stripeSubscriptionId =
          (session.subscription as string) || null;

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

        // 重複チェック（同じstripe_customer_idで既に作成済みか）
        const { data: existing } = await supabase
          .from("clinic_accounts")
          .select("id")
          .eq("stripe_customer_id", stripeCustomerId)
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

        // plan_typeの決定
        const planType: "monthly" | "onetime" =
          paymentType === "monthly" ? "monthly" : "onetime";

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
            metadata: {
              plan_name: planName,
              payment_type: paymentType,
              created_via: "stripe_checkout",
            },
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
          },
          "success"
        );

        // ウェルカムメール送信
        if (process.env.RESEND_API_KEY) {
          const { sendWelcomeEmail } = await import('@/app/lib/email')
          await sendWelcomeEmail({
            to: email,
            clinicName,
            clinicId,
            password,
            selectedApps,
            planType,
          })
        }

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
          .select("id, clinic_id, email")
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
