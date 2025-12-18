import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { BookingConfirmation } from "../components/booking/BookingConfirmation";
import { useBooking } from "../hooks/useBooking";
import { Bus, Seat } from "../types/bus";

export function BookingConfirmationPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { createBooking } = useBooking();
  const { busId, selectedSeats, travelDate } = location.state || {};

  const [bus, setBus] = useState<Bus | null>(null);
  const [allSeats, setAllSeats] = useState<Seat[]>([]);
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

    const fetchSeats = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/seats?busId=${busId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch seats");
        }
        const data = await response.json();
        setAllSeats(data);
      } catch (error) {
        console.error("Error fetching seats:", error);
      }
    };

    fetchBusDetails();
    fetchSeats();
  }, [busId, selectedSeats, navigate]);

  const handleConfirmBooking = async () => {
    if (!bus) {
      toast.error("Bus details are not available.");
      return;
    }

    try {
      // Convert seat numbers to seat IDs
      const seatIds = selectedSeats
        .map((seatNumber: number) => {
          const seat = allSeats.find((s: Seat) => s.number === seatNumber);
          return seat ? seat.id : null;
        })
        .filter((id: number | null) => id !== null);

      if (seatIds.length === 0) {
        toast.error("Could not find selected seat IDs. Please try again.");
        return;
      }

      console.log("Selected seat numbers:", selectedSeats);
      console.log("Seat IDs to send:", seatIds);

      // Save selected seats in the database
      const response = await fetch("http://localhost:8000/api/seats/select", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          seat_ids: seatIds,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to save selected seats");
      }

      // Calculate price details
      const seatPrice = bus.price;
      const serviceFee = selectedSeats.length * 50; // Example fee
      const totalPrice = selectedSeats.length * seatPrice + serviceFee;

      // Get user info
      const userInfo = JSON.parse(localStorage.getItem("userInfo") || "{}");
      
      // Save booking to database
      const bookingResponse = await fetch("http://localhost:8000/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: userInfo.id,
          bus_id: busId,
          seat_numbers: selectedSeats.join(','),
          total_price: totalPrice,
          travel_date: travelDate || new Date().toISOString().split('T')[0],
        }),
      });

      if (!bookingResponse.ok) {
        const error = await bookingResponse.json();
        throw new Error(error.message || "Failed to create booking");
      }

      const bookingData = await bookingResponse.json();

      // Navigate to success page with booking details
      navigate("/booking-success", {
        state: {
          booking: {
            ...bookingData.booking,
            bus,
            seats: selectedSeats, // Pass the selected seats array
            totalPrice,
            serviceFee,
            travelDate: travelDate || new Date().toISOString().split('T')[0],
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
