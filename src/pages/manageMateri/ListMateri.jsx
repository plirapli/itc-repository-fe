import { useNavigate } from 'react-router-dom';
import Button from '../../components/buttons/Button';
import SearchBar from '../../components/inputForm/SearchBar';

const ListMateri = () => {
  const navigate = useNavigate();
  const navigateAddMateri = () => navigate('add/');
  const materiList = ['1', '2', '3', '4']; // Dummy

  return (
    <div>
      {/* Header */}
      <div className='flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2'>
        <div>
          <h1 className='h2-sm sm:h2-md'>Daftar Materi</h1>
          <p className='text-gray-dark'>4 Materi</p>
        </div>
        <Button
          onClick={navigateAddMateri}
          type='iconRight'
          text='Tambah materi'
          icon='akar-icons:plus'
        />
      </div>

      {/* Search Bar */}
      <div className='mt-4 sm:mt-3'>
        <SearchBar />
      </div>

      {/* Card List */}
      <section className='mt-4'></section>
    </div>
  );
};

export default ListMateri;
