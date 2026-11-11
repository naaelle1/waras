import React from "react";
import { Link } from "react-router-dom";
import { ArrowUp, Heart, ShieldCheck } from "lucide-react";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-white border-t border-[#E2ECEB] pt-14 pb-10 text-xs sm:text-sm text-[#526666] font-inter">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start justify-between">
          {/* BRAND COLUMN */}
          <div className="md:col-span-5 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-[#003B3B] text-white flex items-center justify-center font-bold text-sm shadow-xs">
                W
              </div>
              <span className="font-poppins font-extrabold text-xl tracking-tight text-[#003B3B]">
                waras
              </span>
            </div>

            <p className="text-xs text-[#526666] leading-relaxed max-w-sm">
              Platform kesehatan publik terpadu warga Kota Semarang. Menyajikan pemantauan antrean real-time, pencarian faskes, dan panduan kesehatan bertenaga AI.
            </p>

            <div className="pt-2 text-[11px] text-[#809494]">
              Kota Semarang • Jawa Tengah, Indonesia
            </div>
          </div>

          {/* QUICK LINKS */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="font-poppins font-semibold text-xs text-[#0D2626] uppercase tracking-wider">
              Layanan Warga
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/user/dashboard" className="hover:text-[#003B3B] transition-colors">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to="/user/facilities" className="hover:text-[#003B3B] transition-colors">
                  Pencarian Faskes
                </Link>
              </li>
              <li>
                <Link to="/user/ai" className="hover:text-[#003B3B] transition-colors">
                  Tanya WARAS AI
                </Link>
              </li>
              <li>
                <Link to="/user/report-problem" className="hover:text-[#003B3B] transition-colors">
                  Lapor Koreksi Data
                </Link>
              </li>
            </ul>
          </div>

          {/* HEALTH INFO LINKS */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="font-poppins font-semibold text-xs text-[#0D2626] uppercase tracking-wider">
              Informasi Kesehatan
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/user/health-info/articles" className="hover:text-[#003B3B] transition-colors">
                  Artikel & Tips Hidup Sehat
                </Link>
              </li>
              <li>
                <Link to="/user/health-info/guides" className="hover:text-[#003B3B] transition-colors">
                  Panduan Pertolongan Pertama (P3K)
                </Link>
              </li>
              <li>
                <Link to="/user/health-info/medical-terms" className="hover:text-[#003B3B] transition-colors">
                  Kamus Istilah Medis
                </Link>
              </li>
              <li>
                <Link to="/user/health-info/services" className="hover:text-[#003B3B] transition-colors">
                  Alur Rujukan BPJS
                </Link>
              </li>
            </ul>
          </div>

          {/* BACK TO TOP BUTTON */}
          <div className="md:col-span-2 flex flex-col items-start md:items-end">
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#F8FAFA] hover:bg-[#EBF5F5] border border-[#E2ECEB] text-xs font-semibold text-[#003B3B] transition-colors cursor-pointer"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span>Ke Atas</span>
            </button>
          </div>
        </div>

        {/* BOTTOM DISCLAIMER & COPYRIGHT */}
        <div className="pt-8 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#809494]">
          <p>© 2026 WARAS Healthcare Platform • Kota Semarang. Seluruh hak cipta dilindungi.</p>
          <div className="flex items-center gap-2 text-center sm:text-right text-[11px]">
            <ShieldCheck className="w-3.5 h-3.5 text-[#003B3B]" />
            <span>Informasi platform bersifat panduan awal dan tidak menggantikan diagnosis resmi tenaga medis.</span>
          </div>
        </div>

      </div>
    </footer>
  );
}

