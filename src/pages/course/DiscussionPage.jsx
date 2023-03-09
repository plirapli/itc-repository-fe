import { useEffect, useState } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import {
  deleteDiscussion,
  editDiscussion,
  getAllDiscussions,
} from '../../utils/discussions';
import { useTitle } from '../../hooks';

// Components
import { PlusIcon } from '@heroicons/react/20/solid';
import ButtonMin from '../../components/buttons/ButtonMin';
import { Input, SearchBar } from '../../components/forms';
import { ModalDelete, ModalForm } from '../../components/modal';
import OverlayLoading from '../../components/overlay/OverlayLoading';
import DiscussionLists from '../../components/lists/DiscussionLists';

const DiscussionPage = () => {
  const { id_course } = useParams();
  const [discussions, setDiscussions] = useState([]);
  const [filteredDiscussions, setFilteredDiscussions] = useState([]);
  const [isModalEditOpen, setIsModalEditOpen] = useState(false);
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
  const [discussionTmp, setDiscussionTmp] = useState({});
  const [params, setParams] = useSearchParams();
  const [topicKeyword, setTopicKeyword] = useState(
    () => params.get('topic') || ''
  );
  const [isLoading, setIsLoading] = useState(true);
  const [isFound, setIsFound] = useState(false);
  useTitle('Diksusi');

  const closeModalDelete = () => setIsModalDeleteOpen(false); // Tutup overlay (modal) delete
  const closeModalEdit = () => setIsModalEditOpen(false); // Tutup overlay (modal) edit

  const changeTopicParams = (topic) => {
    params.set('topic', topic);
    setParams(params);
  };

  const deleteTopicParams = (topic) => {
    const value = params.get('topic');

    if (value === '') {
      params.delete('topic');
      setParams(params);
    }
  };

  const onTopicsChange = (keyword) => {
    setTopicKeyword(keyword);
    changeTopicParams(keyword);
    deleteTopicParams();
  };

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

  console.log(id_course);
  useEffect(() => {
    getAllDiscussions(id_course)
      .then((data) => {
        setDiscussions([...data]);
        setIsFound(true);
      })
      .catch(({ data }) => {
        console.log(data.message);
        setIsFound(false);
      })
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    if (topicKeyword === '') {
      setFilteredDiscussions(discussions);
    } else {
      const filtered = discussions.filter(
        (discussion) =>
          discussion.title.toLowerCase().includes(topicKeyword.toLowerCase()) ||
          discussion.body.toLowerCase().includes(topicKeyword.toLowerCase())
      );
      setFilteredDiscussions(filtered);
    }
  }, [topicKeyword, discussions]);

  if (!isLoading) {
    return (
      <div className='w-full py-4 px-5 sm:py-6 sm:px-0'>
        {isFound && (
          <>
            {/* Header */}
            <div className='flex flex-col gap-3 sm:flex-row sm:justify-between sm:items-center'>
              <h1 className='text-2xl leading-none'>Diskusi</h1>
              <Link to='add'>
                <ButtonMin
                  variant='icon-right'
                  size='small'
                  icon={<PlusIcon />}
                >
                  Buat Pertanyaan
                </ButtonMin>
              </Link>
            </div>
            <div className='w-full mt-3'>
              <SearchBar
                placeholder='Cari Pertanyaan'
                value={topicKeyword}
                onChange={(e) => onTopicsChange(e.target.value)}
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
                  <ButtonMin
                    type='button'
                    onClick={closeModalEdit}
                    color='gray'
                    size='small'
                  >
                    Tutup
                  </ButtonMin>
                  <ButtonMin size='small'>Simpan</ButtonMin>
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
