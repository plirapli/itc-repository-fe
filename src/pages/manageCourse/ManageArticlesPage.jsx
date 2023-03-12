import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { deleteArticle, getAllArticles } from '../../utils/article';
import { useTitle } from '../../hooks';

// Components
import { PlusIcon } from '@heroicons/react/20/solid';
import Button from '../../components/buttons/Button';
import { SearchBar } from '../../components/forms';
import { ModalDelete } from '../../components/modal';
import { ManageCourseCard } from '../../components/cards';
import OverlayLoading from '../../components/overlay/OverlayLoading';
import { getChapterById } from '../../utils/chapter';

const ManageArticlesPage = () => {
  const navigate = useNavigate();
  const { id_materi: course_id, id_bab: chapter_id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [chapterOverview, setChapterOverview] = useState({});
  const [articles, setArticles] = useState([]);
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [articleKeyword, setArticleKeyword] = useState('');
  const [selectedArticle, setSelectedArticle] = useState({});
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
  useTitle(chapterOverview?.title || 'Loading...', chapterOverview);

  const filterArticleByKeyword = (article) =>
    article.title.toLowerCase().includes(articleKeyword.toLowerCase());

  const openModalDelete = () => setIsModalDeleteOpen(true);
  const closeModalDelete = () => setIsModalDeleteOpen(false);

  const onClickDeleteHandler = (e, article) => {
    e.preventDefault();
    setSelectedArticle(article);
    openModalDelete();
  };
  const onClickEditHandler = (e, id) => {
    e.preventDefault();
    navigate(`${id}/edit/`);
  };

  const getAllArticleHandler = () => {
    getAllArticles(course_id, chapter_id)
      .then((data) => {
        setArticles(data);
        setFilteredArticles(data.filter(filterArticleByKeyword));
      })
      .catch(({ data }) => console.log(data.message))
      .finally(() => setIsLoading(false));
  };

  const deleteArticleHandler = () => {
    closeModalDelete(); // Close modal
    setIsLoading(true);

    deleteArticle(course_id, chapter_id, selectedArticle.id)
      .then(() => {
        setSelectedArticle({});
        getAllArticleHandler();
      })
      .catch(({ data }) => console.log(data.message));
  };

  useEffect(() => {
    getAllArticleHandler();
    getChapterById(course_id, chapter_id)
      .then(setChapterOverview)
      .catch(({ data, status }) => {
        console.log(data.message);
        if (status === 400) navigate('/not-found', { replace: true });
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setFilteredArticles(articles.filter(filterArticleByKeyword));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [articleKeyword, articles]);

  return (
    <>
      {/* Header */}
      <div className='flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2'>
        <div>
          <h1 className='text-xl'>{chapterOverview?.title}</h1>
          <p className='text-gray-dark text-sm'>{articles.length} Artikel</p>
        </div>
        <Link to='add/'>
          <Button variant='icon-right' size='small' icon={<PlusIcon />}>
            Tambah Artikel
          </Button>
        </Link>
      </div>

      {/* Search Bar */}
      <div className='mt-4 sm:mt-3'>
        <SearchBar
          placeholder='Cari artikel'
          value={articleKeyword}
          onChange={(e) => {
            setArticleKeyword(e.target.value);
          }}
        />
      </div>

      {/* Card List */}
      <section className='mt-4 flex flex-col gap-4'>
        {filteredArticles?.map(({ id, title }) => (
          <Link
            key={id}
            to={`/course/${course_id}/chapter/${chapter_id}/article/${id}`}
          >
            <ManageCourseCard
              type='artikel'
              onClickEdit={(e) => onClickEditHandler(e, id)}
              onClickDelete={(e) => onClickDeleteHandler(e, { id, title })}
            >
              <p>{title}</p>
            </ManageCourseCard>
          </Link>
        ))}
      </section>

      {/* Delete bab dialog (modal) */}
      <ModalDelete
        show={isModalDeleteOpen}
        onClose={closeModalDelete}
        onClickDelete={deleteArticleHandler}
        title='Hapus Artikel'
      >
        <p className='text-sm text-gray-500'>
          Apakah anda yakin ingin menghapus Artikel:
        </p>
        <p className='mt-1 font-bold text-base text-black'>
          {selectedArticle.title}
        </p>
      </ModalDelete>

      {/* Loading screen */}
      <OverlayLoading loadingState={isLoading} />
    </>
  );
};

export default ManageArticlesPage;
