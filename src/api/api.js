import axios from 'axios';
import {
  getAccessToken,
  getLocalAccessToken,
  setLocalAccessToken,
} from '../utils/auth';

const config = {
  baseURL: process.env.REACT_APP_BASE_URL || 'http://localhost/3000',
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
  (error) => Promise.reject(error)
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
          const { accessToken } = await getAccessToken();
          setLocalAccessToken(await accessToken);

          if (accessToken) {
            config.headers = {
              ...config.headers,
              Authorization: `Bearer ${await accessToken}`,
            };
          }

          return authApi(config);
        } catch ({ response }) {
          return Promise.reject(response);
        }
      }
    }

    return Promise.reject(err);
  }
);

export { api, authApi };
