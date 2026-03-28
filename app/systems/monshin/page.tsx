import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "WEB問診システム - 治療院専用WEB問診システム | ClinicApps",
  description:
    "治療院専用のWEB問診システム。スマホで来院前に問診入力、カスタム問診項目、自動集計・分析、PDF出力、QRコード対応。月額2,980円。",
};

const FEATURES = [
  {
    icon: "M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3",
    title: "スマホで来院前に問診",
    desc: "患者がスマホで事前に問診を入力。来院時の受付時間を大幅短縮。",
  },
  {
    icon: "M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10",
    title: "カスタム問診項目",
    desc: "院のスタイルに合わせて問診項目を自由に追加・編集。症状別テンプレートも用意。",
  },
  {
    icon: "M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z",
    title: "自動集計・分析",
    desc: "問診データを自動集計。よくある症状・年齢層・来院きっかけが数字でわかる。",
  },
  {
    icon: "M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z",
    title: "PDF出力",
    desc: "問診票をPDFで出力。印刷してカルテに挟むことも、デジタル保存も可能。",
  },
  {
    icon: "M3.75 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 013.75 9.375v-4.5zM3.75 14.625c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5a1.125 1.125 0 01-1.125-1.125v-4.5zM13.5 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0113.5 9.375v-4.5z",
    title: "患者用QRコード",
    desc: "院に置くQRコードを自動生成。患者がスマホで読み取るだけで問診開始。",
  },
  {
    icon: "M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582",
    title: "多言語対応",
    desc: "外国人患者にも対応。英語・中国語の問診テンプレートを用意。",
  },
];

const COMPARISON_ROWS = [
  { label: "月額料金", type: "price" as const },
  { label: "初期費用", type: "custom" as const },
  { label: "スマホで事前問診", type: "check" as const },
  { label: "問診項目カスタマイズ", type: "check" as const },
  { label: "症状別テンプレート", type: "check" as const },
  { label: "自動集計・分析", type: "check" as const },
  { label: "PDF出力", type: "check" as const },
  { label: "患者用QRコード生成", type: "check" as const },
  { label: "多言語対応（英語/中国語）", type: "check" as const },
  { label: "問診→施術の導線設計", type: "check" as const },
  { label: "来院きっかけ分析", type: "check" as const },
  { label: "治療院専用設計", type: "check" as const },
  { label: "導入サポート", type: "custom" as const },
  { label: "最低契約期間", type: "custom" as const },
];

const COMPETITORS = [
  {
    name: "WEB問診\nシステム",
    highlight: true,
    values: ["2,980円", "19,800円", "○", "○", "○", "○", "○", "○", "○", "○", "○", "○", "Zoom個別", "なし"],
  },
  {
    name: "紙の問診票",
    highlight: false,
    values: ["0円", "0円", "×", "△", "×", "×", "×", "×", "×", "×", "×", "△", "なし", "-"],
  },
  {
    name: "Symview",
    highlight: false,
    values: ["15,000円〜", "200,000円〜", "○", "△", "○", "○", "○", "○", "×", "×", "△", "×", "専任担当", "12ヶ月"],
  },
  {
    name: "メルプ",
    highlight: false,
    values: ["10,000円〜", "100,000円〜", "○", "○", "○", "○", "○", "○", "×", "×", "○", "×", "電話", "12ヶ月"],
  },
];

const ADVANTAGES = [
  {
    title: "治療院の問診に特化した設計",
    desc: "Symviewやメルプは病院・クリニック向け。整体・鍼灸の現場で聞くべき項目（主訴・既往歴・生活習慣・来院きっかけ）に特化したテンプレートを標準搭載しています。",
  },
  {
    title: "初期費用が大手の1/10以下",
    desc: "Symviewは初期20万円、メルプは初期10万円が相場。当システムは初期19,800円・月額2,980円で全機能を利用可能。個人院でも無理なく導入できます。",
  },
  {
    title: "問診→施術の導線まで設計済み",
    desc: "問診データを取るだけでなく、施術前のカウンセリングに直接活かせる構成。来院きっかけ分析で広告の費用対効果も見えるようになります。",
  },
];

const STEPS = [
  { num: "01", title: "アカウント作成", desc: "メールアドレスで簡単登録。3分で完了。" },
  { num: "02", title: "問診項目をカスタマイズ", desc: "テンプレートを選んで、必要な項目を追加・編集。" },
  { num: "03", title: "QRコードを院内に設置", desc: "自動生成されたQRを印刷して受付に置くだけ。" },
  { num: "04", title: "患者がスマホで入力", desc: "QRを読み取ってスマホで問診。来院前でもOK。" },
  { num: "05", title: "結果を確認して施術開始", desc: "管理画面で問診内容をチェック。PDFで保存も可能。" },
];

export default function MonshinDetailPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* ヘッダー */}
      <header className="bg-primary text-white sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="text-sm opacity-80 hover:opacity-100">
            ← ClinicApps トップ
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
            治療院専用 WEB問診システム
          </div>
          <h1 className="text-3xl md:text-5xl font-black leading-tight mb-6">
            WEB問診システム
          </h1>
          <p className="text-lg md:text-xl text-white/80 mb-4 leading-relaxed">
            患者がスマホで来院前に問診入力。受付の混雑を解消。
          </p>
          <p className="text-lg md:text-xl text-white/80 mb-8 leading-relaxed">
            治療院に特化した問診テンプレートは<span className="text-cta-300 font-bold">業界最安</span>。
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
            患者のスマホ画面と、スタッフの管理画面
          </p>

          {/* スクリーンショット */}
          <div className="rounded-2xl border border-gray-200 shadow-xl overflow-hidden mb-8">
            <div className="bg-gray-800 px-4 py-2.5 flex items-center gap-2">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-400"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                <div className="w-3 h-3 rounded-full bg-green-400"></div>
              </div>
              <span className="text-xs text-gray-400 ml-2">WEB問診システム - 実際の画面</span>
            </div>
            <img
              src="/images/monshin.png"
              alt="WEB問診システムの画面"
              className="w-full"
            />
          </div>

          {/* デモ準備中 */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-2 bg-gray-100 text-gray-500 px-8 py-4 rounded-xl font-bold text-base border border-gray-200">
              デモサイト準備中
            </div>
            <p className="text-xs text-gray-400 mt-2">デモのご要望は<a href="/#contact" className="text-accent underline">お問い合わせ</a>ください</p>
          </div>

          {/* 画面の特徴 */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* 患者側スマホ画面 */}
            <div className="flex justify-center">
              <div className="w-72 rounded-[2rem] border-4 border-gray-800 shadow-xl overflow-hidden bg-white">
                <div className="bg-gray-800 px-6 py-2 flex justify-center">
                  <div className="w-20 h-5 bg-gray-700 rounded-full"></div>
                </div>
                <div className="p-5">
                  <div className="text-center mb-4">
                    <div className="text-sm font-bold text-primary mb-1">WEB問診票</div>
                    <div className="text-[10px] text-gray-400">ご来院前にご記入ください</div>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <div className="text-[10px] text-gray-500 mb-1">お名前</div>
                      <div className="bg-gray-50 rounded-lg px-3 py-2 border border-gray-200 text-xs text-gray-700">山田 太郎</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-gray-500 mb-1">お悩みの症状（複数選択可）</div>
                      <div className="flex flex-wrap gap-1.5">
                        {["肩こり", "腰痛", "頭痛", "不眠", "疲労感"].map((s, i) => (
                          <span key={i} className={`text-[10px] px-2 py-1 rounded-full border ${i < 2 ? "bg-accent/10 border-accent/30 text-accent font-bold" : "bg-white border-gray-200 text-gray-400"}`}>{s}</span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <div className="text-[10px] text-gray-500 mb-1">来院のきっかけ</div>
                      <div className="bg-gray-50 rounded-lg px-3 py-2 border border-gray-200 text-xs text-gray-700">Googleマップ</div>
                    </div>
                    <div className="pt-2">
                      <div className="bg-accent text-white rounded-xl py-2.5 text-center text-xs font-bold">送信する</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* スタッフ管理画面 */}
            <div className="rounded-2xl border border-gray-200 shadow-lg overflow-hidden">
              <div className="bg-gray-800 px-4 py-2 flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-400"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                  <div className="w-3 h-3 rounded-full bg-green-400"></div>
                </div>
                <span className="text-xs text-gray-400 ml-2">スタッフ管理画面 - 問診一覧</span>
              </div>
              <div className="bg-gray-50 p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-sm font-bold text-primary">本日の問診</div>
                  <div className="text-xs text-gray-400">3件</div>
                </div>
                <div className="space-y-2">
                  {[
                    { name: "山田 太郎", time: "9:00来院", symptoms: "肩こり, 腰痛", status: "確認済", statusColor: "bg-green-50 text-green-600" },
                    { name: "佐藤 花子", time: "10:00来院", symptoms: "頭痛, 不眠", status: "未確認", statusColor: "bg-cta-50 text-cta" },
                    { name: "田中 美咲", time: "11:00来院", symptoms: "肩こり, 疲労感", status: "未確認", statusColor: "bg-cta-50 text-cta" },
                  ].map((p, i) => (
                    <div key={i} className="bg-white rounded-lg p-3 border border-gray-100">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-gray-700 font-medium">{p.name}</span>
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${p.statusColor}`}>{p.status}</span>
                      </div>
                      <div className="flex items-center gap-2 text-[10px] text-gray-400">
                        <span>{p.time}</span>
                        <span>|</span>
                        <span>{p.symptoms}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-3 grid grid-cols-3 gap-2">
                  {[
                    { label: "来院きっかけ1位", value: "Google" },
                    { label: "主訴1位", value: "肩こり" },
                    { label: "年齢層", value: "30-40代" },
                  ].map((stat, i) => (
                    <div key={i} className="bg-accent/5 rounded-lg p-2 text-center border border-accent/10">
                      <div className="text-[9px] text-gray-400">{stat.label}</div>
                      <div className="text-xs font-bold text-accent">{stat.value}</div>
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
              "紙の問診票の記入で受付が混雑する",
              "手書きが読みにくくて内容を聞き直すことがある",
              "問診データの集計・分析ができていない",
              "患者の主訴を施術前に把握しきれない",
              "問診票の保管場所に困っている",
              "初回カウンセリングに時間がかかりすぎる",
            ].map((pain, i) => (
              <div key={i} className="flex items-start gap-3 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                <span className="text-red-500 text-lg mt-0.5">&#10007;</span>
                <span className="text-sm text-gray-700">{pain}</span>
              </div>
            ))}
          </div>
          <p className="text-center mt-8 text-primary font-bold text-lg">
            全て、WEB問診システムで解決できます。
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
            治療院のWEB問診に必要な機能を全て搭載
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
            治療院に必要な問診機能を全て備えているのは、このシステムだけ
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
                2,980<span className="text-lg">円/月</span>
              </div>
              <div className="text-xs text-gray-500 mb-4">初期費用 19,800円</div>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-center gap-2"><span className="text-green-500">&#10003;</span>全機能利用可能</li>
                <li className="flex items-center gap-2"><span className="text-green-500">&#10003;</span>問診回数無制限</li>
                <li className="flex items-center gap-2"><span className="text-green-500">&#10003;</span>PDF出力無制限</li>
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
            まずはお気軽にご相談ください。個別デモのご案内も可能です。
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/#contact"
              className="px-8 py-4 bg-cta text-white rounded-xl text-lg font-bold hover:bg-cta-600 transition-colors shadow-lg"
            >
              お問い合わせ
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
