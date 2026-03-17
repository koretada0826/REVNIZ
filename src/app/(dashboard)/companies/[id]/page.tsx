"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, MapPin, Globe, Briefcase, Heart, Calendar, ExternalLink, MessageSquare, Users, Handshake, Send, TrendingUp, Shield } from "lucide-react";
import { companies } from "@/data/mock";

export default function CompanyDetailPage() {
  const params = useParams();
  const c = companies.find((x) => x.id === params.id);
  if (!c) return <div className="text-center py-20"><p className="body">企業が見つかりません</p><Link href="/companies" className="btn-black mt-4">一覧に戻る</Link></div>;

  return (
    <div className="space-y-6">
      <Link href="/companies" className="inline-flex items-center gap-2 text-[14px] text-muted hover:text-black-900 transition-colors">
        <ArrowLeft className="w-4 h-4" /> 企業一覧に戻る
      </Link>

      <div className="card p-8">
        <div className="flex flex-col sm:flex-row gap-6">
          <div className="avatar-xl shrink-0">{c.name.charAt(0)}</div>
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h1 className="h1">{c.name}</h1>
                <p className="text-[16px] text-black-400 mt-2">{c.tagline}</p>
              </div>
              <button className="btn-icon border border-line text-black-200 hover:text-red hover:bg-red-50 rounded-md"><Heart className="w-5 h-5" /></button>
            </div>
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mt-5">
              {[
                { icon: Briefcase, t: c.industry }, { icon: MapPin, t: c.area }, { icon: Calendar, t: `${c.memberSince}〜` },
              ].map(({ icon: I, t }) => (
                <span key={t} className="flex items-center gap-2 text-[14px] text-black-400">
                  <I className="w-4 h-4 text-black-300" /> {t}
                </span>
              ))}
              <a href={c.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-[14px] text-red font-medium hover:text-red-700 transition-colors">
                <Globe className="w-4 h-4" /> Web <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2 space-y-5">
          <div className="card">
            <h2 className="h2 mb-5">事業紹介</h2>
            <p className="body mb-6 leading-[1.8]">{c.description}</p>
            <div>
              <span className="label-muted mb-3">強み</span>
              <div className="flex flex-wrap gap-2 mt-1">
                {c.strengths.map((s) => (
                  <span key={s} className="inline-flex items-center gap-2 rounded-md bg-black-50 border border-line px-4 py-2 text-[14px] font-medium text-black-600">
                    <Shield className="w-4 h-4 text-black-400" /> {s}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="card">
            <h2 className="h2 mb-5">提供できること</h2>
            <div className="grid sm:grid-cols-3 gap-3">
              {c.canProvide.map((i) => (
                <div key={i} className="rounded-md bg-black-50 border border-line p-4">
                  <p className="text-[15px] font-semibold text-black-900">{i}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="card">
            <h2 className="h2 mb-5">探していること</h2>
            <div className="grid sm:grid-cols-3 gap-3">
              {c.lookingFor.map((i) => (
                <div key={i} className="rounded-md bg-emerald-50 border border-emerald-100 p-4">
                  <p className="text-[15px] font-semibold text-black-900">{i}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="card space-y-3">
            <span className="label-muted">アクション</span>
            <Link href="/meeting" className="btn-red w-full"><Send className="w-4 h-4 mr-2" /> 面談を依頼する</Link>
            <button className="btn-outline w-full"><Users className="w-4 h-4 mr-2" /> 紹介を依頼する</button>
            <button className="btn-ghost w-full border border-line"><MessageSquare className="w-4 h-4 mr-2" /> 運営に相談する</button>
          </div>

          <div className="card">
            <span className="label-muted">担当者</span>
            <div className="flex items-center gap-4 mt-3">
              <div className="avatar-md">{c.contactPerson.charAt(0)}</div>
              <div>
                <p className="text-[15px] font-semibold text-black-900">{c.contactPerson}</p>
                <p className="text-[13px] text-black-400">{c.name}</p>
              </div>
            </div>
          </div>

          <div className="card">
            <span className="label-muted">活動状況</span>
            <div className="space-y-0 mt-3 divide-y divide-line">
              {[
                { l: "イベント参加", v: "3回", icon: Calendar },
                { l: "相談投稿", v: "2件", icon: MessageSquare },
                { l: "面談実施", v: "1件", icon: TrendingUp },
              ].map((x) => (
                <div key={x.l} className="flex items-center justify-between py-4">
                  <span className="text-[14px] text-black-400 flex items-center gap-2">
                    <x.icon className="w-4 h-4 text-black-300" /> {x.l}
                  </span>
                  <span className="text-[16px] font-bold text-black-900 tabular-nums">{x.v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
