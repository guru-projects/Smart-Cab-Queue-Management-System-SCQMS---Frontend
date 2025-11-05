import React from "react";
import { Link } from "react-router-dom";
import "./AdminLogin.css";

export default function AdminDashboard() {
  return (
    <div className="admin-page">
      <div className="admin-card" style={{maxWidth:"700px"}}>
        <h2>🚕 Admin Dashboard</h2>
        <p>Welcome Transport Admin 👋</p>

        <div style={{ marginTop: "16px", display: "grid", gap: "10px" }}>
          <Link className="btn-primary" to="/admin/cabs">Manage Cabs</Link>
          <Link className="btn-primary" to="/admin/analytics">Analytics</Link>
        </div>
      </div>
    </div>
  );
}
