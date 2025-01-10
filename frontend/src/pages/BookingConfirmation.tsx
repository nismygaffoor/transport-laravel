import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { BookingConfirmation } from "../components/booking/BookingConfirmation";
import { useBooking } from "../hooks/useBooking";
import { Bus } from "../types/bus";

export function BookingConfirmationPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { createBooking } = useBooking();
  const { busId, selectedSeats, travelDate } = location.state || {};

  const [bus, setBus] = useState<Bus | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!busId || !selectedSeats) {
      navigate("/");
      return;
    }

    const fetchBusDetails = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/buses/${busId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch bus details");
        }
        const data = await response.json();
        setBus(data);
      } catch (error) {
        console.error("Error fetching bus details:", error);
        toast.error("Unable to load bus details.");
      } finally {
        setLoading(false);
      }
    };

    fetchBusDetails();
  }, [busId, selectedSeats, navigate]);

  const handleConfirmBooking = async () => {
    if (!bus) {
      toast.error("Bus details are not available.");
      return;
    }

    try {
      // Save selected seats in the database
      const response = await fetch("http://localhost:8000/api/seats/select", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          seat_ids: selectedSeats,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to save selected seats");
      }

      // Confirm the booking
      const booking = await createBooking({
        busId,
        seats: selectedSeats,
        travelDate,
      });

      // Calculate price details
      const seatPrice = bus.price;
      const serviceFee = selectedSeats.length * 50; // Example fee
      const totalPrice = selectedSeats.length * seatPrice + serviceFee;

      // Navigate to success page with booking details
      navigate("/booking-success", {
        state: {
          booking: {
            ...booking,
            bus,
            totalPrice,
            serviceFee,
          },
        },
      });

      toast.success("Booking confirmed successfully!");
    } catch (error) {
      console.error("Error confirming booking:", error);
      toast.error("Failed to confirm booking. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-lg font-medium text-gray-700">Loading bus details...</p>
      </div>
    );
  }

  if (!bus) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-lg font-medium text-red-500">Bus details not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <BookingConfirmation
          booking={{
            bus,
            seats: selectedSeats,
            totalPrice: selectedSeats.length * bus.price,
            seatPrice: bus.price,
            serviceFee: selectedSeats.length * 50,
            travelDate,
          }}
          onConfirm={handleConfirmBooking}
        />
      </div>
    </div>
  );
}
