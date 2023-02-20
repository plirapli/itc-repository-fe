import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getAllDiscussions } from '../../utils/discussions';
import Button from '../../components/buttons/Button';
import SearchBar from '../../components/forms/SearchBar';
import { ModalDelete } from '../../components/modal';
import DiscussionLists from '../../components/lists/DiscussionLists';

const DiscussionPage = () => {
  const navigate = useNavigate();
  const { id_course } = useParams();
  const [discussions, setDiscussions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);

  const toAddDiskusiPage = () => navigate('add');
  const closeModalDelete = () => setIsModalDeleteOpen(false);

  const onClickEditHandler = (e) => {
    e.preventDefault();
  };
  const onClickDeleteHandler = (e) => {
    e.preventDefault();
    setIsModalDeleteOpen(true);
  };

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
          discussions={discussions}
          onClickEdit={onClickEditHandler}
          onClickDelete={onClickDeleteHandler}
        />
      </div>

      {/* Delete bab dialog (modal) */}
      <ModalDelete
        show={isModalDeleteOpen}
        onClose={closeModalDelete}
        onClickDelete={closeModalDelete}
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
