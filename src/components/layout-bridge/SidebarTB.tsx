"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Lightbulb, Building2, MessageSquarePlus, Send, CalendarDays, BookOpen, History } from "lucide-react";

const items = [
  { name: "ダッシュボード", href: "/bridge", icon: LayoutDashboard },
  { name: "東京インサイト", href: "/bridge/insights", icon: Lightbulb },
  { name: "東京企業・専門家", href: "/bridge/companies", icon: Building2 },
  { name: "連携テーマ募集", href: "/bridge/themes", icon: MessageSquarePlus },
  { name: "面談を依頼する", href: "/bridge/consult", icon: Send },
  { name: "イベント", href: "/bridge/events", icon: CalendarDays },
  { name: "事例", href: "/bridge/cases", icon: BookOpen },
  { name: "自社履歴", href: "/bridge/history", icon: History },
];

export default function SidebarTB() {
  const path = usePathname();

  return (
    <aside className="hidden xl:flex flex-col w-[220px] border-r border-line bg-white min-h-[calc(100vh-60px)]">
      <nav className="flex-1 p-2.5 space-y-0.5">
        {items.map((item) => {
          const active = item.href === "/bridge" ? path === "/bridge" : path.startsWith(item.href);
          return (
            <Link key={item.href} href={item.href}
              className={`flex items-center gap-2.5 rounded-md px-3 py-2.5 text-[13px] font-medium transition-all ${
                active ? "bg-indigo-500 text-white shadow-sm" : "text-black-400 hover:text-black-900 hover:bg-black-50"
              }`}>
              <item.icon className={`w-[15px] h-[15px] shrink-0 ${active ? "text-indigo-100" : ""}`} />
              {item.name}
            </Link>
          );
        })}
      </nav>
      <div className="p-2.5 border-t border-line">
        <div className="rounded-md bg-indigo-50 p-3.5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-bold text-indigo-700 tracking-[0.1em] uppercase">接続案件</span>
            <span className="text-[16px] font-bold text-black-900">3</span>
          </div>
          <p className="text-[10px] text-indigo-600">面談決定 1件 / 調整中 1件 / 新規 1件</p>
        </div>
      </div>
    </aside>
  );
}
