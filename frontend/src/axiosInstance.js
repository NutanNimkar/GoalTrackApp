import axios from 'axios';


const createAxiosInstance = (token) => {
  const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL || "http://localhost:4060",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    }
  });

  return axiosInstance;
};

export default createAxiosInstance;
