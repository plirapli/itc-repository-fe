import { useNavigate } from 'react-router-dom';
import Button from '../../components/buttons/Button';
import Input from '../../components/inputForm/Input';
import {
  SelectOption,
  SelectOptionDivisi,
} from '../../components/inputForm/SelectOption';

const AddMateri = () => {
  const navigate = useNavigate();

  const backButtonHandler = () => navigate(-1);
  const submitHandler = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <h1 className='h1-sm sm:h1-md mb-3 sm:mb-1'>Materi</h1>
      <form onSubmit={submitHandler} method='POST'>
        <div className='grid grid-cols-6 gap-3 sm:gap-4'>
          {/* Judul */}
          <div className='col-span-6 sm:col-span-4'>
            <Input
              label='Judul'
              styleType='primary'
              name='judulMateri'
              placeholder='Judul Materi'
            />
          </div>

          {/* Divisi */}
          <div class='col-span-6 sm:col-span-2 flex flex-col gap-1'>
            <SelectOptionDivisi
              label='Divisi'
              name='divisi'
              styleType='primary'
            />
          </div>

          {/* Deskripsi */}
          <div className='col-span-6'>
            <label
              htmlFor='about'
              className='block text-sm font-medium text-primary'
            >
              Deskripsi
            </label>
            <div className='mt-1'>
              <textarea
                id='about'
                name='about'
                rows={3}
                className='input-primary mt-1 block w-full rounded-md shadow-sm focus-primary sm:text-sm resize-none'
                placeholder='Deskripsi materi'
              />
            </div>
            <p className='mt-1 text-sm text-gray-500'>
              Deskripsi singkat mengenai materi
            </p>
          </div>

          {/* Thumbnail */}
          <div className='col-span-6'>
            <label className='block text-sm font-medium text-primary'>
              Thumbnail
            </label>
            <div className='mt-1 flex justify-center rounded-md  bg-white px-6 pt-5 pb-6'>
              <div className='space-y-1 text-center'>
                <svg
                  className='mx-auto h-12 w-12 text-gray-400'
                  stroke='currentColor'
                  fill='none'
                  viewBox='0 0 48 48'
                  aria-hidden='true'
                >
                  <path
                    d='M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02'
                    strokeWidth={2}
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                </svg>
                <div className='flex text-sm text-gray-600'>
                  <label
                    htmlFor='file-upload'
                    className='relative cursor-pointer rounded-md bg-white font-medium focus-within:outline-none focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2 hover:text-primary'
                  >
                    <span>Upload a file</span>
                    <input
                      id='file-upload'
                      name='file-upload'
                      type='file'
                      className='sr-only'
                    />
                  </label>
                  <p className='pl-1'>or drag and drop</p>
                </div>
                <p className='text-xs text-gray-500'>
                  PNG, JPG, GIF up to 10MB
                </p>
              </div>
            </div>
          </div>

          <div className='col-span-6 sm:col-span-2 sm:col-start-5 mt-2 flex gap-3 sm:gap-4'>
            <Button
              styleType='secondary'
              onClick={backButtonHandler}
              type='textOnly'
              text='Kembali'
              attrType='button'
            />
            <Button type='textOnly' text='Kirim' attrType='submit' />
          </div>
        </div>

        {/* Footer */}
      </form>
    </>
  );
};

export default AddMateri;
