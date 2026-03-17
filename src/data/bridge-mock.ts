// Tokyo Bridge Mock Data

export interface Insight {
  id: string;
  title: string;
  summary: string;
  implication: string;
  category: string;
  date: string;
  relatedCompanyIds: string[];
  body: string;
  targetAudience: string[];
}

export interface TokyoCompany {
  id: string;
  name: string;
  type: "company" | "startup" | "expert" | "advisor";
  tagline: string;
  domain: string[];
  consultTopics: string[];
  targetFit: string;
  achievements: string[];
  contactMethods: string[];
  industry: string;
}

export interface CollabTheme {
  id: string;
  title: string;
  background: string;
  detail: string;
  company: string;
  industry: string;
  desiredPartner: string;
  format: string;
  category: string;
  postedAt: string;
  featured: boolean;
}

export interface BridgeEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  format: "online" | "offline" | "hybrid";
  type: string;
  description: string;
  speakers: string[];
  capacity: number;
  registered: number;
  theme: string;
}

export interface BridgeCase {
  id: string;
  title: string;
  kagoshimaCompany: string;
  tokyoCompany: string;
  background: string;
  encounter: string;
  action: string;
  outcome: string;
  nextStep: string;
  category: string;
}

export interface ConsultRequest {
  id: string;
  title: string;
  targetCompany: string;
  topic: string;
  format: string;
  status: "new" | "adjusting" | "confirmed" | "done" | "ongoing";
  createdAt: string;
  updatedAt: string;
  adminNote?: string;
}

// ---- Insights ----
export const insights: Insight[] = [
  {
    id: "ins-1",
    title: "中小企業のAI導入、東京では「まず業務棚卸し」が主流に",
    summary: "東京の中小企業支援で最も成果が出ているのは、AIツール導入前の業務棚卸しフェーズ。鹿児島企業にも同じアプローチが有効。",
    implication: "自社の業務を整理するだけで、AI活用ポイントが明確になる",
    category: "AI / DX",
    date: "2026-03-05",
    relatedCompanyIds: ["co-1", "co-4"],
    body: "東京都内の中小企業約200社を対象にした調査によると、AI導入で成果を上げている企業の82%が「業務棚卸し」を最初のステップとして実施しています。ツール選定の前に、まず自社の業務フローを可視化し、どの工程にAIが活用できるかを明確にすることが成功の鍵です。鹿児島の企業でも、東京の専門家と壁打ちしながら業務棚卸しを行うことで、的確なDX投資が可能になります。",
    targetAudience: ["製造業", "サービス業", "DXに関心がある企業"],
  },
  {
    id: "ins-2",
    title: "首都圏スタートアップの「地方実証」ニーズが急増中",
    summary: "東京スタートアップの40%以上が地方での実証機会を探している。鹿児島は立地・規模・ファンコミュニティの面で実証先として高い適性。",
    implication: "東京スタートアップとの共創は双方にメリットがある",
    category: "スタートアップ連携",
    date: "2026-03-01",
    relatedCompanyIds: ["co-2", "co-5"],
    body: "東京のスタートアップエコシステムでは、地方での実証実験のニーズが急速に高まっています。特にリアルな消費者接点や地域コミュニティとの連携を求める声が多く、鹿児島のスポーツファンコミュニティや商業圏はその受け皿として高い可能性を持っています。レブナイズのネットワークを通じて、東京スタートアップとの接点を作ることが可能です。",
    targetAudience: ["新規事業担当", "経営者", "イノベーション推進"],
  },
  {
    id: "ins-3",
    title: "採用ブランディング最前線：東京PR会社が地方企業に注目する理由",
    summary: "東京のPR専門会社が地方企業の採用支援に力を入れ始めている。地域密着×都市型発信の組み合わせが採用力を劇的に変える。",
    implication: "地方の強みを東京目線で再構築すると採用が変わる",
    category: "採用 / 組織",
    date: "2026-02-25",
    relatedCompanyIds: ["co-3"],
    body: "首都圏のPR会社が、地方企業の採用ブランディング支援を新たな事業領域として注力し始めています。背景には、地方企業が持つ「地域での存在感」「経営者の顔が見える」「働くリアルが伝わりやすい」という採用面でのアドバンテージを、プロのPR力で拡大できることがあります。実際に東京PR会社と組んだ地方企業で応募数が3倍になった事例も。",
    targetAudience: ["採用責任者", "人事担当", "経営者"],
  },
  {
    id: "ins-4",
    title: "販路拡大の新常識：東京バイヤーが求める「地方ストーリー」とは",
    summary: "東京の流通・小売バイヤーが地方産品に求めるのは品質だけでなく、背景にある「ストーリー」。鹿児島企業の強みを東京市場向けに翻訳する方法。",
    implication: "商品力＋ストーリーの設計が首都圏販路を開く",
    category: "販路拡大 / 営業",
    date: "2026-02-20",
    relatedCompanyIds: ["co-6"],
    body: "東京の百貨店やセレクトショップのバイヤー50名へのヒアリングから、地方産品の採用基準に「商品のストーリー性」が品質と同等の重要度で挙げられていることが分かりました。産地の歴史、作り手の想い、地域との結びつきを言語化・ビジュアル化できている商品は棚に並ぶ確率が格段に上がります。",
    targetAudience: ["食品メーカー", "製造業", "営業責任者"],
  },
  {
    id: "ins-5",
    title: "地方企業×東京ブランディング：成功の3つのパターン",
    summary: "東京のブランディング会社が分析した地方企業のリブランド成功事例から、共通する3つのアプローチを紹介。",
    implication: "ブランド設計を東京視点で見直す価値は大きい",
    category: "ブランディング",
    date: "2026-02-15",
    relatedCompanyIds: ["co-3", "co-6"],
    body: "地方企業のブランディングで成功している事例には、3つの共通パターンがあります。1つ目は「地域性の再解釈」、2つ目は「顧客接点の再設計」、3つ目は「東京市場への段階的展開」です。これらは鹿児島の企業にもそのまま適用可能で、東京のブランディング専門家との壁打ちを通じて自社に最適なパターンを見つけることが重要です。",
    targetAudience: ["経営者", "マーケティング担当", "ブランド責任者"],
  },
];

// ---- Tokyo Companies / Experts ----
export const tokyoCompanies: TokyoCompany[] = [
  {
    id: "co-1",
    name: "テクノバレー株式会社",
    type: "company",
    tagline: "中小企業特化のAI導入支援。業務棚卸しから実装まで伴走。",
    domain: ["AI / DX", "業務効率化"],
    consultTopics: ["AI導入の進め方", "業務棚卸し", "ツール選定", "社内DX推進"],
    targetFit: "DX推進を検討中だが、何から始めるか分からない企業",
    achievements: ["地方企業50社以上のDX支援実績", "経産省DX認定支援機関"],
    contactMethods: ["オンライン面談", "壁打ち", "視察受入"],
    industry: "IT / コンサルティング",
  },
  {
    id: "co-2",
    name: "NextStep Ventures",
    type: "startup",
    tagline: "地方実証に特化したスタートアップ。IoTとデータ活用の共同実験パートナー。",
    domain: ["スタートアップ連携", "IoT"],
    consultTopics: ["共同実証", "PoC設計", "データ活用", "新規事業共創"],
    targetFit: "新しい技術やサービスの実証に興味がある企業",
    achievements: ["地方自治体との実証5件", "大手メーカーとのPoC経験"],
    contactMethods: ["オンライン面談", "壁打ち", "共同実証"],
    industry: "テクノロジー / スタートアップ",
  },
  {
    id: "co-3",
    name: "CRAFT PR",
    type: "company",
    tagline: "地方企業の魅力を首都圏に届けるPR・ブランディング専門会社。",
    domain: ["ブランディング", "採用 / 組織"],
    consultTopics: ["採用ブランディング", "企業PR", "メディア戦略", "SNS活用"],
    targetFit: "採用力や企業認知を高めたい地方企業",
    achievements: ["地方企業の採用応募3倍化実績", "全国メディア露出支援"],
    contactMethods: ["オンライン面談", "壁打ち", "登壇"],
    industry: "PR / ブランディング",
  },
  {
    id: "co-4",
    name: "山田 健太郎",
    type: "expert",
    tagline: "元大手商社DX責任者。地方中小企業のDX戦略アドバイザー。",
    domain: ["AI / DX", "経営戦略"],
    consultTopics: ["DX戦略立案", "組織変革", "投資判断", "AI活用方針"],
    targetFit: "経営レベルでDX方針を固めたい企業",
    achievements: ["大手商社のDX推進を主導", "中小企業10社以上の顧問"],
    contactMethods: ["壁打ち", "オンライン面談"],
    industry: "コンサルティング / 顧問",
  },
  {
    id: "co-5",
    name: "LocalX Labs",
    type: "startup",
    tagline: "地方×テクノロジーの社会実装を推進するスタートアップスタジオ。",
    domain: ["スタートアップ連携", "地方展開 / 実証"],
    consultTopics: ["新規事業創出", "地方実証", "スタートアップ連携", "共創プロジェクト"],
    targetFit: "スタートアップと一緒に新しいことに取り組みたい企業",
    achievements: ["地方スタートアップ育成プログラム運営", "共創事業5件立上げ"],
    contactMethods: ["オンライン面談", "壁打ち", "視察受入", "共同実証"],
    industry: "スタートアップ / イノベーション",
  },
  {
    id: "co-6",
    name: "Bridge Commerce",
    type: "company",
    tagline: "地方産品の東京販路開拓支援。バイヤーネットワークと売場設計が強み。",
    domain: ["販路拡大 / 営業", "ブランディング"],
    consultTopics: ["首都圏販路開拓", "バイヤー紹介", "商品ストーリー設計", "売場提案"],
    targetFit: "東京市場に商品を展開したい食品・製造業",
    achievements: ["地方産品の東京進出支援100件以上", "百貨店・セレクトショップとの取引実績"],
    contactMethods: ["オンライン面談", "壁打ち", "視察受入"],
    industry: "流通 / コマース",
  },
];

// ---- Collaboration Themes ----
export const collabThemes: CollabTheme[] = [
  {
    id: "th-1",
    title: "AI導入の壁打ち相手がほしい",
    background: "社内でDXを推進したいが、何から手をつけるべきか分からない。",
    detail: "現場の業務フローを整理し、AI活用の優先順位を一緒に考えてくれる東京の専門家と話したい。",
    company: "鹿児島建設工業",
    industry: "建設業",
    desiredPartner: "DXコンサルタント / AI導入支援会社",
    format: "壁打ち",
    category: "AI / DX",
    postedAt: "2026-03-08",
    featured: true,
  },
  {
    id: "th-2",
    title: "首都圏販路の相談をしたい",
    background: "鹿児島の特産品を東京のセレクトショップや百貨店に展開したい。",
    detail: "商品力には自信があるが、東京のバイヤーとの接点がない。紹介・仲介をしてほしい。",
    company: "南薩フーズ",
    industry: "食品製造",
    desiredPartner: "販路開拓支援会社 / バイヤー",
    format: "面談",
    category: "販路拡大 / 営業",
    postedAt: "2026-03-06",
    featured: true,
  },
  {
    id: "th-3",
    title: "東京のPR会社とつながりたい",
    background: "採用が厳しくなっており、企業としての認知度向上が急務。",
    detail: "地方企業の強みを活かした採用ブランディングを、東京のPR専門家に相談したい。",
    company: "霧島テクノロジー",
    industry: "IT",
    desiredPartner: "PR会社 / ブランディング会社",
    format: "面談",
    category: "採用 / 組織",
    postedAt: "2026-03-03",
    featured: false,
  },
  {
    id: "th-4",
    title: "スタートアップとの共創可能性を探りたい",
    background: "自社の遊休施設を活用して、新規事業の種を作りたい。",
    detail: "東京のスタートアップとの共同実証や共創プロジェクトに興味がある。まずは情報交換から始めたい。",
    company: "桜島リゾーツ",
    industry: "観光 / 不動産",
    desiredPartner: "スタートアップ / 新規事業支援",
    format: "壁打ち",
    category: "スタートアップ連携",
    postedAt: "2026-02-28",
    featured: false,
  },
  {
    id: "th-5",
    title: "新規事業のアイデアを壁打ちしたい",
    background: "既存事業の延長線上に限界を感じており、東京の視点で新たなヒントが欲しい。",
    detail: "経営コンサルや新規事業支援の専門家と、ざっくばらんに壁打ちしたい。",
    company: "鹿児島総合サービス",
    industry: "サービス業",
    desiredPartner: "経営コンサルタント / 新規事業支援",
    format: "壁打ち",
    category: "AI / DX",
    postedAt: "2026-02-25",
    featured: true,
  },
];

// ---- Events ----
export const bridgeEvents: BridgeEvent[] = [
  {
    id: "ev-1",
    title: "東京ゲストオンラインサロン vol.8",
    date: "2026-03-20",
    time: "19:00 - 20:30",
    format: "online",
    type: "交流会",
    description: "東京のAI導入支援企業テクノバレー社をゲストに迎え、中小企業のDX事例を共有。質疑応答と個別相談タイムあり。",
    speakers: ["テクノバレー株式会社 代表 佐藤一郎"],
    capacity: 30,
    registered: 18,
    theme: "AI / DX",
  },
  {
    id: "ev-2",
    title: "東京×鹿児島 逆ピッチ会",
    date: "2026-03-28",
    time: "14:00 - 17:00",
    format: "hybrid",
    type: "ピッチ",
    description: "鹿児島企業5社が「こんな東京パートナーを探しています」を発表。東京側企業がマッチング提案を行う逆ピッチ形式。",
    speakers: ["鹿児島スポンサー企業5社", "東京企業パネラー"],
    capacity: 50,
    registered: 32,
    theme: "ビジネスマッチング",
  },
  {
    id: "ev-3",
    title: "東京視察ツアー 2026春",
    date: "2026-04-10",
    time: "10:00 - 18:00",
    format: "offline",
    type: "視察",
    description: "東京のスタートアップオフィス3社と先進企業を訪問。経営者同士の直接対話と懇親会を含む1日ツアー。",
    speakers: ["NextStep Ventures", "LocalX Labs", "CRAFT PR"],
    capacity: 15,
    registered: 9,
    theme: "スタートアップ連携",
  },
  {
    id: "ev-4",
    title: "テーマ別壁打ち会：採用ブランディング",
    date: "2026-04-05",
    time: "15:00 - 16:30",
    format: "online",
    type: "壁打ち",
    description: "CRAFT PR社の採用ブランディング専門家と、1社15分の壁打ちセッション。事前に課題シートを提出いただきます。",
    speakers: ["CRAFT PR 採用ブランディング部門長"],
    capacity: 8,
    registered: 5,
    theme: "採用 / 組織",
  },
  {
    id: "ev-5",
    title: "販路拡大相談会 with 東京バイヤー",
    date: "2026-04-15",
    time: "13:00 - 17:00",
    format: "online",
    type: "商談",
    description: "東京の百貨店・セレクトショップバイヤー3名を招き、鹿児島企業の商品についてオンライン商談を実施。",
    speakers: ["Bridge Commerce", "東京バイヤー3名"],
    capacity: 12,
    registered: 7,
    theme: "販路拡大 / 営業",
  },
];

// ---- Cases ----
export const bridgeCases: BridgeCase[] = [
  {
    id: "case-1",
    title: "壁打ちからDX検討へ ─ 建設会社のAI活用第一歩",
    kagoshimaCompany: "鹿児島建設工業",
    tokyoCompany: "テクノバレー株式会社",
    background: "建設現場の安全管理と工程管理に課題を感じていたが、AIの活用方法が分からなかった。",
    encounter: "Tokyo Bridgeのオンラインサロンで、テクノバレー社の業務棚卸しアプローチに共感し、壁打ちを依頼。",
    action: "オンライン壁打ちを3回実施。業務フローの可視化と、AI適用ポイントの特定を共同で行った。",
    outcome: "安全管理のAI画像認識導入を具体化。投資判断の材料が揃い、経営会議で承認を得た。",
    nextStep: "テクノバレー社とのPoC契約を締結。3ヶ月の実証を予定。",
    category: "AI / DX",
  },
  {
    id: "case-2",
    title: "PR会社との接続で採用広報を見直し",
    kagoshimaCompany: "霧島テクノロジー",
    tokyoCompany: "CRAFT PR",
    background: "毎年の採用活動で応募数が減少傾向。特にエンジニア採用が困難になっていた。",
    encounter: "Tokyo Bridgeの企業一覧でCRAFT PRを発見。採用ブランディングの実績に惹かれて面談を申込。",
    action: "オンライン面談を2回実施。現状の採用課題のヒアリングと、企業ブランド分析を実施。",
    outcome: "採用サイトのリニューアルと、地域密着型の採用ストーリーを策定。応募数が前年比2.3倍に。",
    nextStep: "継続的なPR支援契約を締結。次年度の新卒採用にも展開予定。",
    category: "採用 / 組織",
  },
  {
    id: "case-3",
    title: "東京視察後に新規事業テーマを具体化",
    kagoshimaCompany: "桜島リゾーツ",
    tokyoCompany: "LocalX Labs",
    background: "遊休施設の活用方法に悩んでいた。新規事業のアイデアはあるが、具体化の方法が分からなかった。",
    encounter: "Tokyo Bridgeの東京視察ツアーに参加。LocalX Labsのスタートアップスタジオ型支援に興味を持った。",
    action: "視察後にオンライン壁打ちを3回実施。遊休施設を活用したワーケーション×地方創生の事業モデルを共同設計。",
    outcome: "事業計画書が完成し、補助金申請を準備中。LocalX Labsとの共創パートナーシップを構築。",
    nextStep: "2026年夏に第1期のワーケーションプログラムを試行開始予定。",
    category: "スタートアップ連携",
  },
];

// ---- Consultation Requests ----
export const consultRequests: ConsultRequest[] = [
  {
    id: "req-1",
    title: "テクノバレー社とのAI壁打ち依頼",
    targetCompany: "テクノバレー株式会社",
    topic: "AI導入の進め方",
    format: "壁打ち",
    status: "confirmed",
    createdAt: "2026-02-15",
    updatedAt: "2026-03-01",
    adminNote: "3/10にオンライン壁打ち実施予定です。事前資料をお送りしています。",
  },
  {
    id: "req-2",
    title: "CRAFT PRとの採用ブランディング面談",
    targetCompany: "CRAFT PR",
    topic: "採用ブランディング",
    format: "面談",
    status: "done",
    createdAt: "2026-01-20",
    updatedAt: "2026-02-28",
    adminNote: "面談2回完了。採用サイトリニューアルの提案を受領済み。",
  },
  {
    id: "req-3",
    title: "Bridge Commerceとの販路相談",
    targetCompany: "Bridge Commerce",
    topic: "首都圏販路開拓",
    format: "面談",
    status: "adjusting",
    createdAt: "2026-03-05",
    updatedAt: "2026-03-08",
    adminNote: "日程調整中です。3月中旬に初回面談を予定しています。",
  },
  {
    id: "req-4",
    title: "LocalX Labsとの共創相談",
    targetCompany: "LocalX Labs",
    topic: "新規事業共創",
    format: "壁打ち",
    status: "new",
    createdAt: "2026-03-10",
    updatedAt: "2026-03-10",
  },
];

export const statusLabels: Record<string, { label: string; color: string }> = {
  new: { label: "新規", color: "bg-indigo-50 text-indigo-700" },
  adjusting: { label: "調整中", color: "bg-amber-50 text-amber-700" },
  confirmed: { label: "面談決定", color: "bg-emerald-50 text-emerald-700" },
  done: { label: "実施済み", color: "bg-blue-50 text-blue-700" },
  ongoing: { label: "継続相談中", color: "bg-violet-50 text-violet-700" },
};

export const insightCategories = [
  "すべて",
  "AI / DX",
  "採用 / 組織",
  "販路拡大 / 営業",
  "ブランディング",
  "スタートアップ連携",
  "地方展開 / 実証",
];

export const companyDomains = [
  "すべて",
  "AI / DX",
  "採用 / 組織",
  "販路拡大 / 営業",
  "ブランディング",
  "スタートアップ連携",
  "経営戦略",
];
