import api from "./axiosInstance";

// ✅ Register for Employee, Driver, or Admin
export const registerUser = (data) => api.post("/auth/register", data);

// ✅ Login for Employee, Driver, or Admin
export const loginUser = (data) => api.post("/auth/login", data);
