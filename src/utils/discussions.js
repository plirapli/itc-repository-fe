import { authApi } from "../api/api";
import { formatDate, formatDateWithHour } from './dateConverter';

// getAllDiscussions
const getAllDiscussions = async (courseId) => {
  return authApi
    .get(`/course/${courseId}/discussion`)
    .then(({data}) => {
      return data.data.map((discussion) => {
        return {
          ...discussion,
          fullName: discussion.User.fullName,
          createdAt: formatDateWithHour(discussion.createdAt),
          updatedAt: formatDateWithHour(discussion.updatedAt),
        };
      });
    })
    .catch(({ response }) => Promise.reject(response));
}

// getDiscussionById 
const getDiscussionById = async (courseId, discussionId) => {
  return authApi
    .get(`/course/${courseId}/discussion/${discussionId}`)
    .then(({ data }) => {
      return {
        ...data.data,
        fullName: data.data.User.fullName,
        createdAt: formatDateWithHour(data.data.createdAt),
        updatedAt: formatDateWithHour(data.data.updatedAt),
      };
    })
    .catch(({ response }) => Promise.reject(response));
};

// add discussion to the course
const addDiscussion = async ({courseId, title, body }) => {
  return authApi
    .post(`/course/${courseId}/discussion`, {title, body})
    .then(({ data }) => {
      return {
        ...data.data,
        createdAt: formatDateWithHour(data.data.createdAt),
        updatedAt: formatDateWithHour(data.data.updatedAt),
      };
    })
    .catch(({ response }) => Promise.reject(response));
};



export { getAllDiscussions, getDiscussionById, addDiscussion };