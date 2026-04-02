import type { Metadata } from "next";
import Link from "next/link";
import DemoSlideshow from "@/app/components/DemoSlideshow";

export const metadata: Metadata = {
  title: "カラダマップ - 段階的原因特定 | ClinicApps",
  description:
    "治療院専用のカラダマップ。5段階検査ウィザードで原因部位を自動特定。PDF出力・経過記録・セルフケアAI・施術提案書。月額3,980円から。",
};

const FEATURES = [
  {
    icon: "M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15a2.25 2.25 0 012.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25z",
    title: "5段階検査ウィザード",
    desc: "患者情報 → 立位検査 → 座位検査 → 上半身検査 → 自動診断。タップ操作だけで検査が完結。",
  },
  {
    icon: "M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z",
    title: "段階的原因特定ロジック",
    desc: "立位→座位で足の影響を判定、座位→上半身で上半身の影響を判定。原因部位を自動で絞り込み。",
  },
  {
    icon: "M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z",
    title: "PDF出力（患者用・施術者用）",
    desc: "患者に渡すレポートと施術者向けカルテの2種類を自動生成。院のロゴ・テーマカラーも反映。",
  },
  {
    icon: "M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z",
    title: "AIセルフケア自動提案",
    desc: "診断結果に基づき、縮こまり・引っ張りの部位ごとに最適なセルフケアメニューを自動提案。",
  },
  {
    icon: "M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z",
    title: "患者管理・カルテ機能",
    desc: "患者一覧・検索・検査履歴・前回比較。既存患者はワンタップで検査開始。",
  },
  {
    icon: "M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z",
    title: "ダッシュボード・統計分析",
    desc: "月別検査数推移・患者数・TOP3診断をグラフ表示。院全体の傾向が一目でわかる。",
  },
  {
    icon: "M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z",
    title: "スタッフ管理・権限設定",
    desc: "オーナー・管理者・スタッフの3段階権限。複数スタッフで共有利用可能。",
  },
  {
    icon: "M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z",
    title: "経過比較・改善度トラッキング",
    desc: "過去の検査と並べて比較。患者の改善経過を数値と視覚で伝えられる。",
  },
  {
    icon: "M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418",
    title: "オフライン対応・PWA",
    desc: "ネットが不安定な施術中も安心。オフラインで検査→復帰時に自動同期。",
  },
];

const COMPARISON_ROWS = [
  { label: "月額料金", type: "price" as const },
  { label: "初期費用", type: "custom" as const },
  { label: "段階的原因特定ロジック", type: "check" as const },
  { label: "神経学的検査テンプレート", type: "check" as const },
  { label: "PDF出力（患者用＋施術者用）", type: "check" as const },
  { label: "経過比較・前回データ並列", type: "check" as const },
  { label: "AIセルフケア自動提案", type: "check" as const },
  { label: "施術提案書の自動生成", type: "check" as const },
  { label: "ダッシュボード統計分析", type: "check" as const },
  { label: "スタッフ管理・権限設定", type: "check" as const },
  { label: "オフライン対応（PWA）", type: "check" as const },
  { label: "治療院専用設計", type: "check" as const },
  { label: "最低契約期間", type: "custom" as const },
];

const COMPETITORS = [
  {
    name: "カラダマップ",
    highlight: true,
    values: ["3,980円〜", "11,000円", "○", "○", "○", "○", "○", "○", "○", "○", "○", "○", "6ヶ月"],

  },
  {
    name: "紙の検査用紙",
    highlight: false,
    values: ["0円", "0円", "×", "△", "×", "×", "×", "×", "×", "×", "×", "△", "-"],
  },
  {
    name: "汎用電子カルテ",
    highlight: false,
    values: ["10,000円〜", "50,000円〜", "×", "×", "○", "△", "×", "×", "△", "○", "×", "×", "12ヶ月"],
  },
  {
    name: "大手レセコン",
    highlight: false,
    values: ["20,000円〜", "100,000円〜", "×", "×", "○", "○", "×", "×", "△", "○", "×", "△", "12ヶ月"],
  },
];

const ADVANTAGES = [
  {
    title: "段階的原因特定は業界唯一",
    desc: "立位→座位→上半身の3段階比較で、足・上半身・頭蓋骨盤のどこに原因があるかを自動判定。この検査ロジックをデジタル化したシステムは他にありません。",
  },
  {
    title: "セルフケアAIでリピート率が上がる",
    desc: "検査結果に基づいてAIが「縮こまり」「引っ張り」の部位別にセルフケアを自動提案。患者が「自分専用のケア」をもらえるため、信頼感とリピート率が同時に上がります。",
  },
  {
    title: "2種類のPDFで「なぜ通うべきか」が伝わる",
    desc: "患者向けレポートで改善度を可視化、施術者向けカルテで記録を蓄積。検査データから治療方針を説明できるので、回数券やプランの成約率が大幅に改善します。",
  },
];

const STEPS = [
  { num: "01", title: "アカウント登録", desc: "メールアドレスで登録するだけ。3分で完了。" },
  { num: "02", title: "院の情報を設定", desc: "院名・代表者名を入力。ロゴやテーマカラーのカスタマイズも可能。" },
  { num: "03", title: "患者を登録して検査開始", desc: "患者情報を入力 → 5段階の検査ステップをタップ操作で進めるだけ。" },
  { num: "04", title: "診断結果を自動取得", desc: "原因部位の特定・セルフケア提案・施術プロトコルが全て自動で出力。" },
  { num: "05", title: "PDFレポートを患者に共有", desc: "患者用・施術者用の2種類をワンクリック出力。印刷してそのまま渡せる。" },
];

const EXAM_FLOW = [
  {
    step: "Step 1",
    title: "患者情報",
    emoji: "📋",
    items: ["氏名・年齢・性別・職業", "来院区分（初診/再診/経過観察）", "主訴・痛みレベル（NRS 0-10）", "重心バランス（左/均等/右）"],
  },
  {
    step: "Step 2",
    title: "立位検査",
    emoji: "🧍",
    items: ["乳様突起（耳の後ろ）の左右差", "肩甲下角（肩甲骨の下端）の左右差", "腸骨稜（骨盤の上端）の左右差"],
  },
  {
    step: "Step 3",
    title: "座位検査",
    emoji: "🪑",
    items: ["同じ3つのランドマークを座位で再評価", "立位との差異を自動判定", "足からの影響の有無を特定"],
  },
  {
    step: "Step 4",
    title: "上半身検査",
    emoji: "💪",
    items: ["肩90度外転・肘90度屈曲の姿勢で検査", "上半身からの影響を自動判定", "詳細検査：肩峰・肘頭・大転子など6部位（任意）"],
  },
  {
    step: "Step 5",
    title: "自動診断",
    emoji: "🎯",
    items: ["原因部位を自動特定（足/上半身/頭蓋骨盤/脊柱）", "縮こまり・引っ張りの分析", "セルフケア提案 + 施術プロトコル", "PDF出力（患者用 + 施術者用）"],
  },
];

export default function KensaDetailPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* ヘッダー */}
      <header className="bg-primary text-white sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="text-sm opacity-80 hover:opacity-100">
            ← ClinicApps トップ
          </Link>
          <a
            href="https://buy.stripe.com/14AfZg6ks3SU9nS0ut08g02"
            className="px-4 py-1.5 bg-cta text-white rounded-lg text-sm font-bold hover:bg-cta-600 transition-colors"
          >
            今すぐ始める
          </a>
        </div>
      </header>

      {/* ヒーロー */}
      <section className="bg-gradient-to-br from-primary via-primary-700 to-primary-800 text-white py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="inline-block px-4 py-1 bg-white/10 rounded-full text-sm mb-6">
            治療院専用 段階的原因特定システム
          </div>
          <div className="inline-block ml-2 px-3 py-1 bg-cta rounded-full text-sm font-bold mb-6">
            看板商品
          </div>
          <h1 className="text-3xl md:text-5xl font-black leading-tight mb-6">
            カラダマップ
          </h1>
          <p className="text-lg md:text-xl text-white/80 mb-4 leading-relaxed">
            5段階の検査ウィザードで原因部位を自動特定。
          </p>
          <p className="text-lg md:text-xl text-white/80 mb-8 leading-relaxed">
            検査 → 診断 → セルフケア提案 → PDF出力まで<span className="text-cta-300 font-bold">全自動</span>で完結。
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://buy.stripe.com/14AfZg6ks3SU9nS0ut08g02"
              className="px-8 py-4 bg-cta text-white rounded-xl text-lg font-bold hover:bg-cta-600 transition-colors shadow-lg"
            >
              今すぐ始める
            </a>
            <a
              href="#pricing"
              className="px-8 py-4 bg-white/10 text-white rounded-xl text-lg font-bold hover:bg-white/20 transition-colors border border-white/20"
            >
              料金を見る
            </a>
          </div>
          <p className="text-sm text-white/50 mt-4">
            初期費用11,000円・モニター中は初期費用0円・全機能利用可能
          </p>
        </div>
      </section>

      {/* 画面イメージ */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-black text-center text-primary mb-4">
            実際の画面
          </h2>
          <p className="text-center text-gray-500 mb-10">
            5段階の検査ステップをタップ操作で進めるだけ
          </p>

          {/* 操作デモ スライドショー */}
          <DemoSlideshow />
        </div>
      </section>

      {/* デモ体験セクション（独立） */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-black text-center text-primary mb-2">
            デモを体験してみる
          </h2>
          <p className="text-center text-gray-500 mb-8">
            実際の管理画面をそのまま操作できます（データはサンプルです）
          </p>
          <div className="relative rounded-2xl overflow-hidden border-2 border-primary/20 shadow-xl bg-white">
            <iframe
              src="https://kensa-demo.vercel.app"
              className="w-full"
              style={{ height: "700px" }}
              title="カラダマップ デモ"
              loading="lazy"
            />
          </div>
          <p className="text-center text-xs text-gray-400 mt-4">
            上の画面は実際のアプリと同じ操作感です。自由に触ってお試しください。
          </p>
        </div>
      </section>

      {/* 検査フロー */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-black text-center text-primary mb-4">
            検査の流れ
          </h2>
          <p className="text-center text-gray-500 mb-12">
            5つのステップで原因部位を段階的に特定
          </p>
          <div className="space-y-6">
            {EXAM_FLOW.map((step, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-start gap-4">
                  <div className="text-3xl">{step.emoji}</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="px-2 py-0.5 bg-primary text-white text-xs font-bold rounded">{step.step}</span>
                      <h3 className="font-bold text-primary text-lg">{step.title}</h3>
                    </div>
                    <ul className="grid md:grid-cols-2 gap-2">
                      {step.items.map((item, j) => (
                        <li key={j} className="flex items-center gap-2 text-sm text-gray-600">
                          <span className="text-accent text-xs">●</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                {i < EXAM_FLOW.length - 1 && (
                  <div className="flex justify-center mt-4">
                    <svg className="w-5 h-5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* こんな悩みありませんか？ */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-black text-center text-primary mb-10">
            こんな悩みはありませんか？
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              "検査結果を紙に書いて、そのまま引き出しに眠っている",
              "患者に「なぜこの施術が必要か」をうまく説明できない",
              "経過を比較したいが、過去の記録が見つからない",
              "検査に時間がかかりすぎて施術時間が減る",
              "セルフケアの提案がワンパターンになっている",
              "自費メニューの提案が「売り込み」に感じて言いづらい",
            ].map((pain, i) => (
              <div key={i} className="flex items-start gap-3 bg-gray-50 p-4 rounded-xl shadow-sm border border-gray-100">
                <span className="text-red-500 text-lg mt-0.5">&#10007;</span>
                <span className="text-sm text-gray-700">{pain}</span>
              </div>
            ))}
          </div>
          <p className="text-center mt-8 text-primary font-bold text-lg">
            検査で「根拠」を見せるだけで、全て解決します。
          </p>
        </div>
      </section>

      {/* 機能紹介 */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-black text-center text-primary mb-4">
            搭載機能
          </h2>
          <p className="text-center text-gray-500 mb-12">
            検査・診断・提案・記録・分析に必要な機能を全て搭載
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
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-black text-center text-primary mb-4">
            他社ツールとの徹底比較
          </h2>
          <p className="text-center text-gray-500 mb-10">
            段階的原因特定ロジックを搭載しているのは、このシステムだけ
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
                <div key={i} className="bg-gray-50 rounded-2xl p-6 border-2 border-accent/20 shadow-sm">
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
      <section className="py-16 bg-gray-50">
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
      <section id="pricing" className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-black text-center text-primary mb-4">
            料金プラン
          </h2>
          <p className="text-center text-gray-500 mb-10">
            シンプルな1プラン。全機能が使えます。
          </p>
          <div className="max-w-md mx-auto">
            <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-accent relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-accent text-white text-xs font-bold rounded-full">
                全機能込み
              </div>
              <div className="text-center mb-6">
                <div className="text-3xl font-black text-primary mb-1">
                  3,980<span className="text-lg font-normal text-gray-500">円/月（税込）</span>
                </div>
                <div className="text-sm text-gray-500">初期費用 11,000円（税込）</div>
                <div className="mt-2 inline-block px-4 py-1.5 bg-cta/10 border border-cta/30 rounded-full">
                  <span className="text-sm font-bold text-cta">モニター募集中：初期費用0円</span>
                </div>
              </div>
              <ul className="space-y-3 text-sm text-gray-700 mb-6">
                <li className="flex items-center gap-2"><span className="text-green-500">&#10003;</span>患者管理</li>
                <li className="flex items-center gap-2"><span className="text-green-500">&#10003;</span>検査記録（回数無制限）</li>
                <li className="flex items-center gap-2"><span className="text-green-500">&#10003;</span>レポート生成・PDF出力</li>
                <li className="flex items-center gap-2"><span className="text-green-500">&#10003;</span>AIセルフケア提案</li>
                <li className="flex items-center gap-2"><span className="text-green-500">&#10003;</span>データバックアップ</li>
                <li className="flex items-center gap-2"><span className="text-green-500">&#10003;</span>導入サポート付き</li>
              </ul>
              <a
                href="https://buy.stripe.com/14AfZg6ks3SU9nS0ut08g02"
                className="block w-full text-center py-3.5 bg-cta text-white rounded-xl font-bold hover:bg-cta-600 transition-all shadow-md"
              >
                今すぐ始める
              </a>
              <div className="mt-4 bg-accent/5 rounded-lg p-3 text-center">
                <p className="text-xs text-gray-500 mb-1">年払いなら2ヶ月分お得</p>
                <p className="text-sm font-bold text-accent">39,800円/年（月あたり約3,317円）</p>
              </div>
            </div>
          </div>
          <p className="text-center text-sm text-gray-500 mt-6">
            最低契約期間：6ヶ月
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary text-white">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-black mb-4">
            検査の質を上げて、紹介を増やしませんか
          </h2>
          <p className="text-white/70 mb-8">
            月額3,980円で全機能が使えます。初期費用11,000円。最低契約期間6ヶ月。
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://buy.stripe.com/14AfZg6ks3SU9nS0ut08g02"
              className="px-8 py-4 bg-cta text-white rounded-xl text-lg font-bold hover:bg-cta-600 transition-colors shadow-lg"
            >
              今すぐ始める
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
