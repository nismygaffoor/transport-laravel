import { createContext, useState, ReactNode, FC } from "react";

// Define the type for the user
interface AdminUser {
  token: string;
  id: string;
  name: string;
}

// Define the type for the context
interface AdminAuthContextType {
  user: AdminUser | null;
  login: (user: AdminUser) => void;
  logout: () => void;
}

// Create the context with a default value
export const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

interface AdminAuthProviderProps {
  children: ReactNode;
}

export const AdminAuthProvider: FC<AdminAuthProviderProps> = ({ children }) => {
  const adminInfo = localStorage.getItem("adminInfo");
  const [user, setUser] = useState<AdminUser | null>(adminInfo ? JSON.parse(adminInfo) : null);

  const login = (user: AdminUser) => {
    setUser(user);
    localStorage.setItem("adminInfo", JSON.stringify(user));
  };

  const logout = () => {
    localStorage.removeItem("adminInfo");
    setUser(null);
  };

  return (
    <AdminAuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AdminAuthContext.Provider>
  );
};
