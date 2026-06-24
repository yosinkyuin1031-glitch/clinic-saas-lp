import Link from "next/link";
import { BUSINESS, LINE_URL } from "../../lib/site-config";

export function BusinessInfoFooter({ productName = "ClinicMark" }: { productName?: string }) {
  return (
    <>
      {/* 事業者情報 */}
      <section className="bg-gray-50 py-12 border-t border-gray-100">
        <div className="max-w-3xl mx-auto px-6">
          <p className="text-center text-xs text-gray-400 uppercase tracking-widest mb-4">Business Information</p>
          <h3 className="text-center text-base font-bold text-gray-800 mb-6">事業者情報</h3>
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 md:p-8">
            <dl className="text-sm divide-y divide-gray-100">
              <div className="flex flex-col md:flex-row gap-1 md:gap-6 py-3">
                <dt className="md:w-36 text-gray-500 shrink-0">法人名</dt>
                <dd className="font-bold text-gray-900">{BUSINESS.legalName}</dd>
              </div>
              <div className="flex flex-col md:flex-row gap-1 md:gap-6 py-3">
                <dt className="md:w-36 text-gray-500 shrink-0">代表者</dt>
                <dd className="text-gray-800">{BUSINESS.representative}</dd>
              </div>
              <div className="flex flex-col md:flex-row gap-1 md:gap-6 py-3">
                <dt className="md:w-36 text-gray-500 shrink-0">事業内容</dt>
                <dd className="text-gray-800">{BUSINESS.businessDescription}</dd>
              </div>
              <div className="flex flex-col md:flex-row gap-1 md:gap-6 py-3">
                <dt className="md:w-36 text-gray-500 shrink-0">お問い合わせ</dt>
                <dd>
                  <a href={LINE_URL} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline hover:text-blue-700">公式LINE</a>
                  <span className="text-gray-400 mx-2">/</span>
                  <a href={`mailto:${BUSINESS.contactEmail}`} className="text-blue-600 underline hover:text-blue-700">メール</a>
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

      {/* フッター */}
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
        <p className="mt-4">&copy; 2025 {productName}</p>
      </footer>
    </>
  );
}
