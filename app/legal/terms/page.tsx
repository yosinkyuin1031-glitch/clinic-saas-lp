import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "利用規約 | ClinicDX",
  description: "ClinicDXサービス利用規約です。",
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-3xl mx-auto px-6 py-16">
        {/* Header */}
        <div className="mb-12">
          <Link href="/" className="text-sm text-gray-500 hover:text-gray-700">
            &larr; トップに戻る
          </Link>
          <p className="mt-6 text-sm font-semibold text-blue-600 tracking-widest">
            ClinicDX
          </p>
          <h1 className="mt-2 text-3xl font-bold text-gray-900">利用規約</h1>
          <p className="mt-4 text-sm text-gray-500">
            最終更新日：2026年3月25日
          </p>
        </div>

        {/* Body */}
        <div className="space-y-10 text-sm leading-7 text-gray-800">
          {/* 第1条 */}
          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">
              第1条（適用）
            </h2>
            <ol className="list-decimal pl-5 space-y-2">
              <li>
                本規約は、AI Solutions（以下「当社」といいます）が提供するクラウド型業務支援サービス「ClinicDX」（以下「本サービス」といいます）の利用に関する条件を定めるものです。
              </li>
              <li>
                本サービスの利用者（以下「契約者」といいます）は、本規約に同意のうえ、本サービスを利用するものとします。
              </li>
              <li>
                当社が本サービスに関して別途定める個別規定、ガイドライン等は、本規約の一部を構成するものとします。
              </li>
            </ol>
          </section>

          {/* 第2条 */}
          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">
              第2条（定義）
            </h2>
            <p>本規約において、以下の用語は次の意味で使用します。</p>
            <ol className="list-decimal pl-5 space-y-2 mt-2">
              <li>
                <span className="font-medium">「本サービス」</span>
                ：当社が「ClinicDX」の名称で提供する、検査アプリ・顧客管理・予約管理・WEB問診・MEO勝ち上げくん・睡眠チェック等の治療院向けクラウドアプリケーション群をいいます。
              </li>
              <li>
                <span className="font-medium">「契約者」</span>
                ：本サービスの利用契約を締結した法人または個人事業主をいいます。
              </li>
              <li>
                <span className="font-medium">「エンドユーザー」</span>
                ：契約者の顧客（患者様等）であり、契約者を通じて間接的に本サービスの機能を利用する方をいいます。
              </li>
              <li>
                <span className="font-medium">「エンドユーザーデータ」</span>
                ：エンドユーザーに関する個人情報、健康情報、予約情報等、本サービス上で取り扱われるデータをいいます。
              </li>
              <li>
                <span className="font-medium">「月額プラン」</span>
                ：月単位で利用料金をお支払いいただく契約形態をいいます。
              </li>
              <li>
                <span className="font-medium">「買切りプラン」</span>
                ：一括でライセンス料金をお支払いいただく契約形態をいいます。別途年間保守契約が必要です。
              </li>
            </ol>
          </section>

          {/* 第3条 */}
          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">
              第3条（アカウント登録）
            </h2>
            <ol className="list-decimal pl-5 space-y-2">
              <li>
                本サービスの利用を希望する方は、当社所定の方法によりアカウント登録を行うものとします。
              </li>
              <li>
                契約者は、登録情報について正確かつ最新の情報を提供し、変更があった場合は速やかに更新するものとします。
              </li>
              <li>
                アカウントの管理責任は契約者にあります。パスワード等の認証情報の管理不備により生じた損害について、当社は責任を負いません。
              </li>
              <li>
                当社は、以下の場合にアカウント登録を拒否、または既存アカウントを停止できるものとします。
                <ul className="list-disc pl-5 mt-1 space-y-1">
                  <li>虚偽の情報を登録した場合</li>
                  <li>過去に本規約に違反したことがある場合</li>
                  <li>
                    その他、当社が不適切と合理的に判断した場合
                  </li>
                </ul>
              </li>
            </ol>
          </section>

          {/* 第4条 */}
          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">
              第4条（料金・支払い）
            </h2>
            <ol className="list-decimal pl-5 space-y-2">
              <li>
                本サービスの利用料金は、以下のとおりとします（税込）。
                <div className="mt-3 overflow-x-auto">
                  <table className="w-full text-xs border border-gray-200 rounded">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="px-3 py-2 text-left font-medium">
                          アプリ名
                        </th>
                        <th className="px-3 py-2 text-right font-medium">
                          月額
                        </th>
                        <th className="px-3 py-2 text-right font-medium">
                          買切り
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      <PriceRow name="検査アプリ" m="5,500円" b="55,000円" />
                      <PriceRow name="顧客管理" m="4,980円" b="49,800円" />
                      <PriceRow name="予約管理" m="2,980円" b="29,800円" />
                      <PriceRow name="WEB問診" m="2,980円" b="29,800円" />
                      <PriceRow
                        name="MEO勝ち上げくん"
                        m="2,980円"
                        b="29,800円"
                      />
                      <PriceRow name="睡眠チェック" m="1,980円" b="19,800円" />
                    </tbody>
                  </table>
                </div>
              </li>
              <li>
                買切りプランをご購入の契約者は、年間保守契約（月額料金の約10%×12ヶ月分）を別途締結するものとします。保守契約には、アップデート提供・障害対応・技術サポートが含まれます。
              </li>
              <li>
                複数アプリをまとめてご契約いただく場合、セット割引を適用することがあります。割引率は販売ページまたは個別のお見積りにて提示します。
              </li>
              <li>
                支払いはクレジットカード決済（Stripe経由）によるものとします。
              </li>
              <li>
                月額プランの課金日は契約開始日と同日とし、以降毎月同日に自動更新されます。
              </li>
              <li>
                支払いの遅延が発生した場合、当社はサービスの提供を一時停止できるものとします。
              </li>
            </ol>
          </section>

          {/* 第5条 */}
          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">
              第5条（サービス内容）
            </h2>
            <ol className="list-decimal pl-5 space-y-2">
              <li>
                本サービスは、治療院・整体院・鍼灸院等の業務効率化を目的としたクラウド型Webアプリケーション群です。
              </li>
              <li>
                各アプリの機能詳細は、販売ページおよびヘルプドキュメントに定めるとおりとします。
              </li>
              <li>
                当社は、サービスの品質向上のため、事前通知のうえ機能追加・改善を行うことがあります。
              </li>
              <li>
                本サービスにはAI（人工知能）を活用した機能が含まれる場合があります。AI機能の出力結果はあくまで参考情報であり、最終的な判断は契約者の責任において行うものとします。
              </li>
            </ol>
          </section>

          {/* 第6条 */}
          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">
              第6条（知的財産権）
            </h2>
            <ol className="list-decimal pl-5 space-y-2">
              <li>
                本サービスに関するソフトウェア、デザイン、コンテンツ、その他一切の知的財産権は当社に帰属します。
              </li>
              <li>
                契約者には、本サービスの利用権のみが付与されます。ソースコード、オブジェクトコードその他のプログラムの提供は行いません。
              </li>
              <li>
                契約者が本サービスを利用して作成・蓄積したデータの権利は、契約者に帰属します。ただし、当社は匿名化・統計化したデータをサービス改善の目的で利用できるものとします。
              </li>
            </ol>
          </section>

          {/* 第7条 */}
          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">
              第7条（禁止事項）
            </h2>
            <p>契約者は、本サービスの利用にあたり、以下の行為を行ってはなりません。</p>
            <ol className="list-decimal pl-5 space-y-2 mt-2">
              <li>
                本サービスのリバースエンジニアリング、逆コンパイル、逆アセンブル等の解析行為
              </li>
              <li>
                本サービスまたはその一部の複製、改変、翻案、再配布、転売
              </li>
              <li>本サービスのアカウントの第三者への譲渡・貸与</li>
              <li>
                エンドユーザーデータの本サービスの利用目的を超えた収集・利用・第三者提供
              </li>
              <li>
                本サービスのサーバー・ネットワークに過度な負荷をかける行為
              </li>
              <li>
                不正アクセス、コンピュータウイルスの送信等、本サービスの運営を妨害する行為
              </li>
              <li>法令または公序良俗に反する行為</li>
              <li>
                その他、当社が合理的に不適切と判断する行為
              </li>
            </ol>
          </section>

          {/* 第8条 */}
          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">
              第8条（データの取り扱い）
            </h2>
            <ol className="list-decimal pl-5 space-y-2">
              <li>
                契約者は、エンドユーザーデータを本サービスに入力・保存するにあたり、個人情報保護法その他関連法令を遵守し、エンドユーザーから必要な同意を取得する義務を負います。
              </li>
              <li>
                当社は、契約者のデータを適切な安全管理措置を講じて保管します。データの保管にはSupabase（AWSクラウド基盤）を利用します。
              </li>
              <li>
                契約終了後、当社は合理的な期間（原則30日間）データを保持した後、完全に削除します。契約者が事前にデータのエクスポートを希望する場合は、解約前にお申し出ください。
              </li>
              <li>
                データの取り扱いの詳細は、別途定めるプライバシーポリシーに従います。
              </li>
            </ol>
          </section>

          {/* 第9条 */}
          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">
              第9条（サービスの変更・中断・終了）
            </h2>
            <ol className="list-decimal pl-5 space-y-2">
              <li>
                当社は、以下の場合に本サービスの全部または一部を一時的に中断できるものとします。
                <ul className="list-disc pl-5 mt-1 space-y-1">
                  <li>システムの保守・点検・更新を行う場合</li>
                  <li>天災、停電、通信障害等の不可抗力による場合</li>
                  <li>外部サービス（Stripe、Supabase等）の障害による場合</li>
                  <li>
                    その他、運営上やむを得ないと当社が判断した場合
                  </li>
                </ul>
              </li>
              <li>
                当社は、本サービスの内容を変更、または本サービスの提供を終了する場合、原則として30日前までに契約者に通知します。
              </li>
              <li>
                本サービスの終了時には、契約者にデータのエクスポート期間を設けるものとします。
              </li>
            </ol>
          </section>

          {/* 第10条 */}
          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">
              第10条（免責事項）
            </h2>
            <ol className="list-decimal pl-5 space-y-2">
              <li>
                当社は、本サービスが契約者の特定の目的に適合すること、期待する機能・正確性・有用性を有すること、および不具合が生じないことを保証しません。
              </li>
              <li>
                本サービスに含まれるAI機能の出力結果について、その正確性・完全性を保証しません。AI機能はあくまで補助的な情報提供を目的とするものです。
              </li>
              <li>
                本サービスは外部API（Google API、Stripe API等）に依存する機能を含みます。外部APIの仕様変更・障害・提供終了等により機能の一部が利用できなくなる場合があります。
              </li>
              <li>
                天災地変、通信回線の障害、その他当社の責めに帰さない事由による損害について、当社は責任を負いません。
              </li>
            </ol>
          </section>

          {/* 第11条 */}
          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">
              第11条（解約）
            </h2>
            <ol className="list-decimal pl-5 space-y-2">
              <li>
                <span className="font-medium">月額プラン：</span>
                契約者はいつでも解約の申し出ができます。解約月の末日をもってサービスを停止します。月途中の解約であっても日割り返金はいたしません。
              </li>
              <li>
                <span className="font-medium">買切りプラン：</span>
                ライセンスは永続的に付与されます。ただし、年間保守契約を解約した場合、アップデートの提供・技術サポート・障害対応は終了します。
              </li>
              <li>
                契約者が本規約に違反した場合、当社は催告なくサービスの提供を停止し、契約を解除できるものとします。この場合、既に支払われた料金の返金は行いません。
              </li>
            </ol>
          </section>

          {/* 第12条 */}
          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">
              第12条（損害賠償）
            </h2>
            <ol className="list-decimal pl-5 space-y-2">
              <li>
                当社が契約者に対して損害賠償責任を負う場合、その範囲は契約者に直接かつ現実に発生した通常損害に限るものとし、逸失利益、間接損害、特別損害、懲罰的損害については責任を負いません。
              </li>
              <li>
                当社の損害賠償の総額は、損害の原因となった事象が発生した時点から遡って過去12ヶ月間に契約者が当社に支払った利用料金の総額を上限とします。
              </li>
            </ol>
          </section>

          {/* 第13条 */}
          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">
              第13条（準拠法・管轄裁判所）
            </h2>
            <ol className="list-decimal pl-5 space-y-2">
              <li>本規約の解釈および適用は、日本法に準拠するものとします。</li>
              <li>
                本規約に関して紛争が生じた場合、大阪地方裁判所を第一審の専属的合意管轄裁判所とします。
              </li>
            </ol>
          </section>

          {/* 施行日 */}
          <section className="pt-6 border-t border-gray-200">
            <p className="text-gray-600">2026年3月25日 制定・施行</p>
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

function PriceRow({ name, m, b }: { name: string; m: string; b: string }) {
  return (
    <tr>
      <td className="px-3 py-2">{name}</td>
      <td className="px-3 py-2 text-right">{m}</td>
      <td className="px-3 py-2 text-right">{b}</td>
    </tr>
  );
}
