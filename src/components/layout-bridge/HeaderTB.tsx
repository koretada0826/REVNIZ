"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Lightbulb, Building2, MessageSquarePlus, CalendarDays, BookOpen, Bell, User, Menu, X } from "lucide-react";
import { useState } from "react";

const nav = [
  { name: "東京インサイト", href: "/bridge/insights", icon: Lightbulb },
  { name: "東京企業・専門家", href: "/bridge/companies", icon: Building2 },
  { name: "連携テーマ", href: "/bridge/themes", icon: MessageSquarePlus },
  { name: "イベント", href: "/bridge/events", icon: CalendarDays },
  { name: "事例", href: "/bridge/cases", icon: BookOpen },
];

export default function HeaderTB() {
  const path = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-line shadow-xs">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <div className="flex items-center justify-between h-[60px]">
          <Link href="/bridge" className="flex items-center gap-2.5 shrink-0">
            <div className="w-8 h-8 bg-indigo-500 rounded-sm flex items-center justify-center">
              <span className="text-white font-bold text-[11px] tracking-tight">TB</span>
            </div>
            <div className="hidden sm:block leading-none">
              <span className="font-bold text-[14px] tracking-tight text-black-900 block">Tokyo Bridge</span>
              <span className="text-[9px] text-black-300 tracking-[0.15em] uppercase">REVNIZE</span>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-0.5">
            {nav.map((item) => {
              const active = path.startsWith(item.href);
              return (
                <Link key={item.href} href={item.href}
                  className={`relative flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[13px] font-medium transition-all ${
                    active ? "text-black-900 bg-indigo-50" : "text-muted hover:text-black-900"
                  }`}>
                  <item.icon className="w-3.5 h-3.5" />
                  {item.name}
                  {active && <span className="absolute -bottom-[15px] left-1/2 -translate-x-1/2 w-5 h-[2px] bg-indigo-500 rounded-full" />}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-1">
            <button className="btn-icon relative">
              <Bell className="w-[17px] h-[17px]" />
              <span className="absolute top-1.5 right-1.5 w-[6px] h-[6px] bg-indigo-500 rounded-full ring-2 ring-white" />
            </button>
            <div className="hidden sm:block w-px h-5 bg-line mx-1.5" />
            <Link href="/bridge/history" className="hidden sm:flex items-center gap-2 rounded-full px-2.5 py-1.5 hover:bg-black-50 transition-colors">
              <div className="w-7 h-7 rounded-full bg-indigo-50 flex items-center justify-center">
                <User className="w-3.5 h-3.5 text-indigo-600" />
              </div>
              <span className="text-[12px] font-semibold text-black-900">山本 健一</span>
            </Link>
            <button className="lg:hidden btn-icon" onClick={() => setOpen(!open)}>
              {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {open && (
        <div className="lg:hidden border-t border-line bg-white animate-in">
          <nav className="p-2 space-y-0.5">
            {nav.map((item) => {
              const active = path.startsWith(item.href);
              return (
                <Link key={item.href} href={item.href} onClick={() => setOpen(false)}
                  className={`flex items-center gap-3 rounded-md px-4 py-3 text-[13px] font-medium ${
                    active ? "text-black-900 bg-indigo-50" : "text-muted hover:text-black-900 hover:bg-black-50"
                  }`}>
                  <item.icon className="w-4 h-4" /> {item.name}
                </Link>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
}
