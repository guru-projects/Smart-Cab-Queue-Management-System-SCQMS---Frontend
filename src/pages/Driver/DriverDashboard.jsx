import React, { useEffect, useState } from "react";
import { getMyCab, updateLocation } from "../../api/driverApi";
import LocationButton from "../../components/LocationButton";

export default function DriverDashboard() {
  const [cab, setCab] = useState(null);
  const [loading, setLoading] = useState(true);
  const username = localStorage.getItem("username"); // saved at login

  useEffect(() => {
    let active = true;

    async function loadCab() {
      try {
        if (!username) return;
        const res = await getMyCab(username);
        if (active) {
          setCab(res?.data || null);
          setLoading(false);
        }
      } catch (err) {
        console.error("Failed to load cab:", err);
        setLoading(false);
      }
    }

    loadCab();
    const intervalId = setInterval(loadCab, 8000); // auto refresh every 8 sec

    return () => {
      active = false;
      clearInterval(intervalId);
    };
  }, [username]);

  const handleLocationUpdate = async () => {
    if (!cab) return alert("No cab assigned yet!");
    if (!navigator.geolocation) {
      alert("Geolocation not supported");
      return;
    }
    navigator.geolocation.getCurrentPosition(async (pos) => {
      try {
        const coords = {
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
        };
        await updateLocation(cab.id, coords);
        alert("Location updated successfully!");
      } catch (err) {
        console.error(err);
        alert("Failed to update location");
      }
    });
  };

  if (loading) return <div className="container">Loading...</div>;

  return (
    <div className="container">
      <h2 className="page-title">Driver Dashboard</h2>

      <div className="card" style={{ maxWidth: 520, padding: 16 }}>
        {cab ? (
          <>
            <div><b>Cab Number:</b> {cab.cabNumber}</div>
            <div><b>Driver Name:</b> {cab.driverName}</div>
            <div><b>Status:</b> {cab.status}</div>
            <div>
              <b>Last Updated:</b>{" "}
              {cab.lastUpdated
                ? new Date(cab.lastUpdated).toLocaleString()
                : "-"}
            </div>
            <div style={{ marginTop: 12 }}>
              <button className="btn btn-primary" onClick={handleLocationUpdate}>
                Update My Location
              </button>
            </div>
          </>
        ) : (
          <div>No cab assigned for driver: <b>{username}</b></div>
        )}
      </div>
    </div>
  );
}
