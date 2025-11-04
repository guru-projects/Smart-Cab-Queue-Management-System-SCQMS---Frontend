import api from "./axiosInstance";

export const driverLogin = (payload) => api.post("/auth/driver/login", payload);

export const updateLocation = (data) => api.post("/cabs/update-location", data);

export const getMyCab = () => api.get("/cabs/my"); // optional
export const getAllCabs = () => api.get("/cabs/all");
