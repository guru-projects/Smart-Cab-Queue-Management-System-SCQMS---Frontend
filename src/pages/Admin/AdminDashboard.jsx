import React, { useEffect, useState } from "react";
import { getAllCabs } from "../../api/driverApi";
import MapView from "../../components/MapView";

export default function AdminDashboard() {
  const [cabs, setCabs] = useState([]);

  useEffect(() => {
    let active = true;
    async function load() {
      try {
        const res = await getAllCabs();
        if (active && res?.data?.cabs) setCabs(res.data.cabs);
      } catch (e) { /* silent */ }
    }
    load();
    const id = setInterval(load, 8000);
    return () => { active = false; clearInterval(id); };
  }, []);

  return (
    <div className="container">
      <h2 className="page-title">Admin Dashboard — Live Cabs</h2>
      <MapView cabs={cabs} />
      <div className="card" style={{ marginTop: 12 }}>
        <h3>Active Cabs</h3>
        <div className="grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(220px,1fr))" }}>
          {cabs.map((c) => (
            <div key={c.id} className="card">
              <div><b>{c.cabNumber}</b></div>
              <div>Status: {c.status}</div>
              <div>Updated: {new Date(c.updatedAt).toLocaleTimeString()}</div>
            </div>
          ))}
          {!cabs.length && <div>No cabs found</div>}
        </div>
      </div>
    </div>
  );
}
