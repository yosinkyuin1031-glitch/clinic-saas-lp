"use client";
import Link from "next/link";
import { useState } from "react";

const YOUTUBE_ID = "";

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
            {[{no:1,text:"大腰筋ストレッチ（仰臥位・片足引き寄せ）",tag:"縮こまり解除"},{no:2,text:"梨状筋リリース（座位・足組みストレッチ）",tag:"縮こまり解除"},{no:3,text:"重心バランス訓練（片脚立ち 30秒×3回）",tag:"再発予防"}].map(c=><div key={c.no} className="flex gap-2 py-2 border-b border-gray-100">
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
      <header className="border-b border-gray-100 px-6 py-4 flex items-center justify-between max-w-5xl mx-auto">
        <Link href="/" className="text-sm text-gray-500 hover:text-gray-700">← ClinicApps トップ</Link>
        <a href="https://lin.ee/182seszw" target="_blank" rel="noopener noreferrer" className="text-sm bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600 transition">LINEで相談する</a>
      </header>
      <section className="max-w-5xl mx-auto px-6 py-20 text-center">
        <span className="inline-block bg-yellow-100 text-yellow-800 text-xs font-bold px-3 py-1 rounded-full mb-4">看板商品</span>
        <p className="text-sm font-medium text-blue-600 tracking-widest uppercase mb-3">治療院専用 段階的原因特定システム</p>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-6">検査結果を、<br />患者と共有する。</h1>
        <p className="text-lg text-gray-600 mb-10 max-w-xl mx-auto leading-relaxed">5段階の検査ウィザードで原因部位を自動特定。<br />検査 → 診断 → セルフケア提案 → PDF出力まで全自動で完結。</p>
        <a href="https://buy.stripe.com/14AfZg6ks3SU9nS0ut08g02" target="_blank" rel="noopener noreferrer" className="inline-block bg-blue-600 text-white text-lg font-bold px-10 py-4 rounded-xl hover:bg-blue-700 transition shadow-md">今すぐ始める →</a>
        <p className="mt-4 text-sm text-gray-400">月額3,980円（税込）/ 初期費用11,000円 / 最低契約期間6ヶ月</p>
      </section>
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
      <section className="py-16 max-w-5xl mx-auto px-6">
        <p className="text-center text-sm font-medium text-blue-600 uppercase tracking-widest mb-3">インタラクティブデモ</p>
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-3">実際に操作して試してみる</h2>
        <p className="text-center text-gray-500 mb-10">ボタンをタップしてStep 1〜5を体験できます</p>
        <KensaDemo />
      </section>
      <section className="bg-gray-50 py-16">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-12">こんな悩みはありませんか？</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[{title:"説明しても伝わっているか不安",body:"検査結果を口頭で伝えても、患者に本当に届いているか確認できない。「なんとなくわかった」で帰らせていませんか？"},{title:"施術の効果を数字で示せていない",body:"「良くなっていますよ」と言葉だけ。改善の経過を数値とグラフで見せられれば、患者の継続率は変わります。"},{title:"カルテ入力に時間がかかりすぎる",body:"施術後に手書きやPC入力。その時間があれば、もう一人診られる。タップだけで記録が完結します。"}].map(item=><div key={item.title} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"><h3 className="font-bold text-gray-900 mb-3 text-lg">{item.title}</h3><p className="text-gray-600 text-sm leading-relaxed">{item.body}</p></div>)}
          </div>
          <p className="text-center mt-10 text-gray-700 font-medium text-lg">検査で「根拠」を見せるだけで、全て解決します。</p>
        </div>
      </section>
      <section className="py-16 max-w-5xl mx-auto px-6">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-4">搭載機能</h2>
        <p className="text-center text-gray-500 mb-12">検査・診断・提案・記録・分析に必要な機能を全て搭載</p>
        <div className="grid md:grid-cols-2 gap-6">
          {[{icon:"🗺️",title:"5段階検査ウィザード",body:"患者情報 → 立位検査 → 座位検査 → 上半身検査 → 自動診断。タップ操作だけで検査が完結。"},{icon:"🎯",title:"段階的原因特定ロジック（業界唯一）",body:"立位→座位で足の影響、座位→上半身で上半身の影響を判定。原因部位を自動で絞り込む。"},{icon:"📄",title:"PDF出力（患者用・施術者用）",body:"患者に渡すレポートと施術者向けカルテの2種類を自動生成。院のロゴ・テーマカラーも反映。"},{icon:"🤖",title:"AIセルフケア自動提案",body:"診断結果に基づき、縮こまり・引っ張りの部位ごとに最適なセルフケアメニューを自動提案。"},{icon:"📈",title:"経過比較・改善度トラッキング",body:"過去の検査と並べて比較。患者の改善経過を数値と視覚で伝えられるから、リピート率が上がる。"},{icon:"📊",title:"ダッシュボード・統計分析",body:"月別検査数推移・患者数・TOP3診断をグラフ表示。院全体の傾向が一目でわかる。"}].map(f=><div key={f.title} className="flex gap-4 p-6 bg-white border border-gray-100 rounded-2xl shadow-sm"><span className="text-3xl flex-shrink-0">{f.icon}</span><div><h3 className="font-bold text-gray-900 mb-2">{f.title}</h3><p className="text-gray-600 text-sm leading-relaxed">{f.body}</p></div></div>)}
        </div>
      </section>
      <section className="bg-gray-50 py-16">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-4">他社ツールとの徹底比較</h2>
          <p className="text-center text-gray-500 mb-10">段階的原因特定ロジックを搭載しているのは、このシステムだけ</p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead><tr className="bg-blue-600 text-white"><th className="text-left p-4 rounded-tl-xl">比較項目</th><th className="p-4 text-center">紙カルテ</th><th className="p-4 text-center">汎用電子カルテ</th><th className="p-4 text-center">大手レセコン</th><th className="p-4 text-center rounded-tr-xl font-bold">カラダマップ</th></tr></thead>
              <tbody>{[["月額料金","0円","10,000円〜","20,000円〜","3,980円〜"],["初期費用","0円","50,000円〜","100,000円〜","11,000円"],["段階的原因特定ロジック","－","－","－","●"],["PDF出力（患者用＋施術者用）","－","●","●","●"],["AIセルフケア自動提案","－","－","－","●"],["経過比較・前回データ並列","－","▲","●","●"],["オフライン対応（PWA）","－","－","－","●"],["最低契約期間","－","12ヶ月","12ヶ月","6ヶ月"]].map(([item,a,b,c,d],i)=><tr key={item} className={i%2===0?"bg-white":"bg-gray-50"}><td className="p-4 font-medium text-gray-700">{item}</td><td className="p-4 text-center text-gray-500">{a}</td><td className="p-4 text-center text-gray-500">{b}</td><td className="p-4 text-center text-gray-500">{c}</td><td className="p-4 text-center font-bold text-blue-600">{d}</td></tr>)}</tbody>
            </table>
          </div>
        </div>
      </section>
      <section className="py-16 max-w-5xl mx-auto px-6">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-4">他システムとの連携</h2>
        <p className="text-center text-gray-500 mb-10">単体でも使える。連携すればさらに強力に。</p>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6"><h3 className="font-bold text-gray-900 mb-2">Clinic Coreと連携</h3><p className="text-gray-600 text-sm leading-relaxed">検査記録が自動で患者カルテに紐付け。来院履歴・LTV・リピート分析と連携し、経営数字との一元管理が可能です。</p></div>
          <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6"><h3 className="font-bold text-gray-900 mb-2">WEB問診と連携</h3><p className="text-gray-600 text-sm leading-relaxed">来院前の問診情報が検査記録に反映。初診から過去の主訴・既往歴が揃った状態で検査に入れます。</p></div>
        </div>
        <p className="text-center mt-8 text-sm text-gray-400">連携は後から追加可能。まずはカラダマップ単体でお使いいただけます。</p>
      </section>
      <section className="bg-gray-50 py-16" id="pricing">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-12">料金プラン</h2>
          <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100"><p className="text-sm text-gray-500 mb-2">月額プラン</p><p className="text-4xl font-bold text-gray-900 mb-1">3,980<span className="text-lg font-normal">円/月</span></p><p className="text-sm text-gray-500 mb-6">初期費用 11,000円（税込）</p><ul className="space-y-2 text-sm text-gray-600">{["✓ 全機能利用可能","✓ 患者数無制限","✓ PDF出力無制限","✓ AIセルフケア提案","✓ 導入サポート付き"].map(t=><li key={t}>{t}</li>)}</ul></div>
            <div className="bg-blue-600 rounded-2xl p-8 shadow-md text-white relative"><span className="absolute top-4 right-4 bg-yellow-400 text-yellow-900 text-xs font-bold px-2 py-1 rounded-full">2ヶ月お得</span><p className="text-sm text-blue-200 mb-2">年払いプラン</p><p className="text-4xl font-bold mb-1">39,800<span className="text-lg font-normal">円/年</span></p><p className="text-sm text-blue-200 mb-1">初期費用 11,000円（税込）</p><p className="text-sm text-yellow-300 mb-6">月額換算 約3,317円 → 年間7,960円お得</p><ul className="space-y-2 text-sm text-blue-100">{["✓ 全機能利用可能","✓ 患者数無制限","✓ PDF出力無制限","✓ AIセルフケア提案","✓ 導入サポート付き"].map(t=><li key={t}>{t}</li>)}</ul></div>
          </div>
          <p className="text-center mt-6 text-sm text-gray-400">全て税込表示です。最低契約期間：6ヶ月。</p>
        </div>
      </section>
      <section className="py-16 max-w-5xl mx-auto px-6">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-12">よくある質問</h2>
        <div className="space-y-6 max-w-2xl mx-auto">
          {[{q:"iPadやスマートフォンでも使えますか？",a:"はい。タブレット・スマートフォンでの利用を前提に設計されています。施術ベッドの横でそのまま記録できます。"},{q:"Clinic Coreがなくても使えますか？",a:"はい。カラダマップ単体でご利用いただけます。後からClinic Coreを追加して連携することも可能です。"},{q:"既存の患者データを移行できますか？",a:"CSVインポート機能で患者情報を一括取り込みできます。紙カルテからの移行サポートも承っております。"}].map(({q,a})=><div key={q} className="border border-gray-100 rounded-2xl p-6 bg-white shadow-sm"><p className="font-bold text-gray-900 mb-2">Q.{q}</p><p className="text-gray-600 text-sm leading-relaxed">A.{a}</p></div>)}
        </div>
      </section>
      <section className="bg-blue-600 py-16 text-white text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">検査の質を上げて、紹介を増やしませんか。</h2>
        <p className="text-blue-100 mb-8">月額3,980円で全機能が使えます。初期費用11,000円。最低契約期間6ヶ月。</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="https://buy.stripe.com/14AfZg6ks3SU9nS0ut08g02" target="_blank" rel="noopener noreferrer" className="bg-white text-blue-600 font-bold px-8 py-4 rounded-xl hover:bg-blue-50 transition shadow">今すぐ始める →</a>
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
