"use client";

import { Trophy, Quote, TrendingUp } from "lucide-react";
import { successCases } from "@/data/mock";
import FadeIn from "@/components/motion/FadeIn";

const rankColors = ["#dfb664", "#C0C0C0", "#CD7F32"];

export default function CasesPage() {
  const top3 = successCases.slice(0, 3);
  const first = top3[0];
  const rest = successCases.slice(3);

  return (
    <FadeIn><div className="space-y-10">
      <div>
        <p className="label">Season Results</p>
        <h1 className="h1">今シーズンの成功事例</h1>
        <p className="body mt-3">スポンサー活動から生まれた具体的な成果をご紹介します</p>
      </div>

      {/* サマリー帯 */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { value: `${successCases.length}件`, label: "成功事例" },
          { value: "120名", label: "最大新規申込" },
          { value: "130%", label: "最高売上比" },
          { value: "85%", label: "最高回収率" },
        ].map((s) => (
          <div key={s.label} className="border border-line p-4 text-center" style={{ backgroundColor: "#1e1e1e" }}>
            <p className="text-[28px] font-black leading-none" style={{ color: "#E63350" }}>{s.value}</p>
            <p className="text-[12px] font-bold text-black-400 mt-1.5">{s.label}</p>
          </div>
        ))}
      </div>

      {/* ===== 1位: フル幅ヒーロー ===== */}
      {first && (
        <section>
          <div
            className="overflow-hidden group"
            style={{ border: `2px solid ${rankColors[0]}40` }}
          >
            <div className="relative overflow-hidden" style={{ height: "clamp(200px, 40vw, 320px)" }}>
              <img
                src={first.image}
                alt={first.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-8">
                <div className="flex items-end justify-between gap-3 sm:gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 sm:gap-3 mb-1.5 sm:mb-3">
                      <img src={first.logo} alt={first.company} className="w-8 h-8 sm:w-12 sm:h-12 rounded-md object-cover bg-white border-2 border-white" />
                      <div>
                        <p className="text-[12px] sm:text-[16px] font-bold text-white">{first.company}</p>
                        <span className="text-[10px] sm:text-[13px] font-bold text-white/50">{first.category} · {first.date}</span>
                      </div>
                    </div>
                    <h2 className="text-[16px] sm:text-[32px] font-black text-white leading-snug mb-1 sm:mb-2">{first.title}</h2>
                    <p className="hidden sm:block text-[16px] text-white/70 leading-relaxed line-clamp-2">{first.description}</p>
                  </div>
                  <div
                    className="text-right shrink-0 rounded-lg px-3 py-2 sm:px-4 sm:py-3 backdrop-blur-md shadow-xl"
                    style={{
                      background: "linear-gradient(135deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.7) 100%)",
                      border: "1px solid rgba(223,182,100,0.45)",
                    }}
                  >
                    <p className="text-[28px] sm:text-[48px] font-black leading-none tracking-tight" style={{ color: "#dfb664" }}>{first.metric}</p>
                    <p className="text-[9px] sm:text-[12px] font-bold text-white mt-1 sm:mt-1.5 tracking-[0.12em] uppercase">{first.metricLabel}</p>
                  </div>
                </div>
              </div>
            </div>
            {/* 詳細 + コメント */}
            <div className="p-4 sm:p-8 space-y-3 sm:space-y-4" style={{ backgroundColor: "#1a1a1a" }}>
              <div className="rounded-lg p-3 sm:p-5 bg-white/5">
                <div className="flex items-center gap-2 mb-1 sm:mb-2">
                  <TrendingUp className="w-3.5 h-3.5 sm:w-4 sm:h-4" style={{ color: "#dfb664" }} />
                  <span className="text-[10px] sm:text-[11px] font-extrabold tracking-[0.1em] uppercase" style={{ color: "#dfb664" }}>詳細</span>
                </div>
                <p className="text-[13px] sm:text-[16px] text-black-300 leading-relaxed line-clamp-3 sm:line-clamp-none">{first.detail}</p>
              </div>
              <div className="rounded-lg p-3 sm:p-5 flex gap-2 sm:gap-3" style={{ backgroundColor: "#111" }}>
                <Quote className="w-4 h-4 sm:w-5 sm:h-5 shrink-0 mt-0.5" style={{ color: "#dfb664" }} />
                <p className="text-[13px] sm:text-[16px] text-white font-medium leading-relaxed line-clamp-2 sm:line-clamp-none">{first.comment}</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ===== 2位・3位: 横並び ===== */}
      {top3.length > 1 && (
        <section>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {top3.slice(1).map((sc, idx) => {
              const rank = idx + 1;
              return (
                <div
                  key={sc.id}
                  className="overflow-hidden group"
                  style={{ backgroundColor: "#1e1e1e", border: `2px solid ${rankColors[rank]}40` }}
                >
                  {/* 画像 */}
                  <div className="relative overflow-hidden h-[140px] sm:h-[200px]">
                    <img src={sc.image} alt={sc.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-5 flex items-end justify-between">
                      <div className="flex items-center gap-1.5 sm:gap-2">
                        <img src={sc.logo} alt={sc.company} className="w-7 h-7 sm:w-10 sm:h-10 rounded object-cover bg-white border-2 border-white" />
                        <div>
                          <p className="text-[11px] sm:text-[14px] font-bold text-white">{sc.company}</p>
                          <p className="text-[9px] sm:text-[12px] text-white/50">{sc.date}</p>
                        </div>
                      </div>
                      <div
                        className="text-right rounded-lg px-2.5 py-1.5 sm:px-3 sm:py-2 backdrop-blur-md shadow-xl"
                        style={{
                          background: "linear-gradient(135deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.7) 100%)",
                          border: "1px solid rgba(223,182,100,0.45)",
                        }}
                      >
                        <p className="text-[20px] sm:text-[30px] font-black leading-none tracking-tight" style={{ color: "#dfb664" }}>{sc.metric}</p>
                        <p className="text-[8px] sm:text-[10px] font-bold text-white mt-0.5 sm:mt-1 tracking-[0.1em] uppercase">{sc.metricLabel}</p>
                      </div>
                    </div>
                    <span className="absolute top-2 left-2 sm:top-3 sm:left-3 text-[9px] sm:text-[11px] font-bold text-white px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full" style={{ backgroundColor: "rgba(200,16,46,0.85)" }}>
                      {sc.category}
                    </span>
                  </div>

                  {/* テキスト */}
                  <div className="p-3 sm:p-5">
                    <h3 className="text-[14px] sm:text-[18px] font-black text-white leading-snug mb-1 sm:mb-2">{sc.title}</h3>
                    <p className="hidden sm:block text-[15px] text-black-400 leading-relaxed mb-4">{sc.description}</p>
                    <div className="rounded-md p-2.5 sm:p-4 flex gap-2 sm:gap-3" style={{ backgroundColor: "#111" }}>
                      <Quote className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0 mt-0.5" style={{ color: "#dfb664" }} />
                      <p className="text-[12px] sm:text-[14px] text-white/80 font-medium leading-relaxed line-clamp-2">{sc.comment}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* ===== 残りの事例: 3カラムギャラリー ===== */}
      {rest.length > 0 && (
        <section>
          <h2 className="text-[24px] font-black text-white mb-5">その他の成功事例</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {rest.map((sc) => (
              <div
                key={sc.id}
                className="overflow-hidden group cursor-pointer"
                style={{ backgroundColor: "#1e1e1e", border: "1px solid #333" }}
              >
                {/* 画像 */}
                <div className="relative overflow-hidden h-[120px] sm:h-[170px]">
                  <img src={sc.image} alt={sc.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                  {/* メトリクス（ホバー時表示） */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div
                      className="rounded-lg px-5 py-3 text-center backdrop-blur-md shadow-xl"
                      style={{
                        background: "linear-gradient(135deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.7) 100%)",
                        border: "1px solid rgba(223,182,100,0.45)",
                      }}
                    >
                      <p className="text-[36px] font-black leading-none tracking-tight" style={{ color: "#dfb664" }}>{sc.metric}</p>
                      <p className="text-[10px] font-bold text-white mt-1.5 tracking-[0.12em] uppercase">{sc.metricLabel}</p>
                    </div>
                  </div>
                  {/* 企業ロゴ */}
                  <div className="absolute bottom-2 left-2 sm:bottom-3 sm:left-3 flex items-center gap-1.5 sm:gap-2">
                    <img src={sc.logo} alt={sc.company} className="w-6 h-6 sm:w-8 sm:h-8 rounded object-cover bg-white border-2 border-white" />
                    <span className="text-[11px] sm:text-[13px] font-bold text-white drop-shadow-md">{sc.company}</span>
                  </div>
                  <span className="absolute top-2 right-2 text-[9px] sm:text-[11px] font-bold text-white px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full" style={{ backgroundColor: "rgba(200,16,46,0.85)" }}>
                    {sc.category}
                  </span>
                </div>

                {/* テキスト */}
                <div className="p-3 sm:p-4">
                  <div className="flex items-center justify-between mb-1 sm:mb-2">
                    <h3 className="text-[13px] sm:text-[16px] font-bold text-white leading-snug flex-1 mr-2 sm:mr-3">{sc.title}</h3>
                    <div className="text-right shrink-0">
                      <p className="text-[18px] sm:text-[24px] font-black leading-none tracking-tight" style={{ color: "#dfb664" }}>{sc.metric}</p>
                      <p className="text-[9px] sm:text-[10px] font-bold text-white/70 mt-0.5 tracking-[0.1em] uppercase">{sc.metricLabel}</p>
                    </div>
                  </div>
                  <p className="text-[14px] text-black-400 leading-relaxed line-clamp-2">{sc.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* CTA */}
      <div className="overflow-hidden" style={{ background: "linear-gradient(135deg, #1a1a1a 0%, #111 100%)", border: "1px solid #333" }}>
        <div className="px-6 py-3" style={{ background: "linear-gradient(135deg, #dfb664 0%, #c4a35a 100%)" }}>
          <span className="text-[12px] font-black text-black tracking-wider uppercase">Share Your Success</span>
        </div>
        <div className="p-8 sm:p-10 text-center">
          <h2 className="text-[28px] font-black text-white mb-3 leading-snug">
            あなたのスポンサー活動の成果を教えてください
          </h2>
          <p className="text-[16px] text-black-300 font-bold leading-relaxed max-w-[600px] mx-auto mb-6">
            PRブース・コラボ商品・看板広告・来店イベントなど、<br />
            スポンサー活動で得られた成果を共有して、仲間を刺激しましょう。
          </p>
          <a
            href="mailto:sponsor@rebnise.jp?subject=成功事例の共有"
            className="inline-flex items-center justify-center px-8 py-3.5 text-[16px] font-bold text-black rounded-md transition-colors hover:opacity-90"
            style={{ backgroundColor: "#dfb664" }}
          >
            成功事例を運営に共有する
          </a>
        </div>
      </div>
    </div></FadeIn>
  );
}
