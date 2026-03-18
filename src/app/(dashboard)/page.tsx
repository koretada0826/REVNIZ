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
            <img src="/images/sponsor-ring.svg" alt="Sponsor Ring" className="w-full max-w-[800px]" />
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

          {/* 成功事例カード */}
          <h3 className="text-[18px] font-bold text-white mb-4">成功事例ピックアップ</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="rounded-lg overflow-hidden" style={{ background: '#111', border: '1px solid #333' }}>
              <div className="px-6 py-3" style={{ background: '#dfb664' }}>
                <span className="text-[12px] font-bold text-black tracking-wider uppercase">PICK UP 01</span>
              </div>
              <div className="p-6">
                <h3 className="text-[16px] font-bold text-white mb-2">鹿児島の食品が東京のセレクトショップへ</h3>
                <p className="text-[13px] text-black-400 mb-4 leading-relaxed">
                  桜島フーズ × Tokyo Creative Lab — パッケージデザインリニューアルにより東京3店舗への納品が決定。スポンサー同士の信頼から生まれた協業。
                </p>
                <div className="flex gap-2">
                  <span className="badge-muted">販路拡大</span>
                  <span className="badge-muted">ブランディング</span>
                </div>
              </div>
            </div>

            <div className="rounded-lg overflow-hidden" style={{ background: '#111', border: '1px solid #333' }}>
              <div className="px-6 py-3" style={{ background: '#dfb664' }}>
                <span className="text-[12px] font-bold text-black tracking-wider uppercase">PICK UP 02</span>
              </div>
              <div className="p-6">
                <h3 className="text-[16px] font-bold text-white mb-2">建設会社のDX推進プロジェクトが始動</h3>
                <p className="text-[13px] text-black-400 mb-4 leading-relaxed">
                  かごしま建設 × 南九州テクノロジーズ — クラウド型工程管理システム導入で月間報告業務時間40%削減を達成。
                </p>
                <div className="flex gap-2">
                  <span className="badge-muted">DX</span>
                  <span className="badge-muted">業務効率化</span>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-6">
            <Link href="/cases" className="btn-outline">
              すべての成功事例を見る →
            </Link>
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
            {consultations.slice(0, 4).map((p, i) => (
              <RebniseCard
                key={p.id}
                href="/board"
                image={["/images/hero-consultation.jpg", "/images/hero-new-company.jpg", "/images/hero-meeting.jpg", "/images/hero-event.jpg"][i]}
                title={p.title}
                date={p.createdAt}
                categories={[
                  { label: "NEW", color: "red", isNew: true },
                  { label: p.category, color: "#66cc99" },
                ]}
              />
            ))}
          </ul>
        </section>
      </FadeIn>

      {/* Events - RebniseCard style */}
      <FadeIn delay={0.1}>
        <section>
          <div className="section-header">
            <h2 className="h2">近日のイベント</h2>
            <Link href="/events" className="text-[14px] font-semibold text-black-400 hover:text-white transition-colors">
              すべて見る →
            </Link>
          </div>
          <ul className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5" style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {events.map((ev, i) => {
              const catColor = ev.category === "GAME" ? "#e8ca22" : ev.category === "イベント" ? "#ec3e6b" : "#043457";
              const pct = Math.round((ev.registered / ev.capacity) * 100);
              return (
                <RebniseCard
                  key={ev.id}
                  href="/events"
                  image={["/images/hero-game1.jpg", "/images/hero-game2.jpg", "/images/hero-fanfest.jpg", "/images/hero-party.jpg"][i]}
                  title={ev.title}
                  date={ev.date}
                  categories={[
                    ...(pct >= 90 ? [{ label: "残りわずか", color: "red", isNew: true }] : []),
                    { label: ev.category, color: catColor },
                  ]}
                />
              );
            })}
          </ul>
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
