import Button from '../../components/buttons/Button';
import DiskusiCard from '../../components/cards/DiskusiCard';
import SearchBar from '../../components/SearchBar';

const Diskusi = () => {
  const diskusiList = ['1', '2', '3', '4'];

  return (
    <>
      <div className='w-full pt-4 px-5 pb-6 sm:pt-5 sm:px-0 sm:pb-8'>
        {/* Header */}
        <div className='flex justify-between items-center'>
          <h1 className='h1-sm sm:h1-md'>Materi</h1>
          <Button
            type='iconRight'
            text='Ajukan Pertanyaan'
            icon='akar-icons:plus'
            isResponsive={true}
            textClassName='hidden sm:inline'
          />
        </div>
        <div className='w-full mt-3'>
          <SearchBar />
        </div>

        {/* List Diskusi */}
        <div className='mt-5 flex flex-col gap-5'>
          {diskusiList.map((diskusi, i) => (
            // Diskusi Card
            <DiskusiCard />
          ))}
        </div>
      </div>
    </>
  );
};

export default Diskusi;
