"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Lock, Mail, Shield, Users, TrendingUp } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="min-h-screen flex">
      {/* Left */}
      <div className="hidden lg:flex lg:w-1/2 bg-black-900 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-[3px] h-full bg-red" />

        <div className="relative z-10 flex flex-col justify-between w-full p-16">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-md bg-black-800 border border-white/10 flex items-center justify-center">
              <span className="text-white font-bold text-[12px] tracking-[0.15em]">SC</span>
            </div>
            <div className="leading-none">
              <span className="font-bold text-[16px] text-white tracking-tight block">Sponsor Connect</span>
              <span className="text-[9px] text-white/30 tracking-[0.2em] uppercase">REVNIZE</span>
            </div>
          </div>

          <div className="max-w-lg">
            <div className="w-10 h-[3px] bg-red mb-10" />
            <h1 className="text-[3.5rem] font-bold text-white leading-[1.05] tracking-tight mb-8">
              スポンサーで<br />あることが、<br />
              <span className="text-red-400">次の取引</span>に<br />つながる。
            </h1>
            <p className="text-black-400 text-[17px] leading-relaxed max-w-sm">
              互いの事業を知り、信頼あるつながりをつくり、
              面談や協業へ進むための会員制プラットフォーム。
            </p>
          </div>

          <div className="flex gap-12">
            {[
              { v: "24", l: "参加企業" },
              { v: "48", l: "面談実績" },
              { v: "92%", l: "継続率" },
            ].map((s) => (
              <div key={s.l}>
                <p className="text-[32px] font-bold text-white tracking-tight">{s.v}</p>
                <p className="text-[12px] text-black-400 tracking-[0.1em] uppercase mt-1">{s.l}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-white px-6">
        <div className="w-full max-w-[400px]">
          <div className="lg:hidden flex items-center gap-3 mb-12">
            <div className="w-10 h-10 rounded-md bg-black-900 flex items-center justify-center">
              <span className="text-white font-bold text-[12px] tracking-[0.15em]">SC</span>
            </div>
            <span className="font-bold text-[18px] tracking-tight text-black-900">Sponsor Connect</span>
          </div>

          <div className="mb-10">
            <p className="label">Sign In</p>
            <h2 className="h1 mt-2 mb-3">ログイン</h2>
            <p className="body">会員制プラットフォームへアクセスします</p>
          </div>

          <form onSubmit={(e) => { e.preventDefault(); window.location.href = "/"; }} className="space-y-6">
            <div>
              <label className="label-muted mb-2">メールアドレス</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-black-300" />
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="example@company.co.jp" className="input-lg pl-12" required />
              </div>
            </div>
            <div>
              <label className="label-muted mb-2">パスワード</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-black-300" />
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••••" className="input-lg pl-12" required />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" className="w-4 h-4 rounded accent-red" /><span className="text-[14px] text-muted">保持する</span></label>
              <Link href="#" className="text-[14px] text-red font-medium hover:text-red-700 transition-colors">パスワードを忘れた方</Link>
            </div>
            <button type="submit" className="btn-red w-full py-4 text-[16px]">
              ログイン <ArrowRight className="w-5 h-5 ml-2" />
            </button>
          </form>

          <div className="mt-10 pt-8 border-t border-line">
            <p className="text-[14px] text-muted text-center">
              招待コードをお持ちの方は <Link href="#" className="text-red font-semibold hover:text-red-700 transition-colors">新規登録</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
