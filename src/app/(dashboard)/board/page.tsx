"use client";

import Link from "next/link";
import { Plus, MessageSquare, Clock, TrendingUp, ChevronRight, MapPin, Search, SlidersHorizontal, X, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";
import { consultations, companies } from "@/data/mock";
import FadeIn from "@/components/motion/FadeIn";

const categories = ["すべて", "販路拡大", "採用", "DX", "イベント"];
const postCategories = ["販路拡大", "採用", "DX", "イベント", "コラボ", "その他"];

export default function BoardPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("すべて");
  const [showForm, setShowForm] = useState(false);
  const [posts, setPosts] = useState(consultations);

  // Form state
  const [formTitle, setFormTitle] = useState("");
  const [formContent, setFormContent] = useState("");
  const [formCategory, setFormCategory] = useState("販路拡大");
  const [formArea, setFormArea] = useState("");
  const [formDeadline, setFormDeadline] = useState("");
  const [formChallenge, setFormChallenge] = useState("");
  const [formLookingFor, setFormLookingFor] = useState("");

  const filtered = posts.filter((p) => {
    const matchSearch = !searchQuery
      || p.title.includes(searchQuery)
      || p.content.includes(searchQuery)
      || p.companyName.includes(searchQuery)
      || p.category.includes(searchQuery)
      || p.targetArea.includes(searchQuery);
    const matchCategory = selectedCategory === "すべて" || p.category === selectedCategory;
    return matchSearch && matchCategory;
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim() || !formContent.trim()) {
      toast.error("タイトルと内容を入力してください");
      return;
    }
    const newPost = {
      id: `new-${Date.now()}`,
      title: formTitle,
      content: formContent,
      category: formCategory,
      companyId: "1",
      companyName: "南九州テクノロジーズ",
      targetArea: formArea || "鹿児島",
      deadline: formDeadline || null,
      createdAt: new Date().toISOString().split("T")[0],
      responses: 0,
      tags: [],
      challenge: formChallenge,
      lookingFor: formLookingFor,
      keywords: formTitle.split(/\s+/).slice(0, 3),
    };
    setPosts([newPost, ...posts]);
    toast.success("相談を投稿しました", { description: "スポンサー企業に公開されます。反応をお待ちください。" });
    setShowForm(false);
    setFormTitle("");
    setFormContent("");
    setFormCategory("販路拡大");
    setFormArea("");
    setFormDeadline("");
    setFormChallenge("");
    setFormLookingFor("");
  };

  return (
    <FadeIn><div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <p className="label">Board</p>
          <h1 className="h1">相談・案件掲示板</h1>
          <p className="body mt-3">困っていること、探していることを投稿し、接点のきっかけを作る</p>
        </div>
        <button onClick={() => setShowForm(true)} className="btn-primary shrink-0 text-[15px] px-6 py-3">
          <Plus className="w-5 h-5 mr-2" /> 相談を投稿する
        </button>
      </div>

      {/* 投稿フォームモーダル */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center" onClick={() => setShowForm(false)}>
          <div className="absolute inset-0 bg-black/70" />
          <div
            className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto mx-4 rounded-xl"
            style={{ background: "#111", border: "1px solid #333" }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-4" style={{ background: "#111", borderBottom: "1px solid #333" }}>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: "rgba(200,16,46,0.15)" }}>
                  <MessageSquare className="w-4 h-4" style={{ color: "#C8102E" }} />
                </div>
                <h2 className="text-[18px] font-bold text-white">相談を投稿する</h2>
              </div>
              <button onClick={() => setShowForm(false)} className="w-9 h-9 rounded-lg flex items-center justify-center hover:bg-white/10 transition-colors">
                <X className="w-5 h-5 text-white/60" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              {/* タイトル */}
              <div>
                <label className="block text-[13px] font-bold text-white/70 mb-2">
                  タイトル <span style={{ color: "#C8102E" }}>*</span>
                </label>
                <input
                  type="text"
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  placeholder="例: 東京での販路拡大パートナーを探しています"
                  className="input"
                />
              </div>

              {/* カテゴリ + エリア */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[13px] font-bold text-white/70 mb-2">
                    カテゴリ <span style={{ color: "#C8102E" }}>*</span>
                  </label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value)}
                    className="input"
                  >
                    {postCategories.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-[13px] font-bold text-white/70 mb-2">対象エリア</label>
                  <input
                    type="text"
                    value={formArea}
                    onChange={(e) => setFormArea(e.target.value)}
                    placeholder="例: 鹿児島、東京"
                    className="input"
                  />
                </div>
              </div>

              {/* 課題 */}
              <div>
                <label className="block text-[13px] font-bold text-white/70 mb-2">現在の課題</label>
                <input
                  type="text"
                  value={formChallenge}
                  onChange={(e) => setFormChallenge(e.target.value)}
                  placeholder="例: 東京のセレクトショップへの卸先が見つからない"
                  className="input"
                />
              </div>

              {/* 探しているもの */}
              <div>
                <label className="block text-[13px] font-bold text-white/70 mb-2">探しているもの</label>
                <input
                  type="text"
                  value={formLookingFor}
                  onChange={(e) => setFormLookingFor(e.target.value)}
                  placeholder="例: 東京に販路を持つ卸業者、マーケティング支援"
                  className="input"
                />
              </div>

              {/* 内容 */}
              <div>
                <label className="block text-[13px] font-bold text-white/70 mb-2">
                  相談内容 <span style={{ color: "#C8102E" }}>*</span>
                </label>
                <textarea
                  value={formContent}
                  onChange={(e) => setFormContent(e.target.value)}
                  placeholder="相談の詳細を入力してください。具体的に書くほど、マッチしやすくなります。"
                  rows={5}
                  className="input resize-none"
                />
              </div>

              {/* 締切 */}
              <div>
                <label className="block text-[13px] font-bold text-white/70 mb-2">募集期限</label>
                <input
                  type="date"
                  value={formDeadline}
                  onChange={(e) => setFormDeadline(e.target.value)}
                  className="input"
                />
              </div>

              {/* ボタン */}
              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="btn-outline px-6 py-3"
                >
                  キャンセル
                </button>
                <button type="submit" className="btn-primary px-8 py-3">
                  <Plus className="w-4 h-4 mr-2" />
                  投稿する
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 検索バナー */}
      <div className="relative rounded-lg border border-line p-5" style={{ backgroundColor: "#1e1e1e" }}>
        <div className="flex items-center gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-black-400 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="キーワードで相談を検索（例: 販路拡大、東京、DX導入）"
              className="input pl-12 pr-4 py-3.5 text-[15px]"
            />
          </div>
          <button
            onClick={() => toast("詳細フィルターを準備中です")}
            className="btn-outline shrink-0 gap-2 px-5 py-3.5"
          >
            <SlidersHorizontal className="w-4 h-4" />
            詳細条件
          </button>
        </div>
        <div className="flex items-center gap-2 mt-3 flex-wrap">
          <span className="text-[13px] text-white font-bold shrink-0">人気ワード:</span>
          {["販路拡大", "DX", "コラボ", "採用", "鹿児島", "東京", "イベント", "業務提携", "人材", "マーケティング", "IT導入", "地方創生"].map((word) => (
            <button
              key={word}
              onClick={() => setSearchQuery(word)}
              className="text-[14px] text-white font-extrabold bg-white/15 hover:bg-white/25 px-4 py-2 rounded-full transition-colors cursor-pointer"
            >
              {word}
            </button>
          ))}
        </div>
      </div>

      <div className="flex gap-0 border-b border-line">
        {[{ l: "新着", i: MessageSquare }, { l: "人気", i: TrendingUp }, { l: "締切間近", i: Clock }].map((t, idx) => (
          <button key={t.l} className={`flex items-center gap-2 px-5 py-3.5 text-[14px] font-medium border-b-2 transition-colors ${idx === 0 ? "border-white text-white" : "border-transparent text-muted hover:text-white"}`}>
            <t.i className="w-4 h-4" /> {t.l}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap gap-2">{categories.map((c) => <button key={c} onClick={() => setSelectedCategory(selectedCategory === c ? "すべて" : c)} className={selectedCategory === c ? "tag-active" : "tag"}>{c}</button>)}</div>

      <div className="grid grid-cols-2 sm:grid-cols-2 gap-2 sm:gap-4">
        {filtered.map((p) => {
          const company = companies.find((c) => c.id === p.companyId);
          return (
            <Link key={p.id} href={`/board/${p.id}`} className="group relative overflow-hidden rounded-lg border border-line cursor-pointer transition-all duration-200 hover:border-line-dark bg-white block">
              <div className="absolute top-0 right-0 z-10 flex" style={{ fontSize: 0 }}>
                <span className="inline-block text-white text-[10px] sm:text-[13px] font-bold text-center px-1.5 sm:px-2.5 py-0.5 sm:py-1 bg-red">{p.category}</span>
              </div>
              <div style={{ fontSize: 0, lineHeight: 0, margin: 0, padding: 0 }}>
                {company ? (
                  <img src={company.logo} alt={company.name} className="hidden sm:block" style={{ width: "100%", height: "auto", display: "block", margin: 0, padding: 0, border: "none" }} />
                ) : (
                  <div className="hidden sm:flex items-center justify-center bg-white" style={{ height: "120px" }}>
                    <span style={{ fontSize: "36px", fontWeight: "bold", color: "#0A0A0A", lineHeight: "normal" }}>{p.companyName.charAt(0)}</span>
                  </div>
                )}
              </div>
              <div className="bg-white px-2.5 py-2 sm:px-4 sm:py-3">
                {p.keywords && p.keywords.length > 0 ? (
                  <div className="flex flex-wrap gap-x-1.5 sm:gap-x-3 gap-y-0.5 mb-1 sm:mb-2">
                    {p.keywords.map((kw, ki) => (
                      <span key={ki} className="text-red text-[14px] sm:text-[24px] font-black leading-snug">{kw}</span>
                    ))}
                  </div>
                ) : (
                  <h3 className="font-black text-red text-[14px] sm:text-[24px] mb-1 sm:mb-2 leading-snug line-clamp-2">{p.title}</h3>
                )}
                <p className="text-[11px] sm:text-[16px] text-black font-extrabold leading-relaxed line-clamp-2 mb-1 sm:mb-2">{p.content}</p>
                <div className="flex items-center justify-between mb-1.5 sm:mb-3">
                  <span className="text-[10px] sm:text-[13px] font-bold text-white">{p.companyName}</span>
                  <div className="flex items-center gap-1">
                    <span className="text-[13px] sm:text-[18px] font-bold text-white tabular-nums">{p.responses}</span>
                    <span className="text-[8px] sm:text-[10px] text-black-300 uppercase tracking-wide font-bold">反応</span>
                  </div>
                </div>
                {p.companyId === "1" ? (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                      if (confirm("この相談を削除しますか？")) {
                        setPosts((prev) => prev.filter((x) => x.id !== p.id));
                        toast.success("相談を削除しました");
                      }
                    }}
                    className="w-full py-2 text-[14px] font-bold rounded-md transition-colors inline-flex items-center justify-center cursor-pointer gap-2 hover:opacity-80"
                    style={{ backgroundColor: "#333", color: "#ff6b6b" }}
                  >
                    <Trash2 className="w-4 h-4" />
                    削除する
                  </button>
                ) : (
                  <button
                    onClick={(e) => { e.stopPropagation(); e.preventDefault(); toast("お問い合わせフォームを準備中です"); }}
                    className="w-full py-2 text-[14px] font-bold text-white rounded-md transition-colors inline-flex items-center justify-center cursor-pointer"
                    style={{ backgroundColor: "#dfb664" }}
                  >
                    お問い合わせ
                  </button>
                )}
              </div>
            </Link>
          );
        })}
      </div>
    </div></FadeIn>
  );
}
