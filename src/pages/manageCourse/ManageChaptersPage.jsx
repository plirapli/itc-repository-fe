import { Fragment, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  getAllChaptersDetail,
  addChapter,
  editChapter,
  deleteChapter,
} from '../../utils/chapter';
import { getCourseById } from '../../utils/course';
import { useTitle } from '../../hooks';

// Components
import { PlusIcon } from '@heroicons/react/20/solid';
import Button from '../../components/buttons/Button';
import { Input, SearchBar } from '../../components/forms';
import OverlayLoading from '../../components/overlay/OverlayLoading';
import { ManageCourseCard } from '../../components/cards';
import { ModalDelete, ModalForm } from '../../components/modal';
import { Dialog, Transition } from '@headlessui/react';

const ManageChaptersPage = () => {
  const navigate = useNavigate();
  const { id_materi } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [courseOverview, setCourseOverview] = useState({});
  const [selectedChapter, setSelectedChapter] = useState({});
  const [chapters, setChapters] = useState([]);
  const [filteredChapters, setFilteredChapters] = useState([]);
  const [chapterKeyword, setChapterKeyword] = useState('');
  const [newChapter, setNewChapter] = useState('');
  const [errMessage, setErrMessage] = useState('');

  // Modal
  const [isModalAddOpen, setIsModalAddOpen] = useState(false);
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
  const [isModalEditOpen, setIsModalEditOpen] = useState(false);
  useTitle(courseOverview?.title || 'Loading...', courseOverview);

  // Search handler
  const filterChapterByKeyword = (chapter) =>
    chapter.title.toLowerCase().includes(chapterKeyword.toLowerCase());

  // Modal handler
  const openModalAdd = () => setIsModalAddOpen(true);
  const openModalDelete = () => setIsModalDeleteOpen(true);
  const openModalEdit = () => setIsModalEditOpen(true);

  const closeModalAdd = () => {
    setIsModalAddOpen(false);
    setErrMessage('');
  };
  const closeModalDelete = () => setIsModalDeleteOpen(false);
  const closeModalEdit = () => {
    setIsModalEditOpen(false);
    setErrMessage('');
  };

  // CRUD handler
  const onClickEditHandler = (e, chapter) => {
    e.preventDefault();
    setSelectedChapter(chapter);
    openModalEdit();
  };
  const onClickDeleteHandler = (e, chapter) => {
    e.preventDefault();
    setSelectedChapter(chapter);
    openModalDelete();
  };

  const getChapterHandler = () =>
    getAllChaptersDetail(id_materi)
      .then((data) => {
        setChapters(data);
        setFilteredChapters(data.filter(filterChapterByKeyword));
      })
      .catch(({ data }) => console.log(data.message))
      .finally(() => setIsLoading(false));

  const addChapterHandler = (e) => {
    e.preventDefault();
    setIsLoading(true);

    addChapter(id_materi, newChapter)
      .then(() => {
        closeModalAdd(); // Close modal
        setNewChapter('');
        getChapterHandler();
      })
      .catch(({ data }) => {
        setErrMessage(data.message);
        setIsLoading(false);
      });
  };

  const editChapterHandler = (e) => {
    e.preventDefault();
    editChapter(id_materi, selectedChapter.id, selectedChapter.title)
      .then(() => {
        getChapterHandler(); // Get Chapter after edit
        closeModalEdit(); // Close modal
      })
      .catch(({ data }) => setErrMessage(data.message));
  };

  const deleteChapterHandler = () => {
    deleteChapter(id_materi, selectedChapter.id)
      .then(() => {
        setSelectedChapter({}); // Reset state
        getChapterHandler(); // Get chapter after delete
        closeModalDelete(); // Close modal
      })
      .catch(({ data }) => console.log(data.message));
  };

  useEffect(() => {
    setFilteredChapters(chapters.filter(filterChapterByKeyword));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chapterKeyword, chapters]);

  useEffect(() => {
    getChapterHandler();
    getCourseById(id_materi)
      .then(setCourseOverview)
      .catch(({ data, status }) => {
        console.log(data.message);
        if (status === 400) navigate('/not-found', { replace: true });
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div>
        {/* Header */}
        <div className='flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2'>
          <div>
            <h1 className='text-xl clamp'>{courseOverview?.title}</h1>
            <p className='text-gray-dark text-sm'>
              {courseOverview?.length?.chapters} Bab
              <span className='text-black'> | </span>
              {courseOverview?.length?.articles} Artikel
            </p>
          </div>
          <div className='min-w-max'>
            <Button
              onClick={openModalAdd}
              variant='icon-right'
              size='small'
              icon={<PlusIcon />}
            >
              Tambah Bab
            </Button>
          </div>
        </div>

        {/* Search Bar */}
        <div className='mt-4 sm:mt-3'>
          <SearchBar
            placeholder='Cari bab'
            value={chapterKeyword}
            onChange={(e) => {
              setChapterKeyword(e.target.value);
            }}
          />
        </div>

        {/* Card List */}
        <section className='mt-4 flex flex-col gap-4'>
          {filteredChapters?.map(({ id, title, ...chapter }) => (
            <Link key={id} to={`${id}`}>
              <ManageCourseCard
                type='bab'
                onClickEdit={(e) => onClickEditHandler(e, { id, title })}
                onClickDelete={(e) => onClickDeleteHandler(e, { id, title })}
              >
                <p>{title}</p>
                <p className='text-sm text-gray-dark'>
                  {chapter.Articles?.length} Artikel
                </p>
              </ManageCourseCard>
            </Link>
          ))}
        </section>
      </div>

      {/* Add bab dialog (modal) */}
      <Transition appear show={isModalAddOpen} as={Fragment}>
        <Dialog as='div' className='relative z-10' onClose={closeModalAdd}>
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
                    <form onSubmit={addChapterHandler} action=''>
                      <Input
                        onChange={(e) => setNewChapter(e.target.value)}
                        label='Judul'
                        value={newChapter}
                        color='secondary'
                        placeholder='Masukkan judul bab'
                        required
                      />
                      {errMessage && (
                        <span className='mt-1 text-danger-main text-sm'>
                          Error: {errMessage}
                        </span>
                      )}

                      <div className='mt-4 flex gap-2'>
                        <Button
                          type='button'
                          onClick={closeModalAdd}
                          color='gray'
                        >
                          Tutup
                        </Button>
                        <Button>Simpan</Button>
                      </div>
                    </form>
                  </div>
                </Dialog.Panel>
                {/* End Main Container */}
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

      {/* Edit bab dialog (modal) */}
      <ModalForm show={isModalEditOpen} title='Edit Bab'>
        <form onSubmit={editChapterHandler} action=''>
          <Input
            onChange={(e) =>
              setSelectedChapter((prev) => ({
                ...prev,
                title: e.target.value,
              }))
            }
            label='Judul'
            value={selectedChapter.title}
            color='secondary'
            placeholder='Masukkan judul bab'
            required
          />
          <div className='mt-4 flex gap-2'>
            <Button type='button' onClick={closeModalEdit} color='gray'>
              Tutup
            </Button>
            <Button onClick={closeModalEdit}>Simpan</Button>
          </div>
        </form>
      </ModalForm>

      {/* Delete bab dialog (modal) */}
      <ModalDelete
        show={isModalDeleteOpen}
        onClose={closeModalDelete}
        onClickDelete={deleteChapterHandler}
        title='Hapus Bab'
      >
        <p className='text-sm text-gray-500'>
          Apakah anda yakin ingin menghapus Bab:
        </p>
        <p className='mt-1 font-bold text-base text-black'>
          {selectedChapter.title}
        </p>
      </ModalDelete>

      {/* Loading screen */}
      <OverlayLoading loadingState={isLoading} />
    </>
  );
};

export default ManageChaptersPage;
