import { useState, useEffect } from 'react';
import { Link, useNavigate, useOutletContext } from 'react-router-dom';
import { api } from '../../api/api';
import { loginHandler } from '../../utils/auth';

// Components
import Button from '../../components/buttons/Button';
import { Input } from '../../components/forms';

const Login = ({ token, setIsAuthed }) => {
  window.history.pushState({}, null, '/login');
  const navigate = useNavigate();
  const initialState = { emailUsername: '', password: '' };
  const [errMessage, setErrMessage] = useOutletContext();
  const [inputData, setInputData] = useState(initialState);

  const inputHandler = (e, key) => {
    setInputData((prev) => ({ ...prev, [key]: e.target.value }));
  };

  // Submit process
  const submitHandler = (e) => {
    e.preventDefault();
    api
      .post('/user/login', inputData)
      .then(({ data }) => {
        setErrMessage(''); // Delete error msg
        setInputData(initialState); // Set input data to initial state
        loginHandler(data, token); // Login process
        setIsAuthed(true); // Set isAuthed to true
        navigate('/'); // Redirect to home page
      })
      .catch((err) => {
        setErrMessage(`Error: ${err.response.data.message}!`);
      });
  };

  // Error handling
  useEffect(() => {
    if (errMessage.includes('Error')) {
      setErrMessage('');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <h1 className='mt-4 text-xl sm:text-2xl'>Masuk</h1>
      {errMessage &&
        (errMessage.includes('Error') ? (
          <div className='mt-2 mb-4 py-2 px-4 bg-danger-sub text-danger-main rounded-md w-max max-w-full'>
            {errMessage}
          </div>
        ) : (
          <div className='mt-2 mb-4 py-2 px-4 bg-green-100 text-green-600 rounded-md w-max max-w-full'>
            {errMessage}
          </div>
        ))}
      <form
        onSubmit={submitHandler}
        className='flex flex-col gap-3 mt-1.5'
        method='POST'
      >
        <div>
          <Input
            onChange={(e) => inputHandler(e, 'emailUsername')}
            label='Email atau Username'
            type='text'
            value={inputData.emailUsername}
            color='secondary'
            placeholder='Masukkan email atau username'
          />
        </div>
        <section className='flex flex-col w-full'>
          <div>
            <Input
              onChange={(e) => inputHandler(e, 'password')}
              label='Password'
              type='password'
              value={inputData.password}
              color='secondary'
              placeholder='Masukkan password'
            />
          </div>
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