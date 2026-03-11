import { Trophy, Quote } from "lucide-react";
import LottieAnimation from "@/components/lottie/LottieAnimation";
import { successCases } from "@/data/mock";

export default function CasesPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col lg:flex-row gap-6 items-start">
        <div className="flex-1"><span className="label">Success Cases</span><h1 className="h1">成功事例</h1><p className="body-sm mt-1.5">Sponsor Connectで実際に生まれた商談や連携の事例</p></div>
        <div className="w-24 h-24 shrink-0 hidden lg:block opacity-50"><LottieAnimation src="https://lottie.host/4db68bbd-31f6-4cd8-84eb-189571e83a25/eJEhyGiYLw.lottie" className="w-full h-full" /></div>
      </div>

      <div className="space-y-5">
        {successCases.map((sc) => (
          <div key={sc.id} className="card card-hover relative overflow-hidden">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-9 h-9 rounded bg-red-50 flex items-center justify-center"><Trophy className="w-4 h-4 text-red" /></div>
              <span className="badge-red">{sc.category}</span>
            </div>

            <h2 className="h3 mb-4">{sc.title}</h2>
            <div className="flex flex-wrap gap-1.5 mb-5">
              {sc.companies.map((n) => <span key={n} className="rounded bg-black-50 border border-line px-3 py-1.5 text-[12px] font-bold text-black-900">{n}</span>)}
            </div>

            <div className="grid sm:grid-cols-3 gap-5 mb-5">
              {[{ l: "出会いのきっかけ", t: sc.howTheyMet }, { l: "相談内容", t: sc.consultation }, { l: "その後の結果", t: sc.result, hi: true }].map((x) => (
                <div key={x.l}><span className="label">{x.l}</span><p className={`text-[13px] leading-relaxed ${x.hi ? "text-black-900 font-semibold" : "text-muted"}`}>{x.t}</p></div>
              ))}
            </div>

            <div className="rounded bg-black-50 p-4 flex gap-3">
              <div className="w-7 h-7 rounded bg-red-50 flex items-center justify-center shrink-0 mt-0.5"><Quote className="w-3.5 h-3.5 text-red" /></div>
              <p className="body-sm italic">{sc.comment}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
