import { Icon } from '@iconify/react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Button from '../../components/buttons/Button';

// Component
import Tags from '../../components/tags/Tags';
import { getCourseById } from '../../Utils/course';

const OverviewPage = (props) => {
  const [course, setCourse] = useState({});
  const { id_materi } = useParams();

  useEffect(() => {
    getCourseById(id_materi)
      .then(setCourse)
      .catch((error) => console.log(error));
  }, []);

  return (
    <>
      <div className='w-full py-4 px-5 sm:py-6 sm:px-0 flex flex-col gap-3 sm:gap-4'>
        {/* Overview */}
        <div className='w-full flex flex-col sm:flex-row gap-3 sm:gap-4'>
          <img
            className='w-full h-48 sm:w-[19rem] object-cover bg-zinc-400 rounded-lg overflow-hidden'
            src={course.image_thumbnail}
            alt='course-thumbnail'
          />
          <div className='flex flex-col items-start gap-2'>
            <div>
              <h2 className='h2-sm sm:h2-md clamp'>{course.title}</h2>
              <div className='text-gray-dark'>
                {course.length?.chapters} Bab
                <span className='text-black'> | </span>
                {course.length?.articles} Artikel
              </div>
            </div>
            <Tags id={course.id_division} />
            <div className='flex items-center gap-1.5 text-black'>
              <Icon icon='carbon:user-avatar-filled' width='20' />
              <span className='text-sm'>{course.user}</span>
            </div>
            <div className='flex items-center gap-1.5 text-black'>
              <Icon icon='ic:round-date-range' width='20' />
              <span className='text-sm'>{course.createdAt}</span>
            </div>
            <p className='text-sm text-gray-dark'>
              Diperbarui pada {course.updatedAt}
            </p>
          </div>
        </div>

        {/* CTA Btn */}
        <Button variant='text-only'>Belajar Sekarang</Button>

        {/* Deskripsi */}
        <div>
          <h2 className='text-xl'>Deskripsi</h2>
          <p className='mt-0.5 sm:mt-1'>{course.description}</p>
        </div>
      </div>
    </>
  );
};

export default OverviewPage;
