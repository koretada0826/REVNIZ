"use client";

import Link from "next/link";
import { History, MessageSquare, ArrowRight } from "lucide-react";
import { consultationHistories, statusLabels } from "@/data/fanlab-mock";

const statusColorsLight: Record<string, string> = {
  new: "bg-cyan-50 text-cyan-700",
  hearing: "bg-amber-50 text-amber-700",
  designing: "bg-violet-50 text-violet-700",
  confirmed: "bg-emerald-50 text-emerald-700",
  done: "bg-blue-50 text-blue-700",
  reported: "badge-muted",
};

export default function HistoryPage() {
  return (
    <div className="space-y-6 animate-in">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-cyan-600 block mb-1.5">History</span>
          <h1 className="h1">自社相談履歴</h1>
          <p className="body-sm mt-1.5">過去の相談状況と進行ステータスを確認できます。</p>
        </div>
        <Link href="/fanlab/consult" className="inline-flex items-center justify-center font-semibold px-5 py-2.5 text-[13px] rounded bg-cyan-500 text-white hover:bg-cyan-600 shadow-sm transition-all shrink-0">
          新規相談 <ArrowRight className="w-4 h-4 ml-1.5" />
        </Link>
      </div>

      <div className="space-y-2.5">
        {consultationHistories.map((h) => {
          const st = statusLabels[h.status];
          const colorClass = statusColorsLight[h.status] || "badge-muted";
          return (
            <div key={h.id} className="card card-hover">
              <div className="flex items-start gap-4">
                <div className="w-9 h-9 rounded bg-black-50 flex items-center justify-center shrink-0 mt-0.5">
                  <History className="w-4 h-4 text-black-300" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className={`badge ${colorClass}`}>{st.label}</span>
                    <span className="caption">相談日: {h.createdAt}</span>
                    <span className="caption">更新: {h.updatedAt}</span>
                  </div>
                  <h3 className="font-bold text-black-900 text-[14px] mb-1.5">{h.title}</h3>
                  {h.adminComment && (
                    <div className="rounded bg-black-50 border border-line p-3 flex items-start gap-2">
                      <MessageSquare className="w-3.5 h-3.5 text-black-300 shrink-0 mt-0.5" />
                      <p className="body-sm">{h.adminComment}</p>
                    </div>
                  )}
                </div>
                <div className="shrink-0">
                  {h.status === "reported" ? (
                    <Link href="/fanlab/reports" className="text-[12px] font-semibold text-cyan-600 hover:text-cyan-700">レポートを見る →</Link>
                  ) : h.status !== "new" ? (
                    <span className="caption">進行中</span>
                  ) : null}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
