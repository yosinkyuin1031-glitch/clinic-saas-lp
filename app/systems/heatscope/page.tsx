import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "HeatScope ヒートマップ分析 - 治療院HP改善ツール | ClinicApps",
  description:
    "治療院HPのどこが見られ、どこがクリックされているかを可視化。スクロール深度・注目エリア・クリック位置をリアルタイム分析。月額2,980円。",
};

const FEATURES = [
  {
    icon: "M15.042 21.672L13.684 16.6m0 0l-2.51 2.225.569-9.47 5.227 7.917-3.286-.672zM12 2.25V4.5m5.834.166l-1.591 1.591M20.25 10.5H18M7.757 14.743l-1.59 1.59M6 10.5H3.75m4.007-4.243l-1.59-1.59",
    title: "クリックヒートマップ",
    desc: "訪問者がHPのどこをクリックしているかを色で可視化。よくタップされるボタン・リンクが一目でわかります。",
  },
  {
    icon: "M3 4.5h14.25M3 9h9.75M3 13.5h5.25m5.25-.75L17.25 9m0 0L21 12.75M17.25 9v12",
    title: "スクロール深度分析",
    desc: "ページのどこまで読まれているかを計測。離脱ポイントがわかるので、重要な情報の配置を最適化できます。",
  },
  {
    icon: "M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z M15 12a3 3 0 11-6 0 3 3 0 016 0z",
    title: "注目エリア分析",
    desc: "訪問者がどのセクションに長く滞在しているかを計測。興味を引いている部分と無視されている部分が明確に。",
  },
  {
    icon: "M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3",
    title: "デバイス別レポート",
    desc: "PC・スマホ・タブレットごとに分析。患者さんの7割はスマホ閲覧。デバイスごとの改善ポイントがわかります。",
  },
  {
    icon: "M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5",
    title: "実サイト上で確認",
    desc: "実際のHP画面の上にヒートマップを重ねて表示。どのボタン・画像・テキストが注目されているか直感的にわかります。",
  },
  {
    icon: "M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z",
    title: "リアルタイム計測",
    desc: "HPにスクリプトを1行追加するだけ。訪問者の行動をリアルタイムで記録。数日でデータが溜まり始めます。",
  },
];

const COMPARISON_ROWS = [
  { label: "月額料金", type: "price" as const },
  { label: "初期費用", type: "custom" as const },
  { label: "クリックヒートマップ", type: "check" as const },
  { label: "スクロール深度分析", type: "check" as const },
  { label: "注目エリア分析", type: "check" as const },
  { label: "デバイス別レポート", type: "check" as const },
  { label: "実サイトオーバーレイ表示", type: "check" as const },
  { label: "登録サイト数", type: "custom" as const },
  { label: "データ保存期間", type: "custom" as const },
  { label: "導入の簡単さ", type: "custom" as const },
  { label: "治療院向け最適化", type: "check" as const },
  { label: "最低契約期間", type: "custom" as const },
];

const COMPETITORS = [
  {
    name: "HeatScope",
    highlight: true,
    values: ["2,980円", "0円", "○", "○", "○", "○", "○", "無制限", "無制限", "1行コピペ", "○", "なし"],
  },
  {
    name: "ミエルカヒートマップ",
    highlight: false,
    values: ["9,800円〜", "0円", "○", "○", "○", "△", "○", "1サイト", "6ヶ月", "タグ設置", "×", "なし"],
  },
  {
    name: "Mouseflow",
    highlight: false,
    values: ["$31〜", "0円", "○", "○", "△", "○", "○", "1サイト", "1ヶ月", "タグ設置", "×", "なし"],
  },
  {
    name: "Clarity（Microsoft）",
    highlight: false,
    values: ["無料", "0円", "○", "○", "×", "△", "○", "無制限", "90日", "タグ設置", "×", "なし"],
  },
];

const ADVANTAGES = [
  {
    title: "治療院HPに特化した分析視点",
    desc: "予約ボタン・LINE誘導・症状ページの閲覧率など、治療院HPで重要なポイントに絞って分析。一般ツールにはない視点です。",
  },
  {
    title: "スクリプト1行で即開始",
    desc: "HTMLにスクリプトタグを1行追加するだけ。WordPressでもWixでも、どんなHPでも5分で導入完了。面倒な設定は一切不要。",
  },
  {
    title: "月額2,980円で全機能・サイト数無制限",
    desc: "他社ツールは月額1万円以上が相場。HeatScopeは複数サイトの分析も追加料金なし。分院があっても1契約でOK。",
  },
];

const STEPS = [
  { num: "01", title: "アカウント作成", desc: "メールアドレスで簡単登録。1分で完了します。" },
  { num: "02", title: "HPのURLを登録", desc: "分析したいサイトのURLを入力。複数サイトもOK。" },
  { num: "03", title: "スクリプトを設置", desc: "発行されたコードをHPに1行貼り付けるだけ。" },
  { num: "04", title: "データが蓄積開始", desc: "数日で訪問者の行動データが溜まり始めます。" },
  { num: "05", title: "ヒートマップで改善", desc: "可視化されたデータを見て、HP改善に活かす。" },
];

export default function HeatscopeDetailPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* ヘッダー */}
      <header className="bg-primary text-white sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="text-sm opacity-80 hover:opacity-100">
            &larr; ClinicApps トップ
          </Link>
          <a
            href="/#contact"
            className="px-4 py-1.5 bg-cta text-white rounded-lg text-sm font-bold hover:bg-cta-600 transition-colors"
          >
            お問い合わせ
          </a>
        </div>
      </header>

      {/* ヒーロー */}
      <section className="bg-gradient-to-br from-primary via-primary-700 to-primary-800 text-white py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="inline-block px-4 py-1 bg-white/10 rounded-full text-sm mb-6">
            治療院HP改善ツール
          </div>
          <h1 className="text-3xl md:text-5xl font-black leading-tight mb-6">
            HeatScope ヒートマップ分析
          </h1>
          <p className="text-lg md:text-xl text-white/80 mb-4 leading-relaxed">
            HPのどこが見られ、どこがクリックされているかを可視化。
          </p>
          <p className="text-lg md:text-xl text-white/80 mb-8 leading-relaxed">
            <span className="text-cta-300 font-bold">スクリプト1行</span>で今日から計測開始。
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/#contact"
              className="px-8 py-4 bg-cta text-white rounded-xl text-lg font-bold hover:bg-cta-600 transition-colors shadow-lg"
            >
              お問い合わせ・資料請求
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
            実際の画面
          </h2>
          <p className="text-center text-gray-500 mb-10">
            実サイト上にヒートマップを重ねて表示
          </p>

          {/* スクリーンショットモック */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* クリックヒートマップ */}
            <div className="rounded-2xl border border-gray-200 shadow-lg overflow-hidden">
              <div className="bg-gray-800 px-4 py-2 flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-400"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                  <div className="w-3 h-3 rounded-full bg-green-400"></div>
                </div>
                <span className="text-xs text-gray-400 ml-2">クリックヒートマップ</span>
              </div>
              <div className="bg-gray-50 p-6">
                <div className="text-sm font-bold text-primary mb-3">クリック分布</div>
                <div className="bg-white rounded-lg p-4 border border-gray-100 relative">
                  <div className="space-y-3 opacity-50">
                    <div className="h-8 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-100 rounded w-full"></div>
                    <div className="h-4 bg-gray-100 rounded w-5/6"></div>
                    <div className="h-10 bg-blue-100 rounded w-1/3"></div>
                    <div className="h-4 bg-gray-100 rounded w-full"></div>
                  </div>
                  {/* ヒートマップドット */}
                  <div className="absolute top-14 left-20 w-8 h-8 rounded-full bg-red-500/40 blur-sm"></div>
                  <div className="absolute top-14 left-24 w-6 h-6 rounded-full bg-red-600/50 blur-sm"></div>
                  <div className="absolute top-[88px] left-12 w-10 h-10 rounded-full bg-orange-500/30 blur-sm"></div>
                  <div className="absolute top-[120px] left-8 w-12 h-12 rounded-full bg-red-500/50 blur-md"></div>
                  <div className="absolute bottom-8 right-12 w-6 h-6 rounded-full bg-yellow-500/30 blur-sm"></div>
                </div>
                <div className="flex items-center justify-between mt-3 text-xs text-gray-500">
                  <span>赤 = クリック多い</span>
                  <span>青 = クリック少ない</span>
                </div>
              </div>
            </div>
            {/* スクロール深度 */}
            <div className="rounded-2xl border border-gray-200 shadow-lg overflow-hidden">
              <div className="bg-gray-800 px-4 py-2 flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-400"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                  <div className="w-3 h-3 rounded-full bg-green-400"></div>
                </div>
                <span className="text-xs text-gray-400 ml-2">スクロール深度</span>
              </div>
              <div className="bg-gray-50 p-6">
                <div className="text-sm font-bold text-primary mb-3">到達率</div>
                <div className="space-y-2">
                  {[
                    { label: "ファーストビュー", pct: 100, color: "bg-green-500" },
                    { label: "メニュー紹介", pct: 82, color: "bg-green-400" },
                    { label: "施術の流れ", pct: 65, color: "bg-yellow-400" },
                    { label: "お客様の声", pct: 48, color: "bg-orange-400" },
                    { label: "料金表", pct: 35, color: "bg-orange-500" },
                    { label: "アクセス・予約", pct: 22, color: "bg-red-500" },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <span className="text-xs text-gray-600 w-28 shrink-0">{item.label}</span>
                      <div className="flex-1 bg-gray-200 rounded-full h-5 overflow-hidden">
                        <div className={`h-full ${item.color} rounded-full flex items-center justify-end pr-2`} style={{ width: `${item.pct}%` }}>
                          <span className="text-[10px] text-white font-bold">{item.pct}%</span>
                        </div>
                      </div>
                    </div>
                  ))}
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
              "HPを作ったけど予約に繋がっているかわからない",
              "HPのどこを改善すればいいかわからない",
              "予約ボタンが押されているのか確認したい",
              "ページのどこまで読まれているか知りたい",
              "HP改善を業者に頼むと高額で手が出ない",
              "Googleアナリティクスは数字だけで直感的にわからない",
            ].map((pain, i) => (
              <div key={i} className="flex items-start gap-3 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                <span className="text-red-500 text-lg mt-0.5">&#10007;</span>
                <span className="text-sm text-gray-700">{pain}</span>
              </div>
            ))}
          </div>
          <p className="text-center mt-8 text-primary font-bold text-lg">
            全て、HeatScopeで解決できます。
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
            HPの改善に必要な分析機能を全て搭載
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
            治療院に必要な機能を低価格で
          </p>
          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden text-sm">
              <thead>
                <tr className="bg-primary text-white">
                  <th className="px-4 py-3 text-left font-bold min-w-[180px]">比較項目</th>
                  {COMPETITORS.map((c, i) => (
                    <th key={i} className={`px-3 py-3 text-center font-bold min-w-[120px] ${c.highlight ? "bg-cta" : ""}`}>
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
          <div className="max-w-md mx-auto">
            <div className="bg-white rounded-2xl p-6 shadow-sm border-2 border-accent">
              <div className="text-accent text-sm font-bold mb-2">月額プラン</div>
              <div className="text-3xl font-black text-primary mb-1">
                2,980<span className="text-lg">円/月</span>
              </div>
              <div className="text-xs text-gray-500 mb-4">初期費用 0円</div>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-center gap-2"><span className="text-green-500">&#10003;</span>全機能利用可能</li>
                <li className="flex items-center gap-2"><span className="text-green-500">&#10003;</span>登録サイト数 無制限</li>
                <li className="flex items-center gap-2"><span className="text-green-500">&#10003;</span>データ保存期間 無制限</li>
                <li className="flex items-center gap-2"><span className="text-green-500">&#10003;</span>導入サポート付き</li>
                <li className="flex items-center gap-2"><span className="text-green-500">&#10003;</span>最低契約期間なし</li>
              </ul>
            </div>
          </div>
          <p className="text-center text-sm text-gray-500 mt-6">
            <a href="https://heatscope.vercel.app/demo" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline font-bold">
              無料デモで全機能をお試しいただけます →
            </a>
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
            HPの改善ポイントが、数字ではなく「色」でわかります。
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://heatscope.vercel.app/demo"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-cta text-white rounded-xl text-lg font-bold hover:bg-cta-600 transition-colors shadow-lg"
            >
              無料デモを見る
            </a>
            <a
              href="/#contact"
              className="px-8 py-4 bg-white/10 text-white rounded-xl text-lg font-bold hover:bg-white/20 transition-colors border border-white/20"
            >
              お問い合わせ
            </a>
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
