import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Sparkles, Menu } from "lucide-react";

import ConversationPanel from "../../components/user/ConversationPanel";
import AIChat from "../../components/user/AIChat";

export default function AI() {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryParam = searchParams.get("q");

  const [conversations, setConversations] = useState([
    {
      id: "conv-1",
      title: "Demam & Batuk",
      messages: [],
    },
    {
      id: "conv-2",
      title: "Informasi Imunisasi",
      messages: [],
    },
  ]);

  const [activeId, setActiveId] = useState("conv-1");
  const [isMobilePanelOpen, setIsMobilePanelOpen] = useState(false);
  const [pendingPrompt, setPendingPrompt] = useState("");

  useEffect(() => {
    if (queryParam && queryParam.trim()) {
      const promptText = queryParam.trim();
      const newId = `conv-${Date.now()}`;
      const newChat = {
        id: newId,
        title: promptText.slice(0, 24) + "...",
        messages: [],
      };
      setConversations((prev) => [newChat, ...prev]);
      setActiveId(newId);
      setPendingPrompt(promptText);
      // Clean query parameter from URL
      setSearchParams({}, { replace: true });
    }
  }, [queryParam, setSearchParams]);

  const activeConversation = conversations.find((c) => c.id === activeId) || {
    id: activeId,
    title: "Percakapan Baru",
    messages: [],
  };

  const handleNewConversation = () => {
    const newId = `conv-${Date.now()}`;
    const newChat = {
      id: newId,
      title: "Percakapan Baru",
      messages: [],
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
              ? firstUserMessageText.slice(0, 24) + "..."
              : c.title;
          return { ...c, title, messages: updatedMessages };
        }
        return c;
      })
    );
  };

  return (
    <div className="relative min-h-[calc(100vh-120px)] flex flex-col space-y-4 pb-6">
      {/* PAGE HEADER */}
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2.5 text-[#003B3B]">
            <div className="p-2 rounded-xl bg-[#003B3B] text-white shadow-xs">
              <Sparkles className="w-5 h-5 text-[#EBF5F5]" />
            </div>
            <h1 className="font-poppins font-bold text-2xl lg:text-3xl tracking-tight text-[#0D2626]">
              WARAS Assistant
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-[#526666] font-inter">
            Asisten konsultasi awal dan edukasi kesehatan untuk warga Kota Semarang.
          </p>
        </div>

        {/* Mobile Toggle Button for Conversation Panel */}
        <button
          onClick={() => setIsMobilePanelOpen(true)}
          className="lg:hidden p-2 rounded-xl bg-white border border-[#E2ECEB] text-[#003B3B] shadow-2xs hover:bg-[#F8FAFA] cursor-pointer"
          aria-label="Buka Riwayat Percakapan"
        >
          <Menu className="w-5 h-5" />
        </button>
      </div>

      {/* MAIN TWO-COLUMN LAYOUT */}
      <div className="flex-1 flex gap-5 items-stretch h-[calc(100vh-210px)] min-h-130">
        {/* Left Column: Conversation Navigation Panel */}
        <ConversationPanel
          conversations={conversations}
          activeId={activeId}
          onSelectConversation={handleSelectConversation}
          onNewConversation={handleNewConversation}
          isOpenMobile={isMobilePanelOpen}
          onCloseMobile={() => setIsMobilePanelOpen(false)}
        />

        {/* Right Column: Chat Interface */}
        <div className="flex-1 h-full min-w-0">
          <AIChat
            activeConversation={activeConversation}
            onUpdateMessages={handleUpdateMessages}
            initialPrompt={pendingPrompt}
          />
        </div>
      </div>
    </div>
  );
}
