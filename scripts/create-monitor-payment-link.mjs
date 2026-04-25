#!/usr/bin/env node
// モニター契約用 Stripe Payment Link 発行スクリプト
// 使い方: node scripts/create-monitor-payment-link.mjs <clinic_id> <monthly_amount>
// 例:    node scripts/create-monitor-payment-link.mjs CLN-288BF881 7700
//
// 動作:
//   1. clinic_accounts から clinic_id で対象を引いて email / clinic_name / selected_apps を取得
//   2. Stripe で Product + Price (recurring monthly) + Payment Link を作成
//   3. metadata.clinic_id を Payment Link / 各 Subscription に仕込んで Webhook が拾えるようにする
//   4. Payment Link URL を clinic_accounts.metadata.monitor_payment_link に保存
//   5. 標準出力に URL を出す（URL は Stripe API レスポンスをそのまま使い、手打ち禁止）

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";

// .env.local を手動ロード（dotenv/config は .env のみ）
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const envLocalPath = path.resolve(__dirname, "..", ".env.local");
if (fs.existsSync(envLocalPath)) {
  const content = fs.readFileSync(envLocalPath, "utf8");
  for (const line of content.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    let value = trimmed.slice(eq + 1).trim();
    if (value.startsWith('"') && value.endsWith('"')) value = value.slice(1, -1);
    if (!process.env[key]) process.env[key] = value;
  }
}

const [, , clinicIdArg, amountArg] = process.argv;

if (!clinicIdArg || !amountArg) {
  console.error("使い方: node scripts/create-monitor-payment-link.mjs <clinic_id> <monthly_amount>");
  console.error("例:    node scripts/create-monitor-payment-link.mjs CLN-288BF881 7700");
  process.exit(1);
}

const monthlyAmount = parseInt(amountArg, 10);
if (!Number.isFinite(monthlyAmount) || monthlyAmount < 100) {
  console.error("❌ 金額が不正です（100円以上の整数）");
  process.exit(1);
}

const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!STRIPE_SECRET_KEY) {
  console.error("❌ STRIPE_SECRET_KEY が未設定です");
  process.exit(1);
}
if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error("❌ Supabase の環境変数が未設定です");
  process.exit(1);
}

const stripe = new Stripe(STRIPE_SECRET_KEY);
const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
  auth: { autoRefreshToken: false, persistSession: false },
});

async function main() {
  // 1. 対象アカウント取得
  const { data: account, error: fetchError } = await supabase
    .from("clinic_accounts")
    .select("id, clinic_id, clinic_name, email, status, selected_apps, metadata")
    .eq("clinic_id", clinicIdArg)
    .maybeSingle();

  if (fetchError) {
    console.error("❌ DB読み込みエラー:", fetchError.message);
    process.exit(1);
  }
  if (!account) {
    console.error(`❌ clinic_id=${clinicIdArg} のアカウントが見つかりません`);
    process.exit(1);
  }
  if (account.status !== "pending_payment") {
    console.error(`❌ status が pending_payment ではありません (現在: ${account.status})`);
    console.error("   モニター決済リンクは pending_payment のアカウント専用です");
    process.exit(1);
  }
  if (!account.email) {
    console.error("❌ email が登録されていません");
    process.exit(1);
  }

  const selectedApps = Array.isArray(account.selected_apps) ? account.selected_apps : [];
  const appLabel = selectedApps.length > 0 ? selectedApps.join(" + ") : "monitor";

  console.log(`院名     : ${account.clinic_name}`);
  console.log(`メール   : ${account.email}`);
  console.log(`clinic_id: ${account.clinic_id}`);
  console.log(`アプリ   : ${appLabel}`);
  console.log(`月額     : ¥${monthlyAmount.toLocaleString()}`);
  console.log("");

  // 2. Product 作成（モニター契約専用、院ごとに独立）
  const productName = `モニター契約 ${account.clinic_name} (${appLabel})`;
  const product = await stripe.products.create({
    name: productName,
    metadata: {
      clinic_id: account.clinic_id,
      contract_type: "monitor",
      selected_apps: selectedApps.join(","),
    },
  });
  console.log(`✅ Product 作成: ${product.id}`);

  // 3. Price 作成（recurring monthly, JPY）
  const price = await stripe.prices.create({
    product: product.id,
    currency: "jpy",
    unit_amount: monthlyAmount,
    recurring: { interval: "month" },
    metadata: {
      clinic_id: account.clinic_id,
      contract_type: "monitor",
    },
  });
  console.log(`✅ Price 作成: ${price.id}`);

  // 4. Payment Link 作成
  // Webhook は session.metadata.clinic_id ではなく email で pending_payment を引き当てるが、
  // metadata に clinic_id を入れておくとログ追跡がしやすい
  const paymentLink = await stripe.paymentLinks.create({
    line_items: [{ price: price.id, quantity: 1 }],
    metadata: {
      clinic_id: account.clinic_id,
      contract_type: "monitor",
      selected_apps: selectedApps.join(","),
      monthly_amount: monthlyAmount.toString(),
    },
    subscription_data: {
      metadata: {
        clinic_id: account.clinic_id,
        contract_type: "monitor",
      },
    },
    after_completion: {
      type: "redirect",
      redirect: { url: "https://clinic-saas-lp.vercel.app/thanks" },
    },
  });
  console.log(`✅ Payment Link 作成: ${paymentLink.id}`);

  // 5. clinic_accounts.metadata に保存
  const updatedMetadata = {
    ...(account.metadata || {}),
    contract_type: "monitor",
    monthly_override: monthlyAmount,
    monitor_stripe_product_id: product.id,
    monitor_stripe_price_id: price.id,
    monitor_payment_link_id: paymentLink.id,
    monitor_payment_link_url: paymentLink.url,
  };
  const { error: updateError } = await supabase
    .from("clinic_accounts")
    .update({ metadata: updatedMetadata })
    .eq("id", account.id);
  if (updateError) {
    console.error("⚠️ metadata 更新エラー（リンク自体は有効）:", updateError.message);
  }

  console.log("");
  console.log("================ 決済リンク ================");
  console.log(paymentLink.url);
  console.log("============================================");
  console.log("");
  console.log("--- お客さんに送る案内文（コピペ用） ---");
  console.log(`${account.clinic_name} 様`);
  console.log("");
  console.log(`お世話になっております。`);
  console.log(`${appLabel.replace("customer", "顧客管理（Clinic Core）").replace("kensa", "カラダマップ")} の契約モニター月額¥${monthlyAmount.toLocaleString()}の決済リンクをお送りいたします。`);
  console.log("");
  console.log(`下記リンクからお手続きください。`);
  console.log(`${paymentLink.url}`);
  console.log("");
  console.log(`お支払い完了後、ログイン情報を自動でメール送信いたします。`);
  console.log(`ご不明な点がございましたらお気軽にご連絡ください。`);
  console.log("---------------------------------------");
}

main().catch(err => {
  console.error("❌ エラー:", err);
  process.exit(1);
});
