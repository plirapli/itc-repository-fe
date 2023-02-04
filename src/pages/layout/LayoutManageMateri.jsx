import { useEffect } from 'react';
import { Outlet, useOutletContext } from 'react-router-dom';
import NavbarBack from '../../components/navbar/NavbarBack';

const LayoutManageMateri = (props) => {
  const navbar = useOutletContext();

  useEffect(() => {
    navbar(<NavbarBack user={props.userData} />);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.userData]);

  return (
    <div className='w-full pt-4 px-5 pb-6 sm:pt-5 sm:px-0 sm:pb-8'>
      <Outlet />
    </div>
  );
};

export default LayoutManageMateri;
