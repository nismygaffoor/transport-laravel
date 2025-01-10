import { useState } from 'react';
import { Seat, Bus } from '../../types/bus';
import { Button } from '../ui/Button';

interface SeatMapProps {
  seats: Seat[];
  bus: Bus;
  maxSeats: number;
  onSeatSelect: (selectedSeats: number[]) => void;
}

export function SeatMap({ bus, seats, maxSeats, onSeatSelect }: SeatMapProps) {
  const [selectedSeats, setSelectedSeats] = useState<number[]>([]);

  const handleSeatClick = (seatNumber: number) => {
    console.log("Seat clicked:", seatNumber);  // Debug log
    if (selectedSeats.includes(seatNumber)) {
      setSelectedSeats(selectedSeats.filter((seat) => seat !== seatNumber));
    } else if (selectedSeats.length < maxSeats) {
      setSelectedSeats([...selectedSeats, seatNumber]);
    } else {
      alert(`You can only select up to ${maxSeats} seats.`);
    }
  };

  const getSeatColor = (seat: Seat) => {
    if (!seat.isAvailable) return 'bg-gray-300 cursor-not-allowed';
    if (selectedSeats.includes(seat.number)) return 'bg-blue-500 text-white';
    return 'bg-white hover:bg-blue-100';
  };

  const totalPrice = selectedSeats.length * (bus.price || 10); // Total based on selected seats

  if (!seats || seats.length === 0) {
    return <div className="text-center text-gray-500">No seats available.</div>;
  }

  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-6 rounded-lg bg-gray-100 p-4">
        <div className="mb-4 flex justify-center space-x-8">
          <div className="flex items-center space-x-2">
            <div className="h-4 w-4 rounded bg-white" />
            <span className="text-sm">Available</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="h-4 w-4 rounded bg-blue-500" />
            <span className="text-sm">Selected</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="h-4 w-4 rounded bg-gray-300" />
            <span className="text-sm">Booked</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {seats.map((seat) => (
          <button
            key={seat.id}
            disabled={!seat.isAvailable}
            onClick={() => handleSeatClick(seat.number)}
            aria-pressed={selectedSeats.includes(seat.number)}
            aria-label={`Seat ${seat.number} ${!seat.isAvailable ? 'unavailable' : 'available'}`}
            className={`h-12 w-12 rounded-lg border ${getSeatColor(seat)} transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500`}
          >
            {seat.number}
          </button>
        ))}
      </div>

      <div className="mt-6 flex justify-between">
        <p className="text-sm text-gray-600">
          Selected seats: {selectedSeats.join(', ')} (Total: Rs. {totalPrice})
        </p>
        <Button
          onClick={() => onSeatSelect(selectedSeats)}
          disabled={selectedSeats.length === 0}
        >
          Proceed to Book
        </Button>
      </div>
    </div>
  );
}
