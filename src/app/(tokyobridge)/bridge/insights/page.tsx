"use client";

import Link from "next/link";
import { Lightbulb, ArrowRight } from "lucide-react";
import { insights, insightCategories } from "@/data/bridge-mock";
import { useState } from "react";

export default function InsightsPage() {
  const [cat, setCat] = useState("すべて");
  const filtered = cat === "すべて" ? insights : insights.filter((i) => i.category === cat);

  return (
    <div className="space-y-6 animate-in">
      <div>
        <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-indigo-600 block mb-1.5">Tokyo Insights</span>
        <h1 className="h1">東京インサイト</h1>
        <p className="body-sm mt-1.5">東京のテーマやトレンドを、鹿児島企業に関係ある形で整理してお届けします。</p>
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
        {filtered.map((ins) => (
          <Link key={ins.id} href={`/bridge/insights/${ins.id}`} className="card card-hover block">
            <div className="flex items-start gap-4">
              <div className="w-9 h-9 rounded bg-indigo-50 flex items-center justify-center shrink-0 mt-0.5">
                <Lightbulb className="w-4 h-4 text-indigo-500" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="badge bg-indigo-50 text-indigo-700">{ins.category}</span>
                  <span className="caption">{ins.date}</span>
                </div>
                <h3 className="text-[14px] font-bold text-black-900 mb-1.5">{ins.title}</h3>
                <p className="body-sm mb-2">{ins.summary}</p>
                <div className="rounded bg-indigo-50 border border-indigo-100 px-3 py-2 inline-block">
                  <p className="text-[11px] text-indigo-700 font-medium">鹿児島企業への示唆: {ins.implication}</p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-black-300 shrink-0 mt-1" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
