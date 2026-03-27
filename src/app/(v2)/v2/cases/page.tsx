import { Trophy, Quote } from "lucide-react";
import LottieAnimation from "@/components/lottie/LottieAnimation";
import { successCases } from "@/data/mock";

export default function CasesV2Page() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col lg:flex-row gap-6 items-start">
        <div className="flex-1"><span className="text-[10px] font-bold tracking-[0.2em] uppercase text-red block mb-1.5">Season Results</span><h1 className="text-[2rem] font-bold text-white tracking-tight leading-[1.1]">今シーズンの成功事例</h1><p className="text-[13px] text-white/40 leading-relaxed mt-1.5">スポンサー活動から生まれた具体的な成果をご紹介します</p></div>
        <div className="w-24 h-24 shrink-0 hidden lg:block opacity-20"><LottieAnimation src="https://lottie.host/4db68bbd-31f6-4cd8-84eb-189571e83a25/eJEhyGiYLw.lottie" className="w-full h-full" /></div>
      </div>

      <div className="space-y-5">
        {successCases.map((sc) => (
          <div key={sc.id} className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-6 hover:bg-white/[0.04] hover:border-white/[0.1] transition-all relative overflow-hidden">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-9 h-9 rounded bg-red/10 flex items-center justify-center"><Trophy className="w-4 h-4 text-red-400" /></div>
              <span className="inline-flex items-center rounded-sm px-2 py-[3px] text-[10px] font-bold bg-red/10 text-red-400">{sc.category}</span>
              <span className="text-[12px] text-white/30">{sc.date}</span>
            </div>

            <div className="flex items-center gap-4 mb-4">
              <div className="w-10 h-10 rounded bg-white overflow-hidden shrink-0">
                <img src={sc.logo} alt={sc.company} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1">
                <h2 className="text-[1.125rem] font-semibold text-white tracking-tight">{sc.title}</h2>
                <p className="text-[12px] text-white/40">{sc.company}</p>
              </div>
              <div className="text-right">
                <p className="text-[28px] font-black leading-none text-red-400">{sc.metric}</p>
                <p className="text-[10px] text-white/40">{sc.metricLabel}</p>
              </div>
            </div>

            <p className="text-[13px] text-white/40 leading-relaxed mb-4">{sc.description}</p>

            <div className="rounded bg-white/[0.04] p-4 flex gap-3">
              <div className="w-7 h-7 rounded bg-red/10 flex items-center justify-center shrink-0 mt-0.5"><Quote className="w-3.5 h-3.5 text-red-400" /></div>
              <p className="text-[13px] text-white/40 leading-relaxed italic">{sc.comment}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
