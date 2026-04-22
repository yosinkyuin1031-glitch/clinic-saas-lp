import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "プライバシーポリシー | ClinicApps",
  description: "ClinicAppsのプライバシーポリシー（個人情報保護方針）です。",
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-3xl mx-auto px-6 py-16">
        {/* Header */}
        <div className="mb-12">
          <Link href="/" className="text-sm text-gray-500 hover:text-gray-700">
            &larr; トップに戻る
          </Link>
          <p className="mt-6 text-sm font-semibold text-blue-600 tracking-widest">
            ClinicApps
          </p>
          <h1 className="mt-2 text-3xl font-bold text-gray-900">
            プライバシーポリシー
          </h1>
          <p className="mt-2 text-base text-gray-600">個人情報保護方針</p>
          <p className="mt-4 text-sm text-gray-500">
            制定日：2026年3月25日 / 最終改定日：2026年4月22日
          </p>
        </div>

        {/* Body */}
        <div className="space-y-10 text-sm leading-7 text-gray-800">
          {/* 前文 */}
          <section>
            <p>
              AI Solutions（以下「当社」といいます）は、「ClinicApps」（以下「本サービス」といいます）の提供にあたり、お客様の個人情報の保護を重要な責務と認識し、個人情報の保護に関する法律（個人情報保護法）その他関連法令を遵守いたします。本プライバシーポリシーは、当社における個人情報の取り扱いについて定めるものです。
            </p>
          </section>

          {/* 1. 事業者情報 */}
          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">
              1. 事業者情報
            </h2>
            <div className="bg-gray-50 rounded-lg p-4 space-y-1 text-sm">
              <p>
                <span className="font-medium">事業者名：</span>AI
                Solutions（個人事業）
              </p>
              <p>
                <span className="font-medium">代表者：</span>大口陽平
              </p>
              <p>
                <span className="font-medium">所在地：</span>
〒558-0004 大阪府大阪市住吉区長居東4-2-7 長居中央ビル304
              </p>
              <p>
                <span className="font-medium">電話番号：</span>
                070-8498-2968
              </p>
              <p>
                <span className="font-medium">メールアドレス：</span>
                yosinkyuin1031@gmail.com
              </p>
            </div>
          </section>

          {/* 2. 取得する個人情報 */}
          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">
              2. 取得する個人情報の種類
            </h2>
            <p className="mb-3">当社は、本サービスの提供にあたり、以下の個人情報を取得することがあります。</p>

            <h3 className="font-bold text-gray-900 mt-4 mb-2">
              (1) 契約者情報
            </h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>氏名、屋号・法人名</li>
              <li>住所、電話番号、メールアドレス</li>
              <li>クレジットカード情報（Stripeが安全に管理。当社はカード番号を保持しません）</li>
              <li>IPアドレス、ブラウザ情報等のアクセスログ</li>
            </ul>

            <h3 className="font-bold text-gray-900 mt-4 mb-2">
              (2) エンドユーザー（患者様等）データ
            </h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>氏名、連絡先、生年月日等の基本情報</li>
              <li>問診内容、検査結果、施術記録等の健康関連情報（<span className="font-bold">個人情報保護法上の要配慮個人情報</span>に該当）</li>
              <li>予約情報、来院履歴</li>
              <li>その他、契約者が本サービスに入力した情報</li>
            </ul>
            <p className="mt-3 text-xs text-gray-500">
              ※エンドユーザーデータは、契約者が個人情報取扱事業者として適法に取得し、本サービスに入力するものです。当社は、契約者の委託を受けてデータを処理する「委託先」の立場となります。要配慮個人情報については、契約者がエンドユーザーから明示的な同意を取得のうえ登録するものとします。
            </p>
          </section>

          {/* 3. 利用目的 */}
          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">
              3. 利用目的
            </h2>
            <p>当社は、取得した個人情報を以下の目的で利用します。</p>
            <ol className="list-decimal pl-5 space-y-1 mt-2">
              <li>本サービスの提供、運営、保守、改善</li>
              <li>契約者の本人確認、アカウント管理</li>
              <li>利用料金の請求、決済処理</li>
              <li>お問い合わせへの対応、カスタマーサポート</li>
              <li>サービスに関する通知、アップデート情報のご案内</li>
              <li>
                利用状況の分析、統計データの作成（個人を特定できない形式に加工のうえ）
              </li>
              <li>不正利用の検知・防止、セキュリティの確保</li>
              <li>法令に基づく対応</li>
            </ol>
          </section>

          {/* 4. 第三者提供 */}
          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">
              4. 第三者提供
            </h2>
            <ol className="list-decimal pl-5 space-y-2">
              <li>
                当社は、以下の場合を除き、個人情報を第三者に提供いたしません。
                <ul className="list-disc pl-5 mt-1 space-y-1">
                  <li>契約者の同意がある場合</li>
                  <li>法令に基づき開示が求められた場合</li>
                  <li>
                    人の生命・身体または財産の保護のために必要であり、本人の同意を得ることが困難な場合
                  </li>
                </ul>
              </li>
              <li>
                当社は、本サービスの提供にあたり、以下の外部サービスを利用しています。これらのサービスには、サービス提供に必要な範囲で個人情報が共有されます。
                <div className="mt-3 overflow-x-auto">
                  <table className="w-full text-xs border border-gray-200 rounded">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="px-3 py-2 text-left font-medium">
                          サービス名
                        </th>
                        <th className="px-3 py-2 text-left font-medium">
                          提供元
                        </th>
                        <th className="px-3 py-2 text-left font-medium">
                          利用目的
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      <tr>
                        <td className="px-3 py-2">Stripe</td>
                        <td className="px-3 py-2">Stripe, Inc.</td>
                        <td className="px-3 py-2">
                          決済処理・クレジットカード情報の安全な管理
                        </td>
                      </tr>
                      <tr>
                        <td className="px-3 py-2">Supabase</td>
                        <td className="px-3 py-2">Supabase, Inc.</td>
                        <td className="px-3 py-2">
                          データベース・認証基盤の提供
                        </td>
                      </tr>
                      <tr>
                        <td className="px-3 py-2">Vercel</td>
                        <td className="px-3 py-2">Vercel, Inc.</td>
                        <td className="px-3 py-2">
                          Webアプリケーションのホスティング
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-2 text-xs text-gray-500">
                  各外部サービスのプライバシーポリシーについては、各サービス提供元のWebサイトをご確認ください。
                </p>
              </li>
            </ol>
          </section>

          {/* 5. 安全管理措置 */}
          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">
              5. 安全管理措置
            </h2>
            <p>
              当社は、個人情報の漏洩、滅失、毀損を防止するため、以下の安全管理措置を講じています。
            </p>
            <div className="space-y-3 mt-3">
              <div>
                <p className="font-medium">技術的安全管理措置</p>
                <ul className="list-disc pl-5 space-y-1 text-xs text-gray-600">
                  <li>SSL/TLSによる通信経路の暗号化</li>
                  <li>Supabase Row Level Security（RLS）による契約者ごとのデータ分離</li>
                  <li>パスワードのbcryptハッシュ化</li>
                  <li>役割ベースアクセス制御（RBAC）</li>
                  <li>ログイン失敗回数制限（ブルートフォース対策）</li>
                  <li>アクセスログの記録・監視</li>
                  <li>決済カード情報はStripe（PCI DSS Level 1準拠）に直接送信、当社では保持しない</li>
                </ul>
              </div>
              <div>
                <p className="font-medium">物理的・組織的安全管理措置</p>
                <ul className="list-disc pl-5 space-y-1 text-xs text-gray-600">
                  <li>データは<span className="font-bold">東京リージョン（日本国内）</span>のデータセンターに保管</li>
                  <li>Supabaseによる自動バックアップ</li>
                  <li>管理者・委託先へのアクセス権限の必要最小限化</li>
                  <li>定期的なセキュリティレビュー</li>
                </ul>
              </div>
              <div>
                <p className="font-medium">人的安全管理措置</p>
                <ul className="list-disc pl-5 space-y-1 text-xs text-gray-600">
                  <li>従業者に対する個人情報取扱いの教育</li>
                  <li>守秘義務の徹底</li>
                </ul>
              </div>
            </div>
          </section>

          {/* 6. データの保管場所 */}
          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">
              6. データの保管場所
            </h2>
            <ol className="list-decimal pl-5 space-y-2">
              <li>
                本サービスのデータは、Supabase（基盤：Amazon Web Services）の<span className="font-bold">東京リージョン（日本国内）</span>に保管されます。
              </li>
              <li>
                外部サービス（Stripe・Vercel等）を経由する一部処理において、米国等の外国で情報処理が行われる場合があります。
              </li>
              <li>
                当社は、外国にある第三者への個人情報の提供にあたり、個人情報保護法が求める情報提供・同意取得等の適切な措置を講じます。
              </li>
            </ol>
          </section>

          {/* 6-2. 漏洩時の対応 */}
          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">
              6-2. 漏洩等発生時の対応
            </h2>
            <p>
              個人情報の漏洩、滅失または毀損が発生し、かつ個人の権利利益を害するおそれが大きいと認められる場合、当社は個人情報保護委員会への報告および影響を受ける本人・契約者への通知を、<span className="font-bold">事故認知後速やかに（原則72時間以内を目安に）</span>行います。
            </p>
          </section>

          {/* 7. 開示・訂正・削除の請求 */}
          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">
              7. 開示・訂正・削除の請求
            </h2>
            <ol className="list-decimal pl-5 space-y-2">
              <li>
                契約者は、当社が保有する自己の個人情報について、開示・訂正・追加・削除・利用停止を請求することができます。
              </li>
              <li>
                請求の際は、本人確認をさせていただいたうえで、合理的な期間内に対応いたします。
              </li>
              <li>
                エンドユーザーからの個人情報に関する請求は、原則として契約者（データの管理者）を通じて行うものとします。
              </li>
              <li>
                請求先は、本ポリシー末尾の「お問い合わせ先」までご連絡ください。
              </li>
            </ol>
          </section>

          {/* 8. Cookie・アクセスログ */}
          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">
              8. Cookie・アクセスログ
            </h2>
            <ol className="list-decimal pl-5 space-y-2">
              <li>
                本サービスおよび当社Webサイトでは、サービスの提供・利便性向上のためにCookie（クッキー）を使用することがあります。
              </li>
              <li>
                Cookieの利用目的：
                <ul className="list-disc pl-5 mt-1 space-y-1">
                  <li>ログイン状態の維持、セッション管理</li>
                  <li>利用状況の分析（アクセス解析）</li>
                  <li>サービスの改善・最適化</li>
                </ul>
              </li>
              <li>
                契約者は、ブラウザの設定によりCookieの受け取りを拒否できます。ただし、一部の機能が正常に動作しなくなる場合があります。
              </li>
              <li>
                当社は、アクセスログ（IPアドレス、アクセス日時、ブラウザの種類等）を取得・記録します。これらはセキュリティの確保およびサービス改善のために利用し、個人を特定する目的では使用しません。
              </li>
            </ol>
          </section>

          {/* 9. 改定 */}
          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">
              9. プライバシーポリシーの改定
            </h2>
            <ol className="list-decimal pl-5 space-y-2">
              <li>
                当社は、法令の改正、サービス内容の変更等に伴い、本ポリシーを改定することがあります。
              </li>
              <li>
                重要な変更を行う場合は、本サービス上での通知またはメールにて契約者にお知らせします。
              </li>
              <li>
                改定後のポリシーは、当社Webサイトに掲載した時点で効力を生じるものとします。
              </li>
            </ol>
          </section>

          {/* 10. お問い合わせ先 */}
          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">
              10. お問い合わせ先
            </h2>
            <p className="mb-3">
              個人情報の取り扱いに関するお問い合わせ、開示等のご請求は、以下までご連絡ください。
            </p>
            <div className="bg-gray-50 rounded-lg p-4 space-y-1 text-sm">
              <p>
                <span className="font-medium">事業者名：</span>AI Solutions
              </p>
              <p>
                <span className="font-medium">個人情報取扱責任者：</span>
                大口陽平
              </p>
              <p>
                <span className="font-medium">メールアドレス：</span>
                yosinkyuin1031@gmail.com
              </p>
              <p>
                <span className="font-medium">電話番号：</span>
                070-8498-2968
              </p>
            </div>
          </section>

          {/* 施行日 */}
          <section className="pt-6 border-t border-gray-200">
            <p className="text-gray-600">2026年3月25日 制定 / 2026年4月22日 改定</p>
          </section>
        </div>

        {/* Footer */}
        <div className="mt-12 pt-8 border-t border-gray-200 text-center">
          <Link
            href="/"
            className="text-sm text-blue-600 hover:text-blue-800 hover:underline"
          >
            &larr; トップに戻る
          </Link>
        </div>
      </div>
    </main>
  );
}
