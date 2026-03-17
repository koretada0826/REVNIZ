// ========== Fan Lab Mock Data ==========

export interface VerificationMenu {
  id: string;
  name: string;
  category: string;
  summary: string;
  targetIndustry: string[];
  location: string;
  dataPoints: string[];
  icon: string;
}

export interface Experiment {
  id: string;
  title: string;
  date: string;
  deadline: string;
  location: string;
  category: string;
  targetAudience: string;
  dataAvailable: string[];
  spotsTotal: number;
  spotsFilled: number;
  status: "open" | "closing" | "closed";
}

export interface Report {
  id: string;
  title: string;
  category: string;
  date: string;
  format: string;
  participants: number;
  responses: number;
  summary: string;
  highlights: string[];
  industry: string;
}

export interface CaseStudy {
  id: string;
  company: string;
  industry: string;
  background: string;
  method: string;
  result: string;
  comment: string;
  nextAction: string;
  category: string;
}

export interface ConsultationHistory {
  id: string;
  title: string;
  status: "new" | "hearing" | "designing" | "confirmed" | "done" | "reported";
  createdAt: string;
  updatedAt: string;
  adminComment?: string;
}

export const verificationMenus: VerificationMenu[] = [
  {
    id: "menu-1",
    name: "試食・試飲サンプリング",
    category: "食品・飲料",
    summary: "ホームゲーム来場者に新商品を試食・試飲してもらい、味評価・購入意向・改善点を回収する実証メニュー。",
    targetIndustry: ["食品メーカー", "飲料メーカー", "菓子メーカー"],
    location: "会場コンコース・ブースエリア",
    dataPoints: ["味評価スコア", "購入意向率", "価格感", "改善コメント", "属性別反応"],
    icon: "🍽️",
  },
  {
    id: "menu-2",
    name: "QRアンケート調査",
    category: "アンケート・調査",
    summary: "QRコードを活用したアンケートで、商品認知・利用意向・ブランドイメージなどを定量的に取得する。",
    targetIndustry: ["全業種対応"],
    location: "会場内 / オンライン",
    dataPoints: ["認知率", "利用意向", "NPS", "自由記述", "属性クロス集計"],
    icon: "📊",
  },
  {
    id: "menu-3",
    name: "会場体験ブース",
    category: "体験企画",
    summary: "来場者にサービスや製品を実際に体験してもらい、興味度・登録率・滞在時間を計測する。",
    targetIndustry: ["IT・アプリ", "サービス業", "小売業"],
    location: "会場特設ブース",
    dataPoints: ["体験者数", "滞在時間", "登録率", "興味度スコア", "年代別反応"],
    icon: "🎯",
  },
  {
    id: "menu-4",
    name: "クーポン配布・来店検証",
    category: "会場導線・販促",
    summary: "来場者にクーポンを配布し、実際の来店率・利用率・購買行動を追跡する。",
    targetIndustry: ["小売業", "飲食店", "サービス業"],
    location: "会場配布 + 店舗回収",
    dataPoints: ["配布数", "利用率", "来店率", "客単価変化", "リピート率"],
    icon: "🎟️",
  },
  {
    id: "menu-5",
    name: "ファンクラブ先行モニター",
    category: "IT・アプリ",
    summary: "ファンクラブ会員を対象に、新サービスの先行体験・フィードバック収集を行う。",
    targetIndustry: ["IT・アプリ", "SaaS", "サブスク"],
    location: "オンライン / アプリ内",
    dataPoints: ["登録率", "継続率", "UIフィードバック", "推奨度", "離脱理由"],
    icon: "👥",
  },
  {
    id: "menu-6",
    name: "サービス説明会・体験登録",
    category: "体験企画",
    summary: "会場内でサービス概要の説明会を開催し、興味層の可視化と体験申込を促進する。",
    targetIndustry: ["SaaS", "保険", "金融", "教育"],
    location: "会場ラウンジ・特設エリア",
    dataPoints: ["参加者数", "申込率", "質問内容", "興味度分布", "フォロー希望率"],
    icon: "🎤",
  },
  {
    id: "menu-7",
    name: "来場導線観察型テスト",
    category: "会場導線・販促",
    summary: "会場内の導線設計を変更し、来場者の行動パターンや立ち寄り率の変化を観察する。",
    targetIndustry: ["広告代理店", "デザイン", "メーカー"],
    location: "会場全域",
    dataPoints: ["立ち寄り率", "導線別滞在時間", "視認率", "行動パターン", "接触率変化"],
    icon: "🗺️",
  },
];

export const experiments: Experiment[] = [
  {
    id: "exp-1",
    title: "3月ホームゲーム 試食サンプリング枠",
    date: "2026-03-22",
    deadline: "2026-03-15",
    location: "白波スタジアム コンコースB",
    category: "食品・飲料",
    targetAudience: "来場者全般（推定3,000〜5,000名）",
    dataAvailable: ["味評価", "購入意向", "属性別反応"],
    spotsTotal: 3,
    spotsFilled: 1,
    status: "open",
  },
  {
    id: "exp-2",
    title: "ファンクラブ向け先行モニター募集",
    date: "2026-03-01〜03-31",
    deadline: "2026-03-10",
    location: "オンライン",
    category: "IT・アプリ",
    targetAudience: "ファンクラブ会員（約2,000名）",
    dataAvailable: ["登録率", "UI評価", "継続利用意向"],
    spotsTotal: 2,
    spotsFilled: 1,
    status: "closing",
  },
  {
    id: "exp-3",
    title: "会場体験ブース 4月開催枠",
    date: "2026-04-12",
    deadline: "2026-03-28",
    location: "白波スタジアム 特設エリア",
    category: "体験企画",
    targetAudience: "来場者（ファミリー層中心）",
    dataAvailable: ["体験者数", "興味度", "登録率"],
    spotsTotal: 2,
    spotsFilled: 0,
    status: "open",
  },
  {
    id: "exp-4",
    title: "QRアンケート 3月実施枠",
    date: "2026-03-22",
    deadline: "2026-03-18",
    location: "会場内各所",
    category: "アンケート・調査",
    targetAudience: "来場者全般",
    dataAvailable: ["認知率", "NPS", "属性クロス"],
    spotsTotal: 4,
    spotsFilled: 3,
    status: "closing",
  },
];

export const reports: Report[] = [
  {
    id: "report-1",
    title: "新商品プロテインバー試食テスト結果",
    category: "食品・飲料",
    date: "2026-02-15",
    format: "試食サンプリング",
    participants: 342,
    responses: 298,
    summary: "20-30代男性で購入意向が最も高く（78%）、味評価は5段階中4.2。改善点として「もう少し甘さ控えめ」が最多。",
    highlights: ["購入意向78%（20代男性）", "味評価4.2/5.0", "リピート意向65%", "価格感「妥当」62%"],
    industry: "食品メーカー",
  },
  {
    id: "report-2",
    title: "家計簿アプリ体験登録導線テスト",
    category: "IT・アプリ",
    date: "2026-02-08",
    format: "会場体験ブース",
    participants: 156,
    responses: 134,
    summary: "ファミリー層の登録率が想定以上（32%）。QR動線を変更した後半の方が登録率が12pt向上。",
    highlights: ["登録率32%", "QR位置変更で+12pt", "30代女性の反応が最高", "操作性評価4.0/5.0"],
    industry: "IT・アプリ",
  },
  {
    id: "report-3",
    title: "地域スーパー来店クーポン利用率調査",
    category: "会場導線・販促",
    date: "2026-01-25",
    format: "クーポン配布",
    participants: 1200,
    responses: 89,
    summary: "クーポン利用率7.4%。30代ファミリー層の利用が最多。来場後3日以内の利用が全体の68%。",
    highlights: ["利用率7.4%", "3日以内利用68%", "客単価+340円", "30代ファミリー最多"],
    industry: "小売業",
  },
];

export const caseStudies: CaseStudy[] = [
  {
    id: "case-1",
    company: "鹿児島フーズ株式会社",
    industry: "食品メーカー",
    background: "新商品のプロテインバーを開発中。20-30代の反応を確認したいが、試食イベントの企画・運営が自社では難しかった。",
    method: "ホームゲーム来場者約350名に試食を実施。QRアンケートで味評価・購入意向・改善点を回収。",
    result: "購入意向78%。「甘さ控えめ」の要望を反映し、商品設計を微修正。発売後の初月売上が当初計画比120%。",
    comment: "自社だけではリーチできなかった20代男性層からリアルな声を集められた。レポートの整理が実務に直結した。",
    nextAction: "次シーズンに味バリエーション追加の検証を実施予定。",
    category: "食品・飲料",
  },
  {
    id: "case-2",
    company: "テックスタート株式会社",
    industry: "IT・アプリ",
    background: "家計簿アプリの新機能リリース前に、実際のファミリー層での操作性と登録導線をテストしたかった。",
    method: "会場体験ブースで156名が体験。前半・後半でQR掲示位置を変更し、導線ごとの登録率を比較。",
    result: "QR位置を来場導線上に移動した後半で登録率が12pt向上。30代女性の操作性評価が最高スコア。",
    comment: "A/Bテストを会場で実施できるとは思っていなかった。次のUI改善の優先順位が明確になった。",
    nextAction: "ファンクラブ会員向けのベータテストを実施予定。",
    category: "IT・アプリ",
  },
];

export const audienceData = {
  totalVisitors: 85000,
  avgPerGame: 4200,
  fanclubMembers: 2100,
  annualGames: 21,
  demographics: {
    age: [
      { label: "10代", pct: 8 },
      { label: "20代", pct: 22 },
      { label: "30代", pct: 28 },
      { label: "40代", pct: 24 },
      { label: "50代以上", pct: 18 },
    ],
    gender: [
      { label: "男性", pct: 58 },
      { label: "女性", pct: 42 },
    ],
    type: [
      { label: "ファミリー", pct: 35 },
      { label: "友人・グループ", pct: 30 },
      { label: "カップル", pct: 18 },
      { label: "単身", pct: 17 },
    ],
  },
};

export const calendarEvents = [
  { id: "cal-1", date: "2026-03-08", title: "ホームゲーム vs FC東京", type: "game", slots: [{ name: "試食枠", available: 2 }, { name: "ブース枠", available: 1 }] },
  { id: "cal-2", date: "2026-03-22", title: "ホームゲーム vs 横浜FM", type: "game", slots: [{ name: "試食枠", available: 1 }, { name: "QR調査枠", available: 2 }] },
  { id: "cal-3", date: "2026-04-05", title: "ファンクラブイベント", type: "event", slots: [{ name: "モニター枠", available: 3 }] },
  { id: "cal-4", date: "2026-04-12", title: "ホームゲーム vs 鹿島", type: "game", slots: [{ name: "試食枠", available: 2 }, { name: "ブース枠", available: 2 }, { name: "導線テスト枠", available: 1 }] },
  { id: "cal-5", date: "2026-04-26", title: "ホームゲーム vs 名古屋", type: "game", slots: [{ name: "試食枠", available: 3 }, { name: "QR調査枠", available: 2 }] },
];

export const consultationHistories: ConsultationHistory[] = [
  { id: "hist-1", title: "新商品プロテインバー試食テスト", status: "reported", createdAt: "2026-01-10", updatedAt: "2026-02-15", adminComment: "レポート返却済み。次回施策のご相談もお待ちしております。" },
  { id: "hist-2", title: "会場ブースでのサービス体験企画", status: "designing", createdAt: "2026-02-28", updatedAt: "2026-03-05", adminComment: "ブース配置と導線を検討中です。3/10までにご提案します。" },
  { id: "hist-3", title: "ファンクラブ向けアンケート実施", status: "hearing", createdAt: "2026-03-03", updatedAt: "2026-03-04", adminComment: "アンケート項目についてヒアリングさせてください。" },
  { id: "hist-4", title: "来場者向けクーポン配布テスト", status: "new", createdAt: "2026-03-08", updatedAt: "2026-03-08" },
];

export const statusLabels: Record<string, { label: string; color: string }> = {
  new: { label: "新規", color: "bg-cyan-500/10 text-cyan-400" },
  hearing: { label: "ヒアリング中", color: "bg-amber-500/10 text-amber-400" },
  designing: { label: "設計中", color: "bg-violet-500/10 text-violet-400" },
  confirmed: { label: "実施決定", color: "bg-emerald-500/10 text-emerald-400" },
  done: { label: "実施済み", color: "bg-blue-500/10 text-blue-400" },
  reported: { label: "レポート返却済", color: "bg-white/[0.08] text-white/60" },
};
