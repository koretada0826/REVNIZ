"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, FlaskConical, Radio, Send, FileBarChart2, BookOpen, CalendarDays, Users, History } from "lucide-react";

const items = [
  { name: "ダッシュボード", href: "/fanlab", icon: LayoutDashboard },
  { name: "実証メニュー", href: "/fanlab/menus", icon: FlaskConical },
  { name: "募集中企画", href: "/fanlab/experiments", icon: Radio },
  { name: "相談する", href: "/fanlab/consult", icon: Send },
  { name: "レポート", href: "/fanlab/reports", icon: FileBarChart2 },
  { name: "事例", href: "/fanlab/cases", icon: BookOpen },
  { name: "カレンダー", href: "/fanlab/calendar", icon: CalendarDays },
  { name: "来場者属性", href: "/fanlab/audience", icon: Users },
  { name: "自社履歴", href: "/fanlab/history", icon: History },
];

export default function SidebarFL() {
  const path = usePathname();

  return (
    <aside className="hidden xl:flex flex-col w-[220px] border-r border-line bg-white min-h-[calc(100vh-60px)]">
      <nav className="flex-1 p-2.5 space-y-0.5">
        {items.map((item) => {
          const active = item.href === "/fanlab" ? path === "/fanlab" : path.startsWith(item.href);
          return (
            <Link key={item.href} href={item.href}
              className={`flex items-center gap-2.5 rounded-md px-3 py-2.5 text-[13px] font-medium transition-all ${
                active ? "bg-cyan-500 text-white shadow-sm" : "text-black-400 hover:text-black-900 hover:bg-black-50"
              }`}>
              <item.icon className={`w-[15px] h-[15px] shrink-0 ${active ? "text-cyan-100" : ""}`} />
              {item.name}
            </Link>
          );
        })}
      </nav>
      <div className="p-2.5 border-t border-line">
        <div className="rounded-md bg-cyan-50 p-3.5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-bold text-cyan-700 tracking-[0.1em] uppercase">稼働案件</span>
            <span className="text-[16px] font-bold text-black-900">2</span>
          </div>
          <p className="text-[10px] text-cyan-600">設計中 1件 / ヒアリング中 1件</p>
        </div>
      </div>
    </aside>
  );
}
