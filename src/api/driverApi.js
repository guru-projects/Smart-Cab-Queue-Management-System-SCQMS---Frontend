// src/api/driverApi.js
import api from "./axiosInstance";

// driver login can use the same /auth/login if you share credentials
import { loginUser, registerUser } from "./authApi";


// Backend we will add: GET /api/driver/my-cab
export const getMyCab = () => api.get("/api/driver/my-cab");

// Location update: use CAB endpoint that already exists (needs cabId)
export const updateLocation = (cabId, coords) =>
  api.put(`/cab/update-location/${cabId}?latitude=${coords.latitude}&longitude=${coords.longitude}`);

// Admin view of all cabs
export const getAllCabs = () => api.get("/cab/all");
