"use client";

import Link from "next/link";
import { ArrowRight, Building2, MessageSquare, Calendar, Handshake, TrendingUp, ChevronRight, ArrowUpRight } from "lucide-react";
import { companies, consultations, events, matchingPairs, newsItems, statTrends } from "@/data/mock";
import FadeIn from "@/components/motion/FadeIn";
import StaggerContainer, { StaggerItem } from "@/components/motion/StaggerContainer";
import AnimatedNumber from "@/components/ui/AnimatedNumber";
import SparkLine from "@/components/charts/SparkLine";

export default function DashboardPage() {
  return (
    <div className="space-y-12">
      {/* Hero */}
      <FadeIn>
        <section className="card-black px-8 py-12 sm:px-12 sm:py-16">
          <p className="text-[11px] font-bold text-white/40 tracking-[0.2em] uppercase mb-6">Sponsor Connect</p>
          <h1 className="text-[2rem] sm:text-[2.8rem] font-bold text-white leading-[1.08] tracking-tight mb-4">
            スポンサー同士が、<br />
            <span className="text-red-400">次のビジネス</span>につながる。
          </h1>
          <p className="text-black-400 text-[16px] leading-relaxed mb-8 max-w-lg">
            企業を探し、つながり、協業へ。<br className="hidden sm:block" />レブナイズスポンサーだからこそ生まれる信頼ある接点を。
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/companies" className="btn-red text-[15px] px-8 py-3.5">
              <Building2 className="w-5 h-5 mr-2" /> 企業を探す
            </Link>
            <Link href="/board" className="btn rounded-md px-8 py-3.5 text-[15px] border border-white/15 text-white/60 hover:text-white hover:border-white/30 transition-colors">
              <MessageSquare className="w-5 h-5 mr-2" /> 相談を投稿する
            </Link>
          </div>
        </section>
      </FadeIn>

      {/* Stats */}
      <StaggerContainer className="grid grid-cols-2 lg:grid-cols-4 gap-4" stagger={0.1}>
        {[
          { icon: Building2, value: 24, label: "スポンサー企業", trend: statTrends.companies },
          { icon: TrendingUp, value: 8, label: "今月の面談依頼", trend: statTrends.meetings, color: "#C8102E" },
          { icon: MessageSquare, value: 12, label: "相談投稿", trend: statTrends.consultations },
          { icon: Calendar, value: 3, label: "今月のイベント", trend: statTrends.events },
        ].map((s) => (
          <StaggerItem key={s.label}>
            <div className="card card-hover group cursor-pointer p-5">
              <div className="flex items-center justify-between mb-2">
                <s.icon className="w-5 h-5 text-black-300" />
                <ArrowUpRight className="w-4 h-4 text-black-200 group-hover:text-black-500 transition-colors" />
              </div>
              <div className="flex items-end justify-between gap-3">
                <div>
                  <p className="stat-value"><AnimatedNumber value={s.value} /></p>
                  <p className="stat-label">{s.label}</p>
                </div>
                <div className="w-24 shrink-0">
                  <SparkLine data={s.trend} color={s.color || "#0A0A0A"} height={36} />
                </div>
              </div>
            </div>
          </StaggerItem>
        ))}
      </StaggerContainer>

      {/* This Week */}
      <FadeIn delay={0.2}>
        <section>
          <div className="section-header">
            <h2 className="h2">今週の注目</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* New Company */}
            <div className="card-interactive group p-0 overflow-hidden">
              <div className="bg-black-900 px-6 py-3 flex items-center justify-between">
                <span className="text-[12px] font-bold text-white tracking-wide uppercase">New 企業</span>
                <ChevronRight className="w-4 h-4 text-white/40 group-hover:text-white transition-colors" />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="avatar-md">{companies[5].name.charAt(0)}</div>
                  <div className="min-w-0">
                    <h3 className="font-bold text-black-900 text-[16px] truncate">{companies[5].name}</h3>
                    <p className="text-[13px] text-black-400 truncate">{companies[5].tagline}</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {companies[5].canProvide.slice(0, 3).map((p) => <span key={p} className="badge-muted">{p}</span>)}
                </div>
              </div>
            </div>

            {/* New Consultation */}
            <div className="card-interactive group p-0 overflow-hidden">
              <div className="bg-emerald-700 px-6 py-3 flex items-center justify-between">
                <span className="text-[12px] font-bold text-white tracking-wide uppercase">新着 相談</span>
                <ChevronRight className="w-4 h-4 text-white/40 group-hover:text-white transition-colors" />
              </div>
              <div className="p-6">
                <h3 className="font-bold text-black-900 text-[16px] mb-2 line-clamp-2">{consultations[0].title}</h3>
                <p className="body-sm line-clamp-2 mb-4">{consultations[0].content}</p>
                <div className="flex items-center gap-3">
                  <div className="avatar-sm text-[11px]">{consultations[0].companyName.charAt(0)}</div>
                  <div>
                    <span className="text-[13px] font-medium text-black-900">{consultations[0].companyName}</span>
                    <span className="caption block">{consultations[0].targetArea}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Upcoming Event */}
            <div className="card-interactive group p-0 overflow-hidden">
              <div className="bg-black-700 px-6 py-3 flex items-center justify-between">
                <span className="text-[12px] font-bold text-white tracking-wide uppercase">イベント</span>
                <span className="text-[12px] text-white/60">{events[0].date}</span>
              </div>
              <div className="p-6">
                <h3 className="font-bold text-black-900 text-[16px] mb-2">{events[0].title}</h3>
                <p className="body-sm mb-4">{events[0].location}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="progress-bar w-20"><div className="progress-fill bg-black-900" style={{ width: `${(events[0].registered / events[0].capacity) * 100}%` }} /></div>
                    <span className="text-[13px] font-semibold text-black-900">{events[0].registered}/{events[0].capacity}名</span>
                  </div>
                  <Link href="/events" className="text-[13px] font-semibold text-red hover:text-red-700">
                    申込む →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </FadeIn>

      {/* Matching */}
      <FadeIn delay={0.1}>
        <section>
          <div className="section-header">
            <h2 className="h2">おすすめマッチング</h2>
            <Link href="/matching" className="text-[14px] font-semibold text-black-400 hover:text-black-900 transition-colors">
              すべて見る →
            </Link>
          </div>
          <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4" stagger={0.08}>
            {matchingPairs.map((pair) => (
              <StaggerItem key={pair.id}>
                <div className="card card-hover group h-full">
                  <span className="badge-red mb-4 inline-block">{pair.theme}</span>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex-1 text-center">
                      <div className="avatar-md mx-auto mb-2">{pair.companyA.name.charAt(0)}</div>
                      <p className="text-[13px] font-semibold text-black-900 truncate">{pair.companyA.name}</p>
                    </div>
                    <span className="text-[20px] text-black-200 font-light">&times;</span>
                    <div className="flex-1 text-center">
                      <div className="avatar-md mx-auto mb-2">{pair.companyB.name.charAt(0)}</div>
                      <p className="text-[13px] font-semibold text-black-900 truncate">{pair.companyB.name}</p>
                    </div>
                  </div>
                  <p className="body-sm line-clamp-2 mb-3">{pair.reason}</p>
                  <p className="text-[13px] font-semibold text-black-900">{pair.expectedCollaboration}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </section>
      </FadeIn>

      {/* Spotlight */}
      <FadeIn delay={0.1}>
        <section className="card-red p-0 overflow-hidden">
          <div className="px-8 py-10 sm:px-10">
            <p className="label mb-4">今週のピックアップ</p>
            <div className="flex flex-col sm:flex-row gap-6">
              <div className="avatar-lg shrink-0">{companies[2].name.charAt(0)}</div>
              <div className="flex-1 min-w-0">
                <h3 className="text-[22px] font-bold text-black-900 tracking-tight mb-1">{companies[2].name}</h3>
                <p className="text-[15px] text-black-400 mb-4">{companies[2].tagline}</p>
                <p className="body mb-5 max-w-lg">{companies[2].description}</p>
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {companies[2].canProvide.map((i) => <span key={i} className="badge-muted">{i}</span>)}
                  {companies[2].lookingFor.map((i) => <span key={i} className="badge-green">{i}</span>)}
                </div>
                <div className="flex gap-3">
                  <Link href={`/companies/${companies[2].id}`} className="btn-black">プロフィールを見る</Link>
                  <Link href="/meeting" className="btn-outline">面談を依頼する</Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </FadeIn>

      {/* Consultations */}
      <FadeIn delay={0.1}>
        <section>
          <div className="section-header">
            <h2 className="h2">新着相談</h2>
            <Link href="/board" className="text-[14px] font-semibold text-black-400 hover:text-black-900 transition-colors">
              すべて見る →
            </Link>
          </div>
          <div className="card-flush divide-y divide-line">
            {consultations.slice(0, 4).map((p) => (
              <Link key={p.id} href="/board" className="flex items-center gap-5 px-6 py-5 hover:bg-black-50/50 transition-colors group">
                <div className="avatar-sm">
                  <MessageSquare className="w-4 h-4 text-black-300" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="badge-green">{p.category}</span>
                    <span className="caption">{p.createdAt}</span>
                  </div>
                  <h3 className="text-[15px] font-semibold text-black-900 truncate group-hover:text-red transition-colors">{p.title}</h3>
                  <p className="text-[13px] text-black-400 mt-0.5">{p.companyName} &middot; {p.targetArea}</p>
                </div>
                <div className="text-center shrink-0 px-3">
                  <p className="text-[22px] font-bold text-black-900 tabular-nums">{p.responses}</p>
                  <p className="text-[10px] text-black-300 uppercase tracking-wide">反応</p>
                </div>
                <ChevronRight className="w-5 h-5 text-black-200 shrink-0 group-hover:text-black-500 transition-colors" />
              </Link>
            ))}
          </div>
        </section>
      </FadeIn>

      {/* Events */}
      <FadeIn delay={0.1}>
        <section>
          <div className="section-header">
            <h2 className="h2">近日のイベント</h2>
            <Link href="/events" className="text-[14px] font-semibold text-black-400 hover:text-black-900 transition-colors">
              すべて見る →
            </Link>
          </div>
          <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4" stagger={0.08}>
            {events.map((ev) => {
              const pct = Math.round((ev.registered / ev.capacity) * 100);
              return (
                <StaggerItem key={ev.id}>
                  <div className="card card-hover group h-full">
                    <div className="flex items-center justify-between mb-3">
                      <span className="badge-dark">{ev.category}</span>
                      {pct >= 90 && <span className="badge-red">残りわずか</span>}
                    </div>
                    <h3 className="text-[16px] font-bold text-black-900 mb-2 group-hover:text-red transition-colors">{ev.title}</h3>
                    <div className="space-y-1 mb-5">
                      <p className="caption text-[13px]">{ev.date}</p>
                      <p className="caption text-[13px]">{ev.location}</p>
                    </div>
                    <div className="pt-4 border-t border-line">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[13px] text-black-400">{ev.registered}/{ev.capacity}名</span>
                        <span className="text-[14px] font-bold text-black-900 tabular-nums">{pct}%</span>
                      </div>
                      <div className="progress-bar">
                        <div className={`progress-fill ${pct >= 90 ? "bg-red" : "bg-black-900"}`} style={{ width: `${pct}%` }} />
                      </div>
                    </div>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </section>
      </FadeIn>

      {/* News */}
      <FadeIn delay={0.1}>
        <section>
          <div className="section-header">
            <h2 className="h2">お知らせ</h2>
            <Link href="/news" className="text-[14px] font-semibold text-black-400 hover:text-black-900 transition-colors">
              すべて見る →
            </Link>
          </div>
          <div className="card-flush divide-y divide-line">
            {newsItems.slice(0, 4).map((item) => (
              <Link key={item.id} href="/news" className="flex items-center gap-5 px-6 py-4 hover:bg-black-50/50 transition-colors group">
                <span className="caption w-24 shrink-0 tabular-nums text-[13px]">{item.createdAt}</span>
                <span className="badge-red shrink-0">{item.category}</span>
                <span className="text-[15px] font-medium text-black-900 truncate flex-1 group-hover:text-red transition-colors">{item.title}</span>
                <ChevronRight className="w-4 h-4 text-black-200 shrink-0 group-hover:text-black-500 transition-colors" />
              </Link>
            ))}
          </div>
        </section>
      </FadeIn>
    </div>
  );
}
