import { Link, useOutletContext } from 'react-router-dom';
import Button from '../../components/buttons/Button';

const OtpPage = () => {
  const [errMessage, setErrMessage] = useOutletContext();

  return (
    <>
      <h1 className='mt-4 text-center text-xl sm:text-2xl'>Kode Verifikasi</h1>
      <p className='text-center text-sm text-gray-dark'>
        Kami telah mengirimkan kode verifikasi ke email anda.
      </p>
      <form action=''>
        <div className='w-full mt-4 flex justify-center'>
          <div className='w-44 sm:w-60 grid grid-flow-col gap-2'>
            <input
              type='text'
              className='block w-full text-center rounded-md shadow-sm focus-primary sm:text-sm input-secondary'
            />
            <input
              type='text'
              className='block w-full text-center rounded-md shadow-sm focus-primary sm:text-sm input-secondary'
            />
            <input
              type='text'
              className='block w-full text-center rounded-md shadow-sm focus-primary sm:text-sm input-secondary'
            />
            <input
              type='text'
              className='block w-full text-center rounded-md shadow-sm focus-primary sm:text-sm input-secondary'
            />
          </div>
          {errMessage && (
            <div className='mt-0.5 mb-1.5 text-danger-main capitalize w-max max-w-full'>
              {errMessage}
            </div>
          )}
        </div>
        <div className='mt-5 w-full'>
          <Button>Kirim</Button>
        </div>
      </form>
      <div className='mt-2.5 text-center'>
        <Link to='/login'>
          <p className='text-primary underline'>Kembali ke menu utama</p>
        </Link>
      </div>
    </>
  );
};

export default OtpPage;
