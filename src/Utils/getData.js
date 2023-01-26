import api from '../api/api';
import { showFormattedDate } from './dateConverter';

let getDivisi = async () => {
  try {
    const response = await api.get('/division');
    return response.data.data;
  } catch (error) {
    console.log(error.message);
  }
};

let getCourses = async (authToken) => {
  try {
    const AuthStr = `Bearer ${authToken}`;
    const response = await api.get('/course', {
      headers: { Authorization: AuthStr },
    });
    const courses = response.data.data.map((course) => {
      return {
        ...course,
        createdAt: showFormattedDate(course?.createdAt),
        updatedAt: showFormattedDate(course?.updatedAt),
      };
    });
    return { status: 1, data: courses };
  } catch (error) {
    return { status: 0, data: error };
  }
};

let getUserDetail = async (id) => {
  try {
    const response = await api.get(`/user/${id}`);
    return response.data;
  } catch (error) {
    return error.message;
  }
};

export { getDivisi, getCourses, getUserDetail };
