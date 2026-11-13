import React from "react";
import { Link } from "react-router-dom";
import Card from "../common/Card";
import Badge from "../common/Badge";
import Button from "../common/Button";
import GlassButton from "../ui/GlassButton";
import { MapPin, Phone, ArrowRight, Hospital, Stethoscope } from "lucide-react";

export default function FacilityCard({ facility }) {
  const isHospital = facility.category === "Rumah Sakit";

  return (
    <Card hoverEffect className="overflow-hidden p-0 flex flex-col justify-between h-full border border-[#E2ECEB]">
      <div>
        {/* Header Image Container */}
        <div className="relative h-36 w-full overflow-hidden bg-gray-100">
          <img
            src={
              facility.image ||
              "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=600"
            }
            alt={facility.name}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
          <div className="absolute top-3 left-3 flex items-center gap-1.5">
            <Badge
              variant={isHospital ? "default" : "teal"}
              className={isHospital ? "bg-[#022022] text-white border border-white/20" : "bg-[#022022]/10 text-[#022022] border border-[#022022]/15"}
            >
              {facility.category}
            </Badge>
            {facility.type && (
              <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-white/95 text-[#0D2626] shadow-2xs">
                {facility.type}
              </span>
            )}
          </div>
        </div>

        {/* Content Body */}
        <div className="p-4 space-y-2">
          <h4 className="font-poppins font-semibold text-base text-[#0D2626] line-clamp-1 leading-snug">
            {facility.name}
          </h4>

          <p className="text-xs text-[#526666] flex items-start gap-1.5 line-clamp-2 leading-relaxed">
            <MapPin className="w-3.5 h-3.5 text-[#022022] shrink-0 mt-0.5" />
            <span>{facility.address}</span>
          </p>

          <div className="flex flex-wrap items-center gap-y-1 gap-x-3 text-xs text-[#526666]">
            {facility.district && (
              <span className="flex items-center gap-1">
                <Hospital className="w-3.5 h-3.5 text-gray-400" />
                {facility.district}
              </span>
            )}

            {facility.phone && (
              <span className="flex items-center gap-1">
                <Phone className="w-3.5 h-3.5 text-gray-400" />
                {facility.phone}
              </span>
            )}
          </div>

          {/* Services List Preview */}
          {facility.services && facility.services.length > 0 && (
            <div className="pt-2 border-t border-gray-100">
              <div className="flex items-center gap-1 text-[11px] font-semibold text-[#022022] mb-1">
                <Stethoscope className="w-3 h-3 text-[#022022]" />
                <span>Layanan Utama:</span>
              </div>
              <div className="flex flex-wrap gap-1">
                {facility.services.slice(0, 3).map((service, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-0.5 rounded-md bg-[#F8FAFA] text-[10px] text-[#0D2626] font-medium border border-[#E2ECEB]"
                  >
                    {service}
                  </span>
                ))}
                {facility.services.length > 3 && (
                  <span className="px-1.5 py-0.5 rounded text-[10px] text-[#809494] font-medium">
                    +{facility.services.length - 3} lainnya
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer CTA */}
      <div className="p-4 pt-2 border-t border-gray-50">
        <GlassButton
          to={`/user/facilities/${facility.id}`}
          variant="card-subtle"
          className="w-full justify-center py-2.5 text-xs font-semibold"
          rightIcon={ArrowRight}
        >
          Lihat Detail
        </GlassButton>
      </div>
    </Card>
  );
}
