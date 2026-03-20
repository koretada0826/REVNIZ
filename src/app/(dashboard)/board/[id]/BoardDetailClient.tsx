"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, MapPin, Clock, MessageSquare } from "lucide-react";
import { toast } from "sonner";
import { consultations, companies } from "@/data/mock";
import FadeIn from "@/components/motion/FadeIn";

export default function BoardDetailClient() {
  const { id } = useParams();
  const post = consultations.find((p) => p.id === id);

  if (!post) {
    return (
      <div className="text-center py-20">
        <p className="text-[18px] text-black-400">相談が見つかりませんでした</p>
        <Link href="/board" className="btn-outline mt-4 inline-flex">← 掲示板に戻る</Link>
      </div>
    );
  }

  const company = companies.find((c) => c.id === post.companyId);

  return (
    <FadeIn>
      <div className="max-w-3xl mx-auto space-y-6">
        {/* 戻るリンク */}
        <Link href="/board" className="inline-flex items-center gap-2 text-[14px] text-black-400 hover:text-white transition-colors">
          <ArrowLeft className="w-4 h-4" /> 掲示板に戻る
        </Link>

        {/* 企業ロゴ */}
        <div className="rounded-lg overflow-hidden border border-line bg-white">
          {company ? (
            <div className="flex items-center justify-center py-8">
              <img src={company.logo} alt={company.name} className="max-w-[60%] max-h-[100px] object-contain" />
            </div>
          ) : (
            <div className="flex items-center justify-center py-8">
              <span className="text-[36px] font-bold text-black-900">{post.companyName.charAt(0)}</span>
            </div>
          )}
        </div>

        {/* メイン情報 */}
        <div className="card p-8">
          {/* カテゴリ + メタ */}
          <div className="flex items-center gap-3 mb-4">
            <span className="inline-block text-white text-[14px] font-bold px-3 py-1 bg-red rounded">{post.category}</span>
            {post.deadline && (
              <span className="text-[14px] text-black-400 font-medium flex items-center gap-1">
                <Clock className="w-4 h-4" /> 締切: {post.deadline}
              </span>
            )}
            <span className="text-[14px] text-black-400 font-medium flex items-center gap-1">
              <MapPin className="w-4 h-4" /> {post.targetArea}
            </span>
          </div>

          {/* キーワード見出し */}
          {post.keywords && post.keywords.length > 0 && (
            <div className="flex flex-wrap gap-x-4 gap-y-1 mb-4">
              {post.keywords.map((kw, i) => (
                <span key={i} className="text-red text-[28px] font-black">{kw}</span>
              ))}
            </div>
          )}

          {/* タイトル */}
          <h1 className="text-[22px] font-extrabold text-white mb-6 leading-snug">{post.title}</h1>

          {/* 本文 */}
          <div className="mb-6">
            <p className="text-[11px] font-bold tracking-[0.08em] uppercase text-black-400 mb-2">相談内容</p>
            <p className="text-[16px] text-white font-bold leading-relaxed">{post.content}</p>
          </div>

          {/* 課題・募集 */}
          {post.challenge && (
            <div className="mb-4">
              <p className="text-[11px] font-bold tracking-[0.08em] uppercase text-black-400 mb-2">課題</p>
              <p className="text-[15px] text-white font-bold leading-relaxed">{post.challenge}</p>
            </div>
          )}
          {post.lookingFor && (
            <div className="mb-6">
              <p className="text-[11px] font-bold tracking-[0.08em] uppercase text-black-400 mb-2">求めている企業</p>
              <p className="text-[15px] text-white font-bold leading-relaxed">{post.lookingFor}</p>
            </div>
          )}

          {/* タグ */}
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {post.tags.map((tag) => (
                <span key={tag} className="text-[13px] font-bold text-white bg-white/15 px-3 py-1.5 rounded-full">#{tag}</span>
              ))}
            </div>
          )}

          {/* 企業情報 */}
          <div className="border-t border-line pt-5 mb-6">
            <div className="flex items-center gap-4">
              {company && (
                <div className="w-12 h-12 rounded-lg bg-white flex items-center justify-center p-1.5">
                  <img src={company.logo} alt={company.name} className="max-w-full max-h-full object-contain" />
                </div>
              )}
              <div>
                <p className="text-[16px] font-bold text-white">{post.companyName}</p>
                <p className="text-[13px] text-black-400">{company?.industry || ""} · {post.targetArea} · 投稿日 {post.createdAt}</p>
              </div>
              <div className="ml-auto flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-black-400" />
                <span className="text-[20px] font-bold text-white tabular-nums">{post.responses}</span>
                <span className="text-[11px] text-black-300 uppercase tracking-wide font-bold">反応</span>
              </div>
            </div>
          </div>

          {/* お問い合わせボタン */}
          <button
            onClick={() => toast("お問い合わせフォームを準備中です")}
            className="w-full py-3 text-[16px] font-bold text-white rounded-md transition-colors inline-flex items-center justify-center cursor-pointer hover:opacity-90"
            style={{ backgroundColor: "#dfb664" }}
          >
            この相談にお問い合わせする
          </button>
        </div>
      </div>
    </FadeIn>
  );
}
