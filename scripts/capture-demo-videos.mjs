// デモ操作の動画(WebM)を自動キャプチャ
// 出力: public/screens/clinic-core/videos/*.webm
import { chromium } from 'playwright'
import { mkdirSync, renameSync, readdirSync } from 'node:fs'
import { join } from 'node:path'

const DEMO = 'https://clinic-core-demo.vercel.app'
const VIDEO_DIR = 'public/screens/clinic-core/videos'
mkdirSync(VIDEO_DIR, { recursive: true })

const scenarios = [
  {
    name: 'patients-overview',
    description: '患者一覧→詳細→LTV',
    run: async (page) => {
      await page.goto(DEMO + '/patients', { waitUntil: 'networkidle', timeout: 60000 })
      await page.waitForTimeout(2500)
      // スクロール
      await page.evaluate(() => window.scrollBy({ top: 200, behavior: 'smooth' }))
      await page.waitForTimeout(1500)
      await page.evaluate(() => window.scrollBy({ top: 200, behavior: 'smooth' }))
      await page.waitForTimeout(1500)
      // 患者カードクリック（あれば）
      const firstPatient = await page.locator('a[href^="/patients/"], button:has-text("詳細"), [role="button"]').first()
      if (await firstPatient.count() > 0) {
        await firstPatient.click().catch(() => {})
        await page.waitForTimeout(3000)
      }
    },
  },
  {
    name: 'roas-analysis',
    description: 'ROAS分析画面のタブ切替',
    run: async (page) => {
      await page.goto(DEMO + '/sales/roas', { waitUntil: 'networkidle', timeout: 60000 })
      await page.waitForTimeout(3000)
      // 症状別タブクリック
      const symptomTab = page.locator('button:has-text("症状")').first()
      if (await symptomTab.count() > 0) {
        await symptomTab.click().catch(() => {})
        await page.waitForTimeout(2500)
      }
      // 来店動機タブに戻る
      const motiveTab = page.locator('button:has-text("来店動機")').first()
      if (await motiveTab.count() > 0) {
        await motiveTab.click().catch(() => {})
        await page.waitForTimeout(2500)
      }
    },
  },
  {
    name: 'ltv-analysis',
    description: 'LTV分析画面',
    run: async (page) => {
      await page.goto(DEMO + '/sales/ltv', { waitUntil: 'networkidle', timeout: 60000 })
      await page.waitForTimeout(3000)
      // スクロール
      await page.evaluate(() => window.scrollBy({ top: 300, behavior: 'smooth' }))
      await page.waitForTimeout(2000)
      await page.evaluate(() => window.scrollBy({ top: 300, behavior: 'smooth' }))
      await page.waitForTimeout(2000)
    },
  },
  {
    name: 'master-menu',
    description: 'マスター画面のメニュー編集',
    run: async (page) => {
      await page.goto(DEMO + '/master/base-menus', { waitUntil: 'networkidle', timeout: 60000 })
      await page.waitForTimeout(3000)
      // 編集ボタンをクリック
      const editBtn = page.locator('button:has-text("編集")').first()
      if (await editBtn.count() > 0) {
        await editBtn.click().catch(() => {})
        await page.waitForTimeout(2500)
      }
    },
  },
]

const browser = await chromium.launch()

for (const sc of scenarios) {
  console.log(`📹 ${sc.name}: ${sc.description}`)
  const ctx = await browser.newContext({
    viewport: { width: 1280, height: 800 },
    deviceScaleFactor: 1,
    recordVideo: { dir: VIDEO_DIR, size: { width: 1280, height: 800 } },
  })
  const page = await ctx.newPage()

  try {
    // 自動ログイン待ち（初回のみ時間かかる）
    await page.goto(DEMO + '/', { waitUntil: 'networkidle', timeout: 60000 })
    await page.waitForTimeout(4000)
    // シナリオ実行
    await sc.run(page)
  } catch (e) {
    console.warn(`  ⚠️ ${sc.name} エラー: ${e.message}`)
  }

  await ctx.close()
  // ctx.close() 後にPlaywrightがvideo保存。今回生まれた page@ のみがリネーム対象
  const newFile = readdirSync(VIDEO_DIR).find(f => f.startsWith('page@') && f.endsWith('.webm'))
  if (newFile) {
    const oldPath = join(VIDEO_DIR, newFile)
    const newPath = join(VIDEO_DIR, `${sc.name}.webm`)
    renameSync(oldPath, newPath)
    console.log(`  → ${newPath}`)
  } else {
    console.warn(`  ⚠️ ${sc.name}.webm の動画ファイルが見つかりません`)
  }
}

await browser.close()
console.log('\n✅ 完了')
