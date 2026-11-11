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
    "inline-flex items-center justify-center font-semibold transition-all duration-200 focus:outline-none rounded-xl active:scale-[0.98] cursor-pointer select-none";

  const variants = {
    primary: "bg-[#003B3B] hover:bg-[#004D4D] text-white shadow-sm hover:shadow",
    secondary: "bg-[#DDEEEE] hover:bg-[#cbe3e3] text-[#003B3B]",
    outline: "border border-[#003B3B]/20 text-[#003B3B] hover:bg-[#003B3B]/5",
    ghost: "text-[#003B3B] hover:bg-[#003B3B]/8",
    danger: "bg-[#FF5A5A] hover:bg-rose-600 text-white"
  };

  const sizes = {
    sm: "px-3 py-1.5 text-xs gap-1.5",
    md: "px-4 py-2 text-sm gap-2",
    lg: "px-5 py-2.5 text-base gap-2.5"
  };

  return (
    <button
      onClick={onClick}
      className={clsx(baseStyles, variants[variant], sizes[size], className)}
      {...props}
    >
      {LeftIcon && <LeftIcon className="w-4 h-4 shrink-0" />}
      <span>{children}</span>
      {RightIcon && <RightIcon className="w-4 h-4 shrink-0" />}
    </button>
  );
}