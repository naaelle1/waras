import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  ArrowUp,
  Info,
  BookOpen,
  MapPin,
  ShieldCheck,
  ArrowRight,
  Bot,
  Paperclip,
  Mic,
  Share2,
  FileText,
  Clock,
  Menu,
  Check,
  ChevronDown,
  X,
  Stethoscope,
  Activity,
  HeartHandshake,
  Image as ImageIcon
} from "lucide-react";

import { aiService } from "../../services/aiService";
import LivingAIAvatar from "../common/LivingAIAvatar";

// Format inline bold text: ubah **teks** jadi <strong> dan hilangkan simbol liar
function formatInlineText(text) {
  if (!text) return null;

  const parts = text.split(/(\*\*[^*]+?\*\*)/g);

  return parts.map((part, idx) => {
    if (part.startsWith("**") && part.endsWith("**") && part.length > 4) {
      const boldContent = part.slice(2, -2);
      return (
        <strong key={idx} className="font-semibold text-slate-900">
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
    <div className="space-y-2 font-inter text-xs sm:text-sm leading-relaxed text-slate-800">
      {lines.map((line, lineIdx) => {
        let cleaned = line.trim();

        if (/^[-*_]{3,}$/.test(cleaned)) {
          return null;
        }

        if (/^#{1,6}\s+/.test(cleaned)) {
          const heading = cleaned.replace(/^#{1,6}\s+/, "");
          return (
            <p key={lineIdx} className="font-semibold text-sm sm:text-base text-[#022022] pt-1">
              {formatInlineText(heading)}
            </p>
          );
        }

        if (/^[-*•]\s+/.test(cleaned)) {
          const bullet = cleaned.replace(/^[-*•]\s+/, "");
          return (
            <div key={lineIdx} className="flex items-start gap-2.5 pl-1">
              <span className="text-[#022022] font-bold text-sm leading-none mt-1 select-none">•</span>
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

// Status loading variatif kontekstual
function getLoadingStatusList(query) {
  const q = (query || "").toLowerCase();

  if (
    q.includes("foto") ||
    q.includes("gambar") ||
    q.includes("gatal") ||
    q.includes("ruam") ||
    q.includes("bintik") ||
    q.includes("kulit")
  ) {
    return [
      "Menganalisis foto keluhan & kondisi visual...",
      "Mengecek pola ruam & indikasi pemicu...",
      "Menyiapkan observasi awal & langkah perawatan mandiri...",
    ];
  }

  if (
    q.includes("faskes") ||
    q.includes("puskesmas") ||
    q.includes("rumah sakit") ||
    q.includes("rs") ||
    q.includes("igd") ||
    q.includes("ugd") ||
    q.includes("lokasi")
  ) {
    return [
      "Menghubungkan data faskes Kota Semarang...",
      "Mengecek faskes siaga terdekat...",
      "Menyusun arahan rujukan medis...",
    ];
  }

  if (
    q.includes("demam") ||
    q.includes("batuk") ||
    q.includes("sakit") ||
    q.includes("nyeri") ||
    q.includes("gejala")
  ) {
    return [
      "Menganalisis indikasi keluhan kesehatan...",
      "Menyesuaikan protokol triase dasar...",
      "Menyiapkan langkah observasi awal...",
    ];
  }

  if (
    q.includes("bpjs") ||
    q.includes("rujukan") ||
    q.includes("kartu") ||
    q.includes("faskes 1")
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

// Komponen efek mengetik cepat
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
        <span className="inline-block w-1.5 h-3.5 bg-[#022022] ml-1 animate-pulse align-middle rounded-xs" />
      )}
    </div>
  );
}

const SERVICE_CATEGORIES = [
  "Konsultasi Keluhan Awal",
  "Faskes & Antrean 24 Jam",
  "Alur BPJS & Rujukan",
  "Vaksinasi & Imunisasi",
  "Istilah & Obat Medis"
];

export default function AIChat({
  activeConversation,
  onUpdateMessages = () => {},
  initialPrompt = "",
  onNewConversation = () => {},
  onOpenHistoryMobile = () => {},
  onOpenMobileNav = () => {},
  isLoadingMessages = false,
  isLoadingConversations = false
}) {
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [loadingStatus, setLoadingStatus] = useState("");
  const [animatingMessageId, setAnimatingMessageId] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("Pilih Kategori Layanan");
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [showGuideModal, setShowGuideModal] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [selectedAttachment, setSelectedAttachment] = useState(null);
  const [viewingImage, setViewingImage] = useState(null);

  const activeQueryRef = useRef("");
  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);
  const fileInputRef = useRef(null);
  const hasTriggeredInitial = useRef(false);

  const messages = activeConversation?.messages || [];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading, animatingMessageId]);

  // Efek rotasi status loading variatif
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

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 2500);
  };

  const handleFileSelect = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      showToast("Hanya file gambar (JPG, PNG, WEBP) yang didukung.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      showToast("Ukuran foto maksimal 5MB.");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result;
      const base64Data = typeof result === "string" ? result.split(",")[1] : "";
      setSelectedAttachment({
        name: file.name,
        mimeType: file.type || "image/jpeg",
        data: base64Data,
        previewUrl: result,
        sizeFormatted: `${Math.round(file.size / 1024)} KB`,
      });
      showToast("Foto keluhan berhasil dilampirkan.");
    };
    reader.onerror = () => {
      showToast("Gagal membaca file gambar.");
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveAttachment = () => {
    setSelectedAttachment(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSend = async (textToSend, attachmentToSend) => {
    const rawText = textToSend !== undefined ? textToSend : inputText;
    const attachment = attachmentToSend !== undefined ? attachmentToSend : selectedAttachment;
    const trimmed = rawText ? rawText.trim() : "";

    if ((!trimmed && !attachment) || isLoading) return;

    const messageContent =
      trimmed || "Tolong periksa foto keluhan kesehatan ini dan berikan informasi atau sarannya.";
    activeQueryRef.current = messageContent;

    const userMsg = {
      id: `user-${Date.now()}`,
      sender: "user",
      message: messageContent,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      attachment: attachment
        ? {
            name: attachment.name,
            mimeType: attachment.mimeType,
            data: attachment.data,
            previewUrl: attachment.previewUrl,
          }
        : null,
    };

    const updatedMessages = [...messages, userMsg];
    onUpdateMessages(updatedMessages, messageContent);

    if (textToSend === undefined) setInputText("");
    setSelectedAttachment(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
    setIsLoading(true);

    try {
      const history = messages
        .filter((m) => m.sender === "user" || m.sender === "ai")
        .map((m) => ({
          role: m.sender === "user" ? "user" : "model",
          parts: m.message,
        }));

      const aiResponse = await aiService.sendMessage(
        messageContent,
        history,
        activeConversation?.id,
        attachment ? { mimeType: attachment.mimeType, data: attachment.data, name: attachment.name } : null
      );
      setAnimatingMessageId(aiResponse.id);
      onUpdateMessages([...updatedMessages, aiResponse], messageContent);
    } catch (err) {
      console.error("Failed to get AI response:", err);
      const errMsg = {
        id: `err-${Date.now()}`,
        sender: "ai",
        message:
          "Maaf, terjadi kesalahan saat menghubungi server WARAS Assistant. Silakan periksa koneksi dan coba lagi dalam beberapa saat.",
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

  // Export / Share current chat
  const handleExportShare = () => {
    if (messages.length === 0) {
      showToast("Belum ada percakapan untuk dibagikan.");
      return;
    }

    const transcript = messages
      .map(
        (m) =>
          `[${m.timestamp}] ${m.sender === "user" ? "Warga" : "WARAS Assistant"}:\n${m.message}`
      )
      .join("\n\n---\n\n");

    const header = `=== REKAM KONSULTASI WARAS ASSISTANT (Kota Semarang) ===\nTanggal: ${new Date().toLocaleDateString("id-ID")}\n\n`;
    navigator.clipboard.writeText(header + transcript);
    showToast("Riwayat konsultasi disalin ke clipboard!");
  };

  return (
    <main className="flex-1 flex flex-col justify-between h-full bg-[#F8FAFC] overflow-hidden relative">
      {/* ── TOP HEADER BAR INTERNAL (h-16) ── */}
      <header className="h-16 px-4 sm:px-6 bg-white border-b border-slate-200/80 flex items-center justify-between shrink-0 z-10">
        {/* Sisi Kiri: Brand + Badge */}
        <div className="flex items-center gap-2.5">
          {/* Mobile hamburger menu toggle */}
          <button
            type="button"
            onClick={onOpenMobileNav}
            className="lg:hidden p-1.5 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 cursor-pointer"
            aria-label="Menu navigasi"
          >
            <Menu className="w-5 h-5" />
          </button>

          <LivingAIAvatar
            size="md"
            state={isLoading ? "thinking" : animatingMessageId ? "speaking" : "idle"}
            showGlow
          />

          <div className="flex items-center gap-2">
            <span className="font-poppins font-bold text-sm text-slate-900 tracking-tight">
              WARAS Assistant
            </span>
            <span className="hidden sm:inline-block text-[10px] font-semibold px-2 py-0.5 rounded-md bg-[#022022]/5 text-[#022022] border border-[#022022]/15 uppercase tracking-wider">
              Medis AI
            </span>
          </div>
        </div>

        {/* Sisi Kanan: Barisan Tombol Utilitas Pill */}
        <div className="flex items-center gap-2">
          {/* Tombol Panduan Medis */}
          <button
            type="button"
            onClick={() => setShowGuideModal(true)}
            className="hidden md:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-slate-200 text-xs font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors cursor-pointer"
          >
            <Stethoscope className="w-3.5 h-3.5 text-[#022022]" />
            <span>Panduan Medis</span>
          </button>

          {/* Tombol Bagikan / Ekspor */}
          <button
            type="button"
            onClick={handleExportShare}
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-slate-200 text-xs font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors cursor-pointer"
          >
            <Share2 className="w-3.5 h-3.5 text-slate-500" />
            <span>Bagikan / Ekspor</span>
          </button>

          {/* Tombol Aksi Cepat: + Percakapan Baru */}
          <button
            type="button"
            onClick={onNewConversation}
            className="inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-medium text-white bg-gradient-to-br from-[#023b3b] via-[#022022] to-[#011414] hover:from-[#034d4d] hover:via-[#033033] hover:to-[#022022] backdrop-blur-md border border-[#022022]/80 hover:border-white/30 shadow-[inset_0_1px_1px_rgba(255,255,255,0.28),0_4px_12px_rgba(2,32,34,0.16)] transition-all cursor-pointer active:scale-[0.98] group"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-white/80" />
            <span>+ Percakapan Baru</span>
          </button>

          {/* Mobile History Toggle Button */}
          <button
            type="button"
            onClick={onOpenHistoryMobile}
            className="lg:hidden p-2 rounded-full border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors cursor-pointer"
            aria-label="Buka riwayat chat"
          >
            <Clock className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* ── TOAST NOTIFICATION ── */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-20 left-1/2 -translate-x-1/2 z-40 bg-slate-900 text-white text-xs font-medium px-4 py-2 rounded-full shadow-lg flex items-center gap-2"
          >
            <Check className="w-3.5 h-3.5 text-emerald-400" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── AREA TENGAH: CHAT CANVAS / BENTO PROMPTS (SCROLLABLE) ── */}
      <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-6 scrollbar-thin">
        {(isLoadingConversations || isLoadingMessages) ? (
          /* SKELETON LOADING STATE (ELIMINATES FLICKERING) */
          <div className="w-full max-w-md mx-auto my-auto min-h-[calc(100vh-320px)] flex flex-col items-center justify-center p-6 space-y-4">
            <LivingAIAvatar size="lg" state="thinking" showGlow />
            <div className="text-center space-y-1.5">
              <p className="text-sm font-semibold text-[#022022] font-poppins animate-pulse">
                Memuat riwayat konsultasi...
              </p>
              <p className="text-xs text-slate-400 font-inter">
                Menghubungkan ke basis data WARAS Assistant
              </p>
            </div>
          </div>
        ) : messages.length === 0 ? (
          /* EMPTY STATE: HERO GREETING & BENTO CARDS */
          <div className="w-full max-w-4xl mx-auto flex flex-col items-center justify-center my-auto min-h-[calc(100vh-250px)]">
            {/* 1. Visual Ikon & Sapaan — Living AI Bullet Orb */}
            <div className="relative mb-5 flex items-center justify-center">
              <LivingAIAvatar size="xl" state={isLoading ? "thinking" : "idle"} showGlow />
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight font-poppins text-center">
              Halo, saya WARAS Assistant 👋
            </h2>

            <p className="text-xs sm:text-sm text-slate-500 mt-2 text-center max-w-md font-inter leading-relaxed">
              Saya siap membantu Anda memahami informasi kesehatan awal, alur faskes di Semarang, dan tips medis dasar.
            </p>

            {/* 2. Grid 3 Kartu Bento Utama */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full mt-8">
              {/* Kartu 1: Highlight Gelap #022022 */}
              <div className="bg-[#022022] border border-white/10 text-white rounded-2xl p-5 flex flex-col justify-between shadow-md min-h-[175px] relative overflow-hidden">
                <div className="relative z-10">
                  <div className="flex items-center justify-between">
                    <span className="font-poppins font-bold text-sm tracking-wide text-white">
                      WARAS AI
                    </span>
                    <span className="bg-white/10 text-teal-200 border border-white/20 text-[11px] font-medium px-2.5 py-0.5 rounded-full backdrop-blur-xs">
                      Triase Awal
                    </span>
                  </div>
                  <p className="text-xs text-teal-100/90 leading-relaxed font-inter mt-3">
                    Dirancang untuk menganalisis gejala awal warga dan mengarahkan ke Puskesmas atau RS terdekat di Kota Semarang.
                  </p>
                </div>

                <div className="relative z-10 flex items-center gap-1.5 text-[11px] text-teal-200 font-medium pt-3 border-t border-white/10">
                  <ShieldCheck className="w-3.5 h-3.5 text-teal-200" />
                  <span>Protokol Dinkes Semarang</span>
                </div>
              </div>

              {/* Kartu 2: Daftar Topik / Tasks di Tengah */}
              <div className="bg-white border border-slate-200/90 rounded-2xl p-5 flex flex-col justify-between shadow-xs min-h-[175px]">
                <div>
                  <div className="flex items-center justify-between mb-2.5">
                    <span className="text-[11px] font-bold tracking-wider uppercase text-slate-400 font-poppins">
                      Panduan Topik Cepat
                    </span>
                    <Activity className="w-3.5 h-3.5 text-[#022022]" />
                  </div>

                  <div className="space-y-1.5">
                    <button
                      type="button"
                      onClick={() => handleSend("Saya ingin konsultasi keluhan demam dan batuk yang belum reda")}
                      className="w-full text-left text-xs text-slate-700 hover:text-[#022022] hover:bg-slate-50 p-1.5 rounded-lg flex items-center gap-2 transition-colors cursor-pointer font-medium"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#022022]" />
                      <span className="truncate">Cek keluhan demam & batuk</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleSend("Bagaimana jadwal dan lokasi imunisasi dasar balita di Semarang?")}
                      className="w-full text-left text-xs text-slate-700 hover:text-[#022022] hover:bg-slate-50 p-1.5 rounded-lg flex items-center gap-2 transition-colors cursor-pointer font-medium"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#022022]" />
                      <span className="truncate">Jadwal imunisasi dasar balita</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleSend("Apa saja syarat dan alur rujukan BPJS dari Puskesmas ke RS?")}
                      className="w-full text-left text-xs text-slate-700 hover:text-[#022022] hover:bg-slate-50 p-1.5 rounded-lg flex items-center gap-2 transition-colors cursor-pointer font-medium"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      <span className="truncate">Syarat & alur rujukan BPJS</span>
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-xs">
                  <span className="text-slate-400">Topik Umum</span>
                  <Link
                    to="/user/health-info/guides"
                    className="text-[#022022] font-semibold hover:underline cursor-pointer"
                  >
                    Lihat Semua
                  </Link>
                </div>
              </div>

              {/* Kartu 3: Suggested Prompt di Kanan */}
              <div
                onClick={() => handleSend("Di mana faskes 24 jam dan IGD terdekat di Semarang yang sedang beroperasi saat ini?")}
                className="bg-white border border-slate-200/90 rounded-2xl p-5 flex flex-col justify-between shadow-xs hover:border-[#022022]/30 hover:shadow-sm cursor-pointer transition-all min-h-[175px] group"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[11px] font-bold tracking-wider uppercase text-slate-400 font-poppins">
                      Rekomendasi Warga
                    </span>
                    <MapPin className="w-3.5 h-3.5 text-[#022022]" />
                  </div>
                  <p className="font-semibold text-xs sm:text-[13px] text-slate-800 group-hover:text-[#022022] transition-colors leading-snug font-inter">
                    &ldquo;Di mana faskes 24 jam dan IGD terdekat di Semarang yang sedang beroperasi saat ini?&rdquo;
                  </p>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-xs">
                  <span className="text-slate-400 font-inter">Saran Pertanyaan</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#022022] transition-all group-hover:translate-x-1" />
                </div>
              </div>
            </div>

            {/* 3. Baris Pill Aksi Cepat Horizontal */}
            <div className="flex flex-wrap items-center justify-center gap-2.5 mt-5 w-full">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="rounded-full px-4 py-2 text-xs font-semibold text-[#022022] bg-gradient-to-br from-teal-500/[0.18] via-teal-100/80 to-white/95 hover:from-teal-500/[0.28] hover:via-teal-200/80 hover:to-white backdrop-blur-md border border-teal-500/30 hover:border-teal-600/40 shadow-[inset_0_1px_1px_rgba(255,255,255,0.9),0_4px_12px_rgba(20,184,166,0.12)] active:scale-[0.98] transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>📷</span>
                <span>Cek Foto Gatal / Ruam</span>
              </button>

              <button
                type="button"
                onClick={() => handleSend("Saya ingin berkonsultasi mengenai gejala demam dan batuk")}
                className="rounded-full px-4 py-2 text-xs font-medium text-[#022022] bg-gradient-to-br from-[#022022]/[0.08] via-teal-50/70 to-white/90 hover:from-[#022022]/[0.14] hover:via-teal-100/70 hover:to-white backdrop-blur-md border border-[#022022]/15 hover:border-[#022022]/30 shadow-[inset_0_1px_1px_rgba(255,255,255,0.9),0_4px_12px_rgba(2,32,34,0.05)] active:scale-[0.98] transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>🌡️</span>
                <span>Demam & Batuk</span>
              </button>

              <button
                type="button"
                onClick={() => handleSend("Tampilkan rumah sakit rujukan dengan layanan IGD 24 jam di Kota Semarang")}
                className="rounded-full px-4 py-2 text-xs font-medium text-[#022022] bg-gradient-to-br from-[#022022]/[0.08] via-teal-50/70 to-white/90 hover:from-[#022022]/[0.14] hover:via-teal-100/70 hover:to-white backdrop-blur-md border border-[#022022]/15 hover:border-[#022022]/30 shadow-[inset_0_1px_1px_rgba(255,255,255,0.9),0_4px_12px_rgba(2,32,34,0.05)] active:scale-[0.98] transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>🏥</span>
                <span>IGD 24 Jam Terdekat</span>
              </button>

              <button
                type="button"
                onClick={() => handleSend("Bagaimana informasi dan jadwal imunisasi dasar balita di Semarang?")}
                className="rounded-full px-4 py-2 text-xs font-medium text-[#022022] bg-gradient-to-br from-[#022022]/[0.08] via-teal-50/70 to-white/90 hover:from-[#022022]/[0.14] hover:via-teal-100/70 hover:to-white backdrop-blur-md border border-[#022022]/15 hover:border-[#022022]/30 shadow-[inset_0_1px_1px_rgba(255,255,255,0.9),0_4px_12px_rgba(2,32,34,0.05)] active:scale-[0.98] transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>💉</span>
                <span>Info Imunisasi Semarang</span>
              </button>

              <button
                type="button"
                onClick={() => handleSend("Bagaimana alur dan syarat rujukan BPJS kesehatan faskes tingkat 1 di Semarang?")}
                className="rounded-full px-4 py-2 text-xs font-medium text-[#022022] bg-gradient-to-br from-[#022022]/[0.08] via-teal-50/70 to-white/90 hover:from-[#022022]/[0.14] hover:via-teal-100/70 hover:to-white backdrop-blur-md border border-[#022022]/15 hover:border-[#022022]/30 shadow-[inset_0_1px_1px_rgba(255,255,255,0.9),0_4px_12px_rgba(2,32,34,0.05)] active:scale-[0.98] transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>📋</span>
                <span>Alur Rujukan BPJS</span>
              </button>
            </div>
          </div>
        ) : (
          /* ACTIVE CONVERSATION VIEW */
          <div className="space-y-6 max-w-3xl mx-auto py-2">
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
                  {/* Sender Header for AI */}
                  {!isUser && (
                    <div className="flex items-center gap-2 mb-1.5 text-xs font-poppins font-semibold text-[#022022]">
                      <LivingAIAvatar
                        size="xs"
                        state={animatingMessageId === msg.id ? "speaking" : "idle"}
                        showGlow={false}
                      />
                      <span>WARAS Assistant</span>
                    </div>
                  )}

                  {/* Message Bubble */}
                  <div
                    className={`p-4 rounded-2xl text-xs sm:text-sm leading-relaxed font-inter max-w-[92%] sm:max-w-[85%] ${
                      isUser
                        ? "bg-[#022022] text-white rounded-tr-xs shadow-xs border border-white/10"
                        : "bg-white border border-slate-200/90 text-slate-900 rounded-tl-xs shadow-2xs"
                    }`}
                  >
                    {isUser && msg.attachment && (
                      <div className="mb-3 overflow-hidden rounded-xl border border-white/20 bg-black/25">
                        {(() => {
                          const imgSrc =
                            msg.attachment.previewUrl ||
                            (msg.attachment.data?.startsWith("data:")
                              ? msg.attachment.data
                              : `data:${msg.attachment.mimeType || "image/jpeg"};base64,${msg.attachment.data}`);
                          return (
                            <div>
                              <img
                                src={imgSrc}
                                alt={msg.attachment.name || "Foto keluhan"}
                                className="w-full max-h-64 object-cover rounded-t-xl cursor-pointer hover:opacity-95 transition-opacity"
                                onClick={() => setViewingImage(imgSrc)}
                              />
                              <div className="px-3 py-1.5 text-[11px] text-white/90 bg-black/40 flex items-center justify-between">
                                <span className="truncate flex items-center gap-1.5 font-medium">
                                  <ImageIcon className="w-3.5 h-3.5 text-teal-300 shrink-0" />
                                  <span className="truncate">{msg.attachment.name || "Foto keluhan"}</span>
                                </span>
                                <span className="text-[10px] text-teal-200/90 shrink-0 ml-2">Klik perbesar</span>
                              </div>
                            </div>
                          );
                        })()}
                      </div>
                    )}
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

                  {/* Facility CTA Card */}
                  {!isUser && msg.showFacilityCTA && animatingMessageId !== msg.id && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className="mt-3 w-full max-w-sm rounded-2xl bg-[#022022]/5 border border-[#022022]/15 p-4 flex items-start gap-3 shadow-2xs"
                    >
                      <div className="p-2.5 rounded-xl bg-[#022022] text-white border border-white/20 shrink-0">
                        <MapPin className="w-4 h-4" />
                      </div>
                      <div className="space-y-1.5 flex-1">
                        <h4 className="font-poppins font-semibold text-xs text-[#022022]">
                          Fasilitas Kesehatan Terkait
                        </h4>
                        <p className="text-[11px] text-slate-600 leading-relaxed font-inter">
                          Temukan 37 Puskesmas dan RS rujukan di Kota Semarang yang siap melayani Anda.
                        </p>
                        <Link
                          to="/user/facilities"
                          className="inline-flex items-center gap-1 text-xs font-semibold text-[#022022] hover:underline pt-0.5"
                        >
                          <span>Buka Peta & Antrean Faskes</span>
                          <ArrowRight className="w-3.5 h-3.5 text-[#022022]" />
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
                      <div className="flex items-center gap-1.5 text-xs font-semibold text-[#022022] font-poppins">
                        <BookOpen className="w-3.5 h-3.5 text-[#022022]" />
                        <span>Bacaan Edukasi Medis Terkait:</span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {articles.map((art) => (
                          <Link key={art.id} to={`/user/health-info/articles/${art.id}`}>
                            <div className="p-3 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 hover:border-[#022022]/30 shadow-2xs transition-all flex items-start gap-2.5 group h-full">
                              {art.image && (
                                <img
                                  src={art.image}
                                  alt={art.title}
                                  className="w-12 h-12 rounded-lg object-cover shrink-0"
                                />
                              )}
                              <div className="min-w-0 flex-1 space-y-0.5">
                                <span className="text-[10px] font-semibold text-[#022022] uppercase tracking-wider block">
                                  {art.category}
                                </span>
                                <h5 className="font-poppins font-semibold text-xs text-slate-900 truncate group-hover:text-[#022022]">
                                  {art.title}
                                </h5>
                                <p className="text-[11px] text-slate-500 line-clamp-1 font-inter">
                                  {art.description}
                                </p>
                              </div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  <span className="text-[10px] text-slate-400 mt-1 px-1 font-inter">
                    {msg.timestamp}
                  </span>
                </div>
              );
            })}

            {/* AI Loading Indicator */}
            {isLoading && (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2.5 text-xs font-inter text-slate-700 py-2 px-3.5 bg-white/90 backdrop-blur-md border border-[#022022]/15 rounded-2xl w-fit shadow-xs"
              >
                <LivingAIAvatar size="xs" state="thinking" showGlow={false} />
                <div className="flex items-center gap-1.5 min-w-0">
                  <motion.span
                    key={loadingStatus}
                    initial={{ opacity: 0, x: -3 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2 }}
                    className="text-[#022022] font-semibold text-xs"
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

      {/* ── AREA BAWAH: FLOATING COMPOSER BOX 2 BARIS ── */}
      <div className="w-full max-w-3xl mx-auto px-4 sm:px-6 pb-5 pt-2 shrink-0">
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileSelect}
          accept="image/png,image/jpeg,image/jpg,image/webp"
          className="hidden"
        />

        <div className="bg-white border border-slate-200/90 rounded-2xl p-3 shadow-sm focus-within:border-[#022022] focus-within:ring-4 focus-within:ring-[#022022]/15 transition-all">
          {/* Pratinjau Foto Lampiran Sebelum Dikirim */}
          {selectedAttachment && (
            <div className="mb-2.5 px-3 py-2 rounded-xl bg-teal-50/80 border border-teal-200/90 flex items-center justify-between animate-in fade-in zoom-in-95 duration-150">
              <div className="flex items-center gap-2.5 min-w-0">
                <img
                  src={selectedAttachment.previewUrl}
                  alt="Pratinjau"
                  className="w-10 h-10 rounded-lg object-cover border border-teal-300/80 shrink-0"
                />
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-[#022022] bg-teal-200/70 px-1.5 py-0.5 rounded-md">
                      Foto Terlampir
                    </span>
                    <span className="text-xs font-medium text-slate-800 truncate max-w-[180px] sm:max-w-xs">
                      {selectedAttachment.name}
                    </span>
                  </div>
                  <p className="text-[11px] text-teal-800 font-inter">
                    {selectedAttachment.sizeFormatted} • Siap dianalisis oleh AI
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={handleRemoveAttachment}
                className="p-1 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-white transition-colors cursor-pointer"
                title="Hapus foto"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Baris Atas: Textarea */}
          <textarea
            ref={textareaRef}
            rows={1}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            placeholder={
              selectedAttachment
                ? "Tulis keterangan foto (misal: gatal sejak kapan, area mana saja)..."
                : "Ceritakan keluhan atau tanyakan informasi kesehatan..."
            }
            className="w-full text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none resize-none px-2 py-1.5 font-inter leading-relaxed max-h-32"
          />

          {/* Baris Bawah: Toolbar Input */}
          <div className="flex items-center justify-between pt-2 mt-1 border-t border-slate-100">
            {/* Kiri: Dropdown Pill Kategori */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
                className="text-xs font-medium text-[#022022] bg-gradient-to-br from-[#022022]/[0.06] via-teal-50/60 to-white/90 hover:from-[#022022]/[0.12] hover:via-teal-100/70 hover:to-white backdrop-blur-md px-3.5 py-1.5 rounded-full border border-[#022022]/15 hover:border-[#022022]/30 shadow-[inset_0_1px_1px_rgba(255,255,255,0.9),0_2px_8px_rgba(2,32,34,0.04)] flex items-center gap-1.5 cursor-pointer select-none transition-all active:scale-[0.98]"
              >
                <span>{selectedCategory}</span>
                <ChevronDown className="w-3 h-3 text-[#022022]/70" />
              </button>

              {showCategoryDropdown && (
                <div className="absolute left-0 bottom-9 z-30 bg-white border border-slate-200 rounded-xl shadow-lg p-1 min-w-[200px] text-xs font-inter animate-in fade-in zoom-in-95 duration-150">
                  {SERVICE_CATEGORIES.map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => {
                        setSelectedCategory(cat);
                        setShowCategoryDropdown(false);
                      }}
                      className="w-full text-left px-3 py-2 rounded-lg text-slate-700 hover:bg-[#022022]/5 hover:text-[#022022] transition-colors cursor-pointer flex items-center justify-between"
                    >
                      <span>{cat}</span>
                      {selectedCategory === cat && (
                        <Check className="w-3.5 h-3.5 text-[#022022]" />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Kanan: Lampirkan, Suara, & Kirim */}
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className={`p-1.5 rounded-full transition-colors cursor-pointer ${
                  selectedAttachment
                    ? "bg-[#022022] text-white hover:bg-[#033b3b]"
                    : "text-slate-400 hover:text-slate-700 hover:bg-slate-100"
                }`}
                title="Lampirkan foto keluhan (ruam, gatal, kemasan obat)"
              >
                <Paperclip className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => showToast("Fitur rekaman suara sedang disiapkan.")}
                className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
                title="Input suara / rekaman"
              >
                <Mic className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => handleSend()}
                disabled={(!inputText.trim() && !selectedAttachment) || isLoading}
                className="text-white text-xs font-semibold px-4 py-1.5 rounded-full flex items-center gap-1.5 bg-gradient-to-br from-[#023b3b] via-[#022022] to-[#011414] hover:from-[#034d4d] hover:via-[#033033] hover:to-[#022022] backdrop-blur-md border border-[#022022]/80 hover:border-white/30 shadow-[inset_0_1px_1px_rgba(255,255,255,0.28),0_4px_12px_rgba(2,32,34,0.16)] active:scale-[0.98] transition-all ml-1 group disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                aria-label="Kirim Pesan"
              >
                <span>Kirim</span>
                <ArrowUp className="w-3.5 h-3.5 stroke-[2.5] text-white group-hover:-translate-y-0.5 transition-transform" />
              </button>
            </div>
          </div>
        </div>

        {/* Teks Disclaimer */}
        <p className="text-[11px] text-slate-400 text-center mt-2.5 font-inter">
          WARAS Assistant memberikan edukasi umum dan bukan pengganti diagnosis resmi tenaga kesehatan.
        </p>
      </div>

      {/* ── MODAL LIGHTBOX FOTO PREVIEW ── */}
      {viewingImage && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 selection:bg-teal-500 selection:text-white"
          onClick={() => setViewingImage(null)}
        >
          <div
            className="relative max-w-3xl max-h-[90vh] flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setViewingImage(null)}
              className="absolute -top-12 right-0 p-2 rounded-full bg-white/20 text-white hover:bg-white/30 transition-colors cursor-pointer"
              aria-label="Tutup pratinjau"
            >
              <X className="w-5 h-5" />
            </button>
            <img
              src={viewingImage}
              alt="Foto Keluhan Detail"
              className="max-h-[85vh] max-w-full rounded-2xl shadow-2xl object-contain border border-white/20"
            />
          </div>
        </div>
      )}

      {/* ── MODAL PANDUAN MEDIS & SOP TRIASE ── */}
      {showGuideModal && (
        <div
          className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setShowGuideModal(false)}
        >
          <div
            className="w-full max-w-lg bg-white rounded-3xl p-6 sm:p-7 shadow-2xl border border-slate-200 space-y-5 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setShowGuideModal(false)}
              className="absolute top-5 right-5 p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#022022]/5 text-[#022022] border border-[#022022]/15 flex items-center justify-center font-bold">
                <Stethoscope className="w-5 h-5 text-[#022022]" />
              </div>
              <div>
                <h3 className="font-poppins font-bold text-lg text-slate-900">
                  Panduan Medis & SOP AI
                </h3>
                <p className="text-xs text-slate-500 font-inter">
                  Pedoman penggunaan asisten kesehatan digital Kota Semarang
                </p>
              </div>
            </div>

            <div className="space-y-3 text-xs text-slate-600 font-inter leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
              <div className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-[#022022] mt-1.5 shrink-0" />
                <p>
                  <strong>Edukasi Awal:</strong> Informasi yang disajikan AI bersumber dari pedoman Kemenkes RI dan Dinas Kesehatan Kota Semarang untuk membantu pemahaman keluhan awal.
                </p>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-[#022022] mt-1.5 shrink-0" />
                <p>
                  <strong>Bukan Diagnosis Mutlak:</strong> Asisten tidak meresepkan obat keras dan tidak menggantikan pemeriksaan langsung oleh dokter faskes.
                </p>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 shrink-0" />
                <p>
                  <strong>Kondisi Gawat Darurat:</strong> Jika pasien mengalami penurunan kesadaran, sesak napas berat, atau pendarahan hebat, segera hubungi <strong>Ambulans Hebat 119</strong> atau bawa ke IGD terdekat.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setShowGuideModal(false)}
              className="w-full py-2.5 rounded-full bg-gradient-to-br from-[#023b3b] via-[#022022] to-[#011414] hover:from-[#034d4d] hover:via-[#033033] hover:to-[#022022] backdrop-blur-md border border-[#022022]/80 hover:border-white/30 shadow-[inset_0_1px_1px_rgba(255,255,255,0.28),0_6px_16px_rgba(2,32,34,0.16)] text-white text-xs font-semibold cursor-pointer active:scale-[0.98] transition-all"
            >
              Saya Mengerti
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
