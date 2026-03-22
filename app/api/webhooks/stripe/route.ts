import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { createAdminClient } from "@/app/lib/supabase";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2026-02-25.clover",
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

// ランダムパスワード生成（8文字英数字）
function generatePassword(length = 8): string {
  const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let password = "";
  for (let i = 0; i < length; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return password;
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
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;

        const email = session.customer_email;
        const clinicName = session.metadata?.clinicName;
        const planName = session.metadata?.planName;
        const stripeCustomerId = session.customer as string;
        const stripeSubscriptionId = session.subscription as string;

        if (!email) {
          console.error("メールアドレスが見つかりません");
          break;
        }

        // ランダムパスワード生成
        const password = generatePassword();

        // Supabase Admin APIでユーザー作成
        const { data: authData, error: authError } =
          await supabase.auth.admin.createUser({
            email,
            password,
            email_confirm: true,
          });

        if (authError) {
          console.error("ユーザー作成エラー:", authError);
          break;
        }

        // clinic_accounts テーブルに院情報を保存
        const { error: insertError } = await supabase
          .from("clinic_accounts")
          .insert({
            user_id: authData.user.id,
            email,
            clinic_name: clinicName,
            plan: planName,
            stripe_customer_id: stripeCustomerId,
            stripe_subscription_id: stripeSubscriptionId,
            status: "active",
          });

        if (insertError) {
          console.error("院情報保存エラー:", insertError);
          break;
        }

        // ログイン情報をログ出力（メール送信は後で実装）
        console.log("=== 新規アカウント発行 ===");
        console.log(`院名: ${clinicName}`);
        console.log(`プラン: ${planName}`);
        console.log(`メール: ${email}`);
        console.log(`パスワード: ${password}`);
        console.log(`Stripe Customer: ${stripeCustomerId}`);
        console.log(`Stripe Subscription: ${stripeSubscriptionId}`);
        console.log("========================");

        break;
      }

      case "customer.subscription.deleted": {
        const subscription = event.data.object as Stripe.Subscription;
        const subscriptionId = subscription.id;

        // アカウントのstatusを'canceled'に更新
        const { error: updateError } = await supabase
          .from("clinic_accounts")
          .update({ status: "canceled" })
          .eq("stripe_subscription_id", subscriptionId);

        if (updateError) {
          console.error("ステータス更新エラー:", updateError);
        } else {
          console.log(`サブスクリプション ${subscriptionId} をキャンセルしました`);
        }

        break;
      }

      default:
        console.log(`未処理のイベント: ${event.type}`);
    }
  } catch (error) {
    console.error("Webhook処理エラー:", error);
    return NextResponse.json(
      { error: "Webhook処理に失敗しました" },
      { status: 500 }
    );
  }

  return NextResponse.json({ received: true });
}
