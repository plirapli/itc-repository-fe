import { Dialog, Transition } from '@headlessui/react';
import { Icon } from '@iconify/react';
import { Fragment, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authApi } from '../../api/api';

// Components
import Button from '../../components/buttons/Button';
import Input from '../../components/inputForm/Input';
import { SelectOptionDivisi } from '../../components/inputForm/SelectOption';

const AddMateri = () => {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [divisi, setDivisi] = useState(3);
  const [img, setImg] = useState({});

  const isLoadingClose = () => setIsLoading(true);
  const backButtonHandler = () => navigate(-1);
  const inputTitleHandler = (e) => setTitle(e.target.value);
  const inputDescHandler = (e) => setDesc(e.target.value);
  const inputImgHandler = (e) => setImg(e.target.files[0]);

  // Submit Course
  const submitHandler = (e) => {
    e.preventDefault();
    setIsLoading(true);

    const data = new FormData();
    data.append('title', title);
    data.append('description', desc);
    data.append('id_division', 3);
    data.append('image', img);

    console.log('Loading...');

    authApi
      .post('/course', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      .then((res) => {
        // Reset state
        setIsLoading(false);
        setTitle('');
        setDesc('');
        setImg({});

        // Redirect to list materi page
        navigate('/materi/');
      });
  };

  return (
    <>
      <h1 className='text-2xl mb-3 sm:mb-1'>Materi</h1>
      <form
        onSubmit={submitHandler}
        method='POST'
        encType='multipart/form-data'
      >
        <div className='grid grid-cols-6 gap-3 sm:gap-4'>
          {/* Judul */}
          <div className='col-span-6 sm:col-span-4'>
            <Input
              onChange={inputTitleHandler}
              label='Judul'
              value={title}
              styleType='primary'
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
                onChange={inputDescHandler}
                id='about'
                name='about'
                value={desc}
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

      <Transition
        appear
        show={isLoading}
        as={Fragment}
        onClose={isLoadingClose}
      >
        <Dialog as='div' className='relative z-10'>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <div className='fixed inset-0 bg-black bg-opacity-25' />
          </Transition.Child>

          <div className='fixed inset-0 overflow-y-auto'>
            <div className='flex min-h-full items-center justify-center p-4 text-center'>
              <Transition.Child
                as={Fragment}
                enter='ease-out duration-300'
                enterFrom='opacity-0 scale-95'
                enterTo='opacity-100 scale-100'
                leave='ease-in duration-200'
                leaveFrom='opacity-100 scale-100'
                leaveTo='opacity-0 scale-95'
              >
                <Dialog.Panel className='w-full max-w-xs -mt-32 transform overflow-hidden rounded-2xl bg-white px-6 py-12 text-left align-middle shadow-xl transition-all'>
                  <div className='mt-2 flex justify-center'>
                    <Icon width={64} icon='line-md:loading-twotone-loop' />
                  </div>

                  <div className='mt-4'>
                    <p className='text-center'>Memproses data</p>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default AddMateri;
