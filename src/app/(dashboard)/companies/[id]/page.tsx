"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, MapPin, Globe, Briefcase, Heart, Calendar, ExternalLink, MessageSquare, Users, Handshake, Send } from "lucide-react";
import { companies } from "@/data/mock";

export default function CompanyDetailPage() {
  const params = useParams();
  const c = companies.find((x) => x.id === params.id);
  if (!c) return <div className="text-center py-20"><p className="body">企業が見つかりません</p><Link href="/companies" className="btn-black mt-4">一覧に戻る</Link></div>;

  return (
    <div className="space-y-6 animate-in">
      <Link href="/companies" className="inline-flex items-center gap-1.5 text-[13px] text-muted hover:text-black-900 transition-colors group">
        <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-0.5" /> 企業一覧に戻る
      </Link>

      {/* Header Card */}
      <div className="card relative overflow-hidden p-6">
        <div className="flex flex-col sm:flex-row gap-5">
          <div className="w-20 h-20 rounded bg-black-50 flex items-center justify-center shrink-0 border border-line">
            <span className="text-2xl font-bold text-black-900">{c.name.charAt(0)}</span>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h1 className="h1 text-[1.6rem]">{c.name}</h1>
                <p className="text-red font-semibold text-[14px] mt-0.5">{c.tagline}</p>
              </div>
              <button className="btn-icon border border-line text-black-200 hover:text-red hover:border-red/30"><Heart className="w-4 h-4" /></button>
            </div>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 mt-3">
              {[
                { icon: Briefcase, t: c.industry }, { icon: MapPin, t: c.area }, { icon: Calendar, t: `${c.memberSince}〜` },
              ].map(({ icon: I, t }) => <span key={t} className="flex items-center gap-1.5 caption"><I className="w-3.5 h-3.5 text-red/40" /> {t}</span>)}
              <a href={c.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-[12px] text-red font-medium hover:text-red-700"><Globe className="w-3.5 h-3.5" /> Web <ExternalLink className="w-2.5 h-2.5" /></a>
            </div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2 space-y-5">
          <div className="card">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 rounded bg-red-50 flex items-center justify-center"><Briefcase className="w-3.5 h-3.5 text-red" /></div>
              <h2 className="h3 text-[15px]">事業紹介</h2>
            </div>
            <p className="body mb-4">{c.description}</p>
            <div><span className="label-muted">強み</span><div className="flex flex-wrap gap-1.5">{c.strengths.map((s) => <span key={s} className="badge-muted">{s}</span>)}</div></div>
          </div>

          <div className="card">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 rounded bg-red-50 flex items-center justify-center"><Handshake className="w-3.5 h-3.5 text-red" /></div>
              <h2 className="h3 text-[15px]">提供できること</h2>
            </div>
            <div className="grid sm:grid-cols-3 gap-2.5">
              {c.canProvide.map((i) => <div key={i} className="rounded bg-black-50 border border-line p-4 hover:shadow-sm transition-shadow"><p className="text-[13px] font-semibold text-black-900">{i}</p></div>)}
            </div>
          </div>

          <div className="card">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 rounded bg-green-50 flex items-center justify-center"><Users className="w-3.5 h-3.5 text-green-600" /></div>
              <h2 className="h3 text-[15px]">探していること</h2>
            </div>
            <div className="grid sm:grid-cols-3 gap-2.5">
              {c.lookingFor.map((i) => <div key={i} className="rounded bg-green-50 border border-green-100 p-4"><p className="text-[13px] font-semibold text-black-900">{i}</p></div>)}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="card space-y-2.5">
            <span className="label-muted">アクション</span>
            <Link href="/meeting" className="btn-red w-full shadow-red"><Send className="w-4 h-4 mr-1.5" /> 面談を依頼する</Link>
            <button className="btn-outline w-full"><Users className="w-4 h-4 mr-1.5" /> 紹介を依頼する</button>
            <button className="btn-ghost w-full border border-line text-[12px]"><MessageSquare className="w-4 h-4 mr-1.5" /> 運営に相談する</button>
          </div>
          <div className="card">
            <span className="label-muted">担当者</span>
            <div className="flex items-center gap-3 mt-1">
              <div className="w-10 h-10 rounded bg-black-50 flex items-center justify-center border border-line"><span className="text-[13px] font-bold text-black-900">{c.contactPerson.charAt(0)}</span></div>
              <div><p className="text-[13px] font-semibold text-black-900">{c.contactPerson}</p><p className="caption">{c.name}</p></div>
            </div>
          </div>
          <div className="card">
            <span className="label-muted">活動状況</span>
            <div className="space-y-0 mt-1 divide-y divide-line">
              {[{ l: "イベント参加", v: "3回" }, { l: "相談投稿", v: "2件" }, { l: "面談実施", v: "1件" }].map((x) => (
                <div key={x.l} className="flex items-center justify-between py-2.5"><span className="body-sm">{x.l}</span><span className="text-[13px] font-bold text-black-900">{x.v}</span></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
