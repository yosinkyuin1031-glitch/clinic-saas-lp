import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2026-02-25.clover",
});

// プラン別料金（税込・円）
const PLAN_PRICES: Record<string, { amount: number; description: string }> = {
  ライト: {
    amount: 5500,
    description: "ClinicDX ライト（梅）- 検査アプリのみ",
  },
  スタンダード: {
    amount: 9800,
    description: "ClinicDX スタンダード（竹）- 検査+顧客管理+予約",
  },
  プレミアム: {
    amount: 12800,
    description: "ClinicDX プレミアム（松）- 全5アプリ",
  },
};

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { planName, email, clinicName } = body;

    if (!planName || !email || !clinicName) {
      return NextResponse.json(
        { error: "プラン名・メールアドレス・院名は必須です" },
        { status: 400 }
      );
    }

    const plan = PLAN_PRICES[planName];
    if (!plan) {
      return NextResponse.json(
        { error: "無効なプランが選択されました" },
        { status: 400 }
      );
    }

    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      customer_email: email,
      line_items: [
        {
          price_data: {
            currency: "jpy",
            product_data: {
              name: plan.description,
            },
            unit_amount: plan.amount,
            recurring: {
              interval: "month",
            },
          },
          quantity: 1,
        },
      ],
      metadata: {
        clinicName,
        planName,
      },
      success_url: `${appUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${appUrl}/`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Checkout API error:", error);
    return NextResponse.json(
      { error: "決済セッションの作成に失敗しました" },
      { status: 500 }
    );
  }
}
