"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Calendar, MapPin, Users, ArrowLeft, CheckCircle, User, Building2, Phone, Mail } from "lucide-react";
import { events } from "@/data/mock";
import { toast } from "sonner";
import FadeIn from "@/components/motion/FadeIn";

function catColor(category: string) {
  return category === "懇親会" ? "#dfb664" : category === "OFF会" ? "#A78BFA" : "#C8102E";
}

export default function EventDetailClient({ id }: { id: string }) {
  const ev = events.find((e) => e.id === id);

  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [people, setPeople] = useState("1");
  const [note, setNote] = useState("");

  if (!ev) {
    return (
      <FadeIn>
        <div className="text-center py-20">
          <p className="text-[18px] text-white font-bold mb-4">イベントが見つかりません</p>
          <Link href="/events" className="btn-primary">イベント一覧に戻る</Link>
        </div>
      </FadeIn>
    );
  }

  const pct = Math.round((ev.registered / ev.capacity) * 100);
  const remaining = ev.capacity - ev.registered;
  const color = catColor(ev.category);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !company.trim()) {
      toast.error("お名前と企業名は必須です");
      return;
    }
    setSubmitted(true);
    toast.success("参加申込を受け付けました！");
  };

  return (
    <FadeIn>
      <div className="max-w-4xl mx-auto space-y-8">
        {/* 戻るリンク */}
        <Link
          href="/events"
          className="inline-flex items-center gap-2 text-[14px] font-semibold text-black-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> イベント一覧に戻る
        </Link>

        {/* イベントヘッダー */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span
              className="text-[12px] font-bold text-white px-3 py-1 rounded-full"
              style={{ backgroundColor: color }}
            >
              {ev.category}
            </span>
            {pct >= 90 && (
              <span className="text-[12px] font-bold text-white px-3 py-1 rounded-full bg-red">
                残りわずか
              </span>
            )}
          </div>
          <h1 className="text-[28px] sm:text-[36px] font-black text-white leading-tight">
            {ev.title}
          </h1>
        </div>

        {/* イベント画像 */}
        <div className="relative overflow-hidden rounded-lg">
          <div className="aspect-[2/1] overflow-hidden">
            <Image
              src={ev.image}
              alt={ev.title}
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* イベント情報カード */}
        <div
          className="rounded-lg border border-line p-6"
          style={{ backgroundColor: "#1e1e1e" }}
        >
          <h2 className="text-[18px] font-bold text-white mb-4">イベント詳細</h2>
          <p className="text-[15px] text-black-300 leading-relaxed mb-6">
            {ev.description}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="flex items-center gap-3 p-3 rounded-md bg-white/5">
              <Calendar className="w-5 h-5 shrink-0" style={{ color }} />
              <div>
                <p className="text-[11px] font-bold text-black-400 uppercase tracking-wider">日時</p>
                <p className="text-[15px] font-bold text-white">{ev.date}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-md bg-white/5">
              <MapPin className="w-5 h-5 shrink-0" style={{ color }} />
              <div>
                <p className="text-[11px] font-bold text-black-400 uppercase tracking-wider">会場</p>
                <p className="text-[15px] font-bold text-white">{ev.location}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-md bg-white/5">
              <Users className="w-5 h-5 shrink-0" style={{ color }} />
              <div>
                <p className="text-[11px] font-bold text-black-400 uppercase tracking-wider">定員</p>
                <p className="text-[15px] font-bold text-white">
                  {ev.registered}/{ev.capacity}名
                  <span className="text-[13px] text-black-400 ml-1">（残り{remaining}名）</span>
                </p>
              </div>
            </div>
          </div>
          {/* 定員バー */}
          <div className="mt-4">
            <div className="h-2 rounded-full bg-black-700 overflow-hidden">
              <div
                className="h-full rounded-full transition-all"
                style={{ width: `${Math.min(pct, 100)}%`, backgroundColor: color }}
              />
            </div>
            <p className="text-[12px] text-black-500 mt-1">{pct}% 申込済み</p>
          </div>
        </div>

        {/* 参加申込フォーム or 完了画面 */}
        {submitted ? (
          <div
            className="rounded-lg border border-line p-8 text-center"
            style={{ backgroundColor: "#1e1e1e" }}
          >
            <CheckCircle className="w-16 h-16 mx-auto mb-4" style={{ color: "#22c55e" }} />
            <h2 className="text-[24px] font-bold text-white mb-2">参加申込を受け付けました！</h2>
            <p className="text-[14px] text-black-400 mb-2">
              <strong className="text-white">{ev.title}</strong>
            </p>
            <p className="text-[14px] text-black-400 mb-6">
              {company} {name}様（{people}名）の参加を登録しました。<br />
              詳細は後日メールにてご案内いたします。
            </p>
            <div className="flex items-center justify-center gap-3">
              <Link href="/events" className="btn-outline">
                イベント一覧に戻る
              </Link>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div
              className="rounded-lg border border-line p-6 space-y-5"
              style={{ backgroundColor: "#1e1e1e" }}
            >
              <div className="flex items-center gap-3 mb-2">
                <div
                  className="w-10 h-10 rounded-md flex items-center justify-center"
                  style={{ backgroundColor: `${color}20` }}
                >
                  <CheckCircle className="w-5 h-5" style={{ color }} />
                </div>
                <div>
                  <h2 className="text-[18px] font-bold text-white">参加申込</h2>
                  <p className="text-[12px] text-black-400">以下の情報を入力して参加を確定してください</p>
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
                <label className="text-[13px] font-bold text-black-300 mb-1.5 flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5" />
                  参加人数
                </label>
                <select
                  value={people}
                  onChange={(e) => setPeople(e.target.value)}
                  className="input"
                >
                  {[1, 2, 3, 4, 5].map((n) => (
                    <option key={n} value={String(n)}>{n}名</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-[13px] font-bold text-black-300 mb-1.5 block">
                  備考（任意）
                </label>
                <textarea
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="アレルギー、同行者名、質問など"
                  rows={3}
                  className="input resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-md text-[16px] font-bold text-white transition-opacity hover:opacity-90 cursor-pointer flex items-center justify-center gap-2"
                style={{ backgroundColor: "#dfb664", color: "#000" }}
              >
                <CheckCircle className="w-5 h-5" />
                この内容で参加を申し込む
              </button>

              <p className="text-[11px] text-black-500 text-center">
                ※ 申込後のキャンセルは運営までご連絡ください
              </p>
            </div>
          </form>
        )}
      </div>
    </FadeIn>
  );
}
