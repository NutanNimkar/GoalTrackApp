import axios from 'axios';


const createAxiosInstance = (token) => {
  const axiosInstance = axios.create({
    baseURL: "http://localhost:3000",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    }
  });

  return axiosInstance;
};

export default createAxiosInstance;
