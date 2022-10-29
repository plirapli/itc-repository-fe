import React from 'react';
import { Logo } from '../../assets';
import { ButtonIconNone } from '../../components/buttons/Button';
import Input from '../../components/Forms/Input';

const ForgotPassword = () => {
  return (
    <div className='w-full min-h-screen flex justify-center sm:items-center p-0 sm:p-5'>
      <div className='w-full sm:w-[40rem] p-10 pt-8 bg-white sm:rounded-xl sm:shadow-md'>
        <div className='flex flex-col items-center'>
          <img src={Logo} alt='Logo ITC' className='w-[4.5rem]' />
          <p className='font-bold h1-sm sm:h1-md text-primary'>
            ITC Repository
          </p>
        </div>
        <h1 className='mt-4 h2-sm sm:h2-md'>Lupa Kata Sandi</h1>
        <form className='mt-4' method='POST'>
          <Input
            type='secondary'
            inputType='email'
            label='Email'
            placeholder='Masukkan alamat email'
          />
          <section className='mt-6 w-full'>
            <ButtonIconNone text='Kirim' />
          </section>
        </form>
        <div className='mt-2.5 text-center'>
          <p className='text-primary'>Kembali ke menu utama</p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
