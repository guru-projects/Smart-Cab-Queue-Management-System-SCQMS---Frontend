// src/api/bookingApi.js
import api from "./axiosInstance";

export const createBooking = (employeeId) =>
  api.post(`/api/bookings/create/${employeeId}`);

export const getAllBookings = async () => {
  const token = localStorage.getItem("token");
  return api.get("/api/bookings/all", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getBookingsByEmployee = async (employeeId) => {
  const token = localStorage.getItem("token");
  return api.get(`/api/bookings/employee/${employeeId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const assignNext = () => api.post("/api/bookings/assign-next");

export const completeBooking = (bookingId) =>
  api.put(`/api/bookings/complete/${bookingId}`);
