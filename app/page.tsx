"use client";

import { useState, useMemo } from "react";
import { getGeneralProductVoices, getCustomVoices } from "./lib/testimonials";
import { VoiceCardShort, CustomWorkCard } from "./systems/_components/VoiceCard";
import { LINE_URL } from "./lib/site-config";

// ========== データ定義 ==========

const APPS = [
  {
    id: "kensa",
    name: "カラダマップ",
    shortName: "カラダマップ",
    categories: ["検査＆診断"],
    description: "3分で、体の\"いま\"を見える化。5段階の検査ウィザードで原因部位を自動特定。患者用・施術者用PDF出力、経過比較、セルフケア自動提案まで。",
    features: ["5段階検査ウィザード", "原因部位を自動特定", "患者用・施術者用PDF出力", "セルフケア自動提案"],
    monthlyPrice: 5500,
    initialCost: 0,
    maintenancePrice: 0,
    badge: "看板商品",
    demoUrl: "https://kensa-sheet-app.vercel.app/demo",
    detailUrl: "/systems/kensa",
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15a2.25 2.25 0 012.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
      </svg>
    ),
  },
  {
    id: "customer",
    name: "Clinic Core",
    shortName: "顧客管理",
    categories: ["開業", "集客", "内製化"],
    description: "現役治療家が作った、現場で使える顧客管理。患者情報を一元管理。来院履歴・離反アラート・データ分析ダッシュボード搭載。最低契約6ヶ月。",
    features: ["患者情報を一元管理", "来院履歴・離反アラート", "データ分析ダッシュボード"],
    monthlyPrice: 5500,
    initialCost: 0,
    maintenancePrice: 0,
    badge: "NEW",
    demoUrl: "https://clinic-core-demo.vercel.app",
    detailUrl: "/systems/customer",
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
      </svg>
    ),
  },
  {
    id: "reservation",
    name: "予約管理",
    shortName: "予約管理",
    categories: ["開業", "内製化"],
    description: "カレンダー形式で直感操作。ダブルブッキング防止、LINE通知連携。Clinic Coreとの2システム連携を準備中。",
    features: ["カレンダー形式で直感操作", "ダブルブッキング防止", "Clinic Coreと連携予定"],
    monthlyPrice: 3980,
    initialCost: 0,
    maintenancePrice: 0,
    badge: "準備中",
    demoUrl: "",
    detailUrl: "/systems/reservation",
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
      </svg>
    ),
  },
  // WEB問診（monshin）: ¥5,500統一・新Stripe Payment Link準備中につき、一時的にLPから非表示。
  // 設定完了時に下記を復活＆stripeLinksに追加すれば再公開される。
  // {
  //   id: "monshin",
  //   name: "WEB問診",
  //   shortName: "WEB問診",
  //   categories: ["開業"],
  //   description: "来院前にスマホで問診。自動集計・PDF出力。整体／鍼灸／接骨院／サロンテンプレ＋項目ON/OFFでカスタマイズ可能。",
  //   features: ["来院前にスマホで問診", "自動集計・PDF出力", "業種別テンプレ＋項目カスタマイズ"],
  //   monthlyPrice: 5500,
  //   initialCost: 0,
  //   maintenancePrice: 0,
  //   badge: "準備中",
  //   demoUrl: "",
  //   detailUrl: "/systems/monshin",
  // },
  {
    id: "meo",
    name: "MEO勝ち上げくん",
    shortName: "MEO対策",
    categories: ["集客", "内製化"],
    description: "キーワード1つでブログ・FAQ・GBP・noteを同時生成。医療広告ガイドラインを自動チェック。WordPress連携で公開まで全自動。",
    features: ["キーワード1つで4コンテンツ同時生成", "医療広告ガイドライン違反を自動防止", "LLMO対策・WordPress連携で公開まで全自動"],
    monthlyPrice: 5500,
    initialCost: 0,
    maintenancePrice: 0,
    badge: "看板商品",
    demoUrl: "https://meo-kachiagekun.vercel.app/demo",
    detailUrl: "/systems/meo",
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
      </svg>
    ),
  },
  {
    id: "sleep",
    name: "睡眠チェック分析",
    shortName: "睡眠チェック",
    categories: ["検査＆診断", "体質分析"],
    description: "5軸×30問で睡眠の質を数値化。レーダーチャート・AIセルフケア提案・PDF出力。",
    features: ["5軸スコアリング分析", "AIセルフケア・施術提案", "ビフォーアフター比較"],
    monthlyPrice: 3300,
    initialCost: 0,
    maintenancePrice: 0,
    badge: "準備中",
    demoUrl: "",
    detailUrl: "/systems/sleep",
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
      </svg>
    ),
  },
  {
    id: "heatscope",
    name: "HeatScope",
    shortName: "HPヒートマップ",
    categories: ["集客", "内製化"],
    description: "治療院HPのどこが見られて、どこが押されてるかが3分でわかる。クリック・スクロール・アテンションマップ＋治療院専用の自動改善提案。",
    features: ["クリック／スクロール／アテンション3種ヒートマップ", "治療院専用の自動改善提案（日本語）", "WordPress/ペライチ等の設置ガイド＋制作会社向け依頼書PDF"],
    monthlyPrice: 5500,
    initialCost: 0,
    maintenancePrice: 0,
    badge: "準備中",
    demoUrl: "https://heatscope.vercel.app/demo",
    detailUrl: "/systems/heatscope",
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 2.25c-2.429 0-4.817.178-7.152.521C2.87 3.061 1.5 4.795 1.5 6.741v6.018c0 1.946 1.37 3.68 3.348 3.97.877.129 1.761.234 2.652.316V21l4.5-4.5c2.429 0 4.817-.178 7.152-.52 1.978-.29 3.348-2.025 3.348-3.971V6.741c0-1.946-1.37-3.68-3.348-3.97A48.43 48.43 0 0012 2.25z" />
      </svg>
    ),
  },
  {
    id: "menu",
    name: "メニュー管理",
    shortName: "メニュー管理",
    categories: ["内製化", "集客"],
    description: "施術・物販・オプションのメニューマスター＋松竹梅プランを一元管理。提案書ジェネレーターと連携して、A4提案書とスライドにそのまま反映できます。",
    features: ["メニュー（施術／物販／オプション）一元管理", "松竹梅プラン構成・院ごと自由設計", "提案書ジェネレーターと連携可能"],
    monthlyPrice: 3300,
    initialCost: 0,
    maintenancePrice: 0,
    badge: "準備中",
    demoUrl: "https://menu-proposal.vercel.app",
    detailUrl: "",
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
      </svg>
    ),
  },
  {
    id: "proposal",
    name: "提案書ジェネレーター",
    shortName: "提案書作成",
    categories: ["集客", "内製化"],
    description: "3分で、患者の心を動かす提案書とスライドを。A4提案書＋13枚スライドを自動生成。年齢・症状で4テーマ自動切替・PDF出力対応。",
    features: ["9症状プリセットからA4提案書を自動生成", "NotebookLM風13枚スライドを同時生成", "年齢・症状で4テーマ自動切替・PDF出力"],
    monthlyPrice: 1100,
    initialCost: 0,
    maintenancePrice: 0,
    badge: "準備中",
    demoUrl: "https://proposal-generator-gold.vercel.app",
    detailUrl: "",
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5A3.375 3.375 0 0010.125 2.25H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
      </svg>
    ),
  },
  {
    id: "subpoints",
    name: "サブスクポイント管理",
    shortName: "サブスク管理",
    categories: ["開業", "内製化"],
    description: "治療院のサブスク会員を、まるごと自動管理。Square／会費ペイの自動引落＋ポイント連携。引落失敗の自動休止・リマインダーまで標準装備。",
    features: ["Square／会費ペイ自動引落＋ポイント連携", "引落失敗の自動休止・リマインダー", "患者マイページ（QRコード）・月次レポート"],
    monthlyPrice: 5500,
    initialCost: 0,
    maintenancePrice: 0,
    badge: "準備中",
    demoUrl: "https://clinic-point-system.vercel.app",
    detailUrl: "",
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
      </svg>
    ),
  },
  {
    id: "changesnap",
    name: "ChangeSnap",
    shortName: "写真比較",
    categories: ["集客", "内製化"],
    description: "治療院のビフォーアフターを、最速で素材化。比較画像も動画もワンタップ書き出し。SNS・LP・院内POPの素材作りが3分で完了。",
    features: ["ビフォーアフター写真を一元管理", "左右・上下・スライド比較を自動生成", "動画書き出し（MediaRecorder）"],
    monthlyPrice: 1100,
    initialCost: 0,
    maintenancePrice: 0,
    badge: "準備中",
    demoUrl: "https://changesnap.vercel.app",
    detailUrl: "",
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
      </svg>
    ),
  },
  {
    id: "invoice",
    name: "InvoiceForge",
    shortName: "請求書作成",
    categories: ["内製化"],
    description: "治療院の請求書を、3分で。施術メニューがワンタップ、消費税も自動計算。PDF出力・テンプレ保存・売上サマリーまで一気通貫。",
    features: ["施術メニューをワンタップ追加", "消費税自動計算・PDF出力", "売上サマリー・複製・オートセーブ"],
    monthlyPrice: 1100,
    initialCost: 0,
    maintenancePrice: 0,
    badge: "準備中",
    demoUrl: "https://invoice-forge-ashy.vercel.app",
    detailUrl: "",
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
  },
  {
    id: "threadslab",
    name: "ThreadsLab",
    shortName: "スレッツ自動化",
    categories: ["集客", "内製化"],
    description: "AIがThreads投稿を毎日自動生成＋自動投稿。治療院特化プロンプト・薬機法NGフィルタ・随時承認モード搭載のSNS集客SaaS。",
    features: ["AIが毎日Threads投稿を自動生成", "薬機法NGフィルタ・治療院特化プロンプト", "Threads Graph APIで自動投稿（承認モード）"],
    monthlyPrice: 11000,
    initialCost: 0,
    maintenancePrice: 0,
    badge: "準備中",
    demoUrl: "",
    detailUrl: "",
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
      </svg>
    ),
  },
];

const CATEGORIES = ["すべて", "開業", "集客", "内製化", "検査＆診断"];

type PriceTier = {
  id: string;
  label: string;
  sub: string;
  desc: string;
  range: [number, number];
  color: string;
  accent: string;
  border: string;
  custom?: boolean;
};

const PRICE_TIERS: PriceTier[] = [
  {
    id: "light",
    label: "1,000円台",
    sub: "ライト",
    desc: "サブとしてサクッと導入できる単機能アプリ",
    range: [0, 1999],
    color: "from-sky-50 to-blue-50",
    accent: "text-sky-700",
    border: "border-sky-200",
  },
  {
    id: "standard",
    label: "3,000円台",
    sub: "スタンダード",
    desc: "院の日々の業務を支える主力アプリ",
    range: [2000, 4999],
    color: "from-amber-50 to-orange-50",
    accent: "text-amber-700",
    border: "border-amber-200",
  },
  {
    id: "premium",
    label: "5,000円台〜",
    sub: "プレミアム",
    desc: "院全体の業務をまるごと統合する基幹アプリ・ハイエンド機能",
    range: [5000, 99999],
    color: "from-rose-50 to-pink-50",
    accent: "text-rose-700",
    border: "border-rose-200",
  },
  {
    id: "custom",
    label: "オーダーメイド",
    sub: "カスタム開発",
    desc: "院の業務に合わせて一から作るオリジナルアプリ",
    range: [10000, 999999],
    color: "from-violet-50 to-indigo-50",
    accent: "text-violet-700",
    border: "border-violet-200",
    custom: true,
  },
];

const COMING_SOON_APPS = [
  "LINE自動化ツール",
  "請求書作成システム",
  "LP作成ツール",
];

// WEB問診（monshin）は¥5,500統一の新Payment Link準備中につき、セット例から一時的に除外。
const SET_EXAMPLES = [
  {
    name: "経営強化パック",
    appIds: ["kensa", "customer"],
    description: "検査で説明根拠を作り、Clinic Coreで経営数字を見える化",
    setMonthly: 10500, // 5500+5500=11000 から ¥500 OFF
    setInitial: 0,
    label: "¥500/月OFF",
    note: null,
  },
  {
    name: "集客強化パック",
    appIds: ["meo", "customer"],
    description: "Googleマップ集客＋顧客管理で、新規〜リピートまで一気通貫",
    setMonthly: 10500, // 5500+5500=11000 から ¥500 OFF
    setInitial: 0,
    label: "¥500/月OFF",
    note: null,
  },
  {
    name: "フル装備パック",
    appIds: ["kensa", "customer", "meo"],
    description: "主力3アプリ全部入り。検査・顧客管理・集客をまとめて内製化",
    setMonthly: 15500, // 5500*3=16500 から ¥1,000 OFF
    setInitial: 0,
    label: "¥1,000/月OFF",
    note: null,
  },
];

const FAQS = [
  {
    q: "ITに詳しくなくても使えますか？",
    a: "はい。タブレット・スマホで完結する設計で、現役治療家（大口神経整体院）が自分の院で毎日使っています。専属の開発者やITスタッフは必要ありません。導入時はLINEで個別サポート、初期設定もこちらで代行可能です。",
  },
  {
    q: "アカウントを分けるために、人数の追加は必要ですか？",
    a: "はい。スタッフごとにログインを分けて運用される場合、人数分のアカウント発行が必要になります。1院1アカウントで全員が共有して使う運用にされる場合は、追加なしでお使いいただけます。詳しい料金は導入時にご相談ください。",
  },
  {
    q: "データの移行はできますか？",
    a: "使用中のアプリの種類によって異なります。CSVエクスポートに対応しているシステム（多くの顧客管理ソフト）からは取り込み可能です。具体的な移行可否は、現在お使いのアプリ名をLINEでお知らせください。個別にお返事いたします。",
  },
  {
    q: "開発者は誰ですか？",
    a: "大阪市住吉区で大口神経整体院を運営する現役治療家・大口陽平です。施術歴10年・2021年開業・一人治療院最高月商429万円。50以上のシステムを自院で日々使いながら磨いてきました。IT企業ではなく、現場の治療家がつくっています。",
  },
  {
    q: "1院だけでなく複数院で使えますか？",
    a: "はい。院ごとにアカウントを分けて運用したり、グループ院で同じシステムを使うこともできます。複数院の運用は導入時に個別にご相談ください。",
  },
  {
    q: "セキュリティは大丈夫？",
    a: "Vercel（クラウド基盤）+ Supabase（データベース）で構築。SSL暗号化通信・行レベルアクセス制御（RLS）で院ごとにデータを完全分離しています。患者情報も、ご自身の院で運用している基準と同じ水準で守っています。",
  },
  {
    q: "オリジナルシステムの費用は？",
    a: "要件によって異なります。まずは無料ヒアリングで内容をお聞かせください。お見積もりをお出しします。",
  },
];

// 利用者の声 / 開発実績の声は app/lib/testimonials.ts で一元管理


// ========== コンポーネント ==========

export default function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState("すべて");
  const [contactType, setContactType] = useState("システムについて");
  const [contactForm, setContactForm] = useState({
    clinicName: "",
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const [selectedApps, setSelectedApps] = useState<string[]>(["kensa"]);
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly");

  const [checkoutModal, setCheckoutModal] = useState(false);
  const [checkoutPaymentType, setCheckoutPaymentType] = useState<"monthly" | "yearly" | "onetime">("monthly");
  const [checkoutEmail, setCheckoutEmail] = useState("");
  const [checkoutClinicName, setCheckoutClinicName] = useState("");
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [checkoutError, setCheckoutError] = useState("");

  // 準備中アプリは総合LPから完全に隠す（badge: "準備中" のものは販売LPに出さない）
  const SALEABLE_APPS = APPS.filter(app => app.badge !== "準備中");
  const filteredApps = activeCategory === "すべて"
    ? SALEABLE_APPS
    : SALEABLE_APPS.filter(app => app.categories.includes(activeCategory));

  const calcTotal = useMemo(() => {
    const selected = APPS.filter(app => selectedApps.includes(app.id));
    const monthlySubtotal = selected.reduce((sum, app) => sum + app.monthlyPrice, 0);
    const initialSubtotal = selected.reduce((sum, app) => sum + app.initialCost, 0);
    const maintenanceSubtotal = selected.reduce((sum, app) => sum + app.maintenancePrice, 0);
    const monthlyTotal = monthlySubtotal;
    const yearlyTotal = monthlyTotal * 11; // 年払い = 月額 × 11（1ヶ月分お得）
    return {
      monthlySubtotal,
      initialSubtotal,
      maintenanceSubtotal,
      monthlyDiscount: 0,
      initialDiscount: 0,
      monthlyTotal,
      yearlyTotal,
      initialTotal: initialSubtotal,
      discount: { discount: 0, label: "" },
      isFullPack: false,
    };
  }, [selectedApps]);

  const toggleApp = (appId: string) => {
    setSelectedApps(prev =>
      prev.includes(appId)
        ? prev.filter(id => id !== appId)
        : [...prev, appId]
    );
  };

  const handleCheckout = async (paymentType: "monthly" | "yearly" | "onetime") => {
    if (!checkoutEmail || !checkoutClinicName) {
      setCheckoutError("メールアドレスと院名を入力してください");
      return;
    }
    setCheckoutLoading(true);
    setCheckoutError("");
    try {
      const appNames = APPS.filter(a => selectedApps.includes(a.id)).map(a => a.shortName).join(", ");
      let amount: number;
      let planSuffix: string;
      if (paymentType === "yearly") {
        amount = calcTotal.yearlyTotal;
        planSuffix = "年払い";
      } else if (paymentType === "onetime") {
        amount = calcTotal.initialTotal;
        planSuffix = "買い切り";
      } else {
        amount = calcTotal.monthlyTotal;
        planSuffix = "月払い";
      }
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          planName: `ClinicMark（${appNames}）${planSuffix}`,
          email: checkoutEmail,
          clinicName: checkoutClinicName,
          amount,
          paymentType,
          selectedApps,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "エラーが発生しました");
      if (data.url) window.location.href = data.url;
    } catch (err) {
      if (err instanceof Error) {
        setCheckoutError(err.message);
      } else {
        setCheckoutError("決済処理に失敗しました");
      }
    } finally {
      setCheckoutLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...contactForm,
          plan: contactType,
        }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "送信に失敗しました");
      }
      setSubmitted(true);
    } catch (err) {
      setSubmitError(
        err instanceof Error ? err.message : "送信に失敗しました。しばらく経ってからお試しください。"
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-white text-gray-900">

      {/* ===== ナビゲーション ===== */}
      <nav className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-b border-gray-100 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-black text-sm">C</span>
            </div>
            <span className="text-lg font-black tracking-tight text-primary">ClinicMark</span>
          </div>
          <div className="hidden md:flex items-center gap-6 text-sm text-gray-600">
            <a href="#apps" className="hover:text-primary transition">システム一覧</a>
            <a href="#pricing" className="hover:text-primary transition">料金</a>
            <a href="#security" className="hover:text-primary transition">セキュリティ</a>
            <a href="#custom-dev" className="hover:text-primary transition">オーダーメイド開発</a>
            <a href="#faq" className="hover:text-primary transition">FAQ</a>
          </div>
          <a
            href="https://lin.ee/8P11rM4"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-cta text-white px-5 py-2 rounded-full text-sm font-bold hover:bg-cta-600 hover:shadow-lg transition-all"
          >
            LINEで相談する
          </a>
        </div>
      </nav>

      {/* ===== ヒーロー（2カラム＋スクショモックアップ） ===== */}
      <section className="pt-20 pb-12 md:pb-20 relative overflow-hidden">
        {/* 背景: メッシュグラデーション＋ぼかしオーブ＋dot pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-white via-sky-50/60 to-indigo-50/40"></div>
        <div className="absolute top-10 right-[5%] w-[600px] h-[600px] bg-accent-100/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-[-100px] left-[-100px] w-[500px] h-[500px] bg-cta-100/25 rounded-full blur-3xl"></div>
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: "radial-gradient(circle, #0F172A 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        ></div>

        <div className="relative max-w-6xl mx-auto px-4 pt-12 md:pt-20">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            {/* ─── 左：コピー＋CTA＋実績 ─── */}
            <div className="lg:col-span-7">
              {/* 信頼バッジ */}
              <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-accent/20 rounded-full px-4 py-1.5 mb-6 shadow-sm">
                <span className="w-2 h-2 bg-cta rounded-full animate-pulse"></span>
                <span className="text-xs font-bold text-primary tracking-wide">現役治療家が開発・大口神経整体院で毎日運用中</span>
              </div>

              {/* メインコピー */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-[1.15] mb-6 tracking-tight">
                <span className="text-primary">現役の治療家が開発した、</span>
                <br />
                <span className="bg-gradient-to-r from-accent via-accent-600 to-indigo-600 bg-clip-text text-transparent">
                  現場のためのアプリ。
                </span>
              </h1>

              {/* サブコピー */}
              <p className="text-gray-600 text-base md:text-lg leading-relaxed mb-8 max-w-xl">
                検査・顧客管理・MEO/AI検索対策。
                主力3アプリはすべて<span className="font-bold text-primary">月額5,500円・初期費用0円</span>。
                デモ版で実機を触ってから、必要なものだけ導入できます。
              </p>

              {/* CTA */}
              <div className="flex flex-col sm:flex-row gap-3 mb-10">
                <a
                  href="#apps"
                  className="inline-flex items-center justify-center gap-2 bg-accent text-white px-8 py-4 rounded-xl font-bold text-base hover:bg-accent-600 hover:shadow-lg hover:shadow-accent/30 transition-all"
                >
                  アプリを探す
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                </a>
                <a
                  href={LINE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-white text-primary px-8 py-4 rounded-xl font-bold text-base border-2 border-primary/15 hover:border-primary/30 hover:shadow-md transition-all"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314"/></svg>
                  LINEで相談する
                </a>
              </div>

              {/* 実績ストリップ */}
              <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">⚡️</span>
                  <div>
                    <p className="font-black text-primary leading-none">10<span className="text-xs ml-0.5">年</span></p>
                    <p className="text-[10px] text-gray-500 mt-0.5">施術歴</p>
                  </div>
                </div>
                <div className="w-px h-8 bg-gray-200"></div>
                <div className="flex items-center gap-2">
                  <span className="text-2xl">🛠</span>
                  <div>
                    <p className="font-black text-primary leading-none">50<span className="text-xs ml-0.5">+</span></p>
                    <p className="text-[10px] text-gray-500 mt-0.5">開発システム</p>
                  </div>
                </div>
                <div className="w-px h-8 bg-gray-200"></div>
                <div className="flex items-center gap-2">
                  <span className="text-2xl">💰</span>
                  <div>
                    <p className="font-black text-primary leading-none">429<span className="text-xs ml-0.5">万</span></p>
                    <p className="text-[10px] text-gray-500 mt-0.5">一人治療院最高月商</p>
                  </div>
                </div>
              </div>
            </div>

            {/* ─── 右：3アプリのスクショ重ね配置 ─── */}
            <div className="lg:col-span-5 relative h-[440px] md:h-[520px] hidden lg:block">
              {/* カラダマップ（メイン・前面・中央） */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[260px] rounded-2xl overflow-hidden shadow-2xl border border-gray-200 bg-white z-20 rotate-[2deg]">
                <div className="bg-blue-600 text-white text-[10px] font-bold px-3 py-1.5 flex items-center justify-between">
                  <span>🗺️ カラダマップ</span>
                  <span className="text-blue-200">検査アプリ</span>
                </div>
                <img src="/screens/kensa/result-body-illustration.png" alt="カラダマップ 診断結果" className="w-full h-auto" />
              </div>
              {/* Clinic Core（後ろ・左に傾き） */}
              <div className="absolute left-0 top-4 w-[240px] rounded-2xl overflow-hidden shadow-xl border border-gray-200 bg-white z-10 -rotate-[6deg]">
                <div className="bg-emerald-600 text-white text-[10px] font-bold px-3 py-1.5 flex items-center justify-between">
                  <span>📊 Clinic Core</span>
                  <span className="text-emerald-200">顧客管理</span>
                </div>
                <img src="/screens/clinic-core/home.png" alt="Clinic Core ホーム" className="w-full h-auto" />
              </div>
              {/* MEO勝ち上げくん（後ろ・右に傾き） */}
              <div className="absolute right-0 bottom-4 w-[240px] rounded-2xl overflow-hidden shadow-xl border border-gray-200 bg-white z-10 rotate-[7deg]">
                <div className="bg-rose-600 text-white text-[10px] font-bold px-3 py-1.5 flex items-center justify-between">
                  <span>📍 MEO勝ち上げくん</span>
                  <span className="text-rose-200">MEO/AI対策</span>
                </div>
                <img src="/screens/meo/3-strategy-check.png" alt="MEO勝ち上げくん 施策チェック" className="w-full h-auto" />
              </div>
              {/* キラキラエフェクト */}
              <div className="absolute -top-4 right-12 text-3xl animate-pulse">✨</div>
              <div className="absolute bottom-6 left-8 text-2xl animate-pulse" style={{animationDelay: "1s"}}>✨</div>
            </div>

            {/* ─── スマホ：右側スクショの代替（横スクロール） ─── */}
            <div className="lg:hidden flex gap-3 overflow-x-auto pb-4 -mx-4 px-4 snap-x snap-mandatory">
              {[
                { bg: "bg-blue-600", emoji: "🗺️", name: "カラダマップ", cat: "検査", img: "/screens/kensa/result-body-illustration.png" },
                { bg: "bg-emerald-600", emoji: "📊", name: "Clinic Core", cat: "顧客管理", img: "/screens/clinic-core/home.png" },
                { bg: "bg-rose-600", emoji: "📍", name: "MEO勝ち上げくん", cat: "MEO/AI対策", img: "/screens/meo/3-strategy-check.png" },
              ].map((app) => (
                <div key={app.name} className="flex-shrink-0 w-[240px] rounded-2xl overflow-hidden shadow-xl border border-gray-200 bg-white snap-center">
                  <div className={`${app.bg} text-white text-[10px] font-bold px-3 py-1.5 flex items-center justify-between`}>
                    <span>{app.emoji} {app.name}</span>
                    <span className="opacity-70">{app.cat}</span>
                  </div>
                  <img src={app.img} alt={app.name} className="w-full h-auto" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== 治療家プロフィールバンド ===== */}
      <section className="py-8 bg-white border-t border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-4">
          <div className="flex items-center gap-4 md:gap-6 flex-wrap justify-center md:justify-between">
            <div className="flex items-center gap-3 md:gap-4">
              <img
                src="/images/clinic/portrait-2022.jpeg"
                alt="大口陽平"
                className="w-14 h-14 md:w-16 md:h-16 rounded-full object-cover shadow-md border-2 border-white ring-2 ring-accent/20"
              />
              <div>
                <p className="text-[11px] text-gray-400 font-bold tracking-widest">DEVELOPED BY</p>
                <p className="text-sm md:text-base font-black text-primary">大口 陽平（現役治療家）</p>
                <p className="text-[11px] md:text-xs text-gray-500">大口神経整体院 院長 / 晴陽鍼灸院 代表</p>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-6">
              <div className="text-center">
                <p className="text-xl font-black text-primary leading-none">10<span className="text-[10px] font-bold text-gray-400 ml-0.5">年</span></p>
                <p className="text-[10px] text-gray-500 mt-1">施術歴</p>
              </div>
              <div className="w-px h-8 bg-gray-200"></div>
              <div className="text-center">
                <p className="text-xl font-black text-primary leading-none">50<span className="text-[10px] font-bold text-gray-400 ml-0.5">+</span></p>
                <p className="text-[10px] text-gray-500 mt-1">開発システム</p>
              </div>
              <div className="w-px h-8 bg-gray-200"></div>
              <div className="text-center">
                <p className="text-xl font-black text-primary leading-none">429<span className="text-[10px] font-bold text-gray-400 ml-0.5">万</span></p>
                <p className="text-[10px] text-gray-500 mt-1">一人治療院最高月商</p>
              </div>
            </div>
            <a href="#developer" className="text-xs font-bold text-accent hover:text-accent-600 transition whitespace-nowrap">
              詳しいプロフィール &rarr;
            </a>
          </div>
        </div>
      </section>

      {/* ===== 価格帯ショーケース ===== */}
      <section id="tiers" className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-10">
            <p className="text-xs font-bold text-accent tracking-widest mb-2">LINEUP</p>
            <h2 className="text-2xl md:text-3xl font-black text-primary mb-3">
              用途で選ぶ、治療家のためのアプリ。
            </h2>
            <p className="text-sm md:text-base text-gray-600">
              主力3アプリはすべて月額5,500円〜・初期費用0円〜。検査・経営・集客の3軸から、必要なものだけ導入できます。
            </p>
          </div>

          {/* 主力3アプリ 3カラム並列ショーケース */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
            {[
              {
                id: "kensa",
                badge: "検査アプリ",
                badgeColor: "bg-blue-100 text-blue-700",
                name: "カラダマップ",
                tagline: "3分で体の\"いま\"を見える化する検査アプリ",
                desc: "5段階の検査ウィザードで原因部位を自動特定。患者用・施術者用PDF出力、経過比較、AIセルフケア自動提案まで。",
                detail: "/systems/kensa",
                demo: "https://kensa-sheet-app.vercel.app/demo",
                gradient: "from-blue-50 to-blue-100/40",
                border: "border-blue-200",
              },
              {
                id: "customer",
                badge: "顧客管理アプリ",
                badgeColor: "bg-emerald-100 text-emerald-700",
                name: "Clinic Core",
                tagline: "経営の数字が全部見える顧客管理アプリ",
                desc: "患者情報を一元管理。LTV・ROAS・リピート率・離反アラート・データ分析ダッシュボード搭載。14分析メニュー網羅。",
                detail: "/systems/customer",
                demo: "https://clinic-core-demo.vercel.app",
                gradient: "from-emerald-50 to-emerald-100/40",
                border: "border-emerald-200",
              },
              {
                id: "meo",
                badge: "MEO・AI検索対策アプリ",
                badgeColor: "bg-rose-100 text-rose-700",
                name: "MEO勝ち上げくん",
                tagline: "Googleマップ・AIで「選ばれる医院」になるアプリ",
                desc: "Googleマップ × AI検索（ChatGPT/Perplexity等）の両方で選ばれる医院に。キーワード1つでブログ・FAQ・GBP・noteを同時生成。順位アラート・医療広告ガイドライン自動チェック。",
                detail: "/systems/meo",
                demo: null,
                gradient: "from-rose-50 to-rose-100/40",
                border: "border-rose-200",
              },
            ].map((app) => (
              <div
                key={app.id}
                className={`bg-gradient-to-br ${app.gradient} border-2 ${app.border} rounded-2xl p-6 flex flex-col`}
              >
                <span className={`inline-block self-start text-[11px] font-bold px-2.5 py-1 rounded-full mb-3 ${app.badgeColor}`}>
                  {app.badge}
                </span>
                <h3 className="text-xl md:text-2xl font-black text-primary leading-tight mb-2">{app.name}</h3>
                <p className="text-sm font-bold text-gray-700 mb-3">{app.tagline}</p>
                <p className="text-xs text-gray-600 leading-relaxed mb-5 flex-1">{app.desc}</p>

                <div className="bg-white/80 border border-white rounded-lg p-3 mb-3 text-center">
                  <p className="text-[11px] text-gray-500 mb-0.5">月額</p>
                  <p className="text-xl font-black text-primary leading-none">5,500<span className="text-xs font-bold text-gray-400 ml-0.5">円〜</span></p>
                  <p className="text-[10px] text-gray-400 mt-1.5">初期費用 0円〜 / 最低契約6ヶ月</p>
                </div>

                <div className="flex gap-2">
                  <a
                    href={app.detail}
                    className="flex-1 text-center text-xs font-bold text-white bg-primary hover:bg-primary-700 px-3 py-2 rounded transition"
                  >
                    詳しく見る
                  </a>
                  {app.demo && (
                    <a
                      href={app.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-bold text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 px-3 py-2 rounded transition"
                    >
                      デモ
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* オーダーメイド開発（別枠） */}
          <div className="mt-6 bg-gradient-to-br from-violet-50 to-violet-100/40 border-2 border-violet-200 rounded-2xl p-6 md:p-8 grid md:grid-cols-3 gap-6 items-center">
            <div className="md:col-span-2">
              <span className="inline-block text-[11px] font-bold bg-violet-100 text-violet-700 px-2.5 py-1 rounded-full mb-3">CUSTOM</span>
              <h3 className="text-xl md:text-2xl font-black text-primary mb-2">オーダーメイド開発</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                自院オリジナルのアプリを一から開発。ヒアリング無料・最短2週間〜。
                訪問鍼灸業務管理、頭痛ダイアリー、サロン経営アカデミー等の受託実績あり。
              </p>
            </div>
            <div className="text-center md:text-right">
              <a
                href="#custom-dev"
                className="inline-block text-sm font-bold text-white bg-violet-600 hover:bg-violet-700 px-6 py-3 rounded-xl transition shadow"
              >
                オーダーメイドの詳細 →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ===== こんな悩みありませんか？ ===== */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-black text-center text-primary mb-10">
            こんな悩みありませんか？
          </h2>
          <p className="text-center text-gray-500 text-sm mb-8 -mt-4">
            治療家が抱えがちな「経営の数字」「説明の根拠」「集客」の悩みを、3つのアプリで解決します。
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { tag: "Clinic Core", text: "カルテや顧客情報が紙やExcelでバラバラ" },
              { tag: "Clinic Core", text: "LTV・リピート率・離反など、経営の数字が見えていない" },
              { tag: "カラダマップ", text: "口頭の検査説明だと患者さんに伝わりきらない" },
              { tag: "MEO勝ち上げくん", text: "MEO対策、何から始めればいいかわからない" },
              { tag: "MEO勝ち上げくん", text: "MEO業者に月3〜5万円払っていて中身も見えない" },
              { tag: "共通", text: "ITに詳しくなくて、月2〜5万円のシステムを使いこなせていない" },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3 bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
                <div className="flex-shrink-0 w-8 h-8 bg-cta/10 rounded-lg flex items-center justify-center mt-0.5">
                  <svg className="w-4 h-4 text-cta" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <span className="inline-block text-[10px] font-bold bg-accent/10 text-accent px-2 py-0.5 rounded-full mb-1.5">
                    {item.tag}
                  </span>
                  <p className="text-sm text-gray-700 leading-relaxed">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 差別化セクション ===== */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-10">
            <p className="text-xs font-bold text-accent tracking-widest mb-2">WHY US</p>
            <h2 className="text-2xl md:text-3xl font-black text-primary">
              現役治療家が、現場で作ったシステムです。
            </h2>
          </div>

          {/* 院内施術写真＋紹介文 */}
          <div className="grid md:grid-cols-2 gap-8 items-center mb-12 bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl border border-gray-200 p-6 md:p-8">
            <div>
              <img
                src="/images/clinic/treatment-3.jpeg"
                alt="大口陽平が骨格模型を使って説明する様子"
                className="w-full h-64 md:h-72 object-cover rounded-xl shadow-md"
              />
            </div>
            <div>
              <p className="text-xs font-bold text-accent tracking-widest mb-3">FROM CLINIC FLOOR</p>
              <h3 className="text-xl md:text-2xl font-black text-primary leading-snug mb-4">
                治療とスタッフ教育に、<br />
                時間を残すために作っています。
              </h3>
              <p className="text-sm md:text-base text-gray-700 leading-relaxed mb-4">
                治療家の本業は、目の前の患者さんと、スタッフを育てる時間。
                それ以外の事務作業に時間を奪われている治療院が多すぎる――
                <strong>その時間を取り戻すためのアプリ</strong>を、現場で毎日使いながら磨いています。
              </p>
              <p className="text-sm text-gray-600 leading-relaxed">
                整体院・鍼灸院・接骨院・サロン――業種が変わっても、
                「治療家が時間を奪われている作業」は驚くほど共通しています。
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl border border-gray-200 p-6 text-center">
              <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-7 h-7 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-primary mb-2">治療家が設計</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                現役整体院経営者が毎日の診療で使いながら開発。現場で本当に必要な機能だけを厳選しています。
              </p>
            </div>
            <div className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl border border-gray-200 p-6 text-center">
              <div className="w-14 h-14 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-7 h-7 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-primary mb-2">シンプル設計</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                ITが苦手でも大丈夫。スマホ1つで操作できるシンプルな画面設計。余計な機能は入れていません。
              </p>
            </div>
            <div className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl border border-gray-200 p-6 text-center">
              <div className="w-14 h-14 bg-cta/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-7 h-7 text-cta" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-primary mb-2">大手の1/3以下の料金</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                大手ツールは月額2〜5万円。うちは月額5,500円〜・初期費用0円〜。治療院の経営を圧迫しない価格設計です。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 導入院の声（社会的証明として比較表の前に配置） ===== */}
      {(() => {
        const voices = getGeneralProductVoices();
        return (
          <section className="py-16 bg-white">
            <div className="max-w-6xl mx-auto px-4">
              <p className="text-center text-xs font-bold text-accent tracking-widest mb-2">VOICES</p>
              <h2 className="text-2xl md:text-3xl font-black text-center text-primary mb-3">
                導入院の声
              </h2>
              <p className="text-center text-gray-500 text-sm mb-10">
                整体院・鍼灸院・接骨院・サロン、あらゆる治療家・施術家にご利用いただいています
              </p>
              {voices.length > 0 ? (
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
                  {voices.map((t) => <VoiceCardShort key={t.id} t={t} />)}
                </div>
              ) : (
                <p className="text-center text-gray-400 text-sm">導入院の声を掲載準備中です。</p>
              )}
            </div>
          </section>
        );
      })()}

      {/* ===== 大手との比較表 ===== */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-black text-center text-primary mb-3">
            大手ツールとの比較
          </h2>
          <p className="text-center text-gray-500 text-sm mb-10">
            使いこなせない高いシステムではなく、現場に合ったシンプルなシステムを。
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-primary text-white">
                  <th className="py-3 px-4 text-left rounded-tl-lg"></th>
                  <th className="py-3 px-4 text-center font-black">ClinicMark</th>
                  <th className="py-3 px-4 text-center">大手A社</th>
                  <th className="py-3 px-4 text-center rounded-tr-lg">大手B社</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { label: "月額料金", ours: "2,200円〜", a: "22,000円〜", b: "33,000円〜" },
                  { label: "初期費用", ours: "11,000円〜", a: "110,000円〜", b: "55,000円〜" },
                  { label: "最低契約期間", ours: "6ヶ月", a: "1年", b: "2年" },
                  { label: "治療院特化", ours: "◎", a: "△", b: "×" },
                  { label: "カスタマイズ", ours: "◎", a: "×", b: "△" },
                  { label: "開発者", ours: "現役治療家", a: "IT企業", b: "IT企業" },
                  { label: "現場で使って改善", ours: "◎ 毎日使用", a: "×", b: "×" },
                  { label: "アップデート", ours: "◎ 現場の声を反映", a: "△ 年1〜2回", b: "△ 年1回" },
                  { label: "サポート対応", ours: "◎ LINEで直接", a: "△ メールのみ", b: "△ 電話予約制" },
                  { label: "業務フロー特化", ours: "◎ 治療院専用設計", a: "× 汎用ツール", b: "△ 医療全般" },
                ].map((row, i) => (
                  <tr key={i} className={`border-b border-gray-100 ${i % 2 === 0 ? "bg-white" : "bg-gray-50"}`}>
                    <td className="py-3 px-4 font-bold text-primary">{row.label}</td>
                    <td className="py-3 px-4 text-center font-bold text-accent">{row.ours}</td>
                    <td className="py-3 px-4 text-center text-gray-500">{row.a}</td>
                    <td className="py-3 px-4 text-center text-gray-500">{row.b}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ===== システム一覧 ===== */}
      <section id="apps" className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-black text-center text-primary mb-3">
            システム一覧
          </h2>
          <p className="text-center text-gray-500 text-sm mb-8">
            必要なものだけ選んで導入できます
          </p>

          {/* カテゴリタブ */}
          <div className="flex gap-2 mb-8 overflow-x-auto pb-2 justify-center flex-wrap">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`flex-shrink-0 px-5 py-2 rounded-full text-sm font-bold transition border ${
                  activeCategory === cat
                    ? "bg-primary text-white border-primary"
                    : "bg-white text-gray-600 border-gray-200 hover:border-primary/40"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* システムカード */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredApps.map((app) => (
              <div
                key={app.id}
                className="relative bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-lg hover:border-accent/40 transition-all group"
              >
                {app.badge && (
                  <span className={`absolute -top-3 right-4 text-xs font-bold px-3 py-1 rounded-full shadow-md ${
                    app.badge === "準備中" ? "bg-gray-400 text-white" : "bg-cta text-white"
                  }`}>
                    {app.badge}
                  </span>
                )}

                <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center text-accent mb-4 group-hover:bg-accent/20 transition">
                  {app.icon}
                </div>

                <h3 className="text-lg font-bold text-primary mb-2">{app.name}</h3>
                <p className="text-sm text-gray-500 leading-relaxed mb-4">{app.description}</p>

                <ul className="space-y-2 mb-5">
                  {app.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                      <svg className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>

                <div className="pt-4 border-t border-gray-100">
                  <div className="flex items-end justify-between">
                    <div>
                      <p className="text-xs text-gray-400">月額</p>
                      <p className="text-xl font-black text-primary">{app.monthlyPrice.toLocaleString()}<span className="text-xs font-normal text-gray-400">円/月</span></p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-400">初期費用</p>
                      <p className="text-sm font-bold text-gray-600">{app.initialCost === 0 ? "不要" : `${app.initialCost.toLocaleString()}円`}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-4 space-y-2">
                  {app.detailUrl && (
                    <a
                      href={app.detailUrl}
                      className="block w-full text-center bg-primary text-white font-bold py-2.5 px-4 rounded-xl hover:bg-primary-700 transition-all text-sm"
                    >
                      詳しく見る
                    </a>
                  )}
                  {(() => {
                    // 主力3アプリ ¥5,500/月・初期費用0円・Custom Field「治療院名」設定済
                    // 決済完了 → /api/webhooks/stripe で自動アカウント発行＋メール送信
                    const stripeLinks: Record<string, string> = {
                      kensa: "https://buy.stripe.com/00w28qgZ60GIeIc0ut08g0k",
                      meo: "https://buy.stripe.com/dRm3cucIQ2OQfMg1yx08g0y",
                      customer: "https://buy.stripe.com/5kQbJ0dMUexydE8a5308g07",
                    };
                    const link = stripeLinks[app.id];
                    if (link) {
                      return (
                        <a
                          href={link}
                          className="block w-full text-center border-2 border-accent text-accent font-bold py-2.5 px-4 rounded-xl hover:bg-accent hover:text-white transition-all text-sm"
                        >
                          今すぐ始める &rarr;
                        </a>
                      );
                    }
                    return (
                      <span className="block w-full text-center border-2 border-gray-200 text-gray-400 font-bold py-2.5 px-4 rounded-xl text-sm cursor-not-allowed">
                        準備中
                      </span>
                    );
                  })()}
                  <a
                    href="https://lin.ee/8P11rM4"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full text-center text-xs text-gray-500 hover:text-cta py-1 transition-colors"
                  >
                    気になる方はLINEで相談
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Coming Soon ===== */}
      <section className="py-8 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <p className="text-sm text-gray-400 mb-2">今後順次リリース予定</p>
          <p className="text-xs text-gray-400">
            {COMING_SOON_APPS.join(" / ")}
          </p>
        </div>
      </section>

      {/* ===== 各システムの詳細を見る ===== */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-black text-center text-primary mb-3">
            各システムの詳細を見る
          </h2>
          <p className="text-center text-gray-500 text-sm mb-10">
            気になるシステムの専用ページで、機能・料金・比較表を確認できます
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                name: "カラダマップ",
                desc: "検査で原因部位を自動特定・PDF納品",
                price: "5,500",
                url: "/systems/kensa",
              },
              {
                name: "Clinic Core",
                desc: "数字で経営を変える分析ツール",
                price: "5,500",
                url: "/systems/customer",
              },
              {
                name: "MEO勝ち上げくん",
                desc: "Googleマップ順位を自動管理",
                price: "5,500",
                url: "/systems/meo",
              },
            ].map((item, i) => (
              <a
                key={i}
                href={item.url}
                className="bg-white rounded-2xl border border-gray-200 p-5 hover:shadow-lg hover:border-accent/40 transition-all group block"
              >
                <h3 className="font-bold text-primary text-sm mb-1 group-hover:text-accent transition-colors">
                  {item.name}
                </h3>
                <p className="text-xs text-gray-500 mb-3 leading-relaxed">{item.desc}</p>
                <p className="text-lg font-black text-primary mb-3">
                  {item.price}<span className="text-xs font-normal text-gray-400">円/月</span>
                </p>
                <span className="block w-full text-center bg-primary text-white font-bold py-2 px-3 rounded-lg text-xs group-hover:bg-accent transition-colors">
                  詳しく見る &rarr;
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 料金プラン ===== */}
      <section id="pricing" className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-black text-center text-primary mb-3">
            料金プラン
          </h2>
          <p className="text-center text-gray-500 text-sm mb-6">
            初期費用 + 月額制。最低契約期間6ヶ月。大手の1/3以下の料金です。
          </p>

          {/* 月払い / 年払い 切り替えタブ */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex bg-gray-100 rounded-xl p-1">
              <button
                onClick={() => setBillingCycle("monthly")}
                className={`px-6 py-2.5 rounded-lg text-sm font-bold transition ${
                  billingCycle === "monthly"
                    ? "bg-white text-primary shadow-sm"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                月払い
              </button>
              <button
                onClick={() => setBillingCycle("yearly")}
                className={`px-6 py-2.5 rounded-lg text-sm font-bold transition relative ${
                  billingCycle === "yearly"
                    ? "bg-white text-primary shadow-sm"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                年払い
                <span className="absolute -top-2.5 -right-2 bg-cta text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full whitespace-nowrap">
                  1ヶ月分お得
                </span>
              </button>
            </div>
          </div>

          {/* 単品料金テーブル */}
          <div className="overflow-x-auto mb-10">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-primary text-white">
                  <th className="py-3 px-4 text-left rounded-tl-lg">システム名</th>
                  <th className="py-3 px-4 text-center">
                    {billingCycle === "yearly" ? "年額料金" : "月額料金"}
                  </th>
                  <th className="py-3 px-4 text-center rounded-tr-lg">初期費用</th>
                </tr>
              </thead>
              <tbody>
                {SALEABLE_APPS.map((app, i) => {
                  const yearlyPrice = app.monthlyPrice * 11;
                  return (
                    <tr key={app.id} className={`border-b border-gray-100 ${i % 2 === 0 ? "bg-gray-50" : "bg-white"}`}>
                      <td className="py-3 px-4 font-bold text-primary">
                        {app.name}
                        {app.badge && <span className="ml-2 text-[10px] bg-cta text-white px-2 py-0.5 rounded-full">{app.badge}</span>}
                      </td>
                      <td className="py-3 px-4 text-center font-bold">
                        {billingCycle === "yearly" ? (
                          <>
                            {yearlyPrice.toLocaleString()}円/年
                            <span className="block text-[10px] text-gray-400 font-normal">
                              (月あたり約{Math.floor(yearlyPrice / 12).toLocaleString()}円)
                            </span>
                          </>
                        ) : (
                          <>{app.monthlyPrice.toLocaleString()}円/月</>
                        )}
                      </td>
                      <td className="py-3 px-4 text-center">
                        {app.initialCost === 0 ? "不要" : `${app.initialCost.toLocaleString()}円`}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* セットで買うとお得 */}
          <div className="bg-gradient-to-br from-accent/5 to-cta/5 rounded-2xl border border-accent/20 p-6 md:p-8 mb-10">
            <h3 className="text-xl font-black text-primary text-center mb-2">セットで買うとお得</h3>
            <p className="text-center text-gray-600 text-sm mb-6">目的に合わせたパックで、月額がお得になります。</p>
          </div>

          {/* セットパック */}
          <h3 className="text-xl font-black text-primary text-center mb-6">おすすめパック</h3>
          <div className="grid md:grid-cols-3 gap-5 mb-10">
            {SET_EXAMPLES.map((set) => {
              const apps = APPS.filter(a => set.appIds.includes(a.id));
              const monthlyTotal = apps.reduce((s, a) => s + a.monthlyPrice, 0);
              const initialTotal = apps.reduce((s, a) => s + a.initialCost, 0);
              const isSingle = set.appIds.length === 1;
              return (
                <div key={set.name} className="bg-white rounded-2xl border-2 border-gray-200 p-6">
                  <div className="flex items-center gap-3 mb-2">
                    <h4 className="text-lg font-black text-gray-400">{set.name}</h4>
                    {set.label && (
                      <span className="bg-gray-100 text-gray-400 text-xs font-bold px-2.5 py-0.5 rounded-full">{set.label}</span>
                    )}
                  </div>
                  <p className="text-sm text-gray-400 mb-4">{set.description}</p>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {apps.map(a => (
                      <span key={a.id} className="bg-gray-100 text-gray-400 text-xs font-bold px-3 py-1.5 rounded-full">
                        {a.shortName}
                      </span>
                    ))}
                    {isSingle && (
                      <span className="bg-gray-100 text-gray-400 text-xs font-bold px-3 py-1.5 rounded-full">+ 今後追加予定</span>
                    )}
                  </div>
                  <div className="border-t border-gray-100 pt-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-400">月額</span>
                      <div className="flex items-baseline gap-2">
                        {!isSingle && (
                          <span className="text-sm text-gray-300 line-through">{monthlyTotal.toLocaleString()}円</span>
                        )}
                        <span className="text-2xl font-black text-gray-400">{set.setMonthly.toLocaleString()}</span>
                        <span className="text-sm text-gray-400">円/月</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-400">初期費用</span>
                      <div className="flex items-baseline gap-2">
                        {!isSingle && initialTotal !== set.setInitial && (
                          <span className="text-sm text-gray-300 line-through">{initialTotal.toLocaleString()}円</span>
                        )}
                        <span className="text-base font-bold text-gray-400">{set.setInitial.toLocaleString()}円</span>
                      </div>
                    </div>
                  </div>
                  {set.note && (
                    <p className="text-xs text-gray-500 mt-3">{set.note}</p>
                  )}
                  <a
                    href="https://lin.ee/8P11rM4"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full mt-4 py-3 rounded-xl font-bold text-sm text-center bg-cta text-white hover:bg-cta-600 transition-colors shadow-sm"
                  >
                    このパックで相談する
                  </a>
                </div>
              );
            })}
          </div>

          {/* システム選択・料金計算 */}
          <div id="pricing-calc" className="bg-gray-50 rounded-2xl border border-gray-200 p-6 md:p-8">
            <h3 className="text-xl font-black text-primary text-center mb-2">カスタム選択</h3>
            <p className="text-center text-xs text-gray-500 mb-6">必要な主力アプリだけ選んで、自分のクリニックに合う組み合わせで導入できます</p>

            <div className="grid grid-cols-3 gap-3 mb-6">
              {[
                APPS.find(a => a.id === "kensa")!,
                APPS.find(a => a.id === "customer")!,
                APPS.find(a => a.id === "meo")!,
              ].map((app) => {
                const isSelected = selectedApps.includes(app.id);
                return (
                  <button
                    key={app.id}
                    onClick={() => toggleApp(app.id)}
                    className={`relative text-left p-4 rounded-xl border-2 transition-all ${
                      isSelected
                        ? "border-accent bg-accent/5 shadow-md"
                        : "border-gray-200 bg-white hover:border-gray-300"
                    }`}
                  >
                    <div className={`absolute top-2.5 right-2.5 w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all ${
                      isSelected ? "bg-accent border-accent" : "border-gray-300 bg-white"
                    }`}>
                      {isSelected && (
                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                    <div className="text-accent mb-2">{app.icon}</div>
                    <h3 className="font-bold text-xs md:text-sm mb-1 pr-6 text-primary">{app.shortName}</h3>
                    <p className={`text-xs font-bold ${isSelected ? "text-accent" : "text-gray-500"}`}>
                      {app.monthlyPrice.toLocaleString()}円/月
                    </p>
                  </button>
                );
              })}
            </div>

            {/* 計算結果 */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 max-w-lg mx-auto">
              {selectedApps.length === 0 ? (
                <p className="text-center text-gray-400 py-4">システムを選択してください</p>
              ) : (
                <>
                  <div className="mb-4">
                    <p className="text-sm text-gray-500 mb-1">
                      選択中: {APPS.filter(a => selectedApps.includes(a.id)).map(a => a.shortName).join(", ")}（{selectedApps.length}システム）
                    </p>
                  </div>
                  <div className="border-t border-gray-100 pt-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">月額 定価合計</span>
                      <span>{calcTotal.monthlySubtotal.toLocaleString()}円/月</span>
                    </div>
                    {calcTotal.discount.discount > 0 && (
                      <div className="flex justify-between text-sm">
                        <span className="text-accent font-bold flex items-center gap-1">
                          <span className="bg-accent/10 text-accent text-xs px-2 py-0.5 rounded-full">
                            {calcTotal.discount.label}
                          </span>
                          セット割引
                        </span>
                        <span className="text-accent font-bold">-{calcTotal.monthlyDiscount.toLocaleString()}円</span>
                      </div>
                    )}
                    {billingCycle === "yearly" && (
                      <div className="flex justify-between text-sm">
                        <span className="text-cta font-bold flex items-center gap-1">
                          <span className="bg-cta/10 text-cta text-xs px-2 py-0.5 rounded-full">
                            1ヶ月分お得
                          </span>
                          年払い割引
                        </span>
                        <span className="text-cta font-bold">-{(calcTotal.monthlyTotal).toLocaleString()}円</span>
                      </div>
                    )}
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">初期費用</span>
                      <span>
                        {calcTotal.isFullPack && (
                          <span className="text-xs text-cta mr-1">半額</span>
                        )}
                        {calcTotal.initialTotal.toLocaleString()}円
                      </span>
                    </div>
                  </div>
                  <div className="border-t-2 border-primary mt-4 pt-4">
                    {billingCycle === "yearly" ? (
                      <div className="flex justify-between items-end">
                        <span className="font-bold text-lg text-primary">年額お支払い</span>
                        <div className="text-right">
                          <span className="text-3xl font-black text-accent">
                            {calcTotal.yearlyTotal.toLocaleString()}
                          </span>
                          <span className="text-gray-500 text-sm">円/年（税込）</span>
                          <p className="text-xs text-gray-400 mt-0.5">
                            月あたり約{Math.floor(calcTotal.yearlyTotal / 12).toLocaleString()}円
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="flex justify-between items-end">
                        <span className="font-bold text-lg text-primary">月額お支払い</span>
                        <div className="text-right">
                          <span className="text-3xl font-black text-accent">
                            {calcTotal.monthlyTotal.toLocaleString()}
                          </span>
                          <span className="text-gray-500 text-sm">円/月（税込）</span>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="mt-6 space-y-2">
                    <button
                      onClick={() => {
                        setCheckoutPaymentType(billingCycle);
                        setCheckoutModal(true);
                        setCheckoutError("");
                      }}
                      disabled={selectedApps.length === 0}
                      className="w-full py-3.5 rounded-xl font-bold transition bg-cta text-white hover:bg-cta-600 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {billingCycle === "yearly"
                        ? `年払いで申し込む（${calcTotal.yearlyTotal.toLocaleString()}円/年）`
                        : `月払いで申し込む（${calcTotal.monthlyTotal.toLocaleString()}円/月）`}
                    </button>
                    <a
                      href="https://lin.ee/8P11rM4"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full py-3.5 rounded-xl font-bold transition bg-gray-100 text-gray-700 hover:bg-gray-200 text-center"
                    >
                      LINEで相談する
                    </a>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ===== オーダーメイド開発 ===== */}
      <section id="custom-dev" className="py-16 bg-primary text-white">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-black text-center mb-3">
            既製品で合わない？ゼロから作ります。
          </h2>
          <p className="text-center text-white/70 text-sm mb-12">
            現場を知っている治療家が開発するから、本当に使えるシステムになります。
          </p>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* こんな方におすすめ */}
            <div className="bg-white/10 rounded-2xl p-6 backdrop-blur-sm">
              <h3 className="text-lg font-bold mb-4">こんな方におすすめ</h3>
              <ul className="space-y-3">
                {[
                  "自院オリジナルのシステムが欲しい",
                  "既存のツールでは物足りない",
                  "他院との差別化を図りたい",
                ].map((text, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-white/90">
                    <svg className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    {text}
                  </li>
                ))}
              </ul>
            </div>

            {/* 開発の流れ */}
            <div className="bg-white/10 rounded-2xl p-6 backdrop-blur-sm">
              <h3 className="text-lg font-bold mb-4">開発の流れ</h3>
              <div className="space-y-4">
                {[
                  { step: "1", title: "ヒアリング（無料）" },
                  { step: "2", title: "要件定義・見積もり" },
                  { step: "3", title: "開発（最短2週間〜）" },
                  { step: "4", title: "納品・サポート" },
                ].map((s) => (
                  <div key={s.step} className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                      {s.step}
                    </div>
                    <span className="text-sm font-medium">{s.title}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 開発実績 */}
          <div className="grid grid-cols-3 gap-6 mb-10">
            <div className="text-center">
              <p className="text-3xl md:text-4xl font-black text-accent">50+</p>
              <p className="text-xs text-white/60 mt-1">システム開発実績</p>
            </div>
            <div className="text-center">
              <p className="text-3xl md:text-4xl font-black text-accent">治療院特化</p>
              <p className="text-xs text-white/60 mt-1">の開発チーム</p>
            </div>
            <div className="text-center">
              <p className="text-3xl md:text-4xl font-black text-accent">最短2週間</p>
              <p className="text-xs text-white/60 mt-1">で納品</p>
            </div>
          </div>

          <div className="bg-white/10 rounded-2xl p-6 backdrop-blur-sm text-center mb-10">
            <p className="text-sm text-white/70 mb-2">オリジナルアプリ開発</p>
            <p className="text-xl md:text-2xl font-black text-accent mb-1">要件により個別お見積もり</p>
            <p className="text-xs text-white/50">無料ヒアリングで内容をお聞かせください</p>
          </div>

          <div className="text-center">
            <a
              href="https://lin.ee/8P11rM4"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-cta text-white px-8 py-4 rounded-xl font-bold text-base hover:bg-cta-600 hover:shadow-lg transition-all"
            >
              LINEで無料相談する
            </a>
          </div>
        </div>
      </section>

      {/* ===== 導入の流れ ===== */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-black text-center text-primary mb-10">
            導入の流れ
          </h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { step: "1", title: "お問い合わせ", desc: "フォームまたはお電話でご連絡ください。" },
              { step: "2", title: "デモ体験（無料）", desc: "Zoomで実際の画面をお見せしながらご説明します。" },
              { step: "3", title: "導入・初期設定", desc: "アカウント発行、院情報の登録をサポートします。" },
              { step: "4", title: "運用開始", desc: "すぐに使い始められます。困ったらいつでも相談OK。" },
            ].map((s) => (
              <div key={s.step} className="text-center">
                <div className="w-14 h-14 bg-primary text-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg text-xl font-black">
                  {s.step}
                </div>
                <h3 className="font-bold text-base text-primary mb-2">{s.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 開発実績（オーダーメイド受託の声）===== */}
      {(() => {
        const customs = getCustomVoices();
        if (customs.length === 0) return null;
        return (
          <section className="py-16 bg-white">
            <div className="max-w-6xl mx-auto px-4">
              <p className="text-center text-xs font-bold text-violet-600 tracking-widest mb-2">CUSTOM WORK</p>
              <h2 className="text-2xl md:text-3xl font-black text-center text-primary mb-3">
                オーダーメイド開発実績
              </h2>
              <p className="text-center text-gray-500 text-sm mb-10">
                治療家向けだけでなく、飲食店・美容など、さまざまな業界の受託開発実績があります
              </p>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {customs.map((t) => <CustomWorkCard key={t.id} t={t} />)}
              </div>
            </div>
          </section>
        );
      })()}

      {/* ===== 開発者紹介 ===== */}
      <section id="developer" className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-10">
            <p className="text-xs font-bold text-accent tracking-widest mb-2">DEVELOPER</p>
            <h2 className="text-2xl md:text-3xl font-black text-primary">
              作っている人
            </h2>
          </div>

          <div className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl border border-gray-200 p-6 md:p-10">
            <div className="md:flex md:gap-10 md:items-start">
              {/* 顔写真＋肩書（判別しやすく大型化＋識別ラベル・陽平本人の写真のみ） */}
              <div className="md:w-80 flex-shrink-0 text-center md:text-left">
                <div className="relative inline-block w-full max-w-[280px] mx-auto md:mx-0">
                  <img
                    src="/images/clinic/portrait-2022.jpeg"
                    alt="大口 陽平（現役治療家・アプリ開発者）"
                    className="w-full aspect-[4/5] rounded-2xl object-cover shadow-xl border-4 border-white"
                  />
                  {/* 識別ラベル：写真の上にオーバーレイ */}
                  <div className="absolute top-3 left-3 bg-cta text-white text-[11px] font-bold px-3 py-1.5 rounded-full shadow-lg">
                    DEVELOPER
                  </div>
                  {/* 名前バナー：写真下端にオーバーレイで載せ、ひと目で「これが開発者」と分かるように */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent rounded-b-2xl p-4">
                    <p className="text-white font-black text-lg leading-tight">大口 陽平</p>
                    <p className="text-white/90 text-xs mt-0.5">現役治療家 / アプリ開発者</p>
                  </div>
                </div>
                {/* 施術風景サムネ（全て陽平本人が施術している写真） */}
                <div className="grid grid-cols-3 gap-2 mt-3 max-w-[280px] mx-auto md:mx-0">
                  <img
                    src="/images/clinic/treatment-2.jpeg"
                    alt="大口陽平が立位検査をしている様子"
                    className="aspect-square rounded-lg object-cover border-2 border-white shadow"
                  />
                  <img
                    src="/images/clinic/treatment-3.jpeg"
                    alt="大口陽平が骨格模型で患者に説明している様子"
                    className="aspect-square rounded-lg object-cover border-2 border-white shadow"
                  />
                  <img
                    src="/images/clinic/treatment-5.jpeg"
                    alt="大口陽平がストレッチ指導をしている様子"
                    className="aspect-square rounded-lg object-cover border-2 border-white shadow"
                  />
                </div>
                <p className="text-xs text-gray-500 text-center md:text-left mt-2">↑ 大口陽平が、自分の院で患者に施術・指導している様子</p>
                <p className="text-sm text-gray-600 mt-4">大口神経整体院 院長</p>
                <p className="text-sm text-gray-600">晴陽鍼灸院 代表</p>
                <div className="flex flex-wrap gap-2 mt-3 justify-center md:justify-start">
                  <span className="text-[11px] font-bold bg-primary/10 text-primary px-2.5 py-1 rounded-full">施術歴10年</span>
                  <span className="text-[11px] font-bold bg-accent/10 text-accent px-2.5 py-1 rounded-full">開業2021年</span>
                  <span className="text-[11px] font-bold bg-cta/10 text-cta px-2.5 py-1 rounded-full">大阪市住吉区</span>
                </div>
              </div>

              {/* プロフィール本文 */}
              <div className="md:flex-1 mt-8 md:mt-0">
                <p className="text-sm md:text-base text-gray-700 leading-relaxed mb-4">
                  大阪市住吉区で<strong>「大口神経整体院」</strong>を運営する現役治療家。
                  施術歴10年・2021年に独立開業し、<strong>一人治療院で月商429万円</strong>を達成。
                  訪問鍼灸リハビリ事業<strong>「晴陽鍼灸院」</strong>も運営し、堺市・大阪市南部エリアで在宅医療をサポートしています。
                </p>
                <p className="text-sm md:text-base text-gray-700 leading-relaxed mb-4">
                  <strong>本業はあくまで治療と、スタッフを育てる時間。</strong>
                  患者さんと向き合う時間、スタッフを教育する時間――この2つを削らないために、
                  事務作業や情報整理は徹底的に自動化する。
                  <strong>それも今の時代の治療家の役割</strong>だと考えています。
                </p>
                <p className="text-sm md:text-base text-gray-700 leading-relaxed mb-6">
                  AIを活用して<strong>これまでに50以上のシステムを開発</strong>。
                  すべて自分の院で実際に使い、施術とスタッフ教育に時間を回せるよう改善を重ねています。
                  だから、治療家が本当に必要としているシンプルで効く機能だけが残りました。
                </p>

                {/* 実績ハイライト */}
                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-white rounded-xl border border-gray-200 p-4 text-center shadow-sm">
                    <p className="text-2xl md:text-3xl font-black text-primary leading-none">10<span className="text-sm font-bold text-gray-400">年</span></p>
                    <p className="text-[11px] text-gray-500 mt-1.5">施術歴</p>
                  </div>
                  <div className="bg-white rounded-xl border border-gray-200 p-4 text-center shadow-sm">
                    <p className="text-2xl md:text-3xl font-black text-primary leading-none">50<span className="text-sm font-bold text-gray-400">+</span></p>
                    <p className="text-[11px] text-gray-500 mt-1.5">開発システム</p>
                  </div>
                  <div className="bg-white rounded-xl border border-gray-200 p-4 text-center shadow-sm">
                    <p className="text-2xl md:text-3xl font-black text-primary leading-none">429<span className="text-sm font-bold text-gray-400">万</span></p>
                    <p className="text-[11px] text-gray-500 mt-1.5">一人治療院最高月商</p>
                  </div>
                </div>

                <div className="mt-6 bg-white rounded-xl border-l-4 border-accent p-4">
                  <p className="text-sm text-gray-700 leading-relaxed italic">
                    「本業は治療と、スタッフを育てる時間。<br />
                    それを守るために、自動化できるところは全部自動化する。
                    それも今の治療家に必要な仕事だと思っています。」
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== セキュリティ ===== */}
      <section id="security" className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-10">
            <p className="text-xs font-bold text-accent tracking-widest mb-2">SECURITY</p>
            <h2 className="text-2xl md:text-3xl font-black text-primary mb-3">
              患者情報を、自院と同じ水準で守る。
            </h2>
            <p className="text-sm md:text-base text-gray-600">
              治療院経営者が自分の院の患者データを預ける前提で、4層のセキュリティを実装しています。
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            {/* 1. 通信・データ保護 */}
            <div className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl border border-gray-200 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h3 className="text-lg font-black text-primary">① 通信とデータの暗号化</h3>
              </div>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start gap-2"><span className="text-accent font-bold mt-0.5">✓</span><span>全通信SSL/TLS暗号化（HTTPS強制・HSTS有効）</span></li>
                <li className="flex items-start gap-2"><span className="text-accent font-bold mt-0.5">✓</span><span>データベース保存時も暗号化（Supabase基盤）</span></li>
                <li className="flex items-start gap-2"><span className="text-accent font-bold mt-0.5">✓</span><span>クリックジャッキング・MIMEスニッフィング対策</span></li>
              </ul>
            </div>

            {/* 2. 院ごとのデータ分離 */}
            <div className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl border border-gray-200 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-black text-primary">② 院ごとのデータ完全分離</h3>
              </div>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start gap-2"><span className="text-accent font-bold mt-0.5">✓</span><span>Supabase RLS（行レベルアクセス制御）で院間データを物理的に分離</span></li>
                <li className="flex items-start gap-2"><span className="text-accent font-bold mt-0.5">✓</span><span>「他院に自院のデータが見える」事故を構造的に防止</span></li>
                <li className="flex items-start gap-2"><span className="text-accent font-bold mt-0.5">✓</span><span>管理者キーはサーバー側のみ保管・フロント露出ゼロ</span></li>
              </ul>
            </div>

            {/* 3. 決済セキュリティ */}
            <div className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl border border-gray-200 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-cta/10 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-cta" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                </div>
                <h3 className="text-lg font-black text-primary">③ 決済とアカウント管理</h3>
              </div>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start gap-2"><span className="text-accent font-bold mt-0.5">✓</span><span>決済はStripe（PCI DSS Level 1）に完全委託・カード情報は当方サーバーを通過しない</span></li>
                <li className="flex items-start gap-2"><span className="text-accent font-bold mt-0.5">✓</span><span>Webhook通信は署名検証で改ざん防止</span></li>
                <li className="flex items-start gap-2"><span className="text-accent font-bold mt-0.5">✓</span><span>初期パスワード自動生成・初回ログイン後の変更を推奨</span></li>
              </ul>
            </div>

            {/* 4. 運用とアップデート */}
            <div className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl border border-gray-200 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-lg font-black text-primary">④ 運用とアップデート</h3>
              </div>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start gap-2"><span className="text-accent font-bold mt-0.5">✓</span><span>依存ライブラリの脆弱性を定期チェック・即座にパッチ適用</span></li>
                <li className="flex items-start gap-2"><span className="text-accent font-bold mt-0.5">✓</span><span>定期バックアップとロギング（Vercel + Supabase基盤）</span></li>
                <li className="flex items-start gap-2"><span className="text-accent font-bold mt-0.5">✓</span><span>解約済みメールの再登録ブロック等、業務ルール側でも保護</span></li>
              </ul>
            </div>
          </div>

          <p className="text-center text-xs text-gray-500 mt-8 leading-relaxed">
            ※ 開発者自身が大口神経整体院で運営している顧客データも、同じ基盤で守られています。<br/>
            自分の院で運用に耐えるかが、最初のセキュリティテストです。
          </p>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section id="faq" className="py-16 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-black text-center text-primary mb-10">
            よくある質問
          </h2>
          <div className="space-y-3">
            {FAQS.map((faq, i) => (
              <div key={i} className="bg-white rounded-xl border border-gray-200">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full text-left px-6 py-4 flex items-center justify-between"
                >
                  <span className="font-bold text-sm text-primary pr-4">{faq.q}</span>
                  <span className={`text-gray-400 flex-shrink-0 transition-transform text-xl ${openFaq === i ? "rotate-45" : ""}`}>
                    +
                  </span>
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-4">
                    <p className="text-sm text-gray-600 leading-relaxed">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== お問い合わせ ===== */}
      <section id="contact" className="py-16 bg-white">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-black text-center text-primary mb-3">
            お問い合わせ
          </h2>
          <p className="text-center text-gray-500 text-sm mb-8">
            まずはお気軽にご相談ください。無理な営業は一切しません。
          </p>

          {submitted ? (
            <div className="bg-accent/5 rounded-2xl p-8 text-center border border-accent/20">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-primary mb-2">お問い合わせありがとうございます</h3>
              <p className="text-gray-600 text-sm mb-6">1営業日以内にご連絡させていただきます。</p>
              <div className="bg-white rounded-xl border border-gray-200 p-6 max-w-sm mx-auto">
                <p className="text-sm text-gray-700 font-bold mb-3">LINEでもお気軽にご相談ください</p>
                <p className="text-xs text-gray-500 mb-4">LINEなら即日対応も可能です。デモのご案内もスムーズに行えます。</p>
                <a
                  href="https://lin.ee/8P11rM4"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#06C755] text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-[#05b34d] transition-all"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314"/></svg>
                  LINEで相談する
                </a>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-gray-50 rounded-2xl border border-gray-200 p-6 md:p-8 space-y-5">
              {/* ラジオボタン */}
              <div>
                <label className="text-sm font-bold text-primary mb-2 block">お問い合わせ種別</label>
                <div className="flex flex-wrap gap-3">
                  {["システムについて", "オーダーメイド開発について", "その他"].map((type) => (
                    <label key={type} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="contactType"
                        value={type}
                        checked={contactType === type}
                        onChange={(e) => setContactType(e.target.value)}
                        className="w-4 h-4 text-accent focus:ring-accent"
                      />
                      <span className="text-sm text-gray-700">{type}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-bold text-primary">お名前 <span className="text-red-500">*</span></label>
                  <input
                    required
                    value={contactForm.name}
                    onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                    placeholder="例: 山田 太郎"
                    className="w-full mt-1.5 px-4 py-3 border border-gray-200 rounded-lg text-sm focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition"
                  />
                </div>
                <div>
                  <label className="text-sm font-bold text-primary">院名 <span className="text-red-500">*</span></label>
                  <input
                    required
                    value={contactForm.clinicName}
                    onChange={(e) => setContactForm({ ...contactForm, clinicName: e.target.value })}
                    placeholder="例: ◯◯整体院 / ◯◯鍼灸院 / ◯◯接骨院 / ◯◯サロン"
                    className="w-full mt-1.5 px-4 py-3 border border-gray-200 rounded-lg text-sm focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-bold text-primary">メールアドレス <span className="text-red-500">*</span></label>
                  <input
                    type="email"
                    required
                    value={contactForm.email}
                    onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                    placeholder="info@example.com"
                    className="w-full mt-1.5 px-4 py-3 border border-gray-200 rounded-lg text-sm focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition"
                  />
                </div>
                <div>
                  <label className="text-sm font-bold text-primary">電話番号</label>
                  <input
                    value={contactForm.phone}
                    onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                    placeholder="090-1234-5678"
                    className="w-full mt-1.5 px-4 py-3 border border-gray-200 rounded-lg text-sm focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-bold text-primary">ご相談内容</label>
                <textarea
                  value={contactForm.message}
                  onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                  placeholder="気になることがあればお気軽にどうぞ"
                  rows={4}
                  className="w-full mt-1.5 px-4 py-3 border border-gray-200 rounded-lg text-sm focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition"
                />
              </div>

              {submitError && (
                <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg">{submitError}</div>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-4 bg-cta text-white rounded-xl font-bold text-base hover:bg-cta-600 hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? "送信中..." : "送信する"}
              </button>
              <p className="text-xs text-gray-400 text-center">
                送信後、1営業日以内にご連絡いたします
              </p>
            </form>
          )}
        </div>
      </section>

      {/* ===== Checkout Modal ===== */}
      {checkoutModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4" onClick={() => setCheckoutModal(false)}>
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 md:p-8" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-primary">お申し込み</h3>
              <button
                onClick={() => setCheckoutModal(false)}
                className="text-gray-400 hover:text-gray-600 text-2xl leading-none"
              >
                &times;
              </button>
            </div>
            <div className="bg-gray-50 rounded-xl p-4 mb-5 text-sm">
              <div className="flex items-center justify-between mb-2">
                <p className="text-gray-500">選択中のシステム（{selectedApps.length}つ）</p>
                <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                  checkoutPaymentType === "onetime"
                    ? "bg-primary/10 text-primary"
                    : checkoutPaymentType === "yearly"
                    ? "bg-cta/10 text-cta"
                    : "bg-accent/10 text-accent"
                }`}>
                  {checkoutPaymentType === "onetime" ? "買い切り" : checkoutPaymentType === "yearly" ? "年払い" : "月払い"}
                </span>
              </div>
              <div className="flex flex-wrap gap-1.5 mb-3">
                {APPS.filter(a => selectedApps.includes(a.id)).map(a => (
                  <span key={a.id} className="bg-accent/10 text-accent text-xs font-bold px-2 py-1 rounded-full">
                    {a.shortName}
                  </span>
                ))}
              </div>
              <div className="border-t border-gray-200 pt-2 space-y-1">
                {checkoutPaymentType === "onetime" ? (
                  <>
                    <div className="flex justify-between items-end">
                      <span className="text-gray-500">買い切り金額</span>
                      <div>
                        <span className="text-xl font-black text-accent">{calcTotal.initialTotal.toLocaleString()}円</span>
                      </div>
                    </div>
                    <p className="text-xs text-gray-400 mt-1">
                      初年度サポート込み。2年目以降は年間保守費（12,000円/年）が発生します。
                    </p>
                  </>
                ) : checkoutPaymentType === "yearly" ? (
                  <>
                    <div className="flex justify-between items-end">
                      <span className="text-gray-500">年額お支払い</span>
                      <div>
                        <span className="text-xl font-black text-accent">{calcTotal.yearlyTotal.toLocaleString()}円</span>
                        <span className="text-gray-500 text-xs">/年</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-end">
                      <span className="text-gray-500">初期費用</span>
                      <span className="font-bold">{calcTotal.initialTotal.toLocaleString()}円</span>
                    </div>
                    <p className="text-cta text-xs text-right mt-1">1ヶ月分お得!</p>
                  </>
                ) : (
                  <>
                    <div className="flex justify-between items-end">
                      <span className="text-gray-500">月額お支払い</span>
                      <div>
                        <span className="text-xl font-black text-accent">{calcTotal.monthlyTotal.toLocaleString()}円</span>
                        <span className="text-gray-500 text-xs">/月</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-end">
                      <span className="text-gray-500">初期費用</span>
                      <span className="font-bold">{calcTotal.initialTotal.toLocaleString()}円</span>
                    </div>
                  </>
                )}
              </div>
              {calcTotal.discount.discount > 0 && checkoutPaymentType !== "onetime" && (
                <p className="text-accent text-xs text-right mt-1">{calcTotal.discount.label}適用中</p>
              )}
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-bold text-primary">院名 <span className="text-red-500">*</span></label>
                <input
                  value={checkoutClinicName}
                  onChange={(e) => setCheckoutClinicName(e.target.value)}
                  placeholder="例: ◯◯整体院 / ◯◯鍼灸院 / ◯◯接骨院 / ◯◯サロン"
                  className="w-full mt-1.5 px-4 py-3 border border-gray-200 rounded-lg text-sm focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition"
                />
              </div>
              <div>
                <label className="text-sm font-bold text-primary">メールアドレス <span className="text-red-500">*</span></label>
                <input
                  type="email"
                  value={checkoutEmail}
                  onChange={(e) => setCheckoutEmail(e.target.value)}
                  placeholder="info@example.com"
                  className="w-full mt-1.5 px-4 py-3 border border-gray-200 rounded-lg text-sm focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition"
                />
              </div>
              {checkoutError && (
                <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg">{checkoutError}</div>
              )}
              <button
                onClick={() => handleCheckout(checkoutPaymentType)}
                disabled={checkoutLoading}
                className="w-full py-3.5 bg-cta text-white rounded-xl font-bold hover:bg-cta-600 hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {checkoutLoading ? "処理中..." : "決済に進む"}
              </button>
              <p className="text-xs text-gray-400 text-center">Stripeの安全な決済画面に移動します</p>
            </div>
          </div>
        </div>
      )}

      {/* ===== フッター ===== */}
      <footer className="bg-primary text-gray-300 py-12">
        <div className="max-w-5xl mx-auto px-4">
          <div className="md:flex md:justify-between md:items-start mb-8">
            <div className="mb-6 md:mb-0">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center">
                  <span className="text-white font-black text-sm">C</span>
                </div>
                <span className="text-lg font-black text-white">ClinicMark</span>
              </div>
              <p className="text-sm text-gray-400 max-w-xs">
                治療家のための、アプリラボ。
                現場で毎日使いながら改善を重ねています。
              </p>
            </div>
            <div className="grid grid-cols-2 gap-8 text-sm">
              <div>
                <p className="text-white font-bold mb-3">サービス</p>
                <div className="space-y-2">
                  <a href="#apps" className="block hover:text-white transition">システム一覧</a>
                  <a href="#pricing" className="block hover:text-white transition">料金プラン</a>
                  <a href="#custom-dev" className="block hover:text-white transition">オーダーメイド開発</a>
                  <a href="#faq" className="block hover:text-white transition">よくある質問</a>
                </div>
              </div>
              <div>
                <p className="text-white font-bold mb-3">運営</p>
                <div className="space-y-2">
                  <p className="text-gray-400">株式会社IDOMI</p>
                  <p className="text-gray-400 text-xs">代表 大口 陽平 / 大口神経整体院 院長</p>
                  <a href="https://lin.ee/8P11rM4" target="_blank" rel="noopener noreferrer" className="block hover:text-white transition">LINEで相談</a>
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-white/10 pt-6">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3">
              <div className="flex gap-4 text-xs text-gray-500">
                <a href="/legal/tokushoho" className="hover:text-white transition">特定商取引法に基づく表記</a>
                <a href="/legal/terms" className="hover:text-white transition">利用規約</a>
                <a href="/legal/privacy" className="hover:text-white transition">プライバシーポリシー</a>
              </div>
              <p className="text-xs text-gray-500">
                &copy; 2026 株式会社IDOMI. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
