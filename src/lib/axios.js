import axios from "axios";

const api = axios.create({
  baseURL: "https://fullstackclub-finance-dashboard-api.onrender.com/docs",
  headers: {
    "Content-Type": "application/json",
  },
});
