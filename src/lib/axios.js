import axios from "axios";

const api = axios.create({
  baseURL: "https://fullstackclub-finance-dashboard-api.onrender.com/api",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((request) => {
  const accessToken = localStorage.getItem("accessToken");

  if (accessToken) {
    request.headers.Authorization = `Bearer ${accessToken}`;
  }

  return request;
});

export default api;
