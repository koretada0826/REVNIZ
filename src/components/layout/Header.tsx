"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Bell, User, Menu, X,
  LayoutDashboard, Building2, MessageSquare, Calendar, Gift,
  Megaphone, UserCircle,
} from "lucide-react";
import { notifications } from "@/data/mock";

const navItems = [
  { name: "ダッシュボード", href: "/", icon: LayoutDashboard },
  { name: "スポンサー一覧", href: "/companies", icon: Building2 },
  { name: "レブナイズ情報", href: "/news", icon: Megaphone },
  { name: "限定プラン", href: "/benefits", icon: Gift },
  { name: "イベント", href: "/events", icon: Calendar, badge: 2 },
  { name: "掲示板", href: "/board", icon: MessageSquare, badge: 4 },
  { name: "友達紹介", href: "/referral", icon: UserCircle },
  { name: "プロフィール", href: "/profile", icon: UserCircle },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [bellOpen, setBellOpen] = useState(false);
  const bellRef = useRef<HTMLDivElement>(null);
  const path = usePathname();

  const unreadCount = notifications.filter((n) => !n.read).length;

  // 外側クリックで閉じる
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (bellRef.current && !bellRef.current.contains(e.target as Node)) {
        setBellOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

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
              {/* ベル — 通知ドロップダウン */}
              <div ref={bellRef} className="relative">
                <button
                  className="btn-icon relative"
                  onClick={() => setBellOpen(!bellOpen)}
                >
                  <Bell className="w-[18px] h-[18px]" />
                  {unreadCount > 0 && (
                    <span className="absolute top-1 right-1 min-w-[16px] h-[16px] bg-red rounded-full ring-2 ring-black-900 flex items-center justify-center">
                      <span className="text-[9px] font-bold text-white">{unreadCount}</span>
                    </span>
                  )}
                </button>

                {bellOpen && (
                  <div
                    className="absolute right-0 top-full mt-2 w-[360px] rounded-xl border border-line shadow-2xl overflow-hidden z-50"
                    style={{ backgroundColor: "#1a1a1a" }}
                  >
                    {/* ヘッダー */}
                    <div className="flex items-center justify-between px-4 py-3 border-b border-line">
                      <span className="text-[15px] font-bold text-white">通知</span>
                      {unreadCount > 0 && (
                        <span className="text-[12px] font-bold px-2 py-0.5 rounded-full" style={{ backgroundColor: "rgba(200,16,46,0.15)", color: "#E63350" }}>
                          {unreadCount}件の未読
                        </span>
                      )}
                    </div>

                    {/* 通知リスト */}
                    <div className="max-h-[400px] overflow-y-auto" style={{ scrollbarWidth: "thin" }}>
                      {notifications.slice(0, 8).map((n) => {
                        const isReaction = n.type === "reaction";
                        const isMessage = n.type === "message";
                        const isSystem = n.type === "system";
                        const href = n.consultationId ? `/board/${n.consultationId}` : "/news";
                        return (
                          <Link
                            key={n.id}
                            href={href}
                            onClick={() => setBellOpen(false)}
                            className={`flex items-start gap-3 px-4 py-3 transition-colors hover:bg-white/5 border-b border-line/50 ${!n.read ? "bg-white/[0.03]" : ""}`}
                          >
                            {/* アイコン */}
                            <span
                              className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                              style={{
                                backgroundColor: isReaction ? "rgba(223,182,100,0.15)" : isMessage ? "rgba(200,16,46,0.15)" : "rgba(255,255,255,0.1)",
                              }}
                            >
                              {isReaction && <MessageSquare className="w-3.5 h-3.5" style={{ color: "#dfb664" }} />}
                              {isMessage && <MessageSquare className="w-3.5 h-3.5" style={{ color: "#E63350" }} />}
                              {isSystem && <Bell className="w-3.5 h-3.5 text-black-400" />}
                            </span>

                            {/* コンテンツ */}
                            <span className="flex-1 min-w-0 block">
                              <span className="flex items-center gap-1.5 mb-0.5">
                                <span className="text-[13px] font-bold text-white">{n.fromCompanyName}</span>
                                {!n.read && <span className="w-1.5 h-1.5 rounded-full bg-red shrink-0" />}
                              </span>
                              <span className="text-[12px] text-black-400 leading-relaxed line-clamp-2 block">
                                {n.message}
                              </span>
                              <span className="text-[11px] text-black-500 mt-1 block">{n.createdAt}</span>
                            </span>
                          </Link>
                        );
                      })}
                    </div>

                    {/* フッター */}
                    <Link
                      href="/news"
                      onClick={() => setBellOpen(false)}
                      className="flex items-center justify-center py-3 text-[13px] font-bold transition-colors hover:bg-white/5"
                      style={{ color: "#dfb664" }}
                    >
                      すべての通知を見る
                    </Link>
                  </div>
                )}
              </div>

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
