import axios from "axios";
 
const userService = axios.create({
  baseURL: "http://192.168.1.8:5004/api",
  headers: {
    "Content-Type": "application/json",
  },
});
 
 
export const authorizedRequest = (token) => {
   console.log("token",token)
  userService.interceptors.request.use((config) => {
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });
 
  return userService;
};
 
export default userService;