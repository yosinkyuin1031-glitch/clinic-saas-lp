/* eslint-disable */
// MEO勝ち上げくん デモ画面の自動スクショ撮影
// /demo が公開デモなら無認証で各画面のスクショを取得
const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const OUT_DIR = path.join(__dirname, '..', 'public', 'screens', 'meo');
fs.mkdirSync(OUT_DIR, { recursive: true });

const BASE = 'https://meo-kachiagekun.vercel.app';
const wait = (ms) => new Promise((r) => setTimeout(r, ms));

// 撮影対象（path / 出力ファイル名 / 待機ms）
const TARGETS = [
  { path: '/demo', name: '1-dashboard.png', waitMs: 4000 },
  { path: '/dashboard', name: '2-dashboard-alt.png', waitMs: 4000 },
  { path: '/keywords', name: '3-keywords.png', waitMs: 3500 },
  { path: '/posts', name: '4-posts.png', waitMs: 3500 },
  { path: '/reviews', name: '5-reviews.png', waitMs: 3500 },
  { path: '/articles', name: '6-articles.png', waitMs: 3500 },
  { path: '/analytics', name: '7-analytics.png', waitMs: 3500 },
];

(async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
    protocolTimeout: 60000,
  });
  const page = await browser.newPage();
  page.setDefaultTimeout(20000);
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });

  for (const t of TARGETS) {
    const url = BASE + t.path;
    try {
      console.log(`\n→ ${url}`);
      await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 });
      await wait(t.waitMs);

      // ログイン画面検出（フォーム or 「ログイン」テキスト）
      const isLogin = await page.evaluate(() => {
        const txt = document.body.innerText.toLowerCase();
        const hasPasswordInput = !!document.querySelector('input[type="password"]');
        const hasLoginText = /ログイン|sign in|login/i.test(document.body.innerText);
        return hasPasswordInput || (hasLoginText && txt.length < 800);
      });

      // 主要見出しテキスト確認
      const headline = await page.evaluate(() => {
        const h1 = document.querySelector('h1');
        const h2 = document.querySelector('h2');
        return (h1?.textContent || h2?.textContent || '').trim().slice(0, 80);
      });

      const out = path.join(OUT_DIR, t.name);
      await page.screenshot({ path: out, fullPage: false });
      console.log(`  saved: ${out}`);
      console.log(`  isLogin=${isLogin}  headline="${headline}"`);
    } catch (err) {
      console.log(`  ERROR: ${err.message}`);
    }
  }

  await browser.close();
})();
