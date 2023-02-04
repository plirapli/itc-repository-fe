import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';

// Components
import Button from '../../components/buttons/Button';
import Input from '../../components/inputForm/Input';
import SearchBar from '../../components/inputForm/SearchBar';
import { ListMateriCard } from '../../components/cards';

const ListBabPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const openModalDelete = () => setIsModalDeleteOpen(true);
  const closeModalDelete = () => setIsModalDeleteOpen(false);

  const onClickDeleteHandler = (e) => {
    e.preventDefault();
    openModalDelete();
  };

  const babList = ['1', '2', '3', '4']; // Dummy

  return (
    <>
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
          <Button
            onClick={openModal}
            type='iconRight'
            text='Tambah bab'
            icon='akar-icons:plus'
          />
        </div>

        {/* Search Bar */}
        <div className='mt-4 sm:mt-3'>
          <SearchBar />
        </div>

        {/* Card List */}
        <section className='mt-4 flex flex-col gap-4'>
          {babList.map((bab, i) => (
            <Link key={i} to={`${i}`}>
              <ListMateriCard
                type='bab'
                subtext='8 Artikel'
                onClickDelete={onClickDeleteHandler}
              />
            </Link>
          ))}
        </section>
      </div>

      {/* Add bab dialog (modal) */}
      <Transition appear show={isModalOpen} as={Fragment}>
        <Dialog as='div' className='relative z-10' onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <div className='fixed inset-0 bg-black bg-opacity-25' />
          </Transition.Child>
          <div className='fixed inset-0 overflow-y-auto'>
            <div className='flex min-h-full items-center justify-center p-4 text-center'>
              <Transition.Child
                as={Fragment}
                enter='ease-out duration-300'
                enterFrom='opacity-0 scale-95'
                enterTo='opacity-100 scale-100'
                leave='ease-in duration-200'
                leaveFrom='opacity-100 scale-100'
                leaveTo='opacity-0 scale-95'
              >
                {/* Main Container */}
                <Dialog.Panel className='w-full max-w-md transform overflow-hidden rounded-lg bg-white p-6 text-left align-middle shadow-xl transition-all'>
                  <Dialog.Title
                    as='h3'
                    className='text-lg font-medium leading-6 text-gray-900'
                  >
                    Tambah Bab
                  </Dialog.Title>

                  {/* Body */}
                  <div className='mt-2'>
                    <Input
                      label='Judul'
                      styleType='secondary'
                      placeholder='Masukkan judul bab'
                    />
                  </div>

                  <div className='mt-4 flex gap-2'>
                    <Button
                      onClick={closeModal}
                      type='textOnly'
                      text='Keluar'
                      styleType='gray'
                    />
                    <Button
                      onClick={closeModal}
                      type='textOnly'
                      text='Simpan'
                    />
                  </div>
                </Dialog.Panel>
                {/* End Main Container */}
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

      {/* Delete bab dialog (modal) */}
      <Transition appear show={isModalDeleteOpen} as={Fragment}>
        <Dialog as='div' className='relative z-10' onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <div className='fixed inset-0 bg-black bg-opacity-25' />
          </Transition.Child>
          <div className='fixed inset-0 overflow-y-auto'>
            <div className='flex min-h-full items-center justify-center p-4 text-center'>
              <Transition.Child
                as={Fragment}
                enter='ease-out duration-300'
                enterFrom='opacity-0 scale-95'
                enterTo='opacity-100 scale-100'
                leave='ease-in duration-200'
                leaveFrom='opacity-100 scale-100'
                leaveTo='opacity-0 scale-95'
              >
                {/* Main Container */}
                <Dialog.Panel className='w-full max-w-md transform overflow-hidden rounded-lg bg-white p-6 text-left align-middle shadow-xl transition-all'>
                  <Dialog.Title
                    as='h3'
                    className='text-lg font-medium leading-6 text-gray-900'
                  >
                    Hapus Bab
                  </Dialog.Title>

                  {/* Body */}
                  <div className='mt-2'>
                    <p className='text-sm text-gray-500'>
                      Apakah anda yakin ingin menghapus Bab [Judul Bab]?
                    </p>
                  </div>

                  <div className='mt-4 flex gap-2'>
                    <Button
                      onClick={closeModalDelete}
                      type='textOnly'
                      text='Keluar'
                      styleType='gray'
                    />
                    <Button
                      onClick={closeModalDelete}
                      type='textOnly'
                      text='Hapus'
                      styleType='danger'
                    />
                  </div>
                </Dialog.Panel>
                {/* End Main Container */}
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default ListBabPage;
