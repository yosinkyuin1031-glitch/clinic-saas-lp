import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { APP_CONFIGS } from "@/app/lib/app-config";
import { sendLINENotify } from "@/app/lib/line-notify";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-12-18.acacia" as Stripe.LatestApiVersion,
});

// 料金整合性を毎日チェックし、不一致があればLINE通知
// GET /api/cron/price-check?key=ADMIN_PASSWORD
export async function GET(req: NextRequest) {
  const key = req.nextUrl.searchParams.get("key");
  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "clinic-admin-2026";
  if (key !== ADMIN_PASSWORD) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const mismatches: string[] = [];
  const visibleApps = APP_CONFIGS.filter((a) => !a.hiddenFromCatalog);

  for (const app of visibleApps) {
    try {
      if (app.stripe.monthly_price_id) {
        const p = await stripe.prices.retrieve(app.stripe.monthly_price_id);
        const stripeAmount = typeof p.unit_amount === "number" ? p.unit_amount : null;
        if (stripeAmount !== null && stripeAmount !== app.monthlyPrice) {
          mismatches.push(
            `${app.label}（月額）: config ¥${app.monthlyPrice.toLocaleString()} vs Stripe ¥${stripeAmount.toLocaleString()}`
          );
        }
      }
    } catch (e) {
      console.error(`${app.id} monthly price検証失敗:`, e);
    }
    try {
      if (app.stripe.onetime_price_id) {
        const p = await stripe.prices.retrieve(app.stripe.onetime_price_id);
        const stripeAmount = typeof p.unit_amount === "number" ? p.unit_amount : null;
        if (stripeAmount !== null && stripeAmount !== app.initialCost) {
          mismatches.push(
            `${app.label}（初期）: config ¥${app.initialCost.toLocaleString()} vs Stripe ¥${stripeAmount.toLocaleString()}`
          );
        }
      }
    } catch (e) {
      console.error(`${app.id} onetime price検証失敗:`, e);
    }
  }

  if (mismatches.length > 0) {
    const msg = [
      "【料金不整合アラート】",
      "以下のアプリで、app-config.tsとStripe価格が一致していません。",
      "",
      ...mismatches,
      "",
      "管理画面: https://clinic-saas-lp.vercel.app/admin",
    ].join("\n");
    await sendLINENotify(msg).catch((e) => console.error("LINE通知失敗:", e));
  }

  return NextResponse.json({
    checked: visibleApps.length,
    mismatchCount: mismatches.length,
    mismatches,
  });
}
