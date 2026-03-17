import { Trophy, Quote, Handshake, MessageSquare, TrendingUp } from "lucide-react";
import { successCases } from "@/data/mock";

export default function CasesPage() {
  return (
    <div className="space-y-6">
      <div>
        <p className="label">Success Cases</p>
        <h1 className="h1">成功事例</h1>
        <p className="body-sm mt-2">Sponsor Connectで実際に生まれた商談や連携の事例</p>
      </div>

      <div className="space-y-4">
        {successCases.map((sc) => (
          <div key={sc.id} className="card card-hover group">
            <div className="flex items-center gap-2 mb-4">
              <Trophy className="w-4 h-4 text-black-300" />
              <span className="badge-red">{sc.category}</span>
            </div>

            <h2 className="h3 mb-3 group-hover:text-red transition-colors">{sc.title}</h2>
            <div className="flex flex-wrap gap-1.5 mb-5">
              {sc.companies.map((n) => (
                <span key={n} className="rounded-md bg-black-50 border border-line px-3 py-1.5 text-[12px] font-bold text-black-900">{n}</span>
              ))}
            </div>

            <div className="grid sm:grid-cols-3 gap-3 mb-5">
              {[
                { l: "出会いのきっかけ", t: sc.howTheyMet, icon: Handshake },
                { l: "相談内容", t: sc.consultation, icon: MessageSquare },
                { l: "その後の結果", t: sc.result, icon: TrendingUp, hi: true },
              ].map((x) => (
                <div key={x.l} className="rounded-md bg-black-50 p-4 border border-line">
                  <div className="flex items-center gap-1.5 mb-2">
                    <x.icon className="w-3 h-3 text-black-400" />
                    <span className="text-[10px] font-bold text-black-400 tracking-[0.1em] uppercase">{x.l}</span>
                  </div>
                  <p className={`text-[13px] leading-relaxed ${x.hi ? "text-black-900 font-semibold" : "text-black-500"}`}>{x.t}</p>
                </div>
              ))}
            </div>

            <div className="rounded-md bg-black-50 p-4 flex gap-3 border border-line">
              <Quote className="w-4 h-4 text-black-300 shrink-0 mt-0.5" />
              <p className="body-sm italic leading-relaxed">{sc.comment}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
