// src/context/QueueContext.jsx
import React, { createContext, useContext, useState, useEffect } from "react";
import { getAllBookings } from "../api/bookingApi";

const QueueContext = createContext();

export const QueueProvider = ({ children }) => {
  const [queue, setQueue] = useState([]);
  const [loading, setLoading] = useState(false);

  // ✅ Renamed & properly defined load function
  const loadQueue = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      if (!token) return;

      const res = await getAllBookings();
      if (Array.isArray(res.data)) {
        setQueue(res.data);
      } else {
        console.warn("⚠️ Unexpected queue API response:", res.data);
      }
    } catch (err) {
      console.error("🚨 Failed to fetch queue:", err);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Refresh queue every 10 seconds
  useEffect(() => {
    loadQueue();
    const interval = setInterval(loadQueue, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <QueueContext.Provider value={{ queue, setQueue, loading, reload: loadQueue }}>
      {children}
    </QueueContext.Provider>
  );
};

export const useQueue = () => useContext(QueueContext);
