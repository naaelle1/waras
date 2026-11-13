import React from "react";
import clsx from "clsx";

export default function Button({
  children,
  variant = "primary",
  size = "md",
  leftIcon: LeftIcon,
  rightIcon: RightIcon,
  className = "",
  onClick,
  ...props
}) {
  const baseStyles =
    "group inline-flex items-center justify-center font-inter font-medium transition-all duration-200 focus:outline-none rounded-full active:scale-[0.98] cursor-pointer select-none";

  const variants = {
    primary:
      "text-white bg-gradient-to-br from-[#023b3b] via-[#022022] to-[#011414] hover:from-[#034d4d] hover:via-[#033033] hover:to-[#022022] backdrop-blur-md border border-[#022022]/80 hover:border-[#37F4B4]/40 shadow-[inset_0_1px_1px_rgba(255,255,255,0.28),0_6px_16px_rgba(2,32,34,0.16)]",
    secondary:
      "text-[#022022] bg-gradient-to-br from-[#022022]/[0.08] via-teal-50/70 to-white/90 hover:from-[#022022]/[0.14] hover:via-teal-100/70 hover:to-white backdrop-blur-md border border-[#022022]/15 hover:border-[#022022]/30 shadow-[inset_0_1px_1px_rgba(255,255,255,0.9),0_4px_12px_rgba(2,32,34,0.05)]",
    "card-primary":
      "text-white bg-gradient-to-br from-[#023b3b] via-[#022022] to-[#011414] hover:from-[#034d4d] hover:via-[#033033] hover:to-[#022022] backdrop-blur-md border border-[#022022]/80 hover:border-[#37F4B4]/40 shadow-[inset_0_1px_1px_rgba(255,255,255,0.28),0_6px_16px_rgba(2,32,34,0.16)]",
    "card-subtle":
      "text-[#022022] bg-gradient-to-br from-[#022022]/[0.08] via-teal-50/70 to-white/90 hover:from-[#022022]/[0.14] hover:via-teal-100/70 hover:to-white backdrop-blur-md border border-[#022022]/15 hover:border-[#022022]/30 shadow-[inset_0_1px_1px_rgba(255,255,255,0.9),0_4px_12px_rgba(2,32,34,0.05)]",
    "hero-light":
      "text-white bg-gradient-to-br from-white/[0.18] via-white/[0.08] to-white/[0.03] hover:from-white/[0.25] hover:via-white/[0.12] hover:to-white/[0.05] backdrop-blur-md border border-white/25 hover:border-white/40 shadow-[inset_0_1px_1px_rgba(255,255,255,0.32),0_8px_20px_rgba(0,0,0,0.12)]",
    "hero-emerald":
      "text-white bg-gradient-to-br from-teal-300/[0.15] via-[#022022]/60 to-white/[0.03] hover:from-teal-300/[0.22] hover:via-[#033033]/70 hover:to-white/[0.06] backdrop-blur-md border border-teal-200/20 hover:border-teal-200/35 shadow-[inset_0_1px_1px_rgba(255,255,255,0.22),0_8px_20px_rgba(0,0,0,0.12)]",
    outline:
      "text-[#022022] bg-white/70 hover:bg-[#022022]/5 backdrop-blur-md border border-[#022022]/20 hover:border-[#37F4B4]/50 shadow-2xs",
    ghost:
      "text-[#022022] hover:bg-[#022022]/8 backdrop-blur-sm",
    danger: "bg-[#FF5A5A] hover:bg-rose-600 text-white shadow-xs"
  };

  const sizes = {
    sm: "px-3.5 py-1.5 text-xs gap-1.5",
    md: "px-5 py-2.5 text-xs sm:text-sm gap-2",
    lg: "px-6 py-3 text-xs sm:text-sm gap-2.5"
  };

  return (
    <button
      onClick={onClick}
      className={clsx(baseStyles, variants[variant] || variants.primary, sizes[size], className)}
      {...props}
    >
      {LeftIcon && <LeftIcon className="w-4 h-4 shrink-0 transition-transform group-hover:scale-105" />}
      <span>{children}</span>
      {RightIcon && <RightIcon className="w-4 h-4 shrink-0 transition-transform group-hover:scale-105" />}
    </button>
  );
}