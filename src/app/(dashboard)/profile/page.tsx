"use client";

import { useState } from "react";
import { Save, Upload, Plus, X, Check } from "lucide-react";

export default function ProfilePage() {
  const [canProvide, setCanProvide] = useState(["DXコンサルティング", "システム開発", "データ活用支援"]);
  const [lookingFor, setLookingFor] = useState(["地場企業との協業", "販路拡大パートナー"]);
  const [np, setNp] = useState(""); const [nl, setNl] = useState("");

  const addTag = (list: string[], set: (v: string[]) => void, val: string, clear: () => void) => {
    if (val.trim()) { set([...list, val.trim()]); clear(); }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-in">
      <div>
        <span className="label">Profile</span>
        <h1 className="h1">自社プロフィール編集</h1>
        <p className="body-sm mt-1.5">情報を充実させるほど、マッチング精度が上がります</p>
      </div>

      <div className="card-red">
        <div className="flex items-center justify-between mb-2.5">
          <span className="label-muted mb-0">プロフィール充足率</span>
          <span className="text-[22px] font-bold text-red leading-none">75%</span>
        </div>
        <div className="h-1.5 rounded-full bg-red-100 overflow-hidden mb-2">
          <div className="h-full rounded-full bg-red w-3/4" />
        </div>
        <p className="caption flex items-center gap-1"><Check className="w-3 h-3 text-red" /> 「探していること」を追加するとマッチング精度が向上します</p>
      </div>

      <form className="space-y-5">
        <div className="card">
          <span className="label-muted mb-4">基本情報</span>
          <div className="flex items-center gap-4 mb-5">
            <div className="w-16 h-16 rounded bg-black-50 flex items-center justify-center border border-line"><span className="text-xl font-bold text-black-900">南</span></div>
            <button type="button" className="btn-ghost border border-line text-[12px]"><Upload className="w-4 h-4 mr-1.5" /> ロゴをアップロード</button>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div><label className="label-muted mb-2">企業名</label><input type="text" className="input" defaultValue="南九州テクノロジーズ" /></div>
            <div><label className="label-muted mb-2">業種</label><select className="input" defaultValue="IT・テクノロジー"><option>IT・テクノロジー</option><option>食品・飲料</option><option>広告・クリエイティブ</option><option>建設・不動産</option><option>人材・HR</option><option>マーケティング</option></select></div>
            <div><label className="label-muted mb-2">所在地</label><input type="text" className="input" defaultValue="鹿児島市" /></div>
            <div><label className="label-muted mb-2">WebサイトURL</label><input type="url" className="input" defaultValue="https://example.com" /></div>
          </div>
        </div>

        <div className="card">
          <span className="label-muted mb-4">企業紹介</span>
          <textarea className="input min-h-[120px] resize-y" defaultValue="中小企業のDX推進を支援するIT企業。クラウドシステム構築からデータ活用まで、一気通貫でサポートします。" />
        </div>

        <div className="card">
          <span className="label-muted mb-4">提供できること</span>
          <div className="flex flex-wrap gap-1.5 mb-3">
            {canProvide.map((t) => <span key={t} className="badge-muted flex items-center gap-1 pr-1 py-[4px]">{t}<button type="button" onClick={() => setCanProvide(canProvide.filter((x) => x !== t))}><X className="w-2.5 h-2.5" /></button></span>)}
          </div>
          <div className="flex gap-2"><input type="text" className="input flex-1" placeholder="追加する項目" value={np} onChange={(e) => setNp(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addTag(canProvide, setCanProvide, np, () => setNp("")); } }} /><button type="button" onClick={() => addTag(canProvide, setCanProvide, np, () => setNp(""))} className="btn-icon border border-line"><Plus className="w-4 h-4" /></button></div>
        </div>

        <div className="card">
          <span className="label-muted mb-4">探していること</span>
          <div className="flex flex-wrap gap-1.5 mb-3">
            {lookingFor.map((t) => <span key={t} className="badge-green flex items-center gap-1 pr-1 py-[4px]">{t}<button type="button" onClick={() => setLookingFor(lookingFor.filter((x) => x !== t))}><X className="w-2.5 h-2.5" /></button></span>)}
          </div>
          <div className="flex gap-2"><input type="text" className="input flex-1" placeholder="追加する項目" value={nl} onChange={(e) => setNl(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addTag(lookingFor, setLookingFor, nl, () => setNl("")); } }} /><button type="button" onClick={() => addTag(lookingFor, setLookingFor, nl, () => setNl(""))} className="btn-icon border border-line"><Plus className="w-4 h-4" /></button></div>
        </div>

        <div className="card">
          <span className="label-muted mb-4">担当者情報</span>
          <div className="grid sm:grid-cols-2 gap-4">
            <div><label className="label-muted mb-2">担当者名</label><input type="text" className="input" defaultValue="田中 太郎" /></div>
            <div><label className="label-muted mb-2">公開範囲</label><select className="input" defaultValue="members"><option value="members">会員のみ</option><option value="admin">運営のみ</option></select></div>
          </div>
        </div>

        <div className="flex gap-2.5">
          <button type="button" className="btn-red shadow-red"><Save className="w-4 h-4 mr-1.5" /> 保存する</button>
          <button type="button" className="btn-ghost border border-line text-[12px]">下書き保存</button>
        </div>
      </form>
    </div>
  );
}
