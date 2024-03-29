import axios from 'axios';
const baseURL = 'http://192.168.0.204:3001';
const axiosInstance = axios.create({
  baseURL: baseURL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});
export { baseURL, axiosInstance };