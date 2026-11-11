import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Lock,
  Mail,
  User,
  Phone,
  CreditCard,
  ArrowLeft,
  Sparkles
} from "lucide-react";

export default function Register() {
  const [formData, setFormData] = useState({
    fullName: "",
    nik: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    termsAccepted: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleRegister = (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    if (
      !formData.fullName.trim() ||
      !formData.nik.trim() ||
      !formData.email.trim() ||
      !formData.password.trim()
    ) {
      setErrorMessage("Mohon lengkapi seluruh kolom formulir pendaftaran.");
      return;
    }

    if (formData.nik.length < 16) {
      setErrorMessage("NIK kependudukan harus terdiri dari 16 digit.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setErrorMessage("Konfirmasi kata sandi tidak cocok.");
      return;
    }

    if (!formData.termsAccepted) {
      setErrorMessage("Anda harus menyetujui ketentuan privasi data kesehatan.");
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setSuccessMessage("Pendaftaran berhasil! Mengalihkan ke halaman dashboard...");
      setTimeout(() => {
        navigate("/user/dashboard");
      }, 1000);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFA] flex flex-col justify-center py-10 sm:py-16 px-4 sm:px-6 lg:px-8 selection:bg-[#003B3B] selection:text-white">
      {/* TOP FLOATING HOME SHORTCUT */}
      <div className="max-w-5xl mx-auto w-full mb-6 flex items-center justify-between">
        <Link
          to="/login"
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#526666] hover:text-[#003B3B] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Halaman Masuk</span>
        </Link>

        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#EBF5F5] text-[#003B3B]">
          <ShieldCheck className="w-3.5 h-3.5" />
          Registrasi Pasien Resmi
        </span>
      </div>

      {/* MAIN CONTAINER: TWO-PANEL SPLIT */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="max-w-5xl mx-auto w-full rounded-3xl bg-white border border-[#E2ECEB] shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-12"
      >
        {/* LEFT BRAND PANEL */}
        <div className="lg:col-span-5 bg-gradient-to-br from-[#003B3B] via-[#004242] to-[#002727] text-white p-8 sm:p-10 flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 -mt-10 -mr-10 w-48 h-48 bg-[#DDEEEE]/20 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-48 h-48 bg-[#DDEEEE]/15 rounded-full blur-2xl pointer-events-none" />

          <div className="space-y-6 relative z-10">
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="w-10 h-10 rounded-xl bg-white text-[#003B3B] flex items-center justify-center font-bold text-lg shadow-sm">
                W
              </div>
              <div className="flex flex-col">
                <span className="font-poppins font-extrabold text-2xl tracking-tight text-white leading-none">
                  waras
                </span>
                <span className="text-[10px] font-semibold tracking-[0.18em] text-[#DDEEEE] uppercase mt-0.5">
                  HEALTHCARE PLATFORM
                </span>
              </div>
            </Link>

            <div className="space-y-2 pt-2">
              <h2 className="font-poppins font-bold text-xl sm:text-2xl text-white leading-snug">
                Pendaftaran Akun Warga Kota Semarang
              </h2>
              <p className="text-xs sm:text-sm text-gray-200 font-inter leading-relaxed">
                Nikmati kemudahan reservasi antrean puskesmas dan konsultasi gejala awal terpadu tanpa antre panjang.
              </p>
            </div>

            <div className="space-y-3 pt-2 font-inter text-xs text-gray-200">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#DDEEEE] shrink-0" />
                <span>Terintegrasi dengan NIK Kependudukan</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#DDEEEE] shrink-0" />
                <span>Riwayat antrean dan konsultasi aman terenkripsi</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#DDEEEE] shrink-0" />
                <span>Gratis tanpa pungutan biaya langganan</span>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-white/15 relative z-10 space-y-2">
            <p className="text-xs text-gray-300 italic font-inter">
              "Kesehatan warga adalah prioritas utama. Dapatkan pelayanan fasilitas kesehatan terdekat dengan cepat dan transparan."
            </p>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-semibold text-white">Dinas Kesehatan Kota Semarang</span>
            </div>
          </div>
        </div>

        {/* RIGHT FORM PANEL */}
        <div className="lg:col-span-7 p-8 sm:p-10 flex flex-col justify-between space-y-6">
          <div className="space-y-2">
            <h1 className="font-poppins font-bold text-2xl sm:text-3xl text-[#0D2626]">
              Buat Akun Baru
            </h1>
            <p className="text-xs sm:text-sm text-[#526666] font-inter">
              Isi data diri Anda sesuai identitas KTP yang berlaku di wilayah Kota Semarang.
            </p>
          </div>

          {/* Error & Success Notification */}
          {errorMessage && (
            <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-medium">
              {errorMessage}
            </div>
          )}

          {successMessage && (
            <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-medium">
              {successMessage}
            </div>
          )}

          {/* FORM */}
          <form onSubmit={handleRegister} className="space-y-3.5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {/* Nama Lengkap */}
              <div className="space-y-1">
                <label className="block text-xs font-semibold text-[#0D2626]">
                  Nama Lengkap
                </label>
                <div className="relative flex items-center">
                  <User className="w-4 h-4 absolute left-3.5 text-gray-400" />
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Sesuai KTP"
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-[#F8FAFA] border border-[#E2ECEB] text-xs text-[#0D2626] focus:outline-none focus:border-[#003B3B]/40 font-inter"
                  />
                </div>
              </div>

              {/* NIK */}
              <div className="space-y-1">
                <label className="block text-xs font-semibold text-[#0D2626]">
                  Nomor Induk Kependudukan (NIK)
                </label>
                <div className="relative flex items-center">
                  <CreditCard className="w-4 h-4 absolute left-3.5 text-gray-400" />
                  <input
                    type="text"
                    name="nik"
                    maxLength={16}
                    value={formData.nik}
                    onChange={handleChange}
                    placeholder="16 Digit NIK"
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-[#F8FAFA] border border-[#E2ECEB] text-xs text-[#0D2626] focus:outline-none focus:border-[#003B3B]/40 font-inter"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {/* Email */}
              <div className="space-y-1">
                <label className="block text-xs font-semibold text-[#0D2626]">
                  Alamat Email Aktif
                </label>
                <div className="relative flex items-center">
                  <Mail className="w-4 h-4 absolute left-3.5 text-gray-400" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="nama@email.com"
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-[#F8FAFA] border border-[#E2ECEB] text-xs text-[#0D2626] focus:outline-none focus:border-[#003B3B]/40 font-inter"
                  />
                </div>
              </div>

              {/* No WhatsApp/HP */}
              <div className="space-y-1">
                <label className="block text-xs font-semibold text-[#0D2626]">
                  Nomor WhatsApp/HP
                </label>
                <div className="relative flex items-center">
                  <Phone className="w-4 h-4 absolute left-3.5 text-gray-400" />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="0812xxxxxxxx"
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-[#F8FAFA] border border-[#E2ECEB] text-xs text-[#0D2626] focus:outline-none focus:border-[#003B3B]/40 font-inter"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {/* Password */}
              <div className="space-y-1">
                <label className="block text-xs font-semibold text-[#0D2626]">
                  Kata Sandi
                </label>
                <div className="relative flex items-center">
                  <Lock className="w-4 h-4 absolute left-3.5 text-gray-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Minimal 8 karakter"
                    className="w-full pl-10 pr-9 py-2.5 rounded-xl bg-[#F8FAFA] border border-[#E2ECEB] text-xs text-[#0D2626] focus:outline-none focus:border-[#003B3B]/40 font-inter"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div className="space-y-1">
                <label className="block text-xs font-semibold text-[#0D2626]">
                  Konfirmasi Kata Sandi
                </label>
                <div className="relative flex items-center">
                  <Lock className="w-4 h-4 absolute left-3.5 text-gray-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Ulangi kata sandi"
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-[#F8FAFA] border border-[#E2ECEB] text-xs text-[#0D2626] focus:outline-none focus:border-[#003B3B]/40 font-inter"
                  />
                </div>
              </div>
            </div>

            {/* Checkbox Terms */}
            <div className="pt-2">
              <label className="flex items-start gap-2.5 cursor-pointer select-none">
                <input
                  type="checkbox"
                  name="termsAccepted"
                  checked={formData.termsAccepted}
                  onChange={handleChange}
                  className="mt-0.5 w-4 h-4 rounded text-[#003B3B] focus:ring-[#003B3B]/20 cursor-pointer accent-[#003B3B]"
                />
                <span className="text-[11px] text-[#526666] leading-relaxed">
                  Saya menyatakan bahwa data yang diisikan adalah benar dan menyetujui pemanfaatan data untuk sistem informasi kesehatan publik Kota Semarang.
                </span>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#003B3B] hover:bg-[#002D2D] disabled:opacity-60 text-white text-xs sm:text-sm font-semibold shadow-xs hover:shadow transition-all duration-200 cursor-pointer"
            >
              {isLoading ? (
                <span>Mendaftarkan Akun...</span>
              ) : (
                <>
                  <span>Daftar Akun Warga</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Quick link to login */}
          <div className="text-center text-xs text-[#526666] pt-2 border-t border-gray-100 font-inter">
            Sudah memiliki akun terdaftar?{" "}
            <Link to="/login" className="font-semibold text-[#003B3B] hover:underline">
              Masuk di sini
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

