const getLocalAccessToken = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  return user?.accessToken;
};

const getLocalRefreshToken = () => {
  const user = localStorage.getItem('user');
  if (user) {
    const { username, refreshToken } = JSON.parse(user);
    return JSON.stringify({ username, refreshToken });
  }
  return null;
};

const setLocalAccessToken = (token) => {
  const user = JSON.parse(localStorage.getItem('user'));
  user.accessToken = token;
  localStorage.setItem('user', JSON.stringify(user));
};

const loginHandler = ({ data }, token) => {
  const { accessToken, refreshToken, username } = data.user;

  // Store token to State && Local Storage
  token(accessToken);
  localStorage.setItem(
    'user',
    JSON.stringify({ accessToken, refreshToken, username })
  );
};

const logoutHandler = () => localStorage.removeItem('user');

export {
  getLocalAccessToken,
  getLocalRefreshToken,
  setLocalAccessToken,
  loginHandler,
  logoutHandler,
};
