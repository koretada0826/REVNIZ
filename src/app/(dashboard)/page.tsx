"use client";

import Link from "next/link";
import { Building2, MessageSquare, Calendar, ChevronRight, Trophy, Gift, UserPlus, Newspaper } from "lucide-react";
import { companies, consultations, events, newsItems, successCases } from "@/data/mock";
import FadeIn from "@/components/motion/FadeIn";
import StaggerContainer, { StaggerItem } from "@/components/motion/StaggerContainer";
import NBAHero from "@/components/hero/NBAHero";
import RebniseCard from "@/components/cards/RebniseCard";
import InfiniteScroll from "@/components/carousel/InfiniteScroll";
import SponsorOrbit from "@/components/carousel/SponsorOrbit";

/* div→span wrapper for use inside <Link> (avoids hydration error) */
const B = ({ className, style, children }: { className?: string; style?: React.CSSProperties; children?: React.ReactNode }) => (
  <span className={className} style={{ display: "block", ...style }}>{children}</span>
);
const BI = ({ className, style, children }: { className?: string; style?: React.CSSProperties; children?: React.ReactNode }) => (
  <span className={className} style={{ display: "flex", ...style }}>{children}</span>
);

export default function DashboardPage() {
  return (
    <div className="space-y-8 sm:space-y-12">
      {/* Hero */}
      <div className="-mx-4 sm:-mx-6 lg:-mx-8 -mt-8">
        <NBAHero />
      </div>

      {/* ★ スポンサー企業 */}
      <FadeIn delay={0.15}>
        <section id="sponsors">
          <div className="section-header">
            <h2 className="h2">スポンサー企業様</h2>
          </div>
          <div className="flex flex-col items-center">
            <SponsorOrbit />
            <div className="flex gap-3 mt-4">
              <Link href="/companies" className="btn-primary">
                <Building2 className="w-4 h-4 mr-2" /> スポンサー企業一覧を見る
              </Link>
            </div>
          </div>
        </section>
      </FadeIn>

      {/* ★ 成功事例ピックアップ */}
      <FadeIn delay={0.15}>
        <section id="cases-pickup">
          <p className="text-center text-[28px] sm:text-[34px] lg:text-[40px] font-black text-white leading-tight tracking-[0.08em] mb-0">
            今シーズンのスポンサー成功事例
          </p>
          <div className="mt-10 -mx-4 sm:-mx-6 lg:-mx-8">
            <InfiniteScroll interval={2500} cardWidth={332}>
              {successCases.slice(0, 6).map((sc) => (
                <Link key={sc.id} href="/cases" className="group block">
                  <B className="rounded-lg overflow-hidden" style={{ backgroundColor: "#1e1e1e", border: "1px solid #333" }}>
                    <B className="relative overflow-hidden" style={{ height: "180px" }}>
                      <img
                        src={sc.image}
                        alt={sc.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <B className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                      <BI className="absolute bottom-0 left-0 right-0 p-4 items-end justify-between">
                        <BI className="items-center gap-2">
                          <img src={sc.logo} alt={sc.company} className="w-8 h-8 rounded object-cover bg-white border-2 border-white" />
                          <span className="text-[12px] font-bold text-white">{sc.company}</span>
                        </BI>
                        <span className="text-right">
                          <span className="text-[28px] font-black leading-none text-white drop-shadow-lg block">{sc.metric}</span>
                          <span className="text-[10px] font-bold text-white/70 block">{sc.metricLabel}</span>
                        </span>
                      </BI>
                      <span className="absolute top-2 left-2 text-[10px] font-bold text-white px-2 py-0.5 rounded-full" style={{ backgroundColor: "rgba(200,16,46,0.85)" }}>{sc.category}</span>
                    </B>
                    <B className="p-4">
                      <p className="text-[14px] font-bold text-white leading-snug group-hover:text-black-300 transition-colors line-clamp-2">
                        {sc.title}
                      </p>
                      <p className="text-[12px] text-black-500 mt-1">{sc.date}</p>
                    </B>
                  </B>
                </Link>
              ))}
            </InfiniteScroll>
          </div>
          <div className="text-center mt-8">
            <Link href="/cases" className="btn-primary">
              すべての成功事例を見る →
            </Link>
          </div>
        </section>
      </FadeIn>

      {/* ★ 限定プラン ピックアップ */}
      <FadeIn delay={0.1}>
        <section id="limited-plans">
          <div className="section-header">
            <div className="flex items-center gap-2">
              <Gift className="w-5 h-5" style={{ color: "#dfb664" }} />
              <h2 className="h2">スポンサー限定プラン</h2>
            </div>
            <Link href="/benefits" className="text-[14px] font-semibold text-black-400 hover:text-white transition-colors">
              すべて見る →
            </Link>
          </div>
          <div
            className="flex gap-4 overflow-x-auto pb-4 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8"
            style={{ scrollbarWidth: "none" }}
          >
            {[
              { company: "MAYA GROUP", logo: "/images/sponsors/Z135.jpg", title: "天文館飲食店 スポンサー企業様限定", discount: "10%OFF", description: "天文館エリアの全飲食店舗で社員証提示で割引" },
              { company: "城山ホテル鹿児島", logo: "/images/sponsors/N066.jpg", title: "宿泊特別料金プラン", discount: "最大20%OFF", description: "来鹿されるお客様のおもてなしにも最適" },
              { company: "南九州テクノロジーズ", logo: "/images/sponsors/M029.jpg", title: "DX無料診断 & 初期導入費", discount: "50%OFF", description: "業務効率化をお得にスタートできます" },
              { company: "福山黒酢株式会社", logo: "/images/sponsors/N105.jpg", title: "壺造り黒酢ギフトセット", discount: "15%OFF", description: "お中元・お歳暮にぴったりの黒酢ギフト" },
              { company: "アミュプラザ鹿児島", logo: "/images/sponsors/M013.jpg", title: "催事スペース出展料", discount: "30%OFF", description: "商品販売・PR活動の場としてご活用ください" },
              { company: "株式会社メディアサービス", logo: "/images/sponsors/N011.jpg", title: "Web広告・動画制作", discount: "20%OFF", description: "Web広告の運用代行・企業PR動画を限定価格で" },
            ].map((plan, i) => (
              <Link
                key={i}
                href="/benefits"
                className="shrink-0 w-[280px] rounded-lg border border-line overflow-hidden hover:border-line-dark transition-all group"
                style={{ backgroundColor: "#1e1e1e" }}
              >
                <B className="relative h-[120px] overflow-hidden">
                  <img
                    src={plan.logo}
                    alt={plan.company}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <B className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <span className="absolute top-3 right-3">
                    <span
                      className="text-[16px] font-black px-3 py-1.5 rounded-md"
                      style={{ backgroundColor: "#C8102E", color: "#fff" }}
                    >
                      {plan.discount}
                    </span>
                  </span>
                  <span className="absolute bottom-3 left-3 block">
                    <span className="text-[14px] font-bold text-white drop-shadow-md">{plan.company}</span>
                  </span>
                </B>
                <B className="p-4">
                  <p className="text-[15px] font-bold text-white group-hover:text-red transition-colors mb-1">{plan.title}</p>
                  <p className="text-[13px] text-black-400">{plan.description}</p>
                </B>
              </Link>
            ))}
          </div>
        </section>
      </FadeIn>

      {/* ★ 掲示板（注目の相談） */}
      <FadeIn delay={0.1}>
        <section id="hot-consultations">
          <div className="section-header">
            <h2 className="h2">掲示板 — いま注目の投稿</h2>
            <Link href="/board" className="text-[14px] font-semibold text-black-400 hover:text-white transition-colors">
              すべて見る →
            </Link>
          </div>
          <div className="overflow-x-auto -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8" style={{ scrollbarWidth: "none" }}>
            <div className="flex gap-3 sm:gap-4" style={{ minWidth: "max-content" }}>
              {consultations.slice(0, 6).map((p) => {
                const company = companies.find((c) => c.id === p.companyId);
                return (
                  <Link
                    key={p.id}
                    href={`/board/${p.id}`}
                    className="shrink-0 block rounded-lg overflow-hidden border border-line hover:border-line-dark transition-all duration-200 group"
                    style={{ width: "280px", backgroundColor: "#1e1e1e" }}
                  >
                    <BI className="bg-white items-center justify-center" style={{ height: "100px", fontSize: 0, lineHeight: 0 }}>
                      {company ? (
                        <img src={company.logo} alt={company.name} className="max-w-[70%] max-h-[60px] object-contain" />
                      ) : (
                        <span className="text-[24px] font-bold text-black">{p.companyName.charAt(0)}</span>
                      )}
                    </BI>
                    <B className="p-4">
                      <BI className="items-center gap-2 mb-2">
                        <span className="text-[11px] font-bold text-white px-2 py-0.5 rounded-full bg-red">{p.category}</span>
                        <span className="text-[11px] text-black-500 font-medium">{p.companyName}</span>
                      </BI>
                      {p.keywords && p.keywords.length > 0 ? (
                        <BI className="flex-wrap gap-x-2 gap-y-0.5 mb-2">
                          {p.keywords.map((kw, ki) => (
                            <span key={ki} className="text-red text-[16px] font-black">{kw}</span>
                          ))}
                        </BI>
                      ) : (
                        <p className="text-[14px] text-white font-bold leading-snug mb-2 line-clamp-1">{p.title}</p>
                      )}
                      <p className="text-[12px] text-black-400 font-medium leading-relaxed line-clamp-2 mb-3">{p.content}</p>
                      <BI className="items-center justify-between">
                        <span className="text-[14px] font-bold tabular-nums" style={{ color: "#dfb664" }}>{p.responses} 反応</span>
                        <ChevronRight className="w-4 h-4 text-black-500 group-hover:text-white transition-colors" />
                      </BI>
                    </B>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      </FadeIn>

      {/* ★ イベント */}
      <FadeIn delay={0.1}>
        <section id="upcoming-events">
          <div className="section-header">
            <h2 className="h2">近日のイベント</h2>
            <Link href="/events" className="text-[14px] font-semibold text-black-400 hover:text-white transition-colors">
              すべて見る →
            </Link>
          </div>
          <div className="-mx-4 sm:-mx-6 lg:-mx-8">
            <InfiniteScroll interval={3000} cardWidth={260}>
              {events.slice(0, 8).map((ev) => {
                const catColor = ev.category === "懇親会" ? "#dfb664" : ev.category === "OFF会" ? "#A78BFA" : "#C8102E";
                const pct = Math.round((ev.registered / ev.capacity) * 100);
                return (
                  <Link key={ev.id} href="/events" className="block">
                    <RebniseCard
                      href="/events"
                      image={ev.image}
                      title={ev.title}
                      date={ev.date}
                      categories={[
                        ...(pct >= 90 ? [{ label: "残りわずか", color: "red", isNew: true }] : []),
                        { label: ev.category, color: catColor },
                      ]}
                    />
                  </Link>
                );
              })}
            </InfiniteScroll>
          </div>
        </section>
      </FadeIn>

      {/* ★ 友達紹介CTA */}
      <FadeIn delay={0.1}>
        <section
          className="relative overflow-hidden rounded-lg py-20 sm:py-28 px-8 text-center"
          style={{
            border: "1px solid rgba(196,163,90,0.3)",
          }}
        >
          <img
            src="/images/club-rebs-bg.png"
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
            style={{ objectPosition: "center 40%" }}
          />
          <div className="absolute inset-0 bg-black/70" />
          <div className="relative z-10">
            <UserPlus className="w-10 h-10 mx-auto mb-4" style={{ color: "#dfb664" }} />
            <h2 className="text-[30px] sm:text-[40px] font-black text-white leading-tight mb-4">
              スポンサーに興味ありそうな<br className="sm:hidden" />お友達をご紹介ください！
            </h2>
            <p className="text-[18px] sm:text-[20px] text-white/60 leading-relaxed max-w-2xl mx-auto mb-8">
              仲間が増えれば、ビジネスの幅も広がる。<br className="hidden sm:block" />
              「ちょっと興味あるかも」という段階でもOK。運営から丁寧にご案内します。
            </p>
            <Link href="/referral" className="btn-primary px-8 py-3.5 text-[15px]">
              <UserPlus className="w-5 h-5 mr-2" />
              友達を紹介する
            </Link>
          </div>
        </section>
      </FadeIn>

      {/* ★ 地元経済誌コラム */}
      <FadeIn delay={0.1}>
        <section id="columns">
          <div className="section-header">
            <div className="flex items-center gap-2">
              <Newspaper className="w-5 h-5" style={{ color: "#dfb664" }} />
              <h2 className="h2">地元経済誌コラム</h2>
            </div>
            <Link href="/news" className="text-[14px] font-semibold text-black-400 hover:text-white transition-colors">
              すべて見る →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { title: "地方スポーツとビジネスの新しい関係性", publication: "鹿児島経済ジャーナル 2026年3月号", date: "2026-03-01" },
              { title: "鹿児島経済の現在地 — スポンサー企業から見た地域の強み", publication: "鹿児島経済ジャーナル 2026年2月号", date: "2026-02-01" },
              { title: "スポーツで繋がるB2Bネットワーク — 実践レポート", publication: "鹿児島経済ジャーナル 2026年1月号", date: "2026-01-01" },
            ].map((col, i) => (
              <Link
                key={i}
                href="/news"
                className="rounded-lg border border-line p-5 hover:border-line-dark transition-colors group"
                style={{ backgroundColor: "#1e1e1e" }}
              >
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full inline-block mb-3" style={{ backgroundColor: "rgba(223,182,100,0.2)", color: "#dfb664" }}>
                  {col.publication}
                </span>
                <h3 className="text-[16px] font-bold text-white mb-2 group-hover:text-red transition-colors leading-snug">
                  {col.title}
                </h3>
                <span className="text-[12px] text-black-500">{col.date}</span>
              </Link>
            ))}
          </div>
        </section>
      </FadeIn>

      {/* ★ お知らせ */}
      <FadeIn delay={0.1}>
        <section id="news">
          <div className="section-header">
            <h2 className="h2">お知らせ</h2>
            <Link href="/news" className="text-[14px] font-semibold text-black-400 hover:text-white transition-colors">
              すべて見る →
            </Link>
          </div>
          <div className="relative pl-8">
            <span className="absolute left-[11px] top-2 bottom-2 w-[2px] bg-gradient-to-b from-[#dfb664] via-[#dfb664]/60 to-transparent block" />
            <div className="space-y-0">
              {newsItems.slice(0, 4).map((item, i) => (
                <Link
                  key={item.id}
                  href="/news"
                  className="group relative flex items-start gap-4 py-4 hover:bg-white/5 rounded-lg px-3 -ml-3 transition-colors"
                >
                  <span className="absolute left-[-17px] top-[22px] flex items-center justify-center">
                    <span
                      className="w-[10px] h-[10px] rounded-full border-2 transition-colors block"
                      style={{
                        borderColor: '#dfb664',
                        background: i === 0 ? '#dfb664' : '#000',
                      }}
                    />
                  </span>
                  <span className="flex-1 min-w-0 block">
                    <span className="flex items-center gap-2.5 mb-1.5">
                      <span
                        className="text-[12px] font-bold tracking-wider tabular-nums"
                        style={{ color: '#dfb664', fontFamily: "'Space Grotesk', sans-serif" }}
                      >
                        {item.createdAt}
                      </span>
                      <span className="badge-red text-[10px]">{item.category}</span>
                    </span>
                    <span className="text-[14px] font-medium text-white/80 group-hover:text-white transition-colors leading-snug block">
                      {item.title}
                    </span>
                  </span>
                  <ChevronRight className="w-4 h-4 text-black-400 shrink-0 mt-1 group-hover:text-white transition-colors" />
                </Link>
              ))}
            </div>
          </div>
        </section>
      </FadeIn>
    </div>
  );
}
