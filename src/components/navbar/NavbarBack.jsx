import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Ava } from '../../assets';
import Button from '../buttons/Button';
import OverlayNavbar from './OverlayNavbar';

const NavbarBack = ({ user, setIsAuthed }) => {
  const navigate = useNavigate();
  const { fullName, division, photoProfile } = user;
  const [hover, setHover] = useState(false);
  const toBack = () => navigate(-1);

  return (
    <nav className='w-full bg-primary flex items-center justify-between pl-1 sm:pl-6 relative'>
      <Button
        onClick={toBack}
        variant='icon-left'
        color='transparent'
        icon='eva:arrow-back-fill'
        isResponsive
      >
        Kembali
      </Button>

      <div
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        className='flex gap-4 items-center px-4 py-2 sm:pr-5 sm:py-2.5
          transition-all hover:bg-black hover:bg-opacity-20'
      >
        {/* User info */}
        <div className='hidden sm:block'>
          <p className='font-medium text-white'>{fullName || 'Loading...'}</p>
          <p className='text-xs text-accent'>{division || 'Loading...'}</p>
        </div>

        {/* Profile img */}
        <img
          className='w-8 h-8 sm:w-11 sm:h-11 border rounded bg-cover overflow-hidden'
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

export default NavbarBack;
