"use client";

import { Calendar, MapPin, Users, ArrowRight } from "lucide-react";
import LottieAnimation from "@/components/lottie/LottieAnimation";
import { events } from "@/data/mock";

export default function EventsV2Page() {
  return (
    <div className="space-y-6 animate-in">
      <div className="flex flex-col lg:flex-row gap-6 items-start">
        <div className="flex-1">
          <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-red block mb-1.5">Events</span>
          <h1 className="text-[2rem] font-bold text-white tracking-tight leading-[1.1]">イベント一覧</h1>
          <p className="text-[13px] text-white/40 leading-relaxed mt-1.5">オンラインの接点をリアルな交流や商談につなげる</p>
        </div>
        <div className="w-24 h-24 shrink-0 hidden lg:block opacity-20">
          <LottieAnimation src="https://lottie.host/e9f2d4c9-bbfe-4810-a508-7e2dd0cdb3c5/oq8sYNfxKu.lottie" className="w-full h-full" />
        </div>
      </div>

      <div className="flex flex-wrap gap-1.5">
        {["すべて", "交流会", "商談会", "観戦交流会"].map((c, i) => <button key={c} className={`inline-flex items-center rounded-full px-3 py-1.5 text-[12px] font-medium border cursor-pointer transition-all ${i === 0 ? "bg-white text-black-900 border-white font-semibold" : "bg-transparent border-white/[0.08] text-white/40 hover:border-white/20 hover:text-white"}`}>{c}</button>)}
      </div>

      <div className="space-y-3">
        {events.map((ev) => {
          const pct = Math.round((ev.registered / ev.capacity) * 100);
          return (
            <div key={ev.id} className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-5 hover:bg-white/[0.04] hover:border-white/[0.1] transition-all">
              <div className="flex flex-col sm:flex-row gap-5">
                <div className="shrink-0 sm:w-16">
                  <div className="bg-white/[0.06] rounded p-3 text-center inline-block sm:block border border-white/[0.08]">
                    <p className="text-[20px] font-bold text-white tabular-nums leading-none">{ev.date.split("-")[2]}</p>
                    <p className="text-[10px] text-white/30 tracking-wider uppercase mt-0.5">{ev.date.split("-")[1]}月</p>
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="inline-flex items-center rounded-sm px-2 py-[3px] text-[10px] font-bold bg-white/[0.08] text-white/60">{ev.category}</span>
                    {pct >= 90 && <span className="inline-flex items-center rounded-sm px-2 py-[3px] text-[10px] font-bold bg-red/10 text-red-400">残りわずか</span>}
                  </div>
                  <h3 className="text-[15px] font-semibold text-white tracking-tight mb-1.5">{ev.title}</h3>
                  <p className="text-[13px] text-white/40 leading-relaxed mb-3">{ev.description}</p>
                  <div className="flex flex-wrap items-center gap-4 text-[11px] text-white/30 mb-3">
                    <span className="flex items-center gap-1"><Calendar className="w-3 h-3 text-red/40" /> {ev.date}</span>
                    <span className="flex items-center gap-1"><MapPin className="w-3 h-3 text-red/40" /> {ev.location}</span>
                    <span className="flex items-center gap-1"><Users className="w-3 h-3 text-red/40" /> {ev.registered}/{ev.capacity}名</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <div className="flex-1 h-1 rounded-full bg-white/10 overflow-hidden">
                      <div className={`h-full rounded-full ${pct >= 90 ? "bg-red" : "bg-white/60"}`} style={{ width: `${pct}%` }} />
                    </div>
                    <span className="text-[11px] font-bold text-white tabular-nums w-8 text-right">{pct}%</span>
                  </div>
                </div>
                <div className="shrink-0 flex items-start">
                  <button className="btn-red shadow-red">参加申込 <ArrowRight className="w-4 h-4 ml-1.5" /></button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
