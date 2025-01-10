import { createContext, useState, ReactNode, FC } from "react";

// Define the type for the user
interface User {
  token: string;
  id: string;
  name: string;
}

// Define the type for the context
interface UserAuthContextType {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
}

// Create the context with a default value
export const UserAuthContext = createContext<UserAuthContextType | undefined>(undefined);

interface UserAuthProviderProps {
  children: ReactNode;
}

export const UserAuthProvider: FC<UserAuthProviderProps> = ({ children }) => {
  const userInfo = localStorage.getItem("userInfo");
  const [user, setUser] = useState<User | null>(userInfo ? JSON.parse(userInfo) : null);

  const login = (user: User) => {
    setUser(user);
    localStorage.setItem("userInfo", JSON.stringify(user));
  };

  const logout = () => {
    localStorage.removeItem("userInfo");
    setUser(null);
  };

  return (
    <UserAuthContext.Provider value={{ user, login, logout }}>
      {children}
    </UserAuthContext.Provider>
  );
};
