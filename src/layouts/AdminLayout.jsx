import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import clsx from "clsx";
import { Menu } from "lucide-react";
import AdminSidebar from "../components/admin/AdminSidebar";
import AdminTopbar from "../components/admin/AdminTopbar";
import AnimatedOutlet from "../components/common/AnimatedOutlet";

export default function AdminLayout() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const location = useLocation();

  return (
    <div className="bg-[#F8FAFA] text-[#0D2626] font-inter flex flex-col min-h-screen">
      {/* ADMIN SIDEBAR */}
      <AdminSidebar
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
        isMobileOpen={isMobileOpen}
        setIsMobileOpen={setIsMobileOpen}
      />

      {/* WRAPPER MAIN CONTENT */}
      <div
        className={clsx(
          "flex-1 flex flex-col transition-all duration-300 ease-in-out min-h-screen px-4 sm:px-6 lg:px-8",
          isCollapsed ? "lg:pl-25" : "lg:pl-72.5"
        )}
      >
        {/* BARIS ATAS KHUSUS MOBILE HAMBURGER & TOPBAR */}
        <div className="flex items-center justify-between pt-3">
          <button
            type="button"
            onClick={() => setIsMobileOpen(true)}
            className="lg:hidden p-2 rounded-xl bg-white border border-gray-200 text-[#082C2C] shadow-sm hover:bg-gray-50 cursor-pointer"
            aria-label="Open navigation menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* ADMIN TOPBAR */}
          <div className="flex-1">
            <AdminTopbar />
          </div>
        </div>

        {/* CONTAINER UTAMA HALAMAN */}
        <main className="flex-1 w-full max-w-7xl mx-auto pb-12 pt-2">
          <AnimatedOutlet
            context={{ setIsMobileNavOpen: setIsMobileOpen }}
          />
        </main>
      </div>
    </div>
  );
}
