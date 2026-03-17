import { NextRequest, NextResponse } from "next/server";

const SUPABASE_URL = "https://vzkfkazjylrkspqrnhnx.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_H1Ch2D2XIuSQMzNL-ns8zg_gAqrx7wL";

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

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      { error: "サーバーエラーが発生しました" },
      { status: 500 }
    );
  }
}
