"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Building2, MessageSquare, Handshake, Calendar, Trophy, Bell, User, Menu, X, Search } from "lucide-react";
import { useState } from "react";

const nav = [
  { name: "企業を探す", href: "/companies", icon: Building2 },
  { name: "相談を探す", href: "/board", icon: MessageSquare },
  { name: "イベント", href: "/events", icon: Calendar },
  { name: "事例", href: "/cases", icon: Trophy },
];

export default function Header() {
  const path = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-line">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-3 shrink-0">
            <div className="w-9 h-9 bg-black-900 rounded-md flex items-center justify-center">
              <span className="text-white font-bold text-[11px] tracking-[0.15em]">SC</span>
            </div>
            <div className="hidden sm:block leading-none">
              <span className="font-bold text-[15px] tracking-tight text-black-900 block">Sponsor Connect</span>
              <span className="text-[9px] text-black-300 tracking-[0.2em] uppercase">REVNIZE</span>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {nav.map((item) => {
              const active = item.href === "/" ? path === "/" : path.startsWith(item.href);
              return (
                <Link key={item.href} href={item.href}
                  className={`flex items-center gap-2 px-4 py-2 rounded-md text-[14px] font-medium transition-colors ${
                    active ? "text-black-900 bg-black-50" : "text-black-400 hover:text-black-700"
                  }`}>
                  <item.icon className={`w-4 h-4 ${active ? "text-red" : ""}`} />
                  {item.name}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-1.5">
            <button className="btn-icon">
              <Search className="w-[18px] h-[18px]" />
            </button>
            <button className="btn-icon relative">
              <Bell className="w-[18px] h-[18px]" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red rounded-full ring-2 ring-white" />
            </button>
            <div className="hidden sm:block w-px h-6 bg-line mx-2" />
            <Link href="/profile" className="hidden sm:flex items-center gap-2.5 rounded-md px-2.5 py-2 hover:bg-black-50 transition-colors">
              <div className="w-8 h-8 rounded-md bg-black-100 flex items-center justify-center">
                <User className="w-4 h-4 text-black-500" />
              </div>
              <span className="text-[14px] font-semibold text-black-900">田中 太郎</span>
            </Link>
            <button className="lg:hidden btn-icon" onClick={() => setOpen(!open)}>
              {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {open && (
        <div className="lg:hidden border-t border-line bg-white">
          <nav className="p-3 space-y-1">
            {nav.map((item) => {
              const active = path.startsWith(item.href);
              return (
                <Link key={item.href} href={item.href} onClick={() => setOpen(false)}
                  className={`flex items-center gap-3 rounded-md px-4 py-3.5 text-[15px] font-medium transition-colors ${
                    active ? "text-black-900 bg-black-50" : "text-muted hover:text-black-900 hover:bg-black-50"
                  }`}>
                  <item.icon className={`w-5 h-5 ${active ? "text-red" : ""}`} /> {item.name}
                </Link>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
}
