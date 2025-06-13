import axios from "axios";
import { getCookie } from "cookies-next";
import { toast } from "sonner";

const baseURL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

console.log("API base URL:", baseURL);

const api = axios.create({
  baseURL,
});

// Add a request interceptor to include the token in all requests
api.interceptors.request.use(
  (config) => {
    // Try to get token from cookie first, then fall back to localStorage
    const tokenFromCookie = getCookie("accessToken");
    const tokenFromStorage = localStorage.getItem("accessToken");

    const token = tokenFromCookie || tokenFromStorage;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Log outgoing requests in development
    if (process.env.NODE_ENV !== "production") {
      console.log(`API Request: ${config.method?.toUpperCase()} ${config.url}`);
      if (config.data) {
        console.log("Request data:", config.data);
      }
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor for global error handling and token refresh
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // Handle 401 Unauthorized errors
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Try cookie first, then localStorage
        const refreshTokenFromCookie = getCookie("refreshToken");
        const refreshTokenFromStorage = localStorage.getItem("refreshToken");

        const refreshToken = refreshTokenFromCookie || refreshTokenFromStorage;

        if (!refreshToken) {
          throw new Error("No refresh token available");
        }

        const response = await axios.post(`${baseURL}/api/auth/refresh`, {
          refreshToken,
        });

        const { accessToken, refreshToken: newRefreshToken } = response.data;

        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", newRefreshToken);

        // Retry the original request with new token
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return axios(originalRequest);
      } catch (refreshError) {
        console.error("Failed to refresh token:", refreshError);
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("user");

        toast.error("Sua sessão expirou. Por favor, faça login novamente.");

        window.location.href = "/auth/signin";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
