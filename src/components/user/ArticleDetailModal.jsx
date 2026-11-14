import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  X,
  Clock,
  Tag,
  User,
  Calendar,
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 md:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#001F1F]/60 backdrop-blur-sm transition-opacity duration-200"
        onClick={onClose}
      />

      {/* Modal Dialog Card */}
      <div className="relative w-full max-w-2xl rounded-3xl bg-white border border-[#E2ECEB] shadow-2xl z-10 max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Header Image Banner */}
        <div className="relative h-52 sm:h-64 w-full bg-slate-100 shrink-0 overflow-hidden">
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
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-black/15" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-3.5 right-3.5 sm:top-4 sm:right-4 z-20 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/90 hover:bg-white text-[#022022] shadow-sm flex items-center justify-center transition-all cursor-pointer hover:scale-105 active:scale-95"
            aria-label="Tutup artikel"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.2]" />
          </button>

          {/* Floating Category & Reading Meta */}
          <div className="absolute bottom-3.5 left-4 right-4 sm:bottom-4 sm:left-6 sm:right-6 flex flex-wrap items-center justify-between gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#022022] text-white border border-white/20 shadow-xs font-poppins">
              <Tag className="w-3.5 h-3.5 text-teal-200" />
              {article.category}
            </span>

            <div className="flex items-center gap-2 text-xs text-white/95 font-inter backdrop-blur-md bg-black/30 px-3 py-1 rounded-full border border-white/10">
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
        <div className="p-5 sm:p-6 lg:p-7 space-y-5 overflow-y-auto scrollbar-thin">
          {/* Title & Author Meta */}
          <div className="space-y-2 border-b border-gray-100 pb-4">
            <h2 className="font-poppins font-bold text-xl sm:text-2xl text-[#0D2626] leading-snug tracking-tight">
              {article.title}
            </h2>
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs text-[#526666] font-inter">
              <div className="flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-[#022022]" />
                <span>
                  Ditinjau oleh: <strong className="text-[#0D2626] font-semibold">{article.author || "Tim Medis WARAS"}</strong>
                </span>
              </div>
              <span className="text-gray-300 hidden sm:inline">•</span>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-teal-50 text-teal-800 text-[11px] font-medium border border-teal-200/60">
                <CheckCircle2 className="w-3 h-3 text-teal-600" />
                Terverifikasi Klinis
              </span>
            </div>
          </div>

          {/* Main Description Callout */}
          <div className="p-4 sm:p-4.5 rounded-2xl bg-[#022022]/[0.03] border border-[#022022]/10 text-xs sm:text-sm text-[#0D2626] leading-relaxed font-inter font-normal">
            {article.description}
          </div>

          {/* Poin Penting & Panduan Kesehatan */}
          <div className="space-y-2.5 pt-1">
            <h4 className="font-poppins font-semibold text-sm sm:text-base text-[#0D2626]">
              Poin Penting & Panduan Kesehatan:
            </h4>
            <div className="space-y-2">
              <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-white border border-[#E2ECEB] shadow-2xs hover:border-[#022022]/20 transition-colors">
                <div className="p-1.5 rounded-lg bg-[#022022]/5 text-[#022022] shrink-0 mt-0.5">
                  <CheckCircle2 className="w-4 h-4 text-[#022022]" />
                </div>
                <div className="text-xs sm:text-sm font-inter text-[#526666] leading-relaxed">
                  <strong className="text-[#0D2626] font-semibold">Deteksi Cepat:</strong> Perhatikan perubahan fisik sekecil apa pun dan catat waktu kemunculan gejala pertama kali.
                </div>
              </div>
              <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-white border border-[#E2ECEB] shadow-2xs hover:border-[#022022]/20 transition-colors">
                <div className="p-1.5 rounded-lg bg-[#022022]/5 text-[#022022] shrink-0 mt-0.5">
                  <CheckCircle2 className="w-4 h-4 text-[#022022]" />
                </div>
                <div className="text-xs sm:text-sm font-inter text-[#526666] leading-relaxed">
                  <strong className="text-[#0D2626] font-semibold">Pola Hidup & Hidrasi:</strong> Istirahat yang cukup dan asupan cairan yang teratur sangat membantu pemulihan alami tubuh.
                </div>
              </div>
            </div>
          </div>

          {/* Warning Advisory Box */}
          <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200/90 flex items-start gap-3 text-xs sm:text-sm text-amber-950 font-inter">
            <div className="p-1 rounded-lg bg-amber-100 text-amber-800 shrink-0 mt-0.5">
              <AlertCircle className="w-4 h-4 text-amber-700" />
            </div>
            <div className="space-y-1 leading-relaxed">
              <span className="font-poppins font-semibold text-xs sm:text-sm text-amber-900 block">
                Kapan Harus Segera ke Dokter?
              </span>
              <p className="text-xs text-amber-900/90 font-light">
                Jika gejala berlangsung lebih dari 3 hari, demam tidak kunjung turun setelah konsumsi parasetamol, atau muncul tanda sesak napas dan penurunan kesadaran, segera kunjungi IGD atau Puskesmas terdekat.
              </p>
            </div>
          </div>

          {/* Tags */}
          {article.tags && article.tags.length > 0 && (
            <div className="flex flex-wrap items-center gap-1.5 pt-1">
              <span className="text-xs text-[#526666] font-medium mr-1 font-inter">Topik Terkait:</span>
              {article.tags.map((t, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-0.5 rounded-full bg-[#022022]/5 text-[#022022] border border-[#022022]/10 text-xs font-medium font-inter"
                >
                  #{t}
                </span>
              ))}
            </div>
          )}

          {/* Modal Footer Actions */}
          <div className="pt-4 border-t border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <button
              type="button"
              onClick={onClose}
              className="order-last sm:order-first px-5 py-2.5 rounded-full border border-gray-200 hover:bg-gray-50 text-[#526666] hover:text-[#022022] font-semibold text-xs transition-colors cursor-pointer text-center font-inter"
            >
              Tutup
            </button>

            <div className="flex flex-col sm:flex-row sm:items-center gap-2.5 w-full sm:w-auto">
              <button
                type="button"
                onClick={handleAskAI}
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-[#022022]/5 hover:bg-[#022022]/10 text-[#022022] border border-[#022022]/15 font-semibold text-xs transition-colors cursor-pointer active:scale-[0.99] font-inter"
              >
                <Bot className="w-4 h-4 text-[#022022]" />
                <span>Tanya AI tentang Artikel Ini</span>
              </button>

              <Link
                to="/user/facilities"
                onClick={onClose}
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-[#022022] hover:bg-[#033033] text-white font-semibold text-xs shadow-xs transition-colors active:scale-[0.99] font-inter"
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
