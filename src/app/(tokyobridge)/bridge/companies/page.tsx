"use client";

import Link from "next/link";
import { Building2, User, Search, ArrowRight } from "lucide-react";
import { tokyoCompanies, companyDomains } from "@/data/bridge-mock";
import { useState } from "react";

const typeLabels: Record<string, string> = {
  company: "企業",
  startup: "スタートアップ",
  expert: "専門家",
  advisor: "顧問",
};

export default function CompaniesPage() {
  const [domain, setDomain] = useState("すべて");
  const [query, setQuery] = useState("");
  const filtered = tokyoCompanies.filter((c) => {
    const matchDomain = domain === "すべて" || c.domain.includes(domain);
    const matchQuery = !query || c.name.includes(query) || c.tagline.includes(query) || c.consultTopics.some((t) => t.includes(query));
    return matchDomain && matchQuery;
  });

  return (
    <div className="space-y-6 animate-in">
      <div>
        <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-indigo-600 block mb-1.5">Tokyo Partners</span>
        <h1 className="h1">東京企業・専門家</h1>
        <p className="body-sm mt-1.5">相談先・壁打ち先・接続先としての東京企業や専門家を探せます。</p>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-black-300" />
          <input
            type="text"
            placeholder="企業名・テーマ・相談内容で検索..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="input pl-10"
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {companyDomains.map((d) => (
          <button key={d} onClick={() => setDomain(d)}
            className={d === domain ? "tag-active" : "tag"}>
            {d}
          </button>
        ))}
      </div>

      <div className="grid sm:grid-cols-2 gap-3">
        {filtered.map((co) => (
          <Link key={co.id} href={`/bridge/companies/${co.id}`} className="card card-hover">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-11 h-11 rounded-md bg-indigo-50 flex items-center justify-center shrink-0">
                {co.type === "expert" ? (
                  <User className="w-5 h-5 text-indigo-500" />
                ) : (
                  <Building2 className="w-5 h-5 text-indigo-500" />
                )}
              </div>
              <div className="min-w-0">
                <h3 className="text-[14px] font-bold text-black-900 truncate">{co.name}</h3>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] text-indigo-600 font-medium">{typeLabels[co.type]}</span>
                  <span className="caption">{co.industry}</span>
                </div>
              </div>
            </div>
            <p className="body-sm mb-3">{co.tagline}</p>
            <div className="mb-3">
              <span className="text-[10px] font-bold text-black-300 tracking-[0.1em] uppercase block mb-1.5">相談できること</span>
              <div className="flex flex-wrap gap-1">
                {co.consultTopics.map((t) => (
                  <span key={t} className="text-[10px] bg-black-50 text-black-500 px-2 py-0.5 rounded-sm">{t}</span>
                ))}
              </div>
            </div>
            <div className="rounded bg-indigo-50 border border-indigo-100 px-3 py-2">
              <p className="text-[11px] text-indigo-700 font-medium">{co.targetFit}</p>
            </div>
            <div className="flex items-center justify-between mt-3 pt-3 border-t border-line">
              <div className="flex flex-wrap gap-1">
                {co.contactMethods.map((m) => (
                  <span key={m} className="caption">{m}</span>
                ))}
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-black-300" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
