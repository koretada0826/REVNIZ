import Link from "next/link";
import { Instagram, Twitter, Youtube } from "lucide-react";

const links = [
  { label: "ダッシュボード", href: "/" },
  { label: "スポンサー一覧", href: "/companies" },
  { label: "掲示板", href: "/board" },
  { label: "イベント", href: "/events" },
  { label: "成功事例", href: "/cases" },
  { label: "お知らせ", href: "/news" },
  { label: "特典", href: "/benefits" },
  { label: "プロフィール", href: "/profile" },
];

export default function Footer() {
  return (
    <footer className="mt-12" style={{ backgroundColor: "#0a0a0a" }}>
      <div className="h-[3px]" style={{ background: "linear-gradient(90deg, #C8102E 0%, #C8102E 70%, #dfb664 100%)" }} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">

        {/* Top row: brand + nav + sns */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
          {/* Brand */}
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-md flex items-center justify-center" style={{ backgroundColor: "#C8102E" }}>
              <span className="text-white font-black text-[9px] tracking-[0.15em]">SC</span>
            </div>
            <div className="leading-none">
              <span className="text-[14px] font-bold text-white tracking-tight block">Sponsor Connect</span>
              <span className="text-[9px] text-white/30 tracking-[0.15em] uppercase">by REVNIZE</span>
            </div>
          </div>

          {/* SNS */}
          <div className="flex items-center gap-2">
            <a href="https://x.com/kg_rebnise" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-white/8 flex items-center justify-center hover:bg-white/15 transition-colors">
              <Twitter className="w-4 h-4 text-white/60" />
            </a>
            <a href="https://www.instagram.com/rebnise_official/" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-white/8 flex items-center justify-center hover:bg-white/15 transition-colors">
              <Instagram className="w-4 h-4 text-white/60" />
            </a>
            <a href="https://www.youtube.com/@rebnise" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-white/8 flex items-center justify-center hover:bg-white/15 transition-colors">
              <Youtube className="w-4 h-4 text-white/60" />
            </a>
          </div>
        </div>

        {/* Nav links — 1 row */}
        <div className="flex flex-wrap gap-x-5 gap-y-1 mb-4">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="text-[12px] text-white/40 hover:text-white transition-colors">
              {l.label}
            </Link>
          ))}
          <a href="https://www.rebnise.jp/" target="_blank" rel="noopener noreferrer" className="text-[12px] text-white/40 hover:text-white transition-colors">
            公式サイト ↗
          </a>
          <a href="https://sponsor.rebnise.jp/" target="_blank" rel="noopener noreferrer" className="text-[12px] text-white/40 hover:text-white transition-colors">
            スポンサーメニュー ↗
          </a>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/10 pt-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-[11px] text-white/25">&copy; 2026 REVNIZE Inc. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-3">
            <Link href="#" className="text-[11px] text-white/25 hover:text-white/50 transition-colors">利用規約</Link>
            <Link href="#" className="text-[11px] text-white/25 hover:text-white/50 transition-colors">プライバシーポリシー</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
