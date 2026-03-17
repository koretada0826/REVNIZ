"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Lock, Mail } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showLogin, setShowLogin] = useState(false);

  // Landing view (like NBA 2K style)
  if (!showLogin) {
    return (
      <div className="min-h-screen relative flex flex-col bg-black-900">
        {/* Background */}
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=1920&q=80')] bg-cover bg-center" />
        <div className="absolute inset-0 bg-black/60" />

        {/* Header */}
        <header className="relative z-10 flex items-center justify-between px-8 py-5">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 bg-white rounded-md flex items-center justify-center">
              <span className="text-black-900 font-bold text-[12px] tracking-[0.1em]">SC</span>
            </div>
            <span className="font-bold text-[16px] text-white tracking-tight">Sponsor Connect</span>
          </div>
          <div className="flex items-center gap-4">
            <button onClick={() => setShowLogin(true)} className="text-[14px] font-semibold text-white/80 hover:text-white transition-colors tracking-wide uppercase">
              Sign In
            </button>
          </div>
        </header>

        {/* Center content */}
        <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 -mt-10">
          {/* Logo */}
          <div className="mb-10 text-center">
            <div className="w-20 h-20 bg-white rounded-lg flex items-center justify-center mx-auto mb-5">
              <span className="text-black-900 font-bold text-[22px] tracking-[0.1em]">SC</span>
            </div>
            <h1 className="text-[3rem] sm:text-[4rem] font-bold text-white tracking-tight leading-none">
              SPONSOR<br />CONNECT
            </h1>
            <p className="text-[13px] text-white/40 tracking-[0.3em] uppercase mt-3">by REVNIZE</p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col gap-3 w-full max-w-[380px]">
            <button
              onClick={() => setShowLogin(true)}
              className="w-full py-4 bg-red text-white text-[15px] font-bold tracking-wide uppercase text-center hover:bg-red-700 transition-colors"
            >
              ログインする
            </button>
            <Link
              href="#"
              className="w-full py-4 bg-red text-white text-[15px] font-bold tracking-wide uppercase text-center hover:bg-red-700 transition-colors block"
            >
              企業一覧を見る
            </Link>
            <Link
              href="#"
              className="w-full py-4 bg-red text-white text-[15px] font-bold tracking-wide uppercase text-center hover:bg-red-700 transition-colors block"
            >
              Sponsor Connectとは
            </Link>
          </div>

          {/* Stats */}
          <div className="flex gap-12 mt-14">
            {[
              { v: "24", l: "参加企業" },
              { v: "48", l: "面談実績" },
              { v: "92%", l: "継続率" },
            ].map((s) => (
              <div key={s.l} className="text-center">
                <p className="text-[28px] font-bold text-white tracking-tight">{s.v}</p>
                <p className="text-[11px] text-white/40 tracking-[0.1em] uppercase mt-1">{s.l}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <footer className="relative z-10 text-center py-6">
          <p className="text-[11px] text-white/20">&copy; 2026 REVNIZE Inc.</p>
        </footer>
      </div>
    );
  }

  // Login form view
  return (
    <div className="min-h-screen relative flex flex-col bg-black-900">
      {/* Background */}
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=1920&q=80')] bg-cover bg-center" />
      <div className="absolute inset-0 bg-black/70" />

      {/* Header */}
      <header className="relative z-10 flex items-center justify-between px-8 py-5">
        <button onClick={() => setShowLogin(false)} className="flex items-center gap-2.5">
          <div className="w-10 h-10 bg-white rounded-md flex items-center justify-center">
            <span className="text-black-900 font-bold text-[12px] tracking-[0.1em]">SC</span>
          </div>
          <span className="font-bold text-[16px] text-white tracking-tight">Sponsor Connect</span>
        </button>
      </header>

      {/* Login form */}
      <div className="relative z-10 flex-1 flex items-center justify-center px-6">
        <div className="w-full max-w-[420px] bg-white rounded-lg p-10">
          <div className="mb-8">
            <p className="text-[11px] font-bold text-black-400 tracking-[0.12em] uppercase mb-2">Sign In</p>
            <h2 className="text-[28px] font-bold text-black-900 tracking-tight mb-2">ログイン</h2>
            <p className="text-[15px] text-black-400">会員制プラットフォームへアクセスします</p>
          </div>

          <form onSubmit={(e) => { e.preventDefault(); window.location.href = "/"; }} className="space-y-5">
            <div>
              <label className="text-[11px] font-bold text-black-300 tracking-[0.1em] uppercase block mb-2">メールアドレス</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-black-300" />
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="example@company.co.jp" className="w-full rounded-md px-4 py-4 pl-12 bg-white border border-line text-black-900 text-[15px] placeholder:text-black-300 focus:outline-none focus:border-black-400 focus:ring-1 focus:ring-black-100 transition-colors" required />
              </div>
            </div>
            <div>
              <label className="text-[11px] font-bold text-black-300 tracking-[0.1em] uppercase block mb-2">パスワード</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-black-300" />
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••••" className="w-full rounded-md px-4 py-4 pl-12 bg-white border border-line text-black-900 text-[15px] placeholder:text-black-300 focus:outline-none focus:border-black-400 focus:ring-1 focus:ring-black-100 transition-colors" required />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 rounded accent-red" />
                <span className="text-[14px] text-black-400">保持する</span>
              </label>
              <Link href="#" className="text-[14px] text-red font-medium hover:text-red-700 transition-colors">パスワードを忘れた方</Link>
            </div>
            <button type="submit" className="w-full py-4 bg-red text-white text-[16px] font-bold tracking-wide uppercase hover:bg-red-700 transition-colors rounded-md">
              ログイン <ArrowRight className="w-5 h-5 ml-2 inline" />
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-line">
            <p className="text-[14px] text-black-400 text-center">
              招待コードをお持ちの方は <Link href="#" className="text-red font-semibold hover:text-red-700 transition-colors">新規登録</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
