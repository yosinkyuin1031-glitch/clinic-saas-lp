/* eslint-disable */
// Clinic Core デモを自動ログイン → 主要画面を巡回して録画
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const OUT_DIR = path.join(__dirname, '..', 'public', 'screens', 'clinic-core', 'videos');
fs.mkdirSync(OUT_DIR, { recursive: true });

const EMAIL = 'oguchi.demo@gmail.com';
const PASSWORD = 'DemoPass2026';
const URL_BASE = 'https://clinic-core-demo.vercel.app';

const wait = (ms) => new Promise((r) => setTimeout(r, ms));

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1280, height: 800 },
    recordVideo: {
      dir: OUT_DIR,
      size: { width: 1280, height: 800 },
    },
  });
  const page = await context.newPage();

  try {
    console.log('opening demo (auto-login expected)...');
    await page.goto(`${URL_BASE}/`, { waitUntil: 'domcontentloaded', timeout: 60000 });
    await page.waitForLoadState('networkidle', { timeout: 30000 }).catch(() => {});
    await wait(5000); // 初期セットアップモーダル等が出てくるのを待つ

    // 初期セットアップモーダルがあれば「スキップ」or「次へ」連打で閉じる
    for (let i = 0; i < 5; i++) {
      const clicked = await page.evaluate(() => {
        const all = Array.from(document.querySelectorAll('button'));
        for (const label of ['スキップ', '次へ', '完了', '閉じる', 'はじめる']) {
          const b = all.find((el) => (el.textContent || '').trim() === label && !el.disabled);
          if (b) { b.click(); return label; }
        }
        return null;
      });
      if (!clicked) break;
      console.log(`modal: ${clicked}`);
      await wait(900);
    }
    await wait(1500);

    // 各タブを順次クリック（ホーム→顧客→予約→営業データ→月間統計→マスター）
    const tabs = [
      'ホーム',
      '顧客管理',
      '予約管理',
      '営業データ',
      '月間統計',
      'マスター',
    ];
    for (const t of tabs) {
      const ok = await page.evaluate((label) => {
        const all = Array.from(document.querySelectorAll('a, button, [role="tab"], li'));
        // 厳密に短い要素（タブナビゲーション）を優先
        const candidates = all.filter((e) => {
          const txt = (e.textContent || '').trim();
          return txt.includes(label) && txt.length < 30;
        });
        // クリック可能な要素を選ぶ
        const el = candidates.find((c) => c.tagName === 'BUTTON' || c.tagName === 'A' || c.onclick || c.getAttribute('role') === 'tab') || candidates[0];
        if (el) {
          el.scrollIntoView({ block: 'center' });
          el.click();
          return true;
        }
        return false;
      }, t);
      console.log(`tab ${t}: ${ok}`);
      await wait(3500);
    }

    // 営業データの中のROAS / LTVタブも巡る
    for (const sub of ['ROAS', 'LTV', 'リピート', 'クロス集計', 'エリア分析']) {
      const ok = await page.evaluate((label) => {
        const all = Array.from(document.querySelectorAll('a, button'));
        const el = all.find((e) => (e.textContent || '').trim() === label);
        if (el) { el.click(); return true; }
        return false;
      }, sub);
      if (ok) {
        console.log(`subtab ${sub}: ok`);
        await wait(2500);
      }
    }

    console.log('navigation done.');
  } catch (e) {
    console.error('error:', e.message);
  } finally {
    try { await page.close(); } catch (e) {}
    await context.close();
    await browser.close();

    const files = fs.readdirSync(OUT_DIR).filter((f) => f.endsWith('.webm'));
    if (files.length > 0) {
      const latest = files
        .map((f) => ({ f, stat: fs.statSync(path.join(OUT_DIR, f)) }))
        .sort((a, b) => b.stat.mtimeMs - a.stat.mtimeMs)[0].f;
      const target = path.join(OUT_DIR, 'clinic-core-demo.webm');
      if (fs.existsSync(target) && latest !== 'clinic-core-demo.webm') fs.unlinkSync(target);
      if (latest !== 'clinic-core-demo.webm') fs.renameSync(path.join(OUT_DIR, latest), target);
      fs.readdirSync(OUT_DIR)
        .filter((f) => f.endsWith('.webm') && f !== 'clinic-core-demo.webm')
        .forEach((f) => fs.unlinkSync(path.join(OUT_DIR, f)));
      const finalStat = fs.statSync(target);
      console.log(`saved: ${target} (${(finalStat.size / 1024 / 1024).toFixed(2)} MB)`);
    } else {
      console.log('no video files produced.');
    }
  }
})();
