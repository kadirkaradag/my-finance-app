import axios from "axios";
import AuthService from "./AuthService";

const ApiService = axios.create({
  baseURL: "https://localhost:7248/api",
});

// Request interceptor ile her isteğe otomatik olarak token ekleme
ApiService.interceptors.request.use(
  (config) => {
    const token = AuthService.getToken();
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default ApiService;
