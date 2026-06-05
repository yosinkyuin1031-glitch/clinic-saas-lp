import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { sendLINENotify } from "@/app/lib/line-notify";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2026-02-25.clover" as Stripe.LatestApiVersion,
});

// Stripe Webhookの死活監視
// 全Webhookエンドポイントを取得し、status !== "enabled" のものがあればLINE通知
// 2026-06-05: 結乃音さん決済が1ヶ月以上disabled状態のWebhookで止まっていた事故を受けて設置
// GET /api/cron/webhook-health?key=ADMIN_PASSWORD
export async function GET(req: NextRequest) {
  const key = req.nextUrl.searchParams.get("key");
  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "clinic-admin-2026";
  if (key !== ADMIN_PASSWORD) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  try {
    const endpoints = await stripe.webhookEndpoints.list({ limit: 100 });
    const disabled = endpoints.data.filter((ep) => ep.status !== "enabled");

    if (disabled.length > 0) {
      const lines = [
        "🚨 Stripe Webhookが無効化されています",
        "",
        ...disabled.map((ep) => `・${ep.url}\n  status=${ep.status}`),
        "",
        "→ 新規決済の自動アカウント発行が止まります。",
        "→ Stripe管理画面 or API で再有効化してください。",
      ];
      await sendLINENotify(lines.join("\n"));
    }

    return NextResponse.json({
      ok: true,
      checked_at: new Date().toISOString(),
      total: endpoints.data.length,
      disabled_count: disabled.length,
      disabled: disabled.map((ep) => ({ id: ep.id, url: ep.url, status: ep.status })),
    });
  } catch (err) {
    const errorMsg = err instanceof Error ? err.message : String(err);
    await sendLINENotify(
      `🚨 Webhook死活監視cronがエラー\n${errorMsg}\n\nStripe API疎通 or 環境変数を確認してください。`
    ).catch(() => {});
    return NextResponse.json({ error: errorMsg }, { status: 500 });
  }
}
