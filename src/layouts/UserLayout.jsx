import React, { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import clsx from "clsx";
import { Menu } from "lucide-react";
import Sidebar from "../components/user/Sidebar";
import Topbar from "../components/user/Topbar";

export default function UserLayout() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const location = useLocation();

  const isAIPage =
    location.pathname === "/user/ai" || location.pathname.startsWith("/user/ai/");

  return (
    <div
      className={clsx(
        "bg-[#F8FAFA] text-[#0D2626] font-inter flex flex-col",
        isAIPage ? "h-screen overflow-hidden" : "min-h-screen"
      )}
    >
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
          "flex-1 flex flex-col transition-all duration-300 ease-in-out",
          isCollapsed ? "lg:pl-25" : "lg:pl-72.5",
          isAIPage
            ? "h-screen overflow-hidden p-0"
            : "min-h-screen px-4 sm:px-6 lg:px-8"
        )}
      >
        {!isAIPage && (
          /* BARIS ATAS KHUSUS MOBILE HAMBURGER & TOPBAR */
          <div className="flex items-center justify-between pt-3">
            <button
              type="button"
              onClick={() => setIsMobileOpen(true)}
              className="lg:hidden p-2 rounded-xl bg-white border border-gray-200 text-[#082C2C] shadow-sm hover:bg-gray-50 cursor-pointer"
              aria-label="Open navigation menu"
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* TOPBAR PERSISTEN DENGAN PROPS EKSISTING */}
            <div className="flex-1">
              <Topbar />
            </div>
          </div>
        )}

        {/* CONTAINER UTAMA HALAMAN */}
        <main
          className={clsx(
            "flex-1 w-full",
            isAIPage ? "h-full overflow-hidden flex" : "max-w-7xl mx-auto pb-12 pt-2"
          )}
        >
          <Outlet context={{ setIsMobileNavOpen: setIsMobileOpen }} />
        </main>
      </div>
    </div>
  );
}
