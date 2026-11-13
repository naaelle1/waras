import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  MapPin,
  Phone,
  MessageCircle,
  Hospital,
  Stethoscope,
  ShieldCheck,
  AlertCircle,
  Navigation,
  ExternalLink
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
      <div className="p-12 text-center bg-white border border-[#E2ECEB] shadow-xs rounded-2xl space-y-4 max-w-md mx-auto mt-12">
        <AlertCircle className="w-12 h-12 text-rose-500 mx-auto" />
        <h3 className="font-poppins font-bold text-lg text-[#0D2626]">
          Fasilitas Kesehatan Tidak Ditemukan
        </h3>
        <p className="text-xs text-[#526666]">
          Data fasilitas kesehatan dengan ID tersebut tidak ditemukan dalam sistem WARAS.
        </p>
        <Button variant="primary" onClick={() => navigate("/user/facilities")}>
          Kembali ke Daftar Fasilitas
        </Button>
      </div>
    );
  }

  const isHospital = facility.category === "Rumah Sakit";
  const hasCoordinates =
    facility.latitude !== null &&
    facility.longitude !== null &&
    !isNaN(facility.latitude) &&
    !isNaN(facility.longitude);

  const googleMapsUrl = hasCoordinates
    ? `https://www.google.com/maps/dir/?api=1&destination=${facility.latitude},${facility.longitude}`
    : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        facility.name + " " + facility.address
      )}`;

  return (
    <div className="space-y-6 pb-12">
      {/* Back Button */}
      <div>
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-xs font-semibold text-[#022022] hover:text-[#033033] transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Fasilitas Kesehatan</span>
        </button>
      </div>

      {/* Facility Header Banner with Photo */}
      <div className="bg-white rounded-2xl border border-[#E2ECEB] shadow-xs overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-0">
          {/* Facility Photo */}
          <div className="md:col-span-5 lg:col-span-4 relative h-56 md:h-full min-h-[220px] bg-gray-100 overflow-hidden">
            <img
              src={
                facility.image ||
                "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=600"
              }
              alt={facility.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-3 left-3 flex items-center gap-2">
              <Badge
                variant={isHospital ? "default" : "teal"}
                className={isHospital ? "bg-[#022022] text-[#37F4B4] border border-[#37F4B4]/30" : "bg-[#022022]/10 text-[#022022] border border-[#37F4B4]/20"}
              >
                {facility.category}
              </Badge>
              {facility.type && (
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-white/95 text-[#0D2626] shadow-2xs">
                  {facility.type}
                </span>
              )}
            </div>
          </div>

          {/* Facility Info Header */}
          <div className="md:col-span-7 lg:col-span-8 p-6 sm:p-7 flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs text-[#526666]">
                <Hospital className="w-4 h-4 text-[#022022]" />
                <span>Kecamatan {facility.district || "Semarang"}</span>
              </div>

              <h1 className="font-poppins font-bold text-2xl sm:text-3xl text-[#0D2626] leading-tight">
                {facility.name}
              </h1>

              <p className="text-xs sm:text-sm text-[#526666] flex items-start gap-1.5 leading-relaxed max-w-2xl">
                <MapPin className="w-4 h-4 text-[#022022] shrink-0 mt-0.5" />
                <span>{facility.address}</span>
              </p>
            </div>

            {/* Quick Action Buttons */}
            <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-[#E2ECEB]">
              {facility.phone && (
                <a href={`tel:${facility.phone.replace(/[^0-9]/g, "")}`}>
                  <Button variant="primary" size="sm" leftIcon={Phone}>
                    Hubungi ({facility.phone})
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
              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="outline" size="sm" leftIcon={Navigation} rightIcon={ExternalLink}>
                  Google Maps
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Information & Services */}
        <div className="lg:col-span-7 space-y-6">
          {/* Main Details Card */}
          <Card className="space-y-4">
            <h3 className="font-poppins font-semibold text-lg text-[#022022] border-b border-[#E2ECEB] pb-3">
              Informasi Utama
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="space-y-1">
                <span className="text-[#526666] font-medium">Kategori:</span>
                <p className="font-semibold text-[#0D2626]">{facility.category}</p>
              </div>

              <div className="space-y-1">
                <span className="text-[#526666] font-medium">Tipe Fasilitas:</span>
                <p className="font-semibold text-[#0D2626]">{facility.type || "-"}</p>
              </div>

              <div className="space-y-1">
                <span className="text-[#526666] font-medium">Kecamatan:</span>
                <p className="font-semibold text-[#0D2626]">{facility.district || "Semarang"}</p>
              </div>

              <div className="space-y-1">
                <span className="text-[#526666] font-medium">Nomor Telepon:</span>
                <p className="font-semibold text-[#0D2626]">{facility.phone || "Tidak tersedia"}</p>
              </div>

              {facility.whatsapp && (
                <div className="space-y-1">
                  <span className="text-[#526666] font-medium">Nomor WhatsApp:</span>
                  <p className="font-semibold text-[#022022]">{facility.whatsapp}</p>
                </div>
              )}

              {hasCoordinates && (
                <div className="space-y-1">
                  <span className="text-[#526666] font-medium">Koordinat GPS:</span>
                  <p className="font-semibold text-[#0D2626] font-mono text-[11px]">
                    {facility.latitude.toFixed(4)}, {facility.longitude.toFixed(4)}
                  </p>
                </div>
              )}
            </div>
          </Card>

          {/* Services List Card */}
          <Card className="space-y-4">
            <div className="flex items-center gap-2 border-b border-[#E2ECEB] pb-3">
              <Stethoscope className="w-5 h-5 text-[#022022]" />
              <h3 className="font-poppins font-semibold text-lg text-[#022022]">
                Layanan & Poliklinik
              </h3>
            </div>

            {facility.services && facility.services.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {facility.services.map((service, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 p-2.5 rounded-xl bg-[#F8FAFA] border border-[#E2ECEB] text-xs font-medium text-[#0D2626]"
                  >
                    <ShieldCheck className="w-4 h-4 text-[#022022]" />
                    <span className="capitalize">{service}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-[#526666]">
                Daftar layanan spesifik belum tersedia untuk fasilitas kesehatan ini.
              </p>
            )}
          </Card>
        </div>

        {/* Right Column: Map Preview */}
        <div className="lg:col-span-5 space-y-4">
          <Card className="space-y-3 p-4 sm:p-5">
            <div className="flex items-center justify-between border-b border-[#E2ECEB] pb-3">
              <h3 className="font-poppins font-semibold text-base sm:text-lg text-[#022022]">
                Peta Lokasi
              </h3>
              {hasCoordinates && (
                <a
                  href={googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#022022] hover:underline"
                >
                  <span>Buka Rute</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>

            {hasCoordinates ? (
              <div className="w-full">
                <MapComponent
                  facilities={[facility]}
                  className="h-[360px] sm:h-[400px] w-full"
                />
              </div>
            ) : (
              <div className="h-64 rounded-2xl bg-[#F8FAFA] border border-dashed border-[#E2ECEB] flex flex-col items-center justify-center p-6 text-center space-y-2">
                <MapPin className="w-10 h-10 text-gray-300" />
                <p className="font-poppins font-semibold text-sm text-[#0D2626]">
                  Lokasi peta belum tersedia
                </p>
                <p className="text-xs text-[#526666] max-w-xs">
                  Koordinat geografis untuk fasilitas ini belum dimasukkan ke sistem WARAS.
                </p>
              </div>
            )}

            <div className="p-3 bg-[#022022]/5 rounded-xl text-xs text-[#0D2626] space-y-1 border border-[#37F4B4]/25">
              <p className="font-semibold text-[#022022]">Alamat Lengkap:</p>
              <p className="text-[#526666] leading-relaxed">{facility.address}</p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
