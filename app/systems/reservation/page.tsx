import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "予約管理システム - 治療院専用 予約管理システム | ClinicApps",
  description:
    "治療院専用の予約管理システム。カレンダー形式で直感操作、ダブルブッキング防止、LINE通知連携。スマホ対応で外出先からも管理可能。月額2,980円。",
};

const FEATURES = [
  {
    icon: "M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5",
    title: "カレンダー形式で直感操作",
    desc: "週表示・日表示でパッと見て空き状況がわかる。ドラッグ&ドロップで予約変更。",
  },
  {
    icon: "M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
    title: "ダブルブッキング防止",
    desc: "同じ時間枠に複数予約が入らないよう自動制御。ミスゼロに。",
  },
  {
    icon: "M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z",
    title: "LINE通知連携",
    desc: "予約確定・リマインド・変更通知をLINEで自動送信。無断キャンセル防止。",
  },
  {
    icon: "M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m5.231 13.481L15 17.25m-4.5-15H5.625c-.621 0-1.125.504-1.125 1.125v16.5c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9zm3.75 11.625a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z",
    title: "患者ごとの予約履歴",
    desc: "過去の来院パターンを把握。次回予約の提案がしやすい。",
  },
  {
    icon: "M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z",
    title: "スタッフ別スケジュール",
    desc: "複数スタッフの予約枠を一画面で管理。シフト管理も楽に。",
  },
  {
    icon: "M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3",
    title: "スマホ対応",
    desc: "スマホからも予約確認・変更OK。外出先でもスケジュール管理。",
  },
];

const COMPARISON_ROWS = [
  { label: "月額料金", type: "price" as const },
  { label: "初期費用", type: "custom" as const },
  { label: "カレンダー形式（週/日表示）", type: "check" as const },
  { label: "ダブルブッキング自動防止", type: "check" as const },
  { label: "LINE通知（確定/リマインド）", type: "check" as const },
  { label: "患者ごとの予約履歴", type: "check" as const },
  { label: "スタッフ別スケジュール", type: "check" as const },
  { label: "ドラッグ&ドロップ変更", type: "check" as const },
  { label: "キャンセル待ち管理", type: "check" as const },
  { label: "スマホ対応（外出先確認）", type: "check" as const },
  { label: "施術メニュー別の時間設定", type: "check" as const },
  { label: "治療院専用設計", type: "check" as const },
  { label: "導入サポート", type: "custom" as const },
  { label: "最低契約期間", type: "custom" as const },
];

const COMPETITORS = [
  {
    name: "予約管理\nシステム",
    highlight: true,
    values: ["2,980円", "19,800円", "○", "○", "○", "○", "○", "○", "○", "○", "○", "○", "Zoom個別", "なし"],
  },
  {
    name: "紙の予約帳",
    highlight: false,
    values: ["0円", "0円", "△", "×", "×", "×", "×", "×", "×", "×", "×", "△", "なし", "-"],
  },
  {
    name: "STORES予約",
    highlight: false,
    values: ["0円〜", "0円", "○", "○", "×", "△", "○", "×", "×", "○", "○", "×", "メール", "なし"],
  },
  {
    name: "しんきゅう予約",
    highlight: false,
    values: ["5,000円〜", "30,000円〜", "○", "○", "△", "○", "○", "×", "△", "○", "○", "○", "電話", "6ヶ月"],
  },
];

const ADVANTAGES = [
  {
    title: "LINE通知でキャンセル率が激減",
    desc: "予約確定・前日リマインドをLINEで自動送信。無断キャンセルが多い院では、リマインド導入で当日キャンセルが半減したケースも。STORES予約にはLINE連携がありません。",
  },
  {
    title: "治療院の予約パターンを理解した設計",
    desc: "施術メニューごとに所要時間が異なる治療院の予約に最適化。30分・60分・90分の施術が混在しても、カレンダー上で自動調整されます。",
  },
  {
    title: "月2,980円は業界最安クラス",
    desc: "しんきゅう予約は月5,000円＋初期3万円。STORES予約は無料だがLINE連携なし。当システムは月2,980円で全機能が使え、しかも縛り期間なしです。",
  },
];

const STEPS = [
  { num: "01", title: "アカウント作成", desc: "メールアドレスで簡単登録。3分で完了。" },
  { num: "02", title: "営業時間・枠の設定", desc: "診療時間・1枠の長さ・休診日を設定。" },
  { num: "03", title: "予約を入力", desc: "カレンダーをクリックして患者名と時間を入力するだけ。" },
  { num: "04", title: "LINE通知が自動送信", desc: "予約確定・前日リマインドが自動でLINEに届く。" },
  { num: "05", title: "スマホで確認", desc: "外出先からもスケジュールを確認・変更。" },
];

export default function ReservationDetailPage() {
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
            治療院専用 予約管理システム
          </div>
          <h1 className="text-3xl md:text-5xl font-black leading-tight mb-6">
            予約管理システム
          </h1>
          <p className="text-lg md:text-xl text-white/80 mb-4 leading-relaxed">
            カレンダー形式で直感操作。ダブルブッキングを自動防止。
          </p>
          <p className="text-lg md:text-xl text-white/80 mb-8 leading-relaxed">
            LINE通知連携で<span className="text-cta-300 font-bold">無断キャンセルゼロ</span>へ。
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
            カレンダーで一目で空き状況がわかる
          </p>

          {/* スクリーンショット */}
          <div className="rounded-2xl border border-gray-200 shadow-xl overflow-hidden mb-8">
            <div className="bg-gray-800 px-4 py-2.5 flex items-center gap-2">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-400"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                <div className="w-3 h-3 rounded-full bg-green-400"></div>
              </div>
              <span className="text-xs text-gray-400 ml-2">予約管理システム - 実際の画面</span>
            </div>
            <img
              src="/images/reservation.png"
              alt="予約管理システムの画面"
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
            {/* カレンダー画面 */}
            <div className="rounded-2xl border border-gray-200 shadow-lg overflow-hidden">
              <div className="bg-gray-800 px-4 py-2 flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-400"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                  <div className="w-3 h-3 rounded-full bg-green-400"></div>
                </div>
                <span className="text-xs text-gray-400 ml-2">予約カレンダー - 日表示</span>
              </div>
              <div className="bg-gray-50 p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-sm font-bold text-primary">3月28日（金）</div>
                  <div className="flex gap-1">
                    <span className="px-2 py-0.5 bg-primary/10 text-primary text-[10px] rounded font-bold">日</span>
                    <span className="px-2 py-0.5 bg-gray-100 text-gray-400 text-[10px] rounded">週</span>
                  </div>
                </div>
                <div className="space-y-1.5">
                  {[
                    { time: "9:00", name: "山田 太郎", menu: "整体60分", color: "bg-accent/10 border-accent/30" },
                    { time: "10:00", name: "佐藤 花子", menu: "鍼灸30分", color: "bg-primary/10 border-primary/30" },
                    { time: "10:30", name: "", menu: "", color: "bg-gray-50 border-dashed border-gray-200" },
                    { time: "11:00", name: "鈴木 一郎", menu: "整体90分", color: "bg-accent/10 border-accent/30" },
                    { time: "13:00", name: "田中 美咲", menu: "整体60分", color: "bg-accent/10 border-accent/30" },
                    { time: "14:00", name: "", menu: "", color: "bg-gray-50 border-dashed border-gray-200" },
                  ].map((slot, i) => (
                    <div key={i} className={`flex items-center gap-3 rounded-lg p-2 border ${slot.color}`}>
                      <span className="text-xs text-gray-500 w-10 shrink-0">{slot.time}</span>
                      {slot.name ? (
                        <div>
                          <span className="text-xs text-gray-700 font-medium">{slot.name}</span>
                          <span className="text-[10px] text-gray-400 ml-1">{slot.menu}</span>
                        </div>
                      ) : (
                        <span className="text-[10px] text-gray-300">空き</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {/* LINE通知画面 */}
            <div className="rounded-2xl border border-gray-200 shadow-lg overflow-hidden">
              <div className="bg-gray-800 px-4 py-2 flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-400"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                  <div className="w-3 h-3 rounded-full bg-green-400"></div>
                </div>
                <span className="text-xs text-gray-400 ml-2">LINE自動通知イメージ</span>
              </div>
              <div className="bg-[#7494C0] p-6">
                <div className="space-y-3">
                  <div className="flex justify-start">
                    <div className="bg-white rounded-2xl rounded-tl-sm px-4 py-2.5 max-w-[85%] shadow-sm">
                      <div className="text-xs text-gray-700 leading-relaxed">
                        <div className="font-bold text-green-700 mb-1">予約確定のお知らせ</div>
                        <div>山田 太郎 様</div>
                        <div className="mt-1">日時: 3/28（金）9:00</div>
                        <div>メニュー: 整体60分</div>
                        <div className="mt-1 text-gray-500">ご来院お待ちしております。</div>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-start">
                    <div className="bg-white rounded-2xl rounded-tl-sm px-4 py-2.5 max-w-[85%] shadow-sm">
                      <div className="text-xs text-gray-700 leading-relaxed">
                        <div className="font-bold text-accent mb-1">明日のご予約リマインド</div>
                        <div>山田 太郎 様</div>
                        <div className="mt-1">明日 3/28（金）9:00 にご予約が入っています。</div>
                        <div className="mt-1 text-gray-500">変更・キャンセルはお電話ください。</div>
                      </div>
                    </div>
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
              "予約帳が紙で、ダブルブッキングが起きたことがある",
              "電話予約の対応で施術が中断される",
              "無断キャンセルが多くて売上が安定しない",
              "患者の予約履歴を確認するのに時間がかかる",
              "受付スタッフがいないと予約管理が回らない",
              "予約表を見るためにわざわざ院に戻らないといけない",
            ].map((pain, i) => (
              <div key={i} className="flex items-start gap-3 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                <span className="text-red-500 text-lg mt-0.5">&#10007;</span>
                <span className="text-sm text-gray-700">{pain}</span>
              </div>
            ))}
          </div>
          <p className="text-center mt-8 text-primary font-bold text-lg">
            全て、予約管理システムで解決できます。
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
            治療院の予約管理に必要な機能を全て搭載
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
            治療院に必要な予約管理機能を全て備えているのは、このシステムだけ
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
                <li className="flex items-center gap-2"><span className="text-green-500">&#10003;</span>LINE通知連携</li>
                <li className="flex items-center gap-2"><span className="text-green-500">&#10003;</span>スタッフ数無制限</li>
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
