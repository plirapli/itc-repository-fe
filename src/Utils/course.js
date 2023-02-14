import { authApi } from '../api/api';
import { getChapterArticleLength } from './chapter';
import { formatDate, formatDateWithHour } from './dateConverter';
import { getAllUsersDetail } from './user';

const url = '/course';

// Get all courses
const getAllCourses = async () => {
  return authApi
    .get(url)
    .then(({ data }) => {
      const courses = data.data.map(async (course) => {
        const length = await getChapterArticleLength(course.id);
        return { ...course, length };
      });
      return Promise.all(courses).then((data) => data);
    })
    .catch(({ response }) => Promise.reject(response));
};

// Get all courses with detail
const getAllCoursesDetail = async () => {
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
          createdAt: formatDate(course?.createdAt),
          updatedAt: formatDate(course?.updatedAt),
        };
      });
    })
    .catch(({ response }) => Promise.reject(response));
};

const getCourseById = async (id) => {
  return authApi
    .get(`${url}/${id}`)
    .then(async ({ data }) => {
      let { id_user, ...course } = data.data;
      const { data: user } = await getAllUsersDetail(id_user);
      const { fullName } = await user;
      const length = await getChapterArticleLength(id);

      return {
        ...course,
        user: await fullName,
        length,
        createdAt: formatDate(course.createdAt),
        updatedAt: formatDateWithHour(course.updatedAt),
      };
    })
    .catch(({ response }) => Promise.reject(response));
};

const deleteCourse = async (id) =>
  authApi
    .delete(`${url}/${id}`)
    .then((data) => data)
    .catch(({ response }) => Promise.reject(response));

export { getAllCourses, getAllCoursesDetail, getCourseById, deleteCourse };
