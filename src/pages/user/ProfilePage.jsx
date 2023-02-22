import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/buttons/Button';
import { Input, Select } from '../../components/forms/';
import { ModalForm } from '../../components/modal';
import { getAllGenerations } from '../../utils/user';

const ProfilePage = ({ userData, divisi }) => {
  const navigate = useNavigate();
  const toHome = () => navigate('/');
  const [user, setUser] = useState({});
  const [isModalPasswordOpen, setIsModalPasswordOpen] = useState(false);

  const closeModalPassword = () => setIsModalPasswordOpen(false);

  useEffect(() => {
    setUser(userData);
  }, [userData]);

  return (
    <>
      <h1 className='text-xl'>Ubah Profil</h1>
      <form
        // onSubmit={submitHandler}
        method='POST'
        encType='multipart/form-data'
      >
        <div className='mt-3 grid grid-cols-12 gap-3'>
          {/* Thumbnail */}
          <div>
            <label
              htmlFor='thumbnail'
              className='block text-sm font-medium text-primary'
            >
              Foto Profil
            </label>
            <input
              // onChange={inputImgHandler}
              type='file'
              id='thumbnail'
              name='thumbnail'
              accept='image/*'
              className='mt-1'
            />
          </div>

          {/* Nama */}
          <div className='col-span-12'>
            <Input
              // onChange={inputTitleHandler}
              label='Nama Lengkap'
              value={user?.fullName}
              placeholder='Masukkan nama lengkap'
              required
            />
          </div>

          {/* Username */}
          <div className='col-span-12 sm:col-span-6'>
            <Input
              // onChange={inputTitleHandler}
              label='Username'
              value={user?.username}
              placeholder='Masukkan username'
              required
            />
          </div>

          {/* Email */}
          <div className='col-span-12 sm:col-span-6'>
            <Input
              // onChange={inputTitleHandler}
              label='Email'
              type='email'
              value={user?.email}
              placeholder='Masukkan alamat email'
              required
            />
          </div>

          {/* No. Telepon */}
          <div className='col-span-12 sm:col-span-6'>
            <Input
              // onChange={inputTitleHandler}
              label='Nomor Telepon'
              value={user?.phoneNumber}
              placeholder='Masukkan nomor telepon'
            />
          </div>

          {/* Divisi */}
          <div className='col-span-12 sm:col-span-6 lg:col-span-3'>
            <Select
              // onChange={inputDivHandler}
              label='Divisi'
              value={user?.id_division}
              required
            >
              {divisi.map(({ id, divisionName }) => (
                <option key={id} value={id}>
                  {divisionName}
                </option>
              ))}
            </Select>
          </div>

          {/* Angkatan */}
          <div className='col-span-12 sm:col-span-6 md:col-span-3'>
            <Select
              // onChange={inputDivHandler}
              label='Angkatan'
              value={user?.generation}
            >
              <option value='0' hidden>
                Angkatan
              </option>
              {getAllGenerations().map((gen) => (
                <option key={gen} value={gen}>
                  {gen}
                </option>
              ))}
            </Select>
          </div>

          <div className='hidden sm:block sm:col-span-full'></div>

          <div className='mt-6 col-span-12 grid grid-cols-12 gap-3'>
            <div className='col-span-12 sm:col-span-6 md:col-span-3'>
              <Button onClick={() => setIsModalPasswordOpen(true)} color='gray'>
                Ganti Password
              </Button>
            </div>

            {/* Submit & Back button */}
            <div className='col-span-12 sm:col-span-2 sm:col-start-9'>
              <Button onClick={toHome} type='submit' color='gray'>
                Kembali
              </Button>
            </div>
            <div className='col-span-12 sm:col-span-2 sm:col-start-11'>
              <Button type='submit'>Simpan</Button>
            </div>
          </div>
        </div>
      </form>

      {/* Edit password dialog (modal) */}
      <ModalForm show={isModalPasswordOpen} title='Ubah kata sandi'>
        <form>
          <Input color='secondary' placeholder='Masukkan kata sandi baru' />
          <div className='mt-4 flex gap-2'>
            <Button onClick={closeModalPassword} color='gray' size='small'>
              Tutup
            </Button>
            <Button type='submit' onClick={closeModalPassword} size='small'>
              Simpan
            </Button>
          </div>
        </form>
      </ModalForm>
    </>
  );
};

export default ProfilePage;
