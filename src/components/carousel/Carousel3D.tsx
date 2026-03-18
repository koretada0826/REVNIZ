"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";

// --- Types ---
interface CardData {
  id: string;
  title: string;
  value: string;
  label: string;
  change: string;
  changePositive: boolean;
  sparkline: number[];
  color: string;
  href: string;
}

// --- Data ---
const cards: CardData[] = [
  {
    id: "sponsors",
    title: "スポンサー企業",
    value: "35",
    label: "社",
    change: "+3 今月",
    changePositive: true,
    sparkline: [18, 20, 22, 24, 26, 30, 35],
    color: "#dfb664",
    href: "/companies",
  },
  {
    id: "meetings",
    title: "今月の面談依頼",
    value: "12",
    label: "件",
    change: "+4 先月比",
    changePositive: true,
    sparkline: [3, 5, 4, 7, 6, 9, 12],
    color: "#C8102E",
    href: "/meeting",
  },
  {
    id: "consultations",
    title: "相談投稿",
    value: "18",
    label: "件",
    change: "+6 今月",
    changePositive: true,
    sparkline: [5, 7, 8, 10, 12, 15, 18],
    color: "#22D3EE",
    href: "/board",
  },
  {
    id: "events",
    title: "今月のイベント",
    value: "4",
    label: "件",
    change: "次回 3/28",
    changePositive: true,
    sparkline: [1, 1, 2, 2, 3, 3, 4],
    color: "#66cc99",
    href: "/events",
  },
];

// --- Position definitions ---
// Each position: [translateX%, translateY%, scale, opacity, zIndex]
const positions = [
  { x: 0, y: 0, scale: 1, opacity: 1, z: 40 },       // 0: front center
  { x: -85, y: 15, scale: 0.75, opacity: 0.6, z: 20 }, // 1: left back
  { x: 85, y: 15, scale: 0.75, opacity: 0.6, z: 20 },  // 2: right back
  { x: 0, y: 25, scale: 0.6, opacity: 0.35, z: 10 },   // 3: center far back
];

// --- SVG Sparkline ---
function MiniChart({ data, color, active }: { data: number[]; color: string; active: boolean }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const w = 120;
  const h = 40;
  const points = data.map((v, i) => {
    const x = (i / (data.length - 1)) * w;
    const y = h - ((v - min) / range) * (h - 4) - 2;
    return `${x},${y}`;
  });
  const pathD = `M${points.join(" L")}`;
  const areaD = `${pathD} L${w},${h} L0,${h} Z`;

  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} className="overflow-visible">
      <defs>
        <linearGradient id={`grad-${color.replace("#", "")}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity={active ? 0.25 : 0.1} />
          <stop offset="100%" stopColor={color} stopOpacity={0} />
        </linearGradient>
      </defs>
      <path d={areaD} fill={`url(#grad-${color.replace("#", "")})`} />
      <path
        d={pathD}
        fill="none"
        stroke={color}
        strokeWidth={active ? 2.5 : 1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {active && (
        <circle
          cx={(data.length - 1) / (data.length - 1) * w}
          cy={h - ((data[data.length - 1] - min) / range) * (h - 4) - 2}
          r={3.5}
          fill={color}
        >
          <animate attributeName="r" values="3.5;5;3.5" dur="2s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="1;0.5;1" dur="2s" repeatCount="indefinite" />
        </circle>
      )}
    </svg>
  );
}

// --- Main Component ---
export default function Carousel3D() {
  // order[i] = which position card i is in
  const [order, setOrder] = useState([0, 1, 2, 3]);
  const [isPaused, setIsPaused] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const rotate = useCallback(() => {
    setIsTransitioning(true);
    setOrder((prev) => prev.map((pos) => (pos + 1) % 4));
    setTimeout(() => setIsTransitioning(false), 500);
  }, []);

  useEffect(() => {
    if (isPaused) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }
    timerRef.current = setInterval(rotate, 2500);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused, rotate]);

  const frontIndex = order.indexOf(0);

  return (
    <div
      className="relative w-full"
      style={{ height: 220 }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* PC: 3D carousel */}
      <div className="hidden sm:block relative w-full h-full">
        {cards.map((card, i) => {
          const posIdx = order[i];
          const pos = positions[posIdx];
          const isFront = posIdx === 0;

          const Wrapper = isFront ? Link : "div";
          const wrapperProps = isFront ? { href: card.href } : {};

          return (
            <Wrapper
              key={card.id}
              {...(wrapperProps as any)}
              className="absolute top-0 left-1/2 group block"
              style={{
                width: 260,
                marginLeft: -130,
                transform: `translateX(${pos.x}%) translateY(${pos.y}px) scale(${pos.scale})`,
                opacity: pos.opacity,
                zIndex: pos.z,
                transition: isTransitioning
                  ? "all 500ms cubic-bezier(0.4, 0, 0.2, 1)"
                  : "none",
                pointerEvents: isFront ? "auto" : "none",
                cursor: isFront ? "pointer" : "default",
                textDecoration: "none",
              }}
            >
              <div
                className="relative rounded-xl overflow-hidden"
                style={{
                  background: isFront
                    ? "linear-gradient(135deg, #ffffff 0%, #f8f8f8 100%)"
                    : "#f0f0f0",
                  boxShadow: isFront
                    ? "0 20px 40px rgba(0,0,0,0.3), 0 8px 16px rgba(0,0,0,0.2)"
                    : "0 4px 12px rgba(0,0,0,0.15)",
                  transition: "box-shadow 300ms, transform 300ms",
                  transform: "translateY(0)",
                }}
                onMouseEnter={(e) => {
                  if (isFront) {
                    e.currentTarget.style.transform = "translateY(-4px)";
                    e.currentTarget.style.boxShadow =
                      "0 24px 48px rgba(0,0,0,0.35), 0 12px 20px rgba(0,0,0,0.25)";
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  if (isFront) {
                    e.currentTarget.style.boxShadow =
                      "0 20px 40px rgba(0,0,0,0.3), 0 8px 16px rgba(0,0,0,0.2)";
                  }
                }}
              >
                {/* Highlight glow for front card */}
                {isFront && (
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(255,255,255,0.4) 0%, transparent 50%)",
                      zIndex: 1,
                    }}
                  />
                )}

                <div className="relative p-5" style={{ zIndex: 2 }}>
                  {/* Header */}
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className="text-[11px] font-bold tracking-wider uppercase"
                      style={{ color: "#888" }}
                    >
                      {card.title}
                    </span>
                    <div
                      className="w-2 h-2 rounded-full"
                      style={{
                        background: card.color,
                        boxShadow: isFront ? `0 0 8px ${card.color}` : "none",
                      }}
                    />
                  </div>

                  {/* Value */}
                  <div className="flex items-end gap-1.5 mb-1">
                    <span
                      className="text-[36px] font-bold leading-none tracking-tight"
                      style={{
                        color: "#111",
                        fontFamily: "'Space Grotesk', sans-serif",
                      }}
                    >
                      {card.value}
                    </span>
                    <span className="text-[14px] font-medium text-gray-400 mb-1">
                      {card.label}
                    </span>
                  </div>

                  {/* Change */}
                  <span
                    className="text-[12px] font-semibold"
                    style={{
                      color: card.changePositive ? "#22c55e" : "#ef4444",
                    }}
                  >
                    {card.change}
                  </span>

                  {/* Chart */}
                  <div className="mt-4">
                    <MiniChart data={card.sparkline} color={card.color} active={isFront} />
                  </div>
                </div>
              </div>
            </Wrapper>
          );
        })}
      </div>

      {/* SP: horizontal scroll */}
      <div className="sm:hidden flex gap-3 overflow-x-auto pb-3 snap-x snap-mandatory px-4 -mx-4 h-full items-center">
        {cards.map((card) => (
          <Link
            key={card.id}
            href={card.href}
            className="snap-center shrink-0 rounded-xl p-5 block"
            style={{
              width: 220,
              background: "#fff",
              boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
              textDecoration: "none",
            }}
          >
            <span className="text-[11px] font-bold tracking-wider uppercase text-gray-500 block mb-3">
              {card.title}
            </span>
            <div className="flex items-end gap-1.5 mb-1">
              <span className="text-[28px] font-bold text-gray-900 leading-none" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                {card.value}
              </span>
              <span className="text-[13px] text-gray-400 mb-0.5">{card.label}</span>
            </div>
            <span className="text-[11px] font-semibold" style={{ color: "#22c55e" }}>
              {card.change}
            </span>
            <div className="mt-3">
              <MiniChart data={card.sparkline} color={card.color} active={false} />
            </div>
          </Link>
        ))}
      </div>

      {/* Dots indicator */}
      <div className="hidden sm:flex justify-center gap-2 mt-2">
        {cards.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              const currentPos = order[i];
              const steps = (4 - currentPos) % 4;
              setIsTransitioning(true);
              setOrder((prev) => prev.map((p) => (p + steps) % 4));
              setTimeout(() => setIsTransitioning(false), 500);
            }}
            className="transition-all duration-300"
            style={{
              width: i === frontIndex ? 24 : 8,
              height: 8,
              borderRadius: 4,
              background: i === frontIndex ? "#dfb664" : "#555",
            }}
          />
        ))}
      </div>
    </div>
  );
}
