"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Building2, MessageSquare, Sparkles, Calendar, Trophy, UserCircle, Megaphone } from "lucide-react";

const items = [
  { name: "ダッシュボード", href: "/v2", icon: LayoutDashboard },
  { name: "スポンサー一覧", href: "/v2/companies", icon: Building2 },
  { name: "相談掲示板", href: "/v2/board", icon: MessageSquare },
  { name: "おすすめ", href: "/v2/matching", icon: Sparkles },
  { name: "イベント", href: "/v2/events", icon: Calendar },
  { name: "成功事例", href: "/v2/cases", icon: Trophy },
  { name: "お知らせ", href: "/v2/news", icon: Megaphone },
  { name: "プロフィール", href: "/v2/profile", icon: UserCircle },
];

export default function SidebarV2() {
  const path = usePathname();

  return (
    <aside className="hidden xl:flex flex-col w-[220px] border-r border-white/[0.06] bg-black-900 min-h-[calc(100vh-60px)]">
      <nav className="flex-1 p-2.5 space-y-0.5">
        {items.map((item) => {
          const active = item.href === "/v2" ? path === "/v2" : path.startsWith(item.href);
          return (
            <Link key={item.href} href={item.href}
              className={`flex items-center gap-2.5 rounded-md px-3 py-2.5 text-[13px] font-medium transition-all ${
                active ? "bg-white/10 text-white" : "text-white/40 hover:text-white hover:bg-white/5"
              }`}>
              <item.icon className={`w-[15px] h-[15px] shrink-0 ${active ? "text-red-400" : ""}`} />
              {item.name}
            </Link>
          );
        })}
      </nav>
      <div className="p-2.5 border-t border-white/[0.06]">
        <div className="rounded-md bg-white/5 p-3.5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-bold text-white/30 tracking-[0.1em] uppercase">充足率</span>
            <span className="text-[16px] font-bold text-white">75%</span>
          </div>
          <div className="h-1 rounded-full bg-white/10 overflow-hidden">
            <div className="h-full rounded-full bg-red w-3/4" />
          </div>
        </div>
      </div>
    </aside>
  );
}
