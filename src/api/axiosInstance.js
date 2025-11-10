// src/api/axiosInstance.js
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080",
  withCredentials: false,
});

// ✅ Attach token automatically
api.interceptors.request.use(
  (config) => {
    const employeeToken = localStorage.getItem("token");
    const driverToken = localStorage.getItem("driver_token");

    // Auto-detect based on route
    if (config.url.includes("/api/driver/")) {
      if (driverToken) config.headers.Authorization = `Bearer ${driverToken}`;
    } else if (employeeToken) {
      config.headers.Authorization = `Bearer ${employeeToken}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// ✅ Handle expired JWTs
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    if (status === 401) {
      console.warn("⚠️ Token expired — redirecting to login...");
      localStorage.removeItem("token");
      if (!window.location.pathname.includes("/login")) {
        window.location.href = "/employee/login";
      }
    }
    return Promise.reject(error);
  }
);

export default api;
