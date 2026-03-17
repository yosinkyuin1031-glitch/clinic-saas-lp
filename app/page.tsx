"use client";

import { useState } from "react";

const FEATURES = [
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
];

const PLANS = [
  {
    name: "ライト",
    price: 4980,
    description: "1ツール単体利用",
    features: ["ツール1つを選択", "データ保存 1000件", "メールサポート", "初期設定サポート"],
    recommended: false,
  },
  {
    name: "スタンダード",
    price: 9800,
    description: "3点セット（一番人気）",
    features: [
      "顧客管理 + 予約 + 問診",
      "データ保存 無制限",
      "3ツール間のデータ連携",
      "優先メールサポート",
      "初期データ移行サポート",
      "月1回オンライン相談",
    ],
    recommended: true,
  },
  {
    name: "プレミアム",
    price: 19800,
    description: "全機能 + カスタマイズ",
    features: [
      "スタンダード全機能",
      "院のロゴ・カラーでカスタマイズ",
      "独自ドメイン対応",
      "LINE公式アカウント連携",
      "専属サポート担当",
      "月2回オンライン相談",
      "新機能の先行利用",
    ],
    recommended: false,
  },
];

const FAQS = [
  {
    q: "パソコンが苦手でも使えますか？",
    a: "はい。スマホだけでも操作できるシンプル設計です。導入時に画面共有で操作方法をお伝えしますので、ご安心ください。",
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
    q: "患者情報のセキュリティは大丈夫ですか？",
    a: "SSL暗号化通信、データベースの暗号化、定期的なバックアップを実施しています。大手クラウドサービス（Supabase）上で運用しており、セキュリティ基準を満たしています。",
  },
  {
    q: "導入にどのくらい時間がかかりますか？",
    a: "アカウント発行は即日可能です。初期設定（メニュー登録・スタッフ登録など）を含めて、最短1日で利用開始できます。",
  },
  {
    q: "他の治療院管理ソフトとの違いは？",
    a: "大手ソフトは月額3〜5万円が相場ですが、当サービスは3点セットで月額9,800円。治療院経営者が自ら開発したツールなので、現場で本当に必要な機能だけに絞っています。",
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

export default function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [, setSelectedPlan] = useState<number | null>(null);
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
            業務効率化ツール
            <br />
            <span className="text-yellow-300">3点セット</span>で月額9,800円
          </h1>
          <p className="text-blue-100 text-lg md:text-xl mb-8 max-w-2xl mx-auto leading-relaxed">
            顧客管理・予約管理・WEB問診。
            <br />
            治療院に必要なDXツールをまとめて導入。
            <br />
            初期費用0円・最短即日スタート。
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
            3つのツールで院の業務をDX化
          </h2>
          <p className="text-center text-gray-500 mb-12">
            それぞれ単体でも、セットでも利用可能
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
                <a
                  href={f.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-center py-2 border-2 border-blue-600 text-blue-600 rounded-lg font-bold text-sm hover:bg-blue-50 transition"
                >
                  デモを見る
                </a>
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

      {/* Pricing */}
      <section id="pricing" className="py-16 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-black text-center mb-4">
            料金プラン
          </h2>
          <p className="text-center text-gray-500 mb-10">
            すべて初期費用0円・解約縛りなし
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {PLANS.map((plan, i) => (
              <div
                key={i}
                className={`bg-white rounded-2xl shadow-sm p-6 border-2 relative ${
                  plan.recommended ? "border-blue-500 shadow-lg" : "border-transparent"
                }`}
              >
                {plan.recommended && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-xs font-bold px-4 py-1 rounded-full">
                    一番人気
                  </div>
                )}
                <h3 className="text-xl font-bold mb-1">{plan.name}</h3>
                <p className="text-sm text-gray-500 mb-4">{plan.description}</p>
                <div className="mb-6">
                  <span className="text-4xl font-black">
                    {plan.price.toLocaleString()}
                  </span>
                  <span className="text-gray-500 text-sm">円/月（税込）</span>
                </div>
                <ul className="space-y-2 mb-6">
                  {plan.features.map((f, fi) => (
                    <li key={fi} className="flex items-start gap-2 text-sm text-gray-600">
                      <span className="text-green-500 flex-shrink-0">&#10003;</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => {
                    setSelectedPlan(i);
                    setContactForm({ ...contactForm, plan: plan.name });
                    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className={`w-full py-3 rounded-xl font-bold transition ${
                    plan.recommended
                      ? "bg-blue-600 text-white hover:bg-blue-700"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  このプランで相談する
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

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
                  ["月額料金", "9,800円", "30,000円〜", "50,000円〜"],
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
                  {PLANS.map((p) => (
                    <option key={p.name} value={p.name}>
                      {p.name}（月額{p.price.toLocaleString()}円）
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

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-xl font-black text-white mb-2">ClinicDX</p>
          <p className="text-sm mb-6">治療院DXツール 3点セット</p>
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
