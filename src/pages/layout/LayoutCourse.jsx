import { Suspense, useEffect, useState } from 'react';
import { Outlet, useOutletContext, useParams } from 'react-router-dom';
import NavbarCourse from '../../components/navbar/NavbarCourse';
import { getCourseOverview } from '../../utils/course';

const LayoutCourse = () => {
  const setNavbar = useOutletContext();
  const { id_course } = useParams();
  const [course, setCourse] = useState({});
  const [materiList, setMateriList] = useState([]);
  const [activeArticle, setActiveArticle] = useState();
  const [isFound, setIsFound] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const setActiveArticleHandler = (id) => setActiveArticle(id);

  useEffect(() => {
    getCourseOverview(id_course)
      .then((data) => {
        setCourse({ ...data });
        setMateriList([...data.chapterArticles.chapters]);
        setIsFound(true);
      })
      .catch((error) => console.log(error))
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    setNavbar(
      <NavbarCourse
        courseID={id_course}
        chapterArticles={materiList}
        activeArticle={activeArticle}
      />
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [materiList, activeArticle]);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Outlet context={[course, isFound, isLoading, setActiveArticleHandler]} />
    </Suspense>
  );
};

export default LayoutCourse;
