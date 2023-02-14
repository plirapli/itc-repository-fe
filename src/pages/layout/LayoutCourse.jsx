import { useEffect } from 'react';
import { Outlet, useOutletContext, useParams } from 'react-router-dom';
import NavbarCourse from '../../components/navbar/NavbarCourse';

const LayoutCourse = () => {
  const setNavbar = useOutletContext();
  const { id_course } = useParams();

  useEffect(() => {
    setNavbar(<NavbarCourse courseID={id_course} />);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id_course]);

  return <Outlet />;
};

export default LayoutCourse;
