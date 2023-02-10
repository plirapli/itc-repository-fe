import { authApi } from '../api/api';
import { getChapterArticleLength } from './chapter';
import { showFormattedDate, showFormattedDateDetail } from './dateConverter';
import { getUserDetail } from './getData';

const url = '/course';

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
    .catch((err) => Promise.reject(err));
};

const deleteCourse = async (id) =>
  authApi
    .delete(`${url}/${id}`)
    .then((data) => data)
    .catch((err) => Promise.reject(err));

export { getCourseById, deleteCourse };
