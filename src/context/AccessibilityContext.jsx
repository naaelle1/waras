import React, { createContext, useContext, useState, useEffect } from "react";

const AccessibilityContext = createContext(null);

const STORAGE_KEY_REDUCED_MOTION = "waras_accessibility_reduced_motion";
const STORAGE_KEY_HIGH_CONTRAST = "waras_accessibility_high_contrast";

export function AccessibilityProvider({ children }) {
  const [reducedMotion, setReducedMotionState] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_REDUCED_MOTION);
      if (saved !== null) return saved === "true";
      // Fallback ke preferensi sistem peramban jika belum pernah diatur
      return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    } catch {
      return false;
    }
  });

  const [highContrast, setHighContrastState] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_HIGH_CONTRAST);
      return saved === "true";
    } catch {
      return false;
    }
  });

  // Terapkan kelas reduced motion ke documentElement
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_REDUCED_MOTION, String(reducedMotion));
      if (reducedMotion) {
        document.documentElement.classList.add("waras-reduced-motion");
        document.documentElement.setAttribute("data-reduced-motion", "true");
      } else {
        document.documentElement.classList.remove("waras-reduced-motion");
        document.documentElement.removeAttribute("data-reduced-motion");
      }
    } catch (e) {
      console.warn("Gagal menyimpan preferensi reduced motion:", e);
    }
  }, [reducedMotion]);

  // Terapkan kelas high contrast ke documentElement
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_HIGH_CONTRAST, String(highContrast));
      if (highContrast) {
        document.documentElement.classList.add("waras-high-contrast");
        document.documentElement.setAttribute("data-high-contrast", "true");
      } else {
        document.documentElement.classList.remove("waras-high-contrast");
        document.documentElement.removeAttribute("data-high-contrast");
      }
    } catch (e) {
      console.warn("Gagal menyimpan preferensi high contrast:", e);
    }
  }, [highContrast]);

  const toggleReducedMotion = () => setReducedMotionState((prev) => !prev);
  const toggleHighContrast = () => setHighContrastState((prev) => !prev);

  const setReducedMotion = (val) => setReducedMotionState(Boolean(val));
  const setHighContrast = (val) => setHighContrastState(Boolean(val));

  const value = {
    reducedMotion,
    highContrast,
    toggleReducedMotion,
    toggleHighContrast,
    setReducedMotion,
    setHighContrast,
  };

  return (
    <AccessibilityContext.Provider value={value}>
      {children}
    </AccessibilityContext.Provider>
  );
}

export function useAccessibility() {
  const context = useContext(AccessibilityContext);
  if (!context) {
    return {
      reducedMotion: false,
      highContrast: false,
      toggleReducedMotion: () => {},
      toggleHighContrast: () => {},
      setReducedMotion: () => {},
      setHighContrast: () => {},
    };
  }
  return context;
}
