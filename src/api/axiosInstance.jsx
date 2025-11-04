import axios from "axios";

const baseURL = import.meta.env.VITE_API_BASE || "http://localhost:4000/api";

const instance = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json"
  }
});

// attach token
instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default instance;
