/* eslint-disable */
// カラダマップ デモの操作動画を Playwright で録画
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const OUT_DIR = path.join(__dirname, '..', 'public', 'screens', 'kensa', 'videos');
fs.mkdirSync(OUT_DIR, { recursive: true });

const wait = (ms) => new Promise((r) => setTimeout(r, ms));

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1280, height: 800 },
    deviceScaleFactor: 1,
    recordVideo: {
      dir: OUT_DIR,
      size: { width: 1280, height: 800 },
    },
  });
  const page = await context.newPage();

  try {
    console.log('opening demo...');
    await page.goto('https://kensa-sheet-app.vercel.app/demo', {
      waitUntil: 'domcontentloaded',
      timeout: 60000,
    });
    await wait(2500);

    // チュートリアル「次へ」→「スキップ」を最大8回押す
    for (let i = 0; i < 8; i++) {
      const clicked = await page.evaluate(() => {
        const candidates = ['次へ', 'スキップ', '完了', 'はじめる', 'スタート'];
        const all = Array.from(document.querySelectorAll('button'));
        for (const c of candidates) {
          const b = all.find((el) => (el.textContent || '').trim() === c && !el.disabled);
          if (b) { b.click(); return c; }
        }
        return null;
      });
      if (!clicked) break;
      console.log(`tutorial: ${clicked}`);
      await wait(700);
    }
    await wait(1500);

    // 必須項目を埋める
    await page.evaluate(() => {
      document.querySelectorAll('input[type="text"], input:not([type]), textarea').forEach((el) => {
        if (!el.value && !el.disabled) {
          el.focus();
          el.value = 'デモ太郎';
          el.dispatchEvent(new Event('input', { bubbles: true }));
          el.dispatchEvent(new Event('change', { bubbles: true }));
        }
      });
      document.querySelectorAll('select').forEach((el) => {
        if (el.options.length > 1 && !el.value) {
          el.selectedIndex = 1;
          el.dispatchEvent(new Event('change', { bubbles: true }));
        }
      });
      const labels = ['左高', '均等', '右高', 'なし', '少し', '中等度', '強い', '男性', '女性', '初診', '再診'];
      const buttons = Array.from(document.querySelectorAll('button'));
      const seen = new Set();
      buttons.filter((b) => labels.includes((b.textContent || '').trim())).forEach((b) => {
        const parent = b.closest('div');
        if (!parent || seen.has(parent)) return;
        seen.add(parent);
        try { b.click(); } catch (e) {}
      });
    });
    await wait(2500); // Step1 を見せる時間

    const advance = async (label) => {
      const ok = await page.evaluate((label) => {
        const buttons = Array.from(document.querySelectorAll('button'));
        const b = buttons.find((el) => (el.textContent || '').includes(label) && !el.disabled);
        if (b) { b.click(); return true; }
        return false;
      }, label);
      return ok;
    };

    const fillStepRadios = async () => {
      await page.evaluate(() => {
        const labels = ['左高', '均等', '右高', 'なし', '少し'];
        const buttons = Array.from(document.querySelectorAll('button'));
        const seen = new Set();
        buttons.filter((b) => labels.includes((b.textContent || '').trim())).forEach((b) => {
          const parent = b.closest('div');
          if (!parent || seen.has(parent)) return;
          seen.add(parent);
          try { b.click(); } catch (e) {}
        });
      });
    };

    // Step2: 立位検査
    await advance('立位検査へ');
    await wait(1800);
    await fillStepRadios();
    await wait(2200);

    // Step3: 座位検査
    await advance('座位検査へ');
    await wait(1800);
    await fillStepRadios();
    await wait(2200);

    // Step4: 上半身検査
    await advance('上半身検査へ');
    await wait(1800);
    await fillStepRadios();
    await wait(2200);

    // Step5: 診断
    await advance('診断する');
    await wait(4000); // 結果を見せる時間

    console.log('done recording');
  } catch (e) {
    console.error('error:', e.message);
  } finally {
    await page.close();
    await context.close();
    await browser.close();
    // 出力されたwebmファイル名を確認
    const files = fs.readdirSync(OUT_DIR).filter((f) => f.endsWith('.webm'));
    console.log('output files:', files);
    // 一番新しいファイルを kensa-demo.webm にリネーム
    if (files.length > 0) {
      const latest = files
        .map((f) => ({ f, stat: fs.statSync(path.join(OUT_DIR, f)) }))
        .sort((a, b) => b.stat.mtimeMs - a.stat.mtimeMs)[0].f;
      const target = path.join(OUT_DIR, 'kensa-demo.webm');
      // 既に同名ファイルがあれば削除
      if (fs.existsSync(target) && latest !== 'kensa-demo.webm') fs.unlinkSync(target);
      if (latest !== 'kensa-demo.webm') fs.renameSync(path.join(OUT_DIR, latest), target);
      // 他の webm は削除
      fs.readdirSync(OUT_DIR).filter((f) => f.endsWith('.webm') && f !== 'kensa-demo.webm').forEach((f) => fs.unlinkSync(path.join(OUT_DIR, f)));
      const finalStat = fs.statSync(target);
      console.log(`saved: ${target} (${(finalStat.size / 1024 / 1024).toFixed(2)} MB)`);
    }
  }
})();
