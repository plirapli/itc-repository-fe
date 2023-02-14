import { Link, useNavigate } from 'react-router-dom';
import Button from '../../components/buttons/Button';
import { DiskusiCard } from '../../components/cards/index';
import SearchBar from '../../components/inputForm/SearchBar';

const DiscussionPage = () => {
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
            variant='icon-right'
            icon='akar-icons:plus'
          >
            Buat Pertanyaan
          </Button>
        </div>
        <div className='w-full mt-3'>
          <SearchBar placeholder='Cari Pertanyaan' />
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

export default DiscussionPage;
