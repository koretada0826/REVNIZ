import Link from "next/link";

export default function FooterFL() {
  return (
    <footer className="border-t border-line bg-white mt-16">
      <div className="max-w-7xl mx-auto px-5 lg:px-8 py-10">
        <div className="flex flex-col sm:flex-row items-start justify-between gap-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-6 h-6 bg-cyan-500 rounded-sm flex items-center justify-center">
                <span className="text-white font-bold text-[7px]">FL</span>
              </div>
              <span className="text-[13px] font-bold text-black-900 tracking-tight">Fan Lab</span>
            </div>
            <p className="text-[11px] text-black-300 max-w-[280px] leading-relaxed">
              レブナイズのファン・会場・コミュニティ接点を活用した、スポンサー向け実証実験プラットフォーム。
            </p>
          </div>
          <div className="flex gap-12 text-[12px]">
            <div className="space-y-2">
              {[{ l: "実証メニュー", h: "/fanlab/menus" }, { l: "募集中企画", h: "/fanlab/experiments" }, { l: "レポート", h: "/fanlab/reports" }].map((x) => (
                <Link key={x.h} href={x.h} className="block text-black-400 hover:text-black-900 transition-colors">{x.l}</Link>
              ))}
            </div>
            <div className="space-y-2">
              {["利用規約", "プライバシーポリシー", "実施時の注意事項", "お問い合わせ"].map((l) => (
                <Link key={l} href="#" className="block text-black-400 hover:text-black-900 transition-colors">{l}</Link>
              ))}
            </div>
          </div>
        </div>
        <div className="h-px bg-line mt-8 mb-4" />
        <p className="text-[11px] text-black-200">&copy; 2026 REVNIZE Inc. Fan Lab</p>
      </div>
    </footer>
  );
}
