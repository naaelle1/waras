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
          className="fixed inset-0 bg-[#001F1F]/40 backdrop-blur-xs z-40 lg:hidden"
          onClick={onCloseMobile}
        />
      )}

      {/* Conversation Panel Body */}
      <div
        className={clsx(
          "flex flex-col h-full p-4 rounded-2xl transition-all duration-200 z-40",
          "bg-white border border-[#E2ECEB] shadow-xs",
          "w-72 fixed inset-y-4 left-4 lg:static lg:w-72 lg:h-[calc(100vh-140px)]",
          isOpenMobile ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        {/* Panel Header Mobile Close */}
        <div className="flex items-center justify-between lg:hidden mb-3 pb-2 border-b border-gray-100">
          <span className="text-xs font-semibold text-[#003B3B] tracking-wide uppercase">
            Percakapan Tersimpan
          </span>
          <button
            onClick={onCloseMobile}
            className="p-1.5 rounded-lg text-[#526666] hover:bg-[#EBF5F5] transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* New Conversation Button */}
        <button
          onClick={() => {
            onNewConversation();
            onCloseMobile();
          }}
          className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#003B3B] hover:bg-[#002D2D] text-white font-semibold text-xs sm:text-sm transition-colors shadow-xs active:scale-[0.98] cursor-pointer mb-5"
        >
          <SquarePen className="w-4 h-4" />
          <span>Percakapan Baru</span>
        </button>

        {/* Section Label */}
        <div className="px-2 mb-2">
          <h3 className="text-[11px] font-semibold tracking-wider text-[#809494] uppercase font-inter">
            RIWAYAT PERCAKAPAN
          </h3>
        </div>

        {/* Conversation List */}
        <div className="flex-1 overflow-y-auto space-y-1 pr-1 scrollbar-thin">
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
                    "w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-left font-inter text-xs transition-colors cursor-pointer group",
                    isActive
                      ? "bg-[#EBF5F5] text-[#003B3B] font-semibold border border-[#DDEEEE]"
                      : "text-[#2B3E3E] hover:bg-[#F8FAFA] hover:text-[#003B3B]"
                  )}
                >
                  <MessageCircle
                    className={clsx(
                      "w-4 h-4 shrink-0 transition-colors",
                      isActive ? "text-[#003B3B]" : "text-[#809494] group-hover:text-[#003B3B]"
                    )}
                  />
                  <span className="truncate leading-snug">{chat.title || "Percakapan Baru"}</span>
                </button>
              );
            })
          ) : (
            <div className="p-4 text-center text-xs text-[#809494]">
              Belum ada percakapan tersimpan
            </div>
          )}
        </div>
      </div>
    </>
  );
}
