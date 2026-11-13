import React, { useState } from "react";
import {
  User,
  CreditCard,
  Mail,
  Phone,
  MapPin,
  ShieldCheck,
  HeartPulse,
  Clock,
  Edit3,
  CheckCircle2,
  Calendar,
  AlertCircle
} from "lucide-react";

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "Nael Ardiansyah",
    nik: "3374011208980004",
    email: "nael@semarangkota.go.id",
    phone: "0812-3456-7890",
    address: "Jl. Pandanaran No. 42, RT 03/RW 02, Mugassari",
    district: "Semarang Selatan",
    bpjsNumber: "0001239845124",
    bpjsStatus: "Aktif (Kelas 1)",
    faskesPrimer: "Puskesmas Pandanaran",
    bloodType: "O+",
    allergies: "Tidak ada riwayat alergi obat",
  });

  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setIsEditing(false);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-12 font-inter">
      {/* HEADER BANNER */}
      <div className="rounded-3xl bg-[#022022] border border-[#37F4B4]/25 text-white p-6 sm:p-8 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 relative overflow-hidden">
        <div className="absolute right-0 top-0 -mt-10 -mr-10 w-44 h-44 bg-[#37F4B4]/15 rounded-full blur-2xl pointer-events-none" />

        <div className="flex items-center gap-4 relative z-10">
          <div className="w-16 h-16 rounded-2xl bg-[#37F4B4] text-[#022022] flex items-center justify-center font-bold text-2xl shadow-sm shrink-0">
            {profileData.name.charAt(0)}
          </div>
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-white/15 text-[#37F4B4] border border-[#37F4B4]/20">
              <ShieldCheck className="w-3 h-3" /> NIK Terverifikasi Dukcapil
            </div>
            <h1 className="font-poppins font-bold text-xl sm:text-2xl text-white">
              {profileData.name}
            </h1>
            <p className="text-xs text-gray-200">
              {profileData.district} • Pasien Terdaftar Faskes Kota Semarang
            </p>
          </div>
        </div>

        <div className="relative z-10">
          <button
            type="button"
            onClick={() => setIsEditing(!isEditing)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#37F4B4] text-[#022022] hover:bg-white font-semibold text-xs shadow-xs transition-colors cursor-pointer"
          >
            <Edit3 className="w-4 h-4" />
            <span>{isEditing ? "Batalkan Edit" : "Perbarui Data"}</span>
          </button>
        </div>
      </div>

      {savedSuccess && (
        <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>Data profil kependudukan Anda berhasil diperbarui.</span>
        </div>
      )}

      {/* 2-COLUMN GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* LEFT COLUMN: IDENTITAS UTAMA & FORM (7 COLS) */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-[#E2ECEB] p-6 sm:p-7 shadow-xs space-y-6">
          <div className="flex items-center justify-between border-b border-gray-100 pb-3">
            <div className="flex items-center gap-2">
              <User className="w-5 h-5 text-[#022022]" />
              <h2 className="font-poppins font-bold text-base text-[#0D2626]">
                Identitas Kependudukan & Kontak
              </h2>
            </div>
            <span className="text-[11px] font-semibold text-[#526666]">
              Data Valid KTP
            </span>
          </div>

          <form onSubmit={handleSave} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-[#526666]">
                  Nama Lengkap
                </label>
                <input
                  type="text"
                  disabled={!isEditing}
                  value={profileData.name}
                  onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#F8FAFA] border border-[#E2ECEB] text-xs font-semibold text-[#0D2626] disabled:opacity-80"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-[#526666]">
                  Nomor Induk Kependudukan (NIK)
                </label>
                <input
                  type="text"
                  disabled
                  value={profileData.nik}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-gray-100 border border-[#E2ECEB] text-xs font-mono font-medium text-gray-500 cursor-not-allowed"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-[#526666]">
                  Alamat Email
                </label>
                <input
                  type="email"
                  disabled={!isEditing}
                  value={profileData.email}
                  onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#F8FAFA] border border-[#E2ECEB] text-xs font-semibold text-[#0D2626] disabled:opacity-80"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-[#526666]">
                  Nomor Telepon/WA
                </label>
                <input
                  type="tel"
                  disabled={!isEditing}
                  value={profileData.phone}
                  onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#F8FAFA] border border-[#E2ECEB] text-xs font-semibold text-[#0D2626] disabled:opacity-80"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-[#526666]">
                Alamat Domisili KTP
              </label>
              <textarea
                rows={2}
                disabled={!isEditing}
                value={profileData.address}
                onChange={(e) => setProfileData({ ...profileData, address: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl bg-[#F8FAFA] border border-[#E2ECEB] text-xs font-semibold text-[#0D2626] disabled:opacity-80"
              />
            </div>

            {isEditing && (
              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 rounded-xl border border-[#E2ECEB] text-xs font-semibold text-[#526666] hover:bg-gray-50"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#022022] hover:bg-[#033033] text-[#37F4B4] border border-[#37F4B4]/25 text-xs font-semibold shadow-xs transition-colors cursor-pointer"
                >
                  Simpan Perubahan
                </button>
              </div>
            )}
          </form>
        </div>

        {/* RIGHT COLUMN: KARTU BPJS & STATUS KESEHATAN (5 COLS) */}
        <div className="lg:col-span-5 space-y-6">
          {/* KARTU BPJS DIGITAL */}
          <div className="rounded-3xl bg-[#022022] border border-[#37F4B4]/25 text-white p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-white/20 pb-3">
              <div className="flex items-center gap-2">
                <HeartPulse className="w-5 h-5 text-[#37F4B4]" />
                <span className="font-poppins font-bold text-sm">BPJS Kesehatan</span>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#37F4B4] text-[#022022]">
                {profileData.bpjsStatus}
              </span>
            </div>

            <div className="space-y-1">
              <span className="text-[10px] text-gray-200 block uppercase tracking-wider">
                Nomor Kartu Indonesia Sehat
              </span>
              <p className="font-mono text-base font-bold tracking-widest text-white">
                {profileData.bpjsNumber}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/15 text-xs">
              <div>
                <span className="text-[10px] text-gray-300 block">Faskes Tingkat 1</span>
                <strong className="text-white font-semibold text-xs truncate block">
                  {profileData.faskesPrimer}
                </strong>
              </div>
              <div>
                <span className="text-[10px] text-gray-300 block">Golongan Darah</span>
                <strong className="text-white font-semibold text-xs block">
                  {profileData.bloodType}
                </strong>
              </div>
            </div>
          </div>

          {/* INFORMASI RIWAYAT KESEHATAN & CATATAN */}
          <div className="bg-white rounded-3xl border border-[#E2ECEB] p-6 shadow-xs space-y-4">
            <div className="flex items-center gap-2 border-b border-gray-100 pb-3">
              <Clock className="w-4 h-4 text-[#022022]" />
              <h3 className="font-poppins font-bold text-sm text-[#0D2626]">
                Catatan Medis Penting
              </h3>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-xl bg-[#F8FAFA] border border-[#E2ECEB] space-y-1">
                <span className="text-[11px] font-semibold text-[#526666] block">
                  Riwayat Alergi:
                </span>
                <p className="text-[#0D2626]">{profileData.allergies}</p>
              </div>

              <div className="p-3 rounded-xl bg-[#022022]/5 border border-[#37F4B4]/25 text-[#022022] space-y-1">
                <span className="text-[11px] font-semibold block">
                  Jadwal Skrining Kesehatan:
                </span>
                <p className="text-xs">
                  Puskesmas Pandanaran mengadakan cek gula darah & tensi gratis tiap hari Jumat minggu pertama.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

