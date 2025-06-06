import axios from 'axios';

const authClient = axios.create({
  baseURL: 'http://localhost:5004/api/auth',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default authClient;