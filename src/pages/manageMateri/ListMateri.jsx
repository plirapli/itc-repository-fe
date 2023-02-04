import { Fragment, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Dialog, Transition } from '@headlessui/react';

// Component
import Input from '../../components/inputForm/Input';
import Button from '../../components/buttons/Button';
import SearchBar from '../../components/inputForm/SearchBar';
import { ListMateriCard } from '../../components/cards';

const ListMateri = () => {
  const navigate = useNavigate();
  const toAddMateri = () => navigate('add/');
  const [isModalEditOpen, setIsModalEditOpen] = useState(false);
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);

  const openModalEdit = () => setIsModalEditOpen(true);
  const closeModalEdit = () => setIsModalEditOpen(false);
  const openModalDelete = () => setIsModalDeleteOpen(true);
  const closeModalDelete = () => setIsModalDeleteOpen(false);

  const onClickDetailHandler = (e, id) => {
    e.preventDefault();
    navigate(`/course/${id}`);
  };
  const onClickEditHandler = (e) => {
    e.preventDefault();
    openModalEdit();
  };
  const onClickDeleteHandler = (e) => {
    e.preventDefault();
    openModalDelete();
  };

  const materiList = ['1', '2', '3', '4']; // Dummy

  return (
    <>
      {/* Header */}
      <div className='flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2'>
        <div>
          <h1 className='h2-sm sm:h2-md'>Daftar Materi</h1>
          <p className='text-gray-dark text-sm'>4 Materi</p>
        </div>
        <Button
          onClick={toAddMateri}
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
      <section className='mt-4 flex flex-col gap-4'>
        {materiList.map((materi, i) => (
          <Link key={i} to={`${i}`}>
            <ListMateriCard
              type='materi'
              onClickDetail={(e) => onClickDetailHandler(e, i)}
              onClickEdit={onClickEditHandler}
              onClickDelete={onClickDeleteHandler}
            />
          </Link>
        ))}
      </section>

      {/* Edit bab dialog (modal) */}
      <Transition appear show={isModalEditOpen} as={Fragment}>
        <Dialog as='div' className='relative z-10' onClose={closeModalEdit}>
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
                    Edit Nama Materi
                  </Dialog.Title>

                  {/* Body */}
                  <div className='mt-2'>
                    <Input
                      label='Judul'
                      value='Lorem ipsum dolor sit amet'
                      placeholder='Masukkan judul materi'
                      styleType='secondary'
                    />
                  </div>

                  <div className='mt-4 flex gap-2'>
                    <Button
                      onClick={closeModalEdit}
                      type='textOnly'
                      text='Tutup'
                      styleType='gray'
                    />
                    <Button
                      onClick={closeModalEdit}
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
        <Dialog as='div' className='relative z-10' onClose={closeModalDelete}>
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
                    Hapus Materi
                  </Dialog.Title>

                  {/* Body */}
                  <div className='mt-3'>
                    <p className='text-sm text-gray-500'>
                      Apakah anda yakin ingin menghapus Materi:
                    </p>
                    <p className='mt-1 font-bold text-base text-black'>
                      [Judul Bab]?
                    </p>
                  </div>

                  <div className='mt-4 flex gap-2'>
                    <Button
                      onClick={closeModalDelete}
                      type='textOnly'
                      text='Tutup'
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

export default ListMateri;
