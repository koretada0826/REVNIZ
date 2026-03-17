"use client";

import Link from "next/link";
import { ArrowRight, Building2, MessageSquare, Calendar, Sparkles, TrendingUp, ChevronRight, ArrowUpRight } from "lucide-react";
import LottieAnimation from "@/components/lottie/LottieAnimation";
import { companies, consultations, events, matchingPairs, newsItems } from "@/data/mock";

export default function DashboardV2Page() {
  return (
    <div className="space-y-10">
      {/* Hero */}
      <section className="relative rounded-lg overflow-hidden animate-up">
        <div className="absolute inset-0 bg-gradient-to-br from-red/20 via-transparent to-transparent" />
        <div className="absolute inset-0 noise" />
        <div className="relative z-10 p-8 sm:p-10 lg:p-12 flex flex-col lg:flex-row items-start lg:items-center gap-8 border border-white/[0.08] rounded-lg">
          <div className="flex-1 min-w-0">
            <span className="inline-flex items-center gap-1.5 bg-white/[0.06] rounded-full px-3 py-1 mb-5 border border-white/[0.06]">
              <span className="w-1.5 h-1.5 bg-red rounded-full animate-pulse" />
              <span className="text-[10px] font-bold text-white/60 tracking-[0.15em] uppercase">Sponsor Connect</span>
            </span>
            <h1 className="text-[1.75rem] sm:text-[2.4rem] font-bold text-white leading-[1.08] tracking-tight mb-4">
              スポンサー同士が、<br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-red-300">次のビジネス</span>につながる。
            </h1>
            <p className="text-white/40 text-[14px] leading-relaxed mb-7 max-w-md">
              企業を探し、つながり、協業へ。レブナイズスポンサーだからこそ生まれる信頼ある接点を。
            </p>
            <div className="flex flex-wrap gap-2.5">
              <Link href="/v2/companies" className="btn-red shadow-red"><Building2 className="w-4 h-4 mr-1.5" /> 企業を探す</Link>
              <Link href="/v2/board" className="btn rounded px-5 py-2.5 text-[13px] tracking-wide border border-white/10 text-white/60 hover:text-white hover:bg-white/5 transition-all">
                <MessageSquare className="w-4 h-4 mr-1.5" /> 相談を投稿する
              </Link>
            </div>
          </div>
          <div className="w-36 h-36 lg:w-48 lg:h-48 shrink-0 opacity-30">
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
          <div key={s.label} className={`group rounded-lg border border-white/[0.06] bg-white/[0.02] p-5 hover:bg-white/[0.04] hover:border-white/[0.1] transition-all ${s.anim}`}>
            <div className="flex items-center justify-between mb-3">
              <div className="w-9 h-9 rounded-md bg-white/[0.04] flex items-center justify-center group-hover:bg-red/10 transition-colors">
                <s.icon className="w-4 h-4 text-white/30 group-hover:text-red-400 transition-colors" />
              </div>
              <ArrowUpRight className="w-3.5 h-3.5 text-white/10 group-hover:text-red-400 transition-colors" />
            </div>
            <p className="text-[28px] font-bold text-white tracking-tight leading-none">{s.value}</p>
            <p className="text-[11px] text-white/30 font-medium tracking-wide uppercase mt-1.5">{s.label}</p>
          </div>
        ))}
      </section>

      {/* This Week */}
      <section className="animate-up">
        <div className="flex items-end justify-between mb-5">
          <div><span className="text-[10px] font-bold tracking-[0.2em] uppercase text-red block mb-1.5">This Week</span><h2 className="text-[1.5rem] font-bold text-white tracking-tight">今週の注目</h2></div>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-6 hover:bg-white/[0.04] hover:border-white/[0.1] transition-all group">
            <div className="flex items-center justify-between mb-4">
              <span className="inline-flex items-center rounded-sm px-2 py-[3px] text-[10px] font-bold tracking-[0.06em] uppercase leading-none bg-red/10 text-red-400">New</span>
              <span className="text-[11px] text-white/20">新着企業</span>
            </div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-11 h-11 rounded-md bg-white/[0.06] flex items-center justify-center shrink-0 text-[14px] font-bold text-white">{companies[5].name.charAt(0)}</div>
              <div className="min-w-0">
                <h3 className="font-bold text-white text-[14px] truncate">{companies[5].name}</h3>
                <p className="text-[12px] text-red-400 font-medium truncate">{companies[5].tagline}</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-1 mb-4">{companies[5].canProvide.slice(0, 2).map((p) => <span key={p} className="inline-flex items-center rounded-sm px-2 py-[3px] text-[10px] font-bold tracking-[0.06em] uppercase leading-none bg-white/[0.06] text-white/50">{p}</span>)}</div>
            <Link href="/v2/companies" className="text-[12px] font-semibold text-red-400 hover:text-red-300 flex items-center gap-1">
              見る <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-6 hover:bg-white/[0.04] hover:border-white/[0.1] transition-all group">
            <div className="flex items-center justify-between mb-4">
              <span className="inline-flex items-center rounded-sm px-2 py-[3px] text-[10px] font-bold tracking-[0.06em] uppercase leading-none bg-emerald-500/10 text-emerald-400">相談</span>
              <span className="text-[11px] text-white/20">新着投稿</span>
            </div>
            <h3 className="font-bold text-white text-[14px] mb-2 line-clamp-2">{consultations[0].title}</h3>
            <p className="text-[13px] text-white/40 leading-relaxed line-clamp-2 mb-3">{consultations[0].content}</p>
            <div className="flex items-center justify-between">
              <span className="text-[11px] text-white/30 font-medium">{consultations[0].companyName}</span>
              <Link href="/v2/board" className="text-[12px] font-semibold text-red-400 hover:text-red-300 flex items-center gap-1">見る <ChevronRight className="w-3.5 h-3.5" /></Link>
            </div>
          </div>
          <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-6 hover:bg-white/[0.04] hover:border-white/[0.1] transition-all group">
            <div className="flex items-center justify-between mb-4">
              <span className="inline-flex items-center rounded-sm px-2 py-[3px] text-[10px] font-bold tracking-[0.06em] uppercase leading-none bg-white/[0.08] text-white/60">イベント</span>
              <span className="text-[11px] text-white/20">{events[0].date}</span>
            </div>
            <h3 className="font-bold text-white text-[14px] mb-2">{events[0].title}</h3>
            <p className="text-[13px] text-white/40 mb-3">{events[0].location}</p>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-16 h-1 rounded-full bg-white/10 overflow-hidden"><div className="h-full rounded-full bg-red" style={{ width: `${(events[0].registered / events[0].capacity) * 100}%` }} /></div>
                <span className="text-[11px] text-white/30">{events[0].registered}/{events[0].capacity}</span>
              </div>
              <Link href="/v2/events" className="text-[12px] font-semibold text-red-400 hover:text-red-300 flex items-center gap-1">申込む <ChevronRight className="w-3.5 h-3.5" /></Link>
            </div>
          </div>
        </div>
      </section>

      {/* Matching */}
      <section>
        <div className="flex items-end justify-between mb-5">
          <div><span className="text-[10px] font-bold tracking-[0.2em] uppercase text-red block mb-1.5">Recommended</span><h2 className="text-[1.5rem] font-bold text-white tracking-tight">おすすめマッチング</h2></div>
          <Link href="/v2/matching" className="text-[12px] text-white/30 hover:text-white flex items-center gap-1 transition-colors">すべて見る <ArrowRight className="w-3.5 h-3.5 ml-1" /></Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {matchingPairs.map((pair) => (
            <div key={pair.id} className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-6 hover:bg-white/[0.04] hover:border-white/[0.1] transition-all">
              <span className="inline-flex items-center rounded-sm px-2 py-[3px] text-[10px] font-bold tracking-[0.06em] uppercase leading-none bg-red/10 text-red-400 mb-4">{pair.theme}</span>
              <div className="flex items-center gap-2 mb-4">
                <div className="flex-1 text-center">
                  <div className="w-12 h-12 rounded-md bg-white/[0.06] mx-auto mb-1.5 flex items-center justify-center text-[12px] font-bold text-white">{pair.companyA.name.charAt(0)}</div>
                  <p className="text-[11px] font-semibold text-white/80 truncate px-1">{pair.companyA.name}</p>
                </div>
                <div className="w-7 h-7 rounded-full bg-red/10 flex items-center justify-center shrink-0"><Sparkles className="w-3 h-3 text-red-400" /></div>
                <div className="flex-1 text-center">
                  <div className="w-12 h-12 rounded-md bg-white/[0.06] mx-auto mb-1.5 flex items-center justify-center text-[12px] font-bold text-white">{pair.companyB.name.charAt(0)}</div>
                  <p className="text-[11px] font-semibold text-white/80 truncate px-1">{pair.companyB.name}</p>
                </div>
              </div>
              <p className="text-[13px] text-white/40 leading-relaxed line-clamp-2 mb-2">{pair.reason}</p>
              <p className="text-[11px] font-semibold text-white/70">{pair.expectedCollaboration}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Spotlight */}
      <section className="rounded-lg border border-red/20 bg-red/[0.04] p-6">
        <div className="flex flex-col sm:flex-row gap-6">
          <div className="w-14 h-14 rounded-md bg-white/[0.06] flex items-center justify-center shrink-0 text-xl font-bold text-white">{companies[2].name.charAt(0)}</div>
          <div className="flex-1 min-w-0">
            <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-red block mb-1.5">Weekly Spotlight</span>
            <h3 className="text-[1.125rem] font-semibold text-white tracking-tight mb-1">{companies[2].name}</h3>
            <p className="text-[13px] text-red-400 font-medium mb-2">{companies[2].tagline}</p>
            <p className="text-[13px] text-white/40 leading-relaxed mb-4 max-w-lg">{companies[2].description}</p>
            <div className="flex flex-wrap gap-1.5 mb-5">
              {companies[2].canProvide.map((i) => <span key={i} className="inline-flex items-center rounded-sm px-2 py-[3px] text-[10px] font-bold tracking-[0.06em] uppercase leading-none bg-white/[0.06] text-white/50">{i}</span>)}
              {companies[2].lookingFor.map((i) => <span key={i} className="inline-flex items-center rounded-sm px-2 py-[3px] text-[10px] font-bold tracking-[0.06em] uppercase leading-none bg-emerald-500/10 text-emerald-400">{i}</span>)}
            </div>
            <div className="flex gap-2">
              <Link href="/v2/companies" className="btn-red btn-sm">プロフィールを見る</Link>
              <Link href="/v2/meeting" className="btn rounded px-3.5 py-1.5 text-[12px] tracking-wide border border-white/10 text-white/60 hover:text-white hover:bg-white/5 transition-all">面談を依頼する</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Consultations */}
      <section>
        <div className="flex items-end justify-between mb-5">
          <div><span className="text-[10px] font-bold tracking-[0.2em] uppercase text-red block mb-1.5">Board</span><h2 className="text-[1.5rem] font-bold text-white tracking-tight">新着相談</h2></div>
          <Link href="/v2/board" className="text-[12px] text-white/30 hover:text-white flex items-center gap-1 transition-colors">すべて見る <ArrowRight className="w-3.5 h-3.5 ml-1" /></Link>
        </div>
        <div className="rounded-lg border border-white/[0.06] overflow-hidden divide-y divide-white/[0.06]">
          {consultations.slice(0, 4).map((p) => (
            <Link key={p.id} href="/v2/board" className="flex items-center gap-4 px-5 py-4 hover:bg-white/[0.02] transition-colors group">
              <div className="w-9 h-9 rounded-md bg-white/[0.04] flex items-center justify-center shrink-0"><MessageSquare className="w-4 h-4 text-white/20" /></div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5"><span className="inline-flex items-center rounded-sm px-2 py-[3px] text-[10px] font-bold tracking-[0.06em] uppercase leading-none bg-emerald-500/10 text-emerald-400">{p.category}</span><span className="text-[11px] text-white/20">{p.createdAt}</span></div>
                <h3 className="text-[13px] font-semibold text-white/80 truncate group-hover:text-red-400 transition-colors">{p.title}</h3>
                <p className="text-[11px] text-white/30 mt-0.5">{p.companyName} &middot; {p.targetArea}</p>
              </div>
              <div className="text-right shrink-0"><p className="text-[16px] font-bold text-white">{p.responses}</p><p className="text-[9px] text-white/20 uppercase tracking-wide">反応</p></div>
              <ChevronRight className="w-4 h-4 text-white/10 shrink-0" />
            </Link>
          ))}
        </div>
      </section>

      {/* Events */}
      <section>
        <div className="flex items-end justify-between mb-5">
          <div><span className="text-[10px] font-bold tracking-[0.2em] uppercase text-red block mb-1.5">Events</span><h2 className="text-[1.5rem] font-bold text-white tracking-tight">近日のイベント</h2></div>
          <Link href="/v2/events" className="text-[12px] text-white/30 hover:text-white flex items-center gap-1 transition-colors">すべて見る <ArrowRight className="w-3.5 h-3.5 ml-1" /></Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {events.map((ev) => {
            const pct = Math.round((ev.registered / ev.capacity) * 100);
            return (
              <div key={ev.id} className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-6 hover:bg-white/[0.04] hover:border-white/[0.1] transition-all">
                <div className="flex items-center justify-between mb-3"><span className="inline-flex items-center rounded-sm px-2 py-[3px] text-[10px] font-bold tracking-[0.06em] uppercase leading-none bg-white/[0.08] text-white/60">{ev.category}</span>{pct >= 90 && <span className="inline-flex items-center rounded-sm px-2 py-[3px] text-[10px] font-bold tracking-[0.06em] uppercase leading-none bg-red/10 text-red-400">残りわずか</span>}</div>
                <h3 className="text-[14px] font-bold text-white mb-2">{ev.title}</h3>
                <div className="space-y-1 mb-4">
                  <p className="text-[11px] text-white/30 flex items-center gap-1.5"><Calendar className="w-3 h-3 text-red/40" /> {ev.date}</p>
                  <p className="text-[11px] text-white/30">{ev.location}</p>
                </div>
                <div className="pt-3 border-t border-white/[0.06]">
                  <div className="flex items-center justify-between mb-1.5"><span className="text-[11px] text-white/30">{ev.registered}/{ev.capacity}名</span><span className="text-[11px] font-bold text-white">{pct}%</span></div>
                  <div className="h-1 rounded-full bg-white/10 overflow-hidden"><div className={`h-full rounded-full ${pct >= 90 ? "bg-red" : "bg-white/60"}`} style={{ width: `${pct}%` }} /></div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* News */}
      <section>
        <div className="flex items-end justify-between mb-5">
          <div><span className="text-[10px] font-bold tracking-[0.2em] uppercase text-red block mb-1.5">News</span><h2 className="text-[1.5rem] font-bold text-white tracking-tight">お知らせ</h2></div>
          <Link href="/v2/news" className="text-[12px] text-white/30 hover:text-white flex items-center gap-1 transition-colors">すべて見る <ArrowRight className="w-3.5 h-3.5 ml-1" /></Link>
        </div>
        <div className="rounded-lg border border-white/[0.06] overflow-hidden divide-y divide-white/[0.06]">
          {newsItems.slice(0, 4).map((item) => (
            <Link key={item.id} href="/v2/news" className="flex items-center gap-4 px-5 py-3.5 hover:bg-white/[0.02] transition-colors group">
              <span className="text-[11px] text-white/20 w-20 shrink-0 tabular-nums">{item.createdAt}</span>
              <span className="inline-flex items-center rounded-sm px-2 py-[3px] text-[10px] font-bold tracking-[0.06em] uppercase leading-none bg-red/10 text-red-400 shrink-0">{item.category}</span>
              <span className="text-[13px] font-medium text-white/70 truncate flex-1 group-hover:text-red-400 transition-colors">{item.title}</span>
              <ChevronRight className="w-3.5 h-3.5 text-white/10 shrink-0" />
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
