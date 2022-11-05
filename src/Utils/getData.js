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

let getCourses = async () => {
  try {
    const response = await localApi.get('/courses');
    const courses = response.data.map((course) => {
      return {
        ...course,
        createdAt: showFormattedDate(course?.createdAt),
        updatedAt: showFormattedDate(course?.updatedAt),
      };
    });
    return courses;
  } catch (error) {
    console.log(error.message);
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
