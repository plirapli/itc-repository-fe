import { authApi } from '../api/api';
import { getChapterArticleLength } from './chapter';
import { getAllUsers, getUserById } from './user';
import { formatDate, formatDateWithHour } from './dateConverter';

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

  // Get all user
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

// Get course by ID
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

// Add course
const addCourse = async (newCourse) =>
  authApi
    .post(url, newCourse, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    .then(({ data }) => data.message)
    .catch(({ response }) => Promise.reject(response));

// Delete course
const deleteCourse = async (id) =>
  authApi
    .delete(`${url}/${id}`)
    .then((data) => data)
    .catch(({ response }) => Promise.reject(response));

export {
  getAllCourses,
  getAllCoursesDetail,
  getCourseById,
  addCourse,
  deleteCourse,
};
