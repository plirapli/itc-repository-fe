import { useEffect, useState } from 'react';
import { Outlet, useOutletContext, useParams } from 'react-router-dom';
import NavbarMateri from '../../components/navbar/NavbarMateri';

const LayoutMateri = () => {
  const navbar = useOutletContext();
  const { id } = useParams();

  useEffect(() => {
    navbar(<NavbarMateri courseID={id} />);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <Outlet />;
};

export default LayoutMateri;
