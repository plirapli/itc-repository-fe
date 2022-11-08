import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ButtonIconNone } from '../../components/buttons/Button';
import Input from '../../components/inputForm/Input';
import api from '../../api/api';
import { useEffect } from 'react';

const Login = ({ errorHandler, msg, setToken }) => {
  const navigate = useNavigate();
  const initialState = {
    emailUsername: '',
    password: '',
  };
  const [inputData, setInputData] = useState(initialState);

  const inputHandler = (e, key) => {
    setInputData((prev) => ({ ...prev, [key]: e.target.value }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/user/login', inputData);
      setToken(() => response.data.data.user.accessToken);
      setInputData(initialState);

      if (response) {
        navigate('/');
      }
    } catch (err) {
      errorHandler(err.response.data.message + '!');
    }
  };

  useEffect(() => {
    errorHandler('');
  }, []);

  return (
    <>
      <h1 className='mt-4 h2-sm sm:h2-md'>Masuk</h1>
      {msg && (
        <div className='mt-2 mb-4 py-2 px-4 bg-danger-sub text-danger-main rounded-md w-max'>
          {msg}
        </div>
      )}
      <form
        onSubmit={submitHandler}
        className='flex flex-col gap-3 mt-2'
        method='POST'
      >
        <Input
          name='emailUsername'
          value={inputData.emailUsername}
          handler={inputHandler}
          inputType='text'
          styleType='secondary'
          label='Email atau Username'
          placeholder='Masukkan email atau username'
        />
        <section className='flex flex-col w-full'>
          <Input
            name='password'
            value={inputData.password}
            handler={inputHandler}
            inputType='password'
            styleType='secondary'
            label='Password'
            placeholder='Masukkan password'
          />
          <div className='mt-2.5 text-end text-sm font-medium text-primary underline'>
            <Link to='/forgot-password'>Lupa Kata Sandi?</Link>
          </div>
        </section>

        <section className='mt-4 w-full'>
          <ButtonIconNone text='Masuk' />
        </section>
      </form>
      <div className='mt-2.5 text-center'>
        <p className='text-gray-dark'>
          Belum mempunyai akun?
          <span className='ml-1 text-primary underline'>
            <Link to='/register'>Daftar</Link>
          </span>
        </p>
      </div>
    </>
  );
};

export default Login;
