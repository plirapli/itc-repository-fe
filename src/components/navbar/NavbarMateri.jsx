import { Link, useNavigate } from 'react-router-dom';
import Button from '../buttons/Button';

const NavbarMateri = ({ courseID }) => {
  const navigate = useNavigate();
  const icon = {
    backBtn: 'eva:arrow-back-fill',
    diskusi: 'fluent:comment-multiple-24-regular',
    listMateri: 'ant-design:unordered-list-outlined',
  };
  const backButtonHandler = () => navigate(-1);

  return (
    <nav className='w-full bg-primary flex items-center justify-between p-1 sm:px-6 sm:py-3 relative'>
      <div onClick={backButtonHandler}>
        <Button
          type='iconLeft'
          styleType='transparent'
          text='Kembali'
          icon={icon.backBtn}
          isResponsive={true}
          textClassName='hidden sm:block'
        />
      </div>
      <div className='flex'>
        <Link to={`/course/${courseID}/diskusi/`}>
          <Button
            type='iconLeft'
            styleType='transparent'
            text='Diskusi'
            icon={icon.diskusi}
            isResponsive={true}
            textClassName='hidden sm:block'
          />
        </Link>
        <Button
          type='iconLeft'
          styleType='transparent'
          text='Daftar Materi'
          icon={icon.listMateri}
          isResponsive={true}
          textClassName='hidden sm:block'
        />
      </div>
    </nav>
  );
};

export default NavbarMateri;
