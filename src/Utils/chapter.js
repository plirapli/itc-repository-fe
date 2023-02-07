import { authApi } from '../api/api';

const addChapter = async (id, title) =>
  authApi
    .post(`/course/${id}/chapter`, { title })
    .then((data) => data)
    .catch(({ response }) => Promise.reject(response));

export { addChapter };
