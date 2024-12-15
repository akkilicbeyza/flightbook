"use client";

import { useState, useEffect } from "react";
import { User } from "../types";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { toast } from "sonner";
import { MAX_SEATS } from "../constants";

interface SeatMapProps {
  onSeatSelect: (seatNumber: number) => void;
  selectedSeats: number[];
}

export default function SeatMap({ onSeatSelect, selectedSeats }: SeatMapProps) {
  const [occupiedUsers, setOccupiedUsers] = useState<User[]>([]);
  
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => setOccupiedUsers(data.slice(0, 10)))
      .catch(() => toast.error("Kullanıcı bilgileri yüklenirken bir hata oluştu"));
  }, []);

  const isSeatOccupied = (seatNumber: number) => seatNumber <= 10;
  const isSeatSelected = (seatNumber: number) => selectedSeats.includes(seatNumber);

  const handleSeatClick = (seatNumber: number) => {
    if (isSeatOccupied(seatNumber)) {
      toast.error("Bu koltuk dolu!");
      return;
    }
    
    if (selectedSeats.length >= MAX_SEATS && !isSeatSelected(seatNumber)) {
      toast.error(`En fazla ${MAX_SEATS} koltuk seçebilirsiniz!`);
      return;
    }

    onSeatSelect(seatNumber);
  };

  const getSeatColor = (occupied: boolean, selected: boolean) => {
    if (occupied) return "bg-red-500 cursor-not-allowed";
    if (selected) return "bg-yellow-400";
    return "bg-green-500 hover:bg-green-600";
  };

  const renderSeat = (seatNumber: number) => {
    const occupied = isSeatOccupied(seatNumber);
    const selected = isSeatSelected(seatNumber);
    const user = occupiedUsers[seatNumber - 1];
    const seatColor = getSeatColor(occupied, selected);

    return (
      <Tooltip key={seatNumber}>
        <TooltipTrigger asChild>
          <button
            className={`w-10 h-10 m-1 rounded ${seatColor}`}
            onClick={() => handleSeatClick(seatNumber)}
            disabled={occupied}
          >
            {seatNumber}
          </button>
        </TooltipTrigger>
        <TooltipContent>
          {occupied ? `${user?.name}` : `Koltuk ${seatNumber}`}
        </TooltipContent>
      </Tooltip>
    );
  };

  return (
    <div className="grid grid-cols-4 gap-2 p-4">
      {Array.from({ length: 40 }, (_, i) => renderSeat(i + 1))}
    </div>
  );
}