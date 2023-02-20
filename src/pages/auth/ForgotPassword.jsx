import { useEffect } from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import Button from '../../components/buttons/Button';
import Input from '../../components/forms/Input';

const ForgotPassword = (props) => {
  const [errMessage, setErrMessage] = useOutletContext();

  useEffect(() => {
    setErrMessage('');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <h1 className='mt-4 text-xl sm:text-2xl'>Lupa Kata Sandi</h1>
      {errMessage && (
        <div className='mt-2 mb-4 py-2 px-4 bg-danger-sub text-danger-main rounded-md w-max max-w-full'>
          {errMessage}
        </div>
      )}
      <form className='mt-1.5 flex flex-col gap-3' method='POST'>
        <div>
          <Input
            type='email'
            color='secondary'
            label='Email'
            placeholder='Masukkan alamat email'
            required
          />
        </div>
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
