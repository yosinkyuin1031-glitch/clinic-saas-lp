import { INDUSTRIES, type IndustryUseCase } from "../../lib/site-config";

type Props = {
  useCases: IndustryUseCase[]; // 業種ごとの使い方
  appName: string; // アプリ名（見出し用）
};

export function IndustryUseCaseSection({ useCases, appName }: Props) {
  return (
    <section className="py-16 max-w-5xl mx-auto px-6">
      <p className="text-center text-sm font-medium text-blue-600 uppercase tracking-widest mb-3">By Industry</p>
      <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-4">
        業種別の使い方
      </h2>
      <p className="text-center text-gray-500 mb-12 leading-relaxed">
        {appName}は、整体院・鍼灸院・接骨院・サロンそれぞれの現場で使われています。
      </p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {INDUSTRIES.map((industry) => {
          const useCase = useCases.find((u) => u.industry === industry.id);
          return (
            <div
              key={industry.id}
              className={`rounded-2xl border p-5 ${
                useCase
                  ? "bg-white border-gray-200 shadow-sm"
                  : "bg-gray-50 border-gray-100 border-dashed"
              }`}
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl">{industry.emoji}</span>
                <h3 className="font-bold text-base text-gray-900">{industry.label}</h3>
              </div>
              {useCase ? (
                <p className="text-sm text-gray-600 leading-relaxed">{useCase.body}</p>
              ) : (
                <p className="text-xs text-gray-400 italic">
                  ご利用ケースを募集中
                </p>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
