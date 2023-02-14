import { authApi } from '../api/api';

const url = '/user';

const getAllUser = async () =>
  authApi
    .get(url)
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

export { getAllUser, changeUserRole, changeUserVerify };
