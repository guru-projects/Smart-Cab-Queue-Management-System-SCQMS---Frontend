// src/api/bookingApi.js
import api from "./axiosInstance";

export const createBooking = (employeeId) =>
  api.post(`/api/bookings/create/${employeeId}`);

export const getAllBookings = () => api.get("/api/bookings/all");

export const getBookingsByEmployee = (employeeId) =>
  api.get(`/api/bookings/employee/${employeeId}`);

export const assignNext = () => api.post("/api/bookings/assign-next");

export const completeBooking = (bookingId) =>
  api.put(`/api/bookings/complete/${bookingId}`);
