"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, Building2, CalendarDays, ArrowRight } from "lucide-react";
import { insights, tokyoCompanies } from "@/data/bridge-mock";

export default function InsightDetailPage() {
  const params = useParams();
  const ins = insights.find((x) => x.id === params.id);
  if (!ins) return <div className="text-center py-20"><p className="body">インサイトが見つかりません</p></div>;

  const related = tokyoCompanies.filter((c) => ins.relatedCompanyIds.includes(c.id));

  return (
    <div className="space-y-6 animate-in">
      <Link href="/bridge/insights" className="inline-flex items-center gap-1.5 text-[13px] text-muted hover:text-black-900 transition-colors group">
        <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-0.5" /> インサイト一覧に戻る
      </Link>

      {/* Title area */}
      <div className="bg-white rounded-md border-2 border-indigo-100 p-8 shadow-sm">
        <div className="flex items-center gap-2 mb-3">
          <span className="badge bg-indigo-50 text-indigo-700">{ins.category}</span>
          <span className="caption">{ins.date}</span>
        </div>
        <h1 className="h1 text-[1.6rem] mb-3">{ins.title}</h1>
        <p className="body text-[15px]">{ins.summary}</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2 space-y-5">
          {/* Body */}
          <div className="card">
            <h2 className="h3 text-[15px] mb-4">詳細</h2>
            <p className="body leading-[1.8]">{ins.body}</p>
          </div>

          {/* Target audience */}
          <div className="card">
            <h2 className="h3 text-[15px] mb-4">こんな企業におすすめ</h2>
            <div className="flex flex-wrap gap-2">
              {ins.targetAudience.map((t) => (
                <span key={t} className="badge bg-indigo-50 text-indigo-700">{t}</span>
              ))}
            </div>
          </div>

          {/* Related companies */}
          {related.length > 0 && (
            <div className="card">
              <h2 className="h3 text-[15px] mb-4">関連する東京企業・専門家</h2>
              <div className="space-y-3">
                {related.map((co) => (
                  <Link key={co.id} href={`/bridge/companies/${co.id}`} className="flex items-center gap-4 rounded-md p-3 hover:bg-black-50 transition-colors">
                    <div className="w-10 h-10 rounded-md bg-indigo-50 flex items-center justify-center shrink-0">
                      <Building2 className="w-5 h-5 text-indigo-500" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-[13px] font-bold text-black-900">{co.name}</h3>
                      <p className="text-[12px] text-black-400 truncate">{co.tagline}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-black-300 shrink-0" />
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar CTAs */}
        <div className="space-y-4">
          <div className="card">
            <span className="label-muted mb-3">示唆</span>
            <div className="rounded bg-indigo-50 border border-indigo-100 p-4 mb-4">
              <p className="text-[13px] text-indigo-700 font-medium leading-relaxed">{ins.implication}</p>
            </div>
            <span className="label-muted mb-3">カテゴリ</span>
            <span className="badge bg-indigo-50 text-indigo-700">{ins.category}</span>
          </div>
          <div className="card space-y-3">
            <Link href="/bridge/consult" className="w-full inline-flex items-center justify-center font-semibold px-5 py-2.5 text-[13px] rounded bg-indigo-500 text-white hover:bg-indigo-600 shadow-sm transition-all">
              このテーマで相談する
            </Link>
            <Link href="/bridge/companies" className="btn-ghost w-full border border-line text-[12px]">
              関連企業を見る
            </Link>
            <Link href="/bridge/events" className="btn-ghost w-full border border-line text-[12px]">
              交流会に申し込む
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
