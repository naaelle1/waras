import React from "react";
import { motion } from "framer-motion";
import { useAccessibility } from "../../context/AccessibilityContext";

const pageVariants = {
  initial: {
    opacity: 0,
    y: 16,
    scale: 0.995,
  },
  enter: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.35,
      ease: [0.25, 0.1, 0.25, 1],
      staggerChildren: 0.06,
      when: "beforeChildren",
    },
  },
  exit: {
    opacity: 0,
    y: -10,
    scale: 0.995,
    transition: {
      duration: 0.2,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

/**
 * PageTransition — wraps page content with smooth fade + slide animation.
 * Use as a direct wrapper around your page content.
 *
 * @param {object} props
 * @param {React.ReactNode} props.children
 * @param {string} [props.className] - Additional class names
 * @param {boolean} [props.fullHeight] - If true, uses h-full + flex (for AI page)
 */
export default function PageTransition({ children, className = "", fullHeight = false }) {
  const { reducedMotion } = useAccessibility();

  if (reducedMotion) {
    return (
      <div className={`${fullHeight ? "h-full flex flex-col overflow-hidden" : "w-full"} ${className}`}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="enter"
      exit="exit"
      className={`${fullHeight ? "h-full flex flex-col overflow-hidden" : "w-full"} ${className}`}
      style={{ willChange: "transform, opacity" }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Stagger child animation variant — use on container elements
 * whose children should animate in sequence.
 */
export const staggerContainer = {
  initial: {},
  enter: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

/**
 * Fade-up animation for individual child elements inside a stagger container.
 */
export const fadeUpItem = {
  initial: { opacity: 0, y: 20 },
  enter: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

/**
 * Scale-in animation for cards and tiles.
 */
export const scaleInItem = {
  initial: { opacity: 0, scale: 0.92 },
  enter: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.35,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

/**
 * Slide-in from left animation.
 */
export const slideInLeft = {
  initial: { opacity: 0, x: -24 },
  enter: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.4,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

/**
 * Slide-in from right animation.
 */
export const slideInRight = {
  initial: { opacity: 0, x: 24 },
  enter: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.4,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

