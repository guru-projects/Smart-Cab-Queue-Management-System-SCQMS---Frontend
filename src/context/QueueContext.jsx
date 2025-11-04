import { createContext, useContext, useEffect, useState } from "react";
import { queueStatus } from "../api/bookingApi";

const QueueContext = createContext();

export function QueueProvider({ children }) {
  const [queue, setQueue] = useState([]);

  useEffect(() => {
    let active = true;

    async function load() {
      try {
        const res = await queueStatus();
        if (active && res?.data?.queue) setQueue(res.data.queue);
      } catch {}
    }
    load();
    const id = setInterval(load, 10000);
    return () => { active = false; clearInterval(id); };
  }, []);

  return (
    <QueueContext.Provider value={{ queue, setQueue }}>
      {children}
    </QueueContext.Provider>
  );
}

export function useQueue() {
  return useContext(QueueContext);
}
