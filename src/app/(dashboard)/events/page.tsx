"use client";

import { Calendar, MapPin, Users, ArrowRight } from "lucide-react";
import { events } from "@/data/mock";

export default function EventsPage() {
  return (
    <div className="space-y-6">
      <div>
        <p className="label">Events</p>
        <h1 className="h1">イベント一覧</h1>
        <p className="body mt-3">オンラインの接点をリアルな交流や商談につなげる</p>
      </div>

      <div className="flex flex-wrap gap-2">
        {["すべて", "交流会", "商談会", "観戦交流会"].map((c, i) => <button key={c} className={i === 0 ? "tag-active" : "tag"}>{c}</button>)}
      </div>

      <div className="space-y-4">
        {events.map((ev) => {
          const pct = Math.round((ev.registered / ev.capacity) * 100);
          return (
            <div key={ev.id} className="card card-hover group">
              <div className="flex flex-col sm:flex-row gap-6">
                <div className="shrink-0 sm:w-24">
                  <div className="bg-black-900 rounded-md p-5 text-center inline-block sm:block">
                    <p className="text-[28px] font-bold text-white tabular-nums leading-none">{ev.date.split("-")[2]}</p>
                    <p className="text-[12px] text-black-400 tracking-wider uppercase mt-1">{ev.date.split("-")[1]}月</p>
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="badge-dark">{ev.category}</span>
                    {pct >= 90 && <span className="badge-red">残りわずか</span>}
                  </div>
                  <h3 className="text-[18px] font-bold text-black-900 mb-2 group-hover:text-red transition-colors">{ev.title}</h3>
                  <p className="body-sm mb-4">{ev.description}</p>
                  <div className="flex flex-wrap items-center gap-5 text-[14px] text-black-400 mb-4">
                    <span>{ev.date}</span>
                    <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4" /> {ev.location}</span>
                    <span className="flex items-center gap-1.5"><Users className="w-4 h-4" /> {ev.registered}/{ev.capacity}名</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex-1 progress-bar">
                      <div className={`progress-fill ${pct >= 90 ? "bg-red" : "bg-black-900"}`} style={{ width: `${pct}%` }} />
                    </div>
                    <span className="text-[14px] font-bold text-black-900 tabular-nums w-10 text-right">{pct}%</span>
                  </div>
                </div>
                <div className="shrink-0 flex items-start">
                  <button className="btn-red">参加申込 <ArrowRight className="w-4 h-4 ml-2" /></button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
