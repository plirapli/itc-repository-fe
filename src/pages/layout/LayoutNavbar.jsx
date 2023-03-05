import { useEffect } from 'react';
import { Outlet, useOutletContext } from 'react-router-dom';
import Navbar from '../../components/navbar/Navbar';
import { useProfile } from '../../hooks';

const LayoutNavbar = () => {
  const setNavbar = useOutletContext();
  const { profile } = useProfile();

  useEffect(() => {
    setNavbar(<Navbar />);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profile]);

  return (
    <div className='w-full pt-4 px-5 pb-6 sm:pt-5 sm:px-0 sm:pb-8'>
      <Outlet />
    </div>
  );
};

export default LayoutNavbar;
