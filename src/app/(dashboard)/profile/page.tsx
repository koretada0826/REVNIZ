"use client";

import { useState } from "react";
import Link from "next/link";
import { Save, Upload, Plus, X, Check, MessageSquare, Trash2, Edit3 } from "lucide-react";
import { toast } from "sonner";
import FadeIn from "@/components/motion/FadeIn";
import AnimatedNumber from "@/components/ui/AnimatedNumber";
import { consultations } from "@/data/mock";

export default function ProfilePage() {
  const myPosts = consultations.filter((c) => c.companyId === "1");
  const [posts, setPosts] = useState(myPosts);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");

  const [canProvide, setCanProvide] = useState(["DXコンサルティング", "システム開発", "データ活用支援"]);
  const [lookingFor, setLookingFor] = useState(["地場企業との協業", "販路拡大パートナー"]);
  const [np, setNp] = useState(""); const [nl, setNl] = useState("");

  const addTag = (list: string[], set: (v: string[]) => void, val: string, clear: () => void) => {
    if (val.trim()) { set([...list, val.trim()]); clear(); }
  };

  return (
    <FadeIn><div className="max-w-2xl mx-auto space-y-3 sm:space-y-6">
      <div>
        <p className="label">Profile</p>
        <h1 className="h1">自社プロフィール編集</h1>
        <p className="body mt-3 hidden sm:block">情報を充実させるほど、マッチング精度が上がります</p>
      </div>

      {/* Progress */}
      <div className="card-red p-0 overflow-hidden">
        <div className="px-4 py-3 sm:p-6">
          <div className="flex items-center justify-between mb-2 sm:mb-4">
            <span className="label mb-0">プロフィール充足率</span>
            <span className="text-[22px] sm:text-[28px] font-bold text-black-900 leading-none tracking-tight"><AnimatedNumber value={75} suffix="%" /></span>
          </div>
          <div className="progress-bar h-1.5 sm:h-2 mb-2 sm:mb-3">
            <div className="progress-fill bg-red w-3/4" />
          </div>
          <p className="text-[11px] sm:text-[13px] text-black-400 flex items-center gap-1.5"><Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-black-400" /> 「探していること」を追加するとマッチング精度が向上します</p>
        </div>
      </div>

      <form className="space-y-3 sm:space-y-5">
        <div className="card" style={{ padding: "" }}>
          <h3 className="h3 mb-3 sm:mb-6 !text-[15px] sm:!text-[1.5rem]">基本情報</h3>
          <div className="flex items-center gap-3 sm:gap-5 mb-3 sm:mb-6">
            <div className="avatar-md sm:avatar-lg">{`南`}</div>
            <button type="button" className="btn-outline btn-sm text-[12px] sm:text-[13px]"><Upload className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1.5 sm:mr-2" /> ロゴをアップロード</button>
          </div>
          <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
            <div><label className="label-muted mb-1 sm:mb-2">企業名</label><input type="text" className="input py-2.5 sm:py-3.5 text-[14px] sm:text-[15px]" defaultValue="南九州テクノロジーズ" /></div>
            <div><label className="label-muted mb-1 sm:mb-2">業種</label><select className="input py-2.5 sm:py-3.5 text-[14px] sm:text-[15px]" defaultValue="IT・テクノロジー"><option>IT・テクノロジー</option><option>食品・飲料</option><option>広告・クリエイティブ</option><option>建設・不動産</option><option>人材・HR</option><option>マーケティング</option></select></div>
            <div><label className="label-muted mb-1 sm:mb-2">所在地</label><input type="text" className="input py-2.5 sm:py-3.5 text-[14px] sm:text-[15px]" defaultValue="鹿児島市" /></div>
            <div><label className="label-muted mb-1 sm:mb-2">WebサイトURL</label><input type="url" className="input py-2.5 sm:py-3.5 text-[14px] sm:text-[15px]" defaultValue="https://example.com" /></div>
          </div>
        </div>

        <div className="card">
          <h3 className="h3 mb-3 sm:mb-6 !text-[15px] sm:!text-[1.5rem]">企業紹介</h3>
          <textarea className="input min-h-[80px] sm:min-h-[130px] resize-y text-[14px] sm:text-[15px]" defaultValue="中小企業のDX推進を支援するIT企業。クラウドシステム構築からデータ活用まで、一気通貫でサポートします。" />
        </div>

        <div className="card">
          <h3 className="h3 mb-3 sm:mb-6 !text-[15px] sm:!text-[1.5rem]">提供できること</h3>
          <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-3 sm:mb-4">
            {canProvide.map((t) => (
              <span key={t} className="inline-flex items-center gap-1.5 sm:gap-2 rounded-md bg-black-50 border border-line px-3 sm:px-4 py-1.5 sm:py-2 text-[12px] sm:text-[14px] font-medium text-black-700">
                {t}
                <button type="button" onClick={() => setCanProvide(canProvide.filter((x) => x !== t))} className="hover:bg-black-200 rounded-full p-0.5 transition-colors"><X className="w-2.5 sm:w-3 h-2.5 sm:h-3" /></button>
              </span>
            ))}
          </div>
          <div className="flex gap-2">
            <input type="text" className="input flex-1 py-2 sm:py-3.5 text-[13px] sm:text-[15px]" placeholder="追加する項目" value={np} onChange={(e) => setNp(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addTag(canProvide, setCanProvide, np, () => setNp("")); } }} />
            <button type="button" onClick={() => addTag(canProvide, setCanProvide, np, () => setNp(""))} className="btn-icon border border-line rounded-md"><Plus className="w-5 h-5" /></button>
          </div>
        </div>

        <div className="card">
          <h3 className="h3 mb-3 sm:mb-6 !text-[15px] sm:!text-[1.5rem]">探していること</h3>
          <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-3 sm:mb-4">
            {lookingFor.map((t) => (
              <span key={t} className="inline-flex items-center gap-1.5 sm:gap-2 rounded-md bg-emerald-50 border border-emerald-100 px-3 sm:px-4 py-1.5 sm:py-2 text-[12px] sm:text-[14px] font-medium text-emerald-700">
                {t}
                <button type="button" onClick={() => setLookingFor(lookingFor.filter((x) => x !== t))} className="hover:bg-emerald-200 rounded-full p-0.5 transition-colors"><X className="w-2.5 sm:w-3 h-2.5 sm:h-3" /></button>
              </span>
            ))}
          </div>
          <div className="flex gap-2">
            <input type="text" className="input flex-1 py-2 sm:py-3.5 text-[13px] sm:text-[15px]" placeholder="追加する項目" value={nl} onChange={(e) => setNl(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addTag(lookingFor, setLookingFor, nl, () => setNl("")); } }} />
            <button type="button" onClick={() => addTag(lookingFor, setLookingFor, nl, () => setNl(""))} className="btn-icon border border-line rounded-md"><Plus className="w-5 h-5" /></button>
          </div>
        </div>

        <div className="card">
          <h3 className="h3 mb-3 sm:mb-6 !text-[15px] sm:!text-[1.5rem]">担当者情報</h3>
          <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
            <div><label className="label-muted mb-1 sm:mb-2">担当者名</label><input type="text" className="input py-2.5 sm:py-3.5 text-[14px] sm:text-[15px]" defaultValue="田中 太郎" /></div>
            <div><label className="label-muted mb-1 sm:mb-2">公開範囲</label><select className="input py-2.5 sm:py-3.5 text-[14px] sm:text-[15px]" defaultValue="members"><option value="members">会員のみ</option><option value="admin">運営のみ</option></select></div>
          </div>
        </div>

        <div className="flex gap-3 pt-1 sm:pt-3">
          <button type="button" onClick={() => toast.success("プロフィールを保存しました")} className="btn-primary text-[14px] sm:text-[15px] px-6 sm:px-8 py-3 sm:py-3.5"><Save className="w-4 sm:w-5 h-4 sm:h-5 mr-2" /> 保存する</button>
          <button type="button" className="btn-outline text-[13px] px-4 sm:px-5 py-3">下書き保存</button>
        </div>
      </form>

      {/* 自社の相談管理 */}
      <div className="section-header mt-10">
        <h2 className="h2">自社の相談管理</h2>
        <Link href="/board" className="text-[14px] font-semibold text-black-400 hover:text-white transition-colors">
          掲示板を見る →
        </Link>
      </div>
      <div className="rounded-xl overflow-hidden" style={{ background: "#1e1e1e", border: "1px solid #333" }}>
        <div className="px-6 py-4 flex items-center justify-between" style={{ borderBottom: "1px solid #333" }}>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: "rgba(200,16,46,0.15)" }}>
              <MessageSquare className="w-4 h-4" style={{ color: "#C8102E" }} />
            </div>
            <div>
              <h3 className="text-[16px] font-bold text-white">自社の相談一覧</h3>
              <p className="text-[11px] text-white/40">{posts.length}件の投稿</p>
            </div>
          </div>
          <Link href="/board" className="text-[12px] font-bold" style={{ color: "#C8102E" }}>
            掲示板を見る →
          </Link>
        </div>

        {posts.length === 0 ? (
          <div className="p-8 text-center">
            <p className="text-[14px] text-white/40 mb-4">まだ相談を投稿していません</p>
            <Link href="/board" className="btn-primary text-[14px] px-6 py-2.5">
              <Plus className="w-4 h-4 mr-2" /> 相談を投稿する
            </Link>
          </div>
        ) : (
          <div className="divide-y divide-white/5">
            {posts.map((p) => (
              <div key={p.id} className="px-6 py-4">
                {editingId === p.id ? (
                  /* 編集モード */
                  <div className="space-y-3">
                    <input
                      type="text"
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                      className="input text-[14px] py-2.5"
                      placeholder="タイトル"
                    />
                    <textarea
                      value={editContent}
                      onChange={(e) => setEditContent(e.target.value)}
                      className="input text-[14px] py-2.5 resize-none"
                      rows={3}
                      placeholder="内容"
                    />
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          setPosts(posts.map((x) =>
                            x.id === p.id ? { ...x, title: editTitle, content: editContent } : x
                          ));
                          setEditingId(null);
                          toast.success("相談を更新しました");
                        }}
                        className="btn-primary text-[13px] px-5 py-2"
                      >
                        <Check className="w-3.5 h-3.5 mr-1.5" /> 保存
                      </button>
                      <button
                        type="button"
                        onClick={() => setEditingId(null)}
                        className="btn-outline text-[13px] px-5 py-2"
                      >
                        キャンセル
                      </button>
                    </div>
                  </div>
                ) : (
                  /* 表示モード */
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span
                          className="text-[10px] font-bold px-2 py-0.5 rounded-full text-white"
                          style={{ background: "#C8102E" }}
                        >
                          {p.category}
                        </span>
                        <span className="text-[11px] text-white/30">{p.createdAt}</span>
                      </div>
                      <p className="text-[14px] font-bold text-white leading-snug mb-1">{p.title}</p>
                      <p className="text-[12px] text-white/50 line-clamp-1">{p.content}</p>
                      <div className="flex items-center gap-3 mt-2">
                        <span className="text-[11px] font-bold" style={{ color: "#dfb664" }}>
                          {p.responses}件の反応
                        </span>
                        {p.targetArea && (
                          <span className="text-[11px] text-white/30">{p.targetArea}</span>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 shrink-0">
                      <button
                        type="button"
                        onClick={() => {
                          setEditingId(p.id);
                          setEditTitle(p.title);
                          setEditContent(p.content);
                        }}
                        className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-white/10 transition-colors"
                        title="編集"
                      >
                        <Edit3 className="w-4 h-4 text-white/50" />
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          if (confirm("この相談を削除しますか？")) {
                            setPosts(posts.filter((x) => x.id !== p.id));
                            toast.success("相談を削除しました");
                          }
                        }}
                        className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-red/10 transition-colors"
                        title="削除"
                      >
                        <Trash2 className="w-4 h-4" style={{ color: "#ff6b6b" }} />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div></FadeIn>
  );
}
