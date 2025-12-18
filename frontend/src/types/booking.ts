export interface Booking {
  id: string;
  userId: string;
  busId: string;
  seats: number[];
  totalPrice: number;
  bookingDate: string;
  travelDate: string;
  status: 'booked' | 'confirmed' | 'cancelled' | 'completed';
}

export interface BookingDetails extends Booking {
  bus: {
    name: string;
    operator: string;
    from: string;
    to: string;
    departureTime: string;
    arrivalTime: string;
  };
  review?: { rating: number; comment: string }; // Add review property here
}
