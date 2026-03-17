"use client";

import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { calendarEvents } from "@/data/fanlab-mock";

export default function CalendarPage() {
  const days = ["月", "火", "水", "木", "金", "土", "日"];
  const firstDay = 6;
  const daysInMonth = 31;
  const cells: (number | null)[] = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  const eventDates = calendarEvents.reduce((acc, ev) => {
    const day = parseInt(ev.date.split("-")[2]);
    const month = ev.date.split("-")[1];
    if (month === "03") acc[day] = ev;
    return acc;
  }, {} as Record<number, typeof calendarEvents[0]>);

  return (
    <div className="space-y-6 animate-in">
      <div>
        <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-cyan-600 block mb-1.5">Calendar</span>
        <h1 className="h1">イベント・実施枠カレンダー</h1>
        <p className="body-sm mt-1.5">どの試合・どのタイミングで何ができるかを確認できます。</p>
      </div>

      <div className="flex items-center justify-between">
        <button className="btn-icon border border-line"><ChevronLeft className="w-4 h-4" /></button>
        <h2 className="text-[18px] font-bold text-black-900">2026年 3月</h2>
        <button className="btn-icon border border-line"><ChevronRight className="w-4 h-4" /></button>
      </div>

      <div className="card-flush overflow-hidden">
        <div className="grid grid-cols-7">
          {days.map((d) => (
            <div key={d} className="text-center py-2.5 text-[11px] font-bold text-black-300 tracking-wider uppercase border-b border-line">{d}</div>
          ))}
          {cells.map((day, i) => {
            const ev = day ? eventDates[day] : undefined;
            return (
              <div key={i} className={`min-h-[90px] p-2 border-b border-r border-line ${day ? "hover:bg-black-50" : "bg-black-50/30"} transition-colors`}>
                {day && (
                  <>
                    <span className={`text-[13px] font-medium ${ev ? "text-cyan-600 font-bold" : "text-black-400"}`}>{day}</span>
                    {ev && (
                      <div className="mt-1.5">
                        <div className={`rounded px-1.5 py-1 text-[9px] font-bold ${ev.type === "game" ? "bg-cyan-50 text-cyan-700" : "bg-violet-50 text-violet-700"}`}>
                          {ev.title.length > 15 ? ev.title.substring(0, 15) + "…" : ev.title}
                        </div>
                        <div className="mt-1 space-y-0.5">
                          {ev.slots.map((s) => (
                            <p key={s.name} className="text-[8px] text-black-300">{s.name} <span className="text-cyan-600 font-semibold">{s.available}枠</span></p>
                          ))}
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div>
        <h3 className="h3 text-[14px] mb-3">今月の予定</h3>
        <div className="space-y-2">
          {calendarEvents.map((ev) => (
            <div key={ev.id} className="card card-hover flex items-center gap-4">
              <div className="bg-black-900 rounded px-3 py-2 text-center shrink-0">
                <p className="text-[16px] font-bold text-white tabular-nums leading-none">{ev.date.split("-")[2]}</p>
                <p className="text-[9px] text-black-300 tracking-wider mt-0.5">{ev.date.split("-")[1]}月</p>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className={`badge ${ev.type === "game" ? "bg-cyan-50 text-cyan-700" : "bg-violet-50 text-violet-700"}`}>{ev.type === "game" ? "試合" : "イベント"}</span>
                  <h4 className="text-[13px] font-semibold text-black-900 truncate">{ev.title}</h4>
                </div>
                <div className="flex flex-wrap gap-2">
                  {ev.slots.map((s) => (
                    <span key={s.name} className="caption">{s.name}: <span className="text-cyan-600 font-semibold">{s.available}枠空き</span></span>
                  ))}
                </div>
              </div>
              <Link href="/fanlab/consult" className="text-[11px] font-semibold text-cyan-600 hover:text-cyan-700 shrink-0">相談する →</Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
