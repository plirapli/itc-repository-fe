import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './Home';
import LayoutLogin from './layout/LayoutLogin';
import { ForgotPassword, Login, Register } from './login/index';

const Main = () => {
  const [token, setToken] = useState('');

  return (
    <div className='min-h-screen bg-gray-light'>
      <Routes>
        <Route index element={<Home token={token} />} />
        <Route path='/home' element={<Home token={token} />} />

        <Route element={<LayoutLogin />}>
          <Route path='/login' element={<Login setToken={setToken} />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />
          <Route path='/register' element={<Register />} />
        </Route>
      </Routes>
    </div>
  );
};

export default Main;
