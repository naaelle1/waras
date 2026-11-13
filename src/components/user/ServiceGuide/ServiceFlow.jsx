import React from "react";
import { ClipboardList, Stethoscope, Activity, Pill, CalendarCheck, Info } from "lucide-react";

const ICON_MAP = {
  ClipboardList,
  Stethoscope,
  Activity,
  Pill,
  CalendarCheck
};

export default function ServiceFlow({ steps = [] }) {
  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h2 className="font-poppins font-bold text-xl sm:text-2xl text-[#022022]">
          Bagaimana Alur Layanan Kesehatan?
        </h2>
        <p className="text-xs sm:text-sm text-[#5F6F70] font-inter">
          Secara umum, berikut tahapan standar yang akan Anda lalui saat melakukan pemeriksaan medis.
        </p>
      </div>

      {/* Responsive Horizontal / Vertical Timeline Container */}
      <div className="relative p-6 sm:p-8 rounded-3xl bg-white/60 backdrop-blur-xl border border-white/80 shadow-[0_10px_35px_rgba(2,32,34,0.05)]">
        
        {/* Step Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative z-10">
          {steps.map((item, idx) => {
            const IconComponent = ICON_MAP[item.icon] || ClipboardList;
            const isLast = idx === steps.length - 1;

            return (
              <div
                key={item.step}
                className="relative flex flex-col justify-between p-4 sm:p-5 rounded-2xl bg-white/90 border border-white shadow-sm hover:shadow-md transition-all group"
              >
                <div className="space-y-3">
                  {/* Step Badge & Icon */}
                  <div className="flex items-center justify-between">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-[#022022] text-white font-poppins font-bold text-xs">
                      {item.step}
                    </span>
                    <div className="p-2 rounded-xl bg-[#022022]/5 text-[#022022] group-hover:bg-[#022022] group-hover:text-white transition-colors">
                      <IconComponent className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="font-poppins font-bold text-sm text-[#022022] leading-tight">
                    {item.title}
                  </h3>

                  <p className="font-inter text-xs text-[#5F6F70] leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Connector Arrow for Desktop */}
                {!isLast && (
                  <div className="hidden md:block absolute -right-3.5 top-1/2 -translate-y-1/2 z-20 text-[#022022]/30">
                    <span className="font-bold text-lg">→</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* General Disclaimer Note */}
        <div className="mt-6 pt-4 border-t border-gray-200/60 flex items-center gap-2 text-xs text-[#5F6F70] font-inter">
          <Info className="w-4 h-4 text-[#022022] shrink-0" />
          <span>Alur layanan dapat sedikit bervariasi tergantung pada kebijakan internal faskes dan tingkat kegawatdaruratan pasien.</span>
        </div>
      </div>
    </div>
  );
}