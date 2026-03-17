"use client";

import { useState } from "react";
import { Send, CheckCircle, ArrowRight } from "lucide-react";
import { companies } from "@/data/mock";

export default function MeetingV2Page() {
  const [done, setDone] = useState(false);

  if (done) {
    return (
      <div className="max-w-sm mx-auto text-center py-20 animate-in">
        <div className="w-16 h-16 rounded-lg bg-emerald-500/10 flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-8 h-8 text-emerald-400" />
        </div>
        <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-red block mb-1.5">Sent</span>
        <h1 className="text-[1.5rem] font-bold text-white tracking-tight mt-1 mb-3">面談依頼を送信しました</h1>
        <p className="text-[13px] text-white/40 leading-relaxed mb-8">運営チームが確認し、調整を進めます。<br />ステータスはメールでお知らせします。</p>
        <button onClick={() => setDone(false)} className="btn-red">新しい依頼を作成 <ArrowRight className="w-4 h-4 ml-1.5" /></button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-in">
      <div>
        <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-red block mb-1.5">Meeting Request</span>
        <h1 className="text-[2rem] font-bold text-white tracking-tight leading-[1.1]">面談依頼</h1>
        <p className="text-[13px] text-white/40 leading-relaxed mt-1.5">企業間の接点を、曖昧なまま終わらせず行動につなげる</p>
      </div>

      <form onSubmit={(e) => { e.preventDefault(); setDone(true); }} className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-6 space-y-6">
        <div>
          <label className="text-[10px] font-bold tracking-[0.15em] uppercase text-white/30 block mb-2">面談依頼先企業 <span className="text-red">*</span></label>
          <select className="w-full rounded-md px-4 py-3 bg-white/[0.04] border border-white/[0.08] text-white text-[14px] focus:outline-none focus:border-white/20 transition-all" required><option value="">選択してください</option>{companies.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}</select>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <div><label className="text-[10px] font-bold tracking-[0.15em] uppercase text-white/30 block mb-2">自社名 <span className="text-red">*</span></label><input type="text" className="w-full rounded-md px-4 py-3 bg-white/[0.04] border border-white/[0.08] text-white text-[14px] placeholder:text-white/20 focus:outline-none focus:border-white/20 transition-all" placeholder="株式会社○○" required /></div>
          <div><label className="text-[10px] font-bold tracking-[0.15em] uppercase text-white/30 block mb-2">担当者名 <span className="text-red">*</span></label><input type="text" className="w-full rounded-md px-4 py-3 bg-white/[0.04] border border-white/[0.08] text-white text-[14px] placeholder:text-white/20 focus:outline-none focus:border-white/20 transition-all" placeholder="山田 太郎" required /></div>
        </div>
        <div>
          <label className="text-[10px] font-bold tracking-[0.15em] uppercase text-white/30 block mb-2">面談希望理由 <span className="text-red">*</span></label>
          <textarea className="w-full rounded-md px-4 py-3 bg-white/[0.04] border border-white/[0.08] text-white text-[14px] placeholder:text-white/20 focus:outline-none focus:border-white/20 transition-all min-h-[110px] resize-y" placeholder="面談を希望する理由を記載してください" required />
        </div>
        <div>
          <label className="text-[10px] font-bold tracking-[0.15em] uppercase text-white/30 block mb-2">話したいテーマ <span className="text-red">*</span></label>
          <input type="text" className="w-full rounded-md px-4 py-3 bg-white/[0.04] border border-white/[0.08] text-white text-[14px] placeholder:text-white/20 focus:outline-none focus:border-white/20 transition-all" placeholder="例：協業の可能性について" required />
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <div><label className="text-[10px] font-bold tracking-[0.15em] uppercase text-white/30 block mb-2">希望時期</label><input type="month" className="w-full rounded-md px-4 py-3 bg-white/[0.04] border border-white/[0.08] text-white text-[14px] focus:outline-none focus:border-white/20 transition-all" /></div>
          <div>
            <label className="text-[10px] font-bold tracking-[0.15em] uppercase text-white/30 block mb-2">形式</label>
            <div className="flex gap-4 mt-1.5">
              {["オンライン", "オフライン"].map((o) => (
                <label key={o} className="flex items-center gap-2 cursor-pointer group">
                  <input type="radio" name="format" value={o} className="accent-red w-3.5 h-3.5" defaultChecked={o === "オンライン"} />
                  <span className="text-[13px] text-white/40 group-hover:text-white transition-colors">{o}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
        <div className="rounded bg-white/[0.04] p-4 flex items-start gap-3">
          <input type="checkbox" className="accent-red w-3.5 h-3.5 mt-0.5" />
          <div><span className="text-[13px] font-medium text-white block">運営の同席を希望する</span><span className="text-[11px] text-white/30">初回面談は運営同席をおすすめしています</span></div>
        </div>
        <div className="pt-4 border-t border-white/[0.06]">
          <button type="submit" className="btn-red shadow-red"><Send className="w-4 h-4 mr-1.5" /> 面談依頼を送信する</button>
        </div>
      </form>
    </div>
  );
}
