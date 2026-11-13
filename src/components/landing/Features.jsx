import React from "react";
import { Sparkles, Hospital, BookOpen, HeartPulse, ArrowRight } from "lucide-react";
import { featuresData } from "../../data/landingData";

const ICON_MAP = {
  Sparkles,
  Hospital,
  BookOpen,
  HeartPulse
};

export default function Features() {
  return (
    <section id="fitur" className="py-20 bg-[#F7FAFA] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* SECTION HEADER */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-poppins font-bold text-[#022022] uppercase tracking-wider px-3 py-1 rounded-full bg-[#022022]/10 border border-[#37F4B4]/25">
            Fitur Unggulan
          </span>
          <h2 className="font-poppins font-bold text-2xl sm:text-4xl text-[#022022]">
            Semua yang Anda Butuhkan untuk Akses Kesehatan
          </h2>
          <p className="font-inter text-sm sm:text-base text-[#587070]">
            WARAS dirancang untuk menyederhanakan pencarian informasi medis dan fasilitas kesehatan dalam satu platform digital yang mudah digunakan.
          </p>
        </div>

        {/* FEATURES GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {featuresData.map((feature) => {
            const IconComp = ICON_MAP[feature.icon] || HeartPulse;

            return (
              <div
                key={feature.id}
                className={`group p-8 rounded-3xl transition-all duration-300 border flex flex-col justify-between space-y-6 cursor-pointer ${
                  feature.isFeatured
                    ? "bg-linear-to-br from-[#022022] via-[#033033] to-[#011414] text-white border-[#37F4B4]/20 shadow-xl shadow-[#022022]/15"
                    : "bg-white/70 backdrop-blur-xl border-white/80 text-[#022022] shadow-[0_10px_30px_rgba(2,32,34,0.05)] hover:shadow-xl hover:-translate-y-1 hover:border-white"
                }`}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div
                      className={`p-4 rounded-2xl ${
                        feature.isFeatured
                          ? "bg-white/10 text-[#37F4B4]"
                          : "bg-[#022022] text-[#37F4B4]"
                      } shadow-md`}
                    >
                      <IconComp className="w-6 h-6" />
                    </div>
                    <span
                      className={`text-xs font-poppins font-bold px-3 py-1 rounded-full ${
                        feature.isFeatured
                          ? "bg-white/15 text-[#37F4B4] border border-[#37F4B4]/30"
                          : "bg-[#022022]/10 text-[#022022] border border-[#37F4B4]/25"
                      }`}
                    >
                      {feature.tag}
                    </span>
                  </div>

                  <h3 className="font-poppins font-bold text-xl sm:text-2xl leading-snug">
                    {feature.title}
                  </h3>

                  <p
                    className={`font-inter text-xs sm:text-sm leading-relaxed ${
                      feature.isFeatured ? "text-gray-200" : "text-[#587070]"
                    }`}
                  >
                    {feature.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-gray-200/20 flex items-center justify-between text-xs font-poppins font-bold">
                  <span>Eksplorasi Fitur</span>
                  <ArrowRight
                    className={`w-4 h-4 transition-transform group-hover:translate-x-1 ${
                      feature.isFeatured ? "text-[#37F4B4]" : "text-[#022022] group-hover:text-[#37F4B4]"
                    }`}
                  />
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}