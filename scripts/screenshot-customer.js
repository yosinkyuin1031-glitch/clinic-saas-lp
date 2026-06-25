/* eslint-disable */
// Clinic Core (customer-mgmt) 認証後の画面スクショを最新化
const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const OUT_DIR = path.join(__dirname, '..', 'public', 'screens', 'clinic-core');
fs.mkdirSync(OUT_DIR, { recursive: true });

const BASE = 'https://customer-mgmt.vercel.app';
const EMAIL = process.env.CC_EMAIL || 'yosinkyuin1031@gmail.com';
const PASSWORD = process.env.CC_PASSWORD || 'youhei1031A';

const wait = (ms) => new Promise((r) => setTimeout(r, ms));

// タブテキストでクリック → スクショ
const TABS = [
  { label: 'ホーム', file: 'home.png' },
  { label: '顧客管理', file: 'patients.png' },
  { label: '予約管理', file: 'reservation.png' },
  { label: '営業データ', file: 'sales.png' },
  { label: '月間統計', file: 'stats.png' },
  { label: 'マスター', file: 'master.png' },
];

(async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
    protocolTimeout: 120000,
  });
  const page = await browser.newPage();
  page.setDefaultTimeout(30000);
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });

  // ログイン
  console.log(`→ ${BASE}/login`);
  await page.goto(`${BASE}/login`, { waitUntil: 'domcontentloaded', timeout: 60000 });
  await wait(2500);
  await page.evaluate(({ email, password }) => {
    const emailInput = document.querySelector('input[type="email"]') || document.querySelector('input[name="email"]');
    const passInput = document.querySelector('input[type="password"]');
    if (!emailInput || !passInput) return;
    const setter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set;
    setter.call(emailInput, email); emailInput.dispatchEvent(new Event('input', { bubbles: true }));
    setter.call(passInput, password); passInput.dispatchEvent(new Event('input', { bubbles: true }));
  }, { email: EMAIL, password: PASSWORD });
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    (btns.find(b => /ログイン|サインイン|Login/i.test(b.textContent)) || btns[0]).click();
  });
  await wait(6000);
  console.log('  after login:', page.url());

  if (page.url().includes('/login')) {
    const err = await page.evaluate(() => document.body.innerText.slice(0, 200));
    console.log('  LOGIN FAILED:', err);
    await browser.close();
    process.exit(1);
  }

  // ホーム到達
  await page.goto(`${BASE}/`, { waitUntil: 'domcontentloaded' });
  await wait(5000);

  // 「ようこそ！初期セットアップ」モーダルがあれば「スキップ」で閉じる
  await page.evaluate(() => {
    const allClickable = Array.from(document.querySelectorAll('button, a'));
    const skip = allClickable.find(el => /スキップ|閉じる|×/.test((el.textContent || '').trim()));
    if (skip) skip.click();
  });
  await wait(1500);
  // それでも残るモーダルは ESCで閉じる
  await page.keyboard.press('Escape');
  await wait(1500);

  for (const t of TABS) {
    try {
      console.log(`\n→ タブ「${t.label}」`);
      const clicked = await page.evaluate((labelText) => {
        const allClickable = Array.from(document.querySelectorAll('button, a, [role="tab"], [role="button"]'));
        let target = allClickable.find(el => (el.textContent || '').trim() === labelText);
        if (!target) target = allClickable.find(el => {
          const txt = (el.textContent || '').trim();
          return txt.length < 25 && txt.includes(labelText);
        });
        if (target) { target.scrollIntoView({ block: 'center' }); target.click(); return true; }
        return false;
      }, t.label);
      if (!clicked) { console.log('  クリック対象なし'); continue; }
      await wait(4000);
      const head = await page.evaluate(() => (document.querySelector('h1,h2,h3')?.textContent || '').trim().slice(0, 60));
      const out = path.join(OUT_DIR, t.file);
      await page.screenshot({ path: out });
      console.log(`  saved: ${out}  ("${head}")`);
    } catch (err) {
      console.log(`  ERROR: ${err.message}`);
    }
  }

  // 営業データ内のサブタブを撮影
  console.log('\n=== 営業データ サブタブ ===');
  await page.evaluate(() => {
    const target = Array.from(document.querySelectorAll('button, a')).find(el => (el.textContent || '').trim() === '営業データ');
    if (target) target.click();
  });
  await wait(3500);

  const SUB_TABS = [
    { label: 'LTV', file: 'ltv.png' },
    { label: 'ROAS', file: 'roas.png' },
    { label: 'スタッフ', file: 'by-staff.png' },
  ];
  for (const t of SUB_TABS) {
    try {
      console.log(`→ ${t.label}`);
      const clicked = await page.evaluate((labelText) => {
        const all = Array.from(document.querySelectorAll('button, a, [role="tab"]'));
        const target = all.find(el => (el.textContent || '').trim().includes(labelText) && (el.textContent || '').trim().length < 20);
        if (target) { target.scrollIntoView({ block: 'center' }); target.click(); return true; }
        return false;
      }, t.label);
      if (!clicked) { console.log('  クリック対象なし'); continue; }
      await wait(3500);
      const out = path.join(OUT_DIR, t.file);
      await page.screenshot({ path: out });
      console.log(`  saved: ${out}`);
    } catch (err) {
      console.log(`  ERROR: ${err.message}`);
    }
  }

  await browser.close();
  console.log('\n完了');
})();
