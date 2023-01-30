import { useEffect } from 'react';
import { Outlet, useOutletContext } from 'react-router-dom';
import NavbarMateri from '../../components/navbar/NavbarMateri';

const LayoutMateri = () => {
  const navbar = useOutletContext();
  useEffect(() => {
    navbar(<NavbarMateri courseID={1} />);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <Outlet />;
};

export default LayoutMateri;
