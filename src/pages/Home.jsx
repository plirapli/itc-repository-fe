import Navbar from '../components/Navbar';
import { ButtonIconRight } from '../components/buttons/Button';
import SearchBar from '../components/SearchBar';
import SelectOption from '../components/SelectOption';
import MateriCard from '../components/cards/MateriCard';

const Home = () => {
  let sortOptions = [
    'A-Z',
    'Z-A',
    'Create at (Asc)',
    'Create at (Desc)',
    'Update at (Asc)',
    'Update at (Desc)',
  ];

  let divisions = [
    'Mobile Developer',
    'Public Relations',
    'Project Manager',
    'Front-end Developer',
    'Back-end Developer',
  ];

  return (
    <>
      <Navbar />
      <div className='px-5 pt-4 pb-6 sm:px-8 sm:pt-5 sm:pb-8'>
        <div className='flex items-center justify-between'>
          <h2 className='h1-sm sm:h1-md'>Materi</h2>
          <ButtonIconRight
            text='Tambah Materi'
            icon='akar-icons:plus'
            textClassName='hidden sm:inline'
          />
        </div>
        <div className='flex flex-col-reverse lg:flex-row items-center justify-between  mt-3 sm:mt-4 gap-2 sm:gap-4'>
          <div className='w-full flex flex-col sm:flex-row  items-center gap-2 sm:gap-5'>
            <SelectOption label='Divisi' options={divisions} />
            <SelectOption label='Sort By' options={sortOptions} />
          </div>
          <div className='w-full lg:max-w-xs'>
            <SearchBar />
          </div>
        </div>

        <main className='materi-layout mt-3 sm:mt-4'>
          <MateriCard />
          <MateriCard divisi={2} />
          <MateriCard divisi={3} />
          <MateriCard divisi={4} />
          <MateriCard divisi={5} />
          <MateriCard />
          <MateriCard divisi={2} />
          <MateriCard divisi={3} />
          <MateriCard divisi={4} />
          <MateriCard divisi={5} />
        </main>
      </div>
    </>
  );
};

export default Home;
