import Navbar from '../components/Navbar';
import Button from '../components/buttons/Button';
import SearchBar from '../components/SearchBar';
import SelectOption from '../components/SelectOption';
import MateriCard from '../components/cards/MateriCard';

const Home = () => {
  let sortOptions = [
    'A-Z',
    'Z-A',
    'Create at (Ascending)',
    'Create at (Descending)',
    'Update at (Ascending)',
    'Update at (Descending)',
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
      <div className='px-5 py-4 sm:px-12 sm:py-5'>
        <div className='flex items-center justify-between'>
          <h2 className='h2-sm sm:h2-md'>Materi</h2>
          <Button text='Tambah Materi' icon='akar-icons:plus' />
        </div>
        <div className='flex flex-col-reverse sm:flex-row items-center justify-between  mt-3 sm:mt-4 gap-2 sm:gap-4'>
          <div className='w-full flex flex-col sm:flex-row  items-center gap-2 sm:gap-5'>
            <SelectOption label='Divisi' options={divisions} />
            <SelectOption label='Sort By' options={sortOptions} />
          </div>
          <div className='w-full sm:w-96'>
            <SearchBar />
          </div>
        </div>

        <main className='grid mt-3 sm:mt-4 materi-layout'>
          <MateriCard />
          <MateriCard />
          <MateriCard />
          <MateriCard />
          <MateriCard />
          <MateriCard />
          <MateriCard />
          <MateriCard />
          <MateriCard />
        </main>
      </div>
    </>
  );
};

export default Home;
