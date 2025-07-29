import axios from "axios";
import router from "@/router";

const baseURL = import.meta.env.VITE_CN_POKER_API_URL;
const apiClient = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
  withCredentials: false,
});

// ✅ REQUEST INTERCEPTOR
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("auth_token");
    const locale = localStorage.getItem("lang") || "en";

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    config.headers["Accept-Language"] = locale;

    return config;
  },
  (error) => {
    console.error("Request error:", error);
    return Promise.reject(error);
  }
);

// ✅ RESPONSE INTERCEPTOR
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const { response } = error;

    if (!response) {
      console.error("Network error:", error);
      return Promise.reject({ message: "Network Error", ...error });
    }

    const status = response.status;

    if (status === 401 || status === 422) {
      localStorage.removeItem("auth_token");
      router.push("/login");
    }

    // Optional: show user-friendly error message here
    console.error("API Error:", response.data || response.statusText);
    return Promise.reject(response.data || error);
  }
);

export default apiClient;
