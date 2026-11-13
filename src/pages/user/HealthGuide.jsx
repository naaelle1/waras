import React, { useState } from "react";
import { BookOpen, Info } from "lucide-react";
import GuideHero from "../../components/user/HealthGuide/GuideHero";
import GuideCard from "../../components/user/HealthGuide/GuideCard";
import GuideDetailModal from "../../components/user/HealthGuide/GuideDetailModal";
import HealthGuideTabs from "../../components/user/HealthGuide/HealthGuideTabs";
import { healthGuidesData } from "../../data/healthGuides";

export default function HealthGuide() {
  const [activeCategory, setActiveCategory] = useState("darurat");
  const [selectedGuideModal, setSelectedGuideModal] = useState(null);

  const activeCategoryData = healthGuidesData[activeCategory] || healthGuidesData.darurat;

  const handleOpenModal = (guide) => {
    setSelectedGuideModal(guide);
  };

  const handleCloseModal = () => {
    setSelectedGuideModal(null);
  };

  return (
    <div className="space-y-8 pb-12">
      {/* <HealthInfoTabs /> HAPUS BARIS INI */}

      {/* PAGE HEADER */}
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center gap-2.5 text-[#022022]">
          <div className="p-2.5 rounded-2xl bg-[#022022] text-[#37F4B4] shadow-md shadow-[#022022]/10">
            <BookOpen className="w-6 h-6 text-[#37F4B4]" />
          </div>
          <h1 className="font-poppins font-bold text-2xl sm:text-3xl lg:text-4xl tracking-tight text-[#022022]">
            Panduan Kesehatan
          </h1>
        </div>
        <p className="text-xs sm:text-sm text-[#4B5E5E] font-inter max-w-2xl">
          Panduan pertolongan pertama, langkah darurat, dan cek kondisi mandiri yang cepat, terpercaya, serta praktis.
        </p>
      </div>

      {/* CATEGORY TABS (Darurat, P3K, Cek Mandiri) */}
      <HealthGuideTabs
        activeTab={activeCategory}
        onTabChange={(tabId) => setActiveCategory(tabId)}
      />

      <GuideHero
        heroData={activeCategoryData.hero}
        onOpenModal={handleOpenModal}
      />

      <section className="space-y-5 pt-2">
        <h2 className="font-poppins font-bold text-xl sm:text-2xl text-[#022022]">
          {activeCategoryData.caseTitle}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activeCategoryData.cases.map((guide) => (
            <GuideCard
              key={guide.id}
              guide={guide}
              onOpenModal={handleOpenModal}
            />
          ))}
        </div>
      </section>

      <section className="rounded-2xl bg-[#022022]/5 border border-[#37F4B4]/20 p-5 backdrop-blur-md">
        <div className="flex items-start gap-3">
          <Info className="w-5 h-5 text-[#022022] shrink-0 mt-0.5" />
          <p className="text-xs sm:text-sm text-[#4B5E5E] font-inter leading-relaxed">
            <strong>Penafian Edukasi:</strong> Informasi dan panduan di halaman ini bertujuan sebagai pertolongan awal edukatif dan tidak menggantikan perawatan atau diagnosis langsung oleh tenaga kesehatan medis profesional.
          </p>
        </div>
      </section>

      <GuideDetailModal
        isOpen={Boolean(selectedGuideModal)}
        guide={selectedGuideModal}
        onClose={handleCloseModal}
      />
    </div>
  );
}