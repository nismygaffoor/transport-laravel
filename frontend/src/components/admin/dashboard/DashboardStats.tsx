import { useState, useEffect } from 'react';
import { Bus, Calendar, Users } from 'lucide-react';
import { apiUrl } from "../../http";

interface StatsCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
}

function StatsCard({ title, value, icon }: StatsCardProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600">{title}</p>
          <p className="text-2xl font-bold mt-1">{value}</p>
        </div>
        <div className="text-blue-600">{icon}</div>
      </div>
    </div>
  );
}

export function DashboardStats() {
  const [totalBuses, setTotalBuses] = useState<number>(0);
  const [activeBookings, setActiveBookings] = useState<number>(0);
  const [totalRoutes, setTotalRoutes] = useState<number>(0);

  // Fetch stats from the backend
  const fetchStats = async () => {
    try {
      const response = await fetch(`${apiUrl}/admin/stats`);
      if (!response.ok) {
        throw new Error('Failed to fetch stats');
      }
      const data = await response.json();

      // Assuming the response has these fields for each stat
      setTotalBuses(data.totalBuses);
      setActiveBookings(data.activeBookings);
      setTotalRoutes(data.totalRoutes);
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  // Fetch stats on component mount
  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <StatsCard
        title="Total Buses"
        value={totalBuses}
        icon={<Bus className="h-8 w-8" />}
      />
      <StatsCard
        title="Active Bookings"
        value={activeBookings}
        icon={<Users className="h-8 w-8" />}
      />
      <StatsCard
        title="Total Routes"
        value={totalRoutes}
        icon={<Calendar className="h-8 w-8" />}
      />
    </div>
  );
}
