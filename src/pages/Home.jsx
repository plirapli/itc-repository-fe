import { useEffect, useState } from 'react';
import { Link, useNavigate, useOutletContext } from 'react-router-dom';
import { getCourses, getDivisi } from '../Utils/getData';

// Component
import Navbar from '../components/navbar/Navbar';
import Button from '../components/buttons/Button';
import SearchBar from '../components/SearchBar';
import {
  SelectOption,
  SelectOptionDivisi,
} from '../components/inputForm/SelectOption';
import MateriCard from '../components/cards/MateriCard';

const Home = ({ userData, ...props }) => {
  const navigate = useNavigate();
  const navbar = useOutletContext();
  const jwt_token = localStorage.getItem('token');

  let sortOptions = [
    { id: 1, name: 'A-Z' },
    { id: 2, name: 'Z-A' },
    { id: 3, name: 'Created at (Asc)' },
    { id: 4, name: 'Created at (Desc)' },
    { id: 5, name: 'Update at (Asc)' },
    { id: 6, name: 'Update at (Desc)' },
  ];
  // const [sort, setSort] = useState([]);
  const [divisi, setDivisi] = useState([]);
  const [selectedDivisi, setSelectedDivisi] = useState('0');
  const [courses, setCourses] = useState([]);
  const [filteredCourse, setFilteredCourse] = useState([]);

  const filterSelectHandler = (e) => setSelectedDivisi(() => e.target.value);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    props.errorHandler('');
    getCourses(jwt_token)
      .then(isMounted && setCourses)
      .catch(() => navigate('/login/'));

    return () => {
      isMounted = false;
      controller.abort();
    };

    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    getDivisi().then(setDivisi);
  }, []);

  useEffect(() => {
    if (selectedDivisi !== '0') {
      setFilteredCourse(
        courses.filter((course) => course.id_division === selectedDivisi)
      );
    } else {
      setFilteredCourse(courses);
    }
  }, [selectedDivisi]);

  useEffect(() => {
    setFilteredCourse(courses);
  }, [courses]);

  useEffect(() => {
    navbar(<Navbar user={userData} />);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData]);

  return (
    <>
      <div className='w-full pt-4 px-5 pb-6 sm:pt-5 sm:px-0 sm:pb-8'>
        <div className='flex items-center justify-between'>
          <h1 className='h1-sm sm:h1-md'>Materi</h1>
          {userData?.id_role === 2 && (
            <Button
              type='iconRight'
              text='Tambah Materi'
              icon='akar-icons:plus'
              isResponsive={true}
              textClassName='hidden sm:inline'
            />
          )}
        </div>

        {/* Sort, Filter, Search */}
        <div className='flex flex-col-reverse sm:flex-row items-center justify-between sm:items-end mt-3 sm:mt-1 gap-2 sm:gap-4'>
          <div className='w-full flex flex-col sm:flex-row  items-center gap-2 sm:gap-5'>
            <SelectOptionDivisi
              label='Divisi'
              value={selectedDivisi}
              handler={filterSelectHandler}
              options={divisi}
              isOptional={true}
            />
            <SelectOption label='Sort By' options={sortOptions} />
          </div>
          <div className='w-full sm:max-w-sm'>
            <SearchBar />
          </div>
        </div>

        <main className='materi-layout mt-3 sm:mt-4'>
          {filteredCourse?.map((course, i) => (
            <Link to={`/course/${course.id}/`} key={course.id}>
              <MateriCard
                isAdmin={userData?.id_role === 2}
                data={course}
                divisi={divisi}
              />
            </Link>
          ))}
        </main>
      </div>
    </>
  );
};

export default Home;
