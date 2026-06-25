import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "特定商取引法に基づく表記 | ClinicApps",
  description: "ClinicApps（クリニックマーク）の特定商取引法に基づく表記ページです。",
};

export default function TokushohoPage() {
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
            特定商取引法に基づく表記
          </h1>
        </div>

        {/* Table */}
        <div className="border border-gray-200 rounded-lg overflow-hidden">
          <table className="w-full text-sm leading-relaxed">
            <tbody className="divide-y divide-gray-200">
              <Row label="販売事業者名" value="株式会社IDOMI" />
              <Row label="代表者名" value="大口 陽平" />
              <Row
                label="所在地"
                value="〒558-0004 大阪府大阪市住吉区長居東4-2-7 長居中央ビル304"
              />
              <Row
                label="電話番号"
                value="070-8498-2968"
              />
              <Row
                label="メールアドレス"
                value="yosinkyuin1031@gmail.com"
              />
              <Row label="販売URL" value="https://clinic-saas-lp.vercel.app" />
              <Row
                label="販売価格"
                value={
                  <div className="space-y-3">
                    <p className="font-medium text-gray-700 mb-2">
                      各システムの価格（税込）：
                    </p>
                    <PriceItem
                      name="カラダマップ（検査システム）"
                      monthly="5,500円/月"
                      buyout="-"
                    />
                    <PriceItem
                      name="Clinic Core（顧客管理）"
                      monthly="5,500円/月（モニター枠は初期費用0円・通常は初期費用33,000円）"
                      buyout="-"
                    />
                    <PriceItem
                      name="予約管理"
                      monthly="3,980円/月（初期費用11,000円）"
                      buyout="-"
                    />
                    <PriceItem
                      name="WEB問診"
                      monthly="2,980円/月（初期費用11,000円）"
                      buyout="-"
                    />
                    <PriceItem
                      name="MEO勝ち上げくん"
                      monthly="3,980円/月（初期費用11,000円）"
                      buyout="-"
                    />
                    <p className="text-xs text-gray-500 mt-2">
                      ※モニター枠は人数限定です。定員に達し次第、通常料金（初期費用込み）に切り替わります。
                    </p>
                    <p className="text-xs text-gray-500">
                      ※セット割引・キャンペーン等の詳細は販売ページをご確認ください。
                    </p>
                  </div>
                }
              />
              <Row
                label="販売価格以外の必要料金"
                value="インターネット接続料金、通信料金等はお客様のご負担となります。"
              />
              <Row
                label="支払方法"
                value="クレジットカード決済（Stripe経由 / Visa・Mastercard・JCB・American Express対応）"
              />
              <Row
                label="支払時期"
                value={
                  <div className="space-y-1">
                    <p>
                      <span className="font-medium">月額プラン：</span>
                      ご契約時に初月分（および初期費用が発生する場合はその費用）を決済。以降、毎月自動更新にて課金されます。
                    </p>
                  </div>
                }
              />
              <Row
                label="商品の引渡し時期"
                value="決済完了後、原則として即日〜3営業日以内にアカウントを発行し、サービスをご利用いただけます。初期設定・データ移行が必要な場合は、別途ご案内いたします。"
              />
              <Row
                label="返品・キャンセルについて"
                value={
                  <div className="space-y-1">
                    <p>
                      <span className="font-medium">月額プラン：</span>
                      最低契約期間（原則6ヶ月、サービスにより異なります）経過後はいつでも解約可能です。最低契約期間内に解約された場合、残存月数分の早期解約金を申し受けます。解約のお申し出をいただいた月の末日をもってサービスを停止いたします。日割り返金はいたしません。
                    </p>
                    <p>
                      <span className="font-medium">アカウント発行後の返品・返金：</span>
                      デジタルサービスの性質上、ご利用開始後の返金には応じかねます。
                    </p>
                  </div>
                }
              />
              <Row
                label="動作環境"
                value={
                  <div className="space-y-1">
                    <p>
                      Webブラウザ（Google Chrome / Safari /
                      Microsoft Edge の最新版を推奨）
                    </p>
                    <p>
                      インターネット接続環境が必要です。スマートフォン・タブレットにも対応しています。
                    </p>
                  </div>
                }
              />
              <Row
                label="特別な販売条件"
                value="未成年者のお申込みには、法定代理人の同意が必要です。"
              />
            </tbody>
          </table>
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

function Row({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) {
  return (
    <tr>
      <th className="px-6 py-4 bg-gray-50 text-left font-medium text-gray-700 align-top w-44 whitespace-nowrap">
        {label}
      </th>
      <td className="px-6 py-4 text-gray-800">{value}</td>
    </tr>
  );
}

function PriceItem({
  name,
  monthly,
  buyout,
}: {
  name: string;
  monthly: string;
  buyout: string;
}) {
  return (
    <div className="flex flex-wrap gap-x-4 text-sm">
      <span className="font-medium text-gray-800 w-36">{name}</span>
      <span className="text-gray-600">月額 {monthly}</span>
      <span className="text-gray-400">|</span>
      <span className="text-gray-600">買切り {buyout}</span>
    </div>
  );
}
