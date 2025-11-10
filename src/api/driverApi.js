// src/api/driverApi.js
import api from "./axiosInstance";

// ✅ Get assigned cab for driver (uses JWT for identity)
export const getMyCab = () => api.get("/api/driver/my-cab");

// ✅ Update driver’s live location
export const updateDriverLocation = ({ latitude, longitude }) =>
  api.post("/api/driver/update-location", { latitude, longitude });

// ✅ Admin view of all cabs
export const getAllCabs = () => api.get("/cab/all");
