import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import PurchaseButton from "../../components/PurchaseButton";

export const metadata: Metadata = {
  title: "Clinic Core（クリニックコア）| 治療院専用 顧客管理・経営分析システム",
  description: "LTV・ROAS・リピート率・エリア分布。治療院経営に必要な数字が全部見える。モニター募集中：月額5,500円・初期費用0円。",
  openGraph: {
    title: "Clinic Core | 治療院の経営を、数字で動かせ。",
    description: "モニター5名限定募集。月額5,500円・初期費用0円で、LTV・ROAS・リピート率が全部見える。",
    type: "website",
    url: "https://clinic-saas-lp.vercel.app/systems/customer",
  },
};

const STRIPE_MONITOR_URL = "https://buy.stripe.com/5kQbJ0dMUexydE8a5308g07";
const STRIPE_NORMAL_URL = "https://buy.stripe.com/8x2cN4aAI3SU43y7WV08g06";
const LINE_URL = "https://lin.ee/qvChhK3";
const DEMO_URL = "https://clinic-core-demo.vercel.app";

export default function CustomerPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* ヘッダー */}
      <header className="border-b border-gray-100 px-6 py-4 flex items-center justify-between max-w-5xl mx-auto">
        <Link href="/" className="text-sm text-gray-500 hover:text-gray-700">← ClinicApps トップ</Link>
        <a href={LINE_URL} target="_blank" rel="noopener noreferrer" className="text-sm bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600 transition">LINEで相談する</a>
      </header>

      {/* セクション1: ヒーロー（モニター募集） */}
      <section className="max-w-6xl mx-auto px-6 pt-16 pb-24 md:pt-20 md:pb-32">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* 左: テキスト・CTA */}
          <div className="text-center lg:text-left">
            <span className="inline-block bg-red-100 text-red-700 text-xs font-bold px-4 py-1.5 rounded-full mb-4">モニター5名限定 / 初期費用0円</span>
            <p className="text-sm font-medium text-blue-600 tracking-widest uppercase mb-3">治療院専用 顧客管理・経営分析システム</p>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-6">
              治療院の経営を、<br />
              <span className="text-blue-600">数字で動かせ。</span>
            </h1>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              LTV・ROAS・純新規売上・リピート率・エリア分析。<br />
              経営に必要な数字が、全部見える。月額5,500円から。
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start flex-wrap">
              <a href={STRIPE_MONITOR_URL} target="_blank" rel="noopener noreferrer" className="inline-block bg-blue-600 text-white text-base font-bold px-8 py-4 rounded-xl hover:bg-blue-700 transition shadow-md">モニター価格で始める →</a>
              <a href={DEMO_URL} target="_blank" rel="noopener noreferrer" className="inline-block text-base font-bold px-8 py-4 rounded-xl transition border-2 border-gray-700 text-gray-700 hover:bg-gray-50">デモアプリを試す</a>
            </div>
            <p className="mt-4 text-sm text-gray-400">月額5,500円（税込）/ 初期費用0円 / 最低契約期間6ヶ月</p>
            <p className="mt-2 text-xs text-gray-400">
              購入時は <Link href="/legal/terms" className="underline">利用規約</Link>・<Link href="/legal/privacy" className="underline">プライバシーポリシー</Link>・<Link href="/legal/tokushoho" className="underline">特商法表記</Link> への同意が必要です。
            </p>
          </div>
          {/* 右: 管理画面プレビュー（メイン+装飾2枚） */}
          <div className="relative">
            <div className="rounded-2xl overflow-hidden shadow-2xl border border-gray-200 bg-white">
              <Image src="/screens/clinic-core/home.png" alt="Clinic Core ホーム画面" width={1440} height={900} className="w-full h-auto" priority />
            </div>
            <div className="absolute -bottom-10 -right-3 md:-right-8 w-40 md:w-56 hidden sm:block">
              <div className="rounded-xl overflow-hidden shadow-2xl border-4 border-white">
                <Image src="/screens/clinic-core/roas.png" alt="ROAS分析" width={800} height={500} className="w-full h-auto" />
              </div>
            </div>
            <div className="absolute -top-8 -left-3 md:-left-8 w-36 md:w-48 hidden sm:block">
              <div className="rounded-xl overflow-hidden shadow-xl border-4 border-white">
                <Image src="/screens/clinic-core/ltv.png" alt="LTV分析" width={800} height={500} className="w-full h-auto" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* モニター募集バナー */}
      <section className="bg-gray-900 py-12">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p className="text-xs text-gray-400 uppercase tracking-widest mb-4">Limited Offer</p>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">モニター5名限定で募集中</h2>
          <div className="grid grid-cols-3 gap-4 max-w-md mx-auto mb-6">
            <div className="bg-gray-800 border border-gray-700 rounded-xl p-4">
              <p className="text-2xl font-bold text-white">5,500<span className="text-sm text-gray-400">円/月</span></p>
              <p className="text-xs text-gray-400 mt-1">モニター月額</p>
            </div>
            <div className="bg-gray-800 border border-gray-700 rounded-xl p-4">
              <p className="text-2xl font-bold text-green-400">0<span className="text-sm text-gray-400">円</span></p>
              <p className="text-xs text-gray-400 mt-1">初期費用</p>
            </div>
            <div className="bg-gray-800 border border-gray-700 rounded-xl p-4">
              <p className="text-2xl font-bold text-yellow-400">5<span className="text-sm text-gray-400">名</span></p>
              <p className="text-xs text-gray-400 mt-1">残り枠</p>
            </div>
          </div>
          <p className="text-gray-400 text-sm leading-relaxed">
            通常：月額5,500円＋初期費用33,000円のところ、<br />
            モニター期間中は初期費用0円でご利用いただけます。<br />
            定員に達し次第、募集を終了します。
          </p>
        </div>
      </section>

      {/* セクション2: 作った思い + 開発者プロフィール */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-5xl mx-auto px-6">
          {/* ブランドビジュアル：治療×アプリ開発 */}
          <div className="text-center mb-10">
            <div className="inline-block relative">
              <Image
                src="/oguchi-character.jpg"
                alt="治療 × アプリ開発"
                width={220}
                height={220}
                className="rounded-full shadow-xl border-4 border-white"
                priority
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
                <p>もともと別の顧客管理ツールを使っていました。でも、どうしても機能が足りなかった。</p>
                <p>LTVが見たい。広告の費用対効果を数字で確認したい。どのエリアから患者が来ているか知りたい。そういった「経営に本当に必要な数字」が、どのツールにも揃っていなかった。</p>
                <p className="font-medium text-lg text-gray-900">だから、自分で作りました。</p>
                <p>治療家は施術のプロですが、経営のプロである必要はありません。でも、数字を見ずに経営するのは、目をつぶって運転するようなもの。</p>
                <p>広告費をかけても怖くない。どこに集中すべきかわかる。<br />そんな状態で経営できる治療家を増やしたくて、Clinic Coreを作りました。</p>
              </div>
            </div>

            {/* 右: 開発者プロフィールカード */}
            <div className="md:col-span-2">
              <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden">
                <div className="aspect-[5/6] relative bg-gray-100">
                  <Image
                    src="/oguchi-profile.jpg"
                    alt="大口陽平"
                    fill
                    sizes="(max-width: 768px) 100vw, 40vw"
                    className="object-cover"
                  />
                </div>
                <div className="p-5">
                  <p className="text-xs text-blue-600 font-medium uppercase tracking-widest mb-2">Developer</p>
                  <p className="font-bold text-xl text-gray-900">大口 陽平</p>
                  <p className="text-sm text-gray-500 mt-1">治療院経営者 / アプリ開発者</p>
                  <div className="mt-4 pt-4 border-t border-gray-100 space-y-2 text-xs text-gray-600 leading-relaxed">
                    <p>・<span className="font-medium text-gray-800">大口神経整体院</span> 院長（名古屋）</p>
                    <p>・<span className="font-medium text-gray-800">晴陽鍼灸院</span> 経営</p>
                    <p>・整体院 / 訪問鍼灸 / アプリ販売 / コンサル / 治療機器販売 の5事業を運営</p>
                    <p>・治療家向けアプリを30本以上開発</p>
                    <p>・Clinic Core を自院で毎日使いながら改善中</p>
                  </div>
                  <p className="text-xs text-gray-500 mt-4 leading-relaxed border-l-4 border-blue-200 pl-3 italic">
                    「数字を見ずに経営するのは、目をつぶって運転するようなもの。広告費をかけても怖くない治療家を増やしたい。」
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* セクション3: こんな悩みはありませんか？ */}
      <section className="py-16 max-w-5xl mx-auto px-6">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-12">こんな悩みはありませんか？</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { title: "売上はあるのに利益が残らない", body: "月の売上は把握しているのに、なぜ手元にお金が残らないかわからない。LTV・CPAを見れば、原因がすぐわかります。" },
            { title: "広告費の費用対効果が見えない", body: "チラシ・ホットペッパー・リスティング広告...色々やっているけど、どれが本当に効いているかわからない。" },
            { title: "来なくなった患者に気づけない", body: "「あの患者さん最近来ないな」と思った時にはもう手遅れ。離反アラートがあれば、早めに対策できます。" },
            { title: "リピート率を計算する時間がない", body: "Excelで計算しようとしても、データ入力だけで日が暮れる。自動集計できれば、施術に集中できます。" },
            { title: "経営の数字を相談できる人がいない", body: "コンサルは高い。でも一人で数字を見ても判断できない。まず数字が見える環境を作ることが第一歩です。" },
            { title: "複数のツールにデータが散らばっている", body: "予約はここ、カルテはあそこ、売上管理はExcel...。一元管理できれば、ムダな転記がなくなります。" },
          ].map((item) => (
            <div key={item.title} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h3 className="font-bold text-gray-900 mb-3 text-lg">{item.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{item.body}</p>
            </div>
          ))}
        </div>
        <p className="text-center mt-10 text-gray-700 font-medium text-lg">全て、Clinic Coreで解決できます。</p>
      </section>

      {/* セクション4: 主な機能（6カード） */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-5xl mx-auto px-6">
          <p className="text-center text-sm font-medium text-blue-600 uppercase tracking-widest mb-3">Features</p>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-4">Clinic Coreでできること</h2>
          <p className="text-center text-gray-500 mb-12">治療院経営に必要な12の機能</p>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { icon: "📊", title: "LTV・ROAS・CPA 自動計算", body: "広告費と来院動機を自動マッチング。反応率・CV率・CPAがリアルタイムで見える。WEB広告もチラシも一元管理。", img: "roas" },
              { icon: "💰", title: "純新規売上 / 既存売上分析", body: "その月・その年に初来院した患者の全売上を「純新規売上」として自動分離。年間の新規獲得効果が数字で見える。" },
              { icon: "📍", title: "エリア × 媒体クロス分析", body: "どの地域から・どの媒体で患者が来ているか一目で把握。エリア別LTVと媒体別集客内訳を同時に確認。" },
              { icon: "🔔", title: "リピート分析・離反アラート", body: "2回〜10回の回数別リピート率、年代別×性別・症状・経路のクロス集計。来院が止まった患者を自動検知。離反判定の日数は院ごとにカスタマイズ可。", img: "ltv" },
              { icon: "📈", title: "月別売上・稼働率グラフ", body: "時間帯別・曜日別の稼働率まで自動集計。1日の稼働枠の埋まり具合がひと目で分かる。", img: "stats" },
              { icon: "📮", title: "はがきDM宛名印刷・CSV出力", body: "離反患者リストをそのままDM印刷。患者データCSV出力にも対応。" },
              { icon: "👥", title: "スタッフ別売上・日報・金種管理", body: "複数スタッフの院に対応。施術スタッフ別の売上ランキング、1日単位の日報、金種(現金/カード/QR等)を院ごとにカスタマイズ。一括入力でシフトと金種を一括適用も可能。", img: "by-staff" },
              { icon: "🎫", title: "回数券・サブスク管理", body: "発行・残回数・有効期限を自動管理。残りわずか・期限切れを通知し、再販タイミングを逃さない。" },
              { icon: "📱", title: "SMS送信・予約リマインド", body: "離反予兆の患者・予約前日の患者へ一斉SMS。テンプレで院長の手間を最小化。送信履歴も残る。", img: "reservation" },
              { icon: "🤖", title: "AI経営アドバイス", body: "離反リスク・リピート率低下・LTV高い動機など、数字の異変をAIが文章で示唆。次に取るべき手が分かる。" },
              { icon: "🎯", title: "売上シミュレーター", body: "月商目標から逆算して、必要な患者数・単価・リピート率を試算。値上げや稼働率改善のシナリオを並べて検討できる。" },
              { icon: "🎤", title: "来院一括入力（音声・テキスト）", body: "閉院後に1日分の伝票を音声orテキストでまとめて入力。AIが解析してスタッフ・金種を一括適用、2タップで保存完了。" },
            ].map((f) => (
              <div key={f.title} className="flex gap-4 p-6 bg-white border border-gray-100 rounded-2xl shadow-sm">
                <span className="text-3xl flex-shrink-0">{f.icon}</span>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 mb-2">{f.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{f.body}</p>
                  {f.img && (
                    <div className="mt-3 rounded-lg overflow-hidden border border-gray-200">
                      <Image src={`/screens/clinic-core/${f.img}.png`} alt={f.title} width={800} height={500} className="w-full h-auto" />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* セクション4.5: デモアプリを体験できる */}
      <section className="py-16 bg-gradient-to-br from-blue-50 to-emerald-50">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-center text-sm font-medium text-blue-600 uppercase tracking-widest mb-3">Live Demo</p>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-4">デモアプリで全機能をそのまま試せます</h2>
          <p className="text-center text-gray-600 mb-10 leading-relaxed">これはモック画面ではありません。本番システムに「デモ整骨院」アカウントを用意してあり、<br/>テスト用患者80名・伝票2,600件・24ヶ月分の売上データ・予約データ入りで全画面そのまま触れます。</p>

          {/* スクリーンショットギャラリー */}
          <div className="grid md:grid-cols-3 gap-5 mb-10">
            {[
              { img: 'home',     title: 'ホーム画面', desc: '今月の売上・新規・リピート率を一目で把握' },
              { img: 'patients', title: '患者管理', desc: 'カルテ・来院履歴・LTV・主訴・エリアを一元管理' },
              { img: 'roas',     title: 'ROAS分析', desc: '来店動機別の広告費対効果を可視化' },
              { img: 'ltv',      title: 'LTV分析', desc: '患者ごとの生涯売上を自動算出・離反予兆を検知' },
              { img: 'by-staff', title: 'スタッフ別売上', desc: '施術者ごとの売上・指名率を見える化' },
              { img: 'stats',    title: '月間統計', desc: '24ヶ月の売上推移をグラフで把握' },
              { img: 'master',   title: 'マスター管理', desc: 'メニュー・症状・職業・来店動機を院ごとに設定' },
              { img: 'reservation', title: '予約管理', desc: 'スタッフ別・時間帯別の予約を1画面で管理' },
            ].map((g) => (
              <div key={g.img} className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden hover:shadow-lg transition">
                <div className="relative w-full aspect-[16/10] bg-gray-50 border-b border-gray-100">
                  <Image
                    src={`/screens/clinic-core/${g.img}.png`}
                    alt={g.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover object-top"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-sm text-gray-900 mb-1">{g.title}</h3>
                  <p className="text-xs text-gray-600 leading-relaxed">{g.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 text-center">
            <p className="text-sm text-gray-700 mb-4 font-medium">👇 上の画面は全部、いまから触れます</p>
            <a href={DEMO_URL} target="_blank" rel="noopener noreferrer" className="inline-block text-lg font-bold px-10 py-4 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition shadow-md">
              デモ版を開く（ログイン不要）
            </a>
            <p className="text-xs text-gray-500 mt-3">ボタンを押すと自動でデモアカウントにログインします・スマホ/PC両対応</p>
          </div>
        </div>
      </section>

      {/* セクション5: 他システムとの連携 */}
      <section className="py-16 max-w-5xl mx-auto px-6">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-4">他システムとの連携</h2>
        <p className="text-center text-gray-500 mb-10">単体でも使える。連携すればさらに強力に。</p>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6">
            <h3 className="font-bold text-gray-900 mb-2">カラダマップと連携</h3>
            <p className="text-gray-600 text-sm leading-relaxed">検査記録が自動で患者カルテに紐付け。来院履歴・LTV・リピート分析と連携し、経営数字との一元管理が可能です。</p>
          </div>
          <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6">
            <h3 className="font-bold text-gray-900 mb-2">WEB問診と連携</h3>
            <p className="text-gray-600 text-sm leading-relaxed">来院前の問診情報が自動で患者カルテに反映。初診から主訴・既往歴が揃った状態で施術に入れます。</p>
          </div>
          <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6">
            <h3 className="font-bold text-gray-900 mb-2">予約管理と連携</h3>
            <p className="text-gray-600 text-sm leading-relaxed">予約と来院履歴を自動連動。稼働率・時間帯別分析にも来院データが活きてきます。</p>
          </div>
        </div>
        <p className="text-center mt-8 text-sm text-gray-400">連携は後から追加可能。まずはClinic Core単体でお使いいただけます。</p>
      </section>

      {/* セクション6: 他サービスとの比較（匿名・費用/初期/機能の3軸） */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-4">他サービスとの比較</h2>
          <p className="text-center text-gray-500 mb-10">費用・初期費用・できることの3軸でClinic Coreの違いを整理</p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-blue-600 text-white">
                  <th className="text-left p-4 rounded-tl-xl">比較項目</th>
                  <th className="p-4 text-center">治療院向け<br/>顧客管理SaaS<br/><span className="text-xs font-normal opacity-80">(他社A)</span></th>
                  <th className="p-4 text-center">業務管理型<br/>SaaS<br/><span className="text-xs font-normal opacity-80">(他社B)</span></th>
                  <th className="p-4 text-center">Excel<br/>管理</th>
                  <th className="p-4 text-center rounded-tr-xl font-bold">Clinic Core</th>
                </tr>
              </thead>
              <tbody>
                {/* 1. 費用（ランニングコスト） */}
                <tr className="bg-blue-50">
                  <td colSpan={5} className="px-4 py-2 text-xs font-bold text-blue-700">1. 費用（ランニングコスト）</td>
                </tr>
                {[
                  ["月額料金", "非公開（要問合せ）", "非公開（要問合せ）", "0円", "5,500円"],
                  ["最低契約期間", "1年〜（個別契約）", "1年〜（個別契約）", "なし", "6ヶ月"],
                ].map(([item, a, b, excel, core], i) => (
                  <tr key={`cost-${i}`} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                    <td className="p-4 font-medium text-gray-700">{item}</td>
                    <td className="p-4 text-center text-gray-500">{a}</td>
                    <td className="p-4 text-center text-gray-500">{b}</td>
                    <td className="p-4 text-center text-gray-500">{excel}</td>
                    <td className="p-4 text-center font-bold text-blue-600">{core}</td>
                  </tr>
                ))}

                {/* 2. 初期費用 */}
                <tr className="bg-blue-50">
                  <td colSpan={5} className="px-4 py-2 text-xs font-bold text-blue-700">2. 初期費用</td>
                </tr>
                {[
                  ["導入費用", "数十万円〜", "数十万円〜", "0円", "モニター0円 / 通常33,000円"],
                  ["データ移行サポート", "別料金", "別料金", "なし", "CSV取込・代行対応"],
                ].map(([item, a, b, excel, core], i) => (
                  <tr key={`init-${i}`} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                    <td className="p-4 font-medium text-gray-700">{item}</td>
                    <td className="p-4 text-center text-gray-500">{a}</td>
                    <td className="p-4 text-center text-gray-500">{b}</td>
                    <td className="p-4 text-center text-gray-500">{excel}</td>
                    <td className="p-4 text-center font-bold text-blue-600">{core}</td>
                  </tr>
                ))}

                {/* 3. できること（機能面） */}
                <tr className="bg-blue-50">
                  <td colSpan={5} className="px-4 py-2 text-xs font-bold text-blue-700">3. できること（機能面）</td>
                </tr>
                {[
                  ["LTV・ROAS・CPA自動計算", "---", "△", "---", "●"],
                  ["純新規売上 / 既存売上分析", "---", "---", "---", "●"],
                  ["エリア×媒体クロス分析", "---", "---", "---", "●"],
                  ["年代別クロス集計", "---", "△", "---", "●"],
                  ["リピート率（2〜10回別）", "△", "△", "---", "●"],
                  ["離反アラート（カスタマイズ可）", "---", "---", "---", "●"],
                  ["AI経営アドバイス", "---", "---", "---", "●"],
                  ["売上シミュレーター", "---", "---", "---", "●"],
                  ["来院一括入力（音声・テキスト）", "---", "---", "---", "●"],
                  ["はがきDM宛名印刷・CSV出力", "△", "●", "---", "●"],
                  ["スマホ・PC両対応", "△", "△", "---", "●"],
                  ["治療院経営者が開発・自院で日次運用", "---", "---", "---", "●"],
                ].map(([item, a, b, excel, core], i) => (
                  <tr key={`func-${i}`} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                    <td className="p-4 font-medium text-gray-700">{item}</td>
                    <td className="p-4 text-center text-gray-500">{a}</td>
                    <td className="p-4 text-center text-gray-500">{b}</td>
                    <td className="p-4 text-center text-gray-500">{excel}</td>
                    <td className="p-4 text-center font-bold text-blue-600">{core}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-400 mt-4 leading-relaxed">※ 他社A / 他社Bは特定サービスを指すものではなく、市場で多く見られる代表的なタイプを比較のために設定しています。料金条件は公開状況・時期によって変動するため、各社の正確な情報は提供元にご確認ください。</p>
        </div>
      </section>

      {/* セクション7: 選ばれる3つの理由 */}
      <section className="py-16 max-w-5xl mx-auto px-6">
        <p className="text-center text-sm font-medium text-blue-600 uppercase tracking-widest mb-3">Why Clinic Core</p>
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-12">選ばれる3つの理由</h2>
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
            <div key={item.num} className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <span className="text-5xl font-black block mb-4 text-blue-100">{item.num}</span>
              <h3 className="font-bold text-lg mb-3 whitespace-pre-line text-gray-900">{item.title}</h3>
              <p className="text-sm leading-relaxed text-gray-600">{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* セクション8: 導入事例 */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-5xl mx-auto px-6">
          <p className="text-center text-sm font-medium text-blue-600 uppercase tracking-widest mb-3">Case Study</p>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-12">導入事例</h2>
          <div className="max-w-2xl mx-auto space-y-6">
            {[
              {
                name: "山口先生",
                clinic: "やまぐち鍼灸接骨院",
                background: "以前は別の顧客管理システムを使っていたが、打ち込みが面倒で負担になっていた。Clinic Coreに乗り換えて変わったこと：",
                points: [
                  "AIが離反しそうな方やリピート率、前月比を自動計算して常に表示",
                  "音声による一括入力でめちゃくちゃ時短",
                  "過去のデータも移行できた",
                ],
                quote: "顧客管理に手間がかかると感じている方や、数字をすぐに把握したい先生におすすめです。",
              },
            ].map((caseItem) => (
              <div key={caseItem.name} className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-full bg-blue-600 flex items-center justify-center text-white text-xl font-bold flex-shrink-0">
                    {caseItem.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-bold text-lg text-gray-900">{caseItem.name}</p>
                    <p className="text-sm text-gray-500">{caseItem.clinic}</p>
                  </div>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">{caseItem.background}</p>
                <ul className="space-y-2 mb-6">
                  {caseItem.points.map((point) => (
                    <li key={point} className="flex items-start gap-2 text-sm text-gray-700">
                      <span className="text-blue-500 flex-shrink-0 mt-0.5">&#x2713;</span>
                      {point}
                    </li>
                  ))}
                </ul>
                <div className="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4">
                  <p className="text-gray-700 text-sm leading-relaxed italic">&ldquo;{caseItem.quote}&rdquo;</p>
                </div>
              </div>
            ))}

            {/* 今後追加予定のテーザー */}
            <div className="bg-gradient-to-br from-blue-50 to-emerald-50 border-2 border-dashed border-blue-200 rounded-2xl p-8 text-center">
              <p className="text-sm font-medium text-blue-600 uppercase tracking-widest mb-2">More Coming Soon</p>
              <p className="font-bold text-gray-900 mb-2">他にも続々と導入院が増えています</p>
              <p className="text-sm text-gray-600 leading-relaxed">
                整体院・鍼灸接骨院・整骨院など、現在モニターご利用中の先生方のインタビュー記事を順次公開予定です。<br />
                掲載をお待ちください。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* セクション9: 料金プラン */}
      <section className="bg-gray-50 py-16" id="pricing">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-4">料金プラン</h2>
          <p className="text-center text-gray-500 mb-12">モニター募集中は初期費用0円でご利用いただけます</p>
          <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {/* 通常プラン */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
              <p className="text-sm font-bold text-gray-500 mb-2">通常プラン</p>
              <p className="text-4xl font-bold text-gray-900 mb-1">5,500<span className="text-lg font-normal text-gray-500">円/月</span></p>
              <p className="text-sm text-gray-500 mb-6">初期費用 33,000円（税込）</p>
              <ul className="space-y-3 text-sm text-gray-600">
                {[
                  "全機能利用可能",
                  "患者数無制限",
                  "LTV・ROAS・CPA自動計算",
                  "リピート分析・離反アラート",
                  "エリア×媒体クロス分析",
                  "CSV取込・出力",
                  "LINEサポート付き",
                ].map((t) => (
                  <li key={t} className="flex items-start gap-2">
                    <span className="text-blue-500 flex-shrink-0">✓</span>{t}
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <PurchaseButton href={STRIPE_NORMAL_URL} label="通常プランで始める" variant="secondary" className="w-full" />
              </div>
            </div>
            {/* モニタープラン */}
            <div className="bg-blue-600 rounded-2xl p-8 shadow-lg text-white relative">
              <span className="absolute top-4 right-4 bg-yellow-400 text-yellow-900 text-xs font-bold px-3 py-1 rounded-full">5名限定</span>
              <p className="text-sm font-bold text-blue-200 mb-2">モニタープラン</p>
              <p className="text-4xl font-bold mb-1">5,500<span className="text-lg font-normal text-blue-200">円/月</span></p>
              <p className="text-sm text-blue-200 mb-1">初期費用 <span className="line-through">33,000円</span></p>
              <p className="text-lg font-bold text-yellow-300 mb-6">→ 初期費用 0円</p>
              <ul className="space-y-3 text-sm text-blue-100">
                {[
                  "通常プランの全機能",
                  "初期費用0円（33,000円OFF）",
                  "患者数無制限",
                  "カラダマップ連携対応",
                  "WEB問診連携対応",
                  "優先サポート",
                  "導入セットアップ無料",
                ].map((t) => (
                  <li key={t} className="flex items-start gap-2">
                    <span className="text-yellow-300 flex-shrink-0">✓</span>{t}
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <PurchaseButton href={STRIPE_MONITOR_URL} label="モニター価格で始める →" variant="primary" onDark className="w-full" />
              </div>
            </div>
          </div>
          <p className="text-center mt-6 text-sm text-gray-400">全て税込表示です。最低契約期間：6ヶ月。6ヶ月未満で解約された場合、残存月数分の早期解約金を申し受けます。</p>
        </div>
      </section>

      {/* セクション9: よくある質問 */}
      <section className="py-16 max-w-5xl mx-auto px-6">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-12">よくある質問</h2>
        <div className="space-y-6 max-w-2xl mx-auto">
          {[
            { q: "モニターは何をすればいいですか？", a: "通常通り院でお使いいただいた上で、改善のためのフィードバックにご協力いただきます。具体的には、(1) 使いにくい点・改善要望をLINEでお知らせいただく、(2) 1〜3ヶ月ご利用後にインタビュー（オンライン30分程度）に応じていただく、(3) 使ってみた感想を文章・写真等でいただく、の3点です。インタビュー内容や感想はLP・SNS等で導入事例として掲載させていただく場合があります（事前確認あり）。" },
            { q: "モニター期間が終わったらどうなりますか？", a: "モニター期間終了後も月額5,500円のまま継続いただけます。通常の初期費用33,000円が免除された状態がずっと続きます。" },
            { q: "既存データは移行できますか？", a: "CSVインポートに対応しています。ただし現在お使いのシステムによって移行できる範囲が異なります。まずはLINEでご相談ください。" },
            { q: "最低契約期間はありますか？", a: "6ヶ月の最低契約期間があります。6ヶ月経過後はいつでも解約可能です。" },
            { q: "サポートはどのように受けられますか？", a: "LINEにて個別サポートを行っています。初期設定から操作方法まで丁寧に対応します。" },
          ].map(({ q, a }) => (
            <div key={q} className="border border-gray-100 rounded-2xl p-6 bg-white shadow-sm">
              <p className="font-bold text-gray-900 mb-2">Q. {q}</p>
              <p className="text-gray-600 text-sm leading-relaxed">A. {a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-blue-600 py-16 text-white text-center">
        <div className="max-w-5xl mx-auto px-6">
          <span className="inline-block bg-white/20 text-white text-xs font-bold px-4 py-1.5 rounded-full mb-4">モニター5名限定 / 初期費用0円</span>
          <h2 className="text-2xl md:text-4xl font-bold mb-4">数字を見る院だけが、生き残る。</h2>
          <p className="text-blue-100 mb-8">月額5,500円で、治療院経営に必要な数字が全て手に入る。<br />モニター期間中は初期費用0円。</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center flex-wrap">
            <a href={STRIPE_MONITOR_URL} target="_blank" rel="noopener noreferrer" className="bg-white text-blue-600 font-bold text-lg px-10 py-4 rounded-xl hover:bg-blue-50 transition shadow">モニター価格で始める →</a>
            <a href={DEMO_URL} target="_blank" rel="noopener noreferrer" className="bg-blue-700 text-white font-bold text-lg px-10 py-4 rounded-xl hover:bg-blue-800 transition border-2 border-white/40">デモアプリを試す</a>
            <a href={LINE_URL} target="_blank" rel="noopener noreferrer" className="border-2 border-white text-white font-bold text-lg px-10 py-4 rounded-xl hover:bg-blue-700 transition">LINEで相談する</a>
          </div>
        </div>
      </section>

      {/* フッター */}
      <footer className="border-t border-gray-100 py-8 text-center text-sm text-gray-400">
        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/">ClinicApps</Link>
          <span>|</span>
          <Link href="/legal/privacy">プライバシーポリシー</Link>
          <span>|</span>
          <Link href="/legal/terms">利用規約</Link>
          <span>|</span>
          <Link href="/legal/tokushoho">特定商取引法</Link>
        </div>
        <p className="mt-4">&copy; 2025 Clinic Core</p>
      </footer>
    </main>
  );
}
