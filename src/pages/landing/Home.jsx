import React from "react";
import Navbar from "../../components/landing/Navbar";
import Hero from "../../components/landing/Hero";
import PartnerStrip from "../../components/landing/PartnerStrip";
import PopularFacilities from "../../components/landing/PopularFacilities";
import SimpleServices from "../../components/landing/SimpleServices";
import AboutSection from "../../components/landing/AboutSection";
import FAQ from "../../components/landing/FAQ";
import CTA from "../../components/landing/CTA";
import Footer from "../../components/landing/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-white font-['Inter',sans-serif] font-light text-[#022022] selection:bg-[#022022] selection:text-[#37F4B4] relative overflow-x-hidden">
      {/* 01. NAVBAR */}
      <Navbar />

      <main>
        {/* 02. HERO CONTAINER (ROUNDED CARD WITH MASK GROUP.SVG, CLEAN FOCAL ELEMENT, & CUTOUT PILL) */}
        <Hero />

        {/* 03. PARTNER / NETWORK STRIP (CLEAN & MINIMAL, NO RUNNING TEXT) */}
        <PartnerStrip />

        {/* 04. FASILITAS KESEHATAN SIAGA (MATCHING "POPULAR DESTINATION" IN REFERENCE) */}
        <PopularFacilities />

        {/* 05. PENANGANAN MEDIS LEBIH SEDERHANA (MATCHING "JOURNEY TO THE SKIES MADE SIMPLE!" IN REFERENCE) */}
        <SimpleServices />

        {/* 06. TENTANG WARAS (CLEAN EDITORIAL PILLARS) */}
        <AboutSection />

        {/* 07. FAQ (MINIMAL CLEAN ACCORDION) */}
        <FAQ />

        {/* 08. FINAL CTA */}
        <CTA />
      </main>

      {/* 09. FOOTER */}
      <Footer />
    </div>
  );
}
