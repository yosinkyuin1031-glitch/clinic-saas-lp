import Link from "next/link";

const YOUTUBE_ID = "";

export default function MonshinPage() {
  return (
    <main className="min-h-screen bg-white">
      <header className="border-b border-gray-100 px-6 py-4 flex items-center justify-between max-w-5xl mx-auto">
        <Link href="/" className="text-sm text-gray-500 hover:text-gray-700">← ClinicApps トップ</Link>
        <a href="https://lin.ee/182seszw" target="_blank" rel="noopener noreferrer" className="text-sm bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600 transition">LINEで相談する</a>
      </header>

      {/* ヒーロー */}
      <section className="max-w-5xl mx-auto px-6 py-20 text-center">
        <span className="inline-block bg-orange-100 text-orange-800 text-xs font-bold px-3 py-1 rounded-full mb-4">NEW</span>
        <p className="text-sm font-medium text-blue-600 tracking-widest uppercase mb-3">治療院専用 WEB問診システム</p>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-6">初診の10分を、<br />もっと大切なことに使う。</h1>
        <p className="text-lg text-gray-600 mb-10 max-w-xl mx-auto leading-relaxed">来院前に問診を済ませる。それだけで、<br />初診の質が劇的に変わります。</p>
        <a href="https://buy.stripe.com/fZufZgdMUcpq2Zufpn08g0a" target="_blank" rel="noopener noreferrer" className="inline-block bg-blue-600 text-white text-lg font-bold px-10 py-4 rounded-xl hover:bg-blue-700 transition shadow-md">今すぐ始める →</a>
        <p className="mt-4 text-sm text-gray-400">月額2,980円（税込）/ 初期費用11,000円 / 最低契約期間6ヶ月</p>
      </section>

      {/* YouTube動画 */}
      <section className="bg-gray-900 py-14">
        <div className="max-w-3xl mx-auto px-6">
          <p className="text-center text-xs text-gray-400 uppercase tracking-widest mb-4">操作デモ動画</p>
          <h2 className="text-2xl font-bold text-white text-center mb-8">実際の使い方を2分で確認</h2>
          {YOUTUBE_ID ? (
            <div className="relative pb-[56.25%] h-0 rounded-2xl overflow-hidden">
              <iframe src={`https://www.youtube.com/embed/${YOUTUBE_ID}?rel=0`} className="absolute inset-0 w-full h-full" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
            </div>
          ) : (
            <div className="relative pb-[56.25%] h-0 rounded-2xl overflow-hidden bg-gray-800 border border-gray-700">
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center"><svg className="w-7 h-7 text-gray-400 ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg></div>
                <p className="text-gray-400 text-sm">操作デモ動画（準備中）</p>
                <p className="text-gray-600 text-xs">YouTubeにアップ後、自動で表示されます</p>
              </div>
            </div>
          )}
          <p className="text-center text-gray-500 text-xs mt-4">※ 購入後に詳細な解説動画をすべてお送りします</p>
        </div>
      </section>

      {/* 課題提起 */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-12">こんな状態になっていませんか？</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {title:"初診時の問診票記入に時間がかかる",body:"来院してから紙に書いて、それを読み取って入力。初診だけで15分以上かかっていませんか？"},
              {title:"手書きをシステムに入力する二度手間がある",body:"紙の問診票をカルテに転記する作業。読みにくい字の解読、入力ミス。毎日の積み重ねが膨大な時間に。"},
              {title:"問診内容がカルテに反映されるまでが手間",body:"問診を取っても、カルテに反映されるまでにタイムラグ。施術前に情報が揃わない状態が続いていませんか？"},
            ].map(item=>(
              <div key={item.title} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <h3 className="font-bold text-gray-900 mb-3 text-lg">{item.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
          <p className="text-center mt-10 text-gray-700 font-medium text-lg">WEB問診なら、全て来院前に完了します。</p>
        </div>
      </section>

      {/* 機能紹介 */}
      <section className="py-16 max-w-5xl mx-auto px-6">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-4">4つの自動化機能</h2>
        <p className="text-center text-gray-500 mb-12">問診から患者登録まで、全て自動で完了</p>
        <div className="grid md:grid-cols-2 gap-6">
          {[
            {icon:"📱",title:"スマホで事前問診",body:"来院前にQRコードで回答。患者はスマホから簡単に問診票を記入でき、受付の待ち時間がゼロになります。"},
            {icon:"🔗",title:"自動患者マッチング",body:"既存患者は自動でカルテに紐付け。名前や電話番号で照合し、過去の来院履歴と問診情報を一元管理します。"},
            {icon:"➕",title:"新規患者自動登録",body:"未登録の患者なら自動でカルテを作成。手入力の手間がなく、初診時から正確なデータが揃います。"},
            {icon:"💬",title:"LINE通知",body:"問診回答があったらスタッフにLINEで通知。来院前に患者情報を確認し、準備万端で施術に入れます。"},
          ].map(f=>(
            <div key={f.title} className="flex gap-4 p-6 bg-white border border-gray-100 rounded-2xl shadow-sm">
              <span className="text-3xl flex-shrink-0">{f.icon}</span>
              <div><h3 className="font-bold text-gray-900 mb-2">{f.title}</h3><p className="text-gray-600 text-sm leading-relaxed">{f.body}</p></div>
            </div>
          ))}
        </div>
      </section>

      {/* 比較表 */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-4">他の問診方法との比較</h2>
          <p className="text-center text-gray-500 mb-10">問診から患者登録まで自動化できるのは、このシステムだけ</p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead><tr className="bg-blue-600 text-white"><th className="text-left p-4 rounded-tl-xl">比較項目</th><th className="p-4 text-center">紙の問診票</th><th className="p-4 text-center">Googleフォーム</th><th className="p-4 text-center">汎用問診システム</th><th className="p-4 text-center rounded-tr-xl font-bold">WEB問診</th></tr></thead>
              <tbody>{[
                ["スマホ事前問診","－","●","●","●"],
                ["既存患者の自動マッチング","－","－","▲","●"],
                ["新規患者の自動登録","－","－","▲","●"],
                ["LINE通知","－","－","▲","●"],
                ["顧客管理連携","－","－","－","●"],
                ["料金","0円","0円","10,000円〜/月","2,980円/月"],
              ].map(([item,a,b,c,d],i)=>(
                <tr key={item} className={i%2===0?"bg-white":"bg-gray-50"}>
                  <td className="p-4 font-medium text-gray-700">{item}</td>
                  <td className="p-4 text-center text-gray-500">{a}</td>
                  <td className="p-4 text-center text-gray-500">{b}</td>
                  <td className="p-4 text-center text-gray-500">{c}</td>
                  <td className="p-4 text-center font-bold text-blue-600">{d}</td>
                </tr>
              ))}</tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 連携 */}
      <section className="py-16 max-w-5xl mx-auto px-6">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-4">他システムとの連携</h2>
        <p className="text-center text-gray-500 mb-10">単体でも使える。連携すればさらに強力に。</p>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6"><h3 className="font-bold text-gray-900 mb-2">Clinic Coreと連携</h3><p className="text-gray-600 text-sm leading-relaxed">問診回答が自動で患者カルテに反映。主訴・既往歴・来院きっかけが入力なしで蓄積されます。</p></div>
          <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6"><h3 className="font-bold text-gray-900 mb-2">予約管理と連携</h3><p className="text-gray-600 text-sm leading-relaxed">予約確定時に問診URLを自動案内。患者は来院前にスマホで問診を完了できます。</p></div>
        </div>
        <p className="text-center mt-8 text-sm text-gray-400">連携は後から追加可能。まずはWEB問診単体でお使いいただけます。</p>
      </section>

      {/* 料金 */}
      <section className="bg-gray-50 py-16" id="pricing">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-12">料金プラン</h2>
          <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100"><p className="text-sm text-gray-500 mb-2">月額プラン</p><p className="text-4xl font-bold text-gray-900 mb-1">2,980<span className="text-lg font-normal">円/月</span></p><p className="text-sm text-gray-500 mb-6">初期費用 11,000円（税込）</p><ul className="space-y-2 text-sm text-gray-600">{["✓ 全問診機能","✓ 問診数無制限","✓ 自動患者登録","✓ 導入サポート付き"].map(t=><li key={t}>{t}</li>)}</ul></div>
            <div className="bg-blue-600 rounded-2xl p-8 shadow-md text-white relative"><span className="absolute top-4 right-4 bg-yellow-400 text-yellow-900 text-xs font-bold px-2 py-1 rounded-full">2ヶ月お得</span><p className="text-sm text-blue-200 mb-2">年払いプラン</p><p className="text-4xl font-bold mb-1">29,800<span className="text-lg font-normal">円/年</span></p><p className="text-sm text-blue-200 mb-1">初期費用 11,000円（税込）</p><p className="text-sm text-yellow-300 mb-6">月額換算 約2,483円 → 年間5,960円お得</p><ul className="space-y-2 text-sm text-blue-100">{["✓ 全問診機能","✓ 問診数無制限","✓ 自動患者登録","✓ 導入サポート付き"].map(t=><li key={t}>{t}</li>)}</ul></div>
          </div>
          <p className="text-center mt-6 text-sm text-gray-400">全て税込表示です。最低契約期間：6ヶ月。</p>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 max-w-5xl mx-auto px-6">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-12">よくある質問</h2>
        <div className="space-y-6 max-w-2xl mx-auto">
          {[
            {q:"問診の質問内容はカスタマイズできますか？",a:"はい。治療院の施術内容に合わせて質問項目を自由に設定できます。"},
            {q:"Clinic Coreがなくても使えますか？",a:"はい。WEB問診単体でご利用いただけます。後からClinic Coreを追加して連携することも可能です。"},
            {q:"患者のスマホ操作が苦手な場合は？",a:"QRコードを読み取るだけのシンプルな画面設計です。来院時にタブレットで記入していただくことも可能です。"},
          ].map(({q,a})=>(
            <div key={q} className="border border-gray-100 rounded-2xl p-6 bg-white shadow-sm"><p className="font-bold text-gray-900 mb-2">Q. {q}</p><p className="text-gray-600 text-sm leading-relaxed">A. {a}</p></div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-blue-600 py-16 text-white text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">初診の10分を、施術に使おう。</h2>
        <p className="text-blue-100 mb-8">月額2,980円で、問診の手間をゼロにする。</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="https://buy.stripe.com/fZufZgdMUcpq2Zufpn08g0a" target="_blank" rel="noopener noreferrer" className="bg-white text-blue-600 font-bold px-8 py-4 rounded-xl hover:bg-blue-50 transition shadow">今すぐ始める →</a>
          <a href="https://lin.ee/182seszw" target="_blank" rel="noopener noreferrer" className="border-2 border-white text-white font-bold px-8 py-4 rounded-xl hover:bg-blue-700 transition">LINEで相談する</a>
        </div>
      </section>

      <footer className="border-t border-gray-100 py-8 text-center text-sm text-gray-400">
        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/">ClinicApps</Link><span>|</span><Link href="/legal/privacy">プライバシーポリシー</Link><span>|</span><Link href="/legal/terms">利用規約</Link><span>|</span><Link href="/legal/tokushoho">特定商取引法</Link>
        </div>
      </footer>
    </main>
  );
}
