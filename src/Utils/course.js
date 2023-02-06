import { authApi } from '../api/api';

const deleteCourse = async (id) =>
  authApi
    .delete(`/course/${id}`)
    .then((data) => data)
    .catch((err) => Promise.reject(err));

export { deleteCourse };
