import React from 'react';
import { Logo } from '../../assets/index';
import { ButtonIconNone } from '../../components/buttons/Button';
import Input from '../../components/Forms/Input';

const Login = () => {
  return (
    <div className='w-full min-h-screen flex justify-center sm:items-center p-0 sm:p-6'>
      <div className='w-full sm:w-[40rem] p-10 pt-8 bg-white sm:rounded-xl sm:shadow-md'>
        <div className='flex flex-col items-center'>
          <img src={Logo} alt='Logo ITC' className='w-[4.5rem]' />
          <p className='font-bold h1-sm sm:h1-md text-primary'>
            ITC Repository
          </p>
        </div>
        <h1 className='mt-4 h2-sm sm:h2-md'>Masuk</h1>
        <form className='mt-4' method='POST'>
          <Input
            type='secondary'
            inputType='email'
            label='Email'
            placeholder='Masukkan alamat email'
          />
          <section className='flex flex-col mt-2 w-full'>
            <Input
              type='secondary'
              inputType='password'
              label='Password'
              placeholder='Masukkan password'
            />
            <a
              href=''
              className='mt-2.5 text-end text-sm font-medium text-primary'
            >
              Lupa Kata Sandi?
            </a>
          </section>

          <section className='mt-6 w-full'>
            <ButtonIconNone text='Masuk' />
          </section>
        </form>
        <div className='mt-2.5 text-center'>
          <p className='text-gray-dark'>
            Belum mempunyai akun?
            <span className='ml-1 text-primary'>Daftar</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
