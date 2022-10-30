import React, { useState } from 'react';
import { Link, redirect, useNavigate } from 'react-router-dom';
import { Logo } from '../../assets/index';
import { ButtonIconNone } from '../../components/buttons/Button';
import Input from '../../components/Forms/Input';
import SelectOption from '../../components/Forms/SelectOption';
import { getDivisi } from '../../Utils/getDivisi';
import api from '../../api/user';

const Register = () => {
  const initialState = {
    nama: '',
    username: '',
    email: '',
    password: '',
    divisi: 'Mobile Developer',
  };
  const [inputData, setInputData] = useState(initialState);

  const navigate = useNavigate();
  const inputHandler = (e, key) => {
    setInputData((prev) => ({ ...prev, [key]: e.target.value }));
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/user', inputData);
      setInputData(initialState);

      if (response) {
        navigate('/login');
      }
    } catch (error) {
      console.log(`Error: ${error.message}`);
    }
  };

  return (
    <>
      <div className='flex flex-col items-center'>
        <img src={Logo} alt='Logo ITC' className='w-[4.5rem]' />
        <p className='font-bold h1-sm sm:h1-md text-primary'>ITC Repository</p>
      </div>
      <h1 className='mt-4 h2-sm sm:h2-md'>Daftar</h1>
      <form onSubmit={submitHandler} className='mt-2 flex flex-col gap-3'>
        <Input
          name='nama'
          value={inputData.nama}
          handler={inputHandler}
          styleType='secondary'
          label='Nama'
          placeholder='Masukkan nama'
        />
        <Input
          name='username'
          value={inputData.username}
          handler={inputHandler}
          styleType='secondary'
          label='Username'
          placeholder='Masukkan username'
        />
        <Input
          name='email'
          value={inputData.email}
          handler={inputHandler}
          inputType='email'
          styleType='secondary'
          label='Email'
          placeholder='Masukkan alamat email'
        />
        <Input
          name='password'
          value={inputData.password}
          handler={inputHandler}
          inputType='password'
          styleType='secondary'
          label='Password'
          placeholder='Masukkan password'
        />
        <SelectOption
          name='divisi'
          value={inputData.divisi}
          handler={inputHandler}
          options={getDivisi()}
          label='Divisi'
        />
        <section className='mt-4 w-full'>
          <ButtonIconNone text='Daftar' />
        </section>
      </form>
      <div className='mt-2.5 text-center'>
        <p className='text-gray-dark'>
          Sudah mempunyai akun?
          <span className='ml-1 text-primary'>
            <Link to='/login'>Masuk</Link>
          </span>
        </p>
      </div>
    </>
  );
};

export default Register;
