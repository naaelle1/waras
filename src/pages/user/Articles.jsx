import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { BookOpen, ShieldCheck, Activity, Loader2 } from "lucide-react";
import FeaturedArticle from "../../components/user/FeaturedArticle";
import ArticleCategoryFilter from "../../components/user/ArticleCategoryFilter";
import ArticleCard from "../../components/user/ArticleCard";
import ArticleDetailModal from "../../components/user/ArticleDetailModal";
import { articleService } from "../../services/articleService";
import { articles as localFallbackArticles } from "../../data/articles";

export default function Articles() {
  const [articlesList, setArticlesList] = useState(localFallbackArticles);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("Semua");
  const [selectedArticleModal, setSelectedArticleModal] = useState(null);
  const navigate = useNavigate();

  // Load artikel terkini dari database Turso
  useEffect(() => {
    let mounted = true;
    async function loadArticles() {
      setIsLoading(true);
      try {
        const data = await articleService.getAll();
        if (mounted && Array.isArray(data) && data.length > 0) {
          setArticlesList(data);
        }
      } catch (err) {
        console.warn("[Articles Page] Gagal memuat artikel dari database:", err);
      } finally {
        if (mounted) setIsLoading(false);
      }
    }
    loadArticles();
    return () => {
      mounted = false;
    };
  }, []);

  const featuredArticle = useMemo(() => {
    return articlesList.find((art) => art.featured) || articlesList[0];
  }, [articlesList]);

  const recommendedArticles = useMemo(() => {
    return articlesList.filter((art) => {
      const isNotFeatured = art.id !== featuredArticle?.id;
      const matchesCategory =
        selectedCategory === "Semua" || art.category === selectedCategory;
      return isNotFeatured && matchesCategory;
    });
  }, [articlesList, featuredArticle, selectedCategory]);

  const handleReadMore = (article) => {
    setSelectedArticleModal(article);
  };

  return (
    <div className="space-y-8 pb-12">
      {/* HEADER HALAMAN */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-200/60 pb-4">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2.5 text-[#022022]">
            <BookOpen className="w-6 h-6 stroke-[2.2] text-[#022022]" />
            <h1 className="font-poppins font-bold text-2xl lg:text-3xl tracking-tight text-[#0D2626]">
              Artikel Kesehatan
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-[#526666] font-inter">
            Informasi dan bacaan kesehatan terpercaya untuk membantu Anda menjaga pola hidup sehat di Kota Semarang.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#022022]/5 text-[#022022] border border-[#022022]/15">
            <Activity className="w-3.5 h-3.5 text-[#022022]" />
            Kota Semarang • Sistem Aktif
          </span>
        </div>
      </div>

      {/* UNGGULAN */}
      {featuredArticle && (
        <section className="space-y-3">
          <h2 className="font-poppins font-bold text-lg sm:text-xl text-[#0D2626]">
            Unggulan
          </h2>
          <FeaturedArticle article={featuredArticle} onReadMore={handleReadMore} />
        </section>
      )}

      {/* DAFTAR ARTIKEL */}
      <section className="space-y-6 pt-2">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h2 className="font-poppins font-bold text-lg sm:text-xl text-[#0D2626]">
            Kamu Mungkin Suka
          </h2>
          <ArticleCategoryFilter
            categories={articleService.getCategories()}
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
          <div className="p-12 text-center rounded-2xl bg-white border border-[#E2ECEB] space-y-3">
            <ShieldCheck className="w-10 h-10 text-gray-400 mx-auto" />
            <h3 className="font-poppins font-semibold text-base text-[#0D2626]">
              Artikel Tidak Ditemukan
            </h3>
            <p className="text-xs text-[#526666]">
              Tidak ada artikel dalam kategori ini saat ini.
            </p>
          </div>
        )}
      </section>

      {/* MODAL BACA ARTIKEL */}
      <ArticleDetailModal
        isOpen={!!selectedArticleModal}
        article={selectedArticleModal}
        onClose={() => setSelectedArticleModal(null)}
      />
    </div>
  );
}
