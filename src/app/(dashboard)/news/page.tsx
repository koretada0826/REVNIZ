import { ChevronRight } from "lucide-react";
import { newsItems } from "@/data/mock";

export default function NewsPage() {
  return (
    <div className="space-y-6">
      <div>
        <p className="label">News</p>
        <h1 className="h1">お知らせ</h1>
        <p className="body mt-3">運営からの情報をお届けします</p>
      </div>
      <div className="card-flush divide-y divide-line">
        {newsItems.map((item) => (
          <div key={item.id} className="flex items-start gap-5 px-6 py-6 hover:bg-black-50/50 transition-colors group cursor-pointer">
            <span className="caption w-24 shrink-0 pt-0.5 tabular-nums text-[14px]">{item.createdAt}</span>
            <div className="flex-1 min-w-0">
              <span className="badge-red mb-2 inline-block">{item.category}</span>
              <h3 className="text-[17px] font-bold text-black-900 mb-2 group-hover:text-red transition-colors">{item.title}</h3>
              <p className="body-sm">{item.content}</p>
            </div>
            <ChevronRight className="w-5 h-5 text-black-200 group-hover:text-black-500 transition-colors shrink-0 mt-1" />
          </div>
        ))}
      </div>
    </div>
  );
}
