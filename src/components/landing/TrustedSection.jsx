import React from "react";
import { HeartPulse, MapPin, Sparkles, ShieldCheck } from "lucide-react";
import { trustedValues } from "../../data/landingData";

const ICON_MAP = {
  HeartPulse,
  MapPin,
  Sparkles,
  ShieldCheck
};

export default function TrustedSection() {
  return (
    <section id="tentang" className="py-8 bg-[#F7FAFA] relative z-20 -mt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-6 sm:p-8 rounded-3xl bg-white/60 backdrop-blur-xl border border-white/80 shadow-[0_10px_35px_rgba(0,43,43,0.05)] relative overflow-hidden">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
            {trustedValues.map((item, idx) => {
              const IconComp = ICON_MAP[item.icon] || HeartPulse;
              return (
                <div key={idx} className="flex items-center gap-4 group">
                  <div className="p-3.5 rounded-2xl bg-[#003B3B] text-[#A9D6C8] group-hover:scale-110 transition-transform shadow-md shadow-[#003B3B]/10">
                    <IconComp className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-poppins font-bold text-sm text-[#062C2C]">
                      {item.title}
                    </h4>
                    <p className="font-inter text-xs text-[#587070] mt-0.5">
                      {item.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}