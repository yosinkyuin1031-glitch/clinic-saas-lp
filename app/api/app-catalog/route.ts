import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { APP_CONFIGS } from "@/app/lib/app-config";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-12-18.acacia" as Stripe.LatestApiVersion,
});

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "clinic-admin-2026";

function isAuthenticated(req: NextRequest): boolean {
  const pw = req.headers.get("x-admin-password") || req.nextUrl.searchParams.get("password");
  return pw === ADMIN_PASSWORD;
}

interface CatalogItem {
  id: string;
  label: string;
  forSale: boolean;
  clinicFlag: string | null;
  configMonthly: number;
  configInitial: number;
  stripeMonthly: number | null;
  stripeInitial: number | null;
  stripeMaintenance: number | null;
  productId: string;
  monthlyPriceId: string;
  onetimePriceId: string | null;
  maintenancePriceId: string;
  priceMismatch: {
    monthly: boolean;
    initial: boolean;
  };
  loginUrl: string;
  emailConfigured: boolean;
}

export async function GET(req: NextRequest) {
  if (!isAuthenticated(req)) {
    return NextResponse.json({ error: "認証に失敗しました" }, { status: 401 });
  }

  try {
    // 全priceを一括取得（1回のAPI call）
    const priceMap = new Map<string, number | null>();
    try {
      let hasMore = true;
      let startingAfter: string | undefined;
      while (hasMore) {
        const batch: Stripe.ApiListPromise<Stripe.Price> = stripe.prices.list({
          limit: 100,
          active: true,
          starting_after: startingAfter,
        });
        const result = await batch;
        for (const p of result.data) {
          priceMap.set(p.id, typeof p.unit_amount === "number" ? p.unit_amount : null);
        }
        hasMore = result.has_more;
        if (result.data.length > 0) startingAfter = result.data[result.data.length - 1].id;
      }
    } catch (e) {
      console.error("Stripe prices取得失敗:", e);
    }

    const catalog: CatalogItem[] = [];

    for (const app of APP_CONFIGS) {
      const stripeMonthly = app.stripe.monthly_price_id ? (priceMap.get(app.stripe.monthly_price_id) ?? null) : null;
      const stripeInitial = app.stripe.onetime_price_id ? (priceMap.get(app.stripe.onetime_price_id) ?? null) : null;
      const stripeMaintenance = app.stripe.maintenance_price_id ? (priceMap.get(app.stripe.maintenance_price_id) ?? null) : null;

      catalog.push({
        id: app.id,
        label: app.label,
        forSale: app.forSale,
        clinicFlag: app.clinicFlag,
        configMonthly: app.monthlyPrice,
        configInitial: app.initialCost,
        stripeMonthly,
        stripeInitial,
        stripeMaintenance,
        productId: app.stripe.product_id,
        monthlyPriceId: app.stripe.monthly_price_id,
        onetimePriceId: app.stripe.onetime_price_id,
        maintenancePriceId: app.stripe.maintenance_price_id,
        priceMismatch: {
          monthly: stripeMonthly !== null && stripeMonthly !== app.monthlyPrice,
          initial: stripeInitial !== null && stripeInitial !== app.initialCost,
        },
        loginUrl: app.email.loginUrl,
        emailConfigured: Boolean(app.email.loginUrl && app.email.tagline && app.email.intro),
      });
    }

    const mismatchCount = catalog.filter(
      (c) => c.priceMismatch.monthly || c.priceMismatch.initial
    ).length;

    return NextResponse.json({
      catalog,
      totalApps: catalog.length,
      forSaleCount: catalog.filter((c) => c.forSale).length,
      mismatchCount,
      generatedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error("catalog取得エラー:", error);
    return NextResponse.json({ error: "カタログ取得に失敗しました" }, { status: 500 });
  }
}
