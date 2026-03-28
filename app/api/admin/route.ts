import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/app/lib/supabase";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "clinic-admin-2026";

function isAuthenticated(req: NextRequest): boolean {
  // ヘッダー認証
  const headerPassword = req.headers.get("x-admin-password");
  if (headerPassword === ADMIN_PASSWORD) return true;

  // クエリパラメータ認証
  const url = new URL(req.url);
  const queryPassword = url.searchParams.get("password");
  if (queryPassword === ADMIN_PASSWORD) return true;

  return false;
}

export async function GET(req: NextRequest) {
  if (!isAuthenticated(req)) {
    return NextResponse.json(
      { error: "認証に失敗しました" },
      { status: 401 }
    );
  }

  try {
    const supabase = createAdminClient();

    const { data: accounts, error } = await supabase
      .from("clinic_accounts")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("管理画面データ取得エラー:", error);
      return NextResponse.json(
        { error: "データの取得に失敗しました" },
        { status: 500 }
      );
    }

    return NextResponse.json({ accounts: accounts || [] });
  } catch (error) {
    console.error("Admin API error:", error);
    return NextResponse.json(
      { error: "サーバーエラーが発生しました" },
      { status: 500 }
    );
  }
}
