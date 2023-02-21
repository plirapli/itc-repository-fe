import { Fragment, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAllCourses, deleteCourse, editCourse } from '../../utils/course';

// Component
import { Dialog, Transition } from '@headlessui/react';
import Button from '../../components/buttons/Button';
import { Input, SearchBar, Select } from '../../components/forms/';
import { ManageCourseCard } from '../../components/cards';
import { ModalDelete } from '../../components/modal';
import Tags from '../../components/tags/Tags';
import OverlayLoading from '../../components/overlay/OverlayLoading';

const ManageCoursesPage = ({ divisi }) => {
  const navigate = useNavigate();
  const toAddMateri = () => navigate('add/');
  const [isLoading, setIsLoading] = useState(true);
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState({});
  const [isModalEditOpen, setIsModalEditOpen] = useState(false);
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);

  const closeModalEdit = () => setIsModalEditOpen(false);
  const closeModalDelete = () => setIsModalDeleteOpen(false);

  const onClickDetailHandler = (e, id) => {
    e.preventDefault();
    navigate(`/course/${id}`);
  };
  const onClickEditHandler = (e, course) => {
    e.preventDefault();
    setSelectedCourse({ ...course });
    setIsModalEditOpen(true);
  };
  const onClickDeleteHandler = (e, course) => {
    e.preventDefault();
    setSelectedCourse({ ...course });
    setIsModalDeleteOpen(true);
  };

  const getCourseHandler = () =>
    getAllCourses()
      .then(setCourses)
      .catch(({ data }) => console.log(data.message))
      .finally(() => setIsLoading(false));

  const editCourseHandler = (e) => {
    e.preventDefault();
    setIsLoading(true);
    console.log(selectedCourse.image);

    const { id, title, description, id_division } = selectedCourse;
    const data = new FormData();
    data.append('title', title);
    data.append('description', description);
    data.append('id_division', id_division);
    if (selectedCourse.image) data.append('image', selectedCourse.image);

    editCourse(id, data)
      .then(() => {
        setSelectedCourse({}); // Reset state
        closeModalEdit(); // Close modal
        getCourseHandler();
      })
      .catch(({ data }) => console.log(data.message))
      .finally(() => setIsLoading(false));
  };

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
      <section className='mt-4 flex flex-col gap-3'>
        {courses.map((course) => (
          <Link key={course?.id} to={`${course?.id}`}>
            <ManageCourseCard
              onClickDetail={(e) => onClickDetailHandler(e, course?.id)}
              onClickEdit={(e) => onClickEditHandler(e, course)}
              onClickDelete={(e) =>
                onClickDeleteHandler(e, {
                  id: course?.id,
                  title: course?.title,
                })
              }
            >
              <div className='flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-3'>
                <img
                  src={course?.image_thumbnail}
                  className='h-48 sm:w-24 sm:h-[3.875rem] object-cover rounded'
                  alt='thumbnail'
                />
                <div>
                  <p>{course?.title}</p>
                  <p className='text-sm text-gray-dark'>
                    {course?.length?.chapters} Bab | {course?.length?.articles}{' '}
                    Artikel
                  </p>
                  <div className='w-max mt-1.5'>
                    <Tags divName={course?.Division?.divisionName} />
                  </div>
                </div>
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
                    Edit Materi
                  </Dialog.Title>

                  {/* Body */}
                  <div className='mt-2'>
                    <form
                      onSubmit={editCourseHandler}
                      method='POST'
                      encType='multipart/form-data'
                    >
                      <div className='grid gap-2'>
                        {/* Thumbnail */}
                        <div>
                          <label
                            htmlFor='thumbnail'
                            className='block text-sm font-medium'
                          >
                            Thumbnail
                          </label>
                          <input
                            onChange={(e) =>
                              setSelectedCourse((prev) => ({
                                ...prev,
                                image: e.target.files[0],
                              }))
                            }
                            type='file'
                            id='thumbnail'
                            name='thumbnail'
                            accept='image/*'
                            className='mt-1'
                          />
                        </div>

                        {/* Judul */}
                        <div>
                          <Input
                            onChange={(e) =>
                              setSelectedCourse((prev) => ({
                                ...prev,
                                title: e.target.value,
                              }))
                            }
                            label='Judul'
                            value={selectedCourse?.title}
                            color='secondary'
                            placeholder='Masukkan judul materi'
                            required
                          />
                        </div>

                        {/* Divisi */}
                        <div>
                          <Select
                            onChange={(e) =>
                              setSelectedCourse((prev) => ({
                                ...prev,
                                id_division: e.target.value,
                              }))
                            }
                            value={selectedCourse?.id_division}
                            label='Divisi'
                            color='secondary'
                          >
                            {divisi.map(({ id, divisionName }) => (
                              <option className='bg-white' key={id} value={id}>
                                {divisionName}
                              </option>
                            ))}
                          </Select>
                        </div>

                        {/* Deskripsi */}
                        <div>
                          <label
                            htmlFor='about'
                            className='block text-sm font-medium'
                          >
                            Deskripsi
                          </label>
                          <div className='mt-1'>
                            <textarea
                              onChange={(e) =>
                                setSelectedCourse((prev) => ({
                                  ...prev,
                                  description: e.target.value,
                                }))
                              }
                              id='about'
                              name='about'
                              value={selectedCourse?.description}
                              rows={5}
                              className='input-secondary mt-1 block w-full rounded-md shadow-sm focus-primary sm:text-sm resize-none'
                              placeholder='Deskripsi materi'
                              required
                            />
                          </div>
                          <p className='mt-1 text-xs text-gray-500'>
                            Deskripsi singkat mengenai materi
                          </p>
                        </div>
                      </div>

                      <div className='mt-4 flex gap-2'>
                        <Button onClick={closeModalEdit} color='gray'>
                          Tutup
                        </Button>
                        <Button type='submit'>Simpan</Button>
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
      <OverlayLoading loadingState={isLoading} />
    </>
  );
};

export default ManageCoursesPage;
