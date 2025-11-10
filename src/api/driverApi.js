// src/api/driverApi.js
import api from "./axiosInstance";

// ✅ Get all available cabs
export const getAvailableCabs = () => api.get("/api/driver/available-cabs");

// ✅ Start a driving session
export const startSession = (cabId) => api.post(`/api/driver/start-session/${cabId}`);

// ✅ End current session
export const endSession = () => api.post("/api/driver/end-session");

// ✅ Send live location
export const updateDriverLocation = ({ latitude, longitude }) =>
  api.post("/api/driver/update-location", { latitude, longitude });

// ✅ Optionally, get current cab info (active session)
export const getMyCab = () => api.get("/api/driver/my-cab");
