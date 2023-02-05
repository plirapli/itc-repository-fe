import React from 'react';
import { Outlet } from 'react-router-dom';
import { Logo } from '../../assets';

const LayoutLogin = () => {
  return (
    <div className='min-h-screen sm:p-6 flex sm:justify-center sm:items-center'>
      <div className='w-full max-w-screen-sm p-10 pt-8 bg-white sm:rounded-xl sm:shadow-md'>
        <div className='flex flex-col items-center'>
          <img src={Logo} alt='Logo ITC' className='w-[4.5rem]' />
          <p className='font-bold text-2xl text-primary sm:mt-2 sm:text-[1.75rem]'>
            ITC Repository
          </p>
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default LayoutLogin;
