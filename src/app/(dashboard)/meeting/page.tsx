"use client";

import { useState } from "react";
import { Send, CheckCircle, ArrowRight } from "lucide-react";
import { companies } from "@/data/mock";

export default function MeetingPage() {
  const [done, setDone] = useState(false);

  if (done) {
    return (
      <div className="max-w-sm mx-auto text-center py-20 animate-in">
        <div className="w-16 h-16 rounded-lg bg-green-50 flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-8 h-8 text-green-600" />
        </div>
        <span className="label">Sent</span>
        <h1 className="h2 mt-1 mb-3">面談依頼を送信しました</h1>
        <p className="body-sm mb-8">運営チームが確認し、調整を進めます。<br />ステータスはメールでお知らせします。</p>
        <button onClick={() => setDone(false)} className="btn-black">新しい依頼を作成 <ArrowRight className="w-4 h-4 ml-1.5" /></button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-in">
      <div>
        <span className="label">Meeting Request</span>
        <h1 className="h1">面談依頼</h1>
        <p className="body-sm mt-1.5">企業間の接点を、曖昧なまま終わらせず行動につなげる</p>
      </div>

      <form onSubmit={(e) => { e.preventDefault(); setDone(true); }} className="card space-y-6">
        <div>
          <label className="label-muted mb-2">面談依頼先企業 <span className="text-red">*</span></label>
          <select className="input" required><option value="">選択してください</option>{companies.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}</select>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <div><label className="label-muted mb-2">自社名 <span className="text-red">*</span></label><input type="text" className="input" placeholder="株式会社○○" required /></div>
          <div><label className="label-muted mb-2">担当者名 <span className="text-red">*</span></label><input type="text" className="input" placeholder="山田 太郎" required /></div>
        </div>
        <div>
          <label className="label-muted mb-2">面談希望理由 <span className="text-red">*</span></label>
          <textarea className="input min-h-[110px] resize-y" placeholder="面談を希望する理由を記載してください" required />
        </div>
        <div>
          <label className="label-muted mb-2">話したいテーマ <span className="text-red">*</span></label>
          <input type="text" className="input" placeholder="例：協業の可能性について" required />
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <div><label className="label-muted mb-2">希望時期</label><input type="month" className="input" /></div>
          <div>
            <label className="label-muted mb-2">形式</label>
            <div className="flex gap-4 mt-1.5">
              {["オンライン", "オフライン"].map((o) => (
                <label key={o} className="flex items-center gap-2 cursor-pointer group">
                  <input type="radio" name="format" value={o} className="accent-red w-3.5 h-3.5" defaultChecked={o === "オンライン"} />
                  <span className="text-[13px] text-muted group-hover:text-black-900 transition-colors">{o}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
        <div className="rounded bg-black-50 p-4 flex items-start gap-3">
          <input type="checkbox" className="accent-red w-3.5 h-3.5 mt-0.5" />
          <div><span className="text-[13px] font-medium text-black-900 block">運営の同席を希望する</span><span className="caption">初回面談は運営同席をおすすめしています</span></div>
        </div>
        <div className="pt-4 border-t border-line">
          <button type="submit" className="btn-red shadow-red"><Send className="w-4 h-4 mr-1.5" /> 面談依頼を送信する</button>
        </div>
      </form>
    </div>
  );
}
