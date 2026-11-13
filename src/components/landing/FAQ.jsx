import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { faqData } from "../../data/landingData";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="scroll-mt-20 px-4 sm:px-8 lg:px-12 py-20 bg-white border-t border-[#022022]/10 text-[#022022]">
      <div className="max-w-[1480px] mx-auto">
        
        {/* 2-COLUMN SPLIT LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* LEFT: HEADING & DESCRIPTION */}
          <div className="lg:col-span-5 space-y-4 text-left">
            <span className="text-xs font-mono uppercase tracking-wider text-[#022022] font-semibold">
              PUSAT PERTANYAAN
            </span>

            <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-light text-[#022022] leading-[1.12] tracking-tight">
              Pertanyaan yang Sering <br />
              <span className="font-normal text-[#022022]">Diajukan Warga.</span>
            </h2>

            <p className="text-[#022022]/70 text-xs sm:text-sm font-light leading-relaxed max-w-sm">
              Rangkuman jawaban atas pertanyaan umum seputar pencarian faskes, panduan P3K, dan penggunaan platform WARAS.
            </p>

            <div className="pt-2">
              <Link
                to="/user/help"
                className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-[#022022] hover:text-[#033033] transition-colors group"
              >
                <span>Kunjungi Pusat Bantuan Lengkap</span>
                <ArrowRight className="w-4 h-4 text-[#022022] group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* RIGHT: MINIMAL ACCORDION WITH CLEAN BORDERS */}
          <div className="lg:col-span-7 divide-y divide-[#022022]/10 border-t border-b border-[#022022]/10">
            {faqData.map((item, index) => {
              const isOpen = openIndex === index;
              return (
                <div key={index} className="py-5 sm:py-6 transition-colors">
                  <button
                    type="button"
                    onClick={() => toggle(index)}
                    className="w-full flex items-center justify-between text-left gap-4 focus:outline-none group cursor-pointer"
                    aria-expanded={isOpen}
                  >
                    <span
                      className={`text-base sm:text-lg transition-colors ${
                        isOpen ? "font-medium text-[#022022]" : "font-light text-[#022022] group-hover:text-[#022022]"
                      }`}
                    >
                      {item.q}
                    </span>
                    
                    {/* PLUS TO MINUS ICON */}
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all ${
                        isOpen
                          ? "bg-[#022022] text-white border border-[#022022]"
                          : "bg-[#022022]/5 text-[#022022] group-hover:bg-[#022022] group-hover:text-white"
                      }`}
                    >
                      {isOpen ? (
                        <Minus className="w-4 h-4 stroke-[2]" />
                      ) : (
                        <Plus className="w-4 h-4 stroke-[2]" />
                      )}
                    </div>
                  </button>

                  {/* SMOOTH EXPANSION CONTENT */}
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <p className="pt-3 text-xs sm:text-sm text-[#022022]/70 font-light leading-relaxed pr-6 sm:pr-10">
                          {item.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
