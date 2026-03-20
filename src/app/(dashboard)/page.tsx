"use client";

import Link from "next/link";
import { Building2, MessageSquare, Calendar, TrendingUp, ChevronRight, ArrowUpRight, Trophy } from "lucide-react";
import { companies, consultations, events, newsItems, statTrends } from "@/data/mock";
import FadeIn from "@/components/motion/FadeIn";
import StaggerContainer, { StaggerItem } from "@/components/motion/StaggerContainer";
import AnimatedNumber from "@/components/ui/AnimatedNumber";
import SparkLine from "@/components/charts/SparkLine";
import NBAHero from "@/components/hero/NBAHero";
import RebniseCard from "@/components/cards/RebniseCard";
import Carousel3D from "@/components/carousel/Carousel3D";
import InfiniteScroll from "@/components/carousel/InfiniteScroll";
import SponsorOrbit from "@/components/carousel/SponsorOrbit";

export default function DashboardPage() {
  return (
    <div className="space-y-12">
      {/* NBA.com-style Hero */}
      <div className="-mx-6 lg:-mx-8 -mt-8">
        <NBAHero />
      </div>

      {/* Stats - 3D Carousel */}
      <FadeIn>
        <section>
          <div className="section-header">
            <h2 className="h2">アクティビティ</h2>
          </div>
          <Carousel3D />
        </section>
      </FadeIn>

      {/* Sponsor Ring */}
      <FadeIn delay={0.15}>
        <section>
          <div className="section-header">
            <h2 className="h2">スポンサー企業様</h2>
          </div>
          <div className="flex flex-col items-center">
            <SponsorOrbit />
            <div className="flex gap-3 mt-4">
              <Link href="/companies" className="btn-black">
                <Building2 className="w-4 h-4 mr-2" /> スポンサー企業一覧を見る
              </Link>
              <Link href="/benefits" className="btn-outline">
                <Trophy className="w-4 h-4 mr-2" /> スポンサー特典を見る
              </Link>
            </div>
          </div>
        </section>
      </FadeIn>

      {/* 成功事例ピックアップ - Yenta style */}
      <FadeIn delay={0.15}>
        <section>
          <p className="text-center text-[24px] lg:text-[30px] font-bold text-white leading-[35px] tracking-[0.11em] mb-0">
            Sponsor Connectから生まれた<br className="sm:hidden" />出会いや繋がりの事例
          </p>
          <div className="mt-10 -mx-6 lg:-mx-8">
            <InfiniteScroll interval={2500} cardWidth={332}>
              {[
                {
                  image: "/images/cases/case1.png",
                  title: "鹿児島の食品が東京のセレクトショップへ — スポンサー同士の信頼から生まれた協業",
                  sub: "桜島フーズ × Tokyo Creative Lab",
                },
                {
                  image: "/images/cases/case2.png",
                  title: "建設会社のDX推進プロジェクトが始動 — クラウド型工程管理で業務時間40%削減",
                  sub: "かごしま建設 × 南九州テクノロジーズ",
                },
                {
                  image: "/images/cases/case3.png",
                  title: "地方×都市のHRネットワーク構築 — 採用力強化で新卒応募数2倍に",
                  sub: "グローバルHRパートナーズ × かごしま建設",
                },
                {
                  image: "/images/cases/case4.png",
                  title: "データドリブンマーケティングで売上130%達成 — SNS戦略とEC販売の融合",
                  sub: "薩摩デジタルマーケティング × 桜島フーズ",
                },
              ].map((c, i) => (
                <Link
                  key={i}
                  href="/cases"
                  className="group block"
                >
                  <div className="overflow-hidden rounded-sm">
                    <img
                      src={c.image}
                      alt=""
                      className="w-full aspect-[16/9] object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <p className="text-[12px] sm:text-[14px] lg:text-[16px] font-bold text-white mt-2 leading-relaxed group-hover:text-black-300 transition-colors">
                    {c.title}
                  </p>
                  <p className="text-[10px] sm:text-[13px] lg:text-[14px] font-normal text-[#7C8DA3] mt-1">
                    {c.sub}
                  </p>
                </Link>
              ))}
            </InfiniteScroll>
          </div>
          <div className="text-center mt-8">
            <Link href="/cases" className="btn-outline">
              すべての成功事例を見る →
            </Link>
          </div>
        </section>
      </FadeIn>

      {/* 相談カードスクロール */}
      <FadeIn delay={0.15}>
        <section>
          <div className="section-header">
            <h2 className="h2">いま注目の相談</h2>
            <Link href="/board" className="text-[14px] font-semibold text-black-400 hover:text-white transition-colors">
              すべて見る →
            </Link>
          </div>
          <div className="overflow-x-auto -mx-6 lg:-mx-8 px-6 lg:px-8" style={{ scrollbarWidth: "none" }}>
            <div className="flex gap-4" style={{ minWidth: "max-content" }}>
              {consultations.slice(0, 6).map((p) => {
                const company = companies.find((c) => c.id === p.companyId);
                return (
                  <Link
                    key={p.id}
                    href={`/board/${p.id}`}
                    className="shrink-0 block rounded-lg overflow-hidden border border-line hover:border-line-dark transition-all duration-200 group"
                    style={{ width: "320px", backgroundColor: "#1e1e1e" }}
                  >
                    {/* 企業ロゴ */}
                    <div className="bg-white flex items-center justify-center" style={{ height: "100px", fontSize: 0, lineHeight: 0 }}>
                      {company ? (
                        <img src={company.logo} alt={company.name} className="max-w-[70%] max-h-[60px] object-contain" />
                      ) : (
                        <span className="text-[24px] font-bold text-black">{p.companyName.charAt(0)}</span>
                      )}
                    </div>
                    {/* 相談内容 */}
                    <div className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-[11px] font-bold text-white px-2 py-0.5 rounded-full bg-red">{p.category}</span>
                        <span className="text-[11px] text-black-500 font-medium">{p.companyName}</span>
                      </div>
                      {p.keywords && p.keywords.length > 0 ? (
                        <div className="flex flex-wrap gap-x-2 gap-y-0.5 mb-2">
                          {p.keywords.map((kw, ki) => (
                            <span key={ki} className="text-red text-[16px] font-black">{kw}</span>
                          ))}
                        </div>
                      ) : (
                        <p className="text-[14px] text-white font-bold leading-snug mb-2 line-clamp-1">{p.title}</p>
                      )}
                      <p className="text-[12px] text-black-400 font-medium leading-relaxed line-clamp-2 mb-3">{p.content}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-[14px] font-bold tabular-nums" style={{ color: "#dfb664" }}>{p.responses} 反応</span>
                        <ChevronRight className="w-4 h-4 text-black-500 group-hover:text-white transition-colors" />
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      </FadeIn>

      {/* This Week - rebnise.jp card mirror */}
      <FadeIn delay={0.2}>
        <section>
          <div className="section-header">
            <h2 className="h2">今週の注目イベント</h2>
          </div>
          <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5" style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            <RebniseCard
              href={`/companies/${companies[5].id}`}
              image="/images/hero-new-company.jpg"
              title={`${companies[5].name} — ${companies[5].tagline}`}
              date={companies[5].memberSince}
              categories={[
                { label: "NEW", color: "red", isNew: true },
                { label: "企業", color: "#043457" },
              ]}
            />
            <RebniseCard
              href="/board"
              image="/images/hero-consultation.jpg"
              title={consultations[0].title}
              date={consultations[0].createdAt}
              categories={[
                { label: "NEW", color: "red", isNew: true },
                { label: "相談", color: "#66cc99" },
              ]}
            />
            <RebniseCard
              href="/events"
              image="/images/hero-event.jpg"
              title={`${events[0].title} — ${events[0].location}`}
              date={events[0].date}
              categories={[
                { label: "イベント", color: "#e8ca22" },
              ]}
            />
          </ul>
        </section>
      </FadeIn>

      {/* 実績セクション */}
      <FadeIn delay={0.15}>
        <section>
          <div className="section-header">
            <h2 className="h2">実績</h2>
          </div>

          {/* 数字ハイライト */}
          <h3 className="text-[18px] font-bold text-white mb-4">数字で見る実績</h3>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {[
              { value: "35", unit: "社", label: "スポンサー企業数", sub: "2025-26シーズン" },
              { value: "12", unit: "件", label: "協業マッチング成立", sub: "累計実績" },
              { value: "85", unit: "%", label: "スポンサー継続率", sub: "前年比+5%" },
              { value: "4,800", unit: "人", label: "イベント動員数", sub: "2025-26シーズン" },
            ].map((stat) => (
              <div key={stat.label} className="text-center py-6 rounded-lg" style={{ background: '#111', border: '1px solid #333' }}>
                <div className="flex items-end justify-center gap-1 mb-2">
                  <span className="text-[36px] font-bold text-white leading-none tracking-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                    {stat.value}
                  </span>
                  <span className="text-[16px] font-medium text-black-400 mb-1">{stat.unit}</span>
                </div>
                <p className="text-[13px] font-bold text-white mb-1">{stat.label}</p>
                <p className="text-[11px] text-black-400">{stat.sub}</p>
              </div>
            ))}
          </div>

        </section>
      </FadeIn>


      {/* Consultations - RebniseCard style */}
      <FadeIn delay={0.1}>
        <section>
          <div className="section-header">
            <h2 className="h2">新着相談</h2>
            <Link href="/board" className="text-[14px] font-semibold text-black-400 hover:text-white transition-colors">
              すべて見る →
            </Link>
          </div>
          <ul className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5" style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {consultations.slice(0, 4).map((p) => {
              const company = companies.find((c) => c.id === p.companyId);
              return (
                <RebniseCard
                  key={p.id}
                  href={`/board/${p.id}`}
                  imageFallback={
                    company ? (
                      <img
                        src={company.logo}
                        alt={company.name}
                        style={{ width: "100%", height: "100%", objectFit: "contain" }}
                      />
                    ) : (
                      <span style={{ fontSize: "28px", fontWeight: "bold", color: "#1a1a1a" }}>{p.companyName.charAt(0)}</span>
                    )
                  }
                  title={p.title}
                  date=""
                  categories={[
                    { label: p.category, color: "#66cc99" },
                  ]}
                />
              );
            })}
          </ul>
        </section>
      </FadeIn>

      {/* Events - 横スクロール自動 */}
      <FadeIn delay={0.1}>
        <section>
          <div className="section-header">
            <h2 className="h2">近日のイベント</h2>
            <Link href="/events" className="text-[14px] font-semibold text-black-400 hover:text-white transition-colors">
              すべて見る →
            </Link>
          </div>
          <div className="-mx-6 lg:-mx-8">
            <InfiniteScroll interval={3000} cardWidth={290}>
              {events.slice(0, 8).map((ev, i) => {
                const catColor = ev.category === "GAME" ? "#e8ca22" : ev.category === "イベント" ? "#ec3e6b" : "#043457";
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

      {/* News - Timeline */}
      <FadeIn delay={0.1}>
        <section>
          <div className="section-header">
            <h2 className="h2">お知らせ</h2>
            <Link href="/news" className="text-[14px] font-semibold text-black-400 hover:text-white transition-colors">
              すべて見る →
            </Link>
          </div>
          <div className="relative pl-8">
            {/* Gold vertical line */}
            <div className="absolute left-[11px] top-2 bottom-2 w-[2px] bg-gradient-to-b from-[#dfb664] via-[#dfb664]/60 to-transparent" />

            <div className="space-y-0">
              {newsItems.slice(0, 4).map((item, i) => (
                <Link
                  key={item.id}
                  href="/news"
                  className="group relative flex items-start gap-4 py-4 hover:bg-white/5 rounded-lg px-3 -ml-3 transition-colors"
                >
                  {/* Dot on the line */}
                  <div className="absolute left-[-17px] top-[22px] flex items-center justify-center">
                    <div
                      className="w-[10px] h-[10px] rounded-full border-2 transition-colors"
                      style={{
                        borderColor: '#dfb664',
                        background: i === 0 ? '#dfb664' : '#000',
                      }}
                    />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2.5 mb-1.5">
                      <span
                        className="text-[12px] font-bold tracking-wider tabular-nums"
                        style={{ color: '#dfb664', fontFamily: "'Space Grotesk', sans-serif" }}
                      >
                        {item.createdAt}
                      </span>
                      <span className="badge-red text-[10px]">{item.category}</span>
                    </div>
                    <p className="text-[14px] font-medium text-white/80 group-hover:text-white transition-colors leading-snug">
                      {item.title}
                    </p>
                  </div>

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
