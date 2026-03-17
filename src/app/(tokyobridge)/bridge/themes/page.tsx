"use client";

import { MessageSquarePlus, ArrowRight } from "lucide-react";
import { collabThemes, insightCategories } from "@/data/bridge-mock";
import { useState } from "react";

export default function ThemesPage() {
  const [cat, setCat] = useState("すべて");
  const filtered = cat === "すべて" ? collabThemes : collabThemes.filter((t) => t.category === cat);

  return (
    <div className="space-y-6 animate-in">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-indigo-600 block mb-1.5">Collaboration Themes</span>
          <h1 className="h1">連携テーマ募集</h1>
          <p className="body-sm mt-1.5">鹿児島企業が「こういうテーマで東京とつながりたい」を投稿し、接続ニーズを可視化します。</p>
        </div>
        <button className="inline-flex items-center justify-center font-semibold px-5 py-2.5 text-[13px] rounded bg-indigo-500 text-white hover:bg-indigo-600 shadow-sm transition-all shrink-0">
          テーマを投稿する <ArrowRight className="w-4 h-4 ml-1.5" />
        </button>
      </div>

      <div className="flex flex-wrap gap-2">
        {insightCategories.map((c) => (
          <button key={c} onClick={() => setCat(c)}
            className={c === cat ? "tag-active" : "tag"}>
            {c}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {filtered.map((th) => (
          <div key={th.id} className="card card-hover">
            <div className="flex items-start gap-4">
              <div className="w-9 h-9 rounded bg-indigo-50 flex items-center justify-center shrink-0 mt-0.5">
                <MessageSquarePlus className="w-4 h-4 text-indigo-500" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="badge bg-indigo-50 text-indigo-700">{th.category}</span>
                  <span className="badge badge-muted">{th.format}</span>
                  {th.featured && <span className="badge bg-amber-50 text-amber-700">注目</span>}
                  <span className="caption">{th.postedAt}</span>
                </div>
                <h3 className="text-[14px] font-bold text-black-900 mb-1.5">{th.title}</h3>
                <p className="body-sm mb-2">{th.background}</p>
                <p className="body-sm">{th.detail}</p>
                <div className="mt-3 pt-3 border-t border-line grid sm:grid-cols-3 gap-3">
                  <div>
                    <span className="text-[10px] font-bold text-black-300 tracking-[0.1em] uppercase block mb-1">投稿企業</span>
                    <p className="text-[12px] font-medium text-black-900">{th.company}</p>
                    <p className="caption">{th.industry}</p>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-black-300 tracking-[0.1em] uppercase block mb-1">希望する相手像</span>
                    <p className="text-[12px] font-medium text-black-900">{th.desiredPartner}</p>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-black-300 tracking-[0.1em] uppercase block mb-1">希望形式</span>
                    <p className="text-[12px] font-medium text-black-900">{th.format}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
