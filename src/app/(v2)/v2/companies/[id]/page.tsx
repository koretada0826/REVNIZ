"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, MapPin, Globe, Briefcase, Heart, Calendar, ExternalLink, MessageSquare, Users, Handshake, Send } from "lucide-react";
import { companies } from "@/data/mock";

export default function CompanyDetailV2Page() {
  const params = useParams();
  const c = companies.find((x) => x.id === params.id);
  if (!c) return <div className="text-center py-20"><p className="text-[14px] text-white/40">企業が見つかりません</p><Link href="/v2/companies" className="btn-red mt-4">一覧に戻る</Link></div>;

  return (
    <div className="space-y-6 animate-in">
      <Link href="/v2/companies" className="inline-flex items-center gap-1.5 text-[13px] text-white/30 hover:text-white transition-colors group">
        <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-0.5" /> 企業一覧に戻る
      </Link>

      {/* Header Card */}
      <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-6 relative overflow-hidden">
        <div className="flex flex-col sm:flex-row gap-5">
          <div className="w-20 h-20 rounded bg-white/[0.06] flex items-center justify-center shrink-0 border border-white/[0.08]">
            <span className="text-2xl font-bold text-white">{c.name.charAt(0)}</span>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h1 className="text-[1.6rem] font-bold text-white tracking-tight leading-[1.1]">{c.name}</h1>
                <p className="text-red-400 font-semibold text-[14px] mt-0.5">{c.tagline}</p>
              </div>
              <button className="w-9 h-9 rounded flex items-center justify-center text-white/20 border border-white/[0.08] hover:text-red-400 hover:border-red/30 transition-all"><Heart className="w-4 h-4" /></button>
            </div>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 mt-3">
              {[
                { icon: Briefcase, t: c.industry }, { icon: MapPin, t: c.area }, { icon: Calendar, t: `${c.memberSince}〜` },
              ].map(({ icon: I, t }) => <span key={t} className="flex items-center gap-1.5 text-[11px] text-white/30"><I className="w-3.5 h-3.5 text-red/40" /> {t}</span>)}
              <a href={c.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-[12px] text-red-400 font-medium hover:text-red-300"><Globe className="w-3.5 h-3.5" /> Web <ExternalLink className="w-2.5 h-2.5" /></a>
            </div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2 space-y-5">
          <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 rounded bg-red/10 flex items-center justify-center"><Briefcase className="w-3.5 h-3.5 text-red-400" /></div>
              <h2 className="text-[15px] font-semibold text-white">事業紹介</h2>
            </div>
            <p className="text-[14px] text-white/40 leading-relaxed mb-4">{c.description}</p>
            <div><span className="text-[10px] font-bold tracking-[0.15em] uppercase text-white/30 block mb-1.5">強み</span><div className="flex flex-wrap gap-1.5">{c.strengths.map((s) => <span key={s} className="inline-flex items-center rounded-sm px-2 py-[3px] text-[10px] font-bold bg-white/[0.06] text-white/50">{s}</span>)}</div></div>
          </div>

          <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 rounded bg-red/10 flex items-center justify-center"><Handshake className="w-3.5 h-3.5 text-red-400" /></div>
              <h2 className="text-[15px] font-semibold text-white">提供できること</h2>
            </div>
            <div className="grid sm:grid-cols-3 gap-2.5">
              {c.canProvide.map((i) => <div key={i} className="rounded bg-white/[0.04] border border-white/[0.06] p-4 hover:bg-white/[0.06] transition-colors"><p className="text-[13px] font-semibold text-white/80">{i}</p></div>)}
            </div>
          </div>

          <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 rounded bg-emerald-500/10 flex items-center justify-center"><Users className="w-3.5 h-3.5 text-emerald-400" /></div>
              <h2 className="text-[15px] font-semibold text-white">探していること</h2>
            </div>
            <div className="grid sm:grid-cols-3 gap-2.5">
              {c.lookingFor.map((i) => <div key={i} className="rounded bg-emerald-500/[0.04] border border-emerald-500/10 p-4"><p className="text-[13px] font-semibold text-white/80">{i}</p></div>)}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-6 space-y-2.5">
            <span className="text-[10px] font-bold tracking-[0.15em] uppercase text-white/30 block mb-1.5">アクション</span>
            <Link href="/v2/meeting" className="btn-red w-full shadow-red"><Send className="w-4 h-4 mr-1.5" /> 面談を依頼する</Link>
            <button className="w-full inline-flex items-center justify-center font-medium text-[13px] px-5 py-2.5 rounded border border-white/10 text-white/60 hover:text-white hover:bg-white/5 transition-all"><Users className="w-4 h-4 mr-1.5" /> 紹介を依頼する</button>
            <button className="w-full text-[12px] font-medium text-white/40 hover:text-white px-3.5 py-2 rounded border border-white/[0.08] hover:border-white/20 transition-all flex items-center justify-center"><MessageSquare className="w-4 h-4 mr-1.5" /> 運営に相談する</button>
          </div>
          <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-6">
            <span className="text-[10px] font-bold tracking-[0.15em] uppercase text-white/30 block mb-1.5">担当者</span>
            <div className="flex items-center gap-3 mt-1">
              <div className="w-10 h-10 rounded bg-white/[0.06] flex items-center justify-center border border-white/[0.08]"><span className="text-[13px] font-bold text-white">{c.contactPerson.charAt(0)}</span></div>
              <div><p className="text-[13px] font-semibold text-white">{c.contactPerson}</p><p className="text-[11px] text-white/30">{c.name}</p></div>
            </div>
          </div>
          <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-6">
            <span className="text-[10px] font-bold tracking-[0.15em] uppercase text-white/30 block mb-1.5">活動状況</span>
            <div className="space-y-0 mt-1 divide-y divide-white/[0.06]">
              {[{ l: "イベント参加", v: "3回" }, { l: "相談投稿", v: "2件" }, { l: "面談実施", v: "1件" }].map((x) => (
                <div key={x.l} className="flex items-center justify-between py-2.5"><span className="text-[13px] text-white/40">{x.l}</span><span className="text-[13px] font-bold text-white">{x.v}</span></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
