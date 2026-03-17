import { Trophy, Quote, Handshake, MessageSquare, TrendingUp } from "lucide-react";
import { successCases } from "@/data/mock";

export default function CasesPage() {
  return (
    <div className="space-y-6">
      <div>
        <p className="label">Success Cases</p>
        <h1 className="h1">成功事例</h1>
        <p className="body mt-3">Sponsor Connectで実際に生まれた商談や連携の事例</p>
      </div>

      <div className="space-y-5">
        {successCases.map((sc) => (
          <div key={sc.id} className="card card-hover group">
            <div className="flex items-center gap-3 mb-5">
              <Trophy className="w-5 h-5 text-black-300" />
              <span className="badge-red">{sc.category}</span>
            </div>

            <h2 className="text-[22px] font-bold text-black-900 tracking-tight mb-4 group-hover:text-red transition-colors">{sc.title}</h2>
            <div className="flex flex-wrap gap-2 mb-6">
              {sc.companies.map((n) => (
                <span key={n} className="rounded-md bg-black-50 border border-line px-4 py-2 text-[14px] font-bold text-black-900">{n}</span>
              ))}
            </div>

            <div className="grid sm:grid-cols-3 gap-4 mb-6">
              {[
                { l: "出会いのきっかけ", t: sc.howTheyMet, icon: Handshake },
                { l: "相談内容", t: sc.consultation, icon: MessageSquare },
                { l: "その後の結果", t: sc.result, icon: TrendingUp, hi: true },
              ].map((x) => (
                <div key={x.l} className="rounded-md bg-black-50 p-5 border border-line">
                  <div className="flex items-center gap-2 mb-3">
                    <x.icon className="w-4 h-4 text-black-400" />
                    <span className="text-[11px] font-bold text-black-400 tracking-[0.1em] uppercase">{x.l}</span>
                  </div>
                  <p className={`text-[14px] leading-relaxed ${x.hi ? "text-black-900 font-semibold" : "text-black-500"}`}>{x.t}</p>
                </div>
              ))}
            </div>

            <div className="rounded-md bg-black-50 p-5 flex gap-4 border border-line">
              <Quote className="w-5 h-5 text-black-300 shrink-0 mt-0.5" />
              <p className="text-[15px] text-black-500 italic leading-relaxed">{sc.comment}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
