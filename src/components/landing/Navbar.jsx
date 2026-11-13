import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, ArrowRight } from "lucide-react";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const links = [
    { name: "Tentang", href: "#tentang" },
    { name: "Fasilitas", href: "#fasilitas" },
    { name: "Panduan", href: "#panduan" },
    { name: "FAQ", href: "#faq" },
  ];

  return (
    <header className="w-full pt-6 pb-2 px-4 sm:px-8 lg:px-12 bg-white relative z-40">
      <div className="max-w-[1480px] mx-auto flex items-center justify-between">
        
        {/* LOGO */}
        <a href="#beranda" className="flex items-center gap-2 shrink-0">
          <img
            src="/images/logo/waraslogo.svg"
            alt="WARAS Logo"
            className="h-8 sm:h-9 w-auto object-contain"
          />
        </a>

        {/* CENTER NAV LINKS (Clean & Minimalist like Reference) */}
        <nav className="hidden md:flex items-center gap-8 lg:gap-10">
          {links.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-xs sm:text-sm font-light text-[#022022]/75 hover:text-[#022022] hover:font-medium transition-colors tracking-wide uppercase"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* RIGHT ACTION BUTTON (Single Crisp Pill Button like Reference) */}
        <div className="hidden sm:flex items-center gap-4">
          <Link
            to="/login"
            className="text-xs sm:text-sm font-medium text-[#022022]/70 hover:text-[#022022] transition-colors"
          >
            Masuk
          </Link>
          <Link
            to="/user/facilities"
            className="px-6 py-2.5 rounded-full bg-[#022022] text-white text-xs sm:text-sm font-medium hover:bg-[#033033] hover:border-[#37F4B4]/40 border border-transparent transition-all shadow-sm active:scale-95 group flex items-center gap-1.5"
          >
            <span>Cari Faskes</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#37F4B4]" />
          </Link>
        </div>

        {/* MOBILE TOGGLE */}
        <div className="flex md:hidden items-center gap-2">
          <Link
            to="/user/facilities"
            className="px-3.5 py-1.5 rounded-full bg-[#022022] text-white text-xs font-light"
          >
            Cari Faskes
          </Link>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 rounded-full text-[#022022] hover:bg-[#37F4B4]/15 transition-colors"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* MOBILE DROPDOWN */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-3 p-4 rounded-2xl bg-white border border-[#37F4B4]/25 shadow-lg flex flex-col gap-2">
          {links.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 text-sm font-light text-[#022022] hover:text-[#022022] hover:bg-[#37F4B4]/15 rounded-xl transition-colors"
            >
              {link.name}
            </a>
          ))}
          <div className="pt-2 border-t border-[#37F4B4]/20 flex flex-col gap-2">
            <Link
              to="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-2 text-xs font-medium text-[#022022] bg-[#022022]/5 border border-[#37F4B4]/30 rounded-xl"
            >
              Masuk
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
