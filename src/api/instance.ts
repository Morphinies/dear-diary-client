import axios from 'axios';
import { store } from '../store';
import Endpoints from './endpoints';
import { getAccessToken } from '../store/auth/actionCreators';

export const axiosInstance = axios.create({
  withCredentials: true,
});

const urlsSkipAuth = [
  Endpoints.AUTH.LOGIN,
  Endpoints.AUTH.REGISTR,
  Endpoints.AUTH.REFRESH,
];

axiosInstance.interceptors.request.use(
  async (config: any) => {
    if (config.url && urlsSkipAuth.includes(config.url)) {
      return config;
    }
    const accessToken = await (store.dispatch as any)(getAccessToken());
    if (accessToken) {
      config.headers = {
        authorization: `Bearer ${accessToken}`,
      };
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  async (config: any) => {
    return config;
  },
  async (error) => {
    console.error(error);
    const originalRequest = error.config;
    if (
      error.response.status === 401 &&
      error.config &&
      !originalRequest._isRetry
    ) {
      originalRequest._isRetry = true;
      try {
        console.log('originalRequest', originalRequest);
        console.log('parsed ', originalRequest.data);
        const res = await axios.get(Endpoints.AUTH.REFRESH, {
          withCredentials: true,
        });
        localStorage.setItem('accessToken', res.data.accessToken);
        return axiosInstance.request({
          ...originalRequest,
          data: JSON.parse(originalRequest.data),
        });
      } catch (e) {
        console.log('Пользователь не авторизован');
      }
    }
    throw error;
  }
);
