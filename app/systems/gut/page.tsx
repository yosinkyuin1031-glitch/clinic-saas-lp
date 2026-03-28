import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "腸内環境チェック - 治療院専用 腸内環境分析システム | ClinicApps",
  description:
    "治療院専用の腸内環境チェックアプリ。5軸×30問の腸内環境分析・レーダーチャート・AI腸活提案・1週間腸活プラン・ビフォーアフター比較・PDF出力。月額4,980円。",
};

const FEATURES = [
  {
    icon: "M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z",
    title: "5軸×30問の腸内環境分析",
    desc: "便通・腸活習慣・ストレス・食物繊維・発酵食品の5軸で総合分析。",
  },
  {
    icon: "M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z",
    title: "レーダーチャートで可視化",
    desc: "5軸の結果をレーダーチャートで一目で把握。患者への腸活指導がわかりやすい。",
  },
  {
    icon: "M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z",
    title: "AIセルフケア（腸活提案）",
    desc: "分析結果に基づきAIが腸活メニュー・食事提案・ツボ情報を自動生成。",
  },
  {
    icon: "M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5",
    title: "1週間腸活プラン",
    desc: "患者ごとにカスタマイズされた1週間の腸活プランをAIが自動作成。",
  },
  {
    icon: "M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 00-3.7-3.7 48.678 48.678 0 00-7.324 0 4.006 4.006 0 00-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3l-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 003.7 3.7 48.656 48.656 0 007.324 0 4.006 4.006 0 003.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3l-3 3",
    title: "ビフォーアフター比較",
    desc: "初回と再検査の結果を重ねて表示。腸内環境の改善度が数字とグラフでわかる。",
  },
  {
    icon: "M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z",
    title: "PDFレポート出力",
    desc: "腸内環境分析結果・腸活提案・セルフケアをまとめたPDFを患者に渡せる。",
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
    name: "腸内環境\nチェック",
    highlight: true,
    values: ["4,980円", "0円", "○", "○", "○", "○", "○", "○", "○", "○", "○", "○", "Zoom個別", "なし"],
  },
  {
    name: "紙の問診票",
    highlight: false,
    values: ["0円", "0円", "△", "×", "×", "×", "×", "×", "×", "×", "×", "△", "なし", "-"],
  },
  {
    name: "腸内フローラ\n検査キット",
    highlight: false,
    values: ["15,000円〜", "0円", "×", "×", "×", "×", "×", "×", "○", "×", "×", "×", "なし", "なし"],
  },
  {
    name: "汎用アンケート\nツール",
    highlight: false,
    values: ["3,000円〜", "0円", "×", "×", "×", "×", "×", "×", "△", "×", "×", "×", "メール", "なし"],
  },
];

const ADVANTAGES = [
  {
    title: "その場で結果が出る（検査キットは2週間）",
    desc: "腸内フローラ検査キットは採取から結果まで2週間。当アプリは30問の回答後すぐに結果が出て、施術提案まで完了します。",
  },
  {
    title: "治療院での腸活指導を自動化",
    desc: "分析結果に基づいてAIが腸活メニューを自動提案。専門知識がなくても、患者一人ひとりに合った腸活指導が可能に。",
  },
  {
    title: "自律神経×腸の切り口で新規集客",
    desc: "腸と自律神経の関係は注目度が高い。「腸内環境チェックができる院」として、他院にない切り口で集客できます。",
  },
];

const STEPS = [
  { num: "01", title: "アカウント作成", desc: "メールアドレスで簡単登録。3分で完了。" },
  { num: "02", title: "患者情報入力", desc: "氏名・年齢・主訴を入力して検査開始。" },
  { num: "03", title: "30問の質問に回答", desc: "患者がタブレットで回答。5〜10分で完了。" },
  { num: "04", title: "AIが5軸分析", desc: "回答結果をAIが即座にスコアリング・分析。" },
  { num: "05", title: "PDFレポート出力", desc: "分析結果・腸活提案・セルフケアをまとめたレポート完成。" },
];

export default function GutDetailPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* ヘッダー */}
      <header className="bg-primary text-white sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="text-sm opacity-80 hover:opacity-100">
            ← ClinicApps トップ
          </Link>
          <a
            href="https://gut-health-check.vercel.app?demo=true"
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
            治療院専用 腸内環境分析システム
          </div>
          <h1 className="text-3xl md:text-5xl font-black leading-tight mb-6">
            腸内環境チェック
          </h1>
          <p className="text-lg md:text-xl text-white/80 mb-4 leading-relaxed">
            5軸×30問で腸内環境を徹底分析し、AI腸活提案まで一貫。
          </p>
          <p className="text-lg md:text-xl text-white/80 mb-8 leading-relaxed">
            分析から腸活プランまで<span className="text-cta-300 font-bold">全自動</span>で完結。
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://gut-health-check.vercel.app?demo=true"
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
            腸内環境をレーダーチャートで可視化、腸活プランもAIが自動作成
          </p>
          <div className="grid md:grid-cols-2 gap-8">
            {/* 腸内環境レーダー */}
            <div className="rounded-2xl border border-gray-200 shadow-lg overflow-hidden">
              <div className="bg-gray-800 px-4 py-2 flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-400"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                  <div className="w-3 h-3 rounded-full bg-green-400"></div>
                </div>
                <span className="text-xs text-gray-400 ml-2">腸内環境5軸分析</span>
              </div>
              <div className="bg-gray-50 p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-sm font-bold text-primary">田中 美咲 様</div>
                  <div className="text-xs text-gray-400">2026/03/28</div>
                </div>
                <div className="text-xs text-gray-500 mb-3 font-bold">腸内環境スコア分析</div>
                {/* レーダーチャート風モックアップ */}
                <div className="relative w-48 h-48 mx-auto mb-4">
                  <svg viewBox="0 0 200 200" className="w-full h-full">
                    <polygon points="100,20 180,75 155,160 45,160 20,75" fill="none" stroke="#e5e7eb" strokeWidth="1" />
                    <polygon points="100,44 156,81 139,144 61,144 44,81" fill="none" stroke="#e5e7eb" strokeWidth="1" />
                    <polygon points="100,68 132,87 123,128 77,128 68,87" fill="none" stroke="#e5e7eb" strokeWidth="1" />
                    <polygon points="100,35 160,82 148,150 52,155 30,70" fill="rgba(168,85,247,0.15)" stroke="#a855f7" strokeWidth="2" />
                    <text x="100" y="12" textAnchor="middle" className="text-[9px] fill-gray-600">便通</text>
                    <text x="190" y="78" textAnchor="start" className="text-[9px] fill-gray-600">腸活習慣</text>
                    <text x="162" y="172" textAnchor="middle" className="text-[9px] fill-gray-600">ストレス</text>
                    <text x="38" y="172" textAnchor="middle" className="text-[9px] fill-gray-600">食物繊維</text>
                    <text x="4" y="78" textAnchor="start" className="text-[9px] fill-gray-600">発酵食品</text>
                  </svg>
                </div>
                <div className="space-y-1">
                  {[
                    { axis: "便通", score: 40, color: "bg-red-400" },
                    { axis: "腸活習慣", score: 72, color: "bg-purple-500" },
                    { axis: "ストレス", score: 55, color: "bg-yellow-500" },
                    { axis: "食物繊維", score: 62, color: "bg-purple-400" },
                    { axis: "発酵食品", score: 50, color: "bg-yellow-500" },
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
            {/* 1週間腸活プラン */}
            <div className="rounded-2xl border border-gray-200 shadow-lg overflow-hidden">
              <div className="bg-gray-800 px-4 py-2 flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-400"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                  <div className="w-3 h-3 rounded-full bg-green-400"></div>
                </div>
                <span className="text-xs text-gray-400 ml-2">AI腸活プラン</span>
              </div>
              <div className="bg-gray-50 p-6">
                <div className="text-sm font-bold text-primary mb-3">1週間腸活プラン</div>
                <div className="bg-purple-50 rounded-lg px-3 py-2 border border-purple-200 mb-3">
                  <span className="text-xs text-purple-700 font-bold">重点改善: 便通・発酵食品摂取</span>
                </div>
                <div className="space-y-2">
                  {[
                    { day: "月", task: "朝: 白湯 → 味噌汁 → 食物繊維", point: "腸を温めてから動かす" },
                    { day: "火", task: "昼: 納豆+キムチ+玄米", point: "発酵食品を複数組み合わせ" },
                    { day: "水", task: "夜: ヨーグルト+オリゴ糖", point: "善玉菌のエサを補給" },
                    { day: "木", task: "朝: 腸もみマッサージ5分", point: "物理的に腸を刺激" },
                    { day: "金", task: "昼: 海藻サラダ+甘酒", point: "水溶性食物繊維を強化" },
                  ].map((item, i) => (
                    <div key={i} className="bg-white rounded-lg p-2 border border-gray-100">
                      <div className="flex items-start gap-2 text-xs">
                        <span className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center text-purple-700 font-bold shrink-0 mt-0.5">{item.day}</span>
                        <div>
                          <div className="text-gray-700 font-medium">{item.task}</div>
                          <div className="text-gray-400 mt-0.5">{item.point}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-3 bg-green-50 rounded-lg px-3 py-2 border border-green-200">
                  <span className="text-xs text-green-700 font-bold">目標: 2週間で便通スコア +20ポイント</span>
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
              "腸の状態を客観的に評価できない",
              "腸活指導がワンパターンになる",
              "改善を数値で見せられない",
              "腸内環境に特化したツールがない",
              "便秘や自律神経の患者への説明が感覚的",
              "差別化の武器がない",
            ].map((pain, i) => (
              <div key={i} className="flex items-start gap-3 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                <span className="text-red-500 text-lg mt-0.5">&#10007;</span>
                <span className="text-sm text-gray-700">{pain}</span>
              </div>
            ))}
          </div>
          <p className="text-center mt-8 text-primary font-bold text-lg">
            全て、腸内環境チェックで解決できます。
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
            腸内環境分析・腸活提案に必要な機能を全て搭載
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
            治療院の腸活指導に必要な機能を全て備えているのは、このアプリだけ
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
              href="https://gut-health-check.vercel.app?demo=true"
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
