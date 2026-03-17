import Link from "next/link";

export default function FooterTB() {
  return (
    <footer className="border-t border-line bg-white mt-16">
      <div className="max-w-7xl mx-auto px-5 lg:px-8 py-10">
        <div className="flex flex-col sm:flex-row items-start justify-between gap-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-6 h-6 bg-indigo-500 rounded-sm flex items-center justify-center">
                <span className="text-white font-bold text-[7px]">TB</span>
              </div>
              <span className="text-[13px] font-bold text-black-900 tracking-tight">Tokyo Bridge</span>
            </div>
            <p className="text-[11px] text-black-300 max-w-[300px] leading-relaxed">
              東京オーナー企業との接点を活かし、鹿児島のスポンサー企業に東京の視点・人脈・事業機会をつなぐ会員制連携プラットフォーム。
            </p>
          </div>
          <div className="flex gap-12 text-[12px]">
            <div className="space-y-2">
              {[
                { l: "東京インサイト", h: "/bridge/insights" },
                { l: "東京企業・専門家", h: "/bridge/companies" },
                { l: "イベント", h: "/bridge/events" },
              ].map((x) => (
                <Link key={x.h} href={x.h} className="block text-black-400 hover:text-black-900 transition-colors">{x.l}</Link>
              ))}
            </div>
            <div className="space-y-2">
              {["利用規約", "プライバシーポリシー", "お問い合わせ", "運営会社"].map((l) => (
                <Link key={l} href="#" className="block text-black-400 hover:text-black-900 transition-colors">{l}</Link>
              ))}
            </div>
          </div>
        </div>
        <div className="h-px bg-line mt-8 mb-4" />
        <p className="text-[11px] text-black-200">&copy; 2026 REVNIZE Inc. Tokyo Bridge</p>
      </div>
    </footer>
  );
}
