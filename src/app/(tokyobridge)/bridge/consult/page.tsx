"use client";

import { Send, HelpCircle, ArrowRight, CheckCircle2 } from "lucide-react";

export default function ConsultPage() {
  return (
    <div className="space-y-6 animate-in">
      <div>
        <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-indigo-600 block mb-1.5">Request Meeting</span>
        <h1 className="h1">面談・壁打ち依頼</h1>
        <p className="body-sm mt-1.5">東京企業・専門家との接続依頼をお送りください。運営が調整いたします。</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Form */}
        <div className="lg:col-span-2 card">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-7 h-7 rounded bg-indigo-50 flex items-center justify-center">
              <Send className="w-3.5 h-3.5 text-indigo-500" />
            </div>
            <h2 className="h3 text-[15px]">依頼フォーム</h2>
          </div>

          <div className="space-y-5">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="label-muted mb-2">自社名</label>
                <input type="text" className="input" placeholder="株式会社○○" />
              </div>
              <div>
                <label className="label-muted mb-2">担当者名</label>
                <input type="text" className="input" placeholder="山本 健一" />
              </div>
            </div>

            <div>
              <label className="label-muted mb-2">連絡先メールアドレス</label>
              <input type="email" className="input" placeholder="yamamoto@example.com" />
            </div>

            <div>
              <label className="label-muted mb-2">希望する相手（企業名・専門家名）</label>
              <input type="text" className="input" placeholder="テクノバレー株式会社 / 山田健太郎 など" />
            </div>

            <div>
              <label className="label-muted mb-2">相談テーマ</label>
              <select className="input">
                <option value="">テーマを選択してください</option>
                <option>AI / DX導入</option>
                <option>採用ブランディング</option>
                <option>販路拡大</option>
                <option>新規事業</option>
                <option>ブランディング</option>
                <option>スタートアップ連携</option>
                <option>その他</option>
              </select>
            </div>

            <div>
              <label className="label-muted mb-2">現状の課題</label>
              <textarea className="input min-h-[100px]" placeholder="現在抱えている課題や背景を教えてください..." />
            </div>

            <div>
              <label className="label-muted mb-2">何を得たいか</label>
              <textarea className="input min-h-[80px]" placeholder="面談・壁打ちを通じて何を持ち帰りたいですか..." />
            </div>

            <div>
              <label className="label-muted mb-2">希望形式</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {["オンライン面談", "壁打ち", "視察", "紹介"].map((f) => (
                  <label key={f} className="flex items-center gap-2 rounded-md border border-line p-3 cursor-pointer hover:border-indigo-300 transition-colors">
                    <input type="checkbox" className="rounded border-black-300" />
                    <span className="text-[13px] text-black-900 font-medium">{f}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="label-muted mb-2">希望時期</label>
                <input type="text" className="input" placeholder="3月中旬、4月上旬 など" />
              </div>
              <div>
                <label className="label-muted mb-2">運営同席</label>
                <select className="input">
                  <option>希望する</option>
                  <option>不要</option>
                  <option>どちらでも</option>
                </select>
              </div>
            </div>

            <div>
              <label className="label-muted mb-2">補足・添付資料</label>
              <textarea className="input min-h-[60px]" placeholder="その他伝えたいことがあれば..." />
            </div>

            <button className="w-full inline-flex items-center justify-center font-semibold px-5 py-3 text-[14px] rounded bg-indigo-500 text-white hover:bg-indigo-600 shadow-sm transition-all">
              依頼を送信する <ArrowRight className="w-4 h-4 ml-1.5" />
            </button>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          <div className="card">
            <div className="flex items-center gap-2 mb-4">
              <HelpCircle className="w-4 h-4 text-indigo-500" />
              <span className="text-[13px] font-bold text-black-900">記入のヒント</span>
            </div>
            <div className="space-y-3">
              {[
                "「課題」は具体的に書くほど、適切な相手を紹介しやすくなります",
                "例：「DXを進めたいが何から始めるか分からない」",
                "例：「東京の百貨店に商品を置きたいが接点がない」",
                "例：「採用サイトを改善したいがプロの意見が欲しい」",
              ].map((tip, i) => (
                <p key={i} className="text-[12px] text-black-400 leading-relaxed">{tip}</p>
              ))}
            </div>
          </div>

          <div className="card">
            <span className="text-[13px] font-bold text-black-900 block mb-3">相談後の流れ</span>
            <div className="space-y-3">
              {[
                { step: "1", text: "運営が内容を確認" },
                { step: "2", text: "相手候補の選定・打診" },
                { step: "3", text: "日程調整" },
                { step: "4", text: "面談・壁打ち実施" },
                { step: "5", text: "事後フォロー" },
              ].map((s) => (
                <div key={s.step} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-indigo-50 flex items-center justify-center shrink-0">
                    <span className="text-[11px] font-bold text-indigo-700">{s.step}</span>
                  </div>
                  <span className="text-[12px] text-black-500 font-medium">{s.text}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-md bg-indigo-50 border border-indigo-100 p-4">
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
              <p className="text-[12px] text-indigo-700 leading-relaxed">
                送信後、通常1〜2営業日以内に運営からご連絡いたします。
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
