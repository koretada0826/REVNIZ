"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Bell, User, Search, Menu, X,
  LayoutDashboard, BarChart3, Building2, MessageSquare, Calendar, Gift,
  Trophy, Mail, Megaphone, UserCircle,
} from "lucide-react";

const navItems = [
  { name: "ダッシュボード", href: "/", icon: LayoutDashboard },
  { name: "アクティビティ", href: "/activity", icon: BarChart3 },
  { name: "スポンサー一覧", href: "/companies", icon: Building2 },
  { name: "相談掲示板", href: "/board", icon: MessageSquare, badge: 4 },
  { name: "イベント", href: "/events", icon: Calendar, badge: 2 },
  { name: "スポンサー特典", href: "/benefits", icon: Gift },
  { name: "成功事例", href: "/cases", icon: Trophy },
  { name: "メッセージ", href: "/messages", icon: Mail, badge: 3 },
  { name: "お知らせ", href: "/news", icon: Megaphone },
  { name: "プロフィール", href: "/profile", icon: UserCircle },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const path = usePathname();

  return (
    <>
      <header className="sticky top-0 z-50 bg-black-900 border-b border-line">
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-3 shrink-0">
              <div className="w-9 h-9 rounded-md flex items-center justify-center" style={{ background: "#C8102E" }}>
                <span className="text-white font-bold text-[11px] tracking-[0.15em]">SC</span>
              </div>
              <div className="hidden sm:block leading-none">
                <span className="font-bold text-[15px] tracking-tight text-white block">Sponsor Connect</span>
                <span className="text-[9px] text-black-300 tracking-[0.2em] uppercase">REVNIZE</span>
              </div>
            </Link>

            <div className="flex items-center gap-1.5">
              <button className="btn-icon">
                <Search className="w-[18px] h-[18px]" />
              </button>
              <button className="btn-icon relative">
                <Bell className="w-[18px] h-[18px]" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red rounded-full ring-2 ring-black-900" />
              </button>
              <div className="hidden sm:block w-px h-6 bg-line mx-2" />
              <Link href="/profile" className="hidden sm:flex items-center gap-2.5 rounded-md px-2.5 py-2 hover:bg-white/10 transition-colors">
                <div className="w-8 h-8 rounded-md bg-black-700 flex items-center justify-center">
                  <User className="w-4 h-4 text-black-300" />
                </div>
                <span className="text-[14px] font-semibold text-white">田中 太郎</span>
              </Link>

              {/* Hamburger button — mobile only */}
              <button
                className="xl:hidden btn-icon ml-1"
                onClick={() => setMenuOpen(!menuOpen)}
              >
                {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile menu overlay */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-40 xl:hidden"
          onClick={() => setMenuOpen(false)}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/60" />

          {/* Menu panel */}
          <nav
            className="absolute top-16 right-0 w-72 max-h-[calc(100vh-64px)] overflow-y-auto"
            style={{ background: "#0a0a0a", borderLeft: "1px solid #333", borderBottom: "1px solid #333" }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* User info */}
            <div className="p-4 border-b border-line flex items-center gap-3">
              <div className="w-10 h-10 rounded-md bg-black-700 flex items-center justify-center">
                <User className="w-5 h-5 text-black-300" />
              </div>
              <div>
                <p className="text-[14px] font-bold text-white">田中 太郎</p>
                <p className="text-[11px] text-white/40">南九州テクノロジーズ</p>
              </div>
            </div>

            {/* Nav items */}
            <div className="py-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const active = item.href === "/" ? path === "/" : path.startsWith(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className={`flex items-center gap-3 px-5 py-3.5 text-[14px] font-medium transition-colors ${
                      active ? "text-white" : "text-white/60 hover:text-white hover:bg-white/5"
                    }`}
                    style={active ? { background: "rgba(200,16,46,0.12)", borderLeft: "3px solid #C8102E" } : {}}
                  >
                    <Icon
                      className="w-[18px] h-[18px] shrink-0"
                      style={active ? { color: "#C8102E" } : {}}
                    />
                    <span className="flex-1">{item.name}</span>
                    {item.badge && (
                      <span className="min-w-[20px] h-[20px] rounded-full bg-red text-white text-[10px] font-bold flex items-center justify-center">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>

            {/* Bottom accent */}
            <div className="h-[3px]" style={{ background: "linear-gradient(90deg, #C8102E 0%, #C8102E 70%, #dfb664 100%)" }} />
          </nav>
        </div>
      )}
    </>
  );
}
