import Link from "next/link";
import PurchaseButton from "../../components/PurchaseButton";
import { LineFloatingButton } from "../_components/LineFloatingButton";
import { SystemHeader } from "../_components/SystemHeader";
import { IndustryUseCaseSection } from "../_components/IndustryUseCaseSection";
import { BusinessInfoFooter } from "../_components/BusinessInfoFooter";
import { SystemHubNavigation } from "../_components/SystemHubNavigation";
import { LINE_URL, DEVELOPER } from "../../lib/site-config";
import { getAppVoices } from "../../lib/testimonials";
import { VoiceCardDetail } from "../_components/VoiceCard";

// TODO: 新Payment Link（月額5,500円・初期費用0円）を陽平が作成し次第、STRIPE_URLを差し替え。
// MEO ¥5,500/月・初期費用0円・Custom Field「治療院名」あり
const STRIPE_URL = "https://buy.stripe.com/dRm3cucIQ2OQfMg1yx08g0y";
const DEMO_VIDEO = "/screens/meo/videos/meo-demo.webm";

const INDUSTRY_USE_CASES = [
  {
    industry: "seitai" as const,
    body: "「地域名×整体」で1位を狙う。新規流入の8割がGoogleマップ経由になる治療院も。",
  },
  {
    industry: "shinkyu" as const,
    body: "「美容鍼」「不妊」など強い症状KWで上位表示。広告費に頼らない集客導線が作れる。",
  },
  {
    industry: "sekkotsu" as const,
    body: "保険利用と自由診療メニューを使い分けた投稿で、新規層と既存層を同時に取りこむ。",
  },
  {
    industry: "salon" as const,
    body: "Instagramと役割を分担。マップは「来店動機」、Instagramは「ファン化」に。",
  },
];

export default function MeoPage() {
  return (
    <main className="min-h-screen bg-white">
      <LineFloatingButton />
      <SystemHeader />

      {/* ヒーロー（左右2カラム） */}
      <section className="max-w-6xl mx-auto px-6 pt-16 pb-24 md:pt-20 md:pb-32">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="text-center lg:text-left">
            <span className="inline-block bg-yellow-100 text-yellow-800 text-xs font-bold px-4 py-1.5 rounded-full mb-4">看板商品</span>
            <p className="text-sm font-medium text-blue-600 tracking-widest uppercase mb-3">治療院専用 MEO対策システム</p>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-6">
              Googleマップで、<br />
              <span className="text-blue-600">選ばれる院になる。</span>
            </h1>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              順位チェック・投稿作成・口コミ返信・SEO記事。<br />
              MEO対策に必要な全てを、AIが自動で実行します。
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start flex-wrap">
              <a href={STRIPE_URL} target="_blank" rel="noopener noreferrer" className="inline-block bg-blue-600 text-white text-base font-bold px-8 py-4 rounded-xl hover:bg-blue-700 transition shadow-md">今すぐ始める →</a>
              <a href="#demo-video" className="inline-flex items-center gap-2 text-base font-bold px-8 py-4 rounded-xl transition border-2 border-blue-600 text-blue-600 hover:bg-blue-50">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                動画でデモを見る
              </a>
              <a href={LINE_URL} target="_blank" rel="noopener noreferrer" className="inline-block text-base font-bold px-8 py-4 rounded-xl transition border-2 border-gray-700 text-gray-700 hover:bg-gray-50">LINEで相談する</a>
            </div>
            <p className="mt-4 text-sm text-gray-400">月額5,500円(税込)/ 初期費用0円 / 最低契約期間6ヶ月</p>
            <p className="mt-2 text-xs text-gray-400">
              購入時は <Link href="/legal/terms" className="underline">利用規約</Link>・<Link href="/legal/privacy" className="underline">プライバシーポリシー</Link>・<Link href="/legal/tokushoho" className="underline">特商法表記</Link> への同意が必要です。
            </p>
          </div>
          {/* 右: 実画面プレビュー（順位アラート・ダッシュボード・施策進捗の3枚） */}
          <div className="relative">
            <div className="rounded-2xl overflow-hidden shadow-2xl border border-gray-200 bg-white">
              <img
                src="/screens/meo/1-dashboard.png"
                alt="MEO勝ち上げくん 管理ダッシュボード"
                className="w-full h-auto"
              />
            </div>
            {/* 装飾サムネ：順位チェック画面 */}
            <div className="hidden lg:block absolute -top-4 -right-4 w-44 rounded-xl overflow-hidden shadow-xl border-4 border-white bg-white">
              <img
                src="/screens/meo/4-ranking-check.png"
                alt="順位アラート"
                className="w-full h-auto"
              />
            </div>
            {/* 装飾サムネ：施策チェック画面 */}
            <div className="hidden lg:block absolute -bottom-6 -left-4 w-44 rounded-xl overflow-hidden shadow-xl border-4 border-white bg-white">
              <img
                src="/screens/meo/3-strategy-check.png"
                alt="MEO対策進捗"
                className="w-full h-auto"
              />
            </div>
            {/* 料金バッジ */}
            <div className="absolute -bottom-6 -right-3 md:-right-6 bg-white rounded-xl shadow-xl border border-gray-100 p-4 hidden sm:block z-10">
              <p className="text-xs text-gray-400 mb-1">月額</p>
              <p className="text-2xl font-bold text-blue-600">5,500<span className="text-sm font-normal text-gray-500">円</span></p>
              <p className="text-xs text-gray-400">初期費用 0円</p>
            </div>
          </div>
        </div>
      </section>

      {/* 開発ストーリー＋プロフィール */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-10">
            <div className="inline-block relative">
              <img
                src="/images/clinic/treatment-4.jpeg"
                alt="現役治療家による開発"
                className="w-[180px] h-[180px] md:w-[220px] md:h-[220px] rounded-full shadow-xl border-4 border-white object-cover"
              />
            </div>
            <p className="mt-4 text-sm font-medium text-blue-600 tracking-widest uppercase">治療 × アプリ開発</p>
            <p className="text-xs text-gray-500 mt-1">治療家の課題を、テクノロジーで解決する</p>
          </div>

          <div className="grid md:grid-cols-5 gap-12 items-start">
            <div className="md:col-span-3">
              <p className="text-sm font-medium text-blue-600 tracking-widest uppercase mb-3">Story</p>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">なぜ、このシステムを作ったのか。</h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>MEO対策業者に、月5万円払っていました。</p>
                <p>順位は上がる。でも、何をやっているか不透明。<br />
                  「何のキーワードで何位を取りに行っているのか」「投稿内容はどうやって決めているのか」――
                  毎月明細を見ても、説明がない。</p>
                <p className="font-medium text-lg text-gray-900">これは、自分で作るしかない。</p>
                <p>AIを使えば、順位チェック・投稿生成・口コミ返信・SEO記事まで、外注業者がやっていたことの大半が自動化できる。
                  しかも、何をやっているか全部見える状態で。</p>
                <p>自分の院（大口神経整体院）で毎日使いながら、医療広告ガイドライン対応・薬機法フィルタも組み込んで磨いてきました。
                  外注に月5万払うか、自分で月5,500円で内製化するか――答えは明確です。</p>
              </div>
            </div>

            <div className="md:col-span-2">
              <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden">
                <div className="aspect-[5/6] relative bg-gray-100">
                  <img
                    src={DEVELOPER.portraitAlt}
                    alt="大口陽平"
                    className="absolute inset-0 w-full h-full object-cover object-top"
                  />
                </div>
                <div className="p-5">
                  <p className="text-xs text-blue-600 font-medium uppercase tracking-widest mb-2">Developer</p>
                  <p className="font-bold text-xl text-gray-900">大口 陽平</p>
                  <p className="text-sm text-gray-500 mt-1">治療院経営者 / アプリ開発者</p>
                  <div className="mt-4 pt-4 border-t border-gray-100 space-y-2 text-xs text-gray-600 leading-relaxed">
                    {DEVELOPER.bullets.map((bullet, i) => (
                      <p key={i}>・{bullet}</p>
                    ))}
                  </div>
                  <p className="text-xs text-gray-500 mt-4 leading-relaxed border-l-4 border-blue-200 pl-3 italic">
                    「{DEVELOPER.quote}」
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* こんな悩み */}
      <section className="py-16 max-w-5xl mx-auto px-6">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-12">こんな悩みはありませんか？</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {title:"Googleマップの順位が落ちてきた",body:"以前は3位以内だったのに、最近は圏外。何が原因か、どう対策すればいいかわからない。"},
            {title:"投稿や口コミ返信に時間がかかる",body:"週1回のGBP投稿、口コミ返信。わかっていても施術の合間にやる時間がない。"},
            {title:"MEO対策業者に月5万円払っている",body:"外注しているが、何をやっているか不透明。自分でできるなら内製化したい。"},
          ].map((item) => (
            <div key={item.title} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h3 className="font-bold text-gray-900 mb-3 text-lg">{item.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{item.body}</p>
            </div>
          ))}
        </div>
        <p className="text-center mt-10 text-gray-700 font-medium text-lg">AIに任せれば、週10分でMEO対策が完了します。</p>
      </section>

      {/* 機能紹介（実画面付き4機能 + サブ4機能） */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-4">搭載機能</h2>
          <p className="text-center text-gray-500 mb-12">MEO対策に必要な全てをAIが自動化</p>

          {/* メイン4機能（実画面付き・縦並びの説得力カード） */}
          <div className="space-y-10 mb-14">
            {[
              {
                screen: "/screens/meo/4-ranking-check.png",
                icon: "📍",
                title: "Googleマップ順位アラート",
                body: "追跡中のキーワードの順位を毎日自動取得。下落や上昇を「緊急 / 注意 / 上昇」で振り分け、改善のヒントまで提案します。「なぜ順位が下がったのか分からない」を解消。",
                bullets: ["順位下落を緊急アラートで通知", "改善のヒントを自動表示", "競合の動きも可視化"],
              },
              {
                screen: "/screens/meo/2-content-generation.png",
                icon: "✍️",
                title: "一括コンテンツ生成",
                body: "症状キーワード1つで、FAQ → ブログ → WordPress投稿 → GBP投稿 → note記事 まで連鎖的に作成。投稿ネタ切れ・記事作成の負担をゼロに。",
                bullets: ["1キーワードで複数チャネル同時生成", "ブログ・FAQ・GBP・noteを連鎖作成", "医療広告ガイドラインを自動チェック"],
              },
              {
                screen: "/screens/meo/3-strategy-check.png",
                icon: "✅",
                title: "MEO対策進捗チェック",
                body: "GBP最適化・写真戦略・口コミ戦略・サイテーション・LLMO対策など40項目を可視化。「どこまでやれば良いか」が一目で分かり、優先度順にタスク化されます。",
                bullets: ["MEO40項目を進捗バーで管理", "GBP・口コミ・サイテーションを網羅", "残タスクを優先度順に表示"],
              },
              {
                screen: "/screens/meo/5-history.png",
                icon: "📝",
                title: "生成コンテンツ履歴・再活用",
                body: "AIが生成した記事・FAQ・GBP投稿を全件保存。後から検索・再活用・編集が可能。書きためた資産がそのままクリニックのMEO土台になります。",
                bullets: ["全生成コンテンツを一元保存", "種別フィルタで検索", "クリック1つで再編集・再投稿"],
              },
            ].map((f, i) => (
              <div key={f.title} className={`grid md:grid-cols-5 gap-8 items-center ${i % 2 === 1 ? "md:[direction:rtl]" : ""}`}>
                <div className="md:col-span-3 md:[direction:ltr]">
                  <div className="rounded-2xl overflow-hidden shadow-xl border border-gray-200 bg-white">
                    <img src={f.screen} alt={f.title} className="w-full h-auto" />
                  </div>
                </div>
                <div className="md:col-span-2 md:[direction:ltr]">
                  <span className="text-3xl">{f.icon}</span>
                  <h3 className="text-xl md:text-2xl font-bold text-gray-900 mt-2 mb-3">{f.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">{f.body}</p>
                  <ul className="space-y-2">
                    {f.bullets.map(b => (
                      <li key={b} className="flex items-start gap-2 text-sm text-gray-700">
                        <span className="text-blue-500 flex-shrink-0 mt-0.5">✓</span>
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          {/* サブ機能（残り3つを2列カードで補強） */}
          <div className="grid md:grid-cols-3 gap-5">
            {[
              {icon:"💬",title:"口コミ返信AI自動生成",body:"患者からの口コミに対して、適切な返信文をAIが自動提案。丁寧かつ迅速な対応が可能に。"},
              {icon:"⚕️",title:"医療広告ガイドラインチェック",body:"生成した文章が医療広告ガイドラインに違反していないか自動チェック。安心して投稿できます。"},
              {icon:"🔌",title:"WordPress自動連携",body:"生成した記事をクリック1つでWordPressに公開。「コピー＆貼り付け」の手間をゼロに。"},
            ].map(f=>(
              <div key={f.title} className="flex gap-4 p-5 bg-white border border-gray-100 rounded-2xl shadow-sm">
                <span className="text-3xl flex-shrink-0">{f.icon}</span>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1.5 text-sm">{f.title}</h3>
                  <p className="text-gray-600 text-xs leading-relaxed">{f.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 動画（ヒーローのアンカーリンク先） */}
      <section id="demo-video" className="bg-gray-900 py-14 scroll-mt-20">
        <div className="max-w-3xl mx-auto px-6">
          <p className="text-center text-xs text-gray-400 uppercase tracking-widest mb-4">Live Action</p>
          <h2 className="text-2xl font-bold text-white text-center mb-3">動画でデモを見る</h2>
          <p className="text-center text-gray-400 text-sm mb-8">実際の管理画面を操作している様子です（音声なし）</p>
          <div className="relative pb-[62.5%] h-0 rounded-2xl overflow-hidden shadow-2xl">
            <video
              src={DEMO_VIDEO}
              className="absolute inset-0 w-full h-full object-cover bg-black"
              controls
              autoPlay
              muted
              loop
              playsInline
            />
          </div>
          <p className="text-center text-gray-500 text-xs mt-4">※ MEO勝ち上げくんの管理画面を実際に操作した動画です(音声なし)</p>
        </div>
      </section>

      {/* 業種別ユースケース */}
      <section className="bg-gray-50">
        <IndustryUseCaseSection useCases={INDUSTRY_USE_CASES} appName="MEO勝ち上げくん" />
      </section>

      {/* 比較表 */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-4">他のMEO対策との比較</h2>
          <p className="text-center text-gray-500 mb-10">外注費の1/10以下で、しかも自分で運用できる</p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead><tr className="bg-blue-600 text-white"><th className="text-left p-4 rounded-tl-xl">比較項目</th><th className="p-4 text-center">自力で運用</th><th className="p-4 text-center">MEO対策業者</th><th className="p-4 text-center">汎用MEOツール</th><th className="p-4 text-center rounded-tr-xl font-bold">MEO勝ち上げくん</th></tr></thead>
              <tbody>{[
                ["月額料金","0円","30,000円〜","5,000円〜","5,500円"],
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

      {/* 選ばれる3つの理由 */}
      <section className="py-16 max-w-5xl mx-auto px-6">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-12">選ばれる3つの理由</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { num: "01", title: "外注費の1/10\n月額5,500円で内製化", body: "MEO対策業者の月額相場は3〜5万円。MEO勝ち上げくんなら月5,500円で同等以上の機能。年間50万円規模のコストカット。" },
            { num: "02", title: "医療広告ガイドラインを\n自動チェック", body: "薬機法・医療広告ガイドラインに違反した表現を生成段階で自動検出。「効果」「治る」など危険ワードを安全に運用。" },
            { num: "03", title: "週10分で運用完結\n施術時間を奪わない", body: "AIが投稿文・記事・口コミ返信を作成、あとは確認してワンクリックで投稿。施術と教育の時間を奪いません。" },
          ].map((item) => (
            <div key={item.num} className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <span className="text-5xl font-black block mb-4 text-blue-100">{item.num}</span>
              <h3 className="font-bold text-lg mb-3 whitespace-pre-line text-gray-900">{item.title}</h3>
              <p className="text-sm leading-relaxed text-gray-600">{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* セキュリティ */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-5xl mx-auto px-6">
          <p className="text-center text-sm font-medium text-blue-600 uppercase tracking-widest mb-3">Security</p>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-4">院のアカウント情報を、安心して任せられる仕組み</h2>
          <p className="text-center text-gray-500 mb-12 leading-relaxed">Googleビジネスプロフィールの権限を扱う立場として、大手SaaSと同等の基盤・運用で守ります。</p>
          <div className="grid md:grid-cols-3 gap-5">
            {[
              { icon: "🛡️", title: "AWS東京リージョン基盤", body: "データはSupabase(AWS東京リージョン)の堅牢なクラウドで保管。物理サーバの管理は不要、災害・物損リスクなし。" },
              { icon: "🔒", title: "通信は全てSSL/TLS暗号化", body: "ログイン・データ送受信は全てHTTPS。第三者からの盗聴・改ざんを防ぎます。" },
              { icon: "⚕️", title: "医療広告ガイドライン対応", body: "生成AIに薬機法・医療広告ガイドラインのフィルタを組み込み。「効く」「治る」等の違反表現を自動検出。" },
              { icon: "💾", title: "日次自動バックアップ", body: "毎日のスナップショットを自動保存。万一の操作ミス・障害でも復旧可能。" },
              { icon: "🔑", title: "GBP連携は必要最小権限", body: "GoogleビジネスプロフィールのOAuth連携は必要な権限のみリクエスト。投稿・口コミ返信以外には触れません。" },
              { icon: "📜", title: "個人情報保護法準拠", body: "プライバシーポリシーを公開。解約時のデータ削除依頼にも応じます(30日以内に完全削除)。" },
            ].map((s) => (
              <div key={s.title} className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
                <div className="text-3xl mb-3">{s.icon}</div>
                <h3 className="font-bold text-gray-900 mb-2 text-sm">{s.title}</h3>
                <p className="text-xs text-gray-600 leading-relaxed">{s.body}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 max-w-3xl mx-auto bg-gradient-to-br from-blue-50 to-emerald-50 border border-blue-100 rounded-2xl p-6 text-center">
            <p className="text-sm text-gray-700 leading-relaxed">
              <span className="font-bold text-gray-900">運営：株式会社IDOMI(代表：大口陽平)</span><br />
              治療院経営者が自院(大口神経整体院)で毎日使うシステムです。<br />
              自分自身のGoogleビジネスプロフィールも同じ基盤で運用しています。
            </p>
          </div>
        </div>
      </section>

      {/* 導入事例 */}
      {(() => {
        const voices = getAppVoices("meo");
        return (
          <section className="py-16 bg-gray-50">
            <div className="max-w-5xl mx-auto px-6">
              <p className="text-center text-sm font-medium text-blue-600 uppercase tracking-widest mb-3">Case Study</p>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-12">導入事例</h2>
              <div className="max-w-2xl mx-auto space-y-6">
                {voices.length > 0 ? (
                  voices.map((t) => <VoiceCardDetail key={t.id} t={t} />)
                ) : (
                  <div className="bg-gradient-to-br from-blue-50 to-emerald-50 border-2 border-dashed border-blue-200 rounded-2xl p-8 text-center">
                    <p className="text-sm font-medium text-blue-600 uppercase tracking-widest mb-2">Coming Soon</p>
                    <p className="font-bold text-gray-900 mb-2">導入院のインタビュー記事を順次公開予定</p>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      整体院・鍼灸院・接骨院・サロンの導入事例を掲載準備中です。
                    </p>
                  </div>
                )}
              </div>
            </div>
          </section>
        );
      })()}

      {/* 料金 */}
      <section className="py-16" id="pricing">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-4">料金プラン</h2>
          <p className="text-center text-gray-500 mb-12">月額5,500円・初期費用0円・最低契約6ヶ月。シンプルな1プラン構成です。</p>
          <div className="max-w-lg mx-auto">
            <div className="bg-blue-600 rounded-2xl p-8 shadow-lg text-white relative">
              <span className="absolute top-4 right-4 bg-yellow-400 text-yellow-900 text-xs font-bold px-3 py-1 rounded-full">看板商品</span>
              <p className="text-sm font-bold text-blue-200 mb-2">通常プラン</p>
              <p className="text-4xl font-bold mb-1">5,500<span className="text-lg font-normal text-blue-200">円/月</span></p>
              <p className="text-sm text-blue-200 mb-6">初期費用 0円(税込)</p>
              <ul className="space-y-3 text-sm text-blue-100">
                {[
                  "全機能利用可能",
                  "キーワード数無制限",
                  "AI投稿文・SEO記事生成無制限",
                  "口コミ返信AI",
                  "医療広告ガイドラインチェック",
                  "分析ダッシュボード",
                  "導入サポート付き",
                ].map((t) => (
                  <li key={t} className="flex items-start gap-2">
                    <span className="text-yellow-300 flex-shrink-0">✓</span>{t}
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <PurchaseButton href={STRIPE_URL} label="今すぐ始める →" variant="primary" onDark className="w-full" />
              </div>
            </div>
          </div>
          <p className="text-center mt-6 text-sm text-gray-400">全て税込表示です。最低契約期間：6ヶ月。6ヶ月未満で解約された場合、残存月数分の早期解約金を申し受けます。</p>
        </div>
      </section>

      {/* 導入の流れ */}
      <section className="py-16 max-w-5xl mx-auto px-6 bg-gray-50">
        <p className="text-center text-sm font-medium text-blue-600 uppercase tracking-widest mb-3">How it works</p>
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-4">導入は4ステップ・最短即日でスタート</h2>
        <p className="text-center text-gray-500 mb-12 leading-relaxed">GBPアカウントがあれば、その日からMEO対策を自動化できます。</p>
        <div className="grid md:grid-cols-4 gap-4 md:gap-6">
          {[
            { step: "01", title: "申込・決済", desc: "LP内のボタンから1分でStripe決済。", detail: "1分" },
            { step: "02", title: "GBPアカウント連携", desc: "GoogleビジネスプロフィールのURLを登録するだけ。", detail: "5分" },
            { step: "03", title: "キーワード設定", desc: "対策したい地域×症状KWを登録。10個まで無料登録可能。", detail: "10分" },
            { step: "04", title: "自動運用開始", desc: "毎日自動で順位チェック・投稿提案・口コミ返信案が届きます。", detail: "当日〜" },
          ].map((s, i) => (
            <div key={s.step} className="relative bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-xs font-bold text-white bg-blue-600 rounded-full w-8 h-8 flex items-center justify-center">{s.step}</span>
                <p className="text-xs text-gray-400 font-medium">所要 {s.detail}</p>
              </div>
              <h3 className="font-bold text-sm text-gray-900 mb-2">{s.title}</h3>
              <p className="text-xs text-gray-600 leading-relaxed">{s.desc}</p>
              {i < 3 && (
                <span className="hidden md:block absolute -right-3 top-1/2 -translate-y-1/2 text-gray-300 text-lg">›</span>
              )}
            </div>
          ))}
        </div>
        <div className="mt-10 max-w-2xl mx-auto bg-gradient-to-br from-green-50 to-blue-50 border border-green-100 rounded-2xl p-6 text-center">
          <p className="text-sm font-bold text-gray-800 mb-3">迷ったらまずLINEで話を聞くだけでもOK</p>
          <p className="text-xs text-gray-600 leading-relaxed mb-4">「うちの地域でも効くか」「業種が違っても使える？」など、申込前のご相談を歓迎しています。</p>
          <a href={LINE_URL} target="_blank" rel="noopener noreferrer" className="inline-block bg-green-500 text-white font-bold text-sm px-6 py-3 rounded-xl hover:bg-green-600 transition shadow">
            LINEで相談する(無料)
          </a>
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
            {q:"整体院以外でも使えますか？",a:"はい。鍼灸院・接骨院・サロンでもご利用いただけます。業種に合わせた投稿文・SEO記事を自動生成します。"},
          ].map(({q,a})=>(
            <div key={q} className="border border-gray-100 rounded-2xl p-6 bg-white shadow-sm"><p className="font-bold text-gray-900 mb-2">Q. {q}</p><p className="text-gray-600 text-sm leading-relaxed">A. {a}</p></div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-blue-600 py-16 text-white text-center">
        <span className="inline-block bg-white/20 text-white text-xs font-bold px-4 py-1.5 rounded-full mb-4">月額5,500円 / 初期費用0円</span>
        <h2 className="text-2xl md:text-3xl font-bold mb-4">Googleマップで選ばれる院になりませんか。</h2>
        <p className="text-blue-100 mb-8">月額5,500円・初期費用0円・最低契約6ヶ月。外注費の1/10以下で、MEO対策をAIに任せる。決済後すぐにアカウント情報をメールでお届けします。</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href={STRIPE_URL} target="_blank" rel="noopener noreferrer" className="bg-white text-blue-600 font-bold px-8 py-4 rounded-xl hover:bg-blue-50 transition shadow">今すぐ始める →</a>
          <a href={LINE_URL} target="_blank" rel="noopener noreferrer" className="border-2 border-white text-white font-bold px-8 py-4 rounded-xl hover:bg-blue-700 transition">LINEで相談する</a>
        </div>
      </section>

      <SystemHubNavigation currentAppId="meo" />

      <BusinessInfoFooter productName="MEO勝ち上げくん" />
    </main>
  );
}
