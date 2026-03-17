"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, SlidersHorizontal, MapPin, Briefcase, Grid3X3, List, Heart, X } from "lucide-react";
import { companies } from "@/data/mock";

const industries = ["すべて", "IT・テクノロジー", "食品・飲料", "広告・クリエイティブ", "建設・不動産", "人材・HR", "マーケティング"];
const areas = ["すべて", "鹿児島", "東京", "九州"];

export default function CompaniesV2Page() {
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
        <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-red block mb-1.5">Companies</span>
        <h1 className="text-[2rem] font-bold text-white tracking-tight leading-[1.1]">スポンサー企業一覧</h1>
        <p className="text-[13px] text-white/40 leading-relaxed mt-1.5">何ができる会社か、何を求めている会社かを比較し、接点候補を見つける</p>
      </div>

      <div className="flex gap-2.5">
        <div className="flex-1 relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
          <input type="text" placeholder="企業名、キーワードで検索..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full rounded-md px-4 py-3 bg-white/[0.04] border border-white/[0.08] text-white text-[14px] placeholder:text-white/20 focus:outline-none focus:border-white/20 transition-all pl-10" />
        </div>
        <button onClick={() => setFilters(!filters)} className={`inline-flex items-center px-3.5 py-1.5 text-[12px] font-medium rounded border transition-all ${filters ? "border-red/30 bg-red/10 text-red-400" : "border-white/[0.08] text-white/40 hover:text-white"}`}>
          <SlidersHorizontal className="w-3.5 h-3.5 mr-1.5" /> フィルター
        </button>
        <div className="hidden sm:flex rounded overflow-hidden border border-white/[0.08]">
          <button onClick={() => setView("grid")} className={`px-2.5 py-2 ${view === "grid" ? "bg-white/10 text-white" : "text-white/30 hover:text-white"}`}><Grid3X3 className="w-3.5 h-3.5" /></button>
          <button onClick={() => setView("list")} className={`px-2.5 py-2 ${view === "list" ? "bg-white/10 text-white" : "text-white/30 hover:text-white"}`}><List className="w-3.5 h-3.5" /></button>
        </div>
      </div>

      {filters && (
        <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-6 animate-in space-y-4">
          <div>
            <span className="text-[10px] font-bold tracking-[0.15em] uppercase text-white/30 block mb-2">業種</span>
            <div className="flex flex-wrap gap-1.5">{industries.map((i) => <button key={i} onClick={() => setIndustry(i)} className={`inline-flex items-center rounded-full px-3 py-1.5 text-[12px] font-medium border cursor-pointer transition-all ${industry === i ? "bg-white text-black-900 border-white font-semibold" : "bg-transparent border-white/[0.08] text-white/40 hover:border-white/20 hover:text-white"}`}>{i}</button>)}</div>
          </div>
          <div className="h-px bg-white/[0.06]" />
          <div>
            <span className="text-[10px] font-bold tracking-[0.15em] uppercase text-white/30 block mb-2">エリア</span>
            <div className="flex flex-wrap gap-1.5">{areas.map((a) => <button key={a} onClick={() => setArea(a)} className={`inline-flex items-center rounded-full px-3 py-1.5 text-[12px] font-medium border cursor-pointer transition-all ${area === a ? "bg-white text-black-900 border-white font-semibold" : "bg-transparent border-white/[0.08] text-white/40 hover:border-white/20 hover:text-white"}`}>{a}</button>)}</div>
          </div>
        </div>
      )}

      <div className="flex items-center gap-2">
        <p className="text-[13px] text-white/40"><span className="font-bold text-white">{list.length}</span> 社</p>
        {industry !== "すべて" && <span className="inline-flex items-center gap-1 rounded-sm px-2 py-[3px] text-[10px] font-bold bg-red/10 text-red-400">{industry} <button onClick={() => setIndustry("すべて")}><X className="w-2.5 h-2.5" /></button></span>}
        {area !== "すべて" && <span className="inline-flex items-center gap-1 rounded-sm px-2 py-[3px] text-[10px] font-bold bg-red/10 text-red-400">{area} <button onClick={() => setArea("すべて")}><X className="w-2.5 h-2.5" /></button></span>}
      </div>

      {view === "grid" ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {list.map((c) => (
            <div key={c.id} className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-6 hover:bg-white/[0.04] hover:border-white/[0.1] transition-all group">
              <div className="flex items-start justify-between mb-3">
                <div className="w-12 h-12 rounded bg-white/[0.06] flex items-center justify-center">
                  <span className="text-[14px] font-bold text-white">{c.name.charAt(0)}</span>
                </div>
                <button className="w-8 h-8 rounded flex items-center justify-center text-white/20 hover:text-red-400 transition-colors"><Heart className="w-4 h-4" /></button>
              </div>
              <h3 className="font-bold text-white text-[14px] mb-0.5">{c.name}</h3>
              <p className="text-[12px] text-red-400 font-medium mb-2.5">{c.tagline}</p>
              <div className="flex items-center gap-3 text-[11px] text-white/30 mb-4">
                <span className="flex items-center gap-1"><Briefcase className="w-3 h-3" /> {c.industry}</span>
                <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {c.area}</span>
              </div>
              <div className="space-y-2 mb-5">
                <div>
                  <p className="text-[9px] font-bold text-white/20 tracking-[0.1em] uppercase mb-1">提供</p>
                  <div className="flex flex-wrap gap-1">{c.canProvide.slice(0, 2).map((x) => <span key={x} className="inline-flex items-center rounded-sm px-2 py-[3px] text-[10px] font-bold bg-white/[0.06] text-white/50">{x}</span>)}</div>
                </div>
                <div>
                  <p className="text-[9px] font-bold text-white/20 tracking-[0.1em] uppercase mb-1">探している</p>
                  <div className="flex flex-wrap gap-1">{c.lookingFor.slice(0, 2).map((x) => <span key={x} className="inline-flex items-center rounded-sm px-2 py-[3px] text-[10px] font-bold bg-emerald-500/10 text-emerald-400">{x}</span>)}</div>
                </div>
              </div>
              <div className="flex gap-2 pt-3 border-t border-white/[0.06]">
                <Link href={`/v2/companies/${c.id}`} className="flex-1 text-center text-[12px] font-medium text-white/40 hover:text-white py-1.5 rounded border border-white/[0.08] hover:border-white/20 transition-all">詳細を見る</Link>
                <Link href="/v2/meeting" className="btn-red btn-sm flex-1 justify-center text-[12px]">面談依頼</Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-2.5">
          {list.map((c) => (
            <div key={c.id} className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-5 hover:bg-white/[0.04] hover:border-white/[0.1] transition-all flex items-center gap-5">
              <div className="w-12 h-12 rounded bg-white/[0.06] flex items-center justify-center shrink-0">
                <span className="text-[14px] font-bold text-white">{c.name.charAt(0)}</span>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-white text-[14px]">{c.name}</h3>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-[12px] text-red-400 font-medium">{c.tagline}</span>
                  <span className="text-[11px] text-white/30 flex items-center gap-1"><MapPin className="w-3 h-3" /> {c.area}</span>
                </div>
              </div>
              <div className="hidden md:flex flex-wrap gap-1 max-w-[200px] shrink-0">{c.canProvide.slice(0, 2).map((x) => <span key={x} className="inline-flex items-center rounded-sm px-2 py-[3px] text-[10px] font-bold bg-white/[0.06] text-white/50">{x}</span>)}</div>
              <div className="flex gap-2 shrink-0">
                <Link href={`/v2/companies/${c.id}`} className="text-[12px] font-medium text-white/40 hover:text-white px-3 py-1.5 rounded border border-white/[0.08] hover:border-white/20 transition-all">詳細</Link>
                <Link href="/v2/meeting" className="btn-red btn-sm text-[12px]">面談</Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
