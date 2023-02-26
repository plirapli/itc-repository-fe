import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTitle } from '../../hooks';
import { addCourse } from '../../utils/course';

// Components
import ButtonMin from '../../components/buttons/ButtonMin';
import { Input, Select } from '../../components/forms';
import OverlayLoading from '../../components/overlay/OverlayLoading';

const AddCoursePage = ({ divisi }) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [selectedDiv, setSelectedDiv] = useState(1);
  const [img, setImg] = useState({});
  useTitle('Tambah Materi');

  const inputTitleHandler = (e) => setTitle(e.target.value);
  const inputDivHandler = (e) => setSelectedDiv(e.target.value);
  const inputDescHandler = (e) => setDesc(e.target.value);
  const inputImgHandler = (e) => setImg(e.target.files[0]);

  // Submit Course
  const submitHandler = (e) => {
    e.preventDefault();
    setIsLoading(true);

    const data = new FormData();
    data.append('title', title);
    data.append('description', desc);
    data.append('id_division', selectedDiv);
    data.append('image', img);

    addCourse(data)
      .then(() => {
        // Reset state
        setTitle('');
        setDesc('');
        setImg({});

        // Redirect to list materi page
        navigate('/');
      })
      .catch(({ data }) => console.log(data.message))
      .finally(() => setIsLoading(false));
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
              placeholder='Masukkan judul materi'
              required
            />
          </div>

          {/* Divisi */}
          <div className='col-span-6 sm:col-span-2 flex flex-col gap-1'>
            <Select
              onChange={inputDivHandler}
              label='Divisi'
              value={selectedDiv}
              required
            >
              {divisi.map(({ id, divisionName }) => (
                <option key={id} value={id}>
                  {divisionName}
                </option>
              ))}
            </Select>
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

          <div className='col-span-6 sm:col-span-1 sm:col-start-6 mt-4'>
            <ButtonMin variant='text-only'>Kirim</ButtonMin>
          </div>
        </div>
      </form>

      {/* Loading screen */}
      <OverlayLoading loadingState={isLoading} />
    </>
  );
};

export default AddCoursePage;
