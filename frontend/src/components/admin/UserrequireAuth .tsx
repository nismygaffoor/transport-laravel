
// import { ReactNode, useContext } from "react";
// import { UserAuthContext } from "../Context/UserAuth ";
// import { Navigate } from "react-router-dom";

// interface UserRequireAuthProps {
//   children: ReactNode;
// }

// export const UserRequireAuth: React.FC<UserRequireAuthProps> = ({ children }) => {
//   const context = useContext(UserAuthContext);

//   if (!context) {
//     throw new Error("UserRequireAuth must be used within a UserAuthProvider");
//   }

//   const { user } = context;

//   if (!user) {
//     return <Navigate to="/login" />;
//   }

//   return <>{children}</>;
// };
