import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "頭痛チェック - 治療院専用 頭痛分析システム | ClinicApps",
  description:
    "治療院専用の頭痛チェックアプリ。5軸×30問の頭痛分析・レーダーチャート・AIセルフケア提案・頭痛ノート・ビフォーアフター比較・PDF出力。月額4,980円。",
};

const FEATURES = [
  {
    icon: "M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z",
    title: "5軸×30問の頭痛分析",
    desc: "頭痛頻度・強度・トリガー・生活影響・対処法の5軸で総合分析。",
  },
  {
    icon: "M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z",
    title: "レーダーチャートで可視化",
    desc: "5軸の結果をレーダーチャートで一目で把握。頭痛のタイプと傾向が明確に。",
  },
  {
    icon: "M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z",
    title: "AIセルフケア（頭痛対策）",
    desc: "分析結果に基づきAIが頭痛対策・施術提案・ツボ情報・生活改善を自動生成。",
  },
  {
    icon: "M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10",
    title: "頭痛ノート（記録管理）",
    desc: "頭痛の発生日時・強度・トリガーを記録。パターンを可視化して根本原因を特定。",
  },
  {
    icon: "M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 00-3.7-3.7 48.678 48.678 0 00-7.324 0 4.006 4.006 0 00-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3l-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 003.7 3.7 48.656 48.656 0 007.324 0 4.006 4.006 0 003.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3l-3 3",
    title: "ビフォーアフター比較",
    desc: "初回と再検査の結果を重ねて表示。頭痛の改善度が数字とグラフでわかる。",
  },
  {
    icon: "M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z",
    title: "PDFレポート出力",
    desc: "頭痛分析結果・施術提案・セルフケアをまとめたPDFを患者に渡せる。",
  },
];

const COMPARISON_ROWS = [
  { label: "月額料金", type: "price" as const },
  { label: "初期費用", type: "custom" as const },
  { label: "5軸スコアリング分析", type: "check" as const },
  { label: "レーダーチャート", type: "check" as const },
  { label: "AIセルフケア提案", type: "check" as const },
  { label: "AI施術提案", type: "check" as const },
  { label: "頭痛ノート（記録管理）", type: "check" as const },
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
    name: "頭痛チェック",
    highlight: true,
    values: ["4,980円", "0円", "○", "○", "○", "○", "○", "○", "○", "○", "○", "○", "Zoom個別", "なし"],
  },
  {
    name: "紙の問診票",
    highlight: false,
    values: ["0円", "0円", "△", "×", "×", "×", "×", "×", "×", "×", "×", "△", "なし", "-"],
  },
  {
    name: "頭痛ダイアリー\nアプリ",
    highlight: false,
    values: ["無料", "0円", "×", "×", "×", "×", "○", "×", "×", "△", "×", "×", "なし", "なし"],
  },
  {
    name: "汎用アンケート\nツール",
    highlight: false,
    values: ["3,000円〜", "0円", "×", "×", "×", "×", "×", "×", "△", "×", "×", "×", "メール", "なし"],
  },
];

const ADVANTAGES = [
  {
    title: "頭痛を5軸で分析する唯一のプロツール",
    desc: "頭痛ダイアリーは記録するだけ。当アプリは5軸分析で頭痛のタイプ・トリガーを特定し、施術提案まで自動化します。",
  },
  {
    title: "記録だけでなく施術提案まで自動化",
    desc: "個人向けアプリは記録のみ。分析結果に基づいてAIが施術方針・セルフケア・生活改善を自動提案するのはこのアプリだけ。",
  },
  {
    title: "頭痛外来の代替として差別化",
    desc: "薬に頼りたくない患者は増加中。「頭痛の根本原因を分析できる院」として、頭痛外来の受け皿になれます。",
  },
];

const STEPS = [
  { num: "01", title: "アカウント作成", desc: "メールアドレスで簡単登録。3分で完了。" },
  { num: "02", title: "患者情報入力", desc: "氏名・年齢・主訴を入力して検査開始。" },
  { num: "03", title: "30問の質問に回答", desc: "患者がタブレットで回答。5〜10分で完了。" },
  { num: "04", title: "AIが5軸分析", desc: "回答結果をAIが即座にスコアリング・分析。" },
  { num: "05", title: "PDFレポート出力", desc: "分析結果・施術提案・セルフケアをまとめたレポート完成。" },
];

export default function HeadacheDetailPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* ヘッダー */}
      <header className="bg-primary text-white sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="text-sm opacity-80 hover:opacity-100">
            ← ClinicApps トップ
          </Link>
          <a
            href="https://headache-check.vercel.app?demo=true"
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
            治療院専用 頭痛分析システム
          </div>
          <h1 className="text-3xl md:text-5xl font-black leading-tight mb-6">
            頭痛チェック
          </h1>
          <p className="text-lg md:text-xl text-white/80 mb-4 leading-relaxed">
            5軸×30問で頭痛を徹底分析し、AI施術提案・セルフケアまで一貫。
          </p>
          <p className="text-lg md:text-xl text-white/80 mb-8 leading-relaxed">
            分析から頭痛改善プランまで<span className="text-cta-300 font-bold">全自動</span>で完結。
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://headache-check.vercel.app?demo=true"
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
            頭痛の5軸分析と頭痛ノートで根本原因を特定
          </p>
          <div className="grid md:grid-cols-2 gap-8">
            {/* 頭痛分析レーダー */}
            <div className="rounded-2xl border border-gray-200 shadow-lg overflow-hidden">
              <div className="bg-gray-800 px-4 py-2 flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-400"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                  <div className="w-3 h-3 rounded-full bg-green-400"></div>
                </div>
                <span className="text-xs text-gray-400 ml-2">頭痛5軸分析</span>
              </div>
              <div className="bg-gray-50 p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-sm font-bold text-primary">鈴木 一郎 様</div>
                  <div className="text-xs text-gray-400">2026/03/28</div>
                </div>
                <div className="text-xs text-gray-500 mb-3 font-bold">頭痛スコア分析</div>
                {/* レーダーチャート風モックアップ */}
                <div className="relative w-48 h-48 mx-auto mb-4">
                  <svg viewBox="0 0 200 200" className="w-full h-full">
                    <polygon points="100,20 180,75 155,160 45,160 20,75" fill="none" stroke="#e5e7eb" strokeWidth="1" />
                    <polygon points="100,44 156,81 139,144 61,144 44,81" fill="none" stroke="#e5e7eb" strokeWidth="1" />
                    <polygon points="100,68 132,87 123,128 77,128 68,87" fill="none" stroke="#e5e7eb" strokeWidth="1" />
                    <polygon points="100,30 172,80 150,148 48,155 25,68" fill="rgba(239,68,68,0.15)" stroke="#ef4444" strokeWidth="2" />
                    <text x="100" y="12" textAnchor="middle" className="text-[9px] fill-gray-600">頭痛頻度</text>
                    <text x="190" y="78" textAnchor="start" className="text-[9px] fill-gray-600">強度</text>
                    <text x="162" y="172" textAnchor="middle" className="text-[9px] fill-gray-600">トリガー</text>
                    <text x="38" y="172" textAnchor="middle" className="text-[9px] fill-gray-600">生活影響</text>
                    <text x="4" y="78" textAnchor="start" className="text-[9px] fill-gray-600">対処法</text>
                  </svg>
                </div>
                <div className="space-y-1">
                  {[
                    { axis: "頭痛頻度", score: 35, color: "bg-red-500" },
                    { axis: "強度", score: 80, color: "bg-red-500" },
                    { axis: "トリガー", score: 68, color: "bg-orange-400" },
                    { axis: "生活影響", score: 72, color: "bg-red-400" },
                    { axis: "対処法", score: 42, color: "bg-yellow-500" },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs">
                      <span className="w-20 text-gray-600">{item.axis}</span>
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div className={`${item.color} h-2 rounded-full`} style={{ width: `${item.score}%` }}></div>
                      </div>
                      <span className="font-bold text-gray-700 w-8 text-right">{item.score}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {/* 頭痛ノート */}
            <div className="rounded-2xl border border-gray-200 shadow-lg overflow-hidden">
              <div className="bg-gray-800 px-4 py-2 flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-400"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                  <div className="w-3 h-3 rounded-full bg-green-400"></div>
                </div>
                <span className="text-xs text-gray-400 ml-2">頭痛ノート・記録管理</span>
              </div>
              <div className="bg-gray-50 p-6">
                <div className="text-sm font-bold text-primary mb-3">頭痛ノート</div>
                <div className="bg-red-50 rounded-lg px-3 py-2 border border-red-200 mb-3">
                  <span className="text-xs text-red-700 font-bold">今月の頭痛: 8回 / 前月比 -3回</span>
                </div>
                <div className="space-y-2">
                  {[
                    { date: "3/25", time: "14:00", level: "強い", trigger: "デスクワーク6h", duration: "3時間" },
                    { date: "3/22", time: "09:30", level: "中程度", trigger: "睡眠不足", duration: "2時間" },
                    { date: "3/18", time: "16:00", level: "軽い", trigger: "天候変化", duration: "1時間" },
                    { date: "3/15", time: "11:00", level: "強い", trigger: "ストレス", duration: "4時間" },
                    { date: "3/10", time: "08:00", level: "中程度", trigger: "肩こり", duration: "2時間" },
                  ].map((item, i) => (
                    <div key={i} className="bg-white rounded-lg p-2 border border-gray-100">
                      <div className="flex items-center gap-2 text-xs">
                        <span className="text-gray-500 w-10">{item.date}</span>
                        <span className="text-gray-400 w-10">{item.time}</span>
                        <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                          item.level === "強い" ? "bg-red-100 text-red-700" :
                          item.level === "中程度" ? "bg-yellow-100 text-yellow-700" :
                          "bg-green-100 text-green-700"
                        }`}>{item.level}</span>
                        <span className="text-gray-600 flex-1">{item.trigger}</span>
                        <span className="text-gray-400">{item.duration}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-3 bg-blue-50 rounded-lg px-3 py-2 border border-blue-200">
                  <span className="text-xs text-blue-700 font-bold">AI分析: デスクワークと肩こりが主要トリガー</span>
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
              "頭痛のタイプを正確に把握できない",
              "患者の自己申告だけで判断している",
              "改善を客観的に見せられない",
              "頭痛専門の検査ツールがない",
              "薬に頼りたくない患者の受け皿になれない",
              "頭痛改善を売りにしたい",
            ].map((pain, i) => (
              <div key={i} className="flex items-start gap-3 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                <span className="text-red-500 text-lg mt-0.5">&#10007;</span>
                <span className="text-sm text-gray-700">{pain}</span>
              </div>
            ))}
          </div>
          <p className="text-center mt-8 text-primary font-bold text-lg">
            全て、頭痛チェックで解決できます。
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
            頭痛分析・改善提案に必要な機能を全て搭載
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
            治療院の頭痛対応に必要な機能を全て備えているのは、このアプリだけ
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
              href="https://headache-check.vercel.app?demo=true"
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
