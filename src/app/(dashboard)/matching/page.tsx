"use client";

import Link from "next/link";
import { ArrowRight, Handshake, Star } from "lucide-react";
import { matchingPairs } from "@/data/mock";

const themes = ["すべて", "東京×鹿児島", "DX", "採用", "販路拡大"];

export default function MatchingPage() {
  return (
    <div className="space-y-6">
      <div>
        <p className="label">Matching</p>
        <h1 className="h1">おすすめマッチング</h1>
        <p className="body-sm mt-2 max-w-lg">運営が相性の良い企業の組み合わせを提案。「何を探せばいいか分からない」を解決します。</p>
      </div>

      <div className="flex flex-wrap gap-1.5">{themes.map((t, i) => <button key={t} className={i === 0 ? "tag-active" : "tag"}>{t}</button>)}</div>

      {/* Featured */}
      <div className="card-red p-0 overflow-hidden">
        <div className="p-6 sm:p-8">
          <p className="text-[10px] font-bold tracking-[0.15em] uppercase text-black-400 mb-1">今月の注目</p>
          <h2 className="h3 mb-5">注目マッチング</h2>
          <div className="grid lg:grid-cols-2 gap-6">
            <div className="flex items-center gap-4">
              <div className="avatar-lg">{matchingPairs[0].companyA.name.substring(0, 2)}</div>
              <div className="w-8 h-8 rounded-full bg-black-50 border border-line flex items-center justify-center shrink-0">
                <Handshake className="w-3.5 h-3.5 text-black-400" />
              </div>
              <div className="avatar-lg">{matchingPairs[0].companyB.name.substring(0, 2)}</div>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-3">
                <h3 className="font-bold text-black-900 text-[15px]">{matchingPairs[0].companyA.name} &times; {matchingPairs[0].companyB.name}</h3>
                <span className="badge-red">{matchingPairs[0].theme}</span>
              </div>
              <div className="mb-3">
                <span className="label-muted">おすすめ理由</span>
                <p className="body-sm mt-1">{matchingPairs[0].reason}</p>
              </div>
              <div className="mb-5">
                <span className="label-muted">期待できる連携</span>
                <p className="text-[13px] font-semibold text-black-900 mt-1">{matchingPairs[0].expectedCollaboration}</p>
              </div>
              <Link href="/meeting" className="btn-red">面談を依頼する <ArrowRight className="w-4 h-4 ml-1.5" /></Link>
            </div>
          </div>
        </div>
      </div>

      {/* All */}
      <div className="space-y-3">
        {matchingPairs.map((p) => (
          <div key={p.id} className="card card-hover group">
            <div className="flex flex-col sm:flex-row gap-5">
              <div className="flex items-center gap-3 shrink-0">
                <div className="avatar-lg">{p.companyA.name.substring(0, 2)}</div>
                <div className="w-8 h-8 rounded-full bg-black-50 border border-line flex items-center justify-center">
                  <Handshake className="w-3.5 h-3.5 text-black-400" />
                </div>
                <div className="avatar-lg">{p.companyB.name.substring(0, 2)}</div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1.5">
                  <h3 className="font-bold text-black-900 text-[14px] group-hover:text-red transition-colors">{p.companyA.name} &times; {p.companyB.name}</h3>
                  <span className="badge-red">{p.theme}</span>
                </div>
                <p className="body-sm line-clamp-2 mb-1.5">{p.reason}</p>
                <p className="text-[12px]"><span className="font-bold text-black-900">期待される連携：</span><span className="text-muted">{p.expectedCollaboration}</span></p>
              </div>
              <div className="shrink-0 flex items-center"><Link href="/meeting" className="btn-red btn-sm">面談依頼</Link></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
