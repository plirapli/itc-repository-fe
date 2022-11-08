import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './Home';
import LayoutLogin from './layout/LayoutLogin';
import { ForgotPassword, Login, Register } from './login/index';

const Main = () => {
  const [token, setToken] = useState('');
  const [msg, setMsg] = useState('');
  const errorHandler = (errMessage) => setMsg(() => errMessage);

  return (
    <div className='min-h-screen bg-gray-light'>
      <Routes>
        <Route
          index
          element={<Home token={token} errorHandler={errorHandler} />}
        />
        <Route
          path='/home'
          element={<Home token={token} errorHandler={errorHandler} />}
        />

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
      </Routes>
    </div>
  );
};

export default Main;
