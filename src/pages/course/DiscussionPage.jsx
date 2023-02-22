import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
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

const DiscussionPage = ({ user }) => {
  const navigate = useNavigate();
  const { id_course } = useParams();
  const [discussions, setDiscussions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalEditOpen, setIsModalEditOpen] = useState(false);
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
  const [discussionTmp, setDiscussionTmp] = useState({});

  const toAddDiskusiPage = () => navigate('add'); // Navigate ke halaman add diskusi
  const closeModalDelete = () => setIsModalDeleteOpen(false); // Tutup overlay (modal) delete
  const closeModalEdit = () => setIsModalEditOpen(false); // Tutup overlay (modal) edit

  // Handler buat menu edit diskusi
  const onClickEditDiscussionOpenModalHandler = (e, discussion) => {
    e.preventDefault();
    setDiscussionTmp(discussion);
    setIsModalEditOpen(true);
  };

  const onClickEditDiscussionHandler = (e) => {
    e.preventDefault();
    editDiscussion(id_course, discussionTmp.id, discussionTmp)
      .then(() => {
        getAllDiscussions(id_course)
          .then(setDiscussions)
          .catch(({ data }) => console.log(data.message))
          .finally(() => setIsLoading(false));
      })
      .catch(({ data }) => console.log(data.message))
      .finally(() => {
        setIsModalEditOpen(false);
      });
  };

  const onClickDeleteDiscussionOpenModalHandler = (e, discussion) => {
    e.preventDefault();
    setDiscussionTmp(discussion);
    setIsModalDeleteOpen(true);
  };

  const onClickDeleteDiscussionHandler = (e) => {
    e.preventDefault();
    deleteDiscussion(id_course, discussionTmp.id)
      .then(() => {
        getAllDiscussions(id_course)
          .then(setDiscussions)
          .catch(({ data }) => console.log(data.message))
          .finally(() => setIsLoading(false));
      })
      .catch(({ data }) => console.log(data.message))
      .finally(() => setIsLoading(false));
    setIsModalDeleteOpen(false);
  };

  // Handler buat ngambil semua data diskusi
  const getAllDiscussionsHandler = () => {
    getAllDiscussions(id_course)
      .then(setDiscussions)
      .catch(({ data }) => console.log(data.message))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    getAllDiscussionsHandler();
  }, []);

  if (isLoading) return null;

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
          <SearchBar placeholder='Cari Pertanyaan' />
        </div>

        {/* List Diskusi */}
        <DiscussionLists
          user={user}
          discussions={discussions}
          onClickEdit={onClickEditDiscussionOpenModalHandler}
          onClickDelete={onClickDeleteDiscussionOpenModalHandler}
        />
      </div>

      {/* Edit dialog (modal) */}
      <ModalForm show={isModalEditOpen} title='Edit Pertanyaan'>
        {/* Ini ditambahin handler onSubmit buat edit */}
        <form>
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
            <Button
              size='small'
              onClick={(e) => {
                onClickEditDiscussionHandler(e);
              }}
            >
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
    </>
  );
};

export default DiscussionPage;
