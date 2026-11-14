import React from "react";
import Logo from "../common/Logo";
import { ArrowRight, Clock, Tag, Sparkles } from "lucide-react";

export default function FeaturedArticle({ article, onReadMore }) {
  if (!article) return null;

  return (
    <div className="relative group overflow-hidden rounded-2xl bg-white border border-[#E2ECEB] shadow-xs transition-all duration-200">
      <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch min-h-0 lg:min-h-85">
        {/* Left Hero Image */}
        <div className="lg:col-span-7 relative min-h-48 sm:min-h-64 lg:min-h-full overflow-hidden bg-gray-100">
          <img
            src={article.image}
            alt={article.title}
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src =
                "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&q=80&w=1200";
            }}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute top-4 left-4 z-10">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#022022] text-white border border-white/20 shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-white" />
              UNGGULAN
            </span>
          </div>
        </div>

        {/* Right Content Panel */}
        <div className="lg:col-span-5 bg-[#022022] border-t lg:border-t-0 lg:border-l border-white/10 text-white p-5 sm:p-7 lg:p-8 flex flex-col justify-between relative overflow-hidden space-y-4">
          {/* Wave Pattern Overlay from mask-group.svg (Persis Card Dashboard) */}
          <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden flex items-end justify-center">
            <img
              src="/images/mask-group.svg"
              alt=""
              aria-hidden="true"
              draggable={false}
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = "/Mask Group.svg";
              }}
              className="w-full h-full object-cover object-bottom select-none pointer-events-none opacity-90"
            />
          </div>

          <div className="relative z-10 space-y-3.5">
            <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-teal-100">
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-teal-100 border border-white/15 backdrop-blur-sm">
                <Tag className="w-3 h-3 text-teal-200" />
                {article.category}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1 text-teal-100/80">
                <Clock className="w-3 h-3 text-teal-200" />
                {article.readingTime || "5 min baca"}
              </span>
            </div>

            <h2 className="font-poppins font-bold text-xl sm:text-2xl leading-snug tracking-tight text-white group-hover:text-teal-200 transition-colors">
              {article.title}
            </h2>

            <p className="font-inter text-xs sm:text-sm text-teal-100/90 leading-relaxed line-clamp-3">
              {article.description}
            </p>
          </div>

          <div className="relative z-10 pt-5 mt-4 border-t border-white/15 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <div className="h-7 px-2 rounded-full bg-white/15 flex items-center justify-center">
                <Logo tone="light" className="h-3.5" />
              </div>
              <span className="text-xs font-medium text-teal-100/90">{article.author || "Tim Medis WARAS"}</span>
            </div>

            <button
              type="button"
              onClick={() => onReadMore && onReadMore(article)}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full text-white bg-gradient-to-br from-white/[0.18] via-white/[0.08] to-white/[0.03] hover:from-white/[0.25] hover:via-white/[0.12] hover:to-white/[0.05] backdrop-blur-md border border-white/25 hover:border-white/40 shadow-[inset_0_1px_1px_rgba(255,255,255,0.32),0_8px_20px_rgba(0,0,0,0.12)] font-semibold text-xs sm:text-sm active:scale-[0.98] transition-all duration-200 cursor-pointer group/btn"
            >
              <span>Baca Artikel</span>
              <ArrowRight className="w-4 h-4 text-white group-hover/btn:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
