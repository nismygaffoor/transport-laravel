
import { useEffect, useState } from "react";

const fetchDashboardStats = async () => {
  // Simulate an API call
  return {
    totalBuses: 50,
    totalRoutes: 120,
    totalBookings: 800,
    totalUsers: 150,
  };
};

export function AdminDashboard(){
  const [stats, setStats] = useState({
    totalBuses: 0,
    totalRoutes: 0,
    totalBookings: 0,
    totalUsers: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchDashboardStats();
      setStats(data);
    };
    fetchData();
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Admin Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="p-4 bg-white rounded-lg shadow">
          <h2 className="text-lg font-medium text-gray-600">Total Buses</h2>
          <p className="text-3xl font-bold text-blue-600">{stats.totalBuses}</p>
        </div>
        <div className="p-4 bg-white rounded-lg shadow">
          <h2 className="text-lg font-medium text-gray-600">Total Routes</h2>
          <p className="text-3xl font-bold text-green-600">{stats.totalRoutes}</p>
        </div>
        <div className="p-4 bg-white rounded-lg shadow">
          <h2 className="text-lg font-medium text-gray-600">Total Bookings</h2>
          <p className="text-3xl font-bold text-purple-600">{stats.totalBookings}</p>
        </div>
        <div className="p-4 bg-white rounded-lg shadow">
          <h2 className="text-lg font-medium text-gray-600">Total Users</h2>
          <p className="text-3xl font-bold text-red-600">{stats.totalUsers}</p>
        </div>
      </div>
    </div>
  );
}
