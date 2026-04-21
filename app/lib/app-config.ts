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
}

export const APP_CONFIGS: AppConfig[] = [
  {
    id: "kensa",
    label: "カラダマップ",
    monthlyPrice: 3980,
    initialCost: 11000,
    color: "bg-blue-500",
    clinicFlag: "app_kensa",
    forSale: true,
    stripe: {
      product_id: "prod_UFBwJHP8jALL4b",
      monthly_price_id: "price_1TGhYvCORfdwaD8CHnlOS7Bu",
      onetime_price_id: null,
      maintenance_price_id: "price_1TGhYwCORfdwaD8Co2irSJ6u",
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
