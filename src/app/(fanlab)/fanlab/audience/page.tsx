"use client";

import Link from "next/link";
import { Users, CalendarDays, ArrowRight } from "lucide-react";
import { audienceData } from "@/data/fanlab-mock";

export default function AudiencePage() {
  const d = audienceData;

  return (
    <div className="space-y-8 animate-in">
      <div>
        <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-cyan-600 block mb-1.5">Audience</span>
        <h1 className="h1">来場者・ファン属性</h1>
        <p className="body-sm mt-1.5">「どんな層に試せるのか」を把握し、実証設計の参考にしてください。</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { label: "年間来場者数", value: d.totalVisitors.toLocaleString() + "人", icon: Users },
          { label: "1試合平均", value: d.avgPerGame.toLocaleString() + "人", icon: Users },
          { label: "ファンクラブ会員", value: d.fanclubMembers.toLocaleString() + "人", icon: Users },
          { label: "年間ホームゲーム", value: d.annualGames + "試合", icon: CalendarDays },
        ].map((s) => (
          <div key={s.label} className="card">
            <div className="w-8 h-8 rounded-md bg-cyan-50 flex items-center justify-center mb-3">
              <s.icon className="w-4 h-4 text-cyan-500" />
            </div>
            <p className="text-[24px] font-bold text-black-900 tracking-tight leading-none">{s.value}</p>
            <p className="text-[11px] text-black-300 font-medium tracking-wide uppercase mt-1.5">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-5">
        <div className="card">
          <h2 className="h3 text-[15px] mb-5">年代構成</h2>
          <div className="space-y-3">
            {d.demographics.age.map((a) => (
              <div key={a.label}>
                <div className="flex items-center justify-between mb-1">
                  <span className="body-sm">{a.label}</span>
                  <span className="text-[12px] font-bold text-black-900">{a.pct}%</span>
                </div>
                <div className="h-2 rounded-full bg-black-100 overflow-hidden">
                  <div className="h-full rounded-full bg-cyan-500" style={{ width: `${a.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="card">
          <h2 className="h3 text-[15px] mb-5">性別構成</h2>
          <div className="space-y-3">
            {d.demographics.gender.map((g) => (
              <div key={g.label}>
                <div className="flex items-center justify-between mb-1">
                  <span className="body-sm">{g.label}</span>
                  <span className="text-[12px] font-bold text-black-900">{g.pct}%</span>
                </div>
                <div className="h-2 rounded-full bg-black-100 overflow-hidden">
                  <div className={`h-full rounded-full ${g.label === "男性" ? "bg-blue-500" : "bg-pink-500"}`} style={{ width: `${g.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="card">
          <h2 className="h3 text-[15px] mb-5">来場タイプ</h2>
          <div className="space-y-3">
            {d.demographics.type.map((t) => (
              <div key={t.label}>
                <div className="flex items-center justify-between mb-1">
                  <span className="body-sm">{t.label}</span>
                  <span className="text-[12px] font-bold text-black-900">{t.pct}%</span>
                </div>
                <div className="h-2 rounded-full bg-black-100 overflow-hidden">
                  <div className="h-full rounded-full bg-violet-500" style={{ width: `${t.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="rounded-md bg-amber-50 border border-amber-200 p-5">
        <p className="text-[12px] text-amber-800 leading-relaxed">
          <span className="font-bold">注意事項:</span> 上記データは過去実績に基づく参考値です。試合・イベントごとに来場者構成は変動します。実証設計時にはより詳細な属性情報をご案内いたします。
        </p>
      </div>

      <div className="bg-white rounded-md border-2 border-cyan-100 p-6 shadow-sm flex flex-col sm:flex-row items-center gap-4">
        <div className="flex-1">
          <h3 className="text-[14px] font-semibold text-black-900 mb-1">この層に試したいことがありますか？</h3>
          <p className="body-sm">実証メニューから最適な方法を選び、相談を始められます。</p>
        </div>
        <Link href="/fanlab/menus" className="inline-flex items-center justify-center font-semibold px-5 py-2.5 text-[13px] rounded bg-cyan-500 text-white hover:bg-cyan-600 shadow-sm transition-all shrink-0">
          実証メニューを見る <ArrowRight className="w-4 h-4 ml-1.5" />
        </Link>
      </div>
    </div>
  );
}
