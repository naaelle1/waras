import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import {
  House,
  MapPin,
  Clock,
  Bot,
  BookOpen,
  ArrowRight,
  Menu,
  X,
  ShieldCheck,
  Sparkles,
  LogIn
} from "lucide-react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 30);
  });

  const navLinks = [
    { name: "Beranda", href: "#hero" },
    { name: "Fitur", href: "#features" },
    { name: "Cara Kerja", href: "#how-it-works" },
    { name: "Antrean & Faskes", href: "#faskes" },
    { name: "WARAS AI", href: "#ai" },
    { name: "Tentang", href: "#about" },
  ];

  const handleNavClick = (e, href) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      const el = document.querySelector(href);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
        setMobileMenuOpen(false);
      }
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 sm:px-6 pt-3 sm:pt-4 transition-all duration-300">
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`w-full max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 py-2.5 sm:py-3 rounded-2xl transition-all duration-300 ${
          isScrolled
            ? "bg-white/90 backdrop-blur-md border border-[#E2ECEB] shadow-sm"
            : "bg-white/70 backdrop-blur-xs border border-white/80 shadow-2xs"
        }`}
      >
        {/* LOGO & BRAND */}
        <Link to="/" className="flex items-center gap-2.5 group select-none">
          <div className="w-9 h-9 rounded-xl bg-[#003B3B] text-white flex items-center justify-center font-bold text-base shadow-xs group-hover:scale-105 transition-transform">
            W
          </div>
          <div className="flex flex-col">
            <span className="font-poppins font-extrabold text-lg tracking-tight text-[#003B3B] leading-none">
              waras
            </span>
            <span className="text-[9px] font-semibold tracking-[0.16em] text-[#526666] uppercase mt-0.5">
              SEMARANG HEALTH
            </span>
          </div>
        </Link>

        {/* DESKTOP NAV LINKS */}
        <div className="hidden lg:flex items-center gap-1 bg-[#F8FAFA] p-1 rounded-xl border border-[#E2ECEB]">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="px-3.5 py-1.5 rounded-lg text-xs font-semibold text-[#526666] hover:text-[#003B3B] hover:bg-white transition-all cursor-pointer select-none"
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* ACTIONS */}
        <div className="hidden sm:flex items-center gap-2.5">
          <Link
            to="/login"
            className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-[#003B3B] hover:bg-[#EBF5F5] transition-colors min-h-[44px]"
          >
            <LogIn className="w-3.5 h-3.5" />
            <span>Masuk</span>
          </Link>

          <Link
            to="/user/dashboard"
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#003B3B] hover:bg-[#002D2D] text-white text-xs font-semibold shadow-xs hover:shadow transition-all duration-200 active:scale-95 min-h-[44px]"
          >
            <span>Buka Dashboard</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* MOBILE MENU TOGGLE */}
        <div className="flex sm:hidden items-center gap-2">
          <Link
            to="/login"
            className="p-2.5 rounded-xl text-xs font-semibold text-[#003B3B] hover:bg-[#EBF5F5] min-h-[44px] min-w-[44px] flex items-center justify-center"
          >
            Masuk
          </Link>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2.5 rounded-xl bg-[#F8FAFA] text-[#003B3B] border border-[#E2ECEB] min-h-[44px] min-w-[44px] flex items-center justify-center"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </motion.nav>

      {/* MOBILE EXPANDED MENU */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="lg:hidden fixed top-20 left-4 right-4 bg-white rounded-2xl border border-[#E2ECEB] p-5 shadow-xl space-y-4 z-50"
        >
          <div className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="px-3 py-2.5 rounded-xl text-sm font-semibold text-[#0D2626] hover:bg-[#EBF5F5] hover:text-[#003B3B] transition-colors min-h-[44px] flex items-center"
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="pt-3 border-t border-gray-100 flex flex-col gap-2">
            <Link
              to="/user/dashboard"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#003B3B] text-white text-sm font-semibold shadow-xs"
            >
              <span>Buka Dashboard Warga</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>
      )}
    </header>
  );
}

