"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FlaskConical, Radio, FileBarChart2, BookOpen, CalendarDays, Bell, User, Menu, X } from "lucide-react";
import { useState } from "react";

const nav = [
  { name: "実証メニュー", href: "/fanlab/menus", icon: FlaskConical },
  { name: "募集中", href: "/fanlab/experiments", icon: Radio },
  { name: "レポート", href: "/fanlab/reports", icon: FileBarChart2 },
  { name: "事例", href: "/fanlab/cases", icon: BookOpen },
  { name: "カレンダー", href: "/fanlab/calendar", icon: CalendarDays },
];

export default function HeaderFL() {
  const path = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-line shadow-xs">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <div className="flex items-center justify-between h-[60px]">
          <Link href="/fanlab" className="flex items-center gap-2.5 shrink-0">
            <div className="w-8 h-8 bg-cyan-500 rounded-sm flex items-center justify-center">
              <FlaskConical className="w-4 h-4 text-white" />
            </div>
            <div className="hidden sm:block leading-none">
              <span className="font-bold text-[14px] tracking-tight text-black-900 block">Fan Lab</span>
              <span className="text-[9px] text-black-300 tracking-[0.15em] uppercase">REVNIZE</span>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-0.5">
            {nav.map((item) => {
              const active = path.startsWith(item.href);
              return (
                <Link key={item.href} href={item.href}
                  className={`relative flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[13px] font-medium transition-all ${
                    active ? "text-black-900 bg-cyan-50" : "text-muted hover:text-black-900"
                  }`}>
                  <item.icon className="w-3.5 h-3.5" />
                  {item.name}
                  {active && <span className="absolute -bottom-[15px] left-1/2 -translate-x-1/2 w-5 h-[2px] bg-cyan-500 rounded-full" />}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-1">
            <button className="btn-icon relative">
              <Bell className="w-[17px] h-[17px]" />
              <span className="absolute top-1.5 right-1.5 w-[6px] h-[6px] bg-cyan-500 rounded-full ring-2 ring-white" />
            </button>
            <div className="hidden sm:block w-px h-5 bg-line mx-1.5" />
            <Link href="/fanlab/history" className="hidden sm:flex items-center gap-2 rounded-full px-2.5 py-1.5 hover:bg-black-50 transition-colors">
              <div className="w-7 h-7 rounded-full bg-cyan-50 flex items-center justify-center">
                <User className="w-3.5 h-3.5 text-cyan-600" />
              </div>
              <span className="text-[12px] font-semibold text-black-900">田中 太郎</span>
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
                    active ? "text-black-900 bg-cyan-50" : "text-muted hover:text-black-900 hover:bg-black-50"
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
