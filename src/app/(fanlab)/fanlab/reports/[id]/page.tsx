import Link from "next/link";
import { ArrowLeft, CalendarDays, Users, BarChart3, TrendingUp, Lightbulb } from "lucide-react";
import { reports } from "@/data/fanlab-mock";

export function generateStaticParams() {
  return reports.map((r) => ({ id: r.id }));
}

export default function ReportDetailPage({ params }: { params: { id: string } }) {
  const r = reports.find((x) => x.id === params.id);
  if (!r) return <div className="text-center py-20"><p className="body">レポートが見つかりません</p></div>;

  return (
    <div className="space-y-6 animate-in">
      <Link href="/fanlab/reports" className="inline-flex items-center gap-1.5 text-[13px] text-muted hover:text-black-900 transition-colors group">
        <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-0.5" /> レポート一覧に戻る
      </Link>

      <div className="bg-white rounded-md border-2 border-cyan-100 p-8 shadow-sm">
        <div className="flex items-center gap-2 mb-3">
          <span className="badge bg-cyan-50 text-cyan-700">{r.category}</span>
          <span className="caption">{r.format}</span>
        </div>
        <h1 className="h1 text-[1.6rem] mb-3">{r.title}</h1>
        <div className="flex flex-wrap items-center gap-4 caption">
          <span className="flex items-center gap-1"><CalendarDays className="w-3.5 h-3.5 text-cyan-500/50" /> {r.date}</span>
          <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5 text-cyan-500/50" /> 参加者 {r.participants}名 / 回答 {r.responses}件</span>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2 space-y-5">
          <div className="card">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 rounded bg-cyan-50 flex items-center justify-center"><BarChart3 className="w-3.5 h-3.5 text-cyan-500" /></div>
              <h2 className="h3 text-[15px]">主な結果</h2>
            </div>
            <p className="body mb-5">{r.summary}</p>
            <div className="grid sm:grid-cols-2 gap-3">
              {r.highlights.map((h) => (
                <div key={h} className="rounded bg-cyan-50 border border-cyan-100 p-4">
                  <p className="text-[14px] font-bold text-cyan-700">{h}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="card">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 rounded bg-cyan-50 flex items-center justify-center"><TrendingUp className="w-3.5 h-3.5 text-cyan-500" /></div>
              <h2 className="h3 text-[15px]">データ可視化</h2>
            </div>
            <div className="space-y-3">
              {r.highlights.map((h, i) => {
                const val = parseInt(h.match(/\d+/)?.[0] || "0");
                return (
                  <div key={h}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="body-sm">{h.split(/\d/)[0] || `指標 ${i + 1}`}</span>
                      <span className="text-[12px] font-bold text-black-900">{h}</span>
                    </div>
                    <div className="h-2 rounded-full bg-black-100 overflow-hidden">
                      <div className="h-full rounded-full bg-cyan-500" style={{ width: `${Math.min(val, 100)}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="card">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 rounded bg-cyan-50 flex items-center justify-center"><Lightbulb className="w-3.5 h-3.5 text-cyan-500" /></div>
              <h2 className="h3 text-[15px]">次回への示唆</h2>
            </div>
            <p className="body mb-3">本実証の結果から、ターゲット層の反応パターンが明確になりました。次回は以下の改善が推奨されます:</p>
            <ul className="list-disc list-inside space-y-1.5 body-sm">
              <li>反応の高かった層に絞ったフォローアップ施策</li>
              <li>改善要望を反映したプロダクト調整</li>
              <li>異なる実施場所での比較検証</li>
            </ul>
          </div>
        </div>

        <div className="space-y-4">
          <div className="card">
            <span className="label-muted mb-3">レポート概要</span>
            <div className="space-y-0 divide-y divide-line">
              {[{ l: "業種", v: r.industry }, { l: "実施形式", v: r.format }, { l: "参加者数", v: `${r.participants}名` }, { l: "回答数", v: `${r.responses}件` }, { l: "回収率", v: `${Math.round(r.responses / r.participants * 100)}%` }].map((x) => (
                <div key={x.l} className="flex items-center justify-between py-2.5"><span className="body-sm">{x.l}</span><span className="text-[12px] font-bold text-black-900">{x.v}</span></div>
              ))}
            </div>
          </div>
          <div className="card space-y-3">
            <Link href="/fanlab/consult" className="w-full inline-flex items-center justify-center font-semibold px-5 py-2.5 text-[13px] rounded bg-cyan-500 text-white hover:bg-cyan-600 shadow-sm transition-all">この形式で相談する</Link>
            <Link href="/fanlab/cases" className="btn-ghost w-full border border-line text-[12px]">類似事例を見る</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
