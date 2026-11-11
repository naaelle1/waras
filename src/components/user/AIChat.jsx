import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
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

// Format inline bold text: ubah **teks** jadi <strong> dan hilangkan simbol liar
function formatInlineText(text) {
  if (!text) return null;

  const parts = text.split(/(\*\*[^*]+?\*\*)/g);

  return parts.map((part, idx) => {
    if (part.startsWith("**") && part.endsWith("**") && part.length > 4) {
      const boldContent = part.slice(2, -2);
      return (
        <strong key={idx} className="font-semibold text-[#0D2626]">
          {boldContent}
        </strong>
      );
    }
    const cleaned = part.replace(/\*/g, "");
    return <span key={idx}>{cleaned}</span>;
  });
}

// Render pesan AI dengan struktur teratur, bullet point bersih, dan spacing proporsional
function renderFormattedMessage(text) {
  if (!text) return null;

  const lines = text.split("\n");

  return (
    <div className="space-y-2 font-inter text-xs sm:text-sm leading-relaxed text-[#1D3232]">
      {lines.map((line, lineIdx) => {
        let cleaned = line.trim();

        if (/^[-*_]{3,}$/.test(cleaned)) {
          return null;
        }

        if (/^#{1,6}\s+/.test(cleaned)) {
          const heading = cleaned.replace(/^#{1,6}\s+/, "");
          return (
            <p key={lineIdx} className="font-semibold text-sm sm:text-base text-[#003B3B] pt-1">
              {formatInlineText(heading)}
            </p>
          );
        }

        if (/^[-*•]\s+/.test(cleaned)) {
          const bullet = cleaned.replace(/^[-*•]\s+/, "");
          return (
            <div key={lineIdx} className="flex items-start gap-2.5 pl-1">
              <span className="text-[#003B3B] font-bold text-sm leading-none mt-1 select-none">•</span>
              <span className="flex-1">{formatInlineText(bullet)}</span>
            </div>
          );
        }

        if (!cleaned) {
          return <div key={lineIdx} className="h-1.5" />;
        }

        return (
          <p key={lineIdx} className="leading-relaxed">
            {formatInlineText(cleaned)}
          </p>
        );
      })}
    </div>
  );
}

// Menentukan daftar status loading variatif & kontekstual berdasarkan input pengguna
function getLoadingStatusList(query) {
  const q = (query || "").toLowerCase();

  if (
    q.includes("faskes") ||
    q.includes("puskesmas") ||
    q.includes("rumah sakit") ||
    q.includes("rs") ||
    q.includes("klinik") ||
    q.includes("dokter") ||
    q.includes("igd") ||
    q.includes("ugd") ||
    q.includes("lokasi") ||
    q.includes("dekat") ||
    q.includes("alamat") ||
    q.includes("buka") ||
    q.includes("jadwal") ||
    q.includes("antrean") ||
    q.includes("antri")
  ) {
    return [
      "Mencari data fasilitas kesehatan di Semarang...",
      "Memeriksa jadwal operasional faskes...",
      "Menyiapkan informasi faskes yang relevan...",
    ];
  }

  if (
    q.includes("obat") ||
    q.includes("resep") ||
    q.includes("parasetamol") ||
    q.includes("bodrex") ||
    q.includes("panadol") ||
    q.includes("dosis") ||
    q.includes("minum obat") ||
    q.includes("salep") ||
    q.includes("vitamin")
  ) {
    return [
      "Meninjau panduan obat bebas BPOM RI...",
      "Memverifikasi aturan pakai yang aman...",
      "Menyiapkan edukasi obat yang tepat...",
    ];
  }

  if (
    q.includes("demam") ||
    q.includes("pusing") ||
    q.includes("mual") ||
    q.includes("batuk") ||
    q.includes("flu") ||
    q.includes("sakit") ||
    q.includes("gejala") ||
    q.includes("lemas") ||
    q.includes("lambung") ||
    q.includes("gerd") ||
    q.includes("maag") ||
    q.includes("diare") ||
    q.includes("nyeri") ||
    q.includes("pegal")
  ) {
    return [
      "Menganalisis keluhan & gejala Anda...",
      "Menelaah kemungkinan penyebab umum...",
      "Menyiapkan tips perawatan mandiri di rumah...",
    ];
  }

  if (
    q.includes("imunisasi") ||
    q.includes("vaksin") ||
    q.includes("anak") ||
    q.includes("bayi") ||
    q.includes("balita") ||
    q.includes("posyandu") ||
    q.includes("stunting")
  ) {
    return [
      "Memeriksa panduan imunisasi & gizi anak...",
      "Menyiapkan informasi tumbuh kembang balita...",
    ];
  }

  if (
    q.includes("bpjs") ||
    q.includes("rujukan") ||
    q.includes("kartu") ||
    q.includes("faskes 1") ||
    q.includes("syarat") ||
    q.includes("alur")
  ) {
    return [
      "Memeriksa alur layanan & prosedur rujukan BPJS...",
      "Menyiapkan panduan rujukan rumah sakit...",
    ];
  }

  return [
    "WARAS Assistant sedang memahami pertanyaan Anda...",
    "Menyelaraskan dengan referensi kesehatan terpercaya...",
    "Menyusun jawaban yang ringkas dan tepat...",
  ];
}

// Komponen efek mengetik cepat (Typewriter Streaming Effect)
function TypewriterMessage({ text, isTyping, onTick, onComplete }) {
  const [displayedLength, setDisplayedLength] = useState(isTyping ? 0 : text.length);

  useEffect(() => {
    if (!isTyping) {
      setDisplayedLength(text.length);
      return;
    }

    setDisplayedLength(0);
    let current = 0;
    const total = text.length;

    // Kecepatan adaptif: 3-6 karakter tiap 16ms agar terasa cepat layaknya stream AI modern
    const step = Math.max(3, Math.floor(total / 60));
    const intervalTime = 16;

    const timer = setInterval(() => {
      current += step;
      if (current >= total) {
        setDisplayedLength(total);
        clearInterval(timer);
        if (onComplete) onComplete();
      } else {
        setDisplayedLength(current);
        if (onTick) onTick();
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, [text, isTyping]);

  const displayedText = text.slice(0, displayedLength);
  const isCurrentlyTyping = isTyping && displayedLength < text.length;

  return (
    <div className="relative">
      {renderFormattedMessage(displayedText)}
      {isCurrentlyTyping && (
        <span className="inline-block w-1.5 h-3.5 bg-[#003B3B] ml-1 animate-pulse align-middle rounded-xs" />
      )}
    </div>
  );
}

export default function AIChat({
  activeConversation,
  onUpdateMessages = () => {},
  initialPrompt = ""
}) {
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [loadingStatus, setLoadingStatus] = useState("");
  const [animatingMessageId, setAnimatingMessageId] = useState(null);
  const activeQueryRef = useRef("");
  const messagesEndRef = useRef(null);
  const hasTriggeredInitial = useRef(false);

  const messages = activeConversation?.messages || [];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading, animatingMessageId]);

  // Efek rotasi status loading variatif selama proses berlangsung
  useEffect(() => {
    if (!isLoading) return;
    const statuses = getLoadingStatusList(activeQueryRef.current);
    let idx = 0;
    setLoadingStatus(statuses[0]);

    const interval = setInterval(() => {
      idx = (idx + 1) % statuses.length;
      setLoadingStatus(statuses[idx]);
    }, 1800);

    return () => clearInterval(interval);
  }, [isLoading]);

  const handleSend = async (textToSend) => {
    const messageContent = textToSend || inputText;
    if (!messageContent.trim() || isLoading) return;

    activeQueryRef.current = messageContent;

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
      const history = messages
        .filter((m) => m.sender === "user" || m.sender === "ai")
        .map((m) => ({
          role: m.sender === "user" ? "user" : "model",
          parts: m.message,
        }));

      const aiResponse = await aiService.sendMessage(messageContent, history);
      setAnimatingMessageId(aiResponse.id);
      onUpdateMessages([...updatedMessages, aiResponse], messageContent);
    } catch (err) {
      console.error("Failed to get AI response:", err);
      const errMsg = {
        id: `err-${Date.now()}`,
        sender: "ai",
        message: "Maaf, terjadi kesalahan saat menghubungi WARAS Assistant. Silakan coba lagi sebentar lagi.",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        type: "error",
      };
      setAnimatingMessageId(errMsg.id);
      onUpdateMessages([...updatedMessages, errMsg], messageContent);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (initialPrompt && !hasTriggeredInitial.current) {
      hasTriggeredInitial.current = true;
      handleSend(initialPrompt);
    }
  }, [initialPrompt]);

  const suggestedQuestions = [
    {
      icon: Thermometer,
      text: "Saya mengalami demam dan batuk tak kunjung reda",
    },
    {
      icon: ShieldCheck,
      text: "Informasi jadwal imunisasi dasar balita di Semarang",
    },
    {
      icon: MapPin,
      text: "Cari faskes 24 jam dan IGD terdekat di Semarang",
    },
    {
      icon: ClipboardList,
      text: "Syarat dan alur rujukan BPJS ke rumah sakit",
    },
  ];

  return (
    <div className="flex flex-col h-full rounded-2xl bg-white border border-[#E2ECEB] shadow-xs relative overflow-hidden">
      
      {/* MESSAGES / WELCOME VIEW SCROLLABLE AREA */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-6 scrollbar-thin">
        {messages.length === 0 ? (
          /* WELCOME STATE */
          <div className="h-full flex flex-col items-center justify-center text-center max-w-xl mx-auto py-6 sm:py-10">
            {/* Sparkles Icon Header */}
            <div className="w-14 h-14 rounded-2xl bg-[#003B3B] text-white flex items-center justify-center mb-4 shadow-sm">
              <Sparkles className="w-7 h-7 text-[#DDEEEE]" />
            </div>

            <h2 className="font-poppins font-bold text-xl sm:text-2xl text-[#0D2626] mb-2 tracking-tight">
              Halo, saya WARAS Assistant
            </h2>

            <p className="font-inter text-xs sm:text-sm text-[#526666] mb-6 leading-relaxed max-w-md">
              Saya siap membantu Anda memahami informasi kesehatan awal, alur faskes di Semarang, dan tips medis dasar.
            </p>

            {/* Suggested Question Chips */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 w-full">
              {suggestedQuestions.map((q, idx) => {
                const Icon = q.icon;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSend(q.text)}
                    className="p-3.5 text-left rounded-xl bg-[#F8FAFA] hover:bg-[#EBF5F5] border border-[#E2ECEB] hover:border-[#003B3B]/30 shadow-2xs transition-all duration-150 cursor-pointer group flex items-start gap-2.5"
                  >
                    <div className="p-2 rounded-lg bg-white text-[#003B3B] border border-[#E2ECEB] group-hover:scale-105 group-hover:bg-[#003B3B] group-hover:text-white transition-all shrink-0">
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                    <span className="font-inter text-xs text-[#0D2626] font-medium leading-relaxed pt-0.5">
                      {q.text}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        ) : (
          /* CONVERSATION MESSAGES */
          <div className="space-y-5 max-w-3xl mx-auto">
            {messages.map((msg) => {
              const isUser = msg.sender === "user";
              const articles = msg.relatedArticleIds
                ? aiService.getArticlesByIds(msg.relatedArticleIds)
                : [];

              return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${isUser ? "items-end" : "items-start"}`}
                >
                  {/* Sender Header */}
                  {!isUser && (
                    <div className="flex items-center gap-2 mb-1.5 text-xs font-poppins font-semibold text-[#003B3B]">
                      <div className="w-5 h-5 rounded-md bg-[#003B3B] text-white flex items-center justify-center">
                        <Sparkles className="w-3 h-3 text-[#DDEEEE]" />
                      </div>
                      <span>WARAS Assistant</span>
                    </div>
                  )}

                  {/* Message Bubble */}
                  <div
                    className={`p-4 rounded-2xl text-xs sm:text-sm leading-relaxed font-inter max-w-[92%] sm:max-w-[85%] ${
                      isUser
                        ? "bg-[#003B3B] text-white rounded-tr-xs shadow-xs"
                        : "bg-[#F8FAFA] border border-[#E2ECEB] text-[#0D2626] rounded-tl-xs shadow-2xs"
                    }`}
                  >
                    {isUser ? (
                      <p className="whitespace-pre-line font-medium">{msg.message}</p>
                    ) : (
                      <TypewriterMessage
                        text={msg.message}
                        isTyping={animatingMessageId === msg.id}
                        onTick={scrollToBottom}
                        onComplete={() => setAnimatingMessageId(null)}
                      />
                    )}
                  </div>

                  {/* Facility CTA Card if AI recommends faskes */}
                  {!isUser && msg.showFacilityCTA && animatingMessageId !== msg.id && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className="mt-3 w-full max-w-sm rounded-xl bg-[#EBF5F5] border border-[#DDEEEE] p-3.5 flex items-start gap-3"
                    >
                      <div className="p-2 rounded-lg bg-[#003B3B] text-white shrink-0">
                        <MapPin className="w-4 h-4" />
                      </div>
                      <div className="space-y-1.5 flex-1">
                        <h4 className="font-poppins font-semibold text-xs text-[#003B3B]">
                          Cari Fasilitas Kesehatan Terkait
                        </h4>
                        <p className="text-[11px] text-[#526666] leading-relaxed">
                          Temukan fasilitas pelayanan kesehatan di Kota Semarang yang siap melayani kebutuhan Anda.
                        </p>
                        <Link
                          to="/user/facilities"
                          className="inline-flex items-center gap-1 text-xs font-semibold text-[#003B3B] hover:underline pt-0.5"
                        >
                          <span>Lihat Daftar Fasilitas</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </motion.div>
                  )}

                  {/* Article Recommendation Cards */}
                  {!isUser && articles.length > 0 && animatingMessageId !== msg.id && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className="mt-3.5 w-full space-y-2"
                    >
                      <div className="flex items-center gap-1.5 text-xs font-semibold text-[#003B3B]">
                        <BookOpen className="w-3.5 h-3.5" />
                        <span>Bacaan Medis Terkait:</span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {articles.map((art) => (
                          <Link key={art.id} to={`/user/health-info/articles/${art.id}`}>
                            <div className="p-3 rounded-xl bg-white hover:bg-[#F8FAFA] border border-[#E2ECEB] hover:border-[#003B3B]/30 shadow-2xs transition-all flex items-start gap-2.5 group h-full">
                              {art.image && (
                                <img
                                  src={art.image}
                                  alt={art.title}
                                  className="w-12 h-12 rounded-lg object-cover shrink-0"
                                />
                              )}
                              <div className="min-w-0 flex-1 space-y-0.5">
                                <span className="text-[10px] font-semibold text-[#003B3B] uppercase tracking-wider block">
                                  {art.category}
                                </span>
                                <h5 className="font-poppins font-semibold text-xs text-[#0D2626] truncate group-hover:text-[#003B3B]">
                                  {art.title}
                                </h5>
                                <p className="text-[11px] text-[#526666] line-clamp-1 font-inter">
                                  {art.description}
                                </p>
                              </div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  <span className="text-[10px] text-[#809494] mt-1 px-1 font-inter">
                    {msg.timestamp}
                  </span>
                </div>
              );
            })}

            {/* AI Loading Indicator (Variatif & Kontekstual) */}
            {isLoading && (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2.5 text-xs font-inter text-[#526666] py-2 px-3 bg-[#F8FAFA] border border-[#E2ECEB] rounded-xl w-fit shadow-2xs"
              >
                <div className="relative flex items-center justify-center shrink-0">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#003B3B] animate-ping absolute opacity-60" />
                  <div className="w-2 h-2 rounded-full bg-[#003B3B]" />
                </div>
                <div className="flex items-center gap-1.5 min-w-0">
                  <Bot className="w-3.5 h-3.5 text-[#003B3B] shrink-0" />
                  <motion.span
                    key={loadingStatus}
                    initial={{ opacity: 0, x: -3 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2 }}
                    className="text-[#003B3B] font-medium"
                  >
                    {loadingStatus}
                  </motion.span>
                </div>
              </motion.div>
            )}

            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* INPUT AREA */}
      <div className="p-3 sm:p-4 bg-white border-t border-[#E2ECEB]">
        <div className="max-w-3xl mx-auto space-y-2">
          <div className="relative flex items-end w-full bg-[#F8FAFA] border border-[#E2ECEB] focus-within:border-[#003B3B]/40 focus-within:bg-white focus-within:ring-2 focus-within:ring-[#003B3B]/10 rounded-xl p-2 transition-all">
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
              className="w-full bg-transparent border-0 px-2 py-1 text-xs sm:text-sm text-[#0D2626] placeholder-[#809494] focus:outline-none resize-none font-inter leading-relaxed max-h-32"
            />

            <button
              onClick={() => handleSend()}
              disabled={!inputText.trim() || isLoading}
              className="w-8 h-8 rounded-lg bg-[#003B3B] hover:bg-[#002D2D] disabled:opacity-40 text-white flex items-center justify-center shrink-0 transition-colors cursor-pointer shadow-xs ml-2 mb-0.5"
              aria-label="Kirim Pesan"
            >
              <ArrowUp className="w-4 h-4 stroke-[2.5]" />
            </button>
          </div>

          {/* Safety Disclaimer */}
          <div className="flex items-center justify-center gap-1.5 text-[11px] text-[#738787] font-inter text-center pt-0.5">
            <Info className="w-3.5 h-3.5 text-[#0B6B6B] shrink-0" />
            <span>
              WARAS Assistant memberikan edukasi umum dan bukan pengganti diagnosis resmi tenaga kesehatan.
            </span>
          </div>
        </div>
      </div>

    </div>
  );
}
