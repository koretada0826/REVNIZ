"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, SlidersHorizontal, MapPin, Briefcase, Grid3X3, List, Heart, X } from "lucide-react";
import { companies } from "@/data/mock";

const industries = ["すべて", "IT・テクノロジー", "食品・飲料", "広告・クリエイティブ", "建設・不動産", "人材・HR", "マーケティング"];
const areas = ["すべて", "鹿児島", "東京", "九州"];

export default function CompaniesPage() {
  const [search, setSearch] = useState("");
  const [industry, setIndustry] = useState("すべて");
  const [area, setArea] = useState("すべて");
  const [view, setView] = useState<"grid" | "list">("grid");
  const [filters, setFilters] = useState(false);

  const list = companies.filter((c) => {
    const s = !search || c.name.includes(search) || c.tagline.includes(search) || c.canProvide.some((p) => p.includes(search)) || c.lookingFor.some((l) => l.includes(search));
    return s && (industry === "すべて" || c.industry === industry) && (area === "すべて" || c.area === area);
  });

  return (
    <div className="space-y-6 animate-in">
      <div className="mb-2">
        <span className="label">Companies</span>
        <h1 className="h1">スポンサー企業一覧</h1>
        <p className="body-sm mt-1.5">何ができる会社か、何を求めている会社かを比較し、接点候補を見つける</p>
      </div>

      {/* Search */}
      <div className="flex gap-2.5">
        <div className="flex-1 relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-black-200" />
          <input type="text" placeholder="企業名、キーワードで検索..." value={search} onChange={(e) => setSearch(e.target.value)} className="input pl-10" />
        </div>
        <button onClick={() => setFilters(!filters)} className={`btn-sm border ${filters ? "border-red/30 bg-red-50 text-red" : "border-line text-muted hover:text-black-900"}`}>
          <SlidersHorizontal className="w-3.5 h-3.5 mr-1.5" /> フィルター
        </button>
        <div className="hidden sm:flex rounded overflow-hidden border border-line">
          <button onClick={() => setView("grid")} className={`px-2.5 py-2 ${view === "grid" ? "bg-black-900 text-white" : "text-muted hover:text-black-900"}`}><Grid3X3 className="w-3.5 h-3.5" /></button>
          <button onClick={() => setView("list")} className={`px-2.5 py-2 ${view === "list" ? "bg-black-900 text-white" : "text-muted hover:text-black-900"}`}><List className="w-3.5 h-3.5" /></button>
        </div>
      </div>

      {filters && (
        <div className="card animate-in space-y-4">
          <div>
            <span className="label-muted mb-2">業種</span>
            <div className="flex flex-wrap gap-1.5">{industries.map((i) => <button key={i} onClick={() => setIndustry(i)} className={industry === i ? "tag-active" : "tag"}>{i}</button>)}</div>
          </div>
          <div className="h-px bg-line" />
          <div>
            <span className="label-muted mb-2">エリア</span>
            <div className="flex flex-wrap gap-1.5">{areas.map((a) => <button key={a} onClick={() => setArea(a)} className={area === a ? "tag-active" : "tag"}>{a}</button>)}</div>
          </div>
        </div>
      )}

      <div className="flex items-center gap-2">
        <p className="text-[13px] text-muted"><span className="font-bold text-black-900">{list.length}</span> 社</p>
        {industry !== "すべて" && <span className="badge-red flex items-center gap-1">{industry} <button onClick={() => setIndustry("すべて")}><X className="w-2.5 h-2.5" /></button></span>}
        {area !== "すべて" && <span className="badge-red flex items-center gap-1">{area} <button onClick={() => setArea("すべて")}><X className="w-2.5 h-2.5" /></button></span>}
      </div>

      {/* Grid */}
      {view === "grid" ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {list.map((c) => (
            <div key={c.id} className="card card-hover group">
              <div className="flex items-start justify-between mb-3">
                <div className="w-12 h-12 rounded bg-black-50 flex items-center justify-center border border-line">
                  <span className="text-[14px] font-bold text-black-900">{c.name.charAt(0)}</span>
                </div>
                <button className="btn-icon w-8 h-8 text-black-200 hover:text-red"><Heart className="w-4 h-4" /></button>
              </div>
              <h3 className="font-bold text-black-900 text-[14px] mb-0.5">{c.name}</h3>
              <p className="text-[12px] text-red font-medium mb-2.5">{c.tagline}</p>
              <div className="flex items-center gap-3 text-[11px] text-black-300 mb-4">
                <span className="flex items-center gap-1"><Briefcase className="w-3 h-3" /> {c.industry}</span>
                <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {c.area}</span>
              </div>
              <div className="space-y-2 mb-5">
                <div>
                  <p className="text-[9px] font-bold text-black-300 tracking-[0.1em] uppercase mb-1">提供</p>
                  <div className="flex flex-wrap gap-1">{c.canProvide.slice(0, 2).map((x) => <span key={x} className="badge-muted">{x}</span>)}</div>
                </div>
                <div>
                  <p className="text-[9px] font-bold text-black-300 tracking-[0.1em] uppercase mb-1">探している</p>
                  <div className="flex flex-wrap gap-1">{c.lookingFor.slice(0, 2).map((x) => <span key={x} className="badge-green">{x}</span>)}</div>
                </div>
              </div>
              <div className="flex gap-2 pt-3 border-t border-line">
                <Link href={`/companies/${c.id}`} className="btn-ghost flex-1 justify-center border border-line text-[12px]">詳細を見る</Link>
                <Link href="/meeting" className="btn-red btn-sm flex-1 justify-center text-[12px]">面談依頼</Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-2.5">
          {list.map((c) => (
            <div key={c.id} className="card card-hover flex items-center gap-5">
              <div className="w-12 h-12 rounded bg-black-50 flex items-center justify-center border border-line shrink-0">
                <span className="text-[14px] font-bold text-black-900">{c.name.charAt(0)}</span>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-black-900 text-[14px]">{c.name}</h3>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-[12px] text-red font-medium">{c.tagline}</span>
                  <span className="caption flex items-center gap-1"><MapPin className="w-3 h-3" /> {c.area}</span>
                </div>
              </div>
              <div className="hidden md:flex flex-wrap gap-1 max-w-[200px] shrink-0">{c.canProvide.slice(0, 2).map((x) => <span key={x} className="badge-muted">{x}</span>)}</div>
              <div className="flex gap-2 shrink-0">
                <Link href={`/companies/${c.id}`} className="btn-ghost border border-line text-[12px]">詳細</Link>
                <Link href="/meeting" className="btn-red btn-sm text-[12px]">面談</Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
