"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { ChevronDown, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import FadeIn from "@/components/motion/FadeIn";
import { sponsorSections } from "@/data/sponsors";

/* ── インタビューデータ ── */
const interviews = [
  {
    id: 1,
    company: "西酒造株式会社",
    person: "代表取締役",
    personName: "西 陽一郎",
    logo: "/images/sponsors/M048.jpg",
    image: "/images/cases/success1.jpg",
    question: "なぜレブナイズのスポンサーに？",
    answer: "鹿児島の企業として、地元のスポーツチームを応援するのは自然なこと。でもそれだけじゃない。レブナイズのスポンサーになって、これまで接点のなかった異業種の経営者と繋がれた。コラボ限定焼酎の企画もスポンサー仲間との雑談から生まれました。",
    highlight: "異業種の経営者と繋がれた",
  },
  {
    id: 2,
    company: "株式会社Wiz",
    person: "鹿児島支社長",
    personName: "山田 健太",
    logo: "/images/sponsors/N001.jpg",
    image: "/images/cases/success2.jpg",
    question: "スポンサーになって変わったことは？",
    answer: "PRブースで120名の新規申込を獲得できたのは大きかった。でも一番の変化は、スポンサー同士の信頼関係から生まれる商談のスピード感。普通なら半年かかる提携が、交流会の翌週には動き出していた。",
    highlight: "商談のスピード感が段違い",
  },
  {
    id: 3,
    company: "福山黒酢株式会社",
    person: "営業部長",
    personName: "福山 誠一",
    logo: "/images/sponsors/N105.jpg",
    image: "/images/cases/success3.jpg",
    question: "スポンサー活動で印象的だったことは？",
    answer: "試食ブースでのアンケート回収率85%は衝撃でした。普通のWeb調査では考えられない数字。試合の熱気の中でお客様と直接対話できるのは、テレビCMでは絶対に得られない体験です。商品開発のヒントもたくさん得られました。",
    highlight: "試合の熱気の中で直接対話できる",
  },
  {
    id: 4,
    company: "ユーミーコーポレーション株式会社",
    person: "代表取締役",
    personName: "尾辻 勇太",
    logo: "/images/sponsors/N003.jpg",
    image: "/images/cases/success4.jpg",
    question: "スポンサーシップのROIをどう感じていますか？",
    answer: "コートサイド看板を出してからターゲットエリアでの認知度が2.4倍になりました。数字で効果が見えるのは経営者として安心感がある。それに加えて、スポンサー交流会で出会った企業との取引も生まれている。広告費以上のリターンを実感しています。",
    highlight: "広告費以上のリターンを実感",
  },
  {
    id: 5,
    company: "MAYA GROUP",
    person: "代表取締役",
    personName: "松山 翔太",
    logo: "/images/sponsors/Z135.jpg",
    image: "/images/cases/success5.jpg",
    question: "天文館の飲食店としてスポンサーになるメリットは？",
    answer: "選手来店イベントで一晩に200名の新規会員を獲得できました。でもそれ以上に大きいのは、スポンサー企業の懇親会や打ち上げで店を使ってもらえること。レブナイズを通じた人の繋がりが、そのまま売上に直結しています。",
    highlight: "人の繋がりがそのまま売上に直結",
  },
  {
    id: 6,
    company: "鹿児島トヨタ自動車株式会社",
    person: "取締役",
    personName: "田中 慎介",
    logo: "/images/sponsors/N002.jpg",
    image: "/images/cases/success6.jpg",
    question: "採用面での効果はありましたか？",
    answer: "ホームゲームで採用ブースを出したら、新卒応募数が前年の3倍に。バスケ好きの学生と「推しチーム」の話で盛り上がって、そこから自然に会社の話になる。堅い会社説明会では絶対に生まれない空気感が最大の武器ですね。",
    highlight: "堅い説明会では生まれない空気感",
  },
];

/* ── インタビューカルーセル（1枚表示・スライドスクロール） ── */
function InterviewCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState(0);
  const total = interviews.length;
  // 3倍複製でシームレスループ
  const items = [...interviews, ...interviews, ...interviews];
  const startOffset = total; // 中央セットの先頭から開始
  const [pos, setPos] = useState(startOffset);
  const [isTransition, setIsTransition] = useState(true);

  const scrollTo = useCallback((newPos: number) => {
    setIsTransition(true);
    setPos(newPos);
    setCurrent(((newPos % total) + total) % total);
  }, [total]);

  const next = useCallback(() => scrollTo(pos + 1), [pos, scrollTo]);
  const prev = useCallback(() => scrollTo(pos - 1), [pos, scrollTo]);

  // 自動スクロール
  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  // ループリセット
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
          ref={trackRef}
          className="flex"
          style={{
            transform: `translateX(calc(-${pos} * (100% - 40px) - ${pos} * 16px + 20px))`,
            transition: isTransition ? "transform 0.7s cubic-bezier(0.25, 0.1, 0.25, 1)" : "none",
            willChange: "transform",
            gap: "16px",
            paddingLeft: "0px",
            paddingRight: "0px",
          }}
        >
          {items.map((iv, i) => {
            const isActive = i === pos;
            return (
              <div
                key={i}
                className="shrink-0 transition-all duration-500"
                style={{
                  width: "calc(100% - 40px)",
                  opacity: isActive ? 1 : 0.4,
                  transform: isActive ? "scale(1)" : "scale(0.95)",
                }}
              >
                <div
                  className="rounded-xl overflow-hidden group"
                  style={{ backgroundColor: "#1e1e1e", border: isActive ? "1px solid #555" : "1px solid #333" }}
                >
                  <div className="flex flex-col sm:flex-row">
                    {/* 写真 */}
                    <div className="relative sm:w-[300px] lg:w-[380px] shrink-0 overflow-hidden">
                      <div className="aspect-[16/9] sm:aspect-auto sm:h-full" style={{ minHeight: "160px" }}>
                        <img
                          src={iv.image}
                          alt={iv.company}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent sm:bg-gradient-to-r sm:from-transparent sm:to-black/30" />
                      <div className="absolute bottom-4 left-4 flex items-center gap-3">
                        <img
                          src={iv.logo}
                          alt={iv.company}
                          className="w-12 h-12 rounded-md object-cover bg-white border-2 border-white"
                        />
                        <div>
                          <p className="text-[15px] font-bold text-white drop-shadow-md">{iv.company}</p>
                          <p className="text-[13px] text-white/70 drop-shadow-md">{iv.person} {iv.personName}</p>
                        </div>
                      </div>
                    </div>

                    {/* テキスト */}
                    <div className="flex-1 p-4 sm:p-8 flex flex-col justify-center">
                      {/* 見出しラベル */}
                      <p className="text-[10px] sm:text-[11px] font-black tracking-[0.15em] uppercase mb-1 sm:mb-2" style={{ color: "#dfb664" }}>
                        SPONSOR INTERVIEW
                      </p>
                      {/* 質問 */}
                      <h3 className="text-[16px] sm:text-[24px] font-black text-white leading-snug mb-2 sm:mb-4">
                        {iv.question}
                      </h3>
                      {/* 回答 — highlightをテキスト内で強調 */}
                      <p className="text-[13px] sm:text-[17px] text-black-300 leading-[1.6] sm:leading-[1.8] mb-3 sm:mb-5 line-clamp-3 sm:line-clamp-none">
                        {iv.answer.split(iv.highlight).map((part, pi, arr) => (
                          <span key={pi}>
                            {part}
                            {pi < arr.length - 1 && (
                              <span className="font-black text-white text-[18px] sm:text-[20px]" style={{ color: "#E63350" }}>
                                {iv.highlight}
                              </span>
                            )}
                          </span>
                        ))}
                      </p>
                      {/* ハイライト引用ブロック */}
                      <div
                        className="rounded-lg p-3 sm:p-5 flex gap-3 sm:gap-4"
                        style={{ backgroundColor: "#111", borderLeft: "4px solid #dfb664" }}
                      >
                        <Quote className="w-5 h-5 sm:w-6 sm:h-6 shrink-0 mt-0.5" style={{ color: "#dfb664" }} />
                        <p className="text-[14px] sm:text-[22px] font-black text-white leading-snug">
                          {iv.highlight}
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
          {interviews.map((_, i) => (
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

/**
 * ロゴサイズマッピング (rebnise.jp/sponsor/ ミラーリング)
 */
function logoWidth(size: string): string {
  switch (size) {
    case "layout-rebsupplier-a": return "240px";
    case "layout-rebsupplier-b": return "200px";
    case "layout-rebsupplier-c": return "155px";
    case "layout-rebsupplier-d": return "122px";
    default: return "200px";
  }
}

/**
 * 見出しのアクセントカラー
 */
function accentColor(title: string): string {
  if (title === "オフィシャルスポンサー" || title === "アカデミースポンサー") return "#C8102E";
  return "#dfb664";
}

export default function CompaniesPage() {
  const [showMore, setShowMore] = useState(false);

  // sponsorList（重複データ）は除外
  const sections = sponsorSections.filter((s) => s.size !== "sponsorList");

  // 最初のセクション（レブナイズ35）は常に表示、それ以降は showMore で制御
  const firstSection = sections[0];
  const restSections = sections.slice(1);

  return (
    <div className="space-y-0">
      <FadeIn>
        <div className="mb-6">
          <p className="label">Partner / Sponsor</p>
          <h1 className="h1">スポンサー企業一覧</h1>
          <p className="body mt-3">レブナイズを支えるスポンサー企業をご紹介します</p>
        </div>
      </FadeIn>

      {/* ===== ピックアップインタビュー ===== */}
      <FadeIn delay={0.1}>
        <section className="py-6">
          <div
            className="mb-6 pb-1.5 font-bold text-[20px] sm:text-[24px]"
            style={{ borderBottom: "3px solid #3e3e3e", color: "#fff" }}
          >
            <span
              className="inline-block mr-1 relative"
              style={{ width: "0.7em", height: "1.2em", background: "#dfb664", top: "0.2em" }}
            />
            スポンサーインタビュー
          </div>

          <InterviewCarousel />
        </section>
      </FadeIn>

      {/* レブナイズ35 — カード形式 */}
      {firstSection && (
        <section className="py-6">
          <div
            className="mb-6 pb-1.5 font-bold text-[20px] sm:text-[24px]"
            style={{ borderBottom: "3px solid #3e3e3e", color: "#fff" }}
          >
            <span
              className="inline-block mr-1 relative"
              style={{ width: "0.7em", height: "1.2em", background: accentColor(firstSection.title), top: "0.2em" }}
            />
            {firstSection.title}
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5">
            {firstSection.logos.map((logo, li) => (
              <a
                key={li}
                href={logo.url || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative overflow-hidden cursor-pointer block"
              >
                {/* ロゴエリア */}
                <div className="overflow-hidden">
                  <img
                    src={`/images/sponsors/${logo.file}`}
                    alt={logo.name}
                    className="w-full h-auto block transition-transform duration-[1200ms] ease-[cubic-bezier(0.165,0.84,0.44,1)] group-hover:scale-[1.05]"
                  />
                </div>
                {/* テキストエリア */}
                <div className="bg-[#333] px-2 py-2 sm:px-4 sm:pt-4 sm:pb-4">
                  <p className="text-[11px] sm:text-[14px] text-white leading-tight font-bold">
                    {logo.name}
                  </p>
                  {logo.description && (
                    <p className="hidden sm:block text-[12px] text-[#a2a2a2] leading-relaxed line-clamp-2 mt-2">
                      {logo.description}
                    </p>
                  )}
                </div>
              </a>
            ))}
          </div>
        </section>
      )}

      {/* もっと見る / 閉じるボタン */}
      <div className="text-center py-6">
        <button
          onClick={() => setShowMore(!showMore)}
          className="inline-flex items-center gap-2 px-8 py-3 text-[15px] font-bold rounded-md transition-all cursor-pointer hover:opacity-90"
          style={{
            background: showMore ? "#333" : "#C8102E",
            color: "#fff",
          }}
        >
          {showMore ? "閉じる" : "オフィシャルスポンサー以降を見る"}
          <ChevronDown
            className="w-4 h-4 transition-transform"
            style={{ transform: showMore ? "rotate(180deg)" : "rotate(0)" }}
          />
        </button>
      </div>

      {/* ティア別セクション（showMore時） */}
      {showMore && restSections.map((section, si) => {
        const w = logoWidth(section.size);
        const accent = accentColor(section.title);

        return (
          <section key={si} className="py-6">
            <div
              className="mb-6 pb-1.5 font-bold text-[20px] sm:text-[24px]"
              style={{ borderBottom: "3px solid #3e3e3e", color: "#fff" }}
            >
              <span
                className="inline-block mr-1 relative"
                style={{ width: "0.7em", height: "1.2em", background: accent, top: "0.2em" }}
              />
              {section.title}
            </div>
            <div className="text-center">
              {section.logos.map((logo, li) => (
                <div
                  key={li}
                  className="inline-table align-middle"
                  style={{ width: w, margin: "10px 5px" }}
                >
                  <a
                    href={logo.url || undefined}
                    target={logo.url ? "_blank" : undefined}
                    rel={logo.url ? "noopener noreferrer" : undefined}
                    className={`block transition-opacity hover:opacity-80${logo.url ? " cursor-pointer" : ""}`}
                  >
                    <img
                      src={`/images/sponsors/${logo.file}`}
                      alt={logo.name}
                      className="w-full h-auto border border-[#ccc]"
                      loading="lazy"
                    />
                  </a>
                </div>
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
