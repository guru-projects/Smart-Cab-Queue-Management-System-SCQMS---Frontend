import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
  Outlet,
} from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import ErrorBoundary from "./pages/ErrorBoundary";
import { QueueProvider } from "./context/QueueContext";

/* Components */
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";

/* Home */
import Home from "./pages/Home";

/* Driver Pages */
import DriverLogin from "./pages/Driver/DriverLogin";
import DriverSignup from "./pages/Driver/DriverSignup";
import DriverDashboard from "./pages/Driver/DriverDashboard";

/* Employee Pages */
import EmpLogin from "./pages/Employee/Login";
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

/* 🔒 Protected Route Wrapper */
function Protected({ children }) {
  const { token } = useAuth();
  return token ? children : <Navigate to="/" replace />;
}

/* 👥 Employee Layout – wraps all employee routes with QueueProvider */
function EmployeeLayout() {
  return (
    <QueueProvider>
      <Outlet />
    </QueueProvider>
  );
}

/* 🧱 App Layout – handles Sidebar + Routes */
function AppLayout() {
  const location = useLocation();
  const hideSidebarRoutes = [
    "/",
    "/employee/login",
    "/employee/signup",
    "/driver/login",
    "/driver/signup",
    "/admin/login",
  ];

  const hideSidebar = hideSidebarRoutes.includes(location.pathname);

  return (
    <>
      {/* Sidebar only for logged-in pages */}
      {!hideSidebar && <Sidebar />}

      <div
        style={{
          marginLeft: !hideSidebar ? "220px" : "0",
          padding: "15px",
        }}
      >
        <Routes>
          {/* ================= HOME ================= */}
          <Route path="/" element={<Home />} />

          {/* ================= DRIVER ================= */}
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

          {/* ================= EMPLOYEE ================= */}
          <Route path="/employee/login" element={<EmpLogin />} />
          <Route path="/employee/signup" element={<EmpSignup />} />

          {/* ✅ Group all employee routes inside one protected layout */}
          <Route
            path="/employee"
            element={
              <Protected>
                <EmployeeLayout />
              </Protected>
            }
          >
            <Route path="dashboard" element={<EmpDashboard />} />
            <Route path="history" element={<BookingHistory />} />
            <Route path="qr" element={<QRBooking />} />
            <Route path="queue" element={<QueueStatus />} />
          </Route>

          {/* ================= ADMIN ================= */}
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

        {/* Footer visible on all pages */}
        <Footer />
      </div>
    </>
  );
}

/* 🌍 Main App Entry */
export default function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <BrowserRouter>
          <AppLayout />
        </BrowserRouter>
      </AuthProvider>
    </ErrorBoundary>
  );
}
