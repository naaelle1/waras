import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Clock,
  Calendar,
  User,
  Tag,
  Share2,
  Bot,
  MapPin,
  CheckCircle2,
  AlertTriangle,
  ChevronRight,
  Sparkles
} from "lucide-react";

import Button from "../../components/common/Button";
import ArticleCard from "../../components/user/ArticleCard";
import { articles } from "../../data/articles";

export default function ArticleDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const article = articles.find((a) => a.id === parseInt(id, 10)) || articles[0];

  const relatedArticles = articles
    .filter((a) => a.id !== article.id)
    .slice(0, 3);

  const handleConsultAI = () => {
    navigate(
      `/user/ai?q=${encodeURIComponent(
        `Saya ingin penjelasan medis mengenai artikel: ${article.title}`
      )}`
    );
  };

  return (
    <div className="space-y-8 pb-16 max-w-5xl mx-auto">
      {/* BREADCRUMB */}
      <nav className="flex items-center gap-2 text-xs font-medium text-[#526666]">
        <Link to="/user/dashboard" className="hover:text-[#022022] transition-colors">
          Dashboard
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
        <Link to="/user/health-info/articles" className="hover:text-[#022022] transition-colors">
          Artikel Kesehatan
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
        <span className="text-[#0D2626] font-semibold truncate max-w-xs">
          {article.title}
        </span>
      </nav>

      {/* BACK BUTTON & ACTIONS */}
      <div className="flex items-center justify-between">
        <Link
          to="/user/health-info/articles"
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#022022] hover:text-[#033033] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Daftar Artikel</span>
        </Link>

        <button
          type="button"
          onClick={() => {
            if (navigator.clipboard) {
              navigator.clipboard.writeText(window.location.href);
              alert("Tautan artikel berhasil disalin!");
            }
          }}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-[#E2ECEB] text-xs font-medium text-[#526666] hover:text-[#022022] transition-colors cursor-pointer"
        >
          <Share2 className="w-3.5 h-3.5" />
          <span>Bagikan</span>
        </button>
      </div>

      {/* ARTICLE HERO BANNER */}
      <div className="bg-white rounded-2xl border border-[#E2ECEB] overflow-hidden shadow-xs">
        <div className="relative h-72 sm:h-96 w-full bg-gray-100 overflow-hidden">
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent" />

          <div className="absolute bottom-6 left-6 right-6 space-y-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#022022] text-[#37F4B4] border border-[#37F4B4]/30 shadow-xs">
              <Tag className="w-3 h-3 text-[#37F4B4]" />
              {article.category}
            </span>

            <h1 className="font-poppins font-bold text-2xl sm:text-3xl lg:text-4xl text-white leading-tight">
              {article.title}
            </h1>

            <div className="flex flex-wrap items-center gap-3 text-xs text-white/90 font-inter pt-1">
              <span className="flex items-center gap-1.5">
                <User className="w-3.5 h-3.5" />
                Ditinjau oleh: <strong>{article.author || "Tim Medis WARAS"}</strong>
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                {article.date}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                {article.readingTime}
              </span>
            </div>
          </div>
        </div>

        {/* ARTICLE BODY */}
        <div className="p-6 sm:p-10 space-y-6 font-inter text-sm sm:text-base text-[#2B3E3E] leading-relaxed">
          <div className="p-4 sm:p-5 rounded-xl bg-[#F8FAFA] border-l-4 border-[#022022] text-[#0D2626] font-medium leading-relaxed">
            {article.description}
          </div>

          <div className="space-y-4 pt-2">
            <h2 className="font-poppins font-bold text-xl sm:text-2xl text-[#0D2626]">
              Pemahaman Medis & Ciri-Ciri Utama
            </h2>
            <p>
              Kesehatan tubuh bergantung pada respons cepat terhadap sinyal perubahan fisik. Sering kali tanda-tanda awal diabaikan karena dianggap sebagai kelelahan biasa, padahal tindakan pencegahan dini dapat menghindari komplikasi medis serius di kemudian hari.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 pt-2">
              <div className="p-4 rounded-xl bg-white border border-[#E2ECEB] space-y-1.5">
                <div className="flex items-center gap-2 text-sm font-semibold text-[#022022]">
                  <CheckCircle2 className="w-4 h-4 text-[#022022]" />
                  <span>Pencegahan Sejak Dini</span>
                </div>
                <p className="text-xs text-[#526666] leading-relaxed">
                  Lakukan pemeriksaan berkala di Puskesmas terdekat setidaknya 6 bulan sekali untuk mendeteksi faktor risiko sejak awal.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white border border-[#E2ECEB] space-y-1.5">
                <div className="flex items-center gap-2 text-sm font-semibold text-[#022022]">
                  <CheckCircle2 className="w-4 h-4 text-[#022022]" />
                  <span>Hidrasi & Pola Makan</span>
                </div>
                <p className="text-xs text-[#526666] leading-relaxed">
                  Jaga konsumsi cairan minimal 2 liter per hari dan kurangi asupan gula berlebih untuk menjaga metabolisme tubuh tetap stabil.
                </p>
              </div>
            </div>
          </div>

          {/* WARNING NOTICE */}
          <div className="p-4 sm:p-5 rounded-2xl bg-amber-50 border border-amber-200 flex items-start gap-3.5">
            <AlertTriangle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
            <div className="space-y-1 text-xs sm:text-sm text-amber-950">
              <strong className="block font-semibold">Perhatian Khusus Tenaga Medis:</strong>
              <p>
                Informasi artikel ini disusun untuk keperluan edukasi dan panduan awal. Jangan mengubah dosis obat atau menunda rujukan faskes jika Anda mengalami gejala akut atau kondisi darurat.
              </p>
            </div>
          </div>

          {/* TAGS */}
          {article.tags && article.tags.length > 0 && (
            <div className="flex flex-wrap items-center gap-2 pt-4 border-t border-gray-100">
              <span className="text-xs text-[#526666] font-medium">Tag:</span>
              {article.tags.map((t, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded-full bg-[#022022]/10 text-[#022022] border border-[#37F4B4]/20 text-xs font-semibold"
                >
                  #{t}
                </span>
              ))}
            </div>
          )}

          {/* BOTTOM CTA: CONSULT AI OR FIND FASKES */}
          <div className="mt-8 p-6 rounded-2xl bg-[#022022] border border-[#37F4B4]/20 shadow-md text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#37F4B4]">
                <Sparkles className="w-4 h-4 text-[#37F4B4]" />
                <span>Konsultasi Cepat AI</span>
              </div>
              <h3 className="font-poppins font-semibold text-lg text-white">
                Masih memiliki pertanyaan seputar topik ini?
              </h3>
              <p className="text-xs text-gray-200">
                Tanyakan kepada WARAS AI untuk mendapatkan penjelasan yang disesuaikan dengan keluhan Anda.
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <Button
                variant="secondary"
                leftIcon={Bot}
                onClick={handleConsultAI}
              >
                Tanya WARAS AI
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* RELATED ARTICLES */}
      {relatedArticles.length > 0 && (
        <section className="space-y-4 pt-4">
          <h3 className="font-poppins font-bold text-xl text-[#0D2626]">
            Bacaan Terkait Lainnya
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {relatedArticles.map((rel) => (
              <ArticleCard key={rel.id} article={rel} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

