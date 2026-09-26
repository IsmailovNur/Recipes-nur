import axios from 'axios';
import { store } from "../../app/store.ts";

export const apiURL = 'http://localhost:8080';

const axiosApi = axios.create({
  baseURL: apiURL,
});

axiosApi.interceptors.request.use((config) => {
  const token = store.getState().user.user?.token;
  if (token) {
    config.headers.Authorization = token;
  }
  return config;
});

export default axiosApi;