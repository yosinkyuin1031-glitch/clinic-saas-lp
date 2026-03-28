import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "睡眠チェック分析アプリ - 治療院専用 睡眠評価システム | ClinicApps",
  description:
    "治療院専用の睡眠チェック分析アプリ。5軸×30問で睡眠の質を数値化。レーダーチャート・AIセルフケア提案・PDF出力。月額4,980円・初期費用0円。",
};

const FEATURES = [
  {
    icon: "M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z",
    title: "睡眠の質を可視化",
    desc: "患者の睡眠スコアを数値化。入眠時間・中途覚醒・起床時の状態など多角的に評価。",
  },
  {
    icon: "M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15a2.25 2.25 0 012.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25z",
    title: "チェックシートで簡単入力",
    desc: "患者がスマホでチェックを入れるだけ。専門的な知識がなくても正確に睡眠状態を把握。",
  },
  {
    icon: "M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z",
    title: "分析レポート自動生成",
    desc: "チェック結果からAIが分析レポートを自動生成。睡眠改善のアドバイスも自動提案。",
  },
  {
    icon: "M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5",
    title: "経過トラッキング",
    desc: "定期的なチェックで睡眠の改善度を追跡。来院ごとの変化をグラフで可視化。",
  },
  {
    icon: "M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z",
    title: "PDF出力",
    desc: "分析結果をPDFで出力。患者への説明資料やカルテ添付に活用。",
  },
  {
    icon: "M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18",
    title: "セルフケア提案",
    desc: "睡眠の質に応じたセルフケアメニューを自動提案。物販やサプリ提案の根拠にも。",
  },
];

const COMPARISON_ROWS = [
  { label: "月額料金", type: "price" as const },
  { label: "初期費用", type: "custom" as const },
  { label: "睡眠チェックシート", type: "check" as const },
  { label: "スコア自動算出", type: "check" as const },
  { label: "AI分析レポート", type: "check" as const },
  { label: "経過グラフ", type: "check" as const },
  { label: "PDF出力", type: "check" as const },
  { label: "セルフケア自動提案", type: "check" as const },
  { label: "治療院専用設計", type: "check" as const },
  { label: "物販・サプリ提案連携", type: "check" as const },
  { label: "導入サポート", type: "custom" as const },
  { label: "最低契約期間", type: "custom" as const },
];

const COMPETITORS = [
  {
    name: "睡眠チェック\n分析アプリ",
    highlight: true,
    values: ["2,980円", "19,800円", "○", "○", "○", "○", "○", "○", "○", "○", "Zoom個別", "なし"],
  },
  {
    name: "紙の\nチェックシート",
    highlight: false,
    values: ["0円", "0円", "△", "×", "×", "×", "×", "×", "△", "×", "なし", "-"],
  },
  {
    name: "一般的な\n睡眠アプリ",
    highlight: false,
    values: ["500円〜", "0円", "○", "○", "△", "△", "×", "×", "×", "×", "なし", "-"],
  },
];

const ADVANTAGES = [
  {
    title: "治療院の施術フローに直結",
    desc: "一般的な睡眠アプリはユーザー個人向け。当システムは治療院の施術前チェックとして使えるよう設計。患者への説明根拠として活用できます。",
  },
  {
    title: "物販提案の数値的根拠に",
    desc: "睡眠スコアが低い患者に対して、サプリ・寝具・セルフケアグッズの提案を数値で裏付け。押し売り感なく自然に物販につなげられます。",
  },
  {
    title: "検査シートとの連携で価値倍増",
    desc: "検査シート作成システムと合わせて使うことで、身体の状態+睡眠の質を総合的に評価。患者満足度と通院継続率がアップします。",
  },
];

const STEPS = [
  { num: "01", title: "アカウント作成", desc: "メールアドレスで簡単登録。3分で完了。" },
  { num: "02", title: "チェックシートを選択", desc: "テンプレートから最適なチェックシートを選択。" },
  { num: "03", title: "患者にチェックしてもらう", desc: "スマホまたはタブレットで簡単入力。" },
  { num: "04", title: "分析結果を確認", desc: "自動生成されたレポートで睡眠の質を説明。" },
  { num: "05", title: "セルフケア・物販提案", desc: "改善提案と合わせて次回予約・物販に自然につなげる。" },
];

export default function SleepDetailPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* ヘッダー */}
      <header className="bg-primary text-white sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="text-sm opacity-80 hover:opacity-100">
            ← ClinicApps トップ
          </Link>
          <a
            href="https://sleep-check-single.vercel.app?demo=true"
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
            治療院専用 睡眠チェック分析
          </div>
          <h1 className="text-3xl md:text-5xl font-black leading-tight mb-6">
            睡眠チェック分析アプリ
          </h1>
          <p className="text-lg md:text-xl text-white/80 mb-4 leading-relaxed">
            患者の睡眠の質を数値で可視化。施術の根拠に。
          </p>
          <p className="text-lg md:text-xl text-white/80 mb-8 leading-relaxed">
            治療院で使える睡眠評価ツールは<span className="text-cta-300 font-bold">業界初</span>。
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://sleep-check-single.vercel.app?demo=true"
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
            患者のチェック画面と、スタッフの分析画面
          </p>
          <div className="grid md:grid-cols-2 gap-8">
            {/* 患者側チェック画面 */}
            <div className="flex justify-center">
              <div className="w-72 rounded-[2rem] border-4 border-gray-800 shadow-xl overflow-hidden bg-white">
                <div className="bg-gray-800 px-6 py-2 flex justify-center">
                  <div className="w-20 h-5 bg-gray-700 rounded-full"></div>
                </div>
                <div className="p-5">
                  <div className="text-center mb-4">
                    <div className="text-sm font-bold text-primary mb-1">睡眠チェックシート</div>
                    <div className="text-[10px] text-gray-400">最近1週間の睡眠について</div>
                  </div>
                  <div className="space-y-3">
                    {[
                      { q: "寝つきは良いですか？", a: "やや悪い" },
                      { q: "夜中に目が覚めますか？", a: "週2-3回" },
                      { q: "朝の目覚めは？", a: "すっきりしない" },
                      { q: "日中の眠気は？", a: "時々感じる" },
                    ].map((item, i) => (
                      <div key={i}>
                        <div className="text-[10px] text-gray-500 mb-1">{item.q}</div>
                        <div className="bg-accent/5 rounded-lg px-3 py-2 border border-accent/20 text-xs text-accent font-medium">{item.a}</div>
                      </div>
                    ))}
                    <div className="pt-2">
                      <div className="bg-accent text-white rounded-xl py-2.5 text-center text-xs font-bold">チェック完了</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* スタッフ分析画面 */}
            <div className="rounded-2xl border border-gray-200 shadow-lg overflow-hidden">
              <div className="bg-gray-800 px-4 py-2 flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-400"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                  <div className="w-3 h-3 rounded-full bg-green-400"></div>
                </div>
                <span className="text-xs text-gray-400 ml-2">分析レポート - 睡眠スコア</span>
              </div>
              <div className="bg-gray-50 p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-sm font-bold text-primary">山田 太郎さんの睡眠分析</div>
                </div>
                <div className="bg-white rounded-xl p-4 border border-gray-100 mb-3">
                  <div className="text-center mb-3">
                    <div className="text-[10px] text-gray-400">総合睡眠スコア</div>
                    <div className="text-3xl font-black text-cta">58<span className="text-sm text-gray-400">/100</span></div>
                    <div className="text-[10px] text-cta font-bold">要改善</div>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { label: "入眠", score: "45", color: "text-red-500" },
                      { label: "中途覚醒", score: "60", color: "text-yellow-500" },
                      { label: "起床時", score: "70", color: "text-green-500" },
                    ].map((s, i) => (
                      <div key={i} className="text-center">
                        <div className="text-[9px] text-gray-400">{s.label}</div>
                        <div className={`text-sm font-bold ${s.color}`}>{s.score}</div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-white rounded-xl p-3 border border-gray-100">
                  <div className="text-[10px] font-bold text-primary mb-2">改善提案</div>
                  <div className="space-y-1.5">
                    {["就寝前のスマホ使用を控える", "入浴時間を就寝1時間前に", "マグネシウムサプリの摂取"].map((tip, i) => (
                      <div key={i} className="flex items-center gap-2 text-[10px] text-gray-600">
                        <span className="text-accent">&#10003;</span>
                        {tip}
                      </div>
                    ))}
                  </div>
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
              "患者の睡眠状態を客観的に評価できない",
              "睡眠の改善を数値で示せない",
              "物販やサプリを提案する根拠がない",
              "施術だけでなく生活習慣改善もサポートしたい",
              "患者の通院継続率を上げたい",
              "他院との差別化ポイントが欲しい",
            ].map((pain, i) => (
              <div key={i} className="flex items-start gap-3 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                <span className="text-red-500 text-lg mt-0.5">&#10007;</span>
                <span className="text-sm text-gray-700">{pain}</span>
              </div>
            ))}
          </div>
          <p className="text-center mt-8 text-primary font-bold text-lg">
            全て、睡眠チェック分析アプリで解決できます。
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
            治療院の睡眠評価に必要な機能を全て搭載
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
            治療院で使える睡眠評価ツールはこれだけ
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
                <li className="flex items-center gap-2"><span className="text-green-500">&#10003;</span>チェック回数無制限</li>
                <li className="flex items-center gap-2"><span className="text-green-500">&#10003;</span>レポート出力無制限</li>
                <li className="flex items-center gap-2"><span className="text-green-500">&#10003;</span>サポート付き</li>
              </ul>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
              <div className="text-gray-500 text-sm font-bold mb-2">買い切りプラン</div>
              <div className="text-3xl font-black text-primary mb-1">
                39,800<span className="text-lg">円</span>
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
              href="https://sleep-check-single.vercel.app?demo=true"
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
