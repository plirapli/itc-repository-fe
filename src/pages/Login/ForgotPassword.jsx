import React from 'react';
import { Link } from 'react-router-dom';
import { Logo } from '../../assets';
import { ButtonIconNone } from '../../components/buttons/Button';
import Input from '../../components/Forms/Input';

const ForgotPassword = () => {
  return (
    <>
      <div className='flex flex-col items-center'>
        <img src={Logo} alt='Logo ITC' className='w-[4.5rem]' />
        <p className='font-bold h1-sm sm:h1-md text-primary'>ITC Repository</p>
      </div>
      <h1 className='mt-4 h2-sm sm:h2-md'>Lupa Kata Sandi</h1>
      <form className='mt-4 flex flex-col gap-3' method='POST'>
        <Input
          inputType='email'
          styleType='secondary'
          label='Email'
          placeholder='Masukkan alamat email'
        />
        <section className='mt-4 w-full'>
          <ButtonIconNone text='Kirim' />
        </section>
      </form>
      <div className='mt-2.5 text-center'>
        <Link to='/login'>
          <p className='text-primary'>Kembali ke menu utama</p>
        </Link>
      </div>
    </>
  );
};

export default ForgotPassword;
