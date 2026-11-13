import React, { useState } from "react";
import clsx from "clsx";
import {
  SquarePen,
  Search,
  Bookmark,
  MoreHorizontal,
  Clock,
  PhoneCall,
  X,
  MessageSquare,
  Trash2,
  Pin
} from "lucide-react";

export default function ConversationPanel({
  conversations = [],
  activeId,
  onSelectConversation,
  onNewConversation,
  onDeleteConversation = () => {},
  onTogglePin = () => {},
  isOpenMobile = false,
  onCloseMobile = () => {},
  onOpenEmergencyModal = () => {}
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [menuOpenId, setMenuOpenId] = useState(null);

  // Filter conversations based on search
  const filtered = conversations.filter((c) =>
    (c.title || "").toLowerCase().includes(searchQuery.toLowerCase().trim())
  );

  // Categorize conversations
  const pinnedConversations = filtered.filter((c) => c.isPinned);
  const todayConversations = filtered.filter(
    (c) => !c.isPinned && (c.category === "today" || !c.category)
  );
  const yesterdayConversations = filtered.filter(
    (c) => !c.isPinned && c.category === "yesterday"
  );

  const renderConversationItem = (chat, isActive) => (
    <div key={chat.id} className="relative group/item">
      <button
        onClick={() => {
          onSelectConversation(chat.id);
          onCloseMobile();
        }}
        className={clsx(
          "w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left font-inter text-xs transition-all cursor-pointer",
          isActive
            ? "bg-[#022022]/10 text-[#022022] font-semibold border border-[#37F4B4]/30 shadow-2xs"
            : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
        )}
      >
        <div className="flex items-center gap-2.5 min-w-0 pr-2">
          {chat.isPinned ? (
            <Bookmark className="w-3.5 h-3.5 text-[#022022] shrink-0 fill-[#37F4B4]/30" />
          ) : (
            <MessageSquare
              className={clsx(
                "w-3.5 h-3.5 shrink-0 transition-colors",
                isActive ? "text-[#022022]" : "text-slate-400 group-hover/item:text-slate-600"
              )}
            />
          )}
          <span className="truncate leading-snug">{chat.title || "Percakapan Baru"}</span>
        </div>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setMenuOpenId(menuOpenId === chat.id ? null : chat.id);
          }}
          className="p-1 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-200/50 opacity-0 group-hover/item:opacity-100 transition-opacity cursor-pointer shrink-0"
          aria-label="Opsi percakapan"
        >
          <MoreHorizontal className="w-3.5 h-3.5" />
        </button>
      </button>

      {/* Dropdown Options */}
      {menuOpenId === chat.id && (
        <div
          className="absolute right-2 top-8 z-30 bg-white border border-slate-200 rounded-xl shadow-lg p-1 min-w-[140px] text-xs font-inter"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            type="button"
            onClick={() => {
              onTogglePin(chat.id);
              setMenuOpenId(null);
            }}
            className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
          >
            <Pin className="w-3.5 h-3.5 text-[#022022]" />
            <span>{chat.isPinned ? "Lepas Pin" : "Sematkan Chat"}</span>
          </button>
          <button
            type="button"
            onClick={() => {
              onDeleteConversation(chat.id);
              setMenuOpenId(null);
            }}
            className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Hapus Chat</span>
          </button>
        </div>
      )}
    </div>
  );

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpenMobile && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-xs z-40 lg:hidden"
          onClick={onCloseMobile}
        />
      )}

      {/* Right Sidebar Body */}
      <aside
        className={clsx(
          "h-full bg-white border-l border-slate-200/80 flex flex-col justify-between p-5 shrink-0 z-40 transition-transform duration-300",
          "w-72 xl:w-80",
          /* Mobile vs Desktop position */
          "fixed inset-y-0 right-0 shadow-2xl lg:shadow-none lg:static lg:translate-x-0",
          isOpenMobile ? "translate-x-0" : "translate-x-full lg:translate-x-0"
        )}
      >
        {/* ── BAGIAN ATAS SIDEBAR KANAN ── */}
        <div className="space-y-4">
          {/* Header Title + Search & Mobile Close */}
          <div className="flex items-center justify-between">
            <h3 className="font-poppins font-bold text-sm text-slate-900 tracking-tight">
              Riwayat Chat
            </h3>

            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => setShowSearch(!showSearch)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
                aria-label="Cari riwayat chat"
              >
                <Search className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={onCloseMobile}
                className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
                aria-label="Tutup riwayat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Search Input Bar (Expandable) */}
          {showSearch && (
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari percakapan..."
                className="w-full pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#022022] focus:ring-2 focus:ring-[#37F4B4]/25 font-inter"
                autoFocus
              />
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2 top-2 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          )}

          {/* Tombol Penuh: + Percakapan Baru */}
          <button
            type="button"
            onClick={() => {
              onNewConversation();
              onCloseMobile();
            }}
            className="w-full text-white text-xs font-semibold py-2.5 px-4 rounded-full flex items-center justify-center gap-2 bg-gradient-to-br from-[#023b3b] via-[#022022] to-[#011414] hover:from-[#034d4d] hover:via-[#033033] hover:to-[#022022] backdrop-blur-md border border-[#022022]/80 hover:border-[#37F4B4]/40 shadow-[inset_0_1px_1px_rgba(255,255,255,0.28),0_4px_12px_rgba(2,32,34,0.16)] active:scale-[0.98] transition-all cursor-pointer group"
          >
            <SquarePen className="w-4 h-4 text-[#37F4B4]" />
            <span>+ Percakapan Baru</span>
          </button>
        </div>

        {/* ── BAGIAN TENGAH: DAFTAR RIWAYAT TERKATEGORI ── */}
        <div className="overflow-y-auto flex-1 mt-5 space-y-5 pr-1 scrollbar-thin">
          {filtered.length === 0 ? (
            <div className="text-center py-8 text-xs text-slate-400 font-inter">
              Tidak ada percakapan ditemukan.
            </div>
          ) : (
            <>
              {/* Kategori 1: Disimpan / Penting */}
              {pinnedConversations.length > 0 && (
                <div className="space-y-1.5">
                  <div className="flex items-center gap-1.5 px-2 text-[10px] font-bold tracking-wider uppercase text-slate-400 font-poppins">
                    <Bookmark className="w-3 h-3 text-[#022022]" />
                    <span>Disimpan / Penting</span>
                  </div>
                  <div className="space-y-1">
                    {pinnedConversations.map((chat) =>
                      renderConversationItem(chat, chat.id === activeId)
                    )}
                  </div>
                </div>
              )}

              {/* Kategori 2: Hari Ini */}
              {todayConversations.length > 0 && (
                <div className="space-y-1.5">
                  <div className="px-2 text-[10px] font-bold tracking-wider uppercase text-slate-400 font-poppins">
                    Hari Ini
                  </div>
                  <div className="space-y-1">
                    {todayConversations.map((chat) =>
                      renderConversationItem(chat, chat.id === activeId)
                    )}
                  </div>
                </div>
              )}

              {/* Kategori 3: Kemarin & Sebelumnya */}
              {yesterdayConversations.length > 0 && (
                <div className="space-y-1.5">
                  <div className="px-2 text-[10px] font-bold tracking-wider uppercase text-slate-400 font-poppins">
                    Kemarin
                  </div>
                  <div className="space-y-1">
                    {yesterdayConversations.map((chat) =>
                      renderConversationItem(chat, chat.id === activeId)
                    )}
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* ── BAGIAN BAWAH SIDEBAR KANAN: PANDUAN DARURAT ── */}
        <div className="pt-4 border-t border-slate-100">
          <button
            type="button"
            onClick={onOpenEmergencyModal}
            className="w-full border border-slate-200 hover:border-rose-200 rounded-full py-2.5 px-3 text-xs font-semibold text-slate-700 hover:text-rose-700 hover:bg-rose-50/50 text-center cursor-pointer flex items-center justify-center gap-2 transition-all shadow-2xs"
          >
            <PhoneCall className="w-3.5 h-3.5 text-rose-500 shrink-0" />
            <span>Panduan Darurat 112 / 119</span>
          </button>
        </div>
      </aside>
    </>
  );
}
