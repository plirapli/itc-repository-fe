import { authApi } from '../api/api';
import { getChapterArticleLength } from './chapter';
import { formatDate, formatDateWithHour } from './dateConverter';
import { getAllUsers, getUserById } from './user';

const url = '/courses';

// Get all courses
const getAllCourses = async () => {
  return authApi
    .get(url)
    .then(async ({ data }) => {
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
  const users = await getAllUsers();

  return authApi
    .get(url, { signal: controller.signal })
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
    .catch((err) => Promise.reject(err));
};

const getCourseById = async (id) => {
  return authApi
    .get(`${url}/${id}`)
    .then(async ({ data }) => {
      let { id_user, ...course } = data.data;
      const { fullName } = await getUserById(id_user);
      const length = await getChapterArticleLength(id);

      return {
        ...course,
        user: await fullName,
        length,
        createdAt: formatDate(course.createdAt),
        updatedAt: formatDateWithHour(course.updatedAt),
      };
    })
    .catch((err) => Promise.reject(err));
};

const deleteCourse = async (id) =>
  authApi
    .delete(`${url}/${id}`)
    .then((data) => data)
    .catch(({ response }) => Promise.reject(response));

export { getAllCourses, getAllCoursesDetail, getCourseById, deleteCourse };
