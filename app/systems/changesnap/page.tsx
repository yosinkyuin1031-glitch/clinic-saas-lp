import type { Metadata } from "next";
import Link from "next/link";
import { LINE_URL } from "../../lib/site-config";

const STRIPE_LINK = "https://buy.stripe.com/4gMaEWbEMexyeIc7WV08g0z";
const DEMO_URL = "https://changesnap-demo.vercel.app";

export const metadata: Metadata = {
  title: "ChangeSnap ビフォーアフター写真管理 - AI背景除去・比較画像・動画 | ClinicMark",
  description:
    "治療院・サロン向けビフォーアフター写真管理。患者ごとフォルダ＋AI背景除去＋左右/上下/スライド比較＋SNS3サイズ一括書き出し。10GB／院。月額¥3,300。",
};

export default function ChangeSnapPage() {
  return (
    <main className="min-h-screen bg-white">
      <header className="border-b border-gray-100 px-6 py-4 flex items-center justify-between max-w-5xl mx-auto">
        <Link href="/" className="text-sm text-gray-500 hover:text-gray-700">← ClinicMark トップ</Link>
        <a href={LINE_URL} target="_blank" rel="noopener noreferrer" className="text-sm bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600 transition">LINEで相談する</a>
      </header>

      {/* ヒーロー */}
      <section className="max-w-5xl mx-auto px-6 py-20 text-center">
        <span className="inline-block bg-orange-100 text-orange-800 text-xs font-bold px-3 py-1 rounded-full mb-4">NEW</span>
        <p className="text-sm font-medium text-orange-600 tracking-widest uppercase mb-3">治療院・サロン向けビフォーアフター写真管理</p>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-6">
          ビフォーアフターを、<br />その場で1枚に。
        </h1>
        <p className="text-lg text-gray-600 mb-10 max-w-xl mx-auto leading-relaxed">
          写真アプリと編集アプリの往復、もう要りません。<br />
          撮影→比較画像／動画／AI背景除去まで、<br />
          ChangeSnap1つで完結します。
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a href={STRIPE_LINK} target="_blank" rel="noopener noreferrer" className="inline-block bg-orange-500 text-white text-lg font-bold px-10 py-4 rounded-xl hover:bg-orange-600 transition shadow-md">今すぐ始める →</a>
          <a href={DEMO_URL} target="_blank" rel="noopener noreferrer" className="inline-block bg-white border-2 border-orange-500 text-orange-600 text-lg font-bold px-10 py-4 rounded-xl hover:bg-orange-50 transition">デモを試す</a>
        </div>
        <p className="mt-4 text-sm text-gray-400">月額3,300円（税込）/ 初期費用なし / 10GB／院 / 最低契約期間6ヶ月</p>
        <p className="mt-2 text-xs text-gray-400">
          購入時は <Link href="/legal/terms" className="underline">利用規約</Link>・<Link href="/legal/privacy" className="underline">プライバシーポリシー</Link>・<Link href="/legal/tokushoho" className="underline">特商法表記</Link> への同意が必要です。
        </p>
      </section>

      {/* 課題提起 */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-12">こんなビフォーアフター運用、していませんか？</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: "写真がカメラロールで埋もれる", body: "患者ごとに探すのが大変。撮ったのに「あの人の写真どこだっけ？」が毎週起きていませんか？" },
              { title: "比較画像作るのに編集アプリ往復", body: "Canva・写真アプリ・LINEを行ったり来たり。SNS1投稿に毎回30分かかっていませんか？" },
              { title: "背景が雑で投稿に使いづらい", body: "院の壁・他患者の足元が映り込んで結局お蔵入り。せっかく撮ったのに使えない写真、溜まっていませんか？" },
            ].map((item) => (
              <div key={item.title} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <h3 className="font-bold text-gray-900 mb-3 text-lg">{item.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
          <p className="text-center mt-10 text-gray-700 font-medium text-lg">ChangeSnapなら、撮影から書き出しまで最短3分の運用に。<span className="text-xs text-gray-400 align-middle">※運用イメージ</span></p>
        </div>
      </section>

      {/* 機能紹介 */}
      <section className="py-16 max-w-5xl mx-auto px-6">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-4">9つのコア機能</h2>
        <p className="text-center text-gray-500 mb-12">SNS投稿・症例集・院内POPに必要な機能をすべて1アプリで</p>
        <div className="grid md:grid-cols-2 gap-6">
          {[
            { icon: "📁", title: "患者ごとフォルダ管理", body: "撮影日・カテゴリ（顔／姿勢／関節など）・並べ替えで、欲しい1枚に3秒で辿り着けます。" },
            { icon: "🔀", title: "比較画像3パターン", body: "左右／上下／スライド比較を1タップ生成。SNS・LP・院内POPの素材が即完成。" },
            { icon: "📐", title: "SNS最適3サイズ一括書き出し", body: "1:1（投稿）／9:16（リール・ストーリーズ）／16:9（YouTube）を一気に書き出し。" },
            { icon: "✨", title: "AI背景除去（NEW）", body: "ブラウザ内AIで背景を透過／白背景化。院の雑な背景が映り込んだ写真も投稿OKに。" },
            { icon: "🎬", title: "並列動画書き出し", body: "ビフォー動画とアフター動画を左右／上下同時再生→1本の比較動画として書き出し。" },
            { icon: "🏷️", title: "院ロゴ透かし", body: "全書き出しに自動でロゴを焼き込み。SNS無断転載対策＋ブランド露出を同時実現。" },
            { icon: "✏️", title: "アノテーション", body: "矢印・丸・矩形・テキストで「ここが変わった」を一目で伝える素材に。" },
            { icon: "🔗", title: "患者へのリンク共有", body: "比較画像を専用URL＋LINEで患者に送信。来院モチベ向上に直結。" },
            { icon: "💾", title: "10GB／院・容量警告", body: "写真のみなら約25,000枚相当（WebP圧縮400KB／枚で試算・動画含むと減少）。80%・100%で自動警告、データ整理タイミングを逃しません。" },
          ].map((f) => (
            <div key={f.title} className="flex gap-4 p-6 bg-white border border-gray-100 rounded-2xl shadow-sm">
              <span className="text-3xl flex-shrink-0">{f.icon}</span>
              <div>
                <h3 className="font-bold text-gray-900 mb-2">{f.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{f.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 比較表 */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-4">他の方法との比較</h2>
          <p className="text-center text-gray-500 mb-10">写真アプリ・Canva・汎用カルテで運用するより圧倒的に速い</p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-orange-500 text-white">
                  <th className="text-left p-4 rounded-tl-xl">比較項目</th>
                  <th className="p-4 text-center">写真アプリ＋手動編集</th>
                  <th className="p-4 text-center">Canva</th>
                  <th className="p-4 text-center">汎用カルテの写真欄</th>
                  <th className="p-4 text-center rounded-tr-xl font-bold">ChangeSnap</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["患者ごとフォルダ管理", "−", "▲（手動）", "●", "●"],
                  ["比較画像3パターン", "−", "▲（手作業）", "−", "●（ワンタップ）"],
                  ["SNS3サイズ一括書き出し", "−", "▲（1枚ずつ）", "−", "●"],
                  ["AI背景除去", "−", "●（Pro月¥1,500〜）", "−", "●（月額内・追加課金なし）"],
                  ["並列比較動画", "−", "−", "−", "●"],
                  ["院ロゴ透かし自動", "−", "▲（手動）", "−", "●"],
                  ["1投稿あたりの目安時間※", "30分〜", "15分〜", "20分〜", "3分〜"],
                  ["月額", "0円", "1,500円〜", "0〜数千円", "3,300円"],
                ].map(([item, a, b, c, d], i) => (
                  <tr key={String(item)} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                    <td className="p-4 font-medium text-gray-700">{item}</td>
                    <td className="p-4 text-center text-gray-500">{a}</td>
                    <td className="p-4 text-center text-gray-500">{b}</td>
                    <td className="p-4 text-center text-gray-500">{c}</td>
                    <td className="p-4 text-center font-bold text-orange-600">{d}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="text-xs text-gray-400 mt-3 text-center">※運用イメージ。実際の所要時間は写真枚数・編集量により変動します。</p>
          </div>
        </div>
      </section>

      {/* 料金 */}
      <section className="py-16" id="pricing">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-12">料金プラン</h2>
          <div className="bg-white rounded-2xl p-10 shadow-md border-2 border-orange-200 max-w-md mx-auto">
            <p className="text-sm text-orange-600 font-bold mb-2">月額プラン（1院）</p>
            <p className="text-5xl font-bold text-gray-900 mb-2">3,300<span className="text-lg font-normal text-gray-500">円/月（税込）</span></p>
            <p className="text-sm text-gray-500 mb-6">初期費用なし／最低契約期間6ヶ月（6ヶ月未満解約時は残月数分の早期解約金）</p>
            <ul className="space-y-2 text-sm text-gray-700 text-left max-w-xs mx-auto mb-8">
              {[
                "✓ 全機能解放（AI背景除去含む）",
                "✓ 10GB／院（写真約25,000枚相当）",
                "✓ スタッフ数無制限",
                "✓ 患者数無制限",
                "✓ ロゴ透かし・SNS3サイズ書き出し",
                "✓ 並列動画書き出し",
              ].map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
            <a href={STRIPE_LINK} target="_blank" rel="noopener noreferrer" className="block w-full bg-orange-500 text-white font-bold py-3 rounded-xl hover:bg-orange-600 transition">
              今すぐ始める →
            </a>
          </div>
          <p className="text-xs text-gray-400 mt-6">10GBを超える運用が必要な場合は容量追加プランをご相談ください。</p>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-12">よくある質問</h2>
          <div className="space-y-6">
            {[
              { q: "撮影はどの端末からできますか？", a: "スマホ・タブレット・PCのブラウザから可能です。iPhone/Androidのカメラを直接呼び出して撮影→アップロードまでワンタップで完了します。" },
              { q: "AI背景除去は別料金ですか？", a: "いいえ。月額¥3,300にすべて含まれています。1枚あたりの追加料金もありません。" },
              { q: "AI処理はどこで行われますか？個人情報は外部に送られませんか？", a: "AI背景除去はお使いのブラウザ内で処理されます。患者写真が外部AI APIに送信されることはありません。" },
              { q: "10GBを超えたらどうなりますか？", a: "80%で警告バナー、100%で新規アップロードを停止します。古い写真の削除または容量追加プラン（別途お見積り）でご対応いただけます。" },
              { q: "他のスタッフも同じデータを見られますか？", a: "はい。同じ院のスタッフは同じ患者フォルダにアクセスできます。スタッフ数の追加料金はありません。" },
              { q: "サロン業態でも使えますか？", a: "はい。エステ・美容鍼・ダイエット指導など、ビフォーアフターを記録する業種すべてで活用いただけます。" },
              { q: "解約は途中でできますか？", a: "最低契約期間6ヶ月経過後はいつでも解約可能です。6ヶ月未満で解約される場合、残月数分の早期解約金（残月数×月額3,300円）をご請求します。" },
            ].map(({ q, a }) => (
              <div key={q} className="border border-gray-100 rounded-2xl p-6 bg-white shadow-sm">
                <p className="font-bold text-gray-900 mb-2">Q. {q}</p>
                <p className="text-gray-600 text-sm leading-relaxed">A. {a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-orange-500 py-16 text-white text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">ビフォーアフター運用を、3分にする。</h2>
        <p className="text-orange-100 mb-8">月額¥3,300で、SNS素材作りから解放されよう。</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href={STRIPE_LINK} target="_blank" rel="noopener noreferrer" className="bg-white text-orange-600 font-bold px-8 py-4 rounded-xl hover:bg-orange-50 transition shadow">今すぐ始める →</a>
          <a href={DEMO_URL} target="_blank" rel="noopener noreferrer" className="border-2 border-white text-white font-bold px-8 py-4 rounded-xl hover:bg-orange-600 transition">デモを試す</a>
          <a href={LINE_URL} target="_blank" rel="noopener noreferrer" className="border-2 border-white text-white font-bold px-8 py-4 rounded-xl hover:bg-orange-600 transition">LINEで相談</a>
        </div>
      </section>

      <footer className="border-t border-gray-100 py-8 text-center text-sm text-gray-400">
        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/">ClinicMark</Link>
          <span>|</span>
          <Link href="/legal/privacy">プライバシーポリシー</Link>
          <span>|</span>
          <Link href="/legal/terms">利用規約</Link>
          <span>|</span>
          <Link href="/legal/tokushoho">特定商取引法</Link>
        </div>
      </footer>
    </main>
  );
}
