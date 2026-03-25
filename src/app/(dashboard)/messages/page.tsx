"use client";

import { useState } from "react";
import { Send, MessageSquare, ArrowLeft } from "lucide-react";
import { notifications, companies } from "@/data/mock";
import FadeIn from "@/components/motion/FadeIn";
import { toast } from "sonner";

const threads = notifications.filter((n) => n.type === "reaction" || n.type === "message");

export default function MessagesPage() {
  const [selectedId, setSelectedId] = useState<string>(threads[0]?.id || "");
  const [replyText, setReplyText] = useState("");
  const [sentMessages, setSentMessages] = useState<Record<string, string[]>>({});
  const [mobileView, setMobileView] = useState<"list" | "chat">("list");

  const selected = threads.find((n) => n.id === selectedId);
  const selectedCompany = selected ? companies.find((c) => c.id === selected.fromCompanyId) : null;
  const unreadCount = threads.filter((n) => !n.read).length;

  const handleSend = () => {
    if (!replyText.trim() || !selectedId) return;
    setSentMessages((prev) => ({
      ...prev,
      [selectedId]: [...(prev[selectedId] || []), replyText],
    }));
    setReplyText("");
    toast("メッセージを送信しました");
  };

  const selectThread = (id: string) => {
    setSelectedId(id);
    setMobileView("chat");
  };

  return (
    <FadeIn><div className="space-y-4">
      <div>
        <p className="label">Messages</p>
        <h1 className="h1">メッセージ</h1>
      </div>

      {/* チャットレイアウト */}
      <div
        className="flex rounded-xl overflow-hidden border border-line"
        style={{ height: "calc(100vh - 220px)", minHeight: "400px" }}
      >
        {/* 左: スレッド一覧 */}
        <div
          className={`w-full sm:w-[320px] shrink-0 border-r border-line overflow-y-auto ${
            mobileView === "chat" ? "hidden sm:block" : "block"
          }`}
          style={{ backgroundColor: "#111" }}
        >
          <div className="px-4 py-3 border-b border-line sticky top-0" style={{ backgroundColor: "#111" }}>
            <div className="flex items-center justify-between">
              <span className="text-[14px] font-extrabold text-white">受信トレイ</span>
              {unreadCount > 0 && (
                <span className="text-[11px] font-bold text-black px-2 py-0.5 rounded-full" style={{ backgroundColor: "#dfb664" }}>
                  {unreadCount}件未読
                </span>
              )}
            </div>
          </div>

          {threads.map((n) => {
            const company = companies.find((c) => c.id === n.fromCompanyId);
            const isActive = selectedId === n.id;
            return (
              <div
                key={n.id}
                onClick={() => selectThread(n.id)}
                className="flex items-start gap-3 px-4 py-3 cursor-pointer transition-colors border-b border-line"
                style={{
                  backgroundColor: isActive ? "rgba(223,182,100,0.1)" : "transparent",
                  borderLeft: isActive ? "3px solid #dfb664" : "3px solid transparent",
                }}
              >
                <div className="w-9 h-9 rounded-lg bg-white flex items-center justify-center shrink-0 p-1">
                  {company ? (
                    <img src={company.logo} alt={`${company.name} ロゴ`} className="max-w-full max-h-full object-contain" />
                  ) : (
                    <span className="text-[11px] font-bold text-black">{n.fromCompanyName.charAt(0)}</span>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className={`text-[13px] font-extrabold truncate ${isActive ? "text-white" : "text-black-300"}`}>
                      {n.fromCompanyName}
                    </span>
                    {!n.read && <span className="w-2 h-2 rounded-full bg-red shrink-0" />}
                  </div>
                  <p className="text-[12px] text-black-500 font-medium truncate mt-0.5">{n.message}</p>
                  <span className="text-[10px] text-black-600 mt-0.5 block">{n.createdAt}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* 右: チャットビュー */}
        <div
          className={`flex-1 flex flex-col ${
            mobileView === "list" ? "hidden sm:flex" : "flex"
          }`}
          style={{ backgroundColor: "#1a1a1a" }}
        >
          {selected ? (
            <>
              {/* チャットヘッダー */}
              <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-line flex items-center gap-3" style={{ backgroundColor: "#1e1e1e" }}>
                {/* 戻るボタン — モバイルのみ */}
                <button
                  onClick={() => setMobileView("list")}
                  className="sm:hidden w-8 h-8 rounded-lg flex items-center justify-center hover:bg-white/10 shrink-0"
                >
                  <ArrowLeft className="w-5 h-5 text-white" />
                </button>
                <div className="w-9 h-9 rounded-lg bg-white flex items-center justify-center shrink-0 p-1">
                  {selectedCompany ? (
                    <img src={selectedCompany.logo} alt={`${selectedCompany.name} ロゴ`} className="max-w-full max-h-full object-contain" />
                  ) : (
                    <span className="text-[11px] font-bold text-black">{selected.fromCompanyName.charAt(0)}</span>
                  )}
                </div>
                <div className="min-w-0">
                  <p className="text-[14px] sm:text-[16px] font-extrabold text-white truncate">{selected.fromCompanyName}</p>
                  {selected.consultationTitle && (
                    <p className="text-[11px] sm:text-[12px] font-bold truncate" style={{ color: "#dfb664" }}>
                      Re: {selected.consultationTitle}
                    </p>
                  )}
                </div>
                <span
                  className="text-[10px] sm:text-[11px] font-bold text-white px-2 py-0.5 rounded-full ml-auto shrink-0"
                  style={{ backgroundColor: selected.type === "reaction" ? "#C8102E" : "#4F46E5" }}
                >
                  {selected.type === "reaction" ? "反応" : "メッセージ"}
                </span>
              </div>

              {/* チャットエリア */}
              <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-4 sm:py-6 space-y-4">
                <div className="flex items-start gap-2 sm:gap-3 max-w-[85%] sm:max-w-[80%]">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white flex items-center justify-center shrink-0 p-0.5 sm:p-1">
                    {selectedCompany ? (
                      <img src={selectedCompany.logo} alt={`${selectedCompany.name} ロゴ`} className="max-w-full max-h-full object-contain" />
                    ) : (
                      <span className="text-[9px] font-bold text-black">{selected.fromCompanyName.charAt(0)}</span>
                    )}
                  </div>
                  <div>
                    <div className="rounded-2xl rounded-tl-sm px-3 sm:px-4 py-2.5 sm:py-3" style={{ backgroundColor: "#2a2a2a" }}>
                      <p className="text-[13px] sm:text-[14px] text-white font-medium leading-relaxed">{selected.message}</p>
                    </div>
                    <span className="text-[10px] text-black-500 mt-1 block ml-1">{selected.createdAt}</span>
                  </div>
                </div>

                {(sentMessages[selectedId] || []).map((msg, i) => (
                  <div key={i} className="flex justify-end">
                    <div className="max-w-[85%] sm:max-w-[80%]">
                      <div className="rounded-2xl rounded-tr-sm px-3 sm:px-4 py-2.5 sm:py-3" style={{ backgroundColor: "#dfb664" }}>
                        <p className="text-[13px] sm:text-[14px] text-black font-medium leading-relaxed">{msg}</p>
                      </div>
                      <span className="text-[10px] text-black-500 mt-1 block text-right mr-1">送信済み</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* 入力エリア */}
              <div className="px-3 sm:px-6 py-3 sm:py-4 border-t border-line" style={{ backgroundColor: "#1e1e1e" }}>
                <div className="flex gap-2 sm:gap-3">
                  <input
                    type="text"
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    placeholder="返信を入力..."
                    className="input flex-1 py-2.5 sm:py-3 text-[13px] sm:text-[14px] rounded-full px-4 sm:px-5"
                    onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  />
                  <button
                    onClick={handleSend}
                    className="w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center transition-colors hover:opacity-90 shrink-0"
                    style={{ backgroundColor: "#dfb664" }}
                  >
                    <Send className="w-4 h-4 sm:w-5 sm:h-5 text-black" />
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <MessageSquare className="w-12 h-12 text-black-600 mx-auto mb-3" />
                <p className="text-[16px] text-black-400 font-bold">メッセージを選択してください</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div></FadeIn>
  );
}
