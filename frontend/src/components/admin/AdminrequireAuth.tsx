import { ReactNode, useContext } from "react";
import { AdminAuthContext } from "../Context/AdminAuth";
import { Navigate } from "react-router-dom";

// Define the props type for the component
interface AdminRequireAuthProps {
  children: ReactNode; // ReactNode allows any valid React child (elements, strings, etc.)
}

export const AdminRequireAuth: React.FC<AdminRequireAuthProps> = ({ children }) => {
  const context = useContext(AdminAuthContext);

  if (!context) {
    throw new Error("AdminRequireAuth must be used within an AdminAuthProvider");
  }

  const { user } = context;

  if (!user) {
    return <Navigate to="/AdminLogin" />;
  }

  return <>{children}</>;
};
