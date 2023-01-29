import { useNavigate } from 'react-router-dom';

const getLocalAccessToken = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  return user?.accessToken;
};

const getLocalRefreshToken = () => {
  const { username, refreshToken } = JSON.parse(localStorage.getItem('user'));
  return JSON.stringify({ username, refreshToken });
};

const setLocalAccessToken = (token) => {
  const user = JSON.parse(localStorage.getItem('user'));
  user.accessToken = token;
  localStorage.setItem('user', JSON.stringify(user));
};

const loginHandler = ({ data }) => {
  const { accessToken, refreshToken, username } = data.user;

  // Store token to local storage
  localStorage.setItem(
    'user',
    JSON.stringify({ accessToken, refreshToken, username })
  );
};

export {
  getLocalAccessToken,
  getLocalRefreshToken,
  setLocalAccessToken,
  loginHandler,
};
