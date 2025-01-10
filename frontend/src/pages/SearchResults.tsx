import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Bus } from "../types/bus";
import { SearchParams } from "../types/search";
import { BusCard } from "../components/bus/BusCard";

export function SearchResults() {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = location.state?.searchParams as SearchParams;
  const [filteredBuses, setFilteredBuses] = useState<Bus[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!searchParams) {
      console.error("Search parameters are missing.");
      navigate("/");
      return;
    }

    setLoading(true);

    fetch(`http://localhost:8000/api/buses?from=${searchParams.from}&to=${searchParams.to}&busType=${searchParams.busType}`)
      .then(response => response.json())
      .then(data => {
        const buses = data.map((bus: any) => ({
          ...bus,
          availableSeats: bus.available_seats, // Map available_seats to availableSeats 
          departureTime: bus.departure_time, // Map departure_time to departureTime 
          arrivalTime: bus.arrival_time, // Map arrival_time to arrivalTime
          amenities: JSON.parse(bus.amenities) // Parse the amenities string into an array
        }));
        setFilteredBuses(buses);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching buses:", error);
        setLoading(false);
      });
  }, [searchParams, navigate]);

  const handleBusSelect = (busId: string) => {
    navigate(`/select-seats/${busId}`);
  };

  if (!searchParams) {
    return (
      <div className="min-h-screen flex items-center justify-center text-center">
        <p className="text-gray-500">
          Missing search parameters. Redirecting...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Available Buses</h1>
          <p className="mt-1 text-gray-600">
            {loading
              ? "Searching buses..."
              : `${filteredBuses.length} buses found for your search`}
          </p>
          <div className="mt-2 flex flex-wrap gap-2">
            {Object.entries(searchParams).map(([key, value]) => (
              <span
                key={key}
                className="rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-800"
              >
                {key.charAt(0).toUpperCase() + key.slice(1)}: {value}
              </span>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <p>Loading...</p>
          </div>
        ) : filteredBuses.length === 0 ? (
          <div className="rounded-lg border bg-white p-8 text-center">
            <h2 className="text-xl font-semibold text-gray-900">
              No buses found
            </h2>
            <p className="mt-2 text-gray-600">
              Try adjusting your search criteria or selecting different dates
            </p>
            <button
              onClick={() => navigate("/")}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
            >
              Back to Search
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredBuses.map((bus) => (
              <BusCard key={bus.id} bus={bus} onSelect={handleBusSelect} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
