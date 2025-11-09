// src/pages/Employee/DashBoard.jsx
import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { getBookingsByEmployee, createBooking } from "../../api/bookingApi";
import api from "../../api/axiosInstance";
import "./EmpDashboard.css";

export default function EmpDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [activeBooking, setActiveBooking] = useState(null);
  const [loading, setLoading] = useState(false);
  const DEV_MODE = true;

  const fetchActiveBooking = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const employeeId = user?.id || user?.employeeId || 3;
      const res = await getBookingsByEmployee(employeeId);

      // ✅ Defensive parsing fix
      const allBookings = Array.isArray(res.data) ? res.data : [];
      if (!Array.isArray(res.data)) {
        console.warn("⚠️ Bookings API did not return an array:", res.data);
      }

      const latest = allBookings
        .reverse()
        .find((b) => b.status !== "COMPLETED");
      setActiveBooking(latest || null);
    } catch (err) {
      console.warn("⚠️ Failed to fetch booking:", err);
    }
  };

  useEffect(() => {
    if (!localStorage.getItem("token")) return;
    fetchActiveBooking();
    const interval = setInterval(fetchActiveBooking, 10000);
    return () => clearInterval(interval);
  }, []);

  const handleLocationBooking = async () => {
    try {
      setLoading(true);
      let latitude, longitude;

      if (DEV_MODE) {
        latitude = 13.0108;
        longitude = 80.22;
      } else {
        const pos = await new Promise((resolve, reject) =>
          navigator.geolocation.getCurrentPosition(resolve, reject)
        );
        latitude = pos.coords.latitude;
        longitude = pos.coords.longitude;
      }

      const verifyRes = await api.post("/api/location/verify", {
        lat: latitude,
        lon: longitude,
      });

      if (verifyRes.data.allowed) {
        const employeeId = user?.id || user?.employeeId || 3;
        const bookingRes = await createBooking(employeeId);

        if (bookingRes.status === 200 || bookingRes.status === 201) {
          alert("🚕 Cab booked successfully!");
          setActiveBooking(bookingRes.data);
        }
      } else {
        alert("❌ You are outside the booking zone.");
      }
    } catch (err) {
      console.error("🚨 Error booking cab:", err);
      alert("⚠️ Something went wrong during booking.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h2 className="page-title">Employee Dashboard</h2>

      {activeBooking ? (
        <div className="card active-booking">
          <h3>🚕 Active Booking</h3>
          <p>
            <b>Status:</b> {activeBooking.status}
          </p>
          <p>
            <b>Cab:</b> {activeBooking.cab?.number || "Assigning..."}
          </p>
          <p>
            <b>Driver:</b> {activeBooking.cab?.driver?.name || "Pending..."}
          </p>
          <p>
            <b>Pickup:</b> {activeBooking.pickupLocation}
          </p>
          <p>
            <b>Booking ID:</b> {activeBooking.id}
          </p>

          <button className="btn-secondary" onClick={fetchActiveBooking}>
            🔁 Refresh Now
          </button>
        </div>
      ) : (
        <div className="card">
          <p>No active bookings found.</p>
          <div className="quick-actions">
            <button
              className="btn-primary"
              onClick={() => navigate("/employee/qr")}>
              📷 Book from Office (QR)
            </button>

            <button
              className="btn-secondary"
              onClick={handleLocationBooking}
              disabled={loading}>
              {loading ? "Booking..." : "📍 Book from Station (Geo)"}
            </button>
          </div>
        </div>
      )}

      <div className="info-section">
        <h3>How it works</h3>
        <ul>
          <li>📍 Within 250m of Guindy Station → Geo-booking allowed.</li>
          <li>🏢 Inside Guindy Office → Use QR booking at the gate.</li>
          <li>🚫 Outside these zones → Booking not allowed.</li>
        </ul>
      </div>
    </div>
  );
}
