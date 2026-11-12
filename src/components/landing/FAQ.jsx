import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, HelpCircle, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { faqData } from "../../data/landingData";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-24 lg:py-32 px-4 sm:px-6 relative overflow-hidden bg-white">
      <div className="max-w-6xl mx-auto">
        
        {/* WIREFRAME ALIGNED 2-COLUMN SPLIT LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-start">
          
          {/* LEFT: LARGE HEADING & DESCRIPTION */}
          <div className="lg:col-span-5 space-y-5 text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#D8F5E8] text-[#005B52] text-xs font-bold">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Pusat Tanya Jawab</span>
            </div>

            <h2 className="text-4xl sm:text-5xl lg:text-[56px] font-extrabold text-[#062E2B] leading-[1.1] tracking-tight">
              Masih Ada <br />
              <span className="text-[#003D3B]">
                Pertanyaan?
              </span>
            </h2>

            <p className="text-[#647777] text-sm sm:text-base font-normal leading-relaxed max-w-sm">
              Kami merangkum jawaban atas pertanyaan yang paling sering diajukan warga mengenai platform WARAS.
            </p>

            <div className="pt-2">
              <Link
                to="/user/help"
                className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#003D3B] hover:text-[#005B52] transition-colors"
              >
                <span>Kunjungi Pusat Bantuan Lengkap</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* RIGHT: MINIMAL ACCORDION WITH CLEAN BORDER LINES */}
          <div className="lg:col-span-7 divide-y divide-[#E2ECEB] border-t border-b border-[#E2ECEB]">
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
                      className={`text-base sm:text-lg font-bold transition-colors ${
                        isOpen ? "text-[#003D3B]" : "text-[#062E2B] group-hover:text-[#005B52]"
                      }`}
                    >
                      {item.q}
                    </span>
                    
                    {/* PLUS TO MINUS ICON */}
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all ${
                        isOpen
                          ? "bg-[#003D3B] text-[#63D6AE]"
                          : "bg-[#F5F8F7] text-[#647777] group-hover:bg-[#D8F5E8] group-hover:text-[#005B52]"
                      }`}
                    >
                      {isOpen ? (
                        <Minus className="w-4 h-4 stroke-[2.5]" />
                      ) : (
                        <Plus className="w-4 h-4 stroke-[2.5]" />
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
                        <p className="pt-3 text-xs sm:text-sm text-[#647777] leading-relaxed pr-6 sm:pr-10">
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