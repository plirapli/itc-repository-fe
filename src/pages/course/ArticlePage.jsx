import { useEffect, useState } from 'react';
import { Link, useOutletContext, useParams } from 'react-router-dom';
import parse from 'html-react-parser';
import { getArticleByID } from '../../utils/article';
import { useTitle } from '../../hooks';
import ButtonMin from '../../components/buttons/ButtonMin';
import { OverlayLoading } from '../../components/overlay';

const ArticlePage = () => {
  const setActiveArticle = useOutletContext();
  const { id_course, id_chapter, id_article } = useParams();
  const [article, setArticle] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isArticleExist, setIsArticleExist] = useState(false);
  useTitle(article?.title || 'Artikel', article);

  useEffect(() => {
    getArticleByID(id_course, id_chapter, id_article)
      .then((data) => {
        const content = parse(data.content);
        setArticle({ ...data, content });
        setIsArticleExist(true);
      })
      .catch(({ data }) => {
        console.log(data.message);
        setIsArticleExist(false);
      })
      .finally(() => setIsLoading(false));
  }, [id_article, id_chapter, id_course]);

  useEffect(() => {
    setActiveArticle(id_article);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id_article]);

  if (isLoading) return <OverlayLoading loadingState={isLoading} />;
  else {
    if (!isArticleExist)
      return (
        <div className='p-4 bg-white min-w-full min-h-full flex  items-center'>
          <div className='p-4 bg-white min-h-full min-w-full flex flex-col items-center gap-1.5'>
            Artikel tidak ditemukan
            <Link to={`../`}>
              <ButtonMin variant='text-only'>
                Kembali ke halaman overview kelas
              </ButtonMin>
            </Link>
            <p>
              Atau hubungi <b>curriculum@itcupnyk.com</b>
            </p>
          </div>
        </div>
      );

    return (
      <div className='p-4 bg-white min-h-full flex flex-col'>
        <h1 className='text-xl mb-2.5'>{article?.title}</h1>
        <hr />

        <div className='flex-1'>
          <div className='unreset'>{article?.content}</div>
        </div>

        <hr />
        <div className='mt-3 text-xs text-gray-dark'>
          <p>Dibuat pada: {article.createdAt}</p>
          <p>Diperbarui pada: {article.updatedAt}</p>
        </div>
      </div>
    );
  }
};

export default ArticlePage;
