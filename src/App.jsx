import React from "react";
import { Routes, Route } from "react-router-dom";
import DriverLogin from "./pages/Driver/DriverLogin";
import DriverDashboard from "./pages/Driver/DriverDashboard";
import AdminDashboard from "./pages/Admin/AdminDashboard.jxs";
import { useAuth } from "./context/AuthContext";

export default function App() {
  const { user } = useAuth();

  return (
    <Routes>
      <Route path="/" element={<DriverLogin />} />
      <Route path="/driver/login" element={<DriverLogin />} />
      <Route path="/driver/dashboard" element={<DriverDashboard />} />
      <Route path="/admin" element={<AdminDashboard />} />
    </Routes>
  );
}
