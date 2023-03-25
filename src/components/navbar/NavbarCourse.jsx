import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLongLeftIcon,
  ChatBubbleBottomCenterTextIcon,
  ListBulletIcon,
} from '@heroicons/react/20/solid';
import Button from '../buttons/Button';
import OverlayMateriList from '../overlay/OverlayMateriList';

const NavbarCourse = ({
  courseID,
  chapterArticles,
  activeArticle,
  backBtn,
}) => {
  const [isClicked, setIsClicked] = useState(false);
  const icon = {
    backBtn: <ArrowLongLeftIcon />,
    diskusi: <ChatBubbleBottomCenterTextIcon />,
    listMateri: <ListBulletIcon />,
  };
  const setIsClickedHandler = () => setIsClicked((prev) => !prev);

  return (
    <nav className='w-full bg-primary flex items-center justify-between p-[5px] sm:px-6 sm:py-2.5 relative'>
      <Link to={backBtn}>
        <Button
          variant='icon-left'
          color='transparent'
          size='small'
          icon={icon.backBtn}
          isResponsive
        >
          Kembali
        </Button>
      </Link>
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
          materiList={chapterArticles}
          setIsClicked={setIsClickedHandler}
          active={activeArticle}
        />
      )}
    </nav>
  );
};

export default NavbarCourse;
