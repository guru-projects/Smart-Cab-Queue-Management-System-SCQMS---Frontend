// src/pages/Driver/DriverDashboard.jsx
import React, { useEffect, useState } from "react";
import {
  getAvailableCabs,
  startSession,
  endSession,
  getMyCab,
  updateDriverLocation
} from "../../api/driverApi";

export default function DriverDashboard() {
  const [availableCabs, setAvailableCabs] = useState([]);
  const [selectedCab, setSelectedCab] = useState("");
  const [activeCab, setActiveCab] = useState(null);
  const [isDriving, setIsDriving] = useState(false);
  const [loading, setLoading] = useState(true);

  // ✅ Load either active session or available cabs
  useEffect(() => {
    async function init() {
      try {
        // check if driver already has an active cab
        const myCabRes = await getMyCab();
        if (myCabRes.data && myCabRes.data.id) {
          setActiveCab(myCabRes.data);
          setIsDriving(true);
        } else {
          const cabRes = await getAvailableCabs();
          setAvailableCabs(cabRes.data);
        }
      } catch (err) {
        console.error("Error loading driver dashboard:", err);
      } finally {
        setLoading(false);
      }
    }
    init();
  }, []);

  // ✅ Start driving session
  const handleStart = async () => {
    if (!selectedCab) return alert("Please select a cab first");
    try {
      await startSession(selectedCab);
      setIsDriving(true);
      const cab = availableCabs.find((c) => c.id === parseInt(selectedCab));
      setActiveCab(cab);
      console.log("🚗 Session started for cab:", cab.cabNumber);
    } catch (err) {
      console.error("Failed to start session:", err);
      alert("Error starting session. Check console for details.");
    }
  };

  // ✅ End driving session
  const handleEnd = async () => {
    try {
      await endSession();
      setIsDriving(false);
      setActiveCab(null);
      const res = await getAvailableCabs();
      setAvailableCabs(res.data);
      console.log("🛑 Session ended");
    } catch (err) {
      console.error("Failed to end session:", err);
      alert("Error ending session. Check console for details.");
    }
  };

  // ✅ Auto-update location every 10 seconds
  useEffect(() => {
    if (!isDriving) return;
    const interval = setInterval(() => {
      if (!navigator.geolocation) return;
      navigator.geolocation.getCurrentPosition(async (pos) => {
        try {
          await updateDriverLocation({
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude,
          });
          console.log("📍 Location updated successfully");
        } catch (err) {
          console.error("Failed to update driver location:", err);
        }
      });
    }, 10000);

    return () => clearInterval(interval);
  }, [isDriving]);

  if (loading) return <div>Loading dashboard...</div>;

  return (
    <div className="container" style={{ maxWidth: 600, marginTop: 30 }}>
      <h2 className="page-title">🚘 Driver Dashboard</h2>

      {!isDriving ? (
        <>
          <label>Select Cab:</label>
          <select
            value={selectedCab}
            onChange={(e) => setSelectedCab(e.target.value)}
            style={{ display: "block", marginBottom: 16, padding: 8 }}
          >
            <option value="">-- Choose Cab --</option>
            {availableCabs.map((cab) => (
              <option key={cab.id} value={cab.id}>
                {cab.cabNumber} ({cab.status})
              </option>
            ))}
          </select>

          <button
            onClick={handleStart}
            disabled={!selectedCab}
            style={{
              padding: "10px 20px",
              background: "#007bff",
              color: "white",
              border: "none",
              borderRadius: 6,
              cursor: "pointer",
            }}
          >
            Start Shift
          </button>
        </>
      ) : (
        <>
          <div
            className="card"
            style={{
              marginTop: 16,
              padding: 16,
              background: "#f8f1",
              borderRadius: 10,
              boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
            }}
          >
            <h3>Currently Driving:</h3>
            <div><b>Cab Number:</b> {activeCab?.cabNumber}</div>
            <div><b>Status:</b> {activeCab?.status}</div>
          </div>

          <button
            onClick={handleEnd}
            style={{
              marginTop: 16,
              padding: "10px 20px",
              background: "#dc3545",
              color: "white",
              border: "none",
              borderRadius: 6,
              cursor: "pointer",
            }}
          >
            End Shift
          </button>
        </>
      )}
    </div>
  );
}
