#!/usr/bin/env node
// Webhookが clinics 作成で失敗した院を補修する。
// 使い方: node scripts/repair-clinic.mjs <clinic_id>
// 例:    node scripts/repair-clinic.mjs CLN-00230756
//
// 実行内容（冪等）:
//   1. clinic_accounts から該当院を取得
//   2. 不足している clinics を作成（plan値を正しく入れる）
//   3. clinic_members を作成
//   4. パスワードを新規発行して auth.users 更新
//   5. ウェルカムメールを送信（アプリごと）

import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { fileURLToPath } from "node:url";
import { createClient } from "@supabase/supabase-js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const envPath = path.resolve(__dirname, "..", ".env.local");
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

const clinicId = process.argv[2];
if (!clinicId) {
  console.error("使い方: node scripts/repair-clinic.mjs <clinic_id>");
  process.exit(1);
}

const sb = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { autoRefreshToken: false, persistSession: false } }
);

function genPassword(len = 12) {
  const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%";
  const buf = crypto.randomBytes(len);
  let p = "";
  for (let i = 0; i < len; i++) p += chars.charAt(buf[i] % chars.length);
  return p;
}

const APP_FLAG_MAP = {
  kensa: "app_kensa",
  customer: "app_crm",
  changesnap: "app_changesnap",
  meo: "app_meo",
};

const { data: account, error: accErr } = await sb
  .from("clinic_accounts")
  .select("*")
  .eq("clinic_id", clinicId)
  .maybeSingle();

if (accErr || !account) {
  console.error("clinic_accounts見つからず:", accErr || "null");
  process.exit(1);
}

console.log("対象院:", account.clinic_name, account.email);

const finalEmail = account.email;
const finalClinicName = account.clinic_name;
const selectedApps = Array.isArray(account.selected_apps) ? account.selected_apps : [];

// 1. auth.users 確保（既存なら流用、パスワードリセット）
const { data: userList } = await sb.auth.admin.listUsers();
let user = userList?.users?.find(u => u.email === finalEmail);
const newPassword = genPassword();

if (user) {
  const { error: updErr } = await sb.auth.admin.updateUserById(user.id, { password: newPassword });
  if (updErr) {
    console.error("パスワード更新失敗:", updErr);
    process.exit(1);
  }
  console.log("既存ユーザーのパスワードを再発行:", user.id);
} else {
  const { data: created, error: cErr } = await sb.auth.admin.createUser({
    email: finalEmail,
    password: newPassword,
    email_confirm: true,
    user_metadata: { clinic_id: clinicId, clinic_name: finalClinicName },
  });
  if (cErr) {
    console.error("ユーザー作成失敗:", cErr);
    process.exit(1);
  }
  user = created.user;
  console.log("新規ユーザー作成:", user.id);
}

await sb.from("clinic_accounts").update({ user_id: user.id }).eq("id", account.id);

// 2. clinics 確保
const { data: existingClinics } = await sb
  .from("clinics")
  .select("id")
  .like("notes", `%${clinicId}%`);

let clinicRowId;
if (existingClinics && existingClinics.length > 0) {
  clinicRowId = existingClinics[0].id;
  await sb.from("clinics").update({ is_active: true }).eq("id", clinicRowId);
  console.log("既存clinic流用:", clinicRowId);
} else {
  const appFlags = {};
  for (const app of selectedApps) {
    const flag = APP_FLAG_MAP[app];
    if (flag) appFlags[flag] = true;
  }
  const code =
    finalClinicName.replace(/[^\w　-鿿]/g, "").slice(0, 20).toLowerCase() ||
    `clinic-${Date.now()}`;

  const { data: newClinic, error: ncErr } = await sb
    .from("clinics")
    .insert({
      name: finalClinicName,
      code,
      owner_name: "",
      phone: "",
      email: finalEmail,
      plan: "basic",
      is_active: true,
      theme_color: "#2563eb",
      max_staff: 5,
      max_exams_per_month: 9999,
      max_patients: 9999,
      max_checks_per_month: 9999,
      notes: `Stripe購入から自動作成 | ${clinicId}`,
      stripe_customer_id: account.stripe_customer_id || "",
      ...appFlags,
    })
    .select()
    .single();
  if (ncErr) {
    console.error("clinics作成失敗:", ncErr);
    process.exit(1);
  }
  clinicRowId = newClinic.id;
  console.log("clinics作成:", clinicRowId);
}

// 3. clinic_members 確保
const { data: existingMember } = await sb
  .from("clinic_members")
  .select("id")
  .eq("clinic_id", clinicRowId)
  .eq("user_id", user.id)
  .maybeSingle();

if (existingMember) {
  console.log("clinic_members既存:", existingMember.id);
} else {
  const { error: mErr } = await sb.from("clinic_members").insert({
    clinic_id: clinicRowId,
    user_id: user.id,
    role: "owner",
    display_name: finalClinicName,
    is_active: true,
  });
  if (mErr) {
    console.error("clinic_members挿入失敗:", mErr);
    process.exit(1);
  }
  console.log("clinic_members作成完了");
}

// 4. ウェルカムメール送信（Resend直叩き）
if (process.env.RESEND_API_KEY) {
  const { Resend } = await import("resend");
  const resend = new Resend(process.env.RESEND_API_KEY);
  const FROM_CUSTOMER = process.env.EMAIL_FROM_CUSTOMER || "ClinicDX <onboarding@resend.dev>";
  const FROM_ADMIN = process.env.EMAIL_FROM_ADMIN || "ClinicApps <noreply@resend.dev>";
  const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "yosinkyuin1031@gmail.com";

  const APP_META = {
    customer: {
      label: "Clinic Core（顧客管理）",
      loginUrl: "https://customer-mgmt.vercel.app/login",
      headerBg: "#0ea5e9",
    },
    kensa: {
      label: "カラダマップ",
      loginUrl: "https://kensa-sheet-app.vercel.app",
      headerBg: "#2563eb",
    },
    changesnap: {
      label: "ChangeSnap",
      loginUrl: "https://changesnap.vercel.app",
      headerBg: "#ec4899",
    },
  };

  for (const appId of selectedApps) {
    const app = APP_META[appId];
    if (!app) continue;
    const html = `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: ${app.headerBg}; color: white; padding: 24px; border-radius: 12px 12px 0 0; text-align: center;">
          <h1 style="margin: 0; font-size: 24px;">${app.label}</h1>
        </div>
        <div style="background: white; padding: 24px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 12px 12px;">
          <p style="font-size: 16px;">${finalClinicName} 様</p>
          <p style="color:#555;line-height:1.7;">この度は${app.label}をお申し込みいただき、誠にありがとうございます。アカウントの発行が完了しましたので、ログイン情報をお知らせいたします。</p>
          <div style="background:#f8f9fa;border-radius:8px;padding:16px;margin:20px 0;">
            <h3 style="margin:0 0 12px;">ログイン情報</h3>
            <table style="width:100%;font-size:14px;">
              <tr><td style="padding:4px 0;color:#666;width:140px;">ログインURL</td><td><a href="${app.loginUrl}" style="color:${app.headerBg};font-weight:bold;">${app.loginUrl}</a></td></tr>
              <tr><td style="padding:4px 0;color:#666;">メールアドレス</td><td style="font-weight:bold;">${finalEmail}</td></tr>
              <tr><td style="padding:4px 0;color:#666;">初期パスワード</td><td style="font-weight:bold;color:#e74c3c;">${newPassword}</td></tr>
              <tr><td style="padding:4px 0;color:#666;">院ID</td><td>${clinicId}</td></tr>
            </table>
          </div>
          <div style="background:#fff8e1;border-radius:8px;padding:12px;margin:16px 0;font-size:13px;color:#6b4f00;">
            セキュリティのため、初回ログイン後にパスワードを変更してください。
          </div>
          <div style="text-align:center;margin:24px 0;">
            <a href="${app.loginUrl}" style="background:${app.headerBg};color:white;padding:12px 32px;border-radius:8px;text-decoration:none;font-weight:bold;display:inline-block;">ログインする</a>
          </div>
          <p style="font-size:13px;color:#999;">ご不明な点がございましたら、お気軽にお問い合わせください。<br>メール: ${ADMIN_EMAIL}</p>
        </div>
      </div>`;
    const { data, error } = await resend.emails.send({
      from: FROM_CUSTOMER,
      to: [finalEmail],
      subject: `【${app.label}】アカウント発行のお知らせ - ${finalClinicName}様`,
      html,
    });
    console.log(`${appId} メール送信:`, error ? `エラー: ${error.message}` : `OK id=${data?.id}`);
  }

  // 大口さんへの通知
  await resend.emails.send({
    from: FROM_ADMIN,
    to: [ADMIN_EMAIL],
    subject: `【新規契約・補修】${finalClinicName}`,
    html: `<pre>院名: ${finalClinicName}\nメール: ${finalEmail}\n院ID: ${clinicId}\nアプリ: ${selectedApps.join(", ")}\n備考: Webhook失敗→補修スクリプトで完了</pre>`,
  });
}

console.log("\n=== 補修完了 ===");
console.log(`院名: ${finalClinicName}`);
console.log(`院ID: ${clinicId}`);
console.log(`メール: ${finalEmail}`);
console.log(`新パスワード: ${newPassword}`);
console.log(`ログインURL: https://customer-mgmt.vercel.app/login`);
