"use client";
import Link from "next/link";
import { useState } from "react";
import PurchaseButton from "../../components/PurchaseButton";
import { LineFloatingButton } from "../_components/LineFloatingButton";
import { SystemHeader } from "../_components/SystemHeader";
import { IndustryUseCaseSection } from "../_components/IndustryUseCaseSection";
import { BusinessInfoFooter } from "../_components/BusinessInfoFooter";
import { SystemHubNavigation } from "../_components/SystemHubNavigation";
import { LINE_URL, DEVELOPER } from "../../lib/site-config";
import { getAppVoices } from "../../lib/testimonials";
import { VoiceCardDetail } from "../_components/VoiceCard";

const STRIPE_URL = "https://buy.stripe.com/00w28qgZ60GIeIc0ut08g0k";
const DEMO_URL = "https://kensa-sheet-app.vercel.app/demo";

const INDUSTRY_USE_CASES = [
  {
    industry: "seitai" as const,
    body: "5段階検査で原因部位を即特定。患者に説明根拠を渡せるから、納得感が圧倒的に上がる。",
  },
  {
    industry: "shinkyu" as const,
    body: "施術前後の左右差・歪みを数値で比較。配穴の効果検証に。経過記録もタップで完結。",
  },
  {
    industry: "sekkotsu" as const,
    body: "外傷だけでなく姿勢・歪みの根拠を可視化。保険外メニューへの提案根拠としても有効。",
  },
  {
    industry: "salon" as const,
    body: "ボディ調整・骨盤メニューの効果を数字とPDFで提示。リピート率と紹介率の向上に。",
  },
];

function KensaDemo() {
  const [step, setStep] = useState(1);
  const [nrs, setNrs] = useState<number | null>(null);
  const [standing, setStanding] = useState<Record<string, number>>({});
  const [seated, setSeated] = useState<Record<string, number>>({});
  const titles = ["患者情報", "立位検査", "座位検査", "診断結果", "ケア＆PDF"];
  const landmarks = ["乳様突起", "肩甲下角", "腸骨稜"];
  return (
    <div className="mx-auto max-w-[360px]">
      <p className="text-center text-xs text-gray-400 mb-2">▼ 実際に操作できるデモ</p>
      <div className="border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
        <div className="bg-blue-600 px-4 py-2.5 flex items-center justify-between">
          <span className="text-white text-sm font-medium">カラダマップ — {titles[step-1]}</span>
          <span className="text-xs bg-white/20 text-white px-2 py-0.5 rounded-full">Step {step}/5</span>
        </div>
        <div className="flex gap-0.5 bg-blue-700 px-3 pb-1.5 pt-1">
          {[1,2,3,4,5].map(s=><div key={s} className={`h-1 flex-1 rounded-full transition-all ${s<=step?"bg-white":"bg-white/25"}`}/>)}
        </div>
        <div className="bg-white p-4 min-h-[280px]">
          {step===1&&<div>
            <p className="text-xs text-gray-500 mb-3">基本情報と痛みレベルを入力</p>
            <div className="grid grid-cols-2 gap-2 mb-3">
              <div className="bg-blue-50 border border-blue-300 rounded-lg px-3 py-2 text-sm text-gray-700">山田 花子</div>
              <div className="bg-blue-50 border border-blue-300 rounded-lg px-3 py-2 text-sm text-gray-700">再診</div>
            </div>
            <div className="bg-blue-50 border border-blue-300 rounded-lg px-3 py-2 text-sm text-gray-700 mb-3">腰痛・左下肢のしびれ</div>
            <p className="text-xs text-gray-500 mb-2">痛みレベル（NRS 0〜10）</p>
            <div className="flex gap-1">
              {[0,1,2,3,4,5,6,7,8,9,10].map(n=><button key={n} onClick={()=>setNrs(n)} className={`flex-1 h-7 text-xs rounded transition-all ${nrs===n?"bg-blue-600 text-white":"bg-gray-50 border border-gray-200 text-gray-500"}`}>{n}</button>)}
            </div>
          </div>}
          {(step===2||step===3)&&<div>
            <p className="text-xs text-gray-500 mb-3">{step===2?"立った状態で各ランドマークの左右差を評価":"足が床につかない高さで座らせて再評価"}</p>
            {landmarks.map(lm=>{
              const st=step===2?standing:seated;
              const setter=step===2?setStanding:setSeated;
              return <div key={lm} className="bg-gray-50 rounded-xl p-3 mb-2">
                <p className="text-xs font-medium text-gray-700 mb-2">{lm}</p>
                <div className="grid grid-cols-3 gap-1">
                  {["左高","均等","右高"].map((label,i)=><button key={label} onClick={()=>setter(prev=>({...prev,[lm]:i}))} className={`h-8 text-xs rounded-lg transition-all ${st[lm]===i?"bg-blue-600 text-white":"bg-white border border-gray-200 text-gray-500"}`}>{label}</button>)}
                </div>
              </div>;
            })}
          </div>}
          {step===4&&<div>
            <p className="text-xs text-gray-500 mb-3">立位・座位の差異から原因部位を自動特定</p>
            <div className="bg-blue-50 border border-blue-300 rounded-xl p-3 mb-2">
              <p className="text-xs text-blue-600 mb-1">原因部位</p>
              <p className="text-lg font-medium text-blue-700">足部〜下肢</p>
              <p className="text-xs text-blue-600 mt-1">立位→座位で変化あり。足からの影響が主因。</p>
            </div>
            <div className="bg-green-50 border border-green-300 rounded-xl p-3 mb-2">
              <p className="text-xs text-green-600 mb-1">縮こまり部位</p>
              <p className="text-base font-medium text-green-700">左腸腰筋・左梨状筋</p>
              <p className="text-xs text-green-600 mt-1">腸骨稜の左高から推定</p>
            </div>
            <p className="text-xs text-gray-400 mt-2">NRS: {nrs??6}/10 → 改善ターゲット: 3以下</p>
          </div>}
          {step===5&&<div>
            <p className="text-xs text-gray-500 mb-3">AIが自動提案したセルフケアを患者に共有</p>
            {[{no:1,text:"大腰筋ストレッチ（仰臥位・片足引き寄せ）",tag:"縮こまり解除"},{no:2,text:"梨状筋リリース(座位・足組みストレッチ)",tag:"縮こまり解除"},{no:3,text:"重心バランス訓練(片脚立ち 30秒×3回)",tag:"再発予防"}].map(c=><div key={c.no} className="flex gap-2 py-2 border-b border-gray-100">
              <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs flex-shrink-0">{c.no}</div>
              <div><p className="text-xs text-gray-700 leading-relaxed">{c.text}</p><span className="inline-block text-xs bg-blue-50 text-blue-600 px-2 py-0.5 rounded mt-1">{c.tag}</span></div>
            </div>)}
            <div className="grid grid-cols-2 gap-2 mt-3">
              <div className="bg-blue-600 text-white text-center text-xs font-medium py-2.5 rounded-xl cursor-pointer">患者用PDF<br/><span className="opacity-75">説明用レポート</span></div>
              <div className="bg-gray-50 border border-gray-200 text-center text-xs py-2.5 rounded-xl cursor-pointer">施術者用PDF<br/><span className="text-gray-400">カルテ保存用</span></div>
            </div>
          </div>}
        </div>
        <div className="flex gap-2 px-4 py-3 border-t border-gray-100 bg-white">
          {step>1&&<button onClick={()=>setStep(s=>s-1)} className="px-4 py-2 text-sm text-gray-500 bg-gray-50 border border-gray-200 rounded-xl">← 戻る</button>}
          <button onClick={()=>setStep(s=>Math.min(5,s+1))} className="flex-1 py-2 text-sm font-medium bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition">{step<5?"次へ →":"完了 ✓"}</button>
        </div>
      </div>
    </div>
  );
}

export default function KensaPage() {
  return (
    <main className="min-h-screen bg-white">
      <LineFloatingButton />
      <SystemHeader />

      {/* ヒーロー（左右2カラム） */}
      <section className="max-w-6xl mx-auto px-6 pt-16 pb-24 md:pt-20 md:pb-32">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="text-center lg:text-left">
            <span className="inline-block bg-yellow-100 text-yellow-800 text-xs font-bold px-4 py-1.5 rounded-full mb-4">看板商品</span>
            <p className="text-sm font-medium text-blue-600 tracking-widest uppercase mb-3">治療院専用 段階的原因特定システム</p>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-6">
              検査結果を、<br />
              <span className="text-blue-600">患者と共有する。</span>
            </h1>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              5段階の検査ウィザードで原因部位を自動特定。<br />
              検査 → 診断 → セルフケア提案 → PDF出力まで全自動。
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start flex-wrap">
              <a href={STRIPE_URL} target="_blank" rel="noopener noreferrer" className="inline-block bg-blue-600 text-white text-base font-bold px-8 py-4 rounded-xl hover:bg-blue-700 transition shadow-md">今すぐ始める →</a>
              <a href={DEMO_URL} target="_blank" rel="noopener noreferrer" className="inline-block text-base font-bold px-8 py-4 rounded-xl transition border-2 border-gray-700 text-gray-700 hover:bg-gray-50">デモアプリを試す</a>
            </div>
            <p className="mt-4 text-sm text-gray-400">月額5,500円(税込)/ 初期費用0円 / 最低契約期間6ヶ月</p>
            <p className="mt-2 text-xs text-gray-400">
              購入時は <Link href="/legal/terms" className="underline">利用規約</Link>・<Link href="/legal/privacy" className="underline">プライバシーポリシー</Link>・<Link href="/legal/tokushoho" className="underline">特商法表記</Link> への同意が必要です。
            </p>
          </div>
          {/* 右: 実画面プレビュー */}
          <div className="relative">
            <div className="rounded-2xl overflow-hidden shadow-2xl border border-gray-200 bg-white">
              <img src="/screens/kensa/1-patient.png" alt="カラダマップ 患者情報画面" className="w-full h-auto" />
            </div>
            <div className="absolute -bottom-10 -right-3 md:-right-8 w-40 md:w-56 hidden sm:block">
              <div className="rounded-xl overflow-hidden shadow-2xl border-4 border-white">
                <img src="/screens/kensa/5-result.png" alt="カラダマップ 診断結果" className="w-full h-auto" />
              </div>
            </div>
            <div className="absolute -top-8 -left-3 md:-left-8 w-36 md:w-48 hidden sm:block">
              <div className="rounded-xl overflow-hidden shadow-xl border-4 border-white">
                <img src="/screens/kensa/2-standing.png" alt="カラダマップ 立位検査" className="w-full h-auto" />
              </div>
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
                src="/images/clinic/treatment-2.jpeg"
                alt="検査・施術の様子"
                width={220}
                height={220}
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
                <p>「ちゃんと検査をしているはずなのに、患者さんに伝わっていない気がする」</p>
                <p>口頭での説明だけでは、患者さんは「なんとなく良くなる気がする」で帰ってしまう。
                  検査結果を数字と図で見せて、原因部位を一緒に確認できれば――
                  納得感も、リピート率も、紹介率も、すべてが変わるはず。</p>
                <p className="font-medium text-lg text-gray-900">そう思って、自分で作りました。</p>
                <p>治療家の本業は、目の前の患者さんと、スタッフを育てる時間。
                  カラダマップは、その本業の質を引き上げる「説明根拠の自動生成ツール」です。</p>
                <p>大口神経整体院で毎日使いながら、検査ロジック・PDF出力・セルフケア提案を改善し続けています。</p>
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
            {title:"説明しても伝わっているか不安",body:"検査結果を口頭で伝えても、患者に本当に届いているか確認できない。「なんとなくわかった」で帰らせていませんか？"},
            {title:"施術の効果を数字で示せていない",body:"「良くなっていますよ」と言葉だけ。改善の経過を数値とグラフで見せられれば、患者の継続率は変わります。"},
            {title:"カルテ入力に時間がかかりすぎる",body:"施術後に手書きやPC入力。その時間があれば、もう一人診られる。タップだけで記録が完結します。"},
          ].map((item) => (
            <div key={item.title} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h3 className="font-bold text-gray-900 mb-3 text-lg">{item.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{item.body}</p>
            </div>
          ))}
        </div>
        <p className="text-center mt-10 text-gray-700 font-medium text-lg">検査で「根拠」を見せるだけで、全て解決します。</p>
      </section>

      {/* 搭載機能 */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-4">搭載機能</h2>
          <p className="text-center text-gray-500 mb-12">検査・診断・提案・記録・分析に必要な機能を全て搭載</p>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {icon:"🗺️",title:"5段階検査ウィザード",body:"患者情報 → 立位検査 → 座位検査 → 上半身検査 → 自動診断。タップ操作だけで検査が完結。"},
              {icon:"🎯",title:"段階的原因特定ロジック(業界唯一)",body:"立位→座位で足の影響、座位→上半身で上半身の影響を判定。原因部位を自動で絞り込む。"},
              {icon:"📄",title:"PDF出力(患者用・施術者用)",body:"患者に渡すレポートと施術者向けカルテの2種類を自動生成。院のロゴ・テーマカラーも反映。"},
              {icon:"🤖",title:"AIセルフケア自動提案",body:"診断結果に基づき、縮こまり・引っ張りの部位ごとに最適なセルフケアメニューを自動提案。"},
              {icon:"📈",title:"経過比較・改善度トラッキング",body:"過去の検査と並べて比較。患者の改善経過を数値と視覚で伝えられるから、リピート率が上がる。"},
              {icon:"📊",title:"ダッシュボード・統計分析",body:"月別検査数推移・患者数・TOP3診断をグラフ表示。院全体の傾向が一目でわかる。"},
            ].map(f=>(
              <div key={f.title} className="flex gap-4 p-6 bg-white border border-gray-100 rounded-2xl shadow-sm">
                <span className="text-3xl flex-shrink-0">{f.icon}</span>
                <div><h3 className="font-bold text-gray-900 mb-2">{f.title}</h3><p className="text-gray-600 text-sm leading-relaxed">{f.body}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 動画 */}
      <section className="bg-gray-900 py-14">
        <div className="max-w-3xl mx-auto px-6">
          <p className="text-center text-xs text-gray-400 uppercase tracking-widest mb-4">Live Action</p>
          <h2 className="text-2xl font-bold text-white text-center mb-8">使ってる感じを、動画で見る</h2>
          <div className="relative pb-[62.5%] h-0 rounded-2xl overflow-hidden shadow-2xl">
            <video
              src="/screens/kensa/videos/kensa-demo.webm"
              className="absolute inset-0 w-full h-full object-cover bg-black"
              controls
              autoPlay
              muted
              loop
              playsInline
            />
          </div>
          <p className="text-center text-gray-500 text-xs mt-4">※ 患者情報の入力から診断結果までを、実際のデモアプリで操作した動画です</p>
        </div>
      </section>

      {/* デモアプリ案内 */}
      <section className="py-16 bg-gradient-to-br from-blue-50 to-emerald-50">
        <div className="max-w-5xl mx-auto px-6">
          <p className="text-center text-sm font-medium text-blue-600 uppercase tracking-widest mb-3">Try It</p>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-4">デモアプリで全機能をそのまま試せます</h2>
          <p className="text-center text-gray-600 mb-10 leading-relaxed">
            ログイン不要。ブラウザでアクセスするだけで、Step1〜5の検査・診断・PDF出力をそのまま試せます。
          </p>
          <div className="max-w-2xl mx-auto bg-white rounded-2xl border border-gray-100 shadow-md p-8 text-center">
            <p className="text-sm text-gray-500 mb-2">デモアプリURL</p>
            <a href={DEMO_URL} target="_blank" rel="noopener noreferrer" className="block text-blue-600 font-bold text-base md:text-lg break-all hover:underline mb-6">
              {DEMO_URL}
            </a>
            <a href={DEMO_URL} target="_blank" rel="noopener noreferrer" className="inline-block bg-blue-600 text-white text-base font-bold px-8 py-3.5 rounded-xl hover:bg-blue-700 transition shadow">
              デモを開く →
            </a>
            <p className="text-xs text-gray-400 mt-6">※ デモ版はデータ保存ができません。製品版で全機能をご利用いただけます。</p>
          </div>
        </div>
      </section>

      {/* インタラクティブデモ */}
      <section className="py-16 max-w-5xl mx-auto px-6">
        <p className="text-center text-sm font-medium text-blue-600 uppercase tracking-widest mb-3">インタラクティブデモ</p>
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-3">この場でタップして試す</h2>
        <p className="text-center text-gray-500 mb-10">ボタンをタップしてStep 1〜5を体験できます</p>
        <KensaDemo />
      </section>

      {/* 業種別ユースケース */}
      <section className="bg-gray-50">
        <IndustryUseCaseSection useCases={INDUSTRY_USE_CASES} appName="カラダマップ" />
      </section>

      {/* 他システム連携 */}
      <section className="py-16 max-w-5xl mx-auto px-6">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-4">他システムとの連携</h2>
        <p className="text-center text-gray-500 mb-10">単体でも使える。連携すればさらに強力に。</p>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6"><h3 className="font-bold text-gray-900 mb-2">Clinic Coreと連携</h3><p className="text-gray-600 text-sm leading-relaxed">検査記録が自動で患者カルテに紐付け。来院履歴・LTV・リピート分析と連携し、経営数字との一元管理が可能です。</p></div>
          <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6"><h3 className="font-bold text-gray-900 mb-2">WEB問診と連携</h3><p className="text-gray-600 text-sm leading-relaxed">来院前の問診情報が検査記録に反映。初診から過去の主訴・既往歴が揃った状態で検査に入れます。</p></div>
        </div>
        <p className="text-center mt-8 text-sm text-gray-400">連携は後から追加可能。まずはカラダマップ単体でお使いいただけます。</p>
      </section>

      {/* 他社比較 */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-4">他社ツールとの徹底比較</h2>
          <p className="text-center text-gray-500 mb-10">段階的原因特定ロジックを搭載しているのは、このシステムだけ</p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead><tr className="bg-blue-600 text-white"><th className="text-left p-4 rounded-tl-xl">比較項目</th><th className="p-4 text-center">紙カルテ</th><th className="p-4 text-center">汎用電子カルテ</th><th className="p-4 text-center">大手レセコン</th><th className="p-4 text-center rounded-tr-xl font-bold">カラダマップ</th></tr></thead>
              <tbody>{[["月額料金","0円","10,000円〜","20,000円〜","5,500円"],["初期費用","0円","50,000円〜","100,000円〜","0円"],["段階的原因特定ロジック","－","－","－","●"],["PDF出力(患者用＋施術者用)","－","●","●","●"],["AIセルフケア自動提案","－","－","－","●"],["経過比較・前回データ並列","－","▲","●","●"],["オフライン対応(PWA)","－","－","－","●"],["最低契約期間","－","12ヶ月","12ヶ月","6ヶ月"]].map(([item,a,b,c,d],i)=><tr key={item} className={i%2===0?"bg-white":"bg-gray-50"}><td className="p-4 font-medium text-gray-700">{item}</td><td className="p-4 text-center text-gray-500">{a}</td><td className="p-4 text-center text-gray-500">{b}</td><td className="p-4 text-center text-gray-500">{c}</td><td className="p-4 text-center font-bold text-blue-600">{d}</td></tr>)}</tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 選ばれる3つの理由 */}
      <section className="py-16 max-w-5xl mx-auto px-6">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-12">選ばれる3つの理由</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { num: "01", title: "段階的原因特定ロジック\n業界唯一", body: "立位→座位→上半身の3段階で「足の影響なのか」「上半身の影響なのか」を切り分け。原因の絞り込み精度が圧倒的に違う。" },
            { num: "02", title: "現役治療家が、自院で\n毎日使って改善", body: "机上設計ではなく、患者さんと向き合う現場から生まれた機能。「使わない機能」は入っていない。" },
            { num: "03", title: "PDFで「根拠」を渡す\nリピート率が変わる", body: "患者用と施術者用の2種類を自動生成。「ちゃんと診てくれている」と感じてもらえることが、継続と紹介を生む。" },
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
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-4">患者情報を、安心して任せられる仕組み</h2>
          <p className="text-center text-gray-500 mb-12 leading-relaxed">治療院は個人情報を扱う立場。カラダマップは大手SaaSと同等の基盤・運用で守ります。</p>
          <div className="grid md:grid-cols-3 gap-5">
            {[
              { icon: "🛡️", title: "AWS東京リージョン基盤", body: "データはSupabase(AWS東京リージョン)の堅牢なクラウドで保管。物理サーバの管理は不要、災害・物損リスクなし。" },
              { icon: "🔒", title: "通信は全てSSL/TLS暗号化", body: "ログイン・データ送受信は全てHTTPS。第三者からの盗聴・改ざんを防ぎます。" },
              { icon: "🚪", title: "院ごとに完全データ分離", body: "RLS(Row Level Security)で院ID単位にアクセス制御。他院のデータが見える事故が構造的に起きません。" },
              { icon: "💾", title: "日次自動バックアップ", body: "毎日のスナップショットを自動保存。万一の操作ミス・障害でも復旧可能。" },
              { icon: "🔑", title: "アカウント認証", body: "Supabase Authによるメール+パスワード認証。スタッフごとの権限管理にも対応予定。" },
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
              自分自身の患者情報も同じ基盤で守っているという責任で運営しています。
            </p>
          </div>
        </div>
      </section>

      {/* 導入事例 */}
      {(() => {
        const voices = getAppVoices("kensa");
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
                  "5段階検査ウィザード",
                  "段階的原因特定ロジック",
                  "患者用・施術者用PDF出力",
                  "AIセルフケア自動提案",
                  "経過比較・改善度トラッキング",
                  "Clinic Core / WEB問診連携対応",
                  "患者数無制限",
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

      {/* 導入の流れ */}
      <section className="py-16 max-w-5xl mx-auto px-6 bg-gray-50">
        <p className="text-center text-sm font-medium text-blue-600 uppercase tracking-widest mb-3">How it works</p>
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-4">導入は4ステップ・最短即日でスタート</h2>
        <p className="text-center text-gray-500 mb-12 leading-relaxed">面倒な手続きはありません。LINEでひと声いただければ、こちらでフォローしながら進めます。</p>
        <div className="grid md:grid-cols-4 gap-4 md:gap-6">
          {[
            { step: "01", title: "申込・決済", desc: "LP内のボタンから1分でStripe決済。", detail: "1分" },
            { step: "02", title: "アカウント発行", desc: "決済完了と同時にメールでログイン情報が届きます。", detail: "数秒〜数分" },
            { step: "03", title: "初期設定", desc: "院名・テーマカラー・ロゴを登録。スタッフを追加。", detail: "10〜30分" },
            { step: "04", title: "検査開始", desc: "iPad・スマホで検査開始。患者にPDFを渡せます。", detail: "当日〜" },
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
          <p className="text-xs text-gray-600 leading-relaxed mb-4">「うちの院に合うか」「業種が違っても使える？」など、申込前のご相談を歓迎しています。</p>
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
            {q:"iPadやスマートフォンでも使えますか？",a:"はい。タブレット・スマートフォンでの利用を前提に設計されています。施術ベッドの横でそのまま記録できます。"},
            {q:"Clinic Coreがなくても使えますか？",a:"はい。カラダマップ単体でご利用いただけます。後からClinic Coreを追加して連携することも可能です。"},
            {q:"既存の患者データを移行できますか？",a:"CSVインポート機能で患者情報を一括取り込みできます。紙カルテからの移行サポートも承っております。"},
            {q:"整体院以外でも使えますか？",a:"はい。鍼灸院・接骨院・ボディケアサロンでもご利用いただけます。検査ロジックは姿勢・歪み評価をベースにしているので、業種を問わず使えます。"},
          ].map(({q,a})=>(
            <div key={q} className="border border-gray-100 rounded-2xl p-6 bg-white shadow-sm"><p className="font-bold text-gray-900 mb-2">Q.{q}</p><p className="text-gray-600 text-sm leading-relaxed">A.{a}</p></div>
          ))}
        </div>
      </section>

      {/* 最終CTA */}
      <section className="bg-blue-600 py-16 text-white text-center">
        <span className="inline-block bg-white/20 text-white text-xs font-bold px-4 py-1.5 rounded-full mb-4">月額5,500円 / 初期費用0円</span>
        <h2 className="text-2xl md:text-3xl font-bold mb-4">検査の質を上げて、紹介を増やしませんか。</h2>
        <p className="text-blue-100 mb-8">月額5,500円・初期費用なし・最低契約期間6ヶ月。決済後すぐにアカウント情報をメールでお届けします。</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href={STRIPE_URL} target="_blank" rel="noopener noreferrer" className="bg-white text-blue-600 font-bold px-8 py-4 rounded-xl hover:bg-blue-50 transition shadow">今すぐ始める →</a>
          <a href={LINE_URL} target="_blank" rel="noopener noreferrer" className="border-2 border-white text-white font-bold px-8 py-4 rounded-xl hover:bg-blue-700 transition">LINEで相談する</a>
        </div>
      </section>

      <SystemHubNavigation currentAppId="kensa" />

      <BusinessInfoFooter productName="カラダマップ" />
    </main>
  );
}
