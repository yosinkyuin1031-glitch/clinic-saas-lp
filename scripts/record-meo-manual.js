/* eslint-disable */
// MEO勝ち上げくん デモを手動操作で録画
// ブラウザが立ち上がる → ユーザー手動ログイン → 5分間操作 → 自動終了
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const OUT_DIR = path.join(__dirname, '..', 'public', 'screens', 'meo', 'videos');
fs.mkdirSync(OUT_DIR, { recursive: true });

const DURATION_MS = 5 * 60 * 1000; // 5分

(async () => {
  console.log('========================================');
  console.log('MEO勝ち上げくん デモアプリ 手動録画モード');
  console.log('========================================');
  console.log('1. ブラウザが立ち上がります');
  console.log('2. ログイン画面でメール・パスワードを入力してログイン');
  console.log('3. 主要画面（順位推移／投稿生成／記事生成など）を見せて回ってください');
  console.log('4. 5分経過で自動的に録画終了します');
  console.log('   早く終わらせたい場合はブラウザのウィンドウを閉じてください');
  console.log('========================================');

  const browser = await chromium.launch({
    headless: false,
    args: ['--no-sandbox'],
  });
  const context = await browser.newContext({
    viewport: { width: 1280, height: 800 },
    recordVideo: {
      dir: OUT_DIR,
      size: { width: 1280, height: 800 },
    },
  });
  const page = await context.newPage();

  try {
    await page.goto('https://meo-kachiagekun.vercel.app/login', {
      waitUntil: 'domcontentloaded',
      timeout: 60000,
    });
    console.log('opened MEO login page. please login & navigate...');

    // 5分待機（ユーザーがブラウザを閉じたら早期終了）
    const start = Date.now();
    while (Date.now() - start < DURATION_MS) {
      try {
        // ページが閉じられたかチェック
        if (page.isClosed()) {
          console.log('browser closed by user. stopping...');
          break;
        }
        await new Promise((r) => setTimeout(r, 2000));
      } catch (e) {
        console.log('error during wait:', e.message);
        break;
      }
    }

    console.log('recording finished. saving video...');
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
      const target = path.join(OUT_DIR, 'meo-demo.webm');
      if (fs.existsSync(target) && latest !== 'meo-demo.webm') fs.unlinkSync(target);
      if (latest !== 'meo-demo.webm') fs.renameSync(path.join(OUT_DIR, latest), target);
      fs.readdirSync(OUT_DIR)
        .filter((f) => f.endsWith('.webm') && f !== 'meo-demo.webm')
        .forEach((f) => fs.unlinkSync(path.join(OUT_DIR, f)));
      const finalStat = fs.statSync(target);
      console.log(`saved: ${target} (${(finalStat.size / 1024 / 1024).toFixed(2)} MB)`);
    } else {
      console.log('no video files produced.');
    }
  }
})();
