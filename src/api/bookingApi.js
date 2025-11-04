import api from "./axiosInstance";

// Employee booking
export const createBooking = (payload) => api.post("/bookings", payload);
export const myBookings = () => api.get("/bookings/me");
export const cancelBooking = (id) => api.delete(`/bookings/${id}`);

// Admin queue
export const queueStatus = () => api.get("/queue/status");
export const requestMoreCabs = (count) => api.post("/queue/request-cabs", { count });
