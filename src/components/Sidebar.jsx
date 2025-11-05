import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import logo from "../assets/logo.png";
import "./Sidebar.css";

export default function Sidebar() {
  const location = useLocation();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  if (!user) return null; // hide sidebar if not logged in

  const active = (path) => location.pathname === path ? "active-link" : "";

  function handleLogout() {
    logout();
    navigate("/");
  }

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <img src={logo} alt="logo" className="sidebar-logo" />
        <h3>SCQMS</h3>
        <p className="role-tag">{user.role?.toUpperCase()}</p>
      </div>

      <nav className="sidebar-menu">

        {/* ================= EMPLOYEE MENU ================= */}
        {user.role === "employee" && (
          <>
            <Link className={active("/employee/dashboard")} to="/employee/dashboard">🏠 Dashboard</Link>
            <Link className={active("/employee/history")} to="/employee/history">🧾 Booking History</Link>
            <Link className={active("/employee/queue")} to="/employee/queue">📊 Queue Status</Link>
            <Link className={active("/employee/qr")} to="/employee/qr">📷 QR Booking</Link>
          </>
        )}

        {/* ================= DRIVER MENU ================= */}
        {user.role === "driver" && (
          <>
            <Link className={active("/driver/dashboard")} to="/driver/dashboard">🚕 Driver Dashboard</Link>
          </>
        )}

        {/* ================= ADMIN MENU ================= */}
        {user.role === "admin" && (
          <>
            <Link className={active("/admin/dashboard")} to="/admin/dashboard">📍 Live Cab Map</Link>
            <Link className={active("/admin/cabs")} to="/admin/cabs">🚗 Cab Management</Link>
            <Link className={active("/admin/analytics")} to="/admin/analytics">📊 Analytics</Link>
          </>
        )}
      </nav>

      <div className="sidebar-footer">
        <button className="logout-btn" onClick={handleLogout}>
          🚪 Logout
        </button>
      </div>
    </aside>
  );
}
