import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Seat, Bus } from "../types/bus";
import { SeatMap } from "../components/bus/SeatMap";
import { toast } from "react-toastify";

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
    console.log("Proceed to Book clicked");
    const userInfo = localStorage.getItem("userInfo");
    console.log("userInfo from localStorage:", userInfo);

    if (!userInfo || userInfo === "null" || userInfo === "") {
        console.log("User not logged in - redirecting to login");
        toast.error("Please login first to proceed with booking");
        navigate("/login", { state: { from: `/select-seats/${busId}` } });
        return;
    }

    try {
      const parsedUserInfo = JSON.parse(userInfo);
      console.log("Parsed userInfo:", parsedUserInfo);
      
      if (!parsedUserInfo || !parsedUserInfo.token) {
        console.log("No token found - redirecting to login");
        toast.error("Session expired. Please login again");
        navigate("/login", { state: { from: `/select-seats/${busId}` } });
        return;
      }
    } catch (error) {
      console.log("Error parsing userInfo:", error);
      toast.error("Please login first to proceed with booking");
      navigate("/login", { state: { from: `/select-seats/${busId}` } });
      return;
    }

    console.log("User is logged in - proceeding to booking confirmation");
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
