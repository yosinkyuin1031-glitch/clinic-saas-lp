// 検査ポイント（乳様突起・肩甲下角・腸骨稜）を示す人体図SVG
// カラダマップ個別LP専用。
export function BodyLandmarkSvg({
  className = "",
  showLabels = true,
  highlight,
}: {
  className?: string;
  showLabels?: boolean;
  highlight?: "head" | "shoulder" | "pelvis" | null;
}) {
  return (
    <svg
      viewBox="0 0 240 360"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      aria-label="人体検査ポイント図"
    >
      {/* 背景グラデーション */}
      <defs>
        <linearGradient id="bodyGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#dbeafe" />
          <stop offset="100%" stopColor="#bfdbfe" />
        </linearGradient>
      </defs>

      {/* 頭 */}
      <ellipse cx="120" cy="35" rx="24" ry="28" fill="url(#bodyGrad)" stroke="#3b82f6" strokeWidth="1.5" />
      {/* 首 */}
      <rect x="112" y="60" width="16" height="14" fill="url(#bodyGrad)" stroke="#3b82f6" strokeWidth="1.5" />
      {/* 胴体（肩〜腰） */}
      <path
        d="M 80 78 Q 80 75 86 75 L 154 75 Q 160 75 160 78 L 168 180 Q 168 195 154 196 L 86 196 Q 72 195 72 180 Z"
        fill="url(#bodyGrad)"
        stroke="#3b82f6"
        strokeWidth="1.5"
      />
      {/* 骨盤・腰 */}
      <path
        d="M 75 196 L 165 196 L 158 220 Q 158 230 150 230 L 90 230 Q 82 230 82 220 Z"
        fill="url(#bodyGrad)"
        stroke="#3b82f6"
        strokeWidth="1.5"
      />
      {/* 左腕 */}
      <path d="M 80 80 Q 65 100 60 130 L 64 160 L 70 160 L 72 130 Q 75 105 86 88 Z" fill="url(#bodyGrad)" stroke="#3b82f6" strokeWidth="1.5" />
      {/* 右腕 */}
      <path d="M 160 80 Q 175 100 180 130 L 176 160 L 170 160 L 168 130 Q 165 105 154 88 Z" fill="url(#bodyGrad)" stroke="#3b82f6" strokeWidth="1.5" />
      {/* 左脚 */}
      <path d="M 90 230 L 95 320 L 110 320 L 112 230 Z" fill="url(#bodyGrad)" stroke="#3b82f6" strokeWidth="1.5" />
      {/* 右脚 */}
      <path d="M 128 230 L 130 320 L 145 320 L 150 230 Z" fill="url(#bodyGrad)" stroke="#3b82f6" strokeWidth="1.5" />

      {/* ランドマーク1: 乳様突起（耳の後ろ・首付近） */}
      <circle cx="106" cy="55" r="5" fill={highlight === "head" ? "#ef4444" : "#3b82f6"} />
      <circle cx="134" cy="55" r="5" fill={highlight === "head" ? "#ef4444" : "#3b82f6"} />
      {showLabels && (
        <g>
          <line x1="106" y1="55" x2="40" y2="40" stroke="#3b82f6" strokeWidth="1" strokeDasharray="2 2" />
          <text x="38" y="40" fontSize="10" fill="#1e40af" textAnchor="end" fontWeight="700">①</text>
          <text x="38" y="52" fontSize="9" fill="#1e3a8a" textAnchor="end">乳様突起</text>
        </g>
      )}

      {/* ランドマーク2: 肩甲下角 */}
      <circle cx="88" cy="130" r="5" fill={highlight === "shoulder" ? "#ef4444" : "#3b82f6"} />
      <circle cx="152" cy="130" r="5" fill={highlight === "shoulder" ? "#ef4444" : "#3b82f6"} />
      {showLabels && (
        <g>
          <line x1="152" y1="130" x2="210" y2="120" stroke="#3b82f6" strokeWidth="1" strokeDasharray="2 2" />
          <text x="212" y="120" fontSize="10" fill="#1e40af" fontWeight="700">②</text>
          <text x="212" y="132" fontSize="9" fill="#1e3a8a">肩甲下角</text>
        </g>
      )}

      {/* ランドマーク3: 腸骨稜 */}
      <circle cx="92" cy="205" r="5" fill={highlight === "pelvis" ? "#ef4444" : "#3b82f6"} />
      <circle cx="148" cy="205" r="5" fill={highlight === "pelvis" ? "#ef4444" : "#3b82f6"} />
      {showLabels && (
        <g>
          <line x1="92" y1="205" x2="32" y2="220" stroke="#3b82f6" strokeWidth="1" strokeDasharray="2 2" />
          <text x="30" y="220" fontSize="10" fill="#1e40af" textAnchor="end" fontWeight="700">③</text>
          <text x="30" y="232" fontSize="9" fill="#1e3a8a" textAnchor="end">腸骨稜</text>
        </g>
      )}

      {/* 中心軸（参考線） */}
      <line x1="120" y1="68" x2="120" y2="320" stroke="#94a3b8" strokeWidth="0.5" strokeDasharray="3 3" />
    </svg>
  );
}
