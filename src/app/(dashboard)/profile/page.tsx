"use client";

import { useState } from "react";
import { Save, Upload, Plus, X, Check } from "lucide-react";
import { toast } from "sonner";
import FadeIn from "@/components/motion/FadeIn";
import AnimatedNumber from "@/components/ui/AnimatedNumber";

export default function ProfilePage() {
  const [canProvide, setCanProvide] = useState(["DXコンサルティング", "システム開発", "データ活用支援"]);
  const [lookingFor, setLookingFor] = useState(["地場企業との協業", "販路拡大パートナー"]);
  const [np, setNp] = useState(""); const [nl, setNl] = useState("");

  const addTag = (list: string[], set: (v: string[]) => void, val: string, clear: () => void) => {
    if (val.trim()) { set([...list, val.trim()]); clear(); }
  };

  return (
    <FadeIn><div className="max-w-2xl mx-auto space-y-6">
      <div>
        <p className="label">Profile</p>
        <h1 className="h1">自社プロフィール編集</h1>
        <p className="body mt-3">情報を充実させるほど、マッチング精度が上がります</p>
      </div>

      {/* Progress */}
      <div className="card-red p-0 overflow-hidden">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <span className="label mb-0">プロフィール充足率</span>
            <span className="text-[28px] font-bold text-black-900 leading-none tracking-tight"><AnimatedNumber value={75} suffix="%" /></span>
          </div>
          <div className="progress-bar h-2 mb-3">
            <div className="progress-fill bg-red w-3/4" />
          </div>
          <p className="text-[13px] text-black-400 flex items-center gap-1.5"><Check className="w-4 h-4 text-black-400" /> 「探していること」を追加するとマッチング精度が向上します</p>
        </div>
      </div>

      <form className="space-y-5">
        <div className="card">
          <h3 className="h3 mb-6">基本情報</h3>
          <div className="flex items-center gap-5 mb-6">
            <div className="avatar-lg">{`南`}</div>
            <button type="button" className="btn-outline btn-sm"><Upload className="w-4 h-4 mr-2" /> ロゴをアップロード</button>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div><label className="label-muted mb-2">企業名</label><input type="text" className="input py-3.5 text-[15px]" defaultValue="南九州テクノロジーズ" /></div>
            <div><label className="label-muted mb-2">業種</label><select className="input py-3.5 text-[15px]" defaultValue="IT・テクノロジー"><option>IT・テクノロジー</option><option>食品・飲料</option><option>広告・クリエイティブ</option><option>建設・不動産</option><option>人材・HR</option><option>マーケティング</option></select></div>
            <div><label className="label-muted mb-2">所在地</label><input type="text" className="input py-3.5 text-[15px]" defaultValue="鹿児島市" /></div>
            <div><label className="label-muted mb-2">WebサイトURL</label><input type="url" className="input py-3.5 text-[15px]" defaultValue="https://example.com" /></div>
          </div>
        </div>

        <div className="card">
          <h3 className="h3 mb-6">企業紹介</h3>
          <textarea className="input min-h-[130px] resize-y text-[15px]" defaultValue="中小企業のDX推進を支援するIT企業。クラウドシステム構築からデータ活用まで、一気通貫でサポートします。" />
        </div>

        <div className="card">
          <h3 className="h3 mb-6">提供できること</h3>
          <div className="flex flex-wrap gap-2 mb-4">
            {canProvide.map((t) => (
              <span key={t} className="inline-flex items-center gap-2 rounded-md bg-black-50 border border-line px-4 py-2 text-[14px] font-medium text-black-700">
                {t}
                <button type="button" onClick={() => setCanProvide(canProvide.filter((x) => x !== t))} className="hover:bg-black-200 rounded-full p-0.5 transition-colors"><X className="w-3 h-3" /></button>
              </span>
            ))}
          </div>
          <div className="flex gap-2">
            <input type="text" className="input flex-1 py-3.5 text-[15px]" placeholder="追加する項目" value={np} onChange={(e) => setNp(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addTag(canProvide, setCanProvide, np, () => setNp("")); } }} />
            <button type="button" onClick={() => addTag(canProvide, setCanProvide, np, () => setNp(""))} className="btn-icon border border-line rounded-md"><Plus className="w-5 h-5" /></button>
          </div>
        </div>

        <div className="card">
          <h3 className="h3 mb-6">探していること</h3>
          <div className="flex flex-wrap gap-2 mb-4">
            {lookingFor.map((t) => (
              <span key={t} className="inline-flex items-center gap-2 rounded-md bg-emerald-50 border border-emerald-100 px-4 py-2 text-[14px] font-medium text-emerald-700">
                {t}
                <button type="button" onClick={() => setLookingFor(lookingFor.filter((x) => x !== t))} className="hover:bg-emerald-200 rounded-full p-0.5 transition-colors"><X className="w-3 h-3" /></button>
              </span>
            ))}
          </div>
          <div className="flex gap-2">
            <input type="text" className="input flex-1 py-3.5 text-[15px]" placeholder="追加する項目" value={nl} onChange={(e) => setNl(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addTag(lookingFor, setLookingFor, nl, () => setNl("")); } }} />
            <button type="button" onClick={() => addTag(lookingFor, setLookingFor, nl, () => setNl(""))} className="btn-icon border border-line rounded-md"><Plus className="w-5 h-5" /></button>
          </div>
        </div>

        <div className="card">
          <h3 className="h3 mb-6">担当者情報</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            <div><label className="label-muted mb-2">担当者名</label><input type="text" className="input py-3.5 text-[15px]" defaultValue="田中 太郎" /></div>
            <div><label className="label-muted mb-2">公開範囲</label><select className="input py-3.5 text-[15px]" defaultValue="members"><option value="members">会員のみ</option><option value="admin">運営のみ</option></select></div>
          </div>
        </div>

        <div className="flex gap-3 pt-3">
          <button type="button" onClick={() => toast.success("プロフィールを保存しました")} className="btn-red text-[15px] px-8 py-3.5"><Save className="w-5 h-5 mr-2" /> 保存する</button>
          <button type="button" className="btn-outline btn-sm">下書き保存</button>
        </div>
      </form>
    </div></FadeIn>
  );
}
