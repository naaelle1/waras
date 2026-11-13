import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  CircleHelp,
  Phone,
  Mail,
  MessageCircle,
  Search,
  ChevronDown,
  ChevronUp,
  FileQuestion,
  ShieldCheck,
  Hospital,
  Bot,
  ExternalLink,
  ChevronRight,
  Headphones,
  CheckCircle2,
  Clock,
  Activity
} from "lucide-react";

const FAQ_LIST = [
  {
    category: "Antrean & Kunjungan Faskes",
    items: [
      {
        q: "Bagaimana cara mengambil nomor antrean poli Puskesmas di Kota Semarang?",
        a: "Buka menu 'Fasilitas Kesehatan' pada sidebar, pilih puskesmas terdekat di wilayah Anda, kemudian klik tombol 'Ambil Nomor Antrean'. Anda dapat memilih poli yang dituju (Poli Umum, Gigi, KIA/KB) dan nomor antrean digital akan terbit seketika."
      },
      {
        q: "Kapan loket antrean online Puskesmas dibuka setiap harinya?",
        a: "Pendaftaran antrean online dibuka mulai pukul 06.30 WIB hingga kuota harian terpenuhi atau loket fisik tutup pukul 12.00 WIB (Senin-Kamis) dan 11.00 WIB (Jumat-Sabtu)."
      },
      {
        q: "Apakah saya bisa membatalkan antrean jika berhalangan hadir?",
        a: "Bisa. Masuk ke halaman Dashboard, pada kartu antrean aktif Anda klik 'Batalkan Antrean'. Pembatalan setidaknya 30 menit sebelum estimasi waktu panggilan untuk memberikan kesempatan bagi warga lain."
      }
    ]
  },
  {
    category: "BPJS & Kepesertaan JKN",
    items: [
      {
        q: "Apakah data BPJS saya terhubung otomatis dengan akun WARAS?",
        a: "Ya. Sistem WARAS terintegrasi dengan basis data NIK Dukcapil dan BPJS Kesehatan Cabang Utama Semarang. Nomor BPJS dan Faskes Tingkat 1 Anda tersinkronisasi otomatis di halaman Profil."
      },
      {
        q: "Bagaimana cara mengubah Faskes Tingkat 1 ke Puskesmas lain?",
        a: "Sesuai regulasi BPJS Kesehatan, perpindahan Faskes Primer dapat dilakukan melalui aplikasi resmi Mobile JKN atau langsung di kantor BPJS Kesehatan terdekat setelah kepesertaan aktif minimal 3 bulan di faskes sebelumnya."
      }
    ]
  },
  {
    category: "Konsultasi WARAS AI",
    items: [
      {
        q: "Apakah saran medis dari WARAS AI menggantikan diagnosis dokter?",
        a: "Tidak. WARAS AI berfungsi sebagai panduan edukasi awal dan triase informasi kesehatan warga. Untuk kepastian diagnosis medis, resep obat resep keras, atau penanganan gawat darurat, Anda tetap disarankan berkonsultasi langsung dengan dokter di Puskesmas atau RSUD."
      },
      {
        q: "Apakah riwayat konsultasi saya di WARAS AI bersifat privat?",
        a: "Ya, seluruh percakapan terenkripsi dan disimpan secara privat di akun Anda. Anda dapat menghapus riwayat konsultasi kapan saja melalui menu pengaturan."
      }
    ]
  }
];

export default function Help() {
  const [searchQuery, setSearchQuery] = useState("");
  const [openIndex, setOpenIndex] = useState("0-0");

  const toggleAccordion = (id) => {
    setOpenIndex(openIndex === id ? null : id);
  };

  const filteredFaqs = FAQ_LIST.map((group) => {
    const matchingItems = group.items.filter(
      (item) =>
        item.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.a.toLowerCase().includes(searchQuery.toLowerCase())
    );
    return { ...group, items: matchingItems };
  }).filter((group) => group.items.length > 0);

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-14 font-inter text-[#0D2626]">
      {/* HEADER SECTION */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-200/60 pb-4">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2.5 text-[#022022]">
            <CircleHelp className="w-6 h-6 stroke-[2.2] text-[#022022]" />
            <h1 className="font-poppins font-bold text-2xl lg:text-3xl tracking-tight text-[#0D2626]">
              Pusat Bantuan
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-[#526666] font-inter">
            Pertanyaan umum (FAQ), petunjuk operasional faskes, serta saluran bantuan teknis resmi Kota Semarang.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#022022]/5 text-[#022022] border border-[#022022]/15">
            <Activity className="w-3.5 h-3.5 text-[#022022]" />
            Layanan Siaga 24/7
          </span>
        </div>
      </div>

      {/* HERO BANNER WITH SEARCH */}
      <div className="relative rounded-3xl bg-[#003B3B] p-6 sm:p-8 text-white shadow-sm overflow-hidden">
        <div className="absolute top-0 right-0 -mr-10 -mt-10 w-52 h-52 bg-white/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 max-w-2xl space-y-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white/15 text-[#DDEEEE]">
            <CircleHelp className="w-3.5 h-3.5" /> Bantuan Cepat Warga Semarang
          </span>
          <h2 className="font-poppins font-bold text-2xl sm:text-3xl text-white">
            Ada yang bisa kami bantu seputar layanan WARAS?
          </h2>
          <p className="text-xs sm:text-sm text-teal-100/90 leading-relaxed">
            Cari jawaban cepat mengenai antrean puskesmas, kepesertaan BPJS, triase AI, atau kontak call center darurat.
          </p>

          <div className="pt-2">
            <div className="relative max-w-lg">
              <Search className="w-4.5 h-4.5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Ketik topik pertanyaan, misal: antrean, bpjs, faskes..."
                className="w-full pl-11 pr-4 py-3 rounded-2xl bg-white text-xs sm:text-sm text-[#0D2626] font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-300"
              />
            </div>
          </div>
        </div>
      </div>

      {/* QUICK CONTACT CHANNELS (3 CARDS) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-5 rounded-3xl bg-white border border-[#E2ECEB] shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center font-bold">
            <Phone className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-poppins font-bold text-sm text-[#0D2626]">
              Darurat Medis (PSC 119)
            </h3>
            <p className="text-xs text-[#526666] mt-0.5">
              Ambulans Hebat & Layanan Kegawatdaruratan Dinkes Kota Semarang bebas pulsa.
            </p>
          </div>
          <a
            href="tel:119"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-rose-600 hover:underline pt-1"
          >
            <span>Hubungi 119 / (024) 1500-112</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        <div className="p-5 rounded-3xl bg-white border border-[#E2ECEB] shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
            <MessageCircle className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-poppins font-bold text-sm text-[#0D2626]">
              WhatsApp Helpdesk
            </h3>
            <p className="text-xs text-[#526666] mt-0.5">
              Bantuan kendala akun & informasi antrean puskesmas via chat resmi.
            </p>
          </div>
          <a
            href="https://wa.me/6281234567890"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:underline pt-1"
          >
            <span>Chat WA: 0812-3456-7890</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        <div className="p-5 rounded-3xl bg-white border border-[#E2ECEB] shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-2xl bg-[#EBF5F5] text-[#003B3B] flex items-center justify-center font-bold">
            <Mail className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-poppins font-bold text-sm text-[#0D2626]">
              Email Pengaduan
            </h3>
            <p className="text-xs text-[#526666] mt-0.5">
              Kirim saran, koreksi data, atau kerja sama operasional faskes.
            </p>
          </div>
          <a
            href="mailto:dinkes@semarangkota.go.id"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#003B3B] hover:underline pt-1"
          >
            <span>dinkes@semarangkota.go.id</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* FAQ ACCORDION SECTION */}
      <div className="bg-white rounded-3xl border border-[#E2ECEB] p-6 sm:p-8 shadow-xs space-y-6">
        <div className="border-b border-gray-100 pb-4">
          <h3 className="font-poppins font-bold text-lg text-[#0D2626]">
            Pertanyaan yang Sering Diajukan (FAQ)
          </h3>
          <p className="text-xs text-[#526666] mt-0.5">
            Solusi mandiri untuk kendala umum yang sering dihadapi pengguna platform WARAS.
          </p>
        </div>

        {filteredFaqs.length === 0 ? (
          <div className="p-8 text-center space-y-2">
            <FileQuestion className="w-10 h-10 text-gray-300 mx-auto" />
            <p className="text-sm font-semibold text-[#0D2626]">Topik Tidak Ditemukan</p>
            <p className="text-xs text-[#526666]">
              Coba kata kunci lain atau hubungi helpdesk kami secara langsung.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredFaqs.map((group, groupIdx) => (
              <div key={groupIdx} className="space-y-3">
                <span className="text-xs font-bold text-[#003B3B] uppercase tracking-wider block">
                  {group.category}
                </span>

                <div className="space-y-2.5">
                  {group.items.map((item, itemIdx) => {
                    const id = `${groupIdx}-${itemIdx}`;
                    const isOpen = openIndex === id;

                    return (
                      <div
                        key={itemIdx}
                        className="rounded-2xl border border-[#E2ECEB] overflow-hidden transition-all bg-[#F8FAFA]"
                      >
                        <button
                          type="button"
                          onClick={() => toggleAccordion(id)}
                          className="w-full p-4 text-left flex items-center justify-between gap-4 font-semibold text-xs sm:text-sm text-[#0D2626] hover:bg-gray-100/60 transition-colors cursor-pointer"
                        >
                          <span>{item.q}</span>
                          {isOpen ? (
                            <ChevronUp className="w-4 h-4 text-[#003B3B] shrink-0" />
                          ) : (
                            <ChevronDown className="w-4 h-4 text-gray-400 shrink-0" />
                          )}
                        </button>

                        {isOpen && (
                          <div className="p-4 pt-1 text-xs text-[#526666] leading-relaxed border-t border-gray-100 bg-white">
                            {item.a}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* FOOTER CALLOUT: LAPORKAN MASALAH */}
      <div className="p-6 rounded-3xl bg-linear-to-r from-[#EBF5F5] to-white border border-[#003B3B]/15 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <h4 className="font-poppins font-bold text-sm text-[#0D2626]">
            Menemukan ketidaksesuaian data faskes atau jadwal puskesmas?
          </h4>
          <p className="text-xs text-[#526666]">
            Bantu tim Dinas Kesehatan Kota Semarang memperbaiki data dengan mengirimkan laporan cepat.
          </p>
        </div>
        <Link
          to="/user/report-problem"
          className="px-5 py-2.5 rounded-xl bg-[#003B3B] hover:bg-[#002D2D] text-white text-xs font-semibold shadow-xs transition-colors shrink-0 self-start sm:self-auto"
        >
          Laporkan Kesalahan
        </Link>
      </div>
    </div>
  );
}

