import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api, authApi } from '../../api/api';
import { loginHandler } from '../../Utils/auth';

// Components
import Button from '../../components/buttons/Button';
import Input from '../../components/inputForm/Input';

const Login = ({ token, msg, errorHandler }) => {
  const navigate = useNavigate();
  const initialState = {
    emailUsername: '',
    password: '',
  };
  const [inputData, setInputData] = useState(initialState);

  const inputHandler = (e, key) => {
    setInputData((prev) => ({ ...prev, [key]: e.target.value }));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    api
      .post('/user/login', inputData)
      .then(({ data }) => {
        errorHandler(''); // Delete error msg
        setInputData(initialState); // Delete input data
        loginHandler(data, token); // Login process
        navigate('/'); // Redirect to home page
      })
      .catch((err) => {
        errorHandler(`Error: ${err.response.data.message}!`);
      });
  };

  useEffect(() => {
    if (msg.includes('Error')) {
      errorHandler('');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <h1 className='mt-4 h2-sm sm:h2-md'>Masuk</h1>
      {msg &&
        (msg.includes('Error') ? (
          <div className='mt-2 mb-4 py-2 px-4 bg-danger-sub text-danger-main rounded-md w-max max-w-full'>
            {msg}
          </div>
        ) : (
          <div className='mt-2 mb-4 py-2 px-4 bg-green-100 text-green-600 rounded-md w-max max-w-full'>
            {msg}
          </div>
        ))}
      <form
        onSubmit={submitHandler}
        className='flex flex-col gap-3 mt-2'
        method='POST'
      >
        <Input
          onChange={(e) => inputHandler(e, 'emailUsername')}
          label='Email atau Username'
          inputType='text'
          name='emailUsername'
          value={inputData.emailUsername}
          placeholder='Masukkan email atau username'
          styleType='secondary'
        />
        <section className='flex flex-col w-full'>
          <Input
            onChange={(e) => inputHandler(e, 'password')}
            label='Password'
            inputType='password'
            name='password'
            value={inputData.password}
            placeholder='Masukkan password'
            styleType='secondary'
          />
          <div className='mt-2.5 text-end text-sm font-medium text-primary underline'>
            <Link to='/forgot-password'>Lupa Kata Sandi?</Link>
          </div>
        </section>

        <section className='mt-4 w-full'>
          <Button type='submit'>Masuk</Button>
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
