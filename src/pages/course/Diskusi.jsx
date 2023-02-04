import { Link, useNavigate } from 'react-router-dom';
import Button from '../../components/buttons/Button';
import { DiskusiCard } from '../../components/cards/index';
import SearchBar from '../../components/inputForm/SearchBar';

const Diskusi = () => {
  const navigate = useNavigate();
  const diskusiList = ['1', '2', '3', '4']; // Dummy
  const toAddDiskusiPage = () => navigate('add');

  return (
    <>
      <div className='w-full py-4 px-5 sm:py-6 sm:px-0'>
        {/* Header */}
        <div className='flex flex-col gap-3 sm:flex-row sm:justify-between sm:items-center'>
          <h1 className='text-2xl leading-none'>Diskusi</h1>
          <Button
            onClick={toAddDiskusiPage}
            type='iconRight'
            text='Buat Pertanyaan'
            icon='akar-icons:plus'
          />
        </div>
        <div className='w-full mt-3'>
          <SearchBar />
        </div>

        {/* List Diskusi */}
        <div className='mt-3 flex flex-col gap-5'>
          {diskusiList.map((diskusi, i) => (
            <Link key={i} to={`${i}`}>
              <DiskusiCard />
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default Diskusi;
