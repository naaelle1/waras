import React, { useState, useEffect } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import clsx from "clsx";
import {
  House,
  Users,
  Hospital,
  FileText,
  ListOrdered,
  Flag,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";

const MAIN_NAV_ITEMS = [
  {
    name: "Dashboard",
    path: "/admin/dashboard",
    icon: House,
  },
  {
    name: "Kelola Pengguna",
    path: "/admin/users",
    icon: Users,
  },
  {
    name: "Kelola Faskes",
    path: "/admin/facilities",
    icon: Hospital,
  },
  {
    name: "Kelola Artikel",
    path: "/admin/articles",
    icon: FileText,
  },
  {
    name: "Kelola Antrean",
    path: "/admin/queues",
    icon: ListOrdered,
  },
  {
    name: "Laporan Masuk",
    path: "/admin/reports",
    icon: Flag,
  },
];

const SETTINGS_NAV_ITEMS = [
  {
    name: "Pengaturan",
    path: "/admin/settings",
    icon: Settings,
  },
];

export default function AdminSidebar({
  isCollapsed = false,
  setIsCollapsed = () => {},
  isMobileOpen = false,
  setIsMobileOpen = () => {},
  onLogout,
}) {
  const navigate = useNavigate();
  const location = useLocation();

  const LOGO_SRC = "/images/logo/waraslogo.svg";

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    } else {
      console.log("Admin logged out");
      navigate("/login");
    }
  };

  const handleNavClick = () => {
    if (isMobileOpen) {
      setIsMobileOpen(false);
    }
  };

  return (
    <>
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300"
          onClick={() => setIsMobileOpen(false)}
          aria-hidden="true"
        />
      )}

      <aside
        className={clsx(
          "fixed top-3 bottom-3 z-50 flex flex-col transition-all duration-300 ease-in-out font-inter",
          "bg-white border border-[#E2ECEB] shadow-xs rounded-2xl",
          isMobileOpen ? "left-3 right-auto" : "-left-full lg:left-3",
          isCollapsed ? "w-19" : "w-67.5"
        )}
      >
        <button
          type="button"
          onClick={() => setIsMobileOpen(false)}
          className="lg:hidden absolute top-4 right-4 p-1.5 rounded-lg text-[#5F6F70] hover:bg-gray-100"
          aria-label="Close sidebar"
        >
          <X className="w-5 h-5" />
        </button>

        <button
          type="button"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className={clsx(
            "hidden lg:flex absolute -right-3.5 top-6 z-20 h-7 w-7 items-center justify-center rounded-full",
            "bg-[#022022] text-white shadow-md hover:bg-[#033033] transition-all duration-200 focus:outline-none"
          )}
          aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {isCollapsed ? (
            <ChevronRight className="w-4 h-4" />
          ) : (
            <ChevronLeft className="w-4 h-4" />
          )}
        </button>

        <div className="pt-6 pb-4 px-5 flex flex-col items-start min-h-22 justify-center">
          {isCollapsed ? (
            <div className="w-full flex justify-center">
              <img
                src={LOGO_SRC}
                alt="WARAS"
                className="h-7 w-auto object-contain"
                onError={(e) => {
                  e.target.style.display = "none";
                  e.target.nextSibling.style.display = "flex";
                }}
              />
              <span className="hidden h-8 w-8 rounded-lg bg-[#022022] text-white font-bold text-lg items-center justify-center">
                W
              </span>
            </div>
          ) : (
            <div className="flex flex-col items-start">
              <img
                src={LOGO_SRC}
                alt="WARAS"
                className="h-8 w-auto object-contain mb-1"
                onError={(e) => {
                  e.target.style.display = "none";
                  e.target.nextSibling.style.display = "block";
                }}
              />
              <span className="hidden font-bold text-2xl tracking-wide text-[#022022] font-poppins">
                waras
              </span>
              <span className="text-[10px] font-semibold tracking-[0.18em] text-[#5F6F70] uppercase mt-0.5 font-inter">
                HEALTHCARE PLATFORM
              </span>
              <span className="mt-1 inline-flex items-center px-2 py-0.5 rounded-md bg-[#022022] text-[#37F4B4] text-[9px] font-bold tracking-wider uppercase">
                ADMIN PANEL
              </span>
            </div>
          )}
        </div>

        <div className="px-5 my-1">
          <div className="h-px w-full bg-[#DDE5E5]" />
        </div>

        <div className="flex-1 overflow-y-auto px-3.5 py-2 space-y-5 scrollbar-thin">
          <div>
            {!isCollapsed && (
              <h3 className="px-3 mb-2 text-[10px] font-bold tracking-wider text-[#5F6F70] uppercase font-poppins">
                MAIN
              </h3>
            )}
            <nav className="space-y-1">
              {MAIN_NAV_ITEMS.map((item) => {
                const Icon = item.icon;

                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    onClick={handleNavClick}
                    title={isCollapsed ? item.name : undefined}
                    className={({ isActive }) =>
                      clsx(
                        "group relative flex items-center h-11 px-3.5 rounded-xl font-medium text-sm transition-all duration-200 select-none",
                        isActive
                          ? "bg-[#022022] text-white shadow-sm font-semibold"
                          : "text-[#5F6F70] hover:bg-[#022022]/6 hover:text-[#022022]"
                      )
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <div className="flex items-center justify-center min-w-5.5">
                          <Icon
                            className={clsx(
                              "w-5 h-5 transition-colors duration-200",
                              isActive
                                ? "text-white"
                                : "text-[#5F6F70] group-hover:text-[#022022]"
                            )}
                            strokeWidth={2}
                          />
                        </div>

                        {!isCollapsed && (
                          <span className="ml-3 truncate tracking-tight text-[14px]">
                            {item.name}
                          </span>
                        )}

                        {isCollapsed && (
                          <div className="absolute left-full ml-3 px-2.5 py-1 bg-[#022022] text-white text-xs font-medium rounded-md whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-150 z-50 shadow-lg">
                            {item.name}
                          </div>
                        )}
                      </>
                    )}
                  </NavLink>
                );
              })}
            </nav>
          </div>

          <div className="px-1.5">
            <div className="h-px w-full bg-[#DDE5E5]" />
          </div>

          <div>
            {!isCollapsed && (
              <h3 className="px-3 mb-2 text-[10px] font-bold tracking-wider text-[#5F6F70] uppercase font-poppins">
                SETTINGS
              </h3>
            )}
            <nav className="space-y-1">
              {SETTINGS_NAV_ITEMS.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    onClick={handleNavClick}
                    title={isCollapsed ? item.name : undefined}
                    className={({ isActive }) =>
                      clsx(
                        "group relative flex items-center h-11 px-3.5 rounded-xl font-medium text-sm transition-all duration-200 select-none",
                        isActive
                          ? "bg-[#022022] text-white shadow-sm font-semibold"
                          : "text-[#5F6F70] hover:bg-[#022022]/6 hover:text-[#022022]"
                      )
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <div className="flex items-center justify-center min-w-5.5">
                          <Icon
                            className={clsx(
                              "w-5 h-5 transition-colors duration-200",
                              isActive
                                ? "text-white"
                                : "text-[#5F6F70] group-hover:text-[#022022]"
                            )}
                            strokeWidth={2}
                          />
                        </div>

                        {!isCollapsed && (
                          <span className="ml-3 truncate tracking-tight text-[14px]">
                            {item.name}
                          </span>
                        )}

                        {isCollapsed && (
                          <div className="absolute left-full ml-3 px-2.5 py-1 bg-[#022022] text-white text-xs font-medium rounded-md whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-150 z-50 shadow-lg">
                            {item.name}
                          </div>
                        )}
                      </>
                    )}
                  </NavLink>
                );
              })}
            </nav>
          </div>
        </div>

        <div className="mt-auto p-3.5 pt-2 border-t border-transparent space-y-1">
          <button
            type="button"
            onClick={handleLogout}
            title={isCollapsed ? "Logout Account" : undefined}
            className="group relative w-full flex items-center h-11 px-3.5 rounded-xl font-medium text-sm text-[#FF5A5A] hover:bg-[#FF5A5A]/8 transition-all duration-200 select-none"
          >
            <div className="flex items-center justify-center min-w-5.5">
              <LogOut className="w-5 h-5 text-[#FF5A5A]" strokeWidth={2} />
            </div>
            {!isCollapsed && (
              <span className="ml-3 truncate font-medium text-[14px]">
                Logout Account
              </span>
            )}
            {isCollapsed && (
              <div className="absolute left-full ml-3 px-2.5 py-1 bg-[#FF5A5A] text-white text-xs font-medium rounded-md whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-150 z-50 shadow-lg">
                Logout Account
              </div>
            )}
          </button>
        </div>
      </aside>
    </>
  );
}
