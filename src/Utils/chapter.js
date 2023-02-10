import { authApi } from '../api/api';

const url = '/course';

const getChapterDetail = (id_course) =>
  authApi
    .get(`${url}/${id_course}/chapter/article`)
    .then(({ data }) => data.data)
    .catch(({ response }) => console.log(response));

const getChapterArticleLength = (id_course) =>
  authApi
    .get(`${url}/${id_course}/chapter/article`)
    .then(({ data }) => {
      let articleTotal = 0;
      const chapters = data.data;
      chapters.map(({ Articles }) => (articleTotal += Articles.length));

      return { chapters: chapters.length, articles: articleTotal };
    })
    .catch(({ response }) => console.log(response));

const addChapter = async (id_course, title) =>
  authApi
    .post(`${url}/${id_course}/chapter`, { title })
    .then((data) => data)
    .catch(({ response }) => Promise.reject(response));

const editChapter = async (id_course, id_chapter, title) =>
  authApi
    .put(`${url}/${id_course}/chapter/${id_chapter}`, { title })
    .then((data) => data)
    .catch(({ response }) => Promise.reject(response));

const deleteChapter = async (id_course, id_chapter) =>
  authApi
    .delete(`${url}/${id_course}/chapter/${id_chapter}`)
    .then((data) => data)
    .catch(({ response }) => Promise.reject(response));

export {
  getChapterDetail,
  getChapterArticleLength,
  addChapter,
  editChapter,
  deleteChapter,
};
