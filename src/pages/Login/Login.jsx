import React from 'react';
import { Link } from 'react-router-dom';
import { Logo } from '../../assets/index';
import { ButtonIconNone } from '../../components/buttons/Button';
import Input from '../../components/Forms/Input';

const Login = () => {
  return (
    <>
      <div className='flex flex-col items-center'>
        <img src={Logo} alt='Logo ITC' className='w-[4.5rem]' />
        <p className='font-bold h1-sm sm:h1-md text-primary'>ITC Repository</p>
      </div>
      <h1 className='mt-4 h2-sm sm:h2-md'>Masuk</h1>
      <form className='flex flex-col gap-3 mt-4' method='POST'>
        <Input
          inputType='email'
          styleType='secondary'
          label='Email'
          placeholder='Masukkan alamat email'
        />
        <section className='flex flex-col w-full'>
          <Input
            inputType='password'
            styleType='secondary'
            label='Password'
            placeholder='Masukkan password'
          />
          <div className='mt-2.5 text-end text-sm font-medium text-primary'>
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
          <span className='ml-1 text-primary'>
            <Link to='/register'>Daftar</Link>
          </span>
        </p>
      </div>
    </>
  );
};

export default Login;
