import { useEffect, useState } from "react";
import { myBookings, cancelBooking } from "../../api/bookingApi";

export default function BookingHistory() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    (async () => {
      const res = await myBookings();
      setItems(res?.data?.bookings || []);
    })();
  }, []);

  async function cancel(id) {
    await cancelBooking(id);
    setItems((prev) => prev.filter((b) => b.id !== id));
  }

  return (
    <div className="container">
      <h2 className="page-title">My Bookings</h2>
      <div className="grid">
        {items.map((b) => (
          <div key={b.id} className="card">
            <div><b>{b.route || "Guindy → Office"}</b></div>
            <div>Status: {b.status}</div>
            <button style={{ marginTop: 8 }} onClick={() => cancel(b.id)}>Cancel</button>
          </div>
        ))}
        {!items.length && <div className="card">No bookings yet.</div>}
      </div>
    </div>
  );
}
