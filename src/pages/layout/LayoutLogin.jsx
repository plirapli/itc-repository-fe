import React, { useEffect } from 'react';
import { Outlet, useOutletContext } from 'react-router-dom';
import { Logo } from '../../assets';

const LayoutLogin = () => {
  const navbar = useOutletContext();
  useEffect(() => {
    navbar();
  }, []);

  return (
    <div className='min-h-screen flex sm:justify-center sm:items-center'>
      <div className='w-full max-w-screen-sm p-10 pt-8 bg-white sm:rounded-xl sm:shadow-md'>
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
