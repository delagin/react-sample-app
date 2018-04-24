import axios from 'axios';

export const WebServer = axios.create({
  baseURL: process.env.WEB_SERVICE_URI,
  withCredentials: true,
  timeout: 30000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});
