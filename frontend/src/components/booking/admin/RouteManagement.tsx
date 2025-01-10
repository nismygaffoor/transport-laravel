import { useState } from 'react';

import { Bus } from '../../../types/bus';
import { Button } from '../../ui/Button';
import { Input } from '../../ui/Input';


interface RouteManagementProps {
  routes: Bus[];
  onAdd: (route: Omit<Bus, 'id'>) => void;
  onEdit: (id: string, route: Partial<Bus>) => void;
  onDelete: (id: string) => void;
}

export function RouteManagement({
  routes,
  onAdd,
  onEdit,
  onDelete,
}: RouteManagementProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const initialRouteState = {
    name: '',
    operator: '',
    type: 'Public' as 'Public' | 'Private', // Updated to allow 'Public' or 'Private'
    from: '',
    to: '',
    departureTime: '',
    arrivalTime: '',
    price: 0,
    availableSeats: 0,
    totalSeats: 0,
    amenities: [] as string[], 
  };

  const [newRoute, setNewRoute] = useState(initialRouteState);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      onEdit(editingId, newRoute);
      setEditingId(null);
    } else {
      onAdd(newRoute);
    }
    setNewRoute(initialRouteState);
    setIsAdding(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between">
        <h2 className="text-lg font-semibold">Bus Routes</h2>
        <Button onClick={() => setIsAdding(true)}>Add New Route</Button>
      </div>

      {(isAdding || editingId) && (
        <form onSubmit={handleSubmit} className="rounded-lg border bg-white p-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <Input
              label="Bus Name"
              value={newRoute.name}
              onChange={(e) =>
                setNewRoute({ ...newRoute, name: e.target.value })
              }
              required
            />
            <Input
              label="Operator"
              value={newRoute.operator}
              onChange={(e) =>
                setNewRoute({ ...newRoute, operator: e.target.value })
              }
              required
            />
            <Input
              label="From"
              value={newRoute.from}
              onChange={(e) =>
                setNewRoute({ ...newRoute, from: e.target.value })
              }
              required
            />
            <Input
              label="To"
              value={newRoute.to}
              onChange={(e) => setNewRoute({ ...newRoute, to: e.target.value })}
              required
            />
            <Input
              label="Departure Time"
              type="time"
              value={newRoute.departureTime}
              onChange={(e) =>
                setNewRoute({ ...newRoute, departureTime: e.target.value })
              }
              required
            />
            <Input
              label="Arrival Time"
              type="time"
              value={newRoute.arrivalTime}
              onChange={(e) =>
                setNewRoute({ ...newRoute, arrivalTime: e.target.value })
              }
              required
            />
            <Input
              label="Price"
              type="number"
              value={newRoute.price}
              onChange={(e) =>
                setNewRoute({ ...newRoute, price: Number(e.target.value) })
              }
              required
            />
            <Input
              label="Total Seats"
              type="number"
              value={newRoute.totalSeats}
              onChange={(e) =>
                setNewRoute({
                  ...newRoute,
                  totalSeats: Number(e.target.value),
                  availableSeats: Number(e.target.value),
                })
              }
              required
            />
          </div>

          <div className="mt-4 flex justify-end space-x-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setIsAdding(false);
                setEditingId(null);
                setNewRoute(initialRouteState);
              }}
            >
              Cancel
            </Button>
            <Button type="submit">
              {editingId ? 'Update Route' : 'Add Route'}
            </Button>
          </div>
        </form>
      )}

      <div className="space-y-4">
        {routes.map((route) => (
          <div
            key={route.id}
            className="rounded-lg border bg-white p-6 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold">{route.name}</h3>
                <p className="text-sm text-gray-600">{route.operator}</p>
              </div>
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setEditingId(route.id);
                    setNewRoute(route);
                  }}
                >
                  Edit
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onDelete(route.id)}
                >
                  Delete
                </Button>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
              <div>
                <p className="text-sm text-gray-600">From - To</p>
                <p className="font-medium">
                  {route.from} - {route.to}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Time</p>
                <p className="font-medium">
                  {route.departureTime} - {route.arrivalTime}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Price</p>
                <p className="font-medium">Rs. {route.price}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Seats</p>
                <p className="font-medium">
                  {route.availableSeats}/{route.totalSeats}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
