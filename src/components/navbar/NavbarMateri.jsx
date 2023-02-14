import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getChapterDetail } from '../../Utils/chapter';
import Button from '../buttons/Button';
import OverlayMateriList from '../overlay/OverlayMateriList';

const NavbarMateri = ({ courseID }) => {
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
    getChapterDetail(courseID)
      .then(setChapterArticle)
      .catch(({ data }) => console.log(data.message));
  }, []);

  return (
    <nav className='w-full bg-primary flex items-center justify-between p-1 sm:px-6 sm:py-3 relative'>
      <div onClick={backButtonHandler}>
        <Button
          variant='icon-left'
          color='transparent'
          icon={icon.backBtn}
          isResponsive
        >
          Kembali
        </Button>
      </div>
      <div className='flex'>
        <Link to={`/course/${courseID}/diskusi/`}>
          <Button
            variant='icon-left'
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

export default NavbarMateri;
