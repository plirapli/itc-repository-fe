import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import parse from 'html-react-parser';
import { getArticleByID } from '../../utils/article';

const ArticlePage = () => {
  const { id_course, id_chapter, id_article } = useParams();
  const [article, setArticle] = useState({});

  useEffect(() => {
    getArticleByID(id_course, id_chapter, id_article)
      .then((data) => {
        const body = parse(data.body);
        setArticle({ ...data, body });
      })
      .catch(({ data }) => console.log(data.message));
  }, [id_article, id_chapter, id_course]);

  return (
    <div className='p-4 bg-white min-h-full flex flex-col'>
      <h1 className='text-xl mb-2'>{article?.title}</h1>
      <hr />
      <div className='my-2 flex-1'>{article?.body}</div>
      <hr />
      <div className='text-xs text-gray-dark mt-2'>
        <p>Dibuat pada: {article.createdAt}</p>
        <p>Diperbarui pada: {article.updatedAt}</p>
      </div>
    </div>
  );
};

export default ArticlePage;
