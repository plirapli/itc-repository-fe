import { useEffect, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import {
  deleteDiscussion,
  editDiscussion,
  getAllDiscussions,
} from '../../utils/discussions';
import Button from '../../components/buttons/Button';
import SearchBar from '../../components/forms/SearchBar';
import { ModalDelete, ModalForm } from '../../components/modal';
import DiscussionLists from '../../components/lists/DiscussionLists';
import { Input } from '../../components/forms';
import OverlayLoading from '../../components/overlay/OverlayLoading';
import { useTitle } from '../../hooks';

const DiscussionPage = ({ user }) => {
  const navigate = useNavigate();
  const { id_course } = useParams();
  const [discussions, setDiscussions] = useState([]);
  const [filteredDiscussions, setFilteredDiscussions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalEditOpen, setIsModalEditOpen] = useState(false);
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
  const [discussionTmp, setDiscussionTmp] = useState({});
  const [params, setParams] = useSearchParams();
  const [topicKeyword, setTopicKeyword] = useState(
    () => params.get('topic') || ''
  );

  const toAddDiskusiPage = () => navigate('add'); // Navigate ke halaman add diskusi
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

  useTitle('Diksusi');
  useEffect(() => {
    getAllDiscussionsHandler();
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

  return (
    <>
      <div className='w-full py-4 px-5 sm:py-6 sm:px-0'>
        {/* Header */}
        <div className='flex flex-col gap-3 sm:flex-row sm:justify-between sm:items-center'>
          <h1 className='text-2xl leading-none'>Diskusi</h1>
          <Button
            onClick={toAddDiskusiPage}
            variant='icon-right'
            size='small'
            icon='akar-icons:plus'
          >
            Buat Pertanyaan
          </Button>
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
          user={user}
          discussions={filteredDiscussions}
          onClickEdit={onClickEditDiscussionOpenModalHandler}
          onClickDelete={onClickDeleteDiscussionOpenModalHandler}
        />
      </div>

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
            <Button onClick={closeModalEdit} color='gray' size='small'>
              Tutup
            </Button>
            <Button type='submit' size='small'>
              Simpan
            </Button>
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
  );
};

export default DiscussionPage;
