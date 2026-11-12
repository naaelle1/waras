import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X, ArrowRight } from "lucide-react";
import { navLinks } from "../../data/landingData";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("beranda");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 25);

      const sections = ["beranda", "tentang", "fitur", "panduan", "faskes", "faq"];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 160 && rect.bottom >= 160) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed top-4 left-0 right-0 z-50 px-4 sm:px-6 pointer-events-none">
      <div
        className={`max-w-6xl mx-auto rounded-full transition-all duration-300 pointer-events-auto flex items-center justify-between ${
          scrolled
            ? "bg-white/95 backdrop-blur-xl border border-black/5 shadow-[0_12px_40px_rgba(0,61,59,0.12)] py-2.5 px-5 sm:px-6"
            : "bg-white/85 backdrop-blur-md border border-white/80 shadow-[0_4px_24px_rgba(0,61,59,0.06)] py-3 px-5 sm:px-7"
        }`}
      >
        {/* LOGO */}
        <a href="#beranda" className="flex items-center gap-2.5 group cursor-pointer shrink-0">
          <img
            src="/images/logo/waraslogo.svg"
            alt="WARAS Logo"
            className="h-8 sm:h-9 w-auto object-contain transition-transform group-hover:scale-105"
          />
        </a>

        {/* DESKTOP NAV PILL */}
        <nav className="hidden lg:flex items-center gap-1 bg-[#F5F8F7] p-1 rounded-full border border-black/5">
          {navLinks.map((link) => {
            const sectionId = link.href.replace("#", "");
            const isActive = activeSection === sectionId;
            return (
              <a
                key={link.name}
                href={link.href}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  isActive
                    ? "bg-[#003D3B] text-[#63D6AE] shadow-xs"
                    : "text-[#647777] hover:text-[#062E2B] hover:bg-black/5"
                }`}
              >
                {link.name}
              </a>
            );
          })}
        </nav>

        {/* CTA BUTTONS */}
        <div className="hidden sm:flex items-center gap-2.5 shrink-0">
          <Link
            to="/login"
            className="px-4 py-2 rounded-full text-xs font-bold text-[#003D3B] hover:text-[#005B52] hover:bg-[#003D3B]/5 transition-colors cursor-pointer"
          >
            Masuk
          </Link>
          <Link
            to="/user/dashboard"
            className="inline-flex items-center gap-1.5 px-4 sm:px-5 py-2 rounded-full bg-[#003D3B] text-white text-xs font-bold shadow-md shadow-[#003D3B]/25 hover:bg-[#005B52] active:scale-95 transition-all cursor-pointer group"
          >
            <span>Mulai Sekarang</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#63D6AE] transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        {/* MOBILE MENU TOGGLE */}
        <div className="flex sm:hidden items-center gap-2">
          <Link
            to="/user/dashboard"
            className="px-3 py-1.5 rounded-full bg-[#003D3B] text-white text-[11px] font-bold"
          >
            Mulai
          </Link>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 rounded-full text-[#062E2B] hover:bg-black/5 transition-colors focus:outline-none"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* MOBILE DROPDOWN */}
      {mobileMenuOpen && (
        <div className="lg:hidden pointer-events-auto max-w-md mx-auto mt-2 p-4 rounded-3xl bg-white/95 backdrop-blur-2xl border border-white/80 shadow-[0_20px_50px_rgba(0,61,59,0.2)] flex flex-col gap-2 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-2.5 rounded-2xl text-sm font-semibold text-[#062E2B] hover:bg-[#F5F8F7] hover:text-[#003D3B] transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>
          <div className="pt-3 border-t border-gray-100 flex flex-col gap-2">
            <Link
              to="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-2.5 rounded-xl text-xs font-bold text-[#003D3B] bg-[#F5F8F7]"
            >
              Masuk ke Akun
            </Link>
            <Link
              to="/user/dashboard"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-2.5 rounded-xl text-xs font-bold text-white bg-[#003D3B] shadow-md shadow-[#003D3B]/20"
            >
              Mulai Sekarang
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}