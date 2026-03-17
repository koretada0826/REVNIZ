"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Building2, MessageSquare, Sparkles, Calendar, Trophy, Bell, User, Menu, X } from "lucide-react";
import { useState } from "react";

const nav = [
  { name: "企業を探す", href: "/v2/companies", icon: Building2 },
  { name: "相談を探す", href: "/v2/board", icon: MessageSquare },
  { name: "おすすめ", href: "/v2/matching", icon: Sparkles },
  { name: "イベント", href: "/v2/events", icon: Calendar },
  { name: "事例", href: "/v2/cases", icon: Trophy },
];

export default function HeaderV2() {
  const path = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-black-900/80 backdrop-blur-xl border-b border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <div className="flex items-center justify-between h-[60px]">
          <Link href="/v2" className="flex items-center gap-2.5 shrink-0">
            <div className="w-8 h-8 bg-red rounded-sm flex items-center justify-center">
              <span className="text-white font-bold text-[10px] tracking-[0.15em]">SC</span>
            </div>
            <div className="hidden sm:block leading-none">
              <span className="font-bold text-[14px] tracking-tight text-white block">Sponsor Connect</span>
              <span className="text-[9px] text-white/30 tracking-[0.15em] uppercase">REVNIZE</span>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-0.5">
            {nav.map((item) => {
              const active = path.startsWith(item.href);
              return (
                <Link key={item.href} href={item.href}
                  className={`relative flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[13px] font-medium transition-all ${
                    active ? "text-white bg-white/10" : "text-white/50 hover:text-white"
                  }`}>
                  <item.icon className="w-3.5 h-3.5" />
                  {item.name}
                  {active && <span className="absolute -bottom-[15px] left-1/2 -translate-x-1/2 w-5 h-[2px] bg-red rounded-full" />}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-1">
            <button className="btn-icon relative text-white/50 hover:text-white">
              <Bell className="w-[17px] h-[17px]" />
              <span className="absolute top-1.5 right-1.5 w-[6px] h-[6px] bg-red rounded-full ring-2 ring-black-900" />
            </button>
            <div className="hidden sm:block w-px h-5 bg-white/10 mx-1.5" />
            <Link href="/v2/profile" className="hidden sm:flex items-center gap-2 rounded-full px-2.5 py-1.5 hover:bg-white/5 transition-colors">
              <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center">
                <User className="w-3.5 h-3.5 text-white/60" />
              </div>
              <span className="text-[12px] font-semibold text-white/80">田中 太郎</span>
            </Link>
            <button className="lg:hidden btn-icon text-white/60" onClick={() => setOpen(!open)}>
              {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {open && (
        <div className="lg:hidden border-t border-white/[0.06] bg-black-900/95 backdrop-blur-xl animate-in">
          <nav className="p-2 space-y-0.5">
            {nav.map((item) => {
              const active = path.startsWith(item.href);
              return (
                <Link key={item.href} href={item.href} onClick={() => setOpen(false)}
                  className={`flex items-center gap-3 rounded-md px-4 py-3 text-[13px] font-medium ${
                    active ? "text-white bg-white/10" : "text-white/50 hover:text-white hover:bg-white/5"
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
