import { Wifi, Coffee, AirVent } from 'lucide-react';
import { Bus } from '../../types/bus';
import { Button } from '../ui/Button';

interface BusCardProps {
  bus: Bus;
  onSelect: (busId: string) => void;
}

export function BusCard({ bus, onSelect }: BusCardProps) {
  const amenityIcons = {
    wifi: <Wifi className="h-4 w-4" />,
    refreshments: <Coffee className="h-4 w-4" />,
    ac: <AirVent className="h-4 w-4" />,
  };

  const calculateJourneyDuration = (departure: string, arrival: string) => {
    if (!departure || !arrival) {
      return "Invalid time";
    }

    const [depHours, depMinutes] = departure.split(':').map(Number);
    const [arrHours, arrMinutes] = arrival.split(':').map(Number);
    const durationHours = arrHours - depHours + (arrMinutes - depMinutes) / 60;

    return `${Math.floor(durationHours)}h ${Math.round((durationHours % 1) * 60)}m`;
  };

  const journeyDuration = calculateJourneyDuration(bus.departureTime, bus.arrivalTime);

  return (
    <div className="rounded-lg border bg-white p-6 shadow-sm">
      <div className="flex justify-between">
        <div>
          <h3 className="text-lg font-semibold">{bus.name}</h3>
          <p className="text-sm text-gray-600">{bus.operator}</p>
        </div>
        <div className="text-right">
          <p className="text-lg font-bold text-blue-600">Rs. {bus.price}</p>
          <p className="text-sm text-gray-600">{bus.type}</p>
        </div>
      </div>

      <div className="mt-4 flex justify-between border-t border-b py-4">
        <div>
          <p className="font-semibold">{bus.departureTime}</p>
          <p className="text-sm text-gray-600">{bus.from}</p>
        </div>
        <div className="text-center">
          <div className="h-0.5 w-16 bg-gray-300" />
          <p className="text-sm text-gray-600">
            Journey Duration: {journeyDuration}
          </p>
        </div>
        <div className="text-right">
          <p className="font-semibold">{bus.arrivalTime}</p>
          <p className="text-sm text-gray-600">{bus.to}</p>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <div className="flex space-x-3">
          {Array.isArray(bus.amenities) && bus.amenities.length > 0 ? (
            bus.amenities.map((amenity) => (
              <div
                key={amenity}
                className="flex items-center space-x-1 text-sm text-gray-600"
                title={`This bus offers ${amenity}`}
              >
                {amenityIcons[amenity as keyof typeof amenityIcons] || (
                  <span className="h-4 w-4 text-gray-400">•</span>
                )}
                <span>{amenity}</span>
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-600">No amenities available</p>
          )}
        </div>
        <div className="text-right">
          <p
            className={`text-sm ${
              bus.availableSeats > 0 ? 'text-green-600' : 'text-red-600'
            }`}
          >
            {bus.availableSeats > 0
              ? `${bus.availableSeats} seats available`
              : 'No seats available'}
          </p>
          <Button
            onClick={() => onSelect(bus.id)}
            size="sm"
            className="mt-2"
          >
            Select Seats
          </Button>
        </div>
      </div>
    </div>
  );
}
