"use client";

import { useState } from "react";
import { Save, Upload, Plus, X, Check, TrendingUp, Building2, FileText, Handshake, Users, User } from "lucide-react";

export default function ProfilePage() {
  const [canProvide, setCanProvide] = useState(["DXコンサルティング", "システム開発", "データ活用支援"]);
  const [lookingFor, setLookingFor] = useState(["地場企業との協業", "販路拡大パートナー"]);
  const [np, setNp] = useState(""); const [nl, setNl] = useState("");

  const addTag = (list: string[], set: (v: string[]) => void, val: string, clear: () => void) => {
    if (val.trim()) { set([...list, val.trim()]); clear(); }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <p className="label">Profile</p>
        <h1 className="h1">自社プロフィール編集</h1>
        <p className="body-sm mt-2">情報を充実させるほど、マッチング精度が上がります</p>
      </div>

      {/* Progress */}
      <div className="card-red p-0 overflow-hidden">
        <div className="p-6">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[10px] font-bold text-black-400 tracking-[0.1em] uppercase">プロフィール充足率</span>
            <span className="text-[22px] font-bold text-black-900 leading-none tracking-tight">75<span className="text-[13px] text-black-400">%</span></span>
          </div>
          <div className="progress-bar h-2 mb-2">
            <div className="progress-fill bg-red w-3/4" />
          </div>
          <p className="caption flex items-center gap-1"><Check className="w-3 h-3 text-black-400" /> 「探していること」を追加するとマッチング精度が向上します</p>
        </div>
      </div>

      <form className="space-y-5">
        <div className="card">
          <h3 className="h3 text-[14px] mb-5">基本情報</h3>
          <div className="flex items-center gap-4 mb-5">
            <div className="avatar-lg">{`南`}</div>
            <button type="button" className="btn-outline btn-sm text-[12px]"><Upload className="w-3.5 h-3.5 mr-1.5" /> ロゴをアップロード</button>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div><label className="label-muted mb-2">企業名</label><input type="text" className="input" defaultValue="南九州テクノロジーズ" /></div>
            <div><label className="label-muted mb-2">業種</label><select className="input" defaultValue="IT・テクノロジー"><option>IT・テクノロジー</option><option>食品・飲料</option><option>広告・クリエイティブ</option><option>建設・不動産</option><option>人材・HR</option><option>マーケティング</option></select></div>
            <div><label className="label-muted mb-2">所在地</label><input type="text" className="input" defaultValue="鹿児島市" /></div>
            <div><label className="label-muted mb-2">WebサイトURL</label><input type="url" className="input" defaultValue="https://example.com" /></div>
          </div>
        </div>

        <div className="card">
          <h3 className="h3 text-[14px] mb-5">企業紹介</h3>
          <textarea className="input min-h-[120px] resize-y" defaultValue="中小企業のDX推進を支援するIT企業。クラウドシステム構築からデータ活用まで、一気通貫でサポートします。" />
        </div>

        <div className="card">
          <h3 className="h3 text-[14px] mb-5">提供できること</h3>
          <div className="flex flex-wrap gap-1.5 mb-3">
            {canProvide.map((t) => (
              <span key={t} className="inline-flex items-center gap-1.5 rounded-md bg-black-50 border border-line px-3 py-1.5 text-[12px] font-medium text-black-700">
                {t}
                <button type="button" onClick={() => setCanProvide(canProvide.filter((x) => x !== t))} className="hover:bg-black-200 rounded-full p-0.5 transition-colors"><X className="w-2.5 h-2.5" /></button>
              </span>
            ))}
          </div>
          <div className="flex gap-2">
            <input type="text" className="input flex-1" placeholder="追加する項目" value={np} onChange={(e) => setNp(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addTag(canProvide, setCanProvide, np, () => setNp("")); } }} />
            <button type="button" onClick={() => addTag(canProvide, setCanProvide, np, () => setNp(""))} className="btn-icon border border-line rounded-md"><Plus className="w-4 h-4" /></button>
          </div>
        </div>

        <div className="card">
          <h3 className="h3 text-[14px] mb-5">探していること</h3>
          <div className="flex flex-wrap gap-1.5 mb-3">
            {lookingFor.map((t) => (
              <span key={t} className="inline-flex items-center gap-1.5 rounded-md bg-emerald-50 border border-emerald-100 px-3 py-1.5 text-[12px] font-medium text-emerald-700">
                {t}
                <button type="button" onClick={() => setLookingFor(lookingFor.filter((x) => x !== t))} className="hover:bg-emerald-200 rounded-full p-0.5 transition-colors"><X className="w-2.5 h-2.5" /></button>
              </span>
            ))}
          </div>
          <div className="flex gap-2">
            <input type="text" className="input flex-1" placeholder="追加する項目" value={nl} onChange={(e) => setNl(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addTag(lookingFor, setLookingFor, nl, () => setNl("")); } }} />
            <button type="button" onClick={() => addTag(lookingFor, setLookingFor, nl, () => setNl(""))} className="btn-icon border border-line rounded-md"><Plus className="w-4 h-4" /></button>
          </div>
        </div>

        <div className="card">
          <h3 className="h3 text-[14px] mb-5">担当者情報</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            <div><label className="label-muted mb-2">担当者名</label><input type="text" className="input" defaultValue="田中 太郎" /></div>
            <div><label className="label-muted mb-2">公開範囲</label><select className="input" defaultValue="members"><option value="members">会員のみ</option><option value="admin">運営のみ</option></select></div>
          </div>
        </div>

        <div className="flex gap-2.5 pt-2">
          <button type="button" className="btn-red"><Save className="w-4 h-4 mr-1.5" /> 保存する</button>
          <button type="button" className="btn-outline btn-sm text-[12px]">下書き保存</button>
        </div>
      </form>
    </div>
  );
}
