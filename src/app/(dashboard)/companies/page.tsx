"use client";

import { useState } from "react";
import { Search, SlidersHorizontal, MessageSquare, ChevronDown } from "lucide-react";
import FadeIn from "@/components/motion/FadeIn";
import { sponsorSections } from "@/data/sponsors";
import { consultations, companies } from "@/data/mock";

// companyId → スポンサー名のマッピング
const companyIdToSponsorNames: Record<string, string[]> = {
  "1": ["南九州テクノロジーズ", "株式会社テクノミックス"],
  "2": ["桜島フーズ", "福山黒酢株式会社", "鹿児島堀口製茶有限会社"],
  "3": ["Tokyo Creative Lab", "株式会社メディアサービス"],
  "4": ["かごしま建設", "株式会社大洋", "岩崎産業"],
  "5": ["グローバルHRパートナーズ", "株式会社Wiz"],
  "6": ["薩摩デジタルマーケティング", "株式会社デジタルフィンテック"],
};

const allIndustries = [
  "すべて", "IT", "飲食", "自動車", "不動産", "サービス", "自治体",
  "建設", "メディア", "運輸", "通信", "金融", "医療",
  "エネルギー", "商社", "エンタメ", "スポーツ", "リユース", "美容",
];

const industryColors: Record<string, string> = {
  "IT": "#4F46E5",
  "飲食": "#D97706",
  "自動車": "#0369A1",
  "不動産": "#7C3AED",
  "サービス": "#0891B2",
  "自治体": "#059669",
  "建設": "#92400E",
  "メディア": "#DB2777",
  "運輸": "#475569",
  "通信": "#2563EB",
  "金融": "#B45309",
  "医療": "#DC2626",
  "エネルギー": "#16A34A",
  "商社": "#7C2D12",
  "エンタメ": "#C026D3",
  "スポーツ": "#EA580C",
  "リユース": "#0D9488",
  "美容": "#EC4899",
};

/**
 * ロゴサイズマッピング (rebnise.jp/sponsor/ ミラーリング)
 * layout-rebsupplier-a: 240px (プラチナ級)
 * layout-rebsupplier-b: 200px (ゴールド級)
 * layout-rebsupplier-c: 155px (シルバー級)
 * layout-rebsupplier-d: 122px (ブロンズ級)
 * sponsorList:           50%/33% flex wrap
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
 * reb_a  = ゴールド(#dfb664)
 * reb_a2 = レッド(#e60012)
 */
function accentColor(title: string): string {
  if (title === "オフィシャルスポンサー" || title === "アカデミースポンサー") return "#e60012";
  return "#dfb664";
}

export default function CompaniesPage() {
  const [search, setSearch] = useState("");
  const [selectedIndustry, setSelectedIndustry] = useState("すべて");
  const [showMore, setShowMore] = useState(false);

  // レブナイズ35のフィルタリング
  const filterLogos = (logos: typeof sponsorSections[0]["logos"]) => {
    return logos.filter((logo) => {
      const matchSearch = !search
        || logo.name.toLowerCase().includes(search.toLowerCase())
        || (logo.description || "").toLowerCase().includes(search.toLowerCase())
        || (logo.industry || "").includes(search);
      const matchIndustry = selectedIndustry === "すべて" || logo.industry === selectedIndustry;
      return matchSearch && matchIndustry;
    });
  };

  return (
    <div className="space-y-0">
      <FadeIn>
        <div className="mb-6">
          <p className="label">Partner / Sponsor</p>
          <h1 className="h1">スポンサー企業一覧</h1>
          <p className="body mt-3">レブナイズを支えるスポンサー企業をご紹介します</p>
        </div>
      </FadeIn>

      {/* 検索バナー */}
      <div className="relative rounded-lg border border-line p-5 mb-8" style={{ backgroundColor: "#1e1e1e" }}>
        <div className="flex items-center gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-black-400 pointer-events-none" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="企業名・業界・キーワードで検索"
              className="input pl-12 pr-4 py-3.5 text-[15px]"
            />
          </div>
          <button
            onClick={() => { setSearch(""); setSelectedIndustry("すべて"); }}
            className="btn-outline shrink-0 gap-2 px-5 py-3.5"
          >
            <SlidersHorizontal className="w-4 h-4" />
            詳細条件
          </button>
        </div>
        <div className="flex items-center gap-2 mt-3 flex-wrap">
          <span className="text-[13px] text-white font-bold shrink-0">業界:</span>
          {allIndustries.map((ind) => (
            <button
              key={ind}
              onClick={() => setSelectedIndustry(selectedIndustry === ind ? "すべて" : ind)}
              className={selectedIndustry === ind
                ? "text-[14px] text-black font-extrabold bg-white px-4 py-2 rounded-full cursor-pointer"
                : "text-[14px] text-white font-extrabold bg-white/15 hover:bg-white/25 px-4 py-2 rounded-full transition-colors cursor-pointer"
              }
            >
              {ind}
            </button>
          ))}
        </div>
      </div>

      {sponsorSections.map((section, si) => {
        // レブナイズ35 → RebniseCard形式
        if (section.title === "レブナイズ35") {
          const accent = accentColor(section.title);
          const filtered35 = filterLogos(section.logos);
          if (filtered35.length === 0) return null;
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
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5">
                {filterLogos(section.logos).map((logo, li) => {
                  const color = industryColors[logo.industry || ""] || "#6B7280";
                  // この企業の相談を検索
                  const companyConsultations = consultations.filter((c) => {
                    // スポンサー名と直接一致
                    if (logo.name.includes(c.companyName) || c.companyName.includes(logo.name)) return true;
                    // companyId→スポンサー名マッピングで照合
                    const sponsorNames = companyIdToSponsorNames[c.companyId] || [];
                    return sponsorNames.some((sn) => logo.name.includes(sn) || sn.includes(logo.name));
                  });
                  return (
                    <a key={li} href={logo.url || "#"} target="_blank" rel="noopener noreferrer" className="group relative overflow-hidden cursor-pointer block">
                      {/* 右上バッジ */}
                      <div className="absolute top-0 right-0 z-10 flex" style={{ fontSize: 0 }}>
                        <span className="inline-block text-white text-[10px] sm:text-[13px] font-bold text-center px-1.5 sm:px-2.5 py-0.5 sm:py-1" style={{ backgroundColor: color }}>{logo.industry}</span>
                      </div>

                      {/* ロゴエリア */}
                      <div className="overflow-hidden">
                        <img
                          src={`/images/sponsors/${logo.file}`}
                          alt={logo.name}
                          className="w-full h-auto block transition-transform duration-[1200ms] ease-[cubic-bezier(0.165,0.84,0.44,1)] group-hover:scale-[1.05]"
                        />
                      </div>

                      {/* テキストエリア */}
                      <div className="bg-[#333] px-3 pt-3 pb-3 sm:px-5 sm:pt-5 sm:pb-5">
                        <p className="text-[12px] sm:text-[15px] text-white leading-snug mb-1 sm:mb-2 font-bold">
                          {logo.name}
                        </p>
                        <p className="hidden sm:block text-[10px] font-bold tracking-[0.08em] uppercase text-[#888] mb-2">About</p>
                        <p className="hidden sm:block text-[13px] text-[#a2a2a2] leading-relaxed line-clamp-3 mb-3">
                          {logo.description || ""}
                        </p>

                        {/* 相談内容 */}
                        <div className="hidden sm:block border-t border-[#444] pt-3">
                          <div className="flex items-center gap-1.5 mb-2">
                            <MessageSquare className="w-3.5 h-3.5" style={{ color: "#dfb664" }} />
                            <span className="text-[10px] font-extrabold uppercase tracking-wider" style={{ color: "#dfb664" }}>相談内容</span>
                          </div>
                          {companyConsultations.length > 0 ? (
                            companyConsultations.slice(0, 2).map((c) => (
                              <div
                                key={c.id}
                                className="mb-2 rounded-md p-2.5 bg-white/5 hover:bg-white/10 transition-colors cursor-pointer"
                                onClick={(e) => { e.preventDefault(); e.stopPropagation(); window.location.href = `/board/${c.id}`; }}
                              >
                                <p className="text-[12px] text-white font-bold leading-snug mb-1">{c.title}</p>
                                <div className="flex items-center gap-2">
                                  <span className="text-[10px] font-bold text-black px-1.5 py-0.5 rounded" style={{ backgroundColor: "#dfb664" }}>{c.category}</span>
                                  <span className="text-[10px] text-black-400">{c.responses}件の反応</span>
                                </div>
                              </div>
                            ))
                          ) : (
                            <p className="text-[12px] text-black-500 font-medium">まだ相談はありません</p>
                          )}
                        </div>
                      </div>
                    </a>
                  );
                })}
              </div>
            </section>
          );
        }

        if (section.size === "sponsorList") {
          return null;
        }

        // オフィシャルスポンサー以降は showMore で制御
        if (!showMore) return null;

        // ティア別セクション
        const w = logoWidth(section.size);
        const accent = accentColor(section.title);
        const filtered = filterLogos(section.logos);
        if (filtered.length === 0) return null;

        return (
          <section key={si} className="py-6">
            {/* 見出し */}
            <div
              className="mb-6 pb-1.5 font-bold text-[20px] sm:text-[24px]"
              style={{
                borderBottom: "3px solid #3e3e3e",
                color: "#fff",
              }}
            >
              <span
                className="inline-block mr-1 relative"
                style={{
                  width: "0.7em",
                  height: "1.2em",
                  background: accent,
                  top: "0.2em",
                }}
              />
              {section.title}
            </div>

            {/* ロゴグリッド */}
            <div className="text-center">
              {filterLogos(section.logos).map((logo, li) => (
                <div
                  key={li}
                  className="inline-table align-middle"
                  style={{
                    width: w,
                    margin: "10px 5px",
                  }}
                >
                  <a
                    href={logo.url || undefined}
                    target={logo.url ? "_blank" : undefined}
                    rel={logo.url ? "noopener noreferrer" : undefined}
                    className={`block transition-opacity hover:opacity-70${logo.url ? " cursor-pointer" : ""}`}
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

      {/* もっと見る / 閉じる ボタン */}
      <div className="text-center py-6">
        <button
          onClick={() => setShowMore(!showMore)}
          className="inline-flex items-center gap-2 px-8 py-3 text-[15px] font-bold rounded-md transition-all cursor-pointer"
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
    </div>
  );
}
