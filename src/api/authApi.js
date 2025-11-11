// src/api/authApi.js
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
export const loginUser = async ({ email, password }) => {
  const res = await api.post("/auth/login", { email, password });
  if (res.status === 200) {
    const { token, id, name, role } = res.data;
    localStorage.setItem("token_employee", token);
    localStorage.setItem("employee_id", id);
    localStorage.setItem("employee_name", name);
    localStorage.setItem("employee_role", role);
  }
  return res;
};

// ✅ DRIVER REGISTER
export const registerDriver = (data) => api.post("/auth/driver/register", data);

// ✅ DRIVER LOGIN
export const loginDriver = async (data) => {
  const res = await api.post("/auth/driver/login", data);
  if (res.status === 200) {
    const { token, id, name, role } = res.data;
    localStorage.setItem("token_driver", token);
    localStorage.setItem("driver_id", id);
    localStorage.setItem("driver_name", name);
    localStorage.setItem("driver_role", role);
  }
  return res;
};
