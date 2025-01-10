import { useState } from 'react';

interface CreateBookingParams {
  busId: string;
  seats: number[];
  travelDate: string;
}

export function useBooking() {
  const [isLoading, setIsLoading] = useState(false);

  const createBooking = async (params: CreateBookingParams) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // In a real app, this would be an API call to create the booking
      const booking = {
        id: Math.random().toString(36).substr(2, 9),
        ...params,
        status: 'confirmed',
        bookingDate: new Date().toISOString(),
      };

      // Store booking in localStorage for demo purposes
      const bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
      bookings.push(booking);
      localStorage.setItem('bookings', JSON.stringify(bookings));

      return booking;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    createBooking,
    isLoading,
  };
}