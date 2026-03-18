"use client";

import Link from "next/link";
import { ArrowRight, Lightbulb, Building2, CalendarDays, MessageSquarePlus, BookOpen } from "lucide-react";
import { insights, tokyoCompanies, bridgeEvents, collabThemes, bridgeCases } from "@/data/bridge-mock";
import { RotatingSponsors } from "@/components/tokyobridge/RotatingSponsors";

export default function BridgeDashboard() {
  return (
    <div className="space-y-8 animate-in">
      {/* Hero */}
      <div className="card-black p-8 lg:p-10">
        <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-indigo-300 block mb-3">Tokyo Bridge</span>
        <h1 className="text-[1.8rem] lg:text-[2.2rem] font-bold text-white leading-[1.1] tracking-tight mb-3">
          東京の視点、人脈、機会を、<br className="hidden sm:block" />鹿児島の企業へ。
        </h1>
        <p className="text-[14px] text-black-300 leading-relaxed max-w-xl mb-6">
          レブナイズの東京オーナー企業との接点を活かし、東京の企業・専門家・テーマ・事業機会を鹿児島のスポンサー企業に接続するプラットフォームです。
        </p>
        <div className="flex flex-wrap gap-3">
          <Link href="/bridge/companies" className="inline-flex items-center justify-center font-semibold px-5 py-2.5 text-[13px] rounded bg-indigo-500 text-white hover:bg-indigo-600 shadow-sm transition-all">
            東京企業を探す <ArrowRight className="w-4 h-4 ml-1.5" />
          </Link>
          <Link href="/bridge/consult" className="inline-flex items-center justify-center font-semibold px-5 py-2.5 text-[13px] rounded bg-white/10 text-white hover:bg-white/20 transition-all">
            面談を相談する
          </Link>
          <Link href="/bridge/events" className="inline-flex items-center justify-center font-semibold px-5 py-2.5 text-[13px] rounded bg-white/10 text-white hover:bg-white/20 transition-all">
            交流イベントを見る
          </Link>
        </div>
      </div>

      {/* 今月の東京インサイト */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded bg-indigo-50 flex items-center justify-center">
              <Lightbulb className="w-3.5 h-3.5 text-indigo-500" />
            </div>
            <h2 className="h3 text-[15px]">今月の東京インサイト</h2>
          </div>
          <Link href="/bridge/insights" className="text-[12px] font-semibold text-indigo-600 hover:text-indigo-700">すべて見る →</Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {insights.slice(0, 3).map((ins) => (
            <Link key={ins.id} href={`/bridge/insights/${ins.id}`} className="card card-hover">
              <span className="badge bg-indigo-50 text-indigo-700 mb-3">{ins.category}</span>
              <h3 className="text-[14px] font-bold text-black-900 mb-2 line-clamp-2">{ins.title}</h3>
              <p className="body-sm line-clamp-2 mb-3">{ins.summary}</p>
              <div className="rounded bg-indigo-50 border border-indigo-100 px-3 py-2">
                <p className="text-[11px] text-indigo-700 font-medium">{ins.implication}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 注目の東京企業・専門家 */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded bg-indigo-50 flex items-center justify-center">
              <Building2 className="w-3.5 h-3.5 text-indigo-500" />
            </div>
            <h2 className="h3 text-[15px]">注目の東京企業・専門家</h2>
          </div>
          <Link href="/bridge/companies" className="text-[12px] font-semibold text-indigo-600 hover:text-indigo-700">すべて見る →</Link>
        </div>
        <div className="grid sm:grid-cols-3 gap-3">
          {tokyoCompanies.slice(0, 3).map((co) => (
            <Link key={co.id} href={`/bridge/companies/${co.id}`} className="card card-hover">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-md bg-indigo-50 flex items-center justify-center shrink-0">
                  <Building2 className="w-5 h-5 text-indigo-500" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-[13px] font-bold text-black-900 truncate">{co.name}</h3>
                  <span className="text-[11px] text-black-300">{co.type === "expert" ? "専門家" : co.type === "startup" ? "スタートアップ" : "企業"}</span>
                </div>
              </div>
              <p className="body-sm mb-3 line-clamp-2">{co.tagline}</p>
              <div className="flex flex-wrap gap-1">
                {co.consultTopics.slice(0, 2).map((t) => (
                  <span key={t} className="text-[10px] bg-black-50 text-black-500 px-2 py-0.5 rounded-sm">{t}</span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* スポンサー企業 (Rotating 3D Ring) */}
      <section className="py-2">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-7 h-7 rounded bg-indigo-50 flex items-center justify-center">
            <Building2 className="w-3.5 h-3.5 text-indigo-500" />
          </div>
          <h2 className="h3 text-[15px]">鹿児島 × 東京 パートナーシップ</h2>
        </div>
        <div className="card-black !bg-transparent !p-0 overflow-visible">
          <RotatingSponsors />
        </div>
      </section>

      {/* 今月の交流・視察情報 */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded bg-indigo-50 flex items-center justify-center">
              <CalendarDays className="w-3.5 h-3.5 text-indigo-500" />
            </div>
            <h2 className="h3 text-[15px]">今月の交流・視察情報</h2>
          </div>
          <Link href="/bridge/events" className="text-[12px] font-semibold text-indigo-600 hover:text-indigo-700">すべて見る →</Link>
        </div>
        <div className="space-y-2.5">
          {bridgeEvents.slice(0, 3).map((ev) => (
            <Link key={ev.id} href={`/bridge/events/${ev.id}`} className="card card-hover flex items-center gap-4">
              <div className="bg-black-900 rounded px-3 py-2 text-center shrink-0">
                <p className="text-[16px] font-bold text-white tabular-nums leading-none">{ev.date.split("-")[2]}</p>
                <p className="text-[9px] text-black-300 tracking-wider mt-0.5">{ev.date.split("-")[1]}月</p>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className={`badge ${ev.format === "online" ? "bg-indigo-50 text-indigo-700" : ev.format === "offline" ? "bg-amber-50 text-amber-700" : "bg-emerald-50 text-emerald-700"}`}>
                    {ev.format === "online" ? "オンライン" : ev.format === "offline" ? "オフライン" : "ハイブリッド"}
                  </span>
                  <span className="badge badge-muted">{ev.type}</span>
                </div>
                <h4 className="text-[13px] font-semibold text-black-900 truncate">{ev.title}</h4>
              </div>
              <div className="text-right shrink-0">
                <p className="text-[11px] text-black-300">{ev.registered}/{ev.capacity}名</p>
                <p className="text-[11px] font-semibold text-indigo-600">残り{ev.capacity - ev.registered}枠</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 連携テーマ募集 */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded bg-indigo-50 flex items-center justify-center">
              <MessageSquarePlus className="w-3.5 h-3.5 text-indigo-500" />
            </div>
            <h2 className="h3 text-[15px]">連携テーマ募集</h2>
          </div>
          <Link href="/bridge/themes" className="text-[12px] font-semibold text-indigo-600 hover:text-indigo-700">すべて見る →</Link>
        </div>
        <div className="grid sm:grid-cols-2 gap-3">
          {collabThemes.filter((t) => t.featured).slice(0, 2).map((th) => (
            <div key={th.id} className="card card-hover">
              <div className="flex items-center gap-2 mb-2">
                <span className="badge bg-indigo-50 text-indigo-700">{th.category}</span>
                <span className="badge badge-muted">{th.format}</span>
              </div>
              <h3 className="text-[14px] font-bold text-black-900 mb-2">{th.title}</h3>
              <p className="body-sm mb-3">{th.background}</p>
              <div className="flex items-center justify-between">
                <span className="caption">{th.company} / {th.industry}</span>
                <span className="caption">{th.postedAt}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 事例導線 */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded bg-indigo-50 flex items-center justify-center">
              <BookOpen className="w-3.5 h-3.5 text-indigo-500" />
            </div>
            <h2 className="h3 text-[15px]">接続事例</h2>
          </div>
          <Link href="/bridge/cases" className="text-[12px] font-semibold text-indigo-600 hover:text-indigo-700">すべて見る →</Link>
        </div>
        <div className="card card-hover">
          <div className="flex items-center gap-2 mb-3">
            <span className="badge bg-indigo-50 text-indigo-700">{bridgeCases[0].category}</span>
          </div>
          <h3 className="text-[14px] font-bold text-black-900 mb-2">{bridgeCases[0].title}</h3>
          <p className="body-sm mb-3">{bridgeCases[0].outcome}</p>
          <div className="flex items-center gap-3 caption">
            <span>{bridgeCases[0].kagoshimaCompany}</span>
            <span>×</span>
            <span>{bridgeCases[0].tokyoCompany}</span>
          </div>
        </div>
      </section>
    </div>
  );
}
