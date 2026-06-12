"use client";

import { useState } from "react";
import Link from "next/link";

type Props = {
  href: string;
  label: string;
  variant?: "primary" | "secondary";
  /** 青系などの暗い背景で使う際にチェックボックス文字・リーガルリンク色を白系に切り替える */
  onDark?: boolean;
  className?: string;
};

export default function PurchaseButton({
  href,
  label,
  variant = "primary",
  onDark = false,
  className = "",
}: Props) {
  const [agreed, setAgreed] = useState(false);

  const base = variant === "primary"
    ? (onDark
        ? "bg-white text-blue-700 hover:bg-blue-50 shadow-md"
        : "bg-blue-600 text-white hover:bg-blue-700 shadow-md")
    : "bg-gray-900 text-white hover:bg-gray-800 shadow-md";

  const labelTextColor = onDark ? "text-white/95" : "text-gray-600";
  const linkColor = onDark
    ? "underline text-yellow-300 hover:text-yellow-200 font-medium"
    : "underline text-blue-600 hover:text-blue-700";

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!agreed) {
      e.preventDefault();
      alert("利用規約・プライバシーポリシー・特定商取引法に基づく表記への同意が必要です。");
    }
  };

  return (
    <div className={`inline-flex flex-col items-stretch gap-2 ${className}`}>
      <label className={`flex items-start gap-2 text-xs max-w-sm mx-auto text-left leading-snug ${labelTextColor}`}>
        <input
          type="checkbox"
          checked={agreed}
          onChange={(e) => setAgreed(e.target.checked)}
          className="mt-0.5 shrink-0"
        />
        <span>
          <Link href="/legal/terms" target="_blank" className={linkColor}>利用規約</Link>
          ・
          <Link href="/legal/privacy" target="_blank" className={linkColor}>プライバシーポリシー</Link>
          ・
          <Link href="/legal/tokushoho" target="_blank" className={linkColor}>特商法表記</Link>
          に同意します（最低契約期間6ヶ月、早期解約金あり）
        </span>
      </label>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleClick}
        aria-disabled={!agreed}
        className={`inline-block text-lg font-bold px-10 py-4 rounded-xl transition ${base} ${
          !agreed ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        {label}
      </a>
    </div>
  );
}
