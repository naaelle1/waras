import React, { useState } from "react";
import { BookOpen, Info, Activity } from "lucide-react";
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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-200/60 pb-4">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2.5 text-[#022022]">
            <BookOpen className="w-6 h-6 stroke-[2.2] text-[#022022]" />
            <h1 className="font-poppins font-bold text-2xl lg:text-3xl tracking-tight text-[#0D2626]">
              Panduan Kesehatan
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-[#526666] font-inter">
            Panduan pertolongan pertama, langkah darurat, dan cek kondisi mandiri yang cepat, terpercaya, serta praktis.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#022022]/5 text-[#022022] border border-[#022022]/15">
            <Activity className="w-3.5 h-3.5 text-[#022022]" />
            Kota Semarang • Sistem Aktif
          </span>
        </div>
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

      <section className="rounded-2xl bg-[#022022]/5 border border-[#022022]/15 p-5 backdrop-blur-md">
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