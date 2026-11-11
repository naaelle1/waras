import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Link } from "react-router-dom";
import L from "leaflet";
import { ArrowRight, MapPin, Hospital, Info } from "lucide-react";
import "leaflet/dist/leaflet.css";

// Fix default leaflet marker icon issue in Vite build environments
delete L.Icon.Default.prototype._getIconUrl;

// Custom SVG Markers for Puskesmas (Teal) and Rumah Sakit (Dark Navy)
const puskesmasIcon = new L.DivIcon({
  className: "custom-leaflet-marker",
  html: `<div style="
    background-color: #0B5D5D;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    box-shadow: 0 4px 12px rgba(11, 93, 93, 0.4);
    border: 2px solid white;
  ">
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 8.2c0 7.3-8 11.8-8 11.8z"/><circle cx="12" cy="10" r="3"/></svg>
  </div>`,
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

const hospitalIcon = new L.DivIcon({
  className: "custom-leaflet-marker",
  html: `<div style="
    background-color: #002F2F;
    width: 34px;
    height: 34px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    box-shadow: 0 4px 14px rgba(0, 47, 47, 0.5);
    border: 2px solid white;
  ">
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 6v12M6 12h12"/></svg>
  </div>`,
  iconSize: [34, 34],
  iconAnchor: [17, 34],
  popupAnchor: [0, -34],
});

// Center default on Kota Semarang (Simpang Lima area)
const SEMARANG_CENTER = [-6.9932, 110.4203];

export default function MapComponent({ facilities = [] }) {
  // Filter facilities with valid latitude & longitude
  const mappedFacilities = facilities.filter(
    (f) => f.latitude !== null && f.longitude !== null
  );

  return (
    <div className="relative w-full h-80 sm:h-100 lg:h-120 rounded-3xl overflow-hidden glass-card border border-white/80 shadow-md">
      <MapContainer
        center={SEMARANG_CENTER}
        zoom={13}
        scrollWheelZoom={false}
        className="w-full h-full z-10"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {mappedFacilities.map((facility) => {
          const isHospital = facility.category === "Rumah Sakit";
          const icon = isHospital ? hospitalIcon : puskesmasIcon;

          return (
            <Marker
              key={facility.id}
              position={[facility.latitude, facility.longitude]}
              icon={icon}
            >
              <Popup className="waras-custom-popup">
                <div className="p-1 max-w-xs font-inter text-[#082C2C]">
                  <div className="flex items-center gap-1.5 mb-1">
                    <span
                      className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                        isHospital
                          ? "bg-[#002F2F] text-white"
                          : "bg-[#DDEEEE] text-[#002F2F]"
                      }`}
                    >
                      {facility.category}
                    </span>
                    {facility.district && (
                      <span className="text-[10px] text-[#647474]">
                        • {facility.district}
                      </span>
                    )}
                  </div>

                  <h4 className="font-poppins font-semibold text-sm text-[#082C2C] leading-snug mb-1">
                    {facility.name}
                  </h4>

                  <p className="text-xs text-[#647474] mb-3 flex items-start gap-1">
                    <MapPin className="w-3.5 h-3.5 shrink-0 text-[#0B5D5D] mt-0.5" />
                    <span className="line-clamp-2">{facility.address}</span>
                  </p>

                  <Link
                    to={`/user/facilities/${facility.id}`}
                    className="inline-flex items-center justify-center gap-1 w-full px-3 py-1.5 rounded-lg bg-[#002F2F] hover:bg-[#0B5D5D] text-white text-xs font-semibold transition-colors"
                  >
                    <span>Lihat Detail</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>

      {/* Floating Info Banner */}
      <div className="absolute bottom-3 left-3 right-3 z-20 bg-white/90 backdrop-blur-md px-3.5 py-2 rounded-2xl border border-white/80 shadow-sm flex items-center justify-between text-xs text-[#647474]">
        <div className="flex items-center gap-2">
          <Info className="w-4 h-4 text-[#0B5D5D]" />
          <span>
            Menampilkan <strong>{mappedFacilities.length}</strong> titik lokasi faskes terpetakan di Semarang.
          </span>
        </div>
        <div className="hidden sm:flex items-center gap-3 font-medium text-[11px]">
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-[#0B5D5D]" /> Puskesmas
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-[#002F2F]" /> Rumah Sakit
          </span>
        </div>
      </div>
    </div>
  );
}