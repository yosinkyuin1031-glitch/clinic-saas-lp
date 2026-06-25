/* eslint-disable */
// MEO勝ち上げくん 認証後の画面スクショ
const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const OUT_DIR = path.join(__dirname, '..', 'public', 'screens', 'meo');
fs.mkdirSync(OUT_DIR, { recursive: true });

const BASE = 'https://meo-kachiagekun.vercel.app';
const EMAIL = process.env.MEO_EMAIL || 'yosinkyuin1031@gmail.com';
const PASSWORD = process.env.MEO_PASSWORD || 'youhei1031';

const wait = (ms) => new Promise((r) => setTimeout(r, ms));

const TARGETS = [
  { path: '/dashboard', name: '1-dashboard.png', waitMs: 5000 },
  { path: '/keywords', name: '2-keywords.png', waitMs: 4000 },
  { path: '/posts', name: '3-posts.png', waitMs: 4000 },
  { path: '/reviews', name: '4-reviews.png', waitMs: 4000 },
  { path: '/articles', name: '5-articles.png', waitMs: 4000 },
  { path: '/analytics', name: '6-analytics.png', waitMs: 4000 },
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

  // 1) ログイン
  console.log(`→ ${BASE}/login`);
  await page.goto(`${BASE}/login`, { waitUntil: 'domcontentloaded', timeout: 60000 });
  await wait(2500);

  // フォーム識別 & 入力（複数パターン試行）
  const filled = await page.evaluate(({ email, password }) => {
    const emailInput =
      document.querySelector('input[type="email"]') ||
      document.querySelector('input[name="email"]') ||
      document.querySelector('input[name="username"]') ||
      document.querySelector('input[placeholder*="メール"]') ||
      document.querySelector('input[placeholder*="Email"]');
    const passInput =
      document.querySelector('input[type="password"]') ||
      document.querySelector('input[name="password"]');
    if (!emailInput || !passInput) return { ok: false, found: { email: !!emailInput, pass: !!passInput } };
    // React制御フォーム対応：nativeInputValueSetterで書き込み
    const setter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set;
    setter.call(emailInput, email);
    emailInput.dispatchEvent(new Event('input', { bubbles: true }));
    setter.call(passInput, password);
    passInput.dispatchEvent(new Event('input', { bubbles: true }));
    return { ok: true };
  }, { email: EMAIL, password: PASSWORD });

  console.log('fill result:', filled);
  if (!filled.ok) {
    await page.screenshot({ path: path.join(OUT_DIR, '_login-fail.png'), fullPage: false });
    console.log('ログインフォーム未検出。/_login-fail.png 確認');
    await browser.close();
    process.exit(1);
  }

  // ログインボタンクリック
  const submitted = await page.evaluate(() => {
    const candidates = ['ログイン', 'サインイン', 'Login', 'Sign in', '送信'];
    const buttons = Array.from(document.querySelectorAll('button, input[type="submit"]'));
    for (const c of candidates) {
      const b = buttons.find((el) => (el.textContent || el.value || '').trim().includes(c));
      if (b) { b.click(); return c; }
    }
    // 最後の手段：最初のbutton
    if (buttons[0]) { buttons[0].click(); return 'first-button'; }
    return null;
  });
  console.log('submit:', submitted);
  await wait(5000); // ログイン処理待ち

  // ログイン成否確認
  const url = page.url();
  console.log('after login URL:', url);
  if (url.includes('/login')) {
    const errText = await page.evaluate(() => document.body.innerText.slice(0, 300));
    console.log('まだ/loginにいる。エラー:', errText);
    await page.screenshot({ path: path.join(OUT_DIR, '_login-still.png'), fullPage: false });
    await browser.close();
    process.exit(1);
  }
  console.log('ログイン成功');

  // 2) 各画面を撮影
  for (const t of TARGETS) {
    try {
      console.log(`\n→ ${BASE}${t.path}`);
      await page.goto(BASE + t.path, { waitUntil: 'domcontentloaded', timeout: 30000 });
      await wait(t.waitMs);
      const headline = await page.evaluate(() => {
        const h1 = document.querySelector('h1');
        const h2 = document.querySelector('h2');
        return (h1?.textContent || h2?.textContent || '').trim().slice(0, 80);
      });
      const out = path.join(OUT_DIR, t.name);
      await page.screenshot({ path: out, fullPage: false });
      console.log(`  saved: ${out}`);
      console.log(`  headline="${headline}"`);
    } catch (err) {
      console.log(`  ERROR: ${err.message}`);
    }
  }

  await browser.close();
  console.log('\n撮影完了');
})();
