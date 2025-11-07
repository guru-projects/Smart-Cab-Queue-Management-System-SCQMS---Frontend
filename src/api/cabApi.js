// src/api/cabApi.js
import api from "./axiosInstance";

export const listCabs = () => api.get("/cab/all");

// status is a simple query parameter in backend
export const setCabStatus = (id, status) =>
  api.put(`/cab/update-status/${id}?status=${encodeURIComponent(status)}`);

// update location by cabId with query params
export const updateLocation = (id, coords) =>
  api.put(`/cab/update-location/${id}?latitude=${coords.latitude}&longitude=${coords.longitude}`);
