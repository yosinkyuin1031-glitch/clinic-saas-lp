import Link from "next/link";

export default function ThanksPage() {
  return (
    <div className="bg-white text-gray-900 min-h-screen">
      {/* ナビ */}
      <nav className="bg-white/95 backdrop-blur-sm border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-black text-sm">C</span>
            </div>
            <span className="text-lg font-black tracking-tight text-primary">ClinicApps</span>
          </Link>
        </div>
      </nav>

      {/* メイン */}
      <section className="py-16 md:py-24">
        <div className="max-w-2xl mx-auto px-4">

          {/* メインメッセージ */}
          <div className="text-center mb-12">
            <div className="w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-4xl">🎉</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-black text-primary mb-4">
              ご購入ありがとうございます！
            </h1>
            <p className="text-gray-600 leading-relaxed">
              24時間以内にアカウント発行のご案内メールをお送りします。
            </p>
          </div>

          {/* 3ステップ */}
          <div className="space-y-5 mb-12">
            {/* Step 1 */}
            <div className="bg-gray-50 rounded-2xl border border-gray-200 p-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-primary text-white rounded-xl flex items-center justify-center font-black text-sm flex-shrink-0">
                  1
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-primary text-base mb-1">メールを確認する</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    登録メールアドレスにウェルカムメールをお送りします。
                    <br />
                    <span className="text-xs text-gray-400">※ 届かない場合は迷惑メールフォルダもご確認ください</span>
                  </p>
                </div>
                <div className="flex-shrink-0 text-accent">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-gray-50 rounded-2xl border border-gray-200 p-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-primary text-white rounded-xl flex items-center justify-center font-black text-sm flex-shrink-0">
                  2
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-primary text-base mb-1">LINEを友だち追加する</h3>
                  <p className="text-sm text-gray-600 leading-relaxed mb-3">
                    サポート・オンボーディングはLINEで行います。
                  </p>
                  <a
                    href="https://lin.ee/8P11rM4"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-[#06C755] text-white px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-[#05b34d] transition-all"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" />
                    </svg>
                    LINEで友だち追加する
                  </a>
                </div>
                <div className="flex-shrink-0 text-[#06C755]">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-gray-50 rounded-2xl border border-gray-200 p-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-primary text-white rounded-xl flex items-center justify-center font-black text-sm flex-shrink-0">
                  3
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-primary text-base mb-1">ガイドを確認する</h3>
                  <p className="text-sm text-gray-600 leading-relaxed mb-3">
                    導入ガイドを確認してスムーズにスタートしましょう。
                  </p>
                  <a
                    href="https://kensa-sheet-app.vercel.app/docs/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-accent text-white px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-accent-600 transition-all"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                    </svg>
                    導入ガイドを見る
                  </a>
                </div>
                <div className="flex-shrink-0 text-accent">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* 下部LINE誘導 */}
          <div className="bg-primary/5 rounded-2xl border border-primary/10 p-6 text-center">
            <p className="text-sm text-gray-700 font-bold mb-3">
              ご不明な点はLINEにてお気軽にご相談ください
            </p>
            <a
              href="https://lin.ee/8P11rM4"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#06C755] text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-[#05b34d] transition-all"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" />
              </svg>
              LINEで相談する
            </a>
          </div>

          {/* トップに戻る */}
          <div className="text-center mt-8">
            <Link
              href="/"
              className="text-sm text-gray-400 hover:text-primary transition"
            >
              ← トップページに戻る
            </Link>
          </div>

        </div>
      </section>

      {/* フッター */}
      <footer className="bg-primary text-gray-300 py-8">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <p className="text-xs text-gray-500">
            &copy; 2026 ClinicApps. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
