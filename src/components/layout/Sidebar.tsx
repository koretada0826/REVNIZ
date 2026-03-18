"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Building2, MessageSquare, Handshake, Calendar, Trophy, UserCircle, Megaphone, TrendingUp } from "lucide-react";

const mainItems = [
  { name: "ダッシュボード", href: "/", icon: LayoutDashboard },
  { name: "スポンサー一覧", href: "/companies", icon: Building2 },
  { name: "相談掲示板", href: "/board", icon: MessageSquare, badge: 4 },
  { name: "イベント", href: "/events", icon: Calendar, badge: 2 },
];

const subItems = [
  { name: "成功事例", href: "/cases", icon: Trophy },
  { name: "お知らせ", href: "/news", icon: Megaphone, badge: 3 },
  { name: "プロフィール", href: "/profile", icon: UserCircle },
];

export default function Sidebar() {
  const path = usePathname();

  return (
    <aside className="hidden xl:flex flex-col w-[230px] border-r border-line bg-black-900 min-h-[calc(100vh-56px)]">
      <nav className="flex-1 p-3 space-y-0.5">
        <div className="px-3 py-2">
          <span className="text-[9px] font-bold text-black-300 tracking-[0.15em] uppercase">メインメニュー</span>
        </div>
        {mainItems.map((item) => {
          const active = item.href === "/" ? path === "/" : path.startsWith(item.href);
          return (
            <Link key={item.href} href={item.href}
              className={`flex items-center gap-2.5 rounded-md px-3 py-2.5 text-[13px] font-medium transition-colors group ${
                active ? "bg-white/10 text-white" : "text-black-400 hover:text-white hover:bg-white/10"
              }`}>
              <item.icon className={`w-[15px] h-[15px] shrink-0 ${active ? "text-red-400" : "group-hover:text-black-600"}`} />
              <span className="flex-1">{item.name}</span>
              {item.badge && !active && (
                <span className="min-w-[18px] h-[18px] rounded-full bg-red-50 text-red text-[10px] font-bold flex items-center justify-center">{item.badge}</span>
              )}
            </Link>
          );
        })}

        <div className="divider my-3 mx-3" />

        <div className="px-3 py-2">
          <span className="text-[9px] font-bold text-black-300 tracking-[0.15em] uppercase">その他</span>
        </div>
        {subItems.map((item) => {
          const active = item.href === "/" ? path === "/" : path.startsWith(item.href);
          return (
            <Link key={item.href} href={item.href}
              className={`flex items-center gap-2.5 rounded-md px-3 py-2.5 text-[13px] font-medium transition-colors group ${
                active ? "bg-white/10 text-white" : "text-black-400 hover:text-white hover:bg-white/10"
              }`}>
              <item.icon className={`w-[15px] h-[15px] shrink-0 ${active ? "text-red-400" : "group-hover:text-black-600"}`} />
              <span className="flex-1">{item.name}</span>
              {item.badge && !active && (
                <span className="min-w-[18px] h-[18px] rounded-full bg-red-50 text-red text-[10px] font-bold flex items-center justify-center">{item.badge}</span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Profile completion */}
      <div className="p-3 border-t border-line">
        <div className="rounded-md bg-white/5 p-4">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-3.5 h-3.5 text-black-400" />
            <span className="text-[10px] font-bold text-black-400 tracking-[0.1em] uppercase">プロフィール充足率</span>
          </div>
          <div className="flex items-end justify-between mb-2">
            <span className="text-[22px] font-bold text-white leading-none tracking-tight">75<span className="text-[13px] text-black-400">%</span></span>
          </div>
          <div className="progress-bar">
            <div className="progress-fill bg-black-900 w-3/4" />
          </div>
          <p className="text-[10px] text-black-400 mt-2">あと25%で完了</p>
        </div>
      </div>
    </aside>
  );
}
