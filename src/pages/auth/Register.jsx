/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { useTitle } from '../../hooks';
import { Link, useNavigate, useOutletContext } from 'react-router-dom';

// Components
import { Input, Select } from '../../components/forms';
import Button from '../../components/buttons/Button';
import { sendRegister } from '../../utils/auth';

const Register = ({ divisi }) => {
  const navigate = useNavigate();
  useTitle('Daftar');

  const initialState = {
    username: '',
    fullName: '',
    email: '',
    password: '',
    id_division: 1,
  };
  const [errMessage, setErrMessage] = useOutletContext();
  const [inputData, setInputData] = useState(initialState);

  const inputHandler = (e, key) => {
    setInputData((prev) => ({ ...prev, [key]: e.target.value }));
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    const id_division = parseInt(inputData.id_division);
    const data = { ...inputData, id_division: id_division };

    sendRegister(data)
      .then((data) => {
        setInputData(initialState); // Reset state
        setErrMessage(data); // Set message
        navigate('/login'); // Navigate to /login
      })
      .catch(({ data }) => setErrMessage(`Error: ${data.message}!`));
  };

  useEffect(() => {
    setErrMessage('');
  }, []);

  return (
    <>
      <h1 className='mt-4 text-xl sm:text-2xl'>Daftar</h1>
      {errMessage && (
        <div className='mt-2 mb-4 py-2 px-4 bg-danger-sub text-danger-main rounded-md w-max max-w-full'>
          {errMessage}
        </div>
      )}
      <form onSubmit={submitHandler} className='mt-1.5 flex flex-col gap-3'>
        <div>
          <Input
            onChange={(e) => inputHandler(e, 'fullName')}
            label='Nama'
            value={inputData.nama}
            color='secondary'
            placeholder='Masukkan nama'
            required
          />
        </div>
        <div>
          <Input
            onChange={(e) => inputHandler(e, 'username')}
            label='Username'
            value={inputData.username}
            color='secondary'
            placeholder='Masukkan username'
            required
          />
        </div>
        <div>
          <Input
            onChange={(e) => inputHandler(e, 'email')}
            label='Email'
            type='email'
            value={inputData.email}
            color='secondary'
            placeholder='Masukkan alamat email'
            required
          />
        </div>
        <div>
          <Input
            onChange={(e) => inputHandler(e, 'password')}
            label='Password'
            type='password'
            value={inputData.password}
            color='secondary'
            placeholder='Masukkan password'
            required
          />
        </div>
        <div className='flex flex-col gap-1 sm:w-2/5'>
          <Select
            onChange={(e) => inputHandler(e, 'id_division')}
            label='Divisi'
            value={inputData.id_division}
            color='secondary'
            required
          >
            {divisi.map(({ id, divisionName }) => (
              <option className='bg-white' key={id} value={id}>
                {divisionName}
              </option>
            ))}
          </Select>
        </div>
        <section className='mt-4 w-full'>
          <Button type='submit'>Daftar</Button>
        </section>
      </form>
      <div className='mt-2.5 text-center'>
        <p className='text-gray-dark'>
          Sudah mempunyai akun?
          <span className='ml-1 text-primary underline'>
            <Link to='/login'>Masuk</Link>
          </span>
        </p>
      </div>
    </>
  );
};

export default Register;
