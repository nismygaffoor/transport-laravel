import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { Navbar } from "./components/layout/Navbar";
import { Footer } from "./components/layout/Footer";
import UserLogin  from "./pages/UserLogin";
import  AdminLogin  from "./pages/AdminLogin";

import { Signup } from "./pages/Signup";
import { Home } from "./pages/Home";
import { SearchResults } from "./pages/SearchResults";
import { SeatSelection } from "./pages/SeatSelection";
import { BookingConfirmationPage } from "./pages/BookingConfirmation";
import { BookingSuccess } from "./pages/BookingSuccess";
import { Contact } from "./pages/Contact";
import { Profile } from "./pages/Profile";
import { Admin } from "./pages/Admin";
import { useState } from "react";
import { AdminRequireAuth } from "./components/admin/AdminrequireAuth";
import { AdminAuthProvider } from "./components/Context/AdminAuth";

// import { UserRequireAuth } from "./components/admin/UserrequireAuth ";
import { UserAuthProvider } from "./components/Context/UserAuth ";


// Create a LayoutWrapper to conditionally render Navbar and Footer
function LayoutWrapper({
  children,
  isLoggedIn,
  setIsLoggedIn,
}: {
  children: React.ReactNode;
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const location = useLocation();

  // Hide Navbar and Footer for /login and /signup routes
  const hideLayout =
    location.pathname === "/login" || location.pathname === "/signup"|| location.pathname === "/adminlogin"||location.pathname === "/admin";
  return (
    <>
      {!hideLayout && (
        <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      )}

      <main className="flex-1">{children}</main>
      {!hideLayout && <Footer />}
    </>
  );
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    console.log("Login successful!");
  };

  return (
    <AdminAuthProvider>
      <UserAuthProvider>
    <Router>
      <div className="flex min-h-screen flex-col">
        <LayoutWrapper isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}>
          <Routes>
            
            <Route path="/signup" element={<Signup />} /> 
          <Route path="/adminlogin" element={<AdminLogin />} />
          <Route path="/login" element={<UserLogin onLoginSuccess={handleLoginSuccess} />} />
          
            <Route path="/" element={<Home />} />
            <Route path="/search-results" element={<SearchResults />} />
            <Route path="/select-seats/:busId" element={<SeatSelection />} />
            <Route
              path="/booking-confirmation"
              element={
           <BookingConfirmationPage />
              }
            />
            <Route path="/booking-success" element={<BookingSuccess />} />

            <Route path="/profile" element={<Profile />} />
            <Route path="/admin" element={
              <AdminRequireAuth>
                 <Admin />  
              </AdminRequireAuth>} />
              
           
            <Route path="/Contact" element={<Contact />} />
          </Routes>
        </LayoutWrapper>
        <Toaster position="top-right" />
      </div>
    </Router>
    </UserAuthProvider>
    </AdminAuthProvider>
  );
}

export default App;
