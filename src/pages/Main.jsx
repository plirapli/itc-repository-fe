import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './Home';
import LayoutLogin from './layout/LayoutLogin';
import { ForgotPassword, Login, Register } from './login/index';

const Main = () => (
  <div className='min-h-screen bg-gray-light'>
    <Routes>
      <Route index element={<Home />} />
      <Route path='/home' element={<Home />} />

      <Route element={<LayoutLogin />}>
        <Route path='/login' element={<Login />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/register' element={<Register />} />
      </Route>
    </Routes>
  </div>
);

export default Main;
