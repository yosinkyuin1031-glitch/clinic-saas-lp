/* eslint-disable */
// カラダマップ デモのスクショ撮影（v3）
// 1) チュートリアル「次へ」を連打して終了
// 2) 患者情報の必須項目を埋める
// 3) 各検査ステップでラジオを埋めて進める
// 4) ステップごとにスクショ
const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const OUT_DIR = path.join(__dirname, '..', 'public', 'screens', 'kensa');
fs.mkdirSync(OUT_DIR, { recursive: true });

const wait = (ms) => new Promise((r) => setTimeout(r, ms));

(async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
    protocolTimeout: 60000,
  });
  const page = await browser.newPage();
  page.setDefaultTimeout(15000);
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });

  try {
    await page.goto('https://kensa-sheet-app.vercel.app/demo', {
      waitUntil: 'domcontentloaded',
      timeout: 60000,
    });
    await wait(3000);
    console.log('opened');

    // 1) チュートリアル「次へ」を最大8回押す（スキップでも可）
    for (let i = 0; i < 8; i++) {
      const clicked = await page.evaluate(() => {
        const candidates = ['次へ', 'スキップ', '完了', 'はじめる', 'スタート'];
        const all = Array.from(document.querySelectorAll('button'));
        for (const c of candidates) {
          const b = all.find((el) => (el.textContent || '').trim() === c && !el.disabled);
          if (b) {
            b.click();
            return c;
          }
        }
        return null;
      });
      if (!clicked) break;
      console.log(`tutorial click ${i + 1}: ${clicked}`);
      await wait(800);
    }
    await wait(1500);

    // 2) 必須テキスト/セレクト/ラジオを自動入力
    await page.evaluate(() => {
      // テキスト入力
      document.querySelectorAll('input[type="text"], input:not([type]), textarea').forEach((el) => {
        if (!el.value && !el.disabled) {
          const desc = (el.placeholder || el.name || '').toLowerCase();
          let v = 'デモ太郎';
          if (desc.includes('age') || desc.includes('歳')) v = '45';
          el.focus();
          el.value = v;
          el.dispatchEvent(new Event('input', { bubbles: true }));
          el.dispatchEvent(new Event('change', { bubbles: true }));
        }
      });
      // セレクト
      document.querySelectorAll('select').forEach((el) => {
        if (el.options.length > 1 && !el.value) {
          el.selectedIndex = 1;
          el.dispatchEvent(new Event('change', { bubbles: true }));
        }
      });
      // ラジオ（最初を選択）
      const radioGroups = {};
      document.querySelectorAll('input[type="radio"]').forEach((el) => {
        if (!radioGroups[el.name]) {
          radioGroups[el.name] = el;
          el.click();
        }
      });
      // 「ボタン形式のラジオ」（左高/均等/右高など）グループごとに最初の選択肢押下
      const choiceLabels = ['左高', '均等', '右高', 'なし', '少し', '中等度', '強い', '男性', '女性', '初診', '再診'];
      const buttons = Array.from(document.querySelectorAll('button'));
      const matched = buttons.filter((b) => choiceLabels.includes((b.textContent || '').trim()));
      const seen = new Set();
      matched.forEach((b) => {
        const parent = b.closest('div');
        if (!parent || seen.has(parent)) return;
        seen.add(parent);
        try { b.click(); } catch (e) {}
      });
      // NRS など 0〜10 ボタン
      const nrsBtn = buttons.find((b) => (b.textContent || '').trim() === '5');
      if (nrsBtn) try { nrsBtn.click(); } catch (e) {}
    });
    await wait(1500);

    // 3) Step1：患者情報の画面で撮影
    console.log('snap 1: patient');
    await page.screenshot({ path: path.join(OUT_DIR, '1-patient.png') });

    // ステップ進行関数
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
        const choiceLabels = ['左高', '均等', '右高', 'なし', '少し', '中等度', '強い'];
        const buttons = Array.from(document.querySelectorAll('button'));
        const matched = buttons.filter((b) => choiceLabels.includes((b.textContent || '').trim()));
        const seen = new Set();
        matched.forEach((b) => {
          const parent = b.closest('div');
          if (!parent || seen.has(parent)) return;
          seen.add(parent);
          try { b.click(); } catch (e) {}
        });
      });
    };

    // Step2: 立位検査
    let ok = await advance('立位検査へ');
    if (!ok) ok = await advance('立位検査');
    console.log('step2 advance:', ok);
    await wait(1800);
    await fillStepRadios();
    await wait(800);
    console.log('snap 2: standing');
    await page.screenshot({ path: path.join(OUT_DIR, '2-standing.png') });

    // Step3: 座位検査
    ok = await advance('座位検査へ');
    if (!ok) ok = await advance('座位検査');
    console.log('step3 advance:', ok);
    await wait(1800);
    await fillStepRadios();
    await wait(800);
    console.log('snap 3: seated');
    await page.screenshot({ path: path.join(OUT_DIR, '3-seated.png') });

    // Step4: 上半身検査
    ok = await advance('上半身検査へ');
    if (!ok) ok = await advance('上半身検査');
    console.log('step4 advance:', ok);
    await wait(1800);
    await fillStepRadios();
    await wait(800);
    console.log('snap 4: upper');
    await page.screenshot({ path: path.join(OUT_DIR, '4-upper.png') });

    // Step5: 診断結果
    ok = await advance('診断する');
    if (!ok) ok = await advance('診断');
    console.log('step5 advance:', ok);
    await wait(2500);
    console.log('snap 5: result');
    await page.screenshot({ path: path.join(OUT_DIR, '5-result.png') });

    console.log('done');
  } catch (e) {
    console.error('error:', e.message);
  } finally {
    await browser.close();
  }
})();
