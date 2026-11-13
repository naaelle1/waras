import React from "react";
import { motion } from "framer-motion";
import { Heart, MapPin, Sparkles, ShieldAlert, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

const features = [
  {
    id: "info",
    icon: Heart,
    title: "Informasi Kesehatan",
    subtitle: "Artikel terpercaya",
    link: "/user/health-info/articles",
    color: "#006B5E",
    bgColor: "#DDF8EC",
  },
  {
    id: "faskes",
    icon: MapPin,
    title: "Fasilitas Terdekat",
    subtitle: "Temukan faskes Semarang",
    link: "/user/facilities",
    color: "#022022",
    bgColor: "#E6F4F1",
  },
  {
    id: "ai",
    icon: Sparkles,
    title: "AI Assistant",
    subtitle: "Informasi kesehatan instan",
    link: "/user/ai",
    color: "#022022",
    bgColor: "#DDF8EC",
  },
  {
    id: "panduan",
    icon: ShieldAlert,
    title: "Panduan Layanan",
    subtitle: "Bantuan dan rujukan",
    link: "/user/health-info/guides",
    color: "#022022",
    bgColor: "#E6F4F1",
  },
];

export default function FeatureStrip() {
  return (
    <section className="relative -mt-6 sm:-mt-8 z-30 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        {/* Floating Horizontal Strip Container */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="rounded-3xl bg-white/90 backdrop-blur-xl border border-white/90 shadow-[0_16px_40px_rgba(2,32,34,0.06)] p-3 sm:p-4"
        >
          {/* Desktop Grid / Mobile Horizontal Scroll */}
          <div className="flex md:grid md:grid-cols-4 gap-3 sm:gap-4 overflow-x-auto pb-2 md:pb-0 scrollbar-none snap-x snap-mandatory">
            {features.map((item, index) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.id}
                  to={item.link}
                  className="group min-w-[240px] md:min-w-0 snap-start p-3 sm:p-3.5 rounded-2xl bg-[#F6FAF9]/80 hover:bg-white border border-transparent hover:border-[#37F4B4]/40 transition-all duration-300 hover:shadow-sm flex items-center justify-between cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-105 duration-300"
                      style={{ backgroundColor: item.bgColor, color: item.color }}
                    >
                      <Icon className="w-5 h-5 stroke-[2.2]" />
                    </div>
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-[#022022] group-hover:text-[#022022] transition-colors leading-snug">
                        {item.title}
                      </h4>
                      <p className="text-[11px] text-[#647777] font-normal leading-tight mt-0.5">
                        {item.subtitle}
                      </p>
                    </div>
                  </div>

                  <div className="w-6 h-6 rounded-full bg-transparent group-hover:bg-[#37F4B4]/20 flex items-center justify-center text-[#647777] group-hover:text-[#022022] transition-all shrink-0">
                    <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </Link>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
