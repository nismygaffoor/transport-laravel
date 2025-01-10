export interface User {
  id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
}

export interface Bus {
  id: string;
  name: string;
  operator: string;
  type: 'Private' | 'Public';
  departureTime: string;
  arrivalTime: string;
  from: string;
  to: string;
  price: number;
  availableSeats: number;
  totalSeats: number;
  amenities: string[];
}

export interface Booking {
  id: string;
  userId: string;
  busId: string;
  seats: number[];
  totalPrice: number;
  bookingDate: string;
  travelDate: string;
  status: 'confirmed' | 'cancelled' | 'completed';
}