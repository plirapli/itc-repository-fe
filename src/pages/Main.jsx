import { useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import jwt from 'jwt-decode';
import { getLocalAccessToken } from '../Utils/auth';

// Components
import { Layout, LayoutLogin, LayoutMateri } from './layout/index';
import { Home } from './index';
import { Overview, Diskusi } from './course/index';
import { ForgotPassword, Login, Register } from './login/index';

const Main = () => {
  const navigate = useNavigate();
  // const [, setToken] = useState('');
  const [msg, setMsg] = useState('');
  const [userData, setUserData] = useState({});

  const errorHandler = (errMsg) => setMsg(() => errMsg);

  useEffect(() => {
    const getDataToken = async () => {
      const jwt_token = getLocalAccessToken();
      return await jwt(jwt_token);
    };

    getDataToken()
      .then(setUserData)
      .catch(() => {
        navigate('/login/');
      });
    //eslint-disable-next-line
  }, []);

  return (
    <div className='min-h-screen bg-gray-light'>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route
            index
            element={<Home userData={userData} errorHandler={errorHandler} />}
          />
          <Route
            path='home/'
            element={<Home userData={userData} errorHandler={errorHandler} />}
          />
          <Route path='course/:id/' element={<LayoutMateri />}>
            <Route index element={<Overview />} />
            <Route path='diskusi/' element={<Diskusi />} />
          </Route>

          {/* Login, Register Page */}
          <Route element={<LayoutLogin />}>
            <Route
              path='login/'
              element={<Login msg={msg} errorHandler={errorHandler} />}
            />
            <Route
              path='forgot-password/'
              element={<ForgotPassword msg={msg} errorHandler={errorHandler} />}
            />
            <Route
              path='register/'
              element={<Register msg={msg} errorHandler={errorHandler} />}
            />
          </Route>
        </Route>
      </Routes>
    </div>
  );
};

export default Main;
