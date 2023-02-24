import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Ava } from '../../assets';
import Button from '../../components/buttons/Button';
import { Input, Select } from '../../components/forms/';
import { ModalForm } from '../../components/modal';
import {
  getAllGenerations,
  getUserOwnProfile,
  updatePassword,
  updateUserProfile,
} from '../../utils/user';

const ProfilePage = ({ userData, divisi }) => {
  const [user, setUser] = useState({});
  const [isModalPasswordOpen, setIsModalPasswordOpen] = useState(false);
  const [newPassword, setNewPassword] = useState('');

  const closeModalPassword = () => setIsModalPasswordOpen(false);
  const onChangeFormHandler = (e, key) =>
    setUser((prev) => ({ ...prev, [key]: e.target.value }));

  const onSumbitProfileHandler = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append('fullName', user.fullName);
    data.append('phoneNumber', user.phoneNumber);
    data.append('id_division', parseInt(user.id_division));
    data.append('generation', user.generation);
    if (user.imgProfile) {
      data.append('image', user.imgProfile);
    }

    updateUserProfile(data)
      .then(() => setUser((prev) => ({ ...prev, imgProfile: null })))
      .catch(({ data }) => console.log(data.message));
  };

  const onSubmitNewPasswordHandler = (e) => {
    e.preventDefault();
    updatePassword(newPassword)
      .then(() => setNewPassword(''))
      .catch(({ data }) => console.log(data.message))
      .finally(() => setIsModalPasswordOpen(false));
  };

  useEffect(() => {
    setUser({
      ...userData,
      id_division: divisi?.filter(
        ({ divisionName }) => divisionName === userData?.divisionName
      )[0]?.id,
    });
  }, [userData]);

  return (
    <>
      <h1 className='text-xl'>Ubah Profil</h1>
      <form
        onSubmit={onSumbitProfileHandler}
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
            <div className='flex items-end gap-3.5'>
              <img
                src={user?.photoProfile || Ava}
                alt='profile'
                className='mt-1.5 w-20 h-20 rounded-md ring-4 ring-white border-white'
              />
              <div>
                <input
                  onChange={(e) =>
                    setUser((prev) => ({
                      ...prev,
                      photoProfile: URL.createObjectURL(e.target.files[0]),
                      imgProfile: e.target.files[0],
                    }))
                  }
                  type='file'
                  id='thumbnail'
                  name='thumbnail'
                  accept='image/*'
                />
              </div>
            </div>
          </div>

          {/* Nama */}
          <div className='col-span-12'>
            <Input
              onChange={(e) => onChangeFormHandler(e, 'fullName')}
              label='Nama Lengkap'
              value={user?.fullName}
              placeholder='Masukkan nama lengkap'
              required
            />
          </div>

          {/* Email */}
          <div className='col-span-12 sm:col-span-6'>
            <Input
              onChange={(e) => onChangeFormHandler(e, 'email')}
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
              onChange={(e) => onChangeFormHandler(e, 'phoneNumber')}
              label='Nomor Telepon'
              value={user?.phoneNumber}
              placeholder='Masukkan nomor telepon'
            />
          </div>

          {/* Divisi */}
          <div className='col-span-12 sm:col-span-6 lg:col-span-3'>
            <Select
              onChange={(e) => onChangeFormHandler(e, 'id_division')}
              label='Divisi'
              value={user?.id_division}
              required
            >
              {divisi?.map(({ id, divisionName }) => (
                <option key={id} value={id}>
                  {divisionName}
                </option>
              ))}
            </Select>
          </div>

          {/* Angkatan */}
          <div className='col-span-12 sm:col-span-6 md:col-span-3'>
            <Select
              onChange={(e) => onChangeFormHandler(e, 'generation')}
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
              <Link to={'/'}>
                <Button type='submit' color='gray'>
                  Kembali
                </Button>
              </Link>
            </div>
            <div className='col-span-12 sm:col-span-2 sm:col-start-11'>
              <Button type='submit'>Simpan</Button>
            </div>
          </div>
        </div>
      </form>

      {/* Edit password dialog (modal) */}
      <ModalForm show={isModalPasswordOpen} title='Ubah kata sandi'>
        <form onSubmit={onSubmitNewPasswordHandler}>
          <Input
            onChange={(e) => setNewPassword(e.target.value)}
            value={newPassword}
            color='secondary'
            placeholder='Masukkan kata sandi baru'
          />
          <div className='mt-4 flex gap-2'>
            <Button onClick={closeModalPassword} color='gray' size='small'>
              Tutup
            </Button>
            <Button type='submit' size='small'>
              Simpan
            </Button>
          </div>
        </form>
      </ModalForm>
    </>
  );
};

export default ProfilePage;
