import Link from "next/link";
import { Handshake, ArrowRight } from "lucide-react";
import { bridgeCases } from "@/data/bridge-mock";

export default function CasesPage() {
  return (
    <div className="space-y-8 animate-in">
      <div>
        <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-indigo-600 block mb-1.5">Success Stories</span>
        <h1 className="h1">東京×鹿児島 接続事例</h1>
        <p className="body-sm mt-1.5">実際に接続が価値に変わったストーリーと成果。</p>
      </div>

      <div className="space-y-5">
        {bridgeCases.map((sc) => (
          <div key={sc.id} className="card card-hover">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-9 h-9 rounded bg-indigo-50 flex items-center justify-center">
                <Handshake className="w-4 h-4 text-indigo-500" />
              </div>
              <span className="badge bg-indigo-50 text-indigo-700">{sc.category}</span>
              <div className="flex items-center gap-1.5 caption">
                <span className="font-semibold text-black-900">{sc.kagoshimaCompany}</span>
                <span>×</span>
                <span className="font-semibold text-black-900">{sc.tokyoCompany}</span>
              </div>
            </div>

            <h3 className="text-[16px] font-bold text-black-900 mb-5">{sc.title}</h3>

            <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-5">
              {[
                { l: "相談背景", t: sc.background },
                { l: "出会い", t: sc.encounter },
                { l: "実施内容", t: sc.action },
                { l: "何が起きたか", t: sc.outcome, hi: true },
                { l: "今後の展開", t: sc.nextStep },
              ].map((x) => (
                <div key={x.l}>
                  <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-indigo-600 block mb-1.5">{x.l}</span>
                  <p className={`text-[13px] leading-relaxed ${x.hi ? "text-black-900 font-semibold" : "text-black-400"}`}>{x.t}</p>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-line">
              <div className="flex items-center gap-2">
                <span className="text-[11px] text-black-300">鹿児島:</span>
                <span className="text-[12px] font-semibold text-black-900">{sc.kagoshimaCompany}</span>
                <span className="text-[11px] text-black-300 ml-2">東京:</span>
                <span className="text-[12px] font-semibold text-black-900">{sc.tokyoCompany}</span>
              </div>
              <Link href="/bridge/consult" className="text-[11px] font-semibold text-indigo-600 hover:text-indigo-700 flex items-center gap-1">
                この形式で相談する <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
