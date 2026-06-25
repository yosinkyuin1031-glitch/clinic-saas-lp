/* eslint-disable */
// MEO 認証後 ホームで実際のメニューを取得 → サイドバーリンクを順番に訪問してスクショ
const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const OUT_DIR = path.join(__dirname, '..', 'public', 'screens', 'meo');
fs.mkdirSync(OUT_DIR, { recursive: true });

const BASE = 'https://meo-kachiagekun.vercel.app';
const EMAIL = process.env.MEO_EMAIL || 'yosinkyuin1031@gmail.com';
const PASSWORD = process.env.MEO_PASSWORD || 'youhei1031A';

const wait = (ms) => new Promise((r) => setTimeout(r, ms));

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
    const setter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set;
    setter.call(emailInput, email); emailInput.dispatchEvent(new Event('input', { bubbles: true }));
    setter.call(passInput, password); passInput.dispatchEvent(new Event('input', { bubbles: true }));
  }, { email: EMAIL, password: PASSWORD });
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    (btns.find(b => /ログイン|サインイン|Login/i.test(b.textContent)) || btns[0]).click();
  });
  await wait(5500);
  console.log('  after login:', page.url());

  // ホーム到達後、内部リンク一覧を取得
  await page.goto(`${BASE}/`, { waitUntil: 'domcontentloaded' });
  await wait(4000);

  const links = await page.evaluate(() => {
    const anchors = Array.from(document.querySelectorAll('a[href]'));
    const internal = anchors
      .map((a) => ({
        href: a.getAttribute('href'),
        text: (a.textContent || '').trim().slice(0, 40),
      }))
      .filter((l) => l.href && l.href.startsWith('/') && !l.href.startsWith('/_'))
      .filter((l) => l.text.length > 0 && l.text.length < 30);
    // dedupe by href
    const seen = new Set();
    const out = [];
    for (const l of internal) {
      if (seen.has(l.href)) continue;
      seen.add(l.href);
      out.push(l);
    }
    return out;
  });

  console.log('\n=== 発見した内部リンク ===');
  links.forEach((l, i) => console.log(`  [${i + 1}] ${l.href}  "${l.text}"`));

  // ホーム撮影
  await page.screenshot({ path: path.join(OUT_DIR, '0-home.png') });
  console.log('\n→ ホーム撮影完了');

  // 各リンクを訪問
  let count = 0;
  for (const l of links) {
    if (count >= 12) break;
    if (/login|logout|legal|privacy|terms|サインアウト|ログアウト|プライバシー|利用規約/i.test(l.text)) continue;
    if (l.href === '/' || l.href === '') continue;
    count++;
    const safeName = l.href.replace(/[^a-z0-9]/gi, '-').replace(/^-+|-+$/g, '') || `link-${count}`;
    try {
      console.log(`\n→ ${BASE}${l.href}  ("${l.text}")`);
      await page.goto(`${BASE}${l.href}`, { waitUntil: 'domcontentloaded', timeout: 25000 });
      await wait(4500);
      const head = await page.evaluate(() => {
        const h = document.querySelector('h1') || document.querySelector('h2');
        return (h?.textContent || '').trim().slice(0, 60);
      });
      const out = path.join(OUT_DIR, `${count}-${safeName}.png`);
      await page.screenshot({ path: out });
      console.log(`  saved: ${out}  headline="${head}"`);
    } catch (err) {
      console.log(`  ERROR: ${err.message}`);
    }
  }

  await browser.close();
  console.log('\n探索＆撮影完了');
})();
