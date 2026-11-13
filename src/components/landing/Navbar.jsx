import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { name: "Tentang", href: "#tentang" },
    { name: "Fasilitas", href: "#fasilitas" },
    { name: "Panduan", href: "#panduan" },
    { name: "FAQ", href: "#faq" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 border-b transition-[background-color,border-color,box-shadow] duration-300 ease-out ${
          isScrolled
            ? "bg-white/95 backdrop-blur-md border-[#022022]/10 shadow-[0_8px_30px_rgba(2,32,34,0.10)]"
            : "bg-white border-transparent shadow-none"
        }`}
      >
        <div className="max-w-[1480px] mx-auto px-4 sm:px-8 lg:px-12 h-[72px] sm:h-[80px] flex items-center justify-between">
          
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
              className="px-6 py-2.5 rounded-full bg-[#022022] text-white text-xs sm:text-sm font-medium hover:bg-[#033033] border border-transparent transition-all shadow-sm active:scale-95 group flex items-center gap-1.5"
            >
              <span>Cari Faskes</span>
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
              className="p-1.5 rounded-full text-[#022022] hover:bg-[#022022]/5 transition-colors"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>

        {/* MOBILE DROPDOWN */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-full inset-x-4 mt-2 p-4 rounded-2xl bg-white border border-[#022022]/10 shadow-2xl flex flex-col gap-2">
            {links.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 text-sm font-light text-[#022022] hover:text-[#022022] hover:bg-[#022022]/5 rounded-xl transition-colors"
              >
                {link.name}
              </a>
            ))}
            <div className="pt-2 border-t border-[#022022]/10 flex flex-col gap-2">
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-2 text-xs font-medium text-[#022022] bg-[#022022]/5 border border-[#022022]/10 rounded-xl"
              >
                Masuk
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Spacer so the page content never gets covered or jumps */}
      <div className="h-[72px] sm:h-[80px]" aria-hidden="true" />
    </>
  );
}
