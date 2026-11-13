import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Bot,
  ArrowUpRight,
  ArrowUp,
  Info,
  Thermometer,
  ShieldCheck,
  MapPin,
  ClipboardList
} from "lucide-react";

export default function DashboardAIConsultation({ className = "" }) {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const quickPrompts = [
    {
      icon: Thermometer,
      text: "Demam & batuk tak kunjung reda",
      label: "Gejala Demam"
    },
    {
      icon: ShieldCheck,
      text: "Jadwal imunisasi dasar anak di Semarang",
      label: "Info Imunisasi"
    },
    {
      icon: MapPin,
      text: "Cari faskes 24 jam terdekat di Semarang",
      label: "Faskes 24 Jam"
    },
    {
      icon: ClipboardList,
      text: "Apa saja syarat rujukan BPJS ke rumah sakit?",
      label: "Rujukan BPJS"
    }
  ];

  const handleConsult = (textToSend) => {
    const finalQuery = (textToSend || query).trim();
    if (!finalQuery) return;
    navigate(`/user/ai?q=${encodeURIComponent(finalQuery)}`);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleConsult();
  };

  return (
    <div
      className={`bg-white rounded-2xl border border-[#E2ECEB] p-5 sm:p-6 shadow-xs flex flex-col justify-between h-full transition-all duration-200 hover:border-[#37F4B4]/50 hover:shadow-md ${className}`}
    >
      {/* HEADER SECTION */}
      <div className="space-y-3">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#022022] border border-[#37F4B4]/25 text-[#37F4B4] flex items-center justify-center shadow-xs">
              <Bot className="w-5 h-5 text-[#37F4B4]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="font-poppins font-semibold text-sm sm:text-base text-[#0D2626]">
                  WARAS AI Assistant
                </h4>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-[#022022]/5 text-[#022022] border border-[#37F4B4]/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#37F4B4] animate-pulse" />
                  Siaga 24/7
                </span>
              </div>
              <p className="text-[11px] text-[#526666] font-inter">
                Panduan awal & konsultasi kesehatan terverifikasi
              </p>
            </div>
          </div>

          <Link
            to="/user/ai"
            className="group inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-medium text-[#022022] bg-gradient-to-br from-[#022022]/[0.08] via-teal-50/70 to-white/90 hover:from-[#022022]/[0.14] hover:via-teal-100/70 hover:to-white backdrop-blur-md border border-[#022022]/15 hover:border-[#022022]/30 shadow-[inset_0_1px_1px_rgba(255,255,255,0.9),0_4px_12px_rgba(2,32,34,0.05)] transition-all duration-200 shrink-0 active:scale-[0.98]"
          >
            <span className="hidden sm:inline">Buka Chat Penuh</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-[#022022] group-hover:scale-105 transition-transform" />
          </Link>
        </div>

        <p className="text-xs text-[#526666] font-inter leading-relaxed">
          Pilih keluhan umum di bawah ini atau ketik pertanyaan seputar gejala, rujukan puskesmas, dan persiapan berobat:
        </p>

        {/* 4 QUICK PROMPT CHIPS (FROSTED GLASS CAPSULE - card-subtle) */}
        <div className="flex flex-wrap gap-2 pt-1">
          {quickPrompts.map((item, idx) => {
            const Icon = item.icon;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => handleConsult(item.text)}
                className="group inline-flex items-center gap-2 rounded-full px-3.5 py-2 text-xs font-medium text-[#022022] bg-gradient-to-br from-[#022022]/[0.08] via-teal-50/70 to-white/90 hover:from-[#022022]/[0.14] hover:via-teal-100/70 hover:to-white backdrop-blur-md border border-[#022022]/15 hover:border-[#022022]/30 shadow-[inset_0_1px_1px_rgba(255,255,255,0.9),0_4px_12px_rgba(2,32,34,0.05)] transition-all duration-200 cursor-pointer active:scale-[0.98] select-none"
              >
                <div className="w-5 h-5 rounded-full bg-white/80 text-[#022022] flex items-center justify-center shrink-0 shadow-2xs group-hover:scale-105 transition-transform">
                  <Icon className="w-3 h-3" />
                </div>
                <span className="leading-snug">{item.text}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* INPUT AND DISCLAIMER FOOTER */}
      <div className="space-y-2 pt-4">
        <form
          onSubmit={handleSubmit}
          className="relative flex items-center bg-[#F8FAFA] border border-[#E2ECEB] focus-within:border-[#022022] focus-within:bg-white focus-within:ring-2 focus-within:ring-[#37F4B4]/25 rounded-full p-1.5 transition-all shadow-2xs"
        >
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ketik keluhan atau tanyakan info kesehatan..."
            className="w-full bg-transparent border-0 px-4 py-1.5 text-xs sm:text-sm text-[#0D2626] placeholder-[#809494] focus:outline-none font-inter"
          />

          <button
            type="submit"
            disabled={!query.trim()}
            className="w-8.5 h-8.5 rounded-full bg-gradient-to-br from-[#023b3b] via-[#022022] to-[#011414] hover:from-[#034d4d] hover:via-[#033033] hover:to-[#022022] backdrop-blur-md border border-[#022022]/80 hover:border-[#37F4B4]/40 shadow-[inset_0_1px_1px_rgba(255,255,255,0.28),0_6px_16px_rgba(2,32,34,0.16)] disabled:opacity-40 text-white flex items-center justify-center shrink-0 transition-all active:scale-[0.98] cursor-pointer ml-1 group"
            aria-label="Kirim pertanyaan ke WARAS AI"
          >
            <ArrowUp className="w-4 h-4 stroke-[2.5] text-[#37F4B4] group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </form>

        <div className="flex items-center gap-1.5 text-[11px] text-[#738787] font-inter px-1">
          <Info className="w-3.5 h-3.5 text-[#022022] shrink-0" />
          <span className="line-clamp-1">
            WARAS AI bersifat edukasi awal, bukan pengganti diagnosis resmi tenaga medis.
          </span>
        </div>
      </div>
    </div>
  );
}

