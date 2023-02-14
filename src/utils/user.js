import { authApi } from '../api/api';

const url = '/user';

const getAllUsers = async () =>
  authApi
    .get(url)
    .then(({ data }) => data.data)
    .catch(({ response }) => Promise.reject(response));

// Get user by id
const getUserById = async (id) =>
  authApi
    .get(`${url}/${id}`)
    .then(({ data }) => data.data)
    .catch(({ response }) => Promise.reject(response));

const changeUserRole = async (id, id_role) =>
  authApi
    .put(`${url}/role/${id}`, { id_role })
    .then(({ data }) => data.message)
    .catch(({ response }) => Promise.reject(response));

const changeUserVerify = async (id, verify) => {
  return authApi
    .put(`${url}/verify/${id}`, { verify })
    .then(({ data }) => data.message)
    .catch(({ response }) => Promise.reject(response));
};

const getGeneration = () => {
  let angkatanList = [];
  const yearNow = new Date().getFullYear();
  for (let i = 2018; i < yearNow; i++) {
    angkatanList.push(i);
  }
  return angkatanList;
};

export {
  getAllUsers,
  getUserById,
  changeUserRole,
  changeUserVerify,
  getGeneration,
};
