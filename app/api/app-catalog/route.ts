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
    const catalog: CatalogItem[] = [];

    for (const app of APP_CONFIGS) {
      let stripeMonthly: number | null = null;
      let stripeInitial: number | null = null;
      let stripeMaintenance: number | null = null;

      try {
        if (app.stripe.monthly_price_id) {
          const p = await stripe.prices.retrieve(app.stripe.monthly_price_id);
          stripeMonthly = typeof p.unit_amount === "number" ? p.unit_amount : null;
        }
      } catch (e) {
        console.error(`monthly price取得失敗 ${app.id}:`, e);
      }
      try {
        if (app.stripe.onetime_price_id) {
          const p = await stripe.prices.retrieve(app.stripe.onetime_price_id);
          stripeInitial = typeof p.unit_amount === "number" ? p.unit_amount : null;
        }
      } catch (e) {
        console.error(`onetime price取得失敗 ${app.id}:`, e);
      }
      try {
        if (app.stripe.maintenance_price_id) {
          const p = await stripe.prices.retrieve(app.stripe.maintenance_price_id);
          stripeMaintenance = typeof p.unit_amount === "number" ? p.unit_amount : null;
        }
      } catch (e) {
        console.error(`maintenance price取得失敗 ${app.id}:`, e);
      }

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
