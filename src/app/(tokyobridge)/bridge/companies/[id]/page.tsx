"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, Building2, User, CheckCircle2, MessageSquare, CalendarDays } from "lucide-react";
import { tokyoCompanies, bridgeEvents } from "@/data/bridge-mock";

const typeLabels: Record<string, string> = {
  company: "企業",
  startup: "スタートアップ",
  expert: "専門家",
  advisor: "顧問",
};

export default function CompanyDetailPage() {
  const params = useParams();
  const co = tokyoCompanies.find((x) => x.id === params.id);
  if (!co) return <div className="text-center py-20"><p className="body">企業が見つかりません</p></div>;

  const relatedEvents = bridgeEvents.filter((e) => e.speakers.some((s) => s.includes(co.name.split(" ")[0])));

  return (
    <div className="space-y-6 animate-in">
      <Link href="/bridge/companies" className="inline-flex items-center gap-1.5 text-[13px] text-muted hover:text-black-900 transition-colors group">
        <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-0.5" /> 企業・専門家一覧に戻る
      </Link>

      {/* Header */}
      <div className="bg-white rounded-md border-2 border-indigo-100 p-8 shadow-sm">
        <div className="flex items-start gap-5">
          <div className="w-16 h-16 rounded-lg bg-indigo-50 flex items-center justify-center shrink-0">
            {co.type === "expert" ? (
              <User className="w-8 h-8 text-indigo-500" />
            ) : (
              <Building2 className="w-8 h-8 text-indigo-500" />
            )}
          </div>
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="badge bg-indigo-50 text-indigo-700">{typeLabels[co.type]}</span>
              <span className="caption">{co.industry}</span>
            </div>
            <h1 className="h1 text-[1.5rem] mb-2">{co.name}</h1>
            <p className="body text-[15px]">{co.tagline}</p>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2 space-y-5">
          {/* Consult topics */}
          <div className="card">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 rounded bg-indigo-50 flex items-center justify-center">
                <MessageSquare className="w-3.5 h-3.5 text-indigo-500" />
              </div>
              <h2 className="h3 text-[15px]">相談できるテーマ</h2>
            </div>
            <div className="grid sm:grid-cols-2 gap-2">
              {co.consultTopics.map((t) => (
                <div key={t} className="rounded bg-indigo-50 border border-indigo-100 p-3 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-indigo-500 shrink-0" />
                  <span className="text-[13px] font-medium text-indigo-700">{t}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Target fit */}
          <div className="card">
            <h2 className="h3 text-[15px] mb-4">こんな企業に向いている</h2>
            <div className="rounded bg-black-50 p-4">
              <p className="body">{co.targetFit}</p>
            </div>
            <div className="mt-4">
              <span className="text-[10px] font-bold text-black-300 tracking-[0.1em] uppercase block mb-2">専門領域</span>
              <div className="flex flex-wrap gap-2">
                {co.domain.map((d) => (
                  <span key={d} className="badge bg-indigo-50 text-indigo-700">{d}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Achievements */}
          <div className="card">
            <h2 className="h3 text-[15px] mb-4">実績</h2>
            <div className="space-y-2">
              {co.achievements.map((a) => (
                <div key={a} className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <p className="body">{a}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Related events */}
          {relatedEvents.length > 0 && (
            <div className="card">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-7 h-7 rounded bg-indigo-50 flex items-center justify-center">
                  <CalendarDays className="w-3.5 h-3.5 text-indigo-500" />
                </div>
                <h2 className="h3 text-[15px]">関連イベント</h2>
              </div>
              <div className="space-y-2">
                {relatedEvents.map((ev) => (
                  <Link key={ev.id} href={`/bridge/events/${ev.id}`} className="flex items-center gap-3 rounded-md p-3 hover:bg-black-50 transition-colors">
                    <div className="bg-black-900 rounded px-2.5 py-1.5 text-center shrink-0">
                      <p className="text-[14px] font-bold text-white tabular-nums leading-none">{ev.date.split("-")[2]}</p>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-[13px] font-semibold text-black-900 truncate">{ev.title}</h4>
                      <p className="caption">{ev.time}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          <div className="card">
            <span className="label-muted mb-3">接続方法</span>
            <div className="space-y-2">
              {co.contactMethods.map((m) => (
                <div key={m} className="flex items-center gap-2 py-2 border-b border-line last:border-0">
                  <CheckCircle2 className="w-3.5 h-3.5 text-indigo-500" />
                  <span className="text-[13px] font-medium text-black-900">{m}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="card space-y-3">
            <Link href="/bridge/consult" className="w-full inline-flex items-center justify-center font-semibold px-5 py-2.5 text-[13px] rounded bg-indigo-500 text-white hover:bg-indigo-600 shadow-sm transition-all">
              面談を依頼する
            </Link>
            <Link href="/bridge/consult" className="btn-ghost w-full border border-line text-[12px]">
              壁打ちを依頼する
            </Link>
            <Link href="/bridge/events" className="btn-ghost w-full border border-line text-[12px]">
              イベントを見る
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
