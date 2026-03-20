"use client";

import Link from "next/link";
import { Plus, MessageSquare, Clock, TrendingUp, ChevronRight, MapPin, Search, SlidersHorizontal } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";
import { consultations, companies } from "@/data/mock";
import FadeIn from "@/components/motion/FadeIn";

const categories = ["すべて", "販路拡大", "採用", "DX", "イベント"];


export default function BoardPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("すべて");

  const filtered = consultations.filter((p) => {
    const matchSearch = !searchQuery
      || p.title.includes(searchQuery)
      || p.content.includes(searchQuery)
      || p.companyName.includes(searchQuery)
      || p.category.includes(searchQuery)
      || p.targetArea.includes(searchQuery);
    const matchCategory = selectedCategory === "すべて" || p.category === selectedCategory;
    return matchSearch && matchCategory;
  });

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
      <div className="relative rounded-lg border border-line p-5" style={{ backgroundColor: "#1e1e1e" }}>
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
        <div className="flex items-center gap-2 mt-3 flex-wrap">
          <span className="text-[13px] text-white font-bold shrink-0">人気ワード:</span>
          {["販路拡大", "DX", "コラボ", "採用", "鹿児島", "東京", "イベント", "業務提携", "人材", "マーケティング", "IT導入", "地方創生"].map((word) => (
            <button
              key={word}
              onClick={() => setSearchQuery(word)}
              className="text-[14px] text-white font-extrabold bg-white/15 hover:bg-white/25 px-4 py-2 rounded-full transition-colors cursor-pointer"
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

      <div className="flex flex-wrap gap-2">{categories.map((c) => <button key={c} onClick={() => setSelectedCategory(selectedCategory === c ? "すべて" : c)} className={selectedCategory === c ? "tag-active" : "tag"}>{c}</button>)}</div>

      <div className="grid sm:grid-cols-2 gap-4">
        {filtered.map((p) => {
          const company = companies.find((c) => c.id === p.companyId);
          return (
            <Link key={p.id} href={`/board/${p.id}`} className="group relative overflow-hidden rounded-lg border border-line cursor-pointer transition-all duration-200 hover:border-line-dark bg-white block">
              {/* 右上カテゴリバッジ */}
              <div className="absolute top-0 right-0 z-10 flex" style={{ fontSize: 0 }}>
                <span className="inline-block text-white text-[13px] font-bold text-center px-2.5 py-1 bg-red">{p.category}</span>
              </div>

              {/* 企業ロゴ（カード上部全面） */}
              <div style={{ fontSize: 0, lineHeight: 0, margin: 0, padding: 0 }}>
                {company ? (
                  <img src={company.logo} alt={company.name} style={{ width: "100%", height: "auto", display: "block", margin: 0, padding: 0, border: "none" }} />
                ) : (
                  <div className="flex items-center justify-center bg-white" style={{ height: "120px" }}>
                    <span style={{ fontSize: "36px", fontWeight: "bold", color: "#0A0A0A", lineHeight: "normal" }}>{p.companyName.charAt(0)}</span>
                  </div>
                )}
              </div>

              {/* カード本体 */}
              <div className="bg-white px-4 py-3">
                {p.keywords && p.keywords.length > 0 ? (
                  <div className="flex flex-wrap gap-x-3 gap-y-1 mb-2">
                    {p.keywords.map((kw, ki) => (
                      <span key={ki} className="text-red text-[24px] font-black leading-snug">{kw}</span>
                    ))}
                  </div>
                ) : (
                  <h3 className="font-black text-red text-[24px] mb-2 leading-snug">{p.title}</h3>
                )}
                <p className="text-[16px] text-black font-extrabold leading-relaxed line-clamp-2 mb-2">{p.content}</p>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[13px] font-bold text-white">{p.companyName}</span>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[18px] font-bold text-white tabular-nums">{p.responses}</span>
                    <span className="text-[10px] text-black-300 uppercase tracking-wide font-bold">反応</span>
                  </div>
                </div>
                <button
                  onClick={(e) => { e.stopPropagation(); toast("お問い合わせフォームを準備中です"); }}
                  className="w-full py-2 text-[14px] font-bold text-white rounded-md transition-colors inline-flex items-center justify-center cursor-pointer"
                  style={{ backgroundColor: "#dfb664" }}
                >
                  お問い合わせ
                </button>
              </div>
            </Link>
          );
        })}
      </div>
    </div></FadeIn>
  );
}
