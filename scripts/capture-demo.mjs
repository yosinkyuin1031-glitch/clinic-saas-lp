import { chromium } from 'playwright'

const DEMO = 'https://clinic-core-demo.vercel.app'
const OUT = 'public/screens/clinic-core'

const pages = [
  { path: '/', name: 'home',         desc: 'ホーム（売上サマリ）' },
  { path: '/patients',    name: 'patients',     desc: '患者一覧' },
  { path: '/sales/roas',  name: 'roas',         desc: 'ROAS' },
  { path: '/sales/ltv',   name: 'ltv',          desc: 'LTV分析' },
  { path: '/sales/by-staff', name: 'by-staff',  desc: 'スタッフ別売上' },
  { path: '/stats',       name: 'stats',        desc: '月間統計' },
  { path: '/master',      name: 'master',       desc: 'マスター画面' },
  { path: '/visits',      name: 'visits',       desc: '来院履歴' },
  { path: '/reservation', name: 'reservation',  desc: '予約管理' },
]

const browser = await chromium.launch()
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 })
const page = await ctx.newPage()

// まずデモトップで自動ログイン
console.log('🔑 自動ログイン中…')
await page.goto(DEMO + '/', { waitUntil: 'networkidle', timeout: 60000 })
await page.waitForTimeout(5000) // ログインリダイレクト待ち

for (const p of pages) {
  console.log(`📸 ${p.name}  ${p.desc}`)
  await page.goto(DEMO + p.path, { waitUntil: 'networkidle', timeout: 60000 })
  await page.waitForTimeout(3000) // データロード待ち
  await page.screenshot({ path: `${OUT}/${p.name}.png`, fullPage: false }) // viewport画面のみ
}

await browser.close()
console.log('✅ 完了')
