import React, { useState, useEffect } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import clsx from "clsx";
import {
  House,
  MapPin,
  Bot,
  BookOpen,
  Flag,
  Settings,
  CircleHelp,
  LogOut,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  X,
} from "lucide-react";

const MAIN_NAV_ITEMS = [
  {
    name: "Dashboard",
    path: "/user/dashboard",
    icon: House,
  },
  {
    name: "Fasilitas Kesehatan",
    path: "/user/facilities",
    icon: MapPin,
  },
  {
    name: "AI",
    path: "/user/ai",
    icon: Bot,
  },
  {
    name: "Info Kesehatan",
    path: "/user/health-info",
    icon: BookOpen,
    subItems: [
      { name: "Artikel", path: "/user/health-info/articles" },
      { name: "Panduan Kesehatan", path: "/user/health-info/guides" },
      { name: "Istilah Medis", path: "/user/health-info/terms" },
      { name: "Panduan Layanan", path: "/user/health-info/services" },
    ],
  },
  {
    name: "Laporkan Kesalahan",
    path: "/user/report-problem",
    icon: Flag,
  },
];

const SETTINGS_NAV_ITEMS = [
  {
    name: "Settings",
    path: "/user/settings",
    icon: Settings,
    trailingIcon: ChevronDown,
  },
];

export default function Sidebar({
  isCollapsed = false,
  setIsCollapsed = () => {},
  isMobileOpen = false,
  setIsMobileOpen = () => {},
  onLogout,
}) {
  const navigate = useNavigate();
  const location = useLocation();

  const [openDropdowns, setOpenDropdowns] = useState({
    "Info Kesehatan": false,
  });

  const LOGO_SRC = "/images/logo/waraslogo.svg";

  useEffect(() => {
    MAIN_NAV_ITEMS.forEach((item) => {
      if (item.subItems) {
        const isChildActive = item.subItems.some((sub) =>
          location.pathname.startsWith(sub.path)
        );
        if (isChildActive) {
          setOpenDropdowns((prev) => ({ ...prev, [item.name]: true }));
        }
      }
    });
  }, [location.pathname]);

  const toggleDropdown = (name) => {
    setOpenDropdowns((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    } else {
      console.log("User logged out");
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
      {/* MOBILE BACKDROP OVERLAY */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300"
          onClick={() => setIsMobileOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* SIDEBAR PANEL */}
      <aside
        className={clsx(
          "fixed top-3 bottom-3 z-50 flex flex-col transition-all duration-300 ease-in-out select-none",
          "bg-white/95 backdrop-blur-md border border-white/80 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-2xl",
          isMobileOpen ? "left-3 right-auto" : "-left-full lg:left-3",
          isCollapsed ? "w-19" : "w-67.5"
        )}
      >
        {/* Mobile Close Button */}
        <button
          type="button"
          onClick={() => setIsMobileOpen(false)}
          className="lg:hidden absolute top-4 right-4 p-1.5 rounded-lg text-[#5F6F70] hover:bg-gray-100"
          aria-label="Tutup sidebar"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Desktop Collapse Toggle */}
        <button
          type="button"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className={clsx(
            "hidden lg:flex absolute -right-3.5 top-6 z-20 h-7 w-7 items-center justify-center rounded-full",
            "bg-[#002B2B] text-white shadow-md hover:bg-[#063B3B] transition-all duration-200 focus:outline-none"
          )}
          aria-label={isCollapsed ? "Buka sidebar" : "Tutup sidebar"}
        >
          {isCollapsed ? (
            <ChevronRight className="w-4 h-4" />
          ) : (
            <ChevronLeft className="w-4 h-4" />
          )}
        </button>

        {/* BRAND SECTION */}
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
              <span className="hidden h-8 w-8 rounded-lg bg-[#002B2B] text-white font-bold text-lg items-center justify-center">
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
              <span className="hidden font-bold text-2xl tracking-wide text-[#062D2D]">
                waras
              </span>
              <span className="text-[10px] font-semibold tracking-[0.18em] text-[#062D2D] uppercase mt-0.5">
                HEALTHCARE PLATFORM
              </span>
            </div>
          )}
        </div>

        {/* Top Divider */}
        <div className="px-5 my-1">
          <div className="h-px w-full bg-[#DDE5E5]" />
        </div>

        {/* NAVIGATION BODY */}
        <div className="flex-1 overflow-y-auto px-3.5 py-2 space-y-5 scrollbar-thin">
          {/* MAIN SECTION */}
          <div>
            {!isCollapsed && (
              <h3 className="px-3 mb-2 text-[10px] font-bold tracking-wider text-[#5F6F70] uppercase">
                MAIN
              </h3>
            )}
            <nav className="space-y-1">
              {MAIN_NAV_ITEMS.map((item) => {
                const Icon = item.icon;
                const hasSubItems = Boolean(item.subItems?.length);
                const isDropdownOpen = Boolean(openDropdowns[item.name]);

                const isParentRouteActive = location.pathname === item.path;
                const isChildActive = item.subItems?.some(
                  (sub) => location.pathname === sub.path
                );
                const isHeaderActive = isParentRouteActive || isChildActive;

                if (hasSubItems) {
                  return (
                    <div key={item.name} className="space-y-1">
                      <button
                        type="button"
                        onClick={() => {
                          if (isCollapsed) setIsCollapsed(false);
                          toggleDropdown(item.name);
                        }}
                        className={clsx(
                          "w-full group relative flex items-center h-11 px-3.5 rounded-xl font-medium text-sm transition-all duration-200 select-none",
                          isHeaderActive
                            ? "bg-[#002B2B] text-white shadow-sm font-semibold"
                            : "text-[#062D2D] hover:bg-[#002B2B]/5"
                        )}
                      >
                        <div className="flex items-center justify-center min-w-5.5">
                          <Icon
                            className={clsx(
                              "w-5 h-5 transition-colors duration-200",
                              isHeaderActive
                                ? "text-white"
                                : "text-[#5F6F70] group-hover:text-[#062D2D]"
                            )}
                            strokeWidth={2}
                          />
                        </div>

                        {!isCollapsed && (
                          <>
                            <span className="ml-3 truncate tracking-tight text-[14px]">
                              {item.name}
                            </span>
                            {isDropdownOpen ? (
                              <ChevronUp className="ml-auto w-4 h-4 text-current opacity-90" />
                            ) : (
                              <ChevronDown className="ml-auto w-4 h-4 text-current opacity-90" />
                            )}
                          </>
                        )}
                      </button>

                      {/* Sub-items */}
                      {!isCollapsed && isDropdownOpen && (
                        <div className="pt-1 pb-1 ml-5 pl-2 space-y-1">
                          {item.subItems.map((sub, index) => {
                            const isLast = index === item.subItems.length - 1;

                            return (
                              <NavLink
                                key={sub.path}
                                to={sub.path}
                                onClick={handleNavClick}
                                className={({ isActive }) =>
                                  clsx(
                                    "relative flex items-center h-10 pl-4 pr-3.5 rounded-xl text-[14px] font-medium transition-all duration-200 select-none",
                                    isActive
                                      ? "bg-[#002B2B] text-white font-semibold shadow-sm"
                                      : "text-[#062D2D] hover:bg-[#002B2B]/5"
                                  )
                                }
                              >
                                <span className="absolute -left-2.5 top-0 bottom-1/2 w-3.5 border-l-2 border-b-2 border-[#062D2D] rounded-bl-xl pointer-events-none" />
                                {!isLast && (
                                  <span className="absolute -left-2.5 top-1/2 bottom-0 border-l-2 border-[#062D2D] pointer-events-none" />
                                )}
                                <span className="truncate">{sub.name}</span>
                              </NavLink>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                }

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
                          ? "bg-[#002B2B] text-white shadow-sm font-semibold"
                          : "text-[#5F6F70] hover:bg-[#002B2B]/5 hover:text-[#062D2D]"
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
                                : "text-[#5F6F70] group-hover:text-[#062D2D]"
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
                          <div className="absolute left-full ml-3 px-2.5 py-1 bg-[#062D2D] text-white text-xs font-medium rounded-md whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-150 z-50 shadow-lg">
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

          {/* Section Divider */}
          <div className="px-1.5">
            <div className="h-px w-full bg-[#DDE5E5]" />
          </div>

          {/* SETTINGS SECTION */}
          <div>
            {!isCollapsed && (
              <h3 className="px-3 mb-2 text-[10px] font-bold tracking-wider text-[#5F6F70] uppercase">
                SETTINGS
              </h3>
            )}
            <nav className="space-y-1">
              {SETTINGS_NAV_ITEMS.map((item) => {
                const Icon = item.icon;
                const TrailingIcon = item.trailingIcon;
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
                          ? "bg-[#002B2B] text-white shadow-sm font-semibold"
                          : "text-[#5F6F70] hover:bg-[#002B2B]/5 hover:text-[#062D2D]"
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
                                : "text-[#5F6F70] group-hover:text-[#062D2D]"
                            )}
                            strokeWidth={2}
                          />
                        </div>

                        {!isCollapsed && (
                          <span className="ml-3 truncate tracking-tight text-[14px]">
                            {item.name}
                          </span>
                        )}

                        {!isCollapsed && TrailingIcon && (
                          <TrailingIcon className="ml-auto w-4 h-4 text-current opacity-75" />
                        )}

                        {isCollapsed && (
                          <div className="absolute left-full ml-3 px-2.5 py-1 bg-[#062D2D] text-white text-xs font-medium rounded-md whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-150 z-50 shadow-lg">
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

        {/* BOTTOM SECTION */}
        <div className="mt-auto p-3.5 pt-2 border-t border-transparent space-y-1">
          <NavLink
            to="/user/help"
            onClick={handleNavClick}
            title={isCollapsed ? "Help" : undefined}
            className={({ isActive }) =>
              clsx(
                "group relative flex items-center h-11 px-3.5 rounded-xl font-medium text-sm transition-all duration-200 select-none",
                isActive
                  ? "bg-[#002B2B] text-white font-semibold"
                  : "text-[#5F6F70] hover:bg-[#002B2B]/5 hover:text-[#062D2D]"
              )
            }
          >
            {({ isActive }) => (
              <>
                <div className="flex items-center justify-center min-w-5.5">
                  <CircleHelp
                    className={clsx(
                      "w-5 h-5",
                      isActive ? "text-white" : "text-[#5F6F70] group-hover:text-[#062D2D]"
                    )}
                    strokeWidth={2}
                  />
                </div>
                {!isCollapsed && <span className="ml-3 truncate text-[14px]">Help</span>}
                {isCollapsed && (
                  <div className="absolute left-full ml-3 px-2.5 py-1 bg-[#062D2D] text-white text-xs font-medium rounded-md whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-150 z-50 shadow-lg">
                    Help
                  </div>
                )}
              </>
            )}
          </NavLink>

          <button
            type="button"
            onClick={handleLogout}
            title={isCollapsed ? "Logout Account" : undefined}
            className="group relative w-full flex items-center h-11 px-3.5 rounded-xl font-medium text-sm text-[#FF5A5A] hover:bg-[#FF5A5A]/10 transition-all duration-200 select-none"
          >
            <div className="flex items-center justify-center min-w-5.5">
              <LogOut className="w-5 h-5 text-[#FF5A5A]" strokeWidth={2} />
            </div>
            {!isCollapsed && (
              <span className="ml-3 truncate font-medium text-[14px]">Logout Account</span>
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