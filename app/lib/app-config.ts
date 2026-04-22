// ========================================
// アプリ設定マスター（一元管理）
// 新しいアプリを追加する場合はここに1行追加するだけでOK
// ========================================

export interface AppConfig {
  id: string;
  label: string;            // 表示名
  monthlyPrice: number;     // 月額料金
  initialCost: number;      // 買い切り時の初期費用
  color: string;            // Tailwind色クラス
  clinicFlag: string | null; // clinicsテーブルのフラグ名（null=フラグなし）
  forSale: boolean;         // 現在販売中かどうか
  stripe: {
    product_id: string;
    monthly_price_id: string;
    onetime_price_id: string | null;
    maintenance_price_id: string;
  };
  /** アプリ別ウェルカムメール設定 */
  email: {
    loginUrl: string;           // ログインURL
    headerBg: string;           // メールヘッダー背景色（HEX）
    tagline: string;            // ヘッダー下のサブタイトル
    intro: string;              // 本文冒頭の紹介文
    features: string[];         // 特徴の箇条書き
    firstStep: string;          // 初回に案内したい操作
  };
}

export const APP_CONFIGS: AppConfig[] = [
  {
    id: "kensa",
    label: "カラダマップ",
    // 通常プラン月額: 5,500円（初期費用なし・月額のみ）
    // 現Liteモニター（水田・中越）は3,980円据え置き、Pro機能実装時に5,500円へ移行
    monthlyPrice: 5500,
    initialCost: 0,
    color: "bg-blue-500",
    clinicFlag: "app_kensa",
    forSale: true,
    stripe: {
      product_id: "prod_UFBwJHP8jALL4b",
      // 通常プラン5,500円の新規Price（2026-04-22作成）
      // Payment Link: https://buy.stripe.com/00w28qgZ60GIeIc0ut08g0k
      monthly_price_id: "price_1TOrRiCORfdwaD8CcnvNFSgA",
      onetime_price_id: null,
      maintenance_price_id: "price_1TGhYwCORfdwaD8Co2irSJ6u",
    },
    email: {
      loginUrl: "https://kensa-sheet-app.vercel.app",
      headerBg: "#3B82F6",
      tagline: "検査シート・患者説明ツール",
      intro: "カラダマップは、初回カウンセリングで使う検査シートをタブレットで完結できるアプリです。検査結果をPDFで患者さんに即お渡しできます。",
      features: [
        "検査項目をタブレットで入力",
        "結果をPDFで出力・印刷・メール送信",
        "施術提案書の作成にも活用可能",
      ],
      firstStep: "ログイン後、まずはサンプル患者で検査シートを作成してみてください。",
    },
  },
  {
    id: "customer",
    label: "顧客管理",
    monthlyPrice: 5500,
    initialCost: 33000,
    color: "bg-emerald-500",
    clinicFlag: "app_crm",
    forSale: true,
    stripe: {
      product_id: "prod_UGVglRbCwKWJIy",
      monthly_price_id: "price_1THyf7CORfdwaD8C9LQim27s",
      onetime_price_id: "price_1THyf9CORfdwaD8CrLFqN6Hn",
      maintenance_price_id: "price_1TGhYxCORfdwaD8CUvn2J4Qw",
    },
    email: {
      loginUrl: "https://customer-mgmt.vercel.app/login",
      headerBg: "#047857",
      tagline: "治療院の経営を数字で見える化",
      intro: "Clinic Coreは、患者情報・来院履歴・LTV・ROASを一元管理できる治療院向け顧客管理アプリです。散らばっていた情報が、1画面で把握できるようになります。",
      features: [
        "患者情報・施術履歴の一元管理",
        "離反アラート・誕生日リマインド",
        "LTV・ROASの自動計算ダッシュボード",
      ],
      firstStep: "ログイン後、まず患者を1名登録するか、既存データのCSVインポートをお試しください。",
    },
  },
  {
    id: "reservation",
    label: "予約管理",
    monthlyPrice: 3980,
    initialCost: 11000,
    color: "bg-purple-500",
    clinicFlag: null,
    forSale: false,
    stripe: {
      product_id: "prod_UGVoucf5IGiliu",
      monthly_price_id: "price_1THymhCORfdwaD8C1Q1qdDBc",
      onetime_price_id: "price_1THymjCORfdwaD8CIIYuDIGB",
      maintenance_price_id: "price_1TGhYzCORfdwaD8CGuQOudoy",
    },
    email: {
      loginUrl: "https://reservation-app.vercel.app/login",
      headerBg: "#9333EA",
      tagline: "治療院のための予約管理アプリ",
      intro: "予約管理アプリで、ネット予約・来店履歴・リマインド通知を一元管理できます。",
      features: [
        "ネット予約フォームの設置",
        "来店前日のリマインド配信",
        "スタッフ別・メニュー別の予約可視化",
      ],
      firstStep: "ログイン後、まず営業時間・スタッフ・メニューの設定を行ってください。",
    },
  },
  {
    id: "monshin",
    label: "WEB問診",
    monthlyPrice: 2980,
    initialCost: 11000,
    color: "bg-amber-500",
    clinicFlag: null,
    forSale: false,
    stripe: {
      product_id: "prod_UGVoZjYnEYQh23",
      monthly_price_id: "price_1THymlCORfdwaD8CoSJ89cSZ",
      onetime_price_id: "price_1THymmCORfdwaD8CZH1XkUqQ",
      maintenance_price_id: "price_1TGhZ0CORfdwaD8C92IMxrXW",
    },
    email: {
      loginUrl: "https://monshin-app.vercel.app/login",
      headerBg: "#F59E0B",
      tagline: "スマホで完結するWEB問診票",
      intro: "WEB問診アプリで、来店前にスマホで問診を完了いただけます。紙の問診票を削減し、受付時間を短縮します。",
      features: [
        "カスタマイズ可能な問診項目",
        "来店前のスマホ入力（QRコード対応）",
        "回答結果の自動集計・保存",
      ],
      firstStep: "ログイン後、問診票のテンプレートを選び、項目をカスタマイズしてください。",
    },
  },
  {
    id: "meo",
    label: "MEO勝ち上げくん",
    monthlyPrice: 3980,
    initialCost: 11000,
    color: "bg-rose-500",
    clinicFlag: "app_meo",
    forSale: false,
    stripe: {
      product_id: "prod_UFBw6XVaolhrNd",
      monthly_price_id: "price_1TGhZ1CORfdwaD8CPA6i7VRA",
      onetime_price_id: "price_1TGhZ2CORfdwaD8CdR4HrCK1",
      maintenance_price_id: "price_1TGhZ2CORfdwaD8CuMEkZlFE",
    },
    email: {
      loginUrl: "https://meo-app.vercel.app/login",
      headerBg: "#E11D48",
      tagline: "Googleマップ順位を自動モニタリング",
      intro: "MEO勝ち上げくんは、Googleマップの検索順位を定期的に追跡し、改善ポイントを提案するツールです。",
      features: [
        "検索キーワード別の順位追跡",
        "競合との比較ダッシュボード",
        "口コミ・投稿アクションの自動提案",
      ],
      firstStep: "ログイン後、追跡したいキーワードとエリアを登録してください。",
    },
  },
  {
    id: "sleep",
    label: "睡眠チェック",
    monthlyPrice: 2200,
    initialCost: 11000,
    color: "bg-indigo-500",
    clinicFlag: "app_sleep",
    forSale: false,
    stripe: {
      product_id: "prod_UFBwgJMEJoGGA1",
      monthly_price_id: "price_1TGhZ3CORfdwaD8CkQ0yvyTa",
      onetime_price_id: null,
      maintenance_price_id: "price_1TGhZ3CORfdwaD8CB1yMXt2e",
    },
    email: {
      loginUrl: "https://sleep-check-app.vercel.app/login",
      headerBg: "#6366F1",
      tagline: "睡眠の質を分析・改善提案",
      intro: "睡眠チェック分析アプリで、患者の睡眠状態を客観的に可視化し、改善提案を行えます。",
      features: [
        "睡眠状態の多面的な分析",
        "改善アドバイスの自動生成",
        "結果をPDFでお渡し可能",
      ],
      firstStep: "ログイン後、サンプル患者で分析フローを試してみてください。",
    },
  },
  {
    id: "point",
    label: "サブスク管理",
    monthlyPrice: 4980,
    initialCost: 11000,
    color: "bg-teal-500",
    clinicFlag: "app_point",
    forSale: false,
    stripe: {
      product_id: "prod_UJi6RNz61HGBcC",
      monthly_price_id: "price_1TL4gCCORfdwaD8C9rluVvKb",
      onetime_price_id: null,
      maintenance_price_id: "price_1TL4gDCORfdwaD8CrHvYKRE7",
    },
    email: {
      loginUrl: "https://point-mgmt.vercel.app/login",
      headerBg: "#0D9488",
      tagline: "サブスク会員とポイント管理",
      intro: "サブスク管理アプリで、月額会員のステータス管理・ポイント付与・プラン変更を一元化できます。",
      features: [
        "月額サブスクプランの作成・管理",
        "ポイント付与と消化履歴",
        "Square/会費ペイ連携対応",
      ],
      firstStep: "ログイン後、プランとポイントルールを設定してください。",
    },
  },
];

// === 以下は他ファイルからインポートして使うヘルパー ===

/** アプリIDの配列（全アプリ） */
export const APP_LIST = APP_CONFIGS.map((a) => a.id);

/** 販売中アプリのみ */
export const APP_CONFIGS_FOR_SALE = APP_CONFIGS.filter((a) => a.forSale);
export const APP_LIST_FOR_SALE = APP_CONFIGS_FOR_SALE.map((a) => a.id);

/** id→表示名 */
export const APP_LABELS: Record<string, string> = Object.fromEntries(
  APP_CONFIGS.map((a) => [a.id, a.label])
);

/** id→月額 */
export const APP_MONTHLY_PRICES: Record<string, number> = Object.fromEntries(
  APP_CONFIGS.map((a) => [a.id, a.monthlyPrice])
);

/** id→色クラス */
export const APP_COLORS: Record<string, string> = Object.fromEntries(
  APP_CONFIGS.map((a) => [a.id, a.color])
);

/** id→clinicsテーブルフラグ名 */
export const APP_FLAG_MAP: Record<string, string> = Object.fromEntries(
  APP_CONFIGS.filter((a) => a.clinicFlag).map((a) => [a.id, a.clinicFlag!])
);

/** Stripe Products（後方互換） */
export const STRIPE_PRODUCTS = Object.fromEntries(
  APP_CONFIGS.map((a) => [a.id, a.stripe])
) as Record<string, AppConfig["stripe"]>;

/**
 * 選択アプリIDから合計金額をサーバー側で計算
 * paymentType: "monthly" | "yearly"(月額×10) | "onetime"(初期費用合計)
 * 不正なIDは無視
 */
export function calculateAmount(
  selectedAppIds: string[],
  paymentType: "monthly" | "yearly" | "onetime"
): number {
  const selected = APP_CONFIGS.filter((a) => selectedAppIds.includes(a.id));
  if (paymentType === "onetime") {
    return selected.reduce((sum, a) => sum + a.initialCost, 0);
  }
  const monthly = selected.reduce((sum, a) => sum + a.monthlyPrice, 0);
  return paymentType === "yearly" ? monthly * 10 : monthly;
}
