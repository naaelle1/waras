import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Mail,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  KeyRound
} from "lucide-react";

export default function ForgotPassword() {
  const [identifier, setIdentifier] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!identifier.trim()) {
      setErrorMessage("Silakan masukkan email atau NIK kependudukan Anda.");
      return;
    }

    setErrorMessage("");
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
    }, 600);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFA] flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 selection:bg-[#003B3B] selection:text-white">
      {/* TOP SHORTCUT */}
      <div className="max-w-md mx-auto w-full mb-6 flex items-center justify-between">
        <Link
          to="/login"
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#526666] hover:text-[#003B3B] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Masuk</span>
        </Link>

        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#EBF5F5] text-[#003B3B]">
          <ShieldCheck className="w-3.5 h-3.5" />
          Pemulihan Akun
        </span>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md mx-auto w-full bg-white rounded-3xl border border-[#E2ECEB] shadow-xl p-8 sm:p-10 space-y-6"
      >
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-[#EBF5F5] text-[#003B3B] flex items-center justify-center mx-auto mb-3 font-bold">
            <KeyRound className="w-6 h-6" />
          </div>
          <h1 className="font-poppins font-bold text-2xl text-[#0D2626]">
            Atur Ulang Kata Sandi
          </h1>
          <p className="text-xs sm:text-sm text-[#526666] font-inter leading-relaxed">
            Masukkan email atau NIK yang terdaftar. Kami akan mengirimkan tautan verifikasi untuk membuat kata sandi baru.
          </p>
        </div>

        {errorMessage && (
          <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-medium">
            {errorMessage}
          </div>
        )}

        {isSubmitted ? (
          <div className="space-y-5 text-center py-3">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="font-poppins font-semibold text-base text-[#0D2626]">
                Instruksi Terkirim
              </h3>
              <p className="text-xs text-[#526666] leading-relaxed">
                Tautan konfirmasi telah dikirim ke alamat terkait <strong>{identifier}</strong>. Silakan periksa folder kotak masuk atau spam email Anda.
              </p>
            </div>
            <Link
              to="/login"
              className="inline-flex items-center justify-center w-full px-5 py-2.5 rounded-xl bg-[#003B3B] hover:bg-[#002D2D] text-white text-xs font-semibold shadow-xs transition-colors"
            >
              Kembali ke Halaman Masuk
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-[#0D2626]">
                Email atau NIK Kependudukan
              </label>
              <div className="relative flex items-center">
                <Mail className="w-4 h-4 absolute left-3.5 text-gray-400" />
                <input
                  type="text"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  placeholder="nama@email.com atau NIK 16 digit"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#F8FAFA] border border-[#E2ECEB] text-xs sm:text-sm text-[#0D2626] focus:outline-none focus:border-[#003B3B]/40 font-inter"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#003B3B] hover:bg-[#002D2D] disabled:opacity-60 text-white text-xs sm:text-sm font-semibold shadow-xs transition-all duration-200 cursor-pointer"
            >
              {isLoading ? (
                <span>Mengirim Tautan...</span>
              ) : (
                <>
                  <span>Kirim Tautan Pemulihan</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        )}

        <div className="pt-2 border-t border-gray-100 text-center">
          <p className="text-xs text-[#526666]">
            Butuh bantuan lain?{" "}
            <Link to="/user/help" className="font-semibold text-[#003B3B] hover:underline">
              Hubungi Layanan Dinkes
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}

