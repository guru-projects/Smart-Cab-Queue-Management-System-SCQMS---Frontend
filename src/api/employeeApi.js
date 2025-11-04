import api from "./axiosInstance";

export const sendEmpOtp      = (data) => api.post("/employee/send-otp", data);
export const verifyEmpOtp    = (data) => api.post("/employee/verify-otp", data);
export const employeeLogin   = (data) => api.post("/employee/login", data);
export const registerEmployee = (data) => api.post("/employee/register", data);
