import { authApi } from '../api/api';
import { formatDateWithHour } from './dateConverter';

// get All Discussions Comments
const getAllComments = async (courseId, discussionId) => {
  return authApi
    .get(`/courses/${courseId}/discussions/${discussionId}/comments`)
    .then(({ data }) => {
      return data.data.map((comment) => {
        return {
          ...comment,
          fullName: comment.User.fullName,
          createdAt: formatDateWithHour(comment.createdAt),
          updatedAt: formatDateWithHour(comment.updatedAt),
        };
      });
    })
    .catch(({ response }) => Promise.reject(response));
};

// add comment to discussion
const addComment = async (courseID, discussionID, body) => {
  return authApi
    .post(`/courses/${courseID}/discussions/${discussionID}/comments`, { body })
    .then(({ data }) => data.message)
    .catch(({ response }) => Promise.reject(response));
};

export { getAllComments, addComment };