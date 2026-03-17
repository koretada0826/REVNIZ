import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-line bg-white mt-16">
      <div className="max-w-7xl mx-auto px-5 lg:px-8 py-10">
        <div className="flex flex-col sm:flex-row items-start justify-between gap-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 bg-black-900 rounded-md flex items-center justify-center">
                <span className="text-white font-bold text-[7px] tracking-[0.15em]">SC</span>
              </div>
              <span className="text-[13px] font-bold text-black-900 tracking-tight">Sponsor Connect</span>
            </div>
            <p className="text-[11px] text-black-300 max-w-[280px] leading-relaxed">
              レブナイズスポンサー企業同士の接点を設計・促進・可視化するビジネスインフラ。
            </p>
          </div>
          <div className="flex gap-12 text-[12px]">
            <div className="space-y-2.5">
              <span className="text-[9px] font-bold text-black-300 tracking-[0.15em] uppercase block mb-1">サービス</span>
              {[{ l: "企業一覧", h: "/companies" }, { l: "掲示板", h: "/board" }, { l: "イベント", h: "/events" }].map((x) => (
                <Link key={x.h} href={x.h} className="block text-black-400 hover:text-black-900 transition-colors">{x.l}</Link>
              ))}
            </div>
            <div className="space-y-2.5">
              <span className="text-[9px] font-bold text-black-300 tracking-[0.15em] uppercase block mb-1">サポート</span>
              {["利用規約", "プライバシーポリシー", "お問い合わせ"].map((l) => (
                <Link key={l} href="#" className="block text-black-400 hover:text-black-900 transition-colors">{l}</Link>
              ))}
            </div>
          </div>
        </div>
        <div className="divider mt-8 mb-4" />
        <p className="text-[11px] text-black-200">&copy; 2026 REVNIZE Inc.</p>
      </div>
    </footer>
  );
}
