import { Suspense, useEffect, useState } from 'react';
import {
  Outlet,
  useNavigate,
  useOutletContext,
  useParams,
} from 'react-router-dom';
import NavbarCourse from '../../components/navbar/NavbarCourse';
import { getCourseOverview } from '../../utils/course';

const LayoutCourse = () => {
  const navigate = useNavigate();
  const setNavbar = useOutletContext();
  const { id_course } = useParams();
  const [course, setCourse] = useState({});
  const [materiList, setMateriList] = useState([]);
  const [activeArticle, setActiveArticle] = useState();
  const [isInit, setIsinit] = useState(true);
  const setActiveArticleHandler = (id) => setActiveArticle(id);

  useEffect(() => {
    getCourseOverview(id_course)
      .then((data) => {
        setCourse({ ...data });
        setMateriList([...data.chapterArticles.chapters]);
      })
      .catch((error) => {
        navigate('/not-found', { replace: true });
        console.log(error);
      })
      .finally(() => setIsinit(false));
  }, [id_course]);

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
      <Outlet context={[course, isInit, setActiveArticleHandler]} />
    </Suspense>
  );
};

export default LayoutCourse;
