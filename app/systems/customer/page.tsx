import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Clinic Core（クリニックコア）| 治療院専用 経営管理システム",
  description: "LTV・ROAS・リピート率・エリア分布。治療院経営に必要な数字が全部見える。月額5,500円。",
  openGraph: {
    title: "Clinic Core | 治療院の経営を、数字で動かせ。",
    description: "LTV・ROAS・リピート率・エリア分布。経営に必要な数字が全部見える。月額5,500円から。",
    type: "website",
    url: "https://clinic-saas-lp.vercel.app/systems/customer",
  },
};

const STRIPE_URL = "https://buy.stripe.com/8x2cN4aAI3SU43y7WV08g06";
const LINE_URL = "https://lin.ee/182seszw";

export default function CustomerPage() {
  return (
    <main className="min-h-screen" style={{ backgroundColor: "#0a0a0a", color: "#ffffff" }}>
      {/* ヘッダー */}
      <header className="border-b border-gray-800 px-6 py-4 flex items-center justify-between max-w-5xl mx-auto">
        <Link href="/" className="text-sm text-gray-400 hover:text-white transition">← ClinicApps トップ</Link>
        <a href={LINE_URL} target="_blank" rel="noopener noreferrer" className="text-sm bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600 transition">LINEで相談する</a>
      </header>

      {/* セクション1: ヒーロー */}
      <section className="max-w-5xl mx-auto px-6 py-24 text-center">
        <p className="text-sm font-medium tracking-widest uppercase mb-4" style={{ color: "#f59e0b" }}>治療院専用 経営管理システム</p>
        <h1 className="text-4xl md:text-6xl font-black leading-tight mb-6">
          治療院の経営を、<br />
          <span style={{ color: "#f59e0b" }}>数字で動かせ。</span>
        </h1>
        <p className="text-lg text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
          LTV・ROAS・リピート率・エリア分布。<br />
          経営に必要な数字が、全部見える。月額5,500円から。
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href={STRIPE_URL} target="_blank" rel="noopener noreferrer" className="inline-block text-lg font-bold px-10 py-4 rounded-xl transition shadow-lg" style={{ backgroundColor: "#f59e0b", color: "#0a0a0a" }}>今すぐ始める（月額5,500円〜） →</a>
          <a href={LINE_URL} target="_blank" rel="noopener noreferrer" className="inline-block border-2 border-gray-600 text-gray-300 text-lg font-bold px-10 py-4 rounded-xl hover:border-gray-400 hover:text-white transition">LINEで相談する</a>
        </div>
      </section>

      {/* セクション2: 作った思い */}
      <section className="py-20 border-t border-gray-800">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-12 items-center">
            <div className="md:col-span-2">
              <p className="text-sm font-bold tracking-widest uppercase mb-3" style={{ color: "#f59e0b" }}>Story</p>
              <h2 className="text-2xl md:text-3xl font-bold mb-8">なぜ、このシステムを作ったのか。</h2>
              <div className="space-y-4 text-gray-400 leading-relaxed">
                <p>もともと別の顧客管理ツールを使っていました。でも、どうしても機能が足りなかった。</p>
                <p>LTVが見たい。広告の費用対効果を数字で確認したい。どのエリアから患者が来ているか知りたい。そういった「経営に本当に必要な数字」が、どのツールにも揃っていなかった。</p>
                <p className="text-white font-medium text-lg">だから、自分で作りました。</p>
                <p>治療家は施術のプロですが、経営のプロである必要はありません。でも、数字を見ずに経営するのは、目をつぶって運転するようなもの。</p>
                <p>「広告費をかけても怖くない」「どこに集中すべきかわかる」<br />そんな状態で経営できる治療家を増やしたくて、Clinic Coreを作りました。</p>
              </div>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-28 h-28 rounded-full flex items-center justify-center text-4xl font-black text-white" style={{ background: "linear-gradient(135deg, #f59e0b, #d97706)" }}>大</div>
              <p className="text-white font-bold text-lg mt-4">大口 陽平</p>
              <p className="text-gray-500 text-sm mt-1">治療院経営者 / 開発者</p>
              <p className="text-gray-600 text-xs mt-2">大口神経整体院 院長<br />4事業を経営しながら自院で毎日使用</p>
            </div>
          </div>
        </div>
      </section>

      {/* セクション3: こんな悩みはありませんか？ */}
      <section className="py-20 border-t border-gray-800">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-14">こんな悩みはありませんか？</h2>
          <div className="space-y-4 max-w-2xl mx-auto">
            {[
              "売上はあるのに、なぜ利益が残らないかわからない",
              "広告費をかけているのに、費用対効果が数字で見えない",
              "来なくなった患者に、いつ気づけばいいかわからない",
              "リピート率・LTVを計算したいが、Excelでは限界がある",
              "経営の数字を誰かに相談したいが、コンサルは高すぎる",
            ].map((text, i) => (
              <div key={i} className="flex items-start gap-4 rounded-xl p-5" style={{ backgroundColor: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}>
                <span className="text-red-400 text-xl font-bold mt-0.5 flex-shrink-0">✗</span>
                <p className="text-gray-300 leading-relaxed">{text}</p>
              </div>
            ))}
          </div>
          <p className="text-center mt-10 text-lg font-bold" style={{ color: "#f59e0b" }}>全て、Clinic Coreで解決できます。</p>
        </div>
      </section>

      {/* セクション4: 主な機能（6カード） */}
      <section className="py-20 border-t border-gray-800">
        <div className="max-w-5xl mx-auto px-6">
          <p className="text-center text-sm font-bold tracking-widest uppercase mb-3" style={{ color: "#f59e0b" }}>Features</p>
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-4">Clinic Coreでできること</h2>
          <p className="text-center text-gray-500 mb-14">治療院経営に必要な6つの分析機能</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: "📊", title: "LTV・ROAS・CPA 自動計算", body: "広告1円あたりの費用対効果をリアルタイムで把握。どの媒体が効いているか一目でわかる。" },
              { icon: "📍", title: "エリア別患者分布マップ", body: "どの地域から患者が来ているか地図上で可視化。次の集客エリアの判断に使える。" },
              { icon: "🔔", title: "離反アラート・リピート分析", body: "来なくなった患者を自動検出。フォローのタイミングを逃さない。" },
              { icon: "📈", title: "月別売上・稼働率グラフ", body: "時間帯別・曜日別の稼働率まで自動集計。数字で経営判断ができる。" },
              { icon: "📮", title: "はがきDM宛名印刷", body: "離反患者リストをそのまま印刷。オフライン集客もこれ一つで完結。" },
              { icon: "📱", title: "SMS送信・CSVインポート", body: "既存データをそのまま移行。患者へのSMS送信にも対応。" },
            ].map((f) => (
              <div key={f.title} className="rounded-2xl p-6 transition" style={{ backgroundColor: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}>
                <span className="text-3xl block mb-4">{f.icon}</span>
                <h3 className="font-bold text-lg mb-2">{f.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* セクション5: 他社比較表 */}
      <section className="py-20 border-t border-gray-800">
        <div className="max-w-5xl mx-auto px-6">
          <p className="text-center text-sm font-bold tracking-widest uppercase mb-3" style={{ color: "#f59e0b" }}>Comparison</p>
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-4">他社サービスとの比較</h2>
          <p className="text-center text-gray-500 mb-12">治療院に必要な分析機能を全て備えているのは、Clinic Coreだけ</p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr>
                  <th className="text-left p-4 text-gray-400 font-medium border-b border-gray-800"></th>
                  <th className="p-4 text-center font-bold rounded-t-xl" style={{ backgroundColor: "#f59e0b", color: "#0a0a0a" }}>Clinic Core</th>
                  <th className="p-4 text-center text-gray-400 font-medium border-b border-gray-800">リピクル</th>
                  <th className="p-4 text-center text-gray-400 font-medium border-b border-gray-800">スリーズプロ</th>
                  <th className="p-4 text-center text-gray-400 font-medium border-b border-gray-800">Excel管理</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["月額料金", "5,500円", "要問合せ（推定1万円〜）", "要問合せ（推定1万円〜）", "0円"],
                  ["LTV・ROAS自動計算", "●", "－", "△", "－"],
                  ["エリア別患者マップ", "●", "－", "－", "－"],
                  ["離反アラート", "●", "●", "●", "－"],
                  ["はがきDM印刷", "●", "－", "－", "－"],
                  ["広告費対効果分析", "●", "－", "△", "－"],
                  ["SMS送信", "●", "－", "△", "－"],
                  ["治療院経営者が開発", "●", "－", "－", "－"],
                  ["最低契約期間", "6ヶ月", "要確認", "要確認", "－"],
                ].map(([item, core, repicle, threez, excel], i) => (
                  <tr key={item} className="border-b border-gray-800/50">
                    <td className="p-4 font-medium text-gray-300">{item}</td>
                    <td className="p-4 text-center font-bold" style={{ color: "#f59e0b", backgroundColor: "rgba(245,158,11,0.05)", borderLeft: "2px solid #f59e0b", borderRight: "2px solid #f59e0b", ...(i === 8 ? { borderBottom: "2px solid #f59e0b", borderRadius: "0 0 8px 8px" } : {}) }}>{core}</td>
                    <td className="p-4 text-center text-gray-500">{repicle}</td>
                    <td className="p-4 text-center text-gray-500">{threez}</td>
                    <td className="p-4 text-center text-gray-500">{excel}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* セクション6: 差別化ポイント3つ */}
      <section className="py-20 border-t border-gray-800">
        <div className="max-w-5xl mx-auto px-6">
          <p className="text-center text-sm font-bold tracking-widest uppercase mb-3" style={{ color: "#f59e0b" }}>Why Clinic Core</p>
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-14">選ばれる3つの理由</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                num: "01",
                title: "経営コンサル並みの分析が\n月5,500円",
                body: "LTV・ROAS・CPA・リピート率・エリア分析。数字を見ながら経営できる環境を、低コストで。",
              },
              {
                num: "02",
                title: "現役治療院経営者が\n自分の院のために作った",
                body: "机上の設計ではなく、毎日の院運営から生まれた機能。現場で本当に必要なものだけが入っている。",
              },
              {
                num: "03",
                title: "広告費をかけても\n怖くなくなる",
                body: "ROASとCPAが見えれば、広告は「賭け」ではなく「投資」になる。数字がわかれば、判断に迷わない。",
              },
            ].map((item) => (
              <div key={item.num} className="rounded-2xl p-8 transition" style={{ backgroundColor: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}>
                <span className="text-5xl font-black block mb-4" style={{ color: "rgba(245,158,11,0.2)" }}>{item.num}</span>
                <h3 className="font-bold text-lg mb-3 whitespace-pre-line">{item.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* セクション7: 料金 */}
      <section className="py-20 border-t border-gray-800" id="pricing">
        <div className="max-w-5xl mx-auto px-6">
          <p className="text-center text-sm font-bold tracking-widest uppercase mb-3" style={{ color: "#f59e0b" }}>Pricing</p>
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-14">料金プラン</h2>
          <div className="max-w-md mx-auto rounded-2xl p-10 text-center" style={{ backgroundColor: "rgba(255,255,255,0.03)", border: "2px solid #f59e0b" }}>
            <p className="font-bold text-sm mb-2" style={{ color: "#f59e0b" }}>Clinic Core</p>
            <div className="flex items-end justify-center gap-1 mb-2">
              <span className="text-5xl font-black">5,500</span>
              <span className="text-lg text-gray-400 pb-1">円/月</span>
            </div>
            <p className="text-gray-500 text-sm mb-8">初期費用 33,000円（税込）</p>
            <ul className="space-y-3 text-sm text-gray-300 text-left mb-10">
              {[
                "全機能利用可能",
                "患者数無制限",
                "最低契約期間6ヶ月",
                "LINEサポート付き",
                "6ヶ月以降いつでも解約可能",
              ].map((t) => (
                <li key={t} className="flex items-center gap-3">
                  <span className="font-bold" style={{ color: "#f59e0b" }}>✓</span>
                  {t}
                </li>
              ))}
            </ul>
            <a href={STRIPE_URL} target="_blank" rel="noopener noreferrer" className="block w-full text-lg font-bold py-4 rounded-xl transition shadow-lg mb-4" style={{ backgroundColor: "#f59e0b", color: "#0a0a0a" }}>今すぐ始める →</a>
            <a href={LINE_URL} target="_blank" rel="noopener noreferrer" className="block w-full border border-gray-700 text-gray-400 font-medium py-3 rounded-xl hover:border-gray-500 hover:text-white transition">LINEで相談する</a>
          </div>
        </div>
      </section>

      {/* セクション8: よくある質問 */}
      <section className="py-20 border-t border-gray-800">
        <div className="max-w-5xl mx-auto px-6">
          <p className="text-center text-sm font-bold tracking-widest uppercase mb-3" style={{ color: "#f59e0b" }}>FAQ</p>
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-14">よくある質問</h2>
          <div className="space-y-4 max-w-2xl mx-auto">
            {[
              { q: "既存データは移行できますか？", a: "CSVインポートに対応しています。ただし現在お使いのシステムによって移行できる範囲が異なります。まずはLINEでご相談ください。" },
              { q: "最低契約期間はありますか？", a: "6ヶ月の最低契約期間があります。6ヶ月経過後はいつでも解約可能です。" },
              { q: "サポートはどのように受けられますか？", a: "LINEにて個別サポートを行っています。初期設定から操作方法まで対応します。" },
              { q: "スマートフォンでも使えますか？", a: "PCブラウザでの利用を推奨していますが、スマートフォンのブラウザからもアクセス可能です。" },
            ].map(({ q, a }) => (
              <div key={q} className="rounded-xl p-6" style={{ backgroundColor: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}>
                <p className="font-bold mb-2">Q. {q}</p>
                <p className="text-gray-400 text-sm leading-relaxed">A. {a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 text-center" style={{ backgroundColor: "#f59e0b" }}>
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-2xl md:text-4xl font-black mb-4" style={{ color: "#0a0a0a" }}>数字を見る院だけが、生き残る。</h2>
          <p className="mb-10 text-lg" style={{ color: "rgba(10,10,10,0.7)" }}>月額5,500円で、治療院経営に必要な数字が全て手に入る。</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href={STRIPE_URL} target="_blank" rel="noopener noreferrer" className="font-bold text-lg px-10 py-4 rounded-xl transition shadow-lg" style={{ backgroundColor: "#0a0a0a", color: "#f59e0b" }}>今すぐ始める →</a>
            <a href={LINE_URL} target="_blank" rel="noopener noreferrer" className="border-2 font-bold text-lg px-10 py-4 rounded-xl transition" style={{ borderColor: "#0a0a0a", color: "#0a0a0a" }}>LINEで相談する</a>
          </div>
        </div>
      </section>

      {/* フッター */}
      <footer className="border-t border-gray-800 py-8 text-center text-sm text-gray-500">
        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/" className="hover:text-gray-300 transition">ClinicApps</Link>
          <span>|</span>
          <Link href="/legal/privacy" className="hover:text-gray-300 transition">プライバシーポリシー</Link>
          <span>|</span>
          <Link href="/legal/terms" className="hover:text-gray-300 transition">利用規約</Link>
          <span>|</span>
          <Link href="/legal/tokushoho" className="hover:text-gray-300 transition">特定商取引法</Link>
        </div>
      </footer>
    </main>
  );
}
