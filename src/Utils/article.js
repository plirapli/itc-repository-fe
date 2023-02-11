import { authApi } from '../api/api';
import { showFormattedDateDetail } from './dateConverter';

const getArticleByID = async (courseID, chapterID, articleID) =>
  authApi
    .get(`/course/${courseID}/chapter/${chapterID}/article/${articleID}`)
    .then(({ data }) => {
      const { data: article } = data;
      return {
        ...article,
        createdAt: showFormattedDateDetail(article.createdAt),
        updatedAt: showFormattedDateDetail(article.updatedAt),
      };
    })
    .catch(({ response }) => response.data);

export { getArticleByID };
