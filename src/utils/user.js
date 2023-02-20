import { authApi } from '../api/api';

const url = '/users';

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

const getUserOwnProfile = async () =>
  authApi
    .get(`${url}/profile`)
    .then(({ data }) => data.data)
    .catch(({ response }) => Promise.reject(response));

const getAllGenerations = () => {
  let angkatanList = [];
  const yearNow = new Date().getFullYear();
  for (let i = 2018; i < yearNow; i++) {
    angkatanList.push(i);
  }
  return angkatanList;
};

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

const deleteUser = (id) => {
  return authApi
    .delete(`${url}/${id}`)
    .then(({ data }) => data.message)
    .catch(({ response }) => Promise.reject(response));
};

export {
  getAllUsers,
  getAllGenerations,
  getUserById,
  getUserOwnProfile,
  changeUserRole,
  changeUserVerify,
  deleteUser,
};
