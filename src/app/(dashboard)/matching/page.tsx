"use client";

import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import LottieAnimation from "@/components/lottie/LottieAnimation";
import { matchingPairs } from "@/data/mock";

const themes = ["すべて", "東京×鹿児島", "DX", "採用", "販路拡大"];

export default function MatchingPage() {
  return (
    <div className="space-y-8 animate-in">
      <div className="flex flex-col lg:flex-row gap-6 items-start">
        <div className="flex-1">
          <span className="label">Matching</span>
          <h1 className="h1">おすすめマッチング</h1>
          <p className="body-sm mt-1.5 max-w-lg">運営が相性の良い企業の組み合わせを提案。「何を探せばいいか分からない」を解決します。</p>
        </div>
        <div className="w-28 h-28 shrink-0 hidden lg:block opacity-50">
          <LottieAnimation src="https://lottie.host/a5ff4ccc-e416-4c60-a3f8-907045383e40/ZhBkMGlLTJ.lottie" className="w-full h-full" />
        </div>
      </div>

      <div className="flex flex-wrap gap-1.5">{themes.map((t, i) => <button key={t} className={i === 0 ? "tag-active" : "tag"}>{t}</button>)}</div>

      {/* Featured */}
      <div className="card-red p-8">
        <span className="label">Featured</span>
        <h2 className="h3 mb-6">今月の注目マッチング</h2>
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded bg-black-50 border border-line flex items-center justify-center shrink-0"><span className="font-bold text-black-900">{matchingPairs[0].companyA.name.substring(0, 2)}</span></div>
            <div className="w-8 h-8 rounded-full bg-red-50 flex items-center justify-center shrink-0"><Sparkles className="w-3.5 h-3.5 text-red" /></div>
            <div className="w-16 h-16 rounded bg-black-50 border border-line flex items-center justify-center shrink-0"><span className="font-bold text-black-900">{matchingPairs[0].companyB.name.substring(0, 2)}</span></div>
          </div>
          <div>
            <div className="flex items-center gap-2 mb-3"><h3 className="font-bold text-black-900 text-[14px]">{matchingPairs[0].companyA.name} &times; {matchingPairs[0].companyB.name}</h3><span className="badge-red">{matchingPairs[0].theme}</span></div>
            <div className="mb-2"><span className="label-muted">おすすめ理由</span><p className="body-sm">{matchingPairs[0].reason}</p></div>
            <div className="mb-5"><span className="label-muted">期待できる連携</span><p className="text-[13px] font-semibold text-black-900">{matchingPairs[0].expectedCollaboration}</p></div>
            <Link href="/meeting" className="btn-red shadow-red">面談を依頼する <ArrowRight className="w-4 h-4 ml-1.5" /></Link>
          </div>
        </div>
      </div>

      {/* All */}
      <div className="space-y-3">
        {matchingPairs.map((p) => (
          <div key={p.id} className="card card-hover">
            <div className="flex flex-col sm:flex-row gap-5">
              <div className="flex items-center gap-3 shrink-0">
                <div className="w-14 h-14 rounded bg-black-50 border border-line flex items-center justify-center"><span className="text-[12px] font-bold text-black-900">{p.companyA.name.substring(0, 2)}</span></div>
                <div className="w-7 h-7 rounded-full bg-red-50 flex items-center justify-center"><Sparkles className="w-3 h-3 text-red" /></div>
                <div className="w-14 h-14 rounded bg-black-50 border border-line flex items-center justify-center"><span className="text-[12px] font-bold text-black-900">{p.companyB.name.substring(0, 2)}</span></div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1.5"><h3 className="font-bold text-black-900 text-[14px]">{p.companyA.name} &times; {p.companyB.name}</h3><span className="badge-red">{p.theme}</span></div>
                <p className="body-sm line-clamp-2 mb-1">{p.reason}</p>
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
