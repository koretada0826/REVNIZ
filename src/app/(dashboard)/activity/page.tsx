"use client";

import Link from "next/link";
import { Building2, MessageSquare, Calendar, Handshake, TrendingUp, ArrowUpRight, ChevronRight } from "lucide-react";
import FadeIn from "@/components/motion/FadeIn";
import { companies, consultations, events } from "@/data/mock";

const statCards = [
  {
    id: "sponsors",
    title: "スポンサー企業",
    value: "35",
    unit: "社",
    change: "+3",
    changePeriod: "今月",
    icon: Building2,
    href: "/companies",
    sparkline: [18, 20, 22, 24, 26, 30, 35],
    details: [
      { label: "IT・テクノロジー", value: "8社" },
      { label: "飲食", value: "6社" },
      { label: "建設", value: "5社" },
      { label: "サービス", value: "5社" },
      { label: "メディア", value: "4社" },
      { label: "その他", value: "7社" },
    ],
  },
  {
    id: "meetings",
    title: "今月の面談依頼",
    value: "12",
    unit: "件",
    change: "+4",
    changePeriod: "先月比",
    icon: Handshake,
    href: "/meeting",
    sparkline: [3, 5, 4, 7, 6, 9, 12],
    details: [
      { label: "成立", value: "8件" },
      { label: "調整中", value: "3件" },
      { label: "キャンセル", value: "1件" },
    ],
  },
  {
    id: "consultations",
    title: "相談投稿",
    value: "18",
    unit: "件",
    change: "+6",
    changePeriod: "今月",
    icon: MessageSquare,
    href: "/board",
    sparkline: [5, 7, 8, 10, 12, 15, 18],
    details: [
      { label: "販路拡大", value: "5件" },
      { label: "DX推進", value: "4件" },
      { label: "採用", value: "3件" },
      { label: "コラボ", value: "3件" },
      { label: "その他", value: "3件" },
    ],
  },
  {
    id: "events",
    title: "今月のイベント",
    value: "4",
    unit: "件",
    change: "次回 3/28",
    changePeriod: "",
    icon: Calendar,
    href: "/events",
    sparkline: [1, 1, 2, 2, 3, 3, 4],
    details: [
      { label: "交流会", value: "2件" },
      { label: "商談会", value: "1件" },
      { label: "観戦イベント", value: "1件" },
    ],
  },
];

const monthlyData = [
  { month: "10月", sponsors: 28, meetings: 5, consultations: 8, events: 2 },
  { month: "11月", sponsors: 30, meetings: 7, consultations: 10, events: 3 },
  { month: "12月", sponsors: 31, meetings: 6, consultations: 12, events: 2 },
  { month: "1月", sponsors: 32, meetings: 8, consultations: 13, events: 3 },
  { month: "2月", sponsors: 32, meetings: 8, consultations: 12, events: 3 },
  { month: "3月", sponsors: 35, meetings: 12, consultations: 18, events: 4 },
];

function SparkChart({ data, color }: { data: number[]; color: string }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const w = 200;
  const h = 60;
  const points = data.map((v, i) => {
    const x = (i / (data.length - 1)) * w;
    const y = h - ((v - min) / range) * (h - 8) - 4;
    return `${x},${y}`;
  });
  const pathD = `M${points.join(" L")}`;
  const areaD = `${pathD} L${w},${h} L0,${h} Z`;

  return (
    <svg width="100%" height={h} viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none">
      <defs>
        <linearGradient id={`ag-${color.replace("#", "")}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity={0.3} />
          <stop offset="100%" stopColor={color} stopOpacity={0} />
        </linearGradient>
      </defs>
      <path d={areaD} fill={`url(#ag-${color.replace("#", "")})`} />
      <path d={pathD} fill="none" stroke={color} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />
      <circle
        cx={w}
        cy={h - ((data[data.length - 1] - min) / range) * (h - 8) - 4}
        r={4}
        fill={color}
      />
    </svg>
  );
}

export default function ActivityPage() {
  return (
    <div className="space-y-10">
      {/* Header */}
      <FadeIn>
        <div className="mb-2">
          <p className="label">Activity Dashboard</p>
          <h1 className="h1">アクティビティ</h1>
          <p className="body mt-3">スポンサーネットワーク全体の活動状況をリアルタイムで確認できます</p>
        </div>
      </FadeIn>

      {/* Stat Cards Grid */}
      <FadeIn delay={0.05}>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {statCards.map((card) => {
            const Icon = card.icon;
            return (
              <Link
                key={card.id}
                href={card.href}
                className="block rounded-lg overflow-hidden transition-all duration-300 group"
                style={{
                  background: "linear-gradient(135deg, #3d2e10 0%, #4a3818 50%, #3d2e10 100%)",
                  border: "1px solid rgba(223,182,100,0.4)",
                }}
              >
                <div className="p-3 sm:p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-1.5">
                      <Icon className="w-3.5 h-3.5" style={{ color: "#dfb664" }} />
                      <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider" style={{ color: "#dfb664" }}>
                        {card.title}
                      </span>
                    </div>
                    <ArrowUpRight className="w-3 h-3 text-white/30 group-hover:text-white/70 transition-colors" />
                  </div>

                  <div className="flex items-end gap-1 mb-0.5">
                    <span
                      className="text-[28px] sm:text-[32px] font-black text-white leading-none tracking-tight"
                      style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                    >
                      {card.value}
                    </span>
                    <span className="text-[12px] sm:text-[14px] font-bold mb-0.5" style={{ color: "rgba(223,182,100,0.7)" }}>
                      {card.unit}
                    </span>
                  </div>

                  <span className="text-[11px] sm:text-[12px] font-bold" style={{ color: "#22c55e" }}>
                    {card.change} <span className="text-white/40 font-normal text-[10px]">{card.changePeriod}</span>
                  </span>

                  <div className="mt-2 hidden sm:block">
                    <SparkChart data={card.sparkline} color="#dfb664" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </FadeIn>

      {/* Detail Breakdown */}
      <FadeIn delay={0.1}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {statCards.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={`detail-${card.id}`}
                className="rounded-xl p-6"
                style={{ background: "#1e1e1e", border: "1px solid #333" }}
              >
                <div className="flex items-center gap-2 mb-5">
                  <Icon className="w-5 h-5" style={{ color: "#dfb664" }} />
                  <h3 className="text-[18px] font-bold text-white">{card.title}の内訳</h3>
                </div>

                <div className="space-y-3">
                  {card.details.map((d) => {
                    const total = parseInt(card.value);
                    const val = parseInt(d.value);
                    const pct = Math.round((val / total) * 100);
                    return (
                      <div key={d.label}>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-[14px] font-medium text-white/80">{d.label}</span>
                          <span className="text-[14px] font-bold text-white">{d.value}</span>
                        </div>
                        <div className="h-2 rounded-full overflow-hidden" style={{ background: "#333" }}>
                          <div
                            className="h-full rounded-full"
                            style={{
                              width: `${pct}%`,
                              background: "linear-gradient(90deg, #C8102E, #dfb664)",
                            }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </FadeIn>

      {/* Monthly Trend Table */}
      <FadeIn delay={0.15}>
        <div className="rounded-xl overflow-hidden" style={{ background: "#1e1e1e", border: "1px solid #333" }}>
          <div className="p-6 pb-4">
            <div className="flex items-center gap-2 mb-1">
              <TrendingUp className="w-5 h-5" style={{ color: "#dfb664" }} />
              <h3 className="text-[18px] font-bold text-white">月別推移</h3>
            </div>
            <p className="text-[13px] text-white/40">2025-26シーズン</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-[14px]" style={{ minWidth: "500px" }}>
              <thead>
                <tr style={{ borderBottom: "2px solid rgba(223,182,100,0.2)" }}>
                  <th className="text-left py-3 px-6 font-bold" style={{ color: "#dfb664" }}>月</th>
                  <th className="text-center py-3 px-4 font-bold" style={{ color: "#dfb664" }}>スポンサー</th>
                  <th className="text-center py-3 px-4 font-bold" style={{ color: "#dfb664" }}>面談</th>
                  <th className="text-center py-3 px-4 font-bold" style={{ color: "#dfb664" }}>相談</th>
                  <th className="text-center py-3 px-4 font-bold" style={{ color: "#dfb664" }}>イベント</th>
                </tr>
              </thead>
              <tbody>
                {monthlyData.map((row, i) => (
                  <tr
                    key={row.month}
                    style={{
                      borderBottom: "1px solid #333",
                      background: i === monthlyData.length - 1 ? "rgba(200,16,46,0.08)" : "transparent",
                    }}
                  >
                    <td className="py-3 px-6 font-bold text-white">
                      {row.month}
                      {i === monthlyData.length - 1 && (
                        <span className="ml-2 text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background: "#C8102E", color: "#fff" }}>
                          NOW
                        </span>
                      )}
                    </td>
                    <td className="text-center py-3 px-4 text-white/80 font-medium">{row.sponsors}社</td>
                    <td className="text-center py-3 px-4 text-white/80 font-medium">{row.meetings}件</td>
                    <td className="text-center py-3 px-4 text-white/80 font-medium">{row.consultations}件</td>
                    <td className="text-center py-3 px-4 text-white/80 font-medium">{row.events}件</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </FadeIn>

      {/* Recent Activity Feed */}
      <FadeIn delay={0.2}>
        <div className="rounded-xl p-6" style={{ background: "#1e1e1e", border: "1px solid #333" }}>
          <h3 className="text-[18px] font-bold text-white mb-5">最近のアクティビティ</h3>

          <div className="space-y-0">
            {[
              { text: `${companies[5]?.name || "新規企業"}がスポンサーに参加`, time: "2時間前", icon: Building2, color: "#dfb664" },
              { text: `${consultations[0]?.title || "新しい相談"}が投稿されました`, time: "5時間前", icon: MessageSquare, color: "#22D3EE" },
              { text: `${events[0]?.title || "イベント"}の参加受付を開始`, time: "1日前", icon: Calendar, color: "#66cc99" },
              { text: "面談依頼が成立しました（南九州テクノロジーズ × 桜島フーズ）", time: "1日前", icon: Handshake, color: "#C8102E" },
              { text: `${companies[3]?.name || "企業"}がプロフィールを更新`, time: "2日前", icon: Building2, color: "#dfb664" },
              { text: "商談会の日程が確定しました（4月15日）", time: "3日前", icon: Calendar, color: "#66cc99" },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <div
                  key={i}
                  className="flex items-start gap-4 py-4"
                  style={{ borderBottom: i < 5 ? "1px solid #2a2a2a" : "none" }}
                >
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                    style={{ background: `${item.color}15` }}
                  >
                    <Icon className="w-4 h-4" style={{ color: item.color }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[14px] font-medium text-white/80 leading-snug">{item.text}</p>
                    <p className="text-[12px] text-white/30 mt-1">{item.time}</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-white/20 shrink-0 mt-1" />
                </div>
              );
            })}
          </div>
        </div>
      </FadeIn>
    </div>
  );
}
