import { api } from '../api/api';

const getLocalAccessToken = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  return user?.accessToken;
};

const getLocalRefreshToken = () => {
  const user = localStorage.getItem('user');
  if (user) {
    const { refreshToken } = JSON.parse(user);
    return JSON.stringify({ refreshToken });
  }
  return null;
};

const setLocalAccessToken = (token) => {
  const user = JSON.parse(localStorage.getItem('user'));
  user.accessToken = token;
  localStorage.setItem('user', JSON.stringify(user));
};

// Send refresh token
const getAccessToken = async () =>
  api
    .post('/users/refresh-token', getLocalRefreshToken())
    .then(({ data }) => data.data)
    .catch(({ response }) => Promise.reject(response));

// Send Login
const sendLogin = async (userData) =>
  api
    .post('/users/login', userData)
    .then(({ data }) => data)
    .catch(({ response }) => Promise.reject(response));

const sendRegister = async (userData) =>
  api
    .post('/users/register', userData)
    .then(({ data }) => data.message)
    .catch(({ response }) => Promise.reject(response));

const loginHandler = ({ data }, setToken) => {
  const { accessToken, refreshToken } = data.user;

  // Store token to State && Local Storage
  localStorage.setItem('user', JSON.stringify({ accessToken, refreshToken }));
  setToken(accessToken);
};

const logoutHandler = () => localStorage.removeItem('user');

export {
  getLocalAccessToken,
  getLocalRefreshToken,
  setLocalAccessToken,
  getAccessToken,
  sendLogin,
  sendRegister,
  loginHandler,
  logoutHandler,
};
