import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bus, LogOut, Users, BookOpen } from 'lucide-react';
import { AdminAuthContext } from '../Context/AdminAuth';
import { toast } from 'react-toastify';

interface AdminSidebarProps {
  activeTab?: string;
  onTabChange?: (tab: string) => void;
}

export function AdminSidebar({ activeTab = 'dashboard', onTabChange }: AdminSidebarProps) {
  const navigate = useNavigate();
  const context = useContext(AdminAuthContext);
  
  const handleLogout = () => {
    if (context) {
      context.logout();
    }
    localStorage.removeItem('adminInfo');
    toast.success('Logged out successfully');
    navigate('/adminlogin');
  };

  const menuItems = [
    // { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'buses', label: 'Bus Management', icon: Bus },
    { id: 'bookings', label: 'Bookings', icon: BookOpen },
    { id: 'users', label: 'Users', icon: Users },
  ];

  return (
    <div className="bg-gray-800 text-white h-screen w-64 fixed left-0 top-0 flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-gray-700">
        <h2 className="text-2xl font-bold">Admin Panel</h2>
        <p className="text-sm text-gray-400 mt-1">Bus Booking System</p>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <li key={item.id}>
                <button
                  onClick={() => onTabChange?.(item.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span className="font-medium">{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Logout Button */}
      <div className="p-4 border-t border-gray-700">
        <button
          onClick={handleLogout}
          className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-red-600 hover:text-white transition-colors"
        >
          <LogOut className="h-5 w-5" />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </div>
  );
}
