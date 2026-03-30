"use client";

import { useState, useMemo } from "react";

// ========== データ定義 ==========

const APPS = [
  {
    id: "kensa",
    name: "検査シート作成システム",
    shortName: "検査シート",
    categories: ["検査＆診断"],
    description: "5段階の検査ウィザードで原因部位を自動特定。患者用・施術者用PDF出力、経過比較、セルフケア自動提案まで。",
    features: ["5段階検査ウィザード", "原因部位を自動特定", "患者用・施術者用PDF出力", "セルフケア自動提案"],
    monthlyPrice: 3980,
    initialCost: 0,
    maintenancePrice: 1190,
    badge: "看板商品",
    demoUrl: "https://kensa-sheet-app.vercel.app",
    detailUrl: "/systems/kensa",
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15a2.25 2.25 0 012.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
      </svg>
    ),
  },
  {
    id: "customer",
    name: "顧客管理シート",
    shortName: "顧客管理",
    categories: ["開業", "集客", "内製化"],
    description: "患者情報を一元管理。来院履歴・離反アラート・データ分析ダッシュボード搭載。",
    features: ["患者情報を一元管理", "来院履歴・離反アラート", "データ分析ダッシュボード"],
    monthlyPrice: 4980,
    initialCost: 29800,
    maintenancePrice: 1490,
    badge: null,
    demoUrl: "",
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
    description: "カレンダー形式で直感操作。ダブルブッキング防止、LINE通知連携。",
    features: ["カレンダー形式で直感操作", "ダブルブッキング防止", "LINE通知連携"],
    monthlyPrice: 2980,
    initialCost: 19800,
    maintenancePrice: 890,
    badge: null,
    demoUrl: "",
    detailUrl: "/systems/reservation",
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
      </svg>
    ),
  },
  {
    id: "monshin",
    name: "WEB問診",
    shortName: "WEB問診",
    categories: ["開業"],
    description: "来院前にスマホで問診。自動集計・PDF出力。カスタム問診項目対応。",
    features: ["来院前にスマホで問診", "自動集計・PDF出力", "カスタム問診項目"],
    monthlyPrice: 2980,
    initialCost: 19800,
    maintenancePrice: 890,
    badge: null,
    demoUrl: "",
    detailUrl: "/systems/monshin",
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
      </svg>
    ),
  },
  {
    id: "meo",
    name: "MEO勝ち上げくん",
    shortName: "MEO対策",
    categories: ["集客", "内製化"],
    description: "Googleマップ順位を自動チェック。AI投稿文を自動生成。医療広告ガイドライン自動チェック。",
    features: ["Googleマップ順位を自動チェック", "AI投稿文を自動生成", "医療広告ガイドライン自動チェック"],
    monthlyPrice: 4980,
    initialCost: 29800,
    maintenancePrice: 1490,
    badge: "看板商品",
    demoUrl: "",
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
    monthlyPrice: 4980,
    initialCost: 0,
    maintenancePrice: 1490,
    badge: "NEW",
    demoUrl: "",
    detailUrl: "/systems/sleep",
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
      </svg>
    ),
  },
];

const CATEGORIES = ["すべて", "開業", "集客", "内製化", "検査＆診断"];

const COMING_SOON_APPS = [
  "LINE自動化ツール",
  "請求書作成システム",
  "LP作成ツール",
];

const SET_EXAMPLES = [
  {
    name: "開業パック",
    appIds: ["reservation", "monshin", "customer"],
    description: "これから開業する先生に必要な3点セット",
    setMonthly: 9800,
    setInitial: 49800,
    label: "10%OFF",
    note: null,
  },
  {
    name: "集客パック",
    appIds: ["meo", "customer", "monshin"],
    description: "新規集客を強化したい先生向け",
    setMonthly: 11640,
    setInitial: 49800,
    label: "10%OFF",
    note: null,
  },
  {
    name: "フルパック",
    appIds: ["kensa", "customer", "reservation", "monshin", "meo", "sleep"],
    description: "全6システムまとめて導入。圧倒的コスパ",
    setMonthly: 19800,
    setInitial: 0,
    label: "20%OFF",
    note: "全システムの初期費用が無料",
  },
];

const FAQS = [
  {
    q: "ITに詳しくなくても使えますか？",
    a: "はい、スマホがあれば操作できるシンプル設計です。導入時にZoomでサポートしますのでご安心ください。",
  },
  {
    q: "途中で解約できますか？",
    a: "はい、最低利用期間はありません。いつでも解約可能で、解約月の月末まで利用できます。",
  },
  {
    q: "データの移行はできますか？",
    a: "CSVインポートに対応しています。ExcelやGoogleスプレッドシートからの移行もサポートします。",
  },
  {
    q: "セキュリティは大丈夫？",
    a: "SSL暗号化通信、データベース暗号化、定期的なバックアップを実施しています。大手クラウドサービス上で安全に運用しています。",
  },
  {
    q: "オリジナルシステムの費用は？",
    a: "要件によって異なります。まずは無料ヒアリングで内容をお聞かせください。お見積もりをお出しします。",
  },
];

const TESTIMONIALS = [
  {
    name: "A整体院",
    role: "院長",
    text: "顧客管理と予約管理を導入。紙カルテから解放されて施術に集中できるようになった。受付の手間が本当に減りました。",
  },
  {
    name: "B鍼灸院",
    role: "院長",
    text: "MEO勝ち上げくんで順位が上がり、新規が月5人増えた。週10分の運用だけでこの結果は驚きです。",
  },
  {
    name: "C整骨院",
    role: "院長",
    text: "検査シートで患者への説明が格段にわかりやすくなった。リピート率が上がって、患者さんの満足度も高くなりました。",
  },
];


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

  const filteredApps = activeCategory === "すべて"
    ? APPS
    : APPS.filter(app => app.categories.includes(activeCategory));

  const calcTotal = useMemo(() => {
    const selected = APPS.filter(app => selectedApps.includes(app.id));
    const monthlySubtotal = selected.reduce((sum, app) => sum + app.monthlyPrice, 0);
    const initialSubtotal = selected.reduce((sum, app) => sum + app.initialCost, 0);
    const maintenanceSubtotal = selected.reduce((sum, app) => sum + app.maintenancePrice, 0);
    const monthlyTotal = monthlySubtotal;
    const yearlyTotal = monthlyTotal * 10; // 年払い = 月額 × 10（2ヶ月分お得）
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
          planName: `ClinicApps（${appNames}）${planSuffix}`,
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
            <span className="text-lg font-black tracking-tight text-primary">ClinicApps</span>
          </div>
          <div className="hidden md:flex items-center gap-6 text-sm text-gray-600">
            <a href="#apps" className="hover:text-primary transition">システム一覧</a>
            <a href="#pricing" className="hover:text-primary transition">料金</a>
            <a href="#custom-dev" className="hover:text-primary transition">オーダーメイド開発</a>
            <a href="#faq" className="hover:text-primary transition">FAQ</a>
          </div>
          <a
            href="#contact"
            className="bg-cta text-white px-5 py-2 rounded-full text-sm font-bold hover:bg-cta-600 hover:shadow-lg transition-all"
          >
            相談する
          </a>
        </div>
      </nav>

      {/* ===== ヒーロー ===== */}
      <section className="pt-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-accent-50 to-cta-50/30"></div>
        <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-accent-100/40 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-cta-100/30 rounded-full blur-3xl"></div>

        <div className="relative max-w-5xl mx-auto px-4 py-20 md:py-28">
          <div className="text-center">
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-black leading-tight mb-6 tracking-tight">
              <span className="text-primary">治療家が、治療家のために</span>
              <br />
              <span className="text-primary">作った</span>
              <span className="text-accent">業務システム。</span>
            </h1>

            <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto leading-relaxed mb-8">
              高くて使いこなせないシステムは、���ういらない。
              <br className="hidden md:block" />
              月額2,980円から、初期費用0円のプランも。全9システムを自由に組み合わせ。
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="#apps"
                className="inline-flex items-center justify-center gap-2 bg-accent text-white px-8 py-4 rounded-xl font-bold text-base hover:bg-accent-600 hover:shadow-lg hover:shadow-accent/20 transition-all"
              >
                システムを見る
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
              </a>
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 bg-white text-primary px-8 py-4 rounded-xl font-bold text-base border-2 border-primary/20 hover:border-primary/40 hover:shadow-md transition-all"
              >
                相談する
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
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              "カルテや顧客情報が紙やExcelでバラバラ",
              "予約管理が電話対応で手間がかかる",
              "MEO対策、何から始めればいいかわからない",
              "月2〜5万円のシステム、使いこなせていない",
              "ITに詳しくなくて導入が不安",
            ].map((text, i) => (
              <div key={i} className="flex items-start gap-3 bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
                <div className="flex-shrink-0 w-8 h-8 bg-cta/10 rounded-lg flex items-center justify-center mt-0.5">
                  <svg className="w-4 h-4 text-cta" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                  </svg>
                </div>
                <p className="text-sm text-gray-700 leading-relaxed">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 差別化セクション ===== */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-black text-center text-primary mb-10">
            現役治療家が、現場で作ったシステムです。
          </h2>
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
                大手ツールは月額2〜5万円。うちは月額1,980円から。治療院の経営を圧迫しない価格設計です。
              </p>
            </div>
          </div>
        </div>
      </section>

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
                  <th className="py-3 px-4 text-center font-black">ClinicApps</th>
                  <th className="py-3 px-4 text-center">大手A社</th>
                  <th className="py-3 px-4 text-center rounded-tr-lg">大手B社</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { label: "月額料金", ours: "1,980円〜", a: "22,000円〜", b: "33,000円〜" },
                  { label: "初期費用", ours: "19,800円〜", a: "110,000円〜", b: "55,000円〜" },
                  { label: "最低契約期間", ours: "なし", a: "1年", b: "2年" },
                  { label: "治療院特化", ours: "◎", a: "△", b: "×" },
                  { label: "カスタマイズ", ours: "◎", a: "×", b: "△" },
                  { label: "開発者", ours: "現役治療家", a: "IT企業", b: "IT企業" },
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
                  <span className="absolute -top-3 right-4 bg-cta text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
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
                      <p className="text-sm font-bold text-gray-600">{app.initialCost.toLocaleString()}円</p>
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
                  {app.demoUrl ? (
                    <a
                      href={app.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full text-center border-2 border-accent text-accent font-bold py-2.5 px-4 rounded-xl hover:bg-accent hover:text-white transition-all text-sm"
                    >
                      デモを体験する &rarr;
                    </a>
                  ) : (
                    <span className="block w-full text-center border-2 border-gray-200 text-gray-400 font-bold py-2.5 px-4 rounded-xl text-sm">
                      デモ準備中
                    </span>
                  )}
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

      {/* ===== 料金プラン ===== */}
      <section id="pricing" className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-black text-center text-primary mb-3">
            料金プラン
          </h2>
          <p className="text-center text-gray-500 text-sm mb-6">
            初期費用 + 月額制。最低契約期間なし。いつでも解約OK。大手の1/3以下の料金です。
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
                  2ヶ月分お得
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
                {APPS.map((app, i) => {
                  const yearlyPrice = app.monthlyPrice * 10;
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
                      <td className="py-3 px-4 text-center">{app.initialCost.toLocaleString()}円</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* セットで買うとお得 */}
          <div className="bg-accent/5 rounded-2xl border border-accent/20 p-6 md:p-8 mb-10">
            <h3 className="text-xl font-black text-primary text-center mb-2">セットで買うとお得</h3>
            <p className="text-center text-gray-500 text-sm mb-6">目的に合わせたパックで、月額も初期費用もお得になります。</p>
          </div>

          {/* セットパック */}
          <h3 className="text-xl font-black text-primary text-center mb-6">おすすめパック</h3>
          <div className="grid md:grid-cols-2 gap-5 mb-10">
            {SET_EXAMPLES.map((set) => {
              const apps = APPS.filter(a => set.appIds.includes(a.id));
              const monthlyTotal = apps.reduce((s, a) => s + a.monthlyPrice, 0);
              const initialTotal = apps.reduce((s, a) => s + a.initialCost, 0);
              const isSingle = set.appIds.length === 1;
              return (
                <div key={set.name} className="bg-white rounded-2xl border-2 border-gray-200 p-6 hover:border-accent/40 hover:shadow-lg transition-all">
                  <div className="flex items-center gap-3 mb-2">
                    <h4 className="text-lg font-black text-primary">{set.name}</h4>
                    {set.label && (
                      <span className="bg-cta/10 text-cta text-xs font-bold px-2.5 py-0.5 rounded-full">{set.label}</span>
                    )}
                  </div>
                  <p className="text-sm text-gray-500 mb-4">{set.description}</p>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {apps.map(a => (
                      <span key={a.id} className="bg-accent/10 text-accent text-xs font-bold px-3 py-1.5 rounded-full">
                        {a.shortName}
                      </span>
                    ))}
                    {isSingle && (
                      <span className="bg-gray-100 text-gray-400 text-xs font-bold px-3 py-1.5 rounded-full">+ 今後追加予定</span>
                    )}
                  </div>
                  <div className="border-t border-gray-100 pt-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">月額</span>
                      <div className="flex items-baseline gap-2">
                        {!isSingle && (
                          <span className="text-sm text-gray-400 line-through">{monthlyTotal.toLocaleString()}円</span>
                        )}
                        <span className="text-2xl font-black text-primary">{set.setMonthly.toLocaleString()}</span>
                        <span className="text-sm text-gray-400">円/月</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">初期費用</span>
                      <div className="flex items-baseline gap-2">
                        {!isSingle && initialTotal !== set.setInitial && (
                          <span className="text-sm text-gray-400 line-through">{initialTotal.toLocaleString()}円</span>
                        )}
                        <span className="text-base font-bold text-gray-700">{set.setInitial.toLocaleString()}円</span>
                      </div>
                    </div>
                  </div>
                  {set.note && (
                    <p className="text-xs text-gray-400 mt-3">{set.note}</p>
                  )}
                  <button
                    onClick={() => {
                      document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="w-full mt-4 py-3 rounded-xl font-bold text-sm transition bg-accent text-white hover:bg-accent-600 hover:shadow-md"
                  >
                    このパックで相談する
                  </button>
                </div>
              );
            })}
          </div>

          {/* システム選択・料金計算 */}
          <div id="pricing-calc" className="bg-gray-50 rounded-2xl border border-gray-200 p-6 md:p-8">
            <h3 className="text-xl font-black text-primary text-center mb-6">カスタム選択</h3>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
              {APPS.map((app) => {
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
                            2ヶ月分お得
                          </span>
                          年払い割引
                        </span>
                        <span className="text-cta font-bold">-{(calcTotal.monthlyTotal * 2).toLocaleString()}円</span>
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
                    <button
                      onClick={() => {
                        setCheckoutPaymentType("onetime");
                        setCheckoutModal(true);
                        setCheckoutError("");
                      }}
                      disabled={selectedApps.length === 0}
                      className="w-full py-3.5 rounded-xl font-bold transition border-2 border-primary/20 text-primary hover:border-primary/40 hover:bg-primary/5 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      買い切りで申し込む（{calcTotal.initialTotal.toLocaleString()}円）
                    </button>
                    {selectedApps.length > 0 && (
                      <p className="text-xs text-gray-500 text-center">
                        ※ 買い切りの場合、別途保守料金 {calcTotal.maintenanceSubtotal.toLocaleString()}円/月がかかります
                        <br />
                        <span className="text-gray-400">（サーバー運用・アップデート・サポート費用）</span>
                      </p>
                    )}
                    <button
                      onClick={() => {
                        document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                      }}
                      className="w-full py-3.5 rounded-xl font-bold transition bg-gray-100 text-gray-700 hover:bg-gray-200"
                    >
                      まずは相談する
                    </button>
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

          <div className="text-center">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 bg-cta text-white px-8 py-4 rounded-xl font-bold text-base hover:bg-cta-600 hover:shadow-lg transition-all"
            >
              まずは無料相談
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

      {/* ===== 導入院の声 ===== */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-black text-center text-primary mb-10">
            導入院の声
          </h2>
          <div className="grid md:grid-cols-3 gap-5">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-primary font-bold text-sm">{t.name.charAt(0)}</span>
                  </div>
                  <div>
                    <p className="font-bold text-sm text-primary">{t.name}</p>
                    <p className="text-xs text-gray-400">{t.role}</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">&ldquo;{t.text}&rdquo;</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 開発者紹介 ===== */}
      <section id="developer" className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-black text-center text-primary mb-10">
            開発者紹介
          </h2>

          <div className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl border border-gray-200 p-8 md:p-10">
            <div className="md:flex md:gap-10 md:items-start">
              <div className="md:flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center text-white text-2xl font-black shadow-lg">
                    大
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-primary">大口 陽平</h3>
                    <p className="text-sm text-gray-500">大口神経整体院 院長 / システム開発者</p>
                  </div>
                </div>

                <p className="text-sm text-gray-700 leading-relaxed mb-4">
                  現役の治療家だからこそ、現場で本当に使えるシステムを作れます。
                  大手のツールは高くて使わない機能が多すぎる。
                  そう感じたのが開発のきっかけでした。
                </p>
                <p className="text-sm text-gray-700 leading-relaxed">
                  整体院経営の現場から生まれたツールを、同じ悩みを持つ治療家に届けたい。
                  AIを活用し、50以上のシステムを開発。すべて自分の院で実際に使って改善を重ねています。
                </p>
              </div>

              <div className="md:w-72 mt-6 md:mt-0">
                <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm">
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="text-xs font-bold bg-primary/10 text-primary px-3 py-1 rounded-full">整体院経営者</span>
                    <span className="text-xs font-bold bg-accent/10 text-accent px-3 py-1 rounded-full">システム開発者</span>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed italic">
                    「現役の治療家だからこそ、現場で本当に使えるシステムを作れます」
                  </p>
                </div>
              </div>
            </div>
          </div>
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
              <p className="text-gray-600 text-sm">1営業日以内にご連絡させていただきます。</p>
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
                    placeholder="例: 大口整骨院"
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
                    <p className="text-cta text-xs text-right mt-1">2ヶ月分お得!</p>
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
                  placeholder="例: 大口整骨院"
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
                <span className="text-lg font-black text-white">ClinicApps</span>
              </div>
              <p className="text-sm text-gray-400 max-w-xs">
                治療家が、治療家のために作った業務システム。
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
                <p className="text-white font-bold mb-3">運営会社</p>
                <div className="space-y-2">
                  <p className="text-gray-400">大口神経整体院</p>
                  <p className="text-gray-400">AI Solutions</p>
                  <a href="#contact" className="block hover:text-white transition">お問い合わせ</a>
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
                &copy; 2026 ClinicApps. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
