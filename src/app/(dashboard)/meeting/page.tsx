"use client";

import { useState } from "react";
import { Send, CheckCircle, ArrowRight, Building2, User, MessageSquare, Calendar, Monitor } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { companies } from "@/data/mock";
import FadeIn from "@/components/motion/FadeIn";

export default function MeetingPage() {
  const [done, setDone] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setDone(true);
    toast.success("面談依頼を送信しました", { description: "運営チームが確認し、調整を進めます。" });
  };

  return (
    <div className="max-w-2xl mx-auto">
      <AnimatePresence mode="wait">
        {done ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-md mx-auto text-center py-20"
          >
            <div className="w-20 h-20 rounded-lg bg-emerald-50 flex items-center justify-center mx-auto mb-8">
              <CheckCircle className="w-10 h-10 text-emerald-600" />
            </div>
            <p className="label">Sent</p>
            <h1 className="h1 mt-2 mb-4">面談依頼を送信しました</h1>
            <p className="body mb-10">運営チームが確認し、調整を進めます。<br />ステータスはメールでお知らせします。</p>
            <button onClick={() => setDone(false)} className="btn-black">新しい依頼を作成 <ArrowRight className="w-4 h-4 ml-2" /></button>
          </motion.div>
        ) : (
          <motion.div
            key="form"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-6"
          >
            <div>
              <p className="label">Meeting Request</p>
              <h1 className="h1">面談依頼</h1>
              <p className="body mt-3">企業間の接点を、曖昧なまま終わらせず行動につなげる</p>
            </div>

            <form onSubmit={handleSubmit} className="card space-y-6">
              <div>
                <label className="label-muted mb-2 flex items-center gap-2"><Building2 className="w-4 h-4" /> 面談依頼先企業 <span className="text-red">*</span></label>
                <select className="input py-3.5 text-[15px]" required><option value="">選択してください</option>{companies.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}</select>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div><label className="label-muted mb-2 flex items-center gap-2"><Building2 className="w-4 h-4" /> 自社名 <span className="text-red">*</span></label><input type="text" className="input py-3.5 text-[15px]" placeholder="株式会社○○" required /></div>
                <div><label className="label-muted mb-2 flex items-center gap-2"><User className="w-4 h-4" /> 担当者名 <span className="text-red">*</span></label><input type="text" className="input py-3.5 text-[15px]" placeholder="山田 太郎" required /></div>
              </div>
              <div>
                <label className="label-muted mb-2 flex items-center gap-2"><MessageSquare className="w-4 h-4" /> 面談希望理由 <span className="text-red">*</span></label>
                <textarea className="input min-h-[120px] resize-y text-[15px]" placeholder="面談を希望する理由を記載してください" required />
              </div>
              <div>
                <label className="label-muted mb-2">話したいテーマ <span className="text-red">*</span></label>
                <input type="text" className="input py-3.5 text-[15px]" placeholder="例：協業の可能性について" required />
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="label-muted mb-2 flex items-center gap-2"><Calendar className="w-4 h-4" /> 希望時期</label>
                  <input type="month" className="input py-3.5" />
                </div>
                <div>
                  <label className="label-muted mb-2 flex items-center gap-2"><Monitor className="w-4 h-4" /> 形式</label>
                  <div className="flex gap-5 mt-3">
                    {["オンライン", "オフライン"].map((o) => (
                      <label key={o} className="flex items-center gap-2.5 cursor-pointer">
                        <input type="radio" name="format" value={o} className="accent-red w-4 h-4" defaultChecked={o === "オンライン"} />
                        <span className="text-[15px] text-black-500">{o}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
              <div className="rounded-md bg-black-50 p-5 flex items-start gap-4 border border-line">
                <input type="checkbox" className="accent-red w-4 h-4 mt-0.5" />
                <div>
                  <span className="text-[15px] font-medium text-black-900 block">運営の同席を希望する</span>
                  <span className="text-[13px] text-black-400">初回面談は運営同席をおすすめしています</span>
                </div>
              </div>
              <div className="pt-5 border-t border-line">
                <button type="submit" className="btn-red text-[15px] px-8 py-3.5"><Send className="w-5 h-5 mr-2" /> 面談依頼を送信する</button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
