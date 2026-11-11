import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  ArrowUp,
  Info,
  BookOpen,
  MapPin,
  Thermometer,
  ShieldCheck,
  ClipboardList,
  ArrowRight,
  Bot,
} from "lucide-react";

import { aiService } from "../../services/aiService";

// Format inline bold text: ubah **teks** jadi <strong> dan hilangkan simbol bintang/simbol liar
function formatInlineText(text) {
  if (!text) return null;

  // Split berdasarkan format **bold**
  const parts = text.split(/(\*\*[^*]+?\*\*)/g);

  return parts.map((part, idx) => {
    if (part.startsWith("**") && part.endsWith("**") && part.length > 4) {
      const boldContent = part.slice(2, -2);
      return (
        <strong key={idx} className="font-semibold text-[#002F2F]">
          {boldContent}
        </strong>
      );
    }
    // Hilangkan simbol * liar bila ada
    const cleaned = part.replace(/\*/g, "");
    return <span key={idx}>{cleaned}</span>;
  });
}

// Render pesan AI dengan membuang simbol ###, ---, dan memformat bold serta bullet points secara rapi
function renderFormattedMessage(text) {
  if (!text) return null;

  const lines = text.split("\n");

  return (
    <div className="space-y-2 font-inter text-sm leading-relaxed text-[#082C2C]">
      {lines.map((line, lineIdx) => {
        let cleaned = line.trim();

        // 1. Hilangkan garis horizontal (---, ***, ___)
        if (/^[-*_]{3,}$/.test(cleaned)) {
          return null;
        }

        // 2. Hilangkan simbol heading (###, ##, #) dan jadikan teks tebal rapi
        if (/^#{1,6}\s+/.test(cleaned)) {
          const heading = cleaned.replace(/^#{1,6}\s+/, "");
          return (
            <p key={lineIdx} className="font-semibold text-sm sm:text-base text-[#002F2F] pt-1">
              {formatInlineText(heading)}
            </p>
          );
        }

        // 3. Rapikan bullet item (*, -, •) menjadi bullet point bersih
        if (/^[-*•]\s+/.test(cleaned)) {
          const bullet = cleaned.replace(/^[-*•]\s+/, "");
          return (
            <div key={lineIdx} className="flex items-start gap-2.5 pl-2">
              <span className="text-[#0B5D5D] font-bold text-sm leading-none mt-1 select-none">•</span>
              <span className="flex-1">{formatInlineText(bullet)}</span>
            </div>
          );
        }

        // 4. Jeda baris kosong
        if (!cleaned) {
          return <div key={lineIdx} className="h-1.5" />;
        }

        // 5. Paragraf atau nomor biasa (1. 2. dll)
        return (
          <p key={lineIdx} className="leading-relaxed">
            {formatInlineText(cleaned)}
          </p>
        );
      })}
    </div>
  );
}

export default function AIChat({ activeConversation, onUpdateMessages }) {
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const messages = activeConversation?.messages || [];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSend = async (textToSend) => {
    const messageContent = textToSend || inputText;
    if (!messageContent.trim() || isLoading) return;

    const userMsg = {
      id: `user-${Date.now()}`,
      sender: "user",
      message: messageContent,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    const updatedMessages = [...messages, userMsg];
    onUpdateMessages(updatedMessages, messageContent);

    if (!textToSend) setInputText("");
    setIsLoading(true);

    try {
      // Bangun history untuk konteks multi-turn (kirim ke backend)
      const history = messages
        .filter((m) => m.sender === "user" || m.sender === "ai")
        .map((m) => ({
          role: m.sender === "user" ? "user" : "model",
          parts: m.message,
        }));

      const aiResponse = await aiService.sendMessage(messageContent, history);
      onUpdateMessages([...updatedMessages, aiResponse], messageContent);
    } catch (err) {
      console.error("Failed to get AI response:", err);
      // Tampilkan pesan error ke user
      const errMsg = {
        id: `err-${Date.now()}`,
        sender: "ai",
        message: "Maaf, terjadi kesalahan saat menghubungi WARAS Assistant. Silakan coba lagi.",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        type: "error",
      };
      onUpdateMessages([...updatedMessages, errMsg], messageContent);
    } finally {
      setIsLoading(false);
    }
  };

  const suggestedQuestions = [
    {
      icon: Thermometer,
      text: "Saya mengalami demam dan batuk",
    },
    {
      icon: ShieldCheck,
      text: "Saya ingin mencari informasi imunisasi",
    },
    {
      icon: MapPin,
      text: "Cari fasilitas kesehatan di Semarang",
    },
    {
      icon: ClipboardList,
      text: "Apa yang perlu disiapkan sebelum ke puskesmas?",
    },
  ];

  return (
    <div className="flex flex-col h-full rounded-3xl bg-white/50 backdrop-blur-2xl border border-white/70 shadow-[0_12px_40px_rgba(0,47,47,0.08)] relative overflow-hidden">
      
      {/* Messages / Welcome View Scrollable Area */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-6 scrollbar-thin">
        {messages.length === 0 ? (
          /* WELCOME STATE */
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="h-full flex flex-col items-center justify-center text-center max-w-xl mx-auto py-8"
          >
            {/* Sparkles Icon Header */}
            <div className="w-16 h-16 rounded-3xl bg-[#002F2F] text-white flex items-center justify-center mb-5 shadow-lg shadow-[#002F2F]/20">
              <Sparkles className="w-8 h-8 text-[#DDEEEE]" />
            </div>

            <h2 className="font-poppins font-bold text-2xl sm:text-3xl text-[#082C2C] mb-2 tracking-tight">
              Halo, saya WARAS Assistant
            </h2>

            <p className="font-inter text-sm sm:text-base text-[#647474] mb-8 leading-relaxed max-w-md">
              Apa yang ingin Anda ketahui hari ini? Saya dapat membantu Anda memahami informasi kesehatan dan menemukan layanan yang relevan.
            </p>

            {/* Suggested Question Chips */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full mb-6">
              {suggestedQuestions.map((q, idx) => {
                const Icon = q.icon;
                return (
                  <motion.button
                    key={idx}
                    whileHover={{ y: -2 }}
                    onClick={() => handleSend(q.text)}
                    className="p-4 text-left rounded-2xl bg-white/70 hover:bg-white border border-white/80 shadow-sm transition-all duration-200 cursor-pointer group flex items-start gap-3"
                  >
                    <div className="p-2 rounded-xl bg-[#DDEEEE] text-[#002F2F] group-hover:scale-105 transition-transform shrink-0">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="font-inter text-xs text-[#082C2C] font-medium leading-relaxed pt-0.5">
                      {q.text}
                    </span>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        ) : (
          /* CONVERSATION MESSAGES */
          <div className="space-y-6 max-w-3xl mx-auto">
            {messages.map((msg) => {
              const isUser = msg.sender === "user";
              const articles = msg.relatedArticleIds
                ? aiService.getArticlesByIds(msg.relatedArticleIds)
                : [];

              return (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25 }}
                  className={`flex flex-col ${isUser ? "items-end" : "items-start"}`}
                >
                  {/* Sender Header */}
                  {!isUser && (
                    <div className="flex items-center gap-2 mb-2 text-xs font-poppins font-semibold text-[#002F2F]">
                      <div className="w-6 h-6 rounded-lg bg-[#002F2F] text-white flex items-center justify-center">
                        <Sparkles className="w-3.5 h-3.5 text-[#DDEEEE]" />
                      </div>
                      <span>WARAS Assistant</span>
                    </div>
                  )}

                  {/* Message Bubble */}
                  <div
                    className={`p-4 sm:p-5 rounded-2xl text-sm leading-relaxed font-inter max-w-[90%] sm:max-w-[85%] ${
                      isUser
                        ? "bg-[#DDEEEE] text-[#082C2C] rounded-tr-none font-medium shadow-sm"
                        : "bg-white/80 backdrop-blur-md border border-white/90 text-[#082C2C] rounded-tl-none shadow-sm"
                    }`}
                  >
                    {isUser ? (
                      <p className="whitespace-pre-line">{msg.message}</p>
                    ) : (
                      renderFormattedMessage(msg.message)
                    )}
                  </div>

                  {/* Facility CTA Card if AI recommends faskes */}
                  {!isUser && msg.showFacilityCTA && (
                    <div className="mt-3 w-full max-w-sm rounded-2xl bg-[#DDEEEE]/70 border border-[#DDEEEE] p-4 flex items-start gap-3">
                      <div className="p-2 rounded-xl bg-[#002F2F] text-white shrink-0">
                        <MapPin className="w-4 h-4" />
                      </div>
                      <div className="space-y-2 flex-1">
                        <h4 className="font-poppins font-semibold text-xs text-[#002F2F]">
                          Cari Fasilitas Kesehatan
                        </h4>
                        <p className="text-[11px] text-[#647474]">
                          Temukan fasilitas kesehatan di Kota Semarang yang sesuai dengan kebutuhan Anda.
                        </p>
                        <Link
                          to="/user/facilities"
                          className="inline-flex items-center gap-1 text-xs font-semibold text-[#002F2F] hover:text-[#0B5D5D]"
                        >
                          <span>Lihat Fasilitas</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>
                  )}

                  {/* Article Recommendation Cards */}
                  {!isUser && articles.length > 0 && (
                    <div className="mt-4 w-full space-y-2">
                      <div className="flex items-center gap-1.5 text-xs font-poppins font-semibold text-[#002F2F]">
                        <BookOpen className="w-4 h-4 text-[#0B5D5D]" />
                        <span>Bacaan yang Mungkin Membantu</span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {articles.map((art) => (
                          <Link key={art.id} to={`/user/health-info`}>
                            <div className="p-3.5 rounded-2xl bg-white/70 hover:bg-white border border-white/80 shadow-sm transition-all duration-200 flex items-start gap-3 group h-full">
                              {art.image && (
                                <img
                                  src={art.image}
                                  alt={art.title}
                                  className="w-14 h-14 rounded-xl object-cover shrink-0"
                                />
                              )}
                              <div className="space-y-1 min-w-0 flex-1">
                                <span className="text-[10px] font-semibold text-[#0B5D5D] uppercase tracking-wider block">
                                  {art.category}
                                </span>
                                <h5 className="font-poppins font-semibold text-xs text-[#082C2C] truncate group-hover:text-[#002F2F]">
                                  {art.title}
                                </h5>
                                <p className="text-[11px] text-[#647474] line-clamp-1 font-inter">
                                  {art.description}
                                </p>
                              </div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}

                  <span className="text-[10px] text-[#647474] mt-1.5 px-1 font-inter">
                    {msg.timestamp}
                  </span>
                </motion.div>
              );
            })}

            {/* AI Loading Indicator */}
            {isLoading && (
              <div className="flex items-center gap-2 text-xs font-inter text-[#647474] py-2">
                <Bot className="w-4 h-4 text-[#002F2F] animate-spin" />
                <span>WARAS Assistant sedang mengetik...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* FLOATING LARGE MESSAGE INPUT AREA */}
      <div className="p-4 sm:p-6 bg-linear-to-t from-white/90 via-white/50 to-transparent backdrop-blur-md">
        <div className="max-w-3xl mx-auto space-y-2">
          
          <div className="relative flex items-end w-full bg-white/80 backdrop-blur-xl border border-white/90 rounded-3xl p-2 sm:p-3 shadow-[0_12px_40px_rgba(0,47,47,0.10)] focus-within:ring-2 focus-within:ring-[#002F2F]/20 transition-all">
            <textarea
              rows={1}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              placeholder="Ceritakan keluhan atau tanyakan informasi kesehatan..."
              className="w-full bg-transparent border-0 px-3 py-2 text-sm text-[#082C2C] placeholder-[#647474] focus:outline-none resize-none font-inter leading-relaxed max-h-32"
            />

            <button
              onClick={() => handleSend()}
              disabled={!inputText.trim() || isLoading}
              className="w-10 h-10 rounded-full bg-[#002F2F] hover:bg-[#0B5D5D] disabled:opacity-40 text-white flex items-center justify-center shrink-0 transition-all duration-200 cursor-pointer shadow-md active:scale-95 ml-2 mb-0.5"
              aria-label="Kirim Pesan"
            >
              <ArrowUp className="w-5 h-5 stroke-[2.5]" />
            </button>
          </div>

          {/* Safety Disclaimer */}
          <div className="flex items-center justify-center gap-1.5 text-[11px] text-[#647474] font-inter text-center pt-1">
            <Info className="w-3.5 h-3.5 text-[#0B5D5D] shrink-0" />
            <span>
              WARAS Assistant memberikan informasi umum dan bukan pengganti diagnosis atau konsultasi tenaga kesehatan.
            </span>
          </div>

        </div>
      </div>

    </div>
  );
}