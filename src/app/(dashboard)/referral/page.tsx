"use client";

import { useState } from "react";
import { UserPlus, Send, CheckCircle, Gift, Ticket, Trophy, PartyPopper, Heart, ArrowRight, Building2, User, Mail, Phone } from "lucide-react";
import { toast } from "sonner";
import FadeIn from "@/components/motion/FadeIn";

const rewards = [
  {
    icon: <Ticket className="w-7 h-7" />,
    title: "VIP席ペア招待券",
    description: "ホームゲーム1試合分のVIP席ペアチケットをプレゼント。",
    badge: "1件紹介ごと",
    image: "/images/hero-game1.jpg",
  },
  {
    icon: <PartyPopper className="w-7 h-7" />,
    title: "交流会の優先参加権",
    description: "スポンサー交流会への優先参加枠を確保。",
    badge: "1件紹介ごと",
    image: "/images/hero-meeting.jpg",
  },
  {
    icon: <Trophy className="w-7 h-7" />,
    title: "限定グッズセット",
    description: "選手サイン入りユニフォームや非売品グッズをお届け。",
    badge: "累計3件達成",
    image: "/images/hero-fanfest.jpg",
  },
  {
    icon: <Heart className="w-7 h-7" />,
    title: "公式サイトにお名前掲載",
    description: "公式サイトの「サポーター紹介」欄にお名前を掲載。",
    badge: "累計5件達成",
    image: "/images/hero-party.jpg",
  },
];

const steps = [
  { num: "01", title: "フォームで紹介", desc: "下記フォームに紹介先の情報を入力するだけ" },
  { num: "02", title: "運営がご連絡", desc: "運営チームから紹介先に丁寧にご案内" },
  { num: "03", title: "特典GET!", desc: "スポンサー決定で紹介特典をプレゼント" },
];

export default function ReferralPage() {
  const [submitted, setSubmitted] = useState(false);
  const [friendName, setFriendName] = useState("");
  const [friendCompany, setFriendCompany] = useState("");
  const [friendPhone, setFriendPhone] = useState("");
  const [friendEmail, setFriendEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!friendName.trim() || !friendCompany.trim()) {
      toast.error("お名前と企業名は必須です");
      return;
    }
    setSubmitted(true);
    toast.success("ご紹介ありがとうございます！運営からご連絡いたします。");
  };

  const resetForm = () => {
    setSubmitted(false);
    setFriendName("");
    setFriendCompany("");
    setFriendPhone("");
    setFriendEmail("");
    setMessage("");
  };

  return (
    <FadeIn>
      <div className="space-y-10 max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center">
          <p className="label">Referral Program</p>
          <h1 className="text-[32px] sm:text-[40px] font-black text-white leading-tight">
            お友達をご紹介ください
          </h1>
          <p className="text-[16px] sm:text-[18px] text-black-300 mt-3 leading-relaxed">
            「ちょっと興味あるかも」という段階でもOK。<br className="hidden sm:block" />
            運営から丁寧にご案内いたします。
          </p>
        </div>

        {/* ===== ステップ — 紹介手順 ===== */}
        <div>
          <h2 className="text-[22px] font-black text-white mb-5">紹介手順</h2>
        </div>
        <div className="relative">

          {/* ゴールドのライン（横に走る） */}
          <div className="absolute top-1/2 left-[10%] right-[10%] hidden sm:block" style={{ height: "2px", background: "linear-gradient(90deg, transparent 0%, #dfb664 20%, #dfb664 80%, transparent 100%)", transform: "translateY(-16px)" }} />

          <div className="relative z-10 py-3 sm:py-8 px-4 sm:px-6">
            <div className="flex flex-row items-start justify-between sm:gap-0 max-w-3xl mx-auto">
              {steps.map((step, i) => (
                <div key={i} className="flex flex-col items-center text-center flex-1 relative">
                  {/* ステップの円 */}
                  <div className="relative mb-2 sm:mb-3">
                    {/* 外側のリング（アニメーション） */}
                    <div
                      className="absolute inset-[-4px] sm:inset-[-6px] rounded-full"
                      style={{
                        background: i === 2
                          ? "conic-gradient(#C8102E 0%, #ff4466 50%, #C8102E 100%)"
                          : "conic-gradient(#dfb664 0%, #8B7635 50%, #dfb664 100%)",
                        animation: "spin 8s linear infinite",
                        opacity: 0.6,
                      }}
                    />
                    <div className="absolute inset-[-2px] sm:inset-[-4px] rounded-full bg-[#0a0a0a]" />
                    {/* メインの円 */}
                    <div
                      className="relative w-11 h-11 sm:w-16 sm:h-16 rounded-full flex items-center justify-center"
                      style={{
                        background: i === 2
                          ? "linear-gradient(135deg, #C8102E 0%, #8B0000 100%)"
                          : "linear-gradient(135deg, rgba(223,182,100,0.2) 0%, rgba(223,182,100,0.05) 100%)",
                        border: `2px solid ${i === 2 ? "#C8102E" : "#dfb664"}`,
                        boxShadow: i === 2
                          ? "0 0 30px rgba(200,16,46,0.3), inset 0 0 20px rgba(200,16,46,0.2)"
                          : "0 0 30px rgba(223,182,100,0.15), inset 0 0 20px rgba(223,182,100,0.1)",
                      }}
                    >
                      <span
                        className="text-[16px] sm:text-[24px] font-black"
                        style={{
                          color: i === 2 ? "#fff" : "#dfb664",
                          textShadow: i === 2 ? "0 0 10px rgba(255,255,255,0.3)" : "none",
                        }}
                      >
                        {step.num}
                      </span>
                    </div>
                  </div>

                  {/* テキスト */}
                  <h3
                    className="text-[13px] sm:text-[18px] font-black mb-0.5 sm:mb-1"
                    style={{ color: i === 2 ? "#E63350" : "#fff" }}
                  >
                    {step.title}
                  </h3>
                  <p className="text-[10px] sm:text-[14px] text-black-400 leading-snug sm:leading-relaxed max-w-[100px] sm:max-w-[180px]">
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* ===== 特典ショーケース ===== */}
        <div>
          <div className="flex items-center gap-2 mb-5">
            <Gift className="w-6 h-6" style={{ color: "#dfb664" }} />
            <h2 className="text-[22px] font-black text-white">紹介特典</h2>
            <span className="text-[12px] font-bold px-3 py-1 rounded-full" style={{ backgroundColor: "rgba(200,16,46,0.15)", color: "#E63350" }}>
              紹介が成立した方全員に
            </span>
          </div>
          <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0" style={{ scrollbarWidth: "none" }}>
            <div className="flex sm:grid sm:grid-cols-2 gap-4" style={{ minWidth: "max-content" }}>
              {rewards.map((item, i) => (
                <div
                  key={i}
                  className="shrink-0 w-[280px] sm:w-auto rounded-xl overflow-hidden group"
                  style={{ backgroundColor: "#1e1e1e", border: "1px solid #333" }}
                >
                  {/* 写真 */}
                  <div className="relative overflow-hidden" style={{ height: "140px" }}>
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                    {/* バッジ */}
                    <span
                      className="absolute top-3 right-3 text-[11px] font-bold px-2.5 py-1 rounded-full"
                      style={{ backgroundColor: "#dfb664", color: "#000" }}
                    >
                      {item.badge}
                    </span>
                    {/* アイコン */}
                    <div className="absolute bottom-3 left-3">
                      <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center"
                        style={{ backgroundColor: "rgba(0,0,0,0.6)", color: "#dfb664" }}
                      >
                        {item.icon}
                      </div>
                    </div>
                  </div>
                  {/* テキスト */}
                  <div className="p-4">
                    <h3 className="text-[16px] font-bold text-white mb-1">{item.title}</h3>
                    <p className="text-[13px] text-black-400 leading-relaxed">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ===== フォーム or 完了 ===== */}
        {submitted ? (
          <div
            className="rounded-xl border border-line p-10 text-center"
            style={{ backgroundColor: "#1e1e1e" }}
          >
            <CheckCircle className="w-16 h-16 mx-auto mb-4" style={{ color: "#22c55e" }} />
            <h2 className="text-[24px] font-bold text-white mb-2">ご紹介ありがとうございます！</h2>
            <p className="text-[15px] text-black-400 mb-6">
              運営チームから{friendCompany}の{friendName}様にご連絡いたします。
            </p>
            <button onClick={resetForm} className="btn-outline">
              続けて紹介する
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div
              className="rounded-xl border border-line p-6 sm:p-8 space-y-5"
              style={{ backgroundColor: "#1e1e1e" }}
            >
              <div className="flex items-center gap-3 mb-2">
                <div
                  className="w-11 h-11 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: "rgba(223,182,100,0.15)" }}
                >
                  <UserPlus className="w-5 h-5" style={{ color: "#dfb664" }} />
                </div>
                <div>
                  <h2 className="text-[20px] font-bold text-white">ご紹介先の情報</h2>
                  <p className="text-[13px] text-black-400">以下を入力して紹介を送信してください</p>
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
                    value={friendName}
                    onChange={(e) => setFriendName(e.target.value)}
                    placeholder="山田 太郎"
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
                    value={friendCompany}
                    onChange={(e) => setFriendCompany(e.target.value)}
                    placeholder="株式会社〇〇"
                    className="input"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[13px] font-bold text-black-300 mb-1.5 flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5" />
                    電話番号
                  </label>
                  <input
                    type="tel"
                    value={friendPhone}
                    onChange={(e) => setFriendPhone(e.target.value)}
                    placeholder="099-XXX-XXXX"
                    className="input"
                  />
                </div>
                <div>
                  <label className="text-[13px] font-bold text-black-300 mb-1.5 flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5" />
                    メールアドレス
                  </label>
                  <input
                    type="email"
                    value={friendEmail}
                    onChange={(e) => setFriendEmail(e.target.value)}
                    placeholder="example@company.co.jp"
                    className="input"
                  />
                </div>
              </div>

              <div>
                <label className="text-[13px] font-bold text-black-300 block mb-1.5">
                  メッセージ（任意）
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="「この方はIT業界で〇〇に強い方です」など、運営への補足情報があればご記入ください"
                  rows={3}
                  className="input resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-md text-[16px] font-bold text-black transition-opacity hover:opacity-90 cursor-pointer flex items-center justify-center gap-2"
                style={{ backgroundColor: "#dfb664" }}
              >
                <Send className="w-5 h-5" />
                紹介を送信する
              </button>

              <p className="text-[11px] text-black-500 text-center">
                ※ 紹介先のお名前・企業名は運営のみが閲覧します
              </p>
            </div>
          </form>
        )}
      </div>
    </FadeIn>
  );
}
