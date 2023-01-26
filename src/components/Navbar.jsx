import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ user }) => {
  const [hover, setHover] = useState(false);

  return (
    <nav className='w-full bg-primary flex items-center justify-between pl-4 sm:pl-8 relative'>
      <h2 className='text-accent h2-sm sm:h2-md'>ITC Repository</h2>

      <div
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        className='flex gap-4 items-center px-4 py-3.5 sm:pr-5 sm:py-3 
          transition-all hover:bg-black hover:bg-opacity-20'
      >
        <div className='hidden sm:block'>
          <p className='font-medium text-white'>
            {user ? user?.username : 'Loading...'}
          </p>
          <p className='text-xs text-accent'>
            {user ? user?.division : 'Loading...'}
          </p>
        </div>
        <img
          className='w-8 h-8 sm:w-11 sm:h-11 border bg-cover'
          src=''
          alt=''
        />
        {hover && <OverlayMenu id_role={user?.id_role} />}
      </div>
    </nav>
  );
};

const OverlayMenu = ({ id_role = 1 }) => {
  return (
    <>
      <div className='min-w-[180px] absolute right-0 sm:right-2 transform translate-y-full bottom-0 p-2'>
        <div className='bg-white py-1 rounded shadow-md'>
          <div className='px-4 py-2 transition-all hover:bg-black hover:bg-opacity-10'>
            Profile
          </div>
          {id_role === 2 && (
            <div className='px-4 py-2 transition-all hover:bg-black hover:bg-opacity-10'>
              Daftar Materi
            </div>
          )}
          <div className='px-4 py-1'>
            <div className='w-full h-[1px] bg-gray-light'></div>
          </div>
          <Link to={'login'}>
            <div className='px-4 py-2 transition-all text-danger-main hover:bg-black hover:bg-opacity-10'>
              Keluar
            </div>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Navbar;
