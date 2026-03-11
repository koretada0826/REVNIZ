"use client";

import Link from "next/link";
import { ArrowRight, Building2, MessageSquare, Calendar, Sparkles, TrendingUp, ChevronRight, ArrowUpRight } from "lucide-react";
import LottieAnimation from "@/components/lottie/LottieAnimation";
import { companies, consultations, events, matchingPairs, newsItems } from "@/data/mock";

export default function DashboardPage() {
  return (
    <div className="space-y-10">
      {/* Hero */}
      <section className="card-black p-0 animate-up relative">
        <div className="absolute inset-0 noise" />
        <div className="absolute top-0 left-0 w-full h-1 bg-red" />
        <div className="relative z-10 p-8 sm:p-10 lg:p-12 flex flex-col lg:flex-row items-start lg:items-center gap-8">
          <div className="flex-1 min-w-0">
            <span className="inline-flex items-center gap-1.5 bg-white/10 rounded-full px-3 py-1 mb-5">
              <span className="w-1.5 h-1.5 bg-red rounded-full" />
              <span className="text-[10px] font-bold text-white/80 tracking-[0.15em] uppercase">Sponsor Connect</span>
            </span>
            <h1 className="text-[1.75rem] sm:text-[2.2rem] font-bold text-white leading-[1.1] tracking-tight mb-4">
              スポンサー同士が、<br /><span className="text-red-400">次のビジネス</span>につながる。
            </h1>
            <p className="text-black-300 text-[14px] leading-relaxed mb-7 max-w-md">
              企業を探し、つながり、協業へ。レブナイズスポンサーだからこそ生まれる信頼ある接点を。
            </p>
            <div className="flex flex-wrap gap-2.5">
              <Link href="/companies" className="btn-red shadow-red"><Building2 className="w-4 h-4 mr-1.5" /> 企業を探す</Link>
              <Link href="/board" className="btn rounded px-5 py-2.5 text-[13px] tracking-wide border border-white/20 text-white/80 hover:text-white hover:bg-white/10">
                <MessageSquare className="w-4 h-4 mr-1.5" /> 相談を投稿する
              </Link>
            </div>
          </div>
          <div className="w-36 h-36 lg:w-48 lg:h-48 shrink-0 opacity-50">
            <LottieAnimation src="https://lottie.host/a5ff4ccc-e416-4c60-a3f8-907045383e40/ZhBkMGlLTJ.lottie" className="w-full h-full" />
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { icon: Building2, value: "24", label: "スポンサー企業", anim: "animate-up" },
          { icon: TrendingUp, value: "8", label: "今月の面談依頼", anim: "animate-up-1" },
          { icon: MessageSquare, value: "12", label: "相談投稿", anim: "animate-up-2" },
          { icon: Calendar, value: "3", label: "今月のイベント", anim: "animate-up-3" },
        ].map((s) => (
          <div key={s.label} className={`card group hover:shadow-md transition-shadow ${s.anim}`}>
            <div className="flex items-center justify-between mb-3">
              <div className="w-9 h-9 rounded-md bg-black-50 flex items-center justify-center group-hover:bg-red-50 transition-colors">
                <s.icon className="w-4 h-4 text-black-400 group-hover:text-red transition-colors" />
              </div>
              <ArrowUpRight className="w-3.5 h-3.5 text-black-200 group-hover:text-red transition-colors" />
            </div>
            <p className="text-[28px] font-bold text-black-900 tracking-tight leading-none">{s.value}</p>
            <p className="text-[11px] text-black-300 font-medium tracking-wide uppercase mt-1.5">{s.label}</p>
          </div>
        ))}
      </section>

      {/* This Week */}
      <section className="animate-up">
        <div className="flex items-end justify-between mb-5">
          <div><span className="label">This Week</span><h2 className="h2">今週の注目</h2></div>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="card card-hover group">
            <div className="flex items-center justify-between mb-4">
              <span className="badge-red">New</span>
              <span className="caption">新着企業</span>
            </div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-11 h-11 rounded-md bg-black-50 flex items-center justify-center shrink-0 text-[14px] font-bold text-black-900">{companies[5].name.charAt(0)}</div>
              <div className="min-w-0">
                <h3 className="font-bold text-black-900 text-[14px] truncate">{companies[5].name}</h3>
                <p className="text-[12px] text-red font-medium truncate">{companies[5].tagline}</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-1 mb-4">{companies[5].canProvide.slice(0, 2).map((p) => <span key={p} className="badge-muted">{p}</span>)}</div>
            <Link href="/companies" className="text-[12px] font-semibold text-red hover:text-red-700 flex items-center gap-1">
              見る <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="card card-hover group">
            <div className="flex items-center justify-between mb-4">
              <span className="badge-green">相談</span>
              <span className="caption">新着投稿</span>
            </div>
            <h3 className="font-bold text-black-900 text-[14px] mb-2 line-clamp-2">{consultations[0].title}</h3>
            <p className="body-sm line-clamp-2 mb-3">{consultations[0].content}</p>
            <div className="flex items-center justify-between">
              <span className="caption font-medium">{consultations[0].companyName}</span>
              <Link href="/board" className="text-[12px] font-semibold text-red hover:text-red-700 flex items-center gap-1">見る <ChevronRight className="w-3.5 h-3.5" /></Link>
            </div>
          </div>
          <div className="card card-hover group">
            <div className="flex items-center justify-between mb-4">
              <span className="badge-dark">イベント</span>
              <span className="caption">{events[0].date}</span>
            </div>
            <h3 className="font-bold text-black-900 text-[14px] mb-2">{events[0].title}</h3>
            <p className="body-sm mb-3">{events[0].location}</p>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-16 h-1 rounded-full bg-black-100 overflow-hidden"><div className="h-full rounded-full bg-red" style={{ width: `${(events[0].registered / events[0].capacity) * 100}%` }} /></div>
                <span className="caption">{events[0].registered}/{events[0].capacity}</span>
              </div>
              <Link href="/events" className="text-[12px] font-semibold text-red hover:text-red-700 flex items-center gap-1">申込む <ChevronRight className="w-3.5 h-3.5" /></Link>
            </div>
          </div>
        </div>
      </section>

      {/* Matching */}
      <section>
        <div className="flex items-end justify-between mb-5">
          <div><span className="label">Recommended</span><h2 className="h2">おすすめマッチング</h2></div>
          <Link href="/matching" className="btn-ghost text-[12px]">すべて見る <ArrowRight className="w-3.5 h-3.5 ml-1" /></Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {matchingPairs.map((pair) => (
            <div key={pair.id} className="card card-hover">
              <span className="badge-red mb-4 inline-block">{pair.theme}</span>
              <div className="flex items-center gap-2 mb-4">
                <div className="flex-1 text-center">
                  <div className="w-12 h-12 rounded-md bg-black-50 mx-auto mb-1.5 flex items-center justify-center text-[12px] font-bold text-black-900">{pair.companyA.name.charAt(0)}</div>
                  <p className="text-[11px] font-semibold text-black-900 truncate px-1">{pair.companyA.name}</p>
                </div>
                <div className="w-7 h-7 rounded-full bg-red-50 flex items-center justify-center shrink-0"><Sparkles className="w-3 h-3 text-red" /></div>
                <div className="flex-1 text-center">
                  <div className="w-12 h-12 rounded-md bg-black-50 mx-auto mb-1.5 flex items-center justify-center text-[12px] font-bold text-black-900">{pair.companyB.name.charAt(0)}</div>
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
      <section className="card-red">
        <div className="flex flex-col sm:flex-row gap-6">
          <div className="w-14 h-14 rounded-md bg-black-50 flex items-center justify-center shrink-0 text-xl font-bold text-black-900">{companies[2].name.charAt(0)}</div>
          <div className="flex-1 min-w-0">
            <span className="label">Weekly Spotlight</span>
            <h3 className="h3 mb-1">{companies[2].name}</h3>
            <p className="text-[13px] text-red font-medium mb-2">{companies[2].tagline}</p>
            <p className="body-sm mb-4 max-w-lg">{companies[2].description}</p>
            <div className="flex flex-wrap gap-1.5 mb-5">
              {companies[2].canProvide.map((i) => <span key={i} className="badge-muted">{i}</span>)}
              {companies[2].lookingFor.map((i) => <span key={i} className="badge-green">{i}</span>)}
            </div>
            <div className="flex gap-2">
              <Link href="/companies" className="btn-black btn-sm">プロフィールを見る</Link>
              <Link href="/meeting" className="btn-outline btn-sm">面談を依頼する</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Consultations */}
      <section>
        <div className="flex items-end justify-between mb-5">
          <div><span className="label">Board</span><h2 className="h2">新着相談</h2></div>
          <Link href="/board" className="btn-ghost text-[12px]">すべて見る <ArrowRight className="w-3.5 h-3.5 ml-1" /></Link>
        </div>
        <div className="card-flush divide-y divide-line">
          {consultations.slice(0, 4).map((p) => (
            <Link key={p.id} href="/board" className="flex items-center gap-4 px-5 py-4 hover:bg-black-50 transition-colors group">
              <div className="w-9 h-9 rounded-md bg-black-50 flex items-center justify-center shrink-0"><MessageSquare className="w-4 h-4 text-black-300" /></div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5"><span className="badge-green">{p.category}</span><span className="caption">{p.createdAt}</span></div>
                <h3 className="text-[13px] font-semibold text-black-900 truncate group-hover:text-red transition-colors">{p.title}</h3>
                <p className="caption mt-0.5">{p.companyName} &middot; {p.targetArea}</p>
              </div>
              <div className="text-right shrink-0"><p className="text-[16px] font-bold text-black-900">{p.responses}</p><p className="text-[9px] text-black-300 uppercase tracking-wide">反応</p></div>
              <ChevronRight className="w-4 h-4 text-black-200 shrink-0" />
            </Link>
          ))}
        </div>
      </section>

      {/* Events */}
      <section>
        <div className="flex items-end justify-between mb-5">
          <div><span className="label">Events</span><h2 className="h2">近日のイベント</h2></div>
          <Link href="/events" className="btn-ghost text-[12px]">すべて見る <ArrowRight className="w-3.5 h-3.5 ml-1" /></Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {events.map((ev) => {
            const pct = Math.round((ev.registered / ev.capacity) * 100);
            return (
              <div key={ev.id} className="card card-hover">
                <div className="flex items-center justify-between mb-3"><span className="badge-dark">{ev.category}</span>{pct >= 90 && <span className="badge-red">残りわずか</span>}</div>
                <h3 className="text-[14px] font-bold text-black-900 mb-2">{ev.title}</h3>
                <div className="space-y-1 mb-4">
                  <p className="caption flex items-center gap-1.5"><Calendar className="w-3 h-3 text-red/40" /> {ev.date}</p>
                  <p className="caption">{ev.location}</p>
                </div>
                <div className="pt-3 border-t border-line">
                  <div className="flex items-center justify-between mb-1.5"><span className="caption">{ev.registered}/{ev.capacity}名</span><span className="text-[11px] font-bold text-black-900">{pct}%</span></div>
                  <div className="h-1 rounded-full bg-black-100 overflow-hidden"><div className={`h-full rounded-full ${pct >= 90 ? "bg-red" : "bg-black-900"}`} style={{ width: `${pct}%` }} /></div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* News */}
      <section>
        <div className="flex items-end justify-between mb-5">
          <div><span className="label">News</span><h2 className="h2">お知らせ</h2></div>
          <Link href="/news" className="btn-ghost text-[12px]">すべて見る <ArrowRight className="w-3.5 h-3.5 ml-1" /></Link>
        </div>
        <div className="card-flush divide-y divide-line">
          {newsItems.slice(0, 4).map((item) => (
            <Link key={item.id} href="/news" className="flex items-center gap-4 px-5 py-3.5 hover:bg-black-50 transition-colors group">
              <span className="caption w-20 shrink-0 tabular-nums">{item.createdAt}</span>
              <span className="badge-red shrink-0">{item.category}</span>
              <span className="text-[13px] font-medium text-black-900 truncate flex-1 group-hover:text-red transition-colors">{item.title}</span>
              <ChevronRight className="w-3.5 h-3.5 text-black-200 shrink-0" />
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
