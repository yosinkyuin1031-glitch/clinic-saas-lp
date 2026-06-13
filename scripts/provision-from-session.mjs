#!/usr/bin/env node
// Stripe決済済セッションから手動でアカウントをプロビジョニング
// （Webhookが届かなかった場合のリカバリ用）
//
// 使い方: node scripts/provision-from-session.mjs <stripe_session_id>
// 例:    node scripts/provision-from-session.mjs cs_live_a1CVIlkEFTli...
//
// 動作（Webhook と同じ処理を冪等に実行）:
//   1. Stripeから session 取得 → email・customer・subscription
//   2. clinic_accounts を email で pending_payment 検索
//   3. status=active に更新（stripe_customer_id / subscription_id 設定）
//   4. Authユーザーを email で検索、なければ作成（パスワード生成）
//   5. clinicsレコードを clinic_id で検索、なければ作成（appフラグ込み）
//   6. clinic_membersレコードを作成
//   7. ウェルカムメール（アプリごと）+ 大口さんへの通知 + LINE通知

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import crypto from "node:crypto";
import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const envPath = path.resolve(__dirname, "..", ".env.local");
if (fs.existsSync(envPath)) {
  for (const line of fs.readFileSync(envPath, "utf8").split("\n")) {
    const t = line.trim();
    if (!t || t.startsWith("#")) continue;
    const eq = t.indexOf("=");
    if (eq < 0) continue;
    const k = t.slice(0, eq).trim();
    let v = t.slice(eq + 1).trim();
    if (v.startsWith('"') && v.endsWith('"')) v = v.slice(1, -1);
    if (!process.env[k]) process.env[k] = v;
  }
}

const sessionId = process.argv[2];
if (!sessionId) {
  console.error("使い方: node scripts/provision-from-session.mjs <stripe_session_id>");
  process.exit(1);
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, {
  auth: { autoRefreshToken: false, persistSession: false },
});
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

const APP_FLAG_MAP = {
  kensa: "app_kensa",
  customer: "app_crm",
  meo: "app_meo",
  reservation: "app_reservation",
  monshin: "app_monshin",
};

const APP_EMAIL = {
  kensa: {
    label: "カラダマップ",
    loginUrl: "https://kensa-sheet-app.vercel.app",
    headerBg: "#3B82F6",
    tagline: "検査シート・患者説明ツール",
    intro: "カラダマップは、初回カウンセリングで使う検査シートをタブレットで完結できるアプリです。",
    features: ["検査項目をタブレットで入力", "結果をPDFで出力・印刷・メール送信", "施術提案書の作成にも活用可能"],
    firstStep: "ログイン後、まずはサンプル患者で検査シートを作成してみてください。",
  },
  customer: {
    label: "Clinic Core（顧客管理）",
    loginUrl: "https://customer-mgmt.vercel.app/login",
    headerBg: "#10B981",
    tagline: "顧客管理・予約管理・LINE連携",
    intro: "Clinic Core は、患者管理・予約・LINE配信・CSV出力などをひとまとめにしたアプリです。",
    features: ["患者カルテ管理", "予約カレンダー連携", "LINE一斉配信"],
    firstStep: "ログイン後、最初に院情報・スタッフ・患者の登録から始めてみてください。",
  },
};

function generatePassword(len = 12) {
  const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%";
  let pw = "";
  const bytes = crypto.randomBytes(len);
  for (let i = 0; i < len; i++) pw += chars.charAt(bytes[i] % chars.length);
  return pw;
}

async function sendAppWelcomeEmail({ to, clinicName, clinicId, password, appId, planType }) {
  if (!resend) return;
  const cfg = APP_EMAIL[appId];
  if (!cfg) return;
  const planLabel = planType === "monthly" ? "月額プラン" : planType === "yearly" ? "年額プラン" : "買い切りプラン";
  const featuresHtml = cfg.features.map(f => `<li style="margin: 4px 0;">${f}</li>`).join("");
  const fromAddr = process.env.EMAIL_FROM_CUSTOMER || "ClinicDX <onboarding@resend.dev>";
  await resend.emails.send({
    from: fromAddr,
    to: [to],
    subject: `【${cfg.label}】アカウント発行のお知らせ - ${clinicName}様`,
    html: `
<div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: ${cfg.headerBg}; color: white; padding: 24px; border-radius: 12px 12px 0 0; text-align: center;">
    <h1 style="margin: 0; font-size: 24px;">${cfg.label}</h1>
    <p style="margin: 6px 0 0; opacity: 0.9; font-size: 14px;">${cfg.tagline}</p>
  </div>
  <div style="background: white; padding: 24px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 12px 12px;">
    <p style="font-size: 16px; color: #333;">${clinicName} 様</p>
    <p style="color: #555; line-height: 1.7;">この度は${cfg.label}をお申し込みいただき、誠にありがとうございます。<br>アカウントの発行が完了しましたので、ログイン情報をお知らせいたします。</p>
    <p style="color: #555; line-height: 1.7; margin-top: 16px;">${cfg.intro}</p>
    <div style="background: #f8f9fa; border-radius: 8px; padding: 16px; margin: 20px 0;">
      <h3 style="margin: 0 0 12px; color: #14252A; font-size: 16px;">ログイン情報</h3>
      <table style="width: 100%; font-size: 14px;">
        <tr><td style="padding: 4px 0; color: #666; width: 140px;">ログインURL</td><td style="font-weight: bold;"><a href="${cfg.loginUrl}" style="color: ${cfg.headerBg};">${cfg.loginUrl}</a></td></tr>
        <tr><td style="padding: 4px 0; color: #666;">メールアドレス</td><td style="font-weight: bold;">${to}</td></tr>
        <tr><td style="padding: 4px 0; color: #666;">初期パスワード</td><td style="font-weight: bold; color: #e74c3c;">${password}</td></tr>
        <tr><td style="padding: 4px 0; color: #666;">院ID</td><td>${clinicId}</td></tr>
        <tr><td style="padding: 4px 0; color: #666;">プラン</td><td>${planLabel}</td></tr>
      </table>
    </div>
    <h3 style="color: #14252A;">最初の一歩</h3>
    <p style="color: #555;">${cfg.firstStep}</p>
    <h3 style="color: #14252A;">主な機能</h3>
    <ul style="color: #555;">${featuresHtml}</ul>
    <p style="color: #888; font-size: 12px; margin-top: 24px;">このメールに心当たりがない場合は、お手数ですがこのメールに返信してご連絡ください。</p>
  </div>
</div>`,
  });
}

async function sendAdminNotification({ clinicName, email, planType, selectedApps }) {
  if (!resend) return;
  const adminEmail = process.env.ADMIN_EMAIL || "yosinkyuin1031@gmail.com";
  const fromAddr = process.env.EMAIL_FROM_ADMIN || "ClinicApps <noreply@resend.dev>";
  await resend.emails.send({
    from: fromAddr,
    to: [adminEmail],
    subject: `【新規契約】${clinicName} - ${selectedApps.join(", ")}`,
    html: `<div style="font-family: sans-serif;">
      <h2>新規契約が発生しました</h2>
      <p>院名: ${clinicName}<br>メール: ${email}<br>プラン: ${planType}<br>アプリ: ${selectedApps.join(", ")}</p>
    </div>`,
  });
}

async function sendLINENotify(message) {
  const token = process.env.LINE_NOTIFY_TOKEN;
  if (!token) return;
  try {
    const res = await fetch("https://notify-api.line.me/api/notify", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({ message }).toString(),
    });
    if (!res.ok) console.error("LINE通知失敗:", res.status);
  } catch (e) {
    console.error("LINE通知エラー:", e);
  }
}

async function main() {
  console.log(`セッション取得中: ${sessionId}`);
  const session = await stripe.checkout.sessions.retrieve(sessionId);

  if (session.payment_status !== "paid" && session.status !== "complete") {
    console.error(`❌ セッションが未支払い: status=${session.status}, payment_status=${session.payment_status}`);
    process.exit(1);
  }

  const email = session.customer_details?.email || session.customer_email;
  const stripeCustomerId = session.customer;
  const stripeSubscriptionId = session.subscription;
  const planType = session.mode === "subscription" ? "monthly" : "onetime";

  console.log(`email: ${email}`);
  console.log(`customer: ${stripeCustomerId}`);
  console.log(`subscription: ${stripeSubscriptionId}`);
  console.log(`mode: ${session.mode}`);

  // pending_payment検索
  const { data: pending } = await supabase
    .from("clinic_accounts")
    .select("id, clinic_id, clinic_name, email, status, selected_apps, metadata")
    .eq("email", email)
    .eq("status", "pending_payment")
    .maybeSingle();

  if (!pending) {
    // activeで既に処理済か確認
    const { data: alreadyActive } = await supabase
      .from("clinic_accounts")
      .select("id, clinic_id, status")
      .eq("email", email)
      .eq("status", "active")
      .maybeSingle();
    if (alreadyActive) {
      console.log(`⚠️ 既に active: ${alreadyActive.clinic_id}（処理済の可能性。冪等処理続行）`);
    } else {
      console.error(`❌ pending_payment アカウントが見つかりません: ${email}`);
      process.exit(1);
    }
  }

  const account = pending;
  if (!account) process.exit(0);

  const selectedApps = Array.isArray(account.selected_apps) ? account.selected_apps : [];

  console.log(`院: ${account.clinic_name} (${account.clinic_id})`);
  console.log(`アプリ: ${selectedApps.join(", ")}`);

  // status更新
  await supabase.from("clinic_accounts").update({
    status: "active",
    stripe_customer_id: stripeCustomerId,
    stripe_subscription_id: stripeSubscriptionId,
    plan_type: planType,
  }).eq("id", account.id);
  console.log("✅ status → active");

  // Authユーザー確保
  let userId = null;
  let newPassword = null;
  const { data: userList } = await supabase.auth.admin.listUsers();
  const existingUser = userList?.users?.find(u => u.email === email);
  if (existingUser) {
    userId = existingUser.id;
    console.log(`既存Authユーザー検出: ${userId}（パスワード再発行は行わない）`);
  } else {
    newPassword = generatePassword();
    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email,
      password: newPassword,
      email_confirm: true,
      user_metadata: { clinic_id: account.clinic_id, clinic_name: account.clinic_name },
    });
    if (authError) {
      console.error("Authユーザー作成失敗:", authError);
      process.exit(1);
    }
    userId = authData.user.id;
    console.log(`✅ Authユーザー作成: ${userId}`);
  }
  await supabase.from("clinic_accounts").update({ user_id: userId }).eq("id", account.id);

  // clinicsレコード確保
  let clinicRowId = null;
  const { data: existingClinic } = await supabase
    .from("clinics").select("id")
    .like("notes", `%${account.clinic_id}%`);
  if (existingClinic && existingClinic.length > 0) {
    clinicRowId = existingClinic[0].id;
    await supabase.from("clinics").update({ is_active: true }).eq("id", clinicRowId);
    console.log(`既存clinics更新: ${clinicRowId}`);
  } else {
    const appFlags = {};
    for (const app of selectedApps) {
      const flag = APP_FLAG_MAP[app];
      if (flag) appFlags[flag] = true;
    }
    const code = (account.clinic_name || "").replace(/[^\w　-鿿]/g, "").slice(0, 20).toLowerCase() || `clinic-${Date.now()}`;
    const { data: newClinic, error: clinicErr } = await supabase
      .from("clinics")
      .insert({
        name: account.clinic_name,
        code,
        owner_name: "",
        phone: "",
        email,
        plan: selectedApps.includes("kensa") ? "basic" : "active",
        is_active: true,
        theme_color: "#2563eb",
        max_staff: 5,
        max_exams_per_month: 9999,
        max_patients: 9999,
        max_checks_per_month: 9999,
        notes: `Stripe購入から自動作成 | ${account.clinic_id}`,
        stripe_customer_id: stripeCustomerId || "",
        ...appFlags,
      })
      .select().single();
    if (clinicErr) {
      console.error("clinics作成失敗:", clinicErr);
    } else {
      clinicRowId = newClinic.id;
      console.log(`✅ clinics作成: ${clinicRowId}`);
    }
  }

  // clinic_members
  if (userId && clinicRowId) {
    const { data: existingMember } = await supabase
      .from("clinic_members").select("id")
      .eq("clinic_id", clinicRowId).eq("user_id", userId).maybeSingle();
    if (!existingMember) {
      const { error: memErr } = await supabase.from("clinic_members").insert({
        clinic_id: clinicRowId, user_id: userId,
        role: "owner", display_name: account.clinic_name, is_active: true,
      });
      if (memErr) console.error("clinic_members作成失敗:", memErr);
      else console.log("✅ clinic_members作成");
    } else {
      console.log("既存clinic_members検出。スキップ");
    }
  }

  // メール送信（パスワード新規発行時のみ）
  if (newPassword) {
    for (const appId of selectedApps) {
      try {
        await sendAppWelcomeEmail({
          to: email,
          clinicName: account.clinic_name,
          clinicId: account.clinic_id,
          password: newPassword,
          appId,
          planType,
        });
        console.log(`✅ ${appId}ウェルカムメール送信`);
      } catch (e) {
        console.error(`${appId}メール送信エラー:`, e);
      }
    }
    try {
      await sendAdminNotification({
        clinicName: account.clinic_name,
        email,
        planType,
        selectedApps,
      });
      console.log("✅ 管理者通知メール送信");
    } catch (e) {
      console.error("管理者通知エラー:", e);
    }
  } else {
    console.log("⚠️ 既存ユーザーのためメール送信スキップ");
  }

  // LINE通知
  await sendLINENotify([
    "【新規契約（手動リカバリ）】",
    `院名: ${account.clinic_name}`,
    `メール: ${email}`,
    `プラン: モニター契約 (${planType})`,
    `アプリ: ${selectedApps.join(", ")}`,
    `院ID: ${account.clinic_id}`,
  ].join("\n"));

  console.log("\n=== 完了 ===");
  console.log(`院ID: ${account.clinic_id}`);
  console.log(`メール: ${email}`);
  if (newPassword) console.log(`発行パスワード: ${newPassword}`);
}

main().catch(e => { console.error("❌ エラー:", e); process.exit(1); });
