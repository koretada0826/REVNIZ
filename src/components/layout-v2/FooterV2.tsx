import Link from "next/link";

export default function FooterV2() {
  return (
    <footer className="border-t border-white/[0.06] bg-black-900 mt-16">
      <div className="max-w-7xl mx-auto px-5 lg:px-8 py-10">
        <div className="flex flex-col sm:flex-row items-start justify-between gap-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-6 h-6 bg-red rounded-sm flex items-center justify-center">
                <span className="text-white font-bold text-[7px] tracking-[0.15em]">SC</span>
              </div>
              <span className="text-[13px] font-bold text-white tracking-tight">Sponsor Connect</span>
            </div>
            <p className="text-[11px] text-white/30 max-w-[260px] leading-relaxed">
              レブナイズスポンサー企業同士の接点を設計・促進・可視化するビジネスインフラ。
            </p>
          </div>
          <div className="flex gap-12 text-[12px]">
            <div className="space-y-2">
              {[{ l: "企業一覧", h: "/v2/companies" }, { l: "掲示板", h: "/v2/board" }, { l: "イベント", h: "/v2/events" }].map((x) => (
                <Link key={x.h} href={x.h} className="block text-white/30 hover:text-white transition-colors">{x.l}</Link>
              ))}
            </div>
            <div className="space-y-2">
              {["利用規約", "プライバシーポリシー", "お問い合わせ"].map((l) => (
                <Link key={l} href="#" className="block text-white/30 hover:text-white transition-colors">{l}</Link>
              ))}
            </div>
          </div>
        </div>
        <div className="h-px bg-white/[0.06] mt-8 mb-4" />
        <p className="text-[11px] text-white/20">&copy; 2026 REVNIZE Inc.</p>
      </div>
    </footer>
  );
}
