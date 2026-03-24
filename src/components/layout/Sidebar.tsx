"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, Building2, MessageSquare, Calendar, Trophy,
  UserCircle, Megaphone, TrendingUp, Mail, ChevronRight, Gift, BarChart3,
} from "lucide-react";

interface SubSection {
  label: string;
  href?: string;
}

interface NavItem {
  name: string;
  href: string;
  icon: typeof LayoutDashboard;
  badge?: number;
  sections?: SubSection[];
}

const mainItems: NavItem[] = [
  {
    name: "ダッシュボード", href: "/", icon: LayoutDashboard,
    sections: [
      { label: "アクティビティ", href: "/#activity" },
      { label: "スポンサー企業様", href: "/#sponsors" },
      { label: "成功事例ピックアップ", href: "/#cases-pickup" },
      { label: "いま注目の相談", href: "/#hot-consultations" },
      { label: "今週の注目イベント", href: "/#weekly-events" },
      { label: "実績", href: "/#results" },
      { label: "新着相談", href: "/#new-consultations" },
      { label: "近日のイベント", href: "/#upcoming-events" },
      { label: "お知らせ", href: "/#news" },
    ],
  },
  {
    name: "アクティビティ", href: "/activity", icon: BarChart3,
    sections: [
      { label: "統計サマリー" },
      { label: "内訳グラフ" },
      { label: "月別推移" },
      { label: "最近のアクティビティ" },
    ],
  },
  {
    name: "スポンサー一覧", href: "/companies", icon: Building2,
    sections: [
      { label: "レブナイズ35" },
      { label: "オフィシャルスポンサー" },
      { label: "ウェアサプライヤー" },
      { label: "アカデミースポンサー" },
      { label: "チケットパートナー" },
    ],
  },
  {
    name: "相談掲示板", href: "/board", icon: MessageSquare, badge: 4,
    sections: [
      { label: "新着相談一覧" },
      { label: "カテゴリ検索" },
    ],
  },
  {
    name: "イベント", href: "/events", icon: Calendar, badge: 2,
    sections: [
      { label: "Next Event" },
      { label: "Upcoming Events" },
    ],
  },
  {
    name: "スポンサー特典", href: "/benefits", icon: Gift,
    sections: [
      { label: "プラン一覧" },
      { label: "プラン比較" },
    ],
  },
];

const subItems: NavItem[] = [
  {
    name: "成功事例", href: "/cases", icon: Trophy,
    sections: [
      { label: "ピックアップ事例" },
      { label: "その他の事例" },
      { label: "あなたの事例を募集" },
    ],
  },
  {
    name: "メッセージ", href: "/messages", icon: Mail, badge: 3,
  },
  {
    name: "お知らせ", href: "/news", icon: Megaphone,
    sections: [
      { label: "通知" },
      { label: "運営からのお知らせ" },
    ],
  },
  {
    name: "プロフィール", href: "/profile", icon: UserCircle,
    sections: [
      { label: "基本情報" },
      { label: "企業紹介" },
      { label: "提供できること" },
      { label: "探していること" },
      { label: "担当者情報" },
    ],
  },
];

function NavLink({ item, path }: { item: NavItem; path: string }) {
  const active = item.href === "/" ? path === "/" : path.startsWith(item.href);
  const [open, setOpen] = useState(false);
  const hasSections = item.sections && item.sections.length > 0;

  return (
    <div
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <Link
        href={item.href}
        className={`flex items-center gap-2.5 rounded-md px-3 py-2.5 text-[13px] font-medium transition-colors group relative ${
          active
            ? "text-white"
            : "text-black-400 hover:text-white hover:bg-white/10"
        }`}
        style={active ? { background: "rgba(200,16,46,0.15)" } : {}}
      >
        {active && (
          <span className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-[60%] rounded-r-full" style={{ background: "#C8102E" }} />
        )}
        <item.icon
          className={`w-[15px] h-[15px] shrink-0 ${
            active ? "" : "group-hover:text-black-600"
          }`}
          style={active ? { color: "#C8102E" } : {}}
        />
        <span className="flex-1">{item.name}</span>
        {item.badge && !active && (
          <span className="min-w-[18px] h-[18px] rounded-full bg-red-50 text-red text-[10px] font-bold flex items-center justify-center">
            {item.badge}
          </span>
        )}
        {hasSections && (
          <ChevronRight
            className={`w-3 h-3 shrink-0 transition-transform duration-200 ${
              open ? "rotate-90 text-white" : "text-black-500"
            }`}
          />
        )}
      </Link>

      {/* Inline section list */}
      {hasSections && (
        <div
          className="overflow-hidden transition-all duration-200 ease-in-out"
          style={{
            maxHeight: open ? `${item.sections!.length * 32 + 8}px` : "0px",
            opacity: open ? 1 : 0,
          }}
        >
          <div className="pl-8 pr-2 py-1 space-y-0.5">
            {item.sections!.map((sec) => {
              const anchor = sec.href?.includes("#") ? sec.href.split("#")[1] : null;
              return anchor ? (
                <button
                  key={sec.label}
                  type="button"
                  onClick={() => {
                    const el = document.getElementById(anchor);
                    if (el) {
                      el.scrollIntoView({ behavior: "smooth", block: "start" });
                    }
                  }}
                  className="block w-full text-left px-2 py-1.5 text-[11px] text-black-400 hover:text-white hover:bg-white/10 rounded transition-colors leading-snug cursor-pointer"
                >
                  {sec.label}
                </button>
              ) : (
                <Link
                  key={sec.label}
                  href={sec.href || item.href}
                  className="block px-2 py-1.5 text-[11px] text-black-400 hover:text-white hover:bg-white/10 rounded transition-colors leading-snug"
                >
                  {sec.label}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default function Sidebar() {
  const path = usePathname();

  return (
    <aside className="hidden xl:flex flex-col w-[230px] border-r border-line bg-black-900 min-h-[calc(100vh-56px)]">
      <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto">
        <div className="px-3 py-2">
          <span className="text-[9px] font-bold text-black-300 tracking-[0.15em] uppercase">
            メインメニュー
          </span>
        </div>
        {mainItems.map((item) => (
          <NavLink key={item.href} item={item} path={path} />
        ))}

        <div className="divider my-3 mx-3" />

        <div className="px-3 py-2">
          <span className="text-[9px] font-bold text-black-300 tracking-[0.15em] uppercase">
            その他
          </span>
        </div>
        {subItems.map((item) => (
          <NavLink key={item.href} item={item} path={path} />
        ))}
      </nav>

      {/* Profile completion */}
      <div className="p-3 border-t border-line">
        <div className="rounded-md bg-white/5 p-4">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-3.5 h-3.5 text-black-400" />
            <span className="text-[10px] font-bold text-black-400 tracking-[0.1em] uppercase">
              プロフィール充足率
            </span>
          </div>
          <div className="flex items-end justify-between mb-2">
            <span className="text-[22px] font-bold text-white leading-none tracking-tight">
              75<span className="text-[13px] text-black-400">%</span>
            </span>
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
