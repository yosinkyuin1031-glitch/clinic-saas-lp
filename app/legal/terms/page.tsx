import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "利用規約 | ClinicApps",
  description: "ClinicApps 各サービス共通の利用規約です。",
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-3xl mx-auto px-6 py-16">
        <div className="mb-12">
          <Link href="/" className="text-sm text-gray-500 hover:text-gray-700">
            &larr; トップに戻る
          </Link>
          <p className="mt-6 text-sm font-semibold text-blue-600 tracking-widest">
            ClinicApps
          </p>
          <h1 className="mt-2 text-3xl font-bold text-gray-900">利用規約</h1>
          <p className="mt-4 text-sm text-gray-500">
            制定日：2026年3月25日 / 最終改定日：2026年4月22日
          </p>
        </div>

        <div className="space-y-10 text-sm leading-7 text-gray-800">
          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">
              第1条（適用）
            </h2>
            <ol className="list-decimal pl-5 space-y-2">
              <li>
                本規約は、AI Solutions（個人事業主 大口 陽平。以下「当社」といいます）が提供するクラウド型業務支援サービス群（以下総称して「本サービス」といいます）の利用に関する条件を定めるものです。
              </li>
              <li>
                本サービスの利用者（以下「契約者」といいます）は、本規約および別途定めるプライバシーポリシー、特定商取引法に基づく表記に同意のうえ、本サービスを利用するものとします。
              </li>
              <li>
                当社が本サービスに関して別途定める個別規定、ガイドライン等は、本規約の一部を構成するものとします。
              </li>
            </ol>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">
              第2条（定義）
            </h2>
            <p>本規約において、以下の用語は次の意味で使用します。</p>
            <ol className="list-decimal pl-5 space-y-2 mt-2">
              <li>
                <span className="font-medium">「本サービス」</span>
                ：当社が「ClinicApps」ブランドで提供する、検査システム（カラダマップ）・顧客管理（Clinic Core）・予約管理・WEB問診・MEO勝ち上げくん・睡眠チェック・頭痛ダイアリー・栄養チェック・腸内環境チェック・ヒートマップ等の治療院向けクラウドシステム群をいいます。
              </li>
              <li>
                <span className="font-medium">「契約者」</span>
                ：本サービスの利用契約を締結した法人または個人事業主をいいます。
              </li>
              <li>
                <span className="font-medium">「エンドユーザー」</span>
                ：契約者の顧客（患者様等）であり、契約者を通じて本サービスの機能を間接的に利用する方をいいます。
              </li>
              <li>
                <span className="font-medium">「エンドユーザーデータ」</span>
                ：エンドユーザーに関する個人情報、健康情報、施術記録、予約情報等、本サービス上で取り扱われるデータをいいます。個人情報保護法に定める要配慮個人情報を含みます。
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

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">
              第3条（アカウント登録・管理責任）
            </h2>
            <ol className="list-decimal pl-5 space-y-2">
              <li>
                本サービスの利用を希望する方は、当社所定の方法によりアカウント登録を行うものとします。
              </li>
              <li>
                契約者は、登録情報について正確かつ最新の情報を提供し、変更があった場合は速やかに更新するものとします。
              </li>
              <li>
                アカウントの管理責任は契約者にあります。パスワード等の認証情報の管理不備、第三者への漏洩または貸与により生じた一切の損害について、当社は責任を負いません。
              </li>
              <li>
                契約者は、不正アクセスまたはその兆候を認知した場合、速やかに当社に通知するものとします。
              </li>
              <li>
                当社は、虚偽情報登録、過去の規約違反、その他不適切と合理的に判断した場合、アカウント登録を拒否、または既存アカウントを停止できるものとします。
              </li>
            </ol>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">
              第4条（料金・支払い）
            </h2>
            <ol className="list-decimal pl-5 space-y-2">
              <li>
                本サービスの利用料金は、各販売ページに表示する金額（税込）とし、モニター枠・通常枠・セット割引等の適用は当社の提示するプランに従います。
              </li>
              <li>
                支払いは、決済代行事業者 Stripe Payments Japan 合同会社を通じたクレジットカード決済により行うものとします。
              </li>
              <li>
                月額プランの課金日は契約開始日と同日とし、以降毎月同日に自動更新されます。
              </li>
              <li>
                買切りプランをご購入の契約者は、年間保守契約（月額料金相当の約10%×12ヶ月分）を別途締結するものとし、保守契約にはアップデート提供・障害対応・技術サポートが含まれます。
              </li>
              <li>
                支払いの遅延が発生した場合、当社は催告後にサービスの提供を一時停止し、または契約を解除できるものとします。
              </li>
              <li>
                料金プランの改定がある場合、当社は改定日の30日前までに通知し、通知後も利用を継続した場合は新料金に同意したものとみなします。
              </li>
            </ol>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">
              第5条（最低契約期間・解約・早期解約金）
            </h2>
            <ol className="list-decimal pl-5 space-y-2">
              <li>
                月額プランの最低契約期間は、契約開始月を1ヶ月目として
                <span className="font-bold">6ヶ月</span>
                とします。最低契約期間満了後は、契約者が解約の意思表示を行うまで自動的に1ヶ月単位で更新されます。
              </li>
              <li>
                契約者は、次回請求日の7日前までに管理画面または書面により解約の意思を当社に通知することで、本サービスを解約できます。
              </li>
              <li>
                最低契約期間内に契約者都合で解約する場合、
                <span className="font-bold">残存期間分の月額料金を早期解約金として一括請求</span>
                します（Stripe請求書にて発行、発行日から14日以内にお支払いください）。
              </li>
              <li>
                月途中の解約であっても日割り返金はいたしません。
              </li>
              <li>
                買切りプランのライセンスは永続的に付与されます。ただし、年間保守契約を解約した場合、アップデートの提供・技術サポート・障害対応は終了します。
              </li>
              <li>
                契約者が本規約に違反した場合、当社は催告なくサービスの提供を停止し、契約を解除できるものとします。この場合でも、早期解約金の支払義務は免除されず、既払料金の返金は行いません。
              </li>
              <li>
                一度解約したメールアドレス・事業者での再登録は、当社が認めた場合を除き原則として受け付けません。
              </li>
            </ol>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">
              第6条（サービス内容・AI機能）
            </h2>
            <ol className="list-decimal pl-5 space-y-2">
              <li>
                本サービスは、治療院・整骨院・鍼灸院・整体院等の業務効率化を目的としたクラウド型Webシステム群であり、医療行為・診断行為を行うものではありません。
              </li>
              <li>
                各システムの機能詳細は、販売ページおよびヘルプドキュメントに定めるとおりとします。
              </li>
              <li>
                当社は、サービスの品質向上のため、事前通知のうえ機能追加・改善を行うことがあります。
              </li>
              <li>
                本サービスにはAI（人工知能）を活用した機能が含まれる場合があります。AI機能の出力結果はあくまで参考情報であり、医学的判断・施術判断の最終責任は契約者に帰属します。
              </li>
            </ol>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">
              第7条（知的財産権）
            </h2>
            <ol className="list-decimal pl-5 space-y-2">
              <li>
                本サービスに関するソフトウェア、デザイン、コンテンツ、その他一切の知的財産権は当社に帰属します。
              </li>
              <li>
                契約者には、本サービスの利用権のみが付与されます。ソースコード、オブジェクトコードその他のプログラムの提供は行いません。
              </li>
              <li>
                契約者が本サービスを利用して作成・蓄積したデータの権利は、契約者または当該エンドユーザーに帰属します。ただし、当社は匿名化・統計化したデータをサービス改善の目的で利用できるものとします。
              </li>
            </ol>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">
              第8条（禁止事項）
            </h2>
            <p>契約者は、本サービスの利用にあたり、以下の行為を行ってはなりません。</p>
            <ol className="list-decimal pl-5 space-y-2 mt-2">
              <li>
                本サービスのリバースエンジニアリング、逆コンパイル、逆アセンブル等の解析行為
              </li>
              <li>
                本サービスまたはその一部の複製、改変、翻案、再配布、転売
              </li>
              <li>本サービスのアカウントの第三者への譲渡・貸与・共有</li>
              <li>
                エンドユーザーデータの本サービスの利用目的を超えた収集・利用・第三者提供
              </li>
              <li>
                本サービスのサーバー・ネットワークに過度な負荷をかける行為、スクレイピング、クローリング等
              </li>
              <li>
                不正アクセス、コンピュータウイルスの送信等、本サービスの運営を妨害する行為
              </li>
              <li>反社会的勢力に該当する行為、またはこれを利用する行為</li>
              <li>法令または公序良俗に反する行為</li>
              <li>その他、当社が合理的に不適切と判断する行為</li>
            </ol>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">
              第9条（反社会的勢力の排除）
            </h2>
            <p>
              契約者は、自己および自己の役員・従業員等が、暴力団、暴力団関係企業、総会屋、社会運動標榜ゴロ、特殊知能暴力集団その他の反社会的勢力（以下総称して「反社会的勢力」といいます）に該当しないこと、および反社会的勢力と一切関係を有しないことを表明し、保証します。契約者がこれに違反した場合、当社は何らの催告なく直ちに本契約を解除できるものとします。
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">
              第10条（エンドユーザーデータの取り扱いに関する特約）
            </h2>
            <ol className="list-decimal pl-5 space-y-2">
              <li>
                エンドユーザーデータについて、契約者は個人情報保護法上の「個人情報取扱事業者」の地位に立ち、当社は契約者から委託を受けてこれを取り扱う「委託先」の地位に立つものとします。
              </li>
              <li>
                契約者は、エンドユーザーデータを本サービスに入力するにあたり、個人情報保護法その他関連法令を遵守し、エンドユーザーから必要な同意（当社への取扱委託についての同意を含む）を取得する義務を負います。
              </li>
              <li>
                施術記録・既往歴・健康情報等、<span className="font-bold">要配慮個人情報</span>を本サービスに登録するにあたっては、契約者はエンドユーザー本人からの明示的な同意を取得したうえで行うものとします。
              </li>
              <li>
                当社は、委託されたエンドユーザーデータを本サービスの提供目的以外に利用せず、次条に定める安全管理措置を講じて取り扱います。
              </li>
              <li>
                エンドユーザーからの開示・訂正・削除・利用停止等の請求は、まず契約者が一次対応を行うものとし、必要に応じて当社が技術的に協力します。
              </li>
            </ol>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">
              第11条（安全管理措置）
            </h2>
            <p>当社は、契約者およびエンドユーザーの個人情報の漏洩、滅失、改ざんを防止するため、以下の安全管理措置を講じています。</p>
            <ol className="list-decimal pl-5 space-y-2 mt-2">
              <li>SSL/TLSによる通信経路の暗号化</li>
              <li>Supabase Row Level Security（RLS）による契約者ごとのデータ分離</li>
              <li>パスワードのbcryptハッシュ化保存</li>
              <li>データベースの国内リージョン（東京）での保管</li>
              <li>役割ベースアクセス制御（RBAC）およびアクセスログの記録</li>
              <li>Supabaseによる自動バックアップ</li>
              <li>決済カード情報は当社では保持せず、Stripeに直接送信（PCI DSS Level 1準拠）</li>
              <li>ログイン失敗回数制限（ブルートフォース対策）</li>
              <li>業務委託先の選定および定期的なセキュリティレビュー</li>
              <li>従業者・業務委託者に対する守秘義務の徹底</li>
            </ol>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">
              第12条（漏洩等発生時の対応）
            </h2>
            <p>
              当社は、個人情報の漏洩、滅失または毀損が発生した場合、速やかに調査するとともに、個人情報保護委員会への報告および影響を受ける契約者・エンドユーザーへの通知を、
              <span className="font-bold">事故認知後速やかに（原則72時間以内を目安に）</span>
              行います。契約者は、当社が行う事実関係の調査および再発防止措置に協力するものとします。
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">
              第13条（サービスの変更・中断・終了）
            </h2>
            <ol className="list-decimal pl-5 space-y-2">
              <li>
                当社は、以下の場合に本サービスの全部または一部を一時的に中断できるものとします。
                <ul className="list-disc pl-5 mt-1 space-y-1">
                  <li>システムの保守・点検・更新を行う場合</li>
                  <li>天災、停電、通信障害等の不可抗力による場合</li>
                  <li>外部サービス（Stripe、Supabase、Vercel等）の障害による場合</li>
                  <li>その他、運営上やむを得ないと当社が判断した場合</li>
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

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">
              第14条（免責・損害賠償の上限）
            </h2>
            <ol className="list-decimal pl-5 space-y-2">
              <li>
                当社は、本サービスが契約者の特定の目的に適合すること、期待する機能・正確性・有用性を有すること、および不具合が生じないことを保証しません。
              </li>
              <li>
                当社の責に帰すべき事由により契約者に損害が発生した場合、当社が契約者に対して負う損害賠償責任は、当社に故意または重大な過失がある場合を除き、
                <span className="font-bold">損害発生時点から遡って直近3ヶ月間に契約者が当社に現実に支払った利用料金の総額を上限</span>
                とし、逸失利益、間接損害、特別損害、懲罰的損害については責任を負いません。
              </li>
              <li>
                本サービスは外部API（Google API、Stripe API等）に依存する機能を含みます。外部APIの仕様変更・障害・提供終了等により機能の一部が利用できなくなる場合があります。
              </li>
              <li>
                天災地変、通信回線の障害、その他当社の責めに帰さない事由による損害について、当社は責任を負いません。
              </li>
              <li>
                契約者は、自己の責任において定期的にデータをエクスポート・バックアップするものとし、当社はデータの完全性・利用可能性を保証するものではありません。
              </li>
            </ol>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">
              第15条（規約の変更）
            </h2>
            <p>
              当社は、民法第548条の4の規定に基づき、必要に応じて本規約を変更することがあります。変更後の規約は、本サービス上に掲載した時点、または当社が指定する効力発生日から効力を生じるものとします。重要な変更については、メール等で事前に通知いたします。
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">
              第16条（準拠法・管轄裁判所）
            </h2>
            <ol className="list-decimal pl-5 space-y-2">
              <li>本規約の解釈および適用は、日本法に準拠するものとします。</li>
              <li>
                本規約に関して紛争が生じた場合、大阪地方裁判所を第一審の専属的合意管轄裁判所とします。
              </li>
            </ol>
          </section>

          <section className="pt-6 border-t border-gray-200">
            <p className="text-gray-600">2026年3月25日 制定 / 2026年4月22日 改定</p>
          </section>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200 text-center space-x-6">
          <Link
            href="/legal/privacy"
            className="text-sm text-blue-600 hover:text-blue-800 hover:underline"
          >
            プライバシーポリシー
          </Link>
          <Link
            href="/legal/tokushoho"
            className="text-sm text-blue-600 hover:text-blue-800 hover:underline"
          >
            特定商取引法に基づく表記
          </Link>
          <Link
            href="/"
            className="text-sm text-blue-600 hover:text-blue-800 hover:underline"
          >
            トップに戻る
          </Link>
        </div>
      </div>
    </main>
  );
}
