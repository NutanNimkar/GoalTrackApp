import axios from 'axios';

const createAxiosInstance = (token) => {
  const axiosInstance = axios.create({
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    }
  });

  return axiosInstance;
};

export default createAxiosInstance;
