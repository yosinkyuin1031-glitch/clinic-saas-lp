// ========================================
// アプリ設定マスター（一元管理）
// 新しいアプリを追加する場合はここに1行追加するだけでOK
// ========================================

export interface AppConfig {
  id: string;
  label: string;            // 表示名
  monthlyPrice: number;     // 月額料金
  color: string;            // Tailwind色クラス
  clinicFlag: string | null; // clinicsテーブルのフラグ名（null=フラグなし）
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
    label: "検査シート",
    monthlyPrice: 3980,
    color: "bg-blue-500",
    clinicFlag: "app_kensa",
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
    monthlyPrice: 4980,
    color: "bg-emerald-500",
    clinicFlag: "app_crm",
    stripe: {
      product_id: "prod_UFBwKPQ5cfEPxK",
      monthly_price_id: "price_1TGhYwCORfdwaD8CuqZkeafR",
      onetime_price_id: "price_1TGhYxCORfdwaD8CRH9eYbwX",
      maintenance_price_id: "price_1TGhYxCORfdwaD8CUvn2J4Qw",
    },
  },
  {
    id: "reservation",
    label: "予約管理",
    monthlyPrice: 2980,
    color: "bg-purple-500",
    clinicFlag: null,
    stripe: {
      product_id: "prod_UFBwWOWwQ0lgGJ",
      monthly_price_id: "price_1TGhYyCORfdwaD8CKedjRNXu",
      onetime_price_id: "price_1TGhYyCORfdwaD8CdL03h3bY",
      maintenance_price_id: "price_1TGhYzCORfdwaD8CGuQOudoy",
    },
  },
  {
    id: "monshin",
    label: "WEB問診",
    monthlyPrice: 2980,
    color: "bg-amber-500",
    clinicFlag: null,
    stripe: {
      product_id: "prod_UFBwmaLpqNPBbP",
      monthly_price_id: "price_1TGhZ0CORfdwaD8CH4QlYhsZ",
      onetime_price_id: "price_1TGhZ0CORfdwaD8COmar8obU",
      maintenance_price_id: "price_1TGhZ0CORfdwaD8C92IMxrXW",
    },
  },
  {
    id: "meo",
    label: "MEO勝ち上げくん",
    monthlyPrice: 4980,
    color: "bg-rose-500",
    clinicFlag: "app_meo",
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
    monthlyPrice: 4980,
    color: "bg-indigo-500",
    clinicFlag: "app_sleep",
    stripe: {
      product_id: "prod_UFBwgJMEJoGGA1",
      monthly_price_id: "price_1TGhZ3CORfdwaD8CkQ0yvyTa",
      onetime_price_id: null,
      maintenance_price_id: "price_1TGhZ3CORfdwaD8CB1yMXt2e",
    },
  },
];

// === 以下は他ファイルからインポートして使うヘルパー ===

/** アプリIDの配列 */
export const APP_LIST = APP_CONFIGS.map((a) => a.id);

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
