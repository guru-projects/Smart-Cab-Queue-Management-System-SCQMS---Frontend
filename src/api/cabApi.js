import api from "./axiosInstance";

export const listCabs = () => api.get("/cab/all");

export const setCabStatus = (id, status) =>
  api.put(`/cab/update-status/${id}?status=${status}`);

export const updateCabLocation = (id, latitude, longitude) =>
  api.put(`/cab/update-location/${id}?latitude=${latitude}&longitude=${longitude}`);
