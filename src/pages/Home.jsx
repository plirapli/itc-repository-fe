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
import { useNavigate, useOutletContext } from 'react-router-dom';

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
  const [sort, setSort] = useState([]);
  const [divisi, setDivisi] = useState([]);
  const [selectedDivisi, setSelectedDivisi] = useState('0');
  const [courses, setCourses] = useState([]);
  const [filteredCourse, setFilteredCourse] = useState();

  const getCoursesApi = async () => {
    getCourses(jwt_token).then(({ status, data }) => {
      if (status) {
        setCourses(data);
      } else {
        console.log('catched');
        navigate('/login');
      }
    });
  };

  const filterHandler = () => {
    if (selectedDivisi !== '0') {
      setFilteredCourse(
        courses.filter((course) => course.id_division == selectedDivisi)
      );
    } else {
      setFilteredCourse(courses);
    }
  };

  const filterSelectHandler = (e) => setSelectedDivisi(() => e.target.value);

  useEffect(() => {
    props.errorHandler('');
    getCoursesApi();

    return async () => {
      setDivisi(await getDivisi());
    };
  }, []);

  useEffect(() => {
    filterHandler();
  }, [selectedDivisi]);

  useEffect(() => {
    setFilteredCourse(courses);
  }, [courses]);

  useEffect(() => {
    navbar(<Navbar user={userData} />);
  }, [userData]);

  return (
    <>
      <div className='w-full pt-4 px-5 pb-6 sm:pt-5 sm:px-0 sm:pb-8'>
        <div className='flex items-center justify-between'>
          <h2 className='h1-sm sm:h1-md'>Materi</h2>
          {userData?.id_role == 2 && (
            <ButtonIconRight
              text='Tambah Materi'
              icon='akar-icons:plus'
              textClassName='hidden sm:inline'
            />
          )}
        </div>
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
          {filteredCourse?.map((course) => (
            <MateriCard
              isAdmin={userData?.id_role == 2}
              key={course.id}
              data={course}
              divisi={divisi}
            />
          ))}
        </main>
      </div>
    </>
  );
};

export default Home;
