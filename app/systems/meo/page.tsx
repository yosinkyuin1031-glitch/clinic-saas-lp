import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "MEO勝ち上げくん - 治療院専用MEO対策システム | ClinicApps",
  description:
    "治療院専用のMEO対策ツール。AIがGBP投稿・口コミ返信・SEO記事を自動生成。医療広告ガイドラインチェック機能搭載。月額4,980円。",
};

const FEATURES = [
  {
    icon: "M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z",
    title: "AIコンテンツ一括生成",
    desc: "GBP投稿・note記事・FAQ・ブログ記事をAI（Claude）が一括生成。院の情報を入れるだけで、治療院に最適化されたコンテンツが完成します。",
  },
  {
    icon: "M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.5 4.5M12 2.963A11.959 11.959 0 0121.54 7.5M12 2.963V2.25",
    title: "医療広告ガイドラインチェック",
    desc: "生成したコンテンツを自動でガイドライン違反チェック。「最高」「絶対治る」などのNG表現を検出し、安全な投稿だけを公開できます。",
  },
  {
    icon: "M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z",
    title: "順位チェック・変動アラート",
    desc: "キーワードごとのMEO順位を自動追跡。3位以上の変動があればアラートで通知。競合の動きも見逃しません。",
  },
  {
    icon: "M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z",
    title: "競合分析ダッシュボード",
    desc: "検索上位3院の比較・出現頻度ランキングを自動分析。自院の強み・弱みが数字で見えます。",
  },
  {
    icon: "M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z",
    title: "口コミ返信AI",
    desc: "治療院の口コミ特有の内容（症状改善・施術の痛み等）を理解したAIが、適切なトーンで返信文を生成します。",
  },
  {
    icon: "M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582",
    title: "WordPress・GSC連携",
    desc: "生成した記事をWordPressに直接投稿。Google Search Consoleと連携して、MEOだけでなくSEOも一元管理できます。",
  },
];

const COMPETITORS = [
  { name: "MEO勝ち上げくん", price: "4,980円", ai: true, gl: true, reply: true, wp: true, image: true, clinic: true, highlight: true },
  { name: "MEOチェキ", price: "3,278円〜", ai: false, gl: false, reply: false, wp: false, image: false, clinic: false, highlight: false },
  { name: "Gyro-n MEO", price: "1,500円〜", ai: false, gl: false, reply: false, wp: false, image: false, clinic: false, highlight: false },
  { name: "ローカルミエルカ", price: "50,000円〜", ai: false, gl: false, reply: false, wp: false, image: false, clinic: false, highlight: false },
];

const STEPS = [
  { num: "01", title: "アカウント作成", desc: "メールアドレスで簡単登録。3分で完了します。" },
  { num: "02", title: "院の情報を入力", desc: "院名・住所・診療内容・キーワードを設定。" },
  { num: "03", title: "AIがコンテンツ生成", desc: "ボタン1つでGBP投稿・記事・FAQが完成。" },
  { num: "04", title: "ガイドラインチェック", desc: "医療広告GLに違反がないか自動チェック。" },
  { num: "05", title: "投稿・公開", desc: "チェック済みのコンテンツをそのまま公開。" },
];

export default function MeoDetailPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* ヘッダー */}
      <header className="bg-primary text-white sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="text-sm opacity-80 hover:opacity-100">
            ← ClinicApps トップ
          </Link>
          <a
            href="https://meo-kachiage-beta.vercel.app/login?demo=true"
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
            治療院専用 MEO対策システム
          </div>
          <h1 className="text-3xl md:text-5xl font-black leading-tight mb-6">
            MEO勝ち上げくん
          </h1>
          <p className="text-lg md:text-xl text-white/80 mb-4 leading-relaxed">
            AIがGBP投稿・口コミ返信・SEO記事を自動生成。
          </p>
          <p className="text-lg md:text-xl text-white/80 mb-8 leading-relaxed">
            医療広告ガイドラインチェック機能付きは<span className="text-cta-300 font-bold">業界唯一</span>。
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://meo-kachiage-beta.vercel.app/login?demo=true"
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
              "Googleマップの順位が上がらない",
              "GBPに何を投稿すればいいかわからない",
              "口コミの返信に毎回時間がかかる",
              "投稿が医療広告ガイドラインに違反していないか不安",
              "MEO業者に月3〜5万円払っているが効果が見えない",
              "忙しくてMEO対策に時間を割けない",
            ].map((pain, i) => (
              <div key={i} className="flex items-start gap-3 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                <span className="text-red-500 text-lg mt-0.5">&#10007;</span>
                <span className="text-sm text-gray-700">{pain}</span>
              </div>
            ))}
          </div>
          <p className="text-center mt-8 text-primary font-bold text-lg">
            全て、MEO勝ち上げくんで解決できます。
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
            治療院のMEO対策に必要な機能を全て搭載
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
            治療院に必要な機能は、勝ち上げくんだけ
          </p>
          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden text-sm">
              <thead>
                <tr className="bg-primary text-white">
                  <th className="px-4 py-3 text-left font-bold">機能</th>
                  {COMPETITORS.map((c, i) => (
                    <th key={i} className={`px-3 py-3 text-center font-bold ${c.highlight ? "bg-cta" : ""}`}>
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
                  { label: "AI投稿生成", key: "ai" as const },
                  { label: "医療広告GLチェック", key: "gl" as const },
                  { label: "口コミ返信AI", key: "reply" as const },
                  { label: "WordPress連携", key: "wp" as const },
                  { label: "GBP画像生成", key: "image" as const },
                  { label: "治療院特化", key: "clinic" as const },
                ].map((row, ri) => (
                  <tr key={ri} className="border-t border-gray-100">
                    <td className="px-4 py-3 font-medium">{row.label}</td>
                    {COMPETITORS.map((c, ci) => (
                      <td key={ci} className={`px-3 py-3 text-center ${c.highlight ? "bg-cta-50" : ""}`}>
                        {c[row.key] ? (
                          <span className="text-green-600 font-bold">&#9679;</span>
                        ) : (
                          <span className="text-gray-300">-</span>
                        )}
                      </td>
                    ))}
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
                <li className="flex items-center gap-2"><span className="text-green-500">&#10003;</span>AI生成回数無制限</li>
                <li className="flex items-center gap-2"><span className="text-green-500">&#10003;</span>順位チェック無制限</li>
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
              href="https://meo-kachiage-beta.vercel.app/login?demo=true"
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
