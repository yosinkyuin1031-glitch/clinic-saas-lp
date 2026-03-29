"use client";

import { useState, useEffect } from "react";

interface Slide {
  src: string;
  label: string;
}

const SLIDES: Slide[] = [
  { src: "/images/kensa-demo/01-dashboard.png", label: "ダッシュボード - 検査数・患者数・月別推移" },
  { src: "/images/kensa-demo/02-patient-info.png", label: "Step1: 患者情報 - 新規 or 既存患者を検索" },
  { src: "/images/kensa-demo/03-patient-filled.png", label: "Step1: 主訴・痛みレベル(NRS)・重心バランス入力" },
  { src: "/images/kensa-demo/04-standing-default.png", label: "Step2: 立位検査 - 3つのランドマークを評価" },
  { src: "/images/kensa-demo/05-standing-filled.png", label: "Step2: 立位検査 - 左右差をタップで記録" },
  { src: "/images/kensa-demo/06-seated-default.png", label: "Step3: 座位検査 - 足の影響を自動判定" },
  { src: "/images/kensa-demo/07-seated-filled.png", label: "Step3: 座位検査 - 立位との比較結果" },
  { src: "/images/kensa-demo/08-diagnosis-result.png", label: "Step4: 診断結果 - 原因部位を自動特定" },
  { src: "/images/kensa-demo/09-selfcare.png", label: "AIがセルフケアメニューを自動提案" },
  { src: "/images/kensa-demo/10-pdf-buttons.png", label: "PDF出力 - 患者用・施術者用を選択" },
  { src: "/images/kensa-demo/11-patients.png", label: "患者一覧 - 検索・検査履歴・カルテ管理" },
  { src: "/images/kensa-demo/12-history.png", label: "検査履歴 - 患者別 or 時系列で閲覧" },
  { src: "/images/kensa-demo/13-exam-detail.png", label: "検査詳細 - 過去の検査を確認・前回比較" },
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
