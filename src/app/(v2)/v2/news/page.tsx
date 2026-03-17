import { ChevronRight } from "lucide-react";
import { newsItems } from "@/data/mock";

export default function NewsV2Page() {
  return (
    <div className="space-y-6">
      <div><span className="text-[10px] font-bold tracking-[0.2em] uppercase text-red block mb-1.5">News</span><h1 className="text-[2rem] font-bold text-white tracking-tight leading-[1.1]">お知らせ</h1><p className="text-[13px] text-white/40 leading-relaxed mt-1.5">運営からの情報をお届けします</p></div>
      <div className="rounded-lg border border-white/[0.06] overflow-hidden divide-y divide-white/[0.06]">
        {newsItems.map((item) => (
          <div key={item.id} className="flex items-start gap-4 px-5 py-5 hover:bg-white/[0.02] transition-colors group cursor-pointer">
            <span className="text-[11px] text-white/20 w-24 shrink-0 pt-0.5 tabular-nums">{item.createdAt}</span>
            <div className="flex-1 min-w-0">
              <span className="inline-flex items-center rounded-sm px-2 py-[3px] text-[10px] font-bold bg-red/10 text-red-400 mb-2">{item.category}</span>
              <h3 className="text-[14px] font-bold text-white mb-1 group-hover:text-red-400 transition-colors">{item.title}</h3>
              <p className="text-[13px] text-white/40 leading-relaxed">{item.content}</p>
            </div>
            <ChevronRight className="w-4 h-4 text-white/10 group-hover:text-red-400 transition-colors shrink-0 mt-1" />
          </div>
        ))}
      </div>
    </div>
  );
}
