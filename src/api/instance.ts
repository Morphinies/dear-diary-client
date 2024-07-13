import axios from 'axios';
import Endpoints from './endpoints';

export const axiosInstance = axios.create({
  withCredentials: true,
});

const urlsSkipAuth = [Endpoints.AUTH.LOGIN, Endpoints.AUTH.REGISTR];

axiosInstance.interceptors.request.use(
  async (config: any) => {
    if (config.url && urlsSkipAuth.includes(config.url)) {
      return config;
    }
    const accessToken = localStorage.getItem('accessToken');
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
        const res = await axios.get(Endpoints.AUTH.REFRESH, {
          withCredentials: true,
        });
        localStorage.setItem('accessToken', res.data.accessToken);
        return axiosInstance.request(originalRequest);
      } catch (e) {
        console.log('Пользователь не авторизован');
      }
    }
    throw error;
  }
);
