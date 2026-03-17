"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, CalendarDays, Users, MapPin, Clock, CheckCircle2, ArrowRight } from "lucide-react";
import { bridgeEvents } from "@/data/bridge-mock";

const formatLabels: Record<string, string> = { online: "オンライン", offline: "オフライン", hybrid: "ハイブリッド" };
const formatColors: Record<string, string> = { online: "bg-indigo-50 text-indigo-700", offline: "bg-amber-50 text-amber-700", hybrid: "bg-emerald-50 text-emerald-700" };

export default function EventDetailPage() {
  const params = useParams();
  const ev = bridgeEvents.find((x) => x.id === params.id);
  if (!ev) return <div className="text-center py-20"><p className="body">イベントが見つかりません</p></div>;

  const remaining = ev.capacity - ev.registered;
  const pct = Math.round((ev.registered / ev.capacity) * 100);

  return (
    <div className="space-y-6 animate-in">
      <Link href="/bridge/events" className="inline-flex items-center gap-1.5 text-[13px] text-muted hover:text-black-900 transition-colors group">
        <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-0.5" /> イベント一覧に戻る
      </Link>

      {/* Header */}
      <div className="bg-white rounded-md border-2 border-indigo-100 p-8 shadow-sm">
        <div className="flex items-center gap-2 mb-3">
          <span className={`badge ${formatColors[ev.format]}`}>{formatLabels[ev.format]}</span>
          <span className="badge badge-muted">{ev.type}</span>
          <span className="badge bg-indigo-50 text-indigo-700">{ev.theme}</span>
        </div>
        <h1 className="h1 text-[1.6rem] mb-3">{ev.title}</h1>
        <div className="flex flex-wrap items-center gap-4 caption">
          <span className="flex items-center gap-1"><CalendarDays className="w-3.5 h-3.5 text-indigo-500/50" /> {ev.date}</span>
          <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-indigo-500/50" /> {ev.time}</span>
          <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5 text-indigo-500/50" /> 定員 {ev.capacity}名</span>
          <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-indigo-500/50" /> {formatLabels[ev.format]}</span>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2 space-y-5">
          {/* Description */}
          <div className="card">
            <h2 className="h3 text-[15px] mb-4">イベント概要</h2>
            <p className="body leading-[1.8]">{ev.description}</p>
          </div>

          {/* What you get */}
          <div className="card">
            <h2 className="h3 text-[15px] mb-4">参加して持ち帰れること</h2>
            <div className="space-y-2">
              {[
                "東京企業・専門家との直接対話の機会",
                "自社課題に対する具体的なヒント・アドバイス",
                "次のアクションにつながる人脈と情報",
                "同じ課題を持つ鹿児島企業とのネットワーク",
              ].map((item) => (
                <div key={item} className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
                  <p className="body">{item}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Speakers */}
          <div className="card">
            <h2 className="h3 text-[15px] mb-4">登壇者・参加企業</h2>
            <div className="space-y-2">
              {ev.speakers.map((s) => (
                <div key={s} className="flex items-center gap-3 rounded-md bg-black-50 p-3">
                  <div className="w-9 h-9 rounded-full bg-indigo-50 flex items-center justify-center shrink-0">
                    <Users className="w-4 h-4 text-indigo-500" />
                  </div>
                  <span className="text-[13px] font-medium text-black-900">{s}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Schedule */}
          <div className="card">
            <h2 className="h3 text-[15px] mb-4">当日の流れ</h2>
            <div className="space-y-3">
              {[
                { time: "開始", desc: "オープニング・趣旨説明" },
                { time: "前半", desc: "ゲスト講演 / プレゼンテーション" },
                { time: "中盤", desc: "質疑応答 / ディスカッション" },
                { time: "後半", desc: "個別相談タイム / ネットワーキング" },
                { time: "終了", desc: "クロージング・次回案内" },
              ].map((s, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="w-16 text-right shrink-0">
                    <span className="text-[11px] font-bold text-indigo-600">{s.time}</span>
                  </div>
                  <div className="w-2 h-2 rounded-full bg-indigo-500 shrink-0" />
                  <span className="body">{s.desc}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          <div className="card">
            <span className="label-muted mb-3">参加状況</span>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[24px] font-bold text-black-900">{ev.registered}<span className="text-[14px] text-black-300 font-normal">/{ev.capacity}名</span></span>
            </div>
            <div className="h-2.5 rounded-full bg-black-100 overflow-hidden mb-2">
              <div className="h-full rounded-full bg-indigo-500 transition-all" style={{ width: `${pct}%` }} />
            </div>
            <p className="text-[12px] text-indigo-600 font-semibold">残り{remaining}枠</p>
          </div>

          <div className="card">
            <span className="label-muted mb-3">開催概要</span>
            <div className="space-y-0 divide-y divide-line">
              {[
                { l: "日時", v: `${ev.date} ${ev.time}` },
                { l: "形式", v: formatLabels[ev.format] },
                { l: "テーマ", v: ev.theme },
                { l: "定員", v: `${ev.capacity}名` },
              ].map((x) => (
                <div key={x.l} className="flex items-center justify-between py-2.5">
                  <span className="body-sm">{x.l}</span>
                  <span className="text-[12px] font-bold text-black-900">{x.v}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="card space-y-3">
            <button className="w-full inline-flex items-center justify-center font-semibold px-5 py-2.5 text-[13px] rounded bg-indigo-500 text-white hover:bg-indigo-600 shadow-sm transition-all">
              このイベントに申し込む <ArrowRight className="w-4 h-4 ml-1.5" />
            </button>
            <Link href="/bridge/consult" className="btn-ghost w-full border border-line text-[12px]">
              個別面談を依頼する
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
