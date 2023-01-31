import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { getLocalAccessToken } from '../Utils/auth.js';
import jwt from 'jwt-decode';

// Components
import { Layout, LayoutLogin, LayoutMateri } from './layout/index.js';
import { Home } from './index';
import { Overview, Diskusi, Komentar } from './course/index.js';
import { ForgotPassword, Login, Register } from './login/index.js';

const Main = () => {
  const [msg, setMsg] = useState('');
  const [userData, setUserData] = useState({});

  const errorHandler = (errMsg) => setMsg(() => errMsg);

  useEffect(() => {
    setUserData(() => jwt(getLocalAccessToken()));
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
            <Route exact path='diskusi/' element={<Diskusi />} />
            <Route exact path='diskusi/:id/' element={<Komentar />} />
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
