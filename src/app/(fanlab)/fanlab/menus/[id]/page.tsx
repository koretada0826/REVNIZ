"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, ArrowRight, MapPin, CheckCircle2 } from "lucide-react";
import { verificationMenus, caseStudies } from "@/data/fanlab-mock";

export default function MenuDetailPage() {
  const params = useParams();
  const m = verificationMenus.find((x) => x.id === params.id);
  if (!m) return <div className="text-center py-20"><p className="body">メニューが見つかりません</p><Link href="/fanlab/menus" className="btn-black mt-4">一覧に戻る</Link></div>;

  const relatedCase = caseStudies.find((c) => c.category === m.category);
  const steps = ["相談", "設計", "実施", "回収", "レポート返却"];

  return (
    <div className="space-y-6 animate-in">
      <Link href="/fanlab/menus" className="inline-flex items-center gap-1.5 text-[13px] text-muted hover:text-black-900 transition-colors group">
        <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-0.5" /> メニュー一覧に戻る
      </Link>

      <div className="bg-white rounded-md border-2 border-cyan-100 p-8 shadow-sm">
        <div className="flex items-center gap-4 mb-4">
          <span className="text-[40px]">{m.icon}</span>
          <div>
            <span className="text-[10px] font-bold text-cyan-600 tracking-wider uppercase">{m.category}</span>
            <h1 className="h1 text-[1.6rem]">{m.name}</h1>
          </div>
        </div>
        <p className="body max-w-2xl">{m.summary}</p>
        <div className="flex flex-wrap gap-1.5 mt-4">
          {m.targetIndustry.map((t) => <span key={t} className="badge-muted">向いている: {t}</span>)}
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2 space-y-5">
          <div className="card">
            <h2 className="h3 text-[15px] mb-4">できること</h2>
            <div className="space-y-3 body">
              <p><span className="text-black-900 font-medium">実施場所:</span> {m.location}</p>
              <p><span className="text-black-900 font-medium">実施内容:</span> {m.summary}</p>
            </div>
          </div>

          <div className="card">
            <h2 className="h3 text-[15px] mb-4">得られるデータ</h2>
            <div className="grid sm:grid-cols-2 gap-2.5">
              {m.dataPoints.map((d) => (
                <div key={d} className="flex items-center gap-2.5 rounded bg-cyan-50 border border-cyan-100 p-3">
                  <CheckCircle2 className="w-4 h-4 text-cyan-500 shrink-0" />
                  <span className="text-[13px] text-black-900 font-medium">{d}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="card">
            <h2 className="h3 text-[15px] mb-4">実施フロー</h2>
            <div className="flex items-center gap-2 flex-wrap">
              {steps.map((s, i) => (
                <div key={s} className="flex items-center gap-2">
                  <div className="flex items-center gap-1.5 bg-black-50 border border-line rounded px-3 py-2">
                    <span className="w-5 h-5 rounded-full bg-cyan-500 flex items-center justify-center text-[10px] font-bold text-white">{i + 1}</span>
                    <span className="text-[12px] font-medium text-black-900">{s}</span>
                  </div>
                  {i < steps.length - 1 && <ArrowRight className="w-3 h-3 text-black-200 shrink-0" />}
                </div>
              ))}
            </div>
          </div>

          {relatedCase && (
            <div className="card">
              <h2 className="h3 text-[15px] mb-4">関連事例</h2>
              <div className="rounded bg-cyan-50 border border-cyan-100 p-4">
                <p className="text-[13px] font-semibold text-black-900 mb-1">{relatedCase.company}</p>
                <p className="body-sm line-clamp-2 mb-2">{relatedCase.result}</p>
                <Link href="/fanlab/cases" className="text-[12px] font-semibold text-cyan-600 hover:text-cyan-700">事例を見る →</Link>
              </div>
            </div>
          )}
        </div>

        <div className="space-y-4">
          <div className="card space-y-3">
            <span className="label-muted">アクション</span>
            <Link href="/fanlab/consult" className="w-full inline-flex items-center justify-center font-semibold px-5 py-2.5 text-[13px] rounded bg-cyan-500 text-white hover:bg-cyan-600 shadow-sm transition-all">
              このメニューで相談する
            </Link>
            <Link href="/fanlab/menus" className="btn-ghost w-full border border-line text-[12px]">他のメニューを見る</Link>
          </div>
          <div className="card">
            <span className="label-muted">実施場所</span>
            <div className="flex items-center gap-2 mt-1">
              <MapPin className="w-4 h-4 text-cyan-500" />
              <span className="text-[13px] text-black-900">{m.location}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
