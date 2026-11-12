import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { Link } from "react-router-dom";
import L from "leaflet";
import { ArrowRight, MapPin, Hospital, Info, Navigation, ExternalLink } from "lucide-react";
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
    box-shadow: 0 4px 12px rgba(11, 93, 93, 0.45);
    border: 2px solid white;
    cursor: pointer;
    transition: transform 0.2s ease;
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
    background-color: #003B3B;
    width: 34px;
    height: 34px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    box-shadow: 0 4px 14px rgba(0, 59, 59, 0.55);
    border: 2px solid white;
    cursor: pointer;
    transition: transform 0.2s ease;
  ">
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 6v12M6 12h12"/></svg>
  </div>`,
  iconSize: [34, 34],
  iconAnchor: [17, 34],
  popupAnchor: [0, -34],
});

const userLocationIcon = new L.DivIcon({
  className: "custom-leaflet-marker",
  html: `<div style="
    background-color: #2563EB;
    width: 22px;
    height: 22px;
    border-radius: 50%;
    border: 3px solid white;
    box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.35);
  "></div>`,
  iconSize: [22, 22],
  iconAnchor: [11, 11],
  popupAnchor: [0, -11],
});

// Center default Kota Semarang (Simpang Lima area)
const SEMARANG_CENTER = [-6.9932, 110.4203];

// Helper component untuk auto-recenter / fitBounds & invalidate size
function MapBoundsUpdater({ facilities, userLocation }) {
  const map = useMap();

  useEffect(() => {
    // Invalidate map size so Leaflet accurately fills the container
    map.invalidateSize();
    const timer = setTimeout(() => {
      map.invalidateSize();
    }, 200);
    return () => clearTimeout(timer);
  }, [map]);

  useEffect(() => {
    if (userLocation) {
      map.flyTo(userLocation, 15, { duration: 1.2 });
      return;
    }

    if (!facilities || facilities.length === 0) return;

    if (facilities.length === 1) {
      const f = facilities[0];
      if (f.latitude && f.longitude) {
        map.setView([f.latitude, f.longitude], 16);
      }
    } else {
      const bounds = L.latLngBounds(
        facilities.map((f) => [f.latitude, f.longitude])
      );
      if (bounds.isValid()) {
        map.fitBounds(bounds, { padding: [40, 40], maxZoom: 15, duration: 0.8 });
      }
    }
  }, [facilities, userLocation, map]);

  return null;
}

export default function MapComponent({
  facilities = [],
  className = "h-80 sm:h-96 lg:h-[400px] w-full"
}) {
  const [userLocation, setUserLocation] = useState(null);
  const [isLocating, setIsLocating] = useState(false);

  // Filter fasilitas yang memiliki koordinat valid
  const mappedFacilities = facilities.filter(
    (f) => f.latitude !== null && f.longitude !== null && !isNaN(f.latitude) && !isNaN(f.longitude)
  );

  const isSingle = mappedFacilities.length === 1;
  const singleFacility = isSingle ? mappedFacilities[0] : null;

  const initialCenter = singleFacility
    ? [singleFacility.latitude, singleFacility.longitude]
    : SEMARANG_CENTER;
  const initialZoom = singleFacility ? 16 : 13;

  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      alert("Fitur geolokasi tidak didukung oleh browser Anda.");
      return;
    }

    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserLocation([pos.coords.latitude, pos.coords.longitude]);
        setIsLocating(false);
      },
      (err) => {
        console.warn("Gagal mendapatkan lokasi:", err.message);
        alert("Tidak dapat mengakses lokasi Anda. Pastikan izin lokasi diaktifkan.");
        setIsLocating(false);
      },
      { enableHighAccuracy: true, timeout: 8000 }
    );
  };

  return (
    <div
      className={`relative w-full rounded-2xl overflow-hidden bg-white border border-[#E2ECEB] shadow-xs ${className}`}
      style={{ minHeight: "320px" }}
    >
      <MapContainer
        key={singleFacility ? `facility-${singleFacility.id}` : `facilities-map-${mappedFacilities.length}`}
        center={initialCenter}
        zoom={initialZoom}
        scrollWheelZoom={false}
        className="w-full h-full z-10"
        style={{ height: "100%", width: "100%", minHeight: "320px" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <MapBoundsUpdater facilities={mappedFacilities} userLocation={userLocation} />

        {/* User Location Marker */}
        {userLocation && (
          <Marker position={userLocation} icon={userLocationIcon}>
            <Popup className="waras-custom-popup">
              <div className="p-1 font-inter text-xs font-semibold text-[#0D2626]">
                📍 Posisi Anda Saat Ini
              </div>
            </Popup>
          </Marker>
        )}

        {/* Facility Markers */}
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
                <div className="p-1 max-w-xs font-inter text-[#0D2626]">
                  <div className="flex items-center gap-1.5 mb-1">
                    <span
                      className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                        isHospital
                          ? "bg-[#003B3B] text-white"
                          : "bg-[#EBF5F5] text-[#003B3B]"
                      }`}
                    >
                      {facility.category}
                    </span>
                    {facility.district && (
                      <span className="text-[10px] text-[#526666]">
                        • {facility.district}
                      </span>
                    )}
                  </div>

                  <h4 className="font-poppins font-semibold text-sm text-[#0D2626] leading-snug mb-1">
                    {facility.name}
                  </h4>

                  <p className="text-xs text-[#526666] mb-3 flex items-start gap-1">
                    <MapPin className="w-3.5 h-3.5 shrink-0 text-[#003B3B] mt-0.5" />
                    <span className="line-clamp-2">{facility.address}</span>
                  </p>

                  {isSingle ? (
                    <a
                      href={`https://www.google.com/maps/dir/?api=1&destination=${facility.latitude},${facility.longitude}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-1.5 w-full px-3 py-1.5 rounded-lg bg-[#003B3B] hover:bg-[#002D2D] text-white text-xs font-semibold transition-colors"
                    >
                      <Navigation className="w-3.5 h-3.5" />
                      <span>Petunjuk Arah (Google Maps)</span>
                    </a>
                  ) : (
                    <Link
                      to={`/user/facilities/${facility.id}`}
                      className="inline-flex items-center justify-center gap-1 w-full px-3 py-1.5 rounded-lg bg-[#003B3B] hover:bg-[#002D2D] text-white text-xs font-semibold transition-colors"
                    >
                      <span>Lihat Detail</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  )}
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>

      {/* Floating Action Button: Lokasi Saya */}
      <div className="absolute top-3 right-3 z-20 flex flex-col gap-2">
        <button
          onClick={handleGetLocation}
          disabled={isLocating}
          title="Tampilkan Lokasi Saya"
          className="p-2.5 rounded-xl bg-white hover:bg-gray-50 text-[#003B3B] border border-[#E2ECEB] shadow-xs transition-all active:scale-95 cursor-pointer disabled:opacity-50"
        >
          <Navigation className={`w-4 h-4 ${isLocating ? "animate-spin text-blue-600" : ""}`} />
        </button>
      </div>

      {/* Floating Info Banner */}
      {!isSingle && (
        <div className="absolute bottom-3 left-3 right-3 z-20 bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-xl border border-[#E2ECEB] shadow-xs flex items-center justify-between text-xs text-[#526666]">
          <div className="flex items-center gap-2">
            <Info className="w-4 h-4 text-[#003B3B]" />
            <span>
              Menampilkan <strong>{mappedFacilities.length}</strong> fasilitas kesehatan terpetakan di Semarang.
            </span>
          </div>
          <div className="hidden sm:flex items-center gap-3 font-medium text-[11px]">
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-[#0B5D5D]" /> Puskesmas (38)
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-[#003B3B]" /> Rumah Sakit (26)
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
