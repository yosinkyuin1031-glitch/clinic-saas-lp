import Link from "next/link";

const STRIPE_URL = "https://buy.stripe.com/8x2cN4aAI3SU43y7WV08g06";
const LINE_URL = "https://lin.ee/182seszw";

export default function CustomerPage() {
  return (
    <main className="min-h-screen bg-gray-950 text-white">
      {/* ヘッダー */}
      <header className="border-b border-gray-800 px-6 py-4 flex items-center justify-between max-w-5xl mx-auto">
        <Link href="/" className="text-sm text-gray-400 hover:text-white transition">← ClinicApps トップ</Link>
        <a href={LINE_URL} target="_blank" rel="noopener noreferrer" className="text-sm bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600 transition">LINEで相談する</a>
      </header>

      {/* ① ヒーロー */}
      <section className="max-w-5xl mx-auto px-6 py-24 text-center">
        <p className="text-sm font-medium text-orange-400 tracking-widest uppercase mb-4">治療院専用 顧客管理システム</p>
        <h1 className="text-4xl md:text-6xl font-black text-white leading-tight mb-6">
          治療院の経営を、<br />
          <span className="text-orange-400">数字で動かせ。</span>
        </h1>
        <p className="text-lg text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
          LTV・ROAS・リピート率・エリア分布。<br />
          経営に必要な数字が、全部見える。
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href={STRIPE_URL} target="_blank" rel="noopener noreferrer" className="inline-block bg-orange-500 text-white text-lg font-bold px-10 py-4 rounded-xl hover:bg-orange-600 transition shadow-lg shadow-orange-500/20">今すぐ始める →</a>
          <a href={LINE_URL} target="_blank" rel="noopener noreferrer" className="inline-block border-2 border-gray-600 text-gray-300 text-lg font-bold px-10 py-4 rounded-xl hover:border-gray-400 hover:text-white transition">LINEで相談する</a>
        </div>
        <p className="mt-6 text-sm text-gray-500">月額5,500円（税込）/ 初期費用33,000円</p>
      </section>

      {/* ② こんな悩みはありませんか？ */}
      <section className="bg-gray-900 py-20">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-14">こんな悩みはありませんか？</h2>
          <div className="space-y-4 max-w-2xl mx-auto">
            {[
              "売上はあるのに、なぜ利益が残らないかわからない",
              "広告費をかけているのに、費用対効果が見えない",
              "来なくなった患者にいつ気づけばいいかわからない",
              "リピート率・LTVを計算したいが、Excelでは限界",
              "経営の数字を誰かに相談したいが、コンサルは高い",
            ].map((text, i) => (
              <div key={i} className="flex items-start gap-4 bg-gray-800/50 border border-gray-700 rounded-xl p-5">
                <span className="text-orange-400 text-xl font-bold mt-0.5">×</span>
                <p className="text-gray-300 leading-relaxed">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ③ Clinic Coreでできること（6機能カード） */}
      <section className="py-20 max-w-5xl mx-auto px-6">
        <p className="text-center text-orange-400 text-sm font-bold tracking-widest uppercase mb-3">Features</p>
        <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-4">Clinic Coreでできること</h2>
        <p className="text-center text-gray-500 mb-14">治療院経営に必要な6つの分析機能</p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { icon: "📊", title: "LTV・ROAS・CPA自動計算", body: "広告1円あたりの費用対効果をリアルタイムで把握。どの広告が利益を生んでいるか一目瞭然。" },
            { icon: "📍", title: "エリア別患者分布マップ", body: "どの地域から患者が来ているか地図上で可視化。チラシ配布やポスティング戦略に直結。" },
            { icon: "🔔", title: "離反アラート・リピート分析", body: "来なくなった患者を自動検出。フォロータイミングを逃さない。" },
            { icon: "📈", title: "月別売上・稼働率グラフ", body: "時間帯別・曜日別の稼働率まで自動集計。経営判断の根拠になる。" },
            { icon: "📮", title: "はがきDM宛名印刷", body: "離反患者リストをそのまま印刷。オフライン集客も完結。" },
            { icon: "📱", title: "SMS・CSVインポート", body: "既存データをそのまま移行。患者へのSMS送信も可能。" },
          ].map((f) => (
            <div key={f.title} className="bg-gray-900 border border-gray-800 rounded-2xl p-6 hover:border-orange-500/30 transition">
              <span className="text-3xl block mb-4">{f.icon}</span>
              <h3 className="font-bold text-white text-lg mb-2">{f.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{f.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ④ 他社との比較表 */}
      <section className="bg-gray-900 py-20">
        <div className="max-w-5xl mx-auto px-6">
          <p className="text-center text-orange-400 text-sm font-bold tracking-widest uppercase mb-3">Comparison</p>
          <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-4">他の管理方法との比較</h2>
          <p className="text-center text-gray-500 mb-12">治療院に必要な分析機能を全て備えているのは、Clinic Coreだけ</p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr>
                  <th className="text-left p-4 text-gray-400 font-medium">比較項目</th>
                  <th className="p-4 text-center bg-orange-500 text-white font-bold rounded-t-xl">Clinic Core</th>
                  <th className="p-4 text-center text-gray-400 font-medium">Excel</th>
                  <th className="p-4 text-center text-gray-400 font-medium">汎用CRM</th>
                  <th className="p-4 text-center text-gray-400 font-medium">大手カルテ</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["月額料金", "5,500円", "0円", "3,000円〜", "15,000円〜"],
                  ["初期費用", "33,000円", "0円", "0円〜", "100,000円〜"],
                  ["LTV・ROAS自動計算", "●", "－", "－", "－"],
                  ["エリア別患者マップ", "●", "－", "－", "－"],
                  ["離反アラート", "●", "－", "△", "－"],
                  ["はがきDM印刷", "●", "－", "－", "－"],
                  ["広告費対効果分析", "●", "－", "△", "－"],
                  ["SMS送信", "●", "－", "△", "△"],
                  ["治療院専用設計", "●", "－", "－", "△"],
                  ["最低契約期間", "なし", "－", "12ヶ月〜", "12ヶ月〜"],
                ].map(([item, core, excel, crm, karte], i) => (
                  <tr key={item} className={`border-t border-gray-800 ${i % 2 === 0 ? "bg-gray-950/50" : "bg-gray-900/50"}`}>
                    <td className="p-4 font-medium text-gray-300">{item}</td>
                    <td className="p-4 text-center font-bold text-orange-400 bg-orange-500/5">{core}</td>
                    <td className="p-4 text-center text-gray-500">{excel}</td>
                    <td className="p-4 text-center text-gray-500">{crm}</td>
                    <td className="p-4 text-center text-gray-500">{karte}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ⑤ 差別化ポイント3つ */}
      <section className="py-20 max-w-5xl mx-auto px-6">
        <p className="text-center text-orange-400 text-sm font-bold tracking-widest uppercase mb-3">Why Clinic Core</p>
        <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-14">選ばれる3つの理由</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              num: "01",
              title: "経営コンサル並みの数字が\n月5,500円で手に入る",
              body: "LTV・ROAS・CPA・リピート率・エリア分析。コンサルに払う前に、まず数字を見える化する。",
            },
            {
              num: "02",
              title: "治療院経営者が\n自分の院のために作った",
              body: "机上の設計ではなく、実際の院運営から生まれた機能設計。現場で本当に必要なものだけが入っている。",
            },
            {
              num: "03",
              title: "縛りなし・\n透明な料金",
              body: "最低契約期間なし。月額5,500円のみ。初期費用以外に追加料金は一切なし。",
            },
          ].map((item) => (
            <div key={item.num} className="bg-gray-900 border border-gray-800 rounded-2xl p-8 hover:border-orange-500/30 transition">
              <span className="text-5xl font-black text-orange-500/20 block mb-4">{item.num}</span>
              <h3 className="font-bold text-white text-lg mb-3 whitespace-pre-line">{item.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ⑥ 料金 */}
      <section className="bg-gray-900 py-20" id="pricing">
        <div className="max-w-5xl mx-auto px-6">
          <p className="text-center text-orange-400 text-sm font-bold tracking-widest uppercase mb-3">Pricing</p>
          <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-14">料金プラン</h2>
          <div className="max-w-md mx-auto bg-gray-950 border-2 border-orange-500 rounded-2xl p-10 text-center">
            <p className="text-orange-400 font-bold text-sm mb-2">Clinic Core</p>
            <div className="flex items-end justify-center gap-1 mb-2">
              <span className="text-5xl font-black text-white">5,500</span>
              <span className="text-lg text-gray-400 pb-1">円/月</span>
            </div>
            <p className="text-gray-500 text-sm mb-8">初期費用 33,000円（税込）</p>
            <ul className="space-y-3 text-sm text-gray-300 text-left mb-10">
              {[
                "全6つの分析機能が使い放題",
                "患者数・データ量の制限なし",
                "CSV一括インポート対応",
                "導入サポート付き",
                "最低契約期間なし",
              ].map((t) => (
                <li key={t} className="flex items-center gap-3">
                  <span className="text-orange-400 font-bold">✓</span>
                  {t}
                </li>
              ))}
            </ul>
            <a href={STRIPE_URL} target="_blank" rel="noopener noreferrer" className="block w-full bg-orange-500 text-white text-lg font-bold py-4 rounded-xl hover:bg-orange-600 transition shadow-lg shadow-orange-500/20 mb-4">今すぐ始める →</a>
            <a href={LINE_URL} target="_blank" rel="noopener noreferrer" className="block w-full border border-gray-700 text-gray-400 font-medium py-3 rounded-xl hover:border-gray-500 hover:text-white transition">LINEで相談する</a>
          </div>
        </div>
      </section>

      {/* ⑦ よくある質問 */}
      <section className="py-20 max-w-5xl mx-auto px-6">
        <p className="text-center text-orange-400 text-sm font-bold tracking-widest uppercase mb-3">FAQ</p>
        <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-14">よくある質問</h2>
        <div className="space-y-4 max-w-2xl mx-auto">
          {[
            { q: "既存のデータは移行できますか？", a: "CSVインポートで患者データを一括移行できます。サポートもお手伝いします。" },
            { q: "予約管理・WEB問診との連携は？", a: "同じシステム基盤で連携できます。後から追加も可能です。" },
            { q: "最低利用期間はありますか？", a: "ありません。いつでも解約可能です。" },
            { q: "サポートはありますか？", a: "LINEで個別サポートします。操作でわからないことがあれば気軽にご連絡ください。" },
          ].map(({ q, a }) => (
            <div key={q} className="bg-gray-900 border border-gray-800 rounded-xl p-6">
              <p className="font-bold text-white mb-2">Q. {q}</p>
              <p className="text-gray-400 text-sm leading-relaxed">A. {a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-orange-500 py-20 text-center">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-2xl md:text-4xl font-black text-white mb-4">数字を見る院だけが、生き残る。</h2>
          <p className="text-orange-100 mb-10 text-lg">月額5,500円で、治療院経営に必要な数字が全て手に入る。</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href={STRIPE_URL} target="_blank" rel="noopener noreferrer" className="bg-white text-orange-600 font-bold text-lg px-10 py-4 rounded-xl hover:bg-orange-50 transition shadow-lg">今すぐ始める →</a>
            <a href={LINE_URL} target="_blank" rel="noopener noreferrer" className="border-2 border-white text-white font-bold text-lg px-10 py-4 rounded-xl hover:bg-orange-600 transition">LINEで相談する</a>
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
