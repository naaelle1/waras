import React, { useState, useEffect } from "react";
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
  AlertCircle,
  Activity,
  Loader2
} from "lucide-react";
import { authService } from "../../services/authService";

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [profileData, setProfileData] = useState(() => {
    const cached = authService.getCurrentUser();
    return {
      name: cached?.name || "",
      nik: cached?.nik || "",
      email: cached?.email || "",
      phone: cached?.phone || "",
      address: cached?.address || "",
      district: cached?.district || "",
      bpjsNumber: cached?.bpjsNumber || cached?.bpjs_number || "",
      bpjsStatus: cached?.bpjsStatus || cached?.bpjs_status || "Aktif",
      faskesPrimer: cached?.primaryFacility || cached?.primary_facility || "",
      bloodType: cached?.bloodType || cached?.blood_type || "",
      allergies: cached?.allergies || "",
    };
  });

  useEffect(() => {
    async function loadProfile() {
      try {
        const user = await authService.getProfile();
        if (user) {
          setProfileData((prev) => ({
            ...prev,
            name: user.name || prev.name,
            nik: user.nik || prev.nik,
            email: user.email || prev.email,
            phone: user.phone || prev.phone,
            address: user.address || prev.address,
            district: user.district || prev.district,
            bpjsNumber: user.bpjsNumber || user.bpjs_number || prev.bpjsNumber,
            bpjsStatus: user.bpjsStatus || user.bpjs_status || prev.bpjsStatus,
            faskesPrimer: user.primaryFacility || user.primary_facility || prev.faskesPrimer,
            bloodType: user.bloodType || user.blood_type || prev.bloodType,
            allergies: user.allergies || prev.allergies,
          }));
        }
      } catch (err) {
        console.warn("[Profile] Gagal memuat data dari database:", err);
      }
    }
    loadProfile();
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    setErrorMessage("");

    try {
      await authService.updateProfile({
        name: profileData.name,
        phone: profileData.phone,
        address: profileData.address,
        district: profileData.district,
        bpjsNumber: profileData.bpjsNumber,
        bpjsStatus: profileData.bpjsStatus,
        primaryFacility: profileData.faskesPrimer,
        bloodType: profileData.bloodType,
        allergies: profileData.allergies,
      });

      setIsEditing(false);
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3000);
    } catch (err) {
      setErrorMessage(err.message || "Gagal menyimpan perubahan profil ke server.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-12 font-inter">
      {/* SECTION 1: PAGE TITLE */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-200/60 pb-4">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2.5 text-[#022022]">
            <User className="w-6 h-6 stroke-[2.2] text-[#022022]" />
            <h1 className="font-poppins font-bold text-2xl lg:text-3xl tracking-tight text-[#0D2626]">
              Profil Pengguna
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-[#526666] font-inter">
            Informasi identitas kependudukan, kepesertaan BPJS Kesehatan, dan rekam medis warga Kota Semarang.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#022022]/5 text-[#022022] border border-[#022022]/15">
            <Activity className="w-3.5 h-3.5 text-[#022022]" />
            Kota Semarang • Sistem Aktif
          </span>
        </div>
      </div>

      {/* HEADER BANNER */}
      <div className="rounded-3xl bg-[#022022] border border-white/10 text-white p-6 sm:p-8 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 relative overflow-hidden">
        <div className="flex items-center gap-4 relative z-10">
          <div className="w-16 h-16 rounded-2xl bg-white/15 text-white border border-white/20 flex items-center justify-center font-bold text-2xl shadow-sm shrink-0">
            {profileData.name.charAt(0)}
          </div>
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-white/15 text-teal-200 border border-white/20">
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
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-white bg-gradient-to-br from-white/[0.18] via-white/[0.08] to-white/[0.03] hover:from-white/[0.25] hover:via-white/[0.12] hover:to-white/[0.05] backdrop-blur-md border border-white/25 hover:border-white/40 shadow-[inset_0_1px_1px_rgba(255,255,255,0.32),0_8px_20px_rgba(0,0,0,0.12)] font-semibold text-xs active:scale-[0.98] transition-all cursor-pointer"
          >
            <Edit3 className="w-4 h-4 text-white" />
            <span>{isEditing ? "Batalkan Edit" : "Perbarui Data"}</span>
          </button>
        </div>
      </div>

      {errorMessage && (
        <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-semibold flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-rose-600" />
          <span>{errorMessage}</span>
        </div>
      )}

      {savedSuccess && (
        <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>Data profil kependudukan Anda berhasil diperbarui di server.</span>
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
              {isEditing ? "Mode Edit Data" : "Data Valid KTP"}
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
                  Alamat Email (Akun)
                </label>
                <input
                  type="email"
                  disabled
                  value={profileData.email}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-gray-100 border border-[#E2ECEB] text-xs font-semibold text-gray-500 cursor-not-allowed"
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

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-[#526666]">
                  Kecamatan (Semarang)
                </label>
                <input
                  type="text"
                  disabled={!isEditing}
                  value={profileData.district}
                  onChange={(e) => setProfileData({ ...profileData, district: e.target.value })}
                  placeholder="Contoh: Semarang Selatan"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#F8FAFA] border border-[#E2ECEB] text-xs font-semibold text-[#0D2626] disabled:opacity-80"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-[#526666]">
                  Nomor BPJS Kesehatan / KIS
                </label>
                <input
                  type="text"
                  disabled={!isEditing}
                  value={profileData.bpjsNumber}
                  onChange={(e) => setProfileData({ ...profileData, bpjsNumber: e.target.value })}
                  placeholder="13 digit nomor BPJS"
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
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#526666]">
                    Faskes Tingkat 1 (Puskesmas)
                  </label>
                  <input
                    type="text"
                    value={profileData.faskesPrimer}
                    onChange={(e) => setProfileData({ ...profileData, faskesPrimer: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#F8FAFA] border border-[#E2ECEB] text-xs font-semibold text-[#0D2626]"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#526666]">
                    Golongan Darah
                  </label>
                  <select
                    value={profileData.bloodType}
                    onChange={(e) => setProfileData({ ...profileData, bloodType: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#F8FAFA] border border-[#E2ECEB] text-xs font-semibold text-[#0D2626]"
                  >
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                  </select>
                </div>
                <div className="sm:col-span-2 space-y-1">
                  <label className="text-xs font-semibold text-[#526666]">
                    Catatan Riwayat Alergi Obat / Makanan
                  </label>
                  <input
                    type="text"
                    value={profileData.allergies}
                    onChange={(e) => setProfileData({ ...profileData, allergies: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#F8FAFA] border border-[#E2ECEB] text-xs font-semibold text-[#0D2626]"
                  />
                </div>
              </div>
            )}

            {isEditing && (
              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 rounded-full border border-[#022022]/15 text-xs font-semibold text-[#526666] hover:bg-[#022022]/5 active:scale-[0.98] transition-all cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-5 py-2 rounded-full text-white bg-gradient-to-br from-[#023b3b] via-[#022022] to-[#011414] hover:from-[#034d4d] hover:via-[#033033] hover:to-[#022022] backdrop-blur-md border border-[#022022]/80 hover:border-white/30 shadow-[inset_0_1px_1px_rgba(255,255,255,0.28),0_4px_12px_rgba(2,32,34,0.16)] text-xs font-semibold active:scale-[0.98] transition-all cursor-pointer disabled:opacity-50 flex items-center gap-1.5"
                >
                  {isSaving ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Menyimpan...</span>
                    </>
                  ) : (
                    <span>Simpan Perubahan</span>
                  )}
                </button>
              </div>
            )}
          </form>
        </div>

        {/* RIGHT COLUMN: KARTU BPJS & STATUS KESEHATAN (5 COLS) */}
        <div className="lg:col-span-5 space-y-6">
          {/* KARTU BPJS DIGITAL */}
          <div className="rounded-3xl bg-[#022022] border border-white/10 text-white p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-white/20 pb-3">
              <div className="flex items-center gap-2">
                <HeartPulse className="w-5 h-5 text-teal-200" />
                <span className="font-poppins font-bold text-sm">BPJS Kesehatan</span>
              </div>
              <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-600 text-white">
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

              <div className="p-3 rounded-xl bg-[#022022]/5 border border-[#022022]/15 text-[#022022] space-y-1">
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

