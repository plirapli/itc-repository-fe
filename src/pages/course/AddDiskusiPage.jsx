import { useNavigate } from 'react-router-dom';

// Components
import Button from '../../components/buttons/Button';
import Input from '../../components/inputForm/Input';
import { SelectOptionDivisi } from '../../components/inputForm/SelectOption';

const AddDiskusiPage = () => {
  const navigate = useNavigate();

  const backButtonHandler = () => navigate(-1);
  const submitHandler = (e) => {
    e.preventDefault();
  };

  return (
    <div className='w-full py-4 px-5 sm:py-6 sm:px-0'>
      <h1 className='text-2xl leading-none'>Materi</h1>
      <form onSubmit={submitHandler} method='POST'>
        <div className='mt-3 grid grid-cols-6 gap-3'>
          {/* Judul */}
          <div className='col-span-6'>
            <Input
              label='Judul Pertanyaan'
              styleType='primary'
              name='judulPertanyaan'
              placeholder='Masukkan judul pertanyaan'
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
                id='isiPertanyaan'
                name='isiPertanyaan'
                rows={10}
                className='input-primary mt-1 block w-full rounded-md shadow-sm focus-primary sm:text-sm resize-none'
                placeholder='Masukkan isi pertanyaan'
              />
            </div>
            <p className='mt-1 text-sm text-gray-500'>
              Isi dari pertanyaan yang ingin kamu tanyakan
            </p>
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

        {/* Footer */}
      </form>
    </div>
  );
};

export default AddDiskusiPage;
