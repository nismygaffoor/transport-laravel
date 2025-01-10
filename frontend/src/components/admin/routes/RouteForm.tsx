import { useState, useEffect } from 'react';
import { Bus } from '../../../types/bus';
import { Button } from '../../ui/Button';
import { Input } from '../../ui/Input';

interface RouteFormProps {
  editingBus?: Bus;  // Changed from editingRoute to editingBus
  onSubmit: (route: Omit<Bus, 'id'>) => void;
  onCancel: () => void;
}

export function BusForm({ editingBus, onSubmit, onCancel }: RouteFormProps) {
  const initialRouteState = {
    name: '',
    operator: '',
    type: 'Public' as const,
    from: '',
    to: '',
    departureTime: '',
    arrivalTime: '',
    price: 0,
    availableSeats: 0,
    totalSeats: 0,
    amenities: [] as string[],
  };

  const [route, setRoute] = useState(editingBus || initialRouteState);

  // Reset form when editingRoute changes (in case user starts editing a different route)
  useEffect(() => {
    if (editingBus) {
      setRoute(editingBus);
    } else {
      setRoute(initialRouteState);
    }
  }, [editingBus]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(route);  // Check what data is being sent
    onSubmit(route);
  };

  const handleAmenityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setRoute((prevRoute) => {
      const amenities = checked
        ? [...prevRoute.amenities, value]
        : prevRoute.amenities.filter((amenity) => amenity !== value);
      return { ...prevRoute, amenities };
    });
  };

  return (
    <form onSubmit={handleSubmit} className="rounded-lg border bg-white p-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <Input
          label="Bus Name"
          value={route.name}
          onChange={(e) => setRoute({ ...route, name: e.target.value })}
          required
        />
        <Input
          label="Operator"
          value={route.operator}
          onChange={(e) => setRoute({ ...route, operator: e.target.value })}
          required
        />
        <Input
          label="From"
          value={route.from}
          onChange={(e) => setRoute({ ...route, from: e.target.value })}
          required
        />
        <Input
          label="To"
          value={route.to}
          onChange={(e) => setRoute({ ...route, to: e.target.value })}
          required
        />
        <Input
          label="Departure Time"
          type="time"
          value={route.departureTime}
          onChange={(e) => setRoute({ ...route, departureTime: e.target.value })}
          required
        />
        <Input
          label="Arrival Time"
          type="time"
          value={route.arrivalTime}
          onChange={(e) => setRoute({ ...route, arrivalTime: e.target.value })}
          required
        />
        <Input
          label="Price"
          type="number"
          value={route.price}
          onChange={(e) => setRoute({ ...route, price: Number(e.target.value) })}
          required
        />
        <Input
          label="Total Seats"
          type="number"
          value={route.totalSeats}
          onChange={(e) =>
            setRoute({
              ...route,
              totalSeats: Number(e.target.value),
              availableSeats: Number(e.target.value),
            })
          }
          required
        />
      </div>

      <div className="mt-4">
        <h4 className="text-sm font-semibold">Amenities</h4>
        <div className="flex space-x-4 mt-2">
          <label className="flex items-center">
            <input
              type="checkbox"
              value="Wi-Fi"
              checked={route.amenities.includes('Wi-Fi')}
              onChange={handleAmenityChange}
              className="mr-2"
            />
            Wi-Fi
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              value="AC"
              checked={route.amenities.includes('AC')}
              onChange={handleAmenityChange}
              className="mr-2"
            />
            AC
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              value="Reclining Seats"
              checked={route.amenities.includes('Reclining Seats')}
              onChange={handleAmenityChange}
              className="mr-2"
            />
            Reclining Seats
          </label>
        </div>
      </div>

      <div className="mt-4 flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          {editingBus ? 'Update Route' : 'Add Route'}  {/* Changed from editingRoute to editingBus */}
        </Button>
      </div>
    </form>
  );
}
