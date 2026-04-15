import { NextRequest, NextResponse } from "next/server";
import { sendLINENotify } from "@/app/lib/line-notify";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { clinicName, name, email, phone, plan, message } = body;

    if (!clinicName || !name || !email) {
      return NextResponse.json(
        { error: "院名・お名前・メールアドレスは必須です" },
        { status: 400 }
      );
    }

    const res = await fetch(`${SUPABASE_URL}/rest/v1/leads`, {
      method: "POST",
      headers: {
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        "Content-Type": "application/json",
        Prefer: "return=minimal",
      },
      body: JSON.stringify({
        clinic_name: clinicName,
        name,
        email,
        phone: phone || null,
        plan: plan || null,
        message: message || null,
      }),
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error("Supabase insert error:", errorText);
      return NextResponse.json(
        { error: "送信に失敗しました。しばらく経ってからお試しください。" },
        { status: 500 }
      );
    }

    // LINE通知（問い合わせが来たら即通知）
    const lineMsg = [
      "【新規問い合わせ】",
      `院名: ${clinicName}`,
      `名前: ${name}`,
      `メール: ${email}`,
      phone ? `電話: ${phone}` : null,
      plan ? `プラン: ${plan}` : null,
      message ? `メッセージ: ${message}` : null,
    ].filter(Boolean).join("\n");

    sendLINENotify(lineMsg).catch(err => console.error("LINE通知エラー:", err));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      { error: "サーバーエラーが発生しました" },
      { status: 500 }
    );
  }
}
