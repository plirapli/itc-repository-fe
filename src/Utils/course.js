import { authApi } from '../api/api';
import { getChapterArticleLength } from './chapter';
import { showFormattedDate, showFormattedDateDetail } from './dateConverter';
import { getUserDetail } from './getData';

const url = '/course';

// Get all courses
const getCourses = async () => {
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

const getCourseById = async (id) => {
  return authApi
    .get(`${url}/${id}`)
    .then(async ({ data }) => {
      let { id_user, ...course } = data.data;
      const { data: user } = await getUserDetail(id_user);
      const { fullName } = await user;
      const length = await getChapterArticleLength(id);

      return {
        ...course,
        user: await fullName,
        length,
        createdAt: showFormattedDate(course.createdAt),
        updatedAt: showFormattedDateDetail(course.updatedAt),
      };
    })
    .catch(({ response }) => Promise.reject(response));
};

const deleteCourse = async (id) =>
  authApi
    .delete(`${url}/${id}`)
    .then((data) => data)
    .catch(({ response }) => Promise.reject(response));

export { getCourses, getCourseById, deleteCourse };
