import React from 'react';
import { Outlet, Route, Routes } from 'react-router-dom';
import { Login, Register, ForgotPassword } from './';

const LayoutLogin = () => {
  return (
    <div className='w-full min-h-screen flex justify-center sm:items-center p-0 sm:p-5'>
      <div className='w-full sm:w-[40rem] p-10 pt-8 bg-white sm:rounded-xl sm:shadow-md'>
        <Outlet />
      </div>
    </div>
  );
};

const ContainerLogin = () => {
  return (
    <Routes>
      <Route path='/' element={<LayoutLogin />}>
        <Route index element={<Login />} />
        <Route path='login' element={<Login />} />
        <Route path='forgot-password' element={<ForgotPassword />} />
        <Route path='register' element={<Register />} />
      </Route>
    </Routes>
  );
};

export default ContainerLogin;
