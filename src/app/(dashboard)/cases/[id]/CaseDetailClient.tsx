"use client";

import Link from "next/link";
import { ArrowLeft, TrendingUp, Quote, Building2, Calendar } from "lucide-react";
import { successCases } from "@/data/mock";
import FadeIn from "@/components/motion/FadeIn";

export default function CaseDetailClient({ id }: { id: string }) {
  const sc = successCases.find((c) => c.id === id);

  if (!sc) {
    return (
      <FadeIn>
        <div className="text-center py-20">
          <p className="text-[18px] text-white font-bold mb-4">事例が見つかりません</p>
          <Link href="/cases" className="btn-primary">成功事例一覧に戻る</Link>
        </div>
      </FadeIn>
    );
  }

  return (
    <FadeIn>
      <div className="max-w-4xl mx-auto space-y-8">
        {/* 戻る */}
        <Link
          href="/cases"
          className="inline-flex items-center gap-2 text-[14px] font-semibold text-black-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> 成功事例一覧に戻る
        </Link>

        {/* ヒーロー画像 */}
        <div className="relative rounded-xl overflow-hidden" style={{ height: "clamp(200px, 40vw, 360px)" }}>
          <img
            src={sc.image}
            alt={sc.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
            <div className="flex items-end justify-between gap-4">
              <div className="flex-1 min-w-0">
                <span
                  className="text-[11px] font-bold text-white px-2.5 py-1 rounded-full inline-block mb-3"
                  style={{ backgroundColor: "rgba(200,16,46,0.85)" }}
                >
                  {sc.category}
                </span>
                <div className="flex items-center gap-3 mb-3">
                  <img src={sc.logo} alt={sc.company} className="w-10 h-10 sm:w-12 sm:h-12 rounded-md object-cover bg-white border-2 border-white" />
                  <div>
                    <p className="text-[15px] font-bold text-white">{sc.company}</p>
                    <span className="text-[12px] text-white/60">{sc.date}</span>
                  </div>
                </div>
                <h1 className="text-[22px] sm:text-[32px] font-black text-white leading-snug">
                  {sc.title}
                </h1>
              </div>
              <div
                className="text-right shrink-0 rounded-lg px-3.5 py-2.5 sm:px-4 sm:py-3 backdrop-blur-md shadow-xl"
                style={{
                  background: "linear-gradient(135deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.7) 100%)",
                  border: "1px solid rgba(223,182,100,0.45)",
                }}
              >
                <p className="text-[36px] sm:text-[48px] font-black leading-none tracking-tight" style={{ color: "#dfb664" }}>{sc.metric}</p>
                <p className="text-[10px] sm:text-[12px] font-bold text-white mt-1 sm:mt-1.5 tracking-[0.12em] uppercase">{sc.metricLabel}</p>
              </div>
            </div>
          </div>
        </div>

        {/* 概要 */}
        <div
          className="rounded-xl border border-line p-6 sm:p-8"
          style={{ backgroundColor: "#1e1e1e" }}
        >
          <h2 className="text-[18px] font-bold text-white mb-4">概要</h2>
          <p className="text-[16px] text-black-300 leading-relaxed">{sc.description}</p>
        </div>

        {/* 詳細 */}
        <div
          className="rounded-xl border border-line p-6 sm:p-8"
          style={{ backgroundColor: "#1e1e1e" }}
        >
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-5 h-5" style={{ color: "#dfb664" }} />
            <h2 className="text-[18px] font-bold text-white">詳細</h2>
          </div>
          <p className="text-[16px] text-black-300 leading-[1.8]">{sc.detail}</p>
        </div>

        {/* コメント */}
        <div
          className="rounded-xl p-6 sm:p-8 flex gap-4"
          style={{ backgroundColor: "#111", border: "1px solid #333", borderLeft: "4px solid #dfb664" }}
        >
          <Quote className="w-6 h-6 shrink-0 mt-0.5" style={{ color: "#dfb664" }} />
          <p className="text-[18px] text-white font-medium leading-relaxed">{sc.comment}</p>
        </div>

        {/* 戻るボタン */}
        <div className="text-center">
          <Link href="/cases" className="btn-primary px-8 py-3">
            すべての成功事例を見る
          </Link>
        </div>
      </div>
    </FadeIn>
  );
}
