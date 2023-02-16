import { authApi } from "../api/api";
import { formatDate, formatDateWithHour } from "./dateConverter";


// get All Discussions Comments
const getAllDiscussionsComments = async (courseId, discussionId) => {
  return authApi
    .get(`/course/${courseId}/discussion/${discussionId}/comment`)
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
}

// add comment to discussion
const addComment = async ({courseId, discussionId, body}) => {
  return authApi
    .post(`/course/${courseId}/discussion/${discussionId}/comment`, {body})
    .then(({ data }) => data)
    .catch(({ response }) => Promise.reject(response));
};

export { getAllDiscussionsComments, addComment }