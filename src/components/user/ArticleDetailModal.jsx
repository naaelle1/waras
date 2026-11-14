import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  X,
  Clock,
  Tag,
  User,
  Calendar,
  Sparkles,
  MapPin,
  Bot,
  AlertCircle,
  CheckCircle2
} from "lucide-react";

export default function ArticleDetailModal({ isOpen, article, onClose }) {
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen || !article) return null;

  const handleAskAI = () => {
    onClose();
    navigate(
      `/user/ai?q=${encodeURIComponent(
        `Saya ingin penjelasan lebih dalam mengenai artikel: ${article.title}`
      )}`
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#001F1F]/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog Card */}
      <div className="relative w-full max-w-2xl rounded-2xl bg-white border border-[#E2ECEB] shadow-2xl z-10 space-y-5 max-h-[90vh] overflow-y-auto scrollbar-thin">
        {/* Header Image Banner */}
        <div className="relative h-56 sm:h-64 w-full bg-gray-100 overflow-hidden">
          <img
            src={
              article.image ||
              "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=800"
            }
            alt={article.title}
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src =
                "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=800";
            }}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-black/40 hover:bg-black/60 text-white backdrop-blur-md transition-colors cursor-pointer"
            aria-label="Tutup artikel"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Floating Category Pill */}
          <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-center justify-between gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#022022] text-white border border-white/20 shadow-xs">
              <Tag className="w-3.5 h-3.5 text-white" />
              {article.category}
            </span>

            <div className="flex items-center gap-2 text-xs text-white/90 font-inter">
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                {article.date || "Terbaru"}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {article.readingTime || "4 menit baca"}
              </span>
            </div>
          </div>
        </div>

        {/* Content Body */}
        <div className="px-6 pb-6 space-y-5">
          {/* Title & Author */}
          <div className="space-y-2 border-b border-gray-100 pb-4">
            <h2 className="font-poppins font-bold text-xl sm:text-2xl text-[#0D2626] leading-snug">
              {article.title}
            </h2>
            <div className="flex items-center gap-2 text-xs text-[#526666]">
              <User className="w-3.5 h-3.5 text-[#022022]" />
              <span>Ditinjau oleh: <strong className="text-[#0D2626]">{article.author || "Tim Medis WARAS"}</strong></span>
            </div>
          </div>

          {/* Main Description */}
          <div className="space-y-4 font-inter text-sm text-[#2B3E3E] leading-relaxed">
            <p className="text-base text-[#0D2626] font-medium leading-relaxed bg-[#F8FAFA] p-4 rounded-xl border border-[#E2ECEB]">
              {article.description}
            </p>

            <h4 className="font-poppins font-semibold text-base text-[#0D2626] pt-2">
              Poin Penting & Panduan Kesehatan:
            </h4>
            <div className="space-y-2.5">
              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-gray-50 border border-gray-100">
                <CheckCircle2 className="w-4 h-4 text-[#022022] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#0D2626]">Deteksi Cepat:</strong> Perhatikan perubahan fisik sekecil apa pun dan catat waktu kemunculan gejala pertama kali.
                </div>
              </div>
              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-gray-50 border border-gray-100">
                <CheckCircle2 className="w-4 h-4 text-[#022022] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#0D2626]">Pola Hidup & Hidrasi:</strong> Istirahat yang cukup dan asupan cairan yang teratur sangat membantu pemulihan alami tubuh.
                </div>
              </div>
            </div>

            {/* Warning Box */}
            <div className="p-4 rounded-xl bg-amber-50 border border-amber-200/80 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
              <div className="text-xs text-amber-900 space-y-1">
                <span className="font-semibold block">Kapan Harus Segera ke Dokter?</span>
                <p>
                  Jika gejala berlangsung lebih dari 3 hari, demam tidak kunjung turun setelah konsumsi parasetamol, atau muncul tanda sesak napas dan penurunan kesadaran, segera kunjungi IGD atau Puskesmas terdekat.
                </p>
              </div>
            </div>

            {/* Tags */}
            {article.tags && article.tags.length > 0 && (
              <div className="flex flex-wrap items-center gap-2 pt-2">
                <span className="text-xs text-[#526666] font-medium">Tag Terkait:</span>
                {article.tags.map((t, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-lg bg-[#022022]/10 text-[#022022] border border-[#022022]/15 text-xs font-medium"
                  >
                    #{t}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Modal Footer Actions */}
          <div className="pt-4 border-t border-gray-100 flex flex-wrap items-center justify-between gap-3">
            <button
              onClick={onClose}
              className="px-5 py-2 rounded-full text-[#022022] bg-gradient-to-br from-[#022022]/[0.08] via-teal-50/70 to-white/90 hover:from-[#022022]/[0.14] hover:via-teal-100/70 hover:to-white backdrop-blur-md border border-[#022022]/15 hover:border-[#022022]/30 shadow-[inset_0_1px_1px_rgba(255,255,255,0.9),0_4px_12px_rgba(2,32,34,0.05)] font-semibold text-xs active:scale-[0.98] transition-all cursor-pointer"
            >
              Tutup
            </button>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleAskAI}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-[#022022] bg-gradient-to-br from-[#022022]/[0.08] via-teal-50/70 to-white/90 hover:from-[#022022]/[0.14] hover:via-teal-100/70 hover:to-white backdrop-blur-md border border-[#022022]/15 hover:border-[#022022]/30 shadow-[inset_0_1px_1px_rgba(255,255,255,0.9),0_4px_12px_rgba(2,32,34,0.05)] font-semibold text-xs active:scale-[0.98] transition-all cursor-pointer"
              >
                <Bot className="w-3.5 h-3.5 text-[#022022]" />
                <span>Tanya AI tentang Artikel Ini</span>
              </button>

              <Link
                to="/user/facilities"
                onClick={onClose}
                className="inline-flex items-center gap-1.5 px-5 py-2 rounded-full text-white bg-gradient-to-br from-[#023b3b] via-[#022022] to-[#011414] hover:from-[#034d4d] hover:via-[#033033] hover:to-[#022022] backdrop-blur-md border border-[#022022]/80 hover:border-white/30 shadow-[inset_0_1px_1px_rgba(255,255,255,0.28),0_6px_16px_rgba(2,32,34,0.16)] font-semibold text-xs active:scale-[0.98] transition-all"
              >
                <MapPin className="w-3.5 h-3.5 text-white" />
                <span>Cari Faskes Terdekat</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

