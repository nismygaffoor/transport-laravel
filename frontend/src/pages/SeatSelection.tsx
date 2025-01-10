import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Seat, Bus } from "../types/bus";
import { SeatMap } from "../components/bus/SeatMap";

export function SeatSelection() {
  const navigate = useNavigate();
  const { busId } = useParams();
  const [seats, setSeats] = useState<Seat[]>([]);
  const [bus, setBus] = useState<Bus | null>(null);
  const [loadingSeats, setLoadingSeats] = useState(true);
  const [loadingBus, setLoadingBus] = useState(true);

  useEffect(() => {
    // Fetch bus details
    const fetchBusDetails = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/buses/${busId}`);
        if (!response.ok) throw new Error("Failed to fetch bus details");
        const data = await response.json();
        setBus(data);
      } catch (error) {
        console.error("Error fetching bus details:", error);
      } finally {
        setLoadingBus(false);
      }
    };

    // Fetch seat details
    const fetchSeatDetails = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/seats?busId=${busId}`);
        if (!response.ok) throw new Error("Failed to fetch seat details");
        const data = await response.json();
        setSeats(
          data.map((seat: any) => ({
            ...seat,
            isAvailable: seat.is_available === 1,
          }))
        );
      } catch (error) {
        console.error("Error fetching seat details:", error);
      } finally {
        setLoadingSeats(false);
      }
    };

    fetchBusDetails();
    fetchSeatDetails();
  }, [busId]);

  const handleSeatSelect = (selectedSeats: number[]) => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo") || "null");

    if (!userInfo) {
        navigate("/login", { state: { from: `/select-seats/${busId}` } });
        return;
    }

    // Navigate to booking confirmation without any backend calls
    navigate("/booking-confirmation", {
        state: { busId, selectedSeats },
    });
};


  if (loadingSeats || loadingBus) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!bus) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Bus details not found.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="mx-auto max-w-7xl">
        <h1 className="text-2xl font-bold">Select Your Seats</h1>
        <p className="text-gray-600">Click on the available seats to select them</p>
        <SeatMap
          seats={seats}
          maxSeats={4}
          onSeatSelect={handleSeatSelect}
          bus={bus}
        />
      </div>
    </div>
  );
}
