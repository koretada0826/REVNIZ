"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronRight, Bell, Info, MessageSquare } from "lucide-react";
import { newsItems, notifications } from "@/data/mock";
import FadeIn from "@/components/motion/FadeIn";

export default function NewsPage() {
  // システム通知のみ
  const systemNotifs = notifications.filter((n) => n.type === "system");
  const messageCount = notifications.filter((n) => (n.type === "reaction" || n.type === "message") && !n.read).length;

  return (
    <FadeIn><div className="space-y-6">
      <div>
        <p className="label">News</p>
        <h1 className="h1">お知らせ</h1>
        <p className="body mt-3">運営からの情報をお届けします</p>
      </div>

      {/* メッセージへの誘導 */}
      {messageCount > 0 && (
        <Link
          href="/messages"
          className="rounded-lg px-5 py-4 flex items-center justify-between group transition-colors hover:opacity-90 block"
          style={{ backgroundColor: "#dfb664" }}
        >
          <div className="flex items-center gap-3">
            <MessageSquare className="w-5 h-5 text-black" />
            <span className="text-[15px] font-extrabold text-black">
              {messageCount}件の未読メッセージがあります
            </span>
          </div>
          <ChevronRight className="w-5 h-5 text-black" />
        </Link>
      )}

      {/* システム通知 */}
      {systemNotifs.length > 0 && (
        <div>
          <h2 className="text-[20px] font-black text-white mb-4">通知</h2>
          <div className="space-y-2">
            {systemNotifs.map((n) => (
              <div
                key={n.id}
                className="rounded-lg border border-line p-4 flex items-start gap-4"
                style={{ backgroundColor: "#1e1e1e" }}
              >
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center shrink-0"
                  style={{ backgroundColor: "rgba(223,182,100,0.15)" }}
                >
                  <Info className="w-4 h-4" style={{ color: "#dfb664" }} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[14px] text-white font-bold leading-relaxed">{n.message}</p>
                  <span className="text-[12px] text-black-500 font-medium">{n.createdAt}</span>
                </div>
                {n.consultationId && (
                  <Link
                    href={`/board/${n.consultationId}`}
                    className="shrink-0 text-[13px] font-bold px-3 py-1.5 rounded-md transition-colors bg-white/10 text-white hover:bg-white/20"
                  >
                    詳細
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 運営からのお知らせ */}
      <div>
        <h2 className="text-[20px] font-black text-white mb-4">運営からのお知らせ</h2>
        <div className="rounded-lg overflow-hidden border border-line" style={{ backgroundColor: "#1e1e1e" }}>
          {newsItems.map((item, i) => {
            const linkMap: Record<string, string> = {
              "新着企業": "/companies",
              "イベント": "/events",
              "マッチング": "/board",
              "事例": "/cases",
            };
            const href = linkMap[item.category] || "/";
            return (
              <Link
                key={item.id}
                href={href}
                className={`flex items-start gap-5 px-6 py-5 hover:bg-white/5 transition-colors group cursor-pointer block ${i > 0 ? "border-t border-line" : ""}`}
              >
                <span className="text-[13px] text-black-400 font-bold w-24 shrink-0 pt-0.5 tabular-nums">{item.createdAt}</span>
                <div className="flex-1 min-w-0">
                  <span
                    className="text-[11px] font-bold text-white px-2 py-0.5 rounded-full mb-2 inline-block"
                    style={{ backgroundColor: "#C8102E" }}
                  >
                    {item.category}
                  </span>
                  <h3 className="text-[16px] font-bold text-white mb-1 group-hover:text-red transition-colors">{item.title}</h3>
                  <p className="text-[13px] text-black-400 font-medium">{item.content}</p>
                </div>
                <ChevronRight className="w-5 h-5 text-black-500 group-hover:text-white transition-colors shrink-0 mt-1" />
              </Link>
            );
          })}
        </div>
      </div>
    </div></FadeIn>
  );
}
