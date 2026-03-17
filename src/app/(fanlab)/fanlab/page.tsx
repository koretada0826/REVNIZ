"use client";

import Link from "next/link";
import { ArrowRight, FlaskConical, Radio, FileBarChart2, CalendarDays, Send, ChevronRight, TrendingUp, Sparkles } from "lucide-react";
import LottieAnimation from "@/components/lottie/LottieAnimation";
import { experiments, reports, caseStudies, calendarEvents, verificationMenus } from "@/data/fanlab-mock";

export default function FanLabDashboard() {
  return (
    <div className="space-y-10">
      {/* Hero */}
      <section className="card-black p-0 animate-up relative">
        <div className="absolute inset-0 noise" />
        <div className="absolute top-0 left-0 w-full h-1 bg-cyan-500" />
        <div className="relative z-10 p-8 sm:p-10 lg:p-12 flex flex-col lg:flex-row items-start lg:items-center gap-8">
          <div className="flex-1 min-w-0">
            <span className="inline-flex items-center gap-1.5 bg-white/10 rounded-full px-3 py-1 mb-5">
              <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full" />
              <span className="text-[10px] font-bold text-white/80 tracking-[0.15em] uppercase">Fan Lab</span>
            </span>
            <h1 className="text-[1.75rem] sm:text-[2.2rem] font-bold text-white leading-[1.1] tracking-tight mb-4">
              会場とファンで、<br /><span className="text-cyan-400">商品やサービス</span>を試せる。
            </h1>
            <p className="text-black-300 text-[14px] leading-relaxed mb-7 max-w-md">
              応援の場を、実証の場へ。ファンコミュニティとリアル会場接点を活かし、施策を試し、反応を確認し、次の打ち手につなげる。
            </p>
            <div className="flex flex-wrap gap-2.5">
              <Link href="/fanlab/consult" className="btn rounded px-5 py-2.5 text-[13px] tracking-wide font-semibold bg-cyan-500 text-white hover:bg-cyan-600 shadow-sm transition-all">
                <Send className="w-4 h-4 mr-1.5" /> 実証を相談する
              </Link>
              <Link href="/fanlab/experiments" className="btn rounded px-5 py-2.5 text-[13px] tracking-wide border border-white/20 text-white/80 hover:text-white hover:bg-white/10">
                <Radio className="w-4 h-4 mr-1.5" /> 募集中企画を見る
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
          { icon: FlaskConical, value: "7", label: "実証メニュー", anim: "animate-up" },
          { icon: Radio, value: "4", label: "募集中企画", anim: "animate-up-1" },
          { icon: FileBarChart2, value: "3", label: "返却レポート", anim: "animate-up-2" },
          { icon: TrendingUp, value: "87%", label: "回答回収率", anim: "animate-up-3" },
        ].map((s) => (
          <div key={s.label} className={`card group hover:shadow-md transition-shadow ${s.anim}`}>
            <div className="flex items-center justify-between mb-3">
              <div className="w-9 h-9 rounded-md bg-black-50 flex items-center justify-center group-hover:bg-cyan-50 transition-colors">
                <s.icon className="w-4 h-4 text-black-400 group-hover:text-cyan-500 transition-colors" />
              </div>
            </div>
            <p className="text-[28px] font-bold text-black-900 tracking-tight leading-none">{s.value}</p>
            <p className="text-[11px] text-black-300 font-medium tracking-wide uppercase mt-1.5">{s.label}</p>
          </div>
        ))}
      </section>

      {/* 今月の募集枠 */}
      <section className="animate-up">
        <div className="flex items-end justify-between mb-5">
          <div><span className="text-[10px] font-bold tracking-[0.2em] uppercase text-cyan-600 block mb-1.5">Open Now</span><h2 className="h2">今月の実証募集枠</h2></div>
          <Link href="/fanlab/experiments" className="btn-ghost text-[12px]">すべて見る <ArrowRight className="w-3.5 h-3.5 ml-1" /></Link>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          {experiments.filter(e => e.status !== "closed").slice(0, 4).map((exp) => {
            const pct = Math.round((exp.spotsFilled / exp.spotsTotal) * 100);
            return (
              <div key={exp.id} className="card card-hover group">
                <div className="flex items-center gap-2 mb-3">
                  <span className={`badge ${exp.status === "closing" ? "bg-amber-50 text-amber-700" : "bg-cyan-50 text-cyan-700"}`}>
                    {exp.status === "closing" ? "締切間近" : "募集中"}
                  </span>
                  <span className="caption">{exp.category}</span>
                </div>
                <h3 className="font-bold text-black-900 text-[14px] mb-2 group-hover:text-cyan-600 transition-colors">{exp.title}</h3>
                <div className="space-y-1 mb-3 text-[11px] text-black-300">
                  <p><span className="text-black-500">実施日:</span> {exp.date}</p>
                  <p><span className="text-black-500">締切:</span> {exp.deadline}</p>
                  <p><span className="text-black-500">場所:</span> {exp.location}</p>
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-line">
                  <div className="flex items-center gap-2">
                    <div className="w-20 h-1 rounded-full bg-black-100 overflow-hidden"><div className="h-full rounded-full bg-cyan-500" style={{ width: `${pct}%` }} /></div>
                    <span className="caption">{exp.spotsFilled}/{exp.spotsTotal}枠</span>
                  </div>
                  <Link href="/fanlab/consult" className="text-[12px] font-semibold text-cyan-600 hover:text-cyan-700 flex items-center gap-1">相談する <ChevronRight className="w-3.5 h-3.5" /></Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 実証メニュー */}
      <section>
        <div className="flex items-end justify-between mb-5">
          <div><span className="text-[10px] font-bold tracking-[0.2em] uppercase text-cyan-600 block mb-1.5">Menus</span><h2 className="h2">実証メニュー</h2></div>
          <Link href="/fanlab/menus" className="btn-ghost text-[12px]">すべて見る <ArrowRight className="w-3.5 h-3.5 ml-1" /></Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {verificationMenus.slice(0, 6).map((m) => (
            <Link key={m.id} href={`/fanlab/menus/${m.id}`} className="card card-hover group">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-[24px]">{m.icon}</span>
                <span className="text-[10px] font-bold text-black-300 tracking-wider uppercase">{m.category}</span>
              </div>
              <h3 className="font-bold text-black-900 text-[14px] mb-1.5 group-hover:text-cyan-600 transition-colors">{m.name}</h3>
              <p className="body-sm line-clamp-2">{m.summary}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* 新着レポート */}
      <section>
        <div className="flex items-end justify-between mb-5">
          <div><span className="text-[10px] font-bold tracking-[0.2em] uppercase text-cyan-600 block mb-1.5">Reports</span><h2 className="h2">新着レポート</h2></div>
          <Link href="/fanlab/reports" className="btn-ghost text-[12px]">すべて見る <ArrowRight className="w-3.5 h-3.5 ml-1" /></Link>
        </div>
        <div className="card-flush divide-y divide-line">
          {reports.map((r) => (
            <Link key={r.id} href={`/fanlab/reports/${r.id}`} className="flex items-center gap-4 px-5 py-4 hover:bg-black-50 transition-colors group">
              <div className="w-9 h-9 rounded-md bg-cyan-50 flex items-center justify-center shrink-0"><FileBarChart2 className="w-4 h-4 text-cyan-500" /></div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="badge bg-cyan-50 text-cyan-700">{r.category}</span>
                  <span className="caption">{r.date}</span>
                </div>
                <h3 className="text-[13px] font-semibold text-black-900 truncate group-hover:text-cyan-600 transition-colors">{r.title}</h3>
                <p className="caption mt-0.5 truncate">{r.summary}</p>
              </div>
              <div className="text-right shrink-0"><p className="text-[16px] font-bold text-black-900">{r.responses}</p><p className="text-[9px] text-black-300 uppercase tracking-wide">回答</p></div>
              <ChevronRight className="w-4 h-4 text-black-200 shrink-0" />
            </Link>
          ))}
        </div>
      </section>

      {/* 注目事例 */}
      <section className="bg-white rounded-md border-2 border-cyan-100 p-6 shadow-sm">
        <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-cyan-600 block mb-1.5">Featured Case</span>
        <h2 className="h3 mb-4">{caseStudies[0].company}の実証事例</h2>
        <div className="grid sm:grid-cols-3 gap-4 mb-4">
          {[{ l: "背景", t: caseStudies[0].background }, { l: "実施", t: caseStudies[0].method }, { l: "結果", t: caseStudies[0].result }].map((x) => (
            <div key={x.l}>
              <span className="label-muted">{x.l}</span>
              <p className="body-sm line-clamp-3">{x.t}</p>
            </div>
          ))}
        </div>
        <Link href="/fanlab/cases" className="text-[12px] font-semibold text-cyan-600 hover:text-cyan-700 flex items-center gap-1">事例をもっと見る <ArrowRight className="w-3.5 h-3.5" /></Link>
      </section>

      {/* スケジュール */}
      <section>
        <div className="flex items-end justify-between mb-5">
          <div><span className="text-[10px] font-bold tracking-[0.2em] uppercase text-cyan-600 block mb-1.5">Schedule</span><h2 className="h2">実施スケジュール</h2></div>
          <Link href="/fanlab/calendar" className="btn-ghost text-[12px]">カレンダー <ArrowRight className="w-3.5 h-3.5 ml-1" /></Link>
        </div>
        <div className="space-y-2">
          {calendarEvents.slice(0, 3).map((ev) => (
            <div key={ev.id} className="card card-hover flex items-center gap-4">
              <div className="bg-black-900 rounded px-3 py-2 text-center shrink-0">
                <p className="text-[18px] font-bold text-white tabular-nums leading-none">{ev.date.split("-")[2]}</p>
                <p className="text-[10px] text-black-300 tracking-wider mt-0.5">{ev.date.split("-")[1]}月</p>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className={`badge ${ev.type === "game" ? "bg-cyan-50 text-cyan-700" : "bg-violet-50 text-violet-700"}`}>{ev.type === "game" ? "試合" : "イベント"}</span>
                  <h3 className="text-[13px] font-semibold text-black-900 truncate">{ev.title}</h3>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {ev.slots.map((s) => (
                    <span key={s.name} className="caption">{s.name}: <span className="text-cyan-600 font-semibold">{s.available}枠</span></span>
                  ))}
                </div>
              </div>
              <Link href="/fanlab/consult" className="text-[11px] font-semibold text-cyan-600 hover:text-cyan-700 shrink-0">相談 →</Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
