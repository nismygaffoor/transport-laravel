import { useState, useEffect } from 'react';
import { DashboardStats } from '../components/admin/dashboard/DashboardStats';
import { RouteManagement } from '../components/admin/routes/RouteManagement';  // Keeping the folder name the same
import { Bus } from '../types/bus';

export function Admin() {
  const [buses, setBuses] = useState<Bus[]>([]);  // Changed routes to buses

  // Fetch buses from backend
  const fetchBuses = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/admin/buses');  // Ensure API is for buses
      if (!response.ok) {
        throw new Error('Failed to fetch buses');
      }
      const data = await response.json();
      setBuses(data);
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
        body: JSON.stringify(newBus),
      });
      if (!response.ok) {
        throw new Error('Failed to add bus');
      }
      const data = await response.json();
      setBuses((prevBuses) => [...prevBuses, data]);  // Use prevBuses for latest state
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
        body: JSON.stringify(updatedBus),
      });
      if (!response.ok) {
        throw new Error('Failed to update bus');
      }
      const data = await response.json();
      setBuses(buses.map((bus) => (bus.id === id ? { ...bus, ...data } : bus)));
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
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold mb-8">Admin Dashboard</h1>
        <section className="mb-8">
          <DashboardStats />
        </section>
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Bus Management</h2>
          <RouteManagement
            buses={buses}  // This is correct now // Pass buses data to RouteManagement component
            onAdd={handleAddBus}  // Pass add bus handler
            onEdit={handleEditBus}  // Pass edit bus handler
            onDelete={handleDeleteBus}  // Pass delete bus handler
          />
        </section>
      </div>
    </div>
  );
}
