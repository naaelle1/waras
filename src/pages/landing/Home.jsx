import React from "react";
import Navbar from "../../components/landing/Navbar";
import Hero from "../../components/landing/Hero";
import AboutSection from "../../components/landing/AboutSection";
import BentoFeatures from "../../components/landing/BentoFeatures";
import HowItWorks from "../../components/landing/HowItWorks";
import FacilitiesSection from "../../components/landing/FacilitiesSection";
import WhyWARAS from "../../components/landing/WhyWARAS";
import FAQ from "../../components/landing/FAQ";
import CTA from "../../components/landing/CTA";
import Footer from "../../components/landing/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#F5F8F7] font-['Inter',sans-serif] text-[#062E2B] selection:bg-[#003D3B] selection:text-[#63D6AE] relative overflow-x-hidden">
      <Navbar />
      <main>
        {/* 01. HERO */}
        <Hero />

        {/* 02. TENTANG WARAS (HARUS SECTION KEDUA - DEEP DARK TEAL) */}
        <AboutSection />

        {/* 03. FITUR UNGGULAN (BENTO GRID WIREFRAME ALIGNED) */}
        <BentoFeatures />

        {/* 04. CARA KERJA / HOW IT WORKS */}
        <HowItWorks />

        {/* 05. FASILITAS KESEHATAN (MAP DOMINANT) */}
        <FacilitiesSection />

        {/* 06. WHY WARAS / TRUST (3 BIG REASONS) */}
        <WhyWARAS />

        {/* 07. FAQ (2-COLUMN SPLIT ACCORDION) */}
        <FAQ />

        {/* 08. FINAL CTA (DEEP DARK TEAL) */}
        <CTA />
      </main>

      {/* 09. FOOTER */}
      <Footer />
    </div>
  );
}