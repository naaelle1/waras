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
  ExternalLink,
  Activity,
  ArrowRight,
  Flag,
  Sparkles
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
    <div className="space-y-8 max-w-6xl mx-auto pb-14 font-inter text-[#0D2626]">
      {/* HEADER SECTION */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-200/60 pb-4">
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

      {/* HERO BANNER (Persis Card Dashboard & ServiceGuideHero) */}
      <section className="relative w-full rounded-2xl sm:rounded-3xl bg-[#022022] border border-white/10 p-5 sm:p-8 lg:p-10 text-white shadow-[0_20px_50px_rgba(2,32,34,0.3)] overflow-hidden">
        {/* LAYER BACKGROUND: GELOMBANG DEKORASI FIGMA */}
        <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden rounded-2xl sm:rounded-3xl flex items-center justify-center">
          <svg
            className="w-full h-full object-cover"
            preserveAspectRatio="none"
            viewBox="0 0 1440 437"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <mask
              id="mask_help_hero"
              style={{ maskType: "alpha" }}
              maskUnits="userSpaceOnUse"
              x="-22"
              y="0"
              width="1526"
              height="644"
            >
              <rect
                x="-21.5717"
                y="216.55"
                width="1478.35"
                height="431.236"
                transform="rotate(-8.42308 -21.5717 216.55)"
                fill="#C4C4C4"
              />
            </mask>
            <g mask="url(#mask_help_hero)">
              <g opacity="0.05">
                <path
                  d="M1515.04 106.21C1515.04 106.21 1479.05 144.573 1174.49 197.569C944.011 237.673 492.796 195.637 230.373 241.502C-39.7321 288.641 -0.135085 355.024 -7.1507 307.647L3.33789 378.478C3.33789 378.478 84.0207 298.473 241.502 275.771C473.097 242.507 970.597 317.04 1198.76 287.855C1421.28 259.369 1522.06 153.588 1522.06 153.588L1515.04 106.21Z"
                  fill="white"
                />
              </g>
              <g opacity="0.1">
                <path
                  d="M1465.08 92.3023C979.851 431.606 579.315 131.724 301.597 180.662C15.6588 231.092 5.94788 378.047 -1.94859 324.721L9.86135 404.475C9.86135 404.475 99.4007 357.504 259.746 323.434C841.544 199.818 924.335 522.66 1192.07 447.213C1459.81 371.766 1598.83 -1.22344 1465.08 92.3023Z"
                  fill="white"
                />
              </g>
            </g>
          </svg>
        </div>

        {/* KONTEN UTAMA DI LAYER ATAS (z-10) */}
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/15 px-3.5 py-1 text-xs font-medium text-teal-100 backdrop-blur-sm">
            <Sparkles className="w-3.5 h-3.5 text-teal-200" />
            <span>Bantuan Cepat Warga Semarang</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white font-poppins leading-tight">
            Ada yang bisa kami bantu seputar layanan WARAS?
          </h2>

          <p className="text-xs sm:text-sm text-teal-100/90 leading-relaxed font-inter max-w-2xl">
            Cari jawaban cepat mengenai antrean puskesmas, kepesertaan BPJS, triase AI, atau kontak call center darurat Kota Semarang.
          </p>

          <div className="relative max-w-xl pt-2">
            <Search className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Ketik topik pertanyaan, misal: antrean, bpjs, faskes..."
              className="w-full pl-12 pr-16 py-3.5 rounded-full bg-white text-xs sm:text-sm text-[#0D2626] font-medium shadow-[0_4px_20px_rgba(0,0,0,0.1)] border border-white/20 focus:outline-none focus:ring-2 focus:ring-teal-300 placeholder:text-gray-400"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-semibold text-gray-400 hover:text-[#022022] cursor-pointer"
              >
                Reset
              </button>
            )}
          </div>
        </div>
      </section>

      {/* QUICK CONTACT CHANNELS (3 CARDS SESUAI STANDAR DASHBOARD) */}
      <section className="space-y-4">
        <div>
          <h3 className="font-poppins font-semibold text-xl text-[#0D2626]">
            Saluran Bantuan Langsung
          </h3>
          <p className="text-xs sm:text-sm text-[#526666]">
            Hubungi unit penanganan teknis dan kedaruratan resmi Kota Semarang.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Card 1: PSC 119 */}
          <div className="p-6 rounded-2xl bg-white border border-[#E2ECEB] shadow-xs hover:border-[#022022]/30 hover:shadow-md hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between group h-full">
            <div className="space-y-3">
              <div className="w-11 h-11 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center font-bold group-hover:scale-105 transition-transform">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-poppins font-bold text-base text-[#0D2626] group-hover:text-[#022022] transition-colors">
                  Darurat Medis (PSC 119)
                </h4>
                <p className="text-xs sm:text-sm text-[#526666] leading-relaxed mt-1">
                  Ambulans Hebat & Layanan Kegawatdaruratan Dinkes Kota Semarang bebas pulsa 24 jam.
                </p>
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-gray-100 flex items-center justify-between text-xs font-semibold text-rose-600">
              <a href="tel:119" className="hover:underline">
                Hubungi 119 / (024) 1500-112
              </a>
              <div className="p-1.5 rounded-full bg-rose-50 text-rose-600 group-hover:bg-rose-600 group-hover:text-white transition-colors duration-200">
                <ExternalLink className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>

          {/* Card 2: WhatsApp Helpdesk */}
          <div className="p-6 rounded-2xl bg-white border border-[#E2ECEB] shadow-xs hover:border-[#022022]/30 hover:shadow-md hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between group h-full">
            <div className="space-y-3">
              <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold group-hover:scale-105 transition-transform">
                <MessageCircle className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-poppins font-bold text-base text-[#0D2626] group-hover:text-[#022022] transition-colors">
                  WhatsApp Helpdesk
                </h4>
                <p className="text-xs sm:text-sm text-[#526666] leading-relaxed mt-1">
                  Bantuan kendala akun & informasi antrean faskes puskesmas via pesan interaktif.
                </p>
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-gray-100 flex items-center justify-between text-xs font-semibold text-emerald-700">
              <a
                href="https://wa.me/6281234567890"
                target="_blank"
                rel="noreferrer"
                className="hover:underline"
              >
                Chat WA: 0812-3456-7890
              </a>
              <div className="p-1.5 rounded-full bg-emerald-50 text-emerald-700 group-hover:bg-emerald-700 group-hover:text-white transition-colors duration-200">
                <ExternalLink className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>

          {/* Card 3: Email Pengaduan */}
          <div className="p-6 rounded-2xl bg-white border border-[#E2ECEB] shadow-xs hover:border-[#022022]/30 hover:shadow-md hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between group h-full">
            <div className="space-y-3">
              <div className="w-11 h-11 rounded-xl bg-teal-50 text-[#022022] flex items-center justify-center font-bold group-hover:scale-105 transition-transform">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-poppins font-bold text-base text-[#0D2626] group-hover:text-[#022022] transition-colors">
                  Email Pengaduan
                </h4>
                <p className="text-xs sm:text-sm text-[#526666] leading-relaxed mt-1">
                  Kirim saran resmi, koreksi data layanan, atau kerja sama operasional fasilitas kesehatan.
                </p>
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-gray-100 flex items-center justify-between text-xs font-semibold text-[#022022]">
              <a href="mailto:dinkes@semarangkota.go.id" className="hover:underline">
                dinkes@semarangkota.go.id
              </a>
              <div className="p-1.5 rounded-full bg-[#022022]/5 text-[#022022] group-hover:bg-[#022022] group-hover:text-white transition-colors duration-200">
                <ExternalLink className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ ACCORDION SECTION */}
      <section className="bg-white rounded-2xl border border-[#E2ECEB] p-6 sm:p-8 shadow-xs space-y-6">
        <div className="border-b border-gray-100 pb-4">
          <h3 className="font-poppins font-bold text-xl text-[#0D2626]">
            Pertanyaan yang Sering Diajukan (FAQ)
          </h3>
          <p className="text-xs sm:text-sm text-[#526666] mt-1 font-inter">
            Solusi mandiri untuk kendala umum yang sering dihadapi warga saat mengakses platform WARAS.
          </p>
        </div>

        {filteredFaqs.length === 0 ? (
          <div className="p-8 text-center space-y-2">
            <FileQuestion className="w-10 h-10 text-gray-300 mx-auto" />
            <p className="text-sm font-semibold text-[#0D2626]">Topik Tidak Ditemukan</p>
            <p className="text-xs text-[#526666]">
              Coba kata kunci lain atau hubungi helpdesk kami secara langsung di atas.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredFaqs.map((group, groupIdx) => (
              <div key={groupIdx} className="space-y-3">
                <span className="text-xs font-bold text-[#022022] uppercase tracking-wider block font-poppins">
                  {group.category}
                </span>

                <div className="space-y-2.5">
                  {group.items.map((item, itemIdx) => {
                    const id = `${groupIdx}-${itemIdx}`;
                    const isOpen = openIndex === id;

                    return (
                      <div
                        key={itemIdx}
                        className={`rounded-2xl border transition-all ${
                          isOpen
                            ? "border-[#022022]/30 bg-white shadow-xs"
                            : "border-[#E2ECEB] bg-gray-50/60 hover:border-[#022022]/20"
                        }`}
                      >
                        <button
                          type="button"
                          onClick={() => toggleAccordion(id)}
                          className="w-full p-4 text-left flex items-center justify-between gap-4 font-semibold text-xs sm:text-sm text-[#0D2626] hover:text-[#022022] transition-colors cursor-pointer"
                        >
                          <span>{item.q}</span>
                          {isOpen ? (
                            <ChevronUp className="w-4 h-4 text-[#022022] shrink-0" />
                          ) : (
                            <ChevronDown className="w-4 h-4 text-gray-400 shrink-0" />
                          )}
                        </button>

                        {isOpen && (
                          <div className="p-4 pt-1 text-xs sm:text-sm text-[#526666] leading-relaxed border-t border-gray-100 bg-white">
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
      </section>

      {/* FOOTER CALLOUT: LAPORKAN MASALAH (Persis Standar Dashboard & HealthGuide) */}
      <section className="rounded-2xl bg-gradient-to-r from-[#022022]/[0.04] via-[#022022]/[0.02] to-transparent border border-[#022022]/10 p-5 sm:p-6 backdrop-blur-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3.5">
          <div className="p-2.5 rounded-xl bg-[#022022]/10 text-[#022022] shrink-0 mt-0.5">
            <Flag className="w-5 h-5 text-[#022022]" />
          </div>
          <div className="space-y-1">
            <h4 className="font-poppins font-semibold text-sm sm:text-base text-[#0D2626]">
              Menemukan ketidaksesuaian data faskes atau jadwal puskesmas?
            </h4>
            <p className="text-xs sm:text-sm text-[#526666] font-inter leading-relaxed max-w-2xl">
              Bantu tim Dinas Kesehatan Kota Semarang menjaga akurasi layanan publik dengan mengirimkan laporan cepat.
            </p>
          </div>
        </div>

        <Link
          to="/user/report-problem"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-[#022022] hover:bg-[#033033] text-white text-xs sm:text-sm font-semibold shadow-xs border border-white/20 transition-all shrink-0 self-start sm:self-auto cursor-pointer group/btn"
        >
          <span>Laporkan Kesalahan</span>
          <ArrowRight className="w-3.5 h-3.5 text-white group-hover/btn:translate-x-0.5 transition-transform" />
        </Link>
      </section>
    </div>
  );
}
