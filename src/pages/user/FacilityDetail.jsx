import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  MapPin,
  Phone,
  MessageCircle,
  Hospital,
  Stethoscope,
  Clock,
  ShieldCheck,
  AlertCircle
} from "lucide-react";

import Button from "../../components/common/Button";
import Badge from "../../components/common/Badge";
import Card from "../../components/common/Card";
import MapComponent from "../../components/user/MapComponent";
import { facilities } from "../../data/facilities";

export default function FacilityDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Find facility matching the URL ID parameter
  const facility = facilities.find((f) => f.id === parseInt(id, 10));

  if (!facility) {
    return (
      <div className="p-12 text-center glass-card rounded-3xl space-y-4 max-w-md mx-auto mt-12">
        <AlertCircle className="w-12 h-12 text-rose-500 mx-auto" />
        <h3 className="font-poppins font-bold text-lg text-[#082C2C]">
          Fasilitas Kesehatan Tidak Ditemukan
        </h3>
        <p className="text-xs text-[#647474]">
          Data fasilitas kesehatan dengan ID tersebut tidak ditemukan dalam sistem WARAS.
        </p>
        <Button variant="primary" onClick={() => navigate("/user/facilities")}>
          Kembali ke Daftar Fasilitas
        </Button>
      </div>
    );
  }

  const isHospital = facility.category === "Rumah Sakit";
  const hasCoordinates = facility.latitude !== null && facility.longitude !== null;

  return (
    <div className="space-y-6 pb-12">
      {/* Back Button */}
      <div>
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-xs font-semibold text-[#0B5D5D] hover:text-[#002F2F] transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Fasilitas Kesehatan</span>
        </button>
      </div>

      {/* Facility Header Banner */}
      <div className="glass-card rounded-3xl p-6 sm:p-8 border border-white/80 space-y-4">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Badge variant={isHospital ? "default" : "teal"} className={isHospital ? "bg-[#002F2F] text-white" : ""}>
                {facility.category}
              </Badge>
              {facility.type && (
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#DDEEEE] text-[#002F2F]">
                  {facility.type}
                </span>
              )}
            </div>

            <h1 className="font-poppins font-bold text-2xl sm:text-3xl text-[#082C2C]">
              {facility.name}
            </h1>

            <p className="text-xs sm:text-sm text-[#647474] flex items-start gap-1.5 leading-relaxed max-w-2xl">
              <MapPin className="w-4 h-4 text-[#0B5D5D] shrink-0 mt-0.5" />
              <span>{facility.address}</span>
            </p>
          </div>

          <div className="flex items-center gap-2">
            {facility.phone && (
              <a href={`tel:${facility.phone.replace(/[^0-9]/g, "")}`}>
                <Button variant="primary" size="sm" leftIcon={Phone}>
                  Hubungi
                </Button>
              </a>
            )}
            {facility.whatsapp && (
              <a
                href={`https://wa.me/${facility.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="secondary" size="sm" leftIcon={MessageCircle}>
                  WhatsApp
                </Button>
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Main Grid Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Information & Services */}
        <div className="lg:col-span-7 space-y-6">
          {/* Main Details Card */}
          <Card className="space-y-4">
            <h3 className="font-poppins font-semibold text-lg text-[#002F2F] border-b border-gray-100 pb-3">
              Informasi Utama
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="space-y-1">
                <span className="text-[#647474] font-medium">Kategori:</span>
                <p className="font-semibold text-[#082C2C]">{facility.category}</p>
              </div>

              <div className="space-y-1">
                <span className="text-[#647474] font-medium">Tipe Fasilitas:</span>
                <p className="font-semibold text-[#082C2C]">{facility.type || "-"}</p>
              </div>

              <div className="space-y-1">
                <span className="text-[#647474] font-medium">Kecamatan:</span>
                <p className="font-semibold text-[#082C2C]">{facility.district || "Semarang"}</p>
              </div>

              <div className="space-y-1">
                <span className="text-[#647474] font-medium">Nomor Telepon:</span>
                <p className="font-semibold text-[#082C2C]">{facility.phone || "Tidak tersedia"}</p>
              </div>

              {facility.whatsapp && (
                <div className="space-y-1">
                  <span className="text-[#647474] font-medium">Nomor WhatsApp:</span>
                  <p className="font-semibold text-[#0B5D5D]">{facility.whatsapp}</p>
                </div>
              )}
            </div>
          </Card>

          {/* Services List Card */}
          <Card className="space-y-4">
            <div className="flex items-center gap-2 border-b border-gray-100 pb-3">
              <Stethoscope className="w-5 h-5 text-[#0B5D5D]" />
              <h3 className="font-poppins font-semibold text-lg text-[#002F2F]">
                Layanan & Poliklinik
              </h3>
            </div>

            {facility.services && facility.services.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {facility.services.map((service, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 p-2.5 rounded-xl bg-gray-50 border border-gray-100 text-xs font-medium text-[#082C2C]"
                  >
                    <ShieldCheck className="w-4 h-4 text-[#0B5D5D] shrink-0" />
                    <span className="capitalize">{service}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-[#647474]">
                Daftar layanan spesifik belum tersedia untuk fasilitas kesehatan ini.
              </p>
            )}
          </Card>
        </div>

        {/* Right Column: Map Preview */}
        <div className="lg:col-span-5 space-y-4">
          <Card className="space-y-3">
            <h3 className="font-poppins font-semibold text-lg text-[#002F2F]">
              Peta Lokasi
            </h3>

            {hasCoordinates ? (
              <MapComponent facilities={[facility]} />
            ) : (
              <div className="h-64 rounded-2xl bg-gray-50 border border-dashed border-gray-200 flex flex-col items-center justify-center p-6 text-center space-y-2">
                <MapPin className="w-10 h-10 text-gray-300" />
                <p className="font-poppins font-semibold text-sm text-[#082C2C]">
                  Lokasi peta belum tersedia
                </p>
                <p className="text-xs text-[#647474] max-w-xs">
                  Koordinat geografis untuk fasilitas ini belum dimasukkan ke sistem WARAS.
                </p>
              </div>
            )}

            <div className="p-3 bg-[#DDEEEE]/50 rounded-xl text-xs text-[#082C2C] space-y-1">
              <p className="font-semibold">Alamat Lengkap:</p>
              <p className="text-[#647474]">{facility.address}</p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}