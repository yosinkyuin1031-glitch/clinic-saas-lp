import Link from "next/link";

export default function SuccessPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-8 md:p-12 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg
            className="w-8 h-8 text-green-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>

        <h1 className="text-2xl md:text-3xl font-black text-gray-900 mb-4">
          お申し込みありがとうございます
        </h1>

        <p className="text-gray-600 leading-relaxed mb-6">
          決済が正常に完了しました。
          <br />
          ログイン情報をご登録のメールアドレスにお送りします。
        </p>

        <div className="bg-blue-50 rounded-xl p-4 mb-8">
          <p className="text-sm text-blue-700 font-medium">
            メールが届かない場合は、迷惑メールフォルダをご確認いただくか、
            お問い合わせフォームよりご連絡ください。
          </p>
        </div>

        <Link
          href="/"
          className="inline-block bg-blue-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-700 transition"
        >
          トップページに戻る
        </Link>
      </div>
    </div>
  );
}
