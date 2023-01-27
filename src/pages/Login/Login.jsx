import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../api/api';

// Components
import { ButtonTextOnly } from '../../components/buttons/Button';
import Input from '../../components/inputForm/Input';

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
      api.post('/user/login', inputData).then((res) => {
        const token = res.data.data.user.accessToken;
        localStorage.setItem('token', token);
        setToken(() => token);
        setInputData(initialState);

        if (res) {
          navigate('/');
        }
      });
    } catch (err) {
      errorHandler(`Error: ${err.response.data.message}!`);
    }
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
          <ButtonTextOnly text='Masuk' />
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
