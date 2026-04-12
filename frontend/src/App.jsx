import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect , useState} from "react";
import "./App.css";
import Home from "./pages/Home/Home";
import Services from "./pages/Services/Services";
import About from "./pages/About/About";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import ProviderSignup from "./pages/Signup/ProviderSignup/ProviderSignup";
import CustomerSignup from "./pages/Signup/CustomerSignup/CustomerSignup";
import SearchResult from "./pages/SearchResult/SearchResult";
import ProtectedRoute from "./components/ProtectedRoutes/ProtectedRoute";
import CustomerDashboard from "../src/pages/CustomerDashboard/CustomerDashboard";
import RoleBasedRoute from "./components/ProtectedRoutes/RoleBasedRoute";
import ProviderDashboard from "./pages/ProviderDashboard/ProviderDashboard";
import CustomerBooking from "./pages/Bookings/CustomerBookings/CustomerBooking";
import CustomerProfile from "./pages/CustomerProfile/CustomerProfile";

function App() {

  const [token , setToken] = useState(localStorage.getItem('token'))
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')))

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            token ? (
              user?.role === "customer" ? (
                <Navigate to ="/Customer_dashboard"/>
              ) : (
                <Navigate to ="/Provider_dashboard"/>
              )
            ) : (
              <Home />
            )
          }
        />
        <Route path="/Services/:category" element={<Services />} />
        <Route path="/SerchResult/:category" element={<SearchResult />} />
        <Route path="/About" element={<About />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/ProviderSignup" element={<ProviderSignup />} />
        <Route path="/CustomerSignup" element={<CustomerSignup />} />
        <Route
          path="/CustomerProfile"
          element={
            <ProtectedRoute>
              <RoleBasedRoute allowedRoles={["customer"]}>
                <CustomerProfile />
              </RoleBasedRoute>
            </ProtectedRoute>
          }
        />
        <Route
          path="/Customer_dashboard"
          element={
            <ProtectedRoute>
              <RoleBasedRoute allowedRoles={["customer"]}>
                <CustomerDashboard setToken={setToken} setUser={setUser}/>
              </RoleBasedRoute>
            </ProtectedRoute>
          }
        />
        <Route
          path="/Provider_dashboard"
          element={
            <ProtectedRoute>
              <RoleBasedRoute allowedRoles={["service_provider"]}>
                <ProviderDashboard />
              </RoleBasedRoute>
            </ProtectedRoute>
          }
        />
        <Route
          path="/CustomerBookings"
          element={
            <ProtectedRoute>
              <RoleBasedRoute allowedRoles={["customer"]}>
                <CustomerBooking/>
              </RoleBasedRoute>
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
