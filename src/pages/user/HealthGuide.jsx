import React, { useState } from "react";
import { Link } from "react-router-dom";
import { BookOpen, Info, Activity, ArrowRight, ShieldCheck } from "lucide-react";
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
      {/* PAGE HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-200/60 pb-4">
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

      {/* HERO SECTION (Split Unified Card without floating clipart) */}
      <GuideHero
        heroData={activeCategoryData.hero}
        onOpenModal={handleOpenModal}
      />

      {/* CASES GRID SECTION */}
      <section className="space-y-5 pt-2">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-100 pb-3">
          <div className="space-y-1">
            <h2 className="font-poppins font-bold text-xl sm:text-2xl text-[#0D2626]">
              {activeCategoryData.caseTitle}
            </h2>
            <p className="text-xs sm:text-sm text-[#526666] font-inter">
              Langkah penanganan terstruktur untuk berbagai kondisi medis dan pertolongan pertama mandiri.
            </p>
          </div>

          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#022022]/5 text-[#022022] border border-[#022022]/15 self-start sm:self-auto">
            <ShieldCheck className="w-3.5 h-3.5 text-[#022022]" />
            {activeCategoryData.cases?.length || 3} Panduan Tersedia
          </span>
        </div>

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

      {/* EDUCATIONAL DISCLAIMER CALLOUT */}
      <section className="rounded-2xl bg-gradient-to-r from-[#022022]/[0.04] via-[#022022]/[0.02] to-transparent border border-[#022022]/10 p-5 sm:p-6 backdrop-blur-xs">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="p-2.5 rounded-xl bg-[#022022]/10 text-[#022022] shrink-0 mt-0.5">
              <Info className="w-5 h-5 text-[#022022]" />
            </div>
            <div className="space-y-1">
              <h4 className="font-poppins font-semibold text-sm text-[#0D2626]">
                Penafian Medis & Edukasi
              </h4>
              <p className="text-xs text-[#526666] font-inter leading-relaxed max-w-3xl">
                Seluruh informasi dan panduan tindakan pada halaman ini bertujuan sebagai pertolongan pertama edukatif dan tidak menggantikan perawatan, diagnosis langsung, atau resep dari dokter profesional. Dalam kondisi kritis, segera kunjungi IGD atau faskes terdekat.
              </p>
            </div>
          </div>

          <Link
            to="/user/facilities"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold text-[#022022] bg-[#022022]/5 hover:bg-[#022022]/10 border border-[#022022]/15 transition-colors shrink-0 self-start sm:self-auto"
          >
            <span>Cari Faskes Terdekat</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </section>

      {/* DETAIL MODAL */}
      <GuideDetailModal
        isOpen={Boolean(selectedGuideModal)}
        guide={selectedGuideModal}
        onClose={handleCloseModal}
      />
    </div>
  );
}
