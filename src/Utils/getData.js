import { api, authApi } from '../api/api';
import { showFormattedDate } from './dateConverter';

// Get all divisions
const getDivisi = () =>
  api
    .get('/division')
    .then(({ data }) => data.data)
    .catch((err) => Promise.reject(err));

// Get all courses detail
const getCoursesDetail = async () => {
  const controller = new AbortController();

  // Get All User
  const { data } = await authApi.get('/user');
  const users = data.data;

  return authApi
    .get('/course', { signal: controller.signal })
    .then(({ data }) => {
      return data.data.map(({ id_user, ...course }) => {
        const { fullName } = users.filter(({ id }) => id === id_user)[0];
        return {
          ...course,
          user: fullName,
          createdAt: showFormattedDate(course?.createdAt),
          updatedAt: showFormattedDate(course?.updatedAt),
        };
      });
    })
    .catch((err) => Promise.reject(err));
};

// Get user detail
const getUserDetail = async (id) =>
  authApi
    .get(`/user/${id}`)
    .then(({ data }) => data)
    .catch((err) => Promise.reject(err));

export { getDivisi, getCoursesDetail, getUserDetail };
