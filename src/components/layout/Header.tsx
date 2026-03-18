"use client";

import Link from "next/link";
import { Bell, User, Search } from "lucide-react";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-black-900 border-b border-line">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-3 shrink-0">
            <div className="w-9 h-9 bg-black-900 rounded-md flex items-center justify-center">
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
          </div>
        </div>
      </div>

    </header>
  );
}
