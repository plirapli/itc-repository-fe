import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/buttons/Button';

const NotFound = () => {
  return (
    <div className='p-6 min-h-screen flex flex-col justify-center'>
      <div className='text-center mb-4'>Halamaan tidak ditemukan.</div>
      <Link to={'/'} replace='true'>
        <Button color='gray'>Kembali ke halaman utama</Button>
      </Link>
    </div>
  );
};

export default NotFound;
