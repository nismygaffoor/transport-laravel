import { useState, useEffect } from 'react';
// import { DashboardStats } from '../components/admin/dashboard/DashboardStats';
import { RouteManagement } from '../components/admin/RouteManagement';
import { AdminSidebar } from '../components/admin/AdminSidebar';
import { BookingsManagement } from '../components/admin/bookings/BookingsManagement';
import { UsersManagement } from '../components/admin/users/UsersManagement';
import { Bus } from '../types/bus';

export function Admin() {
  const [buses, setBuses] = useState<Bus[]>([]);  // Changed routes to buses
  const [activeTab, setActiveTab] = useState('buses');

  // Fetch buses from backend
  const fetchBuses = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/admin/buses');  // Ensure API is for buses
      if (!response.ok) {
        throw new Error('Failed to fetch buses');
      }
      const data = await response.json();
      const mapped: Bus[] = data.map((bus: any) => ({
        id: String(bus.id),
        name: bus.name,
        operator: bus.operator,
        type: bus.type,
        departureTime: bus.departure_time,
        arrivalTime: bus.arrival_time,
        from: bus.from,
        to: bus.to,
        price: bus.price,
        availableSeats: bus.available_seats,
        totalSeats: bus.total_seats,
        amenities: bus.amenities || [],
      }));
      setBuses(mapped);
    } catch (error) {
      console.error('Error fetching buses:', error);
    }
  };

  // Handle adding a bus
  const handleAddBus = async (newBus: Omit<Bus, 'id'>) => {
    try {
      const response = await fetch('http://localhost:8000/api/admin/buses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: newBus.name,
          operator: newBus.operator,
          type: newBus.type,
          from: newBus.from,
          to: newBus.to,
          departure_time: newBus.departureTime,
          arrival_time: newBus.arrivalTime,
          price: newBus.price,
          total_seats: newBus.totalSeats,
          available_seats: newBus.availableSeats ?? newBus.totalSeats,
          amenities: newBus.amenities,
        }),
      });
      if (!response.ok) {
        throw new Error('Failed to add bus');
      }
      const bus = await response.json();
      const mapped: Bus = {
        id: String(bus.id),
        name: bus.name,
        operator: bus.operator,
        type: bus.type,
        departureTime: bus.departure_time,
        arrivalTime: bus.arrival_time,
        from: bus.from,
        to: bus.to,
        price: bus.price,
        availableSeats: bus.available_seats,
        totalSeats: bus.total_seats,
        amenities: bus.amenities || [],
      };
      setBuses((prevBuses) => [...prevBuses, mapped]);  // Use prevBuses for latest state
    } catch (error) {
      console.error('Error adding bus:', error);
    }
  };

  // Handle editing a bus
  const handleEditBus = async (id: string, updatedBus: Partial<Bus>) => {
    try {
      const response = await fetch(`http://localhost:8000/api/admin/buses/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: updatedBus.name,
          operator: updatedBus.operator,
          type: updatedBus.type,
          from: updatedBus.from,
          to: updatedBus.to,
          departure_time: updatedBus.departureTime,
          arrival_time: updatedBus.arrivalTime,
          price: updatedBus.price,
          total_seats: updatedBus.totalSeats,
          available_seats: updatedBus.availableSeats,
          amenities: updatedBus.amenities,
        }),
      });
      if (!response.ok) {
        throw new Error('Failed to update bus');
      }
      const data = await response.json();
      const updated = data.bus;
      const mapped: Bus = {
        id: String(updated.id),
        name: updated.name,
        operator: updated.operator,
        type: updated.type,
        departureTime: updated.departure_time,
        arrivalTime: updated.arrival_time,
        from: updated.from,
        to: updated.to,
        price: updated.price,
        availableSeats: updated.available_seats,
        totalSeats: updated.total_seats,
        amenities: updated.amenities || [],
      };
      setBuses(buses.map((bus) => (bus.id === id ? mapped : bus)));
    } catch (error) {
      console.error('Error editing bus:', error);
    }
  };

  // Handle deleting a bus
  const handleDeleteBus = async (id: string) => {
    try {
      const response = await fetch(`http://localhost:8000/api/admin/buses/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete bus');
      }
      setBuses(buses.filter((bus) => bus.id !== id));  // Remove deleted bus from state
    } catch (error) {
      console.error('Error deleting bus:', error);
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchBuses();
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <AdminSidebar activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Main Content */}
      <div className="flex-1 ml-64">
        <div className="py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            {activeTab === 'dashboard' && (
              <>
                <h1 className="text-2xl font-bold mb-8">Admin Dashboard</h1>
                <section className="mb-8">
                  {/* <DashboardStats /> */}
                </section>
              </>
            )}

            {activeTab === 'buses' && (
              <section className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Bus Management</h2>
                <RouteManagement
                  buses={buses}
                  onAdd={handleAddBus}
                  onEdit={handleEditBus}
                  onDelete={handleDeleteBus}
                />
              </section>
            )}

            {activeTab === 'bookings' && (
              <BookingsManagement />
            )}

            {activeTab === 'users' && (
              <UsersManagement />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
