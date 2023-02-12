import { authApi } from '../api/api';

const getAllUser = async () =>
  authApi
    .get('/user')
    .then(({ data }) => data.data)
    .catch(({ response }) => Promise.reject(response));

const changeUserRole = async (id, data) =>
  authApi
    .put(`/user/role/${id}`, { id_role: data })
    .then(({ data }) => data.message)
    .catch(({ response }) => Promise.reject(response));

export { getAllUser, changeUserRole };
