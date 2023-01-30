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

// Using default header
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
  (res) => res,
  async (err) => {
    const config = err?.config;

    if (config.url !== '/user/login' && err.response) {
      // Access Token was expired
      if (err.response.status === 400 && !config._retry) {
        config._retry = true;

        try {
          // Get access token from refresh token
          const { data } = await api.post(
            '/user/refresh-token',
            getLocalRefreshToken()
          );
          const { accessToken } = await data.data;
          setLocalAccessToken(await accessToken);

          if (accessToken) {
            config.headers = {
              ...config.headers,
              Authorization: `Bearer ${await accessToken}`,
            };
          }

          return api(config);
        } catch (_error) {
          return Promise.reject(_error);
        }
      }
    }

    return Promise.reject(err);
  }
);

export default api;
