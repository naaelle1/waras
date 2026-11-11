import React from "react";
import clsx from "clsx";
import { SquarePen, MessageCircle, X } from "lucide-react";

export default function ConversationPanel({
  conversations = [],
  activeId,
  onSelectConversation,
  onNewConversation,
  isOpenMobile = false,
  onCloseMobile = () => {},
}) {
  return (
    <>
      {/* Mobile Backdrop */}
      {isOpenMobile && (
        <div
          className="fixed inset-0 bg-[#002F2F]/20 backdrop-blur-sm z-40 lg:hidden"
          onClick={onCloseMobile}
        />
      )}

      {/* Conversation Panel Body */}
      <div
        className={clsx(
          "flex flex-col h-full p-4 lg:p-5 rounded-3xl transition-all duration-300 z-40",
          "bg-white/60 backdrop-blur-xl border border-white/70 shadow-[0_12px_40px_rgba(0,47,47,0.08)]",
          "w-72 fixed inset-y-4 left-4 lg:static lg:w-72 lg:h-[calc(100vh-140px)]",
          isOpenMobile ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        {/* Panel Header Mobile Close */}
        <div className="flex items-center justify-between lg:hidden mb-3">
          <span className="text-xs font-semibold text-[#002F2F] tracking-wide uppercase">
            Percakapan
          </span>
          <button
            onClick={onCloseMobile}
            className="p-1 rounded-lg text-[#647474] hover:bg-[#DDEEEE]/50"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* New Conversation Button */}
        <button
          onClick={() => {
            onNewConversation();
            onCloseMobile();
          }}
          className="w-full flex items-center justify-center gap-2.5 px-4 py-3 rounded-2xl bg-[#DDEEEE] hover:bg-[#cbe3e3] text-[#002F2F] font-poppins font-semibold text-sm transition-all duration-200 shadow-sm active:scale-[0.98] cursor-pointer mb-6"
        >
          <SquarePen className="w-4 h-4 text-[#002F2F]" />
          <span>Percakapan Baru</span>
        </button>

        {/* Section Label */}
        <div className="px-2 mb-2">
          <h3 className="text-[11px] font-inter font-semibold tracking-wider text-[#647474] uppercase">
            PERCAKAPAN TERAKHIR
          </h3>
        </div>

        {/* Conversation List */}
        <div className="flex-1 overflow-y-auto space-y-1.5 pr-1 scrollbar-thin">
          {conversations.length > 0 ? (
            conversations.map((chat) => {
              const isActive = chat.id === activeId;
              return (
                <button
                  key={chat.id}
                  onClick={() => {
                    onSelectConversation(chat.id);
                    onCloseMobile();
                  }}
                  className={clsx(
                    "w-full flex items-center gap-3 px-3.5 py-3 rounded-2xl text-left font-inter text-xs transition-all duration-200 cursor-pointer group",
                    isActive
                      ? "bg-[#002F2F] text-white font-medium shadow-md"
                      : "text-[#082C2C] hover:bg-white/80 hover:text-[#002F2F]"
                  )}
                >
                  <MessageCircle
                    className={clsx(
                      "w-4 h-4 shrink-0 transition-colors",
                      isActive ? "text-white" : "text-[#647474] group-hover:text-[#002F2F]"
                    )}
                  />
                  <span className="truncate leading-snug">{chat.title || "Percakapan Baru"}</span>
                </button>
              );
            })
          ) : (
            <div className="p-4 text-center text-xs text-[#647474]">
              Belum ada percakapan terakhir
            </div>
          )}
        </div>
      </div>
    </>
  );
}