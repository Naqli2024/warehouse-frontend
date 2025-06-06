import axios from "axios";
 
const vendorService = axios.create({
  baseURL: "http://192.168.1.8:5005/api/vendor",
  headers: {},
});
 

export const authorizedRequest = (token) => {
  vendorService.interceptors.request.use((config) => {
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });
 
  return vendorService;
};
 
export default vendorService;