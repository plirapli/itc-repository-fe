import { useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import jwt from 'jwt-decode';

// Components
import Layout from './layout/Layout';
import LayoutLogin from './layout/LayoutLogin';
import { Home, OverviewMateri } from './index';
import { ForgotPassword, Login, Register } from './login/index';

const Main = () => {
  const navigate = useNavigate();
  // const [, setToken] = useState('');
  const [msg, setMsg] = useState('');
  const [userData, setUserData] = useState({});

  const errorHandler = (errMessage) => setMsg(() => errMessage);

  useEffect(() => {
    const getDataToken = async () => {
      const jwt_token = localStorage.getItem('token');
      return await jwt(jwt_token);
    };

    getDataToken()
      .then(setUserData)
      .catch(() => {
        navigate('/login');
      });
    //eslint-disable-next-line
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
          <Route path='/course/:id' element={<OverviewMateri />} />

          {/* Login, Register Page */}
          <Route element={<LayoutLogin />}>
            <Route
              path='/login'
              element={
                <Login
                  // setToken={setToken}
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
