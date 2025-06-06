import axios from 'axios';

const authClient = axios.create({
  baseURL: 'http://192.168.1.8:5004/api/auth',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default authClient;