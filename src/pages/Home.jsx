import Navbar from '../components/Navbar';
import { ButtonIconRight } from '../components/buttons/Button';
import SearchBar from '../components/SearchBar';
import {
  SelectOption,
  SelectOptionDivisi,
} from '../components/inputForm/SelectOption';
import MateriCard from '../components/cards/MateriCard';
import { getCourses, getDivisi } from '../Utils/getData';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  let sortOptions = [
    { id: 1, name: 'A-Z' },
    { id: 2, name: 'Z-A' },
    { id: 3, name: 'Created at (Asc)' },
    { id: 4, name: 'Created at (Desc)' },
    { id: 5, name: 'Update at (Asc)' },
    { id: 6, name: 'Update at (Desc)' },
  ];
  const [sort, setSort] = useState([]);
  const [divisi, setDivisi] = useState([]);
  const [courses, setCourses] = useState([]);
  const [filterDivisi, setFilterDivisi] = useState();

  useEffect(() => {
    return async () => {
      setDivisi(await getDivisi());
    };
    // navigate('/login');
  }, []);

  useEffect(() => {
    getCoursesApi();
  }, []);

  const getCoursesApi = async () => {
    try {
      setCourses(await getCourses());
    } catch (err) {
      console.log(err.message);
    }
  };

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
        <div className='flex flex-col-reverse sm:flex-row items-center justify-between sm:items-end mt-3 sm:mt-1 gap-2 sm:gap-4'>
          <div className='w-full flex flex-col sm:flex-row  items-center gap-2 sm:gap-5'>
            <SelectOptionDivisi
              label='Divisi'
              value={filterDivisi}
              // handler={inputHandler}
              options={divisi}
            />
            <SelectOption label='Sort By' options={sortOptions} />
          </div>
          <div className='w-full sm:max-w-sm'>
            <SearchBar />
          </div>
        </div>

        <main className='materi-layout mt-3 sm:mt-4'>
          {courses.map((course) => (
            <MateriCard key={course.id} data={course} />
          ))}
        </main>
      </div>
    </>
  );
};

export default Home;
