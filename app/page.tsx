"use client";

import { useState } from "react";
import SeatMap from "./components/SeatMap";
import PassengerForm from "./components/PassengerForm";
import TimeoutDialog from "./components/TimeoutDialog";
import { Passenger } from "./types";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useTimeout } from "./hooks/useTimeout";
import { SEAT_PRICE } from "./constants";

export default function Home() {
  const [selectedSeats, setSelectedSeats] = useState<number[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("selectedSeats");
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });
  
  const [passengers, setPassengers] = useState<Passenger[]>([]);
  const [lastActionTime, setLastActionTime] = useState(Date.now());
  const { showWarning, setShowWarning } = useTimeout(selectedSeats.length > 0, lastActionTime);

  const handleSeatSelect = (seatNumber: number) => {
    setLastActionTime(Date.now());
    setSelectedSeats((prev) =>
      prev.includes(seatNumber)
        ? prev.filter((seat) => seat !== seatNumber)
        : [...prev, seatNumber]
    );
    localStorage.setItem("selectedSeats", JSON.stringify(selectedSeats));
  };

  const handlePassengerSubmit = (passenger: Passenger) => {
    setLastActionTime(Date.now());
    setPassengers((prev) => [...prev, passenger]);
  };

  const handleComplete = () => {
    if (passengers.length !== selectedSeats.length) {
      toast.error("Lütfen tüm yolcu bilgilerini doldurun!");
      return;
    }
    
    toast.success("Rezervasyon başarıyla tamamlandı!");
    resetReservation();
  };

  const resetReservation = () => {
    setSelectedSeats([]);
    setPassengers([]);
    localStorage.removeItem("selectedSeats");
  };

  const handleTimeoutResponse = (shouldContinue: boolean) => {
    setShowWarning(false);
    if (!shouldContinue) {
      resetReservation();
      window.location.reload();
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-bold mb-4">Koltuk Seçimi</h2>
          <SeatMap onSeatSelect={handleSeatSelect} selectedSeats={selectedSeats} />
          <div className="mt-4 flex gap-4">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-red-500 rounded" />
              <span>Dolu</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-yellow-400 rounded" />
              <span>Seçili</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-green-500 rounded" />
              <span>Boş</span>
            </div>
          </div>
        </div>
        
        <div>
          <h2 className="text-2xl font-bold mb-4">Yolcu Bilgileri</h2>
          {selectedSeats.map((_, index) => (
            <PassengerForm
              key={index}
              index={index + 1}
              onSubmit={handlePassengerSubmit}
            />
          ))}
          
          {selectedSeats.length > 0 && (
            <div className="mt-8">
              <div className="text-xl font-bold mb-4">
                Toplam Ücret: {selectedSeats.length * SEAT_PRICE} TL
              </div>
              <Button onClick={handleComplete} className="w-full">
                İşlemleri Tamamla
              </Button>
            </div>
          )}
        </div>
      </div>

      {showWarning && (
        <TimeoutDialog
          onContinue={() => handleTimeoutResponse(true)}
          onCancel={() => handleTimeoutResponse(false)}
        />
      )}
    </div>
  );
}