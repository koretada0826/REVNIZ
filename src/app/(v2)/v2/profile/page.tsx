"use client";

import { useState } from "react";
import { Save, Upload, Plus, X, Check } from "lucide-react";

export default function ProfileV2Page() {
  const [canProvide, setCanProvide] = useState(["DXコンサルティング", "システム開発", "データ活用支援"]);
  const [lookingFor, setLookingFor] = useState(["地場企業との協業", "販路拡大パートナー"]);
  const [np, setNp] = useState(""); const [nl, setNl] = useState("");

  const addTag = (list: string[], set: (v: string[]) => void, val: string, clear: () => void) => {
    if (val.trim()) { set([...list, val.trim()]); clear(); }
  };

  const inputClass = "w-full rounded-md px-4 py-3 bg-white/[0.04] border border-white/[0.08] text-white text-[14px] placeholder:text-white/20 focus:outline-none focus:border-white/20 transition-all";

  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-in">
      <div>
        <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-red block mb-1.5">Profile</span>
        <h1 className="text-[2rem] font-bold text-white tracking-tight leading-[1.1] whitespace-nowrap">自社プロフィール編集</h1>
        <p className="text-[13px] text-white/40 leading-relaxed mt-1.5">情報を充実させるほど、マッチング精度が上がります</p>
      </div>

      <div className="rounded-lg border border-red/20 bg-red/[0.04] p-6">
        <div className="flex items-center justify-between mb-2.5">
          <span className="text-[10px] font-bold tracking-[0.15em] uppercase text-white/30">プロフィール充足率</span>
          <span className="text-[22px] font-bold text-red leading-none">75%</span>
        </div>
        <div className="h-1.5 rounded-full bg-white/10 overflow-hidden mb-2">
          <div className="h-full rounded-full bg-red w-3/4" />
        </div>
        <p className="text-[11px] text-white/30 flex items-center gap-1"><Check className="w-3 h-3 text-red-400" /> 「探していること」を追加するとマッチング精度が向上します</p>
      </div>

      <form className="space-y-5">
        <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-6">
          <span className="text-[10px] font-bold tracking-[0.15em] uppercase text-white/30 block mb-4">基本情報</span>
          <div className="flex items-center gap-4 mb-5">
            <div className="w-16 h-16 rounded bg-white/[0.06] flex items-center justify-center border border-white/[0.08]"><span className="text-xl font-bold text-white">南</span></div>
            <button type="button" className="text-[12px] font-medium text-white/40 hover:text-white px-3 py-1.5 rounded border border-white/[0.08] hover:border-white/20 transition-all flex items-center"><Upload className="w-4 h-4 mr-1.5" /> ロゴをアップロード</button>
          </div>
          <div className="grid grid-cols-1 gap-4">
            <div><label className="text-[10px] font-bold tracking-[0.15em] uppercase text-white/30 block mb-2">企業名</label><input type="text" className={inputClass} defaultValue="南九州テクノロジーズ" /></div>
            <div><label className="text-[10px] font-bold tracking-[0.15em] uppercase text-white/30 block mb-2">業種</label><select className={inputClass} defaultValue="IT・テクノロジー"><option>IT・テクノロジー</option><option>食品・飲料</option><option>広告・クリエイティブ</option><option>建設・不動産</option><option>人材・HR</option><option>マーケティング</option></select></div>
            <div><label className="text-[10px] font-bold tracking-[0.15em] uppercase text-white/30 block mb-2">所在地</label><input type="text" className={inputClass} defaultValue="鹿児島市" /></div>
            <div><label className="text-[10px] font-bold tracking-[0.15em] uppercase text-white/30 block mb-2">WebサイトURL</label><input type="url" className={inputClass} defaultValue="https://example.com" /></div>
          </div>
        </div>

        <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-6">
          <span className="text-[10px] font-bold tracking-[0.15em] uppercase text-white/30 block mb-4">企業紹介</span>
          <textarea className={`${inputClass} min-h-[120px] resize-y`} defaultValue="中小企業のDX推進を支援するIT企業。クラウドシステム構築からデータ活用まで、一気通貫でサポートします。" />
        </div>

        <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-6">
          <span className="text-[10px] font-bold tracking-[0.15em] uppercase text-white/30 block mb-4">提供できること</span>
          <div className="flex flex-wrap gap-1.5 mb-3">
            {canProvide.map((t) => <span key={t} className="inline-flex items-center gap-1 rounded-sm px-2 py-[4px] text-[10px] font-bold bg-white/[0.06] text-white/50">{t}<button type="button" onClick={() => setCanProvide(canProvide.filter((x) => x !== t))}><X className="w-2.5 h-2.5" /></button></span>)}
          </div>
          <div className="flex gap-2"><input type="text" className={`${inputClass} flex-1`} placeholder="追加する項目" value={np} onChange={(e) => setNp(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addTag(canProvide, setCanProvide, np, () => setNp("")); } }} /><button type="button" onClick={() => addTag(canProvide, setCanProvide, np, () => setNp(""))} className="w-9 h-9 rounded flex items-center justify-center text-white/40 hover:text-white border border-white/[0.08] hover:border-white/20 transition-all"><Plus className="w-4 h-4" /></button></div>
        </div>

        <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-6">
          <span className="text-[10px] font-bold tracking-[0.15em] uppercase text-white/30 block mb-4">探していること</span>
          <div className="flex flex-wrap gap-1.5 mb-3">
            {lookingFor.map((t) => <span key={t} className="inline-flex items-center gap-1 rounded-sm px-2 py-[4px] text-[10px] font-bold bg-emerald-500/10 text-emerald-400">{t}<button type="button" onClick={() => setLookingFor(lookingFor.filter((x) => x !== t))}><X className="w-2.5 h-2.5" /></button></span>)}
          </div>
          <div className="flex gap-2"><input type="text" className={`${inputClass} flex-1`} placeholder="追加する項目" value={nl} onChange={(e) => setNl(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addTag(lookingFor, setLookingFor, nl, () => setNl("")); } }} /><button type="button" onClick={() => addTag(lookingFor, setLookingFor, nl, () => setNl(""))} className="w-9 h-9 rounded flex items-center justify-center text-white/40 hover:text-white border border-white/[0.08] hover:border-white/20 transition-all"><Plus className="w-4 h-4" /></button></div>
        </div>

        <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-6">
          <span className="text-[10px] font-bold tracking-[0.15em] uppercase text-white/30 block mb-4">担当者情報</span>
          <div className="grid grid-cols-1 gap-4">
            <div><label className="text-[10px] font-bold tracking-[0.15em] uppercase text-white/30 block mb-2">担当者名</label><input type="text" className={inputClass} defaultValue="田中 太郎" /></div>
            <div><label className="text-[10px] font-bold tracking-[0.15em] uppercase text-white/30 block mb-2">公開範囲</label><select className={inputClass} defaultValue="members"><option value="members">会員のみ</option><option value="admin">運営のみ</option></select></div>
          </div>
        </div>

        <div className="flex gap-2.5">
          <button type="button" className="btn-red shadow-red"><Save className="w-4 h-4 mr-1.5" /> 保存する</button>
          <button type="button" className="text-[12px] font-medium text-white/40 hover:text-white px-3.5 py-2 rounded border border-white/[0.08] hover:border-white/20 transition-all">下書き保存</button>
        </div>
      </form>
    </div>
  );
}
