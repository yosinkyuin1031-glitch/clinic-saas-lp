import { DEVELOPER } from "../../lib/site-config";

export function DeveloperCard({ photoUrl }: { photoUrl?: string } = {}) {
  return (
    <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden">
      <div className="aspect-[5/6] relative bg-gray-100">
        <img
          src={photoUrl ?? DEVELOPER.portraitAlt}
          alt={DEVELOPER.name}
          className="absolute inset-0 w-full h-full object-cover object-top"
        />
      </div>
      <div className="p-5">
        <p className="text-xs text-blue-600 font-medium uppercase tracking-widest mb-2">Developer</p>
        <p className="font-bold text-xl text-gray-900">{DEVELOPER.name}</p>
        <p className="text-sm text-gray-500 mt-1">{DEVELOPER.title}</p>
        <div className="mt-4 pt-4 border-t border-gray-100 space-y-2 text-xs text-gray-600 leading-relaxed">
          {DEVELOPER.bullets.map((bullet, i) => (
            <p key={i}>・{bullet}</p>
          ))}
        </div>
        <p className="text-xs text-gray-500 mt-4 leading-relaxed border-l-4 border-blue-200 pl-3 italic">
          「{DEVELOPER.quote}」
        </p>
      </div>
    </div>
  );
}
