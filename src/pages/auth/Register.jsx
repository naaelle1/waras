import React, { useState } from "react";
import Logo from "../../components/common/Logo";
import { Link, useNavigate } from "react-router-dom";
import { authService } from "../../services/authService";
import {
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  ArrowLeft,
  Lock,
  Mail,
  User,
  Phone,
  FileText,
  UserPlus
} from "lucide-react";

export default function Register() {
  const [formData, setFormData] = useState({
    fullName: "",
    nik: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    termsAccepted: false
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
    if (errorMessage) setErrorMessage("");
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (
      !formData.fullName.trim() ||
      !formData.nik.trim() ||
      !formData.email.trim() ||
      !formData.phone.trim() ||
      !formData.password.trim() ||
      !formData.confirmPassword.trim()
    ) {
      setErrorMessage("Silakan lengkapi seluruh formulir pendaftaran.");
      return;
    }

    if (formData.nik.length < 16) {
      setErrorMessage("NIK kependudukan harus terdiri dari 16 digit angka.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setErrorMessage("Konfirmasi kata sandi tidak cocok.");
      return;
    }

    if (formData.password.length < 8) {
      setErrorMessage("Kata sandi minimal harus 8 karakter.");
      return;
    }

    if (!formData.termsAccepted) {
      setErrorMessage("Anda harus menyetujui ketentuan privasi data kesehatan.");
      return;
    }

    setIsLoading(true);
    setErrorMessage("");

    try {
      await authService.register(formData);
      setSuccessMessage("Pendaftaran akun berhasil! Mengalihkan ke dashboard warga...");
      setTimeout(() => {
        navigate("/user/dashboard");
      }, 700);
    } catch (err) {
      setErrorMessage(err.message || "Gagal melakukan pendaftaran. Silakan periksa kembali data Anda.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-white text-slate-900 selection:bg-[#022022] selection:text-white">
      {/* ── PANEL KIRI: 50% FULL-HEIGHT BRANDING & EDITORIAL COMPOSITION (Senada Warna Card Dashboard #022022) ── */}
      <aside className="lg:col-span-1 bg-[#022022] text-white relative overflow-hidden flex flex-col justify-between p-6 sm:p-10 lg:p-10 xl:p-12 min-h-[540px] lg:min-h-screen">
        {/* Wave Pattern Overlay from Mask Group.svg at bottom (Persis Card Dashboard) */}
        <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden flex items-end justify-center">
          <img
            src="/images/mask-group.svg"
            alt=""
            aria-hidden="true"
            draggable={false}
            className="w-full h-auto object-cover select-none"
          />
        </div>

        {/* TOP: Brand Logo & Title (Diperbesar & Warna Putih Bersih) */}
        <div className="relative z-10">
          <Link to="/" aria-label="WARAS - Beranda" className="inline-flex flex-col items-start gap-2 group w-fit">
            <Logo
              tone="light"
              className="h-10 sm:h-11 lg:h-12 transition-transform duration-200 group-hover:scale-105 origin-left"
            />
            <span className="text-[10px] font-semibold tracking-[0.24em] text-teal-100/90 uppercase font-inter">
              HEALTHCARE PLATFORM
            </span>
          </Link>
        </div>

        {/* MIDDLE SECTION: Editorial Typography & Fluid Composition (Inspirasi Image 4) */}
        <div className="relative z-10 py-4 my-auto max-w-xl space-y-4 sm:space-y-5 animate-auth-float">
          <div className="space-y-2 sm:space-y-2.5">
            <span className="text-[11px] font-semibold tracking-[0.25em] text-teal-100/90 uppercase font-inter block">
              PENDAFTARAN PASIEN & WARGA KOTA SEMARANG
            </span>

            <h1 className="text-3xl sm:text-4xl lg:text-[44px] xl:text-[48px] font-normal leading-[1.1] font-poppins text-white tracking-tight">
              Akses sehat
              <br />
              yang <span className="font-serif italic text-teal-200 font-light">mudah</span> bagi
              <br />
              <span className="font-semibold text-white">seluruh keluarga.</span>
            </h1>
          </div>

          <p className="text-xs sm:text-sm text-teal-100/85 leading-relaxed font-inter font-light max-w-md">
            Daftarkan identitas warga Anda untuk integrasi data rekam medis terpadu, antrean Puskesmas instan, dan kemudahan rujukan rumah sakit.
          </p>

          {/* Action pill button with circular companion arrow */}
          <div className="pt-1 flex items-center gap-3">
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-[#022022] hover:bg-teal-50 font-poppins font-semibold text-xs sm:text-sm shadow-md shadow-black/10 transition-all duration-200 active:scale-[0.98] group"
            >
              <span>Jelajahi Portal WARAS</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#022022] group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* BOTTOM SECTION: Minimalist Flex Typography Stats with Inter Light & Underline */}
        <div className="relative z-10 pt-4 sm:pt-6 mt-auto animate-auth-float-delayed">
          <div className="flex items-start justify-between gap-4 sm:gap-8">
            <div className="flex-1 pb-2 sm:pb-2.5 border-b border-white/20 group hover:border-teal-200/50 transition-colors">
              <span className="block text-2xl sm:text-3xl lg:text-[34px] font-light font-inter text-white tracking-tight leading-none">
                37+
              </span>
              <span className="block text-[11px] sm:text-xs font-light font-inter text-teal-100/80 leading-tight pt-1.5">
                Puskesmas Siaga
              </span>
            </div>
            <div className="flex-1 pb-2 sm:pb-2.5 border-b border-white/20 group hover:border-teal-200/50 transition-colors">
              <span className="block text-2xl sm:text-3xl lg:text-[34px] font-light font-inter text-white tracking-tight leading-none">
                14
              </span>
              <span className="block text-[11px] sm:text-xs font-light font-inter text-teal-100/80 leading-tight pt-1.5">
                RS Rujukan Utama
              </span>
            </div>
            <div className="flex-1 pb-2 sm:pb-2.5 border-b border-white/20 group hover:border-teal-200/50 transition-colors">
              <span className="block text-2xl sm:text-3xl lg:text-[34px] font-light font-inter text-white tracking-tight leading-none">
                24/7
              </span>
              <span className="block text-[11px] sm:text-xs font-light font-inter text-teal-100/80 leading-tight pt-1.5">
                WARAS AI Tanggap
              </span>
            </div>
          </div>
        </div>
      </aside>

      {/* ── PANEL KANAN: 50% FULL-HEIGHT SPACIOUS & WIDE FORM (Pas di viewport tanpa membuat scroll) ── */}
      <main className="lg:col-span-1 bg-white min-h-screen lg:h-screen lg:overflow-hidden flex flex-col justify-between px-6 sm:px-10 lg:px-12 xl:px-14 py-6 sm:py-7 lg:py-8">
        {/* Top Navigation Bar */}
        <div className="w-full max-w-[660px] xl:max-w-[700px] mx-auto flex items-center justify-between pb-3 sm:pb-4 animate-auth-float-soft">
          <Link
            to="/login"
            className="text-xs sm:text-sm font-light text-slate-500 hover:text-[#022022] flex items-center gap-1.5 transition-colors font-inter"
          >
            <ArrowLeft className="w-4 h-4 stroke-[1.5]" />
            <span>Kembali ke Halaman Masuk</span>
          </Link>

          {/* Text Only - Tanpa card/pill, font-light & font-inter (sesuai instruksi Image 2) */}
          <div className="flex items-center gap-1.5 text-xs sm:text-sm text-slate-500 font-inter font-light">
            <ShieldCheck className="w-4 h-4 text-slate-400 stroke-[1.5]" />
            <span>Registrasi Pasien Resmi</span>
          </div>
        </div>

        {/* Centered Spacious Form Container (Proporsional & Pas tanpa scroll) */}
        <div className="w-full max-w-[660px] xl:max-w-[700px] mx-auto my-auto py-2 sm:py-3 space-y-4 sm:space-y-5 animate-auth-float">
          {/* Header Form */}
          <div className="space-y-1.5 sm:space-y-2">
            <div className="flex items-center gap-1.5 text-xs font-inter font-light text-slate-500">
              <UserPlus className="w-4 h-4 text-slate-400 stroke-[1.5]" />
              <span>Pendaftaran Warga Baru</span>
            </div>
            <h1 className="font-inter font-light text-2xl sm:text-[30px] lg:text-[32px] text-slate-900 tracking-tight leading-tight">
              Buat Akun Baru
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 font-inter font-light leading-relaxed max-w-xl pt-0.5">
              Isi data diri Anda sesuai identitas KTP yang berlaku di wilayah Kota Semarang untuk verifikasi otomatis.
            </p>
          </div>

          {/* Notification Alert Box */}
          {errorMessage && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-light font-inter flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {successMessage && (
            <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-light font-inter flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{successMessage}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleRegister} className="space-y-3.5 sm:space-y-4">
            {/* Row 1: Nama Lengkap & NIK */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-5">
              <div>
                <label className="block text-xs sm:text-sm font-light text-slate-700 font-inter mb-1.5">
                  Nama Lengkap
                </label>
                <div className="relative flex items-center">
                  <User className="w-4 h-4 absolute left-4 text-slate-400 stroke-[1.5]" />
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Sesuai KTP"
                    className="w-full pl-11 pr-4 h-11 sm:h-11.5 rounded-xl sm:rounded-2xl bg-slate-50/80 border border-slate-200 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 placeholder:font-light focus:bg-white focus:outline-none focus:border-[#022022] focus:ring-2 focus:ring-[#022022]/15 transition-all font-inter font-light"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-light text-slate-700 font-inter mb-1.5">
                  NIK Kependudukan (16 Digit)
                </label>
                <div className="relative flex items-center">
                  <FileText className="w-4 h-4 absolute left-4 text-slate-400 stroke-[1.5]" />
                  <input
                    type="text"
                    name="nik"
                    maxLength={16}
                    value={formData.nik}
                    onChange={handleChange}
                    placeholder="3374xxxxxxxxxxxx"
                    className="w-full pl-11 pr-4 h-11 sm:h-11.5 rounded-xl sm:rounded-2xl bg-slate-50/80 border border-slate-200 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 placeholder:font-light focus:bg-white focus:outline-none focus:border-[#022022] focus:ring-2 focus:ring-[#022022]/15 transition-all font-inter font-light"
                  />
                </div>
              </div>
            </div>

            {/* Row 2: Email & Nomor HP */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-5">
              <div>
                <label className="block text-xs sm:text-sm font-light text-slate-700 font-inter mb-1.5">
                  Alamat Email Aktif
                </label>
                <div className="relative flex items-center">
                  <Mail className="w-4 h-4 absolute left-4 text-slate-400 stroke-[1.5]" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="nama@email.com"
                    className="w-full pl-11 pr-4 h-11 sm:h-11.5 rounded-xl sm:rounded-2xl bg-slate-50/80 border border-slate-200 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 placeholder:font-light focus:bg-white focus:outline-none focus:border-[#022022] focus:ring-2 focus:ring-[#022022]/15 transition-all font-inter font-light"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-light text-slate-700 font-inter mb-1.5">
                  Nomor WhatsApp / HP
                </label>
                <div className="relative flex items-center">
                  <Phone className="w-4 h-4 absolute left-4 text-slate-400 stroke-[1.5]" />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="0812xxxxxxxx"
                    className="w-full pl-11 pr-4 h-11 sm:h-11.5 rounded-xl sm:rounded-2xl bg-slate-50/80 border border-slate-200 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 placeholder:font-light focus:bg-white focus:outline-none focus:border-[#022022] focus:ring-2 focus:ring-[#022022]/15 transition-all font-inter font-light"
                  />
                </div>
              </div>
            </div>

            {/* Row 3: Kata Sandi & Konfirmasi */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-5">
              <div>
                <label className="block text-xs sm:text-sm font-light text-slate-700 font-inter mb-1.5">
                  Kata Sandi Baru
                </label>
                <div className="relative flex items-center">
                  <Lock className="w-4 h-4 absolute left-4 text-slate-400 stroke-[1.5]" />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Min. 8 karakter"
                    className="w-full pl-11 pr-11 h-11 sm:h-11.5 rounded-xl sm:rounded-2xl bg-slate-50/80 border border-slate-200 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 placeholder:font-light focus:bg-white focus:outline-none focus:border-[#022022] focus:ring-2 focus:ring-[#022022]/15 transition-all font-inter font-light"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 text-slate-400 hover:text-slate-600 cursor-pointer p-1"
                    aria-label="Toggle password visibility"
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4 stroke-[1.5]" />
                    ) : (
                      <Eye className="w-4 h-4 stroke-[1.5]" />
                    )}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-light text-slate-700 font-inter mb-1.5">
                  Konfirmasi Sandi
                </label>
                <div className="relative flex items-center">
                  <Lock className="w-4 h-4 absolute left-4 text-slate-400 stroke-[1.5]" />
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Ulangi kata sandi"
                    className="w-full pl-11 pr-11 h-11 sm:h-11.5 rounded-xl sm:rounded-2xl bg-slate-50/80 border border-slate-200 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 placeholder:font-light focus:bg-white focus:outline-none focus:border-[#022022] focus:ring-2 focus:ring-[#022022]/15 transition-all font-inter font-light"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3.5 text-slate-400 hover:text-slate-600 cursor-pointer p-1"
                    aria-label="Toggle confirm password visibility"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="w-4 h-4 stroke-[1.5]" />
                    ) : (
                      <Eye className="w-4 h-4 stroke-[1.5]" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Terms and conditions checkbox */}
            <div className="pt-2 sm:pt-2.5">
              <label className="flex items-start gap-2.5 cursor-pointer select-none">
                <input
                  type="checkbox"
                  name="termsAccepted"
                  checked={formData.termsAccepted}
                  onChange={handleChange}
                  className="mt-0.5 w-4 h-4 rounded text-[#022022] focus:ring-[#022022]/20 accent-[#022022] border-slate-300"
                />
                <span className="text-xs sm:text-[13px] text-slate-600 leading-relaxed font-inter font-light">
                  Saya menyatakan data di atas benar sesuai KTP dan menyetujui integrasi data rekam medis terpadu Kota Semarang.
                </span>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-11 sm:h-11.5 inline-flex items-center justify-center gap-2 px-6 rounded-2xl bg-[#022022] hover:bg-[#033033] border border-[#022022] disabled:opacity-60 text-white text-xs sm:text-sm font-normal tracking-wide shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer active:scale-[0.99] mt-3.5 sm:mt-4 group font-inter"
            >
              {isLoading ? (
                <span className="font-light">Memproses Pendaftaran...</span>
              ) : (
                <>
                  <span className="font-light">Daftar Akun WARAS</span>
                  <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-0.5 transition-transform stroke-[1.5]" />
                </>
              )}
            </button>
          </form>

          {/* Switch to Login */}
          <div className="pt-3.5 sm:pt-4 border-t border-slate-100 text-center">
            <p className="text-xs sm:text-sm text-slate-500 font-inter font-light">
              Sudah memiliki akun terdaftar?{" "}
              <Link
                to="/login"
                className="font-normal text-[#022022] hover:underline underline underline-offset-4 decoration-slate-300 font-inter"
              >
                Masuk ke akun
              </Link>
            </p>
          </div>
        </div>

        {/* Small Bottom Footer */}
        <div className="w-full max-w-[660px] xl:max-w-[700px] mx-auto text-center pt-2 sm:pt-3 text-[11px] text-slate-400 font-inter font-light">
          &copy; 2026 WARAS &mdash; Dinas Kesehatan Kota Semarang. Hak cipta dilindungi.
        </div>
      </main>
    </div>
  );
}
