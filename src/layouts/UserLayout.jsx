import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import clsx from "clsx";
import { Menu } from "lucide-react";
import Sidebar from "../components/user/Sidebar";
import Topbar from "../components/user/Topbar";

export default function UserLayout() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F7F8F8] text-[#082C2C] font-inter flex flex-col">
      {/* SIDEBAR PERSISTEN DENGAN PROPS EKSISTING */}
      <Sidebar
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
        isMobileOpen={isMobileOpen}
        setIsMobileOpen={setIsMobileOpen}
      />

      {/* WRAPPER MAIN CONTENT */}
      <div
        className={clsx(
          "flex-1 flex flex-col min-h-screen transition-all duration-300 ease-in-out px-4 sm:px-6 lg:px-8",
          isCollapsed ? "lg:pl-25" : "lg:pl-72.5"
        )}
      >
        {/* BARIS ATAS KHUSUS MOBILE HAMBURGER & TOPBAR */}
        <div className="flex items-center justify-between pt-3">
          <button
            type="button"
            onClick={() => setIsMobileOpen(true)}
            className="lg:hidden p-2 rounded-xl bg-white border border-gray-200 text-[#082C2C] shadow-sm hover:bg-gray-50"
            aria-label="Open navigation menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* TOPBAR PERSISTEN DENGAN PROPS EKSISTING */}
          <div className="flex-1">
            <Topbar />
          </div>
        </div>

        {/* CONTAINER UTAMA HALAMAN SCROLLABLE */}
        <main className="flex-1 max-w-7xl w-full mx-auto pb-12 pt-2">
          <Outlet />
        </main>
      </div>
    </div>
  );
}