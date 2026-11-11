import React, { useState, useMemo } from "react";
import { MapPin, Search, Filter, Hospital, RefreshCw } from "lucide-react";

import SearchBar from "../../components/common/SearchBar";
import Button from "../../components/common/Button";
import MapComponent from "../../components/user/MapComponent";
import FacilityCard from "../../components/user/FacilityCard";
import { facilities } from "../../data/facilities";

export default function Facilities() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Semua");
  const [selectedDistrict, setSelectedDistrict] = useState("Semua");

  // Extract unique districts from facility dataset
  const districts = useMemo(() => {
    const list = facilities
      .map((f) => f.district)
      .filter((d) => d && d !== "Semarang");
    return ["Semua", ...Array.from(new Set(list)).sort()];
  }, []);

  // Filter facilities based on search term, category, and district
  const filteredFacilities = useMemo(() => {
    return facilities.filter((facility) => {
      // Category filter
      const matchesCategory =
        selectedCategory === "Semua" || facility.category === selectedCategory;

      // District filter
      const matchesDistrict =
        selectedDistrict === "Semua" || facility.district === selectedDistrict;

      // Search term filter
      const searchLower = searchTerm.toLowerCase();
      const matchesSearch =
        !searchTerm ||
        facility.name.toLowerCase().includes(searchLower) ||
        facility.address.toLowerCase().includes(searchLower) ||
        (facility.district && facility.district.toLowerCase().includes(searchLower)) ||
        (facility.services &&
          facility.services.some((s) => s.toLowerCase().includes(searchLower)));

      return matchesCategory && matchesDistrict && matchesSearch;
    });
  }, [searchTerm, selectedCategory, selectedDistrict]);

  const handleResetFilters = () => {
    setSearchTerm("");
    setSelectedCategory("Semua");
    setSelectedDistrict("Semua");
  };

  return (
    <div className="space-y-8 pb-12">
      {/* SECTION 1 — PAGE HEADER */}
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2 text-[#003B3B]">
          <MapPin className="w-7 h-7 stroke-[2.2]" />
          <h1 className="font-poppins font-bold text-2xl lg:text-3xl tracking-tight text-[#0D2626]">
            Fasilitas Kesehatan
          </h1>
        </div>
        <p className="text-sm text-[#526666] font-inter">
          Temukan informasi dan lokasi fasilitas kesehatan di Kota Semarang.
        </p>
      </div>

      {/* SECTION 2 — SEARCH AND FILTER AREA */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl space-y-4 border border-[#E2ECEB] shadow-xs">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 items-center">
          {/* Search Input */}
          <div className="lg:col-span-6">
            <SearchBar
              placeholder="Cari puskesmas, rumah sakit, alamat, atau layanan..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onSearch={(val) => setSearchTerm(val)}
            />
          </div>

          {/* District Selector Dropdown */}
          <div className="lg:col-span-6 flex flex-wrap sm:flex-nowrap items-center gap-2">
            <div className="relative w-full">
              <select
                value={selectedDistrict}
                onChange={(e) => setSelectedDistrict(e.target.value)}
                className="w-full px-4 py-2.5 bg-[#F8FAFA] border border-[#E2ECEB] rounded-xl text-xs sm:text-sm text-[#0D2626] focus:outline-none focus:ring-2 focus:ring-[#003B3B]/10 transition-all font-inter appearance-none cursor-pointer"
              >
                <option value="Semua">Semua Kecamatan</option>
                {districts
                  .filter((d) => d !== "Semua")
                  .map((d) => (
                    <option key={d} value={d}>
                      Kecamatan {d}
                    </option>
                  ))}
              </select>
              <Filter className="w-4 h-4 text-gray-400 absolute right-4 top-3 pointer-events-none" />
            </div>

            {(searchTerm || selectedCategory !== "Semua" || selectedDistrict !== "Semua") && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleResetFilters}
                leftIcon={RefreshCw}
                className="shrink-0 text-xs"
              >
                Reset Filter
              </Button>
            )}
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 pt-1 overflow-x-auto scrollbar-thin">
          <span className="text-xs font-semibold text-[#526666] mr-1 shrink-0">
            Kategori:
          </span>
          {["Semua", "Puskesmas", "Rumah Sakit"].map((cat) => {
            const active = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-poppins font-semibold transition-all cursor-pointer shrink-0 ${
                  active
                    ? "bg-[#003B3B] text-white shadow-xs"
                    : "bg-[#F8FAFA] text-[#526666] hover:bg-[#EBF5F5] hover:text-[#003B3B] border border-[#E2ECEB]"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* SECTION 3 — INTERACTIVE MAP */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-poppins font-semibold text-lg sm:text-xl text-[#0D2626]">
            Peta Lokasi Fasilitas Kesehatan
          </h3>
          <span className="text-xs text-[#526666]">Kota Semarang</span>
        </div>
        <MapComponent facilities={filteredFacilities} className="h-80 sm:h-96 w-full" />
      </section>

      {/* SECTION 4 — FACILITY LIST */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-poppins font-semibold text-lg sm:text-xl text-[#0D2626]">
              Daftar Fasilitas Kesehatan
            </h3>
            <p className="text-xs text-[#526666]">
              Menampilkan <strong>{filteredFacilities.length}</strong> fasilitas kesehatan dari hasil pencarian.
            </p>
          </div>
        </div>

        {filteredFacilities.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredFacilities.map((facility) => (
              <FacilityCard key={facility.id} facility={facility} />
            ))}
          </div>
        ) : (
          <div className="p-12 text-center bg-white rounded-2xl border border-[#E2ECEB] space-y-3">
            <Hospital className="w-12 h-12 text-gray-300 mx-auto" />
            <h4 className="font-poppins font-semibold text-base text-[#0D2626]">
              Fasilitas Kesehatan Tidak Ditemukan
            </h4>
            <p className="text-xs text-[#526666] max-w-sm mx-auto">
              Tidak ada fasilitas yang cocok dengan pencarian atau filter yang Anda pilih. Silakan coba kata kunci lain.
            </p>
            <Button variant="secondary" size="sm" onClick={handleResetFilters}>
              Reset Semua Filter
            </Button>
          </div>
        )}
      </section>
    </div>
  );
}