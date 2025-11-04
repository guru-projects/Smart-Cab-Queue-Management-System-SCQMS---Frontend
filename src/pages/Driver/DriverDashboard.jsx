import React, { useEffect, useState } from "react";
import { getMyCab } from "../../api/driverApi";
import LocationButton from "../../components/LocationButton";

export default function DriverDashboard() {
  const [cab, setCab] = useState(null);

  useEffect(() => {
    let active = true;
    async function load() {
      try {
        const res = await getMyCab();
        if (active) setCab(res?.data?.cab || null);
      } catch {}
    }
    load();
    const id = setInterval(load, 8000);
    return () => { active = false; clearInterval(id); };
  }, []);

  return (
    <div className="container">
      <h2 className="page-title">Driver Dashboard</h2>
      <div className="card" style={{ maxWidth: 520 }}>
        {cab ? (
          <>
            <div><b>Cab:</b> {cab.cabNumber}</div>
            <div><b>Status:</b> {cab.status}</div>
            <div><b>Last Update:</b> {cab.updatedAt ? new Date(cab.updatedAt).toLocaleString() : "-"}</div>
          </>
        ) : (
          <div>No cab assigned.</div>
        )}
        <div style={{ marginTop: 12 }}>
          <LocationButton />
        </div>
      </div>
    </div>
  );
}
