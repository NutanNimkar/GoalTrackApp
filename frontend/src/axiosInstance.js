import axios from 'axios';

const createAxiosInstance = (token) => {
  const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL || "http://localhost:4060",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    }
  });

  return axiosInstance;
};

export default createAxiosInstance;
