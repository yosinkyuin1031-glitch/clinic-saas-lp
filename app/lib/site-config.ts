// ============================================================
// ClinicMark サイト共通定数
// 個別LP（/systems/[id]）と総合LPで共有する開発者・事業者・業種定義
// ============================================================

export const LINE_URL = "https://lin.ee/8P11rM4";

export const DEVELOPER = {
  name: "大口 陽平",
  title: "治療院経営者 / アプリ開発者",
  portrait: "/images/clinic/portrait-2022.jpeg",
  portraitAlt: "/images/clinic/portrait-2024.jpg",
  treatmentPhoto: "/images/clinic/treatment-3.jpeg",
  treatmentPhotos: [
    "/images/clinic/treatment-1.jpeg",
    "/images/clinic/treatment-2.jpeg",
    "/images/clinic/treatment-3.jpeg",
    "/images/clinic/treatment-4.jpeg",
    "/images/clinic/treatment-5.jpeg",
    "/images/clinic/treatment-6.jpeg",
  ],
  clinicPhotos: {
    interior: "/images/clinic/clinic-in-1.jpeg",
    exterior: "/images/clinic/clinic-out-1.jpg",
  },
  clinics: [
    { name: "大口神経整体院", role: "院長", location: "大阪市住吉区" },
    { name: "晴陽鍼灸院", role: "代表", note: "訪問鍼灸リハビリ事業" },
  ],
  highlights: {
    yearsExperience: 10,
    foundedYear: 2021,
    maxMonthlyRevenue: 429, // 万円
    appsBuilt: 50,
  },
  quote: "本業は治療と、スタッフを育てる時間。それを守るために、自動化できるところは全部自動化する。それも今の治療家に必要な仕事だと思っています。",
  bullets: [
    "大口神経整体院 院長（大阪市住吉区）",
    "晴陽鍼灸院 代表（訪問鍼灸リハビリ事業）",
    "施術歴10年・2021年開業／一人治療院で最高月商429万円達成",
    "治療家向けアプリを50本以上開発",
  ],
};

export const BUSINESS = {
  legalName: "株式会社IDOMI",
  brand: "ClinicMark",
  representative: "大口 陽平",
  businessDescription: "治療院向けアプリ・SaaSの開発・販売、コンサルティング",
  contactEmail: "yosinkyuin1031@gmail.com",
  contactLine: LINE_URL,
};

// 主力3アプリ（個別LP相互回遊用・最新の販売主力）
export type MainAppMeta = {
  id: "kensa" | "customer" | "meo";
  name: string;
  tagline: string;       // 1行コピー
  monthlyPrice: number;
  detailUrl: string;     // 個別LP
  themeColor: string;    // カードのアクセント色（tailwind class片）
  iconEmoji: string;     // フォールバック視覚
};

export const MAIN_APPS: MainAppMeta[] = [
  {
    id: "kensa",
    name: "カラダマップ",
    tagline: "3分で体の\"いま\"を見える化。検査の根拠を自動で残す。",
    monthlyPrice: 5500,
    detailUrl: "/systems/kensa",
    themeColor: "blue",
    iconEmoji: "🗺️",
  },
  {
    id: "customer",
    name: "Clinic Core",
    tagline: "LTV・離反・広告ROI、経営に必要な数字が一目でわかる顧客管理。",
    monthlyPrice: 5500,
    detailUrl: "/systems/customer",
    themeColor: "indigo",
    iconEmoji: "📊",
  },
  {
    id: "meo",
    name: "MEO勝ち上げくん",
    tagline: "外注に月5万払うか、自分で月5,500円で内製化するか。",
    monthlyPrice: 5500,
    detailUrl: "/systems/meo",
    themeColor: "emerald",
    iconEmoji: "📍",
  },
];

// 業種定義（整体・鍼灸・接骨院・サロン）
// 各個別LPの「業種別ユースケース」セクションで使用
export const INDUSTRIES = [
  { id: "seitai", label: "整体院", emoji: "🦴" },
  { id: "shinkyu", label: "鍼灸院", emoji: "🪡" },
  { id: "sekkotsu", label: "接骨院", emoji: "🩹" },
  { id: "salon", label: "サロン", emoji: "💆" },
] as const;

export type IndustryId = (typeof INDUSTRIES)[number]["id"];

// 個別LPで業種別ユースケースを書くときの型
export type IndustryUseCase = {
  industry: IndustryId;
  body: string; // 1〜2行の使い方説明
};
