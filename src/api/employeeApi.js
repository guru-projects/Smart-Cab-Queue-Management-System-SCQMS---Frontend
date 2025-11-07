import api from "./axiosInstance";

// ✅ Employee Auth APIs
import { loginUser, registerUser } from "./authApi";

// ✅ Optional: OTP APIs (if supported by backend)
export const sendEmpOtp = (data) => api.post("/auth/send-otp", data);
export const verifyEmpOtp = (data) => api.post("/auth/verify-otp", data);
