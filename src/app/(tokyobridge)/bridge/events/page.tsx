"use client";

import Link from "next/link";
import { CalendarDays, Users, ArrowRight } from "lucide-react";
import { bridgeEvents } from "@/data/bridge-mock";
import { useState } from "react";

const formatLabels: Record<string, string> = {
  online: "オンライン",
  offline: "オフライン",
  hybrid: "ハイブリッド",
};

const formatColors: Record<string, string> = {
  online: "bg-indigo-50 text-indigo-700",
  offline: "bg-amber-50 text-amber-700",
  hybrid: "bg-emerald-50 text-emerald-700",
};

const filters = ["すべて", "交流会", "ピッチ", "視察", "壁打ち", "商談"];

export default function EventsPage() {
  const [filter, setFilter] = useState("すべて");
  const filtered = filter === "すべて" ? bridgeEvents : bridgeEvents.filter((e) => e.type === filter);

  return (
    <div className="space-y-6 animate-in">
      <div>
        <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-indigo-600 block mb-1.5">Events</span>
        <h1 className="h1">視察・交流イベント</h1>
        <p className="body-sm mt-1.5">東京とのリアル接点・オンライン接点を一覧で確認できます。</p>
      </div>

      <div className="flex flex-wrap gap-2">
        {filters.map((f) => (
          <button key={f} onClick={() => setFilter(f)}
            className={f === filter ? "tag-active" : "tag"}>
            {f}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {filtered.map((ev) => (
          <Link key={ev.id} href={`/bridge/events/${ev.id}`} className="card card-hover block">
            <div className="flex items-start gap-4">
              <div className="bg-black-900 rounded px-3.5 py-2.5 text-center shrink-0">
                <p className="text-[18px] font-bold text-white tabular-nums leading-none">{ev.date.split("-")[2]}</p>
                <p className="text-[9px] text-black-300 tracking-wider mt-0.5">{ev.date.split("-")[1]}月</p>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className={`badge ${formatColors[ev.format]}`}>{formatLabels[ev.format]}</span>
                  <span className="badge badge-muted">{ev.type}</span>
                  <span className="badge bg-indigo-50 text-indigo-700">{ev.theme}</span>
                </div>
                <h3 className="text-[15px] font-bold text-black-900 mb-1.5">{ev.title}</h3>
                <p className="body-sm mb-3">{ev.description}</p>
                <div className="flex flex-wrap items-center gap-4">
                  <span className="caption flex items-center gap-1">
                    <CalendarDays className="w-3.5 h-3.5" /> {ev.date} {ev.time}
                  </span>
                  <span className="caption flex items-center gap-1">
                    <Users className="w-3.5 h-3.5" /> {ev.registered}/{ev.capacity}名
                  </span>
                  <span className="text-[11px] font-semibold text-indigo-600">残り{ev.capacity - ev.registered}枠</span>
                </div>
                <div className="mt-2 flex flex-wrap gap-1">
                  {ev.speakers.map((s) => (
                    <span key={s} className="text-[10px] bg-black-50 text-black-500 px-2 py-0.5 rounded-sm">{s}</span>
                  ))}
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
