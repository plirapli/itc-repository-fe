import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllCoursesDetail } from '../utils/course';
import { useProfile, useTitle } from '../hooks';

// Component
import { PlusIcon } from '@heroicons/react/20/solid';
import Button from '../components/buttons/Button';
import { Select, SearchBar } from '../components/forms';
import { CourseCard } from '../components/cards/index';
import OverlayLoading from '../components/overlay/OverlayLoading';

const Home = ({ divisi }) => {
  // window.history.pushState({}, null, '/'); // Redirect any "not found" page to Home
  const { profile } = useProfile();
  const [isLoading, setIsLoading] = useState(true);
  const [courses, setCourses] = useState([]);
  const [filteredCourse, setFilteredCourse] = useState([]);
  const [selectedDivisi, setSelectedDivisi] = useState('0');
  const [keywordMateri, setKeywordMateri] = useState('');
  useTitle('ITC Repository');

  const filterCourseById = (course) =>
    selectedDivisi !== '0'
      ? course.id_division === parseInt(selectedDivisi)
      : true;

  const filterCourseHandler = (course) =>
    course.title.toLowerCase().includes(keywordMateri.toLowerCase()) &&
    filterCourseById(course);

  const onKeywordMateriChange = (keyword) => {
    setKeywordMateri(keyword);
  };

  useEffect(() => {
    setFilteredCourse(courses.filter(filterCourseHandler));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keywordMateri, selectedDivisi, courses]);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    getAllCoursesDetail()
      .then((data) => {
        if (isMounted) {
          setCourses(data);
          setFilteredCourse(data.filter(filterCourseHandler));
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

  return (
    <>
      <div className='flex flex-col gap-2 sm:flex-row sm:items-center justify-between'>
        <h1 className='text-2xl'>Materi</h1>
        {profile?.id_role === 2 && (
          <Link to='manage/course/add/'>
            <Button variant='icon-right' size='small' icon={<PlusIcon />}>
              Tambah Materi
            </Button>
          </Link>
        )}
      </div>

      {/* Sort, Filter, Search */}
      <div className='mt-2 sm:mt-3 grid grid-cols-12  gap-3 sm:gap-4'>
        <div className='col-span-12 sm:col-span-6 md:col-span-4'>
          <div className='flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-2'>
            <Select
              onChange={(e) => setSelectedDivisi(e.target.value)}
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
          <SearchBar
            placeholder='Cari materi'
            value={keywordMateri}
            onChange={(e) => onKeywordMateriChange(e.target.value)}
          />
        </div>
      </div>

      <main className='materi-layout mt-3 sm:mt-4'>
        {filteredCourse?.map((course) => (
          <Link to={`/course/${course.id}/`} key={course.id}>
            <CourseCard
              isAdmin={profile?.id_role === 2}
              data={course}
              divisi={divisi}
            />
          </Link>
        ))}
      </main>

      <OverlayLoading loadingState={isLoading} />
    </>
  );
};

export default Home;
