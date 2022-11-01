import React from 'react';
import { Outlet } from 'react-router-dom';
import { Logo } from '../../assets';

const LayoutLogin = () => {
  return (
    <div className='w-full min-h-screen flex justify-center sm:items-center p-0 sm:p-5'>
      <div className='w-full sm:w-[40rem] p-10 pt-8 bg-white sm:rounded-xl sm:shadow-md'>
        <div className='flex flex-col items-center'>
          <img src={Logo} alt='Logo ITC' className='w-[4.5rem]' />
          <p className='font-bold h1-sm sm:h1-md text-primary'>
            ITC Repository
          </p>
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default LayoutLogin;
