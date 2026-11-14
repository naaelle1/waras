import React, { useState, useEffect } from "react";
import { Users, Hospital, FileText, Flag, ArrowRight, UserPlus, PenLine, AlertTriangle, RefreshCw } from "lucide-react";
import { Link } from "react-router-dom";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import StatCard from "../../components/admin/StatCard";
import { adminService } from "../../services/adminService";

const initialRegistrationTrend = [
  { month: "Jan", users: 820 },
  { month: "Feb", users: 932 },
  { month: "Mar", users: 1050 },
  { month: "Apr", users: 1180 },
  { month: "Mei", users: 1340 },
  { month: "Jun", users: 1420 },
  { month: "Jul", users: 1580 },
  { month: "Agu", users: 1690 },
  { month: "Sep", users: 1820 },
  { month: "Okt", users: 1950 },
  { month: "Nov", users: 2100 },
  { month: "Des", users: 2296 },
];

const initialRecentActivity = [
  { id: 1, type: "user", icon: UserPlus, message: "Pengguna baru terdaftar: Dewi Lestari", time: "5 menit lalu", color: "text-emerald-500" },
  { id: 2, type: "report", icon: AlertTriangle, message: "Laporan baru: Data faskes tidak akurat", time: "12 menit lalu", color: "text-yellow-500" },
  { id: 3, type: "article", icon: PenLine, message: 'Artikel diperbarui: "Panduan Gizi Balita"', time: "30 menit lalu", color: "text-blue-500" },
  { id: 4, type: "user", icon: UserPlus, message: "Pengguna baru terdaftar: Ahmad Fauzan", time: "1 jam lalu", color: "text-emerald-500" },
  { id: 5, type: "report", icon: AlertTriangle, message: "Laporan diselesaikan: Jadwal dokter salah", time: "2 jam lalu", color: "text-yellow-500" },
  { id: 6, type: "article", icon: PenLine, message: 'Artikel dipublikasi: "Tips Menjaga Kesehatan Jantung"', time: "3 jam lalu", color: "text-blue-500" },
];

const quickActions = [
  { label: "Tambah Pengguna", to: "/admin/users", icon: Users },
  { label: "Kelola Faskes", to: "/admin/facilities", icon: Hospital },
  { label: "Tulis Artikel", to: "/admin/articles", icon: FileText },
  { label: "Lihat Laporan", to: "/admin/reports", icon: Flag },
];

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalUsers: 12458,
    activeUsers: 12100,
    totalFacilities: 64,
    totalArticles: 127,
    totalReports: 23,
    pendingReports: 5,
    recentActivity: initialRecentActivity,
    registrationTrend: initialRegistrationTrend
  });
  const [isLoading, setIsLoading] = useState(true);

  const loadStats = async () => {
    setIsLoading(true);
    const data = await adminService.getDashboardStats();
    if (data) {
      setStats((prev) => ({
        ...prev,
        ...data,
        recentActivity: (data.recentActivity && data.recentActivity.length > 0)
          ? data.recentActivity.map((item) => ({
              ...item,
              icon: item.type === "user" ? UserPlus : item.type === "report" ? AlertTriangle : PenLine
            }))
          : initialRecentActivity,
        registrationTrend: data.registrationTrend || initialRegistrationTrend
      }));
    }
    setIsLoading(false);
  };

  useEffect(() => {
    loadStats();
  }, []);

  return (
    <div className="space-y-6 font-inter">
      {/* Welcome Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-[#022022] font-poppins">
            Selamat Datang, Admin
          </h1>
          <p className="text-[#566E70] text-sm mt-1">
            Berikut ringkasan data platform WARAS hari ini secara real-time.
          </p>
        </div>

        <button
          onClick={loadStats}
          disabled={isLoading}
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs font-medium text-slate-700 transition-colors shadow-2xs cursor-pointer self-start sm:self-auto"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? "animate-spin" : ""}`} />
          <span>Segarkan Data</span>
        </button>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard
          icon={Users}
          label="Total Pengguna"
          value={stats.totalUsers.toLocaleString("id-ID")}
          trend={`${stats.activeUsers || stats.totalUsers} aktif`}
          trendUp
        />
        <StatCard
          icon={Hospital}
          label="Total Faskes"
          value={stats.totalFacilities.toLocaleString("id-ID")}
          trend="Semua aktif di Semarang"
          trendUp
        />
        <StatCard
          icon={FileText}
          label="Artikel Edukasi"
          value={stats.totalArticles.toLocaleString("id-ID")}
          trend="Tersedia di web"
          trendUp
        />
        <StatCard
          icon={Flag}
          label="Laporan Masuk"
          value={stats.totalReports.toLocaleString("id-ID")}
          trend={`${stats.pendingReports} menunggu peninjauan`}
          trendUp={stats.pendingReports === 0}
        />
      </div>

      {/* Charts & Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Registration Trend Chart */}
        <div className="lg:col-span-2 bg-white border border-[#E2ECEB] rounded-2xl shadow-xs p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-semibold text-[#022022] font-poppins">
              Tren Pendaftaran Pengguna
            </h2>
            <span className="bg-[#E6FEFF] text-[#022022] rounded-full px-3 py-1 text-xs font-medium">
              2026
            </span>
          </div>
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={stats.registrationTrend || initialRegistrationTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2ECEB" />
              <XAxis
                dataKey="month"
                tick={{ fontSize: 12, fill: "#566E70" }}
                axisLine={{ stroke: "#E2ECEB" }}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 12, fill: "#566E70" }}
                axisLine={{ stroke: "#E2ECEB" }}
                tickLine={false}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#022022",
                  border: "none",
                  borderRadius: "12px",
                  color: "#fff",
                  fontSize: "13px",
                }}
                itemStyle={{ color: "#37F4B4" }}
                labelStyle={{ color: "#fff", fontWeight: 600 }}
              />
              <Line
                type="monotone"
                dataKey="users"
                stroke="#37F4B4"
                strokeWidth={2.5}
                dot={{ fill: "#022022", stroke: "#37F4B4", strokeWidth: 2, r: 4 }}
                activeDot={{ fill: "#37F4B4", stroke: "#022022", strokeWidth: 2, r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Recent Activity */}
        <div className="bg-white border border-[#E2ECEB] rounded-2xl shadow-xs p-6">
          <h2 className="text-base font-semibold text-[#022022] font-poppins mb-4">
            Aktivitas Terbaru
          </h2>
          <div className="space-y-3">
            {stats.recentActivity.map((activity) => {
              const Icon = activity.icon || UserPlus;
              return (
                <div key={activity.id} className="flex items-start gap-3">
                  <div className={`mt-0.5 ${activity.color || "text-emerald-500"}`}>
                    <Icon className="w-4 h-4" strokeWidth={2} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm text-[#022022] leading-snug truncate">
                      {activity.message}
                    </p>
                    <p className="text-xs text-[#566E70] mt-0.5">{activity.time}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white border border-[#E2ECEB] rounded-2xl shadow-xs p-6">
        <h2 className="text-base font-semibold text-[#022022] font-poppins mb-4">
          Aksi Cepat
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <Link
                key={action.label}
                to={action.to}
                className="flex items-center gap-3 px-4 py-3 rounded-xl bg-[#022022] text-white hover:bg-[#033033] transition-colors group cursor-pointer"
              >
                <Icon className="w-5 h-5 text-[#37F4B4]" strokeWidth={2} />
                <span className="text-sm font-medium truncate">{action.label}</span>
                <ArrowRight className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
