import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, ClipboardCheck, Siren, MapPin, Sparkles } from "lucide-react";

const ICON_MAP = {
  ClipboardCheck,
  Siren,
  MapPin
};

export default function FeaturedGuide({ featuredData, onSelectGuide }) {
  if (!featuredData) return null;
  const { main, supporting } = featuredData;

  return (
    <div className="space-y-6">
      <h2 className="font-poppins font-bold text-xl sm:text-2xl text-[#022022]">
        Panduan Populer
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Left/Main Featured Card */}
        <div className="lg:col-span-7 rounded-3xl bg-white/80 backdrop-blur-xl border border-white/90 p-6 sm:p-8 shadow-[0_12px_40px_rgba(2,32,34,0.06)] flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-poppins font-bold bg-[#022022] text-white border border-white/20">
                <Sparkles className="w-3.5 h-3.5 text-teal-200" />
                {main.category}
              </span>
              <span className="text-xs text-[#5F6F70] font-medium">• {main.readTime}</span>
            </div>

            <h3 className="font-poppins font-bold text-xl sm:text-2xl text-[#022022] leading-snug">
              {main.title}
            </h3>

            <p className="font-inter text-xs sm:text-sm text-[#5F6F70] leading-relaxed">
              {main.description}
            </p>
          </div>

          <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
            <span className="text-xs font-medium text-[#5F6F70]">Ditulis oleh {main.author}</span>
            <button
              type="button"
              onClick={() => onSelectGuide && onSelectGuide(main)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#022022] text-white hover:bg-[#033033] border border-white/20 font-poppins font-semibold text-xs sm:text-sm transition-all cursor-pointer shadow-md"
            >
              <span>Pelajari Panduan</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Right/Supporting Guide List */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          {supporting.map((item) => {
            const IconComp = ICON_MAP[item.icon] || BookOpen;

            if (item.isCTA) {
              return (
                <Link
                  key={item.id}
                  to="/user/facilities"
                  className="p-5 rounded-2xl bg-[#022022] border border-white/20 text-white shadow-md hover:shadow-lg transition-all flex items-center justify-between group cursor-pointer"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="p-2.5 rounded-xl bg-white/10 text-white">
                      <IconComp className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-poppins font-bold text-sm text-white">{item.title}</h4>
                      <p className="font-inter text-xs text-gray-200">{item.description}</p>
                    </div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-white transition-transform group-hover:translate-x-1 shrink-0" />
                </Link>
              );
            }

            return (
              <div
                key={item.id}
                onClick={() => onSelectGuide && onSelectGuide(item)}
                className="p-5 rounded-2xl bg-white/70 backdrop-blur-md border border-white/80 shadow-sm hover:shadow-md transition-all flex items-start gap-3.5 cursor-pointer group"
              >
                <div className="p-2.5 rounded-xl bg-[#022022]/5 text-[#022022] group-hover:bg-[#022022] group-hover:text-white transition-colors shrink-0">
                  <IconComp className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <h4 className="font-poppins font-bold text-sm text-[#022022] group-hover:text-[#022022] transition-colors">
                    {item.title}
                  </h4>
                  <p className="font-inter text-xs text-[#5F6F70] leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}