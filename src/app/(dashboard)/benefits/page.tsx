"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronDown, Gift, Star, ArrowUpDown, Scissors, Clock, ClipboardList, Calendar, CheckCircle } from "lucide-react";
import FadeIn from "@/components/motion/FadeIn";
import { getApplicationHistory, type ApplicationRecord } from "@/lib/applicationHistory";

import { limitedPlans } from "@/data/benefits";

const allCategories = ["すべて", ...Array.from(new Set(limitedPlans.map((p) => p.category)))];

function extractDiscountRate(discount: string): number {
  const match = discount.match(/(\d+)%/);
  return match ? parseInt(match[1], 10) : 0;
}

const sortOptions = [
  { key: "default", label: "おすすめ順" },
  { key: "discount-desc", label: "割引率が高い順" },
  { key: "new", label: "新着順" },
  { key: "expiry", label: "期限が近い順" },
] as const;
type SortKey = typeof sortOptions[number]["key"];

/* ミシン目SVG */
function CouponDivider() {
  return (
    <div className="absolute top-0 bottom-0 flex flex-col items-center justify-center" style={{ right: "clamp(100px, 15vw, 160px)", width: "20px" }}>
      {Array.from({ length: 16 }).map((_, i) => (
        <div key={i} className="w-[2px] rounded-full" style={{ height: "8px", marginBottom: "6px", backgroundColor: "rgba(255,255,255,0.15)" }} />
      ))}
      {/* 上下の半円切り抜き */}
      <div className="absolute -top-[10px] w-5 h-5 rounded-full" style={{ backgroundColor: "#000" }} />
      <div className="absolute -bottom-[10px] w-5 h-5 rounded-full" style={{ backgroundColor: "#000" }} />
    </div>
  );
}

export default function BenefitsPage() {
  const [selectedCategory, setSelectedCategory] = useState("すべて");
  const [sortKey, setSortKey] = useState<SortKey>("default");
  const [sortOpen, setSortOpen] = useState(false);
  const [history, setHistory] = useState<ApplicationRecord[]>([]);

  useEffect(() => {
    setHistory(getApplicationHistory().filter((r) => r.type === "benefit"));
  }, []);

  const filtered = selectedCategory === "すべて"
    ? [...limitedPlans]
    : limitedPlans.filter((p) => p.category === selectedCategory);

  const sorted = filtered.sort((a, b) => {
    switch (sortKey) {
      case "discount-desc":
        return extractDiscountRate(b.discount) - extractDiscountRate(a.discount);
      case "new":
        return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0) || b.id - a.id;
      case "expiry":
        return new Date(a.validUntil).getTime() - new Date(b.validUntil).getTime();
      default:
        return a.id - b.id;
    }
  });

  return (
    <FadeIn>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <p className="label">Exclusive Plans</p>
          <h1 className="h1">スポンサー限定プラン</h1>
          <p className="body mt-3">レブナイズスポンサー企業様だけがご利用いただけるお得な限定プランです</p>
        </div>

        {/* サマリー */}
        <div className="grid grid-cols-3 gap-3">
          <div className="rounded-lg border border-line p-4 text-center" style={{ backgroundColor: "#1e1e1e" }}>
            <p className="text-[28px] font-black leading-none" style={{ color: "#dfb664" }}>{limitedPlans.length}</p>
            <p className="text-[12px] font-bold text-black-400 mt-1">提供プラン数</p>
          </div>
          <div className="rounded-lg border border-line p-4 text-center" style={{ backgroundColor: "#1e1e1e" }}>
            <p className="text-[28px] font-black leading-none" style={{ color: "#E63350" }}>50%</p>
            <p className="text-[12px] font-bold text-black-400 mt-1">最大割引率</p>
          </div>
          <div className="rounded-lg border border-line p-4 text-center" style={{ backgroundColor: "#1e1e1e" }}>
            <p className="text-[28px] font-black leading-none" style={{ color: "#dfb664" }}>{limitedPlans.filter(p => p.isNew).length}</p>
            <p className="text-[12px] font-bold text-black-400 mt-1">新着プラン</p>
          </div>
        </div>

        {/* フィルター + ソート */}
        <div className="flex items-center gap-2 flex-wrap">
          {allCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`text-[14px] font-extrabold px-4 py-2 rounded-full transition-colors cursor-pointer ${
                selectedCategory === cat
                  ? "bg-white text-black"
                  : "bg-white/15 text-white hover:bg-white/25"
              }`}
            >
              {cat}
            </button>
          ))}
          <div className="relative ml-auto">
            <button
              onClick={() => setSortOpen(!sortOpen)}
              className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/15 text-white hover:bg-white/25 transition-colors cursor-pointer"
            >
              <ArrowUpDown className="w-3.5 h-3.5" />
              <span className="text-[14px] font-extrabold">{sortOptions.find((o) => o.key === sortKey)?.label}</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${sortOpen ? "rotate-180" : ""}`} />
            </button>
            {sortOpen && (
              <div className="absolute right-0 top-full mt-2 w-48 rounded-lg border border-line py-1 z-50 shadow-lg" style={{ backgroundColor: "#1e1e1e" }}>
                {sortOptions.map((opt) => (
                  <button
                    key={opt.key}
                    onClick={() => { setSortKey(opt.key); setSortOpen(false); }}
                    className={`w-full text-left px-4 py-2.5 text-[13px] font-bold transition-colors cursor-pointer ${
                      sortKey === opt.key ? "text-white bg-white/10" : "text-black-400 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* クーポン一覧 */}
        <div className="space-y-4">
          {sorted.map((plan) => (
            <Link
              href={`/benefits/${plan.id}`}
              key={plan.id}
              className="relative rounded-xl overflow-hidden group cursor-pointer hover:scale-[1.01] transition-transform duration-300 block"
              style={{ backgroundColor: "#1e1e1e", border: "1px solid #333" }}
            >
              {/* ミシン目 */}
              <CouponDivider />

              <div className="flex">
                {/* 左側: メイン情報 */}
                <div className="flex-1 p-3 sm:p-6" style={{ marginRight: "clamp(100px, 15vw, 160px)" }}>
                  <div className="flex items-center gap-2 sm:gap-3 mb-1.5 sm:mb-3">
                    <div className="w-8 h-8 sm:w-12 sm:h-12 rounded-md overflow-hidden shrink-0 bg-white">
                      <img src={plan.logo} alt={plan.company} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5 sm:gap-2">
                        <p className="text-[12px] sm:text-[15px] font-bold" style={{ color: "#dfb664" }}>{plan.company}</p>
                        {plan.isNew && (
                          <span className="text-[8px] sm:text-[10px] font-bold text-white px-1.5 sm:px-2 py-0.5 rounded-full" style={{ backgroundColor: "#C8102E" }}>NEW</span>
                        )}
                      </div>
                      <p className="text-[10px] sm:text-[12px] text-black-500">{plan.category}</p>
                    </div>
                  </div>

                  <h3 className="text-[13px] sm:text-[19px] font-black text-white leading-snug mb-1 sm:mb-2 group-hover:text-red transition-colors line-clamp-2">
                    {plan.title}
                  </h3>
                  <p className="hidden sm:block text-[14px] text-black-400 leading-relaxed line-clamp-2 mb-3">
                    {plan.description}
                  </p>

                  <div className="flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-[12px] text-black-500">
                    <Clock className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                    <span>{plan.validUntil}</span>
                  </div>
                </div>

                {/* 右側: 割引チケット部分 */}
                <div
                  className="absolute right-0 top-0 bottom-0 flex flex-col items-center justify-center text-center overflow-hidden"
                  style={{ width: "clamp(100px, 15vw, 160px)", backgroundColor: "#C8102E" }}
                >
                  <Scissors className="w-3 h-3 sm:w-4 sm:h-4 text-white/40 absolute top-2 left-1.5 sm:top-3 sm:left-2 rotate-90" />
                  <p className="text-[9px] sm:text-[11px] font-bold text-white/60 tracking-wider uppercase mb-0.5 sm:mb-1">COUPON</p>
                  <p className="text-[16px] sm:text-[24px] font-black text-white leading-none px-1 sm:px-3 break-all">
                    {plan.discount}
                  </p>
                  <div className="w-6 sm:w-10 h-[2px] bg-white/30 rounded-full my-1 sm:my-2" />
                  <p className="text-[9px] sm:text-[11px] font-bold text-white/70">限定</p>
                  <Link
                    href={`/benefits/${plan.id}`}
                    className="mt-1.5 sm:mt-3 px-2.5 sm:px-4 py-1 sm:py-1.5 rounded-full text-[10px] sm:text-[12px] font-bold bg-white text-[#C8102E] hover:bg-white/90 transition-colors inline-block"
                    onClick={(e) => e.stopPropagation()}
                  >
                    使う
                  </Link>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* 申込履歴 */}
        {history.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-4">
              <ClipboardList className="w-5 h-5" style={{ color: "#dfb664" }} />
              <h2 className="text-[20px] font-bold text-white">申込履歴</h2>
              <span className="text-[12px] font-bold px-2 py-0.5 rounded-full" style={{ backgroundColor: "rgba(223,182,100,0.15)", color: "#dfb664" }}>
                {history.length}件
              </span>
            </div>
            <div className="space-y-2">
              {history.map((record) => (
                <div
                  key={record.id}
                  className="rounded-lg border border-line p-4 flex items-center gap-4"
                  style={{ backgroundColor: "#1e1e1e" }}
                >
                  <div
                    className="w-10 h-10 rounded-md flex items-center justify-center shrink-0"
                    style={{ backgroundColor: "rgba(34,197,94,0.15)" }}
                  >
                    <CheckCircle className="w-5 h-5" style={{ color: "#22c55e" }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[14px] font-bold text-white">{record.planTitle}</p>
                    <div className="flex items-center gap-3 mt-0.5">
                      <span className="text-[12px] text-black-400">{record.company}</span>
                      {record.discount && (
                        <span className="text-[11px] font-bold px-1.5 py-0.5 rounded" style={{ backgroundColor: "rgba(200,16,46,0.15)", color: "#E63350" }}>
                          {record.discount}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="flex items-center gap-1 text-[11px] text-black-500">
                      <Calendar className="w-3 h-3" />
                      <span>{record.appliedAt}</span>
                    </div>
                    <p className="text-[11px] text-black-500 mt-0.5">{record.name} ({record.companyName})</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CTA */}
        <div
          className="rounded-xl p-8 text-center border"
          style={{ backgroundColor: "rgba(223,182,100,0.06)", borderColor: "rgba(223,182,100,0.2)" }}
        >
          <Star className="w-8 h-8 mx-auto mb-3" style={{ color: "#dfb664" }} />
          <h3 className="text-[22px] font-bold text-white mb-2">限定プランを掲載しませんか？</h3>
          <p className="text-[15px] text-black-400 mb-5">
            スポンサー企業様同士のビジネスを活性化する限定プランを募集しています。<br />
            お気軽に運営までご相談ください。
          </p>
          <button
            className="btn-primary px-8 py-3"
            onClick={() => window.open("mailto:sponsor@rebnise.jp?subject=限定プラン掲載希望", "_blank")}
          >
            掲載を相談する
          </button>
        </div>
      </div>
    </FadeIn>
  );
}
