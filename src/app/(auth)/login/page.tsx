"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Lock, Mail } from "lucide-react";
import LottieAnimation from "@/components/lottie/LottieAnimation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="min-h-screen flex">
      {/* Left */}
      <div className="hidden lg:flex lg:w-1/2 bg-black-900 relative overflow-hidden">
        <div className="absolute inset-0 noise" />
        {/* Red accent line */}
        <div className="absolute top-0 left-0 w-1 h-full bg-red" />

        <div className="relative z-10 flex flex-col justify-between w-full p-14">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-sm bg-red flex items-center justify-center">
              <span className="text-white font-bold text-[10px] tracking-[0.15em]">SC</span>
            </div>
            <span className="font-bold text-[14px] text-white tracking-tight">Sponsor Connect</span>
          </div>

          <div className="max-w-lg">
            <div className="w-10 h-[3px] bg-red mb-8 rounded-full" />
            <h1 className="text-[3.2rem] font-bold text-white leading-[1.05] tracking-tight mb-6">
              スポンサーで<br />あることが、<br />
              <span className="text-red-400">次の取引</span>に<br />つながる。
            </h1>
            <p className="text-black-300 text-[15px] leading-relaxed max-w-sm mb-12">
              互いの事業を知り、信頼あるつながりをつくり、
              面談や協業へ進むための会員制プラットフォーム。
            </p>
            <div className="w-40 h-40 opacity-60">
              <LottieAnimation
                src="https://lottie.host/4db68bbd-31f6-4cd8-84eb-189571e83a25/eJEhyGiYLw.lottie"
                className="w-full h-full"
              />
            </div>
          </div>

          <div className="flex gap-10">
            {[{ v: "24", l: "参加企業" }, { v: "48", l: "面談実績" }, { v: "92%", l: "継続率" }].map((s) => (
              <div key={s.l}>
                <p className="text-2xl font-bold text-white tracking-tight">{s.v}</p>
                <p className="text-[10px] text-black-400 tracking-[0.1em] uppercase mt-0.5">{s.l}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-white px-6">
        <div className="w-full max-w-[380px] animate-in">
          <div className="lg:hidden flex items-center gap-2.5 mb-10">
            <div className="w-9 h-9 rounded-sm bg-red flex items-center justify-center">
              <span className="text-white font-bold text-[10px] tracking-[0.15em]">SC</span>
            </div>
            <span className="font-bold text-[16px] tracking-tight text-black-900">Sponsor Connect</span>
          </div>

          <div className="mb-8">
            <span className="label">Sign In</span>
            <h2 className="h1 mt-1 mb-2">ログイン</h2>
            <p className="body-sm">会員制プラットフォームへアクセスします</p>
          </div>

          <form onSubmit={(e) => { e.preventDefault(); window.location.href = "/"; }} className="space-y-5">
            <div>
              <label className="label-muted mb-2">メールアドレス</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-black-200" />
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="example@company.co.jp" className="input-lg pl-10" required />
              </div>
            </div>
            <div>
              <label className="label-muted mb-2">パスワード</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-black-200" />
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••••" className="input-lg pl-10" required />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" className="w-3.5 h-3.5 rounded accent-red" /><span className="text-[13px] text-muted">保持する</span></label>
              <Link href="#" className="text-[13px] text-red font-medium hover:text-red-700">パスワードを忘れた方</Link>
            </div>
            <button type="submit" className="btn-red w-full py-3.5 shadow-red">
              ログイン <ArrowRight className="w-4 h-4 ml-1.5" />
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-line">
            <p className="text-[13px] text-muted text-center">
              招待コードをお持ちの方は <Link href="#" className="text-red font-semibold hover:text-red-700">新規登録</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
