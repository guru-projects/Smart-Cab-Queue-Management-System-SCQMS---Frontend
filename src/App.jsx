import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { QueueProvider } from "./context/QueueContext";

// Sidebar UI
import Sidebar from "./components/Sidebar";

// Footer
import Footer from "./components/Footer";

/* Driver Pages */
import DriverLogin from "./pages/Driver/DriverLogin";
import DriverSignup from "./pages/Driver/DriverSignup";
import DriverDashboard from "./pages/Driver/DriverDashboard";

/* Employee Pages */
import EmpLogin from "./pages/Employee/Login";
import OtpVerify from "./pages/Employee/OtpVerify";
import EmpSignup from "./pages/Employee/Signup";
import EmpDashboard from "./pages/Employee/DashBoard";
import BookingHistory from "./pages/Employee/BookingHistory";
import QRBooking from "./pages/Employee/QRBooking";
import QueueStatus from "./pages/Employee/QueueStatus";

/* Admin Pages */
import AdminLogin from "./pages/Admin/AdminLogin";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import Analytics from "./pages/Admin/Analytics";
import Cabs from "./pages/Admin/Cabs";

import "./App.css";

function Protected({ children }) {
  const { token } = useAuth();
  return token ? children : <Navigate to="/driver/login" replace />;
}

export default function App() {
  return (
    <AuthProvider>
      <QueueProvider>
        <BrowserRouter>

          {/* Sidebar */}
          <Sidebar />

          {/* All content shifted right so sidebar visible */}
          <div style={{ marginLeft: "220px", padding: "15px" }}>

            <Routes>
              {/* Default */}
              <Route path="/" element={<Navigate to="/driver/login" />} />

              {/* DRIVER */}
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

              {/* EMPLOYEE */}
              <Route path="/employee/login" element={<EmpLogin />} />
              <Route path="/employee/verify-otp" element={<OtpVerify />} />
              <Route path="/employee/signup" element={<EmpSignup />} />

              <Route
                path="/employee/dashboard"
                element={
                  <Protected>
                    <EmpDashboard />
                  </Protected>
                }
              />
              <Route
                path="/employee/history"
                element={
                  <Protected>
                    <BookingHistory />
                  </Protected>
                }
              />
              <Route
                path="/employee/qr"
                element={
                  <Protected>
                    <QRBooking />
                  </Protected>
                }
              />
              <Route
                path="/employee/queue"
                element={
                  <Protected>
                    <QueueStatus />
                  </Protected>
                }
              />

              {/* ADMIN */}
              <Route path="/admin/login" element={<AdminLogin />} />
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
            </Routes>

            <Footer />

          </div>
        </BrowserRouter>
      </QueueProvider>
    </AuthProvider>
  );
}
