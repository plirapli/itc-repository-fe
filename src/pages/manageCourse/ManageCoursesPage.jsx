import { Fragment, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAllCourses, deleteCourse } from '../../utils/course';

// Component
import { Dialog, Transition } from '@headlessui/react';
import Button from '../../components/buttons/Button';
import { Input, SearchBar } from '../../components/forms/';
import { ManageCourseCard } from '../../components/cards';
import { ModalDelete } from '../../components/modal';
import Tags from '../../components/tags/Tags';
import OverlayLoading from '../../components/overlay/OverlayLoading';

const ManageCoursesPage = () => {
  const navigate = useNavigate();
  const toAddMateri = () => navigate('add/');
  const [isLoading, setIsLoading] = useState(true);
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState({});
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
  const onClickDeleteHandler = (e, course) => {
    e.preventDefault();
    setSelectedCourse(course);
    openModalDelete();
  };

  const getCourseHandler = () =>
    getAllCourses()
      .then(setCourses)
      .catch(({ data }) => console.log(data.message))
      .finally(() => setIsLoading(false));

  const deleteCourseHandler = () => {
    closeModalDelete(); // Close modal
    setIsLoading(true); // Loading

    deleteCourse(selectedCourse.id)
      .then(() => setSelectedCourse({}))
      .catch(({ data }) => console.log(data.message))
      .finally(() => getCourseHandler());
  };

  useEffect(() => {
    getCourseHandler();
  }, []);

  return (
    <>
      {/* Header */}
      <div className='flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2'>
        <div>
          <h1 className='text-xl'>Daftar Materi</h1>
          <p className='text-gray-dark text-sm'>{courses.length} Materi</p>
        </div>
        <Button
          onClick={toAddMateri}
          variant='icon-right'
          size='small'
          icon='akar-icons:plus'
        >
          Tambah Materi
        </Button>
      </div>

      {/* Search Bar */}
      <div className='mt-4 sm:mt-3'>
        <SearchBar placeholder='Cari Materi' />
      </div>

      {/* Card List */}
      <section className='mt-4 flex flex-col gap-4'>
        {courses.map(({ id, title, ...course }) => (
          <Link key={id} to={`${id}`}>
            <ManageCourseCard
              onClickDetail={(e) => onClickDetailHandler(e, id)}
              onClickEdit={onClickEditHandler}
              onClickDelete={(e) => onClickDeleteHandler(e, { id, title })}
            >
              <p>{title}</p>
              <p className='text-sm text-gray-dark'>
                {course.length.chapters} Bab | {course.length.articles} Artikel
              </p>
              <div className='w-max mt-1.5'>
                <Tags id={course.id_division} />
              </div>
            </ManageCourseCard>
          </Link>
        ))}
      </section>

      {/* Edit dialog (modal) */}
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
                      color='secondary'
                      placeholder='Masukkan judul materi'
                    />
                  </div>

                  <div className='mt-4 flex gap-2'>
                    <Button onClick={closeModalEdit} color='gray'>
                      Tutup
                    </Button>
                    <Button onClick={closeModalEdit}>Simpan</Button>
                  </div>
                </Dialog.Panel>
                {/* End Main Container */}
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

      {/* Delete dialog (modal) */}
      <ModalDelete
        show={isModalDeleteOpen}
        onClose={closeModalDelete}
        onClickDelete={deleteCourseHandler}
        title='Hapus Materi'
      >
        <p className='text-sm text-gray-500'>
          Apakah anda yakin ingin menghapus Materi:
        </p>
        <p className='mt-1 font-bold text-base text-black'>
          {selectedCourse.title}
        </p>
      </ModalDelete>

      {/* Loading screen */}
      <OverlayLoading
        loadingState={isLoading}
        onClose={() => setIsLoading(true)}
      />
    </>
  );
};

export default ManageCoursesPage;
