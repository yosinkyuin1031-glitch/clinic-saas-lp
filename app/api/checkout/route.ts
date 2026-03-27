import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

function getStripe() {
  if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error("STRIPE_SECRET_KEY is not set");
  }
  return new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2026-02-25.clover",
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { planName, email, clinicName, amount, paymentType, selectedApps } = body;

    if (!email || !clinicName || !amount || !selectedApps || selectedApps.length === 0) {
      return NextResponse.json(
        { error: "メールアドレス・院名・選択システムは必須です" },
        { status: 400 }
      );
    }

    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
    const isSubscription = paymentType === "monthly";

    const lineItem: Stripe.Checkout.SessionCreateParams.LineItem = {
      price_data: {
        currency: "jpy",
        product_data: {
          name: planName || "ClinicDX カスタムプラン",
        },
        unit_amount: amount,
        ...(isSubscription
          ? {
              recurring: {
                interval: "month",
              },
            }
          : {}),
      },
      quantity: 1,
    };

    const stripe = getStripe();
    const session = await stripe.checkout.sessions.create({
      mode: isSubscription ? "subscription" : "payment",
      payment_method_types: ["card"],
      customer_email: email,
      line_items: [lineItem],
      metadata: {
        clinicName,
        planName: planName || "",
        paymentType: paymentType || "monthly",
        selectedApps: JSON.stringify(selectedApps),
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
