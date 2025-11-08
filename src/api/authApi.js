import api from "./axiosInstance";

// ✅ Register Employee
export const registerUser = (data) =>
  api.post("/auth/register", {
    name: data.name,
    email: data.email,
    password: data.password,
    confirmPassword: data.confirmPassword,
  });

// ✅ Login Employee
export const loginUser = (data) =>
  api.post("/auth/login", {
    email: data.email,
    password: data.password,
  });

// ✅ DRIVER REGISTER
export const registerDriver = (data) => api.post("/auth/driver/register", data);

// ✅ DRIVER LOGIN
export const loginDriver = (data) => api.post("/auth/driver/login", data);

