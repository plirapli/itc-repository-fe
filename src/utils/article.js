import { authApi } from '../api/api';
import { formatDateWithHour } from './dateConverter';

const getAllArticles = async (courseID, chapterID) =>
  authApi
    .get(`/courses/${courseID}/chapters/${chapterID}/articles`)
    .then(({ data }) => data.data)
    .catch(({ response }) => Promise.reject(response));

const getArticleByID = async (courseID, chapterID, articleID) =>
  authApi
    .get(`/courses/${courseID}/chapters/${chapterID}/articles/${articleID}`)
    .then(({ data }) => {
      const { data: article } = data;
      return {
        ...article,
        createdAt: formatDateWithHour(article.createdAt),
        updatedAt: formatDateWithHour(article.updatedAt),
      };
    })
    .catch(({ response }) => Promise.reject(response));

const deleteArticle = async (courseID, chapterID, articleID) =>
  authApi
    .delete(`/courses/${courseID}/chapters/${chapterID}/articles/${articleID}`)
    .then(({ data }) => data.message)
    .catch(({ response }) => Promise.reject(response));

export { getAllArticles, getArticleByID, deleteArticle };
