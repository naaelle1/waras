import React, { useEffect } from "react";
import { LogOut, X } from "lucide-react";

/**
 * Modal Pop-Up Konfirmasi Keluar Akun WARAS
 * @param {boolean} isOpen - Status buka/tutup modal
 * @param {Function} onClose - Fungsi menutup modal (Batal)
 * @param {Function} onConfirm - Fungsi menjalankan logout permanen
 */
export default function LogoutConfirmModal({ isOpen, onClose, onConfirm }) {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-fade-in select-none"
      onClick={onClose}
    >
      <div
        className="bg-white w-full max-w-sm rounded-3xl p-6 shadow-2xl border border-gray-100 text-center space-y-4 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Tombol Tutup Silang di Kanan Atas */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
          aria-label="Tutup dialog"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Lingkaran Ikon Merah LogOut */}
        <div className="w-13 h-13 rounded-2xl bg-rose-50 text-[#FF5A5A] flex items-center justify-center mx-auto border border-rose-100/60 shadow-xs">
          <LogOut className="w-6 h-6 text-[#FF5A5A]" strokeWidth={2.2} />
        </div>

        {/* Teks Judul & Deskripsi */}
        <div className="space-y-1.5">
          <h3 className="font-poppins font-bold text-lg text-[#0D2626]">
            Keluar dari Akun?
          </h3>
          <p className="text-xs text-slate-500 leading-relaxed font-inter px-2">
            Apakah Anda yakin ingin mengakhiri sesi akun ini? Anda harus memasukkan kembali data kredensial untuk masuk.
          </p>
        </div>

        {/* Tombol Aksi */}
        <div className="grid grid-cols-2 gap-2.5 pt-2 font-inter">
          <button
            type="button"
            onClick={onClose}
            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-xs font-semibold text-slate-600 hover:bg-gray-50 active:scale-[0.98] transition-all cursor-pointer"
          >
            Batal
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="w-full px-4 py-2.5 rounded-xl bg-[#FF5A5A] text-white hover:bg-rose-600 text-xs font-semibold active:scale-[0.98] transition-all cursor-pointer shadow-xs"
          >
            Ya, Keluar
          </button>
        </div>
      </div>
    </div>
  );
}
