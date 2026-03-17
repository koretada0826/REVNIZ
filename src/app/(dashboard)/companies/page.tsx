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
    <div className="space-y-6">
      <div className="mb-4">
        <p className="label">Companies</p>
        <h1 className="h1">スポンサー企業一覧</h1>
        <p className="body mt-3">何ができる会社か、何を求めている会社かを比較し、接点候補を見つける</p>
      </div>

      <div className="flex gap-3">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-black-300" />
          <input type="text" placeholder="企業名、キーワードで検索..." value={search} onChange={(e) => setSearch(e.target.value)} className="input pl-12 py-3.5 text-[15px]" />
        </div>
        <button onClick={() => setFilters(!filters)} className={`btn-sm border rounded-md text-[14px] px-5 ${filters ? "border-black-300 bg-black-50 text-black-900" : "border-line text-muted hover:text-black-900 hover:bg-black-50"} transition-colors`}>
          <SlidersHorizontal className="w-4 h-4 mr-2" /> フィルター
        </button>
        <div className="hidden sm:flex rounded-md overflow-hidden border border-line">
          <button onClick={() => setView("grid")} className={`px-3 py-2.5 transition-colors ${view === "grid" ? "bg-black-900 text-white" : "text-muted hover:text-black-900 hover:bg-black-50"}`}><Grid3X3 className="w-4 h-4" /></button>
          <button onClick={() => setView("list")} className={`px-3 py-2.5 transition-colors ${view === "list" ? "bg-black-900 text-white" : "text-muted hover:text-black-900 hover:bg-black-50"}`}><List className="w-4 h-4" /></button>
        </div>
      </div>

      {filters && (
        <div className="card space-y-5">
          <div>
            <span className="label-muted mb-3">業種</span>
            <div className="flex flex-wrap gap-2">{industries.map((i) => <button key={i} onClick={() => setIndustry(i)} className={industry === i ? "tag-active" : "tag"}>{i}</button>)}</div>
          </div>
          <div className="divider" />
          <div>
            <span className="label-muted mb-3">エリア</span>
            <div className="flex flex-wrap gap-2">{areas.map((a) => <button key={a} onClick={() => setArea(a)} className={area === a ? "tag-active" : "tag"}>{a}</button>)}</div>
          </div>
        </div>
      )}

      <div className="flex items-center gap-3">
        <p className="text-[15px] text-black-400"><span className="font-bold text-black-900 text-[18px]">{list.length}</span> 社</p>
        {industry !== "すべて" && <span className="badge-red flex items-center gap-1.5">{industry} <button onClick={() => setIndustry("すべて")} className="hover:bg-red-200 rounded-full p-0.5 transition-colors"><X className="w-3 h-3" /></button></span>}
        {area !== "すべて" && <span className="badge-red flex items-center gap-1.5">{area} <button onClick={() => setArea("すべて")} className="hover:bg-red-200 rounded-full p-0.5 transition-colors"><X className="w-3 h-3" /></button></span>}
      </div>

      {view === "grid" ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {list.map((c) => (
            <div key={c.id} className="card card-hover group">
              <div className="flex items-start justify-between mb-5">
                <div className="avatar-md">{c.name.charAt(0)}</div>
                <button className="btn-icon w-9 h-9 text-black-200 hover:text-red hover:bg-red-50 rounded-md"><Heart className="w-4 h-4" /></button>
              </div>
              <h3 className="font-bold text-black-900 text-[16px] mb-1 group-hover:text-red transition-colors">{c.name}</h3>
              <p className="text-[14px] text-black-400 mb-4">{c.tagline}</p>
              <div className="flex items-center gap-4 text-[13px] text-black-300 mb-5">
                <span className="flex items-center gap-1.5"><Briefcase className="w-3.5 h-3.5" /> {c.industry}</span>
                <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" /> {c.area}</span>
              </div>
              <div className="space-y-3 mb-6">
                <div>
                  <p className="text-[10px] font-bold text-black-300 tracking-[0.1em] uppercase mb-1.5">提供</p>
                  <div className="flex flex-wrap gap-1.5">{c.canProvide.slice(0, 2).map((x) => <span key={x} className="badge-muted">{x}</span>)}</div>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-black-300 tracking-[0.1em] uppercase mb-1.5">探している</p>
                  <div className="flex flex-wrap gap-1.5">{c.lookingFor.slice(0, 2).map((x) => <span key={x} className="badge-green">{x}</span>)}</div>
                </div>
              </div>
              <div className="flex gap-2.5 pt-5 border-t border-line">
                <Link href={`/companies/${c.id}`} className="btn-outline btn-sm flex-1 justify-center">詳細を見る</Link>
                <Link href="/meeting" className="btn-red btn-sm flex-1 justify-center">面談依頼</Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-2.5">
          {list.map((c) => (
            <div key={c.id} className="card card-hover flex items-center gap-5 group">
              <div className="avatar-md shrink-0">{c.name.charAt(0)}</div>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-black-900 text-[16px] group-hover:text-red transition-colors">{c.name}</h3>
                <div className="flex items-center gap-3 mt-1">
                  <span className="text-[14px] text-black-400">{c.tagline}</span>
                  <span className="text-[13px] text-black-300 flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {c.area}</span>
                </div>
              </div>
              <div className="hidden md:flex flex-wrap gap-1.5 max-w-[220px] shrink-0">{c.canProvide.slice(0, 2).map((x) => <span key={x} className="badge-muted">{x}</span>)}</div>
              <div className="flex gap-2.5 shrink-0">
                <Link href={`/companies/${c.id}`} className="btn-outline btn-sm">詳細</Link>
                <Link href="/meeting" className="btn-red btn-sm">面談</Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
