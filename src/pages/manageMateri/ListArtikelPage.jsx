import { Link, useNavigate } from 'react-router-dom';
import Button from '../../components/buttons/Button';
import { ListMateriCard } from '../../components/cards';
import SearchBar from '../../components/inputForm/SearchBar';

const ListArtikelPage = () => {
  const navigate = useNavigate();
  const navigateAddArtikel = () => navigate('add/');
  const artikelList = ['1', '2', '3', '4']; // Dummy

  return (
    <div>
      {/* Header */}
      <div className='flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2'>
        <div>
          <h1 className='h2-sm sm:h2-md'>[Judul Bab]</h1>
          <p className='text-gray-dark text-sm'>8 Artikel</p>
        </div>
        <Button
          onClick={navigateAddArtikel}
          type='iconRight'
          text='Tambah artikel'
          icon='akar-icons:plus'
        />
      </div>

      {/* Search Bar */}
      <div className='mt-4 sm:mt-3'>
        <SearchBar />
      </div>

      {/* Card List */}
      <section className='mt-4 flex flex-col gap-4'>
        {artikelList.map((artikel, i) => (
          <Link key={i} to={`${i}`}>
            <ListMateriCard type='artikel' />
          </Link>
        ))}
      </section>
    </div>
  );
};

export default ListArtikelPage;
