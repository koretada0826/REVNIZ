"use client";

import Link from "next/link";
import { CalendarDays, MapPin, Users } from "lucide-react";
import { experiments } from "@/data/fanlab-mock";

export default function ExperimentsPage() {
  return (
    <div className="space-y-6 animate-in">
      <div>
        <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-cyan-600 block mb-1.5">Open Experiments</span>
        <h1 className="h1">募集中の実証企画</h1>
        <p className="body-sm mt-1.5">今すぐ応募できる実施機会。締切・空き枠を確認して相談を始められます。</p>
      </div>

      <div className="flex flex-wrap gap-1.5">
        {["すべて", "食品・飲料", "IT・アプリ", "体験企画", "アンケート・調査"].map((c, i) => <button key={c} className={i === 0 ? "tag-active" : "tag"}>{c}</button>)}
      </div>

      <div className="space-y-3">
        {experiments.map((exp) => {
          const pct = Math.round((exp.spotsFilled / exp.spotsTotal) * 100);
          return (
            <div key={exp.id} className="card card-hover">
              <div className="flex flex-col sm:flex-row gap-5">
                <div className="shrink-0 sm:w-16">
                  <div className="bg-black-900 rounded p-3 text-center inline-block sm:block">
                    <p className="text-[20px] font-bold text-white tabular-nums leading-none">{exp.date.split("-")[2] || "—"}</p>
                    <p className="text-[10px] text-black-300 tracking-wider uppercase mt-0.5">{exp.date.split("-")[1] || ""}月</p>
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`badge ${exp.status === "closing" ? "bg-amber-50 text-amber-700" : exp.status === "closed" ? "badge-muted" : "bg-cyan-50 text-cyan-700"}`}>
                      {exp.status === "closing" ? "締切間近" : exp.status === "closed" ? "締切" : "募集中"}
                    </span>
                    <span className="badge-muted">{exp.category}</span>
                  </div>
                  <h3 className="h3 text-[15px] mb-1.5">{exp.title}</h3>
                  <div className="flex flex-wrap items-center gap-4 caption mb-3">
                    <span className="flex items-center gap-1"><CalendarDays className="w-3 h-3 text-cyan-500/50" /> 締切: {exp.deadline}</span>
                    <span className="flex items-center gap-1"><MapPin className="w-3 h-3 text-cyan-500/50" /> {exp.location}</span>
                    <span className="flex items-center gap-1"><Users className="w-3 h-3 text-cyan-500/50" /> {exp.targetAudience}</span>
                  </div>
                  <div className="flex flex-wrap gap-1 mb-3">
                    {exp.dataAvailable.map((d) => <span key={d} className="badge bg-cyan-50 text-cyan-700">{d}</span>)}
                  </div>
                  <div className="flex items-center gap-2.5">
                    <div className="flex-1 h-1 rounded-full bg-black-100 overflow-hidden">
                      <div className={`h-full rounded-full ${pct >= 80 ? "bg-amber-400" : "bg-cyan-500"}`} style={{ width: `${pct}%` }} />
                    </div>
                    <span className="text-[11px] font-bold text-black-900 tabular-nums">{exp.spotsFilled}/{exp.spotsTotal}枠</span>
                  </div>
                </div>
                <div className="shrink-0 flex items-start">
                  <Link href="/fanlab/consult" className="inline-flex items-center justify-center font-semibold px-5 py-2.5 text-[13px] rounded bg-cyan-500 text-white hover:bg-cyan-600 shadow-sm transition-all">相談する</Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
