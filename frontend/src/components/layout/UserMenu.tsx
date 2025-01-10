import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

interface UserMenuProps {
  handleLogout: () => void; // Logout handler
  setShowUserMenu: React.Dispatch<React.SetStateAction<boolean>>; // State updater for toggling menu
}

const UserMenu: React.FC<UserMenuProps> = ({ handleLogout, setShowUserMenu }) => {
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowUserMenu(false); // Close menu if clicked outside
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [setShowUserMenu]);

  return (
    <div
      ref={menuRef}
      className="absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow-md p-4 z-20"
    >
      <Link
        to="/profile"
        className="block text-blue-600 hover:text-blue-800"
        onClick={() => setShowUserMenu(false)}
      >
        Profile
      </Link>
      <div
        className="mt-2 cursor-pointer text-red-600 hover:text-red-800"
        onClick={handleLogout}
      >
        Logout
      </div>
    </div>
  );
};

export default UserMenu;
