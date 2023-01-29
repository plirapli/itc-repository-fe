import { useEffect, useState } from 'react';
import { Icon } from '@iconify/react';
import { Link, useNavigate, useOutletContext } from 'react-router-dom';
import Button from '../components/buttons/Button';

// Component
import NavbarMateri from '../components/navbar/NavbarMateri';
import Tags from '../components/tags/Tags';
import { getCourses, getDivisi } from '../Utils/getData';

const OverviewMateri = ({ ...props }) => {
  // const navigate = useNavigate();
  const navbar = useOutletContext();
  // const jwt_token = localStorage.getItem('token');

  // const [divisi, setDivisi] = useState([]);
  // const [selectedDivisi, setSelectedDivisi] = useState('0');
  // const [courses, setCourses] = useState([]);

  // const getCoursesApi = async () => {
  //   getCourses(jwt_token).then(({ status, data }) => {
  //     if (status) {
  //       setCourses(data);
  //     } else {
  //       navigate('/login');
  //     }
  //   });
  // };

  // const filterHandler = () => {
  //   if (selectedDivisi !== '0') {
  //     setFilteredCourse(
  //       courses.filter((course) => course.id_division == selectedDivisi)
  //     );
  //   } else {
  //     setFilteredCourse(courses);
  //   }
  // };

  // const filterSelectHandler = (e) => setSelectedDivisi(() => e.target.value);

  // useEffect(() => {
  //   getDivisi().then(setDivisi);
  // }, []);

  // useEffect(() => {
  //   filterHandler();
  // }, [selectedDivisi]);

  // useEffect(() => {
  //   setFilteredCourse(courses);
  // }, [courses]);

  // useEffect(() => {
  //   navbar();
  // }, []);
  useEffect(() => {
    navbar(<NavbarMateri courseID={1} />);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className='w-full py-4 px-5 sm:py-6 sm:px-0 flex flex-col gap-3 sm:gap-6'>
        {/* Overview */}
        <div className='w-full flex flex-col sm:flex-row gap-3 sm:gap-5'>
          <img
            className='w-full h-52 sm:w-[19rem] sm:h-[13.25rem] bg-zinc-400 rounded-lg overflow-hidden'
            src=''
            alt=''
          />
          <div className='flex flex-col items-start gap-2'>
            <div>
              <h2 className='h2-sm sm:h2-md clamp'>
                Lorem ipsum dolor sit amet
              </h2>
              <div className='text-gray-dark'>
                4 Bab
                <span className='text-black'> | </span>
                34 Artikel
              </div>
            </div>
            {/* <Tags divisi={divisi} /> */}
            <div className='flex items-center gap-1.5 text-black'>
              <Icon icon='carbon:user-avatar-filled' width='20' />
              <span className='text-sm'>Muhammad Rafli</span>
            </div>
            <div className='flex items-center gap-1.5 text-black'>
              <Icon icon='ic:round-date-range' width='20' />
              <span className='text-sm'>14/09/2022</span>
            </div>
          </div>
        </div>

        {/* CTA Btn */}
        <Button type='textOnly' text='Belajar Sekarang' />

        {/* Deskripsi */}
        <div>
          <h2 className='h2-sm sm:h2-md'>Deskripsi</h2>
          <p className='mt-2'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vitae
            tellus nisl. Aliquam erat volutpat. In hac habitasse platea
            dictumst. Duis sit amet orci maximus, iaculis justo sollicitudin,
            congue turpis. Aliquam dictum tortor lacus, eu tempor metus blandit
            at. Fusce laoreet volutpat dolor in egestas. Sed accumsan tempus
            risus, ac hendrerit massa sodales non. Etiam a scelerisque lacus.
          </p>
        </div>
      </div>
    </>
  );
};

export default OverviewMateri;
