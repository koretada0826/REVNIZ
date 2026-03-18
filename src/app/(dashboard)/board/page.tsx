"use client";

import Link from "next/link";
import { Plus, MessageSquare, Clock, TrendingUp, ChevronRight, MapPin, Search, SlidersHorizontal } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";
import { consultations } from "@/data/mock";
import FadeIn from "@/components/motion/FadeIn";

const categories = ["すべて", "販路拡大", "採用", "DX", "イベント"];


export default function BoardPage() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <FadeIn><div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <p className="label">Board</p>
          <h1 className="h1">相談・案件掲示板</h1>
          <p className="body mt-3">困っていること、探していることを投稿し、接点のきっかけを作る</p>
        </div>
        <button onClick={() => toast("投稿フォームを準備中です")} className="btn-red shrink-0 text-[15px] px-6 py-3"><Plus className="w-5 h-5 mr-2" /> 相談を投稿する</button>
      </div>

      {/* 検索バナー */}
      <div className="relative rounded-lg border border-line bg-surface p-5">
        <div className="flex items-center gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-black-400 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="キーワードで相談を検索（例: 販路拡大、東京、DX導入）"
              className="input pl-12 pr-4 py-3.5 text-[15px]"
            />
          </div>
          <button
            onClick={() => toast("詳細フィルターを準備中です")}
            className="btn-outline shrink-0 gap-2 px-5 py-3.5"
          >
            <SlidersHorizontal className="w-4 h-4" />
            詳細条件
          </button>
        </div>
        <div className="flex items-center gap-3 mt-3">
          <span className="text-[12px] text-black-400 font-medium">人気ワード:</span>
          {["販路拡大", "DX", "コラボ", "採用", "鹿児島", "東京", "イベント", "業務提携", "人材", "マーケティング", "IT導入", "地方創生"].map((word) => (
            <button
              key={word}
              onClick={() => setSearchQuery(word)}
              className="text-[12px] text-black-300 hover:text-white bg-white/5 hover:bg-white/10 px-2.5 py-1 rounded-md transition-colors cursor-pointer"
            >
              {word}
            </button>
          ))}
        </div>
      </div>

      <div className="flex gap-0 border-b border-line">
        {[{ l: "新着", i: MessageSquare }, { l: "人気", i: TrendingUp }, { l: "締切間近", i: Clock }].map((t, idx) => (
          <button key={t.l} className={`flex items-center gap-2 px-5 py-3.5 text-[14px] font-medium border-b-2 transition-colors ${idx === 0 ? "border-white text-white" : "border-transparent text-muted hover:text-white"}`}>
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
                <h3 className="font-bold text-white text-[17px] mb-2 group-hover:text-red transition-colors">{p.title}</h3>
                <p className="body-sm line-clamp-2 mb-4">{p.content}</p>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2.5">
                    <div className="avatar-sm text-[11px]">{p.companyName.charAt(0)}</div>
                    <span className="text-[14px] font-medium text-black-300">{p.companyName}</span>
                  </div>
                  <span className="caption flex items-center gap-1 text-[13px]"><MapPin className="w-3.5 h-3.5" /> {p.targetArea}</span>
                  <span className="caption text-[13px]">{p.createdAt}</span>
                </div>
              </div>
              <div className="flex flex-col items-center gap-1 shrink-0 pt-1 px-4">
                <p className="text-[26px] font-bold text-white tabular-nums leading-none">{p.responses}</p>
                <p className="text-[10px] text-black-300 uppercase tracking-wide font-medium">反応</p>
                <ChevronRight className="w-5 h-5 text-black-500 group-hover:text-white transition-colors mt-3" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div></FadeIn>
  );
}
