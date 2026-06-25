/* eslint-disable */
// MEO 認証後 タブテキストをクリックして各画面を撮影
const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const OUT_DIR = path.join(__dirname, '..', 'public', 'screens', 'meo');
fs.mkdirSync(OUT_DIR, { recursive: true });

const BASE = 'https://meo-kachiagekun.vercel.app';
const EMAIL = process.env.MEO_EMAIL || 'yosinkyuin1031@gmail.com';
const PASSWORD = process.env.MEO_PASSWORD || 'youhei1031A';

const wait = (ms) => new Promise((r) => setTimeout(r, ms));

const TABS = [
  { label: 'ダッシュボード', file: '1-dashboard.png' },
  { label: 'コンテンツ生成', file: '2-content-generation.png' },
  { label: '施策チェック', file: '3-strategy-check.png' },
  { label: '順位チェック', file: '4-ranking-check.png' },
  { label: '履歴', file: '5-history.png' },
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
  await page.goto(`${BASE}/login`, { waitUntil: 'domcontentloaded' });
  await wait(2500);
  await page.evaluate(({ email, password }) => {
    const emailInput = document.querySelector('input[type="email"]') || document.querySelector('input[name="email"]');
    const passInput = document.querySelector('input[type="password"]');
    const setter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set;
    setter.call(emailInput, email); emailInput.dispatchEvent(new Event('input', { bubbles: true }));
    setter.call(passInput, password); passInput.dispatchEvent(new Event('input', { bubbles: true }));
  }, { email: EMAIL, password: PASSWORD });
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    (btns.find(b => /ログイン/i.test(b.textContent)) || btns[0]).click();
  });
  await wait(6000);
  console.log('  after login:', page.url());

  // ホームへ確実に遷移
  await page.goto(`${BASE}/`, { waitUntil: 'domcontentloaded' });
  await wait(5000);

  for (const t of TABS) {
    try {
      console.log(`\n→ タブ「${t.label}」をクリック`);
      // タブテキストを含む要素をクリック（button/a/divのいずれかにマッチ）
      const clicked = await page.evaluate((labelText) => {
        const allClickable = Array.from(document.querySelectorAll('button, a, [role="tab"], [role="button"]'));
        // 完全一致を優先
        let target = allClickable.find(el => {
          const txt = (el.textContent || '').trim();
          return txt === labelText;
        });
        // 部分一致
        if (!target) {
          target = allClickable.find(el => {
            const txt = (el.textContent || '').trim();
            return txt.length < 20 && txt.includes(labelText);
          });
        }
        if (target) {
          target.scrollIntoView({ block: 'center' });
          target.click();
          return true;
        }
        return false;
      }, t.label);

      if (!clicked) {
        console.log('  クリック対象見つからず');
        continue;
      }
      await wait(3500);
      const headline = await page.evaluate(() => {
        const h = document.querySelector('h1, h2, h3');
        return (h?.textContent || '').trim().slice(0, 60);
      });
      const out = path.join(OUT_DIR, t.file);
      await page.screenshot({ path: out });
      console.log(`  saved: ${out}  ("${headline}")`);
    } catch (err) {
      console.log(`  ERROR: ${err.message}`);
    }
  }

  await browser.close();
  console.log('\n撮影完了');
})();
