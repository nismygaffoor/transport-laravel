import { Bus } from '../../../types/bus';
import { Button } from '../../ui/Button';

interface RouteListProps {
  buses: Bus[]; // Corrected to `buses` prop
  onEdit: (bus: Bus) => void;
  onDelete: (id: string) => void;
}

export function BusList({ buses, onEdit, onDelete }: RouteListProps) {
  return (
    <div className="space-y-4">
      {buses.map((bus) => (
        <div key={bus.id} className="rounded-lg border bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold">{bus.name}</h3>
              <p className="text-sm text-gray-600">{bus.operator}</p>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" onClick={() => onEdit(bus)}>
                Edit
              </Button>
              <Button variant="outline" size="sm" onClick={() => onDelete(bus.id)}>
                Delete
              </Button>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
            <div>
              <p className="text-sm text-gray-600">From - To</p>
              <p className="font-medium">
                {bus.from} - {bus.to}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Time</p>
              <p className="font-medium">
                {bus.departureTime} - {bus.arrivalTime}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Price</p>
              <p className="font-medium">Rs. {bus.price}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Seats</p>
              <p className="font-medium">
                {bus.availableSeats}/{bus.totalSeats}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
