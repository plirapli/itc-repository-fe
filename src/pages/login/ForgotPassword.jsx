import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/buttons/Button';
import Input from '../../components/inputForm/Input';

const ForgotPassword = ({ errorHandler, msg }) => {
  useEffect(() => {
    errorHandler('');
  }, []);

  return (
    <>
      <h1 className='mt-4 h2-sm sm:h2-md'>Lupa Kata Sandi</h1>
      {msg && (
        <div className='mt-2 mb-4 py-2 px-4 bg-danger-sub text-danger-main rounded-md w-max max-w-full'>
          {msg}
        </div>
      )}
      <form className='mt-2 flex flex-col gap-3' method='POST'>
        <Input
          inputType='email'
          styleType='secondary'
          label='Email'
          placeholder='Masukkan alamat email'
        />
        <section className='mt-4 w-full'>
          <Button>Kirim</Button>
        </section>
      </form>
      <div className='mt-2.5 text-center'>
        <Link to='/login'>
          <p className='text-primary underline'>Kembali ke menu utama</p>
        </Link>
      </div>
    </>
  );
};

export default ForgotPassword;
