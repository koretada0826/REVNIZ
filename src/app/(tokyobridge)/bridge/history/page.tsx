"use client";

import Link from "next/link";
import { History, MessageSquare, ArrowRight } from "lucide-react";
import { consultRequests, statusLabels } from "@/data/bridge-mock";

export default function HistoryPage() {
  return (
    <div className="space-y-6 animate-in">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-indigo-600 block mb-1.5">History</span>
          <h1 className="h1">自社相談履歴</h1>
          <p className="body-sm mt-1.5">過去の面談依頼・壁打ち依頼の進行状況を確認できます。</p>
        </div>
        <Link href="/bridge/consult" className="inline-flex items-center justify-center font-semibold px-5 py-2.5 text-[13px] rounded bg-indigo-500 text-white hover:bg-indigo-600 shadow-sm transition-all shrink-0">
          新規依頼 <ArrowRight className="w-4 h-4 ml-1.5" />
        </Link>
      </div>

      <div className="space-y-2.5">
        {consultRequests.map((req) => {
          const st = statusLabels[req.status];
          return (
            <div key={req.id} className="card card-hover">
              <div className="flex items-start gap-4">
                <div className="w-9 h-9 rounded bg-black-50 flex items-center justify-center shrink-0 mt-0.5">
                  <History className="w-4 h-4 text-black-300" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className={`badge ${st.color}`}>{st.label}</span>
                    <span className="caption">依頼日: {req.createdAt}</span>
                    <span className="caption">更新: {req.updatedAt}</span>
                  </div>
                  <h3 className="font-bold text-black-900 text-[14px] mb-1">{req.title}</h3>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-[12px] text-black-400">相手: <span className="font-medium text-black-900">{req.targetCompany}</span></span>
                    <span className="text-[12px] text-black-400">テーマ: <span className="font-medium text-black-900">{req.topic}</span></span>
                    <span className="text-[12px] text-black-400">形式: <span className="font-medium text-black-900">{req.format}</span></span>
                  </div>
                  {req.adminNote && (
                    <div className="rounded bg-black-50 border border-line p-3 flex items-start gap-2">
                      <MessageSquare className="w-3.5 h-3.5 text-black-300 shrink-0 mt-0.5" />
                      <p className="body-sm">{req.adminNote}</p>
                    </div>
                  )}
                </div>
                <div className="shrink-0">
                  {req.status === "done" ? (
                    <Link href="/bridge/cases" className="text-[12px] font-semibold text-indigo-600 hover:text-indigo-700">事例を見る →</Link>
                  ) : req.status !== "new" ? (
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
