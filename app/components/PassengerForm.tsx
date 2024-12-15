"use client";

import { useState } from "react";
import { Passenger } from "../types";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface PassengerFormProps {
  index: number;
  onSubmit: (passenger: Passenger) => void;
}

export default function PassengerForm({ index, onSubmit }: PassengerFormProps) {
  const [passenger, setPassenger] = useState<Passenger>({
    name: "",
    surname: "",
    phone: "",
    email: "",
    gender: "",
    birthDate: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (Object.values(passenger).some((value) => !value)) {
      toast.error("Lütfen tüm alanları doldurun!");
      return;
    }
    onSubmit(passenger);
    toast.success("Yolcu bilgileri kaydedildi");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mb-8">
      <h3 className="text-lg font-semibold">{index}. Yolcu</h3>
      <div className="grid grid-cols-2 gap-4">
        <Input
          placeholder="İsim"
          value={passenger.name}
          onChange={(e) => setPassenger({ ...passenger, name: e.target.value })}
          required
        />
        <Input
          placeholder="Soyisim"
          value={passenger.surname}
          onChange={(e) => setPassenger({ ...passenger, surname: e.target.value })}
          required
        />
        <Input
          placeholder="Telefon"
          type="tel"
          value={passenger.phone}
          onChange={(e) => setPassenger({ ...passenger, phone: e.target.value })}
          required
        />
        <Input
          placeholder="E-Posta"
          type="email"
          value={passenger.email}
          onChange={(e) => setPassenger({ ...passenger, email: e.target.value })}
          required
        />
        <Select
          value={passenger.gender}
          onValueChange={(value) => setPassenger({ ...passenger, gender: value })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Cinsiyet" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="male">Erkek</SelectItem>
            <SelectItem value="female">Kadın</SelectItem>
          </SelectContent>
        </Select>
        <Input
          placeholder="Doğum Tarihi"
          type="date"
          value={passenger.birthDate}
          onChange={(e) => setPassenger({ ...passenger, birthDate: e.target.value })}
          required
        />
      </div>
      <Button type="submit">Kaydet</Button>
    </form>
  );
}