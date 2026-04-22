import Link from "next/link";

const YOUTUBE_ID = "";

export default function ReservationPage() {
  return (
    <main className="min-h-screen bg-white">
      <header className="border-b border-gray-100 px-6 py-4 flex items-center justify-between max-w-5xl mx-auto">
        <Link href="/" className="text-sm text-gray-500 hover:text-gray-700">← ClinicApps トップ</Link>
        <a href="https://lin.ee/182seszw" target="_blank" rel="noopener noreferrer" className="text-sm bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600 transition">LINEで相談する</a>
      </header>

      {/* ヒーロー */}
      <section className="max-w-5xl mx-auto px-6 py-20 text-center">
        <span className="inline-block bg-orange-100 text-orange-800 text-xs font-bold px-3 py-1 rounded-full mb-4">NEW</span>
        <p className="text-sm font-medium text-blue-600 tracking-widest uppercase mb-3">治療院専用 予約管理システム</p>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-6">予約の取りこぼしを、<br />仕組みで防ぐ。</h1>
        <p className="text-lg text-gray-600 mb-10 max-w-xl mx-auto leading-relaxed">電話対応に追われていませんか？<br />予約管理を自動化して、<br />施術に集中できる環境を作りましょう。</p>
        <a href="https://buy.stripe.com/aFabJ0gZ62OQ43ygtr08g08" target="_blank" rel="noopener noreferrer" className="inline-block bg-blue-600 text-white text-lg font-bold px-10 py-4 rounded-xl hover:bg-blue-700 transition shadow-md">今すぐ始める →</a>
        <p className="mt-4 text-sm text-gray-400">月額3,980円（税込）/ 初期費用11,000円 / 最低契約期間6ヶ月（6ヶ月未満解約時は残存月数分の早期解約金）</p>
        <p className="mt-2 text-xs text-gray-400">
          購入時は <Link href="/legal/terms" className="underline">利用規約</Link>・<Link href="/legal/privacy" className="underline">プライバシーポリシー</Link>・<Link href="/legal/tokushoho" className="underline">特商法表記</Link> への同意が必要です。
        </p>
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
              {title:"電話が多くて施術に集中できない",body:"施術中に電話が鳴るたびに手を止める。集中力が途切れて、施術の質が下がっていませんか？"},
              {title:"予約のダブルブッキングが怖い",body:"紙の予約帳では見落としが起きる。同じ時間に2人入れてしまった経験、ありませんか？"},
              {title:"キャンセルの連絡が来ない",body:"当日になって空き枠が発生。無断キャンセルの損失は月にいくらになっていますか？"},
            ].map(item=>(
              <div key={item.title} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <h3 className="font-bold text-gray-900 mb-3 text-lg">{item.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
          <p className="text-center mt-10 text-gray-700 font-medium text-lg">予約管理を仕組み化すれば、全て解決できます。</p>
        </div>
      </section>

      {/* 機能紹介 */}
      <section className="py-16 max-w-5xl mx-auto px-6">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-4">5つの管理機能</h2>
        <p className="text-center text-gray-500 mb-12">治療院の予約管理に必要な機能を全て搭載</p>
        <div className="grid md:grid-cols-2 gap-6">
          {[
            {icon:"📅",title:"予約カレンダー",body:"一目でわかる予約状況。日・週・月表示を切り替えて、空き枠と埋まり具合がひと目で把握できます。"},
            {icon:"🛏️",title:"リソース管理",body:"ベッド・スタッフの稼働管理。誰がどのベッドで施術中かをリアルタイムで確認できます。"},
            {icon:"📋",title:"予約メニュー設定",body:"メニュー別の所要時間・料金設定。施術内容ごとに枠の長さが自動で変わるので、ダブルブッキングを防げます。"},
            {icon:"🗓️",title:"休日・不定休設定",body:"定休日・臨時休業の管理。祝日や研修日をカレンダーに反映し、予約枠を自動で閉じます。"},
            {icon:"🔗",title:"顧客管理連携",body:"予約データが自動で患者カルテに反映。来院回数・売上が手入力なしで蓄積されます。"},
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
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-4">他の管理方法との比較</h2>
          <p className="text-center text-gray-500 mb-10">治療院に必要な予約管理機能を全て備えているのは、このシステムだけ</p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead><tr className="bg-blue-600 text-white"><th className="text-left p-4 rounded-tl-xl">比較項目</th><th className="p-4 text-center">紙の予約帳</th><th className="p-4 text-center">Googleカレンダー</th><th className="p-4 text-center">汎用予約システム</th><th className="p-4 text-center rounded-tr-xl font-bold">予約管理システム</th></tr></thead>
              <tbody>{[
                ["予約カレンダー","▲","●","●","●"],
                ["ダブルブッキング防止","－","▲","●","●"],
                ["リソース（ベッド/スタッフ）管理","－","－","▲","●"],
                ["メニュー別時間設定","－","－","●","●"],
                ["顧客管理連携","－","－","－","●"],
                ["料金","0円","0円","0円〜","3,980円/月"],
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
          <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6"><h3 className="font-bold text-gray-900 mb-2">Clinic Coreと連携</h3><p className="text-gray-600 text-sm leading-relaxed">予約データが自動で患者カルテに反映。来院回数・売上推移が手入力なしで蓄積されます。</p></div>
          <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6"><h3 className="font-bold text-gray-900 mb-2">WEB問診と連携</h3><p className="text-gray-600 text-sm leading-relaxed">予約と同時に問診URLを自動案内。患者は来院前にスマホで問診を完了できます。</p></div>
        </div>
        <p className="text-center mt-8 text-sm text-gray-400">連携は後から追加可能。まずは予約管理単体でお使いいただけます。</p>
      </section>

      {/* 料金 */}
      <section className="bg-gray-50 py-16" id="pricing">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-12">料金プラン</h2>
          <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100"><p className="text-sm text-gray-500 mb-2">月額プラン</p><p className="text-4xl font-bold text-gray-900 mb-1">3,980<span className="text-lg font-normal">円/月</span></p><p className="text-sm text-gray-500 mb-6">初期費用 11,000円（税込）</p><ul className="space-y-2 text-sm text-gray-600">{["✓ 全管理機能","✓ スタッフ数無制限","✓ メニュー数無制限","✓ 導入サポート付き"].map(t=><li key={t}>{t}</li>)}</ul></div>
            <div className="bg-blue-600 rounded-2xl p-8 shadow-md text-white relative"><span className="absolute top-4 right-4 bg-yellow-400 text-yellow-900 text-xs font-bold px-2 py-1 rounded-full">2ヶ月お得</span><p className="text-sm text-blue-200 mb-2">年払いプラン</p><p className="text-4xl font-bold mb-1">39,800<span className="text-lg font-normal">円/年</span></p><p className="text-sm text-blue-200 mb-1">初期費用 11,000円（税込）</p><p className="text-sm text-yellow-300 mb-6">月額換算 約3,317円 → 年間7,960円お得</p><ul className="space-y-2 text-sm text-blue-100">{["✓ 全管理機能","✓ スタッフ数無制限","✓ メニュー数無制限","✓ 導入サポート付き"].map(t=><li key={t}>{t}</li>)}</ul></div>
          </div>
          <p className="text-center mt-6 text-sm text-gray-400">全て税込表示です。最低契約期間：6ヶ月。</p>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 max-w-5xl mx-auto px-6">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-12">よくある質問</h2>
        <div className="space-y-6 max-w-2xl mx-auto">
          {[
            {q:"患者がオンラインで予約できますか？",a:"現在はスタッフ側の予約管理に特化しています。患者向けのオンライン予約機能は今後追加予定です。"},
            {q:"Clinic Coreがなくても使えますか？",a:"はい。予約管理単体でご利用いただけます。後からClinic Coreを追加して連携することも可能です。"},
            {q:"スタッフが複数いても使えますか？",a:"はい。スタッフごとに予約枠を分けて管理できます。追加料金はかかりません。"},
          ].map(({q,a})=>(
            <div key={q} className="border border-gray-100 rounded-2xl p-6 bg-white shadow-sm"><p className="font-bold text-gray-900 mb-2">Q. {q}</p><p className="text-gray-600 text-sm leading-relaxed">A. {a}</p></div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-blue-600 py-16 text-white text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">予約管理を仕組み化して、施術に集中する。</h2>
        <p className="text-blue-100 mb-8">月額3,980円で、予約の取りこぼしをゼロにする。</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="https://buy.stripe.com/aFabJ0gZ62OQ43ygtr08g08" target="_blank" rel="noopener noreferrer" className="bg-white text-blue-600 font-bold px-8 py-4 rounded-xl hover:bg-blue-50 transition shadow">今すぐ始める →</a>
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
