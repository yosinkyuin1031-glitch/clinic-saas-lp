"use client";
import Link from "next/link";
import PurchaseButton from "../../components/PurchaseButton";

const YOUTUBE_ID = "";

export default function MeoPage() {
  return (
    <main className="min-h-screen bg-white">
      <header className="border-b border-gray-100 px-6 py-4 flex items-center justify-between max-w-5xl mx-auto">
        <Link href="/" className="text-sm text-gray-500 hover:text-gray-700">← ClinicApps トップ</Link>
        <a href="https://lin.ee/182seszw" target="_blank" rel="noopener noreferrer" className="text-sm bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600 transition">LINEで相談する</a>
      </header>

      {/* ヒーロー */}
      <section className="max-w-5xl mx-auto px-6 py-20 text-center">
        <span className="inline-block bg-yellow-100 text-yellow-800 text-xs font-bold px-3 py-1 rounded-full mb-4">看板商品</span>
        <p className="text-sm font-medium text-blue-600 tracking-widest uppercase mb-3">治療院専用 MEO対策システム</p>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-6">Googleマップで、<br />選ばれる院になる。</h1>
        <p className="text-lg text-gray-600 mb-10 max-w-xl mx-auto leading-relaxed">順位チェック・投稿作成・口コミ返信・SEO記事。<br />MEO対策に必要な全てを、AIが自動で実行します。</p>
        <a href="https://buy.stripe.com/9B6dR824cahi1Vqb9708g03" target="_blank" rel="noopener noreferrer" className="inline-block bg-blue-600 text-white text-lg font-bold px-10 py-4 rounded-xl hover:bg-blue-700 transition shadow-md">今すぐ始める →</a>
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
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-12">こんな悩みはありませんか？</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {title:"Googleマップの順位が落ちてきた",body:"以前は3位以内だったのに、最近は圏外。何が原因か、どう対策すればいいかわからない。"},
              {title:"投稿や口コミ返信に時間がかかる",body:"週1回のGBP投稿、口コミ返信。わかっていても施術の合間にやる時間がない。"},
              {title:"MEO対策業者に月5万円払っている",body:"外注しているが、何をやっているか不透明。自分でできるなら内製化したい。"},
            ].map(item=>(
              <div key={item.title} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <h3 className="font-bold text-gray-900 mb-3 text-lg">{item.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
          <p className="text-center mt-10 text-gray-700 font-medium text-lg">AIに任せれば、週10分でMEO対策が完了します。</p>
        </div>
      </section>

      {/* 機能紹介 */}
      <section className="py-16 max-w-5xl mx-auto px-6">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-4">搭載機能</h2>
        <p className="text-center text-gray-500 mb-12">MEO対策に必要な全てをAIが自動化</p>
        <div className="grid md:grid-cols-2 gap-6">
          {[
            {icon:"📍",title:"Googleマップ順位自動チェック",body:"指定キーワードの検索順位を毎日自動取得。順位の推移をグラフで可視化し、改善効果を数字で把握。"},
            {icon:"✍️",title:"AI投稿文自動生成",body:"院の情報を入力するだけで、GBP投稿用の文章をAIが自動生成。写真付き投稿もワンクリック。"},
            {icon:"💬",title:"口コミ返信AI自動生成",body:"患者からの口コミに対して、適切な返信文をAIが自動提案。丁寧かつ迅速な対応が可能に。"},
            {icon:"📝",title:"SEO記事自動生成",body:"地域×症状のキーワードで、SEOに最適化されたブログ記事をAIが自動作成。"},
            {icon:"⚕️",title:"医療広告ガイドラインチェック",body:"生成した文章が医療広告ガイドラインに違反していないか自動チェック。安心して投稿できます。"},
            {icon:"📊",title:"分析ダッシュボード",body:"順位推移・投稿頻度・口コミ数をダッシュボードで一元管理。対策の効果が一目でわかる。"},
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
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-4">他のMEO対策との比較</h2>
          <p className="text-center text-gray-500 mb-10">外注費の1/10以下で、しかも自分で運用できる</p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead><tr className="bg-blue-600 text-white"><th className="text-left p-4 rounded-tl-xl">比較項目</th><th className="p-4 text-center">自力で運用</th><th className="p-4 text-center">MEO対策業者</th><th className="p-4 text-center">汎用MEOツール</th><th className="p-4 text-center rounded-tr-xl font-bold">MEO勝ち上げくん</th></tr></thead>
              <tbody>{[
                ["月額料金","0円","30,000円〜","5,000円〜","3,980円"],
                ["順位自動チェック","－","●","●","●"],
                ["AI投稿文生成","－","▲","－","●"],
                ["口コミ返信AI","－","▲","－","●"],
                ["SEO記事生成","－","▲","－","●"],
                ["医療広告ガイドラインチェック","－","－","－","●"],
                ["運用の手間","多い","少ない","やや多い","週10分"],
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
          <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6"><h3 className="font-bold text-gray-900 mb-2">Clinic Coreと連携</h3><p className="text-gray-600 text-sm leading-relaxed">新規患者の流入経路をMEOデータと照合。Googleマップ経由の来院数・リピート率を自動で追跡できます。</p></div>
          <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6"><h3 className="font-bold text-gray-900 mb-2">WEB問診と連携</h3><p className="text-gray-600 text-sm leading-relaxed">問診の「来院きっかけ」データと連携。MEO対策の効果を患者データから直接検証できます。</p></div>
        </div>
        <p className="text-center mt-8 text-sm text-gray-400">連携は後から追加可能。まずはMEO勝ち上げくん単体でお使いいただけます。</p>
      </section>

      {/* 料金 */}
      <section className="bg-gray-50 py-16" id="pricing">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-12">料金プラン</h2>
          <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100"><p className="text-sm text-gray-500 mb-2">月額プラン</p><p className="text-4xl font-bold text-gray-900 mb-1">3,980<span className="text-lg font-normal">円/月</span></p><p className="text-sm text-gray-500 mb-6">初期費用 11,000円（税込）</p><ul className="space-y-2 text-sm text-gray-600">{["✓ 全機能利用可能","✓ キーワード数無制限","✓ AI生成無制限","✓ 導入サポート付き"].map(t=><li key={t}>{t}</li>)}</ul></div>
            <div className="bg-blue-600 rounded-2xl p-8 shadow-md text-white relative"><span className="absolute top-4 right-4 bg-yellow-400 text-yellow-900 text-xs font-bold px-2 py-1 rounded-full">2ヶ月お得</span><p className="text-sm text-blue-200 mb-2">年払いプラン</p><p className="text-4xl font-bold mb-1">39,800<span className="text-lg font-normal">円/年</span></p><p className="text-sm text-blue-200 mb-1">初期費用 11,000円（税込）</p><p className="text-sm text-yellow-300 mb-6">月額換算 約3,317円 → 年間7,960円お得</p><ul className="space-y-2 text-sm text-blue-100">{["✓ 全機能利用可能","✓ キーワード数無制限","✓ AI生成無制限","✓ 導入サポート付き"].map(t=><li key={t}>{t}</li>)}</ul></div>
          </div>
          <div className="mt-8 flex justify-center">
            <PurchaseButton href="https://buy.stripe.com/9B6dR824cahi1Vqb9708g03" label="月額プランで始める →" variant="primary" />
          </div>
          <p className="text-center mt-6 text-sm text-gray-400">全て税込表示です。最低契約期間：6ヶ月。6ヶ月未満で解約された場合、残存月数分の早期解約金を申し受けます。</p>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 max-w-5xl mx-auto px-6">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-12">よくある質問</h2>
        <div className="space-y-6 max-w-2xl mx-auto">
          {[
            {q:"Googleビジネスプロフィールのアカウントが必要ですか？",a:"はい。GBPアカウントをお持ちでない場合は、開設サポートも承っております。"},
            {q:"AIが生成した文章はそのまま使えますか？",a:"はい。医療広告ガイドラインチェック機能で違反表現を自動検出するので、安心して投稿できます。"},
            {q:"MEO対策業者から乗り換えできますか？",a:"はい。現在の対策内容をヒアリングした上で、スムーズな移行をサポートします。"},
          ].map(({q,a})=>(
            <div key={q} className="border border-gray-100 rounded-2xl p-6 bg-white shadow-sm"><p className="font-bold text-gray-900 mb-2">Q. {q}</p><p className="text-gray-600 text-sm leading-relaxed">A. {a}</p></div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-blue-600 py-16 text-white text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">Googleマップで選ばれる院になりませんか。</h2>
        <p className="text-blue-100 mb-8">月額3,980円で、MEO対策をAIに任せる。外注費の1/10以下。</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="https://buy.stripe.com/9B6dR824cahi1Vqb9708g03" target="_blank" rel="noopener noreferrer" className="bg-white text-blue-600 font-bold px-8 py-4 rounded-xl hover:bg-blue-50 transition shadow">今すぐ始める →</a>
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
