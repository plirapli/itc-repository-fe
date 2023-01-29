const login = ({ data }) => {
  const { accessToken } = data.user;
  localStorage.setItem('token', accessToken);
  console.log(accessToken);
  // setToken(() => token);

  // if (res) {
  //   navigate('/');
  // }
};

export { login };
