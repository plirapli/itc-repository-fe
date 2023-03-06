import { useEffect, useState } from 'react';
import { useOutletContext, useParams } from 'react-router-dom';
import parse from 'html-react-parser';
import { getArticleByID } from '../../utils/article';
import { useTitle } from '../../hooks';

const ArticlePage = () => {
  const setActiveArticle = useOutletContext();
  const { id_course, id_chapter, id_article } = useParams();
  const [article, setArticle] = useState({});

  useTitle(article?.title || 'Loading...', article);

  useEffect(() => {
    getArticleByID(id_course, id_chapter, id_article)
      .then((data) => {
        const body = parse(data.body);
        setArticle({ ...data, body });
      })
      .catch(({ data }) => console.log(data.message));
  }, [id_article, id_chapter, id_course]);

  useEffect(() => {
    setActiveArticle(id_article);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id_article]);

  return (
    <div className='p-4 bg-white min-h-full flex flex-col'>
      <h1 className='text-xl mb-2.5'>{article?.title}</h1>
      <hr />

      <div className='flex-1'>
        <div className='unreset'>{article?.body}</div>
      </div>

      <hr />
      <div className='mt-3 text-xs text-gray-dark'>
        <p>Dibuat pada: {article.createdAt}</p>
        <p>Diperbarui pada: {article.updatedAt}</p>
      </div>
    </div>
  );
};

export default ArticlePage;
