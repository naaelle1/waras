import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import clsx from "clsx";
import { Menu } from "lucide-react";
import Sidebar from "../components/user/Sidebar";
import Topbar from "../components/user/Topbar";
import AnimatedOutlet from "../components/common/AnimatedOutlet";
import LogoutConfirmModal from "../components/common/LogoutConfirmModal";
import { authService } from "../services/authService";

export default function UserLayout() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const location = useLocation();

  const handleConfirmLogout = () => {
    setIsLogoutModalOpen(false);
    authService.logout();
    window.location.replace("/login");
  };

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
        onLogout={() => setIsLogoutModalOpen(true)}
      />

      {/* WRAPPER MAIN CONTENT */}
      <div
        className={clsx(
          "flex-1 flex flex-col transition-all duration-300 ease-in-out min-w-0 overflow-x-hidden",
          isCollapsed ? "lg:pl-25" : "lg:pl-72.5",
          isAIPage
            ? "h-screen overflow-hidden p-0"
            : "min-h-screen px-3 sm:px-6 lg:px-8"
        )}
      >
        {!isAIPage && (
          /* BARIS ATAS KHUSUS MOBILE HAMBURGER & TOPBAR */
          <div className="flex items-center justify-between gap-2 pt-3">
            <button
              type="button"
              onClick={() => setIsMobileOpen(true)}
              className="lg:hidden p-2 rounded-xl bg-white border border-gray-200 text-[#082C2C] shadow-sm hover:bg-gray-50 cursor-pointer shrink-0"
              aria-label="Open navigation menu"
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* TOPBAR PERSISTEN DENGAN PROPS EKSISTING */}
            <div className="flex-1 min-w-0">
              <Topbar onLogout={() => setIsLogoutModalOpen(true)} />
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
          <AnimatedOutlet
            context={{ setIsMobileNavOpen: setIsMobileOpen }}
            disabled={isAIPage}
          />
        </main>
      </div>

      {/* POP-UP MODAL KONFIRMASI LOGOUT */}
      <LogoutConfirmModal
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        onConfirm={handleConfirmLogout}
      />
    </div>
  );
}
