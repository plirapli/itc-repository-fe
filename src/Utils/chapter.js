import { authApi } from '../api/api';

const url = '/course';

const getChapterDetail = (id_course) =>
  authApi
    .get(`${url}/${id_course}/chapter/article`)
    .then(({ data }) => data.data)
    .catch((err) => console.err(err));

const addChapter = async (id_course, title) =>
  authApi
    .post(`${url}/${id_course}/chapter`, { title })
    .then((data) => data)
    .catch(({ response }) => Promise.reject(response));

const deleteChapter = async (id_course, id_chapter) =>
  authApi
    .delete(`${url}/${id_course}/chapter/${id_chapter}`)
    .then((data) => data)
    .catch(({ response }) => Promise.reject(response));

export { getChapterDetail, addChapter, deleteChapter };
