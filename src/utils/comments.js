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

// delete comment from discussion
const deleteComment = async (courseID, discussionID, commentID) => {
  return authApi
    .delete(`/courses/${courseID}/discussions/${discussionID}/comments/${commentID}`)
    .then(({ data }) => data.message)
    .catch(({ response }) => Promise.reject(response));
};


const editComment = async (courseID, discussionID, commentID, commentBody) => {
  return authApi
    .put(`/courses/${courseID}/discussions/${discussionID}/comments/${commentID}`, {
      body: commentBody,
    })
    .then(({ data }) => data.message)
    .catch(({ response }) => Promise.reject(response));
};


export { getAllComments, addComment, deleteComment, editComment };
