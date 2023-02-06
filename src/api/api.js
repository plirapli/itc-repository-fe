import axios from 'axios';
import {
  getLocalAccessToken,
  getLocalRefreshToken,
  setLocalAccessToken,
} from '../Utils/auth';

const config = {
  baseURL: process.env.REACT_APP_BASE_URL || '3001',
  headers: {
    'Content-Type': 'application/json',
  },
};

// Create instance
const api = axios.create(config);
const authApi = axios.create(config);

// Using default header
authApi.interceptors.request.use(
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

authApi.interceptors.response.use(
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

          return authApi(config);
        } catch (_error) {
          return Promise.reject(_error);
        }
      }
    }

    return Promise.reject(err);
  }
);

export { api, authApi };
