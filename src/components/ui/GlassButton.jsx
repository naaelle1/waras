import React from "react";
import { Link } from "react-router-dom";
import clsx from "clsx";

const variantStyles = {
  "hero-light":
    "text-white bg-gradient-to-br from-white/[0.18] via-white/[0.08] to-white/[0.03] hover:from-white/[0.25] hover:via-white/[0.12] hover:to-white/[0.05] backdrop-blur-md border border-white/25 hover:border-white/40 shadow-[inset_0_1px_1px_rgba(255,255,255,0.32),0_8px_20px_rgba(0,0,0,0.12)]",
  "hero-emerald":
    "text-white bg-gradient-to-br from-teal-300/[0.15] via-[#022022]/60 to-white/[0.03] hover:from-teal-300/[0.22] hover:via-[#033033]/70 hover:to-white/[0.06] backdrop-blur-md border border-teal-200/20 hover:border-teal-200/35 shadow-[inset_0_1px_1px_rgba(255,255,255,0.22),0_8px_20px_rgba(0,0,0,0.12)]",
  "card-primary":
    "text-white bg-gradient-to-br from-[#023b3b] via-[#022022] to-[#011414] hover:from-[#034d4d] hover:via-[#033033] hover:to-[#022022] backdrop-blur-md border border-[#022022]/80 hover:border-[#37F4B4]/40 shadow-[inset_0_1px_1px_rgba(255,255,255,0.28),0_6px_16px_rgba(2,32,34,0.16)]",
  "card-subtle":
    "text-[#022022] bg-gradient-to-br from-[#022022]/[0.08] via-teal-50/70 to-white/90 hover:from-[#022022]/[0.14] hover:via-teal-100/70 hover:to-white backdrop-blur-md border border-[#022022]/15 hover:border-[#022022]/30 shadow-[inset_0_1px_1px_rgba(255,255,255,0.9),0_4px_12px_rgba(2,32,34,0.05)]",
};

export function GlassButton({
  variant = "card-primary",
  href,
  to,
  children,
  className = "",
  leftIcon: LeftIcon,
  rightIcon: RightIcon,
  ...props
}) {
  const baseClass = clsx(
    "group inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-xs sm:text-sm font-medium active:scale-[0.98] transition-all duration-200 cursor-pointer select-none font-inter",
    variantStyles[variant] || variantStyles["card-primary"],
    className
  );

  const destination = to || href;

  if (destination) {
    return (
      <Link to={destination} className={baseClass} {...props}>
        {LeftIcon && <LeftIcon className="w-4 h-4 shrink-0 transition-transform group-hover:scale-105" />}
        <span>{children}</span>
        {RightIcon && <RightIcon className="w-4 h-4 shrink-0 transition-transform group-hover:scale-105" />}
      </Link>
    );
  }

  return (
    <button className={baseClass} {...props}>
      {LeftIcon && <LeftIcon className="w-4 h-4 shrink-0 transition-transform group-hover:scale-105" />}
      <span>{children}</span>
      {RightIcon && <RightIcon className="w-4 h-4 shrink-0 transition-transform group-hover:scale-105" />}
    </button>
  );
}

export default GlassButton;
