import { api } from '../api/api';

// Get all divisions
const getAllDivisions = () =>
  api
    .get('/divisions')
    .then(({ data }) => data.data)
    .catch(({ response }) => Promise.reject(response));

export { getAllDivisions };
