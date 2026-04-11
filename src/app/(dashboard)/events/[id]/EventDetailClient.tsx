"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Calendar, MapPin, Users, ArrowLeft, CheckCircle, User, Building2, Phone, Mail, ChevronDown, ChevronUp, X } from "lucide-react";
import { events, companies } from "@/data/mock";
import { addApplication } from "@/lib/applicationHistory";
import { toast } from "sonner";
import FadeIn from "@/components/motion/FadeIn";

const RED = "#C8102E";

// モック参加者データ
function getParticipants(eventId: string, registered: number) {
  const roles = ["代表取締役", "営業部長", "マーケティング部", "経営企画室", "広報担当", "事業開発部", "総務部長", "取締役"];
  const firstNames = ["太郎", "花子", "一郎", "美咲", "健太", "由美", "翔太", "さくら", "大輔", "あかり"];
  const lastNames = ["田中", "佐藤", "鈴木", "高橋", "伊藤", "渡辺", "山本", "中村", "小林", "加藤"];
  const participants = [];
  const companyCount = Math.min(registered, companies.length);
  for (let i = 0; i < companyCount; i++) {
    const c = companies[i % companies.length];
    const seed = (parseInt(eventId) * 7 + i * 13) % 10;
    participants.push({
      id: `p-${eventId}-${i}`,
      name: `${lastNames[seed]} ${firstNames[(seed + i) % firstNames.length]}`,
      company: c.name,
      logo: c.logo,
      role: roles[(seed + i) % roles.length],
      people: ((seed % 3) + 1),
    });
  }
  return participants;
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
  const [showParticipants, setShowParticipants] = useState(false);

  if (!ev) {
    return (
      <FadeIn>
        <div className="text-center py-20">
          <p className="text-[20px] text-white font-bold mb-4">イベントが見つかりません</p>
          <Link href="/events" className="btn-primary">イベント一覧に戻る</Link>
        </div>
      </FadeIn>
    );
  }

  const pct = Math.round((ev.registered / ev.capacity) * 100);
  const remaining = ev.capacity - ev.registered;
  const participants = getParticipants(ev.id, ev.registered);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !company.trim()) {
      toast.error("お名前と企業名は必須です");
      return;
    }
    addApplication({
      type: "event",
      planId: Number(ev!.id),
      planTitle: ev!.title,
      company: ev!.location,
      name,
      companyName: company,
    });
    setSubmitted(true);
    toast.success("参加申込を受け付けました！");
  };

  return (
    <FadeIn>
      <div className="max-w-4xl mx-auto space-y-8">
        {/* 戻るリンク */}
        <Link
          href="/events"
          className="inline-flex items-center gap-2 text-[15px] font-semibold text-black-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> イベント一覧に戻る
        </Link>

        {/* イベントヘッダー */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-[13px] font-bold text-white px-3 py-1" style={{ backgroundColor: RED }}>
              {ev.category}
            </span>
            {pct >= 90 && (
              <span className="text-[13px] font-bold text-white px-3 py-1 bg-red">
                残りわずか
              </span>
            )}
          </div>
          <h1 className="text-[24px] sm:text-[32px] font-black text-white leading-tight">
            {ev.title}
          </h1>
        </div>

        {/* イベント画像 */}
        <div className="relative overflow-hidden">
          <div className="aspect-[2/1] overflow-hidden">
            <Image
              src={ev.image}
              alt={ev.title}
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* ★ イベント情報 - 1ブロック・左赤ボーダー・行ごとにスタガー */}
        <div className="border border-line overflow-hidden red-line-grow" style={{ backgroundColor: "#1e1e1e" }}>
          <div
            className="p-6 sm:p-7 flex items-baseline gap-4 border-b border-line opacity-0"
            style={{ animation: "slideFromLeft 1.2s cubic-bezier(0.25,0.1,0.25,1) 0.2s both" }}
          >
            <span className="text-[13px] font-bold text-black-400 shrink-0 w-16">日時</span>
            <span className="text-[26px] sm:text-[32px] font-black text-white leading-tight">{ev.date}</span>
          </div>
          <div
            className="p-6 sm:p-7 flex items-baseline gap-4 border-b border-line opacity-0"
            style={{ animation: "slideFromLeft 1.2s cubic-bezier(0.25,0.1,0.25,1) 0.5s both" }}
          >
            <span className="text-[13px] font-bold text-black-400 shrink-0 w-16">会場</span>
            <span className="text-[22px] sm:text-[28px] font-black text-white leading-tight">{ev.location}</span>
          </div>
          <button
            onClick={() => setShowParticipants(!showParticipants)}
            className="w-full p-6 sm:p-7 text-left hover:bg-white/[0.03] transition-colors cursor-pointer group opacity-0"
            style={{ animation: "slideFromLeft 1.2s cubic-bezier(0.25,0.1,0.25,1) 0.8s both" }}
          >
            <div className="flex items-baseline gap-4">
              <span className="text-[13px] font-bold text-black-400 shrink-0 w-16">定員</span>
              <div className="flex-1">
                <span className="text-[30px] sm:text-[36px] font-black text-white leading-tight">
                  {ev.registered}
                </span>
                <span className="text-[16px] text-black-400 font-bold">/{ev.capacity}名</span>
                <span className="text-[14px] text-black-400 font-medium ml-3">残り{remaining}名</span>
              </div>
            </div>
            <div className="mt-3 ml-20 max-w-md">
              <div className="h-1.5 bg-black-700 overflow-hidden">
                <div className="h-full transition-all" style={{ width: `${Math.min(pct, 100)}%`, backgroundColor: RED }} />
              </div>
              <p className="text-[12px] text-black-500 mt-2 flex items-center gap-1 group-hover:text-white/60 transition-colors">
                クリックして参加者を確認 {showParticipants ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
              </p>
            </div>
          </button>
        </div>

        {/* ★ 参加者一覧（クリックで開閉） */}
        {showParticipants && (
          <div
            className="border border-line overflow-hidden"
            style={{ backgroundColor: "#1e1e1e" }}
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-line">
              <div className="flex items-center gap-3">
                <Users className="w-5 h-5" style={{ color: RED }} />
                <h3 className="text-[18px] font-bold text-white">
                  参加企業・担当者一覧
                  <span className="text-[14px] text-black-400 font-medium ml-2">（{participants.length}社）</span>
                </h3>
              </div>
              <button
                onClick={() => setShowParticipants(false)}
                className="w-8 h-8 flex items-center justify-center hover:bg-white/10 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4 text-black-400" />
              </button>
            </div>
            <div className="divide-y divide-line max-h-[400px] overflow-y-auto">
              {participants.map((p) => (
                <div key={p.id} className="flex items-center gap-4 px-6 py-3.5 hover:bg-white/5 transition-colors">
                  <div className="w-11 h-11 bg-white overflow-hidden shrink-0 flex items-center justify-center">
                    <img src={p.logo} alt={p.company} className="w-full h-full object-contain p-1" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[15px] font-bold text-white truncate">{p.company}</p>
                    <p className="text-[13px] text-black-400">{p.role} · {p.name}</p>
                  </div>
                  <span className="text-[13px] font-bold text-black-400 shrink-0">{p.people}名</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* イベント説明 */}
        <div
          className="border border-line p-7"
          style={{ backgroundColor: "#1e1e1e" }}
        >
          <h2 className="text-[20px] font-bold text-white mb-3">イベント詳細</h2>
          <p className="text-[16px] text-black-300 leading-relaxed">
            {ev.description}
          </p>
        </div>

        {/* 参加申込フォーム or 完了画面 */}
        {submitted ? (
          <div
            className="border border-line p-8 text-center"
            style={{ backgroundColor: "#1e1e1e" }}
          >
            <CheckCircle className="w-16 h-16 mx-auto mb-4" style={{ color: "#22c55e" }} />
            <h2 className="text-[26px] font-bold text-white mb-2">参加申込を受け付けました！</h2>
            <p className="text-[16px] text-black-400 mb-2">
              <strong className="text-white">{ev.title}</strong>
            </p>
            <p className="text-[16px] text-black-400 mb-6">
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
              className="border border-line p-6 sm:p-8 space-y-6"
              style={{ backgroundColor: "#1e1e1e" }}
            >
              <div className="flex items-center gap-3 mb-2">
                <CheckCircle className="w-6 h-6 shrink-0" style={{ color: RED }} />
                <div>
                  <h2 className="text-[24px] font-bold text-white">参加申込</h2>
                  <p className="text-[15px] text-black-400">以下の情報を入力して参加を確定してください</p>
                </div>
              </div>

              {/* 縦並びフォーム */}
              <div className="space-y-5">
                <div>
                  <label className="text-[16px] font-bold text-black-300 mb-2 flex items-center gap-2">
                    <User className="w-4.5 h-4.5" />
                    お名前 <span style={{ color: RED }}>*</span>
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="田中 太郎"
                    className="input text-[17px] py-4"
                    required
                  />
                </div>
                <div>
                  <label className="text-[16px] font-bold text-black-300 mb-2 flex items-center gap-2">
                    <Building2 className="w-4.5 h-4.5" />
                    企業名 <span style={{ color: RED }}>*</span>
                  </label>
                  <input
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="株式会社〇〇"
                    className="input text-[17px] py-4"
                    required
                  />
                </div>
                <div>
                  <label className="text-[16px] font-bold text-black-300 mb-2 flex items-center gap-2">
                    <Mail className="w-4.5 h-4.5" />
                    メールアドレス
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="example@company.co.jp"
                    className="input text-[17px] py-4"
                  />
                </div>
                <div>
                  <label className="text-[16px] font-bold text-black-300 mb-2 flex items-center gap-2">
                    <Phone className="w-4.5 h-4.5" />
                    電話番号
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="099-XXX-XXXX"
                    className="input text-[17px] py-4"
                  />
                </div>
                <div>
                  <label className="text-[16px] font-bold text-black-300 mb-2 flex items-center gap-2">
                    <Users className="w-4.5 h-4.5" />
                    参加人数
                  </label>
                  <select
                    value={people}
                    onChange={(e) => setPeople(e.target.value)}
                    className="input text-[17px] py-4"
                  >
                    {[1, 2, 3, 4, 5].map((n) => (
                      <option key={n} value={String(n)}>{n}名</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-[16px] font-bold text-black-300 mb-2 block">
                    備考（任意）
                  </label>
                  <textarea
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder="アレルギー、同行者名、質問など"
                    rows={3}
                    className="input text-[17px] py-4 resize-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-5 text-[20px] font-black cursor-pointer flex items-center justify-center gap-3 animate-pulse-subtle shadow-lg hover:shadow-xl transition-shadow text-white"
                style={{ backgroundColor: RED }}
              >
                <CheckCircle className="w-6 h-6" />
                この内容で参加を申し込む
              </button>

              <p className="text-[13px] text-black-500 text-center">
                ※ 申込後のキャンセルは運営までご連絡ください
              </p>
            </div>
          </form>
        )}
      </div>
    </FadeIn>
  );
}
