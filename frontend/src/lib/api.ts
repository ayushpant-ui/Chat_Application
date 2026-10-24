import axios from 'axios';
import { useAuthStore } from '@/store/auth.store';

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true, // needed if the backend sets a refresh-token cookie
});

api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().accessToken;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response?.status === 401) {
      useAuthStore.getState().logout();
    }
    return Promise.reject(error);
  },
);

export const getErrorMessage = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    const msg = error.response?.data?.message;
    if (Array.isArray(msg)) return msg.join(', '); // NestJS validation errors
    if (typeof msg === 'string') return msg;
  }
  return 'Something went wrong. Please try again.';
};

// export const getErrorMessage = (error: unknown): string => {
//   if (axios.isAxiosError(error)) {
//     console.error("Axios error:", error.message);
//     console.error("Request URL:", error.config?.baseURL, error.config?.url);
//     console.error("Response status:", error.response?.status);
//     console.error("Response data:", error.response?.data);
//     console.error("Error code:", error.code);

//     const msg = error.response?.data?.message;

//     if (Array.isArray(msg)) return msg.join(", ");
//     if (typeof msg === "string") return msg;

//     if (!error.response) {
//       return `Network error: ${error.message}`;
//     }
//   } else {
//     console.error("Unexpected error:", error);
//   }

//   return "Something went wrong. Please try again.";
// };