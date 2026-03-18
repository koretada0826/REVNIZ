"use client";

import Image from "next/image";
import { Calendar, MapPin, Users, ArrowRight } from "lucide-react";
import { events } from "@/data/mock";
import FadeIn from "@/components/motion/FadeIn";

const TODAY = "2026-03-18";

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
  const sorted = [...events].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  const upcoming = sorted.filter((ev) => ev.date >= TODAY);
  const nearest = upcoming[0];
  const rest = upcoming.slice(1);

  return (
    <FadeIn><div className="space-y-8">
      <div>
        <p className="label">Events</p>
        <h1 className="h1">イベント一覧</h1>
        <p className="body mt-3">オンラインの接点をリアルな交流や商談につなげる</p>
      </div>

      <div className="flex flex-wrap gap-2">
        {["すべて", "GAME", "イベント", "スポンサー"].map((c, i) => <button key={c} className={i === 0 ? "tag-active" : "tag"}>{c}</button>)}
      </div>

      {/* 直近イベント（大きく表示） */}
      {nearest && (
        <div>
          <p className="label mb-4">Next Event</p>
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

      {/* 今後のイベント */}
      {rest.length > 0 && (
        <div>
          <p className="label mb-4">Upcoming Events</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {rest.map((ev) => (
              <EventCard key={ev.id} ev={ev} />
            ))}
          </div>
        </div>
      )}
    </div></FadeIn>
  );
}
