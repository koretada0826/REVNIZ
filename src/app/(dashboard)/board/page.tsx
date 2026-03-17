"use client";

import Link from "next/link";
import { Plus, MessageSquare, Clock, TrendingUp, ChevronRight, MapPin } from "lucide-react";
import { consultations } from "@/data/mock";

const categories = ["すべて", "販路拡大", "採用", "DX", "イベント"];

export default function BoardPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <p className="label">Board</p>
          <h1 className="h1">相談・案件掲示板</h1>
          <p className="body mt-3">困っていること、探していることを投稿し、接点のきっかけを作る</p>
        </div>
        <button className="btn-red shrink-0 text-[15px] px-6 py-3"><Plus className="w-5 h-5 mr-2" /> 相談を投稿する</button>
      </div>

      <div className="flex gap-0 border-b border-line">
        {[{ l: "新着", i: MessageSquare }, { l: "人気", i: TrendingUp }, { l: "締切間近", i: Clock }].map((t, idx) => (
          <button key={t.l} className={`flex items-center gap-2 px-5 py-3.5 text-[14px] font-medium border-b-2 transition-colors ${idx === 0 ? "border-black-900 text-black-900" : "border-transparent text-muted hover:text-black-900"}`}>
            <t.i className="w-4 h-4" /> {t.l}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap gap-2">{categories.map((c, i) => <button key={c} className={i === 0 ? "tag-active" : "tag"}>{c}</button>)}</div>

      <div className="space-y-3">
        {consultations.map((p) => (
          <div key={p.id} className="card-interactive group">
            <div className="flex items-start gap-5">
              <div className="avatar-sm mt-0.5">
                <MessageSquare className="w-4 h-4 text-black-300" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2">
                  <span className="badge-green">{p.category}</span>
                  {p.deadline && <span className="caption flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> 〜{p.deadline}</span>}
                </div>
                <h3 className="font-bold text-black-900 text-[17px] mb-2 group-hover:text-red transition-colors">{p.title}</h3>
                <p className="body-sm line-clamp-2 mb-4">{p.content}</p>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2.5">
                    <div className="avatar-sm text-[11px]">{p.companyName.charAt(0)}</div>
                    <span className="text-[14px] font-medium text-black-600">{p.companyName}</span>
                  </div>
                  <span className="caption flex items-center gap-1 text-[13px]"><MapPin className="w-3.5 h-3.5" /> {p.targetArea}</span>
                  <span className="caption text-[13px]">{p.createdAt}</span>
                </div>
              </div>
              <div className="flex flex-col items-center gap-1 shrink-0 pt-1 px-4">
                <p className="text-[26px] font-bold text-black-900 tabular-nums leading-none">{p.responses}</p>
                <p className="text-[10px] text-black-300 uppercase tracking-wide font-medium">反応</p>
                <ChevronRight className="w-5 h-5 text-black-200 group-hover:text-black-500 transition-colors mt-3" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
