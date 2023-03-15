import { Suspense, useEffect, useState } from 'react';
import { Outlet, useOutletContext, useParams } from 'react-router-dom';
import NavbarCourse from '../../components/navbar/NavbarCourse';

const LayoutCourse = () => {
  const setNavbar = useOutletContext();
  const { id_course } = useParams();
  const [activeArticle, setActiveArticle] = useState();
  const setActiveArticleHandler = (id) => setActiveArticle(id);

  useEffect(() => {
    setNavbar(
      <NavbarCourse courseID={id_course} activeArticle={activeArticle} />
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeArticle]);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Outlet context={setActiveArticleHandler} />
    </Suspense>
  );
};

export default LayoutCourse;
