import Link from "next/link";
import { Instagram, Twitter, Youtube } from "lucide-react";

const navLinks = [
  { label: "ダッシュボード", href: "/" },
  { label: "スポンサー企業一覧", href: "/companies" },
  { label: "相談・案件掲示板", href: "/board" },
  { label: "イベント", href: "/events" },
  { label: "成功事例", href: "/cases" },
  { label: "お知らせ", href: "/news" },
  { label: "プロフィール", href: "/profile" },
];

const supportLinks = [
  { label: "利用規約", href: "#" },
  { label: "プライバシーポリシー", href: "#" },
  { label: "お問い合わせ", href: "#" },
  { label: "よくある質問", href: "#" },
];

const clubLinks = [
  { label: "鹿児島レブナイズ 公式サイト", href: "https://www.rebnise.jp/" },
  { label: "スポンサーメニュー", href: "https://sponsor.rebnise.jp/" },
  { label: "B.LEAGUE 公式サイト", href: "https://www.bleague.jp/" },
];

export default function Footer() {
  return (
    <footer className="border-t border-line mt-16" style={{ backgroundColor: "#111" }}>
      <div className="max-w-7xl mx-auto px-5 lg:px-8">

        {/* メインフッター */}
        <div className="py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* ブランド */}
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-10 h-10 rounded-md flex items-center justify-center" style={{ backgroundColor: "#dfb664" }}>
                <span className="text-black font-black text-[11px] tracking-[0.15em]">SC</span>
              </div>
              <div>
                <span className="text-[17px] font-extrabold text-white tracking-tight block">Sponsor Connect</span>
                <span className="text-[10px] text-black-400 tracking-[0.2em] uppercase font-bold">by REVNIZE</span>
              </div>
            </div>
            <p className="text-[15px] text-black-300 font-bold leading-relaxed mb-5">
              レブナイズスポンサー企業同士の接点を設計・促進・可視化するビジネスインフラ。
            </p>
            {/* SNS */}
            <div className="flex items-center gap-3">
              <a href="https://x.com/rebnise" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                <Twitter className="w-5 h-5 text-white" />
              </a>
              <a href="https://www.instagram.com/rebnise_official/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                <Instagram className="w-5 h-5 text-white" />
              </a>
              <a href="https://www.youtube.com/@rebnise" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                <Youtube className="w-5 h-5 text-white" />
              </a>
            </div>
          </div>

          {/* サービス */}
          <div>
            <span className="text-[13px] font-extrabold text-white tracking-[0.12em] uppercase block mb-4">サービス</span>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-[15px] font-bold text-black-300 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* サポート */}
          <div>
            <span className="text-[13px] font-extrabold text-white tracking-[0.12em] uppercase block mb-4">サポート</span>
            <ul className="space-y-3">
              {supportLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-[15px] font-bold text-black-300 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* クラブ関連 */}
          <div>
            <span className="text-[13px] font-extrabold text-white tracking-[0.12em] uppercase block mb-4">鹿児島レブナイズ</span>
            <ul className="space-y-3">
              {clubLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href} target="_blank" rel="noopener noreferrer" className="text-[15px] font-bold text-black-300 hover:text-white transition-colors">
                    {link.label} ↗
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-6 p-4 rounded-lg bg-white/5 border border-line">
              <p className="text-[12px] text-black-400 font-extrabold uppercase tracking-wider mb-1">2025-26 Season</p>
              <p className="text-[16px] text-white font-extrabold">B.LEAGUE B1</p>
              <p className="text-[14px] text-black-300 font-bold mt-1">西原商会アリーナ</p>
            </div>
          </div>
        </div>

        {/* ボトムバー */}
        <div className="border-t border-line py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[13px] text-black-400 font-bold">&copy; 2026 REVNIZE Inc. All rights reserved.</p>
          <div className="flex items-center gap-5">
            <Link href="#" className="text-[13px] text-black-400 font-bold hover:text-white transition-colors">利用規約</Link>
            <Link href="#" className="text-[13px] text-black-400 font-bold hover:text-white transition-colors">プライバシーポリシー</Link>
            <Link href="#" className="text-[13px] text-black-400 font-bold hover:text-white transition-colors">特定商取引法に基づく表記</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
