import { useQueue } from "../../context/QueueContext";

export default function QueueStatus() {
  const { queue } = useQueue();
  return (
    <div className="container">
      <h2 className="page-title">Queue Status</h2>
      <div className="card">
        Waiting: <b>{queue.length}</b>
      </div>
      <div className="grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(260px,1fr))", marginTop: 12 }}>
        {queue.map((q, i) => (
          <div key={q.id || i} className="card">
            <div><b>{q.employeeName}</b></div>
            <div>Arrived: {new Date(q.arrivedAt).toLocaleTimeString()}</div>
            <div>Priority: {q.priority ?? i + 1}</div>
          </div>
        ))}
        {!queue.length && <div className="card">Queue is currently empty.</div>}
      </div>
    </div>
  );
}
