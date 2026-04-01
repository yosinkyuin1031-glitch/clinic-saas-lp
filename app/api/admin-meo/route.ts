import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/app/lib/supabase";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "clinic-admin-2026";

function isAuthenticated(req: NextRequest): boolean {
  const headerPassword = req.headers.get("x-admin-password");
  if (headerPassword === ADMIN_PASSWORD) return true;
  return false;
}

export async function GET(req: NextRequest) {
  if (!isAuthenticated(req)) {
    return NextResponse.json({ error: "認証に失敗しました" }, { status: 401 });
  }

  try {
    const supabase = createAdminClient();

    // 1. MEOユーザー一覧（auth.usersから最終ログイン日も取得）
    const { data: authUsers } = await supabase.auth.admin.listUsers();
    const users = authUsers?.users || [];

    // 2. MEOクリニック情報
    const { data: clinics } = await supabase
      .from("meo_clinics")
      .select("*");

    // 3. MEOランキング履歴（直近30日分）
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const { data: rankings } = await supabase
      .from("meo_ranking_history")
      .select("*")
      .gte("checked_at", thirtyDaysAgo.toISOString())
      .order("checked_at", { ascending: false });

    // 4. MEOユーザー設定
    const { data: userSettings } = await supabase
      .from("meo_user_settings")
      .select("*");

    // 5. clinic_accountsからMEO契約者を取得
    const { data: accounts } = await supabase
      .from("clinic_accounts")
      .select("*")
      .contains("selected_apps", ["meo"]);

    // ユーザーごとにデータを結合
    const monitors = users
      .filter((u) => {
        // MEOに関連するユーザーのみ
        const hasClinic = clinics?.some((c) => c.user_id === u.id);
        const hasSetting = userSettings?.some((s) => s.user_id === u.id);
        return hasClinic || hasSetting;
      })
      .map((user) => {
        const userClinics = clinics?.filter((c) => c.user_id === user.id) || [];
        const userRankings = rankings?.filter((r) => r.user_id === user.id) || [];
        const account = accounts?.find((a) => a.email === user.email);

        // キーワードごとの最新順位と前回順位を計算
        const keywordMap: Record<string, { latest: number | null; previous: number | null; latestDate: string; previousDate: string; keyword: string }> = {};
        for (const r of userRankings) {
          if (!keywordMap[r.keyword]) {
            keywordMap[r.keyword] = {
              keyword: r.keyword,
              latest: r.rank,
              previous: null,
              latestDate: r.checked_at,
              previousDate: "",
            };
          } else if (!keywordMap[r.keyword].previous && r.checked_at !== keywordMap[r.keyword].latestDate) {
            keywordMap[r.keyword].previous = r.rank;
            keywordMap[r.keyword].previousDate = r.checked_at;
          }
        }

        return {
          user_id: user.id,
          email: user.email,
          last_sign_in: user.last_sign_in_at,
          created_at: user.created_at,
          clinics: userClinics.map((c) => ({
            id: c.id,
            name: c.name,
            area: c.area,
            category: c.category,
            keywords: c.keywords || [],
          })),
          rankings: Object.values(keywordMap),
          account_status: account?.status || null,
          clinic_name_account: account?.clinic_name || null,
        };
      });

    return NextResponse.json({ monitors });
  } catch (e) {
    console.error("MEO admin error:", e);
    return NextResponse.json({ error: "サーバーエラーが発生しました" }, { status: 500 });
  }
}

// 順位スナップショットを保存
export async function POST(req: NextRequest) {
  if (!isAuthenticated(req)) {
    return NextResponse.json({ error: "認証に失敗しました" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { user_id, keyword, rank, previous_rank, snapshot_data } = body;

    const supabase = createAdminClient();

    const { data, error } = await supabase
      .from("meo_ranking_snapshots")
      .insert({
        user_id,
        keyword,
        rank,
        previous_rank,
        change: previous_rank && rank ? previous_rank - rank : null,
        snapshot_data,
        created_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ snapshot: data });
  } catch (e) {
    console.error("Snapshot save error:", e);
    return NextResponse.json({ error: "サーバーエラーが発生しました" }, { status: 500 });
  }
}
