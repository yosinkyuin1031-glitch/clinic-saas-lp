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

const COMPETITORS = [
  { name: "顧客管理シート", price: "4,980円", alert: "○", analytics: "○", csv: "○", cloud: "○", mobile: "○", clinic: "○", highlight: true },
  { name: "Excel管理", price: "0円", alert: "×", analytics: "×", csv: "△", cloud: "×", mobile: "×", clinic: "×", highlight: false },
  { name: "汎用CRM\n(Salesforce等)", price: "3,000円〜", alert: "△", analytics: "○", csv: "○", cloud: "○", mobile: "○", clinic: "×", highlight: false },
  { name: "大手カルテ\nシステム", price: "15,000円〜", alert: "×", analytics: "△", csv: "△", cloud: "○", mobile: "△", clinic: "△", highlight: false },
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
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-black text-center text-primary mb-4">
            他社ツールとの比較
          </h2>
          <p className="text-center text-gray-500 mb-10">
            治療院に必要な機能を、この価格で
          </p>
          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden text-sm">
              <thead>
                <tr className="bg-primary text-white">
                  <th className="px-4 py-3 text-left font-bold">機能</th>
                  {COMPETITORS.map((c, i) => (
                    <th key={i} className={`px-3 py-3 text-center font-bold whitespace-pre-line ${c.highlight ? "bg-cta" : ""}`}>
                      {c.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-gray-100">
                  <td className="px-4 py-3 font-medium">月額料金</td>
                  {COMPETITORS.map((c, i) => (
                    <td key={i} className={`px-3 py-3 text-center ${c.highlight ? "font-bold text-cta bg-cta-50" : ""}`}>
                      {c.price}
                    </td>
                  ))}
                </tr>
                {[
                  { label: "離反アラート", key: "alert" as const },
                  { label: "データ分析", key: "analytics" as const },
                  { label: "CSV移行", key: "csv" as const },
                  { label: "クラウド", key: "cloud" as const },
                  { label: "スマホ対応", key: "mobile" as const },
                  { label: "治療院特化", key: "clinic" as const },
                ].map((row, ri) => (
                  <tr key={ri} className="border-t border-gray-100">
                    <td className="px-4 py-3 font-medium">{row.label}</td>
                    {COMPETITORS.map((c, ci) => {
                      const val = c[row.key];
                      return (
                        <td key={ci} className={`px-3 py-3 text-center ${c.highlight ? "bg-cta-50" : ""}`}>
                          {val === "○" ? (
                            <span className="text-green-600 font-bold">&#9679;</span>
                          ) : val === "△" ? (
                            <span className="text-yellow-500 font-bold">&#9650;</span>
                          ) : (
                            <span className="text-gray-300">-</span>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
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
