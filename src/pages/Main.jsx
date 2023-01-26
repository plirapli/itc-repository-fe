import { useEffect } from 'react';
import { useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Home from './Home';
import Layout from './layout/Layout';
import LayoutLogin from './layout/LayoutLogin';
import { ForgotPassword, Login, Register } from './login/index';
import jwt from 'jwt-decode';

const Main = () => {
  const navigate = useNavigate();

  const [token, setToken] = useState('');
  const [msg, setMsg] = useState('');
  const [userData, setUserData] = useState({});
  const errorHandler = (errMessage) => setMsg(() => errMessage);

  const getDataToken = async () => {
    try {
      const jwt_token = localStorage.getItem('token');
      const decoded = jwt(jwt_token);
      setUserData(await decoded);
    } catch {
      navigate('/login');
    }
  };

  useEffect(() => {
    getDataToken();
  }, []);

  return (
    <div className='min-h-screen bg-gray-light'>
      <Routes>
        <Route element={<Layout />}>
          <Route
            index
            element={<Home userData={userData} errorHandler={errorHandler} />}
          />
          <Route
            path='/home'
            element={<Home userData={userData} errorHandler={errorHandler} />}
          />

          {/* Login, Register Page */}
          <Route element={<LayoutLogin />}>
            <Route
              path='/login'
              element={
                <Login
                  setToken={setToken}
                  msg={msg}
                  errorHandler={errorHandler}
                />
              }
            />
            <Route
              path='/forgot-password'
              element={<ForgotPassword msg={msg} errorHandler={errorHandler} />}
            />
            <Route
              path='/register'
              element={<Register msg={msg} errorHandler={errorHandler} />}
            />
          </Route>
        </Route>
      </Routes>
    </div>
  );
};

export default Main;
