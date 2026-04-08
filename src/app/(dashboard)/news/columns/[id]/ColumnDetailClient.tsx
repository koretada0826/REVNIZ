"use client";

import Link from "next/link";
import { ArrowLeft, Newspaper, Calendar, User } from "lucide-react";
import { columns } from "@/data/columns";
import FadeIn from "@/components/motion/FadeIn";

export default function ColumnDetailClient({ id }: { id: string }) {
  const col = columns.find((c) => String(c.id) === id);

  if (!col) {
    return (
      <FadeIn>
        <div className="text-center py-20">
          <p className="text-[18px] text-white font-bold mb-4">記事が見つかりません</p>
          <Link href="/news" className="btn-primary">レブナイズ情報に戻る</Link>
        </div>
      </FadeIn>
    );
  }

  const otherColumns = columns.filter((c) => c.id !== col.id);

  return (
    <FadeIn>
      <div className="max-w-3xl mx-auto space-y-8">
        {/* 戻る */}
        <Link
          href="/news"
          className="inline-flex items-center gap-2 text-[14px] font-semibold text-black-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> レブナイズ情報に戻る
        </Link>

        {/* ヘッダー */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <span
              className="text-[11px] font-bold px-3 py-1 rounded-full"
              style={{ backgroundColor: "rgba(223,182,100,0.2)", color: "#dfb664" }}
            >
              {col.publication}
            </span>
          </div>
          <h1 className="text-[24px] sm:text-[32px] font-black text-white leading-snug mb-4">
            {col.title}
          </h1>
          <div className="flex items-center gap-4 text-[13px] text-black-400">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              {col.date}
            </span>
            <span className="flex items-center gap-1.5">
              <User className="w-4 h-4" />
              {col.author}
            </span>
          </div>
        </div>

        {/* 区切り線 */}
        <div className="border-t border-line" />

        {/* リード文 */}
        <p className="text-[16px] sm:text-[18px] text-white/80 leading-[1.8] font-medium">
          {col.excerpt}
        </p>

        {/* 本文 */}
        <div className="space-y-6">
          {col.body.map((paragraph, i) => (
            <p
              key={i}
              className="text-[15px] sm:text-[16px] text-white/60 leading-[1.9]"
            >
              {paragraph}
            </p>
          ))}
        </div>

        {/* 区切り線 */}
        <div className="border-t border-line" />

        {/* 関連コラム */}
        {otherColumns.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Newspaper className="w-5 h-5" style={{ color: "#dfb664" }} />
              <h2 className="text-[18px] font-bold text-white">関連コラム</h2>
            </div>
            <div className="space-y-3">
              {otherColumns.map((other) => (
                <Link
                  key={other.id}
                  href={`/news/columns/${other.id}`}
                  className="block rounded-lg border border-line p-4 hover:border-line-dark transition-colors group"
                  style={{ backgroundColor: "#1e1e1e" }}
                >
                  <span
                    className="text-[11px] font-bold px-2 py-0.5 rounded-full inline-block mb-2"
                    style={{ backgroundColor: "rgba(223,182,100,0.2)", color: "#dfb664" }}
                  >
                    {other.publication}
                  </span>
                  <h3 className="text-[15px] font-bold text-white group-hover:text-red transition-colors leading-snug">
                    {other.title}
                  </h3>
                  <p className="text-[12px] text-black-500 mt-1">{other.date}</p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </FadeIn>
  );
}
