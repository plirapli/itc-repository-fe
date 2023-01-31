import { Link } from 'react-router-dom';
import Button from '../../components/buttons/Button';
import DiskusiCard from '../../components/cards/DiskusiCard';
import SearchBar from '../../components/SearchBar';

const Diskusi = () => {
  const diskusiList = ['1', '2', '3', '4']; // Dummy

  return (
    <>
      <div className='w-full py-4 px-5 sm:py-6 sm:px-0'>
        {/* Header */}
        <div className='flex justify-between items-center'>
          <h1 className='h1-sm sm:h1-md leading-none'>Materi</h1>
          <Button
            type='iconRight'
            text='Ajukan Pertanyaan'
            icon='akar-icons:plus'
            isResponsive={true}
            textClassName='hidden sm:inline'
          />
        </div>
        <div className='w-full mt-4'>
          <SearchBar />
        </div>

        {/* List Diskusi */}
        <div className='mt-5 flex flex-col gap-5'>
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
