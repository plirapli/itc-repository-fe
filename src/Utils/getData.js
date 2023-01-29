import api from '../api/api';
import { showFormattedDate } from './dateConverter';

// Get all divisions
const getDivisi = () =>
  api
    .get('/division')
    .then((res) => res.data.data)
    .catch((err) => {
      throw new Error(err.message);
    });

// Get all courses
const getCourses = async (authToken) => {
  const controller = new AbortController();

  return api
    .get('/course', { signal: controller.signal })
    .then(({ data }) => {
      return data.data.map((course) => {
        return {
          ...course,
          createdAt: showFormattedDate(course?.createdAt),
          updatedAt: showFormattedDate(course?.updatedAt),
        };
      });
    })
    .catch((err) => {
      throw new Error(err.message);
    });
};

// Get user detail
const getUserDetail = async (id) => {
  try {
    const response = await api.get(`/user/${id}`);
    return response.data;
  } catch (error) {
    return error.message;
  }
};

export { getDivisi, getCourses, getUserDetail };
