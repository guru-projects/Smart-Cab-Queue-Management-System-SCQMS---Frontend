import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { QueueProvider } from "./context/QueueContext";

/* Components */
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";

/* Driver Pages */
import DriverLogin from "./pages/Driver/DriverLogin";
import DriverDashboard from "./pages/Driver/DriverDashboard";
import DriverSignup from "./pages/Driver/DriverSignup";

/* Admin Pages */
import AdminDashboard from "./pages/Admin/AdminDashboard";
import Analytics from "./pages/Admin/Analytics";
import Cabs from "./pages/Admin/Cabs";

/* Employee Pages */
import EmpLogin from "./pages/Employee/Login";
import EmpDashboard from "./pages/Employee/DashBoard";
import BookingHistory from "./pages/Employee/BookingHistory";
import QRBooking from "./pages/Employee/QRBooking";
import QueueStatus from "./pages/Employee/QueueStatus";
import Signup from "./pages/Employee/Signup";
import OtpVerify from "./pages/Employee/OtpVerify"; // create later

import "./App.css";

/* Protected Private Route */
function Protected({ children }) {
  const { token } = useAuth();
  return token ? children : <Navigate to="/driver/login" replace />;
}

export default function App() {
  return (
    <AuthProvider>
      <QueueProvider>
        <BrowserRouter>
          <NavBar />

          <Routes>

            {/* ===== DRIVER ROUTES ===== */}
            <Route path="/" element={<Navigate to="/driver/login" />} />
            <Route path="/driver/login" element={<DriverLogin />} />
            <Route path="/driver/signup" element={<DriverSignup />} />
            <Route
              path="/driver/dashboard"
              element={
                <Protected>
                  <DriverDashboard />
                </Protected>
              }
            />

            {/* ===== ADMIN ROUTES ===== */}
            <Route
              path="/admin/dashboard"
              element={
                <Protected>
                  <AdminDashboard />
                </Protected>
              }
            />
            <Route
              path="/admin/analytics"
              element={
                <Protected>
                  <Analytics />
                </Protected>
              }
            />
            <Route
              path="/admin/cabs"
              element={
                <Protected>
                  <Cabs />
                </Protected>
              }
            />

            {/* ===== EMPLOYEE ROUTES ===== */}
            <Route path="/employee/login" element={<EmpLogin />} />
            <Route path="/employee/signup" element={<Signup />} />
            <Route path="/employee/verify-otp" element={<OtpVerify />} />
            <Route path="/employee/dashboard" element={<EmpDashboard />} />
            <Route path="/employee/history" element={<BookingHistory />} />
            <Route path="/employee/qr" element={<QRBooking />} />
            <Route path="/employee/queue" element={<QueueStatus />} />

          </Routes>

          <Footer />
        </BrowserRouter>
      </QueueProvider>
    </AuthProvider>
  );
}
