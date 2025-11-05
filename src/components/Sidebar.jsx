import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaUser, FaTachometerAlt, FaCar, FaHistory, FaQrcode, FaSignOutAlt } from "react-icons/fa";
import logo from "../assets/logo.png";
import "./Sidebar.css";

export default function Sidebar() {
  const [open, setOpen] = useState(true);

  return (
    <div className={`sidebar-container ${open ? "open" : "closed"}`}>

      <div className="sidebar-header">
        <button className="menu-btn" onClick={() => setOpen(!open)}>
          <FaBars size={22} />
        </button>

        {open && (
          <div className="sidebar-logo">
            <img src={logo} alt="SCQMS" />
            <h3>SCQMS Portal</h3>
          </div>
        )}
      </div>

      <ul className="sidebar-menu">

        <li><Link to="/driver/dashboard"><FaTachometerAlt /> {open && "Dashboard"}</Link></li>
        <li><Link to="/employee/queue"><FaUser /> {open && "Queue Status"}</Link></li>
        <li><Link to="/employee/history"><FaHistory /> {open && "Booking History"}</Link></li>
        <li><Link to="/employee/qr"><FaQrcode /> {open && "QR Scan Booking"}</Link></li>
        <li><Link to="/admin/cabs"><FaCar /> {open && "Cabs Management"}</Link></li>
        <li><Link to="/admin/dashboard"><FaTachometerAlt /> {open && "Admin Panel"}</Link></li>

        <li className="logout"><Link to="/driver/login"><FaSignOutAlt /> {open && "Logout"}</Link></li>
      </ul>
    </div>
  );
}
