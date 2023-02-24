import { authApi } from '../api/api';
import { formatDateWithHour } from './dateConverter';

// Get all discussions
const getAllDiscussions = async (courseId) => {
  return authApi
    .get(`/courses/${courseId}/discussions`)
    .then(({ data }) => {
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
};

// Get discussion by ID
const getDiscussionById = async (courseId, discussionId) => {
  return authApi
    .get(`/courses/${courseId}/discussions/${discussionId}`)
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

// Add discussion to the course
const addDiscussion = async (courseID, newDiscussion) => {
  return authApi
    .post(`/courses/${courseID}/discussions`, newDiscussion)
    .then(({ data }) => {
      return {
        ...data.data,
        createdAt: formatDateWithHour(data.data.createdAt),
        updatedAt: formatDateWithHour(data.data.updatedAt),
      };
    })
    .catch(({ response }) => Promise.reject(response));
};

// edit discussion

const editDiscussion = async (courseID, discussionID, discussion) => {
  return authApi
    .put(`/courses/${courseID}/discussions/${discussionID}`, discussion)
    .then(({ data }) => data.message)
    .catch(({ response }) => Promise.reject(response));
};

// delete discussion
const deleteDiscussion = async (courseID, discussionID) => {
  return authApi
    .delete(`/courses/${courseID}/discussions/${discussionID}`)
    .then(({ data }) => data.message)
    .catch(({ response }) => Promise.reject(response));
};

export {
  getAllDiscussions,
  getDiscussionById,
  addDiscussion,
  editDiscussion,
  deleteDiscussion,
};
