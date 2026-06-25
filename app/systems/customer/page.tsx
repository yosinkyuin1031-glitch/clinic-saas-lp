import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import PurchaseButton from "../../components/PurchaseButton";
import { getAppVoices } from "../../lib/testimonials";
import { VoiceCardDetail } from "../_components/VoiceCard";
import { SystemHubNavigation } from "../_components/SystemHubNavigation";
import { IndustryUseCaseSection } from "../_components/IndustryUseCaseSection";

// 業種別ユースケース（整体院 / 鍼灸院 / 接骨院 / サロン それぞれの数字活用例）
const INDUSTRY_USE_CASES = [
  {
    industry: "seitai" as const,
    body: "LTVとリピート率を症状別に分析。「自律神経系の患者はLTVが高いが、腰痛単発はリピートしない」が数字で見える。広告予算の配分が変わる。",
  },
  {
    industry: "shinkyu" as const,
    body: "保険診療と保険外メニューの売上をそれぞれ集計。「保険外サブスクの加入率」「自費メニューのLTV寄与」を可視化し、収益構造の改善ポイントが見える。",
  },
  {
    industry: "sekkotsu" as const,
    body: "保険診療＋自費メニューの混在を一元管理。スタッフ別売上・部位別来院数を可視化し、若手の指導や柔整師のシフト最適化に活用できる。",
  },
  {
    industry: "salon" as const,
    body: "回数券・サブスクメニューの管理に対応。メニュー別LTV・指名スタッフ別の売上比率を見て、リピート設計とメニュー改廃の根拠に。",
  },
];

export const metadata: Metadata = {
  title: "Clinic Core（クリニックコア）| 治療院専用 顧客管理・経営分析システム",
  description: "LTV・ROAS・リピート率・エリア分布。治療院経営に必要な数字が全部見える。月額5,500円・初期費用0円。",
  openGraph: {
    title: "Clinic Core | 治療院の経営を、数字で動かせ。",
    description: "月額5,500円・初期費用0円で、LTV・ROAS・リピート率が全部見える。",
    type: "website",
    url: "https://clinic-saas-lp.vercel.app/systems/customer",
  },
};

// TODO: 新Payment Link（月額5,500円・初期費用0円・通常販売）を陽平が作成し次第、STRIPE_URLを差し替え。
// 現状は旧モニター用URL（月額5,500円・初期費用0円）が条件に近いので暫定使用。
const STRIPE_URL = "https://buy.stripe.com/5kQbJ0dMUexydE8a5308g07";
const LINE_URL = "https://lin.ee/qvChhK3";
const DEMO_URL = "https://clinic-core-demo.vercel.app";

export default function CustomerPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* LINEフローティングボタン（全画面常時表示） */}
      <a
        href={LINE_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-5 right-5 z-50 inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-bold text-sm px-4 py-3 rounded-full shadow-2xl transition-all hover:scale-105 active:scale-95"
        aria-label="LINEで相談する"
      >
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314"/>
        </svg>
        <span className="hidden sm:inline">LINEで相談</span>
      </a>

      {/* ヘッダー */}
      <header className="border-b border-gray-100 px-6 py-4 flex items-center justify-between max-w-5xl mx-auto">
        <Link href="/" className="text-sm text-gray-500 hover:text-gray-700">← ClinicApps トップ</Link>
        <a href={LINE_URL} target="_blank" rel="noopener noreferrer" className="text-sm bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600 transition">LINEで相談する</a>
      </header>

      {/* セクション1: ヒーロー */}
      <section className="max-w-6xl mx-auto px-6 pt-16 pb-24 md:pt-20 md:pb-32">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* 左: テキスト・CTA */}
          <div className="text-center lg:text-left">
            <span className="inline-block bg-yellow-100 text-yellow-800 text-xs font-bold px-4 py-1.5 rounded-full mb-4">看板商品</span>
            <p className="text-sm font-medium text-blue-600 tracking-widest uppercase mb-3">治療院専用 顧客管理・経営分析システム</p>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-6">
              治療院の経営を、<br />
              <span className="text-blue-600">数字で動かせ。</span>
            </h1>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              LTV・ROAS・純新規売上・リピート率・エリア分析。<br />
              経営に必要な数字が、全部見える。月額5,500円・初期費用0円。
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start flex-wrap">
              <a href={STRIPE_URL} target="_blank" rel="noopener noreferrer" className="inline-block bg-blue-600 text-white text-base font-bold px-8 py-4 rounded-xl hover:bg-blue-700 transition shadow-md">今すぐ始める →</a>
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
                    <p>・<span className="font-medium text-gray-800">大口神経整体院</span> 院長（大阪市住吉区）</p>
                    <p>・<span className="font-medium text-gray-800">晴陽鍼灸院</span> 経営（訪問鍼灸リハビリ事業）</p>
                    <p>・施術歴10年・2021年開業／一人治療院で最高月商429万円達成</p>
                    <p>・治療家向けアプリを50本以上開発</p>
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
          <p className="text-center text-gray-500 mb-10">治療院経営に必要な12の機能 + 14種の分析メニュー</p>

          {/* 営業データ機能網羅バナー */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden mb-12">
            <div className="p-6 md:p-8 bg-gradient-to-br from-blue-50 to-indigo-50 border-b border-gray-200">
              <p className="text-xs font-bold text-blue-600 tracking-widest uppercase mb-2">All-in-One Analytics</p>
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">これだけの分析機能を、ボタン1つで切り替えて使える</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                売上集計 / 伝票一覧 / LTV分析 / リピート分析 / 新規・既存分析 / ROAS分析 / 時間単価 /
                稼働率 / クロス集計 / エリア分析 / 広告費入力 / 売上シミュレーター / スタッフ別売上 / 日報 —
                経営判断に必要な数字が、すべて1画面から見える。
              </p>
            </div>
            <div className="border-t border-gray-100">
              <Image src="/screens/clinic-core/sales.png" alt="Clinic Core 営業データ機能一覧" width={1440} height={900} className="w-full h-auto" />
            </div>
          </div>
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

      {/* セクション4.4: 動く操作デモ */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-center text-sm font-medium text-blue-600 uppercase tracking-widest mb-3">Live Action</p>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-4">使ってる感じを、動画で見る</h2>
          <p className="text-center text-gray-600 mb-10 leading-relaxed">
            ホーム → 顧客管理 → 予約管理 → 営業データ → 月間統計 → マスター。<br className="hidden md:block" />
            すべてのタブを実際に操作した動画です。
          </p>

          <div className="rounded-2xl overflow-hidden border border-gray-200 shadow-xl bg-black max-w-4xl mx-auto">
            <video
              src="/screens/clinic-core/videos/clinic-core-demo.webm"
              autoPlay
              loop
              muted
              playsInline
              controls
              className="w-full aspect-[16/10] object-contain bg-black"
            />
          </div>
          <p className="text-center text-xs text-gray-400 mt-6">※ 動画はデモ整骨院アカウントの実画面を録画したものです（音声なし）</p>
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

      {/* セクション4.7: 業種別ユースケース */}
      <section className="bg-gray-50">
        <IndustryUseCaseSection useCases={INDUSTRY_USE_CASES} appName="Clinic Core" />
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
                  ["導入費用", "数十万円〜", "数十万円〜", "0円", "0円"],
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
      {(() => {
        const voices = getAppVoices("customer");
        return (
          <section className="bg-gray-50 py-16">
            <div className="max-w-5xl mx-auto px-6">
              <p className="text-center text-sm font-medium text-blue-600 uppercase tracking-widest mb-3">Case Study</p>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-12">導入事例</h2>
              <div className="max-w-2xl mx-auto space-y-6">
                {voices.map((t) => (
                  <VoiceCardDetail key={t.id} t={t} />
                ))}

                <div className="bg-gradient-to-br from-blue-50 to-emerald-50 border-2 border-dashed border-blue-200 rounded-2xl p-8 text-center">
                  <p className="text-sm font-medium text-blue-600 uppercase tracking-widest mb-2">More Coming Soon</p>
                  <p className="font-bold text-gray-900 mb-2">他にも続々と導入院が増えています</p>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    整体院・鍼灸院・接骨院・サロンなど、現在ご利用中の先生方のインタビュー記事を順次公開予定です。<br />
                    掲載をお待ちください。
                  </p>
                </div>
              </div>
            </div>
          </section>
        );
      })()}

      {/* セクション8.4: AI活用（Claude採用） */}
      <section className="py-16 bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900 text-white">
        <div className="max-w-5xl mx-auto px-6">
          <p className="text-center text-sm font-medium text-blue-300 uppercase tracking-widest mb-3">Powered by AI</p>
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-4">最先端AI「Claude」が、あなたの院の数字を読み解く</h2>
          <p className="text-center text-gray-300 mb-12 leading-relaxed text-sm md:text-base">
            Clinic Coreは、世界最高水準のAI <span className="font-bold text-white">Anthropic社「Claude」</span> を採用。<br/>
            数字を見せるだけでなく、AIが院の状態を読み解いて次の一手を示します。
          </p>

          <div className="grid md:grid-cols-2 gap-5 mb-10">
            {[
              {
                icon: "🧠",
                title: "AI経営アドバイス",
                body: "売上・リピート率・離反指標・季節性をClaudeが総合分析。「先月と比べて何が起きていて、何をすべきか」を日本語で要約。",
              },
              {
                icon: "⚠️",
                title: "離反予兆 早期検知",
                body: "「来なくなりそう」を、過去パターンから先読み。気づいた時にはもう遅い、を防ぐ。",
              },
              {
                icon: "📈",
                title: "売上シミュレーター",
                body: "月商目標から、必要な患者数・単価・リピート率を逆算。値上げや稼働率改善のシナリオ比較も可能。",
              },
              {
                icon: "🎤",
                title: "音声・テキスト一括入力",
                body: "閉院後に1日分の伝票を音声で話すだけ。AIが解析して、スタッフ・金種・メニューを自動振り分け。",
              },
            ].map((f) => (
              <div key={f.title} className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-6">
                <div className="text-3xl mb-3">{f.icon}</div>
                <h3 className="font-bold text-base mb-2">{f.title}</h3>
                <p className="text-sm text-gray-300 leading-relaxed">{f.body}</p>
              </div>
            ))}
          </div>

          <div className="max-w-3xl mx-auto bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-6 text-center">
            <p className="text-xs text-blue-300 uppercase tracking-widest font-bold mb-2">Why Claude</p>
            <p className="text-sm text-gray-300 leading-relaxed">
              Claude（クロード）は、米Anthropic社が開発する大規模言語AI。<br className="hidden md:inline"/>
              安全性と日本語の理解力に定評があり、世界中の企業・開発者から採用されている最先端モデルです。
            </p>
          </div>
        </div>
      </section>

      {/* セクション8.5: セキュリティ・データ保護 */}
      <section className="py-16 max-w-5xl mx-auto px-6">
        <p className="text-center text-sm font-medium text-blue-600 uppercase tracking-widest mb-3">Security</p>
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-4">患者情報を、安心して任せられる仕組み</h2>
        <p className="text-center text-gray-500 mb-12 leading-relaxed">治療院は個人情報を扱う立場。Clinic Coreは大手SaaSと同等の基盤・運用で守ります。</p>

        <div className="grid md:grid-cols-3 gap-5">
          {[
            {
              icon: "🛡️",
              title: "AWS東京リージョン基盤",
              body: "データは Supabase（AWS東京リージョン）の堅牢なクラウドで保管。物理サーバの管理は不要、災害・物損リスクなし。",
            },
            {
              icon: "🔒",
              title: "通信は全てSSL/TLS暗号化",
              body: "ログイン・データ送受信は全てHTTPS。第三者からの盗聴・改ざんを防ぎます。",
            },
            {
              icon: "🚪",
              title: "院ごとに完全データ分離",
              body: "RLS（Row Level Security）で院ID単位にアクセス制御。他院のデータが見える事故が構造的に起きません。",
            },
            {
              icon: "💾",
              title: "日次自動バックアップ",
              body: "毎日のスナップショットを自動保存。万一の操作ミス・障害でも復旧可能。バックアップ作業は不要。",
            },
            {
              icon: "🔑",
              title: "アカウント認証",
              body: "Supabase Authによるメール+パスワード認証。スタッフごとの権限管理にも対応予定。",
            },
            {
              icon: "📜",
              title: "個人情報保護法準拠",
              body: "プライバシーポリシーを公開。解約時のデータ削除依頼にも応じます（30日以内に完全削除）。",
            },
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
            <span className="font-bold text-gray-900">運営：株式会社IDOMI（代表：大口陽平）</span><br/>
            治療院経営者が自院（大口神経整体院）で毎日使うシステムです。<br/>
            自分自身の患者情報も同じ基盤で守っているという責任で運営しています。
          </p>
        </div>
      </section>

      {/* セクション9: 料金プラン */}
      <section className="bg-gray-50 py-16" id="pricing">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-4">料金プラン</h2>
          <p className="text-center text-gray-500 mb-12">月額5,500円・初期費用0円・最低契約6ヶ月。シンプルな1プラン構成です。</p>
          <div className="max-w-lg mx-auto">
            <div className="bg-blue-600 rounded-2xl p-8 shadow-lg text-white relative">
              <span className="absolute top-4 right-4 bg-yellow-400 text-yellow-900 text-xs font-bold px-3 py-1 rounded-full">看板商品</span>
              <p className="text-sm font-bold text-blue-200 mb-2">通常プラン</p>
              <p className="text-4xl font-bold mb-1">5,500<span className="text-lg font-normal text-blue-200">円/月</span></p>
              <p className="text-sm text-blue-200 mb-6">初期費用 0円（税込）</p>
              <ul className="space-y-3 text-sm text-blue-100">
                {[
                  "全機能利用可能",
                  "患者数無制限",
                  "LTV・ROAS・CPA自動計算",
                  "リピート分析・離反アラート",
                  "エリア×媒体クロス分析",
                  "カラダマップ／WEB問診連携対応",
                  "CSV取込・出力",
                  "LINEサポート付き",
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

      {/* セクション9.5: 導入の流れ */}
      <section className="py-16 max-w-5xl mx-auto px-6">
        <p className="text-center text-sm font-medium text-blue-600 uppercase tracking-widest mb-3">How it works</p>
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-4">導入は4ステップ・最短即日でスタート</h2>
        <p className="text-center text-gray-500 mb-12 leading-relaxed">面倒な手続きはありません。LINEでひと声いただければ、こちらでフォローしながら進めます。</p>

        <div className="grid md:grid-cols-4 gap-4 md:gap-6">
          {[
            {
              step: "01",
              title: "申込・決済",
              desc: "LP内のボタンから1分でStripe決済。クレジットカード対応。",
              detail: "1分",
            },
            {
              step: "02",
              title: "アカウント自動発行",
              desc: "決済完了と同時に、メールでログインURL・ID・初期パスワードが届きます。",
              detail: "数秒〜数分",
            },
            {
              step: "03",
              title: "データ移行（任意）",
              desc: "既存患者データのCSVがあれば取込。データが無くてもそのまま使い始められます。代行も対応。",
              detail: "0〜数日",
            },
            {
              step: "04",
              title: "使い始める",
              desc: "ログインしてホーム画面へ。スタッフ・メニュー・症状などのマスター設定を済ませたら、日々の入力で数字が自動で見える状態に。",
              detail: "当日〜",
            },
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
          <p className="text-xs text-gray-600 leading-relaxed mb-4">「うちの院に合うか分からない」「こんなデータでも移行できる？」など、申込前のご相談を歓迎しています。</p>
          <a href={LINE_URL} target="_blank" rel="noopener noreferrer" className="inline-block bg-green-500 text-white font-bold text-sm px-6 py-3 rounded-xl hover:bg-green-600 transition shadow">
            LINEで相談する（無料）
          </a>
        </div>
      </section>

      {/* セクション9: よくある質問 */}
      <section className="py-16 max-w-5xl mx-auto px-6">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-12">よくある質問</h2>
        <div className="space-y-6 max-w-2xl mx-auto">
          {[
            { q: "途中で機能が変わったり料金が上がることはありますか？", a: "ご契約時の月額5,500円・初期費用0円の条件は、契約継続中は変わりません。新機能のリリース時も追加課金はありません。" },
            { q: "既存データは移行できますか？", a: "CSV取り込みに対応しています。元の顧客管理ツール（囲い込み職人・カルテco・他SaaSなど）から、患者リスト・来院履歴を一括移行できます。移行作業は無料で代行しますので、お申し付けください。" },
            { q: "最低契約期間はありますか？", a: "6ヶ月の最低契約期間があります。6ヶ月経過後はいつでも解約可能です。" },
            { q: "サポートはどのように受けられますか？", a: "LINEにて個別サポートを行っています。初期設定から操作方法まで丁寧に対応します。" },
            { q: "経営の数字が苦手な私でも使えますか？", a: "はい。LTV・ROAS・CPA などの専門用語は、画面上に身近な言葉での補足を表示します（例：「LTV = 1人の患者さんが累計でいくら使ったか」）。最初は「ホーム画面の今月の売上」だけ見ていれば十分です。慣れたら徐々に他の数字も見るようになります。" },
            { q: "一人治療院でも使えますか？スタッフ数人の院でも使えますか？", a: "どちらも対応しています。一人院では「スタッフ管理」をオフに、複数スタッフ院ではスタッフ別売上・指名率・日報まで全機能を使えます。院ごとに表示項目をカスタマイズ可能です。" },
            { q: "税理士や顧問と数字を共有できますか？", a: "はい。CSV出力機能で月次の売上・来院数・スタッフ別データを書き出して、税理士・コンサル・顧問先と共有できます。" },
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
          <span className="inline-block bg-white/20 text-white text-xs font-bold px-4 py-1.5 rounded-full mb-4">月額5,500円 / 初期費用0円</span>
          <h2 className="text-2xl md:text-4xl font-bold mb-4">数字を見る院だけが、生き残る。</h2>
          <p className="text-blue-100 mb-8">月額5,500円で、治療院経営に必要な数字が全て手に入る。<br />初期費用0円・最低契約6ヶ月。</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center flex-wrap">
            <a href={STRIPE_URL} target="_blank" rel="noopener noreferrer" className="bg-white text-blue-600 font-bold text-lg px-10 py-4 rounded-xl hover:bg-blue-50 transition shadow">今すぐ始める →</a>
            <a href={DEMO_URL} target="_blank" rel="noopener noreferrer" className="bg-blue-700 text-white font-bold text-lg px-10 py-4 rounded-xl hover:bg-blue-800 transition border-2 border-white/40">デモアプリを試す</a>
            <a href={LINE_URL} target="_blank" rel="noopener noreferrer" className="border-2 border-white text-white font-bold text-lg px-10 py-4 rounded-xl hover:bg-blue-700 transition">LINEで相談する</a>
          </div>
        </div>
      </section>

      {/* 事業者情報 */}
      <section className="bg-gray-50 py-12 border-t border-gray-100">
        <div className="max-w-3xl mx-auto px-6">
          <p className="text-center text-xs text-gray-400 uppercase tracking-widest mb-4">Business Information</p>
          <h3 className="text-center text-base font-bold text-gray-800 mb-6">事業者情報</h3>
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 md:p-8">
            <dl className="text-sm divide-y divide-gray-100">
              <div className="flex flex-col md:flex-row gap-1 md:gap-6 py-3">
                <dt className="md:w-36 text-gray-500 shrink-0">法人名</dt>
                <dd className="font-bold text-gray-900">株式会社IDOMI</dd>
              </div>
              <div className="flex flex-col md:flex-row gap-1 md:gap-6 py-3">
                <dt className="md:w-36 text-gray-500 shrink-0">代表者</dt>
                <dd className="text-gray-800">大口 陽平</dd>
              </div>
              <div className="flex flex-col md:flex-row gap-1 md:gap-6 py-3">
                <dt className="md:w-36 text-gray-500 shrink-0">事業内容</dt>
                <dd className="text-gray-800">治療院向けアプリ・SaaSの開発・販売、コンサルティング</dd>
              </div>
              <div className="flex flex-col md:flex-row gap-1 md:gap-6 py-3">
                <dt className="md:w-36 text-gray-500 shrink-0">お問い合わせ</dt>
                <dd>
                  <a href={LINE_URL} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline hover:text-blue-700">公式LINE</a>
                  <span className="text-gray-400 mx-2">/</span>
                  <a href="mailto:yosinkyuin1031@gmail.com" className="text-blue-600 underline hover:text-blue-700">メール</a>
                </dd>
              </div>
              <div className="flex flex-col md:flex-row gap-1 md:gap-6 py-3">
                <dt className="md:w-36 text-gray-500 shrink-0">詳細</dt>
                <dd className="text-xs text-gray-600 leading-relaxed">
                  販売条件・特定商取引法に基づく表記の詳細は
                  <Link href="/legal/tokushoho" className="text-blue-600 underline mx-1">こちら</Link>
                  をご確認ください。
                </dd>
              </div>
            </dl>
          </div>
          <p className="text-center text-xs text-gray-400 mt-5 leading-relaxed">
            治療院経営者が、自院（大口神経整体院）で毎日使うシステムです。<br/>
            自分自身の患者情報も同じ基盤で守っている責任で運営しています。
          </p>
        </div>
      </section>

      <SystemHubNavigation currentAppId="customer" />

      {/* フッター */}
      <footer className="border-t border-gray-100 py-8 text-center text-sm text-gray-400">
        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/">ClinicMark 総合ページ</Link>
          <span>|</span>
          <Link href="/legal/privacy">プライバシーポリシー</Link>
          <span>|</span>
          <Link href="/legal/terms">利用規約</Link>
          <span>|</span>
          <Link href="/legal/tokushoho">特定商取引法</Link>
        </div>
        <p className="mt-4">&copy; 2025 ClinicMark / Clinic Core</p>
      </footer>
    </main>
  );
}
