import { authApi } from '../api/api';
import { formatDateWithHour } from './dateConverter';

// get All Discussions Comments
const getAllDiscussionsComments = async (courseId, discussionId) => {
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
const addComment = async ({ courseId, discussionId, body }) => {
  return authApi
    .post(`/courses/${courseId}/discussions/${discussionId}/comments`, { body })
    .then(({ data }) => data)
    .catch(({ response }) => Promise.reject(response));
};

export { getAllDiscussionsComments, addComment };
