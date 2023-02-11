import { authApi } from '../api/api';

const getAllUser = async () =>
  authApi
    .get('/user')
    .then(({ data }) => data.data)
    .catch(({ response }) => Promise.reject(response));

export { getAllUser };
