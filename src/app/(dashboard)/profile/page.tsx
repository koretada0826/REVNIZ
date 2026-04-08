"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { Save, Upload, Plus, X as XIcon, Check, MessageSquare, Trash2, Edit3, ChevronDown, Eye, Edit2, MapPin, Globe, Briefcase, Calendar, ExternalLink, Send, Users, Handshake, Shield, TrendingUp } from "lucide-react";
import { toast } from "sonner";
import FadeIn from "@/components/motion/FadeIn";
import AnimatedNumber from "@/components/ui/AnimatedNumber";
import { consultations } from "@/data/mock";

function Accordion({ title, defaultOpen = true, children }: { title: string; defaultOpen?: boolean; children: React.ReactNode }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="card !p-0 overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-3 sm:px-6 py-2.5 sm:py-4 hover:bg-white/5 transition-colors cursor-pointer"
      >
        <h3 className="h3 !text-[15px] sm:!text-[1.5rem] !mb-0">{title}</h3>
        <ChevronDown className={`w-5 h-5 text-white/40 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>
      <div
        className="transition-all duration-300 ease-in-out overflow-hidden"
        style={{ maxHeight: open ? "1000px" : "0px", opacity: open ? 1 : 0 }}
      >
        <div className="px-3 sm:px-6 pb-3 sm:pb-6">
          {children}
        </div>
      </div>
    </div>
  );
}

export default function ProfilePage() {
  const [mode, setMode] = useState<"edit" | "preview">("edit");
  const myPosts = consultations.filter((c) => c.companyId === "1");
  const [posts, setPosts] = useState(myPosts);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");

  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  const [companyName, setCompanyName] = useState("南九州テクノロジーズ");
  const [industry, setIndustry] = useState("IT・テクノロジー");
  const [customIndustry, setCustomIndustry] = useState("");
  const [location, setLocation] = useState("鹿児島市");
  const [website, setWebsite] = useState("https://example.com");
  const [description, setDescription] = useState("中小企業のDX推進を支援するIT企業。クラウドシステム構築からデータ活用まで、一気通貫でサポートします。");
  const [contactName, setContactName] = useState("田中 太郎");
  const [canProvide, setCanProvide] = useState(["DXコンサルティング", "システム開発", "データ活用支援"]);
  const [lookingFor, setLookingFor] = useState(["地場企業との協業", "販路拡大パートナー"]);
  const [np, setNp] = useState(""); const [nl, setNl] = useState("");

  // プロフィール充足率を動的に計算
  const completionRate = (() => {
    const fields = [
      companyName.trim().length > 0,
      industry === "その他" ? customIndustry.trim().length > 0 : industry.trim().length > 0,
      location.trim().length > 0,
      website.trim().length > 0,
      description.trim().length > 0,
      canProvide.length > 0,
      lookingFor.length > 0,
      contactName.trim().length > 0,
    ];
    return Math.round((fields.filter(Boolean).length / fields.length) * 100);
  })();

  const completionHint = (() => {
    if (!companyName.trim()) return "「企業名」を入力してください";
    if (!description.trim()) return "「企業紹介」を入力してください";
    if (canProvide.length === 0) return "「提供できること」を追加してください";
    if (lookingFor.length === 0) return "「探していること」を追加するとマッチング精度が向上します";
    if (!contactName.trim()) return "「担当者名」を入力してください";
    if (!website.trim()) return "「WebサイトURL」を入力してください";
    return "すべての項目が入力済みです";
  })();

  const addTag = (list: string[], set: (v: string[]) => void, val: string, clear: () => void) => {
    if (val.trim()) { set([...list, val.trim()]); clear(); }
  };

  return (
    <FadeIn><div className="max-w-2xl mx-auto space-y-3 sm:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <p className="label">Profile</p>
          <h1 className="h1 whitespace-nowrap">自社プロフィール{mode === "edit" ? "編集" : "プレビュー"}</h1>
          <p className="body mt-3 hidden sm:block">{mode === "edit" ? "情報を充実させるほど、マッチング精度が上がります" : "他社から見たプロフィールの表示です"}</p>
        </div>
        <div className="flex gap-2 shrink-0">
          <button
            onClick={() => setMode("edit")}
            className={`text-[14px] px-5 py-2.5 rounded-md font-bold inline-flex items-center transition-colors ${mode === "edit" ? "bg-white text-black" : "btn-outline"}`}
          >
            <Edit2 className="w-4 h-4 mr-2" /> 編集
          </button>
          <button
            onClick={() => setMode("preview")}
            className={`text-[14px] px-5 py-2.5 rounded-md font-bold inline-flex items-center transition-colors ${mode === "preview" ? "bg-white text-black" : "btn-outline"}`}
          >
            <Eye className="w-4 h-4 mr-2" /> プレビュー
          </button>
        </div>
      </div>


      {mode === "preview" ? (
        /* ===== プレビューモード ===== */
        <div className="space-y-5">
          {/* ヘッダーカード */}
          <div className="card p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row gap-5 sm:gap-6">
              <div className="avatar-xl shrink-0">{companyName.charAt(0) || "?"}</div>
              <div className="flex-1 min-w-0">
                <h2 className="h1">{companyName || "（企業名未設定）"}</h2>
                <p className="text-[16px] text-black-400 mt-2">{description ? description.slice(0, 60) + (description.length > 60 ? "..." : "") : "（企業紹介未設定）"}</p>
                <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mt-5">
                  <span className="flex items-center gap-2 text-[14px] text-black-400"><Briefcase className="w-4 h-4 text-black-300" /> {industry === "その他" && customIndustry ? customIndustry : industry}</span>
                  <span className="flex items-center gap-2 text-[14px] text-black-400"><MapPin className="w-4 h-4 text-black-300" /> {location || "未設定"}</span>
                  <span className="flex items-center gap-2 text-[14px] text-black-400"><Calendar className="w-4 h-4 text-black-300" /> 2024〜</span>
                  {website && (
                    <a href={website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-[14px] text-red font-medium hover:opacity-80 transition-colors">
                      <Globe className="w-4 h-4" /> Web <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-5">
            <div className="lg:col-span-2 space-y-5">
              {/* 事業紹介 */}
              <div className="card">
                <h2 className="h2 mb-5">事業紹介</h2>
                <p className="body leading-[1.8]">{description || "（未設定）"}</p>
              </div>

              {/* 提供できること */}
              <div className="card">
                <h2 className="h2 mb-5">提供できること</h2>
                {canProvide.length > 0 ? (
                  <div className="grid sm:grid-cols-3 gap-3">
                    {canProvide.map((i) => (
                      <div key={i} className="rounded-md bg-black-50 border border-line p-4">
                        <p className="text-[15px] font-semibold text-black-900">{i}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-[14px] text-black-300">（未設定）</p>
                )}
              </div>

              {/* 探していること */}
              <div className="card">
                <h2 className="h2 mb-5">探していること</h2>
                {lookingFor.length > 0 ? (
                  <div className="grid sm:grid-cols-3 gap-3">
                    {lookingFor.map((i) => (
                      <div key={i} className="rounded-md bg-emerald-50 border border-emerald-100 p-4">
                        <p className="text-[15px] font-semibold text-black-900">{i}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-[14px] text-black-300">（未設定）</p>
                )}
              </div>
            </div>

            {/* サイドバー */}
            <div className="space-y-4">
              <div className="card space-y-3">
                <span className="label-muted">アクション</span>
                <button className="btn-red w-full" disabled><Send className="w-4 h-4 mr-2" /> 面談を依頼する</button>
                <button className="btn-outline w-full" disabled><Users className="w-4 h-4 mr-2" /> 紹介を依頼する</button>
                <button className="btn-ghost w-full border border-line" disabled><MessageSquare className="w-4 h-4 mr-2" /> 運営に相談する</button>
                <p className="text-[11px] text-black-300 text-center">※プレビューのためボタンは無効です</p>
              </div>

              <div className="card">
                <span className="label-muted">担当者</span>
                <div className="flex items-center gap-4 mt-3">
                  <div className="avatar-md">{contactName.charAt(0) || "?"}</div>
                  <div>
                    <p className="text-[15px] font-semibold text-black-900">{contactName || "（未設定）"}</p>
                    <p className="text-[13px] text-black-400">{companyName}</p>
                  </div>
                </div>
              </div>

              <div className="card">
                <span className="label-muted">活動状況</span>
                <div className="space-y-0 mt-3 divide-y divide-line">
                  {[
                    { l: "イベント参加", v: "0回", icon: Calendar },
                    { l: "相談投稿", v: `${posts.length}件`, icon: MessageSquare },
                    { l: "面談実施", v: "0件", icon: TrendingUp },
                  ].map((x) => (
                    <div key={x.l} className="flex items-center justify-between py-4">
                      <span className="text-[14px] text-black-400 flex items-center gap-2">
                        <x.icon className="w-4 h-4 text-black-300" /> {x.l}
                      </span>
                      <span className="text-[16px] font-bold text-black-900 tabular-nums">{x.v}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="text-center pt-4">
            <button onClick={() => setMode("edit")} className="btn-primary text-[14px] px-8 py-3">
              <Edit2 className="w-4 h-4 mr-2" /> 編集に戻る
            </button>
          </div>
        </div>
      ) : (
      /* ===== 編集モード ===== */
      <>
      <form className="space-y-3 sm:space-y-5">
        <Accordion title="基本情報">
          <div className="flex items-center gap-2 sm:gap-5 mb-2 sm:mb-6">
            {logoUrl ? (
              <img src={logoUrl} alt="ロゴ" className="w-10 h-10 sm:w-14 sm:h-14 rounded-md object-cover shrink-0 border border-line" />
            ) : (
              <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-md bg-black-700 flex items-center justify-center shrink-0 border border-line font-bold text-white text-[14px] sm:text-[16px]">{companyName.charAt(0)}</div>
            )}
            <input
              type="file"
              accept="image/*"
              className="hidden"
              id="logo-upload"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  const url = URL.createObjectURL(file);
                  setLogoUrl(url);
                  toast.success("ロゴを設定しました");
                }
              }}
            />
            <button type="button" onClick={() => document.getElementById("logo-upload")?.click()} className="btn-outline btn-sm text-[11px] sm:text-[13px] px-2.5 sm:px-4 py-1.5 sm:py-2">
              <Upload className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" /> {logoUrl ? "ロゴを変更" : "ロゴアップロード"}
            </button>
          </div>
          <div className="grid grid-cols-2 gap-2 sm:gap-4">
            <div><label className="text-[10px] sm:text-[11px] font-bold text-black-400 block mb-0.5 sm:mb-2">企業名</label><input type="text" className="input py-2 sm:py-3.5 text-[13px] sm:text-[15px]" value={companyName} onChange={(e) => setCompanyName(e.target.value)} /></div>
            <div>
              <label className="text-[10px] sm:text-[11px] font-bold text-black-400 block mb-0.5 sm:mb-2">業種</label>
              <select className="input py-2 sm:py-3.5 text-[13px] sm:text-[15px]" value={industry} onChange={(e) => { setIndustry(e.target.value); if (e.target.value !== "その他") setCustomIndustry(""); }}>
                <option>IT・テクノロジー</option><option>食品・飲料</option><option>広告・クリエイティブ</option><option>建設・不動産</option><option>人材・HR</option><option>マーケティング</option><option>その他</option>
              </select>
              {industry === "その他" && (
                <input
                  type="text"
                  className="input py-2 sm:py-3.5 text-[13px] sm:text-[15px] mt-2"
                  placeholder="業種を入力してください"
                  value={customIndustry}
                  onChange={(e) => setCustomIndustry(e.target.value)}
                />
              )}
            </div>
            <div><label className="text-[10px] sm:text-[11px] font-bold text-black-400 block mb-0.5 sm:mb-2">所在地</label><input type="text" className="input py-2 sm:py-3.5 text-[13px] sm:text-[15px]" value={location} onChange={(e) => setLocation(e.target.value)} /></div>
            <div><label className="text-[10px] sm:text-[11px] font-bold text-black-400 block mb-0.5 sm:mb-2">WebサイトURL</label><input type="url" className="input py-2 sm:py-3.5 text-[13px] sm:text-[15px]" value={website} onChange={(e) => setWebsite(e.target.value)} /></div>
          </div>
        </Accordion>

        <Accordion title="企業紹介">
          <textarea className="input min-h-[80px] sm:min-h-[130px] resize-y text-[14px] sm:text-[15px]" value={description} onChange={(e) => setDescription(e.target.value)} />
        </Accordion>

        <Accordion title="提供できること">
          <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-3 sm:mb-4">
            {canProvide.map((t) => (
              <span key={t} className="inline-flex items-center gap-1.5 sm:gap-2 rounded-md bg-black-50 border border-line px-3 sm:px-4 py-1.5 sm:py-2 text-[12px] sm:text-[14px] font-medium text-black-700">
                {t}
                <button type="button" onClick={() => setCanProvide(canProvide.filter((x) => x !== t))} className="hover:bg-black-200 rounded-full p-0.5 transition-colors"><XIcon className="w-2.5 sm:w-3 h-2.5 sm:h-3" /></button>
              </span>
            ))}
          </div>
          <div className="flex gap-2">
            <input type="text" className="input flex-1 py-2 sm:py-3.5 text-[13px] sm:text-[15px]" placeholder="追加する項目" value={np} onChange={(e) => setNp(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addTag(canProvide, setCanProvide, np, () => setNp("")); } }} />
            <button type="button" onClick={() => addTag(canProvide, setCanProvide, np, () => setNp(""))} className="btn-icon border border-line rounded-md"><Plus className="w-5 h-5" /></button>
          </div>
        </Accordion>

        <Accordion title="探していること">
          <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-3 sm:mb-4">
            {lookingFor.map((t) => (
              <span key={t} className="inline-flex items-center gap-1.5 sm:gap-2 rounded-md bg-emerald-50 border border-emerald-100 px-3 sm:px-4 py-1.5 sm:py-2 text-[12px] sm:text-[14px] font-medium text-emerald-700">
                {t}
                <button type="button" onClick={() => setLookingFor(lookingFor.filter((x) => x !== t))} className="hover:bg-emerald-200 rounded-full p-0.5 transition-colors"><XIcon className="w-2.5 sm:w-3 h-2.5 sm:h-3" /></button>
              </span>
            ))}
          </div>
          <div className="flex gap-2">
            <input type="text" className="input flex-1 py-2 sm:py-3.5 text-[13px] sm:text-[15px]" placeholder="追加する項目" value={nl} onChange={(e) => setNl(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addTag(lookingFor, setLookingFor, nl, () => setNl("")); } }} />
            <button type="button" onClick={() => addTag(lookingFor, setLookingFor, nl, () => setNl(""))} className="btn-icon border border-line rounded-md"><Plus className="w-5 h-5" /></button>
          </div>
        </Accordion>

        <Accordion title="担当者情報">
          <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
            <div><label className="label-muted mb-1 sm:mb-2">担当者名</label><input type="text" className="input py-2.5 sm:py-3.5 text-[14px] sm:text-[15px]" value={contactName} onChange={(e) => setContactName(e.target.value)} /></div>
            <div><label className="label-muted mb-1 sm:mb-2">公開範囲</label><select className="input py-2.5 sm:py-3.5 text-[14px] sm:text-[15px]" defaultValue="members"><option value="members">会員のみ</option><option value="admin">運営のみ</option></select></div>
          </div>
        </Accordion>

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
            <div className="text-[40px] mb-3">📋</div>
            <p className="text-[16px] font-bold text-white/60 mb-2">まだ相談を投稿していません</p>
            <p className="text-[13px] text-white/30 mb-4">困っていることを投稿して、スポンサー企業とつながりましょう</p>
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
                        className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-white/10 transition-colors"
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
      </>
      )}
    </div></FadeIn>
  );
}
