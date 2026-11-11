import React from "react";
import clsx from "clsx";

export default function Badge({ children, variant = "default", className = "" }) {
  const variantStyles = {
    default: "bg-gray-100 text-[#0D2626]",
    Sepi: "bg-emerald-50 text-emerald-800 border border-emerald-200",
    Sedang: "bg-amber-50 text-amber-800 border border-amber-200",
    Ramai: "bg-rose-50 text-rose-800 border border-rose-200",
    teal: "bg-[#EBF5F5] text-[#003B3B] border border-[#003B3B]/10",
    outline: "border border-[#E2ECEB] text-[#526666]"
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
