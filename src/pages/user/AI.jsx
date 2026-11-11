import React, { useState } from "react";
import { Sparkles, Menu } from "lucide-react";

import ConversationPanel from "../../components/user/ConversationPanel";
import AIChat from "../../components/user/AIChat";

export default function AI() {
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
  };

  const handleSelectConversation = (id) => {
    setActiveId(id);
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
    <div className="relative min-h-[calc(100vh-120px)] flex flex-col space-y-4 pb-6 overflow-hidden">
      
      {/* AMBIENT BACKGROUND BLUR SHAPES */}
      <div className="absolute top-0 right-10 w-96 h-96 rounded-full bg-[#DDEEEE]/60 blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-10 w-80 h-80 rounded-full bg-[#EAF5F2]/80 blur-3xl pointer-events-none -z-10" />

      {/* PAGE HEADER */}
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2.5 text-[#002F2F]">
            <div className="p-2 rounded-xl bg-[#002F2F] text-white shadow-sm">
              <Sparkles className="w-5 h-5 text-[#DDEEEE]" />
            </div>
            <h1 className="font-poppins font-bold text-2xl lg:text-3xl tracking-tight text-[#082C2C]">
              WARAS Assistant
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-[#647474] font-inter">
            Asisten informasi kesehatan untuk membantu Anda memahami informasi dan menemukan layanan yang relevan.
          </p>
        </div>

        {/* Mobile Toggle Button for Conversation Panel */}
        <button
          onClick={() => setIsMobilePanelOpen(true)}
          className="lg:hidden p-2.5 rounded-2xl bg-white/80 border border-white/90 text-[#002F2F] shadow-sm hover:bg-white"
          aria-label="Buka Percakapan"
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
          />
        </div>
      </div>

    </div>
  );
}