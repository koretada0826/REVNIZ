"use client";

import { useState } from "react";
import Image from "next/image";
import { Calendar, MapPin, Users, ArrowRight, ChevronDown } from "lucide-react";
import { events } from "@/data/mock";
import FadeIn from "@/components/motion/FadeIn";

const TODAY = "2026-03-20";
const ONE_MONTH_LATER = "2026-04-20";
const categories = ["すべて", "GAME", "イベント", "スポンサー"];

const monthNames: Record<string, string> = {
  "01": "1月", "02": "2月", "03": "3月", "04": "4月",
  "05": "5月", "06": "6月", "07": "7月", "08": "8月",
  "09": "9月", "10": "10月", "11": "11月", "12": "12月",
};

function EventCard({ ev }: { ev: (typeof events)[number] }) {
  const dateLabel = ev.date.slice(0, 7);
  return (
    <div className="group relative cursor-pointer">
      <a className="block">
        <div className="absolute top-0 right-0 z-10 flex" style={{ fontSize: 0 }}>
          <span className="inline-block bg-[#ff0000] text-white text-[14px] font-bold text-center px-2.5 py-1">NEW</span>
          <span className="inline-block bg-[#e8ca22] text-white text-[14px] font-bold text-center px-2.5 py-1">{ev.category}</span>
        </div>
        <div className="relative overflow-hidden">
          <div className="aspect-[4/3] overflow-hidden">
            <Image
              src={ev.image}
              alt={ev.title}
              fill
              className="object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.165,0.84,0.44,1)] group-hover:scale-[1.15]"
            />
          </div>
        </div>
        <div className="relative bg-[#333] px-5 pt-7 pb-5">
          <p className="text-[14px] text-white leading-relaxed line-clamp-2 h-[45px] mb-2.5">
            {ev.title}
          </p>
          <p className="text-[20px] font-bold text-[#a2a2a2] tracking-wide tabular-nums" style={{ fontFamily: '"Space Grotesk", "abolition", sans-serif' }}>
            {dateLabel}
          </p>
        </div>
      </a>
      <div className="absolute right-5 bottom-7 flex items-center gap-2">
        <span className="text-[14px] text-[#686868] hover:text-[#1da1f2] transition-colors cursor-pointer font-medium">X</span>
        <span className="text-[14px] text-[#686868] hover:text-[#3a5795] transition-colors cursor-pointer font-medium">f</span>
      </div>
    </div>
  );
}

export default function EventsPage() {
  const [selectedCategory, setSelectedCategory] = useState("すべて");

  const [openMonths, setOpenMonths] = useState<Record<string, boolean>>({});

  const sorted = [...events].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  const upcoming = sorted.filter((ev) => ev.date >= TODAY);
  const filtered = selectedCategory === "すべて"
    ? upcoming
    : upcoming.filter((ev) => ev.category === selectedCategory);
  const nearest = filtered[0];
  const restAll = filtered.slice(1);

  // 1ヶ月以内のイベント
  const withinMonth = restAll.filter((ev) => ev.date < ONE_MONTH_LATER);
  // 1ヶ月以降のイベント → 月別にグループ化
  const beyondMonth = restAll.filter((ev) => ev.date >= ONE_MONTH_LATER);
  const monthGroups: Record<string, typeof beyondMonth> = {};
  beyondMonth.forEach((ev) => {
    const key = ev.date.slice(0, 7); // "2026-05"
    if (!monthGroups[key]) monthGroups[key] = [];
    monthGroups[key].push(ev);
  });
  const monthKeys = Object.keys(monthGroups).sort();

  const toggleMonth = (key: string) => {
    setOpenMonths((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <FadeIn><div className="space-y-8">
      <div>
        <p className="label">Events</p>
        <h1 className="h1">イベント一覧</h1>
        <p className="body mt-3">オンラインの接点をリアルな交流や商談につなげる</p>
      </div>

      <div className="flex flex-wrap gap-2">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setSelectedCategory(selectedCategory === c ? "すべて" : c)}
            className={selectedCategory === c ? "tag-active" : "tag"}
          >
            {c}
          </button>
        ))}
      </div>

      {/* 直近イベント（大きく表示） */}
      {nearest && (
        <div>
          <h2 className="text-[28px] font-black text-white tracking-tight mb-6">Next Event</h2>
          <div className="group relative cursor-pointer">
            <a className="block">
              <div className="absolute top-0 right-0 z-10 flex" style={{ fontSize: 0 }}>
                <span className="inline-block bg-[#ff0000] text-white text-[14px] font-bold text-center px-2.5 py-1">NEXT</span>
                <span className="inline-block bg-[#e8ca22] text-white text-[14px] font-bold text-center px-2.5 py-1">{nearest.category}</span>
              </div>
              <div className="relative overflow-hidden">
                <div className="aspect-[2/1] overflow-hidden">
                  <Image
                    src={nearest.image}
                    alt={nearest.title}
                    fill
                    className="object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.165,0.84,0.44,1)] group-hover:scale-[1.15]"
                  />
                </div>
              </div>
              <div className="relative bg-[#333] px-6 pt-6 pb-5">
                <p className="text-[18px] text-white font-bold leading-relaxed mb-3">
                  {nearest.title}
                </p>
                <p className="text-[14px] text-black-400 mb-4">{nearest.description}</p>
                <div className="flex flex-wrap items-center gap-5 text-[14px] text-[#a2a2a2]">
                  <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" /> {nearest.date}</span>
                  <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4" /> {nearest.location}</span>
                  <span className="flex items-center gap-1.5"><Users className="w-4 h-4" /> {nearest.registered}/{nearest.capacity}名</span>
                </div>
              </div>
            </a>
            <div className="absolute right-5 bottom-6 flex items-center gap-2">
              <span className="text-[14px] text-[#686868] hover:text-[#1da1f2] transition-colors cursor-pointer font-medium">X</span>
              <span className="text-[14px] text-[#686868] hover:text-[#3a5795] transition-colors cursor-pointer font-medium">f</span>
            </div>
          </div>
        </div>
      )}

      {/* 1ヶ月以内のイベント（横スクロール） */}
      {withinMonth.length > 0 && (
        <div>
          <h2 className="text-[28px] font-black text-white tracking-tight mb-6">Upcoming Events</h2>
          <div className="overflow-x-auto -mx-6 lg:-mx-8 px-6 lg:px-8">
            <div className="flex gap-5" style={{ minWidth: "max-content" }}>
              {withinMonth.map((ev) => (
                <div key={ev.id} className="shrink-0" style={{ width: "300px" }}>
                  <EventCard ev={ev} />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 1ヶ月以降のイベント（月別アコーディオン） */}
      {monthKeys.length > 0 && (
        <div className="space-y-4">
          {monthKeys.map((key) => {
            const month = monthNames[key.slice(5, 7)] || key.slice(5, 7);
            const year = key.slice(0, 4);
            const isOpen = openMonths[key] || false;
            const eventsInMonth = monthGroups[key];
            // カテゴリ別の件数
            const catCounts: Record<string, number> = {};
            eventsInMonth.forEach((ev) => {
              catCounts[ev.category] = (catCounts[ev.category] || 0) + 1;
            });
            return (
              <div key={key} className="rounded-lg overflow-hidden border border-line">
                {/* アコーディオンヘッダー */}
                <button
                  onClick={() => toggleMonth(key)}
                  className="w-full flex items-center justify-between px-6 py-5 transition-colors group"
                  style={{ background: isOpen ? "linear-gradient(135deg, #1a1a1a 0%, #222 100%)" : "#1a1a1a" }}
                >
                  <div className="flex items-center gap-4">
                    {/* ゴールドのアクセントバー */}
                    <div className="w-1.5 h-12 rounded-full shrink-0" style={{ backgroundColor: "#dfb664" }} />
                    <div className="text-left">
                      <h3 className="text-[22px] font-black text-white leading-tight">
                        {year}年{month}開催のイベント
                      </h3>
                      <div className="flex items-center gap-3 mt-1.5">
                        <span className="text-[14px] font-extrabold" style={{ color: "#dfb664" }}>
                          {eventsInMonth.length}件のイベント
                        </span>
                        <div className="flex gap-1.5">
                          {Object.entries(catCounts).map(([cat, count]) => (
                            <span
                              key={cat}
                              className="text-[11px] font-bold text-white px-2 py-0.5 rounded-full"
                              style={{
                                backgroundColor: cat === "GAME" ? "#e8ca22" : cat === "イベント" ? "#C8102E" : "#dfb664",
                              }}
                            >
                              {cat} {count}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-[13px] font-bold text-black-400 group-hover:text-white transition-colors hidden sm:block">
                      {isOpen ? "閉じる" : "詳細を見る"}
                    </span>
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center transition-colors"
                      style={{ backgroundColor: isOpen ? "#dfb664" : "rgba(255,255,255,0.1)" }}
                    >
                      <ChevronDown
                        className={`w-5 h-5 transition-transform duration-300 ${isOpen ? "rotate-180 text-black" : "text-white"}`}
                      />
                    </div>
                  </div>
                </button>
                {/* アコーディオン中身 */}
                <div
                  className="overflow-hidden transition-all duration-300"
                  style={{
                    maxHeight: isOpen ? "2000px" : "0",
                    opacity: isOpen ? 1 : 0,
                  }}
                >
                  <div className="px-6 pb-6 pt-4 border-t border-line" style={{ backgroundColor: "#111" }}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {eventsInMonth.map((ev) => (
                        <EventCard key={ev.id} ev={ev} />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div></FadeIn>
  );
}
