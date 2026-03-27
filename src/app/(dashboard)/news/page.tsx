"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Trophy, Newspaper, Twitter, Quote } from "lucide-react";
import { Tweet } from "react-tweet";

import FadeIn from "@/components/motion/FadeIn";

/* ── 成功事例データ ── */
const successStories = [
  {
    id: 1,
    company: "株式会社Wiz",
    person: "鹿児島支社長",
    personName: "山田 健太",
    logo: "/images/sponsors/N001.jpg",
    image: "/images/cases/success2.jpg",
    title: "PRブースで120名が新規申込！",
    description: "ホームゲーム第25節でPRブースを出展。来場者向けにDXツールの無料体験を実施し、120名の新規申込を獲得。過去最高の反響でした。スポンサー同士の信頼関係から生まれる商談のスピード感は、通常の営業では考えられません。",
    metric: "120名",
    metricLabel: "新規申込",
    highlight: "過去最高の反響",
  },
  {
    id: 2,
    company: "福山黒酢株式会社",
    person: "営業部長",
    personName: "福山 誠一",
    logo: "/images/sponsors/N105.jpg",
    image: "/images/cases/success3.jpg",
    title: "アンケート回収率が驚異の85%！",
    description: "試食ブースでQRアンケートを実施。来場者600名中510名が回答し、回収率85%を達成。試合の熱気の中でお客様と直接対話できるのは、テレビCMでは絶対に得られない体験。商品開発のヒントもたくさん得られました。",
    metric: "85%",
    metricLabel: "アンケート回収率",
    highlight: "直接対話できる体験",
  },
  {
    id: 3,
    company: "西酒造株式会社",
    person: "代表取締役",
    personName: "西 陽一郎",
    logo: "/images/sponsors/M048.jpg",
    image: "/images/cases/success1.jpg",
    title: "コラボ企画で売上前年比130%達成",
    description: "スポンサー企業コラボの限定焼酎を会場で販売。SNSでの拡散効果もあり、関連商品の月間売上が前年比130%に。コラボ限定焼酎の企画もスポンサー仲間との雑談から生まれました。異業種の経営者と繋がれたのが一番の収穫です。",
    metric: "130%",
    metricLabel: "売上前年比",
    highlight: "異業種の経営者と繋がれた",
  },
  {
    id: 4,
    company: "南九州テクノロジーズ",
    person: "代表取締役",
    personName: "田中 翔",
    logo: "/images/sponsors/M029.jpg",
    image: "/images/cases/success4.jpg",
    title: "スポンサー交流会から3件の業務提携",
    description: "Vol.2交流会で出会った3社との業務提携が成立。DX支援案件を共同受注し、新規売上に直結。普通なら半年かかる提携が、交流会の翌週には動き出していた。レブナイズを通じた人の繋がりがそのまま売上に直結しています。",
    metric: "3件",
    metricLabel: "業務提携",
    highlight: "人の繋がりがそのまま売上に直結",
  },
];

/* ── コラムデータ ── */
const columns = [
  {
    id: 1,
    title: "地方スポーツとビジネスの新しい関係性",
    publication: "鹿児島経済ジャーナル 2026年3月号",
    excerpt: "スポーツスポンサーシップが単なる広告枠から、企業間マッチングプラットフォームへと進化している。レブナイズの取り組みから見える地方スポーツの可能性を探る。",
    date: "2026-03-01",
    author: "運営",
  },
  {
    id: 2,
    title: "鹿児島経済の現在地 — スポンサー企業から見た地域の強み",
    publication: "鹿児島経済ジャーナル 2026年2月号",
    excerpt: "レブナイズスポンサー企業へのヒアリングを通じて見えてきた、鹿児島経済のポテンシャルとスポーツがもたらすビジネスチャンス。",
    date: "2026-02-01",
    author: "運営",
  },
  {
    id: 3,
    title: "スポーツで繋がるB2Bネットワーク — 実践レポート",
    publication: "鹿児島経済ジャーナル 2026年1月号",
    excerpt: "スポンサー企業同士がスポーツを介して信頼関係を構築し、実ビジネスに発展させていくプロセスを具体事例とともに紹介。",
    date: "2026-01-01",
    author: "運営",
  },
];

/* ── @kg_rebnise 公式アカウント投稿 ── */
const officialTweetIds = [
  "1969271764938342485",
  "1945040740125680064",
  "1931229701256913073",
  "1919328172081860952",
  "1912046098417590353",
  "1908063612398350428",
];

/* ── #レブナイズ ハッシュタグ投稿（公式アカウント以外） ── */
/* ファンやブースターの投稿IDをここに追加してください */
const hashtagTweetIds: string[] = [];


/* ── 成功事例カルーセル ── */
function SuccessCarousel() {
  const total = successStories.length;
  const items = [...successStories, ...successStories, ...successStories];
  const startOffset = total;
  const [pos, setPos] = useState(startOffset);
  const [current, setCurrent] = useState(0);
  const [isTransition, setIsTransition] = useState(true);

  const scrollTo = useCallback((newPos: number) => {
    setIsTransition(true);
    setPos(newPos);
    setCurrent(((newPos % total) + total) % total);
  }, [total]);

  const next = useCallback(() => scrollTo(pos + 1), [pos, scrollTo]);
  const prev = useCallback(() => scrollTo(pos - 1), [pos, scrollTo]);

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  useEffect(() => {
    if (pos >= startOffset + total || pos < startOffset - total) {
      const timeout = setTimeout(() => {
        setIsTransition(false);
        setPos(startOffset + (pos % total + total) % total);
        requestAnimationFrame(() => {
          requestAnimationFrame(() => setIsTransition(true));
        });
      }, 700);
      return () => clearTimeout(timeout);
    }
  }, [pos, total, startOffset]);

  return (
    <div className="relative">
      <div className="overflow-hidden -mx-4 sm:-mx-6 lg:-mx-8">
        <div
          className="flex"
          style={{
            transform: `translateX(calc(-${pos} * (100% - 80px) - ${pos} * 16px + 40px))`,
            transition: isTransition ? "transform 0.7s cubic-bezier(0.25, 0.1, 0.25, 1)" : "none",
            willChange: "transform",
            gap: "16px",
            paddingLeft: "4px",
            paddingRight: "4px",
          }}
        >
          {items.map((story, i) => {
            const isActive = i === pos;
            return (
              <div
                key={i}
                className="shrink-0 transition-all duration-500"
                style={{
                  width: "calc(100% - 80px)",
                  opacity: isActive ? 1 : 0.4,
                  transform: isActive ? "scale(1)" : "scale(0.95)",
                }}
              >
                <div
                  className="rounded-xl overflow-hidden"
                  style={{ backgroundColor: "#1e1e1e", border: isActive ? "1px solid #555" : "1px solid #333" }}
                >
                  <div className="flex flex-col sm:flex-row">
                    {/* 写真 */}
                    <div className="relative sm:w-[300px] lg:w-[380px] shrink-0 overflow-hidden">
                      <div className="aspect-[16/9] sm:aspect-auto sm:h-full" style={{ minHeight: "240px" }}>
                        <img src={story.image} alt={story.company} className="w-full h-full object-cover" />
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent sm:bg-gradient-to-r sm:from-transparent sm:to-black/30" />
                      <div className="absolute bottom-4 left-4 flex items-center gap-3">
                        <img src={story.logo} alt={story.company} className="w-12 h-12 rounded-md object-cover bg-white border-2 border-white" />
                        <div>
                          <p className="text-[15px] font-bold text-white drop-shadow-md">{story.company}</p>
                          <p className="text-[13px] text-white/70 drop-shadow-md">{story.person} {story.personName}</p>
                        </div>
                      </div>
                      {/* メトリクスバッジ */}
                      <div className="absolute top-4 right-4 text-right">
                        <p className="text-[32px] font-black leading-none text-white drop-shadow-lg">{story.metric}</p>
                        <p className="text-[11px] font-bold text-white/70">{story.metricLabel}</p>
                      </div>
                    </div>

                    {/* テキスト */}
                    <div className="flex-1 p-6 sm:p-8 flex flex-col justify-center">
                      <p className="text-[11px] font-black tracking-[0.15em] uppercase mb-2" style={{ color: "#dfb664" }}>
                        SUCCESS STORY
                      </p>
                      <h3 className="text-[20px] sm:text-[24px] font-black text-white leading-snug mb-4">
                        {story.title}
                      </h3>
                      <p className="text-[16px] sm:text-[17px] text-black-300 leading-[1.8] mb-5">
                        {story.description.split(story.highlight).map((part, pi, arr) => (
                          <span key={pi}>
                            {part}
                            {pi < arr.length - 1 && (
                              <span className="font-black text-white text-[18px] sm:text-[20px]" style={{ color: "#E63350" }}>
                                {story.highlight}
                              </span>
                            )}
                          </span>
                        ))}
                      </p>
                      <div className="rounded-lg p-5 flex gap-4" style={{ backgroundColor: "#111", borderLeft: "4px solid #dfb664" }}>
                        <Quote className="w-6 h-6 shrink-0 mt-0.5" style={{ color: "#dfb664" }} />
                        <p className="text-[20px] sm:text-[22px] font-black text-white leading-snug">
                          {story.highlight}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ナビゲーション */}
      <div className="flex items-center justify-center gap-4 mt-4">
        <button onClick={prev} className="w-9 h-9 rounded-full flex items-center justify-center bg-white/10 hover:bg-white/20 transition-colors cursor-pointer">
          <ChevronLeft className="w-5 h-5 text-white" />
        </button>
        <div className="flex gap-2">
          {successStories.map((_, i) => (
            <button
              key={i}
              onClick={() => scrollTo(startOffset + i)}
              className="w-2.5 h-2.5 rounded-full transition-all cursor-pointer"
              style={{ backgroundColor: i === current ? "#dfb664" : "rgba(255,255,255,0.2)" }}
            />
          ))}
        </div>
        <button onClick={next} className="w-9 h-9 rounded-full flex items-center justify-center bg-white/10 hover:bg-white/20 transition-colors cursor-pointer">
          <ChevronRight className="w-5 h-5 text-white" />
        </button>
      </div>
    </div>
  );
}

const tabs = ["すべて", "ブースター投稿", "成功事例", "コラム"] as const;
type Tab = typeof tabs[number];

function TweetCarousel({ tweetIds, moreHref, moreLabel }: { tweetIds: string[]; moreHref: string; moreLabel: string }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 10);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    checkScroll();
    el.addEventListener("scroll", checkScroll, { passive: true });
    return () => el.removeEventListener("scroll", checkScroll);
  }, [checkScroll]);

  const scroll = (dir: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const amount = 336; // card width + gap
    el.scrollBy({ left: dir === "right" ? amount : -amount, behavior: "smooth" });
  };

  return (
    <div className="relative">
      {/* スクロールコンテナ */}
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto pb-4 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        data-theme="dark"
      >
        {tweetIds.map((id) => (
          <div
            key={id}
            className="shrink-0 w-[260px] h-[350px] sm:w-[320px] sm:h-[500px] rounded-lg border border-line overflow-y-auto"
            style={{ backgroundColor: "#1e1e1e", scrollbarWidth: "none" }}
          >
            <Tweet id={id} />
          </div>
        ))}
        {/* もっと見るカード */}
        <a
          href={moreHref}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 w-[260px] h-[350px] sm:w-[320px] sm:h-[500px] rounded-lg border border-line flex flex-col items-center justify-center gap-4 hover:border-white/30 transition-colors group"
          style={{ backgroundColor: "#1e1e1e" }}
        >
          <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
            <Twitter className="w-8 h-8" style={{ color: "#1DA1F2" }} />
          </div>
          <span className="text-[16px] font-bold text-white group-hover:text-[#1DA1F2] transition-colors">
            {moreLabel}
          </span>
          <span className="text-[13px] text-black-400">Xで続きを見る →</span>
        </a>
      </div>

      {/* 左ぼかし + ボタン */}
      {canScrollLeft && (
        <div className="absolute left-0 top-0 bottom-4 w-[100px] z-10 pointer-events-none"
          style={{ background: "linear-gradient(to right, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.5) 50%, transparent 100%)" }}
        >
          <div className="sticky top-1/2 -translate-y-1/2 pl-3 pt-[200px]">
            <button
              onClick={() => scroll("left")}
              className="pointer-events-auto w-12 h-12 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center hover:bg-white/35 transition-colors cursor-pointer shadow-lg"
            >
              <ChevronLeft className="w-6 h-6 text-white" />
            </button>
          </div>
        </div>
      )}

      {/* 右ぼかし + ボタン */}
      {canScrollRight && (
        <div className="absolute right-0 top-0 bottom-4 w-[100px] z-10 pointer-events-none"
          style={{ background: "linear-gradient(to left, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.5) 50%, transparent 100%)" }}
        >
          <div className="sticky top-1/2 -translate-y-1/2 flex justify-end pr-3 pt-[200px]">
            <button
              onClick={() => scroll("right")}
              className="pointer-events-auto w-12 h-12 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center hover:bg-white/35 transition-colors cursor-pointer shadow-lg"
            >
              <ChevronRight className="w-6 h-6 text-white" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function NewsPage() {
  const [activeTab, setActiveTab] = useState<Tab>("すべて");

  return (
    <FadeIn>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <p className="label">REVNIZE Info</p>
          <h1 className="h1">レブナイズ情報</h1>
          <p className="body mt-3">ブースターの熱量、成功事例、コラム — レブナイズの最新情報をお届けします</p>
        </div>

        {/* Tab filters */}
        <div className="flex gap-2 flex-wrap">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`text-[14px] font-extrabold px-4 py-2 rounded-full transition-colors cursor-pointer ${
                activeTab === tab
                  ? "bg-white text-black"
                  : "bg-white/15 text-white hover:bg-white/25"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* ① X（Twitter）埋め込み */}
        {(activeTab === "すべて" || activeTab === "ブースター投稿") && (
          <section className="space-y-8">
            {/* 公式アカウント投稿 */}
            <div>
              <div className="section-header">
                <div className="flex items-center gap-2">
                  <Twitter className="w-5 h-5" style={{ color: "#1DA1F2" }} />
                  <h2 className="h2">公式アカウント</h2>
                  <span className="text-[12px] font-bold text-black-400">@kg_rebnise</span>
                </div>
                <a
                  href="https://x.com/kg_rebnise"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[14px] font-semibold text-black-400 hover:text-white transition-colors"
                >
                  Xで見る →
                </a>
              </div>
              <TweetCarousel tweetIds={officialTweetIds} moreHref="https://x.com/kg_rebnise" moreLabel="@kg_rebnise をフォロー" />
            </div>

            <p className="text-[12px] text-black-500 mb-6">
              ※ @kg_rebnise 公式アカウントの最新投稿を表示しています。
            </p>

            {/* 公式SNSカード */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* YouTube */}
              <a
                href="https://www.youtube.com/@rebnisetv"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl overflow-hidden group block"
                style={{ backgroundColor: "#1e1e1e", border: "1px solid #333" }}
              >
                <div className="relative h-[120px] sm:h-[140px] overflow-hidden">
                  <img src="/images/youtube-banner.jpg" alt="" className="absolute inset-0 w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/40" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform" style={{ backgroundColor: "#FF0000" }}>
                      <svg viewBox="0 0 24 24" fill="white" className="w-7 h-7 ml-1"><polygon points="9.5,7.5 16.5,12 9.5,16.5" /></svg>
                    </div>
                  </div>
                </div>
                <div className="p-4 flex items-center justify-between">
                  <div>
                    <p className="text-[16px] font-bold text-white group-hover:text-red transition-colors">レブナイズちゃんねる【公式】</p>
                    <p className="text-[13px] text-black-400">試合ハイライト・選手インタビューなど</p>
                  </div>
                  <span className="text-[13px] font-bold px-4 py-2 rounded-full shrink-0" style={{ backgroundColor: "#FF0000", color: "#fff" }}>
                    チャンネルを見る
                  </span>
                </div>
              </a>

              {/* Instagram */}
              <a
                href="https://www.instagram.com/kagoshima_rebnise_official/"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl overflow-hidden group block"
                style={{ backgroundColor: "#1e1e1e", border: "1px solid #333" }}
              >
                <div className="relative h-[120px] sm:h-[140px] overflow-hidden" style={{ background: "linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)" }}>
                  <img src="/images/instagram-profile.jpg" alt="" className="absolute inset-0 w-full h-full object-cover opacity-30" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-2xl flex items-center justify-center bg-white/20 group-hover:scale-110 transition-transform">
                      <svg viewBox="0 0 24 24" fill="white" className="w-8 h-8">
                        <rect x="2" y="2" width="20" height="20" rx="5" fill="none" stroke="white" strokeWidth="2"/>
                        <circle cx="12" cy="12" r="5" fill="none" stroke="white" strokeWidth="2"/>
                        <circle cx="17.5" cy="6.5" r="1.5" fill="white"/>
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="p-4 flex items-center justify-between">
                  <div>
                    <p className="text-[16px] font-bold text-white group-hover:text-red transition-colors">鹿児島レブナイズ 公式</p>
                    <p className="text-[13px] text-black-400">@kagoshima_rebnise_official</p>
                  </div>
                  <span className="text-[13px] font-bold px-4 py-2 rounded-full shrink-0" style={{ background: "linear-gradient(45deg, #f09433, #dc2743)", color: "#fff" }}>
                    フォローする
                  </span>
                </div>
              </a>
            </div>
          </section>
        )}

        {/* ② 成功事例 — インタビュー形式カルーセル */}
        {(activeTab === "すべて" || activeTab === "成功事例") && (
          <section>
            <div className="section-header">
              <div className="flex items-center gap-2">
                <Trophy className="w-5 h-5" style={{ color: "#dfb664" }} />
                <h2 className="h2">今シーズンの成功事例</h2>
              </div>
            </div>
            <SuccessCarousel />
            <div className="text-center mt-6">
              <Link href="/cases" className="btn-primary px-12 py-4 text-[18px] font-black tracking-wide">
                すべての成功事例を見る →
              </Link>
            </div>
          </section>
        )}

        {/* ③ コラム — 地元経済誌の記事 */}
        {(activeTab === "すべて" || activeTab === "コラム") && (
          <section>
            <div className="section-header">
              <div className="flex items-center gap-2">
                <Newspaper className="w-5 h-5" style={{ color: "#dfb664" }} />
                <h2 className="h2">コラム</h2>
              </div>
            </div>
            <div className="space-y-3">
              {columns.map((col) => (
                <div
                  key={col.id}
                  className="rounded-lg border border-line p-5 hover:border-line-dark transition-colors cursor-pointer group"
                  style={{ backgroundColor: "#1e1e1e" }}
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-[11px] font-bold px-2 py-0.5 rounded-full" style={{ backgroundColor: "rgba(223,182,100,0.2)", color: "#dfb664" }}>
                          {col.publication}
                        </span>
                        <span className="text-[11px] text-black-500">{col.date}</span>
                      </div>
                      <h3 className="text-[16px] font-bold text-white mb-2 group-hover:text-red transition-colors">
                        {col.title}
                      </h3>
                      <p className="text-[13px] text-black-400 leading-relaxed line-clamp-2">
                        {col.excerpt}
                      </p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-black-500 group-hover:text-white transition-colors shrink-0 mt-1" />
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

      </div>
    </FadeIn>
  );
}
