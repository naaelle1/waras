import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Sparkles, Send, ArrowRight, Bot } from "lucide-react";

export default function AISection() {
  const [activeChip, setActiveChip] = useState("Apa gejala demam?");
  const suggestions = [
    "Apa gejala demam?",
    "Pertolongan pertama luka bakar",
    "Cari Puskesmas terdekat"
  ];

  return (
    <section className="py-20 bg-[#F7FAFA] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* LEFT COLUMN: DESCRIPTION & SUGGESTIONS */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#022022]/10 border border-[#37F4B4]/25 text-[#022022] text-xs font-poppins font-bold">
              <Sparkles className="w-4 h-4 text-[#37F4B4]" />
              <span>WARAS AI Assistant</span>
            </div>

            <h2 className="font-poppins font-bold text-2xl sm:text-4xl text-[#022022] leading-tight">
              Tanyakan Masalah Kesehatan Anda kepada WARAS AI
            </h2>

            <p className="font-inter text-sm sm:text-base text-[#587070] leading-relaxed">
              Dapatkan pemahaman awal mengenai pertolongan pertama, istilah medis, dan rekomendasi langkah penanganan kesehatan secara real-time.
            </p>

            {/* SUGGESTION CHIPS */}
            <div className="space-y-2 pt-2">
              <p className="text-xs font-poppins font-bold text-[#022022]">
                Coba Pertanyaan Populer:
              </p>
              <div className="flex flex-wrap gap-2">
                {suggestions.map((chip) => (
                  <button
                    key={chip}
                    type="button"
                    onClick={() => setActiveChip(chip)}
                    className={`px-4 py-2 rounded-xl text-xs font-poppins font-medium transition-all cursor-pointer ${
                      activeChip === chip
                        ? "bg-[#022022] text-[#37F4B4] shadow-md border border-[#37F4B4]/30"
                        : "bg-white text-[#587070] border border-gray-200 hover:border-[#37F4B4] hover:text-[#022022]"
                    }`}
                  >
                    "{chip}"
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-4">
              <Link
                to="/user/dashboard"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl bg-[#022022] text-white font-poppins font-bold text-xs sm:text-sm hover:bg-[#033033] border border-[#37F4B4]/25 transition-all shadow-lg active:scale-95 cursor-pointer"
              >
                <span>Mulai Obrolan AI Full</span>
                <ArrowRight className="w-4 h-4 text-[#37F4B4]" />
              </Link>
            </div>
          </div>

          {/* RIGHT COLUMN: SIMULATED CHAT PANEL */}
          <div className="lg:col-span-6">
            <div className="p-6 rounded-3xl bg-white/80 backdrop-blur-2xl border border-white/90 shadow-xl space-y-4">
              
              {/* CHAT HEADER */}
              <div className="flex items-center gap-3 pb-3 border-b border-gray-100">
                <div className="w-9 h-9 rounded-xl bg-[#022022] text-[#37F4B4] flex items-center justify-center">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-poppins font-bold text-xs text-[#022022]">WARAS AI Assistant</h4>
                  <p className="text-[10px] text-emerald-600 font-medium">Aktif • Edukasi Medis</p>
                </div>
              </div>

              {/* CHAT MESSAGES */}
              <div className="space-y-3 py-2 text-xs font-inter">
                {/* User Message */}
                <div className="flex justify-end">
                  <div className="px-4 py-2.5 rounded-2xl bg-[#022022] text-white rounded-br-none max-w-xs shadow-sm">
                    {activeChip}
                  </div>
                </div>

                {/* AI Response */}
                <div className="flex justify-start">
                  <div className="px-4 py-3 rounded-2xl bg-gray-100 text-[#022022] rounded-bl-none max-w-sm space-y-1">
                    <p className="font-poppins font-semibold text-[11px] text-[#022022]">WARAS AI:</p>
                    <p className="leading-relaxed">
                      {activeChip === "Apa gejala demam?"
                        ? "Demam ditandai suhu tubuh di atas 37.5°C, sering disertai menggigil, pusing, dan lemas. Cukupi cairan dan istirahat."
                        : activeChip === "Pertolongan pertama luka bakar"
                        ? "Bilas area luka dengan air mengalir suhu ruang selama 10-15 menit. Jangan oleskan pasta gigi atau mentega!"
                        : "Gunakan menu Peta Faskes WARAS untuk menemukan Puskesmas terdekat di Kota Semarang lengkap dengan rute."}
                    </p>
                  </div>
                </div>
              </div>

              {/* CHAT INPUT BAR */}
              <div className="flex items-center gap-2 pt-2 border-t border-gray-100">
                <input
                  type="text"
                  readOnly
                  value={activeChip}
                  className="w-full px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-xs text-[#022022] focus:outline-none"
                />
                <button
                  type="button"
                  className="p-2.5 rounded-xl bg-[#022022] text-[#37F4B4] hover:bg-[#033033] transition-colors shrink-0 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}