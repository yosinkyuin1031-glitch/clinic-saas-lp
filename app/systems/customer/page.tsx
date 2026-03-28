import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "顧客管理シート - 治療院専用 顧客管理システム | ClinicApps",
  description:
    "治療院専用の顧客管理システム。患者情報・来院履歴・施術記録を一元管理。離反アラート・データ分析ダッシュボード搭載。月額4,980円。",
};

const FEATURES = [
  {
    icon: "M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z",
    title: "患者情報の一元管理",
    desc: "氏名・連絡先・症状・来院履歴を一画面で把握。紙カルテやExcelからの脱却。",
  },
  {
    icon: "M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z",
    title: "来院履歴・施術記録",
    desc: "いつ、何の施術をしたかを時系列で自動記録。前回の内容をすぐ確認。",
  },
  {
    icon: "M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0",
    title: "離反アラート機能",
    desc: "一定期間来院がない患者を自動検出。フォローすべきタイミングを逃さない。",
  },
  {
    icon: "M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z",
    title: "データ分析ダッシュボード",
    desc: "月別来院数・新規/既存比率・リピート率などをグラフで可視化。",
  },
  {
    icon: "M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5",
    title: "CSV一括インポート",
    desc: "ExcelやGoogleスプレッドシートのデータをCSVで一括移行。手入力不要。",
  },
  {
    icon: "M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.5 4.5 11.959 11.959 0 0112 2.963a11.959 11.959 0 019.5 1.537A11.959 11.959 0 0112 21.963a11.959 11.959 0 01-9.5-1.537A11.959 11.959 0 0112 2.963z",
    title: "セキュアなクラウド管理",
    desc: "SSL暗号化・データベース暗号化・自動バックアップ。大切な患者データを安全に。",
  },
];

const COMPARISON_ROWS = [
  { label: "月額料金", type: "price" as const },
  { label: "初期費用", type: "custom" as const },
  { label: "患者情報の一元管理", type: "check" as const },
  { label: "来院履歴・施術記録", type: "check" as const },
  { label: "離反アラート（自動検出）", type: "check" as const },
  { label: "リピート率・LTV分析", type: "check" as const },
  { label: "月別来院数グラフ", type: "check" as const },
  { label: "新規/既存比率の可視化", type: "check" as const },
  { label: "CSV一括インポート", type: "check" as const },
  { label: "スマホ対応", type: "check" as const },
  { label: "スタッフ間の情報共有", type: "check" as const },
  { label: "治療院専用設計", type: "check" as const },
  { label: "導入サポート", type: "custom" as const },
  { label: "最低契約期間", type: "custom" as const },
];

const COMPETITORS = [
  {
    name: "顧客管理シート",
    highlight: true,
    values: ["4,980円", "29,800円", "○", "○", "○", "○", "○", "○", "○", "○", "○", "○", "Zoom個別", "なし"],
  },
  {
    name: "Excel管理",
    highlight: false,
    values: ["0円", "0円", "△", "△", "×", "×", "×", "×", "△", "×", "×", "×", "なし", "-"],
  },
  {
    name: "汎用CRM\n(Salesforce等)",
    highlight: false,
    values: ["3,000円〜", "0円〜", "○", "△", "△", "○", "○", "△", "○", "○", "○", "×", "メール", "12ヶ月"],
  },
  {
    name: "大手カルテ\nシステム",
    highlight: false,
    values: ["15,000円〜", "100,000円〜", "○", "○", "×", "△", "△", "×", "△", "△", "○", "△", "訪問", "12ヶ月"],
  },
];

const ADVANTAGES = [
  {
    title: "離反アラートで売上の取りこぼしゼロ",
    desc: "来院間隔が空いた患者を自動検出。「来なくなったことに気づけない」を解消し、早めのフォローでリピート率を維持。Excel管理では絶対にできない機能です。",
  },
  {
    title: "治療院の指標に特化した分析",
    desc: "リピート率・新規/既存比率・LTVなど、治療院経営で本当に見るべき数字だけをダッシュボードに表示。汎用CRMにはない「治療院目線」の分析です。",
  },
  {
    title: "初期費用が大手の1/3以下",
    desc: "大手カルテシステムは初期費用10万円以上+月額1.5万円が相場。当システムは初期29,800円・月額4,980円で、必要な機能は全て揃っています。",
  },
];

const STEPS = [
  { num: "01", title: "アカウント作成", desc: "メールアドレスで簡単登録。3分で完了。" },
  { num: "02", title: "患者データ移行", desc: "既存のCSVをアップロードするだけ。手入力不要。" },
  { num: "03", title: "来院のたびに記録", desc: "施術内容をクリックで入力。30秒で完了。" },
  { num: "04", title: "ダッシュボードで確認", desc: "リピート率・来院傾向が自動でグラフ化。" },
  { num: "05", title: "アラートでフォロー", desc: "離反の兆候がある患者に早めにアプローチ。" },
];

export default function CustomerDetailPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* ヘッダー */}
      <header className="bg-primary text-white sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="text-sm opacity-80 hover:opacity-100">
            &larr; ClinicApps トップ
          </Link>
          <a
            href="https://customer-mgmt.vercel.app/login?demo=true"
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
            治療院専用 顧客管理システム
          </div>
          <h1 className="text-3xl md:text-5xl font-black leading-tight mb-6">
            顧客管理シート
          </h1>
          <p className="text-lg md:text-xl text-white/80 mb-4 leading-relaxed">
            患者情報・来院履歴・施術記録を一画面で一元管理。
          </p>
          <p className="text-lg md:text-xl text-white/80 mb-8 leading-relaxed">
            離反アラートで<span className="text-cta-300 font-bold">来なくなった患者を自動検出</span>。
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://customer-mgmt.vercel.app/login?demo=true"
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
            患者情報を一画面で把握、離反も自動で検出
          </p>
          <div className="grid md:grid-cols-2 gap-8">
            {/* 患者一覧画面 */}
            <div className="rounded-2xl border border-gray-200 shadow-lg overflow-hidden">
              <div className="bg-gray-800 px-4 py-2 flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-400"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                  <div className="w-3 h-3 rounded-full bg-green-400"></div>
                </div>
                <span className="text-xs text-gray-400 ml-2">顧客管理 - 患者一覧</span>
              </div>
              <div className="bg-gray-50 p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-sm font-bold text-primary">患者一覧</div>
                  <div className="px-3 py-1 bg-accent text-white rounded-lg text-xs font-bold">新規登録</div>
                </div>
                <div className="space-y-2">
                  {[
                    { name: "山田 太郎", status: "通院中", visits: "12回", last: "3/25", alert: false },
                    { name: "佐藤 花子", status: "通院中", visits: "8回", last: "3/20", alert: false },
                    { name: "鈴木 一郎", status: "離反注意", visits: "5回", last: "2/10", alert: true },
                  ].map((p, i) => (
                    <div key={i} className={`bg-white rounded-lg p-3 border ${p.alert ? "border-cta/30 bg-cta-50/30" : "border-gray-100"}`}>
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-sm text-gray-700 font-medium">{p.name}</span>
                          <span className={`ml-2 text-[10px] px-1.5 py-0.5 rounded ${p.alert ? "bg-cta/10 text-cta font-bold" : "bg-green-50 text-green-600"}`}>{p.status}</span>
                        </div>
                        <div className="text-xs text-gray-400">来院{p.visits} / 最終{p.last}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {/* ダッシュボード画面 */}
            <div className="rounded-2xl border border-gray-200 shadow-lg overflow-hidden">
              <div className="bg-gray-800 px-4 py-2 flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-400"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                  <div className="w-3 h-3 rounded-full bg-green-400"></div>
                </div>
                <span className="text-xs text-gray-400 ml-2">データ分析ダッシュボード</span>
              </div>
              <div className="bg-gray-50 p-6">
                <div className="text-sm font-bold text-primary mb-4">3月の実績</div>
                <div className="grid grid-cols-2 gap-3 mb-4">
                  {[
                    { label: "総来院数", value: "142", unit: "人", color: "text-primary" },
                    { label: "新規", value: "18", unit: "人", color: "text-accent" },
                    { label: "リピート率", value: "78", unit: "%", color: "text-green-600" },
                    { label: "離反アラート", value: "3", unit: "件", color: "text-cta" },
                  ].map((stat, i) => (
                    <div key={i} className="bg-white rounded-lg p-3 border border-gray-100 text-center">
                      <div className="text-[10px] text-gray-400">{stat.label}</div>
                      <div className={`text-xl font-black ${stat.color}`}>{stat.value}<span className="text-xs text-gray-400">{stat.unit}</span></div>
                    </div>
                  ))}
                </div>
                <div className="bg-accent/5 rounded-lg px-3 py-2 border border-accent/20">
                  <span className="text-xs text-accent font-bold">前月比 +8% の来院数増加</span>
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
              "カルテが紙やExcelでバラバラ、探すのに時間がかかる",
              "前回の施術内容を覚えていなくて患者に聞き直してしまう",
              "来なくなった患者に気づけない、フォローが後手に回る",
              "リピート率を把握したいが、数えるのが面倒",
              "スタッフ間で患者情報が共有できていない",
              "紙カルテの紛失・劣化が心配",
            ].map((pain, i) => (
              <div key={i} className="flex items-start gap-3 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                <span className="text-red-500 text-lg mt-0.5">&#10007;</span>
                <span className="text-sm text-gray-700">{pain}</span>
              </div>
            ))}
          </div>
          <p className="text-center mt-8 text-primary font-bold text-lg">
            全て、顧客管理シートで解決できます。
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
            治療院の顧客管理に必要な機能を全て搭載
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
            治療院に必要な顧客管理機能を全て備えているのは、このシステムだけ
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
              <div className="text-xs text-gray-500 mb-4">初期費用 29,800円</div>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-center gap-2"><span className="text-green-500">&#10003;</span>全機能利用可能</li>
                <li className="flex items-center gap-2"><span className="text-green-500">&#10003;</span>患者数無制限</li>
                <li className="flex items-center gap-2"><span className="text-green-500">&#10003;</span>データ分析機能</li>
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
              href="https://customer-mgmt.vercel.app/login?demo=true"
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
