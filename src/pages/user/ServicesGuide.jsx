import React, { useRef } from "react";
import { Compass, Info } from "lucide-react";
// Hapus import HealthInfoTabs
import ServiceGuideHero from "../../components/user/ServiceGuide/ServiceGuideHero";
import QuickGuideCard from "../../components/user/ServiceGuide/QuickGuideCard";
import ServiceFlow from "../../components/user/ServiceGuide/ServiceFlow";
import FeaturedGuide from "../../components/user/ServiceGuide/FeaturedGuide";
import PreparationChecklist from "../../components/user/ServiceGuide/PreparationChecklist";
import ServiceGuideCTA from "../../components/user/ServiceGuide/ServiceGuideCTA";

import {
  quickGuidesData,
  serviceFlowSteps,
  featuredGuideData,
  preparationChecklistData
} from "../../data/serviceGuides";

export default function ServicesGuide() {
  const quickGuidesRef = useRef(null);

  const handleScrollToGuides = () => {
    quickGuidesRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="space-y-10 pb-12">
      {/* <HealthInfoTabs /> HAPUS BARIS INI */}

      {/* HEADER HALAMAN */}
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center gap-2.5 text-[#022022]">
          <div className="p-2.5 rounded-2xl bg-[#022022] text-[#37F4B4] shadow-md shadow-[#022022]/10">
            <Compass className="w-6 h-6 text-[#37F4B4]" />
          </div>
          <h1 className="font-poppins font-bold text-2xl sm:text-3xl lg:text-4xl tracking-tight text-[#022022]">
            Panduan Layanan
          </h1>
        </div>
        <p className="text-xs sm:text-sm text-[#5F6F70] font-inter max-w-2xl">
          Pahami dan temukan panduan untuk mengakses layanan kesehatan sesuai kebutuhan Anda.
        </p>
      </div>

      <ServiceGuideHero onScrollToGuides={handleScrollToGuides} />

      <section ref={quickGuidesRef} className="space-y-4 pt-2 scroll-mt-6">
        <div className="space-y-1">
          <h2 className="font-poppins font-bold text-xl sm:text-2xl text-[#022022]">
            Pilih Panduan
          </h2>
          <p className="text-xs sm:text-sm text-[#5F6F70] font-inter">
            Temukan informasi spesifik yang Anda butuhkan untuk memahami navigasi layanan medis.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {quickGuidesData.map((guide) => (
            <QuickGuideCard
              key={guide.id}
              guide={guide}
              onSelect={(g) => console.log("Selected guide:", g.id)}
            />
          ))}
        </div>
      </section>

      <ServiceFlow steps={serviceFlowSteps} />

      <FeaturedGuide
        featuredData={featuredGuideData}
        onSelectGuide={(g) => console.log("Selected guide:", g)}
      />

      <PreparationChecklist items={preparationChecklistData} />

      <ServiceGuideCTA />

      <section className="rounded-2xl bg-[#022022]/5 border border-[#37F4B4]/20 p-5 backdrop-blur-md">
        <div className="flex items-start gap-3">
          <Info className="w-5 h-5 text-[#022022] shrink-0 mt-0.5" />
          <p className="text-xs sm:text-sm text-[#5F6F70] font-inter leading-relaxed">
            <strong>Penafian Layanan:</strong> Panduan layanan ini disajikan sebagai sarana navigasi umum. Ketentuan operasional, persyaratan berkas, dan pembiayaan tetap mengikuti regulasi masing-masing fasilitas pelayanan kesehatan yang dituju.
          </p>
        </div>
      </section>
    </div>
  );
}