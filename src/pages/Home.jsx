import { useEffect, useState } from 'react';
import { Link, useNavigate, useOutletContext } from 'react-router-dom';
import { getCourses, getCoursesDetail } from '../Utils/getData';

// Component
import Navbar from '../components/navbar/Navbar';
import Button from '../components/buttons/Button';
import SearchBar from '../components/inputForm/SearchBar';
import { Select } from '../components/inputForm/SelectOption';
import { MateriCard } from '../components/cards/index';

const Home = ({ userData, divisi, ...props }) => {
  const navigate = useNavigate();
  const navbar = useOutletContext();
  const toAddMateri = () => navigate('materi/add/');

  let sortOptions = [
    { id: 1, name: 'A-Z' },
    { id: 2, name: 'Z-A' },
    { id: 3, name: 'Created at (Asc)' },
    { id: 4, name: 'Created at (Desc)' },
    { id: 5, name: 'Update at (Asc)' },
    { id: 6, name: 'Update at (Desc)' },
  ];
  // const [sort, setSort] = useState([]);
  const [selectedDivisi, setSelectedDivisi] = useState('0');
  const [courses, setCourses] = useState([]);
  const [filteredCourse, setFilteredCourse] = useState([]);

  const filterSelectHandler = (e) => setSelectedDivisi(e.target.value);
  const filterCourseHandler = (course) =>
    course.id_division === parseInt(selectedDivisi);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    getCoursesDetail()
      .then((data) => {
        if (isMounted) {
          setCourses(data);
          setFilteredCourse(data);
        }
      })
      .catch((err) => {
        console.log(err);
        navigate('/login/');
      });

    // Cleanup
    return () => {
      isMounted = false;
      controller.abort();
    };

    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (selectedDivisi !== '0') {
      setFilteredCourse(courses.filter(filterCourseHandler));
    } else {
      setFilteredCourse(courses);
    }
  }, [selectedDivisi]);

  useEffect(() => {
    navbar(<Navbar user={userData} />);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData]);

  return (
    <>
      <div className='w-full pt-4 px-5 pb-6 sm:pt-5 sm:px-0 sm:pb-8'>
        <div className='flex flex-col gap-2 sm:flex-row sm:items-center justify-between'>
          <h1 className='text-2xl'>Materi</h1>
          {userData?.id_role === 2 && (
            <Button
              onClick={toAddMateri}
              variant='icon-right'
              icon='akar-icons:plus'
            >
              Tambah Materi
            </Button>
          )}
        </div>

        {/* Sort, Filter, Search */}
        <div className='mt-2 sm:mt-3 grid grid-cols-12  gap-3 sm:gap-4'>
          <div className='col-span-12 sm:col-span-7 lg:col-span-4 flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-2'>
            <Select
              color='secondary'
              label='Divisi'
              value={selectedDivisi}
              onChange={filterSelectHandler}
            >
              <option value='0'>Semua</option>
              {divisi.map(({ id, divisionName }) => (
                <option className='bg-white' key={id} value={id}>
                  {divisionName}
                </option>
              ))}
            </Select>
          </div>
          <div className='col-span-12 sm:col-span-5 lg:col-span-4 flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-2'>
            <Select label='Sort By' color='secondary'>
              {sortOptions.map(({ id, name }) => (
                <option className='bg-white' key={id} value={id}>
                  {name}
                </option>
              ))}
            </Select>
          </div>
          <div className='col-span-12 lg:col-span-4'>
            <SearchBar placeholder='Cari materi' />
          </div>
        </div>

        <main className='materi-layout mt-3 sm:mt-4'>
          {filteredCourse?.map((course) => (
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
