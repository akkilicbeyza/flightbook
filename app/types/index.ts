export interface User {
  id: number;
  name: string;
  email: string;
}

export interface Passenger {
  name: string;
  surname: string;
  phone: string;
  email: string;
  gender: string;
  birthDate: string;
}

export interface SeatSelection {
  seatNumber: number;
  passenger?: Passenger;
}