import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { STRIPE_PRODUCTS } from "@/app/lib/app-config";

function getStripe() {
  if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error("STRIPE_SECRET_KEY is not set");
  }
  return new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2026-02-25.clover",
  });
}

type AppId = keyof typeof STRIPE_PRODUCTS;

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { planName, email, clinicName, ownerName, amount, paymentType, selectedApps } = body;

    if (!email || !clinicName || !selectedApps || selectedApps.length === 0) {
      return NextResponse.json(
        { error: "メールアドレス・院名・選択システムは必須です" },
        { status: 400, headers: corsHeaders }
      );
    }

    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
    const stripe = getStripe();

    const metadata = {
      clinicName,
      ownerName: ownerName || "",
      planName: planName || "",
      paymentType: paymentType || "monthly",
      selectedApps: JSON.stringify(selectedApps),
    };

    if (paymentType === "onetime") {
      // 買い切り：一括払い + 保守料金サブスクの同時決済
      const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = [];

      // 買い切り分（一括）
      if (amount > 0) {
        lineItems.push({
          price_data: {
            currency: "jpy",
            product_data: {
              name: `${planName || "カスタムプラン"}（買い切り）`,
            },
            unit_amount: amount,
          },
          quantity: 1,
        });
      }

      // 保守料金分（月額サブスク）
      const maintenancePriceIds = (selectedApps as string[])
        .filter((id): id is AppId => id in STRIPE_PRODUCTS)
        .map((id) => STRIPE_PRODUCTS[id].maintenance_price_id)
        .filter(Boolean);

      for (const priceId of maintenancePriceIds) {
        lineItems.push({
          price: priceId,
          quantity: 1,
        });
      }

      // 一括＋サブスクが混在する場合はsubscriptionモード
      const hasRecurring = maintenancePriceIds.length > 0;

      const session = await stripe.checkout.sessions.create({
        mode: hasRecurring ? "subscription" : "payment",
        payment_method_types: ["card"],
        customer_email: email,
        line_items: lineItems,
        metadata,
        success_url: `${appUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${appUrl}/`,
      });

      return NextResponse.json({ url: session.url }, { headers: corsHeaders });
    } else {
      // 月額 or 年額サブスク
      const lineItem: Stripe.Checkout.SessionCreateParams.LineItem = {
        price_data: {
          currency: "jpy",
          product_data: {
            name: planName || "ClinicDX カスタムプラン",
          },
          unit_amount: amount,
          recurring: {
            interval: paymentType === "yearly" ? "year" : "month",
          },
        },
        quantity: 1,
      };

      const session = await stripe.checkout.sessions.create({
        mode: "subscription",
        payment_method_types: ["card"],
        customer_email: email,
        line_items: [lineItem],
        metadata,
        success_url: `${appUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${appUrl}/`,
      });

      return NextResponse.json({ url: session.url }, { headers: corsHeaders });
    }
  } catch (error) {
    console.error("Checkout API error:", error);
    return NextResponse.json(
      { error: "決済セッションの作成に失敗しました" },
      { status: 500, headers: corsHeaders }
    );
  }
}
