import React, { useState, useEffect, useRef } from "react";
import { useSearchParams, useOutletContext } from "react-router-dom";
import { PhoneCall, ShieldAlert, X, Phone, Ambulance } from "lucide-react";

import ConversationPanel from "../../components/user/ConversationPanel";
import AIChat from "../../components/user/AIChat";
import { aiService } from "../../services/aiService";

export default function AI() {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryParam = searchParams.get("q");
  const outletContext = useOutletContext();

  const [conversations, setConversations] = useState([]);
  const [activeId, setActiveId] = useState("");
  const [isMobileHistoryOpen, setIsMobileHistoryOpen] = useState(false);
  const [pendingPrompt, setPendingPrompt] = useState("");
  const [isEmergencyModalOpen, setIsEmergencyModalOpen] = useState(false);
  const [isLoadingConversations, setIsLoadingConversations] = useState(true);
  const [isLoadingMessages, setIsLoadingMessages] = useState(false);

  const queryHandledRef = useRef(false);

  // 1. Tangani queryParam jika pengguna datang dari Dashboard atau link lain (?q=...)
  useEffect(() => {
    if (queryParam && queryParam.trim() && !queryHandledRef.current) {
      queryHandledRef.current = true;
      const promptText = queryParam.trim();
      const newId = `conv-${Date.now()}`;
      const newChat = {
        id: newId,
        title: promptText.length > 28 ? promptText.slice(0, 28) + "..." : promptText,
        category: "today",
        isPinned: false,
        messages: [],
        updatedAt: new Date().toISOString()
      };
      setConversations((prev) => [newChat, ...prev.filter((c) => c.id !== newId)]);
      setActiveId(newId);
      setPendingPrompt(promptText);
      localStorage.setItem("waras_active_ai_session", newId);
      aiService.createConversation(newChat).catch(console.warn);
      setSearchParams({}, { replace: true });
    }
  }, [queryParam, setSearchParams]);

  // 2. Muat seluruh percakapan tersimpan dari Database saat mount
  useEffect(() => {
    let isCurrent = true;

    async function fetchConversations() {
      try {
        setIsLoadingConversations(true);
        const list = await aiService.getConversations();
        if (!isCurrent) return;

        if (list && list.length > 0) {
          setConversations((prev) => {
            // Pertahankan sesi baru/pending di prev yang belum masuk ke database
            const existingIds = new Set(list.map((c) => c.id));
            const pending = prev.filter((c) => !existingIds.has(c.id));
            return [
              ...pending,
              ...list.map((c) => {
                const inPrev = prev.find((p) => p.id === c.id);
                return { ...c, messages: inPrev?.messages || [] };
              })
            ];
          });

          // Tentukan sesi aktif: jika belum ada, pakai yang tersimpan di localStorage atau sesi paling baru
          setActiveId((prevActiveId) => {
            if (prevActiveId) return prevActiveId;
            if (queryParam) return prevActiveId;
            const saved = localStorage.getItem("waras_active_ai_session");
            if (saved && list.some((c) => c.id === saved)) {
              return saved;
            }
            return list[0].id;
          });
        } else {
          const defaultId = `conv-${Date.now()}`;
          const defaultChat = {
            id: defaultId,
            title: "Percakapan Baru",
            category: "today",
            isPinned: false,
            messages: [],
            updatedAt: new Date().toISOString()
          };
          setConversations([defaultChat]);
          setActiveId(defaultId);
          localStorage.setItem("waras_active_ai_session", defaultId);
          aiService.createConversation(defaultChat).catch(console.warn);
        }
      } catch (err) {
        console.warn("[AI Page] Gagal memuat percakapan dari DB:", err);
      } finally {
        if (isCurrent) {
          setIsLoadingConversations(false);
        }
      }
    }

    fetchConversations();
    return () => {
      isCurrent = false;
    };
  }, []);

  // 3. Muat riwayat pesan dari database saat activeId berubah (hanya jika belum ada di memori)
  useEffect(() => {
    if (!activeId) return;
    localStorage.setItem("waras_active_ai_session", activeId);
    let isCurrent = true;

    // Jika pesan sudah dimuat di memori, tidak perlu fetch ulang yang menyebabkan flicker
    const targetConv = conversations.find((c) => c.id === activeId);
    if (targetConv && targetConv.messages && targetConv.messages.length > 0) {
      setIsLoadingMessages(false);
      return;
    }

    setIsLoadingMessages(true);

    async function loadMessages() {
      try {
        const msgs = await aiService.getMessages(activeId);
        if (isCurrent) {
          setConversations((prev) =>
            prev.map((c) => (c.id === activeId ? { ...c, messages: msgs } : c))
          );
        }
      } catch (err) {
        console.warn("[AI Page] Gagal memuat pesan untuk sesi:", activeId, err);
      } finally {
        if (isCurrent) {
          setIsLoadingMessages(false);
        }
      }
    }

    loadMessages();
    return () => {
      isCurrent = false;
    };
  }, [activeId]);

  const activeConversation =
    conversations.find((c) => c.id === activeId) || {
      id: activeId || `conv-${Date.now()}`,
      title: "Percakapan Baru",
      category: "today",
      isPinned: false,
      messages: []
    };

  const handleNewConversation = async () => {
    const newId = `conv-${Date.now()}`;
    const newChat = {
      id: newId,
      title: "Percakapan Baru",
      category: "today",
      isPinned: false,
      messages: [],
      updatedAt: new Date().toISOString()
    };
    setConversations((prev) => {
      const pinned = prev.filter((c) => c.isPinned);
      const unpinned = prev.filter((c) => !c.isPinned);
      return [...pinned, newChat, ...unpinned];
    });
    setActiveId(newId);
    setPendingPrompt("");
    setIsLoadingMessages(false);
    localStorage.setItem("waras_active_ai_session", newId);
    await aiService.createConversation(newChat);
  };

  const handleSelectConversation = (id) => {
    if (id === activeId) return;
    setActiveId(id);
    setPendingPrompt("");
    localStorage.setItem("waras_active_ai_session", id);
  };

  const handleUpdateMessages = (updatedMessages, firstUserMessageText) => {
    setConversations((prev) => {
      const target = prev.find((c) => c.id === activeId);
      if (!target) return prev;

      const title =
        target.title === "Percakapan Baru" && firstUserMessageText
          ? (firstUserMessageText.length > 28
              ? firstUserMessageText.slice(0, 28) + "..."
              : firstUserMessageText)
          : target.title;

      const updatedChat = {
        ...target,
        title,
        messages: updatedMessages,
        updatedAt: new Date().toISOString()
      };

      // Simpan judul baru ke database jika baru pertama kali diisi
      if (target.title === "Percakapan Baru" && firstUserMessageText) {
        aiService.updateConversation(activeId, { title }).catch(console.warn);
      }

      // Pindahkan sesi yang baru saja aktif ke urutan paling atas
      const remaining = prev.filter((c) => c.id !== activeId);
      if (updatedChat.isPinned) {
        return [updatedChat, ...remaining];
      } else {
        const pinned = remaining.filter((c) => c.isPinned);
        const unpinned = remaining.filter((c) => !c.isPinned);
        return [...pinned, updatedChat, ...unpinned];
      }
    });
  };

  const handleDeleteConversation = async (id) => {
    await aiService.deleteConversation(id);
    setConversations((prev) => {
      const filtered = prev.filter((c) => c.id !== id);
      if (filtered.length === 0) {
        const freshId = `conv-${Date.now()}`;
        const freshChat = {
          id: freshId,
          title: "Percakapan Baru",
          category: "today",
          isPinned: false,
          messages: [],
          updatedAt: new Date().toISOString()
        };
        setActiveId(freshId);
        localStorage.setItem("waras_active_ai_session", freshId);
        aiService.createConversation(freshChat).catch(console.warn);
        return [freshChat];
      }
      if (id === activeId) {
        const nextId = filtered[0].id;
        setActiveId(nextId);
        localStorage.setItem("waras_active_ai_session", nextId);
      }
      return filtered;
    });
  };

  const handleTogglePin = async (id) => {
    const target = conversations.find((c) => c.id === id);
    if (!target) return;
    const nextPinned = !target.isPinned;

    setConversations((prev) => {
      const updated = prev.map((c) => (c.id === id ? { ...c, isPinned: nextPinned } : c));
      const pinned = updated.filter((c) => c.isPinned);
      const unpinned = updated.filter((c) => !c.isPinned);
      return [...pinned, ...unpinned];
    });
    await aiService.updateConversation(id, { isPinned: nextPinned });
  };

  const handleOpenMobileNav = () => {
    if (outletContext?.setIsMobileNavOpen) {
      outletContext.setIsMobileNavOpen(true);
    }
  };

  return (
    <div className="w-full h-full flex overflow-hidden bg-white text-slate-900">
      {/* ── 2. AREA TENGAH: FULL-HEIGHT AI CHAT WORKSPACE ── */}
      <AIChat
        activeConversation={activeConversation}
        onUpdateMessages={handleUpdateMessages}
        initialPrompt={pendingPrompt}
        onNewConversation={handleNewConversation}
        onOpenHistoryMobile={() => setIsMobileHistoryOpen(true)}
        onOpenMobileNav={handleOpenMobileNav}
        isLoadingConversations={isLoadingConversations}
        isLoadingMessages={isLoadingMessages}
      />

      {/* ── 3. SIDEBAR KANAN: RIWAYAT PERCAKAPAN AI (DOCKED RIGHT) ── */}
      <ConversationPanel
        conversations={conversations}
        activeId={activeId}
        onSelectConversation={handleSelectConversation}
        onNewConversation={handleNewConversation}
        onDeleteConversation={handleDeleteConversation}
        onTogglePin={handleTogglePin}
        isOpenMobile={isMobileHistoryOpen}
        onCloseMobile={() => setIsMobileHistoryOpen(false)}
        onOpenEmergencyModal={() => setIsEmergencyModalOpen(true)}
      />

      {/* ── MODAL PANDUAN DARURAT KOTA SEMARANG ── */}
      {isEmergencyModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 selection:bg-rose-500 selection:text-white"
          onClick={() => setIsEmergencyModalOpen(false)}
        >
          <div
            className="w-full max-w-md bg-white rounded-3xl p-6 sm:p-7 shadow-2xl border border-slate-200 space-y-5 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setIsEmergencyModalOpen(false)}
              className="absolute top-5 right-5 p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-rose-50 text-rose-600 border border-rose-200 flex items-center justify-center font-bold">
                <ShieldAlert className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-poppins font-bold text-lg text-slate-900">
                  Layanan Darurat Medis
                </h3>
                <p className="text-xs text-slate-500 font-inter">
                  Kontak siaga gawat darurat Kota Semarang 24 Jam
                </p>
              </div>
            </div>

            <div className="space-y-2.5">
              {/* Ambulans Hebat 119 */}
              <a
                href="tel:119"
                className="p-3.5 rounded-2xl bg-rose-50/70 border border-rose-200/80 flex items-center justify-between hover:bg-rose-100/70 transition-colors group cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-rose-600 text-white">
                    <Ambulance className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-poppins font-bold text-xs text-rose-950">
                      Ambulans Hebat Kota Semarang
                    </h4>
                    <p className="text-[11px] text-rose-700 font-inter">
                      Penjemputan pasien darurat gratis
                    </p>
                  </div>
                </div>
                <span className="font-mono font-bold text-rose-600 text-sm group-hover:underline">
                  119
                </span>
              </a>

              {/* Call Center 112 */}
              <a
                href="tel:112"
                className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between hover:bg-slate-100 transition-colors group cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-[#022022] text-white border border-white/20">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-poppins font-bold text-xs text-slate-900">
                      Semarang Siaga Call Center
                    </h4>
                    <p className="text-[11px] text-slate-500 font-inter">
                      Layanan terpadu darurat 24 jam
                    </p>
                  </div>
                </div>
                <span className="font-mono font-bold text-[#022022] text-sm group-hover:underline">
                  112
                </span>
              </a>

              {/* RSUP Kariadi & Wongsonegoro */}
              <div className="p-3.5 rounded-2xl bg-[#022022]/5 border border-[#022022]/15 space-y-1.5 text-xs text-slate-700 font-inter">
                <span className="font-semibold text-[#022022] block">
                  IGD Rumah Sakit Rujukan Utama:
                </span>
                <p className="text-[11px] text-slate-600 flex justify-between">
                  <span>RSUP Dr. Kariadi Semarang</span>
                  <a href="tel:0248413993" className="font-mono font-semibold text-[#022022] hover:underline">
                    (024) 8413993
                  </a>
                </p>
                <p className="text-[11px] text-slate-600 flex justify-between">
                  <span>RSUD KRMT Wongsonegoro</span>
                  <a href="tel:0246711500" className="font-mono font-semibold text-[#022022] hover:underline">
                    (024) 6711500
                  </a>
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsEmergencyModalOpen(false)}
              className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold cursor-pointer transition-colors"
            >
              Tutup Panduan
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
