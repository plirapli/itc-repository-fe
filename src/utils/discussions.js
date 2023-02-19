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

export { getAllDiscussions, getDiscussionById, addDiscussion };