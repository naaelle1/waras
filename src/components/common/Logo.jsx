import React from "react";

export const LOGO_SRC = "/images/logo/waraslogo.svg";

/**
 * Logo resmi WARAS.
 * - tone="dark"  : warna asli (untuk latar terang)
 * - tone="light" : versi putih (untuk latar gelap/teal)
 */
export default function Logo({ tone = "dark", className = "h-8", alt = "WARAS" }) {
  return (
    <img
      src={LOGO_SRC}
      alt={alt}
      draggable={false}
      className={`w-auto object-contain select-none ${
        tone === "light" ? "brightness-0 invert" : ""
      } ${className}`}
    />
  );
}

