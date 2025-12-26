import axios from "axios";

// Check if the app is running in development mode

const axiosClient = axios.create({
  // Use localhost for dev, and the Render URL for production
  baseURL: "https://cultural-website.onrender.com/api",
  withCredentials: true,
});

axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default axiosClient;
