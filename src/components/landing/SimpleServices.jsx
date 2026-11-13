import React from "react";
import { Link } from "react-router-dom";
import { MapPin, HeartPulse, PhoneCall, ArrowRight } from "lucide-react";

const services = [
  {
    id: "faskes",
    title: "Cari Faskes Terdekat",
    description: "Temukan lokasi 37 Puskesmas dan Rumah Sakit rujukan se-Kota Semarang dengan panduan jarak rute langsung serta status IGD 24 Jam.",
    icon: MapPin,
    linkText: "LIHAT FASILITAS",
    linkTo: "/user/facilities",
    isExternal: false,
  },
  {
    id: "p3k",
    title: "Panduan Penanganan P3K",
    description: "Instruksi langkah demi langkah pertolongan pertama gawat darurat yang terstruktur, mudah dipahami orang awam, dan terverifikasi secara medis.",
    icon: HeartPulse,
    linkText: "BUKA PANDUAN MEDIS",
    linkTo: "/user/health-info/guides",
    isExternal: false,
  },
  {
    id: "hotline",
    title: "Panggilan Darurat 119",
    description: "Satu tombol langsung tersambung ke operator PSC Ambulans Hebat Kota Semarang untuk respon penjemputan darurat tanpa dipungut biaya.",
    icon: PhoneCall,
    linkText: "HUBUNGI 119 SEKARANG",
    linkTo: "tel:119",
    isExternal: true,
  },
];

export default function SimpleServices() {
  return (
    <section id="panduan" className="px-4 sm:px-8 lg:px-12 py-20 bg-white border-t border-[#022022]/10">
      <div className="max-w-[1480px] mx-auto">
        
        {/* CENTERED HEADER (Clean, Light Typography) */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-[#022022] font-semibold mb-2">
            <span className="w-2 h-2 rounded-full bg-[#37F4B4]" />
            PELAYANAN KESEHATAN TERPADU
          </span>
          <h2 className="text-2xl sm:text-4xl lg:text-[44px] font-light text-[#022022] tracking-tight leading-[1.12]">
            Penanganan Medis Jadi <br />
            <span className="font-normal text-[#022022]">Lebih Sederhana.</span>
          </h2>
          <p className="mt-3 text-xs sm:text-sm font-light text-[#022022]/65 max-w-md mx-auto leading-relaxed">
            Tidak ada tahapan yang rumit. Dapatkan kepastian informasi, fasilitas, dan pertolongan pertama dalam hitungan detik.
          </p>
        </div>

        {/* 3 EQUAL BLOCKS (Setara, Bersih, Tanpa Elemen Tambahan) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 items-stretch">
          {services.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.id}
                className="rounded-3xl bg-white border border-[#37F4B4]/25 p-8 flex flex-col justify-between hover:border-[#37F4B4]/60 hover:shadow-[0_15px_35px_rgba(2,32,34,0.08)] transition-all duration-300 group"
              >
                <div>
                  {/* Top Minimal Round Icon */}
                  <div className="w-12 h-12 rounded-2xl bg-[#022022]/5 text-[#022022] flex items-center justify-center mb-6 group-hover:bg-[#022022] group-hover:text-[#37F4B4] transition-all">
                    <Icon className="w-5 h-5 stroke-[2]" />
                  </div>

                  <h3 className="text-xl font-normal text-[#022022] group-hover:text-[#022022] transition-colors">
                    {item.title}
                  </h3>

                  <p className="mt-3 text-xs sm:text-sm font-light text-[#022022]/65 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-[#022022]/10">
                  {item.isExternal ? (
                    <a
                      href={item.linkTo}
                      className="inline-flex items-center gap-1.5 text-xs font-medium text-[#022022] hover:text-[#033033] transition-colors"
                    >
                      <span>{item.linkText}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#37F4B4] group-hover:translate-x-1 transition-transform" />
                    </a>
                  ) : (
                    <Link
                      to={item.linkTo}
                      className="inline-flex items-center gap-1.5 text-xs font-medium text-[#022022] hover:text-[#033033] transition-colors"
                    >
                      <span>{item.linkText}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#37F4B4] group-hover:translate-x-1 transition-transform" />
                    </Link>
                  )}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
