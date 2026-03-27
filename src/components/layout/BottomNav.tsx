"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, Building2, Megaphone, Calendar,
  MoreHorizontal, Gift, UserCircle, MessageSquare, User, X,
} from "lucide-react";

const mainItems = [
  { name: "ホーム", href: "/", icon: LayoutDashboard },
  { name: "スポンサー", href: "/companies", icon: Building2 },
  { name: "情報", href: "/news", icon: Megaphone },
  { name: "イベント", href: "/events", icon: Calendar },
];

const moreItems = [
  { name: "掲示板", href: "/board", icon: MessageSquare },
  { name: "限定プラン", href: "/benefits", icon: Gift },
  { name: "友達紹介", href: "/referral", icon: UserCircle },
  { name: "プロフィール", href: "/profile", icon: User },
];

export default function BottomNav() {
  const path = usePathname();
  const [moreOpen, setMoreOpen] = useState(false);

  const isMoreActive = moreItems.some((item) => path.startsWith(item.href));

  return (
    <>
      {/* その他メニューのオーバーレイ */}
      {moreOpen && (
        <div className="fixed inset-0 z-50 xl:hidden" onClick={() => setMoreOpen(false)}>
          <div className="absolute inset-0 bg-black/60" />
          <div
            className="absolute bottom-14 right-0 left-0 rounded-t-xl border-t border-line p-4"
            style={{ backgroundColor: "#0a0a0a" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-3 px-1">
              <span className="text-[13px] font-bold text-white/50">その他のメニュー</span>
              <button onClick={() => setMoreOpen(false)} className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10 cursor-pointer">
                <X className="w-4 h-4 text-white" />
              </button>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {moreItems.map((item) => {
                const Icon = item.icon;
                const active = path.startsWith(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMoreOpen(false)}
                    className={`flex flex-col items-center gap-1.5 py-3 rounded-xl transition-colors ${
                      active ? "bg-white/10 text-white" : "text-white/50 hover:bg-white/5"
                    }`}
                  >
                    <Icon className="w-6 h-6" style={active ? { color: "#C8102E" } : {}} />
                    <span className="text-[11px] font-bold">{item.name}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ボトムナビ */}
      <nav
        className="fixed bottom-0 left-0 right-0 z-50 xl:hidden border-t border-line"
        style={{ backgroundColor: "#0a0a0a" }}
      >
        <div className="flex items-center justify-around h-14">
          {mainItems.map((item) => {
            const Icon = item.icon;
            const active = item.href === "/" ? path === "/" : path.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-col items-center justify-center gap-0.5 flex-1 h-full transition-colors ${
                  active ? "text-white" : "text-white/40"
                }`}
              >
                <Icon className="w-5 h-5" style={active ? { color: "#C8102E" } : {}} />
                <span className="text-[10px] font-bold">{item.name}</span>
              </Link>
            );
          })}
          {/* その他ボタン */}
          <button
            onClick={() => setMoreOpen(!moreOpen)}
            className={`flex flex-col items-center justify-center gap-0.5 flex-1 h-full transition-colors cursor-pointer ${
              isMoreActive || moreOpen ? "text-white" : "text-white/40"
            }`}
          >
            <MoreHorizontal className="w-5 h-5" style={isMoreActive ? { color: "#C8102E" } : {}} />
            <span className="text-[10px] font-bold">その他</span>
          </button>
        </div>
      </nav>
    </>
  );
}
