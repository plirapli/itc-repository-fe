import { useEffect } from 'react';
import { Outlet, useOutletContext } from 'react-router-dom';
import Navbar from '../../components/navbar/Navbar';

const LayoutNavbar = ({ userData }) => {
  const setNavbar = useOutletContext();

  useEffect(() => {
    setNavbar(<Navbar user={userData} />);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData]);

  return (
    <div className='w-full pt-4 px-5 pb-6 sm:pt-5 sm:px-0 sm:pb-8'>
      <Outlet />
    </div>
  );
};

export default LayoutNavbar;
