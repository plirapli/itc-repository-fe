import { useNavigate } from 'react-router-dom';
import { logoutHandler } from '../../Utils/auth';

const OverlayNavbar = ({ id_role = 1, setIsAuthed }) => {
  const navigate = useNavigate();
  const toDaftarMateri = () => navigate('/materi/');
  const toDaftarPengguna = () => navigate('/manage/user/');
  const logout = () => {
    logoutHandler();
    setIsAuthed(false);
    navigate('/login');
  };
  const listClassName =
    'px-4 py-2 text-sm transition-all cursor-pointer hover:bg-black hover:bg-opacity-10';

  return (
    <>
      <div className='min-w-[180px] absolute right-0 sm:right-2 transform translate-y-full bottom-0 p-2'>
        <div className='bg-white py-1 rounded shadow-md'>
          <div className={listClassName}>Profile</div>
          {id_role === 2 && (
            <>
              <div onClick={toDaftarPengguna} className={listClassName}>
                Daftar Pengguna
              </div>
              <div onClick={toDaftarMateri} className={listClassName}>
                Daftar Materi
              </div>
            </>
          )}

          {/* Pembatas */}
          <div className='px-4 py-1'>
            <div className='w-full h-[1px] bg-gray-light'></div>
          </div>
          {/* End Pembatas */}

          <div onClick={logout} className={`${listClassName} text-danger-main`}>
            Keluar
          </div>
        </div>
      </div>
    </>
  );
};

export default OverlayNavbar;
