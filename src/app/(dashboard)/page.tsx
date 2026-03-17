"use client";

import Link from "next/link";
import { ArrowRight, Building2, MessageSquare, Calendar, Handshake, TrendingUp, ChevronRight, ArrowUpRight, Zap, Clock, Star } from "lucide-react";
import { companies, consultations, events, matchingPairs, newsItems } from "@/data/mock";

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      {/* Hero */}
      <section className="card-black p-8 sm:p-10">
        <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6">
          <div className="flex-1 min-w-0">
            <p className="text-[10px] font-bold text-white/50 tracking-[0.15em] uppercase mb-4">Sponsor Connect</p>
            <h1 className="text-[1.5rem] sm:text-[2rem] font-bold text-white leading-[1.15] tracking-tight mb-3">
              スポンサー同士が、<br />
              <span className="text-red-400">次のビジネス</span>につながる。
            </h1>
            <p className="text-black-400 text-[14px] leading-relaxed mb-6 max-w-md">
              企業を探し、つながり、協業へ。レブナイズスポンサーだからこそ生まれる信頼ある接点を。
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/companies" className="btn-red">
                <Building2 className="w-4 h-4 mr-1.5" /> 企業を探す
              </Link>
              <Link href="/board" className="btn rounded-md px-5 py-2.5 text-[13px] tracking-wide border border-white/15 text-white/60 hover:text-white hover:border-white/30 transition-colors">
                <MessageSquare className="w-4 h-4 mr-1.5" /> 相談を投稿する
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { icon: Building2, value: "24", label: "スポンサー企業" },
          { icon: TrendingUp, value: "8", label: "今月の面談依頼" },
          { icon: MessageSquare, value: "12", label: "相談投稿" },
          { icon: Calendar, value: "3", label: "今月のイベント" },
        ].map((s) => (
          <div key={s.label} className="card card-hover group cursor-pointer">
            <div className="flex items-center justify-between mb-3">
              <s.icon className="w-4 h-4 text-black-300" />
              <ArrowUpRight className="w-3.5 h-3.5 text-black-200 group-hover:text-black-500 transition-colors" />
            </div>
            <p className="stat-value">{s.value}</p>
            <p className="stat-label">{s.label}</p>
          </div>
        ))}
      </section>

      {/* This Week */}
      <section>
        <div className="section-header">
          <h2 className="h2">今週の注目</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* New Company */}
          <div className="card-interactive group">
            <div className="flex items-center justify-between mb-4">
              <span className="badge-red">New</span>
              <span className="caption">新着企業</span>
            </div>
            <div className="flex items-center gap-3 mb-3">
              <div className="avatar-md">{companies[5].name.charAt(0)}</div>
              <div className="min-w-0">
                <h3 className="font-bold text-black-900 text-[14px] truncate">{companies[5].name}</h3>
                <p className="text-[12px] text-black-400 truncate">{companies[5].tagline}</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-1 mb-4">
              {companies[5].canProvide.slice(0, 2).map((p) => <span key={p} className="badge-muted">{p}</span>)}
            </div>
            <Link href="/companies" className="text-[12px] font-semibold text-red hover:text-red-700 flex items-center gap-1">
              見る <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* New Consultation */}
          <div className="card-interactive group">
            <div className="flex items-center justify-between mb-4">
              <span className="badge-green">相談</span>
              <span className="caption">新着投稿</span>
            </div>
            <h3 className="font-bold text-black-900 text-[14px] mb-2 line-clamp-2">{consultations[0].title}</h3>
            <p className="body-sm line-clamp-2 mb-3">{consultations[0].content}</p>
            <div className="flex items-center justify-between pt-3 border-t border-line">
              <div className="flex items-center gap-2">
                <div className="avatar-sm text-[10px]">{consultations[0].companyName.charAt(0)}</div>
                <span className="caption font-medium text-black-500">{consultations[0].companyName}</span>
              </div>
              <Link href="/board" className="text-[12px] font-semibold text-red hover:text-red-700 flex items-center gap-1">
                見る <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Upcoming Event */}
          <div className="card-interactive group">
            <div className="flex items-center justify-between mb-4">
              <span className="badge-dark">イベント</span>
              <span className="caption">{events[0].date}</span>
            </div>
            <h3 className="font-bold text-black-900 text-[14px] mb-2">{events[0].title}</h3>
            <p className="body-sm mb-4">{events[0].location}</p>
            <div className="flex items-center justify-between pt-3 border-t border-line">
              <div className="flex items-center gap-2.5">
                <div className="progress-bar w-16"><div className="progress-fill bg-black-900" style={{ width: `${(events[0].registered / events[0].capacity) * 100}%` }} /></div>
                <span className="caption font-medium">{events[0].registered}/{events[0].capacity}</span>
              </div>
              <Link href="/events" className="text-[12px] font-semibold text-red hover:text-red-700 flex items-center gap-1">
                申込む <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Matching */}
      <section>
        <div className="section-header">
          <h2 className="h2">おすすめマッチング</h2>
          <Link href="/matching" className="btn-ghost text-[12px]">
            すべて見る <ArrowRight className="w-3.5 h-3.5 ml-1" />
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {matchingPairs.map((pair) => (
            <div key={pair.id} className="card card-hover group">
              <span className="badge-red mb-3 inline-block">{pair.theme}</span>
              <div className="flex items-center gap-2 mb-3">
                <div className="flex-1 text-center">
                  <div className="avatar-md mx-auto mb-1.5">{pair.companyA.name.charAt(0)}</div>
                  <p className="text-[11px] font-semibold text-black-900 truncate px-1">{pair.companyA.name}</p>
                </div>
                <div className="w-8 h-8 rounded-full bg-black-50 border border-line flex items-center justify-center shrink-0">
                  <Handshake className="w-3.5 h-3.5 text-black-400" />
                </div>
                <div className="flex-1 text-center">
                  <div className="avatar-md mx-auto mb-1.5">{pair.companyB.name.charAt(0)}</div>
                  <p className="text-[11px] font-semibold text-black-900 truncate px-1">{pair.companyB.name}</p>
                </div>
              </div>
              <p className="body-sm line-clamp-2 mb-2">{pair.reason}</p>
              <p className="text-[11px] font-semibold text-black-900">{pair.expectedCollaboration}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Spotlight */}
      <section className="card-red p-0 overflow-hidden">
        <div className="p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row gap-5">
            <div className="avatar-lg shrink-0">{companies[2].name.charAt(0)}</div>
            <div className="flex-1 min-w-0">
              <p className="text-[10px] font-bold tracking-[0.15em] uppercase text-black-400 mb-1">今週のピックアップ</p>
              <h3 className="h3 mb-1">{companies[2].name}</h3>
              <p className="text-[13px] text-black-400 mb-3">{companies[2].tagline}</p>
              <p className="body-sm mb-4 max-w-lg">{companies[2].description}</p>
              <div className="flex flex-wrap gap-1.5 mb-5">
                {companies[2].canProvide.map((i) => <span key={i} className="badge-muted">{i}</span>)}
                {companies[2].lookingFor.map((i) => <span key={i} className="badge-green">{i}</span>)}
              </div>
              <div className="flex gap-2.5">
                <Link href="/companies" className="btn-black btn-sm">プロフィールを見る</Link>
                <Link href="/meeting" className="btn-outline btn-sm">面談を依頼する</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Consultations */}
      <section>
        <div className="section-header">
          <h2 className="h2">新着相談</h2>
          <Link href="/board" className="btn-ghost text-[12px]">
            すべて見る <ArrowRight className="w-3.5 h-3.5 ml-1" />
          </Link>
        </div>
        <div className="card-flush divide-y divide-line">
          {consultations.slice(0, 4).map((p) => (
            <Link key={p.id} href="/board" className="flex items-center gap-4 px-5 py-4 hover:bg-black-50/50 transition-colors group">
              <div className="avatar-sm">
                <MessageSquare className="w-3.5 h-3.5 text-black-300" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="badge-green">{p.category}</span>
                  <span className="caption">{p.createdAt}</span>
                </div>
                <h3 className="text-[13px] font-semibold text-black-900 truncate group-hover:text-red transition-colors">{p.title}</h3>
                <p className="caption mt-0.5">{p.companyName} &middot; {p.targetArea}</p>
              </div>
              <div className="text-right shrink-0 px-2">
                <p className="text-[18px] font-bold text-black-900 tabular-nums">{p.responses}</p>
                <p className="text-[9px] text-black-300 uppercase tracking-wide">反応</p>
              </div>
              <ChevronRight className="w-4 h-4 text-black-200 shrink-0 group-hover:text-black-500 transition-colors" />
            </Link>
          ))}
        </div>
      </section>

      {/* Events */}
      <section>
        <div className="section-header">
          <h2 className="h2">近日のイベント</h2>
          <Link href="/events" className="btn-ghost text-[12px]">
            すべて見る <ArrowRight className="w-3.5 h-3.5 ml-1" />
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {events.map((ev) => {
            const pct = Math.round((ev.registered / ev.capacity) * 100);
            return (
              <div key={ev.id} className="card card-hover group">
                <div className="flex items-center justify-between mb-3">
                  <span className="badge-dark">{ev.category}</span>
                  {pct >= 90 && <span className="badge-red">残りわずか</span>}
                </div>
                <h3 className="text-[14px] font-bold text-black-900 mb-2 group-hover:text-red transition-colors">{ev.title}</h3>
                <div className="space-y-1 mb-4">
                  <p className="caption">{ev.date}</p>
                  <p className="caption">{ev.location}</p>
                </div>
                <div className="pt-3 border-t border-line">
                  <div className="flex items-center justify-between mb-2">
                    <span className="caption">{ev.registered}/{ev.capacity}名</span>
                    <span className="text-[11px] font-bold text-black-900 tabular-nums">{pct}%</span>
                  </div>
                  <div className="progress-bar">
                    <div className={`progress-fill ${pct >= 90 ? "bg-red" : "bg-black-900"}`} style={{ width: `${pct}%` }} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* News */}
      <section>
        <div className="section-header">
          <h2 className="h2">お知らせ</h2>
          <Link href="/news" className="btn-ghost text-[12px]">
            すべて見る <ArrowRight className="w-3.5 h-3.5 ml-1" />
          </Link>
        </div>
        <div className="card-flush divide-y divide-line">
          {newsItems.slice(0, 4).map((item) => (
            <Link key={item.id} href="/news" className="flex items-center gap-4 px-5 py-3.5 hover:bg-black-50/50 transition-colors group">
              <span className="caption w-20 shrink-0 tabular-nums">{item.createdAt}</span>
              <span className="badge-red shrink-0">{item.category}</span>
              <span className="text-[13px] font-medium text-black-900 truncate flex-1 group-hover:text-red transition-colors">{item.title}</span>
              <ChevronRight className="w-3.5 h-3.5 text-black-200 shrink-0 group-hover:text-black-500 transition-colors" />
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
