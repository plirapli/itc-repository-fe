import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authApi } from '../../api/api';

// Components
import Button from '../../components/buttons/Button';
import Input from '../../components/inputForm/Input';
import { SelectOptionDivisi } from '../../components/inputForm/SelectOption';

const AddMateri = () => {
  const formRef = useRef();
  const inputTitleRef = useRef();
  const inputDescRef = useRef();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [divisi, setDivisi] = useState(3);
  const [img, setImg] = useState();

  const backButtonHandler = () => navigate(-1);
  const inputTitleHandler = (e) => setTitle(e.target.value);
  const inputDescHandler = (e) => setDesc(e.target.value);
  const inputImgHandler = (e) => setImg(e.target.files[0]);

  // Submit Course
  const submitHandler = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('title', inputTitleRef.current?.value);
    data.append('description', inputDescRef.current?.value);
    data.append('id_division', 3);
    data.append('image', img);

    authApi
      .post('/course', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      .then((res) => console.log(res.json()));
  };

  return (
    <>
      <h1 className='text-2xl mb-3 sm:mb-1'>Materi</h1>
      <form
        onSubmit={submitHandler}
        method='POST'
        encType='multipart/form-data'
        ref={formRef}
      >
        <div className='grid grid-cols-6 gap-3 sm:gap-4'>
          {/* Judul */}
          <div className='col-span-6 sm:col-span-4'>
            <label
              htmlFor='judul'
              className='block text-sm font-medium text-primary'
            >
              Judul
            </label>
            <input
              type='text'
              id='judul'
              name='judul'
              ref={inputTitleRef}
              className='mt-1 block w-full rounded-md shadow-sm focus-primary sm:text-sm input-primary'
              placeholder='Judul Materi'
              required
            />
          </div>

          {/* Divisi */}
          <div className='col-span-6 sm:col-span-2 flex flex-col gap-1'>
            {/* <SelectOptionDivisi
              label='Divisi'
              name='divisi'
              styleType='primary'
            /> */}
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
                ref={inputDescRef}
                rows={3}
                className='input-primary mt-1 block w-full rounded-md shadow-sm focus-primary sm:text-sm resize-none'
                placeholder='Deskripsi materi'
                required
              />
            </div>
            <p className='mt-1 text-sm text-gray-500'>
              Deskripsi singkat mengenai materi
            </p>
          </div>

          {/* Thumbnail */}
          <div className='col-span-6'>
            <label
              htmlFor='thumbnail'
              className='block text-sm font-medium text-primary'
            >
              Thumbnail
            </label>
            <input
              onChange={inputImgHandler}
              type='file'
              id='thumbnail'
              name='thumbnail'
              accept='image/*'
              className='mt-1'
            />

            {/* <label className='block text-sm font-medium text-primary'>
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
                    htmlFor='thumbnail'
                    className='relative cursor-pointer rounded-md bg-white font-medium focus-within:outline-none focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2 hover:text-primary'
                  >
                    <span>Upload a file</span>
                    <input
                      onc
                      type='file'
                      id='thumbnail'
                      name='thumbnail'
                      accept='image/*'
                      className='sr-only'
                    />
                  </label>
                  <p className='pl-1'>or drag and drop</p>
                </div>
                <p className='text-xs text-gray-500'>
                  PNG, JPG, GIF up to 10MB
                </p>
              </div>
            </div> */}
          </div>

          <div className='col-span-6 sm:col-span-2 sm:col-start-5 mt-8 flex gap-3 sm:gap-4'>
            <Button
              styleType='gray'
              onClick={backButtonHandler}
              type='textOnly'
              text='Kembali'
              attrType='button'
            />
            <Button type='textOnly' text='Kirim' attrType='submit' />
          </div>
        </div>
      </form>
    </>
  );
};

export default AddMateri;
