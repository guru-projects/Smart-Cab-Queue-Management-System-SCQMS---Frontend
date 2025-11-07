import api from "./axiosInstance";

export const registerEmployee = (data) => api.post("/auth/register", data);
export const employeeLogin = (data) => api.post("/auth/login", data);
