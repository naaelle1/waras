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
      className={`bg-white rounded-2xl border border-[#E2ECEB] p-5 sm:p-6 shadow-xs flex flex-col justify-between h-full transition-all duration-200 hover:border-[#003B3B]/25 ${className}`}
    >
      {/* HEADER SECTION */}
      <div className="space-y-3">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#003B3B] text-white flex items-center justify-center shadow-xs">
              <Bot className="w-5 h-5 text-[#EBF5F5]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="font-poppins font-semibold text-sm sm:text-base text-[#0D2626]">
                  WARAS AI Assistant
                </h4>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
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
            className="inline-flex items-center gap-1 text-xs font-semibold text-[#003B3B] hover:text-[#002D2D] hover:underline transition-colors shrink-0"
          >
            <span className="hidden sm:inline">Buka Chat Penuh</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        <p className="text-xs text-[#526666] font-inter leading-relaxed">
          Pilih keluhan umum di bawah ini atau ketik pertanyaan seputar gejala, rujukan puskesmas, dan persiapan berobat:
        </p>

        {/* 4 QUICK PROMPT CHIPS (2x2 GRID) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
          {quickPrompts.map((item, idx) => {
            const Icon = item.icon;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => handleConsult(item.text)}
                className="group p-3 rounded-xl bg-[#F8FAFA] hover:bg-[#EBF5F5] border border-[#E2ECEB] hover:border-[#003B3B]/30 transition-all duration-150 text-left flex items-start gap-2.5 cursor-pointer active:scale-[0.99]"
              >
                <div className="p-1.5 rounded-lg bg-white text-[#003B3B] border border-[#E2ECEB] group-hover:scale-105 group-hover:bg-[#003B3B] group-hover:text-white transition-all shrink-0 shadow-2xs">
                  <Icon className="w-3.5 h-3.5" />
                </div>
                <div className="min-w-0 flex-1">
                  <span className="text-[11px] font-semibold text-[#003B3B] block leading-tight">
                    {item.label}
                  </span>
                  <span className="text-xs text-[#2B3E3E] font-medium leading-snug line-clamp-2 mt-0.5 font-inter">
                    {item.text}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* INPUT AND DISCLAIMER FOOTER */}
      <div className="space-y-2 pt-4">
        <form
          onSubmit={handleSubmit}
          className="relative flex items-center bg-[#F8FAFA] border border-[#E2ECEB] focus-within:border-[#003B3B]/40 focus-within:bg-white focus-within:ring-2 focus-within:ring-[#003B3B]/10 rounded-xl p-1.5 transition-all shadow-2xs"
        >
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ketik keluhan atau tanyakan info kesehatan..."
            className="w-full bg-transparent border-0 px-3 py-1.5 text-xs sm:text-sm text-[#0D2626] placeholder-[#809494] focus:outline-none font-inter"
          />

          <button
            type="submit"
            disabled={!query.trim()}
            className="w-8 h-8 rounded-lg bg-[#003B3B] hover:bg-[#002D2D] disabled:opacity-40 text-white flex items-center justify-center shrink-0 transition-colors shadow-xs cursor-pointer ml-1"
            aria-label="Kirim pertanyaan ke WARAS AI"
          >
            <ArrowUp className="w-4 h-4 stroke-[2.5]" />
          </button>
        </form>

        <div className="flex items-center gap-1.5 text-[11px] text-[#738787] font-inter px-1">
          <Info className="w-3.5 h-3.5 text-[#0B6B6B] shrink-0" />
          <span className="line-clamp-1">
            WARAS AI bersifat edukasi awal, bukan pengganti diagnosis resmi tenaga medis.
          </span>
        </div>
      </div>
    </div>
  );
}

