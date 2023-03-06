import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAllChaptersDetail } from '../../utils/chapter';
import {
  ArrowLongLeftIcon,
  ChatBubbleBottomCenterTextIcon,
  ListBulletIcon,
} from '@heroicons/react/20/solid';
import ButtonMin from '../buttons/ButtonMin';
import OverlayMateriList from '../overlay/OverlayMateriList';

const NavbarCourse = ({ courseID, activeArticle }) => {
  const navigate = useNavigate();
  const [isClicked, setIsClicked] = useState(false);
  const [chapterArticle, setChapterArticle] = useState([]);
  const icon = {
    backBtn: <ArrowLongLeftIcon />,
    diskusi: <ChatBubbleBottomCenterTextIcon />,
    listMateri: <ListBulletIcon />,
  };
  const backButtonHandler = () => navigate(-1);
  const setIsClickedHandler = () => setIsClicked((prev) => !prev);

  useEffect(() => {
    getAllChaptersDetail(courseID)
      .then(setChapterArticle)
      .catch(({ data }) => console.log(data.message));
  }, []);

  return (
    <nav className="w-full bg-primary flex items-center justify-between p-[5px] sm:px-6 sm:py-2.5 relative">
      <div onClick={backButtonHandler}>
        <ButtonMin
          variant="icon-left"
          color="transparent"
          size="small"
          icon={icon.backBtn}
          isResponsive
        >
          Kembali
        </ButtonMin>
      </div>
      <div className="flex">
        <Link to={`/course/${courseID}/discussion/`}>
          <ButtonMin
            variant="icon-left"
            size="small"
            color="transparent"
            icon={icon.diskusi}
            isResponsive
          >
            Diskusi
          </ButtonMin>
        </Link>
        <ButtonMin
          onClick={setIsClickedHandler}
          variant="icon-left"
          size="small"
          color="transparent"
          icon={icon.listMateri}
          isResponsive
        >
          Daftar Materi
        </ButtonMin>
      </div>

      {isClicked && (
        <OverlayMateriList
          courseID={courseID}
          materiList={chapterArticle}
          setIsClicked={setIsClickedHandler}
          active={activeArticle}
        />
      )}
    </nav>
  );
};

export default NavbarCourse;
