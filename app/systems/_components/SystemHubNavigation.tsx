import Link from "next/link";
import { MAIN_APPS, LINE_URL } from "../../lib/site-config";

// アプリごとのアクセント色（safelistの代わりに静的に持つ）
const APP_THEME_BG: Record<string, string> = {
  kensa: "bg-blue-50",
  customer: "bg-indigo-50",
  meo: "bg-emerald-50",
};

// 個別LPの最下部に置き、他主力アプリ・総合LPへの回遊導線を作るHUBナビ
export function SystemHubNavigation({ currentAppId }: { currentAppId: "kensa" | "customer" | "meo" }) {
  const others = MAIN_APPS.filter((a) => a.id !== currentAppId);

  return (
    <section className="py-20 bg-gradient-to-b from-white via-gray-50 to-white border-t border-gray-100">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-10">
          <p className="text-xs font-bold text-blue-600 tracking-widest uppercase mb-2">More</p>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">他のシステムも見てみる</h2>
          <p className="text-sm text-gray-500 mt-3 leading-relaxed">
            ClinicMarkは「治療と教育の時間を守るための業務アプリ群」。
            <br className="hidden md:block" />
            気になる分野から、必要なものだけ導入できます。
          </p>
        </div>

        {/* 他主力アプリ2枚 */}
        <div className="grid md:grid-cols-2 gap-5 mb-10">
          {others.map((app) => (
            <Link
              key={app.id}
              href={app.detailUrl}
              className="group block bg-white rounded-2xl border border-gray-200 p-6 hover:border-blue-400 hover:shadow-lg transition-all"
            >
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 rounded-xl ${APP_THEME_BG[app.id] ?? "bg-blue-50"} flex items-center justify-center text-2xl flex-shrink-0`}>
                  {app.iconEmoji}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-bold text-lg text-gray-900 truncate">{app.name}</h3>
                    <span className="text-xs text-gray-400">月額{app.monthlyPrice.toLocaleString()}円〜</span>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed mb-3">{app.tagline}</p>
                  <span className="inline-flex items-center text-sm font-bold text-blue-600 group-hover:translate-x-1 transition-transform">
                    詳しく見る →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* 総合LPへ戻る大型CTA */}
        <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-8 md:p-10 text-center shadow-xl">
          <p className="text-xs font-bold text-blue-200 tracking-widest uppercase mb-3">ClinicMark Hub</p>
          <h3 className="text-xl md:text-2xl font-bold text-white mb-3">
            すべてのシステムをまとめて見る
          </h3>
          <p className="text-sm text-blue-100 leading-relaxed mb-6 max-w-xl mx-auto">
            開発予定のアプリ・オーダーメイド開発・料金体系・導入院の声まで、
            <br className="hidden md:block" />
            ClinicMarkの全体像が分かる「総合ページ」をご用意しています。
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 bg-white text-blue-700 px-8 py-3.5 rounded-xl font-bold text-base hover:bg-blue-50 transition-all shadow-md"
            >
              総合ページで全システムを見る →
            </Link>
            <a
              href={LINE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-blue-800/40 backdrop-blur text-white px-8 py-3.5 rounded-xl font-bold text-base border-2 border-white/30 hover:bg-blue-800/60 transition-all"
            >
              迷ったらLINEで相談
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
