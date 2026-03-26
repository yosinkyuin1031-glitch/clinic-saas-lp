"use client";

import { useState, useMemo } from "react";

// ========== データ定義 ==========

const APPS = [
  {
    id: "kensa",
    name: "検査シート作成アプリ",
    shortName: "検査シート",
    category: "施術支援",
    description: "神経学的検査（反射・感覚・筋力テスト）をデジタル化。検査結果をPDFで出力し、患者に渡せる。ビフォーアフターの可視化で説得力が上がる。",
    features: ["反射・感覚・筋力テストをワンタップ記録", "検査結果をPDF出力して患者に共有", "ビフォーアフター比較で施術効果を見える化"],
    monthlyPrice: 5500,
    onetimePrice: 55000,
    demoUrl: "https://kensa-sheet-app.vercel.app",
    color: "sky",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15a2.25 2.25 0 012.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
      </svg>
    ),
  },
  {
    id: "customer",
    name: "顧客管理シート",
    shortName: "顧客管理",
    category: "患者管理",
    description: "患者情報を一元管理。来院回数・最終来院日の自動カウント、30日以上未来院の離反アラート、CSV一括インポートに対応。",
    features: ["患者情報・来院履歴を一元管理", "離反防止アラート（30日以上未来院）", "CSV一括インポートで既存データ移行"],
    monthlyPrice: 4980,
    onetimePrice: 49800,
    demoUrl: "https://customer-mgmt.vercel.app",
    color: "blue",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
      </svg>
    ),
  },
  {
    id: "reservation",
    name: "予約管理",
    shortName: "予約管理",
    category: "業務効率化",
    description: "カレンダー形式で直感的に予約管理。スタッフ別・ベッド別のスケジュール表示、ダブルブッキング防止、予約確認メールの自動送信。",
    features: ["カレンダー形式で直感的に管理", "ダブルブッキング自動防止", "予約確認メール自動送信"],
    monthlyPrice: 2980,
    onetimePrice: 29800,
    demoUrl: "https://reservation-app-steel.vercel.app",
    color: "emerald",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
      </svg>
    ),
  },
  {
    id: "monshin",
    name: "WEB問診",
    shortName: "WEB問診",
    category: "患者管理",
    description: "来院前にスマホで問診入力。症状・既往歴を事前に把握でき、待合室での記入時間を削減。LINE連携でカンタンに送付。",
    features: ["来院前にスマホで問診完了", "症状・既往歴を事前に把握", "LINE連携でワンタップ送信"],
    monthlyPrice: 2980,
    onetimePrice: 29800,
    demoUrl: "https://web-monshin.vercel.app",
    color: "violet",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
      </svg>
    ),
  },
  {
    id: "meo",
    name: "MEO勝ち上げくん",
    shortName: "MEO対策",
    category: "集患・マーケティング",
    description: "Googleマップの検索順位を自動チェック。キーワード別の順位推移、競合院との比較分析、GBP投稿・ブログ・FAQ記事のAI一括生成。",
    features: ["Googleマップ順位を自動チェック", "競合院との比較分析", "GBP投稿・ブログをAI一括生成"],
    monthlyPrice: 2980,
    onetimePrice: 29800,
    demoUrl: "https://app-three-pi-32.vercel.app",
    color: "orange",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
      </svg>
    ),
  },
  {
    id: "ad",
    name: "広告管理ツール",
    shortName: "広告管理",
    category: "集患・マーケティング",
    description: "Google広告・Instagram広告・LINE広告の運用データを一画面で管理。費用対効果（ROAS）を自動算出し、広告の改善判断がすぐできる。",
    features: ["複数広告媒体を一画面で管理", "ROAS・CPAを自動算出", "月次レポート自動生成"],
    monthlyPrice: 2980,
    onetimePrice: 29800,
    demoUrl: "https://ad-manager-mu.vercel.app",
    color: "rose",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.34 15.84c-.688-.06-1.386-.09-2.09-.09H7.5a4.5 4.5 0 110-9h.75c.704 0 1.402-.03 2.09-.09m0 9.18c.253.962.584 1.892.985 2.783.247.55.06 1.21-.463 1.511l-.657.38c-.551.318-1.26.117-1.527-.461a20.845 20.845 0 01-1.44-4.282m3.102.069a18.03 18.03 0 01-.59-4.59c0-1.586.205-3.124.59-4.59m0 9.18a23.848 23.848 0 018.835 2.535M10.34 6.66a23.847 23.847 0 008.835-2.535m0 0A23.74 23.74 0 0018.795 3m.38 1.125a23.91 23.91 0 011.014 5.395m-1.014 8.855c-.118.38-.245.754-.38 1.125m.38-1.125a23.91 23.91 0 001.014-5.395m0-3.46c.495.413.811 1.035.811 1.73 0 .695-.316 1.317-.811 1.73m0-3.46a24.347 24.347 0 010 3.46" />
      </svg>
    ),
  },
  {
    id: "hp",
    name: "HPコンテンツ管理",
    shortName: "HP管理",
    category: "集患・マーケティング",
    description: "ホームページの症状別ページ・ブログ記事をAIで一括生成。SEO対策に必要なコンテンツを短時間で量産できる。",
    features: ["症状別ページをAI一括生成", "SEO対策コンテンツを短時間で量産", "ブログ記事テンプレート搭載"],
    monthlyPrice: 2980,
    onetimePrice: 29800,
    demoUrl: "https://hp-content-manager.vercel.app",
    color: "teal",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
      </svg>
    ),
  },
  {
    id: "line",
    name: "LINE自動化",
    shortName: "LINE自動化",
    category: "業務効率化",
    description: "LINE公式アカウントの自動返信・ステップ配信・セグメント配信を管理。リマインド配信で来院率アップ。",
    features: ["自動返信・ステップ配信を設定", "セグメント別の配信管理", "予約リマインドで来院率アップ"],
    monthlyPrice: 2980,
    onetimePrice: 29800,
    demoUrl: "https://line-automation.vercel.app",
    color: "green",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
      </svg>
    ),
  },
  {
    id: "heatscope",
    name: "HeatScope",
    shortName: "ヒートマップ",
    category: "集患・マーケティング",
    description: "ホームページのどこが見られているかをヒートマップで可視化。クリック・スクロールの分析でHP改善のヒントが一目でわかる。",
    features: ["HPの閲覧状況をヒートマップ表示", "クリック・スクロール分析", "HP改善ポイントが一目でわかる"],
    monthlyPrice: 1980,
    onetimePrice: 19800,
    demoUrl: "https://heatscope.vercel.app",
    color: "red",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18a3.75 3.75 0 00.495-7.467 5.99 5.99 0 00-1.925 3.546 5.974 5.974 0 01-2.133-1A3.75 3.75 0 0012 18z" />
      </svg>
    ),
  },
  {
    id: "sleep",
    name: "睡眠チェック分析アプリ",
    shortName: "睡眠チェック",
    category: "施術支援",
    description: "患者の睡眠の質を数値化・スコア化。睡眠改善アドバイスを自動提案し、睡眠カウンセリングメニューへの導線にもなる。",
    features: ["睡眠の質をスコア化", "改善アドバイスを自動提案", "睡眠カウンセリングメニューへの導線"],
    monthlyPrice: 1980,
    onetimePrice: 19800,
    demoUrl: "",
    color: "indigo",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
      </svg>
    ),
  },
  {
    id: "receipt",
    name: "レセプト管理",
    shortName: "レセプト管理",
    category: "業務効率化",
    description: "保険請求に必要なレセプトデータを管理。入力ミスの防止、請求漏れチェック機能で事務作業を効率化。",
    features: ["レセプトデータを一元管理", "入力ミス・請求漏れを自動チェック", "月次レポート出力対応"],
    monthlyPrice: 2980,
    onetimePrice: 29800,
    demoUrl: "https://receipt-manager-taupe.vercel.app",
    color: "amber",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
      </svg>
    ),
  },
  {
    id: "sales",
    name: "営業管理アプリ",
    shortName: "営業管理",
    category: "業務効率化",
    description: "BtoB営業の進捗を管理。案件ステータス・フォローアップのタスク管理・売上予測ができる。",
    features: ["案件ステータスをパイプライン管理", "フォローアップタスクの自動リマインド", "売上予測レポート"],
    monthlyPrice: 2980,
    onetimePrice: 29800,
    demoUrl: "https://sales-manager-orpin.vercel.app",
    color: "cyan",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
      </svg>
    ),
  },
  {
    id: "menu",
    name: "メニュー管理ツール",
    shortName: "メニュー管理",
    category: "業務効率化",
    description: "施術メニュー・料金・時間・担当スタッフの管理をデジタル化。メニュー変更や料金改定の履歴も残せる。",
    features: ["メニュー・料金・時間を一括管理", "料金改定の履歴を自動記録", "スタッフ別の対応メニュー設定"],
    monthlyPrice: 1980,
    onetimePrice: 19800,
    demoUrl: "https://menu-manager.vercel.app",
    color: "fuchsia",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 010 3.75H5.625a1.875 1.875 0 010-3.75z" />
      </svg>
    ),
  },
];

const CATEGORIES = ["すべて", "施術支援", "患者管理", "業務効率化", "集患・マーケティング"];

const DISCOUNT_RULES = [
  { minApps: 1, discount: 0, label: "" },
  { minApps: 2, discount: 0.05, label: "2つ以上で5%OFF" },
  { minApps: 3, discount: 0.10, label: "3つ以上で10%OFF" },
  { minApps: 4, discount: 0.15, label: "4つ以上で15%OFF" },
  { minApps: 5, discount: 0.20, label: "5つ以上で20%OFF" },
  { minApps: 6, discount: 0.25, label: "6つ以上で25%OFF" },
];

const RECOMMENDED_SETS = [
  { name: "検査スタートセット", appIds: ["kensa"], tag: "まずはこれ" },
  { name: "業務効率化セット", appIds: ["kensa", "customer", "reservation"], tag: "人気" },
  { name: "集患強化セット", appIds: ["meo", "hp", "ad", "heatscope"], tag: "集患" },
  { name: "フルDXセット", appIds: APPS.map(a => a.id), tag: "最大割引" },
];

const FAQS = [
  {
    q: "パソコンが苦手でも使えますか？",
    a: "スマホだけでも操作できるシンプル設計です。導入時にZoomで画面共有しながら操作方法をお伝えするので、ご安心ください。オープンチャットで気軽に質問もできます。",
  },
  {
    q: "今使っている紙のカルテからデータを移行できますか？",
    a: "Excelやスプレッドシートにまとめていただければ、CSVで一括取り込みが可能です。移行作業のサポートも行います。",
  },
  {
    q: "途中で解約できますか？",
    a: "最低利用期間はありません。いつでも解約可能で、解約月の月末まで利用できます。",
  },
  {
    q: "途中でアプリを追加・削除できますか？",
    a: "いつでも追加・削除が可能です。変更は翌月から適用されます。",
  },
  {
    q: "患者情報のセキュリティは大丈夫ですか？",
    a: "SSL暗号化通信、データベースの暗号化、定期的なバックアップを実施しています。大手クラウドサービス（Supabase）上で運用しています。",
  },
  {
    q: "導入にどのくらい時間がかかりますか？",
    a: "アカウント発行は即日可能です。初期設定（メニュー登録・スタッフ登録など）を含めて、最短1日で利用開始できます。",
  },
  {
    q: "他の治療院管理ソフトとの違いは？",
    a: "大手ソフトは月額3万〜5万円が相場ですが、うちは月額1,980円から。治療院経営者が自ら開発したツールなので、現場で本当に必要な機能だけに絞っています。不要な機能で高い月額を払う必要がありません。",
  },
  {
    q: "開発者に直接相談できますか？",
    a: "オープンチャット「治療家のためのアプリ活用ラボ」で、開発者の大口に直接相談できます。要望や質問もすぐに対応します。",
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
  {
    name: "D整体院 院長",
    area: "大阪府",
    text: "MEO対策ツールで週10分の運用だけで、Googleマップからの問い合わせが増えました。コスパが良すぎます。",
    metric: "MEO経由問い合わせ 3倍",
  },
];

const getDiscount = (count: number) => {
  const rule = [...DISCOUNT_RULES].reverse().find(r => count >= r.minApps);
  return rule || DISCOUNT_RULES[0];
};

// ========== コンポーネント ==========

export default function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState("すべて");
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

  const [selectedApps, setSelectedApps] = useState<string[]>(["kensa"]);
  const [paymentType, setPaymentType] = useState<"monthly" | "onetime">("monthly");

  const [checkoutModal, setCheckoutModal] = useState(false);
  const [checkoutEmail, setCheckoutEmail] = useState("");
  const [checkoutClinicName, setCheckoutClinicName] = useState("");
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [checkoutError, setCheckoutError] = useState("");

  const filteredApps = activeCategory === "すべて"
    ? APPS
    : APPS.filter(app => app.category === activeCategory);

  const calcTotal = useMemo(() => {
    const selected = APPS.filter(app => selectedApps.includes(app.id));
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
      const appNames = APPS.filter(a => selectedApps.includes(a.id)).map(a => a.shortName).join(", ");
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

      {/* ===== ナビゲーション ===== */}
      <nav className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-b border-gray-100 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-sky-500 to-orange-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-black text-sm">C</span>
            </div>
            <span className="text-lg font-black tracking-tight text-gray-900">ClinicApps</span>
          </div>
          <div className="hidden md:flex items-center gap-6 text-sm text-gray-600">
            <a href="#apps" className="hover:text-sky-600 transition">アプリ一覧</a>
            <a href="#pricing" className="hover:text-sky-600 transition">料金</a>
            <a href="#developer" className="hover:text-sky-600 transition">開発者</a>
            <a href="#faq" className="hover:text-sky-600 transition">FAQ</a>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="https://line.me/ti/g2/QnF4ofqxEt-igFOVe393aZ3FqT5y92MPO2Treg"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-block text-sm font-bold text-sky-600 hover:text-sky-700 transition"
            >
              オープンチャット
            </a>
            <a
              href="#contact"
              className="bg-gradient-to-r from-sky-500 to-sky-600 text-white px-5 py-2 rounded-full text-sm font-bold hover:shadow-lg hover:shadow-sky-200 transition-all"
            >
              無料相談
            </a>
          </div>
        </div>
      </nav>

      {/* ===== ファーストビュー ===== */}
      <section className="pt-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-sky-50/50 to-orange-50/30"></div>
        <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-sky-100/40 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-orange-100/30 rounded-full blur-3xl"></div>

        <div className="relative max-w-5xl mx-auto px-4 py-16 md:py-24">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-white border border-gray-200 rounded-full px-4 py-1.5 mb-6 shadow-sm">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              <span className="text-xs font-medium text-gray-600">治療院・整体院・鍼灸院向け 業務アプリ</span>
            </div>

            <h1 className="text-3xl md:text-5xl lg:text-6xl font-black leading-tight mb-6 tracking-tight">
              <span className="text-gray-900">治療家が、自分の手で</span>
              <br />
              <span className="bg-gradient-to-r from-sky-600 to-sky-500 bg-clip-text text-transparent">院を変えられる時代が来た。</span>
            </h1>

            <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto leading-relaxed mb-4">
              現役の整体院経営者が、自分の現場で使うために開発した13のアプリ。
              <br className="hidden md:block" />
              検査・顧客管理・予約・問診・MEO・広告分析 ── 必要なものだけ選んで、月額1,980円から。
            </p>
            <p className="text-sm text-gray-400 mb-8">
              初期費用0円 / 最低利用期間なし / 最短即日で導入
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center mb-12">
              <a
                href="#apps"
                className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-sky-500 to-sky-600 text-white px-8 py-4 rounded-xl font-bold text-base hover:shadow-lg hover:shadow-sky-200 transition-all"
              >
                アプリ一覧を見る
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
              </a>
              <a
                href="https://line.me/ti/g2/QnF4ofqxEt-igFOVe393aZ3FqT5y92MPO2Treg"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-white text-gray-700 px-8 py-4 rounded-xl font-bold text-base border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all"
              >
                オープンチャットに参加する
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
              </a>
            </div>

            <div className="grid grid-cols-3 gap-6 max-w-md mx-auto">
              <div className="text-center">
                <p className="text-2xl md:text-3xl font-black text-sky-600">13</p>
                <p className="text-xs text-gray-500 mt-1">業務アプリ</p>
              </div>
              <div className="text-center">
                <p className="text-2xl md:text-3xl font-black text-sky-600">0円</p>
                <p className="text-xs text-gray-500 mt-1">初期費用</p>
              </div>
              <div className="text-center">
                <p className="text-2xl md:text-3xl font-black text-sky-600">即日</p>
                <p className="text-xs text-gray-500 mt-1">導入可能</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== こんな方におすすめ ===== */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-black text-center mb-3">
            こんな方におすすめです
          </h2>
          <p className="text-center text-gray-500 text-sm mb-10">
            一つでも当てはまるなら、きっと力になれます
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { text: "紙カルテの管理が大変で、患者情報を探すのに時間がかかる", label: "カルテ管理" },
              { text: "予約の電話対応に追われて、施術に集中できない", label: "予約管理" },
              { text: "リピート患者のフォローが後手に回ってしまう", label: "離反防止" },
              { text: "大手の管理ソフトは高くて手が出ない（月3万〜5万円）", label: "コスト" },
              { text: "Googleマップの順位を上げたいけど、何をすればいいかわからない", label: "MEO対策" },
              { text: "ITに詳しくないので、導入・運用が不安", label: "サポート" },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-4 bg-gray-50 p-5 rounded-xl border border-gray-100">
                <div className="flex-shrink-0 w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                  <svg className="w-4 h-4 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                  </svg>
                </div>
                <div>
                  <span className="text-xs font-bold text-orange-600 bg-orange-50 px-2 py-0.5 rounded">{item.label}</span>
                  <p className="text-sm text-gray-700 mt-1.5">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="text-center mt-8 text-base font-bold text-sky-600">
            これらの課題を、現場の治療家が作ったアプリで解決します
          </p>
        </div>
      </section>

      {/* ===== アプリ一覧 ===== */}
      <section id="apps" className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-black text-center mb-3">
            アプリ一覧
          </h2>
          <p className="text-center text-gray-500 text-sm mb-8">
            全13アプリ。必要なものだけ選んで導入できます。
          </p>

          {/* カテゴリフィルター */}
          <div className="flex gap-2 mb-8 overflow-x-auto pb-2 justify-center flex-wrap">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-bold transition border ${
                  activeCategory === cat
                    ? "bg-sky-600 text-white border-sky-600"
                    : "bg-white text-gray-600 border-gray-200 hover:border-sky-300"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* アプリカード */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredApps.map((app) => (
              <div
                key={app.id}
                className="bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-lg hover:border-sky-200 transition-all group"
              >
                {/* ヘッダー */}
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-sky-50 rounded-xl flex items-center justify-center text-sky-600 group-hover:bg-sky-100 transition">
                    {app.icon}
                  </div>
                  <span className="text-xs font-medium text-gray-400 bg-gray-50 px-2 py-1 rounded">{app.category}</span>
                </div>

                {/* 名前・説明 */}
                <h3 className="text-lg font-bold mb-2">{app.name}</h3>
                <p className="text-sm text-gray-500 leading-relaxed mb-4">{app.description}</p>

                {/* 主要機能 */}
                <ul className="space-y-2 mb-5">
                  {app.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                      <svg className="w-4 h-4 text-sky-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>

                {/* 料金 */}
                <div className="flex items-end justify-between pt-4 border-t border-gray-100">
                  <div>
                    <p className="text-xs text-gray-400">月額</p>
                    <p className="text-lg font-black text-gray-900">{app.monthlyPrice.toLocaleString()}<span className="text-xs font-normal text-gray-400">円/月</span></p>
                  </div>
                  {app.demoUrl ? (
                    <a
                      href={app.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-sm font-bold text-sky-600 hover:text-sky-700 transition"
                    >
                      デモを見る
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                    </a>
                  ) : (
                    <span className="text-sm text-gray-400">準備中</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 導入ステップ ===== */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-black text-center mb-3">
            導入の流れ
          </h2>
          <p className="text-center text-gray-500 text-sm mb-10">
            最短1日で利用開始できます
          </p>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              {
                step: "1",
                title: "まずは相談",
                desc: "オープンチャットかフォームからご連絡ください。無料でデモをお見せします。",
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
                  </svg>
                ),
              },
              {
                step: "2",
                title: "ヒアリング",
                desc: "院の課題や希望をヒアリングシートで伺い、最適なアプリを提案します。",
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                  </svg>
                ),
              },
              {
                step: "3",
                title: "初期設定",
                desc: "アカウント発行、院情報・メニュー・スタッフの登録。Zoomでサポートします。",
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                ),
              },
              {
                step: "4",
                title: "利用開始",
                desc: "すぐに使い始められます。困ったらオープンチャットでいつでも相談OK。",
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                  </svg>
                ),
              },
            ].map((s) => (
              <div key={s.step} className="text-center">
                <div className="w-14 h-14 bg-gradient-to-br from-sky-500 to-sky-600 text-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-sky-200">
                  {s.icon}
                </div>
                <div className="text-xs font-bold text-sky-600 mb-1">STEP {s.step}</div>
                <h3 className="font-bold text-base mb-2">{s.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <a
              href="https://hearing-sheet-six.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-orange-50 text-orange-700 border border-orange-200 px-6 py-3 rounded-xl font-bold text-sm hover:bg-orange-100 transition"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
              </svg>
              ヒアリングシートに回答する（所要時間 約3分）
            </a>
          </div>
        </div>
      </section>

      {/* ===== 導入実績・お客様の声 ===== */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-black text-center mb-3">
            導入院の声
          </h2>
          <p className="text-center text-gray-500 text-sm mb-10">
            モニター導入院からの実際の声です
          </p>
          <div className="grid md:grid-cols-2 gap-5">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-sky-100 rounded-full flex items-center justify-center">
                    <span className="text-sky-600 font-bold text-sm">{t.name.charAt(0)}</span>
                  </div>
                  <div>
                    <p className="font-bold text-sm">{t.name}</p>
                    <p className="text-xs text-gray-400">{t.area}</p>
                  </div>
                  <div className="ml-auto">
                    <span className="bg-sky-50 text-sky-700 text-xs font-bold px-3 py-1 rounded-full">{t.metric}</span>
                  </div>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">{t.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 開発者プロフィール ===== */}
      <section id="developer" className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-black text-center mb-3">
            開発者
          </h2>
          <p className="text-center text-gray-500 text-sm mb-10">
            現役の整体院経営者が、現場の課題を解決するために自ら開発しています
          </p>

          <div className="bg-gradient-to-br from-gray-50 to-sky-50/50 rounded-2xl border border-gray-100 p-8 md:p-10">
            <div className="md:flex md:gap-10 md:items-start">
              <div className="md:flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-sky-500 to-sky-600 rounded-2xl flex items-center justify-center text-white text-2xl font-black shadow-lg shadow-sky-200">
                    大
                  </div>
                  <div>
                    <h3 className="text-xl font-black">大口 陽平</h3>
                    <p className="text-sm text-gray-500">治療家プログラマー / 大阪在住</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-6">
                  <span className="text-xs font-bold bg-sky-100 text-sky-700 px-3 py-1 rounded-full">整体院経営者</span>
                  <span className="text-xs font-bold bg-orange-100 text-orange-700 px-3 py-1 rounded-full">アプリ開発者</span>
                  <span className="text-xs font-bold bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full">訪問鍼灸事業</span>
                  <span className="text-xs font-bold bg-violet-100 text-violet-700 px-3 py-1 rounded-full">治療機器導入支援</span>
                </div>

                <div className="space-y-3 mb-6">
                  {[
                    "大口神経整体院 院長。施術の傍ら、自分の現場の課題を解決するためにアプリ開発を開始",
                    "AIを活用し、2ヶ月で30以上のアプリを開発。すべて自分の院で実際に使って改善を重ねている",
                    "「大手のツールは高くて、使わない機能が多すぎる」と感じたのが開発のきっかけ",
                    "治療家として現場に立ちながら開発しているから、本当に必要な機能だけを作れる",
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3 text-sm text-gray-700">
                      <div className="w-1.5 h-1.5 bg-sky-500 rounded-full flex-shrink-0 mt-1.5"></div>
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              <div className="md:w-80">
                <div className="bg-white rounded-xl p-5 border border-gray-200">
                  <p className="text-sm text-gray-700 leading-relaxed">
                    「治療家が、自分の手で院を変えられる時代が来た。僕はそのためのツールを、現場の治療家として作り続ける。」
                  </p>
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <p className="text-xs text-gray-500 mb-3">一緒に現場を良くする仲間を募集しています</p>
                    <a
                      href="https://line.me/ti/g2/QnF4ofqxEt-igFOVe393aZ3FqT5y92MPO2Treg"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-center bg-gradient-to-r from-sky-500 to-sky-600 text-white py-2.5 rounded-lg font-bold text-sm hover:shadow-lg hover:shadow-sky-200 transition-all"
                    >
                      オープンチャットに参加する
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 料金プラン ===== */}
      <section id="pricing" className="py-16 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-black text-center mb-3">
            料金プラン
          </h2>
          <p className="text-center text-gray-500 text-sm mb-8">
            すべて初期費用0円・解約縛りなし。必要なアプリだけ選べます。
          </p>

          {/* おすすめセット */}
          <div className="flex gap-2 mb-8 overflow-x-auto pb-2 justify-center flex-wrap">
            {RECOMMENDED_SETS.map((set) => {
              const isActive = set.appIds.length === selectedApps.length &&
                set.appIds.every(id => selectedApps.includes(id));
              return (
                <button
                  key={set.name}
                  onClick={() => selectSet(set.appIds)}
                  className={`relative flex-shrink-0 px-5 py-2.5 rounded-full font-bold text-sm transition border-2 ${
                    isActive
                      ? "bg-sky-600 text-white border-sky-600 shadow-lg shadow-sky-200"
                      : "bg-white text-gray-600 border-gray-200 hover:border-sky-300"
                  }`}
                >
                  {set.tag === "人気" && (
                    <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-orange-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full whitespace-nowrap">
                      人気
                    </span>
                  )}
                  {set.tag === "最大割引" && (
                    <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-emerald-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full whitespace-nowrap">
                      最大割引
                    </span>
                  )}
                  {set.name}
                </button>
              );
            })}
          </div>

          {/* 支払い方法トグル */}
          <div className="flex justify-center mb-6">
            <div className="inline-flex bg-white rounded-xl p-1 border border-gray-200">
              <button
                onClick={() => setPaymentType("monthly")}
                className={`px-6 py-2.5 rounded-lg text-sm font-bold transition ${
                  paymentType === "monthly"
                    ? "bg-sky-600 text-white shadow-sm"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                月額サブスク
              </button>
              <button
                onClick={() => setPaymentType("onetime")}
                className={`px-6 py-2.5 rounded-lg text-sm font-bold transition ${
                  paymentType === "onetime"
                    ? "bg-sky-600 text-white shadow-sm"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                買い切り
              </button>
            </div>
          </div>

          {/* アプリ選択グリッド */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mb-8">
            {APPS.map((app) => {
              const isSelected = selectedApps.includes(app.id);
              return (
                <button
                  key={app.id}
                  onClick={() => toggleApp(app.id)}
                  className={`relative text-left p-4 rounded-xl border-2 transition-all ${
                    isSelected
                      ? "border-sky-500 bg-sky-50 shadow-md"
                      : "border-gray-200 bg-white hover:border-gray-300"
                  }`}
                >
                  <div className={`absolute top-2.5 right-2.5 w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all ${
                    isSelected
                      ? "bg-sky-600 border-sky-600"
                      : "border-gray-300 bg-white"
                  }`}>
                    {isSelected && (
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                  <div className="text-sky-600 mb-2">{app.icon}</div>
                  <h3 className="font-bold text-xs md:text-sm mb-1 pr-6">{app.shortName}</h3>
                  <p className={`text-xs font-bold ${isSelected ? "text-sky-700" : "text-gray-500"}`}>
                    {paymentType === "monthly"
                      ? `${app.monthlyPrice.toLocaleString()}円/月`
                      : `${app.onetimePrice.toLocaleString()}円`
                    }
                  </p>
                </button>
              );
            })}
          </div>

          {/* 計算エリア（PC） */}
          <div className="hidden md:block">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 max-w-lg mx-auto">
              {selectedApps.length === 0 ? (
                <p className="text-center text-gray-400 py-4">アプリを選択してください</p>
              ) : (
                <>
                  <div className="mb-4">
                    <p className="text-sm text-gray-500 mb-1">
                      選択中: {APPS.filter(a => selectedApps.includes(a.id)).map(a => a.shortName).join(", ")}（{selectedApps.length}アプリ）
                    </p>
                  </div>
                  <div className="border-t border-gray-100 pt-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">定価合計</span>
                      <span>{calcTotal.subtotal.toLocaleString()}円{paymentType === "monthly" ? "/月" : ""}</span>
                    </div>
                    {calcTotal.discount.discount > 0 && (
                      <div className="flex justify-between text-sm">
                        <span className="text-emerald-600 font-bold flex items-center gap-1">
                          <span className="bg-emerald-100 text-emerald-700 text-xs px-2 py-0.5 rounded-full">
                            {Math.round(calcTotal.discount.discount * 100)}%OFF
                          </span>
                          セット割引
                        </span>
                        <span className="text-emerald-600 font-bold">-{calcTotal.discountAmount.toLocaleString()}円</span>
                      </div>
                    )}
                  </div>
                  <div className="border-t-2 border-gray-900 mt-4 pt-4">
                    <div className="flex justify-between items-end">
                      <span className="font-bold text-lg">お支払い額</span>
                      <div className="text-right">
                        <span className="text-3xl font-black text-sky-600">
                          {calcTotal.total.toLocaleString()}
                        </span>
                        <span className="text-gray-500 text-sm">円{paymentType === "monthly" ? "/月（税込）" : "（税込・一括）"}</span>
                      </div>
                    </div>
                  </div>
                  {calcTotal.discount.label && (
                    <p className="text-xs text-emerald-600 text-right mt-1">{calcTotal.discount.label}</p>
                  )}
                  <div className="mt-6 space-y-2">
                    <button
                      onClick={() => {
                        setCheckoutModal(true);
                        setCheckoutError("");
                      }}
                      disabled={selectedApps.length === 0}
                      className="w-full py-3.5 rounded-xl font-bold transition bg-gradient-to-r from-sky-500 to-sky-600 text-white hover:shadow-lg hover:shadow-sky-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      今すぐ申し込む
                    </button>
                    <button
                      onClick={() => {
                        const appNames = APPS.filter(a => selectedApps.includes(a.id)).map(a => a.shortName).join(", ");
                        setContactForm({ ...contactForm, plan: `カスタム（${appNames}）` });
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

      {/* モバイル固定バー */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t shadow-[0_-4px_20px_rgba(0,0,0,0.1)] z-40 px-4 py-3">
        {selectedApps.length === 0 ? (
          <p className="text-center text-gray-400 text-sm py-1">アプリを選択してください</p>
        ) : (
          <div className="flex items-center justify-between gap-3">
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-xl font-black text-sky-600 whitespace-nowrap">
                  {calcTotal.total.toLocaleString()}円
                </span>
                <span className="text-xs text-gray-500 whitespace-nowrap">
                  {paymentType === "monthly" ? "/月" : "一括"}
                </span>
                {calcTotal.discount.discount > 0 && (
                  <span className="bg-emerald-100 text-emerald-700 text-[10px] font-bold px-1.5 py-0.5 rounded-full whitespace-nowrap">
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
              className="flex-shrink-0 bg-gradient-to-r from-sky-500 to-sky-600 text-white px-5 py-2.5 rounded-xl font-bold text-sm hover:shadow-lg transition"
            >
              申し込む
            </button>
          </div>
        )}
      </div>
      <div className="md:hidden h-20" />

      {/* ===== 他社比較 ===== */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-black text-center mb-3">
            他社サービスとの比較
          </h2>
          <p className="text-center text-gray-500 text-sm mb-10">
            治療院向けの主要ツールと比較しました
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left py-3 px-3"></th>
                  <th className="py-3 px-3 bg-sky-50 text-sky-700 font-bold rounded-t-lg">ClinicApps</th>
                  <th className="py-3 px-3 text-gray-500">大手A社</th>
                  <th className="py-3 px-3 text-gray-500">大手B社</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["月額料金", "1,980円〜", "30,000円〜", "50,000円〜"],
                  ["初期費用", "0円", "100,000円〜", "200,000円〜"],
                  ["アプリ数", "13種類（選択式）", "パッケージ固定", "パッケージ固定"],
                  ["顧客管理", "対応", "対応", "対応"],
                  ["予約管理", "対応", "対応", "対応"],
                  ["WEB問診", "対応", "有料オプション", "対応"],
                  ["MEO対策", "対応", "非対応", "非対応"],
                  ["スマホ対応", "完全対応", "一部のみ", "対応"],
                  ["最低利用期間", "なし", "12ヶ月", "6ヶ月"],
                  ["開発者への直接相談", "対応（オープンチャット）", "非対応", "非対応"],
                ].map((row, i) => (
                  <tr key={i} className="border-b border-gray-100">
                    <td className="py-3 px-3 font-medium text-gray-700">{row[0]}</td>
                    <td className="py-3 px-3 text-center bg-sky-50 font-bold text-sky-700">{row[1]}</td>
                    <td className="py-3 px-3 text-center text-gray-500">{row[2]}</td>
                    <td className="py-3 px-3 text-center text-gray-500">{row[3]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section id="faq" className="py-16 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-black text-center mb-3">
            よくある質問
          </h2>
          <p className="text-center text-gray-500 text-sm mb-10">
            導入前に気になるポイントをまとめました
          </p>
          <div className="space-y-3">
            {FAQS.map((faq, i) => (
              <div key={i} className="bg-white rounded-xl border border-gray-100">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full text-left px-6 py-4 flex items-center justify-between"
                >
                  <span className="font-bold text-sm pr-4">{faq.q}</span>
                  <span className={`text-gray-400 flex-shrink-0 transition-transform ${openFaq === i ? "rotate-45" : ""}`}>
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

      {/* ===== オープンチャット誘導 ===== */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-black mb-3">
            まずはオープンチャットで情報収集
          </h2>
          <p className="text-gray-500 text-sm mb-8 leading-relaxed">
            「治療家のためのアプリ活用ラボ」では、アプリの活用事例や導入のコツ、
            <br className="hidden md:block" />
            新機能の先行案内など、治療院経営に役立つ情報を発信しています。
            <br className="hidden md:block" />
            開発者の大口に直接質問・要望も出せます。
          </p>

          <div className="bg-gradient-to-br from-sky-50 to-orange-50 rounded-2xl border border-gray-200 p-8 mb-6">
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="w-12 h-12 bg-emerald-500 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" />
                </svg>
              </div>
              <div className="text-left">
                <p className="font-bold text-lg">治療家のためのアプリ活用ラボ</p>
                <p className="text-sm text-gray-500">LINE オープンチャット / 参加無料</p>
              </div>
            </div>
            <a
              href="https://line.me/ti/g2/QnF4ofqxEt-igFOVe393aZ3FqT5y92MPO2Treg"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-emerald-500 text-white px-8 py-3.5 rounded-xl font-bold text-base hover:bg-emerald-600 transition shadow-lg shadow-emerald-200"
            >
              オープンチャットに参加する（無料）
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
            </a>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="https://hearing-sheet-six.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 text-sm font-bold text-orange-600 bg-orange-50 border border-orange-200 px-6 py-3 rounded-xl hover:bg-orange-100 transition"
            >
              ヒアリングシートに回答する
            </a>
            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-2 text-sm font-bold text-sky-600 bg-sky-50 border border-sky-200 px-6 py-3 rounded-xl hover:bg-sky-100 transition"
            >
              Zoom実演会を申し込む
            </a>
          </div>
        </div>
      </section>

      {/* ===== お問い合わせ ===== */}
      <section id="contact" className="py-16 bg-gray-50">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-black text-center mb-3">
            無料デモ / お問い合わせ
          </h2>
          <p className="text-center text-gray-500 text-sm mb-8">
            まずはデモをご覧ください。無理な営業は一切しません。
          </p>

          {submitted ? (
            <div className="bg-sky-50 rounded-2xl p-8 text-center border border-sky-100">
              <div className="w-16 h-16 bg-sky-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-sky-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">お問い合わせありがとうございます</h3>
              <p className="text-gray-600 text-sm">1営業日以内にご連絡させていただきます。</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-gray-100 p-6 md:p-8 space-y-5">
              <div>
                <label className="text-sm font-bold text-gray-700">院名 <span className="text-red-500">*</span></label>
                <input
                  required
                  value={contactForm.clinicName}
                  onChange={(e) => setContactForm({ ...contactForm, clinicName: e.target.value })}
                  placeholder="例: 大口整骨院"
                  className="w-full mt-1.5 px-4 py-3 border border-gray-200 rounded-lg text-sm focus:border-sky-500 focus:ring-2 focus:ring-sky-100 outline-none transition"
                />
              </div>
              <div>
                <label className="text-sm font-bold text-gray-700">お名前 <span className="text-red-500">*</span></label>
                <input
                  required
                  value={contactForm.name}
                  onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                  placeholder="例: 山田 太郎"
                  className="w-full mt-1.5 px-4 py-3 border border-gray-200 rounded-lg text-sm focus:border-sky-500 focus:ring-2 focus:ring-sky-100 outline-none transition"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-bold text-gray-700">メールアドレス <span className="text-red-500">*</span></label>
                  <input
                    type="email"
                    required
                    value={contactForm.email}
                    onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                    placeholder="info@example.com"
                    className="w-full mt-1.5 px-4 py-3 border border-gray-200 rounded-lg text-sm focus:border-sky-500 focus:ring-2 focus:ring-sky-100 outline-none transition"
                  />
                </div>
                <div>
                  <label className="text-sm font-bold text-gray-700">電話番号</label>
                  <input
                    value={contactForm.phone}
                    onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                    placeholder="090-1234-5678"
                    className="w-full mt-1.5 px-4 py-3 border border-gray-200 rounded-lg text-sm focus:border-sky-500 focus:ring-2 focus:ring-sky-100 outline-none transition"
                  />
                </div>
              </div>
              <div>
                <label className="text-sm font-bold text-gray-700">ご希望プラン</label>
                <select
                  value={contactForm.plan}
                  onChange={(e) => setContactForm({ ...contactForm, plan: e.target.value })}
                  className="w-full mt-1.5 px-4 py-3 border border-gray-200 rounded-lg text-sm focus:border-sky-500 focus:ring-2 focus:ring-sky-100 outline-none transition"
                >
                  <option value="">未定・相談したい</option>
                  {RECOMMENDED_SETS.map((s) => (
                    <option key={s.name} value={s.name}>{s.name}</option>
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
                  className="w-full mt-1.5 px-4 py-3 border border-gray-200 rounded-lg text-sm focus:border-sky-500 focus:ring-2 focus:ring-sky-100 outline-none transition"
                />
              </div>
              {submitError && (
                <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg">{submitError}</div>
              )}
              <button
                type="submit"
                disabled={submitting}
                className="w-full py-4 bg-gradient-to-r from-sky-500 to-sky-600 text-white rounded-xl font-bold text-base hover:shadow-lg hover:shadow-sky-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
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

      {/* ===== Checkout Modal ===== */}
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
            <div className="bg-gray-50 rounded-xl p-4 mb-5 text-sm">
              <p className="text-gray-500 mb-2">選択中のアプリ（{selectedApps.length}つ）</p>
              <div className="flex flex-wrap gap-1.5 mb-3">
                {APPS.filter(a => selectedApps.includes(a.id)).map(a => (
                  <span key={a.id} className="bg-sky-100 text-sky-700 text-xs font-bold px-2 py-1 rounded-full">
                    {a.shortName}
                  </span>
                ))}
              </div>
              <div className="border-t border-gray-200 pt-2 flex justify-between items-end">
                <span className="text-gray-500">お支払い額</span>
                <div>
                  <span className="text-xl font-black text-sky-600">{calcTotal.total.toLocaleString()}円</span>
                  <span className="text-gray-500 text-xs">{paymentType === "monthly" ? "/月" : "（一括）"}</span>
                </div>
              </div>
              {calcTotal.discount.discount > 0 && (
                <p className="text-emerald-600 text-xs text-right mt-1">{calcTotal.discount.label}適用中</p>
              )}
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-bold text-gray-700">院名 <span className="text-red-500">*</span></label>
                <input
                  value={checkoutClinicName}
                  onChange={(e) => setCheckoutClinicName(e.target.value)}
                  placeholder="例: 大口整骨院"
                  className="w-full mt-1.5 px-4 py-3 border border-gray-200 rounded-lg text-sm focus:border-sky-500 focus:ring-2 focus:ring-sky-100 outline-none transition"
                />
              </div>
              <div>
                <label className="text-sm font-bold text-gray-700">メールアドレス <span className="text-red-500">*</span></label>
                <input
                  type="email"
                  value={checkoutEmail}
                  onChange={(e) => setCheckoutEmail(e.target.value)}
                  placeholder="info@example.com"
                  className="w-full mt-1.5 px-4 py-3 border border-gray-200 rounded-lg text-sm focus:border-sky-500 focus:ring-2 focus:ring-sky-100 outline-none transition"
                />
              </div>
              {checkoutError && (
                <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg">{checkoutError}</div>
              )}
              <button
                onClick={handleCheckout}
                disabled={checkoutLoading}
                className="w-full py-3.5 bg-gradient-to-r from-sky-500 to-sky-600 text-white rounded-xl font-bold hover:shadow-lg hover:shadow-sky-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {checkoutLoading ? "処理中..." : "決済に進む"}
              </button>
              <p className="text-xs text-gray-400 text-center">Stripeの安全な決済画面に移動します</p>
            </div>
          </div>
        </div>
      )}

      {/* ===== フッター ===== */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="max-w-5xl mx-auto px-4">
          <div className="md:flex md:justify-between md:items-start mb-8">
            <div className="mb-6 md:mb-0">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 bg-gradient-to-br from-sky-500 to-orange-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-black text-sm">C</span>
                </div>
                <span className="text-lg font-black text-white">ClinicApps</span>
              </div>
              <p className="text-sm text-gray-500 max-w-xs">
                治療院・整体院・鍼灸院向けの業務アプリ。
                現役の整体院経営者が自ら開発・提供しています。
              </p>
            </div>
            <div className="grid grid-cols-2 gap-8 text-sm">
              <div>
                <p className="text-white font-bold mb-3">サービス</p>
                <div className="space-y-2">
                  <a href="#apps" className="block hover:text-white transition">アプリ一覧</a>
                  <a href="#pricing" className="block hover:text-white transition">料金プラン</a>
                  <a href="#developer" className="block hover:text-white transition">開発者</a>
                  <a href="#faq" className="block hover:text-white transition">よくある質問</a>
                </div>
              </div>
              <div>
                <p className="text-white font-bold mb-3">リンク</p>
                <div className="space-y-2">
                  <a href="https://line.me/ti/g2/QnF4ofqxEt-igFOVe393aZ3FqT5y92MPO2Treg" target="_blank" rel="noopener noreferrer" className="block hover:text-white transition">オープンチャット</a>
                  <a href="https://hearing-sheet-six.vercel.app" target="_blank" rel="noopener noreferrer" className="block hover:text-white transition">ヒアリングシート</a>
                  <a href="#contact" className="block hover:text-white transition">お問い合わせ</a>
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-6">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3">
              <div className="flex gap-4 text-xs text-gray-500">
                <a href="/legal/tokushoho" className="hover:text-white transition">特定商取引法に基づく表記</a>
                <a href="/legal/terms" className="hover:text-white transition">利用規約</a>
                <a href="/legal/privacy" className="hover:text-white transition">プライバシーポリシー</a>
              </div>
              <p className="text-xs text-gray-500">
                運営: 大口神経整体院 / AI Solutions
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
