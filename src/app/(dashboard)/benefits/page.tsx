import FadeIn from "@/components/motion/FadeIn";

const tiers = [
  {
    id: "ticket-p",
    name: "チケットP",
    color: "#333",
    textColor: "#fff",
    prices: "A ¥120,000 / B ¥240,000 / C ¥360,000",
    priceNote: "※1",
    benefits: [
      { name: "チームロゴ使用権", included: true },
      { name: "スポンサー呼称権", included: true },
      { name: "HP法人名記載", included: true },
      { name: "試合会場看板掲出", included: false },
      { name: "パートナー通信", included: true },
      { name: "ご優待券", included: true, note: "※2" },
    ],
  },
  {
    id: "light",
    name: "ライト",
    color: "#555",
    textColor: "#fff",
    prices: "¥600,000",
    priceNote: "",
    benefits: [
      { name: "チームロゴ使用権", included: true },
      { name: "スポンサー呼称権", included: true },
      { name: "HP法人名記載", included: true },
      { name: "試合会場看板掲出", included: false },
      { name: "パートナー通信", included: true },
      { name: "ご優待券", included: true },
    ],
  },
  {
    id: "standard",
    name: "スタンダード",
    color: "#8B0000",
    textColor: "#fff",
    prices: "¥1,200,000",
    priceNote: "",
    benefits: [
      { name: "チームロゴ使用権", included: true },
      { name: "スポンサー呼称権", included: true },
      { name: "HP法人名記載", included: true },
      { name: "試合会場看板掲出", included: true },
      { name: "パートナー通信", included: true },
      { name: "ご優待券", included: true },
    ],
  },
  {
    id: "bronze",
    name: "ブロンズ",
    color: "#8B4513",
    textColor: "#fff",
    prices: "¥2,400,000",
    priceNote: "",
    benefits: [
      { name: "チームロゴ使用権", included: true },
      { name: "スポンサー呼称権", included: true },
      { name: "HP法人名記載", included: true },
      { name: "試合会場看板掲出", included: true },
      { name: "パートナー通信", included: true },
      { name: "ご優待券", included: true },
    ],
  },
  {
    id: "silver",
    name: "シルバー",
    color: "linear-gradient(135deg, #999 0%, #ccc 50%, #999 100%)",
    textColor: "#000",
    prices: "¥3,600,000",
    priceNote: "",
    benefits: [
      { name: "チームロゴ使用権", included: true },
      { name: "スポンサー呼称権", included: true },
      { name: "HP法人名記載", included: true },
      { name: "試合会場看板掲出", included: true },
      { name: "パートナー通信", included: true },
      { name: "ご優待券", included: true },
    ],
  },
];

const benefitIcons = ["🏀", "🤝", "🌐", "📋", "📰", "🎟️"];

const benefitDetails = [
  { name: "チームロゴ使用権" },
  { name: "スポンサー呼称権" },
  { name: "HP法人名記載" },
  { name: "試合会場看板掲出" },
  { name: "パートナー通信" },
  { name: "ご優待券" },
];

export default function BenefitsPage() {
  return (
    <div className="space-y-16">
      {/* Header */}
      <FadeIn>
        <div className="text-center py-8">
          <h1 className="inline-block">
            <span
              className="text-[2.5rem] sm:text-[3.5rem] font-black italic tracking-tight text-white"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              SPONSORSHIP
            </span>
            <span className="text-[1.2rem] sm:text-[1.5rem] font-bold text-white/80 ml-4">
              スポンサー金額
            </span>
          </h1>
        </div>
      </FadeIn>

      {/* All Plans - stacked vertically */}
      {tiers.map((tier, idx) => (
        <FadeIn key={tier.id} delay={idx * 0.08}>
          <section>
            {/* Tier Header Bar */}
            <div
              className="flex items-center justify-center py-4 rounded-t-md"
              style={{
                background: tier.color,
                color: tier.textColor,
              }}
            >
              <span className="text-[20px] sm:text-[24px] font-bold tracking-wide">
                {tier.name}
              </span>
            </div>

            {/* Price */}
            <div className="text-center py-6 border-x border-line" style={{ background: '#111' }}>
              <p className="text-white">
                <span
                  className="text-[1.6rem] sm:text-[2rem] font-black italic mr-3"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  {tier.name}
                </span>
                <span className="text-[1.3rem] sm:text-[1.8rem] font-bold tracking-wide">
                  {tier.prices}
                </span>
                {tier.priceNote && (
                  <span className="text-red-400 text-[0.9rem] ml-1">{tier.priceNote}</span>
                )}
              </p>
            </div>

            {/* Dashed separator */}
            <div className="border-t-2 border-dashed border-black-400 border-x border-line" style={{ background: '#111' }} />

            {/* Benefits Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 p-6 border-x border-b border-line rounded-b-md" style={{ background: '#111' }}>
              {benefitDetails.map((b, i) => {
                const isIncluded = tier.benefits[i]?.included;
                const note = tier.benefits[i]?.note;
                return (
                  <div
                    key={b.name}
                    className="flex flex-col items-center text-center"
                    style={{ opacity: isIncluded ? 1 : 0.25 }}
                  >
                    <div className="w-full aspect-[4/3] bg-white rounded-sm overflow-hidden mb-3 flex items-center justify-center">
                      <span className="text-[32px] text-gray-400">
                        {benefitIcons[i]}
                      </span>
                    </div>
                    <p className="text-white text-[13px] font-bold">
                      {b.name}
                      {note && <span className="text-red-400 ml-0.5">{note}</span>}
                    </p>
                  </div>
                );
              })}
            </div>
          </section>
        </FadeIn>
      ))}

      {/* Notes */}
      <FadeIn>
        <div className="max-w-5xl mx-auto text-[12px] text-black-400 leading-relaxed space-y-1 px-4">
          <p>※1 チケットP「C」には「tip off パーティー」「シーズン報告会」にご参加いただけます。</p>
          <p>※2 チケットパートナーのご優待券は「A」チケット15枚、「B」30枚、「C」45枚ご利用可能です。</p>
        </div>
      </FadeIn>

      {/* Comparison Table */}
      <FadeIn>
        <div className="max-w-5xl mx-auto">
          <h2 className="h2 text-center mb-8">プラン比較</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-[13px]">
              <thead>
                <tr>
                  <th className="text-left py-3 px-4 text-black-400 font-bold border-b border-line">特典</th>
                  {tiers.map((t) => (
                    <th
                      key={t.id}
                      className="py-3 px-3 text-center font-bold border-b border-line"
                      style={{ color: t.textColor === "#000" ? "#ccc" : "#fff" }}
                    >
                      {t.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-line">
                  <td className="py-3 px-4 text-white font-medium">年間金額</td>
                  {tiers.map((t) => (
                    <td key={t.id} className="py-3 px-3 text-center text-white/80 text-[12px]">
                      {t.prices}
                    </td>
                  ))}
                </tr>
                {benefitDetails.map((b, i) => (
                  <tr key={b.name} className="border-b border-line">
                    <td className="py-3 px-4 text-white font-medium">{b.name}</td>
                    {tiers.map((t) => (
                      <td key={t.id} className="py-3 px-3 text-center">
                        {t.benefits[i]?.included ? (
                          <span className="text-emerald-400 text-[16px]">●</span>
                        ) : (
                          <span className="text-black-500">—</span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </FadeIn>
    </div>
  );
}
