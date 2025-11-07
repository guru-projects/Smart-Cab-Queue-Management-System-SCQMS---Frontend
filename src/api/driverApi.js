import api from "./axiosInstance";

// DRIVER LOGIN
export const driverLogin = (payload) => api.post("/auth/login", payload);

// DRIVER CAB
export const updateLocation = (id, coords) =>
  api.put(`/cab/update-location/${id}?latitude=${coords.latitude}&longitude=${coords.longitude}`);

// Optional: if driver dashboard shows all cabs
export const getAllCabs = () => api.get("/cab/all");
