"use client";

import { useState, useMemo } from "react";

const FEATURES = [
  {
    id: "kensa",
    name: "検査アプリ",
    icon: "🔬",
    color: "red",
    points: [
      "神経学的検査をデジタル化（反射・感覚・筋力）",
      "検査結果をPDFで出力・患者に共有",
      "ビフォーアフターの可視化で説得力UP",
      "セルフケア提案を自動生成",
      "スタッフの検査スキル標準化に",
    ],
    demoUrl: "https://kensa-sheet-app.vercel.app",
  },
  {
    id: "customer",
    name: "顧客管理",
    icon: "👥",
    color: "blue",
    points: [
      "患者情報を一元管理（連絡先・症状・施術履歴）",
      "来院回数・最終来院日を自動カウント",
      "離反防止アラート（30日以上未来院）",
      "カルテ・メモのデジタル管理",
      "CSV一括インポート対応",
    ],
    demoUrl: "https://customer-mgmt.vercel.app",
  },
  {
    id: "reservation",
    name: "予約管理",
    icon: "📅",
    color: "green",
    points: [
      "カレンダー形式で直感的に予約管理",
      "スタッフ別・ベッド別のスケジュール表示",
      "ダブルブッキング防止機能",
      "患者への予約確認メール自動送信",
      "スマホから予約確認・変更OK",
    ],
    demoUrl: "https://reservation-app-steel.vercel.app",
  },
  {
    id: "monshin",
    name: "WEB問診",
    icon: "📝",
    color: "purple",
    points: [
      "来院前にスマホで問診入力",
      "症状・既往歴を事前把握",
      "問診結果が顧客管理に自動連携",
      "待合室での記入時間を削減",
      "LINE連携でカンタン送付",
    ],
    demoUrl: "https://web-monshin.vercel.app",
  },
  {
    id: "meo",
    name: "MEO対策ツール",
    icon: "📍",
    color: "orange",
    points: [
      "Googleマップの検索順位を自動チェック",
      "キーワード別の順位推移グラフ",
      "競合院との比較分析",
      "GBP投稿・ブログ・FAQ記事をAI一括生成",
      "週10分の運用で集患力アップ",
    ],
    demoUrl: "https://app-three-pi-32.vercel.app",
  },
  {
    id: "sleep",
    name: "睡眠チェック",
    icon: "🌙",
    color: "indigo",
    points: [
      "患者の睡眠の質を数値化・スコア化",
      "睡眠改善アドバイスを自動提案",
      "高額メニュー（睡眠カウンセリング）への導線",
      "施術前後の睡眠スコア比較",
      "治療院向け睡眠チェックは競合ゼロ",
    ],
    demoUrl: "",
  },
];

const APP_PRICING = [
  { id: "kensa", name: "検査アプリ", icon: "🔬", monthlyPrice: 5500, onetimePrice: 55000, description: "神経学的検査のデジタル化" },
  { id: "customer", name: "顧客管理", icon: "👥", monthlyPrice: 4980, onetimePrice: 49800, description: "患者情報の一元管理" },
  { id: "reservation", name: "予約管理", icon: "📅", monthlyPrice: 2980, onetimePrice: 29800, description: "カレンダー予約管理" },
  { id: "monshin", name: "WEB問診", icon: "📝", monthlyPrice: 2980, onetimePrice: 29800, description: "来院前のスマホ問診" },
  { id: "meo", name: "MEO対策ツール", icon: "📍", monthlyPrice: 2980, onetimePrice: 29800, description: "Googleマップ順位管理" },
  { id: "sleep", name: "睡眠チェック", icon: "🌙", monthlyPrice: 1980, onetimePrice: 19800, description: "睡眠の質を数値化" },
];

const DISCOUNT_RULES = [
  { minApps: 1, discount: 0, label: "" },
  { minApps: 2, discount: 0.05, label: "2つ以上で5%OFF" },
  { minApps: 3, discount: 0.10, label: "3つ以上で10%OFF" },
  { minApps: 4, discount: 0.15, label: "4つ以上で15%OFF" },
  { minApps: 5, discount: 0.20, label: "5つ以上で20%OFF" },
  { minApps: 6, discount: 0.25, label: "全6アプリで25%OFF" },
];

const RECOMMENDED_SETS = [
  { name: "検査スタートセット", appIds: ["kensa"], tag: "まずはこれ" },
  { name: "業務効率化セット", appIds: ["kensa", "customer", "reservation"], tag: "一番人気" },
  { name: "フルDXセット", appIds: ["kensa", "customer", "reservation", "monshin", "meo", "sleep"], tag: "最大割引" },
];

const FAQS = [
  {
    q: "パソコンが苦手でも使えますか？",
    a: "はい。スマホだけでも操作できるシンプル設計です。導入時に画面共有で操作方法をお伝えしますので、ご安心ください。",
  },
  {
    q: "検査アプリとは何ですか？",
    a: "神経学的検査（反射・感覚・筋力テスト）の結果をデジタルで記録・管理できるツールです。検査結果をPDFで出力して患者さんに渡せるので、「見える化」で納得感が上がります。スタッフの検査スキル標準化にも役立ちます。",
  },
  {
    q: "今使っている紙のカルテからデータを移行できますか？",
    a: "Excelやスプレッドシートにまとめていただければ、CSVで一括取り込みが可能です。移行作業のサポートも行います。",
  },
  {
    q: "途中で解約できますか？",
    a: "はい。最低利用期間はありません。いつでも解約可能で、解約月の月末まで利用できます。",
  },
  {
    q: "途中でプランを変更できますか？",
    a: "はい。いつでもアプリの追加・削除が可能です。変更は翌月から適用されます。",
  },
  {
    q: "患者情報のセキュリティは大丈夫ですか？",
    a: "SSL暗号化通信、データベースの暗号化、定期的なバックアップを実施しています。大手クラウドサービス（Supabase）上で運用しており、セキュリティ基準を満たしています。",
  },
  {
    q: "導入にどのくらい時間がかかりますか？",
    a: "アカウント発行は即日可能です。初期設定（メニュー登録・スタッフ登録など）を含めて、最短1日で利用開始できます。",
  },
  {
    q: "他の治療院管理ソフトとの違いは？",
    a: "大手ソフトは月額3〜5万円が相場ですが、当サービスは月額5,500円から。治療院経営者が自ら開発したツールなので、現場で本当に必要な機能だけに絞っています。",
  },
];

const TESTIMONIALS = [
  {
    name: "A整骨院 院長",
    area: "東京都",
    text: "紙カルテから移行して3ヶ月。受付業務が半分以下になりました。予約の電話対応も減って、施術に集中できています。",
    metric: "受付時間 50%削減",
  },
  {
    name: "B鍼灸院 院長",
    area: "神奈川県",
    text: "WEB問診のおかげで初診のカウンセリングがスムーズに。患者さんも待ち時間が減って喜んでいます。",
    metric: "初診時間 15分短縮",
  },
  {
    name: "C整体院 院長",
    area: "埼玉県",
    text: "離反アラートで「最近来てない患者さん」にフォローの連絡ができるようになりました。リピート率が上がっています。",
    metric: "リピート率 20%向上",
  },
];

const getDiscount = (count: number) => {
  const rule = [...DISCOUNT_RULES].reverse().find(r => count >= r.minApps);
  return rule || DISCOUNT_RULES[0];
};

export default function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [contactForm, setContactForm] = useState({
    clinicName: "",
    name: "",
    email: "",
    phone: "",
    plan: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  // Shopping cart state
  const [selectedApps, setSelectedApps] = useState<string[]>(["kensa"]);
  const [paymentType, setPaymentType] = useState<"monthly" | "onetime">("monthly");

  // Stripe Checkout用 state
  const [checkoutModal, setCheckoutModal] = useState(false);
  const [checkoutEmail, setCheckoutEmail] = useState("");
  const [checkoutClinicName, setCheckoutClinicName] = useState("");
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [checkoutError, setCheckoutError] = useState("");

  const calcTotal = useMemo(() => {
    const selected = APP_PRICING.filter(app => selectedApps.includes(app.id));
    const subtotal = selected.reduce((sum, app) =>
      sum + (paymentType === "monthly" ? app.monthlyPrice : app.onetimePrice), 0);
    const discount = getDiscount(selected.length);
    const discountAmount = Math.floor(subtotal * discount.discount);
    return { subtotal, discountAmount, total: subtotal - discountAmount, discount };
  }, [selectedApps, paymentType]);

  const toggleApp = (appId: string) => {
    setSelectedApps(prev =>
      prev.includes(appId)
        ? prev.filter(id => id !== appId)
        : [...prev, appId]
    );
  };

  const selectSet = (appIds: string[]) => {
    setSelectedApps([...appIds]);
  };

  const handleCheckout = async () => {
    if (!checkoutEmail || !checkoutClinicName) {
      setCheckoutError("メールアドレスと院名を入力してください");
      return;
    }
    setCheckoutLoading(true);
    setCheckoutError("");
    try {
      const appNames = APP_PRICING.filter(a => selectedApps.includes(a.id)).map(a => a.name).join("、");
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          planName: `カスタム（${appNames}）`,
          email: checkoutEmail,
          clinicName: checkoutClinicName,
          amount: calcTotal.total,
          paymentType,
          selectedApps,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "エラーが発生しました");
      }
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (err) {
      if (err instanceof Error) {
        setCheckoutError(err.message);
      } else {
        setCheckoutError("決済処理に失敗しました");
        document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
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
        body: JSON.stringify(contactForm),
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
      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white">
        <nav className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <span className="text-xl font-black tracking-wider">ClinicDX</span>
          <a
            href="#contact"
            className="bg-white text-blue-700 px-5 py-2 rounded-full text-sm font-bold hover:bg-blue-50 transition"
          >
            無料で相談する
          </a>
        </nav>
        <div className="max-w-4xl mx-auto px-4 py-16 md:py-24 text-center">
          <p className="text-blue-200 text-sm md:text-base mb-4 tracking-wider">
            治療院・整体院・鍼灸院向け
          </p>
          <h1 className="text-3xl md:text-5xl font-black leading-tight mb-6">
            治療院の業務を、
            <br />
            まるごと<span className="text-yellow-300">DX化</span>
          </h1>
          <p className="text-blue-100 text-lg md:text-xl mb-8 max-w-2xl mx-auto leading-relaxed">
            検査・顧客管理・予約・問診・MEO・睡眠チェック。
            <br />
            治療院経営者が自ら開発した6つのツールを
            <br />
            月額5,500円から。
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#contact"
              className="bg-yellow-400 text-gray-900 px-8 py-4 rounded-xl font-black text-lg hover:bg-yellow-300 transition shadow-lg"
            >
              無料デモを申し込む
            </a>
            <a
              href="#features"
              className="bg-white/10 backdrop-blur text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/20 transition border border-white/20"
            >
              機能を見る
            </a>
          </div>
          <div className="mt-12 grid grid-cols-3 gap-4 max-w-md mx-auto">
            <div className="text-center">
              <p className="text-3xl font-black">0</p>
              <p className="text-xs text-blue-200">初期費用</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-black">即日</p>
              <p className="text-xs text-blue-200">導入可能</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-black">0</p>
              <p className="text-xs text-blue-200">縛りなし</p>
            </div>
          </div>
        </div>
      </section>

      {/* Problems */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-black text-center mb-10">
            こんなお悩みありませんか？
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              "紙カルテの管理が大変で、患者情報を探すのに時間がかかる",
              "予約の電話対応に追われて、施術に集中できない",
              "初診の問診票を毎回手書きで書いてもらうのが面倒",
              "リピート患者のフォローが後手に回ってしまう",
              "大手の管理ソフトは高くて手が出ない（月3〜5万円）",
              "ITに詳しくないので、導入・運用が不安",
            ].map((problem, i) => (
              <div key={i} className="flex items-start gap-3 bg-white p-4 rounded-xl shadow-sm">
                <span className="text-red-500 text-xl flex-shrink-0">!</span>
                <p className="text-sm text-gray-700">{problem}</p>
              </div>
            ))}
          </div>
          <p className="text-center mt-8 text-lg font-bold text-blue-700">
            ClinicDXなら、これらをすべて解決できます
          </p>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-16">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-black text-center mb-4">
            6つのツールで院の業務をDX化
          </h2>
          <p className="text-center text-gray-500 mb-12">
            治療院経営者が自ら開発。現場で本当に必要な機能だけを厳選。
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {FEATURES.map((f) => (
              <div
                key={f.id}
                className="bg-white rounded-2xl shadow-sm border p-6 hover:shadow-md transition"
              >
                <div className="text-4xl mb-4">{f.icon}</div>
                <h3 className="text-xl font-bold mb-4">{f.name}</h3>
                <ul className="space-y-2 mb-6">
                  {f.points.map((point, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                      <span className="text-green-500 flex-shrink-0">&#10003;</span>
                      {point}
                    </li>
                  ))}
                </ul>
                {f.demoUrl ? (
                  <a
                    href={f.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-center py-2 border-2 border-blue-600 text-blue-600 rounded-lg font-bold text-sm hover:bg-blue-50 transition"
                  >
                    デモを見る
                  </a>
                ) : (
                  <span className="block text-center py-2 border-2 border-gray-300 text-gray-400 rounded-lg font-bold text-sm">
                    Coming Soon
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-black text-center mb-10">
            導入はカンタン3ステップ
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: "1", title: "お問い合わせ", desc: "フォームまたはお電話でご連絡ください。無料でデモをお見せします。" },
              { step: "2", title: "初期設定", desc: "院の情報・メニュー・スタッフを登録。最短1日で完了します。" },
              { step: "3", title: "利用開始", desc: "すぐに使い始められます。困ったらいつでもサポートに連絡OK。" },
            ].map((s) => (
              <div key={s.step} className="text-center">
                <div className="w-12 h-12 rounded-full bg-blue-600 text-white text-xl font-bold flex items-center justify-center mx-auto mb-4">
                  {s.step}
                </div>
                <h3 className="font-bold text-lg mb-2">{s.title}</h3>
                <p className="text-sm text-gray-500">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-black text-center mb-10">
            導入院の声
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="bg-white rounded-2xl shadow-sm border p-6">
                <div className="bg-green-50 text-green-700 text-sm font-bold px-3 py-1 rounded-full inline-block mb-4">
                  {t.metric}
                </div>
                <p className="text-sm text-gray-600 mb-4 leading-relaxed">{t.text}</p>
                <div className="flex items-center gap-2 text-sm">
                  <span className="font-bold">{t.name}</span>
                  <span className="text-gray-400">{t.area}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Developer Profile */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-black text-center mb-2">
            開発者紹介
          </h2>
          <p className="text-center text-blue-600 font-bold mb-10">
            治療家 × 経営者 × エンジニア
          </p>
          <div className="bg-white rounded-2xl shadow-sm border p-8">
            <h3 className="text-xl font-bold mb-1">大口 陽平（30歳）</h3>
            <p className="text-sm text-gray-500 mb-6">
              大口神経整体院 院長 / AI Solutions 代表
            </p>
            <ul className="space-y-3 mb-8">
              {[
                "整体院を経営しながら、自分の現場の課題を解決するためにアプリ開発を開始",
                "AIを活用し、2週間で30個のアプリを開発",
                "検査アプリは患者から「すごい見やすい」と好評、家族への紹介にもつながった",
                "現在4事業（整体院・訪問鍼灸・治療機器・アプリ開発）を同時運営",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-gray-700">
                  <span className="text-blue-500 flex-shrink-0 mt-0.5">●</span>
                  {item}
                </li>
              ))}
            </ul>
            <div className="bg-blue-50 rounded-xl p-5">
              <p className="text-sm text-gray-700 leading-relaxed italic">
                「大手のツールは高くて機能が多すぎる。
                <br />
                現場で本当に必要な機能だけを、治療家の目線で作りました。」
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing - Shopping Cart */}
      <section id="pricing" className="py-16 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-black text-center mb-4">
            料金プラン
          </h2>
          <p className="text-center text-gray-500 mb-10">
            すべて初期費用0円・解約縛りなし。必要なアプリだけ選べます。
          </p>

          {/* Recommended Sets */}
          <div className="flex gap-3 mb-8 overflow-x-auto pb-2 justify-center flex-wrap">
            {RECOMMENDED_SETS.map((set) => {
              const isActive = set.appIds.length === selectedApps.length &&
                set.appIds.every(id => selectedApps.includes(id));
              return (
                <button
                  key={set.name}
                  onClick={() => selectSet(set.appIds)}
                  className={`relative flex-shrink-0 px-5 py-3 rounded-full font-bold text-sm transition border-2 ${
                    isActive
                      ? "bg-blue-600 text-white border-blue-600"
                      : "bg-white text-gray-700 border-gray-200 hover:border-blue-300"
                  }`}
                >
                  {set.tag === "一番人気" && (
                    <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full whitespace-nowrap">
                      一番人気
                    </span>
                  )}
                  {set.tag === "最大割引" && (
                    <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-green-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full whitespace-nowrap">
                      最大割引
                    </span>
                  )}
                  {set.tag === "まずはこれ" && (
                    <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-blue-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full whitespace-nowrap">
                      まずはこれ
                    </span>
                  )}
                  {set.name}
                </button>
              );
            })}
          </div>

          {/* App Cards Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
            {APP_PRICING.map((app) => {
              const isSelected = selectedApps.includes(app.id);
              return (
                <button
                  key={app.id}
                  onClick={() => toggleApp(app.id)}
                  className={`relative text-left p-4 md:p-5 rounded-2xl border-2 transition-all ${
                    isSelected
                      ? "border-blue-500 bg-blue-50 shadow-md"
                      : "border-gray-200 bg-white hover:border-gray-300"
                  }`}
                >
                  {/* Checkbox indicator */}
                  <div className={`absolute top-3 right-3 w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all ${
                    isSelected
                      ? "bg-blue-600 border-blue-600"
                      : "border-gray-300 bg-white"
                  }`}>
                    {isSelected && (
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>

                  <div className="text-2xl md:text-3xl mb-2">{app.icon}</div>
                  <h3 className="font-bold text-sm md:text-base mb-1">{app.name}</h3>
                  <p className="text-xs text-gray-500 mb-3">{app.description}</p>
                  <div className="space-y-0.5">
                    <p className={`text-xs ${paymentType === "monthly" ? "font-bold text-blue-700" : "text-gray-400"}`}>
                      月額: ¥{app.monthlyPrice.toLocaleString()}/月
                    </p>
                    <p className={`text-xs ${paymentType === "onetime" ? "font-bold text-blue-700" : "text-gray-400"}`}>
                      買い切り: ¥{app.onetimePrice.toLocaleString()}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Payment Type Toggle */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex bg-gray-100 rounded-xl p-1">
              <button
                onClick={() => setPaymentType("monthly")}
                className={`px-6 py-2.5 rounded-lg text-sm font-bold transition ${
                  paymentType === "monthly"
                    ? "bg-white text-blue-700 shadow-sm"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                月額サブスク
              </button>
              <button
                onClick={() => setPaymentType("onetime")}
                className={`px-6 py-2.5 rounded-lg text-sm font-bold transition ${
                  paymentType === "onetime"
                    ? "bg-white text-blue-700 shadow-sm"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                買い切り
              </button>
            </div>
          </div>

          {/* Price Calculation Area (Desktop) */}
          <div className="hidden md:block">
            <div className="bg-white rounded-2xl shadow-lg border p-6 max-w-lg mx-auto">
              {selectedApps.length === 0 ? (
                <p className="text-center text-gray-400 py-4">アプリを選択してください</p>
              ) : (
                <>
                  <div className="mb-4">
                    <p className="text-sm text-gray-500 mb-1">
                      選択中: {APP_PRICING.filter(a => selectedApps.includes(a.id)).map(a => a.name).join("、")}（{selectedApps.length}つ）
                    </p>
                  </div>
                  <div className="border-t border-gray-100 pt-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">定価合計</span>
                      <span>¥{calcTotal.subtotal.toLocaleString()}{paymentType === "monthly" ? "/月" : ""}</span>
                    </div>
                    {calcTotal.discount.discount > 0 && (
                      <div className="flex justify-between text-sm">
                        <span className="text-green-600 font-bold flex items-center gap-1">
                          <span className="bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded-full">
                            {Math.round(calcTotal.discount.discount * 100)}%OFF
                          </span>
                          セット割引
                        </span>
                        <span className="text-green-600 font-bold">-¥{calcTotal.discountAmount.toLocaleString()}</span>
                      </div>
                    )}
                  </div>
                  <div className="border-t-2 border-gray-900 mt-4 pt-4">
                    <div className="flex justify-between items-end">
                      <span className="font-bold text-lg">お支払い額</span>
                      <div className="text-right">
                        <span className="text-3xl font-black text-blue-700">
                          ¥{calcTotal.total.toLocaleString()}
                        </span>
                        <span className="text-gray-500 text-sm">{paymentType === "monthly" ? "/月（税込）" : "（税込・一括）"}</span>
                      </div>
                    </div>
                  </div>
                  {calcTotal.discount.label && (
                    <p className="text-xs text-green-600 text-right mt-1">{calcTotal.discount.label}</p>
                  )}
                  <div className="mt-6 space-y-2">
                    <button
                      onClick={() => {
                        setCheckoutModal(true);
                        setCheckoutError("");
                      }}
                      disabled={selectedApps.length === 0}
                      className="w-full py-3 rounded-xl font-bold transition bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      今すぐ始める
                    </button>
                    <button
                      onClick={() => {
                        const appNames = APP_PRICING.filter(a => selectedApps.includes(a.id)).map(a => a.name).join("、");
                        setContactForm({ ...contactForm, plan: `カスタム（${appNames}）` });
                        document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                      }}
                      className="w-full py-3 rounded-xl font-bold transition bg-gray-100 text-gray-700 hover:bg-gray-200"
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

      {/* Mobile Sticky Bottom Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t shadow-[0_-4px_20px_rgba(0,0,0,0.1)] z-40 px-4 py-3">
        {selectedApps.length === 0 ? (
          <p className="text-center text-gray-400 text-sm py-1">アプリを選択してください</p>
        ) : (
          <div className="flex items-center justify-between gap-3">
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-xl font-black text-blue-700 whitespace-nowrap">
                  ¥{calcTotal.total.toLocaleString()}
                </span>
                <span className="text-xs text-gray-500 whitespace-nowrap">
                  {paymentType === "monthly" ? "/月" : "一括"}
                </span>
                {calcTotal.discount.discount > 0 && (
                  <span className="bg-green-100 text-green-700 text-[10px] font-bold px-1.5 py-0.5 rounded-full whitespace-nowrap">
                    {Math.round(calcTotal.discount.discount * 100)}%OFF
                  </span>
                )}
              </div>
              <p className="text-[10px] text-gray-400 truncate">
                {selectedApps.length}アプリ選択中
              </p>
            </div>
            <button
              onClick={() => {
                setCheckoutModal(true);
                setCheckoutError("");
              }}
              className="flex-shrink-0 bg-blue-600 text-white px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-blue-700 transition"
            >
              申し込む
            </button>
          </div>
        )}
      </div>

      {/* Add bottom padding on mobile for sticky bar */}
      <div className="md:hidden h-20" />

      {/* Comparison */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-black text-center mb-10">
            他社サービスとの比較
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left py-3 px-2"></th>
                  <th className="py-3 px-2 bg-blue-50 text-blue-700 font-bold rounded-t-lg">
                    ClinicDX
                  </th>
                  <th className="py-3 px-2 text-gray-500">大手A社</th>
                  <th className="py-3 px-2 text-gray-500">大手B社</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["月額料金", "5,500円〜", "30,000円〜", "50,000円〜"],
                  ["初期費用", "0円", "100,000円〜", "200,000円〜"],
                  ["顧客管理", "○", "○", "○"],
                  ["予約管理", "○", "○", "○"],
                  ["WEB問診", "○", "△（有料オプション）", "○"],
                  ["スマホ対応", "○（完全対応）", "△（一部のみ）", "○"],
                  ["最低利用期間", "なし", "12ヶ月", "6ヶ月"],
                  ["導入サポート", "○（無料）", "○（有料）", "○（有料）"],
                ].map((row, i) => (
                  <tr key={i} className="border-b border-gray-100">
                    <td className="py-3 px-2 font-medium text-gray-700">{row[0]}</td>
                    <td className="py-3 px-2 text-center bg-blue-50 font-bold text-blue-700">
                      {row[1]}
                    </td>
                    <td className="py-3 px-2 text-center text-gray-500">{row[2]}</td>
                    <td className="py-3 px-2 text-center text-gray-500">{row[3]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-black text-center mb-10">
            よくある質問
          </h2>
          <div className="space-y-3">
            {FAQS.map((faq, i) => (
              <div key={i} className="bg-white rounded-xl shadow-sm">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full text-left px-6 py-4 flex items-center justify-between"
                >
                  <span className="font-bold text-sm pr-4">{faq.q}</span>
                  <span className="text-gray-400 flex-shrink-0">
                    {openFaq === i ? "−" : "+"}
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

      {/* Contact Form */}
      <section id="contact" className="py-16">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-black text-center mb-4">
            無料デモ・お問い合わせ
          </h2>
          <p className="text-center text-gray-500 mb-8">
            まずはデモをご覧ください。無理な営業は一切いたしません。
          </p>

          {submitted ? (
            <div className="bg-green-50 rounded-2xl p-8 text-center">
              <p className="text-4xl mb-4">&#10003;</p>
              <h3 className="text-xl font-bold mb-2">
                お問い合わせありがとうございます
              </h3>
              <p className="text-gray-600 text-sm">
                1営業日以内にご連絡させていただきます。
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border p-6 space-y-4">
              <div>
                <label className="text-sm font-bold text-gray-700">院名 *</label>
                <input
                  required
                  value={contactForm.clinicName}
                  onChange={(e) => setContactForm({ ...contactForm, clinicName: e.target.value })}
                  placeholder="○○整骨院"
                  className="w-full mt-1 px-4 py-3 border rounded-lg text-sm"
                />
              </div>
              <div>
                <label className="text-sm font-bold text-gray-700">お名前 *</label>
                <input
                  required
                  value={contactForm.name}
                  onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                  placeholder="山田 太郎"
                  className="w-full mt-1 px-4 py-3 border rounded-lg text-sm"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-bold text-gray-700">メールアドレス *</label>
                  <input
                    type="email"
                    required
                    value={contactForm.email}
                    onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                    placeholder="info@example.com"
                    className="w-full mt-1 px-4 py-3 border rounded-lg text-sm"
                  />
                </div>
                <div>
                  <label className="text-sm font-bold text-gray-700">電話番号</label>
                  <input
                    value={contactForm.phone}
                    onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                    placeholder="090-1234-5678"
                    className="w-full mt-1 px-4 py-3 border rounded-lg text-sm"
                  />
                </div>
              </div>
              <div>
                <label className="text-sm font-bold text-gray-700">ご希望プラン</label>
                <select
                  value={contactForm.plan}
                  onChange={(e) => setContactForm({ ...contactForm, plan: e.target.value })}
                  className="w-full mt-1 px-4 py-3 border rounded-lg text-sm"
                >
                  <option value="">未定・相談したい</option>
                  {RECOMMENDED_SETS.map((s) => (
                    <option key={s.name} value={s.name}>
                      {s.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-sm font-bold text-gray-700">ご質問・ご要望</label>
                <textarea
                  value={contactForm.message}
                  onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                  placeholder="気になることがあればお気軽にどうぞ"
                  rows={3}
                  className="w-full mt-1 px-4 py-3 border rounded-lg text-sm"
                />
              </div>
              {submitError && (
                <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg">
                  {submitError}
                </div>
              )}
              <button
                type="submit"
                disabled={submitting}
                className="w-full py-4 bg-blue-600 text-white rounded-xl font-bold text-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? "送信中..." : "無料デモを申し込む"}
              </button>
              <p className="text-xs text-gray-400 text-center">
                送信後、1営業日以内にご連絡いたします
              </p>
            </form>
          )}
        </div>
      </section>

      {/* Checkout Modal */}
      {checkoutModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 md:p-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold">お申し込み</h3>
              <button
                onClick={() => setCheckoutModal(false)}
                className="text-gray-400 hover:text-gray-600 text-2xl leading-none"
              >
                &times;
              </button>
            </div>

            {/* Order summary in modal */}
            <div className="bg-gray-50 rounded-xl p-4 mb-5 text-sm">
              <p className="text-gray-500 mb-2">
                選択中のアプリ（{selectedApps.length}つ）
              </p>
              <div className="flex flex-wrap gap-1.5 mb-3">
                {APP_PRICING.filter(a => selectedApps.includes(a.id)).map(a => (
                  <span key={a.id} className="bg-blue-100 text-blue-700 text-xs font-bold px-2 py-1 rounded-full">
                    {a.icon} {a.name}
                  </span>
                ))}
              </div>
              <div className="border-t border-gray-200 pt-2 flex justify-between items-end">
                <span className="text-gray-500">お支払い額</span>
                <div>
                  <span className="text-xl font-black text-blue-700">¥{calcTotal.total.toLocaleString()}</span>
                  <span className="text-gray-500 text-xs">{paymentType === "monthly" ? "/月" : "（一括）"}</span>
                </div>
              </div>
              {calcTotal.discount.discount > 0 && (
                <p className="text-green-600 text-xs text-right mt-1">
                  {calcTotal.discount.label}適用中
                </p>
              )}
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-bold text-gray-700">
                  院名 *
                </label>
                <input
                  value={checkoutClinicName}
                  onChange={(e) => setCheckoutClinicName(e.target.value)}
                  placeholder="○○整骨院"
                  className="w-full mt-1 px-4 py-3 border rounded-lg text-sm"
                />
              </div>
              <div>
                <label className="text-sm font-bold text-gray-700">
                  メールアドレス *
                </label>
                <input
                  type="email"
                  value={checkoutEmail}
                  onChange={(e) => setCheckoutEmail(e.target.value)}
                  placeholder="info@example.com"
                  className="w-full mt-1 px-4 py-3 border rounded-lg text-sm"
                />
              </div>
              {checkoutError && (
                <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg">
                  {checkoutError}
                </div>
              )}
              <button
                onClick={handleCheckout}
                disabled={checkoutLoading}
                className="w-full py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {checkoutLoading ? "処理中..." : "決済に進む"}
              </button>
              <p className="text-xs text-gray-400 text-center">
                Stripeの安全な決済画面に移動します
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-xl font-black text-white mb-2">ClinicDX</p>
          <p className="text-sm mb-6">治療院DXツール 6点セット</p>
          <div className="flex justify-center gap-6 text-sm mb-6">
            <a href="#features" className="hover:text-white transition">
              機能紹介
            </a>
            <a href="#pricing" className="hover:text-white transition">
              料金プラン
            </a>
            <a href="#contact" className="hover:text-white transition">
              お問い合わせ
            </a>
          </div>
          <p className="text-xs">
            運営: 大口神経整体院 | 開発・提供: AI Solutions
          </p>
        </div>
      </footer>
    </div>
  );
}
