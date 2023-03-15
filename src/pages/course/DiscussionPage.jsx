import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  deleteDiscussion,
  editDiscussion,
  getAllDiscussions,
} from '../../utils/discussions';
import { useTitle } from '../../hooks';

// Components
import { PlusIcon } from '@heroicons/react/20/solid';
import Button from '../../components/buttons/Button';
import { Input, SearchBar } from '../../components/forms';
import { ModalDelete, ModalForm } from '../../components/modal';
import OverlayLoading from '../../components/overlay/OverlayLoading';
import DiscussionLists from '../../components/lists/DiscussionLists';
import { getCourseById } from '../../utils/course';

const DiscussionPage = () => {
  const navigate = useNavigate();
  const { id_course } = useParams();
  const [discussions, setDiscussions] = useState([]);
  const [filteredDiscussions, setFilteredDiscussions] = useState([]);
  const [topicKeyword, setTopicKeyword] = useState('');
  const [discussionTmp, setDiscussionTmp] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isFound, setIsFound] = useState(false);
  const [isModalEditOpen, setIsModalEditOpen] = useState(false);
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
  const [courseOverview, setCourseOverview] = useState({});
  useTitle(courseOverview?.title || 'Loading...', courseOverview);

  const closeModalDelete = () => setIsModalDeleteOpen(false); // Tutup overlay (modal) delete
  const closeModalEdit = () => setIsModalEditOpen(false); // Tutup overlay (modal) edit

  const filterDiscussionsHandler = (discussion) =>
    discussion.title.toLowerCase().includes(topicKeyword.toLowerCase()) ||
    discussion.body.toLowerCase().includes(topicKeyword.toLowerCase());

  // Handler buat menu edit diskusi
  const onClickEditDiscussionOpenModalHandler = (e, discussion) => {
    e.preventDefault();
    setDiscussionTmp(discussion);
    setIsModalEditOpen(true);
  };

  const onClickEditDiscussionHandler = (e) => {
    e.preventDefault();
    setIsLoading(true);
    editDiscussion(id_course, discussionTmp.id, discussionTmp)
      .then(() => {
        setDiscussionTmp({});
        getAllDiscussionsHandler();
        setIsModalEditOpen(false);
      })
      .catch(({ data }) => console.log(data.message))
      .finally(() => {
        setIsLoading(false);
      });
  };

  const onClickDeleteDiscussionOpenModalHandler = (e, discussion) => {
    e.preventDefault();
    setDiscussionTmp(discussion);
    setIsModalDeleteOpen(true);
  };

  const onClickDeleteDiscussionHandler = (e) => {
    e.preventDefault();
    setIsLoading(true);
    deleteDiscussion(id_course, discussionTmp.id)
      .then(() => {
        setDiscussionTmp({});
        getAllDiscussionsHandler();
        setIsModalDeleteOpen(false);
      })
      .catch(({ data }) => console.log(data.message))
      .finally(() => setIsLoading(false));
  };

  // Handler buat ngambil semua data diskusi
  const getAllDiscussionsHandler = () => {
    getAllDiscussions(id_course)
      .then(setDiscussions)
      .catch(({ data }) => console.log(data.message))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    getCourseById(id_course)
      .then(setCourseOverview)
      .catch(({ data, status }) => {
        console.log(data.message);
        if (status === 400) navigate('/not-found', { replace: true });
      });

    getAllDiscussions(id_course)
      .then((data) => {
        setDiscussions(data);
        setIsFound(true);
      })
      .catch(({ data }) => {
        console.log(data.message);
        setIsFound(false);
      })
      .finally(() => setIsLoading(false));
  }, [id_course]);

  useEffect(() => {
    setFilteredDiscussions(discussions.filter(filterDiscussionsHandler));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [topicKeyword, discussions]);

  if (!isLoading) {
    return (
      <div className='w-full py-4 px-5 sm:py-6 sm:px-0'>
        {isFound && (
          <>
            {/* Header */}
            <div className='flex flex-col gap-3 sm:flex-row sm:justify-between sm:items-center'>
              <div>
                <h1 className='text-2xl'>Diskusi</h1>
                <p className='text-sm text-gray-dark'>
                  {courseOverview?.title}
                </p>
              </div>
              <Link to='add'>
                <Button variant='icon-right' size='small' icon={<PlusIcon />}>
                  Buat Pertanyaan
                </Button>
              </Link>
            </div>
            <div className='w-full mt-3'>
              <SearchBar
                placeholder='Cari Pertanyaan'
                value={topicKeyword}
                onChange={(e) => setTopicKeyword(e.target.value)}
              />
            </div>

            {/* List Diskusi */}
            <DiscussionLists
              topicKeyword={topicKeyword}
              discussions={filteredDiscussions}
              onClickEdit={onClickEditDiscussionOpenModalHandler}
              onClickDelete={onClickDeleteDiscussionOpenModalHandler}
            />

            {/* Edit dialog (modal) */}
            <ModalForm show={isModalEditOpen} title='Edit Pertanyaan'>
              {/* Ini ditambahin handler onSubmit buat edit */}
              <form onSubmit={onClickEditDiscussionHandler}>
                {/* Judul */}
                <div>
                  <Input
                    onChange={(e) =>
                      setDiscussionTmp((prev) => ({
                        ...prev,
                        title: e.target.value,
                      }))
                    }
                    label='Judul'
                    value={discussionTmp.title}
                    color='secondary'
                    placeholder='Masukkan judul pertanyaan'
                    required
                  />
                </div>

                {/* Deskripsi */}
                <div className='mt-2'>
                  <label htmlFor='body' className='block text-sm font-medium'>
                    Pertanyaan
                  </label>
                  <textarea
                    onChange={(e) =>
                      setDiscussionTmp((prev) => ({
                        ...prev,
                        body: e.target.value,
                      }))
                    }
                    id='body'
                    name='body'
                    value={discussionTmp.body}
                    rows={5}
                    className='input-secondary mt-1 block w-full rounded-md shadow-sm focus-primary sm:text-sm resize-none'
                    placeholder='Deskripsi materi'
                    required
                  />
                </div>

                <div className='mt-4 flex gap-2'>
                  <Button
                    type='button'
                    onClick={closeModalEdit}
                    color='gray'
                    size='small'
                  >
                    Tutup
                  </Button>
                  <Button size='small'>Simpan</Button>
                </div>
              </form>
            </ModalForm>

            {/* Delete dialog (modal) */}
            <ModalDelete
              show={isModalDeleteOpen}
              onClose={closeModalDelete}
              onClickDelete={onClickDeleteDiscussionHandler}
              title='Hapus Pertanyaan'
            >
              <p className='text-sm text-gray-500'>
                Apakah anda yakin ingin menghapus pertanyaan ini?
              </p>
            </ModalDelete>

            <OverlayLoading loadingState={isLoading} />
          </>
        )}

        {!isFound && <>Materi tidak ditemukan.</>}
      </div>
    );
  } else return <OverlayLoading loadingState={isLoading} />;
};

export default DiscussionPage;
