import { Fragment, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// Components
import Button from '../../components/buttons/Button';
import SearchBar from '../../components/inputForm/SearchBar';
import { ListMateriCard } from '../../components/cards';
import { Dialog, Transition } from '@headlessui/react';
import { ModalDelete } from '../../components/modal';

const ListArtikelPage = () => {
  const navigate = useNavigate();
  const toAddArtikel = () => navigate('add/');
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);

  const openModalDelete = () => setIsModalDeleteOpen(true);
  const closeModalDelete = () => setIsModalDeleteOpen(false);

  const onClickDeleteHandler = (e) => {
    e.preventDefault();
    openModalDelete();
  };

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
          onClick={toAddArtikel}
          variant='icon-right'
          icon='akar-icons:plus'
        >
          Tambah Artikel
        </Button>
      </div>

      {/* Search Bar */}
      <div className='mt-4 sm:mt-3'>
        <SearchBar />
      </div>

      {/* Card List */}
      <section className='mt-4 flex flex-col gap-4'>
        {artikelList.map((artikel, i) => (
          <Link key={i} to={`${i}`}>
            <ListMateriCard
              type='artikel'
              onClickDelete={onClickDeleteHandler}
            />
          </Link>
        ))}
      </section>

      {/* Delete bab dialog (modal) */}
      <ModalDelete
        show={isModalDeleteOpen}
        onClose={closeModalDelete}
        onClickDelete={closeModalDelete}
        title='Hapus Materi'
      >
        <p className='text-sm text-gray-500'>
          Apakah anda yakin ingin menghapus Artikel:
        </p>
        <p className='mt-1 font-bold text-base text-black'>[Judul Artikel]?</p>
      </ModalDelete>
    </div>
  );
};

export default ListArtikelPage;
