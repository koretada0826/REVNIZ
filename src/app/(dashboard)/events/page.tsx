"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { Calendar, MapPin, Users, ChevronDown, ArrowRight } from "lucide-react";
import { events } from "@/data/mock";
import FadeIn from "@/components/motion/FadeIn";

const TODAY = "2026-03-20";
const ONE_MONTH_LATER = "2026-04-20";
const categories = ["すべて", "懇親会", "OFF会", "イベント"];

const monthNames: Record<string, string> = {
  "01": "1月", "02": "2月", "03": "3月", "04": "4月",
  "05": "5月", "06": "6月", "07": "7月", "08": "8月",
  "09": "9月", "10": "10月", "11": "11月", "12": "12月",
};

function catColor(category: string) {
  return category === "懇親会" ? "#dfb664" : category === "OFF会" ? "#5D4FBF" : "#C8102E";
}

function EventCard({ ev }: { ev: (typeof events)[number] }) {
  const dateLabel = ev.date.slice(0, 7);
  const pct = Math.round((ev.registered / ev.capacity) * 100);
  return (
    <div className="group relative">
      <Link href={`/events/${ev.id}`} className="block">
        <span className="absolute top-0 right-0 z-10 flex shadow-lg" style={{ fontSize: 0 }}>
          <span className="inline-block bg-[#C8102E] text-white text-[10px] font-black tracking-[0.2em] text-center px-2.5 py-[5px] uppercase">NEW</span>
          <span
            className="inline-block text-white text-[11px] font-black tracking-[0.12em] text-center px-2.5 py-[5px]"
            style={{ backgroundColor: catColor(ev.category) }}
          >{ev.category}</span>
        </span>
        <span className="relative overflow-hidden block">
          <span className="aspect-[16/9] sm:aspect-[4/3] overflow-hidden block">
            <Image
              src={ev.image}
              alt={ev.title}
              fill
              className="object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.165,0.84,0.44,1)] group-hover:scale-[1.15]"
            />
          </span>
        </span>
        <span className="relative bg-[#333] px-3 pt-2.5 pb-2.5 sm:px-5 sm:pt-5 sm:pb-4 block">
          <span className="text-[12px] sm:text-[14px] text-white leading-snug sm:leading-relaxed sm:h-[45px] mb-1 sm:mb-2 block" style={{ whiteSpace: "pre-line" }}>
            {ev.title}
          </span>
          <span className="flex items-center gap-2 sm:gap-3 mb-1.5 sm:mb-3 text-[10px] sm:text-[12px] text-[#a2a2a2]">
            <span className="flex items-center gap-1"><Calendar className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> {ev.date}</span>
            <span className="flex items-center gap-1"><Users className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> {ev.registered}/{ev.capacity}</span>
          </span>
          <span
            className="w-full text-center py-1.5 sm:py-2.5 rounded-md text-[12px] sm:text-[14px] font-bold transition-all block"
            style={{
              backgroundColor: pct >= 95 ? "#333" : "#dfb664",
              color: pct >= 95 ? "#888" : "#000",
              opacity: pct >= 95 ? 0.6 : 1,
            }}
          >
            {pct >= 95 ? "残りわずか — 参加する" : "参加する"}
          </span>
        </span>
      </Link>
    </div>
  );
}

function EventsPageContent() {
  const searchParams = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState("すべて");
  const [openMonths, setOpenMonths] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const cat = searchParams.get("cat");
    if (cat) setSelectedCategory(cat);
  }, [searchParams]);

  const sorted = [...events].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  const upcoming = sorted.filter((ev) => ev.date >= TODAY);
  const filtered = selectedCategory === "すべて"
    ? upcoming
    : upcoming.filter((ev) => ev.category === selectedCategory);
  const nearest = filtered[0];
  const restAll = filtered.slice(1);

  const withinMonth = restAll.filter((ev) => ev.date < ONE_MONTH_LATER);
  const beyondMonth = restAll.filter((ev) => ev.date >= ONE_MONTH_LATER);
  const monthGroups: Record<string, typeof beyondMonth> = {};
  beyondMonth.forEach((ev) => {
    const key = ev.date.slice(0, 7);
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
          <Link href={`/events/${nearest.id}`} className="group relative block">
            <span className="absolute top-0 right-0 z-10 flex shadow-lg" style={{ fontSize: 0 }}>
              <span className="inline-block bg-[#C8102E] text-white text-[11px] font-black tracking-[0.2em] text-center px-3 py-[7px] uppercase">NEXT</span>
              <span
                className="inline-block text-white text-[12px] font-black tracking-[0.12em] text-center px-3 py-[7px]"
                style={{ backgroundColor: catColor(nearest.category) }}
              >{nearest.category}</span>
            </span>
            <span className="relative overflow-hidden block">
              <span className="aspect-[16/9] sm:aspect-[2/1] overflow-hidden block">
                <Image
                  src={nearest.image}
                  alt={nearest.title}
                  fill
                  className="object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.165,0.84,0.44,1)] group-hover:scale-[1.15]"
                />
              </span>
            </span>
            <span className="relative bg-[#333] px-4 pt-3 pb-3 sm:px-6 sm:pt-6 sm:pb-5 block">
              <span className="text-[18px] text-white font-bold leading-relaxed mb-3 block" style={{ whiteSpace: "pre-line" }}>
                {nearest.title}
              </span>
              <span className="text-[14px] text-black-400 mb-4 block">{nearest.description}</span>
              <span className="flex flex-wrap items-center gap-5 text-[14px] text-[#a2a2a2] mb-5">
                <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" /> {nearest.date}</span>
                <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4" /> {nearest.location}</span>
                <span className="flex items-center gap-1.5"><Users className="w-4 h-4" /> {nearest.registered}/{nearest.capacity}名</span>
              </span>
              <span
                className="inline-flex items-center gap-2 px-8 py-3 rounded-md text-[15px] font-bold text-black transition-opacity hover:opacity-90"
                style={{ backgroundColor: "#dfb664" }}
              >
                参加する <ArrowRight className="w-4 h-4" />
              </span>
            </span>
          </Link>
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
            const catCounts: Record<string, number> = {};
            eventsInMonth.forEach((ev) => {
              catCounts[ev.category] = (catCounts[ev.category] || 0) + 1;
            });
            return (
              <div key={key} className="rounded-lg overflow-hidden border border-line">
                <button
                  onClick={() => toggleMonth(key)}
                  className="w-full flex items-center justify-between px-6 py-5 transition-colors group"
                  style={{ background: isOpen ? "linear-gradient(135deg, #1a1a1a 0%, #222 100%)" : "#1a1a1a" }}
                >
                  <div className="flex items-center gap-4">
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
                              style={{ backgroundColor: catColor(cat) }}
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

export default function EventsPage() {
  return (
    <Suspense fallback={null}>
      <EventsPageContent />
    </Suspense>
  );
}
