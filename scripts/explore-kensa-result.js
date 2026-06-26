/* eslint-disable */
// カラダマップ デモの「診断結果」ページの構造を探索
// タブ/ボタン一覧を抽出して、撮るべきビューを特定する
const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const OUT_DIR = path.join(__dirname, '..', 'tmp-kensa-explore');
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
  await page.setViewport({ width: 1440, height: 1800, deviceScaleFactor: 2 });

  try {
    await page.goto('https://kensa-sheet-app.vercel.app/demo', {
      waitUntil: 'domcontentloaded',
      timeout: 60000,
    });
    await wait(3000);
    console.log('opened');

    // チュートリアル閉じる
    for (let i = 0; i < 8; i++) {
      const clicked = await page.evaluate(() => {
        const candidates = ['次へ', 'スキップ', '完了', 'はじめる', 'スタート', '閉じる', 'OK'];
        const all = Array.from(document.querySelectorAll('button'));
        for (const c of candidates) {
          const b = all.find((el) => (el.textContent || '').trim() === c && !el.disabled);
          if (b) { b.click(); return c; }
        }
        return null;
      });
      if (!clicked) break;
      await wait(700);
    }
    await wait(1500);

    // 患者情報・各検査ステップを自動入力 → 診断結果へ
    const autofill = async () => {
      await page.evaluate(() => {
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
        document.querySelectorAll('select').forEach((el) => {
          if (el.options.length > 1 && !el.value) {
            el.selectedIndex = 1;
            el.dispatchEvent(new Event('change', { bubbles: true }));
          }
        });
        const radioGroups = {};
        document.querySelectorAll('input[type="radio"]').forEach((el) => {
          if (!radioGroups[el.name]) {
            radioGroups[el.name] = el;
            el.click();
          }
        });
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
        const nrsBtn = buttons.find((b) => (b.textContent || '').trim() === '5');
        if (nrsBtn) try { nrsBtn.click(); } catch (e) {}
      });
    };

    const advance = async (label) => {
      return await page.evaluate((label) => {
        const buttons = Array.from(document.querySelectorAll('button'));
        const b = buttons.find((el) => (el.textContent || '').includes(label) && !el.disabled);
        if (b) { b.click(); return true; }
        return false;
      }, label);
    };

    await autofill();
    await wait(800);
    await page.screenshot({ path: path.join(OUT_DIR, '1-after-patient.png'), fullPage: true });

    await advance('立位検査');
    await wait(1800);
    await autofill();
    await wait(800);
    await page.screenshot({ path: path.join(OUT_DIR, '2-after-standing.png'), fullPage: true });

    await advance('座位検査');
    await wait(1800);
    await autofill();
    await wait(800);
    await page.screenshot({ path: path.join(OUT_DIR, '3-after-seated.png'), fullPage: true });

    await advance('上半身検査');
    await wait(1800);
    await autofill();
    await wait(800);
    await page.screenshot({ path: path.join(OUT_DIR, '4-after-upper.png'), fullPage: true });

    let ok = await advance('診断する');
    if (!ok) ok = await advance('診断');
    console.log('診断 click:', ok);
    await wait(3000);
    await page.screenshot({ path: path.join(OUT_DIR, '5-result-default.png'), fullPage: true });
    console.log('result page snapped');

    // 結果ページ上のボタン/タブの一覧を出力
    const interactiveElements = await page.evaluate(() => {
      const out = { buttons: [], tabs: [], links: [] };
      document.querySelectorAll('button').forEach((b) => {
        const t = (b.textContent || '').trim();
        if (t.length > 0 && t.length < 30) out.buttons.push(t);
      });
      document.querySelectorAll('[role="tab"], [role="tablist"] *').forEach((b) => {
        const t = (b.textContent || '').trim();
        if (t && t.length < 30) out.tabs.push(t);
      });
      document.querySelectorAll('a').forEach((a) => {
        const t = (a.textContent || '').trim();
        if (t && t.length < 30) out.links.push(t);
      });
      return out;
    });
    console.log('===== INTERACTIVE ELEMENTS =====');
    console.log(JSON.stringify(interactiveElements, null, 2));

    // 「治療家用」「患者様用」「イラスト」「人体画像」「背面」「前面」などのタブを順番に押して撮影
    const tabsToClick = ['治療家用', '治療家', 'イラスト', '患者様用', '患者', '人体画像', '前面', '背面', '体幹回旋', '回旋', '側屈'];
    for (const label of tabsToClick) {
      const found = await page.evaluate((label) => {
        const all = Array.from(document.querySelectorAll('button, [role="tab"], a'));
        const b = all.find((el) => (el.textContent || '').includes(label));
        if (b) { b.click(); return true; }
        return false;
      }, label);
      if (found) {
        await wait(1200);
        const safe = label.replace(/[\\/:*?"<>|]/g, '_');
        await page.screenshot({ path: path.join(OUT_DIR, `tab-${safe}.png`), fullPage: true });
        console.log(`tab snapped: ${label}`);
      }
    }

    console.log('done');
  } catch (e) {
    console.error('error:', e.message);
    console.error(e.stack);
  } finally {
    await browser.close();
  }
})();
