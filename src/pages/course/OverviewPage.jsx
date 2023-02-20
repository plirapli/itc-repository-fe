import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getCourseById } from '../../utils/course';

// Component
import Button from '../../components/buttons/Button';
import Tags from '../../components/tags/Tags';
import { Icon } from '@iconify/react';

const OverviewPage = (props) => {
  const [course, setCourse] = useState({});
  const { id_course } = useParams();

  useEffect(() => {
    getCourseById(id_course)
      .then(setCourse)
      .catch((error) => console.log(error));
  }, []);

  return (
    <>
      <div className='w-full py-4 px-5 sm:py-6 sm:px-0 flex flex-col gap-3 sm:gap-4'>
        {/* Overview */}
        <div className='w-full flex flex-col sm:flex-row gap-3 sm:gap-4'>
          <img
            className='w-full h-48 sm:max-w-[19rem] object-cover bg-zinc-400 rounded-lg overflow-hidden'
            loading='lazy'
            src={course?.image_thumbnail}
            alt='course-thumbnail'
          />
          <div className='flex flex-col items-start justify-between'>
            <div className='flex flex-col gap-1.5'>
              <div>
                <h2 className='text-lg font-medium clamp'>{course?.title}</h2>
                <div className='text-gray-dark text-sm mt-1'>
                  {course?.length?.chapters} Bab
                  <span className='text-black'> | </span>
                  {course?.length?.articles} Artikel
                </div>
              </div>
              <Tags divName={course?.Division?.divisionName} />
              <div className='flex items-center gap-1.5 text-black'>
                <Icon icon='carbon:user-avatar-filled' width='20' />
                <span className='text-sm'>{course?.User?.fullName}</span>
              </div>
            </div>

            <div className='mt-1.5'>
              <p className='text-sm text-gray-dark'>
                Dibuat pada {course?.createdAt}
              </p>
              <p className='mt-0.5 text-sm text-gray-dark'>
                Diperbarui pada {course?.updatedAt}
              </p>
            </div>
          </div>
        </div>

        {/* CTA Btn */}
        <Button variant='text-only'>Belajar Sekarang</Button>

        {/* Deskripsi */}
        <div>
          <h2 className='text-lg'>Deskripsi</h2>
          <p className='mt-0.5 sm:mt-1'>{course?.description}</p>
        </div>
      </div>
    </>
  );
};

export default OverviewPage;
