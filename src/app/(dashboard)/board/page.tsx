"use client";

import Link from "next/link";
import { Plus, MessageSquare, Clock, TrendingUp, ChevronRight, MapPin, Search, SlidersHorizontal, X, Trash2, User, ArrowUpDown, Tag, Ban } from "lucide-react";
import { toast } from "sonner";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { consultations, companies } from "@/data/mock";
import FadeIn from "@/components/motion/FadeIn";

const categories = ["すべて", "販路拡大", "採用", "DX", "イベント"];
const postCategories = ["販路拡大", "採用", "DX", "イベント", "コラボ", "その他"];

export default function BoardPage() {
  return (
    <Suspense fallback={null}>
      <BoardContent />
    </Suspense>
  );
}

function BoardContent() {
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("すべて");
  const [showForm, setShowForm] = useState(false);
  const [showMyPosts, setShowMyPosts] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [filterAreas, setFilterAreas] = useState<string[]>([]);
  const [filterDeadline, setFilterDeadline] = useState("すべて");
  const [filterResponses, setFilterResponses] = useState("すべて");
  const [filterDate, setFilterDate] = useState("すべて");
  const [filterIndustry, setFilterIndustry] = useState("すべて");
  const [filterTags, setFilterTags] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("新着順");
  const [excludeQuery, setExcludeQuery] = useState("");
  const [posts, setPosts] = useState(consultations);

  const allAreas = Array.from(new Set(consultations.map((c) => c.targetArea)));
  const allIndustries = ["すべて", ...Array.from(new Set(companies.map((c) => c.industry)))];
  const allTags = Array.from(new Set(consultations.flatMap((c) => c.tags || [])));
  const activeFilterCount = [
    filterAreas.length > 0 ? "active" : "すべて",
    filterDeadline,
    filterResponses,
    filterDate,
    filterIndustry,
    filterTags.length > 0 ? "active" : "すべて",
    sortBy !== "新着順" ? "active" : "すべて",
    excludeQuery.trim() ? "active" : "すべて",
  ].filter((v) => v !== "すべて").length;

  useEffect(() => {
    if (searchParams.get("my") === "true") {
      setShowMyPosts(true);
    }
  }, [searchParams]);

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
    const matchExclude = !excludeQuery.trim()
      || !(p.title.includes(excludeQuery) || p.content.includes(excludeQuery) || p.companyName.includes(excludeQuery));
    const matchCategory = selectedCategory === "すべて" || p.category === selectedCategory;
    const matchMyPosts = !showMyPosts || p.companyId === "1";
    const matchArea = filterAreas.length === 0 || filterAreas.includes(p.targetArea);
    const matchIndustry = (() => {
      if (filterIndustry === "すべて") return true;
      const company = companies.find((c) => c.id === p.companyId);
      return company?.industry === filterIndustry;
    })();
    const matchTags = filterTags.length === 0 || filterTags.some((t) => p.tags?.includes(t));
    const matchDeadline = (() => {
      if (filterDeadline === "すべて") return true;
      if (filterDeadline === "あり") return !!p.deadline;
      if (filterDeadline === "締切間近") {
        if (!p.deadline) return false;
        const diff = (new Date(p.deadline).getTime() - Date.now()) / (1000 * 60 * 60 * 24);
        return diff >= 0 && diff <= 14;
      }
      return true;
    })();
    const matchResponses = (() => {
      if (filterResponses === "すべて") return true;
      if (filterResponses === "0件") return p.responses === 0;
      if (filterResponses === "1件以上") return p.responses >= 1;
      if (filterResponses === "3件以上") return p.responses >= 3;
      return true;
    })();
    const matchDate = (() => {
      if (filterDate === "すべて") return true;
      const days = (Date.now() - new Date(p.createdAt).getTime()) / (1000 * 60 * 60 * 24);
      if (filterDate === "1週間以内") return days <= 7;
      if (filterDate === "1ヶ月以内") return days <= 30;
      if (filterDate === "3ヶ月以内") return days <= 90;
      return true;
    })();
    return matchSearch && matchExclude && matchCategory && matchMyPosts && matchArea && matchIndustry && matchTags && matchDeadline && matchResponses && matchDate;
  }).sort((a, b) => {
    if (sortBy === "反応数順") return b.responses - a.responses;
    if (sortBy === "締切が近い順") {
      if (!a.deadline) return 1;
      if (!b.deadline) return -1;
      return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
    }
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
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
        <div className="flex gap-2 shrink-0">
          <button
            onClick={() => setShowMyPosts(!showMyPosts)}
            className={`shrink-0 text-[15px] px-6 py-3 rounded-md font-bold inline-flex items-center transition-colors ${showMyPosts ? "bg-white text-black" : "btn-outline"}`}
          >
            <User className="w-5 h-5 mr-2" /> 自分の相談を見る
          </button>
          <button onClick={() => setShowForm(true)} className="btn-primary shrink-0 text-[15px] px-6 py-3">
            <Plus className="w-5 h-5 mr-2" /> 相談を投稿する
          </button>
        </div>
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
            onClick={() => setShowFilter(!showFilter)}
            className={`shrink-0 gap-2 px-5 py-3.5 rounded-md font-bold inline-flex items-center transition-colors ${showFilter ? "bg-white text-black" : "btn-outline"}`}
          >
            <SlidersHorizontal className="w-4 h-4" />
            詳細条件
            {activeFilterCount > 0 && (
              <span className="ml-1 min-w-[20px] h-[20px] rounded-full bg-red text-white text-[11px] font-bold flex items-center justify-center">{activeFilterCount}</span>
            )}
          </button>
        </div>

        {/* 詳細フィルターパネル */}
        {showFilter && (
          <div className="mt-3 pt-3 space-y-4" style={{ borderTop: "1px solid #333" }}>
            {/* Row 1: セレクト系 */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div>
                <label className="block text-[11px] font-bold text-white/50 mb-1.5 uppercase tracking-wider">業種</label>
                <select value={filterIndustry} onChange={(e) => setFilterIndustry(e.target.value)} className="input py-2.5 text-[13px]">
                  {allIndustries.map((i) => <option key={i} value={i}>{i}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-[11px] font-bold text-white/50 mb-1.5 uppercase tracking-wider">募集期限</label>
                <select value={filterDeadline} onChange={(e) => setFilterDeadline(e.target.value)} className="input py-2.5 text-[13px]">
                  {["すべて", "あり", "締切間近"].map((d) => <option key={d} value={d}>{d}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-[11px] font-bold text-white/50 mb-1.5 uppercase tracking-wider">反応数</label>
                <select value={filterResponses} onChange={(e) => setFilterResponses(e.target.value)} className="input py-2.5 text-[13px]">
                  {["すべて", "0件", "1件以上", "3件以上"].map((r) => <option key={r} value={r}>{r}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-[11px] font-bold text-white/50 mb-1.5 uppercase tracking-wider">投稿日</label>
                <select value={filterDate} onChange={(e) => setFilterDate(e.target.value)} className="input py-2.5 text-[13px]">
                  {["すべて", "1週間以内", "1ヶ月以内", "3ヶ月以内"].map((d) => <option key={d} value={d}>{d}</option>)}
                </select>
              </div>
            </div>

            {/* Row 2: エリア（チェックボックス） */}
            <div>
              <label className="block text-[11px] font-bold text-white/50 mb-1.5 uppercase tracking-wider">
                <MapPin className="w-3 h-3 inline mr-1" />エリア（複数選択可）
              </label>
              <div className="flex flex-wrap gap-2">
                {allAreas.map((area) => (
                  <button
                    key={area}
                    onClick={() => setFilterAreas(filterAreas.includes(area) ? filterAreas.filter((a) => a !== area) : [...filterAreas, area])}
                    className={`text-[13px] font-bold px-4 py-1.5 rounded-full transition-colors cursor-pointer ${
                      filterAreas.includes(area)
                        ? "bg-white text-black"
                        : "bg-white/10 text-white/60 hover:bg-white/20"
                    }`}
                  >
                    {area}
                  </button>
                ))}
              </div>
            </div>

            {/* Row 3: タグ（チェックボックス） */}
            <div>
              <label className="block text-[11px] font-bold text-white/50 mb-1.5 uppercase tracking-wider">
                <Tag className="w-3 h-3 inline mr-1" />タグで絞り込み（複数選択可）
              </label>
              <div className="flex flex-wrap gap-1.5">
                {allTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setFilterTags(filterTags.includes(tag) ? filterTags.filter((t) => t !== tag) : [...filterTags, tag])}
                    className={`text-[12px] font-bold px-3 py-1 rounded-full transition-colors cursor-pointer ${
                      filterTags.includes(tag)
                        ? "bg-red text-white"
                        : "bg-white/10 text-white/50 hover:bg-white/20"
                    }`}
                  >
                    #{tag}
                  </button>
                ))}
              </div>
            </div>

            {/* Row 4: 並び替え + 除外ワード */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-bold text-white/50 mb-1.5 uppercase tracking-wider">
                  <ArrowUpDown className="w-3 h-3 inline mr-1" />並び替え
                </label>
                <div className="flex gap-2">
                  {["新着順", "反応数順", "締切が近い順"].map((s) => (
                    <button
                      key={s}
                      onClick={() => setSortBy(s)}
                      className={`text-[13px] font-bold px-4 py-2 rounded-md transition-colors cursor-pointer ${
                        sortBy === s
                          ? "bg-white text-black"
                          : "bg-white/10 text-white/60 hover:bg-white/20"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-[11px] font-bold text-white/50 mb-1.5 uppercase tracking-wider">
                  <Ban className="w-3 h-3 inline mr-1" />除外ワード
                </label>
                <input
                  type="text"
                  value={excludeQuery}
                  onChange={(e) => setExcludeQuery(e.target.value)}
                  placeholder="このワードを含む相談を除外"
                  className="input py-2.5 text-[13px]"
                />
              </div>
            </div>

            {/* リセット */}
            {activeFilterCount > 0 && (
              <div className="flex items-center justify-between pt-1">
                <span className="text-[12px] text-white/30">{activeFilterCount}件のフィルター適用中</span>
                <button
                  onClick={() => {
                    setFilterAreas([]);
                    setFilterDeadline("すべて");
                    setFilterResponses("すべて");
                    setFilterDate("すべて");
                    setFilterIndustry("すべて");
                    setFilterTags([]);
                    setSortBy("新着順");
                    setExcludeQuery("");
                  }}
                  className="text-[12px] font-bold hover:text-white transition-colors"
                  style={{ color: "#C8102E" }}
                >
                  すべてリセット
                </button>
              </div>
            )}
          </div>
        )}
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

      <div className="flex items-center justify-between">
        <p className="text-[13px] text-white/40">{filtered.length}件の相談{showMyPosts && "（自分の投稿のみ）"}</p>
      </div>

      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="text-[48px] mb-4">🔍</div>
          <p className="text-[18px] font-bold text-white/60 mb-2">該当する相談が見つかりません</p>
          <p className="text-[14px] text-white/30 mb-6">検索条件を変更するか、新しい相談を投稿してみましょう</p>
          <button onClick={() => { setSearchQuery(""); setSelectedCategory("すべて"); setShowMyPosts(false); setFilterAreas([]); setFilterDeadline("すべて"); setFilterResponses("すべて"); setFilterDate("すべて"); setFilterIndustry("すべて"); setFilterTags([]); setSortBy("新着順"); setExcludeQuery(""); }} className="btn-outline text-[14px] px-6 py-2.5">
            フィルターをリセット
          </button>
        </div>
      ) : (
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
                    className="w-full py-2 text-[14px] font-bold text-white rounded-md transition-colors inline-flex items-center justify-center cursor-pointer hover:opacity-80"
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
      )}
    </div></FadeIn>
  );
}
