import { Link } from 'react-router-dom';
import Button from '../../components/buttons/Button';
import { ListMateriCard } from '../../components/cards';
import SearchBar from '../../components/inputForm/SearchBar';

const ListBabPage = () => {
  const babList = ['1', '2', '3', '4']; // Dummy

  return (
    <div>
      {/* Header */}
      <div className='flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2'>
        <div>
          <h1 className='h2-sm sm:h2-md'>[Judul Materi]</h1>
          <p className='text-gray-dark text-sm'>
            4 Bab
            <span className='text-black'> | </span>
            34 Artikel
          </p>
        </div>
        <Button type='iconRight' text='Tambah bab' icon='akar-icons:plus' />
      </div>

      {/* Search Bar */}
      <div className='mt-4 sm:mt-3'>
        <SearchBar />
      </div>

      {/* Card List */}
      <section className='mt-4 flex flex-col gap-4'>
        {babList.map((bab, i) => (
          <Link key={i} to={`${i}`}>
            <ListMateriCard type='bab' subtext='8 Artikel' />
          </Link>
        ))}
      </section>
    </div>
  );
};

export default ListBabPage;
