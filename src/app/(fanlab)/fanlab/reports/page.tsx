"use client";

import Link from "next/link";
import { FileBarChart2 } from "lucide-react";
import { reports } from "@/data/fanlab-mock";

export default function ReportsPage() {
  return (
    <div className="space-y-6 animate-in">
      <div>
        <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-cyan-600 block mb-1.5">Reports</span>
        <h1 className="h1">実施レポート一覧</h1>
        <p className="body-sm mt-1.5">過去の実施結果から、自社利用のイメージを得られます。</p>
      </div>

      <div className="flex flex-wrap gap-1.5">
        {["すべて", "食品・飲料", "IT・アプリ", "会場導線・販促"].map((c, i) => <button key={c} className={i === 0 ? "tag-active" : "tag"}>{c}</button>)}
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {reports.map((r) => (
          <Link key={r.id} href={`/fanlab/reports/${r.id}`} className="card card-hover group">
            <div className="flex items-center gap-2 mb-3">
              <span className="badge bg-cyan-50 text-cyan-700">{r.category}</span>
              <span className="caption">{r.date}</span>
            </div>
            <h3 className="font-bold text-black-900 text-[14px] mb-2 group-hover:text-cyan-600 transition-colors">{r.title}</h3>
            <p className="body-sm line-clamp-2 mb-4">{r.summary}</p>
            <div className="flex items-center gap-4 caption mb-3">
              <span>形式: {r.format}</span>
              <span>参加: {r.participants}名</span>
              <span>回答: {r.responses}件</span>
            </div>
            <div className="flex flex-wrap gap-1">
              {r.highlights.slice(0, 2).map((h) => <span key={h} className="badge bg-cyan-50 text-cyan-700">{h}</span>)}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
