import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

// Components
import Button from '../../components/buttons/Button';
import Input from '../../components/forms/Input';
import OverlayLoading from '../../components/overlay/OverlayLoading';
import { addDiscussion } from '../../utils/discussions';

const AddDiscussionPage = () => {
  const navigate = useNavigate();
  const { id_course: courseID } = useParams();
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const inputTitleHandler = (e) => setTitle(e.target.value);
  const inputBodyHandler = (e) => setBody(e.target.value);

  const backButtonHandler = () => navigate(-1);
  const submitHandler = (e) => {
    e.preventDefault();

    setIsLoading(true);
    addDiscussion(courseID, { title, body })
      .then(() => {
        setTitle(''); // Reset state
        setBody(''); // Reset state
        navigate(-1);
      })
      .catch(({ data }) => console.log(data.message))
      .finally(() => setIsLoading(false));
  };

  return (
    <>
      <div className='w-full py-4 px-5 sm:py-6 sm:px-0'>
        <h1 className='text-xl sm:text-xl'>Diskusi</h1>
        <form onSubmit={submitHandler} method='POST'>
          <div className='mt-1.5 grid grid-cols-6 gap-3'>
            {/* Judul */}
            <div className='col-span-6'>
              <Input
                onChange={inputTitleHandler}
                label='Judul Pertanyaan'
                placeholder='Masukkan judul pertanyaan'
                required
              />
            </div>

            {/* Deskripsi */}
            <div className='col-span-6'>
              <label
                htmlFor='isiPertanyaan'
                className='block text-sm font-medium text-primary'
              >
                Isi Pertanyaan
              </label>
              <div className='mt-1'>
                <textarea
                  onChange={inputBodyHandler}
                  id='isiPertanyaan'
                  name='isiPertanyaan'
                  rows={10}
                  className='input-primary mt-1 block w-full rounded-md shadow-sm focus-primary sm:text-sm resize-none'
                  placeholder='Masukkan isi pertanyaan'
                  required
                />
              </div>
              <p className='mt-1 text-sm text-gray-500'>
                Isi dari pertanyaan yang ingin kamu tanyakan
              </p>
            </div>

            <div className='col-span-6 sm:col-span-2 sm:col-start-5 mt-3 sm:mt-8 flex flex-col sm:flex-row gap-2 sm:gap-3'>
              <Button onClick={backButtonHandler} color='gray'>
                Kembali
              </Button>
              <Button type='submit'>Kirim</Button>
            </div>
          </div>
        </form>
      </div>

      <OverlayLoading
        loadingState={isLoading}
        onClose={() => setIsLoading(true)}
      />
    </>
  );
};

export default AddDiscussionPage;
