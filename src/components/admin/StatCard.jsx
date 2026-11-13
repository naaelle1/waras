import React from "react";
import clsx from "clsx";

export default function StatCard({ icon: Icon, label, value, trend, trendUp, className }) {
  return (
    <div
      className={clsx(
        "bg-white border border-[#E2ECEB] rounded-2xl shadow-xs p-6 flex items-start gap-4 transition-all duration-200 hover:shadow-md",
        className
      )}
    >
      <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-[#E6FEFF] text-[#022022] shrink-0">
        {Icon && <Icon className="w-6 h-6" strokeWidth={2} />}
      </div>
      <div className="flex flex-col min-w-0">
        <span className="text-xs font-medium text-[#566E70] tracking-wide uppercase font-inter">
          {label}
        </span>
        <span className="text-2xl font-bold text-[#022022] font-poppins mt-0.5">
          {value}
        </span>
        {trend && (
          <span
            className={clsx(
              "text-xs font-medium mt-1 font-inter",
              trendUp ? "text-emerald-500" : "text-red-400"
            )}
          >
            {trendUp ? "↑" : "↓"} {trend}
          </span>
        )}
      </div>
    </div>
  );
}
