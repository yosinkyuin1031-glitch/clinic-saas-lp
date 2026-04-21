import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-12-18.acacia" as Stripe.LatestApiVersion,
});

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "clinic-admin-2026";

function isAuthenticated(req: NextRequest): boolean {
  const pw = req.headers.get("x-admin-password");
  return pw === ADMIN_PASSWORD;
}

export async function GET(req: NextRequest) {
  if (!isAuthenticated(req)) {
    return NextResponse.json({ error: "認証に失敗しました" }, { status: 401 });
  }

  try {
    // 1. アクティブなサブスクリプション一覧
    const subscriptions: Stripe.Subscription[] = [];
    let hasMore = true;
    let startingAfter: string | undefined;
    while (hasMore) {
      const params: Stripe.SubscriptionListParams = {
        limit: 100,
        status: "active",
        expand: ["data.customer"],
      };
      if (startingAfter) params.starting_after = startingAfter;
      const batch = await stripe.subscriptions.list(params);
      subscriptions.push(...batch.data);
      hasMore = batch.has_more;
      if (batch.data.length > 0) startingAfter = batch.data[batch.data.length - 1].id;
    }

    // 2. 直近12ヶ月の入金（charges）を取得
    const now = new Date();
    const twelveMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 11, 1);
    const charges: Stripe.Charge[] = [];
    hasMore = true;
    startingAfter = undefined;
    while (hasMore) {
      const params: Stripe.ChargeListParams = {
        limit: 100,
        created: { gte: Math.floor(twelveMonthsAgo.getTime() / 1000) },
      };
      if (startingAfter) params.starting_after = startingAfter;
      const batch = await stripe.charges.list(params);
      charges.push(...batch.data);
      hasMore = batch.has_more;
      if (batch.data.length > 0) startingAfter = batch.data[batch.data.length - 1].id;
    }

    // サブスクリプションをまとめる
    const activeSubscriptions = subscriptions.map((sub) => {
      const customer = sub.customer as Stripe.Customer;
      const items = sub.items.data.map((item) => ({
        product_id: typeof item.price.product === "string" ? item.price.product : (item.price.product as Stripe.Product).id,
        price_id: item.price.id,
        amount: item.price.unit_amount || 0,
        currency: item.price.currency,
        interval: item.price.recurring?.interval || "month",
      }));
      const monthlyAmount = items.reduce((sum, item) => {
        if (item.interval === "year") return sum + Math.floor(item.amount / 12);
        return sum + item.amount;
      }, 0);

      return {
        id: sub.id,
        customer_id: customer.id,
        customer_email: customer.email,
        customer_name: customer.name,
        status: sub.status,
        created: new Date(sub.created * 1000).toISOString(),
        items,
        monthly_amount: monthlyAmount,
        metadata: sub.metadata,
      };
    });

    // 月別入金集計
    const monthlyCharges: Record<string, { total: number; count: number; succeeded: number }> = {};
    for (const charge of charges) {
      if (charge.status !== "succeeded") continue;
      const date = new Date(charge.created * 1000);
      const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
      if (!monthlyCharges[key]) monthlyCharges[key] = { total: 0, count: 0, succeeded: 0 };
      monthlyCharges[key].total += charge.amount;
      monthlyCharges[key].count += 1;
      monthlyCharges[key].succeeded += 1;
    }

    // Stripe MRR（アクティブサブスクの月額合計）
    const stripeMrr = activeSubscriptions.reduce((sum, sub) => sum + sub.monthly_amount, 0);

    return NextResponse.json({
      subscriptions: activeSubscriptions,
      monthly_charges: monthlyCharges,
      stripe_mrr: stripeMrr,
      subscription_count: activeSubscriptions.length,
    });
  } catch (e) {
    console.error("Stripe API error:", e);
    return NextResponse.json({ error: "Stripeデータの取得に失敗しました" }, { status: 500 });
  }
}
