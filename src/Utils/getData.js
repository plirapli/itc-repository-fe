import { api, authApi } from '../api/api';
import { showFormattedDate } from './dateConverter';

// Get all divisions
const getDivisi = () =>
  api
    .get('/division')
    .then((res) => res.data.data)
    .catch((err) => Promise.reject(err));

// Get all courses
const getCourses = async () => {
  const controller = new AbortController();

  return authApi
    .get('/course', { signal: controller.signal })
    .then(({ data }) => {
      return data.data.map((course) => {
        return {
          ...course,
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

export { getDivisi, getCourses, getUserDetail };
