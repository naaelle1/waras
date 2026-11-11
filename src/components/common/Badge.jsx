import React from "react";
import clsx from "clsx";

export default function Badge({ children, variant = "default", className = "" }) {
  const variantStyles = {
    default: "bg-gray-100 text-[#062F30]",
    Sepi: "bg-emerald-100 text-emerald-800 border border-emerald-200",
    Sedang: "bg-amber-100 text-amber-800 border border-amber-200",
    Ramai: "bg-rose-100 text-rose-800 border border-rose-200",
    teal: "bg-[#DDEEEE] text-[#003B3B]",
    outline: "border border-gray-200 text-[#5F6F70]"
  };

  const selectedVariant = variantStyles[variant] || variantStyles.default;

  return (
    <span
      className={clsx(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold select-none",
        selectedVariant,
        className
      )}
    >
      {children}
    </span>
  );
}