import Link from "next/link";
import { Trophy, Quote } from "lucide-react";
import { caseStudies } from "@/data/fanlab-mock";

export default function CasesPage() {
  return (
    <div className="space-y-8">
      <div>
        <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-cyan-600 block mb-1.5">Success Cases</span>
        <h1 className="h1">実証事例</h1>
        <p className="body-sm mt-1.5">Fan Labで実際に行われた実証のストーリーと成果。</p>
      </div>

      <div className="space-y-5">
        {caseStudies.map((sc) => (
          <div key={sc.id} className="card card-hover">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-9 h-9 rounded bg-cyan-50 flex items-center justify-center"><Trophy className="w-4 h-4 text-cyan-500" /></div>
              <span className="badge bg-cyan-50 text-cyan-700">{sc.category}</span>
              <span className="text-[12px] font-semibold text-black-900">{sc.company}</span>
              <span className="caption">{sc.industry}</span>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-5">
              {[
                { l: "相談背景", t: sc.background },
                { l: "実施内容", t: sc.method },
                { l: "結果", t: sc.result, hi: true },
                { l: "次のアクション", t: sc.nextAction },
              ].map((x) => (
                <div key={x.l}>
                  <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-cyan-600 block mb-1.5">{x.l}</span>
                  <p className={`text-[13px] leading-relaxed ${x.hi ? "text-black-900 font-semibold" : "text-black-400"}`}>{x.t}</p>
                </div>
              ))}
            </div>

            <div className="rounded bg-black-50 p-4 flex gap-3">
              <div className="w-7 h-7 rounded bg-cyan-50 flex items-center justify-center shrink-0 mt-0.5"><Quote className="w-3.5 h-3.5 text-cyan-500" /></div>
              <div>
                <p className="body-sm italic mb-1">{sc.comment}</p>
                <p className="caption font-semibold">{sc.company}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
