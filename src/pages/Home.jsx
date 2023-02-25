import { useEffect, useState } from 'react';
import { Link, useNavigate, useOutletContext } from 'react-router-dom';
import { getAllCoursesDetail } from '../utils/course';

// Component
import Navbar from '../components/navbar/Navbar';
import Button from '../components/buttons/Button';
import { Select, SearchBar } from '../components/forms';
import { CourseCard } from '../components/cards/index';
import OverlayLoading from '../components/overlay/OverlayLoading';
import { useTitle } from '../hooks';

const Home = ({ userData, divisi, setIsAuthed }) => {
  window.history.pushState({}, null, '/'); // Redirect any "not found" page to Home

  const navigate = useNavigate();
  const navbar = useOutletContext();
  const toAddMateri = () => navigate('manage/course/add/');
  useTitle('ITC Repository');

  const [isLoading, setIsLoading] = useState(true);
  const [selectedDivisi, setSelectedDivisi] = useState('0');
  const [courses, setCourses] = useState([]);
  const [filteredCourse, setFilteredCourse] = useState([]);

  const filterSelectHandler = (e) => setSelectedDivisi(e.target.value);
  const filterCourseHandler = (course) =>
    course.id_division === parseInt(selectedDivisi);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    getAllCoursesDetail()
      .then((data) => {
        if (isMounted) {
          setCourses(data);
          setFilteredCourse(data);
        }
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));

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
    navbar(<Navbar user={userData} setIsAuthed={setIsAuthed} />);
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
          <div className='col-span-12 sm:col-span-6 md:col-span-4'>
            <div className='flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-2'>
              <Select
                onChange={filterSelectHandler}
                value={selectedDivisi}
                label='Divisi'
                color='secondary'
                required
              >
                <option value='0'>Semua</option>
                {divisi.map(({ id, divisionName }) => (
                  <option className='bg-white' key={id} value={id}>
                    {divisionName}
                  </option>
                ))}
              </Select>
            </div>
          </div>
          <div className='col-span-12 md:col-start-7 sm:col-span-6'>
            <SearchBar placeholder='Cari materi' />
          </div>
        </div>

        <main className='materi-layout mt-3 sm:mt-4'>
          {filteredCourse?.map((course) => (
            <Link to={`/course/${course.id}/`} key={course.id}>
              <CourseCard
                isAdmin={userData?.id_role === 2}
                data={course}
                divisi={divisi}
              />
            </Link>
          ))}
        </main>
      </div>

      <OverlayLoading loadingState={isLoading} />
    </>
  );
};

export default Home;
