import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Calendar, Clock, MapPin } from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Button } from "../components/ui/Button";
import type { SearchParams } from "../types/search";
import { ReviewComponent } from "../components/review/ReviewComponent"; // Import the ReviewComponent

import { WhyChooseUs } from "../components/home/WhyChooseUs";
import { AboutUs } from "../components/home/AboutUs";
const cities = [
  "Colombo",
  "Kandy",
  "Galle",
  "Jaffna",
  "Anuradhapura",
  "Negombo",
  "Trincomalee",
  "Batticaloa",
  "Matara",
  "Akkaraiapttu",
  "Aranayake",
];

export function Home() {
  const navigate = useNavigate();
  const [date, setDate] = useState<Date | null>(new Date());
  const [time, setTime] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [busType, setBusType] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    if (!date || !time || !from || !to || !busType) {
      alert("Please fill in all fields.");
      return;
    }

    const searchParams: SearchParams = {
      from,
      to,
      date: date.toISOString().split("T")[0],
      time,
      busType,
    };

    // Navigate to the SearchResults page with search parameters
    navigate("/search-results", { state: { searchParams } });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div
        className="relative bg-cover bg-center py-32"
        style={{
          backgroundImage:
            'url("https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80")',
        }}
      >
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
              Book Your Bus Journey Across
              <span className="block text-blue-400">Sri Lanka</span>
            </h1>
            <p className="mx-auto mt-3 max-w-md text-base text-gray-300 sm:text-lg md:mt-5 md:max-w-3xl md:text-xl">
              Find and book bus tickets for your next journey. Safe,
              comfortable, and reliable bus services across the island.
            </p>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-8 mb-8 max-w-3xl px-4 sm:px-6 lg:px-8">
        <form
          onSubmit={handleSearch}
          className="rounded-lg bg-white p-6 shadow-lg"
        >
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">From</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                <select
                  value={from}
                  onChange={(e) => setFrom(e.target.value)}
                  className="w-full rounded-md border border-gray-300 pl-10 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  required
                >
                  <option value=""> Select city</option>
                  {cities.map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">To</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                <select
                  value={to}
                  onChange={(e) => setTo(e.target.value)}
                  className="w-full rounded-md border border-gray-300 pl-10 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  required
                >
                  <option value="">Select city</option>
                  {cities.map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Date</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                <DatePicker
                  selected={date}
                  onChange={(date) => setDate(date)}
                  className="w-full rounded-md border border-gray-300 pl-10 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  minDate={new Date()}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Time</label>
              <div className="relative">
                <Clock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                <select
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full rounded-md border border-gray-300 pl-10 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  required
                >
                  <option value="">Select time</option>
                  <option value="morning">Morning (6 AM - 12 PM)</option>
                  <option value="afternoon">Afternoon (12 PM - 6 PM)</option>
                  <option value="evening">Evening (6 PM - 12 AM)</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Bus Type
              </label>
              <div className="flex space-x-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="busType"
                    value="private"
                    checked={busType === "private"}
                    onChange={(e) => setBusType(e.target.value)}
                    className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500"
                    required
                  />
                  <span className="ml-2 text-sm text-gray-700">Private</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="busType"
                    value="public"
                    checked={busType === "public"}
                    onChange={(e) => setBusType(e.target.value)}
                    className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">Public</span>
                </label>
              </div>
            </div>

            <div className="flex items-end">
              <Button type="submit" className="w-full">
                Search Buses
              </Button>
            </div>
          </div>
        </form>
      </div>

      <AboutUs />

      {/* Reviews Section */}
      <div className="mx-4 x-w-3xl px-4 sm:px-6 lg:px-8">
        <ReviewComponent />
      </div>
      <WhyChooseUs />
    </div>
  );
}
