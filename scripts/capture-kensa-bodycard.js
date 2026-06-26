/* eslint-disable */
// 結果ページの体幹図カードだけを綺麗に切り抜く
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
  // 縦長で人体図がはっきり見える解像度に
  await page.setViewport({ width: 1100, height: 2200, deviceScaleFactor: 2 });

  try {
    await page.goto('https://kensa-sheet-app.vercel.app/demo', {
      waitUntil: 'domcontentloaded',
      timeout: 60000,
    });
    await wait(3000);

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

    // 患者情報
    await page.evaluate(() => {
      document.querySelectorAll('input[type="text"], input:not([type]), textarea').forEach((el) => {
        if (!el.value && !el.disabled) {
          let v = 'デモ太郎';
          if ((el.placeholder || '').includes('歳')) v = '45';
          el.focus(); el.value = v;
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
      const btns = Array.from(document.querySelectorAll('button'));
      ['男性', '初診'].forEach((label) => {
        const b = btns.find((el) => (el.textContent || '').trim() === label && !el.disabled);
        if (b) b.click();
      });
      const nrsBtn = btns.find((el) => (el.textContent || '').trim() === '5');
      if (nrsBtn) try { nrsBtn.click(); } catch (e) {}
    });
    await wait(1000);

    const fillAsymmetry = async (pattern) => {
      return await page.evaluate((pattern) => {
        const buttons = Array.from(document.querySelectorAll('button'));
        const choiceMap = { L: '← 左が低い', E: '同じ高さ', R: '右が低い →' };
        const groups = [];
        const seenParents = new Set();
        buttons.forEach((b) => {
          if ((b.textContent || '').trim() === '同じ高さ') {
            const parent = b.closest('.flex, [class*="grid"], div');
            if (parent && !seenParents.has(parent)) {
              const groupButtons = Array.from(parent.querySelectorAll('button')).filter(
                (gb) => ['← 左が低い', '同じ高さ', '右が低い →'].includes((gb.textContent || '').trim())
              );
              if (groupButtons.length === 3) {
                seenParents.add(parent);
                groups.push(groupButtons);
              }
            }
          }
        });
        groups.forEach((group, idx) => {
          const code = pattern[idx % pattern.length];
          const btn = group.find((b) => (b.textContent || '').trim() === choiceMap[code]);
          if (btn) try { btn.click(); } catch (e) {}
        });
        return groups.length;
      }, pattern);
    };

    const advance = async (label) => {
      return await page.evaluate((label) => {
        const b = Array.from(document.querySelectorAll('button')).find((el) => (el.textContent || '').includes(label) && !el.disabled);
        if (b) { b.click(); return true; }
        return false;
      }, label);
    };

    await advance('立位検査');
    await wait(2000);
    await fillAsymmetry(['L', 'R', 'L']);
    await wait(800);

    await advance('座位検査');
    await wait(2000);
    await fillAsymmetry(['L', 'E', 'R']);
    await wait(800);

    await advance('上半身検査');
    await wait(2000);
    await fillAsymmetry(['R', 'L', 'L']);
    await wait(800);

    await advance('診断する');
    await wait(4000);

    // 結果ページ：人体図カードを探す（より緩い条件）
    // 「治療家用（イラスト）」タブを押す
    await page.evaluate(() => {
      const b = Array.from(document.querySelectorAll('button')).find((x) => (x.textContent || '').includes('治療家用'));
      if (b) b.click();
    });
    await wait(1500);

    // ページ全体を一旦撮る（リサーチ用）
    await page.screenshot({ path: path.join(OUT_DIR, '_research-illustration-full.png'), fullPage: true });

    // 体幹図カードの正確な位置を取得する：
    // 「全身ランドマーク状態」「検査の流れと結果」あたりが結果ページの上部にある。
    // 「左」「右」の小さい文字を含む div + img/svg を持つ最初のカードを探す
    const cardRect = await page.evaluate(() => {
      // すべての div を順に走査して「左」「右」の文字とimg or svg を含むカード状の要素を見つける
      const divs = Array.from(document.querySelectorAll('div'));
      for (const d of divs) {
        const t = (d.textContent || '').trim();
        if (t.length > 200) continue; // 大きすぎるコンテナはスキップ
        if (!/^左[\s\S]*右|^[\s\S]*左[\s\S]*右[\s\S]*$/.test(t.replace(/\s+/g, ''))) continue;
        const hasImg = d.querySelector('img, svg');
        if (!hasImg) continue;
        const r = d.getBoundingClientRect();
        if (r.width < 200 || r.height < 200) continue; // 小さすぎる
        return { x: r.x, y: r.y, width: r.width, height: r.height, txt: t.slice(0, 100) };
      }
      // フォールバック：最初に画像を含む rounded div
      const card = divs.find((el) => {
        const r = el.getBoundingClientRect();
        return el.querySelector('img, svg') && r.width >= 250 && r.height >= 300 && r.width < 800;
      });
      if (card) {
        const r = card.getBoundingClientRect();
        return { x: r.x, y: r.y, width: r.width, height: r.height, txt: 'fallback' };
      }
      return null;
    });
    console.log('illustration card rect:', cardRect);

    if (cardRect && cardRect.width > 100 && cardRect.height > 100) {
      const pad = 20;
      const clip = {
        x: Math.max(0, cardRect.x - pad),
        y: Math.max(0, cardRect.y - pad),
        width: Math.min(cardRect.width + pad * 2, 1100),
        height: cardRect.height + pad * 2,
      };
      await page.screenshot({ path: path.join(OUT_DIR, 'result-body-illustration.png'), clip });
      console.log('snapped: result-body-illustration.png');
    }

    // 患者様用（人体画像）タブに切り替えて同様に
    await page.evaluate(() => {
      const b = Array.from(document.querySelectorAll('button')).find((x) => (x.textContent || '').includes('患者様用'));
      if (b) b.click();
    });
    await wait(1500);
    await page.screenshot({ path: path.join(OUT_DIR, '_research-patient-full.png'), fullPage: true });

    const patientRect = await page.evaluate(() => {
      const divs = Array.from(document.querySelectorAll('div'));
      for (const d of divs) {
        const t = (d.textContent || '').trim();
        if (t.length > 200) continue;
        if (!/^左[\s\S]*右|^[\s\S]*左[\s\S]*右[\s\S]*$/.test(t.replace(/\s+/g, ''))) continue;
        const hasImg = d.querySelector('img, svg');
        if (!hasImg) continue;
        const r = d.getBoundingClientRect();
        if (r.width < 200 || r.height < 200) continue;
        return { x: r.x, y: r.y, width: r.width, height: r.height, txt: t.slice(0, 100) };
      }
      return null;
    });
    console.log('patient card rect:', patientRect);

    if (patientRect && patientRect.width > 100 && patientRect.height > 100) {
      const pad = 20;
      await page.screenshot({
        path: path.join(OUT_DIR, 'result-body-patient.png'),
        clip: {
          x: Math.max(0, patientRect.x - pad),
          y: Math.max(0, patientRect.y - pad),
          width: Math.min(patientRect.width + pad * 2, 1100),
          height: patientRect.height + pad * 2,
        },
      });
      console.log('snapped: result-body-patient.png');
    }

    console.log('done');
  } catch (e) {
    console.error('error:', e.message);
    console.error(e.stack);
  } finally {
    await browser.close();
  }
})();
