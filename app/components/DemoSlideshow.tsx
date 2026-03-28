"use client";

import { useState, useEffect } from "react";

interface Slide {
  src: string;
  label: string;
}

const SLIDES: Slide[] = [
  { src: "/images/kensa-demo/01-dashboard.png", label: "ダッシュボード - 統計・月別推移" },
  { src: "/images/kensa-demo/03-patient-filled.png", label: "患者情報を入力" },
  { src: "/images/kensa-demo/05-standing-filled.png", label: "立位検査 - ランドマーク入力" },
  { src: "/images/kensa-demo/07-seated-filled.png", label: "座位検査 - 立位との比較" },
  { src: "/images/kensa-demo/08-diagnosis-result.png", label: "診断結果が自動で出る" },
  { src: "/images/kensa-demo/09-selfcare.png", label: "AIがセルフケアを自動提案" },
  { src: "/images/kensa-demo/10-pdf-buttons.png", label: "PDFレポートをワンクリック出力" },
  { src: "/images/kensa-demo/11-patients.png", label: "患者一覧・検索" },
];

export default function DemoSlideshow() {
  const [current, setCurrent] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    if (!isPlaying) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % SLIDES.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [isPlaying]);

  return (
    <div className="space-y-4">
      {/* メイン画像 */}
      <div className="relative rounded-2xl border border-gray-200 shadow-xl overflow-hidden">
        <div className="bg-gray-800 px-4 py-2.5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-400"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
              <div className="w-3 h-3 rounded-full bg-green-400"></div>
            </div>
            <span className="text-xs text-gray-400 ml-2">{SLIDES[current].label}</span>
          </div>
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="text-gray-400 hover:text-white text-xs transition"
          >
            {isPlaying ? "⏸ 一時停止" : "▶ 再生"}
          </button>
        </div>
        <div className="relative bg-gray-100" style={{ aspectRatio: "16/10" }}>
          {SLIDES.map((slide, i) => (
            <img
              key={i}
              src={slide.src}
              alt={slide.label}
              className={`absolute inset-0 w-full h-full object-cover object-top transition-opacity duration-700 ${
                i === current ? "opacity-100" : "opacity-0"
              }`}
            />
          ))}
        </div>
        {/* 進行バー */}
        <div className="h-1 bg-gray-200 flex">
          {SLIDES.map((_, i) => (
            <div
              key={i}
              className="flex-1 transition-colors duration-300"
              style={{
                backgroundColor: i <= current ? "#2196F3" : "transparent",
              }}
            />
          ))}
        </div>
      </div>

      {/* サムネイル */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {SLIDES.map((slide, i) => (
          <button
            key={i}
            onClick={() => {
              setCurrent(i);
              setIsPlaying(false);
            }}
            className={`flex-shrink-0 rounded-lg overflow-hidden border-2 transition-all ${
              i === current
                ? "border-[#2196F3] shadow-md scale-105"
                : "border-gray-200 opacity-60 hover:opacity-100"
            }`}
            style={{ width: 100 }}
          >
            <img
              src={slide.src}
              alt={slide.label}
              className="w-full h-14 object-cover object-top"
            />
            <p className="text-[8px] text-gray-500 px-1 py-0.5 bg-white truncate">
              {slide.label}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
}
