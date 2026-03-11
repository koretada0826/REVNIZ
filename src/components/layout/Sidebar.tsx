"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Building2, MessageSquare, Sparkles, Calendar, Trophy, UserCircle, Megaphone } from "lucide-react";

const items = [
  { name: "ダッシュボード", href: "/", icon: LayoutDashboard },
  { name: "スポンサー一覧", href: "/companies", icon: Building2 },
  { name: "相談掲示板", href: "/board", icon: MessageSquare },
  { name: "おすすめ", href: "/matching", icon: Sparkles },
  { name: "イベント", href: "/events", icon: Calendar },
  { name: "成功事例", href: "/cases", icon: Trophy },
  { name: "お知らせ", href: "/news", icon: Megaphone },
  { name: "プロフィール", href: "/profile", icon: UserCircle },
];

export default function Sidebar() {
  const path = usePathname();

  return (
    <aside className="hidden xl:flex flex-col w-[220px] border-r border-line bg-white min-h-[calc(100vh-60px)]">
      <nav className="flex-1 p-2.5 space-y-0.5">
        {items.map((item) => {
          const active = item.href === "/" ? path === "/" : path.startsWith(item.href);
          return (
            <Link key={item.href} href={item.href}
              className={`flex items-center gap-2.5 rounded-md px-3 py-2.5 text-[13px] font-medium transition-all ${
                active ? "bg-black-900 text-white shadow-sm" : "text-black-400 hover:text-black-900 hover:bg-black-50"
              }`}>
              <item.icon className={`w-[15px] h-[15px] shrink-0 ${active ? "text-red-400" : ""}`} />
              {item.name}
            </Link>
          );
        })}
      </nav>
      <div className="p-2.5 border-t border-line">
        <div className="rounded-md bg-black-50 p-3.5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-bold text-black-500 tracking-[0.1em] uppercase">充足率</span>
            <span className="text-[16px] font-bold text-black-900">75%</span>
          </div>
          <div className="h-1 rounded-full bg-black-200 overflow-hidden">
            <div className="h-full rounded-full bg-red w-3/4" />
          </div>
        </div>
      </div>
    </aside>
  );
}
