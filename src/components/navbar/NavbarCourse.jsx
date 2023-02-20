import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAllChaptersDetail } from '../../utils/chapter';
import Button from '../buttons/Button';
import OverlayMateriList from '../overlay/OverlayMateriList';

const NavbarCourse = ({ courseID }) => {
  const navigate = useNavigate();
  const [isClicked, setIsClicked] = useState(false);
  const [chapterArticle, setChapterArticle] = useState([]);
  const icon = {
    backBtn: 'eva:arrow-back-fill',
    diskusi: 'fluent:comment-multiple-24-regular',
    listMateri: 'ant-design:unordered-list-outlined',
  };
  const backButtonHandler = () => navigate(-1);
  const setIsClickedHandler = () => setIsClicked((prev) => !prev);

  useEffect(() => {
    getAllChaptersDetail(courseID)
      .then(setChapterArticle)
      .catch(({ data }) => console.log(data.message));
  }, []);

  return (
    <nav className='w-full bg-primary flex items-center justify-between p-[5px] sm:px-6 sm:py-2.5 relative'>
      <div onClick={backButtonHandler}>
        <Button
          variant='icon-left'
          color='transparent'
          size='small'
          icon={icon.backBtn}
          isResponsive
        >
          Kembali
        </Button>
      </div>
      <div className='flex'>
        <Link to={`/course/${courseID}/discussion/`}>
          <Button
            variant='icon-left'
            size='small'
            color='transparent'
            icon={icon.diskusi}
            isResponsive
          >
            Diskusi
          </Button>
        </Link>
        <Button
          onClick={setIsClickedHandler}
          variant='icon-left'
          size='small'
          color='transparent'
          icon={icon.listMateri}
          isResponsive
        >
          Daftar Materi
        </Button>
      </div>

      {isClicked && (
        <OverlayMateriList
          courseID={courseID}
          materiList={chapterArticle}
          setIsClicked={setIsClickedHandler}
        />
      )}
    </nav>
  );
};

export default NavbarCourse;
