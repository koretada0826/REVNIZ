"use client";

import { useState } from "react";
import FadeIn from "@/components/motion/FadeIn";

/* ────────────────────────────────────────
   Benefit image cards (shared across tiers)
   Row 1 — common 6 items
   ──────────────────────────────────────── */
const row1 = [
  { img: "/images/benefits/team-logo.jpg",    label: "チームロゴ使用権" },
  { img: "/images/benefits/naming-rights.jpg", label: "スポンサー呼称権" },
  { img: "/images/benefits/hp-listing.jpg",    label: "HP法人名記載" },
  { img: "/images/benefits/venue-signage.jpg", label: "試合会場看板掲出" },
  { img: "/images/benefits/partner-news.jpg",  label: "パートナー通信" },
  { img: "/images/benefits/ticket.jpg",        label: "ご優待券" },
];

/* Row 2 — additional benefits for スタンダード以上 */
const row2 = [
  { img: "/images/benefits/naming-rights.jpg", label: "Tip off パーティー" },
  { img: "/images/benefits/naming-rights.jpg", label: "シーズン報告会" },
  { img: "/images/benefits/venue-signage.jpg", label: "会場バナーフラッグ掲出" },
  { img: null as string | null,                label: "山崎主催飲み会参加券＋顧問権",
    text: { line1: "鹿児島レブナイズオーナー企業", line2: "株式会社Wiz", line3: "代表取締役CEO　山崎 俊" } },
];

/* Text-only extra benefits for シルバー */
const silverExtras = [
  ["ホームゲームチラシ配布", "コートサイド広告看板掲出"],
  ["地元放送局 / TVCM※2", "SNSコラボ（年1回）"],
  ["冠大会開催会場（1試合）", "ウェア広告 / 企業ロゴ"],
  ["冠大会時配布物※3"],
];

/* ────────────────────────────────────────
   Tier definitions
   ──────────────────────────────────────── */
interface Tier {
  id: string;
  name: string;
  tabBg: string;
  tabText: string;
  headerBg: string;
  price: string;
  ticketNote: string;
  row1Included: boolean[];
  hasRow2: boolean;
  hasSilverExtras: boolean;
  notes: string[];
}

const tiers: Tier[] = [
  {
    id: "ticket-p",
    name: "チケットP",
    tabBg: "#333",
    tabText: "#fff",
    headerBg: "#3D5A80",
    price: "A ¥120,000 / B ¥240,000 / C ¥360,000※1",
    ticketNote: "※2",
    row1Included: [true, true, true, false, true, true],
    hasRow2: false,
    hasSilverExtras: false,
    notes: [
      "※1 チケットP「C」には「tip off パーティー」「シーズン報告会」にご参加いただけます。",
      "※2 チケットパートナーのご優待券は「A」チケット15枚、「B」30枚、「C」45枚ご利用可能です。",
    ],
  },
  {
    id: "light",
    name: "ライト",
    tabBg: "#3D5A80",
    tabText: "#fff",
    headerBg: "#3D5A80",
    price: "¥600,000",
    ticketNote: "",
    row1Included: [true, true, true, false, true, true],
    hasRow2: false,
    hasSilverExtras: false,
    notes: [],
  },
  {
    id: "standard",
    name: "スタンダード",
    tabBg: "#8B0000",
    tabText: "#fff",
    headerBg: "#8B0000",
    price: "¥1,200,000",
    ticketNote: "(1F 20枚)※1",
    row1Included: [true, true, true, true, true, true],
    hasRow2: true,
    hasSilverExtras: false,
    notes: [
      "※1 プラン内容はカスタマイズできるので、枚数増減、もしくは別の特典に変更できます",
    ],
  },
  {
    id: "bronze",
    name: "ブロンズ",
    tabBg: "linear-gradient(135deg, #8B4513 0%, #CD7F32 50%, #8B4513 100%)",
    tabText: "#fff",
    headerBg: "linear-gradient(135deg, #8B4513 0%, #CD7F32 50%, #8B4513 100%)",
    price: "¥3,000,000",
    ticketNote: "(1F 50枚)※1",
    row1Included: [true, true, true, true, true, true],
    hasRow2: true,
    hasSilverExtras: false,
    notes: [
      "※1 プラン内容はカスタマイズできるので、枚数増減、もしくは別の特典に変更できます",
    ],
  },
  {
    id: "silver",
    name: "シルバー",
    tabBg: "linear-gradient(135deg, #888 0%, #ccc 50%, #888 100%)",
    tabText: "#000",
    headerBg: "linear-gradient(135deg, #888 0%, #ccc 50%, #888 100%)",
    price: "¥5,000,000",
    ticketNote: "(1F 50枚)※1",
    row1Included: [true, true, true, true, true, true],
    hasRow2: true,
    hasSilverExtras: true,
    notes: [
      "※1 プラン内容はカスタマイズできるので、枚数増減、もしくは別の特典に変更できます",
      "※2※3 内容はご相談ください",
    ],
  },
];

/* ────────────────────────────────────────
   Benefit card component
   ──────────────────────────────────────── */
function BenefitCard({
  img,
  label,
  included = true,
  text,
}: {
  img: string | null;
  label: string;
  included?: boolean;
  text?: { line1: string; line2: string; line3: string };
}) {
  return (
    <div style={{ opacity: included ? 1 : 0.2 }}>
      <div
        className="aspect-[4/3] overflow-hidden"
        style={{ background: text ? "#f5f5f5" : "#222", border: "1px solid #444" }}
      >
        {text ? (
          <div className="w-full h-full flex flex-col items-center justify-center px-2 text-center">
            <p className="text-[10px] text-gray-500 mb-1">{text.line1}</p>
            <p className="text-[18px] font-black text-black leading-tight">{text.line2}</p>
            <p className="text-[11px] text-gray-600 mt-1">{text.line3}</p>
          </div>
        ) : img ? (
          <img src={img} alt={label} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-white/30 text-[11px]">NO IMAGE</span>
          </div>
        )}
      </div>
      <div
        className="text-center py-2 text-[12px] sm:text-[13px] font-bold text-white"
        style={{ background: "#333" }}
      >
        {label}
      </div>
    </div>
  );
}

/* Text-only benefit block */
function TextBenefitCard({ label }: { label: string }) {
  return (
    <div
      className="flex items-center justify-center text-center py-4 px-2 text-[12px] sm:text-[13px] font-bold text-white"
      style={{ background: "#333", border: "1px solid #444", minHeight: "48px" }}
    >
      {label}
    </div>
  );
}

/* ────────────────────────────────────────
   Page
   ──────────────────────────────────────── */
export default function BenefitsPage() {
  const [, setActiveTab] = useState(0);

  return (
    <div className="space-y-0">
      {/* Red accent line */}
      <div className="h-[4px] -mx-4 sm:-mx-6 lg:-mx-8 -mt-8 mb-6 sm:mb-8" style={{ background: "#c00" }} />

      {/* Header — white background like original */}
      <FadeIn>
        <div style={{ background: "#fff", margin: "0 -16px", padding: "24px 16px 20px" }} className="sm:!mx-[-24px] sm:!px-[40px] sm:!py-[40px] sm:!pb-[32px]">
          <h1>
            <span
              className="text-[1.5rem] sm:text-[3.8rem] font-black italic tracking-tight block sm:inline"
              style={{ fontFamily: "'Space Grotesk', 'Noto Sans JP', sans-serif", color: "#000" }}
            >
              SPONSORSHIP
            </span>
            <span className="text-[0.85rem] sm:text-[1.3rem] font-bold sm:ml-4 block sm:inline mt-1 sm:mt-0" style={{ color: "#555" }}>
              スポンサー金額
            </span>
          </h1>
        </div>
      </FadeIn>

      {/* Tab Navigation */}
      <FadeIn delay={0.05}>
        <div className="flex gap-[2px] mb-10">
          {tiers.map((tier, idx) => (
            <button
              key={tier.id}
              type="button"
              onClick={() => {
                setActiveTab(idx);
                const el = document.getElementById(`plan-${tier.id}`);
                if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
              className="flex-1 py-5 text-center font-bold text-[15px] sm:text-[20px] tracking-wide cursor-pointer transition-opacity hover:opacity-90"
              style={{ background: tier.tabBg, color: tier.tabText }}
            >
              {tier.name}
            </button>
          ))}
        </div>
      </FadeIn>

      {/* All Plans */}
      {tiers.map((tier, idx) => {
        const ticketLabel = tier.ticketNote
          ? `ご優待券 ${tier.ticketNote}`
          : "ご優待券";

        return (
          <FadeIn key={tier.id} delay={idx * 0.06}>
            <section
              id={`plan-${tier.id}`}
              className="mb-10 rounded-sm overflow-hidden"
              style={{ background: "#1a1a1a" }}
            >
              {/* Plan Header */}
              <div className="py-8 px-6 text-center" style={{ background: tier.headerBg }}>
                <span
                  className="text-[2rem] sm:text-[2.6rem] font-black italic text-white mr-4"
                  style={{ fontFamily: "'Noto Sans JP', sans-serif" }}
                >
                  {tier.name}
                </span>
                <span
                  className="text-[1.4rem] sm:text-[2rem] font-bold tracking-wide"
                  style={{ color: tier.tabText }}
                >
                  {tier.price}
                </span>
              </div>

              {/* Dashed separator */}
              <div className="mx-6 sm:mx-12 border-t-[3px] border-dashed" style={{ borderColor: "#555" }} />

              {/* Row 1 — common benefits */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 px-6 sm:px-12 py-8">
                {row1.map((b, i) => {
                  const isTicket = i === 5;
                  return (
                    <BenefitCard
                      key={b.label}
                      img={b.img}
                      label={isTicket ? ticketLabel : b.label}
                      included={tier.row1Included[i]}
                    />
                  );
                })}
              </div>

              {/* Row 2 — additional benefits (スタンダード以上) */}
              {tier.hasRow2 && (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 px-6 sm:px-12 pb-4">
                  {row2.map((b) => (
                    <BenefitCard
                      key={b.label}
                      img={b.img}
                      label={b.label}
                      text={b.text}
                    />
                  ))}
                </div>
              )}

              {/* Silver extras — text-only benefit blocks */}
              {tier.hasSilverExtras && (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 px-6 sm:px-12 pb-4">
                  {silverExtras.flat().map((label) => (
                    <TextBenefitCard key={label} label={label} />
                  ))}
                </div>
              )}

              {/* Notes */}
              {tier.notes.length > 0 && (
                <div className="px-6 sm:px-12 pb-8 space-y-1">
                  {tier.notes.map((note) => (
                    <p key={note} className="text-[12px] font-medium" style={{ color: "#c00" }}>
                      {note}
                    </p>
                  ))}
                </div>
              )}
            </section>
          </FadeIn>
        );
      })}
    </div>
  );
}
