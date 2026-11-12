import React from "react";
import { Link } from "react-router-dom";
import { footerLinks } from "../../data/landingData";
import { Heart, Globe, Mail, MessageCircle } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-[#E2ECEB] pt-16 pb-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 sm:gap-8 pb-12 border-b border-[#F0F5F4]">
          
          {/* BRAND COLUMN (col-span-5) */}
          <div className="md:col-span-5 space-y-4">
            <a href="#beranda" className="inline-block cursor-pointer">
              <img
                src="/images/logo/waraslogo.svg"
                alt="WARAS Logo"
                className="h-9 w-auto object-contain"
              />
            </a>
            <p className="text-xs sm:text-sm text-[#647777] max-w-sm leading-relaxed">
              Platform informasi dan navigasi layanan kesehatan Kota Semarang. Membantu warga menemukan faskes, panduan medis, dan konsultasi awal secara terpadu.
            </p>
            <div className="flex items-center gap-3 pt-1">
              <a
                href="https://dinkes.semarangkota.go.id"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-[#F6FAF9] text-[#006B5E] hover:bg-[#DDF8EC] flex items-center justify-center transition-colors"
                aria-label="Website Dinkes"
              >
                <Globe className="w-4 h-4" />
              </a>
              <a
                href="mailto:info@waras.semarang.go.id"
                className="w-8 h-8 rounded-full bg-[#F6FAF9] text-[#006B5E] hover:bg-[#DDF8EC] flex items-center justify-center transition-colors"
                aria-label="Email WARAS"
              >
                <Mail className="w-4 h-4" />
              </a>
              <a
                href="https://wa.me/628112345678"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-[#F6FAF9] text-[#006B5E] hover:bg-[#DDF8EC] flex items-center justify-center transition-colors"
                aria-label="WhatsApp Hotline"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* NAVIGATION: PLATFORM (col-span-2 or 3) */}
          <div className="md:col-span-2 sm:col-span-4 space-y-3">
            <h4 className="text-xs font-bold text-[#062F2F] uppercase tracking-wider">
              Platform
            </h4>
            <ul className="space-y-2.5 text-xs text-[#647777]">
              {footerLinks.platform.map((item, idx) => (
                <li key={idx}>
                  <Link
                    to={item.href}
                    className="hover:text-[#003B3B] transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* NAVIGATION: INFORMASI (col-span-2 or 3) */}
          <div className="md:col-span-3 sm:col-span-4 space-y-3">
            <h4 className="text-xs font-bold text-[#062F2F] uppercase tracking-wider">
              Informasi
            </h4>
            <ul className="space-y-2.5 text-xs text-[#647777]">
              {footerLinks.informasi.map((item, idx) => (
                <li key={idx}>
                  {item.href.startsWith("http") || item.href.startsWith("tel") ? (
                    <a
                      href={item.href}
                      target={item.href.startsWith("http") ? "_blank" : undefined}
                      rel="noreferrer"
                      className="hover:text-[#003B3B] transition-colors"
                    >
                      {item.label}
                    </a>
                  ) : (
                    <Link
                      to={item.href}
                      className="hover:text-[#003B3B] transition-colors"
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
            <h4 className="text-xs font-bold text-[#062F2F] uppercase tracking-wider">
              Bantuan
            </h4>
            <ul className="space-y-2.5 text-xs text-[#647777]">
              {footerLinks.bantuan.map((item, idx) => (
                <li key={idx}>
                  <Link
                    to={item.href}
                    className="hover:text-[#003B3B] transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* BOTTOM COPYRIGHT */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#647777]">
          <p>© 2026 WARAS. Hak cipta dilindungi undang-undang.</p>
          <div className="flex items-center gap-1 text-[11px]">
            <span>Didedikasikan untuk Layanan Publik Kota Semarang</span>
          </div>
        </div>

      </div>
    </footer>
  );
}