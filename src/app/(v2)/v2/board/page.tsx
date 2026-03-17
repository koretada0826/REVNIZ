"use client";

import Link from "next/link";
import { Plus, MessageSquare, Clock, TrendingUp, ChevronRight, MapPin } from "lucide-react";
import { consultations } from "@/data/mock";

const categories = ["すべて", "販路拡大", "採用", "DX", "イベント"];

export default function BoardV2Page() {
  return (
    <div className="space-y-6 animate-in">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-red block mb-1.5">Board</span>
          <h1 className="text-[2rem] font-bold text-white tracking-tight leading-[1.1]">相談・案件掲示板</h1>
          <p className="text-[13px] text-white/40 leading-relaxed mt-1.5">困っていること、探していることを投稿し、接点のきっかけを作る</p>
        </div>
        <button className="btn-red shrink-0 shadow-red"><Plus className="w-4 h-4 mr-1.5" /> 相談を投稿する</button>
      </div>

      <div className="flex gap-0 border-b border-white/[0.06]">
        {[{ l: "新着", i: MessageSquare }, { l: "人気", i: TrendingUp }, { l: "締切間近", i: Clock }].map((t, idx) => (
          <button key={t.l} className={`flex items-center gap-1.5 px-4 py-3 text-[13px] font-medium border-b-2 transition-colors ${idx === 0 ? "border-red text-white" : "border-transparent text-white/30 hover:text-white"}`}>
            <t.i className="w-3.5 h-3.5" /> {t.l}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap gap-1.5">{categories.map((c, i) => <button key={c} className={`inline-flex items-center rounded-full px-3 py-1.5 text-[12px] font-medium border cursor-pointer transition-all ${i === 0 ? "bg-white text-black-900 border-white font-semibold" : "bg-transparent border-white/[0.08] text-white/40 hover:border-white/20 hover:text-white"}`}>{c}</button>)}</div>

      <div className="space-y-2.5">
        {consultations.map((p) => (
          <div key={p.id} className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-5 hover:bg-white/[0.04] hover:border-white/[0.1] transition-all group cursor-pointer">
            <div className="flex items-start gap-4">
              <div className="w-9 h-9 rounded bg-white/[0.04] flex items-center justify-center shrink-0 mt-0.5"><MessageSquare className="w-4 h-4 text-white/20" /></div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="inline-flex items-center rounded-sm px-2 py-[3px] text-[10px] font-bold bg-emerald-500/10 text-emerald-400">{p.category}</span>
                  {p.deadline && <span className="text-[11px] text-white/20 flex items-center gap-1"><Clock className="w-3 h-3" /> 〜{p.deadline}</span>}
                </div>
                <h3 className="font-bold text-white text-[14px] mb-1 group-hover:text-red-400 transition-colors">{p.title}</h3>
                <p className="text-[13px] text-white/40 leading-relaxed line-clamp-2 mb-2">{p.content}</p>
                <div className="flex items-center gap-3 text-[11px] text-white/30">
                  <span className="font-semibold text-white/60">{p.companyName}</span>
                  <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {p.targetArea}</span>
                  <span>{p.createdAt}</span>
                </div>
              </div>
              <div className="flex flex-col items-center gap-1 shrink-0 pt-1">
                <p className="text-[18px] font-bold text-white">{p.responses}</p>
                <p className="text-[9px] text-white/20 uppercase tracking-wide">反応</p>
                <ChevronRight className="w-4 h-4 text-white/10 group-hover:text-red-400 transition-colors mt-1" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
