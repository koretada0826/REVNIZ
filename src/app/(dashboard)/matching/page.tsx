"use client";

import Link from "next/link";
import { ArrowRight, Handshake } from "lucide-react";
import { matchingPairs } from "@/data/mock";
import LottieAnimation from "@/components/lottie/LottieAnimation";
import FadeIn from "@/components/motion/FadeIn";

const themes = ["すべて", "東京×鹿児島", "DX", "採用", "販路拡大"];

export default function MatchingPage() {
  return (
    <FadeIn><div className="space-y-6">
      <div className="flex items-start justify-between gap-6">
        <div>
          <p className="label">Matching</p>
          <h1 className="h1">おすすめマッチング</h1>
          <p className="body mt-3 max-w-lg">運営が相性の良い企業の組み合わせを提案。「何を探せばいいか分からない」を解決します。</p>
        </div>
        <div className="hidden lg:block w-24 h-24 shrink-0 opacity-15">
          <LottieAnimation src="https://lottie.host/a5ff4ccc-e416-4c60-a3f8-907045383e40/ZhBkMGlLTJ.lottie" className="w-full h-full" />
        </div>
      </div>

      <div className="flex flex-wrap gap-2">{themes.map((t, i) => <button key={t} className={i === 0 ? "tag-active" : "tag"}>{t}</button>)}</div>

      {/* Featured */}
      <div className="card-red p-0 overflow-hidden">
        <div className="px-8 py-10">
          <p className="label mb-3">今月の注目</p>
          <h2 className="h2 mb-6">注目マッチング</h2>
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="flex items-center gap-5">
              <div className="avatar-lg">{matchingPairs[0].companyA.name.substring(0, 2)}</div>
              <span className="text-[28px] text-black-200 font-light">&times;</span>
              <div className="avatar-lg">{matchingPairs[0].companyB.name.substring(0, 2)}</div>
            </div>
            <div>
              <div className="flex items-center gap-3 mb-4">
                <h3 className="font-bold text-black-900 text-[18px]">{matchingPairs[0].companyA.name} &times; {matchingPairs[0].companyB.name}</h3>
                <span className="badge-red">{matchingPairs[0].theme}</span>
              </div>
              <div className="mb-4">
                <span className="label-muted">おすすめ理由</span>
                <p className="body-sm mt-1">{matchingPairs[0].reason}</p>
              </div>
              <div className="mb-6">
                <span className="label-muted">期待できる連携</span>
                <p className="text-[15px] font-semibold text-black-900 mt-1">{matchingPairs[0].expectedCollaboration}</p>
              </div>
              <Link href="/meeting" className="btn-red">面談を依頼する <ArrowRight className="w-4 h-4 ml-2" /></Link>
            </div>
          </div>
        </div>
      </div>

      {/* All */}
      <div className="space-y-3">
        {matchingPairs.map((p) => (
          <div key={p.id} className="card card-hover group">
            <div className="flex flex-col sm:flex-row gap-6">
              <div className="flex items-center gap-4 shrink-0">
                <div className="avatar-lg">{p.companyA.name.substring(0, 2)}</div>
                <span className="text-[24px] text-black-200 font-light">&times;</span>
                <div className="avatar-lg">{p.companyB.name.substring(0, 2)}</div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="font-bold text-black-900 text-[17px] group-hover:text-red transition-colors">{p.companyA.name} &times; {p.companyB.name}</h3>
                  <span className="badge-red">{p.theme}</span>
                </div>
                <p className="body-sm line-clamp-2 mb-2">{p.reason}</p>
                <p className="text-[14px]"><span className="font-bold text-black-900">期待される連携：</span><span className="text-black-400">{p.expectedCollaboration}</span></p>
              </div>
              <div className="shrink-0 flex items-center"><Link href="/meeting" className="btn-red btn-sm">面談依頼</Link></div>
            </div>
          </div>
        ))}
      </div>
    </div></FadeIn>
  );
}
