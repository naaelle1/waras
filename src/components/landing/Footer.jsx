import React from "react";
import { Link } from "react-router-dom";
import { footerLinks } from "../../data/landingData";
import { Globe, Mail, MessageCircle, HeartPulse } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-[#014751]/10 pt-16 pb-12 text-[#022022] px-4 sm:px-8 lg:px-12">
      <div className="max-w-[1480px] mx-auto">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 sm:gap-8 pb-12 border-b border-[#014751]/10">
          
          {/* BRAND COLUMN (col-span-5) */}
          <div className="md:col-span-5 space-y-4">
            <a href="#beranda" className="inline-block cursor-pointer">
              <img
                src="/images/logo/waraslogo.svg"
                alt="WARAS Logo"
                className="h-9 w-auto object-contain"
              />
            </a>
            <p className="text-xs sm:text-sm text-[#022022]/70 max-w-sm leading-relaxed font-light">
              Platform direktori dan navigasi informasi kesehatan Kota Semarang. Membantu warga menemukan faskes siaga, panduan P3K, dan kontak tanggap darurat secara terpadu.
            </p>
            <div className="flex items-center gap-3 pt-1">
              <a
                href="https://dinkes.semarangkota.go.id"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-[#E6FEFF] text-[#014751] hover:bg-[#014751] hover:text-white flex items-center justify-center transition-colors"
                aria-label="Website Dinkes"
              >
                <Globe className="w-4 h-4" />
              </a>
              <a
                href="mailto:info@waras.semarang.go.id"
                className="w-8 h-8 rounded-full bg-[#E6FEFF] text-[#014751] hover:bg-[#014751] hover:text-white flex items-center justify-center transition-colors"
                aria-label="Email WARAS"
              >
                <Mail className="w-4 h-4" />
              </a>
              <a
                href="https://wa.me/628112345678"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-[#E6FEFF] text-[#014751] hover:bg-[#014751] hover:text-white flex items-center justify-center transition-colors"
                aria-label="WhatsApp Hotline"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* NAVIGATION: PLATFORM (col-span-2) */}
          <div className="md:col-span-2 sm:col-span-4 space-y-3">
            <h4 className="text-xs font-medium text-[#014751] uppercase tracking-wider">
              Platform
            </h4>
            <ul className="space-y-2.5 text-xs text-[#022022]/70 font-light">
              {footerLinks.platform.map((item, idx) => (
                <li key={idx}>
                  <Link
                    to={item.href}
                    className="hover:text-[#014751] transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* NAVIGATION: INFORMASI (col-span-3) */}
          <div className="md:col-span-3 sm:col-span-4 space-y-3">
            <h4 className="text-xs font-medium text-[#014751] uppercase tracking-wider">
              Informasi
            </h4>
            <ul className="space-y-2.5 text-xs text-[#022022]/70 font-light">
              {footerLinks.informasi.map((item, idx) => (
                <li key={idx}>
                  {item.href.startsWith("http") || item.href.startsWith("tel") ? (
                    <a
                      href={item.href}
                      target={item.href.startsWith("http") ? "_blank" : undefined}
                      rel="noreferrer"
                      className="hover:text-[#014751] transition-colors"
                    >
                      {item.label}
                    </a>
                  ) : (
                    <Link
                      to={item.href}
                      className="hover:text-[#014751] transition-colors"
                    >
                      {item.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* NAVIGATION: BANTUAN (col-span-2) */}
          <div className="md:col-span-2 sm:col-span-4 space-y-3">
            <h4 className="text-xs font-medium text-[#014751] uppercase tracking-wider">
              Bantuan
            </h4>
            <ul className="space-y-2.5 text-xs text-[#022022]/70 font-light">
              {footerLinks.bantuan.map((item, idx) => (
                <li key={idx}>
                  <Link
                    to={item.href}
                    className="hover:text-[#014751] transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* BOTTOM COPYRIGHT */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#022022]/60 font-light">
          <p>© 2026 WARAS. Hak cipta dilindungi undang-undang.</p>
          <div className="flex items-center gap-1.5 text-[11px] text-[#014751]">
            <HeartPulse className="w-3.5 h-3.5 text-[#37F4B4]" />
            <span>Didedikasikan untuk Layanan Publik Kesehatan Kota Semarang</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
