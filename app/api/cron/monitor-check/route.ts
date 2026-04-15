import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/app/lib/supabase";
import { sendLINENotify } from "@/app/lib/line-notify";

// モニター期限チェック（毎日cronで実行）
// GET /api/cron/monitor-check?key=ADMIN_PASSWORD
export async function GET(req: NextRequest) {
  // 簡易認証（cronからの呼び出し用）
  const key = req.nextUrl.searchParams.get("key");
  if (key !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = createAdminClient();
  const now = new Date();
  const today = now.toISOString().split("T")[0];

  // clinic_accountsからモニター（monitor status）を取得
  // metadataにmonitor_start_dateやmonitor_end_dateがあるものを対象
  const { data: accounts, error } = await supabase
    .from("clinic_accounts")
    .select("*")
    .eq("status", "active");

  if (error) {
    console.error("モニターチェックエラー:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const notifications: string[] = [];
  const expiredMonitors: string[] = [];
  const soonExpiring: string[] = [];

  for (const account of accounts || []) {
    const meta = account.metadata as Record<string, unknown> | null;
    if (!meta) continue;

    const monitorEndDate = meta.monitor_end_date as string | undefined;
    const isMonitor = meta.is_monitor === true || meta.created_via === "monitor";

    if (!isMonitor || !monitorEndDate) continue;

    const endDate = new Date(monitorEndDate);
    const daysLeft = Math.ceil((endDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

    if (daysLeft < 0) {
      // 期限切れ
      expiredMonitors.push(
        `${account.clinic_name}（${account.email}）: ${Math.abs(daysLeft)}日超過`
      );
    } else if (daysLeft <= 7) {
      // 7日以内に期限切れ
      soonExpiring.push(
        `${account.clinic_name}（${account.email}）: 残り${daysLeft}日（${monitorEndDate}）`
      );
    }
  }

  // LINE通知を送る
  if (expiredMonitors.length > 0) {
    const msg = [
      "【モニター期限切れ】",
      ...expiredMonitors,
      "",
      "有料移行の案内を送ってください。",
    ].join("\n");
    notifications.push(msg);
    await sendLINENotify(msg);
  }

  if (soonExpiring.length > 0) {
    const msg = [
      "【モニター期限間近】",
      ...soonExpiring,
      "",
      "有料移行の事前案内を検討してください。",
    ].join("\n");
    notifications.push(msg);
    await sendLINENotify(msg);
  }

  return NextResponse.json({
    checked_at: today,
    total_active: accounts?.length || 0,
    expired: expiredMonitors.length,
    soon_expiring: soonExpiring.length,
    notifications_sent: notifications.length,
  });
}
