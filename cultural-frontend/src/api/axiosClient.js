import axios from "axios";

const axiosClient = axios.create({
  baseURL: "https://cultural-backend.onrender.com/api",
  withCredentials: true,
});

export default axiosClient;
