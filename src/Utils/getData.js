import { api, authApi } from '../api/api';
import { showFormattedDate } from './dateConverter';

// Get all divisions
const getDivisi = () =>
  api
    .get('/division')
    .then(({ data }) => data.data)
    .catch((err) => Promise.reject(err));

// Get all courses
const getCourses = async () => {
  const controller = new AbortController();
  return authApi
    .get('/course', { signal: controller.signal })
    .then(({ data }) => data.data.map((course) => course))
    .catch((err) => Promise.reject(err));
};

// Get all courses detail
const getCoursesDetail = async () => {
  const controller = new AbortController();
  return authApi
    .get('/course', { signal: controller.signal })
    .then(async ({ data }) => {
      const courses = data.data.map(async ({ id_user, ...course }) => {
        return getUserDetail(id_user)
          .then(({ data }) => {
            const { fullName } = data;
            return {
              ...course,
              user: fullName,
              createdAt: showFormattedDate(course?.createdAt),
              updatedAt: showFormattedDate(course?.updatedAt),
            };
          })
          .then((p) => p);
      });
      return Promise.all(courses).then((data) => data);
    })
    .catch((err) => Promise.reject(err));
};

// Get user detail
const getUserDetail = async (id) =>
  authApi
    .get(`/user/${id}`)
    .then(({ data }) => data)
    .catch((err) => Promise.reject(err));

export { getDivisi, getCourses, getCoursesDetail, getUserDetail };
