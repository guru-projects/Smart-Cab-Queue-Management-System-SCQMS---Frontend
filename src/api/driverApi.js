import api from "./axiosInstance";

// DRIVER AUTH
export const driverLogin = (payload) => api.post("/auth/driver/login", payload);

// DRIVER CAB
export const getMyCab = () => api.get("/cabs/my");
export const updateLocation = (coords) => api.post("/cabs/update-location", coords);

// ADMIN VIEW
export const getAllCabs = () => api.get("/cabs");
export function employeeLogin(data) {
  return api.post("/employee/login", data);
}
