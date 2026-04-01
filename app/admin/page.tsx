"use client";

import { useState, useEffect, useMemo, useCallback } from "react";

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
  owner_name?: string;
  phone?: string;
}

const APP_LIST = ["kensa", "customer", "reservation", "monshin", "meo", "sleep"] as const;

const APP_LABELS: Record<string, string> = {
  kensa: "検査シート",
  customer: "顧客管理",
  reservation: "予約管理",
  monshin: "WEB問診",
  meo: "MEO勝ち上げくん",
  sleep: "睡眠チェック",
};

const APP_MONTHLY_PRICES: Record<string, number> = {
  kensa: 3980,
  customer: 4980,
  reservation: 2980,
  monshin: 2980,
  meo: 4980,
  sleep: 4980,
};

const APP_COLORS: Record<string, string> = {
  kensa: "bg-blue-500",
  customer: "bg-emerald-500",
  reservation: "bg-purple-500",
  monshin: "bg-amber-500",
  meo: "bg-rose-500",
  sleep: "bg-indigo-500",
};

const STATUS_STYLES: Record<string, { bg: string; text: string; label: string }> = {
  active: { bg: "bg-green-100", text: "text-green-700", label: "利用中" },
  pending_payment: { bg: "bg-blue-100", text: "text-blue-700", label: "決済待ち" },
  cancelled: { bg: "bg-gray-100", text: "text-gray-600", label: "解約済み" },
  payment_failed: { bg: "bg-red-100", text: "text-red-700", label: "支払い失敗" },
  suspended: { bg: "bg-yellow-100", text: "text-yellow-700", label: "停止中" },
};

const PLAN_LABELS: Record<string, string> = {
  monthly: "月払い",
  yearly: "年払い",
  onetime: "買い切り",
};

type Tab = "dashboard" | "apps" | "accounts" | "create" | "meo";

interface MeoMonitor {
  user_id: string;
  email: string;
  last_sign_in: string | null;
  created_at: string;
  clinics: { id: string; name: string; area: string; category: string; keywords: string[] }[];
  rankings: { keyword: string; latest: number | null; previous: number | null; latestDate: string; previousDate: string }[];
  account_status: string | null;
  clinic_name_account: string | null;
}

function getMonthlyAmount(account: ClinicAccount): number {
  if (account.plan_type === "onetime") return 0;
  const apps = account.selected_apps || [];
  const subtotal = apps.reduce((sum, appId) => sum + (APP_MONTHLY_PRICES[appId] || 0), 0);
  const count = apps.length;
  let discount = 0;
  if (count >= 5) discount = 0.2;
  else if (count >= 3) discount = 0.1;
  else if (count >= 2) discount = 0.05;
  const monthly = Math.floor(subtotal * (1 - discount));
  if (account.plan_type === "yearly") return Math.floor((monthly * 10) / 12);
  return monthly;
}

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [accounts, setAccounts] = useState<ClinicAccount[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState<Tab>("dashboard");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [appFilter, setAppFilter] = useState("all");
  const [selectedAccount, setSelectedAccount] = useState<ClinicAccount | null>(null);
  const [actionLoading, setActionLoading] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  // MEOモニター
  const [meoMonitors, setMeoMonitors] = useState<MeoMonitor[]>([]);
  const [meoLoading, setMeoLoading] = useState(false);
  const [selectedMonitor, setSelectedMonitor] = useState<MeoMonitor | null>(null);

  // 新規作成フォーム
  const [newClinicName, setNewClinicName] = useState("");
  const [newOwnerName, setNewOwnerName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPlanType, setNewPlanType] = useState<string>("monthly");
  const [newApps, setNewApps] = useState<string[]>([]);
  const [createResult, setCreateResult] = useState<{ password: string; checkoutUrl: string | null; monthlyAmount: number; warnings: string[] } | null>(null);

  const showToast = (message: string, type: "success" | "error" = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const fetchAccounts = useCallback(async (pw: string) => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin", { headers: { "x-admin-password": pw } });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setAccounts(data.accounts);
      setAuthenticated(true);
      fetchMeoMonitors(pw);
    } catch (err) {
      setError(err instanceof Error ? err.message : "エラーが発生しました");
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchMeoMonitors = useCallback(async (pw: string) => {
    setMeoLoading(true);
    try {
      const res = await fetch("/api/admin-meo", { headers: { "x-admin-password": pw } });
      const data = await res.json();
      if (res.ok) setMeoMonitors(data.monitors || []);
    } catch { /* ignore */ }
    finally { setMeoLoading(false); }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    fetchAccounts(password);
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const pw = params.get("password");
    if (pw) {
      setPassword(pw);
      fetchAccounts(pw);
    }
  }, [fetchAccounts]);

  // アカウント更新
  const updateAccount = async (id: string, updates: Record<string, unknown>) => {
    setActionLoading(true);
    try {
      const res = await fetch("/api/admin", {
        method: "PATCH",
        headers: { "Content-Type": "application/json", "x-admin-password": password },
        body: JSON.stringify({ id, ...updates }),
      });
      const data = await res.json();

      // 早期解約金の確認が返ってきた場合
      if (data.early_cancellation) {
        const confirmed = confirm(
          `${data.message}\n\n早期解約金 ¥${data.fee.toLocaleString()} をStripe請求書で送信します。\n解約を続行しますか？`
        );
        if (confirmed) {
          // force_cancel=trueで再送信
          const res2 = await fetch("/api/admin", {
            method: "PATCH",
            headers: { "Content-Type": "application/json", "x-admin-password": password },
            body: JSON.stringify({ id, ...updates, force_cancel: true }),
          });
          const data2 = await res2.json();
          if (!res2.ok) throw new Error(data2.error);
          showToast(`解約完了 - 早期解約金 ¥${data.fee.toLocaleString()} を請求しました`);
          setAccounts((prev) => prev.map((a) => (a.id === id ? data2.account : a)));
          setSelectedAccount(data2.account);
        } else {
          showToast("解約をキャンセルしました", "error");
        }
        return;
      }

      if (!res.ok) throw new Error(data.error);
      showToast("更新しました");
      setAccounts((prev) => prev.map((a) => (a.id === id ? data.account : a)));
      setSelectedAccount(data.account);
    } catch (err) {
      showToast(err instanceof Error ? err.message : "更新に失敗しました", "error");
    } finally {
      setActionLoading(false);
    }
  };

  // アカウント作成
  const createAccount = async () => {
    if (!newClinicName || !newEmail || newApps.length === 0) {
      showToast("院名、メール、アプリを選択してください", "error");
      return;
    }
    setActionLoading(true);
    try {
      const res = await fetch("/api/admin", {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-admin-password": password },
        body: JSON.stringify({
          clinic_name: newClinicName,
          owner_name: newOwnerName,
          phone: newPhone,
          email: newEmail,
          plan_type: newPlanType,
          selected_apps: newApps,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setCreateResult({ password: data.temp_password, checkoutUrl: data.checkout_url, monthlyAmount: data.monthly_amount, warnings: data.warnings || [] });
      showToast("アカウント作成完了");
      setAccounts((prev) => [data.account, ...prev]);
      setNewClinicName("");
      setNewOwnerName("");
      setNewPhone("");
      setNewEmail("");
      setNewApps([]);
    } catch (err) {
      showToast(err instanceof Error ? err.message : "作成に失敗しました", "error");
    } finally {
      setActionLoading(false);
    }
  };

  // 集計
  const summary = useMemo(() => {
    const active = accounts.filter((a) => a.status === "active");
    const mrr = active.reduce((sum, a) => sum + getMonthlyAmount(a), 0);

    const appCounts: Record<string, { active: number; total: number }> = {};
    APP_LIST.forEach((app) => {
      appCounts[app] = {
        active: active.filter((a) => a.selected_apps?.includes(app)).length,
        total: accounts.filter((a) => a.selected_apps?.includes(app)).length,
      };
    });

    const monthlyRevByApp: Record<string, number> = {};
    APP_LIST.forEach((app) => {
      monthlyRevByApp[app] = active
        .filter((a) => a.selected_apps?.includes(app))
        .reduce((sum, a) => {
          const perApp = getMonthlyAmount(a) / (a.selected_apps?.length || 1);
          return sum + Math.floor(perApp);
        }, 0);
    });

    return {
      total: accounts.length,
      active: active.length,
      cancelled: accounts.filter((a) => a.status === "cancelled").length,
      paymentFailed: accounts.filter((a) => a.status === "payment_failed").length,
      mrr,
      appCounts,
      monthlyRevByApp,
    };
  }, [accounts]);

  // 検索・フィルター
  const filteredAccounts = useMemo(() => {
    return accounts.filter((a) => {
      if (statusFilter !== "all" && a.status !== statusFilter) return false;
      if (appFilter !== "all" && !a.selected_apps?.includes(appFilter)) return false;
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        return (
          a.clinic_name.toLowerCase().includes(q) ||
          a.email.toLowerCase().includes(q) ||
          a.clinic_id.toLowerCase().includes(q) ||
          (a.owner_name || "").toLowerCase().includes(q) ||
          (a.phone || "").includes(q)
        );
      }
      return true;
    });
  }, [accounts, statusFilter, appFilter, searchQuery]);

  // ログイン画面
  if (!authenticated) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="bg-gray-900 rounded-2xl shadow-2xl p-8 max-w-sm w-full border border-gray-800">
          <h1 className="text-xl font-black text-white mb-2 text-center">ClinicApps</h1>
          <p className="text-gray-500 text-sm text-center mb-6">統合管理ダッシュボード</p>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-sm text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
              placeholder="管理パスワード"
            />
            {error && <div className="bg-red-900/50 text-red-400 text-sm p-3 rounded-lg">{error}</div>}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-500 transition disabled:opacity-50"
            >
              {loading ? "読み込み中..." : "ログイン"}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* トースト */}
      {toast && (
        <div className={`fixed top-4 right-4 z-50 px-5 py-3 rounded-xl shadow-lg text-sm font-bold ${
          toast.type === "success" ? "bg-green-600 text-white" : "bg-red-600 text-white"
        }`}>
          {toast.message}
        </div>
      )}

      {/* ヘッダー */}
      <header className="bg-gray-900 border-b border-gray-800 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-lg font-black">ClinicApps 統合管理</h1>
            <p className="text-xs text-gray-500">{accounts.length}件の顧客を管理中</p>
          </div>
          <button
            onClick={() => fetchAccounts(password)}
            className="text-sm bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-lg font-bold transition border border-gray-700"
          >
            データ更新
          </button>
        </div>
      </header>

      {/* タブ */}
      <nav className="bg-gray-900 border-b border-gray-800 px-6">
        <div className="max-w-7xl mx-auto flex gap-1">
          {([
            { key: "dashboard", label: "ダッシュボード" },
            { key: "apps", label: "アプリ別" },
            { key: "accounts", label: "アカウント管理" },
            { key: "create", label: "新規作成" },
            { key: "meo", label: "MEOモニター" },
          ] as { key: Tab; label: string }[]).map((tab) => (
            <button
              key={tab.key}
              onClick={() => { setActiveTab(tab.key); setSelectedAccount(null); }}
              className={`px-5 py-3 text-sm font-bold transition border-b-2 ${
                activeTab === tab.key
                  ? "border-blue-500 text-blue-400"
                  : "border-transparent text-gray-500 hover:text-gray-300"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* ダッシュボード */}
        {activeTab === "dashboard" && (
          <div className="space-y-8">
            {/* KPIカード */}
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
              <KpiCard label="月間売上 (MRR)" value={`¥${summary.mrr.toLocaleString()}`} color="text-blue-400" large />
              <KpiCard label="アクティブ契約" value={summary.active} color="text-green-400" />
              <KpiCard label="総顧客数" value={summary.total} />
              <KpiCard label="解約数" value={summary.cancelled} color="text-gray-400" />
              <KpiCard label="支払い失敗" value={summary.paymentFailed} color="text-red-400" />
            </div>

            {/* アプリ別契約数 */}
            <div className="bg-gray-900 rounded-2xl border border-gray-800 p-6">
              <h2 className="text-base font-black mb-5">アプリ別 契約状況</h2>
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                {APP_LIST.map((app) => {
                  const counts = summary.appCounts[app];
                  const rev = summary.monthlyRevByApp[app];
                  return (
                    <div key={app} className="bg-gray-800 rounded-xl p-4 border border-gray-700">
                      <div className="flex items-center gap-3 mb-3">
                        <div className={`w-3 h-3 rounded-full ${APP_COLORS[app]}`} />
                        <span className="font-bold text-sm">{APP_LABELS[app]}</span>
                      </div>
                      <div className="flex items-end justify-between">
                        <div>
                          <div className="text-2xl font-black text-white">{counts.active}</div>
                          <div className="text-xs text-gray-500">契約中 / {counts.total}件</div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-bold text-blue-400">¥{rev.toLocaleString()}</div>
                          <div className="text-xs text-gray-500">月額売上</div>
                        </div>
                      </div>
                      {/* バー */}
                      <div className="mt-3 w-full bg-gray-700 rounded-full h-1.5">
                        <div
                          className={`h-1.5 rounded-full ${APP_COLORS[app]}`}
                          style={{ width: `${summary.total > 0 ? (counts.active / Math.max(summary.active, 1)) * 100 : 0}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* MEOモニター概要 */}
            {meoMonitors.length > 0 && (
              <div className="bg-gray-900 rounded-2xl border border-gray-800 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-base font-black">MEOモニター概要</h2>
                  <button
                    onClick={() => { setActiveTab("meo"); setSelectedMonitor(null); }}
                    className="text-xs text-blue-400 hover:text-blue-300"
                  >
                    詳細を見る →
                  </button>
                </div>
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div className="bg-gray-800 rounded-xl p-3 border border-gray-700 text-center">
                    <div className="text-2xl font-black text-rose-400">{meoMonitors.length}</div>
                    <div className="text-xs text-gray-500">モニター数</div>
                  </div>
                  <div className="bg-gray-800 rounded-xl p-3 border border-gray-700 text-center">
                    <div className="text-2xl font-black text-green-400">
                      {meoMonitors.reduce((sum, m) => sum + m.rankings.filter((r) => r.previous !== null && r.latest !== null && r.latest < r.previous).length, 0)}
                    </div>
                    <div className="text-xs text-gray-500">順位UP</div>
                  </div>
                  <div className="bg-gray-800 rounded-xl p-3 border border-gray-700 text-center">
                    <div className="text-2xl font-black text-gray-400">
                      {meoMonitors.filter((m) => {
                        if (!m.last_sign_in) return true;
                        const diff = Date.now() - new Date(m.last_sign_in).getTime();
                        return diff > 7 * 24 * 60 * 60 * 1000;
                      }).length}
                    </div>
                    <div className="text-xs text-gray-500">7日以上未ログイン</div>
                  </div>
                </div>
              </div>
            )}

            {/* 最近の登録 */}
            <div className="bg-gray-900 rounded-2xl border border-gray-800 p-6">
              <h2 className="text-base font-black mb-4">最近の登録</h2>
              <div className="space-y-3">
                {accounts.slice(0, 5).map((a) => (
                  <div key={a.id} className="flex items-center justify-between bg-gray-800 rounded-xl px-4 py-3 border border-gray-700">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gray-700 rounded-lg flex items-center justify-center text-xs font-bold">
                        {a.clinic_name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-bold text-sm">{a.clinic_name}</div>
                        <div className="text-xs text-gray-500">
                          {a.owner_name && <span className="text-gray-400">{a.owner_name} / </span>}
                          {a.email}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex gap-1">
                        {(a.selected_apps || []).map((app) => (
                          <div key={app} className={`w-2 h-2 rounded-full ${APP_COLORS[app] || "bg-gray-600"}`} title={APP_LABELS[app]} />
                        ))}
                      </div>
                      <StatusBadge status={a.status} />
                      <span className="text-xs text-gray-500">{new Date(a.created_at).toLocaleDateString("ja-JP")}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* アプリ別タブ */}
        {activeTab === "apps" && (
          <div className="space-y-6">
            {APP_LIST.map((app) => {
              const appAccounts = accounts.filter((a) => a.selected_apps?.includes(app));
              const activeAccounts = appAccounts.filter((a) => a.status === "active");
              return (
                <div key={app} className="bg-gray-900 rounded-2xl border border-gray-800 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-4 h-4 rounded-full ${APP_COLORS[app]}`} />
                      <h2 className="text-base font-black">{APP_LABELS[app]}</h2>
                      <span className="text-sm text-gray-500">月額 ¥{APP_MONTHLY_PRICES[app].toLocaleString()}</span>
                    </div>
                    <div className="flex items-center gap-4 text-sm">
                      <span className="text-green-400 font-bold">{activeAccounts.length}件 契約中</span>
                      <span className="text-gray-500">{appAccounts.length}件 合計</span>
                    </div>
                  </div>
                  {appAccounts.length === 0 ? (
                    <p className="text-gray-600 text-sm">まだ契約がありません</p>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="text-gray-500 text-xs border-b border-gray-800">
                            <th className="text-left pb-2 font-bold">院名</th>
                            <th className="text-left pb-2 font-bold">メール</th>
                            <th className="text-left pb-2 font-bold">プラン</th>
                            <th className="text-left pb-2 font-bold">ステータス</th>
                            <th className="text-right pb-2 font-bold">月額</th>
                            <th className="text-left pb-2 font-bold">登録日</th>
                          </tr>
                        </thead>
                        <tbody>
                          {appAccounts.map((a) => (
                            <tr
                              key={a.id}
                              className="border-b border-gray-800/50 hover:bg-gray-800/50 cursor-pointer"
                              onClick={() => { setSelectedAccount(a); setActiveTab("accounts"); }}
                            >
                              <td className="py-2.5">
                                <div className="font-bold">{a.clinic_name}</div>
                                {a.owner_name && <div className="text-xs text-gray-500">{a.owner_name}</div>}
                              </td>
                              <td className="py-2.5 text-gray-400">{a.email}</td>
                              <td className="py-2.5"><span className="bg-gray-800 text-xs px-2 py-0.5 rounded">{PLAN_LABELS[a.plan_type]}</span></td>
                              <td className="py-2.5"><StatusBadge status={a.status} /></td>
                              <td className="py-2.5 text-right font-bold">{a.plan_type === "onetime" ? "-" : `¥${getMonthlyAmount(a).toLocaleString()}`}</td>
                              <td className="py-2.5 text-gray-500 text-xs">{new Date(a.created_at).toLocaleDateString("ja-JP")}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* アカウント管理 */}
        {activeTab === "accounts" && (
          <div className="space-y-6">
            {/* 検索・フィルター */}
            <div className="flex flex-wrap gap-4">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="院名・メール・IDで検索"
                className="flex-1 min-w-[200px] px-4 py-2.5 bg-gray-900 border border-gray-700 rounded-lg text-sm focus:border-blue-500 outline-none"
              />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2.5 bg-gray-900 border border-gray-700 rounded-lg text-sm"
              >
                <option value="all">全ステータス</option>
                <option value="active">利用中</option>
                <option value="pending_payment">決済待ち</option>
                <option value="cancelled">解約済み</option>
                <option value="payment_failed">支払い失敗</option>
              </select>
              <select
                value={appFilter}
                onChange={(e) => setAppFilter(e.target.value)}
                className="px-3 py-2.5 bg-gray-900 border border-gray-700 rounded-lg text-sm"
              >
                <option value="all">全アプリ</option>
                {APP_LIST.map((app) => (
                  <option key={app} value={app}>{APP_LABELS[app]}</option>
                ))}
              </select>
              <span className="flex items-center text-sm text-gray-500">{filteredAccounts.length}件</span>
            </div>

            <div className="flex gap-6">
              {/* アカウント一覧 */}
              <div className={`${selectedAccount ? "w-1/2" : "w-full"} bg-gray-900 rounded-2xl border border-gray-800 overflow-hidden`}>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-gray-800/50 text-gray-500 text-xs">
                        <th className="text-left px-4 py-3 font-bold">院名</th>
                        <th className="text-left px-4 py-3 font-bold">アプリ</th>
                        <th className="text-left px-4 py-3 font-bold">ステータス</th>
                        <th className="text-right px-4 py-3 font-bold">月額</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredAccounts.length === 0 ? (
                        <tr><td colSpan={4} className="text-center py-12 text-gray-600">データなし</td></tr>
                      ) : (
                        filteredAccounts.map((a) => (
                          <tr
                            key={a.id}
                            onClick={() => setSelectedAccount(a)}
                            className={`border-b border-gray-800/50 cursor-pointer transition ${
                              selectedAccount?.id === a.id ? "bg-blue-900/20" : "hover:bg-gray-800/50"
                            }`}
                          >
                            <td className="px-4 py-3">
                              <div className="font-bold">{a.clinic_name}</div>
                              <div className="text-xs text-gray-500">
                                {a.owner_name && <span className="text-gray-400">{a.owner_name} / </span>}
                                {a.email}
                              </div>
                            </td>
                            <td className="px-4 py-3">
                              <div className="flex gap-1">
                                {(a.selected_apps || []).map((app) => (
                                  <div key={app} className={`w-2.5 h-2.5 rounded-full ${APP_COLORS[app] || "bg-gray-600"}`} title={APP_LABELS[app]} />
                                ))}
                              </div>
                            </td>
                            <td className="px-4 py-3"><StatusBadge status={a.status} /></td>
                            <td className="px-4 py-3 text-right font-bold">
                              {a.plan_type === "onetime" ? "-" : `¥${getMonthlyAmount(a).toLocaleString()}`}
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* アカウント詳細パネル */}
              {selectedAccount && (
                <div className="w-1/2 bg-gray-900 rounded-2xl border border-gray-800 p-6 space-y-5">
                  <div className="flex items-center justify-between">
                    <h3 className="font-black text-lg">{selectedAccount.clinic_name}</h3>
                    <button onClick={() => setSelectedAccount(null)} className="text-gray-500 hover:text-white text-sm">
                      閉じる
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="text-xs text-gray-500 mb-1">代表者名</div>
                      <div className="font-bold">{selectedAccount.owner_name || "未登録"}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 mb-1">電話番号</div>
                      <div>{selectedAccount.phone || "未登録"}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 mb-1">Clinic ID</div>
                      <div className="font-mono text-xs bg-gray-800 px-2 py-1 rounded">{selectedAccount.clinic_id}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 mb-1">メール</div>
                      <div>{selectedAccount.email}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 mb-1">プラン</div>
                      <div>{PLAN_LABELS[selectedAccount.plan_type]}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 mb-1">月額</div>
                      <div className="font-bold text-blue-400">
                        {selectedAccount.plan_type === "onetime" ? "買い切り" : `¥${getMonthlyAmount(selectedAccount).toLocaleString()}`}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 mb-1">登録日</div>
                      <div>{new Date(selectedAccount.created_at).toLocaleDateString("ja-JP")}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 mb-1">ステータス</div>
                      <StatusBadge status={selectedAccount.status} />
                    </div>
                  </div>

                  {/* 契約期間 */}
                  {selectedAccount.plan_type === "monthly" && selectedAccount.status === "active" && (() => {
                    const start = new Date(selectedAccount.created_at);
                    const now = new Date();
                    const months = (now.getFullYear() - start.getFullYear()) * 12 + (now.getMonth() - start.getMonth());
                    const remaining = Math.max(0, 6 - months);
                    return (
                      <div className={`rounded-xl p-3 border ${remaining > 0 ? "bg-amber-900/20 border-amber-700/50" : "bg-green-900/20 border-green-700/50"}`}>
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-gray-400">契約経過</span>
                          <span className="font-bold">{months}ヶ月目</span>
                        </div>
                        <div className="flex justify-between items-center text-sm mt-1">
                          <span className="text-gray-400">最低契約期間</span>
                          {remaining > 0 ? (
                            <span className="text-amber-400 font-bold">残り{remaining}ヶ月（早期解約金あり）</span>
                          ) : (
                            <span className="text-green-400 font-bold">達成済み</span>
                          )}
                        </div>
                      </div>
                    );
                  })()}

                  {/* 利用アプリ */}
                  <div>
                    <div className="text-xs text-gray-500 mb-2">利用中のアプリ</div>
                    <div className="flex flex-wrap gap-2">
                      {(selectedAccount.selected_apps || []).map((app) => (
                        <span key={app} className={`text-xs px-3 py-1 rounded-full text-white ${APP_COLORS[app]}`}>
                          {APP_LABELS[app]}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Stripe情報 */}
                  {selectedAccount.stripe_customer_id ? (
                    <div>
                      <div className="text-xs text-gray-500 mb-1">Stripe Customer</div>
                      <div className="font-mono text-xs text-gray-400">{selectedAccount.stripe_customer_id}</div>
                    </div>
                  ) : null}

                  {/* 仮パスワード */}
                  {(() => {
                    const meta = selectedAccount.metadata as Record<string, unknown> | null;
                    const pw = meta?.temp_password;
                    if (!pw) return null;
                    return (
                      <div className="bg-yellow-900/30 border border-yellow-700/50 rounded-xl p-3">
                        <div className="text-xs text-yellow-500 mb-1">仮パスワード（初回ログイン用）</div>
                        <div className="font-mono text-sm text-yellow-400">{String(pw)}</div>
                      </div>
                    );
                  })()}

                  {/* アクション */}
                  <div className="pt-3 border-t border-gray-800 space-y-3">
                    <h4 className="text-xs text-gray-500 font-bold">アクション</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedAccount.status === "active" && (
                        <button
                          onClick={() => updateAccount(selectedAccount.id, { status: "suspended" })}
                          disabled={actionLoading}
                          className="px-4 py-2 bg-yellow-600 hover:bg-yellow-500 text-white rounded-lg text-xs font-bold transition disabled:opacity-50"
                        >
                          利用停止
                        </button>
                      )}
                      {(selectedAccount.status === "suspended" || selectedAccount.status === "payment_failed") && (
                        <button
                          onClick={() => updateAccount(selectedAccount.id, { status: "active" })}
                          disabled={actionLoading}
                          className="px-4 py-2 bg-green-600 hover:bg-green-500 text-white rounded-lg text-xs font-bold transition disabled:opacity-50"
                        >
                          利用再開
                        </button>
                      )}
                      {selectedAccount.status !== "cancelled" && (
                        <button
                          onClick={() => updateAccount(selectedAccount.id, { status: "cancelled" })}
                          disabled={actionLoading}
                          className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white rounded-lg text-xs font-bold transition disabled:opacity-50"
                        >
                          解約処理
                        </button>
                      )}
                      {selectedAccount.status === "cancelled" && (
                        <div className="text-xs text-gray-500 py-2">
                          解約済み - 再登録不可
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* 新規作成 */}
        {activeTab === "create" && (
          <div className="max-w-xl mx-auto">
            <div className="bg-gray-900 rounded-2xl border border-gray-800 p-6 space-y-5">
              <h2 className="text-lg font-black">新規アカウント作成</h2>
              <p className="text-sm text-gray-500">手動でアカウントを発行します。仮パスワードが自動生成されます。</p>

              <div>
                <label className="text-xs font-bold text-gray-400 block mb-1.5">院名 *</label>
                <input
                  type="text"
                  value={newClinicName}
                  onChange={(e) => setNewClinicName(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-sm focus:border-blue-500 outline-none"
                  placeholder="院名を入力"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-gray-400 block mb-1.5">代表者名</label>
                <input
                  type="text"
                  value={newOwnerName}
                  onChange={(e) => setNewOwnerName(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-sm focus:border-blue-500 outline-none"
                  placeholder="代表者名を入力"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-gray-400 block mb-1.5">電話番号</label>
                <input
                  type="tel"
                  value={newPhone}
                  onChange={(e) => setNewPhone(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-sm focus:border-blue-500 outline-none"
                  placeholder="06-1234-5678"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-gray-400 block mb-1.5">メールアドレス *</label>
                <input
                  type="email"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-sm focus:border-blue-500 outline-none"
                  placeholder="example@clinic.com"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-gray-400 block mb-1.5">プランタイプ</label>
                <div className="flex gap-2">
                  {Object.entries(PLAN_LABELS).map(([key, label]) => (
                    <button
                      key={key}
                      onClick={() => setNewPlanType(key)}
                      className={`px-4 py-2 rounded-lg text-sm font-bold transition ${
                        newPlanType === key ? "bg-blue-600 text-white" : "bg-gray-800 text-gray-400 border border-gray-700"
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-gray-400 block mb-2">利用アプリ *</label>
                <div className="grid grid-cols-2 gap-2">
                  {APP_LIST.map((app) => {
                    const selected = newApps.includes(app);
                    return (
                      <button
                        key={app}
                        onClick={() => setNewApps((prev) => selected ? prev.filter((a) => a !== app) : [...prev, app])}
                        className={`flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-bold transition ${
                          selected
                            ? "bg-blue-600/20 border-2 border-blue-500 text-blue-400"
                            : "bg-gray-800 border-2 border-gray-700 text-gray-400"
                        }`}
                      >
                        <div className={`w-3 h-3 rounded-full ${APP_COLORS[app]}`} />
                        {APP_LABELS[app]}
                        {selected && <span className="ml-auto text-blue-400">&#10003;</span>}
                      </button>
                    );
                  })}
                </div>
                <button
                  onClick={() => setNewApps(newApps.length === APP_LIST.length ? [] : [...APP_LIST])}
                  className="mt-2 text-xs text-gray-500 hover:text-gray-300"
                >
                  {newApps.length === APP_LIST.length ? "全解除" : "全選択"}
                </button>
              </div>

              {/* 料金プレビュー */}
              {newApps.length > 0 && (
                <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
                  <div className="text-xs text-gray-500 mb-2">料金プレビュー</div>
                  <div className="space-y-1 text-sm">
                    {newApps.map((app) => (
                      <div key={app} className="flex justify-between">
                        <span className="text-gray-400">{APP_LABELS[app]}</span>
                        <span>¥{APP_MONTHLY_PRICES[app].toLocaleString()}</span>
                      </div>
                    ))}
                    {newApps.length >= 2 && (
                      <div className="flex justify-between text-green-400 text-xs pt-1">
                        <span>セット割引</span>
                        <span>-{newApps.length >= 5 ? "20" : newApps.length >= 3 ? "10" : "5"}%</span>
                      </div>
                    )}
                    <div className="flex justify-between font-black text-blue-400 border-t border-gray-700 pt-2 mt-2">
                      <span>月額合計</span>
                      <span>¥{(() => {
                        const sub = newApps.reduce((s, a) => s + (APP_MONTHLY_PRICES[a] || 0), 0);
                        let d = 0;
                        if (newApps.length >= 5) d = 0.2;
                        else if (newApps.length >= 3) d = 0.1;
                        else if (newApps.length >= 2) d = 0.05;
                        return Math.floor(sub * (1 - d)).toLocaleString();
                      })()}</span>
                    </div>
                  </div>
                </div>
              )}

              <button
                onClick={createAccount}
                disabled={actionLoading || !newClinicName || !newEmail || newApps.length === 0}
                className="w-full py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-500 transition disabled:opacity-50"
              >
                {actionLoading ? "作成中..." : "アカウントを作成"}
              </button>

              {/* 作成結果 */}
              {createResult && (
                <div className="bg-green-900/30 border border-green-700/50 rounded-xl p-4 space-y-4">
                  <h4 className="text-sm font-bold text-green-400">アカウント作成完了</h4>

                  {/* 決済リンク */}
                  {createResult.checkoutUrl && (
                    <div className="bg-blue-900/30 border border-blue-700/50 rounded-xl p-4 space-y-2">
                      <div className="text-xs font-bold text-blue-400">決済リンク（お客様に送信してください）</div>
                      <div className="bg-gray-800 px-3 py-2 rounded-lg">
                        <a href={createResult.checkoutUrl} target="_blank" rel="noopener noreferrer" className="text-blue-400 text-sm break-all hover:underline">
                          {createResult.checkoutUrl}
                        </a>
                      </div>
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(createResult.checkoutUrl!);
                          showToast("リンクをコピーしました");
                        }}
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-bold transition"
                      >
                        リンクをコピー
                      </button>
                      <p className="text-xs text-gray-500">
                        月額 ¥{createResult.monthlyAmount.toLocaleString()} / お客様が決済完了するとアプリが自動的に有効になります
                      </p>
                    </div>
                  )}

                  {/* ログイン情報 */}
                  <div>
                    <div className="text-xs text-gray-400 mb-1">仮パスワード（決済完了後にお伝えください）</div>
                    <div className="font-mono text-lg text-green-400 bg-gray-800 px-3 py-2 rounded-lg select-all">
                      {createResult.password}
                    </div>
                  </div>
                  <p className="text-xs text-gray-500">
                    {createResult.checkoutUrl
                      ? "お客様が決済を完了すると、各アプリにこのメール+パスワードでログインできるようになります。"
                      : "各アプリ（検査シート・顧客管理等）にこのメールアドレスとパスワードでログインできます。"}
                  </p>

                  {createResult.warnings.length > 0 && (
                    <div className="bg-yellow-900/30 border border-yellow-700/50 rounded-lg p-3">
                      <div className="text-xs text-yellow-500 font-bold mb-1">注意</div>
                      {createResult.warnings.map((w, i) => (
                        <div key={i} className="text-xs text-yellow-400">{w}</div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
        {/* MEOモニター */}
        {activeTab === "meo" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-black">MEOモニター管理</h2>
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-500">{meoMonitors.length}名のモニター</span>
                <button
                  onClick={() => fetchMeoMonitors(password)}
                  className="text-sm bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-lg font-bold transition border border-gray-700"
                >
                  {meoLoading ? "読み込み中..." : "データ更新"}
                </button>
              </div>
            </div>

            {meoLoading ? (
              <div className="text-center py-12 text-gray-500">読み込み中...</div>
            ) : (
              <div className="flex gap-6">
                {/* モニター一覧 */}
                <div className={`${selectedMonitor ? "w-1/2" : "w-full"} bg-gray-900 rounded-2xl border border-gray-800 overflow-hidden`}>
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-gray-800/50 text-gray-500 text-xs">
                        <th className="text-left px-4 py-3 font-bold">院名 / メール</th>
                        <th className="text-left px-4 py-3 font-bold">エリア</th>
                        <th className="text-center px-4 py-3 font-bold">KW数</th>
                        <th className="text-center px-4 py-3 font-bold">順位変動</th>
                        <th className="text-left px-4 py-3 font-bold">最終ログイン</th>
                      </tr>
                    </thead>
                    <tbody>
                      {meoMonitors.length === 0 ? (
                        <tr><td colSpan={5} className="text-center py-12 text-gray-600">モニターなし</td></tr>
                      ) : (
                        meoMonitors.map((m) => {
                          const clinicName = m.clinics[0]?.name || m.clinic_name_account || "未設定";
                          const area = m.clinics[0]?.area || "-";
                          const kwCount = m.rankings.length;
                          const improved = m.rankings.filter((r) => r.previous !== null && r.latest !== null && r.latest < r.previous).length;
                          const declined = m.rankings.filter((r) => r.previous !== null && r.latest !== null && r.latest > r.previous).length;
                          return (
                            <tr
                              key={m.user_id}
                              onClick={() => setSelectedMonitor(m)}
                              className={`border-b border-gray-800/50 cursor-pointer transition ${
                                selectedMonitor?.user_id === m.user_id ? "bg-rose-900/20" : "hover:bg-gray-800/50"
                              }`}
                            >
                              <td className="px-4 py-3">
                                <div className="font-bold">{clinicName}</div>
                                <div className="text-xs text-gray-500">{m.email}</div>
                              </td>
                              <td className="px-4 py-3 text-gray-400">{area}</td>
                              <td className="px-4 py-3 text-center">{kwCount}</td>
                              <td className="px-4 py-3 text-center">
                                {kwCount > 0 ? (
                                  <div className="flex items-center justify-center gap-2">
                                    {improved > 0 && <span className="text-green-400 text-xs font-bold">{improved}UP</span>}
                                    {declined > 0 && <span className="text-red-400 text-xs font-bold">{declined}DOWN</span>}
                                    {improved === 0 && declined === 0 && <span className="text-gray-500 text-xs">変動なし</span>}
                                  </div>
                                ) : (
                                  <span className="text-gray-600 text-xs">未計測</span>
                                )}
                              </td>
                              <td className="px-4 py-3 text-xs text-gray-500">
                                {m.last_sign_in
                                  ? new Date(m.last_sign_in).toLocaleDateString("ja-JP", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })
                                  : "未ログイン"}
                              </td>
                            </tr>
                          );
                        })
                      )}
                    </tbody>
                  </table>
                </div>

                {/* 詳細パネル */}
                {selectedMonitor && (
                  <div className="w-1/2 bg-gray-900 rounded-2xl border border-gray-800 p-6 space-y-5">
                    <div className="flex items-center justify-between">
                      <h3 className="font-black text-lg">
                        {selectedMonitor.clinics[0]?.name || selectedMonitor.clinic_name_account || "未設定"}
                      </h3>
                      <button onClick={() => setSelectedMonitor(null)} className="text-gray-500 hover:text-white text-sm">閉じる</button>
                    </div>

                    {/* 基本情報 */}
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <div className="text-xs text-gray-500 mb-1">メール</div>
                        <div>{selectedMonitor.email}</div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-500 mb-1">エリア</div>
                        <div>{selectedMonitor.clinics[0]?.area || "-"}</div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-500 mb-1">カテゴリ</div>
                        <div>{selectedMonitor.clinics[0]?.category || "-"}</div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-500 mb-1">登録日</div>
                        <div>{new Date(selectedMonitor.created_at).toLocaleDateString("ja-JP")}</div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-500 mb-1">最終ログイン</div>
                        <div className={selectedMonitor.last_sign_in ? "" : "text-red-400"}>
                          {selectedMonitor.last_sign_in
                            ? new Date(selectedMonitor.last_sign_in).toLocaleString("ja-JP")
                            : "未ログイン"}
                        </div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-500 mb-1">契約ステータス</div>
                        <div>
                          {selectedMonitor.account_status
                            ? <StatusBadge status={selectedMonitor.account_status} />
                            : <span className="text-xs text-yellow-400 bg-yellow-900/30 px-2 py-0.5 rounded-full">モニター</span>}
                        </div>
                      </div>
                    </div>

                    {/* キーワード順位一覧 */}
                    <div>
                      <div className="text-xs text-gray-500 font-bold mb-3">キーワード順位</div>
                      {selectedMonitor.rankings.length === 0 ? (
                        <p className="text-sm text-gray-600">まだ順位チェックされていません</p>
                      ) : (
                        <div className="space-y-2">
                          {selectedMonitor.rankings.map((r) => {
                            const change = r.previous !== null && r.latest !== null ? r.previous - r.latest : null;
                            return (
                              <div key={r.keyword} className="bg-gray-800 rounded-xl px-4 py-3 border border-gray-700">
                                <div className="flex items-center justify-between">
                                  <div className="font-bold text-sm">{r.keyword}</div>
                                  <div className="flex items-center gap-3">
                                    <div className="text-right">
                                      <div className="text-2xl font-black">
                                        {r.latest !== null ? `${r.latest}位` : "圏外"}
                                      </div>
                                      {change !== null && change !== 0 && (
                                        <div className={`text-xs font-bold ${change > 0 ? "text-green-400" : "text-red-400"}`}>
                                          {change > 0 ? `${change}UP` : `${Math.abs(change)}DOWN`}
                                        </div>
                                      )}
                                      {change === 0 && <div className="text-xs text-gray-500">変動なし</div>}
                                      {change === null && r.latest !== null && <div className="text-xs text-gray-500">初回計測</div>}
                                    </div>
                                    <button
                                      onClick={async () => {
                                        try {
                                          await fetch("/api/admin-meo", {
                                            method: "POST",
                                            headers: { "Content-Type": "application/json", "x-admin-password": password },
                                            body: JSON.stringify({
                                              user_id: selectedMonitor.user_id,
                                              keyword: r.keyword,
                                              rank: r.latest,
                                              previous_rank: r.previous,
                                              snapshot_data: {
                                                clinic_name: selectedMonitor.clinics[0]?.name || "",
                                                area: selectedMonitor.clinics[0]?.area || "",
                                                checked_at: r.latestDate,
                                              },
                                            }),
                                          });
                                          showToast("スナップショット保存しました");
                                        } catch {
                                          showToast("保存に失敗しました", "error");
                                        }
                                      }}
                                      className="text-xs bg-gray-700 hover:bg-gray-600 px-2 py-1 rounded transition"
                                      title="スナップショット保存"
                                    >
                                      保存
                                    </button>
                                  </div>
                                </div>
                                <div className="text-xs text-gray-500 mt-1">
                                  計測: {new Date(r.latestDate).toLocaleDateString("ja-JP")}
                                  {r.previousDate && ` / 前回: ${new Date(r.previousDate).toLocaleDateString("ja-JP")}`}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>

                    {/* 登録キーワード */}
                    {selectedMonitor.clinics[0]?.keywords?.length > 0 && (
                      <div>
                        <div className="text-xs text-gray-500 font-bold mb-2">登録キーワード</div>
                        <div className="flex flex-wrap gap-2">
                          {selectedMonitor.clinics[0].keywords.map((kw: string) => (
                            <span key={kw} className="text-xs bg-rose-900/30 text-rose-400 px-3 py-1 rounded-full border border-rose-700/30">
                              {kw}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        )}

      </main>
    </div>
  );
}

function KpiCard({ label, value, color = "text-white", large }: { label: string; value: string | number; color?: string; large?: boolean }) {
  return (
    <div className={`bg-gray-900 rounded-xl border border-gray-800 p-5 ${large ? "col-span-2 lg:col-span-1" : ""}`}>
      <p className="text-xs font-bold text-gray-500 mb-1">{label}</p>
      <p className={`${large ? "text-3xl" : "text-2xl"} font-black ${color}`}>{value}</p>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const style = STATUS_STYLES[status] || { bg: "bg-gray-800", text: "text-gray-400", label: status };
  return (
    <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${style.bg} ${style.text}`}>
      {style.label}
    </span>
  );
}
