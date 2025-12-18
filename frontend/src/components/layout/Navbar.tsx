import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Bus } from "lucide-react";
// import img from "../../asset/user-interface.png";
// import img2 from "../../asset/men3.jpg";

import UserMenu from "./UserMenu";

interface NavbarProps {
  isLoggedIn: boolean;
  setIsLoggedIn:  React.Dispatch<React.SetStateAction<boolean>>;
}

export function Navbar({ isLoggedIn,setIsLoggedIn }: NavbarProps) {

  const [showUserMenu, setShowUserMenu] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [displayName, setDisplayName] = useState<string>("User");
  const navigate = useNavigate();

  // const handleLogout = () => {
  //   setIsLoggedIn(false);
  //   setShowUserMenu(false);
  //   setTimeout(() => {
  //     navigate("/");
  //   }, 100);
  // };
  const handleLogout = () => {
    // Clear localStorage
    localStorage.removeItem("userInfo");
    localStorage.removeItem("adminInfo");
    
    // Update state and then navigate after a slight delay
    setIsLoggedIn(false);
    setShowUserMenu(false);

    // Using setTimeout to make sure state has updated before navigating
    setTimeout(() => {
      navigate("/"); // Navigate to home after logout
    }, 100); // 100ms delay to ensure state updates before navigating
  };

  const toggleUserMenu = () => setShowUserMenu((prev) => !prev);

  useEffect(() => {
    // Load user avatar from localStorage if available
    const userInfoRaw = localStorage.getItem("userInfo");
    if (userInfoRaw) {
      try {
        const user = JSON.parse(userInfoRaw);
        const userId = user?.id;
        const name = user?.name || user?.fullName || "User";
        setDisplayName(name);
        if (userId) {
          const storedAvatar = localStorage.getItem(`userAvatar:${userId}`);
          if (storedAvatar) setAvatarUrl(storedAvatar);
        }
      } catch {}
    }
  }, [isLoggedIn]);

  return (
    <div className="flex h-16 items-center justify-between bg-white shadow-md">
      {/* Left Section */}
      <div className="flex items-center ml-4">
        <Link to="/" className="flex items-center space-x-2">
          <Bus className="h-8 w-8 text-blue-600" />
          <span className="text-xl font-bold text-gray-900">SL Bus Booking</span>
        </Link>
      </div>

      {/* Right Section */}
      <div className="flex items-center space-x-4 pr-4">
        {isLoggedIn ? (
          <div className="relative">
            {/* User Icon */}
            <div
              className="flex items-center space-x-2 cursor-pointer"
              onClick={toggleUserMenu}
            >  <img className="h-8 w-8 rounded-full" src={avatarUrl || "/men3.jpg"} alt="Profile"  />
              {/* <img className="h-8 w-8 rounded-full" src={img2} alt="Profile" /> */}
              <span className="text-gray-900">Hi, {displayName}</span>
            </div>

            {/* User Menu Dropdown */}
            {showUserMenu && (
              <UserMenu handleLogout={handleLogout} setShowUserMenu={setShowUserMenu} />
            )}
          </div>
        ) : (
          <div
            className="flex items-center space-x-2 cursor-pointer"
          
          >
            {/* <img className="h-8 w-8 rounded-full" src={img} alt="Profile" /> */}
            <img className="h-8 w-8 rounded-full" src={avatarUrl || "/user-interface.png"} alt="User Interface" />

            <Link className="text-gray-900" to="/login"  
          >
              Login
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
