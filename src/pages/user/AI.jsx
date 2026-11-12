import React, { useState, useEffect } from "react";
import { useSearchParams, useOutletContext } from "react-router-dom";
import { PhoneCall, ShieldAlert, X, Phone, Ambulance } from "lucide-react";

import ConversationPanel from "../../components/user/ConversationPanel";
import AIChat from "../../components/user/AIChat";

export default function AI() {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryParam = searchParams.get("q");
  const outletContext = useOutletContext();

  const [conversations, setConversations] = useState([
    {
      id: "conv-1",
      title: "Demam & Batuk",
      category: "today",
      isPinned: false,
      messages: [],
      updatedAt: new Date().toISOString()
    },
    {
      id: "conv-2",
      title: "Informasi Imunisasi",
      category: "today",
      isPinned: false,
      messages: [],
      updatedAt: new Date().toISOString()
    },
    {
      id: "conv-3",
      title: "Rujukan BPJS ke RS",
      category: "yesterday",
      isPinned: true,
      messages: [],
      updatedAt: new Date(Date.now() - 86400000).toISOString()
    }
  ]);

  const [activeId, setActiveId] = useState("conv-1");
  const [isMobileHistoryOpen, setIsMobileHistoryOpen] = useState(false);
  const [pendingPrompt, setPendingPrompt] = useState("");
  const [isEmergencyModalOpen, setIsEmergencyModalOpen] = useState(false);

  useEffect(() => {
    if (queryParam && queryParam.trim()) {
      const promptText = queryParam.trim();
      const newId = `conv-${Date.now()}`;
      const newChat = {
        id: newId,
        title: promptText.slice(0, 26) + "...",
        category: "today",
        isPinned: false,
        messages: [],
        updatedAt: new Date().toISOString()
      };
      setConversations((prev) => [newChat, ...prev]);
      setActiveId(newId);
      setPendingPrompt(promptText);
      // Bersihkan param q dari URL
      setSearchParams({}, { replace: true });
    }
  }, [queryParam, setSearchParams]);

  const activeConversation =
    conversations.find((c) => c.id === activeId) || {
      id: activeId,
      title: "Percakapan Baru",
      category: "today",
      isPinned: false,
      messages: []
    };

  const handleNewConversation = () => {
    const newId = `conv-${Date.now()}`;
    const newChat = {
      id: newId,
      title: "Percakapan Baru",
      category: "today",
      isPinned: false,
      messages: [],
      updatedAt: new Date().toISOString()
    };
    setConversations((prev) => [newChat, ...prev]);
    setActiveId(newId);
    setPendingPrompt("");
  };

  const handleSelectConversation = (id) => {
    setActiveId(id);
    setPendingPrompt("");
  };

  const handleUpdateMessages = (updatedMessages, firstUserMessageText) => {
    setConversations((prev) =>
      prev.map((c) => {
        if (c.id === activeId) {
          const title =
            c.title === "Percakapan Baru" && firstUserMessageText
              ? firstUserMessageText.slice(0, 26) + "..."
              : c.title;
          return {
            ...c,
            title,
            messages: updatedMessages,
            updatedAt: new Date().toISOString()
          };
        }
        return c;
      })
    );
  };

  const handleDeleteConversation = (id) => {
    setConversations((prev) => {
      const filtered = prev.filter((c) => c.id !== id);
      if (filtered.length === 0) {
        const freshId = `conv-${Date.now()}`;
        setActiveId(freshId);
        return [
          {
            id: freshId,
            title: "Percakapan Baru",
            category: "today",
            isPinned: false,
            messages: []
          }
        ];
      }
      if (id === activeId) {
        setActiveId(filtered[0].id);
      }
      return filtered;
    });
  };

  const handleTogglePin = (id) => {
    setConversations((prev) =>
      prev.map((c) => (c.id === id ? { ...c, isPinned: !c.isPinned } : c))
    );
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
                  <div className="p-2 rounded-xl bg-[#003B3B] text-white">
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
                <span className="font-mono font-bold text-[#003B3B] text-sm group-hover:underline">
                  112
                </span>
              </a>

              {/* RSUP Kariadi & Wongsonegoro */}
              <div className="p-3.5 rounded-2xl bg-teal-50/60 border border-teal-200/70 space-y-1.5 text-xs text-slate-700 font-inter">
                <span className="font-semibold text-[#003B3B] block">
                  IGD Rumah Sakit Rujukan Utama:
                </span>
                <p className="text-[11px] text-slate-600 flex justify-between">
                  <span>RSUP Dr. Kariadi Semarang</span>
                  <a href="tel:0248413993" className="font-mono font-semibold text-[#003B3B] hover:underline">
                    (024) 8413993
                  </a>
                </p>
                <p className="text-[11px] text-slate-600 flex justify-between">
                  <span>RSUD KRMT Wongsonegoro</span>
                  <a href="tel:0246711500" className="font-mono font-semibold text-[#003B3B] hover:underline">
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
