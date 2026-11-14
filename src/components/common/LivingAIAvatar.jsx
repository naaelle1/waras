import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

/**
 * LivingAIAvatar — Komponen Avatar AI Hidup WARAS
 * Terinspirasi dari visual AI living orb dengan dua kapsul "bullet" volume/mata
 * yang berkedip, bernapas, dan merespons suara/status berpikir secara dinamis.
 *
 * @param {string} size - 'xs' (20px), 'sm' (26px), 'md' (36px), 'lg' (52px), 'xl' (72px), '2xl' (96px)
 * @param {string} state - 'idle' | 'thinking' | 'speaking'
 * @param {boolean} showGlow - apakah memancarkan ambient aura glow di belakangnya
 * @param {string} className - kelas css tambahan
 */
export default function LivingAIAvatar({
  size = "md",
  state = "idle",
  showGlow = true,
  className = "",
}) {
  const [isBlinking, setIsBlinking] = useState(false);

  // Siklus kedipan alami mata (antara 3.5 hingga 6 detik)
  useEffect(() => {
    let blinkTimeout;
    const triggerBlink = () => {
      setIsBlinking(true);
      setTimeout(() => {
        setIsBlinking(false);
      }, 150);

      const nextDelay = 3500 + Math.random() * 2500;
      blinkTimeout = setTimeout(triggerBlink, nextDelay);
    };

    blinkTimeout = setTimeout(triggerBlink, 3000);
    return () => clearTimeout(blinkTimeout);
  }, []);

  // Konfigurasi proporsional per ukuran
  const sizeMap = {
    xs: {
      box: "w-5 h-5",
      inner: "w-3.5 h-3.5",
      bulletW: 2,
      bulletH: 6,
      bulletGap: 2.5,
      glowBlur: "blur-[4px]",
    },
    sm: {
      box: "w-[26px] h-[26px]",
      inner: "w-[18px] h-[18px]",
      bulletW: 2.5,
      bulletH: 8,
      bulletGap: 3,
      glowBlur: "blur-[6px]",
    },
    md: {
      box: "w-9 h-9",
      inner: "w-6 h-6",
      bulletW: 3.5,
      bulletH: 11,
      bulletGap: 4,
      glowBlur: "blur-[8px]",
    },
    lg: {
      box: "w-[52px] h-[52px]",
      inner: "w-[36px] h-[36px]",
      bulletW: 4.5,
      bulletH: 16,
      bulletGap: 6,
      glowBlur: "blur-[12px]",
    },
    xl: {
      box: "w-[72px] h-[72px]",
      inner: "w-[50px] h-[50px]",
      bulletW: 6,
      bulletH: 22,
      bulletGap: 8,
      glowBlur: "blur-[16px]",
    },
    "2xl": {
      box: "w-24 h-24",
      inner: "w-16 h-16",
      bulletW: 8,
      bulletH: 30,
      bulletGap: 10,
      glowBlur: "blur-[20px]",
    },
  };

  const currentSize = sizeMap[size] || sizeMap.md;

  // Kecepatan putaran aura sesuai status
  const spinDuration =
    state === "thinking" ? 2.5 : state === "speaking" ? 3.5 : 6;

  // Variasi animasi kedua bullet volume/mata
  const isThinking = state === "thinking";
  const isSpeaking = state === "speaking";

  // Animasi Bullet Kiri
  const leftBulletAnimate = isBlinking
    ? { scaleY: 0.12, opacity: 0.9 }
    : isThinking
    ? {
        scaleY: [0.6, 1.45, 0.7, 1.3, 0.6],
        y: [1, -2, 0.5, -1.5, 1],
      }
    : isSpeaking
    ? {
        scaleY: [0.8, 1.5, 0.7, 1.35, 0.8],
        y: [0.5, -2, 0, -1.5, 0.5],
      }
    : {
        scaleY: [1, 1.15, 0.95, 1],
        y: [0, -0.6, 0.4, 0],
      };

  // Animasi Bullet Kanan (sedikit asinkron agar terasa seperti volume gelombang organik)
  const rightBulletAnimate = isBlinking
    ? { scaleY: 0.12, opacity: 0.9 }
    : isThinking
    ? {
        scaleY: [1.35, 0.65, 1.4, 0.55, 1.35],
        y: [-1.5, 1, -2, 0.5, -1.5],
      }
    : isSpeaking
    ? {
        scaleY: [1.4, 0.7, 1.45, 0.75, 1.4],
        y: [-1.8, 0.5, -2, 0, -1.8],
      }
    : {
        scaleY: [1, 0.95, 1.15, 1],
        y: [0, 0.4, -0.6, 0],
      };

  const bulletTransition = isBlinking
    ? { duration: 0.12, ease: "easeInOut" }
    : isThinking
    ? { repeat: Infinity, duration: 0.85, ease: "easeInOut" }
    : isSpeaking
    ? { repeat: Infinity, duration: 0.65, ease: "easeInOut" }
    : { repeat: Infinity, duration: 2.8, ease: "easeInOut" };

  return (
    <div
      className={`relative inline-flex items-center justify-center select-none shrink-0 ${currentSize.box} ${className}`}
      aria-label="WARAS AI Living Avatar"
    >
      {/* ── 1. AMBIENT BLOOM GLOW DI BELAKANG ORB (WARAS PALETTE) ── */}
      {showGlow && (
        <motion.div
          animate={{
            scale: isThinking ? [0.95, 1.15, 0.95] : [0.96, 1.05, 0.96],
            opacity: isThinking ? [0.65, 0.95, 0.65] : [0.45, 0.65, 0.45],
          }}
          transition={{
            repeat: Infinity,
            duration: isThinking ? 1.5 : 3,
            ease: "easeInOut",
          }}
          className={`absolute inset-[-15%] rounded-full pointer-events-none ${currentSize.glowBlur}`}
          style={{
            background:
              "radial-gradient(circle, rgba(55,244,180,0.65) 0%, rgba(0,240,255,0.45) 35%, rgba(2,32,34,0.2) 70%, transparent 85%)",
          }}
        />
      )}

      {/* ── 2. LAPISAN AURA CHROMATIC BERPUTAR UTAMA (WARAS THEME) ── */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: spinDuration, ease: "linear" }}
        className="absolute inset-0 rounded-full"
        style={{
          background:
            "conic-gradient(from 0deg, #37F4B4 0%, #00F0FF 25%, #E6FEFF 45%, #10B981 65%, #022022 85%, #37F4B4 100%)",
        }}
      />

      {/* ── 3. LAPISAN AURA COUNTER-ROTATING (EFEK LIQUID/PLASMA MORPH) ── */}
      <motion.div
        animate={{
          rotate: -360,
          scale: [0.98, 1.04, 0.98],
        }}
        transition={{
          rotate: { repeat: Infinity, duration: spinDuration * 1.35, ease: "linear" },
          scale: { repeat: Infinity, duration: 2.2, ease: "easeInOut" },
        }}
        className="absolute inset-0 rounded-full opacity-70 mix-blend-screen"
        style={{
          background:
            "conic-gradient(from 180deg, #00F0FF 0%, #37F4B4 30%, #0D2626 55%, #E6FEFF 75%, #059669 90%, #00F0FF 100%)",
        }}
      />

      {/* ── 4. SOFT RIM GLOW / SPECULAR RING ── */}
      <div
        className="absolute inset-[3%] rounded-full opacity-90"
        style={{
          boxShadow:
            "inset 0 0 5px rgba(55,244,180,0.85), inset 0 0 10px rgba(0,240,255,0.5), 0 0 6px rgba(55,244,180,0.3)",
        }}
      />

      {/* ── 5. INNER DARK SPHERICAL CORE DENGAN TEAL/AURORA DEPTH ── */}
      <div
        className={`relative z-10 rounded-full flex items-center justify-center ${currentSize.inner} shadow-[inset_0_2px_4px_rgba(0,0,0,0.8)]`}
        style={{
          background:
            "radial-gradient(circle at 50% 35%, #032A2D 0%, #022022 65%, #011416 100%)",
        }}
      >
        {/* Soft radial inner glow */}
        <div
          className="absolute inset-0 rounded-full opacity-60 pointer-events-none"
          style={{
            background:
              "radial-gradient(circle at 50% 50%, rgba(55,244,180,0.3) 0%, transparent 70%)",
          }}
        />

        {/* ── 6. DUA BULLET VOLUME/MATA DI TENGAH (THE LIVING BULLETS) ── */}
        <div
          className="relative z-20 flex items-center justify-center"
          style={{ gap: `${currentSize.bulletGap}px` }}
        >
          {/* Bullet Kiri */}
          <motion.div
            animate={leftBulletAnimate}
            transition={bulletTransition}
            className="rounded-full bg-white shadow-[0_0_6px_rgba(255,255,255,0.95),0_0_12px_rgba(55,244,180,0.85)]"
            style={{
              width: `${currentSize.bulletW}px`,
              height: `${currentSize.bulletH}px`,
            }}
          />

          {/* Bullet Kanan */}
          <motion.div
            animate={rightBulletAnimate}
            transition={bulletTransition}
            className="rounded-full bg-white shadow-[0_0_6px_rgba(255,255,255,0.95),0_0_12px_rgba(0,240,255,0.85)]"
            style={{
              width: `${currentSize.bulletW}px`,
              height: `${currentSize.bulletH}px`,
            }}
          />
        </div>
      </div>
    </div>
  );
}
