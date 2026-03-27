"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard, Building2, MessageSquare, Calendar,
  UserCircle, Megaphone, ChevronRight, Gift,
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
      { label: "スポンサー企業様", href: "/#sponsors" },
      { label: "成功事例", href: "/#cases-pickup" },
      { label: "いま注目の相談", href: "/#hot-consultations" },
      { label: "近日のイベント", href: "/#upcoming-events" },
      { label: "お知らせ", href: "/#news" },
    ],
  },
  {
    name: "スポンサー一覧", href: "/companies", icon: Building2,
    sections: [
      { label: "レブナイズ35", href: "/companies" },
      { label: "オフィシャルスポンサー", href: "/companies" },
      { label: "インタビュー記事", href: "/companies" },
    ],
  },
  {
    name: "レブナイズ情報", href: "/news", icon: Megaphone,
    sections: [
      { label: "X投稿（ブースター）", href: "/news" },
      { label: "成功事例", href: "/cases" },
      { label: "コラム", href: "/news" },
    ],
  },
  {
    name: "限定プラン", href: "/benefits", icon: Gift,
    sections: [
      { label: "スポンサー限定プラン一覧", href: "/benefits" },
    ],
  },
  {
    name: "イベント", href: "/events", icon: Calendar, badge: 2,
    sections: [
      { label: "懇親会・OFF会", href: "/events" },
      { label: "ホームゲーム", href: "/events" },
    ],
  },
  {
    name: "掲示板", href: "/board", icon: MessageSquare, badge: 4,
    sections: [
      { label: "新着投稿", href: "/board" },
      { label: "紹介の呼びかけ", href: "/board" },
    ],
  },
];

const subItems: NavItem[] = [
  {
    name: "友達紹介", href: "/referral", icon: UserCircle,
    sections: [
      { label: "紹介フォーム", href: "/referral" },
    ],
  },
  {
    name: "プロフィール", href: "/profile", icon: UserCircle,
    sections: [
      { label: "基本情報", href: "/profile" },
      { label: "企業紹介", href: "/profile" },
    ],
  },
];

function NavLink({ item, path }: { item: NavItem; path: string }) {
  const active = item.href === "/" ? path === "/" : path.startsWith(item.href);
  const [open, setOpen] = useState(false);
  const hasSections = item.sections && item.sections.length > 0;
  const router = useRouter();

  const handleSectionClick = (href: string) => {
    const hasAnchor = href.includes("#");
    if (!hasAnchor) {
      router.push(href);
      return;
    }

    const [pagePath, anchor] = href.split("#");
    const isCurrentPage = pagePath === "" || pagePath === path;

    if (isCurrentPage) {
      const el = document.getElementById(anchor);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      router.push(href);
    }
  };

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
            {item.sections!.map((sec) => (
              <button
                key={sec.label}
                type="button"
                onClick={() => handleSectionClick(sec.href || item.href)}
                className="block w-full text-left px-2 py-1.5 text-[11px] text-black-400 hover:text-white hover:bg-white/10 rounded transition-colors leading-snug cursor-pointer"
              >
                {sec.label}
              </button>
            ))}
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

    </aside>
  );
}
