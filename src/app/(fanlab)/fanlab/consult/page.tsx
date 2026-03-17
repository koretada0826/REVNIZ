"use client";

import { useState } from "react";
import { Send, CheckCircle, ArrowRight, Paperclip } from "lucide-react";

export default function ConsultPage() {
  const [done, setDone] = useState(false);

  if (done) {
    return (
      <div className="max-w-sm mx-auto text-center py-20 animate-in">
        <div className="w-16 h-16 rounded-lg bg-cyan-50 flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-8 h-8 text-cyan-500" />
        </div>
        <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-cyan-600 block mb-1.5">Sent</span>
        <h1 className="h2 mt-1 mb-3">相談を送信しました</h1>
        <p className="body-sm mb-8">運営チームが内容を確認し、ヒアリングのご連絡をいたします。</p>
        <button onClick={() => setDone(false)} className="inline-flex items-center justify-center font-semibold px-5 py-2.5 text-[13px] rounded bg-cyan-500 text-white hover:bg-cyan-600 transition-all">新しい相談を作成 <ArrowRight className="w-4 h-4 ml-1.5" /></button>
      </div>
    );
  }

  return (
    <div className="animate-in max-w-4xl mx-auto">
      <div className="mb-6">
        <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-cyan-600 block mb-1.5">Consultation</span>
        <h1 className="h1">実証相談フォーム</h1>
        <p className="body-sm mt-1.5">試したいこと・知りたいことをお聞かせください。運営が最適な実施方法を設計します。</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <form onSubmit={(e) => { e.preventDefault(); setDone(true); }} className="lg:col-span-2 card space-y-5">
          <div className="grid sm:grid-cols-2 gap-4">
            <div><label className="label-muted mb-2">会社名 <span className="text-cyan-500">*</span></label><input type="text" className="input" placeholder="株式会社○○" required /></div>
            <div><label className="label-muted mb-2">担当者名 <span className="text-cyan-500">*</span></label><input type="text" className="input" placeholder="山田 太郎" required /></div>
          </div>
          <div><label className="label-muted mb-2">連絡先メールアドレス <span className="text-cyan-500">*</span></label><input type="email" className="input" placeholder="yamada@example.co.jp" required /></div>
          <div><label className="label-muted mb-2">試したいもの <span className="text-cyan-500">*</span></label><input type="text" className="input" placeholder="例：新商品のプロテインバー、家計簿アプリの新機能" required /></div>
          <div><label className="label-muted mb-2">商品・サービス概要 <span className="text-cyan-500">*</span></label><textarea className="input min-h-[90px] resize-y" placeholder="例：20-30代向けの高タンパク低糖質スナック。来月発売予定で、ターゲット層の味評価を取りたい。" required /></div>
          <div><label className="label-muted mb-2">実証したい目的 <span className="text-cyan-500">*</span></label><textarea className="input min-h-[80px] resize-y" placeholder="例：購入意向の確認、味の改善点の把握、ターゲット層との相性検証" required /></div>
          <div>
            <label className="label-muted mb-2">想定している実施方法</label>
            <select className="input"><option value="">選択してください</option><option>試食・試飲サンプリング</option><option>QRアンケート調査</option><option>会場体験ブース</option><option>クーポン配布・来店検証</option><option>ファンクラブ先行モニター</option><option>その他・相談したい</option></select>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div><label className="label-muted mb-2">希望時期</label><input type="text" className="input" placeholder="例：3月下旬〜4月" /></div>
            <div><label className="label-muted mb-2">希望対象</label><select className="input"><option value="">選択してください</option><option>来場者全般</option><option>ファンクラブ会員</option><option>ファミリー層</option><option>20-30代</option><option>その他</option></select></div>
          </div>
          <div><label className="label-muted mb-2">知りたいこと</label><textarea className="input min-h-[70px] resize-y" placeholder="例：購入意向、味評価、価格感、ターゲット適合度" /></div>
          <div>
            <label className="label-muted mb-2">補足事項</label>
            <textarea className="input min-h-[60px] resize-y" placeholder="その他ご要望があればご記載ください" />
            <button type="button" className="mt-2 inline-flex items-center text-[12px] text-muted hover:text-black-900 transition-colors"><Paperclip className="w-3.5 h-3.5 mr-1" /> ファイルを添付</button>
          </div>
          <div className="pt-4 border-t border-line">
            <button type="submit" className="inline-flex items-center justify-center font-semibold px-6 py-3 text-[13px] rounded bg-cyan-500 text-white hover:bg-cyan-600 shadow-sm transition-all">
              <Send className="w-4 h-4 mr-1.5" /> 相談を送信する
            </button>
          </div>
        </form>

        <div className="space-y-4">
          <div className="card">
            <span className="label-muted mb-3">相談例</span>
            <div className="space-y-3 body-sm">
              <p>&ldquo;新商品の試食を300名規模でやりたい&rdquo;</p>
              <p>&ldquo;アプリの登録率が知りたい&rdquo;</p>
              <p>&ldquo;クーポン利用率を計測したい&rdquo;</p>
              <p>&ldquo;家族層へのサービス説明会を開きたい&rdquo;</p>
            </div>
          </div>
          <div className="card">
            <span className="label-muted mb-3">相談後の流れ</span>
            <div className="space-y-2.5">
              {["運営が内容を確認", "ヒアリング実施", "実施方法を設計", "実施決定・準備", "実施・回収", "レポート返却"].map((s, i) => (
                <div key={s} className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-cyan-500 flex items-center justify-center text-[9px] font-bold text-white shrink-0">{i + 1}</span>
                  <span className="body-sm">{s}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
