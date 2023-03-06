import { authApi } from '../api/api';
import { formatDateWithHour } from './dateConverter';

const url = (courseID, chapterID) =>
  `/courses/${courseID}/chapters/${chapterID}`;

const getAllArticles = async (courseID, chapterID) =>
  authApi
    .get(`${url(courseID, chapterID)}/articles`)
    .then(({ data }) => data.data)
    .catch(({ response }) => Promise.reject(response));

const getArticleByID = async (courseID, chapterID, articleID) =>
  authApi
    .get(`${url(courseID, chapterID)}/articles/${articleID}`)
    .then(({ data }) => {
      const { data: article } = data;
      return {
        ...article,
        createdAt: formatDateWithHour(article.createdAt),
        updatedAt: formatDateWithHour(article.updatedAt),
      };
    })
    .catch(({ response }) => Promise.reject(response));

const addArticle = async (courseID, chapterID, newArticle) =>
  authApi
    .post(`${url(courseID, chapterID)}/articles`, newArticle)
    .then(({ data }) => data.message)
    .catch(({ response }) => Promise.reject(response));

const addImageArticle = async (courseID, chapterID, newImage) =>
  authApi
    .post(`${url(courseID, chapterID)}/articles/image`, newImage, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    .then(({ data }) => data)
    .catch(({ response }) => Promise.reject(response));

const editArticle = async (courseID, chapterID, articleID, newArticle) =>
  authApi
    .put(`${url(courseID, chapterID)}/articles/${articleID}`, newArticle)
    .then(({ data }) => data.message)
    .catch(({ response }) => Promise.reject(response));

const deleteArticle = async (courseID, chapterID, articleID) =>
  authApi
    .delete(`${url(courseID, chapterID)}/articles/${articleID}`)
    .then(({ data }) => data.message)
    .catch(({ response }) => Promise.reject(response));

export {
  getAllArticles,
  getArticleByID,
  addArticle,
  addImageArticle,
  editArticle,
  deleteArticle,
};
