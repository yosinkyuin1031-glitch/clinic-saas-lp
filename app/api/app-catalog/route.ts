import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { APP_CONFIGS } from "@/app/lib/app-config";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

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
    // 必要なprice IDだけを並列取得
    const allPriceIds = new Set<string>();
    for (const app of APP_CONFIGS) {
      if (app.stripe.monthly_price_id) allPriceIds.add(app.stripe.monthly_price_id);
      if (app.stripe.onetime_price_id) allPriceIds.add(app.stripe.onetime_price_id);
      if (app.stripe.maintenance_price_id) allPriceIds.add(app.stripe.maintenance_price_id);
    }

    const priceMap = new Map<string, number | null>();
    const results = await Promise.allSettled(
      Array.from(allPriceIds).map((id) => stripe.prices.retrieve(id))
    );
    for (const r of results) {
      if (r.status === "fulfilled") {
        priceMap.set(r.value.id, typeof r.value.unit_amount === "number" ? r.value.unit_amount : null);
      } else {
        console.error("price取得失敗:", r.reason);
      }
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
