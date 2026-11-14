import React from "react";
import { motion } from "framer-motion";
import clsx from "clsx";
import { useAccessibility } from "../../context/AccessibilityContext";

export default function Card({
  children,
  className = "",
  hoverEffect = false,
  glass = false,
  onClick
}) {
  const { reducedMotion } = useAccessibility();
  const baseClass = "bg-white border border-[#E2ECEB] shadow-xs rounded-2xl p-5 transition-all duration-200";

  if (hoverEffect) {
    return (
      <motion.div
        whileHover={reducedMotion ? undefined : { y: -3, transition: { duration: 0.15 } }}
        onClick={onClick}
        className={clsx(
          baseClass,
          reducedMotion ? "hover:border-[#022022]/30 cursor-pointer" : "hover:border-[#022022]/30 hover:shadow-md cursor-pointer",
          className
        )}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <div onClick={onClick} className={clsx(baseClass, className)}>
      {children}
    </div>
  );
}
