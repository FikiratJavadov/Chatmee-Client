import axios from "axios";
import { useAuth } from "../store/auth";

const instance = axios.create({
  baseURL: "http://localhost:5000/api/v1",
});

instance.interceptors.request.use(
  function (config) {
    const token = useAuth.getState().token;

    if (!token) {
      console.log("Token not provided");
      return config;
    }

    config.headers.Authorization = `Bearer ${token}`;

    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

export default instance;
