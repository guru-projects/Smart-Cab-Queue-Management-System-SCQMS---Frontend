import api from "./axiosInstance";

export const listCabs = () => api.get("/cabs");
export const createCab = (payload) => api.post("/cabs", payload);
export const setCabStatus = (id, status) => api.patch(`/cabs/${id}/status`, { status });
