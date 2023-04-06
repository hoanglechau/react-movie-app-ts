import axios from "axios";
import { BASE_URL } from "./config";

const apiService = axios.create({
  baseURL: BASE_URL
});

// Add a request interceptor
apiService.interceptors.request.use(
  (request) => {
    return request;
  },
  function (error) {
    console.log(error.message);
    return Promise.reject(error);
  }
);

// Add a response interceptor
apiService.interceptors.response.use(
  (response) => {
    return response;
  },
  function (error) {
    console.log(error.message);
    return Promise.reject(error);
  }
);

export default apiService;
