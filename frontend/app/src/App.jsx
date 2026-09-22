import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Vehicles from "./pages/Vehicles";
import VehicleDetails from "./pages/VehicleDetails";
import Booking from "./pages/Booking";
import MyBookings from "./pages/MyBookings";
import Profile from "./pages/Profile";
import AdminDashboard from "./pages/AdminDashboard";
import VehicleManagement from "./pages/VehicleManagement";
import AddVehicle from "./pages/AddVehicle";
import EditVehicle from "./pages/EditVehicle";
import CustomerManagement from "./pages/CustomerManagement";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>

        {/* Public Pages */}
        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/vehicles"
          element={<Vehicles />}
        />

        <Route
          path="/vehicles/:id"
          element={<VehicleDetails />}
        />


        {/* Customer Pages */}
        <Route
          path="/booking"
          element={<Booking />}
        />

        <Route
          path="/my-bookings"
          element={<MyBookings />}
        />

        <Route
          path="/profile"
          element={<Profile />}
        />


        {/* Admin Pages */}
        <Route
          path="/admin"
          element={<AdminDashboard />}
        />

        <Route
          path="/admin/vehicles"
          element={<VehicleManagement />}
        />
       <Route
          path="/admin/vehicles/add"
          element={<AddVehicle />}
        />
        <Route
         path="/admin/vehicles/edit/:id"
         element={<EditVehicle />}
        />
        <Route
         path="/admin/customers"
         element={<CustomerManagement />}
       />
      </Routes>
    </BrowserRouter>
  );
}

export default App;