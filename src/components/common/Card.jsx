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
  const baseClass = glass
    ? "glass-card rounded-2xl p-5"
    : "bg-white border border-[#EDEDED] shadow-sm rounded-2xl p-5";

  if (hoverEffect) {
    return (
      <motion.div
        whileHover={{ y: -4, transition: { duration: 0.2 } }}
        onClick={onClick}
        className={clsx(
          baseClass,
          "transition-shadow hover:shadow-md cursor-pointer",
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