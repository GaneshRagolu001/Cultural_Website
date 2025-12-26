import axios from "axios";

// Check if the app is running in development mode

const axiosClient = axios.create({
  // Use localhost for dev, and the Render URL for production
  baseURL: "https://cultural-backend.onrender.com/api",
  withCredentials: true,
});

export default axiosClient;
