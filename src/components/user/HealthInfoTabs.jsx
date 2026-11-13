import React from "react";
import { NavLink } from "react-router-dom";
import { BookOpen, Languages, ShieldCheck, Compass } from "lucide-react";
import clsx from "clsx";

export default function HealthInfoTabs() {
  const tabs = [
    {
      name: "Artikel",
      path: "/user/health-info/articles",
      icon: BookOpen,
    },
    {
      name: "Panduan Kesehatan",
      path: "/user/health-info/guides",
      icon: ShieldCheck,
    },
    {
      name: "Istilah Medis",
      path: "/user/health-info/medical-terms",
      icon: Languages,
    },
    {
      name: "Panduan Layanan",
      path: "/user/health-info/services",
      icon: Compass,
    },
  ];

  return (
    <div className="flex items-center gap-1.5 p-1.5 rounded-2xl bg-white/60 backdrop-blur-md border border-white/80 shadow-[0_4px_20px_rgba(2,32,34,0.04)] overflow-x-auto scrollbar-thin">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        return (
          <NavLink
            key={tab.path}
            to={tab.path}
            className={({ isActive }) =>
              clsx(
                "flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-poppins font-medium transition-all duration-200 shrink-0 select-none",
                isActive
                  ? "bg-[#022022] text-[#37F4B4] shadow-sm font-semibold"
                  : "text-[#5F6F70] hover:bg-white/80 hover:text-[#022022]"
              )
            }
          >
            <Icon className="w-4 h-4 shrink-0" />
            <span>{tab.name}</span>
          </NavLink>
        );
      })}
    </div>
  );
}