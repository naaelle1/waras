import React, { useState, useMemo } from "react";
import { BookOpen, Info, ShieldCheck } from "lucide-react";
// Hapus import HealthInfoTabs
import FeaturedArticle from "../../components/user/FeaturedArticle";
import ArticleCategoryFilter from "../../components/user/ArticleCategoryFilter";
import ArticleCard from "../../components/user/ArticleCard";
import { articles } from "../../data/articles";

const CATEGORIES = [
  "Semua",
  "Kesehatan Umum",
  "Penyakit & Pencegahan",
  "Kesehatan Mental",
  "Gaya Hidup",
  "Pertolongan Pertama"
];

export default function Articles() {
  const [selectedCategory, setSelectedCategory] = useState("Semua");

  const featuredArticle = useMemo(() => {
    return articles.find((art) => art.featured) || articles[0];
  }, []);

  const recommendedArticles = useMemo(() => {
    return articles.filter((art) => {
      const isNotFeatured = art.id !== featuredArticle?.id;
      const matchesCategory =
        selectedCategory === "Semua" || art.category === selectedCategory;
      return isNotFeatured && matchesCategory;
    });
  }, [featuredArticle, selectedCategory]);

  const handleReadMore = (article) => {
    console.log("Navigating to article detail:", article.id);
  };

  return (
    <div className="space-y-8 pb-12">
      {/* <HealthInfoTabs /> HAPUS BARIS INI */}

      {/* HEADER HALAMAN */}
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center gap-2.5 text-[#002B2C]">
          <div className="p-2.5 rounded-2xl bg-[#002B2C] text-white shadow-sm">
            <BookOpen className="w-6 h-6" />
          </div>
          <h1 className="font-poppins font-bold text-2xl lg:text-3xl tracking-tight text-[#002B2C]">
            Artikel Kesehatan
          </h1>
        </div>
        <p className="text-xs sm:text-sm text-[#5F6F70] font-inter max-w-2xl">
          Informasi dan bacaan kesehatan terpercaya untuk membantu Anda menjaga pola hidup sehat.
        </p>
      </div>

      {/* UNGGULAN */}
      {featuredArticle && (
        <section className="space-y-3">
          <h2 className="font-poppins font-bold text-lg sm:text-xl text-[#002B2C]">
            Unggulan
          </h2>
          <FeaturedArticle article={featuredArticle} onReadMore={handleReadMore} />
        </section>
      )}

      {/* DAFTAR ARTIKEL */}
      <section className="space-y-6 pt-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h2 className="font-poppins font-bold text-lg sm:text-xl text-[#002B2C]">
            Kamu Mungkin Suka
          </h2>
          <ArticleCategoryFilter
            categories={CATEGORIES}
            activeCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />
        </div>

        {recommendedArticles.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {recommendedArticles.map((article) => (
              <ArticleCard
                key={article.id}
                article={article}
                onReadMore={handleReadMore}
              />
            ))}
          </div>
        ) : (
          <div className="p-12 text-center rounded-3xl bg-white/60 backdrop-blur-md border border-white/80 space-y-3">
            <ShieldCheck className="w-10 h-10 text-gray-400 mx-auto" />
            <h3 className="font-poppins font-semibold text-base text-[#002B2C]">
              Artikel Tidak Ditemukan
            </h3>
          </div>
        )}
      </section>

      {/* DISCLAIMER */}
      <section className="rounded-2xl bg-[#002B2C]/5 border border-[#002B2C]/10 p-5 sm:p-6 backdrop-blur-md">
        <div className="flex items-start gap-3.5">
          <div className="p-2 rounded-xl bg-[#002B2C] text-white shrink-0 mt-0.5">
            <Info className="w-5 h-5 text-[#A9D6C8]" />
          </div>
          <div className="space-y-1">
            <h4 className="font-poppins font-semibold text-sm text-[#002B2C]">
              Penafian Medis (Disclaimer)
            </h4>
            <p className="text-xs sm:text-sm text-[#5F6F70] font-inter leading-relaxed">
              Informasi yang tersedia di WARAS bertujuan untuk edukasi umum dan tidak menggantikan pemeriksaan, diagnosis, atau saran medis dari dokter profesional.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}