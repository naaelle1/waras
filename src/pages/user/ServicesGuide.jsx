import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Compass, Info, Activity } from "lucide-react";
import ServiceGuideHero from "../../components/user/ServiceGuide/ServiceGuideHero";
import QuickGuideCard from "../../components/user/ServiceGuide/QuickGuideCard";
import ServiceFlow from "../../components/user/ServiceGuide/ServiceFlow";
import FeaturedGuide from "../../components/user/ServiceGuide/FeaturedGuide";
import PreparationChecklist from "../../components/user/ServiceGuide/PreparationChecklist";
import ServiceGuideCTA from "../../components/user/ServiceGuide/ServiceGuideCTA";
import ServiceGuideModal from "../../components/user/ServiceGuide/ServiceGuideModal";

import {
  quickGuidesData,
  serviceFlowSteps,
  featuredGuideData,
  preparationChecklistData
} from "../../data/serviceGuides";

export default function ServicesGuide() {
  const quickGuidesRef = useRef(null);
  const navigate = useNavigate();
  const [activeModalType, setActiveModalType] = useState(null);

  const handleScrollToGuides = () => {
    quickGuidesRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleQuickGuideSelect = (guide) => {
    if (!guide) return;
    if (guide.id === "mau-berobat") {
      navigate(
        `/user/ai?q=${encodeURIComponent(
          "Rekomendasi fasilitas kesehatan untuk kondisi saya: Mau berobat ke mana?"
        )}`
      );
    } else if (guide.id === "jaminan-kesehatan") {
      setActiveModalType("jaminan-kesehatan");
    } else if (guide.id === "persiapan-berobat") {
      const el = document.getElementById("section-persiapan");
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    } else if (guide.id === "layanan-darurat") {
      setActiveModalType("layanan-darurat");
    }
  };

  const handleFeaturedGuideSelect = (item) => {
    if (!item) return;
    if (item.id === "featured-faskes-choice" || item.id === "mau-berobat") {
      navigate(
        `/user/ai?q=${encodeURIComponent(
          "Panduan memilih faskes: Kapan harus ke Puskesmas, Klinik Pratama, atau Rumah Sakit?"
        )}`
      );
    } else if (item.id === "sup-1" || item.id === "persiapan-berobat") {
      const el = document.getElementById("section-persiapan");
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    } else if (item.id === "sup-2" || item.id === "layanan-darurat") {
      setActiveModalType("layanan-darurat");
    } else if (item.id === "jaminan-kesehatan") {
      setActiveModalType("jaminan-kesehatan");
    }
  };

  return (
    <div className="space-y-10 pb-12">
      {/* HEADER HALAMAN */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-200/60 pb-4">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2.5 text-[#022022]">
            <Compass className="w-6 h-6 stroke-[2.2] text-[#022022]" />
            <h1 className="font-poppins font-bold text-2xl lg:text-3xl tracking-tight text-[#0D2626]">
              Panduan Layanan
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-[#526666] font-inter">
            Pahami dan temukan panduan untuk mengakses layanan kesehatan sesuai kebutuhan Anda.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#022022]/5 text-[#022022] border border-[#022022]/15">
            <Activity className="w-3.5 h-3.5 text-[#022022]" />
            Kota Semarang • Sistem Aktif
          </span>
        </div>
      </div>

      <ServiceGuideHero onScrollToGuides={handleScrollToGuides} />

      {/* SECTION PILIH PANDUAN */}
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
              onSelect={handleQuickGuideSelect}
            />
          ))}
        </div>
      </section>

      {/* ALUR LAYANAN KESEHATAN */}
      <ServiceFlow steps={serviceFlowSteps} />

      {/* PANDUAN POPULER */}
      <FeaturedGuide
        featuredData={featuredGuideData}
        onSelectGuide={handleFeaturedGuideSelect}
      />

      {/* PERSIAPAN SEBELUM BEROBAT */}
      <PreparationChecklist items={preparationChecklistData} />

      {/* BOTTOM CTA BANNER */}
      <ServiceGuideCTA />

      {/* PENAFIAN LAYANAN */}
      <section className="rounded-2xl bg-[#022022]/5 border border-[#022022]/15 p-5 backdrop-blur-md">
        <div className="flex items-start gap-3">
          <Info className="w-5 h-5 text-[#022022] shrink-0 mt-0.5" />
          <p className="text-xs sm:text-sm text-[#5F6F70] font-inter leading-relaxed">
            <strong>Penafian Layanan:</strong> Panduan layanan ini disajikan sebagai sarana navigasi umum. Ketentuan operasional, persyaratan berkas, dan pembiayaan tetap mengikuti regulasi masing-masing fasilitas pelayanan kesehatan yang dituju.
          </p>
        </div>
      </section>

      {/* SERVICE GUIDE MODAL POPUP (Jaminan Kesehatan & Layanan Darurat) */}
      <ServiceGuideModal
        isOpen={Boolean(activeModalType)}
        type={activeModalType}
        onClose={() => setActiveModalType(null)}
      />
    </div>
  );
}
