import axios from "axios";
 
const getPurchaseIndent = axios.create({
  baseURL: "http://192.168.1.8:5001/api/purchase",
  headers: {
    "Content-Type": "application/json",
  },
});


export default getPurchaseIndent