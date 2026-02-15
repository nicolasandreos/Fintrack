import axios from "axios";

import {
  LOCAL_STORAGE_ACCESS_TOKEN,
  LOCAL_STORAGE_REFRESH_TOKEN,
} from "@/constants/localStorage";

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

api.interceptors.response.use(
  (request) => request,
  async (error) => {
    const request = error.config;

    const refreshToken = localStorage.getItem(LOCAL_STORAGE_REFRESH_TOKEN);
    if (!refreshToken) {
      return Promise.reject(error);
    }

    if (
      error.response.status == 401 &&
      !request._retry &&
      !request.url.includes("/users/refresh-token")
    ) {
      request._retry = true;
      try {
        const response = await api.post("/users/refresh-token", {
          refreshToken: refreshToken,
        });

        const newAccessToken = response.data.accessToken;
        const newRefreshToken = response.data.refreshToken;

        localStorage.setItem(LOCAL_STORAGE_REFRESH_TOKEN, newRefreshToken);
        localStorage.setItem(LOCAL_STORAGE_ACCESS_TOKEN, newAccessToken);

        request.headers.Authorization = `Bearer ${newAccessToken}`;
        api(request);
      } catch (error) {
        console.error(error);
        localStorage.removeItem(LOCAL_STORAGE_ACCESS_TOKEN);
        localStorage.removeItem(LOCAL_STORAGE_REFRESH_TOKEN);
      }
    }
    return Promise.reject(error);
  }
);

export default api;
