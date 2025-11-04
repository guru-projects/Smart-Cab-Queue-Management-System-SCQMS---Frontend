import React, { useEffect, useState } from "react";
import LocationButton from "../../components/LocationButton";
import { getMyCab } from "../../api/driverApi";
import { useAuth } from "../../context/AuthContext";

export default function DriverDashboard() {
  const { user } = useAuth();
  const [cab, setCab] = useState(null);

  useEffect(() => {
    async function load() {
      try {
        const res = await getMyCab();
        setCab(res.data);
      } catch (err) {
        // optional: handle
      }
    }
    load();
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h2>Driver Dashboard</h2>
      <div>
        <div>Driver: {user?.username}</div>
        <div>Cab: {cab?.cabNumber || "Not assigned"}</div>
        <div>Status: {cab?.status || "Unknown"}</div>
        <div>Last known: {cab?.latitude ? `${cab.latitude}, ${cab.longitude}` : "—"}</div>
        <LocationButton onUpdated={(data)=>setCab(data.cab)} />
      </div>
    </div>
  );
}
