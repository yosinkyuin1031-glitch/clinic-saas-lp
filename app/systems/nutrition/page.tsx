import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "栄養バランスチェック - 治療院専用 栄養分析システム | ClinicApps",
  description:
    "治療院専用の栄養バランスチェックアプリ。5軸×30問の栄養分析・レーダーチャート・AI食事改善提案・1週間食事改善プラン・ビフォーアフター比較・PDF出力。月額4,980円。",
};

const FEATURES = [
  {
    icon: "M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z",
    title: "5軸×30問の栄養分析",
    desc: "三大栄養素・ビタミン/ミネラル・水分・食事リズム・消化吸収の5軸で総合分析。",
  },
  {
    icon: "M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z",
    title: "レーダーチャートで可視化",
    desc: "5軸の結果をレーダーチャートで一目で把握。患者への栄養指導がわかりやすい。",
  },
  {
    icon: "M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z",
    title: "AIセルフケア（食事改善提案）",
    desc: "分析結果に基づきAIが食事改善メニュー・サプリ提案・レシピ情報を自動生成。",
  },
  {
    icon: "M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5",
    title: "1週間食事改善プラン",
    desc: "患者ごとにカスタマイズされた1週間の食事改善プランをAIが自動作成。",
  },
  {
    icon: "M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 00-3.7-3.7 48.678 48.678 0 00-7.324 0 4.006 4.006 0 00-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3l-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 003.7 3.7 48.656 48.656 0 007.324 0 4.006 4.006 0 003.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3l-3 3",
    title: "ビフォーアフター比較",
    desc: "初回と再検査の結果を重ねて表示。栄養改善度が数字とグラフでわかる。",
  },
  {
    icon: "M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z",
    title: "PDFレポート出力",
    desc: "栄養分析結果・食事改善提案・セルフケアをまとめたPDFを患者に渡せる。",
  },
];

const COMPARISON_ROWS = [
  { label: "月額料金", type: "price" as const },
  { label: "初期費用", type: "custom" as const },
  { label: "5軸スコアリング分析", type: "check" as const },
  { label: "レーダーチャート", type: "check" as const },
  { label: "AIセルフケア提案", type: "check" as const },
  { label: "AI施術提案", type: "check" as const },
  { label: "1週間改善プラン", type: "check" as const },
  { label: "ビフォーアフター比較", type: "check" as const },
  { label: "PDFレポート出力", type: "check" as const },
  { label: "患者追跡・推移グラフ", type: "check" as const },
  { label: "質問数カスタマイズ", type: "check" as const },
  { label: "治療院専用設計", type: "check" as const },
  { label: "導入サポート", type: "custom" as const },
  { label: "最低契約期間", type: "custom" as const },
];

const COMPETITORS = [
  {
    name: "栄養バランス\nチェック",
    highlight: true,
    values: ["4,980円", "0円", "○", "○", "○", "○", "○", "○", "○", "○", "○", "○", "Zoom個別", "なし"],
  },
  {
    name: "紙の問診票",
    highlight: false,
    values: ["0円", "0円", "△", "×", "×", "×", "×", "×", "×", "×", "×", "△", "なし", "-"],
  },
  {
    name: "汎用栄養管理\n(あすけん等)",
    highlight: false,
    values: ["無料〜", "0円", "×", "×", "×", "×", "×", "×", "△", "×", "×", "×", "なし", "なし"],
  },
  {
    name: "汎用アンケート\nツール",
    highlight: false,
    values: ["3,000円〜", "0円", "×", "×", "×", "×", "×", "×", "△", "×", "×", "×", "メール", "なし"],
  },
];

const ADVANTAGES = [
  {
    title: "治療院で栄養分析ができる唯一のツール",
    desc: "あすけん等の栄養管理アプリは個人向け。治療院の現場で使える5軸栄養分析×施術提案の組み合わせはこのアプリだけです。",
  },
  {
    title: "栄養士不要でAIが提案",
    desc: "栄養士がいなくてもAIが分析結果に基づいて食事改善メニューを自動提案。専門知識がなくても栄養指導が可能に。",
  },
  {
    title: "施術+栄養指導の複合メニューで単価UP",
    desc: "施術だけでなく栄養指導をセットにすることで、メニュー単価アップとリピート率向上を同時に実現できます。",
  },
];

const STEPS = [
  { num: "01", title: "アカウント作成", desc: "メールアドレスで簡単登録。3分で完了。" },
  { num: "02", title: "患者情報入力", desc: "氏名・年齢・主訴を入力して検査開始。" },
  { num: "03", title: "30問の質問に回答", desc: "患者がタブレットで回答。5〜10分で完了。" },
  { num: "04", title: "AIが5軸分析", desc: "回答結果をAIが即座にスコアリング・分析。" },
  { num: "05", title: "PDFレポート出力", desc: "分析結果・食事改善提案・セルフケアをまとめたレポート完成。" },
];

export default function NutritionDetailPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* ヘッダー */}
      <header className="bg-primary text-white sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="text-sm opacity-80 hover:opacity-100">
            ← ClinicApps トップ
          </Link>
          <a
            href="https://nutrition-check-app.vercel.app?demo=true"
            className="px-4 py-1.5 bg-cta text-white rounded-lg text-sm font-bold hover:bg-cta-600 transition-colors"
          >
            デモを体験
          </a>
        </div>
      </header>

      {/* ヒーロー */}
      <section className="bg-gradient-to-br from-primary via-primary-700 to-primary-800 text-white py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="inline-block px-4 py-1 bg-white/10 rounded-full text-sm mb-6">
            治療院専用 栄養分析システム
          </div>
          <h1 className="text-3xl md:text-5xl font-black leading-tight mb-6">
            栄養バランスチェック
          </h1>
          <p className="text-lg md:text-xl text-white/80 mb-4 leading-relaxed">
            5軸×30問で栄養バランスを徹底分析し、AI食事改善提案まで一貫。
          </p>
          <p className="text-lg md:text-xl text-white/80 mb-8 leading-relaxed">
            分析から食事改善プランまで<span className="text-cta-300 font-bold">全自動</span>で完結。
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://nutrition-check-app.vercel.app?demo=true"
              className="px-8 py-4 bg-cta text-white rounded-xl text-lg font-bold hover:bg-cta-600 transition-colors shadow-lg"
            >
              無料でデモを体験する
            </a>
            <a
              href="#pricing"
              className="px-8 py-4 bg-white/10 text-white rounded-xl text-lg font-bold hover:bg-white/20 transition-colors border border-white/20"
            >
              料金を見る
            </a>
          </div>
        </div>
      </section>

      {/* 画面イメージ */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-black text-center text-primary mb-4">
            実際の画面イメージ
          </h2>
          <p className="text-center text-gray-500 mb-10">
            栄養バランスをレーダーチャートで可視化、食事プランもAIが自動作成
          </p>
          <div className="grid md:grid-cols-2 gap-8">
            {/* 栄養バランスレーダー */}
            <div className="rounded-2xl border border-gray-200 shadow-lg overflow-hidden">
              <div className="bg-gray-800 px-4 py-2 flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-400"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                  <div className="w-3 h-3 rounded-full bg-green-400"></div>
                </div>
                <span className="text-xs text-gray-400 ml-2">栄養バランス5軸分析</span>
              </div>
              <div className="bg-gray-50 p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-sm font-bold text-primary">佐藤 花子 様</div>
                  <div className="text-xs text-gray-400">2026/03/28</div>
                </div>
                <div className="text-xs text-gray-500 mb-3 font-bold">栄養スコア分析</div>
                {/* レーダーチャート風モックアップ */}
                <div className="relative w-48 h-48 mx-auto mb-4">
                  <svg viewBox="0 0 200 200" className="w-full h-full">
                    <polygon points="100,20 180,75 155,160 45,160 20,75" fill="none" stroke="#e5e7eb" strokeWidth="1" />
                    <polygon points="100,44 156,81 139,144 61,144 44,81" fill="none" stroke="#e5e7eb" strokeWidth="1" />
                    <polygon points="100,68 132,87 123,128 77,128 68,87" fill="none" stroke="#e5e7eb" strokeWidth="1" />
                    <polygon points="100,38 170,80 135,155 50,145 28,72" fill="rgba(34,197,94,0.15)" stroke="#22c55e" strokeWidth="2" />
                    <text x="100" y="12" textAnchor="middle" className="text-[9px] fill-gray-600">三大栄養素</text>
                    <text x="190" y="78" textAnchor="start" className="text-[9px] fill-gray-600">ビタミン</text>
                    <text x="162" y="172" textAnchor="middle" className="text-[9px] fill-gray-600">水分</text>
                    <text x="38" y="172" textAnchor="middle" className="text-[9px] fill-gray-600">食事リズム</text>
                    <text x="4" y="78" textAnchor="start" className="text-[9px] fill-gray-600">消化吸収</text>
                  </svg>
                </div>
                <div className="space-y-1">
                  {[
                    { axis: "三大栄養素", score: 78, color: "bg-green-500" },
                    { axis: "ビタミン/ミネラル", score: 82, color: "bg-green-500" },
                    { axis: "水分", score: 45, color: "bg-red-400" },
                    { axis: "食事リズム", score: 60, color: "bg-yellow-500" },
                    { axis: "消化吸収", score: 55, color: "bg-yellow-500" },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs">
                      <span className="w-24 text-gray-600">{item.axis}</span>
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div className={`${item.color} h-2 rounded-full`} style={{ width: `${item.score}%` }}></div>
                      </div>
                      <span className="font-bold text-gray-700 w-8 text-right">{item.score}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {/* 1週間食事改善プラン */}
            <div className="rounded-2xl border border-gray-200 shadow-lg overflow-hidden">
              <div className="bg-gray-800 px-4 py-2 flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-400"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                  <div className="w-3 h-3 rounded-full bg-green-400"></div>
                </div>
                <span className="text-xs text-gray-400 ml-2">AI食事改善プラン</span>
              </div>
              <div className="bg-gray-50 p-6">
                <div className="text-sm font-bold text-primary mb-3">1週間食事改善プラン</div>
                <div className="bg-orange-50 rounded-lg px-3 py-2 border border-orange-200 mb-3">
                  <span className="text-xs text-orange-700 font-bold">重点改善: 水分摂取・消化吸収</span>
                </div>
                <div className="space-y-2">
                  {[
                    { day: "月", morning: "白湯+味噌汁", lunch: "玄米+焼き魚", dinner: "温野菜スープ" },
                    { day: "火", morning: "スムージー", lunch: "納豆定食", dinner: "鶏むね蒸し" },
                    { day: "水", morning: "ヨーグルト+果物", lunch: "サバ缶サラダ", dinner: "豆腐チゲ" },
                    { day: "木", morning: "白湯+卵料理", lunch: "ひじき煮定食", dinner: "鮭のホイル焼き" },
                  ].map((item, i) => (
                    <div key={i} className="bg-white rounded-lg p-2 border border-gray-100">
                      <div className="flex items-center gap-2 text-xs">
                        <span className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center text-green-700 font-bold shrink-0">{item.day}</span>
                        <div className="flex-1 grid grid-cols-3 gap-1">
                          <span className="text-gray-600">{item.morning}</span>
                          <span className="text-gray-600">{item.lunch}</span>
                          <span className="text-gray-600">{item.dinner}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-3 bg-blue-50 rounded-lg px-3 py-2 border border-blue-200">
                  <span className="text-xs text-blue-700 font-bold">AI提案: 1日2L以上の水分摂取を推奨</span>
                </div>
              </div>
            </div>
          </div>
          <p className="text-center text-xs text-gray-400 mt-6">
            ※画面はイメージです。実際のデモで全機能をお試しいただけます。
          </p>
        </div>
      </section>

      {/* こんな悩みありませんか？ */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-black text-center text-primary mb-10">
            こんな悩みはありませんか？
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              "患者の食事を感覚でしか聞けていない",
              "栄養指導がワンパターンになる",
              "改善度を数値で示せない",
              "栄養士がいないので指導に自信がない",
              "食事指導を売りにしたいが差別化できない",
              "根本改善の説得力が弱い",
            ].map((pain, i) => (
              <div key={i} className="flex items-start gap-3 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                <span className="text-red-500 text-lg mt-0.5">&#10007;</span>
                <span className="text-sm text-gray-700">{pain}</span>
              </div>
            ))}
          </div>
          <p className="text-center mt-8 text-primary font-bold text-lg">
            全て、栄養バランスチェックで解決できます。
          </p>
        </div>
      </section>

      {/* 機能紹介 */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-black text-center text-primary mb-4">
            主な機能
          </h2>
          <p className="text-center text-gray-500 mb-12">
            栄養分析・食事改善提案に必要な機能を全て搭載
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map((f, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-accent-50 rounded-xl flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-accent" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d={f.icon} />
                  </svg>
                </div>
                <h3 className="font-bold text-primary mb-2">{f.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 他社との違い */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-black text-center text-primary mb-4">
            他社ツールとの徹底比較
          </h2>
          <p className="text-center text-gray-500 mb-10">
            治療院の栄養指導に必要な機能を全て備えているのは、このアプリだけ
          </p>
          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden text-sm">
              <thead>
                <tr className="bg-primary text-white">
                  <th className="px-4 py-3 text-left font-bold min-w-[180px]">比較項目</th>
                  {COMPETITORS.map((c, i) => (
                    <th key={i} className={`px-3 py-3 text-center font-bold min-w-[120px] whitespace-pre-line ${c.highlight ? "bg-cta" : ""}`}>
                      {c.highlight && <span className="block text-[10px] text-cta-200 mb-0.5">当サービス</span>}
                      {c.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {COMPARISON_ROWS.map((row, ri) => (
                  <tr key={ri} className="border-t border-gray-100">
                    <td className="px-4 py-3 font-medium text-gray-800">{row.label}</td>
                    {COMPETITORS.map((c, ci) => {
                      const val = c.values[ri];
                      const isHighlight = c.highlight;
                      if (val === "○") return <td key={ci} className={`px-3 py-3 text-center ${isHighlight ? "bg-cta-50" : ""}`}><span className="text-green-600 font-bold text-lg">&#9679;</span></td>;
                      if (val === "×") return <td key={ci} className={`px-3 py-3 text-center ${isHighlight ? "bg-cta-50" : ""}`}><span className="text-gray-300">-</span></td>;
                      if (val === "△") return <td key={ci} className={`px-3 py-3 text-center ${isHighlight ? "bg-cta-50" : ""}`}><span className="text-yellow-500 font-bold">&#9650;</span></td>;
                      return <td key={ci} className={`px-3 py-3 text-center ${isHighlight ? "font-bold text-cta bg-cta-50" : "text-gray-700"}`}>{val}</td>;
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* 治療院特化の強み解説 */}
          <div className="mt-12">
            <h3 className="text-xl font-black text-primary mb-6 text-center">
              治療院特化だから、ここが違う
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              {ADVANTAGES.map((a, i) => (
                <div key={i} className="bg-white rounded-2xl p-6 border-2 border-accent/20 shadow-sm">
                  <div className="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center mb-3">
                    <span className="text-accent font-black text-sm">{String(i + 1).padStart(2, "0")}</span>
                  </div>
                  <h4 className="font-bold text-primary mb-2 text-sm">{a.title}</h4>
                  <p className="text-xs text-gray-600 leading-relaxed">{a.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 導入の流れ */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-black text-center text-primary mb-12">
            導入の流れ
          </h2>
          <div className="space-y-6">
            {STEPS.map((s, i) => (
              <div key={i} className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center text-white font-black text-sm shrink-0">
                  {s.num}
                </div>
                <div>
                  <h3 className="font-bold text-primary">{s.title}</h3>
                  <p className="text-sm text-gray-600 mt-1">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 料金 */}
      <section id="pricing" className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-black text-center text-primary mb-10">
            料金プラン
          </h2>
          <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            <div className="bg-white rounded-2xl p-6 shadow-sm border-2 border-accent">
              <div className="text-accent text-sm font-bold mb-2">月額プラン</div>
              <div className="text-3xl font-black text-primary mb-1">
                4,980<span className="text-lg">円/月</span>
              </div>
              <div className="text-xs text-gray-500 mb-4">初期費用 0円</div>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-center gap-2"><span className="text-green-500">&#10003;</span>全機能利用可能</li>
                <li className="flex items-center gap-2"><span className="text-green-500">&#10003;</span>AI提案回数無制限</li>
                <li className="flex items-center gap-2"><span className="text-green-500">&#10003;</span>PDF出力無制限</li>
                <li className="flex items-center gap-2"><span className="text-green-500">&#10003;</span>サポート付き</li>
              </ul>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
              <div className="text-gray-500 text-sm font-bold mb-2">買い切りプラン</div>
              <div className="text-3xl font-black text-primary mb-1">
                49,800<span className="text-lg">円</span>
              </div>
              <div className="text-xs text-gray-500 mb-4">月額費用なし・永続利用</div>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-center gap-2"><span className="text-green-500">&#10003;</span>全機能利用可能</li>
                <li className="flex items-center gap-2"><span className="text-green-500">&#10003;</span>追加費用なし</li>
                <li className="flex items-center gap-2"><span className="text-green-500">&#10003;</span>アップデート無料</li>
                <li className="flex items-center gap-2"><span className="text-green-500">&#10003;</span>サポート付き</li>
              </ul>
            </div>
          </div>
          <p className="text-center text-sm text-gray-500 mt-6">
            まずは無料デモで全機能をお試しいただけます
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary text-white">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-black mb-4">
            まずは無料でお試しください
          </h2>
          <p className="text-white/70 mb-8">
            デモアカウントで全機能を体験できます。クレジットカード不要。
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://nutrition-check-app.vercel.app?demo=true"
              className="px-8 py-4 bg-cta text-white rounded-xl text-lg font-bold hover:bg-cta-600 transition-colors shadow-lg"
            >
              無料デモを体験する
            </a>
            <Link
              href="/#contact"
              className="px-8 py-4 bg-white/10 text-white rounded-xl text-lg font-bold hover:bg-white/20 transition-colors border border-white/20"
            >
              お問い合わせ
            </Link>
          </div>
        </div>
      </section>

      {/* フッター */}
      <footer className="bg-gray-900 text-gray-400 py-8">
        <div className="max-w-4xl mx-auto px-4 text-center text-sm">
          <Link href="/" className="text-white hover:text-accent transition-colors">
            ClinicApps
          </Link>
          <span className="mx-2">|</span>
          <Link href="/legal/privacy" className="hover:text-white transition-colors">プライバシーポリシー</Link>
          <span className="mx-2">|</span>
          <Link href="/legal/terms" className="hover:text-white transition-colors">利用規約</Link>
          <span className="mx-2">|</span>
          <Link href="/legal/tokushoho" className="hover:text-white transition-colors">特定商取引法</Link>
        </div>
      </footer>
    </div>
  );
}
