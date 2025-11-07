import api from "./axiosInstance";

// Employee booking
export const createBooking = (employeeId) =>
  api.post(`/api/bookings/create/${employeeId}`);

export const myBookings = (employeeId) =>
  api.get(`/api/bookings/employee/${employeeId}`);

export const cancelBooking = (id) =>
  api.put(`/api/bookings/complete/${id}`); // Marks booking complete

// Admin queue
export const queueStatus = () => api.get("/api/bookings/all");

export const requestMoreCabs = () =>
  api.post("/api/bookings/assign-next"); // Assign queued bookings
