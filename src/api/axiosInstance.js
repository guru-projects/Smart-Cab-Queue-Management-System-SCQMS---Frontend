// src/api/axiosInstance.js
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080",
  withCredentials: false,
});

api.interceptors.request.use(
  (config) => {
    // ✅ Retrieve separate tokens
    const empToken = localStorage.getItem("token_employee");
    const driverToken = localStorage.getItem("token_driver");

    // ✅ Auto-select token based on request path
    if (config.url.includes("/api/driver/") || config.url.includes("/cab/update-location")) {
      if (driverToken) {
        config.headers.Authorization = `Bearer ${driverToken}`;
      }
    } else if (
      config.url.includes("/api/bookings/") ||
      config.url.includes("/api/employee/") ||
      config.url.includes("/api/location/")
    ) {
      if (empToken) {
        config.headers.Authorization = `Bearer ${empToken}`;
      }
    }

    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;

    if (status === 401) {
      console.warn("⚠️ Token expired — redirecting to login...");
      const path = window.location.pathname;

      if (path.includes("/driver")) {
        localStorage.removeItem("token_driver");
        window.location.href = "/driver/login";
      } else {
        localStorage.removeItem("token_employee");
        window.location.href = "/employee/login";
      }
    }

    return Promise.reject(error);
  }
);

export default api;
