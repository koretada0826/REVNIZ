"use client";

import Link from "next/link";
import { verificationMenus } from "@/data/fanlab-mock";

const categories = ["すべて", "食品・飲料", "体験企画", "アンケート・調査", "IT・アプリ", "会場導線・販促"];

export default function MenusPage() {
  return (
    <div className="space-y-6 animate-in">
      <div>
        <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-cyan-600 block mb-1.5">Verification Menus</span>
        <h1 className="h1">実証メニュー一覧</h1>
        <p className="body-sm mt-1.5 max-w-lg">自社なら何を試せるか。目的・業種別に最適な実証メニューを探せます。</p>
      </div>

      <div className="flex flex-wrap gap-1.5">
        {categories.map((c, i) => <button key={c} className={i === 0 ? "tag-active" : "tag"}>{c}</button>)}
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {verificationMenus.map((m) => (
          <div key={m.id} className="card card-hover group">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-[28px]">{m.icon}</span>
              <span className="text-[10px] font-bold text-black-300 tracking-wider uppercase">{m.category}</span>
            </div>
            <h3 className="font-bold text-black-900 text-[15px] mb-2 group-hover:text-cyan-600 transition-colors">{m.name}</h3>
            <p className="body-sm mb-4 line-clamp-3">{m.summary}</p>
            <div className="mb-3">
              <p className="text-[9px] font-bold text-black-300 tracking-wider uppercase mb-1.5">対象業種</p>
              <div className="flex flex-wrap gap-1">{m.targetIndustry.map((t) => <span key={t} className="badge-muted">{t}</span>)}</div>
            </div>
            <div className="mb-4">
              <p className="text-[9px] font-bold text-black-300 tracking-wider uppercase mb-1.5">取得データ</p>
              <div className="flex flex-wrap gap-1">{m.dataPoints.slice(0, 3).map((d) => <span key={d} className="badge bg-cyan-50 text-cyan-700">{d}</span>)}</div>
            </div>
            <div className="flex gap-2 pt-3 border-t border-line">
              <Link href={`/fanlab/menus/${m.id}`} className="btn-ghost flex-1 justify-center border border-line text-[12px]">詳細を見る</Link>
              <Link href="/fanlab/consult" className="flex-1 text-center text-[12px] font-semibold text-white py-1.5 rounded bg-cyan-500 hover:bg-cyan-600 transition-all">相談する</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
