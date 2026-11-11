import React from "react";
import Card from "../common/Card";
import Badge from "../common/Badge";
import { Users, Clock, Hospital } from "lucide-react";

export default function QueueStatus({ item }) {
  return (
    <Card hoverEffect className="flex flex-col justify-between h-full">
      <div>
        <div className="flex items-start justify-between gap-2 mb-3">
          <div className="flex items-center gap-2.5">
            <div className="p-2.5 rounded-xl bg-[#DDEEEE] text-[#003B3B]">
              <Hospital className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-poppins font-semibold text-sm text-[#062F30]">
                {item.facilityName}
              </h4>
              <p className="text-xs text-[#5F6F70]">{item.service}</p>
            </div>
          </div>
          <Badge variant={item.queueStatus}>{item.queueStatus}</Badge>
        </div>

        <div className="grid grid-cols-2 gap-2 mt-4 pt-3 border-t border-gray-100">
          <div className="flex items-center gap-2 text-xs text-[#5F6F70]">
            <Users className="w-4 h-4 text-gray-400" />
            <span>Antrean: <strong className="text-[#062F30]">{item.currentQueue} orang</strong></span>
          </div>
          <div className="flex items-center gap-2 text-xs text-[#5F6F70]">
            <Clock className="w-4 h-4 text-gray-400" />
            <span>Estimasi: <strong className="text-[#062F30]">{item.estimatedWait}</strong></span>
          </div>
        </div>
      </div>
    </Card>
  );
}