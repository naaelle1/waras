import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import clsx from "clsx";
import {
  Bell,
  User,
  Settings,
  CircleHelp,
  LogOut,
  CheckCheck,
  Sparkles,
  ChevronRight,
} from "lucide-react";
import SearchBar from "../common/SearchBar";

const SAMPLE_NOTIFICATIONS = [
  {
    id: 1,
    title: "Fasilitas Kesehatan Diperbarui",
    description: "Informasi jam buka RSUD Kota Semarang telah diperbarui.",
    time: "5 menit lalu",
    unread: true,
  },
  {
    id: 2,
    title: "Artikel Kesehatan Baru",
    description: "Tips menjaga pola hidup sehat di musim hujan.",
    time: "1 jam lalu",
    unread: true,
  },
  {
    id: 3,
    title: "Laporan Sedang Diproses",
    description: "Laporan perubahan jam operasional puskesmas sedang ditinjau.",
    time: "Kemarin",
    unread: false,
  },
];

export default function Topbar({
  user = {
    name: "Nael",
    role: "Healthcare Platform User",
    avatar: "/images/default-avatar.png",
  },
  onLogout,
  showSearch,
}) {
  const navigate = useNavigate();
  const location = useLocation();

  // Rute di mana SearchBar disembunyikan sesuai permintaan:
  // fasilitas kesehatan, panduan kesehatan, istilah medis, panduan layanan, laporkan kesalahan, settings, help, dan profil.
  const HIDE_SEARCH_PATHS = [
    "/user/facilities",
    "/user/health-info/guides",
    "/user/health-info/medical-terms",
    "/user/health-info/terms",
    "/user/health-info/services",
    "/user/report-problem",
    "/user/settings",
    "/user/help",
    "/user/profile",
  ];

  const shouldHideSearch =
    showSearch !== undefined
      ? !showSearch
      : HIDE_SEARCH_PATHS.some((path) => location.pathname.startsWith(path));

  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [notifications, setNotifications] = useState(SAMPLE_NOTIFICATIONS);

  const notificationRef = useRef(null);
  const profileRef = useRef(null);

  const unreadCount = notifications.filter((n) => n.unread).length;

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        setIsNotificationOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleMarkAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
  };

  const handleLogout = () => {
    setIsProfileOpen(false);
    if (onLogout) {
      onLogout();
    } else {
      navigate("/login");
    }
  };

  return (
    <header className="flex items-center justify-end gap-3 sm:gap-4 w-full py-2 px-1 mb-4 select-none font-inter">
      {/* SearchBar */}
      {!shouldHideSearch && (
        <div className="w-56 sm:w-72">
          <SearchBar placeholder="Cari fasilitas atau artikel..." />
        </div>
      )}

      {/* Notification + Profile Container */}
      <div className="flex items-center gap-2 sm:gap-3 bg-white rounded-full px-3 py-1 sm:px-4 sm:py-1.5 border border-[#E2ECEB] shadow-2xs relative">
        {/* Notification Bell */}
        <div className="relative" ref={notificationRef}>
          <button
            type="button"
            onClick={() => {
              setIsNotificationOpen((prev) => !prev);
              setIsProfileOpen(false);
            }}
            className={clsx(
              "relative flex items-center justify-center w-9 h-9 rounded-full text-[#022022]",
              "hover:bg-[#022022]/5 active:scale-95 transition-all duration-200 cursor-pointer focus:outline-none"
            )}
            aria-label="Lihat notifikasi"
          >
            <Bell className="w-4.5 h-4.5 stroke-[1.8]" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-emerald-600 rounded-full ring-2 ring-white" />
            )}
          </button>

          {/* Dropdown Notifikasi */}
          {isNotificationOpen && (
            <div className="absolute -right-10 sm:right-0 top-full mt-3 w-80 sm:w-96 bg-white rounded-2xl shadow-xl border border-slate-100 py-3 z-50">
              <div className="flex items-center justify-between px-4 pb-2.5 border-b border-slate-100">
                <div className="flex items-center space-x-2">
                  <span className="font-poppins font-semibold text-sm text-[#022022]">
                    Notifikasi
                  </span>
                  {unreadCount > 0 && (
                    <span className="text-[11px] font-bold px-2 py-0.5 bg-[#022022]/10 text-[#022022] border border-[#022022]/15 rounded-full">
                      {unreadCount} baru
                    </span>
                  )}
                </div>
                {unreadCount > 0 && (
                  <button
                    type="button"
                    onClick={handleMarkAllAsRead}
                    className="flex items-center space-x-1 text-xs font-medium text-[#5F6F70] hover:text-[#022022] transition-colors"
                  >
                    <CheckCheck className="w-3.5 h-3.5" />
                    <span>Tandai dibaca</span>
                  </button>
                )}
              </div>

              <div className="max-h-72 overflow-y-auto divide-y divide-gray-50">
                {notifications.map((item) => (
                  <div
                    key={item.id}
                    className={clsx(
                      "p-3.5 flex items-start space-x-3 hover:bg-slate-50 transition-colors cursor-pointer",
                      item.unread ? "bg-[#022022]/5" : ""
                    )}
                  >
                    <div className="p-2 rounded-full bg-[#022022]/10 text-[#022022] border border-[#022022]/10 shrink-0 mt-0.5">
                      <Sparkles className="w-4 h-4 text-[#022022]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-[#022022] truncate mb-0.5">
                        {item.title}
                      </p>
                      <p className="text-xs text-[#5F6F70] line-clamp-2 leading-relaxed">
                        {item.description}
                      </p>
                      <span className="text-[10px] font-medium text-[#5F6F70]/70 mt-1 block">
                        {item.time}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* User Profile Avatar */}
        <div className="relative" ref={profileRef}>
          <button
            type="button"
            onClick={() => {
              setIsProfileOpen((prev) => !prev);
              setIsNotificationOpen(false);
            }}
            className="flex items-center space-x-2 rounded-full focus:outline-none group cursor-pointer"
            aria-label="Menu profil"
          >
            <div className="relative">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-9 h-9 rounded-full object-cover ring-2 ring-white shadow-sm group-hover:scale-105 transition-transform duration-200"
                onError={(e) => {
                  e.target.style.display = "none";
                  e.target.nextSibling.style.display = "flex";
                }}
              />
              <div className="hidden w-9 h-9 rounded-full bg-[#022022] text-white items-center justify-center text-xs font-bold shadow-sm group-hover:scale-105 transition-transform duration-200">
                {user.name.charAt(0)}
              </div>
            </div>
          </button>

          {/* Profile Dropdown */}
          {isProfileOpen && (
            <div className="absolute right-0 top-full mt-3 w-64 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 z-50">
              <div className="px-4 py-3 border-b border-slate-100 flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-[#022022] text-white flex items-center justify-center font-bold text-base shrink-0 shadow-sm">
                  {user.name.charAt(0)}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-poppins text-sm font-bold text-[#022022] truncate">
                    {user.name}
                  </p>
                  <p className="text-xs text-[#5F6F70] truncate">{user.role}</p>
                </div>
              </div>

              <div className="py-1">
                <button
                  type="button"
                  onClick={() => {
                    setIsProfileOpen(false);
                    navigate("/user/profile");
                  }}
                  className="w-full px-4 py-2.5 flex items-center justify-between text-xs font-medium text-[#022022] hover:bg-[#022022]/5 transition-colors"
                >
                  <div className="flex items-center space-x-2.5">
                    <User className="w-4 h-4 text-[#5F6F70]" />
                    <span>Profil</span>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-[#5F6F70]/60" />
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setIsProfileOpen(false);
                    navigate("/user/settings");
                  }}
                  className="w-full px-4 py-2.5 flex items-center justify-between text-xs font-medium text-[#022022] hover:bg-[#022022]/5 transition-colors"
                >
                  <div className="flex items-center space-x-2.5">
                    <Settings className="w-4 h-4 text-[#5F6F70]" />
                    <span>Pengaturan</span>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-[#5F6F70]/60" />
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setIsProfileOpen(false);
                    navigate("/user/help");
                  }}
                  className="w-full px-4 py-2.5 flex items-center justify-between text-xs font-medium text-[#022022] hover:bg-[#022022]/5 transition-colors"
                >
                  <div className="flex items-center space-x-2.5">
                    <CircleHelp className="w-4 h-4 text-[#5F6F70]" />
                    <span>Bantuan</span>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-[#5F6F70]/60" />
                </button>
              </div>

              <div className="pt-1 border-t border-slate-100">
                <button
                  type="button"
                  onClick={handleLogout}
                  className="w-full px-4 py-2.5 flex items-center space-x-2.5 text-xs font-semibold text-[#FF5A5A] hover:bg-[#FF5A5A]/10 transition-colors"
                >
                  <LogOut className="w-4 h-4 text-[#FF5A5A]" />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}