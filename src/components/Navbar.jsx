import React from 'react';

const Navbar = () => {
  return (
    <nav className='w-full bg-primary flex items-center justify-between px-4 py-2.5 sm:pl-8 sm:pr-5 sm:py-2'>
      <h2 className='text-accent h2-sm sm:h2-sm'>ITC Repository</h2>
      <div className='flex gap-4 items-center sm:py-1'>
        <div className='hidden sm:block'>
          <p className='font-medium text-white'>Muhammad Rafli</p>
          <p className='text-xs text-accent'>Public Relation</p>
        </div>
        <img
          className='w-8 h-8 sm:w-11 sm:h-11 border bg-cover'
          src=''
          alt=''
        />
      </div>
    </nav>
  );
};

export default Navbar;
