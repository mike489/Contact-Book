import { notifications } from "@mantine/notifications";
import axios from "axios";

const API = axios.create({
  baseURL: "https://contact-keeper-api-production.up.railway.app",
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor for JWT
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Optionally, setup a response interceptor to handle
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      notifications.show({
        title: "Unauthorized",
        message: "Please sign in to continue",
        color: "red",
      });
    }
    return Promise.reject(error);
  }
);

export default API;
