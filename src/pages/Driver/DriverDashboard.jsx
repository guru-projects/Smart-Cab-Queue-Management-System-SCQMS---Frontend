import React, { useEffect, useState } from "react";
import { getMyCab, updateDriverLocation } from "../../api/driverApi";

export default function DriverDashboard() {
  const [cab, setCab] = useState(null);
  const [loading, setLoading] = useState(true);
  const driverId = localStorage.getItem("driverId"); // ✅ stored at login

  // ✅ Load assigned cab once
  useEffect(() => {
    async function loadCab() {
      try {
        const res = await getMyCab();
        setCab(res.data || null);
      } catch (err) {
        console.error("Failed to load cab:", err);
      } finally {
        setLoading(false);
      }
    }
    loadCab();
  }, []);

  // ✅ Auto-update location every 10 sec
  useEffect(() => {
    if (!driverId) return;

    const interval = setInterval(() => {
      if (!navigator.geolocation) return;
      navigator.geolocation.getCurrentPosition(async (pos) => {
        try {
          await updateDriverLocation({
              latitude: pos.coords.latitude,
              longitude: pos.coords.longitude,
            });

          console.log("📍 Location updated successfully!");
        } catch (err) {
          console.error("Failed to update driver location:", err);
        }
      });
    }, 10000);

    return () => clearInterval(interval);
  }, [driverId]);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="container">
      <h2 className="page-title">Driver Dashboard</h2>

      {cab ? (
        <div className="card" style={{ maxWidth: 520, padding: 16 }}>
          <div><b>Cab Number:</b> {cab.cabNumber}</div>
          <div><b>Status:</b> {cab.status}</div>
          <div><b>Latitude:</b> {cab.latitude ?? "N/A"}</div>
          <div><b>Longitude:</b> {cab.longitude ?? "N/A"}</div>
          <div><b>Last Updated:</b> {cab.lastUpdated ? new Date(cab.lastUpdated).toLocaleString() : "-"}</div>
        </div>
      ) : (
        <div>No cab assigned for this driver.</div>
      )}
    </div>
  );
}
