import { authApi } from '../api/api';
import { showFormattedDateDetail } from './dateConverter';

const getAllArticle = async (courseID, chapterID) =>
  authApi
    .get(`/course/${courseID}/chapter/${chapterID}/article`)
    .then(({ data }) => data.data)
    .catch(({ response }) => Promise.reject(response));

const getArticleByID = async (courseID, chapterID, articleID) =>
  authApi
    .get(`/course/${courseID}/chapter/${chapterID}/article/${articleID}`)
    .then(({ data }) => {
      const { data: article } = data;
      return {
        ...article,
        createdAt: showFormattedDateDetail(article.createdAt),
        updatedAt: showFormattedDateDetail(article.updatedAt),
      };
    })
    .catch(({ response }) => Promise.reject(response));

const deleteArticle = async (courseID, chapterID, articleID) =>
  authApi
    .delete(`/course/${courseID}/chapter/${chapterID}/article/${articleID}`)
    .then(({ data }) => data.message)
    .catch(({ response }) => Promise.reject(response));

export { getAllArticle, getArticleByID, deleteArticle };
