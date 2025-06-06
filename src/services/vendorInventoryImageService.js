import axios from "axios";
import Cookies from "js-cookie";
 
const vendorInventoryImageService = axios.create({
  baseURL: "http://192.168.1.8:5005/uploads",
  headers: {
    "Content-Type": "application/json",
  },
});
 
vendorInventoryImageService.interceptors.request.use((config) => {
  const token = Cookies.get("authToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
 
  return config;
}, (error) => {
  return Promise.reject(error);
});
 
export default vendorInventoryImageService;