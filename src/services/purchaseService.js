import axios from "axios";

const purchaseService = axios.create({
  baseURL: "http://localhost:5001/api/purchase",
  headers: {
    "Content-Type": "application/json",
  },
});

// Remove the store access here!
export const authorizedRequest = (token) => {
  purchaseService.interceptors.request.use((config) => {
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  return purchaseService;
};

export default purchaseService;

