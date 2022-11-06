import api from '../api/api';
import localApi from '../api/localApi';
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
    console.log(courses);
    return courses;
  } catch (error) {
    console.log(error.message);
    const response = await localApi.get('/courses');
    const courses = response.data.map((course) => {
      return {
        ...course,
        createdAt: showFormattedDate(course?.createdAt),
        updatedAt: showFormattedDate(course?.updatedAt),
      };
    });
    return courses;
  }
};

let getUserDetail = async (id) => {
  try {
    const response = await api.get(`/user/${id}`);
    return response.data;
  } catch (error) {
    console.log(error.message);
  }
};

export { getDivisi, getCourses, getUserDetail };
