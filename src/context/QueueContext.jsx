// src/context/QueueContext.jsx
import React, { createContext, useContext, useState, useEffect } from "react";
import { getBookingsByEmployee } from "../api/bookingApi";
import { useAuth } from "./AuthContext"; // ✅ import user context

const QueueContext = createContext();

export const QueueProvider = ({ children }) => {
  const [queue, setQueue] = useState([]);
  const [loading, setLoading] = useState(false);

  const { user } = useAuth(); // ✅ get user info from AuthContext

  const loadQueue = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      if (!token || !user) return;

      const employeeId = user?.id || user?.employeeId; // ✅ safely extract employee ID
      if (!employeeId) {
        console.warn("⚠️ No employee ID found for current user.");
        return;
      }

      const res = await getBookingsByEmployee(employeeId);

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

  useEffect(() => {
    loadQueue();
    const interval = setInterval(loadQueue, 10000);
    return () => clearInterval(interval);
  }, [user]); // ✅ re-run when user changes

  return (
    <QueueContext.Provider value={{ queue, setQueue, loading, reload: loadQueue }}>
      {children}
    </QueueContext.Provider>
  );
};

export const useQueue = () => useContext(QueueContext);
