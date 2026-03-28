"use client";

import { useState, useEffect, useMemo } from "react";

interface ClinicAccount {
  id: string;
  clinic_id: string;
  clinic_name: string;
  email: string;
  plan_type: "monthly" | "yearly" | "onetime";
  selected_apps: string[];
  status: string;
  stripe_customer_id: string | null;
  stripe_subscription_id: string | null;
  created_at: string;
  cancelled_at: string | null;
  metadata: Record<string, unknown> | null;
}

const APP_LABELS: Record<string, string> = {
  kensa: "検査",
  customer: "顧客",
  reservation: "予約",
  monshin: "問診",
  meo: "MEO",
  sleep: "睡眠",
};

const APP_MONTHLY_PRICES: Record<string, number> = {
  kensa: 5500,
  customer: 4980,
  reservation: 2980,
  monshin: 2980,
  meo: 4980,
  sleep: 1980,
};

const STATUS_STYLES: Record<string, { bg: string; text: string; label: string }> = {
  active: { bg: "bg-green-100", text: "text-green-700", label: "アクティブ" },
  cancelled: { bg: "bg-gray-100", text: "text-gray-600", label: "解約済み" },
  payment_failed: { bg: "bg-red-100", text: "text-red-700", label: "支払い失敗" },
};

const PLAN_LABELS: Record<string, string> = {
  monthly: "月払い",
  yearly: "年払い",
  onetime: "買い切り",
};

function getMonthlyAmount(account: ClinicAccount): number {
  if (account.plan_type === "onetime") return 0;
  const apps = account.selected_apps || [];
  const subtotal = apps.reduce((sum, appId) => sum + (APP_MONTHLY_PRICES[appId] || 0), 0);
  // セット割引を推定
  const count = apps.length;
  let discount = 0;
  if (count >= 5) discount = 0.2;
  else if (count >= 3) discount = 0.1;
  else if (count >= 2) discount = 0.05;
  const monthly = Math.floor(subtotal * (1 - discount));
  if (account.plan_type === "yearly") {
    return Math.floor(monthly * 10 / 12); // 年払い月額換算
  }
  return monthly;
}

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [accounts, setAccounts] = useState<ClinicAccount[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [planFilter, setPlanFilter] = useState("all");

  const fetchAccounts = async (pw: string) => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`/api/admin`, {
        headers: { "x-admin-password": pw },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "取得に失敗しました");
      setAccounts(data.accounts);
      setAuthenticated(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "エラーが発生しました");
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    fetchAccounts(password);
  };

  // URLパラメータからパスワード自動認証
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const pw = params.get("password");
    if (pw) {
      setPassword(pw);
      fetchAccounts(pw);
    }
  }, []);

  const filteredAccounts = useMemo(() => {
    return accounts.filter((a) => {
      if (statusFilter !== "all" && a.status !== statusFilter) return false;
      if (planFilter !== "all" && a.plan_type !== planFilter) return false;
      return true;
    });
  }, [accounts, statusFilter, planFilter]);

  const summary = useMemo(() => {
    const total = accounts.length;
    const active = accounts.filter((a) => a.status === "active").length;
    const cancelled = accounts.filter((a) => a.status === "cancelled").length;
    const paymentFailed = accounts.filter((a) => a.status === "payment_failed").length;
    const monthly = accounts.filter((a) => a.plan_type === "monthly" && a.status === "active");
    const yearly = accounts.filter((a) => a.plan_type === "yearly" && a.status === "active");
    const onetime = accounts.filter((a) => a.plan_type === "onetime").length;

    const mrr =
      monthly.reduce((sum, a) => sum + getMonthlyAmount(a), 0) +
      yearly.reduce((sum, a) => sum + getMonthlyAmount(a), 0);

    return { total, active, cancelled, paymentFailed, mrr, yearlyCount: yearly.length, onetimeCount: onetime };
  }, [accounts]);

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-lg p-8 max-w-sm w-full">
          <h1 className="text-xl font-black text-gray-900 mb-6 text-center">管理画面ログイン</h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-sm font-bold text-gray-700">パスワード</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full mt-1.5 px-4 py-3 border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
                placeholder="管理パスワードを入力"
              />
            </div>
            {error && <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg">{error}</div>}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-gray-900 text-white rounded-lg font-bold hover:bg-gray-800 transition disabled:opacity-50"
            >
              {loading ? "読み込み中..." : "ログイン"}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <h1 className="text-xl font-black text-gray-900">ClinicApps 管理ダッシュボード</h1>
          <button
            onClick={() => fetchAccounts(password)}
            className="text-sm bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg font-bold transition"
          >
            更新
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* サマリーカード */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <SummaryCard label="総顧客数" value={summary.total} />
          <SummaryCard label="アクティブ" value={summary.active} color="text-green-600" />
          <SummaryCard label="解約数" value={summary.cancelled} color="text-gray-500" />
          <SummaryCard label="支払い失敗" value={summary.paymentFailed} color="text-red-600" />
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          <SummaryCard label="月額MRR" value={`${summary.mrr.toLocaleString()}円`} color="text-blue-600" />
          <SummaryCard label="年払い顧客" value={summary.yearlyCount} />
          <SummaryCard label="買い切り顧客" value={summary.onetimeCount} />
        </div>

        {/* フィルター */}
        <div className="flex flex-wrap gap-4 mb-6">
          <div>
            <label className="text-xs font-bold text-gray-500 block mb-1">ステータス</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white"
            >
              <option value="all">すべて</option>
              <option value="active">アクティブ</option>
              <option value="cancelled">解約済み</option>
              <option value="payment_failed">支払い失敗</option>
            </select>
          </div>
          <div>
            <label className="text-xs font-bold text-gray-500 block mb-1">プランタイプ</label>
            <select
              value={planFilter}
              onChange={(e) => setPlanFilter(e.target.value)}
              className="px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white"
            >
              <option value="all">すべて</option>
              <option value="monthly">月払い</option>
              <option value="yearly">年払い</option>
              <option value="onetime">買い切り</option>
            </select>
          </div>
          <div className="flex items-end">
            <span className="text-sm text-gray-500">{filteredAccounts.length}件表示</span>
          </div>
        </div>

        {/* テーブル */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="text-left px-4 py-3 font-bold text-gray-600">Clinic ID</th>
                  <th className="text-left px-4 py-3 font-bold text-gray-600">院名</th>
                  <th className="text-left px-4 py-3 font-bold text-gray-600">メール</th>
                  <th className="text-left px-4 py-3 font-bold text-gray-600">プラン</th>
                  <th className="text-left px-4 py-3 font-bold text-gray-600">選択アプリ</th>
                  <th className="text-left px-4 py-3 font-bold text-gray-600">ステータス</th>
                  <th className="text-right px-4 py-3 font-bold text-gray-600">月額</th>
                  <th className="text-left px-4 py-3 font-bold text-gray-600">登録日</th>
                </tr>
              </thead>
              <tbody>
                {filteredAccounts.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="text-center py-12 text-gray-400">
                      データがありません
                    </td>
                  </tr>
                ) : (
                  filteredAccounts.map((account) => {
                    const statusStyle = STATUS_STYLES[account.status] || STATUS_STYLES.active;
                    const monthlyAmount = getMonthlyAmount(account);
                    return (
                      <tr key={account.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="px-4 py-3 font-mono text-xs text-gray-500">
                          {account.clinic_id}
                        </td>
                        <td className="px-4 py-3 font-bold text-gray-900">
                          {account.clinic_name}
                        </td>
                        <td className="px-4 py-3 text-gray-600">
                          {account.email}
                        </td>
                        <td className="px-4 py-3">
                          <span className="bg-blue-50 text-blue-700 text-xs font-bold px-2 py-1 rounded-full">
                            {PLAN_LABELS[account.plan_type] || account.plan_type}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex flex-wrap gap-1">
                            {(account.selected_apps || []).map((appId) => (
                              <span
                                key={appId}
                                className="bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded"
                              >
                                {APP_LABELS[appId] || appId}
                              </span>
                            ))}
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <span className={`text-xs font-bold px-2 py-1 rounded-full ${statusStyle.bg} ${statusStyle.text}`}>
                            {statusStyle.label}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-right font-bold text-gray-900">
                          {account.plan_type === "onetime"
                            ? "-"
                            : `${monthlyAmount.toLocaleString()}円`}
                        </td>
                        <td className="px-4 py-3 text-gray-500 text-xs">
                          {new Date(account.created_at).toLocaleDateString("ja-JP")}
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}

function SummaryCard({
  label,
  value,
  color = "text-gray-900",
}: {
  label: string;
  value: string | number;
  color?: string;
}) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5">
      <p className="text-xs font-bold text-gray-500 mb-1">{label}</p>
      <p className={`text-2xl font-black ${color}`}>{value}</p>
    </div>
  );
}
