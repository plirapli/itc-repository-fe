import { useState } from 'react';
import { Ava } from '../../assets';
import OverlayNavbar from './OverlayNavbar';

const Navbar = ({ user, setIsAuthed }) => {
  const { fullName, division, photoProfile } = user;
  const [hover, setHover] = useState(false);

  return (
    <nav className='w-full bg-primary flex items-center justify-between pl-4 sm:pl-8 relative'>
      <h2 className='text-accent h2-sm sm:h2-md'>ITC Repository</h2>

      <div
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        className='flex gap-2.5 sm:gap-4 items-center px-4 py-2 sm:pr-5 sm:py-2.5
          transition-all hover:bg-black hover:bg-opacity-20'
      >
        {/* User info */}
        <div>
          <p className='text-sm font-medium text-white'>
            {fullName || 'Loading...'}
          </p>
          <p className='hidden sm:block text-xs text-accent'>
            {division || 'Loading...'}
          </p>
        </div>

        {/* Profile img */}
        <img
          className='w-8 h-8 sm:w-11 sm:h-11 border-2 rounded bg-cover overflow-hidden'
          src={photoProfile || Ava}
          alt='Profile'
        />
        {hover && (
          <OverlayNavbar id_role={user?.id_role} setIsAuthed={setIsAuthed} />
        )}
      </div>
    </nav>
  );
};

export default Navbar;
