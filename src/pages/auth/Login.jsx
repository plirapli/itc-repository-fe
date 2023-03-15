import { useState, useEffect, Fragment } from 'react';
import { Link, useNavigate, useOutletContext } from 'react-router-dom';
import { useProfile, useTitle } from '../../hooks';
import { sendLogin } from '../../utils/auth';

// Components
import Button from '../../components/buttons/Button';
import { Input } from '../../components/forms';
import { OverlayLoading } from '../../components/overlay';
import { getUserOwnProfile } from '../../utils/user';
import { Transition } from '@headlessui/react';

const Login = () => {
  window.history.pushState({}, null, '/login');
  const navigate = useNavigate();
  useTitle('Masuk');

  const initialState = { emailUsername: '', password: '' };
  const { setProfile } = useProfile();
  const [errMessage, setErrMessage] = useOutletContext();
  const [inputData, setInputData] = useState(initialState);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const inputHandler = (e, key) => {
    setInputData((prev) => ({ ...prev, [key]: e.target.value }));
  };

  // Submit process
  const submitHandler = (e) => {
    e.preventDefault();

    setIsLoading(true);
    sendLogin(inputData)
      .then(({ data }) => {
        const { accessToken, refreshToken } = data.user;

        // Store token to State && Local Storage
        localStorage.setItem(
          'user',
          JSON.stringify({ accessToken, refreshToken })
        );

        // Get user data
        getUserOwnProfile().then((data) => {
          setProfile({ ...data });
          // Reset state
          setErrMessage('');
          setInputData(initialState);
          navigate('/'); // Redirect to home page
        });
      })
      .catch(({ data }) => {
        setErrMessage(`Error - ${data.message}`);
        if (data.message.toLowerCase().includes('not verified'))
          setIsModalOpen(true);
      })
      .finally(() => setIsLoading(false));
  };

  // Remove err msg on first render
  useEffect(() => {
    if (errMessage.includes('Error')) setErrMessage('');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <h1 className='mt-4 text-xl sm:text-2xl'>Masuk</h1>
      {errMessage &&
        (errMessage.includes('Error') ? (
          !errMessage.includes('not verified') && (
            <div className='mt-0.5 mb-1.5 text-danger-main capitalize w-max max-w-full'>
              {errMessage}
            </div>
          )
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
            required
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
              required
            />
          </div>
          <div className='mt-2.5 text-end text-sm font-medium text-primary underline'>
            <Link to='/forgot-password'>Lupa Kata Sandi?</Link>
          </div>
        </section>

        <section className='mt-4 w-full'>
          <Button>Masuk</Button>
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

      {/* Unverified Modal */}
      <Transition appear show={isModalOpen}>
        <div className='relative z-10'>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <div className='fixed inset-0 bg-black bg-opacity-25' />
          </Transition.Child>
          <div className='fixed inset-0 overflow-y-auto'>
            <div className='flex min-h-full items-center justify-center p-4 text-center'>
              <Transition.Child
                as={Fragment}
                enter='ease-out duration-300'
                enterFrom='opacity-0 scale-95'
                enterTo='opacity-100 scale-100'
                leave='ease-in duration-200'
                leaveFrom='opacity-100 scale-100'
                leaveTo='opacity-0 scale-95'
              >
                {/* Main Container */}
                <div className='w-full max-w-md transform overflow-hidden rounded-lg bg-white p-6 text-left align-middle shadow-xl transition-all'>
                  <h3 className='text-lg font-medium leading-6 text-danger-main'>
                    Gagal Masuk
                  </h3>

                  {/* Body */}
                  <div className='mt-1'>
                    Anda perlu menunggu admin memverifikasi akun anda untuk
                    dapat masuk.
                  </div>

                  {/* Footer */}
                  <div className='mt-4 flex gap-2'>
                    <Button
                      type='button'
                      onClick={() => setIsModalOpen(false)}
                      color='gray'
                    >
                      Tutup
                    </Button>
                  </div>
                </div>
                {/* End Main Container */}
              </Transition.Child>
            </div>
          </div>
        </div>
      </Transition>

      <OverlayLoading loadingState={isLoading} />
    </>
  );
};

export default Login;
