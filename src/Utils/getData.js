import api from '../api/api';
import { showFormattedDate } from './dateConverter';

let getDivisi = () =>
  api
    .get('/division')
    .then((res) => res.data.data)
    .catch((err) => new Error(err.message));

let getCourses = (authToken) =>
  api
    .get('/course', { headers: { Authorization: `Bearer ${authToken}` } })
    .then(({ data }) => {
      return data.data.map((course) => {
        return {
          ...course,
          createdAt: showFormattedDate(course?.createdAt),
          updatedAt: showFormattedDate(course?.updatedAt),
        };
      });
    })
    .catch((err) => new Error(err.message));

let getUserDetail = async (id) => {
  try {
    const response = await api.get(`/user/${id}`);
    return response.data;
  } catch (error) {
    return error.message;
  }
};

export { getDivisi, getCourses, getUserDetail };
