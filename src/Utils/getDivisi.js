import api from '../api/user';

let getDivisi = async () => {
  try {
    const response = await api.get('/division');
    return response.data.data.division;
  } catch (error) {
    console.log(error.message);
  }
};

export { getDivisi };
