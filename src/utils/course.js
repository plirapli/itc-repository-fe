import { authApi } from '../api/api';
import { getChapterArticleLength } from './chapter';
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

  return authApi
    .get(url, { signal: controller.signal })
    .then(({ data }) => {
      return data.data.map((course) => ({
        ...course,
        createdAt: formatDate(course?.createdAt),
        updatedAt: formatDate(course?.updatedAt),
      }));
    })
    .catch((err) => Promise.reject(err));
};

// Get course by ID
const getCourseById = async (id) =>
  authApi
    .get(`${url}/${id}`)
    .then(async ({ data }) => {
      const length = await getChapterArticleLength(id);

      return {
        ...data.data,
        length,
        createdAt: formatDate(data.data.createdAt),
        updatedAt: formatDateWithHour(data.data.updatedAt),
      };
    })
    .catch(({ response }) => Promise.reject(response));

// Add course
const addCourse = async (newCourse) =>
  authApi
    .post(url, newCourse, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    .then(({ data }) => data.message)
    .catch(({ response }) => Promise.reject(response));

// Edit Course
const editCourse = async (id, editedCourse) => {
  return authApi
    .put(`${url}/${id}`, editedCourse, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    .then(({ data }) => data.message)
    .catch(({ response }) => Promise.reject(response));
};

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
  editCourse,
  deleteCourse,
};
