import { Suspense, useEffect } from 'react';
import { Outlet, useOutletContext } from 'react-router-dom';
import NavbarBack from '../../components/navbar/NavbarBack';
import { useProfile } from '../../hooks';

const LayoutManage = ({ userData }) => {
  const { profile } = useProfile();
  const navbar = useOutletContext();

  useEffect(() => {
    navbar(<NavbarBack />);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profile]);

  return (
    <div className='w-full pt-4 px-5 pb-6 sm:pt-5 sm:px-0 sm:pb-8'>
      <Suspense fallback={<div>Loading...</div>}>
        <Outlet />
      </Suspense>
    </div>
  );
};

export default LayoutManage;
