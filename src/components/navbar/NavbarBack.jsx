import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { logoutHandler } from '../../Utils/auth';
import Button from '../buttons/Button';

const NavbarBack = ({ user }) => {
  const navigate = useNavigate();
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
          <p className='font-medium text-white'>
            {user ? user?.username : 'Loading...'}
          </p>
          <p className='text-xs text-accent'>
            {user ? user?.division : 'Loading...'}
          </p>
        </div>

        {/* Profile img */}
        <img
          className='w-8 h-8 sm:w-11 sm:h-11 border rounded bg-cover overflow-hidden'
          src=''
          alt=''
        />
        {hover && <OverlayMenu id_role={user?.id_role} />}
      </div>
    </nav>
  );
};

const OverlayMenu = ({ id_role = 1 }) => {
  const navigate = useNavigate();
  const daftarMateri = () => navigate('/materi/');
  const logout = () => {
    logoutHandler();
    navigate('/login');
  };
  const listClassName =
    'px-4 py-2 transition-all cursor-pointer hover:bg-black hover:bg-opacity-10';

  return (
    <>
      <div className='min-w-[180px] absolute right-0 sm:right-2 transform translate-y-full bottom-0 p-2'>
        <div className='bg-white py-1 rounded shadow-md'>
          <div className={listClassName}>Profile</div>
          {id_role === 2 && (
            <div onClick={daftarMateri} className={listClassName}>
              Daftar Materi
            </div>
          )}
          <div className='px-4 py-1'>
            <div className='w-full h-[1px] bg-gray-light'></div>
          </div>
          <div onClick={logout} className={`${listClassName} text-danger-main`}>
            Keluar
          </div>
        </div>
      </div>
    </>
  );
};

export default NavbarBack;
