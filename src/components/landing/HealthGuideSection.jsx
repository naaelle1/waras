import React from "react";
import { Link } from "react-router-dom";
import { ShieldAlert, Siren, Activity, Compass, ArrowRight } from "lucide-react";
import { guidesData } from "../../data/landingData";

const ICON_MAP = {
  ShieldAlert,
  Siren,
  Activity,
  Compass
};

export default function HealthGuideSection() {
  return (
    <section id="panduan" className="py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2">
            <span className="text-xs font-poppins font-bold text-[#003B3B] uppercase tracking-wider px-3 py-1 rounded-full bg-[#003B3B]/10">
              Pertolongan Pertama
            </span>
            <h2 className="font-poppins font-bold text-2xl sm:text-4xl text-[#062C2C]">
              Panduan Kesehatan Situasi Sehari-hari
            </h2>
          </div>

          <Link
            to="/user/dashboard"
            className="inline-flex items-center gap-2 text-xs font-poppins font-bold text-[#003B3B] hover:underline cursor-pointer shrink-0"
          >
            <span>Lihat Semua Panduan</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* GUIDES CARDS GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {guidesData.map((guide) => {
            const IconComp = ICON_MAP[guide.icon] || ShieldAlert;

            return (
              <div
                key={guide.id}
                className="group p-6 rounded-3xl bg-[#F7FAFA] border border-gray-100 hover:bg-white hover:border-white hover:shadow-xl transition-all duration-300 flex flex-col justify-between space-y-4 cursor-pointer"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="p-3 rounded-2xl bg-[#003B3B]/10 text-[#003B3B] group-hover:bg-[#003B3B] group-hover:text-white transition-colors">
                      <IconComp className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-poppins font-bold px-2.5 py-0.5 rounded-full bg-gray-200/60 text-[#062C2C]">
                      {guide.badge}
                    </span>
                  </div>

                  <h3 className="font-poppins font-bold text-base text-[#062C2C] group-hover:text-[#003B3B] transition-colors">
                    {guide.title}
                  </h3>

                  <p className="font-inter text-xs text-[#587070] leading-relaxed">
                    {guide.desc}
                  </p>
                </div>

                <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs font-poppins font-bold text-[#003B3B]">
                  <span>Baca Langkah</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}