// ============================================================
// ClinicMark 利用者の声・開発実績の声 一元管理
//
// kind='product' … ClinicMark自社アプリ（カラダマップ/Clinic Core/MEO等）の利用者
// kind='custom'  … オーダーメイド開発の実績（受託で作ったアプリの利用者）
//
// 1エントリで複数アプリ（targetApps）に対応可能。
// 声が届いたらこのファイルに追記するだけで、総合LP・個別LP・開発実績セクションへ自動反映。
// ============================================================

export type Industry =
  | "整体院"
  | "鍼灸院"
  | "接骨院"
  | "サロン"
  | "飲食"
  | "美容"
  | "その他";

export type Testimonial = {
  id: string;                    // 重複防止の識別子（例: "yamaguchi-2026"）
  kind: "product" | "custom";

  // ─── 共通 ───
  displayName: string;           // 表示名（実名 or イニシャル or 仮名）
  role: string;                  // 院長 / オーナー / 代表 など
  photoUrl?: string;             // 顔写真URL（許諾OKの場合のみ）
  initial?: string;              // photoUrlが無い時のアバター文字（指定なければdisplayName先頭1文字）
  industryLabel?: Industry;
  location?: string;             // 大阪市 / 東京都 など

  shortText: string;             // 総合LP用 1〜2行

  // 個別LPの「導入事例」カード用（あれば表示）
  detail?: {
    background: string;          // 導入前の課題
    points: string[];            // 効果の箇条書き（推奨3つ）
    quote: string;               // 推薦の一言
  };

  // ─── kind='product' のみ ───
  targetApps?: string[];         // ['kensa', 'customer', 'meo', 'monshin'] など
  showOnGeneral?: boolean;       // 総合LPの「導入院の声」に出すか

  // ─── kind='custom' のみ ───
  customAppName?: string;        // 「MOGUツール」「recipe-influencer-ops」など
  customAppCategory?: string;    // 「治療家向け」「飲食店向け」など
  developedYear?: number;        // 受託年（時系列表示に使用）

  // 掲載許諾の記録（運用管理用・表示には使わない）
  permission?: {
    name?: boolean;              // 実名OK
    clinicName?: boolean;        // 院名・社名OK
    photo?: boolean;             // 顔写真OK
    location?: boolean;          // 地域OK
  };
};

// ============================================================
// データ本体
// ※ 順番＝LP表示の優先順（先に書いた方が上に出る）
// ============================================================
export const TESTIMONIALS: Testimonial[] = [
  // ─── ClinicMark自社アプリの声 ───
  {
    id: "yamaguchi-clinic-core",
    kind: "product",
    displayName: "山口先生",
    role: "院長",
    industryLabel: "鍼灸院",
    shortText:
      "AI離反予測・音声入力で時短。過去データも移行できて、毎日の入力負担が激減した。",
    detail: {
      background:
        "以前は別の顧客管理システムを使っていたが、打ち込みが面倒で負担になっていた。Clinic Coreに乗り換えて変わったこと：",
      points: [
        "AIが離反しそうな方やリピート率、前月比を自動計算して常に表示",
        "音声による一括入力でめちゃくちゃ時短",
        "過去のデータも移行できた",
      ],
      quote:
        "顧客管理に手間がかかると感じている方や、数字をすぐに把握したい先生におすすめです。",
    },
    targetApps: ["customer"],
    showOnGeneral: true,
    permission: { name: true, clinicName: false, photo: false, location: false },
  },
  {
    id: "setoguchi-clinic-core",
    kind: "product",
    displayName: "瀬戸口 慧",
    role: "セトグチ神経整体院 院長 / コンサル",
    photoUrl: "/images/voices/setoguchi.jpg",
    industryLabel: "整体院",
    location: "大阪市平野区",
    shortText:
      "元の電子カルテの1/3の金額・カスタマイズ性が高い。わざわざ調べる手間が省けて、仕事の効率が一気に上がりました。",
    detail: {
      background:
        "元々使っていた電子カルテよりも1/3の金額で利用できて、尚且つカスタマイズ性が高いのでClinic Coreに移行。整体院・コンサル・広告運用と複数事業を回す中で、すぐ数字が見える環境が必要でした。",
      points: [
        "電子カルテの費用が約1/3に",
        "カスタマイズ性が高く、現場に合わせて使える",
        "わざわざ調べる手間が省けて、仕事の効率が上がった",
      ],
      quote:
        "1人では思いつくことができなかった新しい視点で提案して頂けるので、アナログな作業を抱えてる人にかなりオススメです。",
    },
    targetApps: ["customer"],
    showOnGeneral: true,
    permission: { name: true, clinicName: true, photo: true, location: true },
  },
  {
    id: "nakashotani-clinic-core",
    kind: "product",
    displayName: "中庄谷先生",
    role: "院長",
    industryLabel: "整体院",
    shortText:
      "月14,000円→5,500円に。見たい数字が一瞬で出せて、経営の自己分析が回るようになった。",
    detail: {
      background:
        "以前は有料の月14,000円の顧客管理システムを利用していたが、毎月の固定費負担と「見たい数字を一瞬で出せない」ことが課題だった。Clinic Coreに乗り換えて変わったこと：",
      points: [
        "月14,000円から5,500円に固定費を大幅削減",
        "見たい数字が一瞬で出せて、分析の時短ができる",
        "毎月の数字統計を見ながら自己分析を回せている",
      ],
      quote:
        "自院の経営設計がどんぶり勘定になっている先生で、数字分析をしっかりして理想の治療院経営をしたい方におすすめです。",
    },
    targetApps: ["customer"],
    showOnGeneral: true,
    permission: { name: true, clinicName: false, photo: false, location: false },
  },

  {
    id: "oguri-meo",
    kind: "product",
    displayName: "小栗 純平",
    role: "栄整治療院 院長",
    photoUrl: "/images/voices/oguri.jpg",
    industryLabel: "整体院",
    shortText:
      "投稿にかかる時間が大幅削減。伝えたいことをAIがサポートしてくれるから非常に助かっています。",
    detail: {
      background:
        "MEOを強化し、投稿頻度を上げていきたいが、有効的な一手がイマイチ分からなかった。",
      points: [
        "投稿にかかる時間が大幅に削減",
        "伝えたいことをAIがサポートしてくれる",
        "投稿頻度を継続して上げられる",
      ],
      quote:
        "MEOに時間をかけている方は取り入れて活用してみてください！！",
    },
    targetApps: ["meo"],
    showOnGeneral: true,
    permission: { name: true, clinicName: true, photo: true, location: false },
  },
  {
    id: "yamashita-kensa-clinic-core",
    kind: "product",
    displayName: "山下 将太",
    role: "柏原尚門館整骨院 柔道整復師",
    photoUrl: "/images/voices/yamashita.jpg",
    industryLabel: "接骨院",
    location: "大阪府柏原市",
    shortText:
      "マップに入力するだけで、患者さんへの身体の説明と治療の見える化が一気にラクに。初診時の説明に困っている先生におすすめです。",
    detail: {
      background:
        "患者さんに伝える時の身体の状態や治療の説明が、口頭だけだとうまく伝わらず困っていた。カラダマップとClinic Coreを併用して変わったこと：",
      points: [
        "マップに入力するだけで歪みや原因となる場所が見える化できる",
        "初診時の問診や身体の説明がスムーズに",
        "顧客管理と説明ツールが連携して現場が回しやすい",
      ],
      quote:
        "初診時の問診や身体の説明に困っている先生はぜひ導入をお勧めします！",
    },
    targetApps: ["kensa", "customer"],
    showOnGeneral: true,
    permission: { name: true, clinicName: true, photo: true, location: true },
  },
  {
    id: "nakakoshi-kensa-meo",
    kind: "product",
    displayName: "中越 俊兵",
    role: "Only One整骨院 院長",
    photoUrl: "/images/voices/nakakoshi.jpg",
    industryLabel: "接骨院",
    location: "愛媛県",
    shortText:
      "ブログの手間がゼロに。施術で困った時にもマップで助けてもらえる。費用対効果はバッチリです。",
    detail: {
      background:
        "ブログ等の投稿は手間がかかるため頻度が低く、キーワード対策もできずただ投稿するだけだった。スタッフが施術で困った時の判断や、患者さんへの説明も感覚頼りになっていた。",
      points: [
        "ブログ投稿の手間がゼロになり、noteにも展開できた",
        "勝ちあげくんのキーワード対策で投稿が意味のあるものに",
        "カラダマップで施術判断と患者説明が見える化できた",
      ],
      quote:
        "費用対効果はバッチリです。",
    },
    targetApps: ["kensa", "meo"],
    showOnGeneral: true,
    permission: { name: true, clinicName: true, photo: true, location: true },
  },

  // ─── オーダーメイド開発の声（kind='custom'）───
  {
    id: "setoguchi-salon-academy",
    kind: "custom",
    displayName: "瀬戸口 慧",
    role: "セトグチ神経整体院 院長 / コンサル",
    photoUrl: "/images/voices/setoguchi.jpg",
    industryLabel: "整体院",
    location: "大阪市平野区",
    shortText:
      "コンサル生の売上・新規数・成約率・CPAなど、見たい数字が管理画面で一括管理できるように。キャパが圧倒的に増えました。",
    detail: {
      background:
        "コンサル業務で、受講生ごとの売上・新規数・成約率・CPAなど、経営上確認したい数字や受講生の行動量が散らばっていて、把握に時間がかかっていました。",
      points: [
        "コンサル生ごとの数字を管理画面で一括管理",
        "成約率・CPA・行動量を可視化",
        "自分自身のキャパが増えた",
      ],
      quote:
        "現場を良く知る先生自ら作っているから信頼できる。アナログな作業を抱えてる人にかなりオススメです。",
    },
    customAppName: "サロン経営アカデミー（コンサル用管理プラットフォーム）",
    customAppCategory: "コンサル業向け",
    developedYear: 2026,
    permission: { name: true, clinicName: true, photo: true, location: true },
  },
  {
    id: "kawabata-houmon-2026",
    kind: "custom",
    displayName: "川畑 大地",
    role: "遊楽マッサージ 代表",
    photoUrl: "/images/voices/kawabata.jpg",
    industryLabel: "鍼灸院",
    shortText:
      "手書きでしていた書類がワンクリックで完成。手間を半分以上削減できて、現場に向き合える時間が圧倒的に増えました。",
    detail: {
      background:
        "訪問鍼灸の現場で、書類作業に時間を取られていた。AIを使った業務フロー管理アプリを開発依頼しました。",
      points: [
        "手書きでしていた書類がワンクリックで完成",
        "書類業務の手間を半分以上削減",
        "現場に向き合える時間が圧倒的に増えた",
      ],
      quote:
        "業界でもAIに精通されていて信頼できた。皆さんも、AI導入すべきです。圧倒的に現場に向き合える時間がふえます。",
    },
    customAppName: "訪問鍼灸業務フロー管理アプリ",
    customAppCategory: "治療家向け（訪問鍼灸）",
    developedYear: 2026,
    permission: { name: true, clinicName: true, photo: true, location: false },
  },
  {
    id: "shimizu-ccure-2026",
    kind: "custom",
    displayName: "清水 亮太",
    role: "三宮元町鍼灸整体院C-cure 院長",
    photoUrl: "/images/voices/shimizu.jpg",
    industryLabel: "鍼灸院",
    location: "神戸",
    shortText:
      "頭痛ダイアリー・WEB問診票・頭痛診断の3本を開発依頼。患者の日々の小さな変化に気づきやすくなりました。",
    detail: {
      background:
        "頭痛専門の治療院として、患者の症状変化を継続的に把握したい・問診を効率化したい・頭痛タイプを正確に分類したいという3つの課題を抱えていた。3アプリを連携した運用へ：",
      points: [
        "頭痛ダイアリーで患者の日々の変化を継続的に追える",
        "WEB問診票で初診の聞き取りを自動化",
        "頭痛診断で症状の分類が一瞬で完了",
      ],
      quote:
        "マーケティングや患者満足度の向上など治療以外の仕事が増えてしまった昨今の治療業界で、今こそアプリを導入して自動化出来る部分は自動化して治療に専念するべきです！",
    },
    customAppName: "頭痛ダイアリー / WEB問診票 / 頭痛診断（3アプリ連携）",
    customAppCategory: "頭痛専門治療院向け",
    developedYear: 2026,
    permission: { name: true, clinicName: true, photo: true, location: true },
  },
  {
    id: "ing-trekuri-2026",
    kind: "custom",
    displayName: "株式会社ING 代表",
    role: "療術業",
    photoUrl: "/images/voices/ing.jpg",
    location: "和歌山",
    shortText:
      "リピート・LTV・患者さんの反応がすべて良くなった。自院の『強み』をアプリで再現したい方におすすめです。",
    detail: {
      background:
        "アプリを作ろうと思った時に、相談先として真っ先に大口先生が浮かんだ。自院の強みをそのままアプリに落とし込みたかった。",
      points: [
        "リピート率が向上",
        "LTV（顧客生涯価値）が向上",
        "患者さんの反応が良くなった",
      ],
      quote:
        "これからの時代、治療院各々が自院でできることのいわゆる『強み』をさらに前面にだしていかないといけない時代になってます。『強み』をアプリで再現したい方はぜひ大口先生に頼んでみてください。",
    },
    customAppName: "トレクリ（治療院向けトレーニング管理アプリ・共同開発）",
    customAppCategory: "治療家向け（トレーニング連携）",
    developedYear: 2026,
    permission: { name: false, clinicName: true, photo: true, location: true },
  },
];

// ============================================================
// 取り出しヘルパー
// ============================================================
export function getGeneralProductVoices(): Testimonial[] {
  return TESTIMONIALS.filter((t) => t.kind === "product" && t.showOnGeneral);
}

export function getAppVoices(appId: string): Testimonial[] {
  return TESTIMONIALS.filter(
    (t) => t.kind === "product" && (t.targetApps || []).includes(appId)
  );
}

export function getCustomVoices(): Testimonial[] {
  return TESTIMONIALS.filter((t) => t.kind === "custom");
}
