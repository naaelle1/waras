import React from "react";
import { motion } from "framer-motion";
import clsx from "clsx";

export default function Card({
  children,
  className = "",
  hoverEffect = false,
  glass = false,
  onClick
}) {
  const baseClass = "bg-white border border-[#E2ECEB] shadow-xs rounded-2xl p-5 transition-all duration-200";

  if (hoverEffect) {
    return (
      <motion.div
        whileHover={{ y: -3, transition: { duration: 0.15 } }}
        onClick={onClick}
        className={clsx(
          baseClass,
          "hover:border-[#003B3B]/30 hover:shadow-md cursor-pointer",
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
