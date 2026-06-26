import type { Testimonial } from "../../lib/testimonials";
import { getAppDisplayName } from "../../lib/site-config";

// 短いコメント用カード（総合LP「導入院の声」4列グリッド用）
export function VoiceCardShort({ t }: { t: Testimonial }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
      <div className="flex items-center gap-3 mb-4">
        {t.photoUrl ? (
          <img
            src={t.photoUrl}
            alt={t.displayName}
            className="w-11 h-11 rounded-full object-cover object-top border-2 border-white ring-2 ring-accent/20"
          />
        ) : (
          <div className="w-11 h-11 bg-primary/10 rounded-full flex items-center justify-center">
            <span className="text-primary font-bold text-sm">
              {t.initial ?? t.displayName.charAt(0)}
            </span>
          </div>
        )}
        <div className="min-w-0">
          <p className="font-bold text-sm text-primary truncate">{t.displayName}</p>
          <p className="text-xs text-gray-400">
            {t.role}
            {t.location ? ` ・ ${t.location}` : ""}
          </p>
        </div>
      </div>
      {t.industryLabel && (
        <span className="inline-block text-[10px] font-bold bg-accent/10 text-accent px-2 py-0.5 rounded-full mb-3">
          {t.industryLabel}
        </span>
      )}
      <p className="text-sm text-gray-600 leading-relaxed">&ldquo;{t.shortText}&rdquo;</p>
      {t.targetApps && t.targetApps.length > 0 && (
        <div className="mt-4 pt-3 border-t border-gray-100">
          <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-1.5">利用中</p>
          <div className="flex flex-wrap gap-1.5">
            {t.targetApps.map((id) => (
              <span key={id} className="inline-block text-[11px] font-medium bg-blue-50 text-blue-700 px-2 py-0.5 rounded-md">
                {getAppDisplayName(id)}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// 詳細カード（個別LP「導入事例」用・縦並び大型）
export function VoiceCardDetail({ t }: { t: Testimonial }) {
  if (!t.detail) return null;
  return (
    <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
      <div className="flex items-center gap-4 mb-6">
        {t.photoUrl ? (
          <img
            src={t.photoUrl}
            alt={t.displayName}
            className="w-14 h-14 rounded-full object-cover object-top border-2 border-white ring-2 ring-blue-500/20 flex-shrink-0"
          />
        ) : (
          <div className="w-14 h-14 rounded-full bg-blue-600 flex items-center justify-center text-white text-xl font-bold flex-shrink-0">
            {t.initial ?? t.displayName.charAt(0)}
          </div>
        )}
        <div>
          <p className="font-bold text-lg text-gray-900">{t.displayName}</p>
          <p className="text-sm text-gray-500">
            {t.role}
            {t.industryLabel ? ` ・ ${t.industryLabel}` : ""}
            {t.location ? ` ・ ${t.location}` : ""}
          </p>
        </div>
      </div>
      {t.targetApps && t.targetApps.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-5">
          {t.targetApps.map((id) => (
            <span key={id} className="inline-block text-xs font-medium bg-blue-50 text-blue-700 px-3 py-1 rounded-md">
              利用中：{getAppDisplayName(id)}
            </span>
          ))}
        </div>
      )}
      <p className="text-gray-600 text-sm leading-relaxed mb-4">{t.detail.background}</p>
      <ul className="space-y-2 mb-6">
        {t.detail.points.map((point) => (
          <li
            key={point}
            className="flex items-start gap-2 text-sm text-gray-700"
          >
            <span className="text-blue-500 flex-shrink-0 mt-0.5">&#x2713;</span>
            {point}
          </li>
        ))}
      </ul>
      <div className="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4">
        <p className="text-gray-700 text-sm leading-relaxed italic">
          &ldquo;{t.detail.quote}&rdquo;
        </p>
      </div>
    </div>
  );
}

// 開発実績カード（kind='custom'用）
export function CustomWorkCard({ t }: { t: Testimonial }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-bold bg-violet-100 text-violet-700 px-2 py-0.5 rounded-full">
          {t.customAppCategory ?? "受託開発"}
        </span>
        {t.developedYear && (
          <span className="text-xs text-gray-400">{t.developedYear}</span>
        )}
      </div>
      {t.customAppName && (
        <h3 className="font-black text-lg text-primary mb-2">{t.customAppName}</h3>
      )}
      <p className="text-sm text-gray-600 leading-relaxed mb-4">&ldquo;{t.shortText}&rdquo;</p>
      <div className="flex items-center gap-3 mt-4 pt-4 border-t border-gray-100">
        {t.photoUrl ? (
          <img
            src={t.photoUrl}
            alt={t.displayName}
            className="w-10 h-10 rounded-full object-cover object-top"
          />
        ) : (
          <div className="w-10 h-10 bg-violet-100 rounded-full flex items-center justify-center">
            <span className="text-violet-700 font-bold text-xs">
              {t.initial ?? t.displayName.charAt(0)}
            </span>
          </div>
        )}
        <div>
          <p className="font-bold text-xs text-primary">{t.displayName}</p>
          <p className="text-[11px] text-gray-400">{t.role}</p>
        </div>
      </div>
    </div>
  );
}
