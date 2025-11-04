import { useEffect, useState } from "react";
import { listCabs, setCabStatus } from "../../api/cabApi";

export default function Cabs() {
  const [cabs, setCabs] = useState([]);

  useEffect(() => {
    (async () => {
      const res = await listCabs();
      setCabs(res?.data?.cabs || []);
    })();
  }, []);

  async function toggle(cab) {
    const next = cab.status === "available" ? "offline" : "available";
    await setCabStatus(cab.id, next);
    setCabs((prev) => prev.map((x) => (x.id === cab.id ? { ...x, status: next } : x)));
  }

  return (
    <div className="container">
      <h2 className="page-title">Manage Cabs</h2>
      <div className="grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(260px,1fr))" }}>
        {cabs.map((cab) => (
          <div key={cab.id} className="card">
            <div><b>{cab.cabNumber}</b></div>
            <div>Status: {cab.status}</div>
            <button onClick={() => toggle(cab)} style={{ marginTop: 8 }}>
              Toggle Status
            </button>
          </div>
        ))}
        {!cabs.length && <div className="card">No cabs yet.</div>}
      </div>
    </div>
  );
}
