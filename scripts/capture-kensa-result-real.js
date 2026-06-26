/* eslint-disable */
// カラダマップ デモ → 歪みパターンを意図的に作って診断結果を撮影
// 患者様用（人体画像）/ 治療家用（イラスト）の両方を撮る
// 詳細ビュー（体幹回旋・側屈など）も探索する
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

    // 患者情報を入力
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
      // 男性/初診など
      const meta = ['男性', '初診'];
      const btns = Array.from(document.querySelectorAll('button'));
      meta.forEach((label) => {
        const b = btns.find((el) => (el.textContent || '').trim() === label && !el.disabled);
        if (b) b.click();
      });
      // NRS 5
      const nrsBtn = btns.find((el) => (el.textContent || '').trim() === '5');
      if (nrsBtn) try { nrsBtn.click(); } catch (e) {}
    });
    await wait(1000);

    // 歪みパターン作成：各検査ステップで3つのランドマーク（乳様突起/肩甲下角/腸骨稜）に対し
    // 「← 左が低い」「同じ高さ」「右が低い →」の3択ボタングループから選択する
    // パターン: 立位=左低/右低/左低（左後傾的）、 座位=左低/同/右低、 上半身=右低/同/左低
    const fillAsymmetry = async (pattern) => {
      await page.evaluate((pattern) => {
        const buttons = Array.from(document.querySelectorAll('button'));
        const choiceMap = { L: '← 左が低い', E: '同じ高さ', R: '右が低い →' };

        // 「同じ高さ」を持つ親要素＝1グループとして検出
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

        // パターンを各グループに割り当て
        groups.forEach((group, idx) => {
          const code = pattern[idx % pattern.length];
          const target = choiceMap[code];
          const btn = group.find((b) => (b.textContent || '').trim() === target);
          if (btn) try { btn.click(); } catch (e) {}
        });

        return groups.length;
      }, pattern);
    };

    const advance = async (label) => {
      return await page.evaluate((label) => {
        const buttons = Array.from(document.querySelectorAll('button'));
        const b = buttons.find((el) => (el.textContent || '').includes(label) && !el.disabled);
        if (b) { b.click(); return true; }
        return false;
      }, label);
    };

    // 「立位検査へ」進む
    let ok = await advance('立位検査');
    console.log('→ 立位検査:', ok);
    await wait(1800);
    await fillAsymmetry(['L', 'R', 'L']);  // 乳様突起=左低・肩甲下角=右低・腸骨稜=左低
    await wait(800);

    // 「座位検査へ」進む
    ok = await advance('座位検査');
    console.log('→ 座位検査:', ok);
    await wait(1800);
    await fillAsymmetry(['L', 'E', 'R']);
    await wait(800);

    // 「上半身検査へ」進む
    ok = await advance('上半身検査');
    console.log('→ 上半身検査:', ok);
    await wait(1800);
    await fillAsymmetry(['R', 'E', 'L']);
    await wait(800);

    // 「診断する」
    ok = await advance('診断する');
    console.log('→ 診断する:', ok);
    await wait(3500);

    // 結果ページ：デフォルト＝患者様用（人体画像）タブ
    await page.evaluate(() => {
      const b = Array.from(document.querySelectorAll('button')).find((x) => (x.textContent || '').includes('患者様用'));
      if (b) b.click();
    });
    await wait(1200);
    await page.screenshot({ path: path.join(OUT_DIR, 'result-patient-body.png'), fullPage: true });
    console.log('snapped: result-patient-body.png');

    // 上部のヒーローっぽい部分だけのトリミング（人体画像カードのみ）
    const patientCard = await page.evaluate(() => {
      // 「左」「右」と書かれたカードの bounding rect を返す
      const all = Array.from(document.querySelectorAll('div'));
      const card = all.find((el) => {
        const html = el.innerHTML || '';
        return /患者様用|患者目線/.test(html) && el.querySelector('img');
      });
      if (!card) return null;
      const img = card.querySelector('img');
      const r = (img.closest('div[class*="rounded"], div[class*="border"]') || img).getBoundingClientRect();
      return { x: r.x, y: r.y, width: r.width, height: r.height };
    });
    if (patientCard) {
      await page.screenshot({
        path: path.join(OUT_DIR, 'result-patient-body-card.png'),
        clip: { x: Math.max(0, patientCard.x - 10), y: Math.max(0, patientCard.y - 10), width: patientCard.width + 20, height: patientCard.height + 20 },
      });
      console.log('snapped card: result-patient-body-card.png');
    }

    // 治療家用（イラスト）タブ
    await page.evaluate(() => {
      const b = Array.from(document.querySelectorAll('button')).find((x) => (x.textContent || '').includes('治療家用'));
      if (b) b.click();
    });
    await wait(1500);
    await page.screenshot({ path: path.join(OUT_DIR, 'result-illustration.png'), fullPage: true });
    console.log('snapped: result-illustration.png');

    // イラストカードのみのトリミング
    const illustCard = await page.evaluate(() => {
      const all = Array.from(document.querySelectorAll('div'));
      const card = all.find((el) => {
        const html = el.innerHTML || '';
        return /治療家用|患者目線/.test(html) && el.querySelector('svg, img');
      });
      if (!card) return null;
      const target = card.querySelector('svg, img');
      const r = (target.closest('div[class*="rounded"], div[class*="border"]') || target).getBoundingClientRect();
      return { x: r.x, y: r.y, width: r.width, height: r.height };
    });
    if (illustCard) {
      await page.screenshot({
        path: path.join(OUT_DIR, 'result-illustration-card.png'),
        clip: { x: Math.max(0, illustCard.x - 10), y: Math.max(0, illustCard.y - 10), width: illustCard.width + 20, height: illustCard.height + 20 },
      });
      console.log('snapped card: result-illustration-card.png');
    }

    // 「詳細を確認」をクリックして詳細ビューへ
    const wentDetail = await page.evaluate(() => {
      const b = Array.from(document.querySelectorAll('button')).find((x) => (x.textContent || '').includes('詳細を確認'));
      if (b) { b.click(); return true; }
      return false;
    });
    console.log('詳細を確認 click:', wentDetail);
    if (wentDetail) {
      await wait(2000);
      await page.screenshot({ path: path.join(OUT_DIR, 'result-detail-1.png'), fullPage: true });
      console.log('snapped: result-detail-1.png');

      // 詳細ビュー内のタブ（体幹回旋・側屈・前後屈など）を順に試す
      const detailTabs = ['体幹回旋', '回旋', '側屈', '前後屈', '骨盤', '前面', '背面', '側面'];
      for (const label of detailTabs) {
        const found = await page.evaluate((label) => {
          const all = Array.from(document.querySelectorAll('button, [role="tab"]'));
          const b = all.find((el) => (el.textContent || '').includes(label));
          if (b) { b.click(); return true; }
          return false;
        }, label);
        if (found) {
          await wait(1200);
          const safe = label.replace(/[\\/:*?"<>|]/g, '_');
          await page.screenshot({ path: path.join(OUT_DIR, `result-detail-${safe}.png`), fullPage: true });
          console.log(`snapped detail tab: ${label}`);
        }
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
