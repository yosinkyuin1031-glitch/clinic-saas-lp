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
const LINE_URL = "https://lin.ee/XnKG2IY";

export default function CustomerPage() {
  return (
    <main className="min-h-screen" style={{ backgroundColor: "#ffffff", color: "#1a1a1a" }}>
      {/* ヘッダー */}
      <header className="px-6 py-4 flex items-center justify-between max-w-5xl mx-auto" style={{ borderBottom: "1px solid #e5e5e5" }}>
        <Link href="/" className="text-sm hover:opacity-70 transition" style={{ color: "#1e3a5f" }}>← ClinicApps トップ</Link>
        <a href={LINE_URL} target="_blank" rel="noopener noreferrer" className="text-sm text-white px-4 py-2 rounded-full hover:opacity-90 transition" style={{ backgroundColor: "#1e3a5f" }}>LINEで相談する</a>
      </header>

      {/* セクション1: ヒーロー */}
      <section className="max-w-5xl mx-auto px-6 py-24 text-center">
        <p className="text-2xl md:text-3xl font-bold mb-4" style={{ color: "#1e3a5f" }}>顧客管理システム <span style={{ color: "#c9a84c" }}>Clinic Core</span></p>
        <h1 className="text-4xl md:text-6xl font-black leading-tight mb-6" style={{ color: "#1e3a5f" }}>
          治療院の経営を、<br />
          <span style={{ color: "#c9a84c" }}>数字で動かせ。</span>
        </h1>
        <p className="text-lg mb-10 max-w-2xl mx-auto leading-relaxed" style={{ color: "#666666" }}>
          LTV・ROAS・リピート率・エリア分布。<br />
          経営に必要な数字が、全部見える。月額5,500円から。
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href={STRIPE_URL} target="_blank" rel="noopener noreferrer" className="inline-block text-lg font-bold text-white px-10 py-4 rounded-xl transition shadow-lg hover:opacity-90" style={{ backgroundColor: "#1e3a5f" }}>今すぐ始める（月額5,500円〜） →</a>
          <a href={LINE_URL} target="_blank" rel="noopener noreferrer" className="inline-block text-lg font-bold px-10 py-4 rounded-xl transition" style={{ border: "2px solid #1e3a5f", color: "#1e3a5f" }}>LINEで相談する</a>
        </div>
      </section>

      {/* セクション2: 作った思い */}
      <section className="py-20" style={{ backgroundColor: "#f5f5f5" }}>
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-12 items-center">
            <div className="md:col-span-2">
              <p className="text-sm font-bold tracking-widest uppercase mb-3" style={{ color: "#c9a84c" }}>Story</p>
              <h2 className="text-2xl md:text-3xl font-bold mb-8" style={{ color: "#1e3a5f" }}>なぜ、このシステムを作ったのか。</h2>
              <div className="space-y-4 leading-relaxed" style={{ color: "#555555" }}>
                <p>もともと別の顧客管理ツールを使っていました。でも、どうしても機能が足りなかった。</p>
                <p>LTVが見たい。広告の費用対効果を数字で確認したい。どのエリアから患者が来ているか知りたい。そういった「経営に本当に必要な数字」が、どのツールにも揃っていなかった。</p>
                <p className="font-medium text-lg" style={{ color: "#1e3a5f" }}>だから、自分で作りました。</p>
                <p>治療家は施術のプロですが、経営のプロである必要はありません。でも、数字を見ずに経営するのは、目をつぶって運転するようなもの。</p>
                <p>広告費をかけても怖くない。どこに集中すべきかわかる。<br />そんな状態で経営できる治療家を増やしたくて、Clinic Coreを作りました。</p>
              </div>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-28 h-28 rounded-full flex items-center justify-center text-4xl font-black text-white" style={{ background: "linear-gradient(135deg, #1e3a5f, #2d5a8e)" }}>大</div>
              <p className="font-bold text-lg mt-4" style={{ color: "#1e3a5f" }}>大口 陽平</p>
              <p className="text-sm mt-1" style={{ color: "#999999" }}>治療院経営者 / 開発者</p>
              <p className="text-xs mt-2" style={{ color: "#aaaaaa" }}>大口神経整体院 院長<br />4事業を経営しながら自院で毎日使用</p>
            </div>
          </div>
        </div>
      </section>

      {/* セクション3: こんな悩みはありませんか？ */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-14" style={{ color: "#1e3a5f" }}>こんな悩みはありませんか？</h2>
          <div className="space-y-4 max-w-2xl mx-auto">
            {[
              "売上はあるのに、なぜ利益が残らないかわからない",
              "広告費をかけているのに、費用対効果が数字で見えない",
              "来なくなった患者に、いつ気づけばいいかわからない",
              "リピート率・LTVを計算したいが、Excelでは限界がある",
              "経営の数字を誰かに相談したいが、コンサルは高すぎる",
            ].map((text, i) => (
              <div key={i} className="flex items-start gap-4 rounded-xl p-5 bg-white shadow-sm" style={{ border: "1px solid #e5e5e5" }}>
                <span className="text-xl font-bold mt-0.5 flex-shrink-0" style={{ color: "#dc2626" }}>✗</span>
                <p className="leading-relaxed" style={{ color: "#444444" }}>{text}</p>
              </div>
            ))}
          </div>
          <p className="text-center mt-10 text-lg font-bold" style={{ color: "#1e3a5f" }}>全て、Clinic Coreで解決できます。</p>
        </div>
      </section>

      {/* セクション4: 主な機能（6カード） */}
      <section className="py-20" style={{ backgroundColor: "#f5f5f5" }}>
        <div className="max-w-5xl mx-auto px-6">
          <p className="text-center text-sm font-bold tracking-widest uppercase mb-3" style={{ color: "#c9a84c" }}>Features</p>
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-4" style={{ color: "#1e3a5f" }}>Clinic Coreでできること</h2>
          <p className="text-center mb-14" style={{ color: "#999999" }}>治療院経営に必要な6つの分析機能</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: "📊", title: "LTV・ROAS・CPA 自動計算", body: "広告1円あたりの費用対効果をリアルタイムで把握。どの媒体が効いているか一目でわかる。" },
              { icon: "📍", title: "エリア別患者分布マップ", body: "どの地域から患者が来ているか地図上で可視化。次の集客エリアの判断に使える。" },
              { icon: "🔔", title: "離反アラート・リピート分析", body: "来なくなった患者を自動検出。フォローのタイミングを逃さない。" },
              { icon: "📈", title: "月別売上・稼働率グラフ", body: "時間帯別・曜日別の稼働率まで自動集計。数字で経営判断ができる。" },
              { icon: "📮", title: "はがきDM宛名印刷", body: "離反患者リストをそのまま印刷。オフライン集客もこれ一つで完結。" },
              { icon: "📱", title: "SMS送信・CSVインポート", body: "既存データをそのまま移行。患者へのSMS送信にも対応。" },
            ].map((f) => (
              <div key={f.title} className="bg-white rounded-2xl p-6 shadow-sm transition hover:shadow-md" style={{ border: "1px solid #e5e5e5" }}>
                <span className="text-3xl block mb-4">{f.icon}</span>
                <h3 className="font-bold text-lg mb-2" style={{ color: "#1e3a5f" }}>{f.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "#666666" }}>{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* セクション5: 他社比較表 */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-6">
          <p className="text-center text-sm font-bold tracking-widest uppercase mb-3" style={{ color: "#c9a84c" }}>Comparison</p>
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-4" style={{ color: "#1e3a5f" }}>他社サービスとの比較</h2>
          <p className="text-center mb-12" style={{ color: "#999999" }}>治療院に必要な分析機能を全て備えているのは、Clinic Coreだけ</p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr>
                  <th className="text-left p-4 font-medium" style={{ color: "#999999", borderBottom: "2px solid #e5e5e5" }}></th>
                  <th className="p-4 text-center font-bold text-white rounded-t-xl" style={{ backgroundColor: "#1e3a5f" }}>Clinic Core</th>
                  <th className="p-4 text-center font-medium" style={{ color: "#999999", borderBottom: "2px solid #e5e5e5" }}>リピクル</th>
                  <th className="p-4 text-center font-medium" style={{ color: "#999999", borderBottom: "2px solid #e5e5e5" }}>スリーズプロ</th>
                  <th className="p-4 text-center font-medium" style={{ color: "#999999", borderBottom: "2px solid #e5e5e5" }}>Excel管理</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["月額料金", "5,500円", "要問合せ", "要問合せ", "0円"],
                  ["LTV・ROAS自動計算", "●", "－", "△", "－"],
                  ["エリア別患者マップ", "●", "－", "－", "－"],
                  ["離反アラート", "●", "●", "●", "－"],
                  ["はがきDM印刷", "●", "－", "－", "－"],
                  ["広告費対効果分析", "●", "－", "△", "－"],
                  ["SMS送信", "●", "－", "△", "－"],
                  ["治療院経営者が開発", "●", "－", "－", "－"],
                  ["最低契約期間", "6ヶ月", "要確認", "要確認", "－"],
                ].map(([item, core, repicle, threez, excel], i) => (
                  <tr key={item} style={{ borderBottom: "1px solid #e5e5e5" }}>
                    <td className="p-4 font-medium" style={{ color: "#444444" }}>{item}</td>
                    <td className="p-4 text-center font-bold" style={{ color: "#1e3a5f", backgroundColor: "rgba(30,58,95,0.04)", borderLeft: "2px solid #1e3a5f", borderRight: "2px solid #1e3a5f", ...(i === 8 ? { borderBottom: "2px solid #1e3a5f", borderRadius: "0 0 8px 8px" } : {}) }}>{core}</td>
                    <td className="p-4 text-center" style={{ color: "#999999" }}>{repicle}</td>
                    <td className="p-4 text-center" style={{ color: "#999999" }}>{threez}</td>
                    <td className="p-4 text-center" style={{ color: "#999999" }}>{excel}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* セクション6: 差別化ポイント3つ */}
      <section className="py-20" style={{ backgroundColor: "#f5f5f5" }}>
        <div className="max-w-5xl mx-auto px-6">
          <p className="text-center text-sm font-bold tracking-widest uppercase mb-3" style={{ color: "#c9a84c" }}>Why Clinic Core</p>
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-14" style={{ color: "#1e3a5f" }}>選ばれる3つの理由</h2>
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
              <div key={item.num} className="bg-white rounded-2xl p-8 shadow-sm" style={{ border: "1px solid #e5e5e5" }}>
                <span className="text-5xl font-black block mb-4" style={{ color: "rgba(30,58,95,0.12)" }}>{item.num}</span>
                <h3 className="font-bold text-lg mb-3 whitespace-pre-line" style={{ color: "#1e3a5f" }}>{item.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "#666666" }}>{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* セクション7: 料金 */}
      <section className="py-20" id="pricing" style={{ backgroundColor: "#1e3a5f" }}>
        <div className="max-w-5xl mx-auto px-6">
          <p className="text-center text-sm font-bold tracking-widest uppercase mb-3" style={{ color: "#c9a84c" }}>Pricing</p>
          <h2 className="text-2xl md:text-3xl font-bold text-center text-white mb-14">料金プラン</h2>
          <div className="max-w-md mx-auto bg-white rounded-2xl p-10 text-center shadow-lg" style={{ border: "2px solid #c9a84c" }}>
            <p className="font-bold text-sm mb-2" style={{ color: "#c9a84c" }}>Clinic Core</p>
            <div className="flex items-end justify-center gap-1 mb-2">
              <span className="text-5xl font-black" style={{ color: "#1e3a5f" }}>5,500</span>
              <span className="text-lg pb-1" style={{ color: "#999999" }}>円/月</span>
            </div>
            <p className="text-sm mb-8" style={{ color: "#999999" }}>初期費用 33,000円（税込）</p>
            <ul className="space-y-3 text-sm text-left mb-10" style={{ color: "#444444" }}>
              {[
                "全機能利用可能",
                "患者数無制限",
                "最低契約期間6ヶ月",
                "LINEサポート付き",
                "6ヶ月以降いつでも解約可能",
              ].map((t) => (
                <li key={t} className="flex items-center gap-3">
                  <span className="font-bold" style={{ color: "#c9a84c" }}>✓</span>
                  {t}
                </li>
              ))}
            </ul>
            <a href={STRIPE_URL} target="_blank" rel="noopener noreferrer" className="block w-full text-lg font-bold text-white py-4 rounded-xl transition shadow-lg mb-4 hover:opacity-90" style={{ backgroundColor: "#1e3a5f" }}>今すぐ始める →</a>
            <a href={LINE_URL} target="_blank" rel="noopener noreferrer" className="block w-full font-medium py-3 rounded-xl transition" style={{ border: "1px solid #cccccc", color: "#666666" }}>LINEで相談する</a>
          </div>
        </div>
      </section>

      {/* セクション8: よくある質問 */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-6">
          <p className="text-center text-sm font-bold tracking-widest uppercase mb-3" style={{ color: "#c9a84c" }}>FAQ</p>
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-14" style={{ color: "#1e3a5f" }}>よくある質問</h2>
          <div className="space-y-4 max-w-2xl mx-auto">
            {[
              { q: "既存データは移行できますか？", a: "CSVインポートに対応しています。ただし現在お使いのシステムによって移行できる範囲が異なります。まずはLINEでご相談ください。" },
              { q: "最低契約期間はありますか？", a: "6ヶ月の最低契約期間があります。6ヶ月経過後はいつでも解約可能です。" },
              { q: "サポートはどのように受けられますか？", a: "LINEにて個別サポートを行っています。初期設定から操作方法まで丁寧に対応します。" },
              { q: "スマートフォンでも使えますか？", a: "PCブラウザでの利用を推奨していますが、スマートフォンのブラウザからもアクセス可能です。" },
            ].map(({ q, a }) => (
              <div key={q} className="bg-white rounded-xl p-6 shadow-sm" style={{ border: "1px solid #e5e5e5" }}>
                <p className="font-bold mb-2" style={{ color: "#1e3a5f" }}>Q. {q}</p>
                <p className="text-sm leading-relaxed" style={{ color: "#666666" }}>A. {a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 text-center" style={{ backgroundColor: "#1e3a5f" }}>
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-2xl md:text-4xl font-black text-white mb-4">数字を見る院だけが、生き残る。</h2>
          <p className="mb-10 text-lg" style={{ color: "rgba(255,255,255,0.7)" }}>月額5,500円で、治療院経営に必要な数字が全て手に入る。</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href={STRIPE_URL} target="_blank" rel="noopener noreferrer" className="font-bold text-lg px-10 py-4 rounded-xl transition shadow-lg hover:opacity-90" style={{ backgroundColor: "#c9a84c", color: "#ffffff" }}>今すぐ始める →</a>
            <a href={LINE_URL} target="_blank" rel="noopener noreferrer" className="font-bold text-lg px-10 py-4 rounded-xl transition" style={{ border: "2px solid #ffffff", color: "#ffffff" }}>LINEで相談する</a>
          </div>
        </div>
      </section>

      {/* フッター */}
      <footer className="py-8 text-center text-sm" style={{ borderTop: "1px solid #e5e5e5", color: "#999999" }}>
        <a href={LINE_URL} target="_blank" rel="noopener noreferrer" className="inline-block text-white px-6 py-2 rounded-full mb-4 hover:opacity-90 transition" style={{ backgroundColor: "#1e3a5f" }}>LINEで相談する</a>
        <div className="flex flex-wrap justify-center gap-4 mb-4">
          <Link href="/" className="hover:opacity-70 transition" style={{ color: "#999999" }}>ClinicApps</Link>
          <span>|</span>
          <Link href="/legal/privacy" className="hover:opacity-70 transition" style={{ color: "#999999" }}>プライバシーポリシー</Link>
          <span>|</span>
          <Link href="/legal/terms" className="hover:opacity-70 transition" style={{ color: "#999999" }}>利用規約</Link>
          <span>|</span>
          <Link href="/legal/tokushoho" className="hover:opacity-70 transition" style={{ color: "#999999" }}>特定商取引法</Link>
        </div>
        <p>&copy; 2025 Clinic Core</p>
      </footer>
    </main>
  );
}
