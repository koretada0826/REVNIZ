"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Scissors, Clock, Building2, User, Mail, Phone, CheckCircle, Gift } from "lucide-react";
import { limitedPlans } from "@/data/benefits";
import { addApplication } from "@/lib/applicationHistory";
import { toast } from "sonner";
import FadeIn from "@/components/motion/FadeIn";

export default function BenefitDetailClient({ id }: { id: string }) {
  const plan = limitedPlans.find((p) => String(p.id) === id);

  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [note, setNote] = useState("");

  if (!plan) {
    return (
      <FadeIn>
        <div className="text-center py-20">
          <p className="text-[18px] text-white font-bold mb-4">プランが見つかりません</p>
          <Link href="/benefits" className="btn-primary">限定プラン一覧に戻る</Link>
        </div>
      </FadeIn>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !company.trim()) {
      toast.error("お名前と企業名は必須です");
      return;
    }
    addApplication({
      type: "benefit",
      planId: plan!.id,
      planTitle: plan!.title,
      company: plan!.company,
      discount: plan!.discount,
      name,
      companyName: company,
    });
    setSubmitted(true);
    toast.success("申し込みを受け付けました！");
  };

  return (
    <FadeIn>
      <div className="max-w-3xl mx-auto space-y-8">
        {/* 戻る */}
        <Link
          href="/benefits"
          className="inline-flex items-center gap-2 text-[14px] font-semibold text-black-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> 限定プラン一覧に戻る
        </Link>

        {/* クーポンカード（大きく表示） */}
        <div
          className="relative rounded-xl overflow-hidden"
          style={{ backgroundColor: "#1e1e1e", border: "1px solid #333" }}
        >
          {/* ミシン目 */}
          <div className="absolute top-0 bottom-0 flex flex-col items-center justify-center" style={{ right: "180px", width: "20px" }}>
            {Array.from({ length: 20 }).map((_, i) => (
              <div key={i} className="w-[2px] rounded-full" style={{ height: "8px", marginBottom: "6px", backgroundColor: "rgba(255,255,255,0.15)" }} />
            ))}
            <div className="absolute -top-[10px] w-5 h-5 rounded-full" style={{ backgroundColor: "#000" }} />
            <div className="absolute -bottom-[10px] w-5 h-5 rounded-full" style={{ backgroundColor: "#000" }} />
          </div>

          <div className="flex">
            {/* 左側 */}
            <div className="flex-1 p-6 sm:p-8" style={{ marginRight: "200px" }}>
              <div className="flex items-center gap-4 mb-5">
                <div className="w-16 h-16 rounded-lg overflow-hidden shrink-0 bg-white">
                  <img src={plan.logo} alt={plan.company} className="w-full h-full object-cover" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-[18px] font-bold" style={{ color: "#dfb664" }}>{plan.company}</p>
                    {plan.isNew && (
                      <span className="text-[10px] font-bold text-white px-2 py-0.5 rounded-full" style={{ backgroundColor: "#C8102E" }}>NEW</span>
                    )}
                  </div>
                  <p className="text-[13px] text-black-500">{plan.category}</p>
                </div>
              </div>

              <h1 className="text-[22px] sm:text-[26px] font-black text-white leading-snug mb-4">
                {plan.title}
              </h1>
              <p className="text-[16px] text-black-300 leading-relaxed mb-4">
                {plan.description}
              </p>

              <div className="flex items-center gap-2 text-[13px] text-black-500">
                <Clock className="w-4 h-4" />
                <span>有効期限: {plan.validUntil}</span>
              </div>
            </div>

            {/* 右側: 割引チケット */}
            <div
              className="absolute right-0 top-0 bottom-0 flex flex-col items-center justify-center text-center"
              style={{ width: "180px", backgroundColor: "#C8102E" }}
            >
              <Scissors className="w-5 h-5 text-white/40 absolute top-4 left-2 rotate-90" />
              <p className="text-[12px] font-bold text-white/60 tracking-wider uppercase mb-2">COUPON</p>
              <p className="text-[36px] sm:text-[42px] font-black text-white leading-none px-3">
                {plan.discount}
              </p>
              <div className="w-12 h-[2px] bg-white/30 rounded-full my-3" />
              <p className="text-[12px] font-bold text-white/70">スポンサー限定</p>
            </div>
          </div>
        </div>

        {/* 申し込みフォーム or 完了画面 */}
        {submitted ? (
          <div
            className="rounded-xl border border-line p-8 text-center"
            style={{ backgroundColor: "#1e1e1e" }}
          >
            <CheckCircle className="w-16 h-16 mx-auto mb-4" style={{ color: "#22c55e" }} />
            <h2 className="text-[24px] font-bold text-white mb-2">申し込みを受け付けました！</h2>
            <p className="text-[15px] text-black-400 mb-2">
              <strong className="text-white">{plan.title}</strong>
            </p>
            <p className="text-[15px] text-black-400 mb-6">
              {company} {name}様の申し込みを登録しました。<br />
              {plan.company}様から後日ご連絡いたします。
            </p>
            <div className="flex items-center justify-center gap-3">
              <Link href="/benefits" className="btn-outline">
                限定プラン一覧に戻る
              </Link>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div
              className="rounded-xl border border-line p-6 sm:p-8 space-y-5"
              style={{ backgroundColor: "#1e1e1e" }}
            >
              <div className="flex items-center gap-3 mb-2">
                <div
                  className="w-10 h-10 rounded-md flex items-center justify-center"
                  style={{ backgroundColor: "rgba(223,182,100,0.15)" }}
                >
                  <Gift className="w-5 h-5" style={{ color: "#dfb664" }} />
                </div>
                <div>
                  <h2 className="text-[20px] font-bold text-white">このプランに申し込む</h2>
                  <p className="text-[13px] text-black-400">以下の情報を入力して申し込みを完了してください</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[13px] font-bold text-black-300 mb-1.5 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5" />
                    お名前 <span className="text-red">*</span>
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="田中 太郎"
                    className="input"
                    required
                  />
                </div>
                <div>
                  <label className="text-[13px] font-bold text-black-300 mb-1.5 flex items-center gap-1.5">
                    <Building2 className="w-3.5 h-3.5" />
                    企業名 <span className="text-red">*</span>
                  </label>
                  <input
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="株式会社〇〇"
                    className="input"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[13px] font-bold text-black-300 mb-1.5 flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5" />
                    メールアドレス
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="example@company.co.jp"
                    className="input"
                  />
                </div>
                <div>
                  <label className="text-[13px] font-bold text-black-300 mb-1.5 flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5" />
                    電話番号
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="099-XXX-XXXX"
                    className="input"
                  />
                </div>
              </div>

              <div>
                <label className="text-[13px] font-bold text-black-300 mb-1.5 block">
                  備考（任意）
                </label>
                <textarea
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="利用希望日、人数、質問など"
                  rows={3}
                  className="input resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-md text-[16px] font-bold text-black transition-opacity hover:opacity-90 cursor-pointer flex items-center justify-center gap-2"
                style={{ backgroundColor: "#dfb664" }}
              >
                <CheckCircle className="w-5 h-5" />
                このプランに申し込む
              </button>

              <p className="text-[11px] text-black-500 text-center">
                ※ 申し込み後、提供企業様から直接ご連絡いたします
              </p>
            </div>
          </form>
        )}
      </div>
    </FadeIn>
  );
}
