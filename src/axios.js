// src/axios.js
import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://fmcbackend-hpcs.onrender.com/api', 
});

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;


