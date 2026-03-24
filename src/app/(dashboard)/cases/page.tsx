"use client";

import { useRef } from "react";
import { Trophy, Quote, Handshake, MessageSquare, TrendingUp, ChevronLeft, ChevronRight } from "lucide-react";
import { successCases } from "@/data/mock";
import FadeIn from "@/components/motion/FadeIn";

export default function CasesPage() {
  const pickup = successCases[0];
  const others = successCases.slice(1);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = 340;
    scrollRef.current.scrollBy({
      left: direction === "right" ? amount : -amount,
      behavior: "smooth",
    });
  };

  return (
    <FadeIn><div className="space-y-6">
      <div>
        <p className="label">Success Cases</p>
        <h1 className="h1">成功事例</h1>
        <p className="body mt-3">Sponsor Connectで実際に生まれた商談や連携の事例</p>
      </div>

      {/* ピックアップ（大きく表示） */}
      {pickup && (
        <div className="rounded-xl overflow-hidden bg-white">
          <div
            className="px-6 py-4 flex items-center justify-between"
            style={{ background: "linear-gradient(135deg, #dfb664 0%, #c4a35a 100%)" }}
          >
            <div className="flex items-center gap-3">
              <Trophy className="w-5 h-5 text-black" />
              <span className="text-[13px] font-black text-black tracking-wider uppercase">PICK UP</span>
            </div>
            <span className="text-[12px] font-bold text-white px-3 py-1 rounded-full" style={{ backgroundColor: "rgba(0,0,0,0.3)" }}>
              {pickup.category}
            </span>
          </div>

          {pickup.image && (
            <div className="relative overflow-hidden" style={{ height: "240px" }}>
              <img src={pickup.image} alt={pickup.title} className="w-full h-full object-cover" />
            </div>
          )}

          <div className="p-6 sm:p-8">
            <h2 className="text-[22px] font-black text-[#1a1a1a] tracking-tight mb-4 leading-snug">{pickup.title}</h2>
            <div className="flex flex-wrap gap-2 mb-6">
              {pickup.companies.map((n) => (
                <span key={n} className="rounded-full px-4 py-2 text-[14px] font-bold text-white" style={{ backgroundColor: "#1a1a1a" }}>{n}</span>
              ))}
            </div>
            <div className="grid sm:grid-cols-3 gap-4 mb-6">
              {[
                { l: "出会いのきっかけ", t: pickup.howTheyMet, icon: Handshake, bg: "#f8f6f1" },
                { l: "相談内容", t: pickup.consultation, icon: MessageSquare, bg: "#f1f5f9" },
                { l: "その後の結果", t: pickup.result, icon: TrendingUp, bg: "#fef3e6", highlight: true },
              ].map((x) => (
                <div key={x.l} className="rounded-lg p-5" style={{ backgroundColor: x.bg }}>
                  <div className="flex items-center gap-2 mb-3">
                    <x.icon className="w-4 h-4" style={{ color: x.highlight ? "#dfb664" : "#888" }} />
                    <span className="text-[11px] font-extrabold tracking-[0.1em] uppercase" style={{ color: x.highlight ? "#dfb664" : "#888" }}>{x.l}</span>
                  </div>
                  <p className={`text-[14px] leading-relaxed ${x.highlight ? "text-[#1a1a1a] font-bold" : "text-[#555]"}`}>{x.t}</p>
                </div>
              ))}
            </div>
            <div className="rounded-lg p-5 flex gap-4" style={{ backgroundColor: "#1a1a1a" }}>
              <Quote className="w-5 h-5 shrink-0 mt-0.5" style={{ color: "#dfb664" }} />
              <p className="text-[15px] text-white font-medium italic leading-relaxed">{pickup.comment}</p>
            </div>
          </div>
        </div>
      )}

      {/* その他の事例（横スクロール） */}
      {others.length > 0 && (
        <div className="relative">
          {/* スクロールボタン — デスクトップのみ */}
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-[22px] font-black text-white">その他の事例</h2>
            <div className="hidden sm:flex gap-2">
              <button
                onClick={() => scroll("left")}
                className="w-10 h-10 rounded-full flex items-center justify-center transition-colors hover:opacity-80"
                style={{ backgroundColor: "#dfb664" }}
              >
                <ChevronLeft className="w-5 h-5 text-black" />
              </button>
              <button
                onClick={() => scroll("right")}
                className="w-10 h-10 rounded-full flex items-center justify-center transition-colors hover:opacity-80"
                style={{ backgroundColor: "#dfb664" }}
              >
                <ChevronRight className="w-5 h-5 text-black" />
              </button>
            </div>
          </div>
          <div ref={scrollRef} className="overflow-x-auto -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 snap-x snap-mandatory" style={{ scrollbarWidth: "none", WebkitOverflowScrolling: "touch" }}>
          <div className="flex gap-3 sm:gap-5" style={{ minWidth: "max-content" }}>
          {others.map((sc, idx) => (
            <div key={sc.id} className="rounded-xl overflow-hidden bg-white shrink-0 snap-start" style={{ width: "260px" }}>
              {/* ゴールド帯（細め） */}
              <div
                className="px-4 py-2.5 flex items-center justify-between"
                style={{ background: "linear-gradient(135deg, #dfb664 0%, #c4a35a 100%)" }}
              >
                <span className="text-[11px] font-black text-black tracking-wider uppercase">
                  CASE {String(idx + 2).padStart(2, "0")}
                </span>
                <span className="text-[10px] font-bold text-white px-2 py-0.5 rounded-full" style={{ backgroundColor: "rgba(0,0,0,0.3)" }}>
                  {sc.category}
                </span>
              </div>

              {/* 写真（小さめ） */}
              {sc.image && (
                <div className="relative overflow-hidden" style={{ height: "140px" }}>
                  <img src={sc.image} alt={sc.title} className="w-full h-full object-cover" />
                </div>
              )}

              {/* 本体（コンパクト） */}
              <div className="p-4">
                <h3 className="text-[16px] font-black text-[#1a1a1a] tracking-tight mb-2 leading-snug">{sc.title}</h3>
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {sc.companies.map((n) => (
                    <span key={n} className="rounded-full px-3 py-1 text-[12px] font-bold text-white" style={{ backgroundColor: "#1a1a1a" }}>{n}</span>
                  ))}
                </div>
                <div className="space-y-2 mb-3">
                  <div className="rounded-md p-3" style={{ backgroundColor: "#f8f6f1" }}>
                    <span className="text-[10px] font-extrabold text-[#888] tracking-wider uppercase block mb-1">結果</span>
                    <p className="text-[13px] text-[#1a1a1a] font-bold leading-relaxed">{sc.result}</p>
                  </div>
                </div>
                <div className="rounded-md p-3 flex gap-3" style={{ backgroundColor: "#1a1a1a" }}>
                  <Quote className="w-4 h-4 shrink-0 mt-0.5" style={{ color: "#dfb664" }} />
                  <p className="text-[13px] text-white font-medium italic leading-relaxed line-clamp-2">{sc.comment}</p>
                </div>
              </div>
            </div>
          ))}
          </div>
          </div>
        </div>
      )}
      {/* 課題を提出するセクション */}
      <div className="rounded-xl overflow-hidden" style={{ background: "linear-gradient(135deg, #1a1a1a 0%, #111 100%)", border: "1px solid #333" }}>
        <div className="px-6 py-3" style={{ background: "linear-gradient(135deg, #dfb664 0%, #c4a35a 100%)" }}>
          <span className="text-[12px] font-black text-black tracking-wider uppercase">Submit Your Case</span>
        </div>
        <div className="p-8 sm:p-10 text-center">
          <h2 className="text-[26px] font-black text-white mb-3 leading-snug">
            あなたの課題を共有しませんか？
          </h2>
          <p className="text-[15px] text-black-300 font-bold leading-relaxed max-w-[600px] mx-auto mb-6">
            スポンサー企業同士だからこそ解決できる課題があります。<br />
            あなたの課題を掲示板に投稿して、最適なパートナーを見つけましょう。
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="/board"
              className="inline-flex items-center justify-center px-8 py-3.5 text-[16px] font-bold text-black rounded-md transition-colors hover:opacity-90"
              style={{ backgroundColor: "#dfb664" }}
            >
              相談掲示板で課題を投稿する
            </a>
            <a
              href="/companies"
              className="inline-flex items-center justify-center px-8 py-3.5 text-[16px] font-bold text-white rounded-md border border-line hover:bg-white/10 transition-colors"
            >
              スポンサー企業を探す
            </a>
          </div>
        </div>
      </div>
    </div></FadeIn>
  );
}
