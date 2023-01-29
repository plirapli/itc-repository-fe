import axios from 'axios';
import {
  getLocalAccessToken,
  getLocalRefreshToken,
  setLocalAccessToken,
} from '../Utils/auth';

const api = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL || '3001',
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const token = getLocalAccessToken();
    if (token) {
      config.headers['Authorization'] = 'Bearer ' + token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    const originalConfig = err.config;
    console.log(originalConfig);

    if (originalConfig.url !== '/user/login' && err.response) {
      // Access Token was expired
      if (err.response.status === 401 && !originalConfig._retry) {
        originalConfig._retry = true;

        try {
          const { data } = await api.post(
            '/user/refresh-token',
            getLocalRefreshToken()
          );

          console.log(data);
          const { accessToken } = data;
          setLocalAccessToken(accessToken);

          return api(originalConfig);
        } catch (_error) {
          return Promise.reject(_error);
        }
      }
    }

    return Promise.reject(err);
  }
);

export default api;
