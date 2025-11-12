import React, { useEffect, useState } from "react";
import { getBookingsByEmployee } from "../../api/bookingApi";
import { useAuth } from "../../context/AuthContext";

export default function BookingHistory() {
  const { user } = useAuth();
  const [myBookings, setMyBookings] = useState([]); // ✅ always define

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const employeeId = user?.id || user?.employeeId || 3;
        const res = await getBookingsByEmployee(employeeId);

        // Defensive check
        const data = Array.isArray(res.data) ? res.data : [];
        setMyBookings(data);
      } catch (err) {
        console.error("Failed to fetch booking history:", err);
      }
    };

    fetchBookings();
  }, [user]);

  return (
    <div className="container">
      <h2>📜 My Booking History</h2>

      {myBookings.length === 0 ? (
        <p>No bookings yet.</p>
      ) : (
        <table className="booking-history-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Status</th>
              <th>Cab</th>
              <th>Driver</th>
              <th>Pickup</th>
              <th>Drop</th>
              <th>Created At</th>
            </tr>
          </thead>
          <tbody>
            {myBookings.map((b) => (
              <tr key={b.id}>
                <td>{b.id}</td>
                <td>{b.status}</td>
                <td>{b.cab?.cabNumber || "N/A"}</td>
                <td>{b.cab?.driver?.name || "N/A"}</td>
                <td>{b.pickupLocation || "-"}</td>
                <td>{b.dropLocation || "-"}</td>
                <td>{new Date(b.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
