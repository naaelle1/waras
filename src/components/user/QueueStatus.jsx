import React from "react";
import Card from "../common/Card";
import Badge from "../common/Badge";
import { Users, Clock, Hospital } from "lucide-react";

export default function QueueStatus({ item }) {
  const isCrowded = item.queueStatus === "Ramai";
  const isModerate = item.queueStatus === "Sedang";

  return (
    <Card hoverEffect className="flex flex-col justify-between h-full">
      <div>
        <div className="flex items-start justify-between gap-2 mb-3">
          <div className="flex items-center gap-2.5">
            <div className="p-2.5 rounded-xl bg-[#EBF5F5] text-[#003B3B]">
              <Hospital className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-poppins font-semibold text-sm text-[#0D2626] line-clamp-1">
                {item.facilityName}
              </h4>
              <p className="text-xs text-[#526666]">{item.service}</p>
            </div>
          </div>
          <Badge variant={item.queueStatus}>{item.queueStatus}</Badge>
        </div>

        {/* PROGRESS / LOAD BAR */}
        <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden my-3">
          <div
            className={`h-full rounded-full ${
              isCrowded
                ? "bg-rose-500 w-[85%]"
                : isModerate
                ? "bg-amber-500 w-[50%]"
                : "bg-emerald-500 w-[20%]"
            }`}
          />
        </div>

        <div className="grid grid-cols-2 gap-2 pt-2 border-t border-gray-100 font-inter">
          <div className="flex items-center gap-1.5 text-xs text-[#526666]">
            <Users className="w-3.5 h-3.5 text-gray-400 shrink-0" />
            <span>Antrean: <strong className="text-[#0D2626]">{item.currentQueue}</strong></span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-[#526666]">
            <Clock className="w-3.5 h-3.5 text-gray-400 shrink-0" />
            <span>Estimasi: <strong className="text-[#0D2626]">{item.estimatedWait}</strong></span>
          </div>
        </div>
      </div>
    </Card>
  );
}
