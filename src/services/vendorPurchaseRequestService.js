import axios from "axios";
 
const vendorPurchaseRequestService = axios.create({
  baseURL: "http://192.168.1.8:5001/api",
  headers: {},
});

export default vendorPurchaseRequestService;